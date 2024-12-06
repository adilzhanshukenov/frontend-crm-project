import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { Task, TaskData, TaskStageUser, TaskStageUserData } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { UniqueIdentifier } from '@dnd-kit/core';
import { RootStore } from '../rootStore/RootStore';
import { User } from '../userStore/types';

export class TaskStore {
  @observable rootStore: RootStore;
  @observable tasks: Task[] = [];
  @observable taskPriorities: string[] = [];
  @observable taskStatuses: string[] = [];
  @observable taskStageUsers: TaskStageUser[] = [];
  @observable user: User | null = null;
  @observable previousState: Task[] | null = null; // For rollback
  @observable firstStage: string = '';
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
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
  createTaskInStage = async (taskStageUser: TaskStageUserData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.post(`task-stage-user`, taskStageUser);
      this.taskStageUsers = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  assignUserToTask = async (taskId: UniqueIdentifier, userId: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.post(`task-stage-user/assign-user`, { taskId, userId });
      const updatedTaskStageUser = response.data;

      const taskStageUser = this.taskStageUsers.find((tsu) => tsu.task._id === taskId);
      if (taskStageUser) {
        taskStageUser.user._id = updatedTaskStageUser.user;
      }
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
      const tasksResponse = await axiosInstance.get(`task/${projectId}`);
      this.tasks = tasksResponse.data;

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
  moveTaskOptimistically = async (taskId: string, stageId: string, userId?: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    this.previousState = [...this.tasks];

    try {
      const task = this.tasks.find((t) => t._id === taskId);
      if (task) {
        task.stage._id = stageId;
      }

      const taskStageUser = this.taskStageUsers.find((tsu) => tsu.task._id === task?._id);
      if (taskStageUser) {
        taskStageUser.stage._id = stageId;
        if (userId) {
          taskStageUser.user._id = userId;
        }
      }

      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  moveTask = async (taskId: string, stageId: string, userId: string | undefined) => {
    console.log('moveTask: ', { taskId, stageId });
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.patch(`task-stage-user/${taskId}`, { stageId: stageId, userId: userId });
      this.success = true;
    } catch (error) {
      this.rollbackTaskStage();
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  rollbackTaskStage(): void {
    runInAction(() => {
      if (this.previousState) {
        this.tasks = [...this.previousState];
        this.previousState = null;
      }
    });
  }

  @action
  getTasksByStage = (stageId: string | undefined) => {
    //console.log('getTasksByStage: ', { tasks: this.tasks, stageId });
    return this.tasks.filter((task) => task.stage._id === stageId);
  };

  @action
  getUserForTask = async (taskId: UniqueIdentifier) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`task-stage-user/user/${taskId}`);
      this.user = response.data.user;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}
