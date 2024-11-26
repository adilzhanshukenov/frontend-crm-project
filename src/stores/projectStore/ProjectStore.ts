import { action, makeAutoObservable, observable } from 'mobx';
import { Project, ProjectData, ProjectStage, ProjectStageFormData, ProjectUser, ProjectUserData } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { User } from '../userStore/types';
import { Stage } from '../companyStore/types';

class ProjectStore {
  @observable projects: Project[] = [];
  @observable selectedProject: Project | null = null;
  @observable userToDelete: User | null = null;
  @observable projectUser: ProjectUser[] = [];
  @observable projectStage: ProjectStage[] = [];
  @observable stageToDelete: Stage | null = null;
  @observable projectStatuses: string[] = [];
  @observable projectRoles: string[] = [];
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadSelectedProject();
  }

  @action
  setUserToDelete = async (user: User | null) => {
    this.userToDelete = user;
  };

  @action
  setStageToDelete = (stage: Stage | null) => {
    this.stageToDelete = stage;
  };

  @action
  setSelectedProject = (projectId: string) => {
    this.selectedProject = this.projects.find((project) => project._id === projectId) || null;
    if (this.selectedProject) {
      localStorage.setItem('selectedProject', projectId); // Persist selected project ID
    }
  };

  @action
  loadSelectedProject = () => {
    const selectedProjectId = localStorage.getItem('selectedProject');
    if (selectedProjectId) {
      this.selectedProject = this.projects.find((project) => project._id === selectedProjectId) || null;
    }
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
      this.loadSelectedProject();
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

  /**
   *
   * @param projectUser
   */
  @action
  addUserToProject = async (projectUser: ProjectUserData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/user-project`, projectUser);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param projectId
   */
  @action
  fetchUsersOfProject = async (projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`/user-project/${projectId}`);
      this.projectUser = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param userId
   */
  @action
  deleteUserFromProject = async (userId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`/user-project/${userId}`);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  getProjectStatuses = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`projectstatus`);
      this.projectStatuses = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchStagesOfProject = async (projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<ProjectStage[]>(`project-stage/${projectId}`);
      this.projectStage = response.data.sort((a, b) => a.order - b.order);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  addStageToProject = async (projectStage: ProjectStageFormData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`project-stage`, projectStage);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  deleteStageFromProject = async (stageId: string | undefined, projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`project-stage/${projectId}/stages/${stageId}`);
      this.projectStage = this.projectStage.filter((stage) => stage._id !== stageId);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchAllRoles = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`projectrole`);
      this.projectRoles = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export const projectStore = new ProjectStore();
