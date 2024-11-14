import { Position } from '../positionStore/types';
import { Project } from '../projectStore/types';
import { User } from '../userStore/types';

export interface UserProject {
  _id?: string;
  user: User;
  project?: Project | null;
  position: Position;
  role: string;
  assigned_at: Date;
}

export interface UserProjectData {
  user: string;
  project?: string | null;
  position: string;
  role: string;
  assigned_at: Date;
}
