import { AxiosInstance } from 'axios';
import { clientRefresh } from 'fe-modules/apis/network';
import jwt_decode from 'jwt-decode';

interface Token {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

const refreshToken = async (auth: any) => {
  try {
    const res = await clientRefresh.post('/user/refreshToken', auth);
    if (res.status !== 200) {
      throw new Error('Refresh token failed');
    }
    localStorage.setItem('auth', JSON.stringify({ ...auth, ...res.data }));
    return res.data.accessToken as string;
  } catch (error) {
    console.log('logout');
    localStorage.removeItem('auth');
    location.reload();
    return '';
  }
};

const getAccessToken = async (auth: any) => {
  let accessToken = auth?.accessToken;
  if (!accessToken) {
    throw new Error('No accessToken in localStorage');
  }
  return accessToken as string;
};

const getAuth = () => {
  const storage = localStorage.getItem('auth');
  if (!storage) {
    throw new Error('No auth in localStorage');
  }
  const auth = JSON.parse(storage);
  return auth;
};

const clientSetToken = (client: AxiosInstance) => {
  client.interceptors.request.use(
    async function (config) {
      try {
        if (typeof document !== 'undefined') {
          const auth = getAuth();
          console.log('auth', auth);
          let accessToken = await getAccessToken(auth);
          console.log('accessToken', accessToken);
          const decodedAccessToken = jwt_decode<Token>(accessToken);
          if (Date.now() >= decodedAccessToken.exp * 1000) {
            console.log('AccessToken expired');
            accessToken = await refreshToken(auth);
          }
          config.headers.set('access_token', accessToken);
        }
      } catch (err) {
        console.log(err);
      }
      return config;
    },
    function (error) {
      console.log(error);
      return Promise.reject(error);
    },
  );
};

export { clientSetToken };
