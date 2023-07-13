import LaunchIcon from '@mui/icons-material/Launch';
import { Link, Typography } from '@mui/material';
import FlexBox from 'fe-modules/components/basic/FlexBox';

function CheckboxText({ msg, link, required }: { msg: string; link?: string; required?: boolean }) {
  return (
    <FlexBox sx={{ justifyContent: 'space-between' }}>
      <Typography variant="body1" sx={{ fontSize: '1.2rem', p: '0.4rem' }}>
        {msg}
        {required && <span style={{ color: 'red' }}> *</span>}
      </Typography>
      {link && (
        <Link
          href={link}
          target="_blank"
          sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <LaunchIcon
            color="primary"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
            }}
          />
        </Link>
      )}
    </FlexBox>
  );
}

export default CheckboxText;
