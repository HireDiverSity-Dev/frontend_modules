import { Box } from '@mui/material';
import SignatureCanvas from 'react-signature-canvas';

interface SignBoardProps {
  ref: React.RefObject<SignatureCanvas>;
  onChange: () => void;
}

export default function SignBoard({ ref, onChange }: SignBoardProps) {
  return (
    <Box sx={{ width: 300 }}>
      <Box sx={{ bgcolor: '#00000010' }}>
        <SignatureCanvas
          ref={ref}
          backgroundColor="#00000000"
          canvasProps={{
            width: 300,
            height: 150,
          }}
          onEnd={onChange}
        />
      </Box>
    </Box>
  );
}
