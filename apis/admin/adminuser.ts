import { AxiosResponse } from 'axios';
import { admin } from '../network';

export interface signInParams {
  email: string;
  password: string;
}

export interface signInResult {
  adminUserId: number;
  email: string;
  accessToken: string;
  code?: string;
  message?: string;
  [key: string]: any;
}

export async function postSignInAdmin(params: signInParams): Promise<AxiosResponse<signInResult>> {
  return await admin.post('/admin/sign-in', params);
}

export async function postRegisterAdmin(params: signInParams): Promise<AxiosResponse> {
  return await admin.post('/admin/register', params);
}
