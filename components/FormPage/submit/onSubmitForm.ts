import { postFromDynamoDB } from 'fe-modules/apis/dynamoDB/table';
import formSubmit from 'fe-modules/apis/lambda/formSubmit';
import { uploadFileToPrivateS3 } from 'fe-modules/apis/s3/file';
import { ImageObj } from 'fe-modules/components/FormUI/FileForm/index';
import { Auth } from 'fe-modules/models/auth';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { File_FormUIData, FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';
import { Inbox } from 'fe-modules/models/Submission/Inbox';
import { getCurrentDate } from 'fe-modules/utils/date';
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
              if (saveDir?.email) filePath = saveDir.email; // 2순위 : 인증된 이메일
              else if (saveDir) filePath = saveDir; // 3순위 : 저장 경로
            }
            if ((formData as File_FormUIData).s3Path) filePath += (formData as File_FormUIData).s3Path;
            const signFile = base64ToFile(curData[key], (formData as File_FormUIData).s3Path);
            const curDate = getCurrentDate();
            const path = `temp/${filePath}/sign/${curDate.replace(':', '')}_signature`;
            await uploadFileToPrivateS3(path, signFile);
            processedValue = [path];
            break;
          case 'emailAuth':
            const val = value as { email: string; isVerified: boolean };
            processedValue = val?.isVerified ? val?.email : '';
            break;
          default:
            break;
        }
        const newFormData: FormUIData & { value: FormUIValue } = { ...formData, value: processedValue };
        return newFormData;
      }),
  );
  return formDataList;
}

async function sendDynamoDB(formDataList: Array<FormUIData & { value: FormUIValue }>, FormPage_id: string) {
  const sendDynamoDBData: Array<{ value: FormUIValue; FormItem_id: string }> = formDataList.map((formData) => {
    const data = { value: formData.value, FormItem_id: formData._id };
    return data;
  });
  console.log('processed dynamoDBData:', sendDynamoDBData);
  const sendInboxData: Inbox = {
    _id: getRandomString(20),
    FormPage_id: FormPage_id,
    data: sendDynamoDBData,
    createdAt: getCurrentDate(),
  };
  await postFromDynamoDB('Submission', sendInboxData);
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
