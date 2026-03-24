import { API_CONFIG } from "../../config/api";
import type { UserLogin, UserRegister, UsersList } from "../../types/types";
import { apiClient } from "../client";

class UsersService {
  private usersListEndpoint = API_CONFIG.endpoints.user.users;
  private registerEndpoint = API_CONFIG.endpoints.user.register;
  private loginEndpoint = API_CONFIG.endpoints.user.login;
  private toggleStatusEndpoint = API_CONFIG.endpoints.user.toogleStatus;

  async usersList(): Promise<UsersList[]> {
    return apiClient.get<UsersList[]>(this.usersListEndpoint);
  }

  async register(data: UserRegister): Promise<void> {
    return apiClient.post<void>(this.registerEndpoint, data);
  }

  async login(data: UserLogin): Promise<void> {
    return apiClient.post<void>(this.loginEndpoint, data);
  }

  async toggleStatus(username: string): Promise<void> {
    const url = `${this.toggleStatusEndpoint}${username}`;

    return apiClient.patch<void>(url);
  }
}

export const usersService = new UsersService();
