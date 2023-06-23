import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormObj } from '@/models/form/formItem';
import { Lang } from '@/models/lang';

export interface FormUIProps {
  form: FormUIUseFormReturn;
  uiSetting: FormUISetting;
  lang: Lang;
}

export type FormUIUseFormReturn = UseFormReturn<FieldValues, any>;

export interface FormUISetting {
  formKey: string;
  page: number;
  formData: FormObj;
  rule?: FormUIRule;
  conditions?: Array<FormUICondition>;
  defaultValue?: string | boolean | number | string[];
}

export interface FormUIRule {
  required?: boolean;
  default?: boolean;
  invisible?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

export interface FormUICondition {
  triggers: Array<Trigger>;
  action: {
    action: FormConditionAction;
    val?: string;
  };
}

export type FormUIValue = string | boolean | number | string[] | Partial<AirtableAttachment>[];

export interface Trigger {
  formKey: string;
  operator: FormConditionOperator;
  val?: FormUIValue;
}
