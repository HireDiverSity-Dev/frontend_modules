import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormUIData } from '@/models/FormUI/FormUIData';
import { Lang } from '@/models/lang';
import { FormUIRule } from '@/models/FormUI/FormUIRule';
import { FormUICondition } from '@/models/FormUI/FormUICondition';
import { FormUIValue } from '@/models/FormUI/FormUIValue';

export interface FormUIProps {
  form: FormUIUseFormReturn;
  uiSetting: FormUISetting;
  lang: Lang;
}

export type FormUIUseFormReturn = UseFormReturn<FieldValues, any>;

export interface FormUISetting {
  formKey: string;
  page: number;
  data: FormUIData;
  rule?: FormUIRule;
  conditions?: Array<FormUICondition>;
  defaultValue?: FormUIValue;
}
