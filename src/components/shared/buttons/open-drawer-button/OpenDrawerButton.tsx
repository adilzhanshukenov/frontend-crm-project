import { Tooltip } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ButtonIconProps } from '../../interfaces/buttonIconInterface';

const OpenDrawerButton = ({ title, onClick }: ButtonIconProps) => {
  return (
    <Tooltip title={title}>
      <KeyboardArrowRightIcon
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          transition: 'transform 0.5s ease',
          '&:hover': {
            transform: 'scale(1.3)', // Scale on hover
          },
        }}
      />
    </Tooltip>
  );
};

export default OpenDrawerButton;
