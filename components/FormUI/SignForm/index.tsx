import React, { useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
//@ts-ignore
import SignatureCanvas from 'react-signature-canvas';
import { Translation } from '@/models/lang';
import { FormProps } from '..';

const SignForm = ({ pageForm, setting, lang }: FormProps) => {
  const { field } = useController({
    name: setting.formKey,
    control: pageForm.control,
    rules: setting.rules,
  });

  const sigCanvas = useRef(null);

  const clearSignature = () => {
    if (sigCanvas.current) {
      //@ts-ignore
      sigCanvas.current.clear();
    }
  };

  const onChangeHandler = () => {
    if (sigCanvas.current) {
      //@ts-ignore
      const signature = sigCanvas.current.toDataURL('image/png');
      console.log(signature);
      field.onChange(signature);
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle2" mb={1}>
        {Label.타이틀[lang]}
      </Typography>
      <Typography variant="body1" mb={1} px={1} sx={{ wordBreak: 'break-all' }}>
        {Label.본문[lang]}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
        <Box sx={{ width: 300 }}>
          <Box sx={{ bgcolor: '#00000010' }}>
            <SignatureCanvas
              ref={sigCanvas}
              backgroundColor="#00000000"
              canvasProps={{
                width: 300,
                height: 150,
              }}
              onEnd={() => onChangeHandler()}
            />
          </Box>
          <Button sx={{ float: 'right', color: 'grey' }} onClick={clearSignature}>
            {Label.초기화[lang as keyof Translation]}
          </Button>
        </Box>
      </div>
    </Box>
  );
};

const Label: { [key: string]: Translation } = {
  타이틀: {
    kr: '서명',
    zh: '签名',
    en: 'Signature',
  },
  본문: {
    kr: '동의하시면 서명(*여권 상 이름으로 서명)',
    zh: '同意的话请签名（*签护照上的英文姓名）',
    en: 'If you agree to all of the terms below, please select Agree and sign the e-signature',
  },
  초기화: {
    kr: 'clear',
    zh: '擦除',
    en: 'clear',
  },
};

export default SignForm;
