import React from 'react';
import { FormUIProps } from '@/models/FormUI/FormUI';
import { Paragraph_FormUIData } from '@/models/FormUI/FormUIData';

function ParagraphForm({ form, uiSetting, lang }: FormUIProps) {
  const formData = uiSetting.data as Paragraph_FormUIData;
  return <div className="paragraph" dangerouslySetInnerHTML={{ __html: formData.text[lang] ?? '' }} />;
}
export default ParagraphForm;
