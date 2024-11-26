type User = {
  roles: string[];
};

export const hasRole = (user: User | null, requiredRoles: string | string[]): boolean => {
  if (!user) return false;

  const userRoles = user.roles || [];
  const requiredRolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

  return requiredRolesArray.some((role) => userRoles.includes(role));
};
