import React, { useRef } from 'react';
import { Box } from '@mui/material';
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

  return (
    <div
      style={{
        justifyContent: 'center',
        overflow: 'hidden',
        display: uiSetting.rule?.invisible ? 'none' : 'flex',
      }}
    >
      <Box sx={{ width: 300 }}>
        <Box sx={{ bgcolor: '#00000010' }}>
          <SignatureCanvas
            ref={sigCanvas}
            backgroundColor="#00000000"
            canvasProps={{
              width: 300,
              height: 150,
            }}
            onEnd={onChangeHandler}
          />
        </Box>
      </Box>
      <SignClear lang={lang} onClick={clearSignature} />
    </div>
  );
};

export default SignForm;
