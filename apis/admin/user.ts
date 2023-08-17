import { AxiosResponse } from 'axios';
import { admin } from '../network';

interface getUserResult {
  [key: string]: any;
}
export async function getUserAdmin(): Promise<AxiosResponse<getUserResult[]>> {
  return await admin.get('/user');
}
interface postUserAdminParams {
  emails: string[];
}
export async function postUserAdmin(params: postUserAdminParams): Promise<AxiosResponse<getUserResult[]>> {
  return await admin.post('/user', params);
}

interface patchUserAdminParams {
  email: string;
  recordId: string;
}
export async function patchUserAdmin(params: patchUserAdminParams): Promise<AxiosResponse> {
  return await admin.patch(`/user?email=${params.email}&recordId=${params.recordId}`);
}

export interface userChangeVisaStatusParams {
  email: string;
  newVisaStatus: 'NEW' | 'EXTENSION' | 'CHANGE';
}
export async function patchUserChangeVisaStatusAdmin(params: userChangeVisaStatusParams): Promise<AxiosResponse> {
  return await admin.patch('/user/changeVisaStatus', params);
}

interface UserInfoParams {
  birth: string;
  recordId: string;
  email: string;
  univ: string;
  userStatus: string;
  userVisaStatus: 'NEW' | 'EXTENSION' | 'CHANGE';
}
export async function patchUserInfoAdmin(params: UserInfoParams) {
  return await admin.patch('/user/info', params);
}

export async function patchRepasswordAdmin(email: string) {
  return await admin.patch(`/user/repassword?email=${email}`);
}

// Todo: Swagger 를 통해 더 구현해야할 api가 남아있습니다.
