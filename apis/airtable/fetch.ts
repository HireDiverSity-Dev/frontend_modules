import { airtable } from '../network';

export const fetcher = (url: string) => airtable.get(url).then((res) => res.data);
