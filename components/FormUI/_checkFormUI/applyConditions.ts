import { getRuleFormAction, getValueFormAction } from 'fe-modules/components/FormUI/_checkFormUI/getFromAction';
import isConditionSatisfied from 'fe-modules/components/FormUI/_checkFormUI/isConditionSatisfied';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';

function applyConditions(
  form: FormUIUseFormReturn,
  uiSettingsObject: { [key: string]: FormUISetting },
  uiSetting: FormUISetting,
): FormUISetting {
  // 조건 충족할 경우 액션 처리
  // 새 uiSetting 리턴
  let newUiSetting: FormUISetting = { ...uiSetting };
  newUiSetting.rule = { ...newUiSetting.rule, disabled: false };

  newUiSetting.conditions?.forEach((condition) => {
    const satisfied = isConditionSatisfied(form, uiSettingsObject, condition.triggers);
    if (satisfied) {
      newUiSetting.rule = getRuleFormAction(condition.action, { ...newUiSetting.rule } ?? {});
      const value = getValueFormAction(condition.action);
      console.log('value', value, form.getValues(uiSetting.FormItem_id));
      if (value !== undefined && form.getValues(uiSetting.FormItem_id) !== value)
        form.setValue(uiSetting.FormItem_id, value);
    }
  });

  // 보이지 않을 경우 필수 처리 제거
  if (newUiSetting?.rule.invisible == true) {
    newUiSetting.rule.required = false;
  }

  return {
    ...newUiSetting,
  };
}

export default applyConditions;
