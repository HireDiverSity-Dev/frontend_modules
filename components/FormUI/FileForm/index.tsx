import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { useController } from 'react-hook-form';
import { File_FormUIData } from '@/models/FormUI/FormUIData';
import { UploadFileApi } from '@/remotes/form';
import { getCurrentDate } from '@/utils/function';
import ExampleImg from '../ExampleImg';
import { getFileType } from '../utils';
import { FormUIProps } from '@/models/FormUI/FormUI';
import { Auth } from '@/models/auth';
import FileUploadedImg from './FileUploadedImg';
import FileBrowse from './FileBrowse';
import FileText from './FileText';

interface FormOption {
  exampleImg?: boolean;
}

interface FileFormProps extends FormUIProps {
  options?: FormOption;
  auth: Auth;
}

export interface ImageObj {
  localPath: string;
  s3Path: string;
  name: string;
  type: 'image' | 'pdf';
  size: number;
  loading: boolean;
}

function FileForm({ form, uiSetting, options = { exampleImg: true }, lang, auth }: FileFormProps) {
  const formData = uiSetting.data as File_FormUIData;
  const curDate = getCurrentDate();

  const [imageList, setImageList] = useState<Array<ImageObj>>([]);
  const [imgCnt, setImgCnt] = useState(0);

  const { field } = useController({
    control: form.control,
    name: uiSetting.formKey,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  //input ref 관련
  const photoInput = useRef<HTMLInputElement>(null);
  const imgOnClick = () => {
    photoInput?.current?.click();
  };

  // 이미지 업로드 완료 시 loading state 변경
  const uploadComplete = useCallback(
    (fileName: string) => {
      setImageList((prevState) => {
        const updatedList = prevState.map((val, index) => {
          if (val.name !== fileName) {
            return val;
          } else {
            return { ...val, loading: false };
          }
        });
        return updatedList;
      });
    },
    [imageList],
  );

  // react-hook-form 등록
  useEffect(() => {
    field.onChange(imageList.map((val) => val.s3Path));
  }, [imageList]);

  // input 클릭 시 이미지 업로드
  const uploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    // input element의 onchange 결과값에서 target.file은 Array가 아닌 유사배열 객체
    if (e?.target?.files?.length) {
      let cnt = 0;

      const newImage = Array.from(e?.target?.files, (file) => {
        const fileType = getFileType(file);
        if (fileType === 'other') {
          return;
        }
        const objectUrl = URL.createObjectURL(file);
        const path = `temp/${auth.email}/${formData.s3path}/${curDate}_file${imgCnt + cnt}`;

        const imageObj: ImageObj = {
          localPath: objectUrl,
          s3Path: path,
          name: file.name,
          type: fileType,
          size: file.size,
          loading: false,
        };

        UploadFileApi(imageObj.s3Path, file, () => {
          uploadComplete(imageObj.name);
        });

        cnt++;
        return imageObj;
      });

      setImageList(imageList.concat(newImage as Array<ImageObj>));
      setImgCnt(imgCnt + cnt);
    }
  };

  //파일 삭제
  const deleteFile = (deleteKey: number): void => {
    setImageList(imageList.filter((val, key) => key !== deleteKey));
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {formData.imgSrc &&
        options.exampleImg &&
        formData.imgSrc.map((img: string, index: number) => {
          return <ExampleImg imgSrc={img} key={index} />;
        })}
      <input type="file" multiple style={{ display: 'none' }} ref={photoInput} onChange={uploadFile} />
      <FileBrowse lang={lang} onClick={imgOnClick} />
      <FileText lang={lang} />
      {imageList.map((image, index) => {
        return <FileUploadedImg data={image} deleteImage={deleteFile} imageKey={index} key={index} />;
      })}
    </Box>
  );
}

export default FileForm;
