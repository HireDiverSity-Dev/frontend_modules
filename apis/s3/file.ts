import { aws } from 'fe-modules/apis/network';

export const uploadFileToPublicS3 = async (path: string, file: File) => {
  const res = await aws.post('/s3/public/signedUrl', {
    key: path,
    type: file.type,
  });
  const signedUrl = res.data.signedUrl;
  console.log(signedUrl);

  const uploadRes = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-type': file.type,
    },
  });
  if (uploadRes.status !== 200) throw new Error('upload failed');
  return uploadRes;
};

export const uploadFileToPrivateS3 = async (path: string, file: File) => {
  const res = await aws.post('/s3/private/signedUrl', {
    key: path,
    type: file.type,
  });
  const signedUrl = res.data.signedUrl;
  console.log(signedUrl);

  const uploadRes = await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-type': file.type,
    },
  });
  if (uploadRes.status !== 200) throw new Error('upload failed');
  return uploadRes;
};
