import { useNavigate } from 'react-router-dom';
import Button from '../../shared/button/Button';

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

  return <Button title="Log out" onClick={handleLogOut} />;
};

export default Logout;
