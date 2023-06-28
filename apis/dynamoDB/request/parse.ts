import { GetItemCommandOutput, ScanCommandOutput } from '@aws-sdk/client-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';

function parseRecord(data: GetItemCommandOutput) {
  const record = unmarshall(data.Item!);
  return record;
}

function parseRecords(data: ScanCommandOutput) {
  const records = data.Items!.map((i) => unmarshall(i));
  return records;
}

export { parseRecord, parseRecords };
