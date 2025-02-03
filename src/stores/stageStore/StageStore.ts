import { action, makeAutoObservable, observable } from 'mobx';
import axiosInstance from '../../utils/axiosInstance';
import { ProjectStage, ProjectStageFormData, Stage } from './types';
import { RootStore } from '../rootStore/RootStore';

export class StageStore {
  @observable rootStore: RootStore;
  @observable stageList: Stage[] = [];
  @observable projectStage: ProjectStage[] = [];
  @observable stageToDelete: Stage | null = null;
  @observable currentStage: Stage | null = null;
  @observable currentStageProject: ProjectStage | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
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

  @action
  setCurrentStageProject = async (stageProject: ProjectStage | null) => {
    this.currentStageProject = stageProject;
  }

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
      await axiosInstance.post(`stage`, stage);
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
      const response = await axiosInstance.get(`stage/${companyId}`);
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
      await axiosInstance.put(`stage/${updatedStage._id}`, updatedStage);
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

  @action
  fetchStagesOfProject = async (projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<ProjectStage[]>(`project-stage/${projectId}`);
      this.projectStage = response.data.sort((a, b) => a.order - b.order);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  addStageToProject = async (projectStage: ProjectStageFormData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`project-stage`, projectStage);
      this.success = true;
    } catch (error) {
      if(error.response?.status === 403) {
        alert(error.response.data.message)
      }
    } finally {
      this.loading = false;
    }
  };

  @action
  deleteStageFromProject = async (stageId: string | undefined, projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`project-stage/${projectId}/stages/${stageId}`);
      this.projectStage = this.projectStage.filter((stage) => stage._id !== stageId);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}
