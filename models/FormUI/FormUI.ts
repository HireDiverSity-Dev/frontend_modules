import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { Lang } from 'fe-modules/models/lang';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';
import { Auth } from 'fe-modules/models/auth';

export interface FormUIProps {
  form: FormUIUseFormReturn;
  uiSetting: FormUISetting;
  lang: Lang;
  auth: Auth;
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
