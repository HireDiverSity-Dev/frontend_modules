import React, { useEffect, useState } from 'react';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useController } from 'react-hook-form';
import { SelectFormObj } from '@/models/FormUI/FormUIData';
import { FormProps } from '..';

interface SelectFormProps extends FormProps {
  multiple?: boolean;
}

function SelectForm({ pageForm, setting, lang, multiple }: SelectFormProps) {
  const formData = setting.formData as SelectFormObj;
  const { field } = useController({
    name: setting.formKey,
    control: pageForm.control,
    rules: setting.rules,
  });

  useEffect(() => {
    if (setting.rules?.default && setting.defaultValue) {
      setState(formData.options.map((val) => (setting.defaultValue as string[]).includes(val!.name)));
    }
  }, [setting.rules?.default, setting.defaultValue]);

  const [state, setState] = useState(Array(formData.options.length).fill(false));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(event.target.value);

    if (multiple) {
      const newState = state.map((val, index) => {
        if (index === num) {
          return !val;
        } else {
          return val;
        }
      });
      setState(newState);
    } else {
      const newState = Array(formData.options.length).fill(false);
      newState[num] = true;
      setState(newState);
    }
  };

  useEffect(() => {
    if (multiple) {
      field.onChange(
        state.reduce((prev, cur, index) => {
          if (cur) {
            prev.push(formData.options[index]?.name);
          }
          return prev;
        }, []),
      );
    } else {
      field.onChange(
        state.reduce((prev, cur, index) => {
          if (cur) {
            return formData.options[index]?.name;
          } else return prev;
        }, undefined),
      );
    }
  }, state);

  return (
    <>
      <FormGroup
        //기본은 horizontal 옵션에 따라 verticl
        row={formData?.style === 'horizontal' ? true : false}
        sx={{ mx: 1 }}
      >
        {formData.options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <div>
                <Checkbox
                  icon={multiple ? <CheckBoxOutlineBlankIcon /> : <RadioButtonUncheckedIcon />}
                  checkedIcon={multiple ? <CheckBoxIcon /> : <RadioButtonCheckedIcon />}
                  checked={!!state[index]}
                  value={index}
                  onChange={handleChange}
                  disabled={setting.rules?.readonly}
                />
              </div>
            }
            label={
              <Typography variant="body1" sx={{ fontSize: '1.2rem', p: '0.4rem' }}>
                {option?.label?.[lang] ?? ''}
              </Typography>
            }
            sx={{
              '.MuiFormControlLabel-label': {
                flex: 1,
              },
              mb: '0.5rem',
              display: 'flex',
              alignItems: 'start',
            }}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default SelectForm;
