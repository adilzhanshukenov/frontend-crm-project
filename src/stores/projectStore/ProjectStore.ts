import { makeAutoObservable, observable } from "mobx"
import { Project } from "./types"
import axiosInstance from "../../utils/axiosInstance";

class ProjectStore {

    @observable projects: Project[] = []
    @observable selectedProject: Project | null = null;
    @observable loading: boolean = false;
    @observable error: string | null = null;

    constructor() { makeAutoObservable(this) }

    async fetchProjectsOfCompany(company: string) {
        this.loading = true;
        this.error = null;

        try {
            const response = await axiosInstance.get<Project[]>(`project/company/${company}`)
            this.projects = response.data;
        } catch (error) {
            this.error = error.message;
        } finally {
            this.loading = false;
        }
        
    }
}

export const projectStore = new ProjectStore()