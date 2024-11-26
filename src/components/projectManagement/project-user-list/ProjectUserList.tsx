import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { User } from '../../../stores/userStore/types';
import UserCard from '../../userManagement/user-card/UserCard';
import Button from '../../shared/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import { projectStore } from '../../../stores/projectStore/ProjectStore';

const ProjectUserList: React.FC = observer(() => {
  const { projectId } = useRouteParams();

  useEffect(() => {
    projectStore.fetchUsersOfProject(projectId);
  }, [projectId]);

  const openDeleteConfirmation = (user: User | null) => {
    projectStore.setUserToDelete(user);
  };

  const handleEdit = async () => {};

  const handleConfirmDelete = async () => {
    if (projectStore.userToDelete !== null) {
      await projectStore.deleteUserFromProject(projectStore.userToDelete?._id);
      projectStore.setUserToDelete(null);
      projectStore.fetchUsersOfProject(projectId);
    }
  };

  const handleCancelDelete = async () => {
    projectStore.setUserToDelete(null);
  };

  if (projectStore.loading) return <p>Loading...</p>;
  if (projectStore.error) return <p>Error: {projectStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Users of project</h2>
        <Button
          title="Add user"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'addUserToProject' })}
        />
      </div>
      <ul className="list-style">
        {projectStore.projectUser?.map((projectUser) => (
          <li key={projectUser._id}>
            <p>{projectUser.role}</p>
            <UserCard
              user={projectUser.user}
              onEdit={handleEdit}
              onDelete={() => {
                openDeleteConfirmation(projectUser.user);
              }}
            />
          </li>
        ))}
      </ul>

      {projectStore.userToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default ProjectUserList;
