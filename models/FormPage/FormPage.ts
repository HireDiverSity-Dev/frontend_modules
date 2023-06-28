import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { FormUICondition } from 'fe-modules/models/FormUI/FormUICondition';
import { Translation } from 'fe-modules/models/lang';

export interface FormPageProps {
  path: string;
  title: Translation;
  submit: {
    conditions: Array<FormUICondition>;
    label: Translation;
  };
  forms: Array<FormUISetting>;
  isCompleted: boolean;
  isDeployed: boolean;
  redirect: string;
}
