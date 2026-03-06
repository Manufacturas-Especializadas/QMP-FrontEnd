import { API_CONFIG } from "../../config/api";
import type { ClientCreate, ClientRead } from "../../types/types";
import { apiClient } from "../client";

class ClientsService {
  private getClientByIdEndpoint = API_CONFIG.endpoints.client.clientById;
  private createEndpoint = API_CONFIG.endpoints.client.create;
  private updateEndpoint = API_CONFIG.endpoints.client.update;
  private deleteEndpoint = API_CONFIG.endpoints.client.delete;

  async getClientById(id: number): Promise<ClientRead> {
    return apiClient.get<ClientRead>(`${this.getClientByIdEndpoint}${id}`);
  }

  async create(formData: ClientCreate): Promise<void> {
    await apiClient.post<void>(this.createEndpoint, formData);
  }

  async update(formData: ClientCreate, id: number): Promise<void> {
    await apiClient.put<void>(`${this.updateEndpoint}${id}`, formData);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.deleteEndpoint}${id}`);
  }
}

export const clientsService = new ClientsService();
