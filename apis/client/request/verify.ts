import client from '..';

export async function SendVerificationEmail(email: string, lang: string) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `verification/send?email=${email}&language=${lang}`;
  return await client.post(url, config);
}

export async function ConfirmVerificationCode(email: string, code: string) {
  console.log(email, code);
  const config = {
    headers: { 'Content-Type': 'application/json' },
  };
  const url = `verification/confirm?email=${email}&code=${code}`;
  return await client.get(url, config);
}
