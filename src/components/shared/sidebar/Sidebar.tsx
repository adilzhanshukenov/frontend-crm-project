import { NavLink } from 'react-router-dom';
import './sidebar.css';
import Logout from '../../authManagement/logout/Logout';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <h2>Menu</h2>
        <nav className="sidebar-nav">
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/companies">
            Company List
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/users">
            Users List
          </NavLink>
        </nav>
      </div>
      <Logout />
    </aside>
  );
};

export default Sidebar;
