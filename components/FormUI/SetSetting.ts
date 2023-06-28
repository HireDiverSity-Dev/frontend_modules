import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { FieldValues, UseFormReturn } from 'react-hook-form';

function SetSetting(form: FormUIUseFormReturn, uiSetting: FormUISetting): FormUISetting {
  const { control } = form;
  const watch = useWatch({
    control,
  });

  let newUiSetting = { ...uiSetting, disabled: false };
  let newRule = { ...uiSetting.rule };

  uiSetting.conditions?.forEach((conditions) => {
    // 조건 충족 여부 확인
    let satisfied = true;
    conditions.triggers.forEach((trigger) => {
      const value = watch[trigger.formKey];

      switch (trigger.operator) {
        case 'equal':
          if (`${value}` !== trigger.val) {
            satisfied = false;
          }
          break;
        case 'notEqual':
          if (`${value}` === trigger.val) {
            satisfied = false;
          }
          break;
        case 'contains':
          if (!value) {
            satisfied = false;
          } else {
            switch (typeof value) {
              case 'string':
                if (typeof value == 'string') {
                  if (value.indexOf(trigger.val as string) < 0) {
                    satisfied = false;
                  }
                }
                break;
              case 'object':
                if (!value.includes(trigger.val)) {
                  satisfied = false;
                }
                break;
              default:
                satisfied = false;
            }
          }
          break;
        case 'notContains':
          if (value) {
            switch (typeof value) {
              case 'string':
                if (typeof value == 'string') {
                  if (value.indexOf(trigger.val as string) >= 0) {
                    satisfied = false;
                  }
                }
                break;
              case 'object':
                if (value.includes(trigger.val)) {
                  satisfied = false;
                }
                break;
            }
          }
          break;
        case 'greaterThan':
          if (typeof value === 'number' && trigger.val && value <= trigger.val) {
            satisfied = false;
          }
          break;
        case 'lessorThan':
          if (typeof value === 'number' && trigger.val && value >= trigger.val) {
            satisfied = false;
          }
          break;
        case 'empty':
          if (
            typeof value !== 'boolean' &&
            value &&
            (!['object', 'string'].includes(typeof value) || value.length > 0 || Object.keys(value).length > 0)
          ) {
            satisfied = false;
          } else if (value !== undefined && value !== null) {
            satisfied = false;
          }
          break;
        case 'notEmpty':
          if (
            typeof value !== 'boolean' &&
            !(
              value &&
              (!['object', 'string'].includes(typeof value) || value.length > 0 || Object.keys(value).length > 0)
            )
          ) {
            satisfied = false;
          } else if (value === undefined || value === null) {
            satisfied = false;
          }
          break;
        case 'visible':
          if (!newRule?.invisible) {
            satisfied = false;
          }
          break;
        case 'invisible':
          if (!newRule?.invisible) {
            satisfied = false;
          }
          break;
      }
    });

    // 조건 충족할 경우 액션 처리
    if (satisfied) {
      switch (conditions.action.action) {
        case 'show':
          newRule = {
            ...newRule,
            invisible: false,
          };
          break;
        case 'hide':
          newRule = {
            ...newRule,
            invisible: true,
          };
          break;
        case 'required':
          newRule = {
            ...newRule,
            required: true,
          };
          break;
        case 'notRequired':
          newRule = {
            ...newRule,
            required: false,
          };
          break;
        default:
          newRule = { ...newRule };
          break;
      }
    }

    // 보이지 않을 경우 필수 처리 제거
    if (newRule?.invisible == true) {
      newRule.required = false;
    }
  });

  return {
    ...newUiSetting,
    rule: newRule,
  };
}

export default SetSetting;
