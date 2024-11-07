import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { userStore } from '../../stores/userStore/UserStore';
import HeaderTitle from '../../components/shared/header-title/HeaderTitle';
import UserCard from '../../components/userManagement/user-card/UserCard';
import './userlist.css';
import { modalStore } from '../../stores/modalStore/ModalStore';
import { User } from '../../stores/userStore/types';
import ConfirmationModal from '../../components/shared/confirmation-modal/ConfirmationModal';
import Modal from '../../components/shared/modal/Modal';
import UserForm from '../../components/userManagement/user-form/UserForm';

const UsersList: React.FC = observer(() => {
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const handleFormSubmit = async (user: User) => {
    if (modalStore.mode === 'edit') {
      await userStore.updateUser(user);
    } else {
      await userStore.createUser(user);
    }
    userStore.fetchAllUsers();
    modalStore.closeModal();
  };

  const openDeleteConfirmation = (user: User | null) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = () => {
    if (userToDelete !== null) {
      userStore.deleteUser(userToDelete);
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const handleUserCreated = () => {
    userStore.fetchAllUsers();
    modalStore.closeModal();
    // Refetch users after user creation
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
              modalStore.currentUser = user;
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

      <Modal>
        {modalStore.activeModal === 'createEditUser' && (
          <UserForm user={modalStore.currentUser} onSubmit={handleFormSubmit} handleClose={handleUserCreated} />
        )}
      </Modal>
      {userToDelete !== null && (
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
