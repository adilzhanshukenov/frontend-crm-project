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
import rootStore from '../../../stores/rootStore/RootStore';
import TaskItem from '../task-item/TaskItem';
import './taskboard.css';

const TaskBoard: React.FC = observer(() => {
  const { projectId } = useRouteParams();
  const { taskStore, stageStore } = rootStore;
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
    await taskStore.moveTaskOptimistically(taskId, newStageId);
    await taskStore.moveTask(taskId, newStageId);
    await stageStore.fetchStagesOfProject(projectId);
    await taskStore.fetchAllTasks(projectId);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="task-board">
        {stageStore.projectStage?.map((projectStage) => {
          return <StageComponent key={projectStage._id} stage={projectStage.stage} />;
        })}
      </div>
      {activeTask && (
        <DragOverlay style={{ zIndex: 10 }}>{activeTask ? <TaskItem task={activeTask} /> : null}</DragOverlay>
      )}
    </DndContext>
  );
});

export default TaskBoard;
