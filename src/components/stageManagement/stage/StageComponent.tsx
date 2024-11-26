import { observer } from 'mobx-react-lite';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from '../../taskManagement/task-item/TaskItem';
import { taskStore } from '../../../stores/taskStore/TaskStore';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect } from 'react';
import { Stage } from '../../../stores/companyStore/types';

interface StageComponentProps {
  stage: Stage;
}

const StageComponent: React.FC<StageComponentProps> = observer(({ stage }) => {
  const { isOver, setNodeRef } = useDroppable({ id: stage._id as string });
  const { projectId } = useRouteParams();

  useEffect(() => {
    taskStore.fetchAllTasks(projectId);
  }, [projectId]);

  const tasks = taskStore.getTasksByStage(stage._id);

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '300px',
        height: '400px',
        background: 'black',
        padding: '1rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3>{stage.name}</h3>
      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
});

export default StageComponent;
