import { client } from '../network';

export async function postVerificationSendClient(email: string, lang: string) {
  const url = `/verification/send?email=${email}&language=${lang}`;
  return await client.post(url);
}

export async function getVerificationConfirmClient(email: string, code: string) {
  const url = `/verification/confirm?email=${email}&code=${code}`;
  return await client.get(url);
}

export async function postResetPwClient(email: string) {
  const url = `/resetPw/send?email=${email}`;
  return await client.post(url);
}
