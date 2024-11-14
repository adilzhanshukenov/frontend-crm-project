import './companysidebar.css';
import ProjectList from '../../../pages/project/projectList/ProjectList';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';

const CompanySidebar = () => {
  return (
    <aside className="company-sidebar">
      <ProjectList />
      <Button
        title="Add project"
        onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'createProjectModal' })}
      />
    </aside>
  );
};

export default CompanySidebar;
