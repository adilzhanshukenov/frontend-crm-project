import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number; // Expiration time in seconds since the Unix epoch
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    console.error('Invalid token:', error);
    return true; // Treat invalid tokens as expired
  }
};

export default isTokenExpired;
