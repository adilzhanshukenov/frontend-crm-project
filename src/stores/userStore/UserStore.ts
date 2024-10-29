import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { User, UserCompany, UserData } from './types';
import axiosInstance from '../../utils/axiosInstance';

class UserStore {
  @observable users: User[] = [];
  @observable userCompany: UserCompany[] = [];
  @observable selectedUser: string = '';
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
      console.log(response.data);
      runInAction(() => {
        this.userCompany = response.data;
      });
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
      runInAction(() => {
        this.users = this.users.filter((user) => user._id !== deletedUser?._id);
      });
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
      console.log('whaat?');
      await axiosInstance.post(`/user-company`, userCompany);

      this.success = true;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };
}

export const userStore = new UserStore();
