import { client, api2 } from "../network";

export async function postVerificationSendClient(email: string, lang: string) {
  const url = `/verification/send?email=${email}&language=${lang}`;
  return await client.post(url);
}

export async function getVerificationConfirmClient(
  email: string,
  code: string
) {
  const url = `/verification/confirm?email=${email}&code=${code}`;
  return await client.get(url);
}

export async function postResetPwClient(email: string) {
  const url = `/resetPw/send?email=${email}`;
  return await client.post(url);
}

export async function getEmailVerificationCodeWithAPI2(
  email: string,
  langCode: "en" | "ko" | "zh" | "ja" | "vi"
) {
  const url = `/api/user/email-verification?email=${email}&langCode=${langCode}`;
  return await api2.get(url);
}

export async function confirmEmailVerificationCodeWithAPI2(
  email: string,
  verificationCode: string
) {
  const url = `/api/user/email-verification`;
  return await api2.post(url, {
    email,
    verificationCode,
    verifyTime: new Date().getTime() / 1000,
  });
}
