import { FormUIValue } from 'fe-modules/models/FormUI/FormUIValue';

export interface FormUICondition {
  triggers: Array<Trigger>;
  action: Action;
}

export interface Action {
  action: FormUIConditionAction;
  val?: string;
}

export interface Trigger {
  FormItem_id: string;
  operator: FormUIConditionOperator;
  val?: FormUIValue;
}

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
export type FormUIConditionOperator = keyof typeof formConditionOperatorParams;

export const formConditionActionParams = {
  show: [0, '보이게 변경'],
  hide: [0, '보이지 않게 변경'],
  required: [0, '필수 입력으로 변경'],
  notRequired: [0, '선택 입력으로 변경'],
  setValue: [1, '다음 값으로 설정'],
  hideSubmit: [0, '제출 버튼 숨기기'],
  setNextPage: [1, '다음 페이지로 이동'],
};
export type FormUIConditionAction = keyof typeof formConditionActionParams;

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
