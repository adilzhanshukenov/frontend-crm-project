import { action, makeAutoObservable, observable } from 'mobx';

class TabStore {
  @observable activeTab: number = 0;

  constructor() {
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

export const tabStore = new TabStore();
