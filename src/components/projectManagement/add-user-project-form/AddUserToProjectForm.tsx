import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import './addusertoprojectform.css';
import { positionStore } from '../../../stores/positionStore/PositionStore';
import { useRouteParams } from '../../../utils/useRouteParams';
import CancelButton from '../../shared/cancel-button/CancelButton';
import { ProjectUserData } from '../../../stores/projectStore/types';
import { projectStore } from '../../../stores/projectStore/ProjectStore';
import { companyStore } from '../../../stores/companyStore/CompanyStore';

const AddUserToProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();

  useEffect(() => {
    positionStore.fetchAllPositions(companyId);
    companyStore.fetchAllUsersOfCompany(companyId);
    projectStore.fetchAllRoles();
  }, [companyId]);

  const [formData, setFormData] = useState<ProjectUserData>({
    user: '',
    project: projectId,
    position: '',
    role: '',
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await projectStore.addUserToProject(formData);
    projectStore.fetchUsersOfProject(projectId);
    modalStore.closeModal();
  };

  const handleChange = async (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const userList = companyStore.companyUser.map((companyUser) => (
    <option key={companyUser._id} value={companyUser.user._id}>
      {companyUser.user.username}
    </option>
  ));

  const positionList = positionStore.positionList.map((position) => (
    <option key={position._id} value={position._id}>
      {position.name}
    </option>
  ));

  const roleList = projectStore.projectRoles.map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Add user to project</h2>
      <div className="modal-form-inputs">
        <label>User:</label>
        <select value={formData.user} name="user" onChange={handleChange}>
          <option>Select user</option>
          {userList}
        </select>
      </div>
      <div className="modal-form-inputs">
        <label>Position:</label>
        <select value={formData.position} name="position" onChange={handleChange}>
          <option>Select position</option>
          {positionList}
        </select>
      </div>
      <div className="modal-form-inputs">
        <label>Role:</label>
        <select value={formData.role} name="role" onChange={handleChange}>
          <option>Select role</option>
          {roleList}
        </select>
      </div>
      <button type="submit">Add user</button>
      <CancelButton />
    </form>
  );
});

export default AddUserToProjectForm;
