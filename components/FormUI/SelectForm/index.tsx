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
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });
  const [state, setState] = useState(Array<boolean>(formData.options.length).fill(false));

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue) {
      field.onChange(uiSetting.defaultValue);
      field.onBlur();
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  const makeNewState = (curState: boolean[], num: number) => {
    let newState: boolean[] = [];
    if (multiple) {
      newState = curState.map((val, index) => {
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
    return newState;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);
    let newState: boolean[] = makeNewState([...state], num);

    if (multiple) {
      const datas = newState.reduce((prev: string[], cur, index) => {
        if (cur) {
          const options = formData.options[index];
          prev.push(options.name);
        }
        return prev;
      }, []);
      field.onChange(datas);
      field.onBlur();
    } else {
      let data = '';
      newState.forEach((cur, index) => {
        if (cur) data = formData.options[index].name;
      });
      field.onChange(data);
      field.onBlur();
    }
  };

  useEffect(() => {
    if (multiple) {
      field.value = field.value as string[];
      let indices: number[] = [];
      formData.options.forEach((option, i) => {
        if (field.value.includes(option.name)) indices.push(i);
      });
      let newState: boolean[] = [...state];
      indices.forEach((index) => {
        newState = makeNewState([...newState], index);
      });
      setState([...newState]);
    } else {
      let index = -1;
      formData.options.forEach((option, i) => {
        if (option.name === field.value) index = i;
      });
      if (index !== -1) setState(makeNewState([...state], index));
    }
  }, [field.value]);

  return (
    <FormGroup
      row={formData?.style === 'horizontal' ? true : false}
      sx={{ display: uiSetting.rule?.invisible ? 'none' : '' }}
    >
      {formData.options.map((option, index) => (
        <SelectLabel
          key={index}
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
