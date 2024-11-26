import { observer } from 'mobx-react-lite';
import CancelButton from '../../shared/cancel-button/CancelButton';
import { FormEvent, useEffect, useState } from 'react';
import { TaskData } from '../../../stores/taskStore/types';
import { useRouteParams } from '../../../utils/useRouteParams';
import { taskStore } from '../../../stores/taskStore/TaskStore';
import { modalStore } from '../../../stores/modalStore/ModalStore';

interface TaskFormData {
  name: string;
  description: string;
  status: string;
  due_date: string;
  priority: string;
  project: string | null;
  stage: string;
}

interface TaskStageUserFormData {
  task: string;
  stage: string;
  user: string;
}

const AddTaskForm: React.FC = observer(() => {
  const { projectId } = useRouteParams();

  useEffect(() => {
    taskStore.fetchStatusAndPriority();
    taskStore.getFirstStage(projectId);
  }, [projectId]);

  const [formData, setFormData] = useState<TaskFormData>({
    name: '',
    description: '',
    status: '',
    due_date: '',
    priority: '',
    project: projectId,
    stage: '',
  });

  const [taskStageUserFormData, setTaskStageUserFormData] = useState<TaskStageUserFormData>({
    task: '',
    stage: taskStore.firstStage,
    user: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    <option key={taskStatus} value={taskStatus}>
      {taskStatus}
    </option>
  ));

  const taskPriorities = taskStore.taskPriorities.map((taskPriority) => (
    <option key={taskPriority} value={taskPriority}>
      {taskPriority}
    </option>
  ));

  return (
    <form className="modal-form" onSubmit={handleFormSubmit}>
      <div className="modal-form-inputs">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Select status</option>
          {taskStatuses}
        </select>
      </div>
      <div className="modal-form-inputs">
        <label>Due date:</label>
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />
      </div>
      <div className="modal-form-inputs">
        <label>Priority:</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option>Select priority</option>
          {taskPriorities}
        </select>
      </div>
      <button type="submit">Add task</button>
      <CancelButton />
    </form>
  );
});

export default AddTaskForm;
