import applyConditions from 'fe-modules/components/FormUI/_checkFormUI/applyConditions';
import { getNewUiSettingsObject } from 'fe-modules/components/FormUI/_checkFormUI/getUiSettings';
import FormBody from 'fe-modules/components/FormUI/_elements/FormBody';
import FormBox from 'fe-modules/components/FormUI/_elements/FormBox';
import FormError from 'fe-modules/components/FormUI/_elements/FormError';
import FormSemiTitle from 'fe-modules/components/FormUI/_elements/FormSemiTitle';
import FormTitle from 'fe-modules/components/FormUI/_elements/FormTitle';
import ExampleImg from 'fe-modules/components/FormUI/ExampleImg';
import { FormUIProps, FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { TitlelessFormUIDataTypeList } from 'fe-modules/models/FormUI/FormUIData';
import { Translation } from 'fe-modules/models/lang';

function FormUI({ form, uiSettings, uiSetting, lang, auth }: FormUIProps & { uiSettings?: Array<FormUISetting> }) {
  let newUiSetting: FormUISetting;
  if (uiSettings) {
    const newUiSettingsObject = getNewUiSettingsObject(form, uiSettings);
    newUiSetting = applyConditions(form, newUiSettingsObject, uiSetting);
  } else {
    newUiSetting = uiSetting;
  }

  if (newUiSetting.data.type === 'signature') {
    newUiSetting.data = {
      ...newUiSetting.data,
      title: SignatureLabel.title,
      subtitle: SignatureLabel.subtitle,
    };
  }
  if (newUiSetting.rule?.invisible) {
    return <FormBody form={form} uiSetting={newUiSetting} lang={lang} auth={auth} />;
  }
  return (
    <FormBox id={newUiSetting.FormItem_id}>
      {TitlelessFormUIDataTypeList.includes(newUiSetting.data.type) ? (
        <></>
      ) : (
        <>
          <FormTitle uiSetting={newUiSetting} lang={lang} />
          {form.formState.errors[newUiSetting.FormItem_id] && uiSetting.data.type !== 'checkbox' && (
            <FormError msg={'check your answer'} />
          )}
          <FormSemiTitle uiSetting={newUiSetting} lang={lang} />
        </>
      )}
      {newUiSetting.data.imgSrc &&
        newUiSetting.data.imgSrc.map((img: string, index: number) => {
          return <ExampleImg imgSrc={img} key={index} />;
        })}
      <FormBody form={form} uiSetting={newUiSetting} lang={lang} auth={auth} />
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
