import { GetItemCommand } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { getDynamoDBClient } from 'fe-modules/utils/network';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { itemKey } = req.query;

  if (req.method === 'GET') {
    try {
      const client = getDynamoDBClient();

      const params = {
        TableName: 'FormItem',
        Key: {
          _id: { S: itemKey as string },
        },
      };
      const command = new GetItemCommand(params);

      const data = await client.send(command);
      //console.log(signedUrl);
      if (data?.Item) {
        return res.status(200).json(unmarshall(data.Item));
      } else {
        //에러 처리
        console.log('해당 form item 존재 X');
        return res.status(300);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
