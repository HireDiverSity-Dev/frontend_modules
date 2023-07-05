import { aws } from 'fe-modules/apis/network';

export const uploadFileToPublicS3 = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  try {
    const res = await aws.post('/s3/public/signedUrl', {
      key: path,
      type: file.type,
    });
    const signedUrl = res.data.signedUrl;
    console.log(signedUrl);

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

export const uploadFileToPrivateS3 = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  try {
    const res = await aws.post('/s3/private/signedUrl', {
      key: path,
      type: file.type,
    });
    const signedUrl = res.data.signedUrl;
    console.log(signedUrl);

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
