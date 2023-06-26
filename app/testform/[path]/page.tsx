'use client';
import { getItemCommandOutputFromDynamoDB } from '@/apis/dynamoDB/getDataFromDynamoDB';
import { parseRecord } from '@/apis/dynamoDB/parse';
import FormPage from '@/components/FormPage/index';
import { FormPageProps } from '@/models/FormPage/FormPage';

export default async function testform({ params }: { params: { path: string } }) {
  const props = await getFormPageProps(params.path);
  if (props !== null) {
    return <FormPage {...props} />;
  }
  return <div>404</div>;
}

async function getFormPageProps(path: string) {
  const params = {
    TableName: 'FormPage',
    Key: {
      path: { S: path },
    },
  };
  try {
    const data = await getItemCommandOutputFromDynamoDB(params);
    const record = parseRecord(data) as FormPageProps;
    return record;
  } catch (error) {
    return null;
  }
}
