import s3 from '..';

const postFileToS3 = async (path: string, file: File, callbackFunc?: (() => void) | undefined) => {
  const body = {
    name: path,
    type: file.type,
  };

  try {
    const urlRes = await s3.post('/signedUrl', body);
    const signedUrl = urlRes.data;

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

export { postFileToS3 };
