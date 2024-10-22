import { action, makeAutoObservable, observable } from "mobx";
import { User } from "./types";
import axiosInstance from "../../utils/axiosInstance";

class UserStore {

    @observable users: User[]  = [];
    @observable selectedUser: User | null= null;
    @observable loading: boolean = false;
    @observable error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    fetchAllUsers = async() => {
        this.loading = true;
        this.error = null;

        try {
            const response = await axiosInstance.get<User[]>(`/user`);
            this.users = response.data;
        } catch(error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }
}

export const userStore = new UserStore();