import { useEffect, useState } from 'react';
import { Checkbox, FormGroup } from '@mui/material';
import CheckboxLabel from 'fe-modules/components/FormUI/CheckboxForm/CheckboxLabel';
import CheckboxText from 'fe-modules/components/FormUI/CheckboxForm/CheckboxText';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Checkbox_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { useController } from 'react-hook-form';

function CheckboxForm({ form, uiSetting, lang }: FormUIProps) {
  const data = uiSetting.data as Checkbox_FormUIData;

  const [state, setState] = useState(false);

  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      if (uiSetting.defaultValue === data.options.true.name) setState(true);
      else setState(false);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue, data.options]);

  useEffect(() => {
    if (state === true) {
      field.onChange(data.options.true.name);
    } else {
      field.onChange(data.options.false.name);
    }
  }, [state, data.options]);

  const handleChange = () => {
    setState(!state);
  };

  return (
    <FormGroup sx={{ justifyContent: 'space-evenly', mx: 1 }}>
      <CheckboxLabel
        control={<Checkbox checked={state} onChange={handleChange} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
        label={<CheckboxText msg={data.label?.[lang] ?? 'hello'} />}
        disabled={!!uiSetting.rule?.readonly}
      />
    </FormGroup>
  );
}

export default CheckboxForm;
