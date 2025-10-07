import axios, { type AxiosInstance } from "axios";
import type {
  AuthResponse,
  RegisterRequest,
  LoginRequest,
} from "../shared/types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5284/api";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>(
      "/account/register",
      data
    );
    return response.data;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/account/login", data);
    return response.data;
  }
}

export const apiService = new ApiService();
