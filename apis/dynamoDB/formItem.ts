import { AxiosResponse } from 'axios';
import { aws } from 'fe-modules/apis/network';

export async function getFormItemList(): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/formItem`);
}
export async function getFormItem(key: string): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/formItem/${key}`);
}
export async function postFormItem(item: any): Promise<AxiosResponse> {
  return await aws.post(`/dynamoDB/formItem`, item);
}
export async function patchFormItem(key: string, item: any): Promise<AxiosResponse> {
  return await aws.patch(`/dynamoDB/formItem/${key}`, item);
}
export async function deleteFormItem(key: string): Promise<AxiosResponse> {
  return await aws.delete(`/dynamoDB/formItem/${key}`);
}
