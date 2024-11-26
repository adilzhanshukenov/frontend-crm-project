import { UniqueIdentifier } from '@dnd-kit/core';
import { Company, Stage } from '../companyStore/types';
import { Position } from '../positionStore/types';
import { User } from '../userStore/types';

export interface Project {
  _id: string;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  company?: Company;
}

export interface ProjectData {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  status: string;
  company?: string;
}

export interface ProjectUser {
  _id?: string;
  user: User;
  project?: Project | null;
  position: Position;
  role: string;
}

export interface ProjectUserData {
  user: string;
  project?: string | null;
  position: string;
  role: string;
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

export interface Role {
  value: string;
  label: string;
}
