import { Auth } from 'fe-modules/models/auth';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';
import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';
import { Lang } from 'fe-modules/models/lang';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface FormUIProps {
  form: FormUIUseFormReturn;
  uiSetting: FormUISetting;
  lang: Lang;
  auth: Auth;
}

export type FormUIUseFormReturn = UseFormReturn<FieldValues, any>;

export interface FormUISetting {
  FormItem_id: string;
  page: number;
  data: FormUIData;
  rule?: FormUIRule;
  conditions?: Array<FormUICondition>;
  defaultValue?: FormUIValue;
}
