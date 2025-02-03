import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';

const AccountCircleIconButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('');
  };

  return (
    <Tooltip title="Profile">
      <AccountCircleIcon
        fontSize="large"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        sx={{
          transition: 'transform 0.5s ease', // Smooth transition
          '&:hover': {
            transform: 'scale(1.2)', // Scale on hover
          },
        }}
      />
    </Tooltip>
  );
};

export default AccountCircleIconButton;
