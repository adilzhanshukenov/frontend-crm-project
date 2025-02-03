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
  @observable selectedTask: Task | null = null;
  @observable user: User | null = null;
  @observable previousState: Task[] | null = null; // For rollback
  @observable taskToDelete: Task | null = null;
  @observable firstStage: string = '';
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setTaskToDelete = (task: Task | null) => {
    this.taskToDelete = task;
  }

  @action
  selectTask = async (task: Task | null) => {
    this.selectedTask = task;
  };

  @action
  createTask = async (task: TaskData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.post(`task`, task);
      if (response.data._id) {
        this.tasks.push(response.data);
      }
      this.success = true;
    } catch (error) {
      if(error.response?.status === 403) {
        alert(error.response.data.message); // Show message to user
      }
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchAllTaskStageUsers = async () => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`task-stage-user`);
      this.taskStageUsers = response.data;
    } catch (error) {
      this.error = error;
    }
    finally {
      this.loading = false;
    }
  }


  @action
  createTaskInStage = async (taskStageUser: TaskStageUserData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`task-stage-user`, taskStageUser);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  assignUserToTask = async (task: Task | null, userId: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    const taskId = task?._id;

    try {
      const response = await axiosInstance.post(`task-stage-user/assign-user`, { task: taskId, user: userId });
      const updatedTaskStageUser = await response.data;

      const taskStageUser = this.taskStageUsers.find((tsu) => tsu.task === task?._id);
      if (taskStageUser) {
        taskStageUser.user._id = await updatedTaskStageUser.user;
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
  moveTaskOptimistically = async (taskId: string, stageId: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    this.previousState = [...this.tasks];

    try {
      const task = this.tasks.find((t) => t._id === taskId);
      if (task) {
        task.stage._id = stageId;
      }

      const taskStageUser = this.taskStageUsers.find((tsu) => tsu.task === task?._id);
      if (taskStageUser) {
        taskStageUser.stage._id = stageId;
      }

      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  moveTask = async (taskId: string, stageId: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.patch(`task-stage-user/${taskId}`, { stage: stageId});
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
    return this.tasks.filter((task) => task.stage._id === stageId);
  };

  @action
  getUserForTask = async (taskId: UniqueIdentifier): Promise<User | undefined> => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get(`task-stage-user/${taskId}/user`);
      console.log(response.data.user)
      if (response) return response.data.user;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  archiveTask = async (taskId: UniqueIdentifier, status: string) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.patch(`task/${taskId}/archive`, {status: status});
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  }
}
