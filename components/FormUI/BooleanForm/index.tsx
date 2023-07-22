import React, { useEffect } from 'react';
import { RadioGroup } from '@mui/material';
import BooleanLabel from 'fe-modules/components/FormUI/BooleanForm/BooleanLabel';
import BooleanRadio from 'fe-modules/components/FormUI/BooleanForm/BooleanRadio';
import BooleanText from 'fe-modules/components/FormUI/BooleanForm/BooleanText';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Boolean_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { Translation } from 'fe-modules/models/lang';
import { useController } from 'react-hook-form';

function BooleanForm({ form, uiSetting, lang }: FormUIProps) {
  const data = uiSetting.data as Boolean_FormUIData;
  const { field } = useController({
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      field.onChange(uiSetting.defaultValue as boolean);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  const handleChange = (bool: boolean) => {
    field.onChange(bool);
  };

  const isHorizontal = data.style === 'horizontal';
  return (
    <RadioGroup
      row={isHorizontal}
      sx={{ justifyContent: 'space-evenly', display: uiSetting.rule?.invisible ? 'none' : '' }}
    >
      <BooleanLabel
        value={true}
        isHorizontal={isHorizontal}
        disabled={!!uiSetting.rule?.readonly}
        control={<BooleanRadio value={true} curValue={field.value} onChange={handleChange} />}
        label={<BooleanText msg={data.options?.[0]?.label?.[lang] || Label.true[lang] || Label.true['en']} />}
      />
      <BooleanLabel
        value={false}
        isHorizontal={isHorizontal}
        disabled={!!uiSetting.rule?.readonly}
        control={<BooleanRadio value={false} curValue={field.value} onChange={handleChange} />}
        label={<BooleanText msg={data.options?.[1]?.label?.[lang] || Label.false[lang] || Label.false['en']} />}
      />
    </RadioGroup>
  );
}

const Label: { true: Translation; false: Translation } = {
  true: {
    kr: '예',
    en: 'Yes',
    zh: '是的',
  },
  false: {
    kr: '아니오',
    en: 'No',
    zh: '不',
  },
};

export default BooleanForm;
