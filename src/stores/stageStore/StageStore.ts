import { action, makeAutoObservable, observable } from 'mobx';
import { Stage } from './types';
import axiosInstance from '../../utils/axiosInstance';

class StageStore {
  @observable stageList: Stage[] = [];
  @observable currentStage: Stage | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  addStageToCompany = async (stage: Stage) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/stage`, stage);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchAllStages = async (companyId: string | undefined): Promise<void> => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`/stage/${companyId}`);
      this.stageList = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  updateStage = async (updatedStage: Stage) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.put(`/stage/${updatedStage._id}`, updatedStage);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}

export const stageStore = new StageStore();
