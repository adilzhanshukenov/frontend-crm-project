// src/utils/useRouteParams.js
import { useParams } from 'react-router-dom';

interface RouteParams {
  companyId?: string;
  projectId?: string;

  [key: string]: string | undefined;
}

export const useRouteParams = () => {
  const params = useParams<RouteParams>();

  // Transform params as needed, e.g., parse IDs or apply defaults
  return {
    companyId: params.companyId ? params.companyId : null,
    projectId: params.projectId ? params.projectId : null,
    // Add other params as needed
  };
};
