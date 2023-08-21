import { getFromDynamoDB } from 'fe-modules/apis/dynamoDB/table';
import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { FormUIValues } from 'fe-modules/models/FormUI/FormUIValue';

export default async function getDefaultData(props: FormPageProps, savedValues: FormUIValues) {
  // 프리필 항목 설정: url query 로 들어오는 값 추가 -> 기본 세팅값 추가 -> undefined 순
  let newDefaultValues: FormUIValues = { ...savedValues };
  console.log('getDefaultData', newDefaultValues);
  delete newDefaultValues.emailAuth;
  if (newDefaultValues.saveDir === undefined) newDefaultValues.saveDir = props.directory;

  const preFills = new URLSearchParams(location.search);

  for (const form of props.forms) {
    const _id = form.FormItem_id;

    if (form.data?.type === 'emailAuth') {
      // 이메일 인증 폼 건너뛰기
      newDefaultValues[_id] = undefined;
      continue;
    }
    if (newDefaultValues[_id] !== undefined) continue; // 1순위 : 자동저장된 값
    // 2순위 : url로 들어오는 값
    const formItem = (await getFromDynamoDB('FormItem', _id)).data as FormUIData;
    const name = formItem.name;
    console.log('name', name);
    if (preFills.get(name) && typeof preFills.get(name) !== null) {
      console.log('preFills.get(name)', preFills.get(name));
      newDefaultValues[_id] = decodeURIComponent(preFills.get(name) as string);
      continue;
    }
    newDefaultValues[_id] = form.defaultValue; // 3순위 : 기본값
  }
  return newDefaultValues;
}
