import { createContext, useState, type ReactNode } from "react";
import { apiService } from "../services/api";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../shared/types";

interface AuthContextType {
  token: string | null;
  userId: string | null;
  username: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username")
  );

  const isAuthenticated = !!token;

  const login = async (data: LoginRequest) => {
    const response: AuthResponse = await apiService.login(data);
    setToken(response.token);
    setUserId(response.userId);
    setUsername(response.username);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.userId);
    localStorage.setItem("username", response.username);
  };

  const register = async (data: RegisterRequest) => {
    await apiService.register(data);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        username,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
