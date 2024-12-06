import { action, makeAutoObservable, observable } from 'mobx';
import { RootStore } from '../rootStore/RootStore';

interface ModalProps {
  mode: 'create' | 'edit' | 'delete';
  activeModal: string;
}

export class ModalStore {
  @observable rootStore: RootStore;
  @observable isOpen: boolean = false;
  @observable mode: 'create' | 'edit' | 'delete' = 'create';
  @observable activeModal: string | null = null;
  @observable drawerOpen: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setDrawerOpen = (newOpen: boolean) => {
    this.drawerOpen = newOpen;
  };

  /**
   *
   * @param modalName
   */
  @action
  openModal = (modalName: string) => {
    this.activeModal = modalName;
  };

  /**
   *
   * @param modal
   */
  @action openAnyModal = (modal: ModalProps) => {
    this.activeModal = modal.activeModal;
    this.mode = modal.mode;
  };

  /**
   * close Modal
   */
  @action
  closeModal = () => {
    this.activeModal = null;
  };
}
