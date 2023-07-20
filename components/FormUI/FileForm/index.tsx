import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import SubmitModal from 'fe-modules/components/FormPage/submit/SubmitModal';
import { getFileType } from 'fe-modules/components/FormUI/_checkFormUI/getFileType';
import FileBrowse from 'fe-modules/components/FormUI/FileForm/FileBrowse';
import FileText from 'fe-modules/components/FormUI/FileForm/FileText';
import FileUploadedImg from 'fe-modules/components/FormUI/FileForm/FileUploadedImg';
import fileUploadRequest from 'fe-modules/components/FormUI/FileForm/fileUploadRequest';
import { useModal } from 'fe-modules/hooks/useModal';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { File_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { useController } from 'react-hook-form';

export interface ImageObj {
  localPath: string;
  s3Path: string;
  name: string;
  type: 'image' | 'pdf';
  size: number;
  loading: boolean;
}

function FileForm({ form, uiSetting, lang, auth }: FormUIProps) {
  const formData = uiSetting.data as File_FormUIData;
  const { openModal } = useModal();

  const { field } = useController({
    control: form.control,
    name: uiSetting.formKey,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  const [imageList, setImageList] = useState<Array<ImageObj>>([]);
  const [imgCnt, setImgCnt] = useState(0);

  //input ref 관련
  const photoInput = useRef<HTMLInputElement>(null);
  const imgOnClick = () => {
    photoInput?.current?.click();
  };

  // 이미지 업로드 완료 시 loading state 변경
  const uploadComplete = useCallback(
    (fileName: string) => {
      setImageList((prevState) => {
        const updatedList = prevState.map((val) => {
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

  useEffect(() => {
    setImageList(field.value ?? []);
  }, []);

  // react-hook-form 등록
  useEffect(() => {
    if (imageList.length != 0) field.onChange(imageList);
  }, [imageList]);

  // input 클릭 시 이미지 업로드
  const uploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    // input element의 onchange 결과값에서 target.file은 Array가 아닌 유사배열 객체
    if (e?.target?.files?.length) {
      let cnt = 0;
      let newImage: ImageObj[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        try {
          const file = e.target.files[i];
          const fileType = getFileType(file);
          if (fileType === 'other') throw new Error("Can't upload this file type");
          let filePath = '';
          if (auth.email) filePath = auth.email; // 1순위 : 로그인 된 이메일
          else {
            const saveDirFormKey = form.getValues('saveDir');
            const saveDir = form.getValues(saveDirFormKey);
            if (saveDir?.email) filePath = saveDir.email; // 2순위 : 인증된 이메일
            else if (saveDir) filePath = saveDir; // 3순위 : 저장 경로
          }
          if (formData.s3Path) filePath += '/' + formData.s3Path;
          const imageObj = await fileUploadRequest(e.target.files[i], filePath, imgCnt + cnt);
          uploadComplete(imageObj.name);
          newImage.push(imageObj);
          cnt++;
        } catch (error: any) {
          try {
            openModal(
              <SubmitModal preset="실패" title="File upload Failed" body={error.message as string} button="Close" />,
            );
          } catch (modalError) {}
          console.error(error);
        }
      }
      setImageList(imageList.concat(newImage));
      setImgCnt(imgCnt + cnt);
    }
  };

  //파일 삭제
  const deleteFile = (deleteKey: number): void => {
    setImageList(imageList.filter((val, key) => key !== deleteKey));
  };

  return (
    <Box sx={{ width: '100%', display: uiSetting.rule?.invisible ? 'none' : '' }}>
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
