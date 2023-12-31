import { AxiosResponse } from 'axios';
import { aws } from 'fe-modules/apis/network';

export async function getListFromDynamoDB(table: string, additionalKeys?: string): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/${table}?additionalKeys=${additionalKeys ?? ''}`);
}
export async function getFromDynamoDB(table: string, key: string, additionalKeys?: string): Promise<AxiosResponse> {
  return await aws.get(`/dynamoDB/${table}/${key}?additionalKeys=${additionalKeys ?? ''}`);
}
export async function postFromDynamoDB(table: string, item: any): Promise<AxiosResponse> {
  return await aws.post(`/dynamoDB/${table}`, item);
}
export async function patchFromDynamoDB(table: string, key: string, item: any): Promise<AxiosResponse> {
  return await aws.patch(`/dynamoDB/${table}/${key}`, item);
}
export async function deleteFromDynamoDB(table: string, key: string): Promise<AxiosResponse> {
  return await aws.delete(`/dynamoDB/${table}/${key}`);
}
