import {
  DeleteItemCommand,
  DeleteItemCommandInput,
  UpdateItemCommand,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { getDynamoDBClient } from 'fe-modules/utils/network';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pageKey } = req.query;

  const client = getDynamoDBClient();
  try {
    if (req.method === 'PATCH') {
      const params: UpdateItemCommandInput = {
        TableName: 'FormPage',
        Key: {
          path: { S: (pageKey as string).replaceAll('&', '/') },
        },
        AttributeUpdates: Object.entries(marshall(req.body)).reduce(
          (prev, [attr, value]) => ({ ...prev, [attr]: { Value: value } }),
          {},
        ),
      };
      const command = new UpdateItemCommand(params);

      await client.send(command);

      res.status(200).json({ message: '페이지가 변경되었습니다' });
    } else if (req.method === 'DELETE') {
      const params: DeleteItemCommandInput = {
        TableName: 'FormPage',
        Key: {
          path: { S: (pageKey as string).replaceAll('&', '/') },
        },
      };
      const command = new DeleteItemCommand(params);

      await client.send(command);

      res.status(202).json({ message: '페이지가 사제되었습니다' });
    }
  } catch (err) {
    console.error(err);
  }
}
