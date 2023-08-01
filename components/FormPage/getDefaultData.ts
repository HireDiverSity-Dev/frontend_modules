import { getFromDynamoDB } from 'fe-modules/apis/dynamoDB/table';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUIData } from 'fe-modules/models/FormUI/FormUIData';

export default function getDefaultData(props: FormPageProps, savedValues: any) {
  // 프리필 항목 설정: url query 로 들어오는 값 추가 -> 기본 세팅값 추가 -> undefined 순
  let newDefaultValues: any = { ...savedValues };
  newDefaultValues.saveDir = props.directory;

  const preFills = new URLSearchParams(location.search);

  props.forms.forEach(async (formUI) => {
    const _id = formUI.FormItem_id;

    if (newDefaultValues[_id] !== undefined) return; // 1순위 : 자동저장된 값
    // 2순위 : url로 들어오는 값
    const formItem = (await getFromDynamoDB('FormItem', _id)).data as FormUIData;
    const name = formItem.name;
    if (preFills.get(name) && typeof preFills.get(name) !== null) {
      newDefaultValues[_id] = decodeURIComponent(preFills.get(name) as string);
      return;
    }
    newDefaultValues[_id] = formUI.defaultValue; // 3순위 : 기본값
  });
  return newDefaultValues;
}
