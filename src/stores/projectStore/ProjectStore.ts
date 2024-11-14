import { action, makeAutoObservable, observable } from 'mobx';
import { Project, ProjectData } from './types';
import axiosInstance from '../../utils/axiosInstance';

class ProjectStore {
  @observable projects: Project[] = [];
  @observable selectedProject: Project | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSelectedProject = (project: Project) => {
    this.selectedProject = project;
  };

  /**
   *
   * @param project
   */
  @action
  getProject = async (project: Project) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<Project>(`project/${project._id}`);
      this.selectedProject = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param company
   */
  @action
  fetchProjectsOfCompany = async (company?: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<Project[]>(`project/company/${company}`);
      this.projects = response.data;
      this.success = true;
    } catch (error) {
      console.error(error);
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param project
   */
  @action
  addProject = async (project: ProjectData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`project`, project);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export const projectStore = new ProjectStore();
