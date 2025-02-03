export interface User {
  _id?: string;
  username: string;
  email: string;
  name: string;
  surname: string;
}

export interface UserResponse {
  data: User[];
}

export interface UserData {
  username: string;
  email: string;
  name: string;
  surname: string;
}
