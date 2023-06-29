import React, { useEffect, useState } from 'react';
import { FormGroup } from '@mui/material';
import SelectCheckbox from 'fe-modules/components/FormUI/SelectForm/SelectCheckbox';
import SelectLabel from 'fe-modules/components/FormUI/SelectForm/SelectLabel';
import SelectText from 'fe-modules/components/FormUI/SelectForm/SelectText';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Select_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { useController } from 'react-hook-form';

export default function SelectForm({ form, uiSetting, lang, multiple }: FormUIProps & { multiple?: boolean }) {
  const formData = uiSetting.data as Select_FormUIData;
  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue) {
      setState(formData.options.map((val) => (uiSetting.defaultValue as string[]).includes(val!.name)));
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  const [state, setState] = useState(Array<boolean>(formData.options.length).fill(false));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);
    let newState: boolean[] = [];
    if (multiple) {
      newState = state.map((val, index) => {
        if (index === num) {
          return !val;
        } else {
          return val;
        }
      });
    } else {
      newState = Array<boolean>(formData.options.length).fill(false);
      newState[num] = true;
    }
    setState(newState);

    const data: string[] = [];
    newState.map((value, index) => {
      if (value) {
        data.push(formData.options[index]?.name);
      }
    });
    field.onChange(data);
  };

  return (
    <FormGroup row={formData?.style === 'horizontal' ? true : false} sx={{ mx: 1 }}>
      {formData.options.map((option, index) => (
        <SelectLabel
          control={
            <SelectCheckbox value={index} isChecked={!!state[index]} multiple={!!multiple} onChange={handleChange} />
          }
          label={<SelectText msg={option?.label?.[lang] ?? ''} />}
          disabled={!!uiSetting.rule?.readonly}
        />
      ))}
    </FormGroup>
  );
}
