import { action, makeAutoObservable, observable } from 'mobx';
import { Company } from '../companyStore/types';
import { User } from '../userStore/types';

class ModalStore {
  @observable isOpen: boolean = false;
  @observable mode: 'create' | 'edit' | 'delete' = 'create';
  @observable currectCompany: Company | null = null;
  @observable currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  openModal = () => {
    this.isOpen = true;
  };

  @action
  openModalForCreateCompany = () => {
    this.isOpen = true;
    this.mode = 'create';
    this.currectCompany = null;
  };

  @action
  openModalForEditCompany = (company: Company) => {
    this.isOpen = true;
    this.mode = 'edit';
    this.currectCompany = company;
  };

  @action
  openModalForCreateUser = () => {
    this.isOpen = true;
    this.mode = 'create';
    this.currentUser = null;
  };

  @action
  openModalForEditUser = (user: User) => {
    this.isOpen = true;
    this.mode = 'edit';
    this.currentUser = user;
  };

  @action
  closeModal = () => {
    this.isOpen = false;
  };
}

export const modalStore = new ModalStore();
