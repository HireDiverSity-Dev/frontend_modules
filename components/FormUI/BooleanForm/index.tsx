import React, { useEffect } from 'react';
import { RadioGroup } from '@mui/material';
import { useController } from 'react-hook-form';
import { FormUIProps } from '@/models/FormUI/FormUI';
import { Boolean_FormUIData } from '@/models/FormUI/FormUIData';
import BooleanLabel from '@/components/FormUI/BooleanForm/BooleanLabel';
import BooleanText from '@/components/FormUI/BooleanForm/BooleanText';
import BoolearnRadio from '@/components/FormUI/BooleanForm/BooleanRadio';

function boolearnValidate(value: boolean) {
  if (value === true || value === false) {
    return true;
  }
  return false;
}

function BooleanForm({ form, uiSetting, lang }: FormUIProps) {
  const data = uiSetting.data as Boolean_FormUIData;
  const validateFunction = uiSetting.rule?.required ? boolearnValidate : undefined;
  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      validate: validateFunction,
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
    <RadioGroup row={isHorizontal} sx={{ justifyContent: 'space-evenly', mx: 2 }}>
      <BooleanLabel
        type={true}
        isHorizontal={isHorizontal}
        isDisabled={uiSetting.rule?.readonly ?? false}
        control={<BoolearnRadio type={true} curValue={field.value} onChange={handleChange} />}
        label={<BooleanText msg={data.options?.[0]?.label?.[lang] || Label.true[lang]} />}
      />
      <BooleanLabel
        type={false}
        isHorizontal={isHorizontal}
        isDisabled={uiSetting.rule?.readonly ?? false}
        control={<BoolearnRadio type={false} curValue={field.value} onChange={handleChange} />}
        label={<BooleanText msg={data.options?.[1]?.label?.[lang] || Label.false[lang]} />}
      />
    </RadioGroup>
  );
}

const Label = {
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
