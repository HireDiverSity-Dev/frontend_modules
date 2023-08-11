import { django } from '../network';

export async function getUnivList() {
  return await django.get(`/univ/`);
}

export async function getUniv(univ: string) {
  return await django.get(`/univ/${univ}/`);
}

export async function postUniv(univ: string, data: any) {
  return await django.post(`/univ/${univ}/`, data);
}

export async function patchUniv(univ: string, data: any) {
  return await django.patch(`/univ/${univ}/`, data);
}
