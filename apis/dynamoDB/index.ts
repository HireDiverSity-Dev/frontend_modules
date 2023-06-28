import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import exp from 'constants';
let dynamoDBClient: DynamoDBClient;

const getDynamoDBClient = () => {
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

export default getDynamoDBClient;
