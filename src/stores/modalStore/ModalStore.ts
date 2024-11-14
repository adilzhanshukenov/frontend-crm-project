import { action, makeAutoObservable, observable } from 'mobx';

interface ModalProps {
  mode: 'create' | 'edit' | 'delete';
  activeModal: string;
}

class ModalStore {
  @observable isOpen: boolean = false;
  @observable mode: 'create' | 'edit' | 'delete' = 'create';
  @observable activeModal: string | null = null;

  constructor() {
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

export const modalStore = new ModalStore();
