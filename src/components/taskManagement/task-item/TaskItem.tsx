import { observer } from 'mobx-react-lite';
import { Task } from '../../../stores/taskStore/types';
import { useDraggable } from '@dnd-kit/core';
import rootStore from '../../../stores/rootStore/RootStore';
import AssignUserToTask from '../assign-user-to-task/AssignUserToTask';
import { useEffect } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/buttons/button/Button';
import Modal from '../../shared/modal/Modal';
import './taskitem.css';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const { projectStore, modalStore, taskStore } = rootStore;
  const { projectId } = useRouteParams();
  const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
  });

  useEffect(() => {
    projectStore.fetchUsersOfProject(projectId);
    taskStore.getUserForTask(task._id);
  }, [projectStore, projectId, taskStore, task._id]);

  const dueDate: Date = new Date(task.due_date);

  const style = {
    backgroundColor: isDragging ? 'none' : 'white',
    opacity: isDragging ? 0.5 : 1,
    zIndex: '20',
  };

  return (
    <div className="task-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h4>{task.name}</h4>
      <p>{task.description}</p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        Due date: <p>{dueDate.toLocaleDateString()}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        Priority: <p>{task.priority}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        Status: <p>{task.status}</p>
      </div>
      <div>
        User: <b>{taskStore.user?.username}</b>
      </div>
      {!isDragging && (
        <Button
          title="Assign user"
          onClick={(e) => {
            e.stopPropagation();
            modalStore.openAnyModal({ mode: 'create', activeModal: 'assignUserToTask' });
          }}
        />
      )}

      <Modal>
        {modalStore.activeModal === 'assignUserToTask' && (
          <AssignUserToTask taskId={task._id} availableUsers={projectStore.projectUser} />
        )}
      </Modal>
    </div>
  );
});

export default TaskItem;
