import { action, makeAutoObservable, observable } from 'mobx';
import { Task, TaskData, TaskStageUser, TaskStageUserData } from './types';
import axiosInstance from '../../utils/axiosInstance';

class TaskStore {
  @observable tasks: Task[] = [];
  @observable taskPriorities: string[] = [];
  @observable taskStatuses: string[] = [];
  @observable taskStageUser: TaskStageUser[] = [];
  @observable firstStage: string = '';
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  createTask = async (task: TaskData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.post(`task`, task);
      console.log('createTask: ', { data: response.data });
      if (response.data._id) {
        this.tasks.push(response.data);
      }
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  getFirstStage = async (projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`project-stage/${projectId}/first-stage`);
      console.log('Stage: ', response.data.stage);
      this.firstStage = response.data.stage;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  createTaskInStage = async (taskStageUser: TaskStageUserData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.post(`task-stage-user`, taskStageUser);
      this.taskStageUser = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchAllTasks = async (projectId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`task/${projectId}`);
      //console.log('TASKS:', response.data);
      this.tasks = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  getTaskPriorities = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`taskpriority`);
      this.taskPriorities = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  getTaskStatuses = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`taskstatus`);
      this.taskStatuses = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchStatusAndPriority = async () => {
    await this.getTaskPriorities();
    await this.getTaskStatuses();
  };

  @action
  moveTask = async (taskId: string, stageId: string) => {
    console.log('moveTask: ', { taskId, stageId });
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.patch(`task/${taskId}/stage`, { stage: stageId });
      this.success = true;
    } catch (error) {
      console.error({ error });
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  getTasksByStage = (stageId: string | undefined) => {
    //console.log('getTasksByStage: ', { tasks: this.tasks, stageId });
    return this.tasks.filter((task) => task.stage._id === stageId);
  };
}

export const taskStore = new TaskStore();
