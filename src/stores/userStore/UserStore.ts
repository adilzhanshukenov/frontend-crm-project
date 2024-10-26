import { action, makeAutoObservable, observable } from "mobx";
import { User } from "./types";
import axiosInstance from "../../utils/axiosInstance";

class UserStore {
  @observable users: User[] = [];
  @observable selectedUser: User | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

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
}

export const userStore = new UserStore();
