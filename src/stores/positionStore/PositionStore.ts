import { action, makeAutoObservable, observable } from 'mobx';
import { Position } from './types';
import axiosInstance from '../../utils/axiosInstance';

class PositionStore {
  @observable positionList: Position[] = [];
  @observable currentPosition: Position | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  //может перевести в свой стор
  @action
  addPositionToCompany = async (position: Position) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/position`, position);
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  fetchAllPositions = async (companyId: string | undefined): Promise<void> => {
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
}

export const positionStore = new PositionStore();
