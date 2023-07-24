import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';

export interface Inbox {
  _id: string;
  FormPage_id: string;
  data: { FormItem_id: string; value: FormUIValue }[];
  createdAt: string;
}
