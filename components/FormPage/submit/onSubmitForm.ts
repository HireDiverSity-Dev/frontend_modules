import { getListFromDynamoDB, postFromDynamoDB } from 'fe-modules/apis/dynamoDB/table';
import formSubmit from 'fe-modules/apis/lambda/formSubmit';
import { uploadFileToPrivateS3 } from 'fe-modules/apis/s3/file';
import { ImageObj } from 'fe-modules/components/FormUI/FileForm/index';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { File_FormUIData, FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';
import { Submission } from 'fe-modules/models/Submission/Submission';
import { getCurrentDate, parseStringToDate } from 'fe-modules/utils/date';
import { base64ToFile } from 'fe-modules/utils/encoding';
import { getRandomString } from 'fe-modules/utils/function';
import { FieldValues } from 'react-hook-form';

interface AirtableProps {
  base: string;
  table: string;
  col: string;
}
interface SubmitFormProps {
  airtable?: AirtableProps;
  server?: string;
  value: FormUIValue;
}

async function preProcessData(curData: FieldValues, uiSettings: Array<FormUISetting>, auth: Auth) {
  const saveDirFormItem_id = curData?.saveDir;
  delete curData?.saveDir;
  delete curData?.pageHistory;
  console.log('curData:', curData);
  const formDataList: Array<FormUIData & { value: FormUIValue }> = await Promise.all(
    Object.entries(curData)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(async ([key, value]) => {
        const formData = uiSettings?.filter((val) => val.FormItem_id === key)?.[0]?.data;
        let processedValue = value;
        switch (formData?.type) {
          case 'file':
            processedValue = value.map((val: ImageObj) => val.s3Path);
            break;
          case 'signature':
            let filePath = '';
            if (auth.email) filePath = auth.email; // 1순위 : 로그인 된 이메일
            else {
              const saveDir = curData?.[saveDirFormItem_id];
              if (saveDir !== undefined) filePath = saveDir; // 2순위 : 인증된 이메일, 3순위 : 저장 경로
            }
            if ((formData as File_FormUIData).s3Path) filePath += (formData as File_FormUIData).s3Path;
            const signFile = base64ToFile(curData[key], (formData as File_FormUIData).s3Path);
            const curDate = getCurrentDate();
            const path = `temp/${filePath}/sign/${curDate.replace(':', '')}_signature`;
            await uploadFileToPrivateS3(path, signFile);
            processedValue = [path];
            break;
          default:
            break;
        }
        const newFormData: FormUIData & { value: FormUIValue } = { ...formData, value: processedValue };
        return newFormData;
      }),
  );
  const normalizedFormDataList: Array<FormUIData & { value: FormUIValue }> = [];
  formDataList.forEach((formData) => {
    if (formData?._id === undefined) return;
    normalizedFormDataList.push(formData);
  });
  return normalizedFormDataList;
}

async function checkDuplicate(formDataList: Array<FormUIData & { value: FormUIValue }>, FormPage_id: string) {
  let isDuplicate = true;
  const submissionRes = await getListFromDynamoDB('Submission', JSON.stringify({ FormPage_id: FormPage_id }));
  const submissionList: Array<Submission> = submissionRes?.data ?? [];
  submissionList.sort((a, b) => parseStringToDate(b.createdAt).getTime() - parseStringToDate(a.createdAt).getTime());
  // search for the last 5 min submissions
  const lastSubmissions: Array<Submission> = [];
  const nowDate = new Date();
  submissionList.forEach((submission) => {
    const submissionDate = parseStringToDate(submission.createdAt);
    const diff = nowDate.getTime() - submissionDate.getTime();
    if (diff < 5 * 60 * 1000) lastSubmissions.push(submission);
  });
  // diff check with last submissions
  lastSubmissions.forEach((lastSubmission) => {
    const lastSubmissionData = lastSubmission.data;
    const lastSubmissionDataMap = new Map<string, FormUIValue>();
    lastSubmissionData.forEach((data) => {
      lastSubmissionDataMap.set(data.FormItem_id, data.value);
    });
    formDataList.forEach((formData) => {
      if (lastSubmissionDataMap.has(formData._id)) {
        const lastValue = lastSubmissionDataMap.get(formData._id);
        if (typeof lastValue === 'string' && typeof formData.value === 'string' && lastValue !== formData.value) {
          isDuplicate = false;
        }
      }
    });
  });
  if (isDuplicate) throw new Error('Duplicate submission');
}

async function sendDynamoDB(formDataList: Array<FormUIData & { value: FormUIValue }>, FormPage_id: string) {
  await checkDuplicate(formDataList, FormPage_id);

  const sendDynamoDBData: Array<{ value: FormUIValue; FormItem_id: string }> = formDataList.map((formData) => {
    const data = { value: formData.value, FormItem_id: formData._id };
    return data;
  });
  console.log('processed dynamoDBData:', sendDynamoDBData);
  const sendSubmissionData: Submission = {
    _id: getRandomString(20),
    FormPage_id: FormPage_id,
    data: sendDynamoDBData,
    createdAt: getCurrentDate(),
  };
  await postFromDynamoDB('Submission', sendSubmissionData);
}

async function sendAirtable(formDataList: Array<FormUIData & { value: FormUIValue }>) {
  const sendAirtableData: Array<SubmitFormProps> = formDataList.map((formData) => {
    return {
      value: formData.value,
      airtable: {
        base: formData?.airtable?.base ? `${formData?.airtable?.base}` : undefined,
        table: formData?.airtable?.table ? `${formData?.airtable?.table}` : undefined,
        col: formData?.airtable?.col ? `${formData?.airtable?.col}` : undefined,
      } as AirtableProps,
      server: formData?.server ?? '',
    };
  });
  console.log('processed airtableData:', sendAirtableData);
  return await formSubmit(JSON.stringify(sendAirtableData));
}

async function onSubmitForm(curData: FieldValues, page: FormPageProps, auth: Auth) {
  console.log('data:', curData);
  console.log('page:', page);

  const formDataList = await preProcessData(curData, page.forms, auth);
  console.log('processed formDataList:', formDataList);

  await sendDynamoDB(formDataList, page._id);
  const res = await sendAirtable(formDataList);
  return res;
}

export default onSubmitForm;
