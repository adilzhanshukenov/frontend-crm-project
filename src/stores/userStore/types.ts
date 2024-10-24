export interface User {
    _id?: string;
    username: string;
    email: string;
}

export interface UserResponse {
    data: User[];
}