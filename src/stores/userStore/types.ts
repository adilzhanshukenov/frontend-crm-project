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
  user: any;
  company: any;
  position: string;
}
