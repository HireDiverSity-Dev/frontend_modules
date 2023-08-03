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

  if (newUiSetting.data === undefined) {
    return <></>;
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

export default FormUI;
