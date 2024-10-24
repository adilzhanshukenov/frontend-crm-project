import { action, makeAutoObservable, observable } from "mobx";

class ModalStore {

    @observable isOpen: boolean = false;

    constructor() { makeAutoObservable(this) };

    @action
    openModal = () => {
        this.isOpen = true;
    }

    @action
    closeModal = () => {
        this.isOpen = false;
    }
}

export const modalStore = new ModalStore();