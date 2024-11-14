import { action, makeAutoObservable, observable } from 'mobx';
import axiosInstance from '../../utils/axiosInstance';
import { UserProject, UserProjectData } from './types';
import { User } from '../userStore/types';

class UserProjectStore {
  @observable userProject: UserProject[] = [];
  @observable userToDelete: User | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setUserToDelete = async (user: User | null) => {
    this.userToDelete = user;
  };

  /**
   *
   * @param userProject
   */
  @action
  addUserToProject = async (userProject: UserProjectData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/user-project`, userProject);
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
      this.userProject = response.data;
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
}

export const userProjectStore = new UserProjectStore();
