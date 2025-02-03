import { Outlet } from 'react-router-dom';
import CompanySidebar from '../../components/companyManagement/company-sidebar/CompanySidebar';
import './companylayout.css';
import Modal from '../../components/shared/modal/Modal';
import CreateProjectForm from '../../components/projectManagement/create-project-form/CreateProjectForm';
import { observer } from 'mobx-react-lite';
import AddUserToProjectForm from '../../components/projectManagement/add-user-project-form/AddUserToProjectForm';
import AddStageProjectForm from '../../components/projectManagement/add-stage-project-form/AddStageProjectForm';
import AddTaskForm from '../../components/taskManagement/add-task-form/AddTaskForm';
import rootStore from '../../stores/rootStore/RootStore';
import IconSidebar from '../../components/shared/icon-sidebar/IconSidebar';
import AssignUserToTask from '../../components/taskManagement/assign-user-to-task/AssignUserToTask';
import { useEffect } from 'react';
import { useRouteParams } from '../../utils/useRouteParams';

const CompanyLayout: React.FC = observer(() => {
  const { modalStore, projectStore, taskStore } = rootStore;
  const { projectId } = useRouteParams();

  useEffect(() => {
    projectStore.fetchUsersOfProject(projectId);
    taskStore.fetchAllTasks(projectId);
  }, [projectId, projectStore, taskStore]);

  return (
    <div className="company-layout">
      <IconSidebar />
      <CompanySidebar />
      {projectStore.selectedProject ? (
        <main className="company-content">
          <Outlet />
        </main>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>No projects found</h1>
        </div>
      )}

      <Modal>
        {modalStore.activeModal === 'createProjectModal' && <CreateProjectForm />}
        {modalStore.activeModal === 'addUserToProject' && <AddUserToProjectForm />}
        {modalStore.activeModal === 'addStageToProject' && <AddStageProjectForm />}
        {modalStore.activeModal === 'addTaskModal' && <AddTaskForm />}
        {modalStore.activeModal === 'assignUserToTask' && (
          <AssignUserToTask taskId={taskStore.selectedTask} availableUsers={projectStore.projectUser} />
        )}
      </Modal>
    </div>
  );
});

export default CompanyLayout;
