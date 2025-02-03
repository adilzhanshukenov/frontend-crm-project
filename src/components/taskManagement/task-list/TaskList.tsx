import { observer } from 'mobx-react-lite';
import rootStore from '../../../stores/rootStore/RootStore';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/buttons/button/Button';
import ConfirmationModal from '../../shared/confirmation-modal/ConfirmationModal';
import TaskBoard from '../task-board/TaskBoard';
import './tasklist.css';

const TaskList = observer(() => {
  const { modalStore, taskStore } = rootStore;
  const { projectId } = useRouteParams();

  const handleConfirmDelete = async () => {
    const status = 'Archived';
    if (taskStore.taskToDelete !== null) {
      await taskStore.archiveTask(taskStore.taskToDelete._id, status);
      taskStore.setTaskToDelete(null);
    }
    await taskStore.fetchAllTasks(projectId);
  };

  const handleCancelDelete = () => {
    taskStore.setTaskToDelete(null);
  };

  return (
    <div className="task-list">
      <div className="title-area">
        <h2>Tasks</h2>
        <Button
          title="Add task"
          onClick={() => {
            modalStore.openAnyModal({ mode: 'create', activeModal: 'addTaskModal' });
          }}
        />
      </div>
      <TaskBoard />
      {taskStore.taskToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this company?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
});

export default TaskList;
