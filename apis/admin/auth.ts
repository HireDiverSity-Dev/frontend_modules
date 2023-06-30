import { AxiosResponse } from 'axios';
import { admin } from '../network';

export interface LogInParams {
  email: string;
  password: string;
}

export interface LogInResult {
  adminUserId: number;
  email: string;
  accessToken: string;
  code?: string;
  message?: string;
  [key: string]: any;
}

export async function LogInApi(params: LogInParams): Promise<AxiosResponse<LogInResult>> {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  return await admin.post('/admin/sign-in', params, config);
}
