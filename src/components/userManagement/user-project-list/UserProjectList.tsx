import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { User } from '../../../stores/userStore/types';
import UserCard from '../user-card/UserCard';
import Button from '../../shared/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import { userProjectStore } from '../../../stores/userProjectStore/UserProjectStore';

const UserProjectList: React.FC = observer(() => {
  const { projectId } = useRouteParams();

  useEffect(() => {
    userProjectStore.fetchUsersOfProject(projectId);
  }, [projectId]);

  const openDeleteConfirmation = (user: User | null) => {
    userProjectStore.setUserToDelete(user);
  };

  const handleEdit = async () => {};

  const handleConfirmDelete = async () => {
    if (userProjectStore.userToDelete !== null) {
      await userProjectStore.deleteUserFromProject(userProjectStore.userToDelete?._id);
      userProjectStore.setUserToDelete(null);
      userProjectStore.fetchUsersOfProject(projectId);
    }
  };

  const handleCancelDelete = async () => {
    userProjectStore.setUserToDelete(null);
  };

  if (userProjectStore.loading) return <p>Loading...</p>;
  if (userProjectStore.error) return <p>Error: {userProjectStore.error}</p>;

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
        {userProjectStore.userProject?.map((userProject) => (
          <li key={userProject._id}>
            <UserCard
              user={userProject.user}
              onEdit={handleEdit}
              onDelete={() => {
                openDeleteConfirmation(userProject.user);
              }}
            />
          </li>
        ))}
      </ul>

      {userProjectStore.userToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default UserProjectList;
