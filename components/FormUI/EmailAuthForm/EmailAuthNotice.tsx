import React from 'react';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { Translation } from 'fe-modules/models/lang';
import { SupportLanguage } from 'fe-modules/models/lang';

function EmailAuthNotice({ lang }: { lang: SupportLanguage }) {
  return (
    <Alert variant="outlined" severity="info" sx={{ my: 2 }}>
      <AlertTitle>{`${Notice}`}</AlertTitle>
      {Label.map((val) => (
        <Typography variant="body2">{`- ${val[lang]}`}</Typography>
      ))}
    </Alert>
  );
}

export default EmailAuthNotice;

const Notice: Translation = new Translation({
  kr: '안내사항',
  zh: '公告',
  en: 'Notice',
  jp: '注意',
  vn: 'Thông báo',
});

const Label: Array<Translation> = [
  new Translation({
    kr: '"인증하기" 버튼을 눌러 이메일을 인증해주세요.',
    zh: '请点击“点击验证”按钮来验证您的邮箱。',
    en: 'Press "VERIFY" button to authenticate your email.',
    jp: '‘認証’ボタンを押してアドレス認証を行ってください。',
    vn: 'Nhấn vào nút “xác thực” để xác thực email',
  }),
  new Translation({
    kr: '인증 메일을 받지 못했다면 스팸 메일함을 확인해주세요.',
    zh: '如果您没有收到验证邮件，请检查您的垃圾邮件。',
    en: "If you haven't received an authentication mail, please check your spam mail box.",
    jp: '認証メールを受信できなかった場合は、迷惑メールボックスを確認してください。',
    vn: 'Nếu không nhận được email xác nhận hãy kiểm tra hòm thư spam',
  }),
  new Translation({
    kr: '또는 연락처에 하이어비자 공식 이메일(official@hirediversity.club)을 추가해주시면 이메일을 받으실 수 있습니다.',
    zh: '或者，可以通过将Hirevisa的官方邮箱 (official@hirediversity.club) 添加到联系人列表后即可收到邮件。',
    en: 'Or, you can receive the email by adding the HireVisa official email(official@hirediversity.club) to your email contacts list.',
    jp: 'または、連絡先にHirevisa公式メールアドレス(official@hirediversity.cl ub)を追加していただければ、メールをより確実に受け取ることができます。',
    vn: 'Nếu thêm email (official@hirediversity.club) vào danh sách liên hệ bạn sẽ nhận được email',
  }),
  new Translation({
    kr: '만약 위 방법으로도 이메일을 받지 못하셨다면, 다른 이메일을 사용해주세요.',
    zh: '如果使用上述方法都没有收到邮件，请使用其他邮箱。',
    en: "If you haven't received the email by the above method, please use another email.",
    jp: '上記の方法でもメールが届かなかった場合は、別のメールアドレスを使用してください。',
    vn: 'Nếu vẫn không nhận được email vui lòng dùng email khác',
  }),
];
