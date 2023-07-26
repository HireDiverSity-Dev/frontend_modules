import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';

export interface FormDirectory {
  _id: string;
  name: string;
  description?: string;
  FormPage_ids: string[];
}

export interface extendFormDirectory extends FormDirectory {
  renderPages?: FormPageProps[];
  isExpanded?: boolean;
  isEditing?: boolean;
}
