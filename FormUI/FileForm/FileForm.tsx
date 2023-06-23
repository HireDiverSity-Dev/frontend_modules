import React, { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { useController } from 'react-hook-form';
import { authAtom } from '@/atoms/authAtom';
import { FileFormObj } from '@/models/form/formItem';
import { Translation } from '@/models/lang';
import { UploadFileApi } from '@/remotes/form';
import { getCurrentDate } from '@/utils/function';
import { FormProps } from '..';
import ExampleImg from '../ExampleImg';
import { getFileType } from '../utils';
import UploadedImg from './UploadedImg';

interface FormOption {
  exampleImg?: boolean;
}

interface FileFormProps extends FormProps {
  options?: FormOption;
}

export interface ImageObj {
  localPath: string;
  s3Path: string;
  name: string;
  type: 'image' | 'pdf';
  size: number;
  loading: boolean;
}

function FileForm({ pageForm, setting, options = { exampleImg: true }, lang }: FileFormProps) {
  const formData = setting.formData as FileFormObj;
  const [auth] = useAtom(authAtom);
  const curDate = getCurrentDate();

  const [imageList, setImageList] = useState<Array<ImageObj>>([]);
  const [imgCnt, setImgCnt] = useState(0);

  const { field } = useController({
    control: pageForm.control,
    name: setting.formKey,
    rules: setting.rules,
  });

  //input ref 관련
  const photoInput = useRef<HTMLInputElement>(null);
  const imgClick = () => {
    photoInput?.current?.click();
  };

  // 이미지 업로드 완료 시 loading state 변경
  const uploadComplete = useCallback(
    (fileName: string) => {
      setImageList((prevState) => {
        //console.log(fileName, prevState);
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
    //console.log(imageList);
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
          // 지원되지 않는 파일 타입 모달창 열기
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
      {formData?.imgSrc &&
        options.exampleImg &&
        formData?.imgSrc.map((img: string, index: number) => <ExampleImg imgSrc={img} key={index} />)}
      <input type="file" multiple style={{ display: 'none' }} ref={photoInput} onChange={uploadFile} />
      <Box onClick={imgClick} sx={styles.container}>
        <CloudUploadIcon fontSize="large" />
        <Typography>{Label.파일찾기[lang as keyof Translation]}</Typography>
      </Box>
      <Typography sx={{ fontSize: '14px', color: '#909090', mt: 0.5, mb: 2 }}>
        {Label.유의사항[lang as keyof Translation]}
      </Typography>
      {imageList.map((image, index) => {
        return <UploadedImg data={image} deleteImage={deleteFile} imageKey={index} key={index} />;
      })}
    </Box>
  );
}

export default FileForm;

const styles = {
  container: {
    width: '100%',
    aspectRatio: '5/2',
    backgroundColor: '#f2f2f2',
    border: '2px dashed #cecece',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Label: { [key: string]: Translation } = {
  파일찾기: {
    kr: '파일 선택',
    zh: '浏览文件',
    en: 'Browse Files',
  },
  유의사항: {
    kr: 'jpg, jpeg, png 와 pdf 파일만 올릴 수 있습니다',
    zh: '只能上传 jpg、jpeg、png 和 pdf 文件',
    en: 'Only jpg, jpeg, png, and pdf files can be uploaded.',
  },
};
