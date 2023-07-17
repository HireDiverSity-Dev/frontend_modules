import { uploadFileToPrivateS3 } from 'fe-modules/apis/s3/file';
import { getFileType } from 'fe-modules/components/FormUI/_checkFormUI/getFileType';
import { ImageObj } from 'fe-modules/components/FormUI/FileForm/index';
import { getCurrentDate } from 'fe-modules/utils/date';
import { getRandomString } from 'fe-modules/utils/function';

async function fileUploadRequest(file: File, filePath: string, fileNumber: number) {
  const fileType = getFileType(file);
  if (fileType === 'other') throw new Error('지원하지 않는 파일 형식입니다.');
  const objectUrl = URL.createObjectURL(file);
  const curDate = getCurrentDate();
  const tag = getRandomString();
  const path = `temp${filePath}/${curDate}_file_${tag}_${String(fileNumber).padStart(2, '0')}`;

  const imageObj: ImageObj = {
    localPath: objectUrl,
    s3Path: path,
    name: file.name,
    type: fileType,
    size: file.size,
    loading: false,
  };

  await uploadFileToPrivateS3(imageObj.s3Path, file);
  return imageObj;
}

export default fileUploadRequest;
