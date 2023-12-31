import { Auth } from 'fe-modules/models/auth';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIRule } from 'fe-modules/models/FormUI/FormUIRule';
import { FormUIValue, FormUIValues } from 'fe-modules/models/FormUI/FormUIValue';
import { SupportLanguage } from 'fe-modules/models/lang';
import { UseFormReturn } from 'react-hook-form';

export interface FormUIProps {
  form: FormUIUseFormReturn;
  uiSetting: FormUISetting;
  lang: SupportLanguage;
  auth: Auth;
}

export type FormUIUseFormReturn = UseFormReturn<FormUIValues, any>;
export interface FormUISetting {
  FormItem_id: string;
  page: number;
  data: FormUIData;
  rule?: FormUIRule;
  conditions?: Array<FormUICondition>;
  defaultValue?: FormUIValue;
}
