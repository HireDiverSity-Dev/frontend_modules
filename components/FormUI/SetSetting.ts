import makeNewRule from 'fe-modules/components/FormUI/makeNewRule';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { useWatch } from 'react-hook-form';

function SetSetting(form: FormUIUseFormReturn, uiSetting: FormUISetting): FormUISetting {
  const { control } = form;
  const watch = useWatch({
    control,
  });

  let newUiSetting = { ...uiSetting, disabled: false };
  let newRule = { ...uiSetting.rule };

  newRule = makeNewRule(uiSetting.conditions ?? [], newRule, watch);

  // 보이지 않을 경우 필수 처리 제거
  if (newRule?.invisible == true) {
    newRule.required = false;
  }

  return {
    ...newUiSetting,
    rule: newRule,
  };
}

export default SetSetting;
