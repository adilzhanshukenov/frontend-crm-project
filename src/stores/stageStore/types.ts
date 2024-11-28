import { UniqueIdentifier } from '@dnd-kit/core';
import { Project } from '../projectStore/types';

export interface Stage {
  _id?: string;
  name: string;
  description: string;
  company?: string | null;
}

export interface StageFormData {
  name: string;
  description: string;
  company?: string | null;
}

export interface ProjectStage {
  _id?: UniqueIdentifier;
  project: Project;
  stage: Stage;
  order: number;
}

export interface ProjectStageFormData {
  project: string | null;
  stage: string;
  order: number;
}
