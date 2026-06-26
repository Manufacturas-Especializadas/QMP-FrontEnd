import { API_CONFIG } from "../../config/api";
import type {
  ProcessData,
  ProcessCreate,
  ProcessUpdate,
} from "../../types/types";
import { apiClient } from "../client";

class ProcessesService {
  private getAllEndpoint = API_CONFIG.endpoints.processes.getAll;
  private getByIdEndpoint = API_CONFIG.endpoints.processes.getById;
  private createEndpoint = API_CONFIG.endpoints.processes.create;
  private updateEndpoint = API_CONFIG.endpoints.processes.update;
  private deleteEndpoint = API_CONFIG.endpoints.processes.delete;

  async getAll(): Promise<ProcessData[]> {
    return apiClient.get<ProcessData[]>(this.getAllEndpoint);
  }

  async getById(id: number): Promise<ProcessData> {
    return apiClient.get<ProcessData>(`${this.getByIdEndpoint}${id}`);
  }

  async create(data: ProcessCreate): Promise<void> {
    return apiClient.post<void>(this.createEndpoint, data);
  }

  async update(id: number, data: ProcessUpdate): Promise<void> {
    return apiClient.put<void>(`${this.updateEndpoint}${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`${this.deleteEndpoint}${id}`);
  }
}

export const processesService = new ProcessesService();
