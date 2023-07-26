import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';

export default function getDefaultData(props: FormPageProps, savedValues: any) {
  // 프리필 항목 설정: url query 로 들어오는 값 추가 -> 기본 세팅값 추가 -> undefined 순
  let newDefaultValues: any = { ...savedValues };
  newDefaultValues.saveDir = props.directory;

  const preFills = new URLSearchParams(location.search);

  props.forms.forEach((formUI) => {
    const _id = formUI.FormItem_id;
    const encodedKeys: string[] = [
      formUI.FormItem_id,
      encodeURIComponent(formUI.FormItem_id),
      formUI.FormItem_id.replace(/[(]/g, '%28').replace(/[)]/g, '%29'),
    ];

    if (newDefaultValues[_id] !== undefined) return; // 1순위 : 자동저장된 값
    for (let key of encodedKeys) {
      // 2순위 : url로 들어오는 값
      if (preFills.get(key) && typeof preFills.get(key) !== null) {
        newDefaultValues[key] = decodeURIComponent(preFills.get(key) as string);
        return;
      }
    }
    newDefaultValues[_id] = formUI.defaultValue; // 3순위 : 기본값
  });
  return newDefaultValues;
}
