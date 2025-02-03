import { action, makeAutoObservable, observable } from 'mobx';
import { User, UserData } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { RootStore } from '../rootStore/RootStore';

export class UserStore {
  @observable rootStore: RootStore;
  @observable users: User[] = [];
  @observable userToDelete: User | null = null;
  @observable selectedUser: string = '';
  @observable currentUser: User | null = null;
  @observable userExists: boolean = false;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setSelectedUser = async (user: string) => {
    this.selectedUser = user;
  };

  @action
  setUserToDelete = async (user: User | null) => {
    this.userToDelete = user;
  };

  //load all users
  @action
  fetchAllUsers = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<User[]>(`/user`);
      this.users = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param user
   */
  @action
  createUser = async (user: UserData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post<User>(`/user`, user);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param updatedUser
   */
  @action
  updateUser = async (updatedUser: User) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.put(`/user/${updatedUser._id}`, updatedUser);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param deletedUser
   */
  @action
  deleteUser = async (deletedUser: User) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`/user/${deletedUser._id}`);
      this.users = this.users.filter((user) => user._id !== deletedUser?._id);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param username
   */
  @action
  checkUserExists = async (username: string) => {
    try {
      const response = await axiosInstance.get(`/user/exists?username=${username}`);
      this.userExists = response.data.exists;
    } catch (error) {
      this.error = error;
      console.error('Error checking user existence:', error);
      this.userExists = false;
    }
  };

  /**
   *
   * @param username
   */
  @action
  findUserByName = async (username: string) => {
    try {
      const response = await axiosInstance.get(`/user/byusername/${username}`);
      this.selectedUser = response.data._id;
    } catch (error) {
      this.error = error;
      console.error('Error checking user existence:', error);
      this.userExists = false;
    }
  };
}
