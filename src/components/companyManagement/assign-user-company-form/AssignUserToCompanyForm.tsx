import { useState } from 'react';
import './assignusertocompany.css';
import { observer } from 'mobx-react-lite';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { CompanyUserFormData } from '../../../stores/companyStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

const AssignUserToCompanyForm: React.FC = observer(() => {
  const { companyId } = useRouteParams();
  const { modalStore, userStore, positionStore, companyStore } = rootStore;

  const [user, setUser] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePositionChange = (e: SelectChangeEvent<string>) => {
    setPosition(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: CompanyUserFormData = {
      company: companyId || '', // Use companyId from URL
      user: user,
      position: position,
    };

    await userStore.checkUserExists(user);
    console.log(userStore.userExists);
    if (userStore.userExists) {
      await userStore.findUserByName(user);
      console.log(userStore.selectedUser);
      const formData2 = { ...formData, user: userStore.selectedUser };
      await companyStore.assignUserToCompany(formData2);
    } else {
      console.log('User already exists');
    }
    companyStore.fetchAllUsersOfCompany(companyId);
    modalStore.closeModal();
  };

  const positionList = positionStore.positionList.map((position) => (
    <MenuItem key={position._id} value={position._id}>
      {position.name}
    </MenuItem>
  ));

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
      <Select label="Position" value={position} onChange={handlePositionChange}>
        <MenuItem disabled value="">
          Select position
        </MenuItem>
        {positionList}
      </Select>
      <Button variant="contained" type="submit">
        Assign
      </Button>
      <CancelButton onClick={() => companyStore.fetchAllUsersOfCompany(companyId)} />
    </form>
  );
});

export default AssignUserToCompanyForm;
