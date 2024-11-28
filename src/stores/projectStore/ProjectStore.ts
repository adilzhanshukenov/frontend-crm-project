import { action, makeAutoObservable, observable } from 'mobx';
import { Project, ProjectData, ProjectUser, ProjectUserData } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { User } from '../userStore/types';
import { RootStore } from '../rootStore/RootStore';

export class ProjectStore {
  @observable rootStore: RootStore;
  @observable projects: Project[] = [];
  @observable selectedProject: Project | null = null;
  @observable userToDelete: User | null = null;
  @observable projectUser: ProjectUser[] = [];
  @observable projectRoles: string[] = [];
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.loadSelectedProject();
  }

  @action
  setUserToDelete = async (user: User | null) => {
    this.userToDelete = user;
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
