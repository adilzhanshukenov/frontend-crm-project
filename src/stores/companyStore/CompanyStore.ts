import { action, makeAutoObservable, observable } from "mobx";
import { Company } from "./types";
import axiosInstance from "../../utils/axiosInstance";

class CompanyStore {

    @observable companyList: Company[] = [];
    @observable selectedCompany: Company | null = null;
    @observable loading: boolean = false;
    @observable error: string | null = null;

    constructor() { makeAutoObservable(this) }

    //@action
    async fetchAllCompanies(): Promise<void> {
        this.loading = true;
        this.error = null;

        try {
            const response = await axiosInstance.get<Company[]>(`/company`)
            this.companyList = response.data;

        } catch(error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }
}

export const companyStore = new CompanyStore();