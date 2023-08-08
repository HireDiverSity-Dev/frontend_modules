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

export const ErrorlessFormUIDataTypeList = [
  FormUIDataTypes.text,
  FormUIDataTypes.longtext,
  FormUIDataTypes.emailAuth,
  FormUIDataTypes.date,
  FormUIDataTypes.paragraph,
  FormUIDataTypes.divider,
  FormUIDataTypes.dropdown,
  FormUIDataTypes.checkbox,
];
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
];

/** DynamoDB FormItem 테이블 구조 */
export interface FormUIData {
  _id: string; // primary key
  name: string;
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

export function formUIDataNormalizeTranslation(formUIData: FormUIData) {
  formUIData.title = new Translation(formUIData.title ?? { en: '' });
  formUIData.subtitle = new Translation(formUIData.subtitle ?? { en: '' });
  formUIData.placeholder = new Translation(formUIData.placeholder ?? { en: '' });
  if (formUIData.type === 'dropdown') {
    let data = formUIData as Dropdown_FormUIData;
    data.options = data.options.map((option) => {
      option.label = new Translation(option.label);
      return option;
    });
    formUIData = data;
  } else if (formUIData.type === 'boolean') {
    let data = formUIData as Boolean_FormUIData;
    data.options = data.options?.map((option) => {
      option.label = new Translation(option.label);
      return option;
    });
    formUIData = data;
  } else if (formUIData.type === 'multiselect' || formUIData.type === 'singleselect') {
    let data = formUIData as Select_FormUIData;
    data.options = data.options.map((option) => {
      option.label = new Translation(option.label);
      return option;
    });
    formUIData = data;
  } else if (formUIData.type === 'checkbox') {
    let data = formUIData as Checkbox_FormUIData;
    data.label = new Translation(data.label);
    if (data.link) {
      data.link = new Translation(data.link);
    }
    formUIData = data;
  } else if (formUIData.type === 'paragraph') {
    let data = formUIData as Paragraph_FormUIData;
    data.text = new Translation(data.text);
    formUIData = data;
  }

  return formUIData;
}

export type FormUIDataUseFormReturn = UseFormReturn<FormUIData>;
export type File_FormUIDataUseFormReturn = UseFormReturn<File_FormUIData>;
export type Boolean_FormUIDataUseFormReturn = UseFormReturn<Boolean_FormUIData>;
export type Select_FormUIDataUseFormReturn = UseFormReturn<Select_FormUIData>;
export type Checkbox_FormUIDataUseFormReturn = UseFormReturn<Checkbox_FormUIData>;
export type Paragraph_FormUIDataUseFormReturn = UseFormReturn<Paragraph_FormUIData>;
