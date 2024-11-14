import { Company } from '../companyStore/types';

export interface User {
  _id?: string;
  username: string;
  email: string;
}

export interface UserResponse {
  data: User[];
}

export interface UserData {
  username: string;
  email: string;
}

export interface UserCompany {
  _id?: string;
  user: User;
  company: Company;
  position: string;
}

export interface UserCompanyFormData {
  user: string;
  company: string;
  position: string;
}
