import formSubmit from 'fe-modules/apis/lambda/formSubmit';
import { uploadFileToPrivateS3 } from 'fe-modules/apis/s3/file';
import { ImageObj } from 'fe-modules/components/FormUI/FileForm/index';
import { Auth } from 'fe-modules/models/auth';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { File_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';
import { getCurrentDate } from 'fe-modules/utils/date';
import { base64ToFile } from 'fe-modules/utils/encoding';
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
  const sendData: Array<SubmitFormProps> = await Promise.all(
    Object.entries(curData)
      .filter(([, value]) => value)
      .map(async ([key, value]) => {
        const formData = uiSettings?.filter((val) => val.formKey === key)?.[0]?.data;
        let processedValue = value;
        switch (formData.type) {
          case 'file':
            processedValue = value.map((val: ImageObj) => val.s3Path);
            break;
          case 'signature':
            const curDate = getCurrentDate();
            const signFile = base64ToFile(curData[key], (formData as File_FormUIData).s3path);
            const path = `temp/${auth.email}/${(formData as File_FormUIData).s3path}/${curDate.replace(
              ':',
              '',
            )}_signature`;
            await uploadFileToPrivateS3(path, signFile);
            processedValue = [path];
            break;
          case 'emailAuth':
            const val = value as { email: string; isVerified: boolean };
            processedValue = val?.isVerified ? val.email : '';
            break;
          default:
            break;
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
  const res = await formSubmit(JSON.stringify(sendData));
  return res;
}

export default onSubmitForm;
