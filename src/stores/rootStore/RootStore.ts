import { makeAutoObservable } from 'mobx';
import { CompanyStore } from '../companyStore/CompanyStore';
import { ProjectStore } from '../projectStore/ProjectStore';
import { PositionStore } from '../positionStore/PositionStore';
import { StageStore } from '../stageStore/StageStore';
import { TaskStore } from '../taskStore/TaskStore';
import { UserStore } from '../userStore/UserStore';
import { TabStore } from '../tabStore/TabStore';
import { ModalStore } from '../modalStore/ModalStore';

export class RootStore {
  companyStore: CompanyStore;
  projectStore: ProjectStore;
  stageStore: StageStore;
  taskStore: TaskStore;
  userStore: UserStore;
  positionStore: PositionStore;
  tabStore: TabStore;
  modalStore: ModalStore;

  constructor() {
    this.companyStore = new CompanyStore(this);
    this.projectStore = new ProjectStore(this);
    this.stageStore = new StageStore(this);
    this.taskStore = new TaskStore(this);
    this.userStore = new UserStore(this);
    this.positionStore = new PositionStore(this);
    this.tabStore = new TabStore(this);
    this.modalStore = new ModalStore(this);
    makeAutoObservable(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
