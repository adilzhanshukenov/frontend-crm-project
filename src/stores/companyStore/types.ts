import { User } from '../userStore/types';

export interface Company {
  _id?: string;
  name: string;
  address: string;
  industry: string;
}

export interface CompanyFormData {
  name: string;
  address: string;
  industry: string;
}

export interface CompanyUser {
  _id?: string;
  user: User;
  company: Company;
  position: string;
}

export interface CompanyUserFormData {
  user: string;
  company: string;
  position: string;
}
