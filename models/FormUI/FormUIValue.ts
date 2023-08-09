import { FieldValues } from 'react-hook-form';

export type FormUIValue = string | boolean | number | string[];

export type FormUIValues = FieldValues & {
  saveDir?: string;
  emailAuth?: string;
  pageHistory?: number[];
};
