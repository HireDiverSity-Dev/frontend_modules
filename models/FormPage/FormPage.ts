import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { FormUIData, formUIDataNormalizeTranslation } from 'fe-modules/models/FormUI/FormUIData';
import { Translation } from 'fe-modules/models/lang';
import { UseFormReturn } from 'react-hook-form';

export interface FormPageProps {
  _id: string;
  path: string;
  title: Translation;
  submit: {
    FormItem_id?: string;
    data?: FormUIData;
    label: Translation;
    conditions?: Array<FormUICondition>;
  };
  forms: Array<FormUISetting>;
  isCompleted: boolean;
  isDeployed: boolean;
  redirect: string;
  pages?: Array<{ conditions: Array<FormUICondition> } | null>;
  directory?: string;
  startDate?: string;
  endDate?: string;
  submission?: number;
}

export function formPageNormalizeTranslation(formPage: FormPageProps) {
  formPage.title = new Translation(formPage.title);
  formPage.submit.label = new Translation(formPage.submit.label);
  formPage.forms = formPage.forms.map((form) => {
    if (form.data !== undefined) {
      form.data = formUIDataNormalizeTranslation(form.data);
    }
    return form;
  });
  return formPage;
}

export type FormPageUseFormReturn = UseFormReturn<FormPageProps>;
