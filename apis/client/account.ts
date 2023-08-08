import { AxiosResponse } from 'axios';
import { SupportLanguageKorean } from 'fe-modules/models/lang';
import { client } from '../network';

export interface loginParams {
  email: string;
  password: string;
}

export interface loginResult {
  recordId: string;
  accessToken: string;
  refreshToken: string;
  primaryLanguage: SupportLanguageKorean;
  univ: string;
  userVisaStatus: 'NEW' | 'EXTENSION' | 'CHANGE';
}

export async function postLoginClient(params: loginParams): Promise<AxiosResponse<loginResult>> {
  return await client.post('/login', params);
}
