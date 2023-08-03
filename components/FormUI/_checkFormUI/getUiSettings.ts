import applyConditions from 'fe-modules/components/FormUI/_checkFormUI/applyConditions';
import { FormUISetting, FormUIUseFormReturn } from 'fe-modules/models/FormUI/FormUI';

export function getNewUiSettings(form: FormUIUseFormReturn, uiSettings: Array<FormUISetting>, loop = 3) {
  let newUiSettings = JSON.parse(JSON.stringify(uiSettings)) as Array<FormUISetting>;
  for (let i = 0; i < loop; i++) {
    const uiSettingsObject = getUiSettingsObject(newUiSettings);
    newUiSettings = newUiSettings.map((uiSetting) => {
      return applyConditions(form, uiSettingsObject, uiSetting);
    });
  }
  return newUiSettings;
}

export function getNewUiSettingsObject(form: FormUIUseFormReturn, uiSettings: Array<FormUISetting>, loop = 3) {
  const newUiSettings = getNewUiSettings(form, uiSettings, loop);
  return getUiSettingsObject(newUiSettings);
}

export function getUiSettingsObject(uiSettings: Array<FormUISetting>) {
  if (uiSettings === undefined) return {};
  let uiSettingsObject: { [key: string]: FormUISetting } = {};
  uiSettingsObject = uiSettings.reduce((acc, cur) => {
    acc[cur.FormItem_id] = cur;
    return acc;
  }, uiSettingsObject);
  return uiSettingsObject;
}
