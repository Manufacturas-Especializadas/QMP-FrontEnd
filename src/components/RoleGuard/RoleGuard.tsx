import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user, loading } = useAuth();

  if (loading || !user) return null;

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
