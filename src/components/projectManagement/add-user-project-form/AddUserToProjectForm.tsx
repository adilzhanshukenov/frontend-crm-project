import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../../shared/button/Button';
import { modalStore } from '../../../stores/modalStore/ModalStore';
import { userProjectStore } from '../../../stores/userProjectStore/UserProjectStore';
import './addusertoprojectform.css';
import { userStore } from '../../../stores/userStore/UserStore';
import { positionStore } from '../../../stores/positionStore/PositionStore';
import { roleStore } from '../../../stores/roleStore/RoleStore';
import { useRouteParams } from '../../../utils/useRouteParams';

interface AddUserToProjectFormProps {
  user: string;
  project: string | null;
  position: string;
  role: string;
  assigned_at: string;
}

const AddUserToProjectForm: React.FC = observer(() => {
  const { projectId, companyId } = useRouteParams();

  useEffect(() => {
    positionStore.fetchAllPositions(companyId);
    userStore.fetchAllUsersOfCompany(companyId);
    roleStore.fetchAllRoles();
  }, [companyId]);

  const [formData, setFormData] = useState<AddUserToProjectFormProps>({
    user: '',
    project: projectId,
    position: '',
    role: '',
    assigned_at: '',
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const convertDateFormData = { ...formData, assigned_at: new Date(formData.assigned_at) };
    console.log(convertDateFormData);
    await userProjectStore.addUserToProject(convertDateFormData);
    userProjectStore.fetchUsersOfProject(projectId);
    modalStore.closeModal();
  };

  const handleChange = async (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const userList = userStore.userCompany.map((userCompany) => (
    <option key={userCompany._id} value={userCompany.user._id}>
      {userCompany.user.username}
    </option>
  ));

  const positionList = positionStore.positionList.map((position) => (
    <option key={position._id} value={position._id}>
      {position.name}
    </option>
  ));

  const roleList = roleStore.roles.map((role) => <option value={role}>{role}</option>);

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
      <div className="modal-form-inputs">
        <label>Assigned on:</label>
        <input type="date" name="assigned_at" value={formData.assigned_at} onChange={handleChange} />
      </div>
      <button type="submit">Add user</button>
      <Button
        title="Cancel"
        onClick={() => {
          modalStore.closeModal();
        }}
      />
    </form>
  );
});

export default AddUserToProjectForm;
