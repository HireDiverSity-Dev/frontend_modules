import { AxiosResponse } from 'axios';
import { admin } from '../network';

export interface noticeResult {
  contents: string;
  isFixed: boolean;
  isImmediate: boolean;
  noticeIndex: number;
  title: string;
  writer: string;
}

export async function getNoticeAdmin(): Promise<AxiosResponse<noticeResult[]>> {
  return await admin.get('/notice');
}

export interface noticeParams {
  conten: string;
  isFixed: boolean;
  isImmediate: boolean;
  isInvisible: boolean;
  title: string;
  writer: string;
}

export async function postNoticeAdmin(params: noticeParams): Promise<AxiosResponse> {
  return await admin.post('/notice', params);
}

export async function patchNoticeAdmin(params: noticeParams, index: number): Promise<AxiosResponse> {
  return await admin.patch(`/notice/${index}`, params);
}
