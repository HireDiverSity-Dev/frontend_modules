import client from '..';

interface Fingerprint {
  reservationDate: string;
  reservationTime: string;
  imgUrl: string;
}

export async function postFingerprintToClient(data: Fingerprint) {
  try {
    const res = await client.post('/reservation/fingerprint/register', data);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function patchFingerprintToClient(reserveId: string, data: Fingerprint) {
  try {
    const res = await client.patch(`/reservation/fingerprint/${reserveId}`, data);
    return res;
  } catch (err) {
    console.log('Error', err);
  }
}
