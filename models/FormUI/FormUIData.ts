import { Translation } from 'fe-modules/models/lang';

export const FormUIDataTypes = {
  text: 'text',
  longtext: 'longtext',
  file: 'file',
  multiselect: 'multiselect',
  singleselect: 'singleselect',
  boolean: 'boolean',
  signature: 'signature',
  rate: 'rate',
  emailAuth: 'emailAuth',
  paragraph: 'paragraph',
  divider: 'divider',
};
export type FormUIDataType = keyof typeof FormUIDataTypes;

export const CanDisableFormUIDataTypeList = [
  FormUIDataTypes.text,
  FormUIDataTypes.longtext,
  FormUIDataTypes.multiselect,
  FormUIDataTypes.singleselect,
  FormUIDataTypes.boolean,
  FormUIDataTypes.emailAuth,
];
export const TitlelessFormUIDataTypeList = [
  FormUIDataTypes.divider,
  FormUIDataTypes.paragraph,
  FormUIDataTypes.signature,
];

export interface FormUIData {
  _id: string; // primary key
  type: FormUIDataType;
  title: Translation;
  subtitle?: Translation;
  placeholder?: Translation;
  pattern?: {
    label: string;
    message: string;
    value: string;
  };

  airtable?: {
    base: string;
    table: string;
    col: string;
  };
  server?: string;
}

export interface File_FormUIData extends FormUIData {
  type: 'file';
  imgSrc?: Array<string>;

  s3path: string;
  resubmit?: {
    table: string;
    col: string;
  };
}

export interface Boolean_FormUIData extends FormUIData {
  type: 'boolean';
  style: 'horizontal' | 'vertical';
  options?: Array<{ label: Translation }>;
}

export interface Select_FormUIData extends FormUIData {
  type: 'multiselect' | 'singleselect';
  style: 'horizontal' | 'vertical';
  options: Array<{
    name: string;
    id?: string;
    label: Translation;
  }>;
}

export interface Paragraph_FormUIData extends FormUIData {
  type: 'paragraph';
  text: Translation;
}
