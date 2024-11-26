import { Outlet } from 'react-router-dom';
import CompanySidebar from '../../components/companyManagement/company-sidebar/CompanySidebar';
import './companylayout.css';
import Modal from '../../components/shared/modal/Modal';
import { modalStore } from '../../stores/modalStore/ModalStore';
import CreateProjectForm from '../../components/projectManagement/create-project-form/CreateProjectForm';
import { observer } from 'mobx-react-lite';
import AddUserToProjectForm from '../../components/projectManagement/add-user-project-form/AddUserToProjectForm';
import AddStageProjectForm from '../../components/projectManagement/add-stage-project-form/AddStageProjectForm';
import AddTaskForm from '../../components/taskManagement/add-task-form/AddTaskForm';

const CompanyLayout: React.FC = observer(() => {
  return (
    <div className="company-layout">
      <CompanySidebar />
      <main className="company-content">
        <Outlet />
      </main>
      <Modal>
        {modalStore.activeModal === 'createProjectModal' && <CreateProjectForm />}
        {modalStore.activeModal === 'addUserToProject' && <AddUserToProjectForm />}
        {modalStore.activeModal === 'addStageToProject' && <AddStageProjectForm />}
        {modalStore.activeModal === 'addTaskModal' && <AddTaskForm />}
      </Modal>
    </div>
  );
});

export default CompanyLayout;
