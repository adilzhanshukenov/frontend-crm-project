import { action, makeAutoObservable, observable } from 'mobx';
import { User, UserCompany, UserData } from './types';
import axiosInstance from '../../utils/axiosInstance';

class UserStore {
  @observable users: User[] = [];
  @observable userCompany: UserCompany[] = [];
  @observable selectedUser: string = '';
  @observable userExists: boolean = false;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  setSelectedUser = async (user: string) => {
    this.selectedUser = user;
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

  //load all users
  @action
  fetchAllUsersOfCompany = async (companyId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;
    try {
      const response = await axiosInstance.get<UserCompany[]>(`/user-company/${companyId}`);
      this.userCompany = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

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

  @action
  assignUserToCompany = async (userCompany: UserCompany) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/user-company`, userCompany);
      this.success = true;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  @action
  checkUserExists = async (username: string) => {
    try {
      const response = await axiosInstance.get(`/user/exists?username=${username}`);
      console.log(response.data);
      this.userExists = response.data.exists;
    } catch (error) {
      this.error = error;
      console.error('Error checking user existence:', error);
      this.userExists = false;
    }
  };

  @action
  findUserByName = async (username: string) => {
    try {
      const response = await axiosInstance.get(`/user/byusername/${username}`);
      console.log(response.data);
      this.selectedUser = response.data._id;
    } catch (error) {
      this.error = error;
      console.error('Error checking user existence:', error);
      this.userExists = false;
    }
  };
}

export const userStore = new UserStore();
