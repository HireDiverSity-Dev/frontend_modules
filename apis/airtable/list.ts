import { aws } from 'fe-modules/apis/network';

async function getList(tableKey: 'new' | 'extend' | 'change') {
  return await aws.get(`/airtable/${tableKey}`);
}

export { getList };
