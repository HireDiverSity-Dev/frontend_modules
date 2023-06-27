import { AxiosResponse } from 'axios';
import { LangServer } from '@/models/lang';
import { client } from '../utils/network';

export interface LogInParams {
  email: string;
  password: string;
}

export interface LogInResult {
  recordId: string;
  accessToken: string;
  refreshToken: string;
  primaryLanguage: LangServer;
  univ: string;
  userVisaStatus: 'NEW' | 'EXTENSION' | 'CHANGE';
}

export async function LogInApi(params: LogInParams): Promise<AxiosResponse<LogInResult>> {
  return await client.post('/login', params);
}

export async function resetPasswordApi(email: string) {
  return await client.post('/resetPw/send', {}, { params: { email } });
}
