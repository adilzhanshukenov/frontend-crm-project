import { useState } from 'react';
import './assignusertocompany.css';
import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { CompanyUserFormData } from '../../../stores/companyStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, TextField } from '@mui/material';

const AssignUserToCompanyForm: React.FC = observer(() => {
  const { companyId } = useRouteParams();
  const { modalStore, userStore, companyStore } = rootStore;

  const [user, setUser] = useState<string>('');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CompanyUserFormData = {
      company: companyId || '', // Use companyId from URL
      user: user,
    };

    await userStore.checkUserExists(user);
    if (userStore.userExists) {
      await userStore.findUserByName(user);
      const formData2 = { ...formData, user: userStore.selectedUser };
      await companyStore.assignUserToCompany(formData2);
    } else {
      console.log('User already exists');
    }
    companyStore.fetchAllUsersOfCompany(companyId);
    modalStore.closeModal();
  };

  return (
    <form className="modal-form " onSubmit={handleFormSubmit}>
      <h2>Assign User</h2>
      <TextField
        variant="outlined"
        required
        className="text-field"
        label="User"
        name="user"
        type="text"
        id="userCompanyInput"
        value={user}
        onChange={handleUserChange}
        placeholder="Enter username"
      />
      <div className="modal-buttons">
        <Button variant="contained" type="submit">
          Assign
        </Button>
        <CancelButton onClick={() => companyStore.fetchAllUsersOfCompany(companyId)} />
      </div>
    </form>
  );
});

export default AssignUserToCompanyForm;
