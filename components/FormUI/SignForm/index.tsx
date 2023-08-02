import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import SignClear from 'fe-modules/components/FormUI/SignForm/SignClear';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';

const SignForm = ({ form, uiSetting, lang }: FormUIProps) => {
  const { field } = useController({
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  const sigCanvas = useRef() as React.MutableRefObject<SignatureCanvas>;

  const onChangeHandler = () => {
    if (sigCanvas.current) {
      const signature = sigCanvas.current.toDataURL('image/png');
      console.log(signature);
      field.onChange(signature);
    }
  };

  const clearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
    }
  };

  useEffect(() => {
    const canvasParent = document.getElementById('canvasParent');
    const canvas = document.querySelector('canvas');
    canvas?.setAttribute('width', (canvasParent?.offsetWidth || 0).toString());
    canvas?.setAttribute('height', (canvasParent?.offsetHeight || 0).toString());
  }, []);

  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        overflow: 'hidden',
        flexDirection: 'column',
        display: uiSetting.rule?.invisible ? 'none' : '',
      }}
    >
      <Box id="canvasParent" sx={{ width: '100%', bgcolor: '#00000010' }}>
        <SignatureCanvas
          ref={sigCanvas}
          backgroundColor="#00000000"
          canvasProps={{
            width: 500,
            height: 200,
          }}
          onEnd={onChangeHandler}
        />
      </Box>
      <FlexBox sx={{ width: '100%' }}>
        <SignClear lang={lang} onClick={clearSignature} />
      </FlexBox>
    </FlexBox>
  );
};

export default SignForm;
