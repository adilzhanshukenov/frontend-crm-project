import { action, makeAutoObservable, observable } from 'mobx';
import axiosInstance from '../../utils/axiosInstance';

class RoleStore {
  @observable roles: string[] = [];
  @observable loading: boolean = false;
  @observable error = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  fetchAllRoles = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`projectrole`);
      this.roles = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export const roleStore = new RoleStore();
