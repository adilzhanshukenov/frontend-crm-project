import { observer } from 'mobx-react-lite';
import { FormEvent, useEffect, useState } from 'react';
import './addusertoprojectform.css';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { ProjectUserData } from '../../../stores/projectStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const AddUserToProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();
  const { positionStore, projectStore, companyStore, modalStore } = rootStore;

  useEffect(() => {
    positionStore.fetchAllPositions(companyId);
    companyStore.fetchAllUsersOfCompany(companyId);
    projectStore.fetchAllRoles();
  }, [companyId, projectId, positionStore, projectStore, companyStore]);

  const [formData, setFormData] = useState<ProjectUserData>({
    user: '',
    project: projectId,
    position: '',
    role: '',
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await projectStore.addUserToProject(formData);
    modalStore.closeModal();
  };

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const userList = companyStore.companyUser.map((companyUser) => (
    <MenuItem key={companyUser._id} value={companyUser.user._id}>
      {companyUser.user.username}
    </MenuItem>
  ));

  const positionList = positionStore.positionList.map((position) => (
    <MenuItem key={position._id} value={position._id}>
      {position.name}
    </MenuItem>
  ));

  const roleList = projectStore.projectRoles.map((role) => (
    <MenuItem key={role} value={role}>
      {role}
    </MenuItem>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Add user to project</h2>
      <Select
        label="User"
        value={formData.user}
        name="user"
        onChange={handleChange}
        sx={{
          '& .MuiInputLabel-root': {
            color: 'black', // Optional, in case nested styling is needed
          },
        }}
      >
        <MenuItem disabled value="">
          Select user
        </MenuItem>
        {userList}
      </Select>
      <Select label="Position" value={formData.position} name="position" onChange={handleChange}>
        <MenuItem disabled value="">
          Select position
        </MenuItem>
        {positionList}
      </Select>
      <Select label="Role" value={formData.role} name="role" onChange={handleChange}>
        <MenuItem disabled value="">
          Select role
        </MenuItem>
        {roleList}
      </Select>
      <Button type="submit" variant="contained">
        Add user
      </Button>
      <CancelButton onClick={() => projectStore.fetchUsersOfProject(projectId)} />
    </form>
  );
});

export default AddUserToProjectForm;
