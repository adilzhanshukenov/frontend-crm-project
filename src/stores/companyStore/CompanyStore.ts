import { action, makeAutoObservable, observable } from "mobx";
import { Company } from "./types";
import axiosInstance from "../../utils/axiosInstance";

class CompanyStore {

    @observable companyList: Company[] = [];
    @observable selectedCompany: Company | null = null;
    @observable loading: boolean = false;
    @observable error: string | null = null;
    @observable success: boolean = false;

    constructor() { makeAutoObservable(this) }

    @action
    fetchAllCompanies = async (): Promise<void> => {
        this.loading = true;
        this.error = null;
        this.success = false;

        try {
            const response = await axiosInstance.get<Company[]>(`/company`)
            this.companyList = response.data;

        } catch(error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
    }

    @action
    createNewCompany = async (company: Company) => {
        this.loading = true;
        this.error = null;
        this.success = false
        try {
            await axiosInstance.post(`/company`, company);
            this.success = true;
        } catch (error) {
            this.error = error.response?.data?.message || "An error occured";
        } finally {
            this.loading = false;
        }
    }

    @action
    reset = () => {
        this.loading = false;
        this.error = null;
        this.success = false;
    }
}

export const companyStore = new CompanyStore();