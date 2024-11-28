import { observer } from 'mobx-react-lite';
import { Task } from '../../../stores/taskStore/types';
import { useDraggable } from '@dnd-kit/core';
import rootStore from '../../../stores/rootStore/RootStore';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const { taskStore } = rootStore;
  const { isDragging, attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
  });

  const dueDate: Date = new Date(task.due_date);

  const style = {
    padding: '0.5rem',
    marginBottom: '0.5rem',
    width: '100%',
    color: 'black',
    border: '1px solid #ddd',
    backgroundcolor: isDragging ? 'lightblue' : 'lightgray',
    borderRadius: '4px',
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    transform: isDragging ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 150ms ease, opacity 150ms ease',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
      User: <p>{taskStore.getUsersForTask(task._id).values.toString()}</p>
    </div>
  );
});

export default TaskItem;
