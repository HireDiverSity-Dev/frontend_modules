import {
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
  ScanCommand,
  ScanCommandInput,
} from '@aws-sdk/client-dynamodb';

let dynamoDBClient: DynamoDBClient;

export const getDynamoDBClient = () => {
  if (!dynamoDBClient) {
    dynamoDBClient = new DynamoDBClient({
      region: process.env.REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!,
      },
    });
  }

  return dynamoDBClient;
};

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

export { getScanCommandOutputFromDynamoDB, getItemCommandOutputFromDynamoDB };
