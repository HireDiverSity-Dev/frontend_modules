import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  getEmailVerificationCodeWithAPI2,
  confirmEmailVerificationCodeWithAPI2,
} from "fe-modules/apis/client/verification";
import FlexBox from "fe-modules/components/basic/FlexBox";
import EmailAuthButton from "fe-modules/components/FormUI/EmailAuthForm/EmailAuthButton";
import EmailAuthCode from "fe-modules/components/FormUI/EmailAuthForm/EmailAuthCode";
import EmailAuthResendButton from "fe-modules/components/FormUI/EmailAuthForm/EmailAuthResendButton";
import TextInput from "fe-modules/components/FormUI/TextForm/TextInput";
import { FormUIProps } from "fe-modules/models/FormUI/FormUI";
import { useController } from "react-hook-form";
import EmailAuthNotice from "./EmailAuthNotice";

function EmailAuthForm({ form, uiSetting, lang }: FormUIProps) {
  const name = uiSetting.FormItem_id;

  const [, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSented, setIsSented] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const { field: emailAuthField } = useController({
    name: "emailAuth",
    control: form.control,
  });

  const { field: saveDirField } = useController({
    name: `saveDir`,
    control: form.control,
  });

  const { field: emailField, fieldState: emailFieldState } = useController({
    name: name,
    control: form.control,
    rules: {
      required: uiSetting.rule?.required,
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/g,
        message: "email pattern mismatch",
      },
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailField.onChange(e.target.value.toLowerCase());
    emailAuthField.onChange(undefined);
    setIsVerified(false);
    setIsSented(false);
  };

  const onVerify = async () => {
    const emailValue = emailField.value;
    setEmail(emailValue);
    try {
      await getEmailVerificationCodeWithAPI2(emailValue, lang);
      setIsSented(true);
      setIsInvalid(false);
    } catch (error) {
      setIsSented(false);
      setIsInvalid(true);
    }
  };

  const onConfirm = async () => {
    const emailValue = emailField.value;
    setEmail(emailValue);
    try {
      const res = await confirmEmailVerificationCodeWithAPI2(emailValue, code);
      if (res.status !== 200) throw new Error("email confirm failed");

      setIsVerified(true);
      emailField.onChange(emailValue);
      emailAuthField.onChange(emailValue);
      saveDirField.onChange(name);
      setIsInvalid(false);
    } catch (error) {
      setIsVerified(false);
      setIsInvalid(true);
    }
  };

  return (
    <FlexBox
      sx={{
        flexDirection: "column",
        gap: 2,
        display: uiSetting.rule?.invisible ? "none" : "",
      }}
    >
      <Box sx={style.box}>
        <TextInput
          field={emailField}
          fieldState={emailFieldState}
          multiline={false}
          placeholder="e.g. your@email.com"
          disabled={(uiSetting.rule?.readonly ?? false) || isVerified}
          onCustomChange={onChange}
        />
        <EmailAuthButton
          isInvalid={emailFieldState.invalid ?? false}
          isVerified={isVerified}
          isSented={isSented}
          onVerify={onVerify}
          lang={lang}
        />
        {isSented && !isVerified && (
          <EmailAuthCode
            name={name}
            code={code}
            setCode={setCode}
            onConfirm={onConfirm}
            isInvalid={isInvalid}
            lang={lang}
          />
        )}
      </Box>
      {!isVerified && <EmailAuthNotice lang={lang} />}
      {isSented && !isVerified && (
        <EmailAuthResendButton onVerify={onVerify} lang={lang} />
      )}
    </FlexBox>
  );
}

export default EmailAuthForm;

const style = {
  box: {
    display: "grid",
    gridTemplateColumns: "auto max-content",
    width: "100%",
    gap: 1,
  },
};
