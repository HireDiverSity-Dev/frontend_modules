import { getS3Client } from '../network';

export const UploadFilePublicApi = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  const body = {
    name: path,
    type: file.type,
  };

  try {
    // 1단계 : signed url 가져오기
    const urlRes = await PublicS3Client.post('/signedUrl', body);
    const signedUrl = urlRes.data;

    console.log(urlRes);

    // 2단계 : 가져온 url로 put 요청 보내기
    // 이미 파일 이름이나 경로 등은 url 받아올 때 지정을 다 해놨으므로,
    // image 파일 객체와 Content-type 정보만 넣어서 보냄
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-type': file.type,
      },
    });
    if (callbackFunc) {
      callbackFunc();
    }
  } catch (err) {
    console.log(err);
  }
};

export const UploadFilePrivateApi = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  const body = {
    name: path,
    type: file.type,
  };

  try {
    // 1단계 : signed url 가져오기
    const urlRes = await PrivateS3Client.post('/signedUrl', body);
    const signedUrl = urlRes.data;

    console.log(urlRes);

    // 2단계 : 가져온 url로 put 요청 보내기
    // 이미 파일 이름이나 경로 등은 url 받아올 때 지정을 다 해놨으므로,
    // image 파일 객체와 Content-type 정보만 넣어서 보냄
    await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-type': file.type,
      },
    });
    if (callbackFunc) {
      callbackFunc();
    }
  } catch (err) {
    console.log(err);
  }
};
