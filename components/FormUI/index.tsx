import React from 'react';
import getNewSetting from 'fe-modules/components/FormUI/_checkFormUI/getNewSetting';
import FormBody from 'fe-modules/components/FormUI/_elements/FormBody';
import FormBox from 'fe-modules/components/FormUI/_elements/FormBox';
import FormError from 'fe-modules/components/FormUI/_elements/FormError';
import FormSemiTitle from 'fe-modules/components/FormUI/_elements/FormSemiTitle';
import FormTitle from 'fe-modules/components/FormUI/_elements/FormTitle';
import ExampleImg from 'fe-modules/components/FormUI/ExampleImg';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Translation } from 'fe-modules/models/lang';
import { useWatch } from 'react-hook-form';

function FormUI({ form, uiSetting, lang, auth }: FormUIProps) {
  const watch = useWatch({ control: form.control });
  const newSetting = getNewSetting(uiSetting, watch);

  if (newSetting.data.type === 'signature') {
    newSetting.data = {
      ...newSetting.data,
      title: SignatureLabel.title,
      subtitle: SignatureLabel.subtitle,
    };
  }
  if (newSetting.rule?.invisible) {
    return <FormBody form={form} uiSetting={newSetting} lang={lang} auth={auth} />;
  }
  return (
    <FormBox>
      <FormTitle uiSetting={newSetting} lang={lang} />
      {form.formState.errors[newSetting.FormItem_id] && uiSetting.data.type !== 'checkbox' && (
        <FormError msg={'check your answer'} />
      )}
      <FormSemiTitle uiSetting={newSetting} lang={lang} />
      {newSetting.data.imgSrc &&
        newSetting.data.imgSrc.map((img: string, index: number) => {
          return <ExampleImg imgSrc={img} key={index} />;
        })}
      <FormBody form={form} uiSetting={newSetting} lang={lang} auth={auth} />
    </FormBox>
  );
}

const SignatureLabel: { [key: string]: Translation } = {
  title: {
    kr: '서명',
    zh: '签名',
    en: 'Signature',
  },
  subtitle: {
    kr: '동의하시면 서명(*여권 상 이름으로 서명)',
    zh: '同意的话请签名（*签护照上的英文姓名）',
    en: 'If you agree to all of the terms below, please select Agree and sign the e-signature',
  },
};

export default FormUI;
