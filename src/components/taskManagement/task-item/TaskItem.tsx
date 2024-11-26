import { Task } from '../../../stores/taskStore/types';
import { useDraggable } from '@dnd-kit/core';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: `translate(${transform?.x || 0}px, ${transform?.y || 0}px)`,
    marginBottom: '8px',
    padding: '16px',
    color: 'black',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    borderRadius: '4px',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.name}
    </div>
  );
};

export default TaskItem;
