import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface RateStarProps {
  curValue: number;
  value: number;
  onClick: (num: number) => void;
}

export default function RateStar({ curValue, value, onClick }: RateStarProps) {
  if (curValue < value) {
    // unselected
    return (
      <StarOutlineIcon
        fontSize="inherit"
        sx={{ color: '#FFD700' }}
        onClick={() => {
          onClick(value);
        }}
      />
    );
  } else {
    // selected
    return (
      <StarIcon
        fontSize="inherit"
        sx={{ color: '#FFD700' }}
        onClick={() => {
          onClick(value);
        }}
      />
    );
  }
}
