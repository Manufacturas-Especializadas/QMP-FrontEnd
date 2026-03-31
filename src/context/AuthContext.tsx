import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface UserSession {
  unique_name: string;
  role: string;
  exp: number;
}

interface AuthContextType {
  user: UserSession | null;
  logout: () => void;
  isAdmin: boolean;
  loading: boolean;
  setSession: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserSession>(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const setSession = (token: string) => {
    try {
      const decoded = jwtDecode<UserSession>(token);
      setUser(decoded);
    } catch (error) {
      console.error("Token inválido", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  const isAdmin = user?.role === "Admin";

  return (
    <AuthContext.Provider
      value={{ user, logout, isAdmin, loading, setSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");

  return context;
};
