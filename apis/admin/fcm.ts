import { AxiosResponse } from 'axios';
import { admin } from '../network';

interface fcmUserInfo {
  email: string;
  token: string;
}

export interface fcmPushParams {
  body: string;
  fcmtype: 'ENTIRE' | 'PERSONAL' | 'UNIV';
  title: string;
  userInfoList: fcmUserInfo[];
}

export interface fcmPushResult {
  successCount: number;
  failureCount: number;
}

export async function postFcmPushAdmin(params: fcmPushParams): Promise<AxiosResponse> {
  return await admin.post('/fcm/push', params);
}

export async function getFcmTokenAdmin(email: string): Promise<AxiosResponse<any>> {
  return await admin.get('/fcm/token?email=' + email);
}
