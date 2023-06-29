import axios from 'axios';
import { mainUrl } from 'fe-modules/apis/client/url';
import jwt_decode from 'jwt-decode';

interface Token {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

const refreshToken = async (auth: any) => {
  const res = await axios.post(mainUrl + '/user/refreshToken', auth);
  if (res.status === 200) {
    localStorage.setItem('auth', JSON.stringify({ ...auth, ...res.data }));
    return res.data.accessToken;
  } else {
    console.log('logout');
    localStorage.removeItem('auth');
    location.reload();
    return '';
  }
};

const getAccessToken = async () => {
  const storage = localStorage.getItem('auth');
  if (!storage) {
    throw new Error('No auth in localStorage');
  }
  const auth = JSON.parse(storage);
  let accessToken = auth?.accessToken;
  if (!accessToken) {
    throw new Error('No accessToken in localStorage');
  }
  const decodedAccessToken = jwt_decode<Token>(accessToken);
  if (Date.now() >= decodedAccessToken.exp * 1000) {
    console.log('AccessToken expired');
    accessToken = await refreshToken(auth);
  }
  return accessToken;
};

export { getAccessToken };
