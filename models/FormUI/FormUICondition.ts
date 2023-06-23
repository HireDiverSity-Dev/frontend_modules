import { FormUIValue } from '@/models/FormUI/FormUIValue';

export interface FormUICondition {
  triggers: Array<Trigger>;
  action: {
    action: FormUIConditionAction;
    val?: string;
  };
}

interface Trigger {
  formKey: string;
  operator: FormUIConditionOperator;
  val?: FormUIValue;
}

const formConditionOperatorParams = {
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
type FormUIConditionOperator = keyof typeof formConditionOperatorParams;

const formConditionActionParams = {
  show: [0, '보이게 변경'],
  hide: [0, '보이지 않게 변경'],
  required: [0, '필수 입력으로 변경'],
  notRequired: [0, '선택 입력으로 변경'],
  setValue: [1, '다음 값으로 설정'],
};
type FormUIConditionAction = keyof typeof formConditionActionParams;
