import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { Translation } from 'fe-modules/models/lang';
import { UseFormReturn } from 'react-hook-form';

export interface FormPageProps {
  path: string;
  directory?: string;
  title: Translation;
  submit: {
    conditions: Array<FormUICondition>;
    label: Translation;
  };
  pages?: Array<{ conditions: Array<FormUICondition> } | null>;
  forms: Array<FormUISetting>;
  isCompleted: boolean;
  isDeployed: boolean;
  redirect: string;
}

export type FormPageUseFormReturn = UseFormReturn<FormPageProps>;
