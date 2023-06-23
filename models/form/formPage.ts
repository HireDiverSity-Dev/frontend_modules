import { Attachment as AirtableAttachment } from 'airtable';
import { Translation } from '../lang';
import { FormObj } from './formItem';

export interface PageSettings {
  path: string;
  title: Translation;
  submit?: {
    label: Translation;
    condition?: Array<FormConditions>;
  };
  forms: Array<FormSettings>;
  complete?: boolean;
  deploy?: boolean;
  redirect?: string;
}

export type FormValue = string | boolean | number | string[] | Partial<AirtableAttachment>[];

// 폼 로직(조건문)
export const formConditionOperatorParams = {
  equal: [1, '다음과 같으면'],
  notEqual: [1, '다음과 같지 않으면'],
  contains: [1, '다음을 포함하면'],
  notContains: [1, '다음을 포함하지 않으면'],
  greaterThan: [1, '다음보다 크면'],
  lessorThan: [1, '다음보다 작으면'],
  empty: [0, '비어 있으면'],
  notEmpty: [0, '비어있지 않으면'],
  visible: [0, '보이면'],
  invisible: [0, '보이지 않으면'],
};
export type FormConditionOperator = keyof typeof formConditionOperatorParams;
export const formConditionActionParams = {
  show: [0, '보이게 변경'],
  hide: [0, '보이지 않게 변경'],
  required: [0, '필수 입력으로 변경'],
  notRequired: [0, '선택 입력으로 변경'],
  setValue: [1, '다음 값으로 설정'],
};
export type FormConditionAction = keyof typeof formConditionActionParams;

export interface Trigger {
  formKey: string;
  operator: FormConditionOperator;
  val?: FormValue;
}

export interface FormConditions {
  triggers: Array<Trigger>;
  action: {
    action: FormConditionAction;
    val?: string;
  };
}

// 규칙
export const TextPatternList = {
  '': undefined,
  email: {
    value: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
    message: 'email pattern mismatch',
    label: '이메일',
  },
  YYMMDD: {
    value:
      '^[0-9]{2}(0[1-9]|1[0-2])((?<=04|06|09|11)(0[1-9]|[1-2][0-9]|30)|(?<=01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(?<=02)(0[1-9]|[1-2][0-9]))$',
    message: 'date pattern mismatch(YYMMDD)',
    label: '날짜(YYMMDD)',
  },
  korphone: {
    value: '^01[016789]-[0-9]{3,4}-[0-9]{4}$',
    message: '010-1234-5678 pattern',
    label: '한국 전화번호(010-1234-5678)',
  },
};
export type TextPattern = keyof typeof TextPatternList;

export interface FormRules {
  required?: boolean;
  default?: boolean;
  invisible?: boolean;
  readonly?: boolean;
  disabled?: boolean; // disabled 처리 방지용
}

export interface FormSettings {
  formKey: string;
  page: number;
  formData: FormObj;
  rules?: FormRules;
  condition?: Array<FormConditions>;
  defaultValue?: string | boolean | number | string[] | Partial<AirtableAttachment>[];
}
