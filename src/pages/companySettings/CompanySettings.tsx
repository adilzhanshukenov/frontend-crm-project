import { useEffect } from 'react';
import AssignUserToCompanyForm from '../../components/companyManagement/assign-user-company-form/AssignUserToCompanyForm';
import Button from '../../components/shared/button/Button';
import Modal from '../../components/shared/modal/Modal';
import { modalStore } from '../../stores/modalStore/ModalStore';
import { userStore } from '../../stores/userStore/UserStore';
import { useParams } from 'react-router-dom';
import './companysettings.css';

const CompanySettings = () => {
  const { companyId } = useParams<{ companyId: string }>();

  useEffect(() => {
    userStore.fetchAllUsers();
    userStore.fetchAllUsersOfCompany(companyId);
  }, [companyId]);

  const getUsernameById = (id: string) => {
    const user = userStore.users.find((user) => user._id === id);
    return user ? user.username : 'Unknown User';
  };

  return (
    <div className="company-settings">
      <h1> Settings </h1>
      <h2>Users of company</h2>
      <div className="users-company">
        <ul>
          {userStore.userCompany.map((user) => (
            <li key={user.userId}>{getUsernameById(user.userId)}</li>
          ))}
        </ul>
        <Button title="Assign user" onClick={() => modalStore.openModal()} />
      </div>

      <Modal>
        <AssignUserToCompanyForm />
      </Modal>
    </div>
  );
};

export default CompanySettings;
