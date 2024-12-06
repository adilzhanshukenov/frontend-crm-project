import { observer } from 'mobx-react-lite';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from '../../taskManagement/task-item/TaskItem';
import { useRouteParams } from '../../../utils/useRouteParams';
import { useEffect } from 'react';
import { Stage } from '../../../stores/stageStore/types';
import rootStore from '../../../stores/rootStore/RootStore';
import './stagecomponent.css';

interface StageComponentProps {
  stage: Stage;
}

const StageComponent: React.FC<StageComponentProps> = observer(({ stage }) => {
  const { projectId } = useRouteParams();
  const { setNodeRef } = useDroppable({ id: stage._id as string });
  const { taskStore } = rootStore;

  useEffect(() => {
    taskStore.fetchAllTasks(projectId);
  }, [projectId, taskStore]);

  const tasks = taskStore.getTasksByStage(stage._id);

  return (
    <div
      ref={setNodeRef}
      className="stage-component"
      style={{
        transition: 'background-color 150ms ease',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{stage.name}</h3>
      <SortableContext items={tasks.map((task) => task._id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
});

export default StageComponent;
