import { API_CONFIG } from "../../config/api";
import type {
  MachineCode,
  MachineCodeCreate,
  MachineCodeUpdate,
} from "../../types/types";
import { apiClient } from "../client";

class MachinesCodesService {
  private getAllEndpoint = API_CONFIG.endpoints.machinesCodes.getAll;
  private createEndpoint = API_CONFIG.endpoints.machinesCodes.create;
  private updateEndpoint = API_CONFIG.endpoints.machinesCodes.update;
  private deleteEndpoint = API_CONFIG.endpoints.machinesCodes.delete;

  async getAll(): Promise<MachineCode[]> {
    return apiClient.get<MachineCode[]>(this.getAllEndpoint);
  }

  async create(data: MachineCodeCreate): Promise<void> {
    return apiClient.post<void>(this.createEndpoint, data);
  }

  async update(id: number, data: MachineCodeUpdate): Promise<void> {
    return apiClient.put<void>(`${this.updateEndpoint}${id}`, data);
  }

  async delete(id: number): Promise<void> {
    return apiClient.delete<void>(`${this.deleteEndpoint}${id}`);
  }
}

export const machinesCodesService = new MachinesCodesService();
