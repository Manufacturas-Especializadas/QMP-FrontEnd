import { API_CONFIG } from "../../config/api";
import type {
  AuditACDRead,
  CreateAuditACDPayload,
  UpdateAuditACDPayload,
} from "../../types/types";
import { apiClient } from "../client";

class AuditsACDService {
  private getAllEndpoint = API_CONFIG.endpoints.auditsACD.getAll;
  private getByIdEndpoint = API_CONFIG.endpoints.auditsACD.getById;
  private createEndpoint = API_CONFIG.endpoints.auditsACD.create;
  private updateEndpoint = API_CONFIG.endpoints.auditsACD.update;
  private deleteEndpoint = API_CONFIG.endpoints.auditsACD.delete;

  async getAll(): Promise<AuditACDRead[]> {
    return apiClient.get<AuditACDRead[]>(this.getAllEndpoint);
  }

  async getById(id: number): Promise<AuditACDRead> {
    return apiClient.get<AuditACDRead>(`${this.getByIdEndpoint}${id}`);
  }

  async create(payload: CreateAuditACDPayload): Promise<any> {
    return apiClient.post<any>(this.createEndpoint, payload);
  }

  async update(id: number, payload: UpdateAuditACDPayload): Promise<any> {
    return apiClient.put<any>(`${this.updateEndpoint}${id}`, payload);
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete(`${this.deleteEndpoint}${id}`);
  }
}

export const auditsACDService = new AuditsACDService();
