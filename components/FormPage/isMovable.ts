import { getRuleFormAction } from 'fe-modules/components/FormUI/_checkFormUI/getFromAction';
import isConditionSatisfied from 'fe-modules/components/FormUI/_checkFormUI/isConditionSatisfied';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';

// TODO: 매개변수 최적화
function isMovable(
  form: FormUIUseFormReturn,
  uiSettingsObject: { [key: string]: FormUISetting },
  pageConditions: Array<FormUICondition> | undefined | null,
) {
  let canMoveNext = true;
  if (pageConditions && pageConditions.length > 0) {
    let pageRule: FormUIRule = {
      invisible: false,
    };

    pageConditions?.forEach((condition) => {
      const satisfied = isConditionSatisfied(form, uiSettingsObject, condition.triggers);
      if (satisfied) {
        pageRule = getRuleFormAction(condition.action, pageRule);
      }
    });

    canMoveNext = pageRule.invisible ? false : true;
  }
  return canMoveNext;
}

export default isMovable;
