import { observer } from 'mobx-react-lite';
import CancelButton from '../../shared/buttons/cancel-button/CancelButton';
import { FormEvent, useEffect, useState } from 'react';
import { TaskData } from '../../../stores/taskStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';
import rootStore from '../../../stores/rootStore/RootStore';
import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

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
    status: '',
    due_date: '',
    priority: '',
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
    console.log(convertDateFormData);
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

      <Select variant="outlined" name="status" value={formData.status} onChange={handleChange}>
        <MenuItem disabled value="">
          Select status
        </MenuItem>
        {taskStatuses}
      </Select>

      <TextField
        type="date"
        variant="outlined"
        label="Due date"
        name="due_date"
        value={formData.due_date}
        onChange={handleChange}
        placeholder="Choose date"
      />

      <Select variant="standard" name="priority" value={formData.priority} onChange={handleChange}>
        <MenuItem disabled value="">
          Select priority
        </MenuItem>
        {taskPriorities}
      </Select>
      <Button type="submit" variant="contained">
        Add task
      </Button>
      <CancelButton onClick={() => taskStore.fetchAllTasks(projectId)} />
    </form>
  );
});

export default AddTaskForm;
