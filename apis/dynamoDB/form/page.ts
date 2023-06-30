import { marshall } from '@aws-sdk/util-dynamodb';
import {
  getScanCommandOutputFromDynamoDB,
  putItemCommandOutputFromDynamoDB,
} from 'fe-modules/apis/dynamoDB/request/getOutput';
import { parseRecord, parseRecords } from 'fe-modules/apis/dynamoDB/request/parse';

async function getFormPageListFromDynamoDB() {
  const params = {
    TableName: 'FormPage',
  };
  const data = await getScanCommandOutputFromDynamoDB(params);
  const records = parseRecords(data);
  return records;
}

async function getFormPageFromDynamoDB(page: any) {
  const params = {
    TableName: 'FormPage',
    Item: marshall(page),
  };

  const data = await putItemCommandOutputFromDynamoDB(params);
  const record = parseRecord(data);
  return record;
}

async function putFormPageFromDynamoDB(item: any) {
  const params = {
    TableName: 'FormPage',
    Item: marshall(item),
  };
  await putItemCommandOutputFromDynamoDB(params);
}

export { getFormPageFromDynamoDB, getFormPageListFromDynamoDB, putFormPageFromDynamoDB };
