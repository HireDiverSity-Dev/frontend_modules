import React, { useRef } from 'react';
import SignBoard from 'fe-modules/components/FormUI/SignForm/SignBoard';
import SignSubmit from 'fe-modules/components/FormUI/SignForm/SignSubmit';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';
import SignatureCanvas from 'react-signature-canvas';

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
