import './companysidebar.css';
import ProjectList from '../../../pages/project/projectList/ProjectList';
import Button from '../../shared/button/Button';
import rootStore from '../../../stores/rootStore/RootStore';
import Logout from '../../authManagement/logout/Logout';

const CompanySidebar = () => {
  const { modalStore } = rootStore;
  return (
    <aside className="company-sidebar">
      <ProjectList />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <Button
          title="Add project"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'createProjectModal' })}
        />
        <Logout />
      </div>
    </aside>
  );
};

export default CompanySidebar;
