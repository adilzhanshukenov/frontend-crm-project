import { ChangeEvent, useState } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import rootStore from '../../../stores/rootStore/RootStore';
import { ProjectUser } from '../../../stores/projectStore/types';

interface AssignUserProps {
  taskId: UniqueIdentifier;
  availableUsers: ProjectUser[]; // List of users to assign
}

const AssignUserToTask: React.FC<AssignUserProps> = ({ taskId, availableUsers }) => {
  const { taskStore } = rootStore;
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setSelectedUser(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedUser) return;

    await taskStore.assignUserToTask(taskId, selectedUser);
  };

  const options = availableUsers.map((projectUser) => (
    <option key={projectUser._id} value={projectUser.user._id}>
      {projectUser.user.username}
    </option>
  ));
  return (
    <div>
      <select value={selectedUser || ''} onChange={handleChange}>
        <option>Select user</option>
        {options}
      </select>
      <button type="submit" onClick={handleSubmit}>
        Assign
      </button>
    </div>
  );
};

export default AssignUserToTask;
