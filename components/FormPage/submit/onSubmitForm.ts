import { FieldValues } from 'react-hook-form';
import { UploadFileApi } from '@/remotes/form';
import { base64ToFile, getCurrentDate } from '@/utils/function';
import { Auth } from '@/models/auth';
import { FormUISetting } from '@/models/FormUI/FormUI';
import { FormUIValue } from '@/models/FormUI/FormUIValue';
import { File_FormUIData } from '@/models/FormUI/FormUIData';

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
  const curDate = getCurrentDate();
  // 후가공: 서명, 이메일 인증
  const sendData: Array<SubmitFormProps> = await Promise.all(
    Object.entries(curData)
      .filter(([key, value]) => value)
      .map(async ([key, value]) => {
        const formData = uiSettings?.filter((val) => val.formKey === key)?.[0]?.data;
        let processedValue = value;
        //서명 s3업로드
        if (formData) {
          if (formData.type === 'signature') {
            const signFile = base64ToFile(curData[key], (formData as File_FormUIData).s3path);
            const path = `temp/${auth.email}/${(formData as File_FormUIData).s3path}/${curDate.replace(
              ':',
              '',
            )}_signature`;
            await UploadFileApi(path, signFile);
            processedValue = [path];
          } else if (formData.type === 'emailAuth') {
            const val = value as { email: string; verified: boolean };
            processedValue = val?.verified ? val.email : '';
          }
        }
        return {
          value: processedValue as FormUIValue,
          airtable: {
            base: formData?.airtable?.base ? `${formData?.airtable?.base}` : undefined,
            table: formData?.airtable?.table ? `${formData?.airtable?.table}` : undefined,
            col: formData?.airtable?.col ? `${formData?.airtable?.col}` : undefined,
          } as AirtableProps,
          server: formData?.server ?? '',
        };
      }),
  );
  return sendData;
}

async function onSubmitForm(curData: FieldValues, uiSettings: Array<FormUISetting>, auth: Auth) {
  console.log('data:', curData);

  const sendData = await preProcessData(curData, uiSettings, auth);
  console.log('processed data:', sendData);

  const res = await fetch('/api/airtable/form/submit', {
    method: 'POST',
    body: JSON.stringify(sendData),
  });
  return res;
}

export default onSubmitForm;
