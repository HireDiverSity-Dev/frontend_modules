import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import { Trigger } from 'fe-modules/models/FormUI/FormUICondition';

function isConditionSatisfied(
  form: FormUIUseFormReturn,
  uiSettingsObject: { [key: string]: FormUISetting },
  triggers: Array<Trigger>,
) {
  let satisfied = true;
  triggers.forEach((trigger) => {
    const formValue = form.watch(trigger.FormItem_id);
    const formUiSetting = uiSettingsObject[trigger.FormItem_id];
    switch (trigger.operator) {
      case 'equal':
        if (`${formValue}` !== trigger.val) {
          satisfied = false;
        }
        break;
      case 'notEqual':
        if (`${formValue}` === trigger.val) {
          satisfied = false;
        }
        break;
      case 'contains':
        if (!formValue) {
          satisfied = false;
        } else {
          switch (typeof formValue) {
            case 'string':
              if (typeof formValue == 'string') {
                if (formValue.indexOf(trigger.val as string) < 0) {
                  satisfied = false;
                }
              }
              break;
            case 'object':
              if (!formValue.includes(trigger.val)) {
                satisfied = false;
              }
              break;
            default:
              satisfied = false;
          }
        }
        break;
      case 'notContains':
        if (formValue) {
          switch (typeof formValue) {
            case 'string':
              if (typeof formValue == 'string') {
                if (formValue.indexOf(trigger.val as string) >= 0) {
                  satisfied = false;
                }
              }
              break;
            case 'object':
              if (formValue.includes(trigger.val)) {
                satisfied = false;
              }
              break;
          }
        }
        break;
      case 'greaterThan':
        if (typeof formValue === 'number' && typeof trigger.val === 'number' && formValue <= trigger.val) {
          satisfied = false;
        }
        break;
      case 'lessorThan':
        if (typeof formValue === 'number' && typeof trigger.val === 'number' && formValue >= trigger.val) {
          satisfied = false;
        }
        break;
      case 'empty':
        if (
          typeof formValue !== 'boolean' &&
          formValue &&
          (!['object', 'string'].includes(typeof formValue) ||
            formValue.length > 0 ||
            Object.keys(formValue).length > 0)
        ) {
          satisfied = false;
        } else if (formValue !== undefined && formValue !== null) {
          satisfied = false;
        }
        break;
      case 'notEmpty':
        if (
          typeof formValue !== 'boolean' &&
          !(
            formValue &&
            (!['object', 'string'].includes(typeof formValue) ||
              formValue.length > 0 ||
              Object.keys(formValue).length > 0)
          )
        ) {
          satisfied = false;
        } else if (formValue === undefined || formValue === null) {
          satisfied = false;
        }
        break;
      case 'visible':
        if (formUiSetting?.rule?.invisible === true) {
          satisfied = false;
        }
        break;
      case 'invisible':
        if (formUiSetting?.rule?.invisible === undefined || formUiSetting?.rule?.invisible === false) {
          satisfied = false;
        }
        break;
    }
  });
  return satisfied;
}
export default isConditionSatisfied;
