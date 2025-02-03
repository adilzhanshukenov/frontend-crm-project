import { observer } from 'mobx-react-lite';
import { Task } from '../../../stores/taskStore/types';
import { useDraggable } from '@dnd-kit/core';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import rootStore from '../../../stores/rootStore/RootStore';
import { useEffect } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import Button from '../../shared/buttons/button/Button';
import './taskitem.css';
import DeleteIconButton from '../../shared/buttons/delete-icon-button/DeleteIconButton';
import { Tooltip } from '@mui/material';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }: TaskItemProps) => {
  const { projectStore, modalStore, taskStore } = rootStore;
  const { projectId } = useRouteParams();
  const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
  });

  useEffect(() => {
    projectStore.fetchUsersOfProject(projectId);
    taskStore.fetchAllTaskStageUsers();
  }, [projectStore, projectId, taskStore, task._id]);

  const dueDate: Date = new Date(task.due_date);

  const style = {
    backgroundColor: isDragging ? 'none' : 'white',
    opacity: isDragging ? 0.5 : 1,
    zIndex: '20',
  };

  const openDeleteConfirmation = (task: Task | null) => {
    taskStore.setTaskToDelete(task);
  };

  return (
    <div className="task-item" style={style}>
      <div className="task-content">
        <div ref={setNodeRef} className="drag-icon-container" {...attributes} {...listeners}>
          <Tooltip title="Drag item here">
            <DragIndicatorIcon
              className="drag-icon"
              sx={{
                transition: 'transform 0.5s ease', // Smooth transition
                '&:hover': {
                  transform: 'scale(1.2)', // Scale on hover
                },
              }}
            />
          </Tooltip>
        </div>
        <h3>{task.name}</h3>
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
      </div>
      <hr />
      {!isDragging && (
        <div className="task-buttons">
          <div style={{ flex: 1 }}>
            User: <b>{taskStore.taskStageUsers.find((tsu) => tsu.task === task._id)?.user?.username}</b>
          </div>
          <Button
            title="Assign user"
            onClick={(e) => {
              e.stopPropagation();
              taskStore.selectTask(task);
              modalStore.openAnyModal({ mode: 'create', activeModal: 'assignUserToTask' });
            }}
          />
          <DeleteIconButton title="Delete task" onClick={() => openDeleteConfirmation(task)} />
        </div>
      )}
    </div>
  );
});

export default TaskItem;
