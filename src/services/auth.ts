import axios from 'axios'

const API_URL = 'http://localhost:3000'

export interface UserProfile {
    username: string,
    email: string;
  }

//Register user
export const register = async (username: string, password: string, email: string) => {
    return axios.post(`${API_URL}/auth/register`, {username, password, email});
}

export const login = async (username: string, password: string) => {
    const response = axios.post(`${API_URL}/auth/login`, {username, password});
    //console.log(response)
    return response;
}

export const getUserProfile = async (token: string) => {
    return axios.get<UserProfile>(`${API_URL}/profile`, {
        headers: {Authorization: `Bearer ${token}`}
    })
}

export const getAllUsers = async (token: string) => {
    return axios.get<UserProfile[]>(`${API_URL}/user`, {
        headers: {Authorization: `Bearer ${token}`}
    })
}



