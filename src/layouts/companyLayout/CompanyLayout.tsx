import { Outlet } from 'react-router-dom';
import CompanySidebar from '../../components/companyManagement/company-sidebar/CompanySidebar';
import './companylayout.css';

const CompanyLayout: React.FC = () => {
  return (
    <div className="company-layout">
      <CompanySidebar />
      <main className="company-content">
        <Outlet />
      </main>
    </div>
  );
};

export default CompanyLayout;
