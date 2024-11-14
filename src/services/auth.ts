import axios from 'axios';

const API_URL = 'http://localhost:3000';

//Register user
export const register = async (username: string, password: string, email: string) => {
  return axios.post(`${API_URL}/auth/register`, { username, password, email });
};
