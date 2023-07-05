import { AxiosResponse } from 'axios';
import { aws } from 'fe-modules/apis/network';

export async function getFormPageList(): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/formPage`);
}
export async function getFormPage(key: string): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/formPage/${key}`);
}
export async function postFormPage(item: any): Promise<AxiosResponse> {
  console.log(item);
  return await aws.post(`/dynamoDB/formPage`, item);
}
export async function patchFormPage(key: string, item: any): Promise<AxiosResponse> {
  return await aws.patch(`/dynamoDB/formPage/${key}`, item);
}
export async function deleteFormPage(key: string): Promise<AxiosResponse> {
  return await aws.delete(`/dynamoDB/formPage/${key}`);
}
