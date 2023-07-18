import { useEffect, useState } from 'react';
import { FormGroup } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { useController } from 'react-hook-form';

function DateForm({ form, uiSetting }: FormUIProps) {
  const [date, setDate] = useState<Dayjs | null>(null);

  const { field } = useController({
    name: uiSetting.formKey,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
    },
  });

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      field.onChange(uiSetting.defaultValue);
      const dateObj = dayjs(uiSetting.defaultValue as string, uiSetting.data.pattern?.value ?? 'YYYYMMDD');
      setDate(dateObj);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  return (
    <FormGroup
      sx={{ justifyContent: 'space-evenly', mx: 1, width: '100%', display: uiSetting.rule?.invisible ? 'none' : '' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            const dateFormat = dayjs(newValue).format(uiSetting.data.pattern?.value ?? 'YYYYMMDD');
            field.onChange(dateFormat);
          }}
          format="YYYY-MM-DD"
        />
      </LocalizationProvider>
    </FormGroup>
  );
}

export default DateForm;
