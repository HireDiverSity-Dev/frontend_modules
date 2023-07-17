import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';
import applyAction from './applyAction';
import isConditionSatisfied from './isConditionSatisfied';

function makeNewRule(conditions: Array<FormUICondition>, rule: FormUIRule, watch: Record<string, any>) {
  conditions.forEach((condition) => {
    const satisfied = isConditionSatisfied(condition.triggers, rule, watch); // 조건 충족할 경우 액션 처리
    if (satisfied) {
      rule = applyAction(condition.action, rule);
    }
  });
  return rule;
}
export default makeNewRule;
