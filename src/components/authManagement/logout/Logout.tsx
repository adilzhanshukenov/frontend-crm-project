import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import './logout.css';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      localStorage.removeItem('user'); // Clear user data from localStorage
      localStorage.removeItem('token');
      const currentUrl = location.pathname + location.search;
      navigate(`/auth/login?redirectTo=${encodeURIComponent(currentUrl)}`);
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <Tooltip title="Log out" arrow>
      <LogoutIcon
        className="logout-button"
        onClick={handleLogOut}
        sx={{
          transition: 'transform 0.3s ease', // Smooth transition
          '&:hover': {
            transform: 'scale(1.2)', // Scale on hover
          },
        }}
      />
    </Tooltip>
  );
};

export default Logout;
