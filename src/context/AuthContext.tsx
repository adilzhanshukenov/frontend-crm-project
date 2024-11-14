import { createContext, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

interface AuthUserInfo {
  userId: string;
  username: string;
  access_token: string;
}

export interface AuthContextType {
  user: AuthUserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUserInfo | null>(() => {
    // Initialize user state from localStorage, if available
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (username: string, password: string) => {
    const response = await axiosInstance.post(`/auth/login`, { username, password });
    console.log(response);
    const loggedInUser = response.data;
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user to localStorage
    localStorage.setItem('token', response.data.access_token);
    // Here you might store the user in local storage or session storage as well
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data from localStorage
    localStorage.removeItem('token');
    // Clear any stored tokens or user information here if needed
  };

  // Context value that will be available to all consumers
  const authContextValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
