import { aws } from 'fe-modules/apis/network';

async function postNewSupplement(recordId: string, docs: any) {
  const body = {
    recordId,
    docs,
  };
  return await aws.post('/airtable/new/supplement', body);
}

async function postExtendSupplement(recordId: string, docs: any) {
  const body = {
    recordId,
    docs,
  };
  return await aws.post('/airtable/extend/supplement', body);
}

export { postExtendSupplement, postNewSupplement };
