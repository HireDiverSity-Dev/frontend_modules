import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';

export default function getUiSettingsObject(uiSettings: Array<FormUISetting>) {
  if (uiSettings === undefined) return {};
  let uiSettingsObject: { [key: string]: FormUISetting } = {};
  uiSettingsObject = uiSettings.reduce((acc, cur) => {
    acc[cur.FormItem_id] = cur;
    return acc;
  }, uiSettingsObject);
  return uiSettingsObject;
}
