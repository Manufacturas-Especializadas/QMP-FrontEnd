import { useAuth } from "../../context/AuthContext";
import { type UserRoleType } from "../../types/types";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRoleType[];
  fallback?: React.ReactNode;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  fallback = null,
}: RoleGuardProps) => {
  const { user } = useAuth();

  if (user && allowedRoles.includes(user.role as UserRoleType)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
};
