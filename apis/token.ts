import { AxiosError, AxiosInstance } from 'axios';
import jwt_decode from 'jwt-decode';

interface Token {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

const refreshToken = async (client: AxiosInstance, auth: any) => {
  const res = await client.post('/user/refreshToken', auth);
  if (res.status === 200) {
    localStorage.setItem('auth', JSON.stringify({ ...auth, ...res.data }));
    return res.data.accessToken as string;
  } else {
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
      if (typeof document !== 'undefined') {
        const auth = getAuth();
        let accessToken = await getAccessToken(auth);
        const decodedAccessToken = jwt_decode<Token>(accessToken);
        if (Date.now() >= decodedAccessToken.exp * 1000) {
          console.log('AccessToken expired');
          accessToken = await refreshToken(client, auth);
        }
        config.headers.set('access_token', accessToken);
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError) {
      if (error?.response?.status) {
        const status = error?.response?.status;
        if (status && status < 500) {
          console.log(error.response);
          return error.response;
        }
      }
      return Promise.reject(error);
    },
  );
};

export { clientSetToken };
