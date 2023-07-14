import React from 'react';
import { Typography } from '@mui/material';
import { FormUISetting } from 'fe-modules/models/FormUI/FormUI';
import { Lang } from 'fe-modules/models/lang';

interface FormSemiTitleProps {
  uiSetting: FormUISetting;
  lang: Lang;
}

function FormSemiTitle({ uiSetting, lang }: FormSemiTitleProps) {
  const setLink = (subtitle: string) => {
    let changed = subtitle;
    const link_regex = /<[^|<>]+[|][^|<>]+>/g;
    const links = Array.from(changed.matchAll(link_regex));
    links.forEach(([fulltext]: Array<string>) => {
      const text = fulltext.split('|')[0].slice(1);
      let link = fulltext.split('|')[1];
      link = fulltext.split('|')[1].slice(0, link.length - 1);

      changed = changed.replace(fulltext, `<a href="${link}" target="_blank">${text}</a>`);
    });
    return changed;
  };

  if (uiSetting.data?.subtitle === undefined) return <></>;
  return (
    <Typography
      variant="body1"
      mb={1}
      px={1}
      dangerouslySetInnerHTML={{
        __html: setLink(uiSetting.data.subtitle?.[lang] ?? ''),
      }}
    ></Typography>
  );
}

export default FormSemiTitle;
