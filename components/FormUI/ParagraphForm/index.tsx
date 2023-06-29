import React from 'react';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Paragraph_FormUIData } from 'fe-modules/models/FormUI/FormUIData';

function ParagraphForm({ uiSetting, lang }: FormUIProps) {
  const formData = uiSetting.data as Paragraph_FormUIData;
  return <div className="paragraph" dangerouslySetInnerHTML={{ __html: formData.text[lang] ?? '' }} />;
}
export default ParagraphForm;
