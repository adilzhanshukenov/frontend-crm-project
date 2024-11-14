import { action, makeAutoObservable, observable } from 'mobx';
import axiosInstance from '../../utils/axiosInstance';

class ProjectStatusStore {
  @observable projectStatuses: string[] = [];
  @observable loading: boolean = false;
  @observable error = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

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
}

export const projectStatusStore = new ProjectStatusStore();
