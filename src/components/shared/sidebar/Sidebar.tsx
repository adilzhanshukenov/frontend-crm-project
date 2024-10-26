import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <p>Menu</p>
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
    </aside>
  );
};

export default Sidebar;
