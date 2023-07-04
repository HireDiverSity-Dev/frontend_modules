import {
  GetItemCommand,
  GetItemCommandInput,
  PutItemCommand,
  PutItemCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { getDynamoDBClient } from '../network';

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

async function patchItemCommandOutputFromDynamoDB(params: UpdateItemCommandInput) {
  const client = getDynamoDBClient();

  const command = new UpdateItemCommand(params);
  const data = await client.send(command);
  return data;
}

export {
  getItemCommandOutputFromDynamoDB,
  getScanCommandOutputFromDynamoDB,
  patchItemCommandOutputFromDynamoDB,
  putItemCommandOutputFromDynamoDB,
};
