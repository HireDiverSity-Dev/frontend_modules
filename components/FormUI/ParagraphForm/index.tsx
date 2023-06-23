import React from 'react';
import { FormUIProps } from '@/models/form/FormUI';
import { ParagraphFormObj } from '@/models/form/formItem';

function ParagraphForm({ form, uiSetting, lang }: FormUIProps) {
  const formData = uiSetting.formData as ParagraphFormObj;
  return <div className="paragraph" dangerouslySetInnerHTML={{ __html: formData.text[lang] }} />;
}
export default ParagraphForm;
