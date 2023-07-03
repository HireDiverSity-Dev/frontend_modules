import privateHandler from 'fe-modules/apis/s3/privateHandler';
import publicHandler from 'fe-modules/apis/s3/publicHandler';

export const uploadFileToPublicS3 = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  try {
    const signedUrl = await publicHandler(path, file.type);
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
    const signedUrl = await privateHandler(path, file.type);
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
