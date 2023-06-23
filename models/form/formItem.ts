import { RegisterOptions } from 'react-hook-form';
import { Translation } from '../lang';

export type ImageGroup = Record<string, Array<string>>;

export const FormTypeList = [
  'text',
  'longtext',
  'file',
  'multiselect',
  'singleselect',
  'boolean',
  'signature',
  'rate',
  'emailAuth',
  'paragraph',
  'divider',
].sort();
export type FormType = (typeof FormTypeList)[number];

export interface DefaultFormObj {
  // pk 값
  _id: string;
  type: FormType;
  title: Translation;
  subtitle?: Translation;
  placeholder?: Translation;
  rules?: RegisterOptions;

  airtable?: {
    base: number;
    table: number;
    col: number;
  };
  server?: string;
}

export interface FileFormObj extends DefaultFormObj {
  type: 'file';
  imgSrc?: Array<string>;

  s3path: string;
  resubmit?: {
    table: string;
    col: string;
  };
}

export interface BooleanFormObj extends DefaultFormObj {
  type: 'boolean';
  style?: 'horizontal' | 'vertical';
  options?: Array<
    | {
        label?: Translation;
      }
    | undefined
    | null
  >;
}

export interface SelectFormObj extends DefaultFormObj {
  type: 'multiselect' | 'singleselect';
  style?: 'horizontal' | 'vertical';
  options: Array<
    | {
        label: Translation;
        name: string;
        id?: string;
      }
    | undefined
  >;
}

export interface ParagraphFormObj extends DefaultFormObj {
  type: 'paragraph';
  text: {
    kr: string;
    en: string;
    zh: string;
  };
}

export type FormObj = FileFormObj | SelectFormObj | DefaultFormObj | BooleanFormObj | ParagraphFormObj;

export interface ReservationTime {
  [key: string]: [Array<{ reservationTime: string; available: boolean; count: number }>];
}
