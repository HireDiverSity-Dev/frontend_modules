import { RCCrawlingState } from '@/types/rc';
import { crawler } from '../network';

export async function getRCCrawlingList(startTime: number, endTime?: number, state?: RCCrawlingState) {
  const _endTime = endTime ?? new Date().getTime();
  const _state = state ?? 'all';

  return await crawler.get(`hi-korea/registeraton-numbers?state=${_state}&startTime=${startTime}&endTime=${_endTime}`);
}
