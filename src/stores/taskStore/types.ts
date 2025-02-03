import { UniqueIdentifier } from '@dnd-kit/core';
import { Project } from '../projectStore/types';
import { User } from '../userStore/types';
import { Stage } from '../stageStore/types';

export interface Task {
  _id: UniqueIdentifier;
  name: string;
  description: string;
  status: string;
  due_date: Date;
  priority: string;
  project: Project | null;
  stage: Stage;
}

export interface TaskData {
  name: string;
  description: string;
  status: string;
  due_date: Date;
  priority: string;
  project: string | null;
  stage: string | null;
}

export interface TaskStageUser {
  task: string;
  stage: Stage;
  user: User;
}

export interface TaskStageUserData {
  task: string;
  stage: string;
  user: string;
}
