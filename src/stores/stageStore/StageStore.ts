import { action, makeAutoObservable, observable } from 'mobx';
import { Stage } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { modalStore } from '../modalStore/ModalStore';

class StageStore {
  @observable stageList: Stage[] = [];
  @observable stageToDelete: Stage | null = null;
  @observable currentStage: Stage | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   *
   * @param stage
   */
  @action
  setStageToDelete = async (stage: Stage | null) => {
    this.stageToDelete = stage;
  };

  /**
   *
   * @param stage
   */
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

  /**
   *
   * @param companyId
   */
  @action
  fetchAllStages = async (companyId: string | null): Promise<void> => {
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

  /**
   *
   * @param updatedStage
   */
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

  @action
  deleteStage = async (stageId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`stage/${stageId}`);
      this.stageList = this.stageList.filter((stage) => stage._id !== stageId);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  openModalForCreate = () => {
    stageStore.currentStage = null;
    modalStore.openAnyModal({ mode: 'create', activeModal: 'createEditStage' });
  };

  openModalForEdit = () => {
    modalStore.openAnyModal({ mode: 'edit', activeModal: 'createEditStage' });
  };
}

export const stageStore = new StageStore();
