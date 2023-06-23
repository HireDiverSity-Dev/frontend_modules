import React from 'react';
import { useWatch } from 'react-hook-form';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormSettings } from '@/models/form/formPage';

function SetSetting(pageForm: UseFormReturn<FieldValues, any>, setting: FormSettings) {
  //
  const { control } = pageForm;
  const watch = useWatch({
    control,
  });

  let newSettings = { ...setting, disabled: false };
  let newRules = { ...setting.rules };

  setting.condition?.forEach((condition) => {
    // 조건 충족 여부 확인
    let satisfied = true;
    condition.triggers.forEach((trigger) => {
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
          if (!newRules?.invisible) {
            satisfied = false;
          }
          break;
        case 'invisible':
          if (!newRules?.invisible) {
            satisfied = false;
          }
          break;
      }
    });

    // 조건 충족할 경우 액션 처리
    if (satisfied) {
      switch (condition.action.action) {
        case 'show':
          newRules = {
            ...newRules,
            invisible: false,
          };
          break;
        case 'hide':
          newRules = {
            ...newRules,
            invisible: true,
          };
          break;
        case 'required':
          newRules = {
            ...newRules,
            required: true,
          };
          break;
        case 'notRequired':
          newRules = {
            ...newRules,
            required: false,
          };
          break;
        default:
          newRules = { ...newRules };
          break;
      }
    }

    // 보이지 않을 경우 필수 처리 제거
    if (newRules?.invisible == true) {
      newRules.required = false;
    }
  });

  return {
    ...newSettings,
    rules: newRules,
  };
}

export default SetSetting;
