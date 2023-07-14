import makeNewRule from 'fe-modules/components/FormUI/makeNewRule';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';

// TODO: 매개변수 최적화

function isMovable(
  form: FormUIUseFormReturn,
  settings: FormUISetting[],
  pageConditions: Array<FormUICondition> | undefined,
  watch: Record<string, any>,
) {
  let tempMoveNext = true;
  settings.map((setting) => {
    const value = form.watch(setting.formKey);
    const { invalid } = form.getFieldState(setting.formKey);
    if (!setting.rule?.invisible) {
      if ((setting.rule?.required && value === undefined) || invalid) tempMoveNext = false;
    }
  });

  if (tempMoveNext && pageConditions && pageConditions.length > 0) {
    let pageRule: FormUIRule = {
      invisible: false,
    };
    pageRule = makeNewRule(pageConditions ?? [], pageRule, watch);
    tempMoveNext = pageRule.invisible ? false : true;
  }
  return tempMoveNext;
}

export default isMovable;
