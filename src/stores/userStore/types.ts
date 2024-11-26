export interface User {
  _id?: string;
  username: string;
  email: string;
  roles: string[];
}

export interface UserResponse {
  data: User[];
}

export interface UserData {
  username: string;
  email: string;
  roles: string[];
}
