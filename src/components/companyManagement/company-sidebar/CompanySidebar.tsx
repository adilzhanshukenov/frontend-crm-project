import './companysidebar.css';
import ProjectList from '../../../pages/projectList/ProjectList';
import { companyStore } from '../../../stores/companyStore/CompanyStore';

const CompanySidebar = () => {
  return (
    <aside className="company-sidebar">
      <h2>{companyStore.selectedCompany?.name}</h2>
      <ProjectList />
    </aside>
  );
};

export default CompanySidebar;
