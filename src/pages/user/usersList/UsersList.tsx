import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { userStore } from '../../../stores/userStore/UserStore';
import HeaderTitle from '../../../components/shared/header-title/HeaderTitle';
import UserCard from '../../../components/userManagement/user-card/UserCard';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { User } from '../../../stores/userStore/types';
import ConfirmationModal from '../../../components/shared/confirmation-modal/ConfirmationModal';
import Modal from '../../../components/shared/modal/Modal';
import UserForm from '../../../components/userManagement/user-form/UserForm';
import './userlist.css';

const UsersList: React.FC = observer(() => {
  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const handleConfirmDelete = () => {
    if (userStore.userToDelete !== null) {
      userStore.deleteUser(userStore.userToDelete);
      userStore.setUserToDelete(null);
    }
  };

  const openDeleteConfirmation = (user: User | null) => {
    userStore.setUserToDelete(user);
  };

  const handleCancelDelete = () => {
    userStore.setUserToDelete(null);
  };

  if (userStore.loading) return <p>Loading...</p>;
  if (userStore.error) return <p>Error: {userStore.error}</p>;

  const usersList = (
    <ul className="list-style">
      {userStore.users?.map((user) => (
        <li key={user._id}>
          <UserCard
            user={user}
            onEdit={() => {
              userStore.currentUser = user;
              modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditUser' });
            }}
            onDelete={() => openDeleteConfirmation(user)}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="user-title-area">
        <HeaderTitle title="Users" />
      </div>

      {usersList}

      <Modal>{modalStore.activeModal === 'createEditUser' && <UserForm user={userStore.currentUser} />}</Modal>

      {userStore.userToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default UsersList;
