import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';
import StageComponent from '../../stageManagement/stage/StageComponent';
import { useEffect } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import { taskStore } from '../../../stores/taskStore/TaskStore';
import { projectStore } from '../../../stores/projectStore/ProjectStore';

const TaskBoard: React.FC = observer(() => {
  const { projectId } = useRouteParams();

  useEffect(() => {
    projectStore.fetchStagesOfProject(projectId);
  }, [projectId]);

  const onDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('Dragged item:', active.id, 'Dropped on:', over?.id);

    if (!over) return;

    const taskId = active.id as string;
    const newStageId = over.id as string;
    await taskStore.moveTask(taskId, newStageId);
    await projectStore.fetchStagesOfProject(projectId);
    await taskStore.fetchAllTasks(projectId);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {projectStore.projectStage?.map((projectStage) => {
          // console.log(`TaskInStage: ${tasksInStage}`);
          // console.log(`ProjectStage: ${projectStage}`);
          return <StageComponent key={projectStage._id} stage={projectStage.stage} />;
        })}
      </div>
    </DndContext>
  );
});

export default TaskBoard;
