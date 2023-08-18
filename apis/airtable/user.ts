import { aws } from 'fe-modules/apis/network';

async function getUser(tableKey: 'new' | 'extend' | 'change', recordId: string) {
  return await aws.get(`/airtable/${tableKey}/user/${recordId}`);
}

export { getUser };
