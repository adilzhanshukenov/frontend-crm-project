import { ChangeEvent, useState } from 'react';
import { Button, MenuItem, SelectChangeEvent } from '@mui/material';
import rootStore from '../../../stores/rootStore/RootStore';
import { ProjectUser } from '../../../stores/projectStore/types';
import { Task } from '../../../stores/taskStore/types';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import './assignusertotask.css';
import SelectComponent from '../../shared/select/SelectComponent';
import { useRouteParams } from '../../../utils/useRouteParams';

interface AssignUserProps {
  taskId: Task | null;
  availableUsers: ProjectUser[]; // List of users to assign
}

const AssignUserToTask: React.FC<AssignUserProps> = ({ taskId, availableUsers }: AssignUserProps) => {
  const { taskStore, modalStore } = rootStore;
  const { projectId } = useRouteParams();
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleChange = async (e: ChangeEvent<HTMLSelectElement> | SelectChangeEvent) => {
    e.stopPropagation();
    console.log(e.target.value);
    setSelectedUser(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;
    await taskStore.assignUserToTask(taskId, selectedUser);
    await taskStore.fetchAllTasks(projectId);
    modalStore.closeModal();
  };

  const options = availableUsers.map((projectUser) => (
    <MenuItem key={projectUser._id} value={projectUser.user._id}>
      {projectUser.user.username}
    </MenuItem>
  ));
  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h2>Assign user</h2>
      <SelectComponent
        label="User"
        name="user"
        title="User"
        items={options}
        onChange={handleChange}
        value={selectedUser || ''}
        placeholder="Select user"
      />
      <div className="modal-buttons">
        <Button type="submit" variant="contained">
          Assign
        </Button>
        <CancelButton onClick={() => {}} />
      </div>
    </form>
  );
};

export default AssignUserToTask;
