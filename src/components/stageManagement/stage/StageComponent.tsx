import { observer } from 'mobx-react-lite';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from '../../taskManagement/task-item/TaskItem';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect } from 'react';
import { Stage } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';

interface StageComponentProps {
  stage: Stage;
}

const StageComponent: React.FC<StageComponentProps> = observer(({ stage }) => {
  const { projectId } = useRouteParams();
  const { isOver, setNodeRef } = useDroppable({ id: stage._id as string });
  const { taskStore } = rootStore;

  useEffect(() => {
    taskStore.fetchAllTasks(projectId);
  }, [projectId, taskStore]);

  const tasks = taskStore.getTasksByStage(stage._id);

  return (
    <div
      ref={setNodeRef}
      style={{
        border: '1px solid black',
        padding: '1rem',
        minWidth: '200px',
        backgroundColor: isOver ? 'lightyellow' : 'white',
        transition: 'background-color 150ms ease',
        color: 'black',
        flex: '1',
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
