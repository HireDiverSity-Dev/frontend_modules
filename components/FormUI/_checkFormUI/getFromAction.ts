import { Action } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';

function getValueFormAction(action: Action) {
  switch (action.action) {
    case 'setValue':
      return action.val;
    default:
      return undefined;
  }
}

function getRuleFormAction(action: Action, rule: FormUIRule) {
  switch (action.action) {
    case 'show':
      rule = {
        ...rule,
        invisible: false,
      };
      break;
    case 'hide':
      rule = {
        ...rule,
        invisible: true,
      };
      break;
    case 'required':
      rule = {
        ...rule,
        required: true,
      };
      break;
    case 'notRequired':
      rule = {
        ...rule,
        required: false,
      };
      break;
    default:
      rule = { ...rule };
      break;
  }
  return rule;
}

export { getRuleFormAction, getValueFormAction };
