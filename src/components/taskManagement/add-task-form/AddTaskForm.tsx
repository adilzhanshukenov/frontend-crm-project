import { observer } from 'mobx-react-lite';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { FormEvent, useEffect, useState } from 'react';
import { TaskData } from '../../../stores/taskStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import SelectComponent from '../../shared/select/SelectComponent';

interface TaskFormData {
  name: string;
  description: string;
  status: string;
  due_date: string;
  priority: string;
  project: string | null;
  stage: string;
}

const AddTaskForm: React.FC = observer(() => {
  const { projectId } = useRouteParams();
  const { taskStore, modalStore } = rootStore;

  useEffect(() => {
    taskStore.fetchStatusAndPriority();
  }, [projectId, taskStore]);

  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    status: 'Pending',
    due_date: '',
    priority: 'Medium',
    project: projectId,
    stage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const convertDateFormData: TaskData = {
      ...formData,
      due_date: new Date(formData.due_date),
      stage: taskStore.firstStage,
    };
    await taskStore.createTask(convertDateFormData);
    await taskStore.fetchAllTasks(projectId);
    modalStore.closeModal();
  };

  const taskStatuses = taskStore.taskStatuses.map((taskStatus) => (
    <MenuItem key={taskStatus} value={taskStatus}>
      {taskStatus}
    </MenuItem>
  ));

  const taskPriorities = taskStore.taskPriorities.map((taskPriority) => (
    <MenuItem key={taskPriority} value={taskPriority}>
      {taskPriority}
    </MenuItem>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <h2>Add task</h2>
      <TextField
        type="text"
        variant="outlined"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        type="text"
        variant="outlined"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <SelectComponent
        label="Status"
        name="status"
        title="Status"
        items={taskStatuses}
        onChange={handleChange}
        value={formData.status}
        placeholder="Select status"
      />

      <TextField
        slotProps={{ inputLabel: { shrink: true } }}
        type="date"
        variant="outlined"
        label="Due date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        placeholder="Choose date"
      />

      <Select variant="outlined" name="priority" value={formData.priority} onChange={handleChange}>
        <MenuItem disabled value="">
          Select priority
        </MenuItem>
        {taskPriorities}
      </Select>
      <div className="modal-buttons">
        <Button type="submit" variant="contained">
          Add task
        </Button>
        <CancelButton onClick={() => taskStore.fetchAllTasks(projectId)} />
      </div>
    </form>
  );
});

export default AddTaskForm;
