import { Outlet } from 'react-router-dom';
import Header from '../../components/shared/header/Header';
import Sidebar from '../../components/shared/sidebar/Sidebar';
import './mainlayout.css';
import { observer } from 'mobx-react-lite';

const MainLayout: React.FC = observer(() => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-area">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
});

export default MainLayout;
