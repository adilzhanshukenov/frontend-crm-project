import { action, makeAutoObservable, observable } from 'mobx';
import { Position } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { RootStore } from '../rootStore/RootStore';

export class PositionStore {
  @observable rootStore: RootStore;
  @observable positionList: Position[] = [];
  @observable currentPosition: Position | null = null;
  @observable positionToDelete: Position | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setPositionToDelete = async (position: Position | null) => {
    this.positionToDelete = position;
  };

  /**
   *
   * @param position
   */
  @action
  addPositionToCompany = async (position: Position) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/position`, position);
      this.success = true;
    } catch (error) {
      this.error = error.response?.data?.message;
      console.log(error.response?.data?.message)
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param companyId
   */
  @action
  fetchAllPositions = async (companyId: string | null): Promise<void> => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<Position[]>(`/position/${companyId}`);
      this.positionList = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param updatedPosition
   */
  @action
  updatePosition = async (updatedPosition: Position) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.put(`/position/${updatedPosition._id}`, updatedPosition);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param positionId
   */
  @action
  deletePosition = async (positionId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`/position/${positionId}`);
      this.positionList = this.positionList.filter((position) => position._id !== positionId);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };
}
