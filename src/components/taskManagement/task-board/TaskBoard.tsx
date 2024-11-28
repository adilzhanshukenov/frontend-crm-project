import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { observer } from 'mobx-react-lite';
import StageComponent from '../../stageManagement/stage/StageComponent';
import React, { useEffect, useState } from 'react';
import { useRouteParams } from '../../../utils/useRouteParams';
import { Task } from '../../../stores/taskStore/types';
import { useAuth } from '../../../context/useAuth';
import rootStore from '../../../stores/rootStore/RootStore';

const TaskBoard: React.FC = observer(() => {
  const { projectId } = useRouteParams();
  const { taskStore, stageStore } = rootStore;
  const { user } = useAuth();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  useEffect(() => {
    stageStore.fetchStagesOfProject(projectId);
  }, [projectId, stageStore]);

  const onDragStart = async (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = taskStore.tasks.find((t) => t._id === taskId);
    if (task) setActiveTask(task);
  };

  const onDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;
    console.log('Dragged item:', active.id, 'Dropped on:', over?.id);

    if (!over) return;

    const taskId = active.id as string;

    const newStageId = over.id as string;

    const userId = user?.userId ? user?.userId : undefined;

    await taskStore.moveTaskOptimistically(taskId, newStageId, userId);
    await taskStore.moveTask(taskId, newStageId, userId);
    await stageStore.fetchStagesOfProject(projectId);
    await taskStore.fetchAllTasks(projectId);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {stageStore.projectStage?.map((projectStage) => {
          // console.log(`TaskInStage: ${tasksInStage}`);
          // console.log(`ProjectStage: ${projectStage}`);
          return <StageComponent key={projectStage._id} stage={projectStage.stage} />;
        })}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div
            style={{
              padding: '0.5rem',
              backgroundColor: 'lightblue',
              border: '1px solid black',
            }}
          >
            {activeTask.name}
            <h4>{activeTask.name}</h4>
            <p>{activeTask.description}</p>
            Priority: <p>{activeTask.priority}</p>
            Status: <p>{activeTask.status}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
});

export default TaskBoard;
