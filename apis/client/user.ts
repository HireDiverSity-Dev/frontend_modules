import { AxiosResponse } from 'axios';
import { SupportLanguageKorean } from 'fe-modules/models/lang';
import { client } from '../network';

export interface userResetpwParams {
  curPassword: string;
  newPassword: string;
}

export async function postUserResetpwClient(params: userResetpwParams): Promise<AxiosResponse> {
  return await client.post('/user/resetPw', params);
}

export interface userStatusResult {
  primaryLanguage: SupportLanguageKorean;
  univ: string;
  status: string;
}

export async function getUserStatusClient(access_token: string): Promise<AxiosResponse<userStatusResult>> {
  return await client.get(`/user/status`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function getUserRecordIdClient(access_token: string): Promise<AxiosResponse<string>> {
  return await client.get(`/user/recordId`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export async function getUserVisaStatusClient(access_token: string): Promise<
  AxiosResponse<{
    userVisaStatus: 'NEW' | 'EXTENSION' | 'CHANGE';
  }>
> {
  return await client.get(`/user/visaStatus`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
