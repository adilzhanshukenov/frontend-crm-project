import { LoaderFunctionArgs, redirect } from 'react-router-dom';
import isTokenExpired from '../isTokenExpired';

export const requireAuth = async ({ request }: LoaderFunctionArgs): Promise<null> => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    const currentURL = new URL(request.url);
    const redirectTo = currentURL.pathname;
    throw redirect(`/auth/login?redirectTo=${redirectTo}`);
  }

  return null;
};
