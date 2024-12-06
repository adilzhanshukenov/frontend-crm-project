import './header.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//Header of the app
const Header: React.FC = () => {
  return (
    <header className="header">
      <h2>CRM-SYSTEM</h2>
      <nav className="nav-header">
        <AccountCircleIcon fontSize="large" />
      </nav>
    </header>
  );
};

export default Header;
