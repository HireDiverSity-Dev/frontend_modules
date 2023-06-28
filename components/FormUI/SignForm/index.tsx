import React, { useRef } from 'react';
import { useController } from 'react-hook-form';
import { FormUIProps } from '@/models/FormUI/FormUI';
import SignatureCanvas from 'react-signature-canvas';
import SignBoard from '@/components/FormUI/SignForm/SignBoard';
import SignSubmit from '@/components/FormUI/SignForm/SignSubmit';

const SignForm = ({ form, uiSetting, lang }: FormUIProps) => {
  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  const sigCanvas = useRef<SignatureCanvas>(null);

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
    <div style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
      <SignBoard ref={sigCanvas} onChange={onChangeHandler} />
      <SignSubmit lang={lang} onClick={clearSignature} />
    </div>
  );
};

export default SignForm;
