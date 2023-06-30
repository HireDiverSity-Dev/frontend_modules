import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';
import getDynamoDBClient from 'fe-modules/apis/dynamoDB';

async function getScanCommandOutputFromDynamoDB(params: ScanCommandInput) {
  const client = getDynamoDBClient();

  const command = new ScanCommand(params);
  const data = await client.send(command);
  return data;
}

async function getItemCommandOutputFromDynamoDB(params: GetItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new GetItemCommand(params);
  const data = await client.send(command);
  return data;
}

async function putItemCommandOutputFromDynamoDB(params: PutItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new PutItemCommand(params);
  const data = await client.send(command);
  return data;
}

export { getItemCommandOutputFromDynamoDB, getScanCommandOutputFromDynamoDB, putItemCommandOutputFromDynamoDB };
