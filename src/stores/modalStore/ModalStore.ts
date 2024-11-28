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

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

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
