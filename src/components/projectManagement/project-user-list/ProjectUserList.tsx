import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { User } from '../../../stores/userStore/types';
import UserCard from '../../userManagement/user-card/UserCard';
import Button from '../../shared/buttons/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import rootStore from '../../../stores/rootStore/RootStore';

const ProjectUserList: React.FC = observer(() => {
  const { projectId } = useRouteParams();
  const { modalStore, projectStore } = rootStore;

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
