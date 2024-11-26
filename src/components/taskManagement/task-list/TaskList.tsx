import { modalStore } from '../../../stores/modalStore/ModalStore';
import Button from '../../shared/button/Button';
import TaskBoard from '../task-board/TaskBoard';

const TaskList = () => {
  return (
    <div>
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
