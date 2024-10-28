import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { Company, CompanyFormData } from './types';
import axiosInstance from '../../utils/axiosInstance';

class CompanyStore {
  @observable companyList: Company[] = [];
  @observable selectedCompany: Company | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  fetchAllCompanies = async (): Promise<void> => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<Company[]>(`/company`);
      this.companyList = response.data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  @action
  createNewCompany = async (company: CompanyFormData) => {
    this.loading = true;
    this.error = null;
    this.success = false;
    try {
      await axiosInstance.post<Company>(`/company`, company);
      this.success = true;
    } catch (error) {
      this.error = error.response?.data?.message || 'An error occured';
    } finally {
      this.loading = false;
    }
  };

  @action
  updateCompany = async (updatedCompany: Company) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.put<Company>(`/company/${updatedCompany._id}`, updatedCompany);
      runInAction(() => {
        this.companyList = this.companyList.map((company) =>
          company._id === updatedCompany._id ? response.data : company,
        );
      });
      this.success = true;
    } catch (error) {
      this.error = error.response?.data?.message || 'An error occured.';
    } finally {
      this.loading = false;
    }
  };

  @action
  deleteCompany = async (deletedCompany: Company | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`/company/${deletedCompany?._id}`);
      runInAction(() => {
        this.companyList = this.companyList.filter((company) => company._id !== deletedCompany?._id);
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message;
      });
    } finally {
      this.loading = false;
    }
  };

  @action
  setSelectedCompany = (company: Company) => {
    this.selectedCompany = company;
  };

  @action
  reset = () => {
    this.loading = false;
    this.error = null;
    this.success = false;
  };
}

export const companyStore = new CompanyStore();
