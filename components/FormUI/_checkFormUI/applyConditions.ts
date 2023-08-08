import { getRuleFormAction, getValueFormAction } from 'fe-modules/components/FormUI/_checkFormUI/getFromAction';
import isConditionSatisfied from 'fe-modules/components/FormUI/_checkFormUI/isConditionSatisfied';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';

function applyConditions(
  form: FormUIUseFormReturn,
  uiSettingsObject: { [key: string]: FormUISetting },
  uiSetting: FormUISetting,
): FormUISetting {
  // 조건 충족할 경우 액션 처리
  // 새 uiSetting 리턴
  let newRule: FormUIRule = { ...uiSetting.rule, disabled: false };
  newRule.wasInvisible = newRule.invisible;
  newRule.wasRequired = newRule.required;

  for (const condition of uiSetting.conditions ?? []) {
    const satisfied = isConditionSatisfied(form, uiSettingsObject, condition.triggers);
    if (satisfied) {
      newRule = getRuleFormAction(condition.action, newRule);
      const value = getValueFormAction(condition.action);
      if (value !== undefined && form.getValues(uiSetting.FormItem_id) !== value)
        form.setValue(uiSetting.FormItem_id, value);
      break;
    } else {
      newRule.invisible = newRule.wasInvisible;
      newRule.required = newRule.wasRequired;
    }
  }

  // 보이지 않을 경우 필수 처리 제거
  if (newRule.invisible == true) {
    newRule.required = false;
  }
  return {
    ...uiSetting,
    rule: newRule,
  };
}

export default applyConditions;
