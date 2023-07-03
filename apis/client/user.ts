import { AxiosResponse } from 'axios';
import { client } from '../network';

export interface userResetpwParams {
  curPassword: string;
  newPassword: string;
}

export async function postUserResetpwClient(params: userResetpwParams): Promise<AxiosResponse> {
  return await client.post('/user/resetPw', params);
}
