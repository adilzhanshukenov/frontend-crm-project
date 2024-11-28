import { action, makeAutoObservable, observable } from 'mobx';
import { Company, CompanyFormData, CompanyUser, CompanyUserFormData } from './types';
import axiosInstance from '../../utils/axiosInstance';
import { User } from '../userStore/types';
import { RootStore } from '../rootStore/RootStore';

export class CompanyStore {
  @observable rootStore: RootStore;
  @observable companyList: Company[] = [];
  @observable selectedCompany: Company | null = null;
  @observable currectCompany: Company | null = null;
  @observable companyToDelete: Company | null = null;
  @observable companyUser: CompanyUser[] = [];
  @observable userToDelete: User | null = null;
  @observable loading: boolean = false;
  @observable error: string | null = null;
  @observable success: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setCompanyToDelete = async (company: Company | null) => {
    this.companyToDelete = company;
  };

  @action
  setUserToDelete = async (user: User | null) => {
    this.userToDelete = user;
  };

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

  /**
   *
   * @param company
   */
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

  /**
   *
   * @param updatedCompany
   */
  @action
  updateCompany = async (updatedCompany: Company) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.put<Company>(`/company/${updatedCompany._id}`, updatedCompany);
      this.companyList = this.companyList.map((company) =>
        company._id === updatedCompany._id ? response.data : company,
      );
      this.success = true;
    } catch (error) {
      this.error = error.response?.data?.message || 'An error occured.';
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param deletedCompany
   */
  @action
  deleteCompany = async (deletedCompany: Company | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.delete(`/company/${deletedCompany?._id}`);
      this.companyList = this.companyList.filter((company) => company._id !== deletedCompany?._id);
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param companyId
   */
  @action
  getCompanyById = async (companyId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      const response = await axiosInstance.get<Company>(`/company/${companyId}`);
      this.selectedCompany = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
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

  //load all users
  /**
   *
   * @param companyId
   */
  @action
  fetchAllUsersOfCompany = async (companyId: string | null) => {
    this.loading = true;
    this.error = null;
    this.success = false;
    try {
      const response = await axiosInstance.get<CompanyUser[]>(`/user-company/${companyId}`);
      this.companyUser = response.data;
      this.success = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param userCompany
   */
  @action
  assignUserToCompany = async (userCompany: CompanyUserFormData) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/user-company`, userCompany);
      this.success = true;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };

  /**
   *
   * @param userId
   */
  @action
  deleteUserFromCompany = async (userId: string | undefined) => {
    this.loading = true;
    this.error = null;
    this.success = false;

    try {
      await axiosInstance.post(`/user-company/${userId}`);
      this.success = true;
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  };
}
