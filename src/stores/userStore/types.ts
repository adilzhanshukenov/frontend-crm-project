export interface User {
    username: string;
    email: string;
}

export interface UserResponse {
    data: User[];
}