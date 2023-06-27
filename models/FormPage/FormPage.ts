import { FormUISetting } from '@/models/FormUI/FormUI';
import { FormUICondition } from '@/models/FormUI/FormUICondition';
import { Translation } from '@/models/lang';

export interface FormPageProps {
  path: string;
  title: Translation;
  submit: {
    condition: Array<FormUICondition>;
    label: Translation;
  };
  forms: Array<FormUISetting>;
  isCompleted: boolean;
  isDeployed: boolean;
  redirect: string;
}
