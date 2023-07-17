import { ChangeEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { uploadFileToPrivateS3 } from 'fe-modules/apis/s3/file';
import { getFileType } from 'fe-modules/components/FormUI/_checkFormUI/getFileType';
import ExampleImg from 'fe-modules/components/FormUI/ExampleImg';
import FileBrowse from 'fe-modules/components/FormUI/FileForm/FileBrowse';
import FileText from 'fe-modules/components/FormUI/FileForm/FileText';
import FileUploadedImg from 'fe-modules/components/FormUI/FileForm/FileUploadedImg';
import { Auth } from 'fe-modules/models/auth';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { File_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { getCurrentDate } from 'fe-modules/utils/date';
import { useController } from 'react-hook-form';

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

  const { field, formState } = useController({
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
        const file = e.target.files[i];
        const fileType = getFileType(file);
        if (fileType === 'other') {
          continue;
        }
        const objectUrl = URL.createObjectURL(file);
        const curDate = getCurrentDate();
        const path = `temp/${auth.email}/${formData.s3path}/${curDate}_file${imgCnt + cnt}`;

        const imageObj: ImageObj = {
          localPath: objectUrl,
          s3Path: path,
          name: file.name,
          type: fileType,
          size: file.size,
          loading: false,
        };

        await uploadFileToPrivateS3(imageObj.s3Path, file, () => {
          uploadComplete(imageObj.name);
        });

        newImage.push(imageObj);
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
