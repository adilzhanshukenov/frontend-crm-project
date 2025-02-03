import AccountCircleIconButton from '../buttons/account-icon-button/AccountCircleIconButton';
import './header.css';

//Header of the app
const Header: React.FC = () => {
  return (
    <header className="header">
      <h2>CRM-SYSTEM</h2>
      <nav className="nav-header">
        <AccountCircleIconButton />
      </nav>
    </header>
  );
};

export default Header;
