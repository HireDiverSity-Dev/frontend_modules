import { Translation } from 'fe-modules/models/lang';
import { UseFormReturn } from 'react-hook-form';

export const FormUIDataTypes = {
  text: 'text',
  longtext: 'longtext',
  file: 'file',
  multiselect: 'multiselect',
  singleselect: 'singleselect',
  boolean: 'boolean',
  dropdown: 'dropdown',
  checkbox: 'checkbox',
  date: 'date',
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
  FormUIDataTypes.date,
  FormUIDataTypes.dropdown,
];
export const TitlelessFormUIDataTypeList = [
  FormUIDataTypes.checkbox,
  FormUIDataTypes.divider,
  FormUIDataTypes.paragraph,
  FormUIDataTypes.signature,
];

export interface FormUIData {
  _id: string; // primary key
  type: FormUIDataType;
  title?: Translation;
  subtitle?: Translation;
  placeholder?: Translation;

  // for Regexp validation and Date validation
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

  s3PublicPath?: string;
  imgSrc?: Array<string>;
}

export interface File_FormUIData extends FormUIData {
  type: 'file';

  s3Path: string;
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

export interface Dropdown_FormUIData extends FormUIData {
  type: 'dropdown';
  options: Array<{
    name: string;
    id?: string;
    label: Translation;
  }>;
}

export interface Checkbox_FormUIData extends FormUIData {
  type: 'checkbox';
  label: Translation;
  options: {
    true: {
      name: string;
      id?: string;
    };
    false: {
      name: string;
      id?: string;
    };
  };
  link?: Translation;
}

export interface Paragraph_FormUIData extends FormUIData {
  type: 'paragraph';
  text: Translation;
}

export type FormUIDataUseFormReturn = UseFormReturn<FormUIData>;
export type File_FormUIDataUseFormReturn = UseFormReturn<File_FormUIData>;
export type Boolean_FormUIDataUseFormReturn = UseFormReturn<Boolean_FormUIData>;
export type Select_FormUIDataUseFormReturn = UseFormReturn<Select_FormUIData>;
export type Checkbox_FormUIDataUseFormReturn = UseFormReturn<Checkbox_FormUIData>;
export type Paragraph_FormUIDataUseFormReturn = UseFormReturn<Paragraph_FormUIData>;
