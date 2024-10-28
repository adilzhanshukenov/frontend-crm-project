import { Outlet } from 'react-router-dom';
import Header from '../../components/shared/header/Header';
import Sidebar from '../../components/shared/sidebar/Sidebar';
import './mainlayout.css';

const MainLayout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
