import 'react-international-phone/style.css';

import { useEffect } from 'react';
import { MenuItem, Select, TextField, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';
import TextError from 'fe-modules/components/FormUI/TextForm/TextError';
import { FormUIProps } from 'fe-modules/models/FormUI/FormUI';
import { Phone_FormUIData } from 'fe-modules/models/FormUI/FormUIData';
import { useController, ValidationRule } from 'react-hook-form';
import { defaultCountries, FlagEmoji, parseCountry, usePhoneInput } from 'react-international-phone';
import { CountryData } from 'react-international-phone';

function PhoneForm({ form, uiSetting, lang }: FormUIProps) {
  const uiData = uiSetting.data as Phone_FormUIData;

  useEffect(() => {
    if (uiSetting.rule?.default && uiSetting.defaultValue != undefined) {
      field.onChange(uiSetting.defaultValue);
    }
  }, [uiSetting.rule?.default, uiSetting.defaultValue]);

  const pattern = uiData.koreanNumbersOnly
    ? ({
        value: RegExp(/(010|012)-\d{4}-\d{4}/g),
        message: '010-####-#### or 012-####-####',
      } as ValidationRule<RegExp>)
    : undefined;

  let { field, fieldState } = useController({
    name: uiSetting.FormItem_id,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
      pattern,
    },
  });
  const kr: Array<CountryData> = [['South Korea', 'kr', '82', '...-....-....']];
  const countries = uiData.koreanNumbersOnly ? kr : defaultCountries;

  const { phone, handlePhoneValueChange, country, setCountry } = usePhoneInput({
    defaultCountry: 'kr',
    value: field.value,
    countries: countries,
    forceDialCode: true,
    onChange: (data) => {
      if (uiData.koreanNumbersOnly) {
        field.onChange(data.phone.slice(3));
      } else {
        field.onChange(data.phone.replaceAll(' ', ''));
      }
    },
  });
  console.log(field.value);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100', display: uiSetting.rule?.invisible ? 'none' : '' }}>
      <FlexBox sx={{ width: '100%' }}>
        <Select
          MenuProps={{
            style: {
              height: '300px',
              width: '360px',
              top: '10px',
              left: '-34px',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
          sx={{
            // Remove default outline
            fieldset: {
              display: 'none',
            },
            '.MuiSelect-select': {
              py: '16.5px',
              pl: '8px',
              pr: '28px',
            },
          }}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          renderValue={(val) => <FlagEmoji iso2={val} style={{ display: 'flex' }} />}
        >
          {countries.map((c) => {
            const curCountry = parseCountry(c);
            return (
              <MenuItem key={curCountry.iso2} value={curCountry.iso2}>
                <FlagEmoji iso2={curCountry.iso2} style={{ marginRight: '8px' }} />
                <Typography marginRight="8px">{curCountry.name}</Typography>
                <Typography color="gray">+{curCountry.dialCode}</Typography>
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          variant="outlined"
          color="primary"
          placeholder={uiSetting.data.placeholder?.[lang]}
          value={phone}
          onChange={handlePhoneValueChange}
          type="tel"
          sx={{ flex: 1 }}
        />
      </FlexBox>
      {fieldState.invalid && <TextError msg={fieldState.error?.message ?? ''} />}
    </FlexBox>
  );
}

export default PhoneForm;
