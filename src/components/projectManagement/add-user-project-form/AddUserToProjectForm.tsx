import { observer } from 'mobx-react-lite';
import { FormEvent, useEffect, useState } from 'react';
import './addusertoprojectform.css';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { ProjectUserData } from '../../../stores/projectStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, SelectChangeEvent } from '@mui/material';
import SelectComponent from '../../shared/select/SelectComponent';

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
    await projectStore.fetchUsersOfProject(projectId);
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

      <SelectComponent
        title="User"
        label="User"
        name="user"
        value={formData.user}
        onChange={handleChange}
        items={userList}
        placeholder="Select user"
      />

      <SelectComponent
        title="Position"
        label="Position"
        name="position"
        value={formData.position}
        onChange={handleChange}
        items={positionList}
        placeholder=" Select position"
      />

      <SelectComponent
        title="Role"
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        items={roleList}
        placeholder="  Select role"
      />
      <div className="modal-buttons">
        <Button type="submit" variant="contained">
          Add user
        </Button>
        <CancelButton onClick={() => projectStore.fetchUsersOfProject(projectId)} />
      </div>
    </form>
  );
});

export default AddUserToProjectForm;
