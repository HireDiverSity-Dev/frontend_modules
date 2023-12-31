import { ChangeEventHandler, useCallback, useRef, useState } from 'react';
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
    name: uiSetting.FormItem_id,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  const [imageList, setImageList] = useState<Array<ImageObj>>(field.value ?? []);
  const setImageListWithField = (newImageList: Array<ImageObj>) => {
    setImageList(newImageList);
    if (newImageList.length === 0) field.onChange(undefined);
    else field.onChange(newImageList);
    field.onBlur();
  };
  const [imgCnt, setImgCnt] = useState(0);

  //input ref 관련
  const photoInput = useRef<HTMLInputElement>(null);
  const imgOnClick = () => {
    photoInput?.current?.click();
  };

  // 이미지 업로드 완료 시 loading state 변경
  const uploadComplete = useCallback(
    (fileName: string) => {
      const newImageList = imageList.map((val) => {
        if (val.name !== fileName) {
          return val;
        } else {
          return { ...val, loading: false };
        }
      });
      setImageListWithField(newImageList);
    },
    [imageList],
  );

  // input 클릭 시 이미지 업로드
  const uploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    // input element의 onchange 결과값에서 target.file은 Array가 아닌 유사배열 객체
    if (e?.target?.files?.length) {
      let cnt = 0;
      let newImage: ImageObj[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        try {
          const file = e.target.files[i];
          const fileType = await getFileType(file);
          if (fileType === 'other') throw new Error("Can't upload this file type");
          let filePath = '';
          if (auth.email && typeof auth.email === 'string' && auth.email !== '')
            filePath = auth.email; // 1순위 : 로그인 된 이메일
          else {
            const saveDirFormItem_id = form.getValues('saveDir');
            if (saveDirFormItem_id !== undefined && typeof saveDirFormItem_id === 'string') {
              const saveDir = form.getValues(saveDirFormItem_id);
              if (saveDir !== undefined && typeof saveDir === 'string') filePath = saveDir; // 2순위 : 인증된 이메일 , 3순위 : 세팅된 saveDir
            }
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
      setImageListWithField(imageList.concat(newImage));
      setImgCnt(imgCnt + cnt);
    }
  };

  //파일 삭제
  const deleteFile = (deleteKey: number): void => {
    setImageListWithField(imageList.filter((val, key) => key !== deleteKey));
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
