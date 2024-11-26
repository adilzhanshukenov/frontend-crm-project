import { useEffect } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import Button from '../../shared/button/Button';
import { useRouteParams } from '../../../utils/useRouteParams';
import { observer } from 'mobx-react-lite';
import UserCard from '../../userManagement/user-card/UserCard';
import { User } from '../../../stores/userStore/types';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import { companyStore } from '../../../stores/companyStore/CompanyStore';

const UserCompanyList: React.FC = observer(() => {
  const { companyId } = useRouteParams();

  useEffect(() => {
    companyStore.fetchAllUsersOfCompany(companyId);
  }, [companyId]);

  const openDeleteConfirmation = async (user: User | null) => {
    companyStore.setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (companyStore.userToDelete !== null) {
      await companyStore.deleteUserFromCompany(companyStore.userToDelete?._id);
      companyStore.setUserToDelete(null);
      companyStore.fetchAllUsersOfCompany(companyId);
    }
  };

  const handleCancelDelete = async () => {
    companyStore.setUserToDelete(null);
  };

  const handleEdit = () => {};

  if (companyStore.loading) return <p>Loading...</p>;
  if (companyStore.error) return <p>Error: {companyStore.error}</p>;

  return (
    <div>
      <div className="title-area">
        <h2>Users of company</h2>
        <Button
          title="Assign user"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'addUserToCompany' })}
        />
      </div>
      <div>
        <ul className="list-style">
          {companyStore.companyUser?.map((user) => (
            <li key={user.user._id}>
              <UserCard user={user.user} onEdit={handleEdit} onDelete={() => openDeleteConfirmation(user.user)} />
            </li>
          ))}
        </ul>
      </div>
      {companyStore.userToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default UserCompanyList;
