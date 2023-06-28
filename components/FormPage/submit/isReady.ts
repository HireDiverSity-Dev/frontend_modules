import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';

export default function isReady(conditions: Array<FormUICondition> | undefined, watch: any) {
  let hideButton = false;
  if (conditions === undefined) {
    return hideButton;
  }

  conditions.forEach((curCondition) => {
    if (!hideButton) {
      let tmp = true;
      curCondition.triggers?.forEach((trigger) => {
        const curValue = watch(trigger.formKey);
        switch (trigger.operator) {
          case 'equal':
            if (`${curValue}` !== trigger.val) {
              tmp = false;
            }
            break;
          case 'notEqual':
            if (`${curValue}` === trigger.val) {
              tmp = false;
            }
            break;
          case 'contains':
            if (!curValue) {
              tmp = false;
            } else {
              switch (typeof curValue) {
                case 'string':
                  if (typeof curValue == 'string') {
                    if (curValue.indexOf(trigger.val as string) < 0) {
                      tmp = false;
                    }
                  }
                  break;
                case 'object':
                  if (!curValue.includes(trigger.val)) {
                    tmp = false;
                  }
                  break;
                default:
                  tmp = false;
              }
            }
            break;
          case 'notContains':
            if (curValue) {
              switch (typeof curValue) {
                case 'string':
                  if (typeof curValue == 'string') {
                    if (curValue.indexOf(trigger.val as string) >= 0) {
                      tmp = false;
                    }
                  }
                  break;
                case 'object':
                  if (curValue.includes(trigger.val)) {
                    tmp = false;
                  }
                  break;
              }
            }
            break;
          case 'greaterThan':
            if (
              typeof curValue === 'number' &&
              trigger.val &&
              typeof trigger.val === 'number' &&
              curValue <= trigger.val
            ) {
              tmp = false;
            }
            break;
          case 'lessorThan':
            if (
              typeof curValue === 'number' &&
              trigger.val &&
              typeof trigger.val === 'number' &&
              curValue >= trigger.val
            ) {
              tmp = false;
            }
            break;
          case 'empty':
            if (
              typeof curValue != 'boolean' &&
              curValue &&
              (!['object', 'string'].includes(typeof curValue) ||
                curValue.length > 0 ||
                Object.keys(curValue).length > 0)
            ) {
              tmp = false;
            } else if (curValue !== undefined && curValue !== null && curValue !== '') {
              tmp = false;
            }
            break;
          case 'notEmpty':
            if (
              typeof curValue != 'boolean' &&
              !(
                curValue &&
                (!['object', 'string'].includes(typeof curValue) ||
                  curValue.length > 0 ||
                  Object.keys(curValue).length > 0)
              )
            ) {
              tmp = false;
            } else if (curValue === undefined || curValue === null) {
              tmp = false;
            }
            break;
        }
      });
      hideButton = hideButton || tmp;
    }
  });
  return hideButton;
}
