import rootStore from '../../../stores/rootStore/RootStore';
import Button from '../../shared/buttons/button/Button';
import TaskBoard from '../task-board/TaskBoard';
import './tasklist.css';

const TaskList = () => {
  const { modalStore } = rootStore;
  return (
    <div className="task-list">
      <div className="title-area">
        <h2>Tasks</h2>
        <Button
          title="Add task"
          onClick={() => modalStore.openAnyModal({ mode: 'create', activeModal: 'addTaskModal' })}
        />
      </div>
      <TaskBoard />
    </div>
  );
};
export default TaskList;
