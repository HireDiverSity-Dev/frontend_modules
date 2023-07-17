import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import getNewRule from './getNewRule';

function getNewSetting(uiSetting: FormUISetting, watch: Record<string, any>): FormUISetting {
  let newUiSetting = { ...uiSetting, disabled: false };
  let newRule = { ...uiSetting.rule };

  newRule = getNewRule(uiSetting.conditions ?? [], newRule, watch);

  // 보이지 않을 경우 필수 처리 제거
  if (newRule?.invisible == true) {
    newRule.required = false;
  }

  return {
    ...newUiSetting,
    rule: newRule,
  };
}

export default getNewSetting;
