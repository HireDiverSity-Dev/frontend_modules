import { ValidationRule } from 'react-hook-form';
import { Translation } from '../lang';

const DataTypeList = {
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
export type DataType = keyof typeof DataTypeList;

export interface FormUIData {
  _id: string; // primary key
  type: DataType;
  title: Translation;
  subtitle?: Translation;
  placeholder?: Translation;
  pattern?: {
    label: string;
    message: string;
    value: RegExp;
  };

  airtable?: {
    base: number;
    table: number;
    col: number;
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
