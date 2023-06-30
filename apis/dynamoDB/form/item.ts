import { marshall } from '@aws-sdk/util-dynamodb';
import { getScanCommandOutputFromDynamoDB, putItemCommandOutputFromDynamoDB } from 'fe-modules/apis/dynamoDB/getOutput';
import { parseRecord, parseRecords } from 'fe-modules/apis/dynamoDB/parse';

async function getFormItemListFromDynamoDB() {
  const params = {
    TableName: 'FormItem',
  };
  const data = await getScanCommandOutputFromDynamoDB(params);
  const records = parseRecords(data);
  return records;
}

async function getFormItemFromDynamoDB(item: any) {
  const params = {
    TableName: 'FormItem',
    Item: marshall(item),
  };

  const data = await putItemCommandOutputFromDynamoDB(params);
  const record = parseRecord(data);
  return record;
}

async function putFormItemFromDynamoDB(item: any) {
  const params = {
    TableName: 'FormItem',
    Item: marshall(item),
  };
  await putItemCommandOutputFromDynamoDB(params);
}

export { getFormItemFromDynamoDB, getFormItemListFromDynamoDB, putFormItemFromDynamoDB };
