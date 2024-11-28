import { action, makeAutoObservable, observable } from 'mobx';
import { RootStore } from '../rootStore/RootStore';

export class TabStore {
  @observable rootStore: RootStore;
  @observable activeTab: number = 0;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    const savedTab = sessionStorage.getItem('activeTab');
    this.activeTab = savedTab ? parseInt(savedTab, 10) : 0;
    makeAutoObservable(this);
  }

  @action
  setActiveTab = async (index: number) => {
    this.activeTab = index;
    sessionStorage.setItem('activeTab', String(index));
  };
}
