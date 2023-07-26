import makeNewRule from 'fe-modules/components/FormUI/_checkFormUI/getNewRule';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';

// TODO: 매개변수 최적화

function isMovable(pageConditions: Array<FormUICondition> | undefined, watch: Record<string, any>) {
  let canMoveNext = true;
  if (pageConditions && pageConditions.length > 0) {
    let pageRule: FormUIRule = {
      invisible: false,
    };
    pageRule = makeNewRule(pageConditions ?? [], pageRule, watch);
    canMoveNext = pageRule.invisible ? false : true;
  }
  return canMoveNext;
}

export default isMovable;
