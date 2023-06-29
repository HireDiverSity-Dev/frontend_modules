import { FieldValues } from 'react-hook-form';

function getRedirect(curData: FieldValues, redirect: string) {
  let redirectFunction;

  if (redirect && redirect !== '') {
    redirectFunction = () => {
      // 리다이렉트 설정된 경우 해당 주소로 리다이렉트
      console.log(Object.entries(curData));
      let redirectUrl = redirect;
      Object.entries(curData)
        .filter(([, value]) => value)
        .forEach(([key, value]) => {
          console.log(key, value);
          if (redirectUrl.indexOf(`{{${key}}}`) >= 0) {
            redirectUrl = redirectUrl.replace(
              `{{${key}}}`,
              //@ts-ignore
              `${typeof value === 'object' ? value?.email : value}`,
            );
          }
        });
      console.log(redirectUrl);

      // 리다이렉트
      window.location.href = redirectUrl;
    };
  } else {
    // 리다이렉트
    redirectFunction = () => {
      window.location.href = '/progress';
    };
  }
  return redirectFunction;
}

export default getRedirect;
