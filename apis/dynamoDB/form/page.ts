import { marshall } from '@aws-sdk/util-dynamodb';
import {
  getScanCommandOutputFromDynamoDB,
  patchItemCommandOutputFromDynamoDB,
  putItemCommandOutputFromDynamoDB,
} from 'fe-modules/apis/dynamoDB/getOutput';
import { parseRecord, parseRecords } from 'fe-modules/apis/dynamoDB/parse';

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

async function patchFormPageFromDynamoDB(key: any, updates: any) {
  const params = {
    TableName: 'FormPage',
    Key: marshall(key),
    AttributeUpdates: updates,
  };
  await patchItemCommandOutputFromDynamoDB(params);
}

export { getFormPageFromDynamoDB, getFormPageListFromDynamoDB, patchFormPageFromDynamoDB, putFormPageFromDynamoDB };
