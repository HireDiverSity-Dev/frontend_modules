import { aws } from '../network';

export const fetcher = (url: string) => aws.get('/airtable' + url).then((res) => res.data);
