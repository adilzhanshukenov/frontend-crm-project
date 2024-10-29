import { useEffect, useState } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { userStore } from '../../../stores/userStore/UserStore';
import Button from '../../shared/button/Button';
import './assignusertocompany.css';
import { UserCompany } from '../../../stores/userStore/types';
import { useParams } from 'react-router-dom';

const AssignUserToCompanyForm: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('????');
    userStore.setSelectedUser(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('!!!!');
    setRole(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: UserCompany = {
      companyId: companyId || '', // Use companyId from URL
      userId: userStore.selectedUser,
      role: role,
    };

    await userStore.assignUserToCompany(formData);

    userStore.fetchAllUsersOfCompany(companyId);

    modalStore.closeModal();
  };

  const options = userStore.users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ));

  return (
    <form className="user-company-form" onSubmit={handleFormSubmit}>
      <h2>Assign User</h2>
      <div className="company-form-inputs">
        <label htmlFor="userCompanySelect">User:</label>
        <select id="userCompanySelect" value={userStore.selectedUser} onChange={handleUserChange}>
          <option value="">-- Select a user --</option>
          {options}
        </select>
      </div>

      <div className="company-form-inputs">
        <label>Role:</label>
        <input type="text" value={role} onChange={handleRoleChange} placeholder="Enter role" />
      </div>
      <button type="submit">Assign</button>
      <Button title="Cancel" onClick={() => modalStore.closeModal()} />
    </form>
  );
};

export default AssignUserToCompanyForm;
