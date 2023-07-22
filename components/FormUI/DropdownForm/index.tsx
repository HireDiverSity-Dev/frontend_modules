import { SyntheticEvent, useEffect } from 'react';
import { Autocomplete, FormGroup, TextField } from '@mui/material';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Dropdown_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { useController } from 'react-hook-form';

function DropdownForm({ form, uiSetting, lang }: FormUIProps) {
  const data = uiSetting.data as Dropdown_FormUIData;
  const options = data.options.map((val) => val!.name);
  const labels = data.options.map((val) => val!.label[lang]);

  const { field } = useController({
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      field.onChange(uiSetting.defaultValue);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue, data.options]);

  const handleChange = (value: any) => {
    field.onChange(value);
  };

  return (
    <FormGroup sx={{ justifyContent: 'space-evenly', width: '100%', display: uiSetting.rule?.invisible ? 'none' : '' }}>
      <Autocomplete
        disablePortal
        options={labels ?? []}
        sx={{ display: 'inline-block' }}
        renderInput={(props) => <TextField {...props} value={field.value} label={data.placeholder?.[lang] ?? ''} />}
        onChange={(event: SyntheticEvent<Element, Event>, value: string | null | undefined) => {
          if (value !== null && value !== undefined) handleChange(options[labels.indexOf(value)]);
        }}
      />
    </FormGroup>
  );
}

export default DropdownForm;
