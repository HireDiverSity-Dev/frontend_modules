import { FormPageProps } from 'fe-modules/models/FormPage/FormPage';
import { FieldValues } from 'react-hook-form';

function getRedirect(curData: FieldValues, page: FormPageProps) {
  const redirect = page.redirect;
  const forms = page.forms;
  let redirectFunction;
  console.log(page);

  if (redirect && redirect !== '') {
    redirectFunction = () => {
      // 리다이렉트 설정된 경우 해당 주소로 리다이렉트
      console.log(Object.entries(curData));
      let redirectUrl = redirect;
      Object.entries(curData)
        .filter(([, value]) => value)
        .forEach(([_id, value]) => {
          let key = '';
          forms.forEach((form) => {
            if (form.FormItem_id === _id) {
              key = form.data.name;
            }
          });

          if (redirectUrl.indexOf(`{${key}}`) >= 0) {
            redirectUrl = redirectUrl.replace(
              `{${key}}`,
              //@ts-ignore
              `${typeof value === 'object' ? value?.email : value}`,
            );
          }
        });
      console.log(redirectUrl);

      // 리다이렉트
      window.location.href = redirectUrl;
    };
  }
  return redirectFunction;
}

export default getRedirect;
