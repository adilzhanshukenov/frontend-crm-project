import { NavLink } from 'react-router-dom';
import './sidebar.css';
import Logout from '../../authManagement/logout/Logout';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div>
        <h2>Menu</h2>
        <nav>
          <ul className="sidebar-list">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>About</li>
            <li>
              <NavLink to="/companies">Company List</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users List</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Logout />
    </aside>
  );
};

export default Sidebar;
