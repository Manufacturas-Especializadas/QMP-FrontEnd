import { API_CONFIG } from "../../config/api";
import type { AuditFcdsList, CreateAuditFcds } from "../../types/types";
import { apiClient } from "../client";

class AuditsFcdsService {
  private getAuditsFcdsEndpoint = API_CONFIG.endpoints.auditsFCDS.getAuditFcds;
  private getByIdEndpoint = API_CONFIG.endpoints.auditsFCDS.getById;
  private createEndpoint = API_CONFIG.endpoints.auditsFCDS.create;
  private updateEndpoint = API_CONFIG.endpoints.auditsFCDS.update;
  private deleteEndpoint = API_CONFIG.endpoints.auditsFCDS.delete;

  async getAuditsFcds(): Promise<AuditFcdsList[]> {
    return apiClient.get<AuditFcdsList[]>(this.getAuditsFcdsEndpoint);
  }

  async getById(id: number): Promise<CreateAuditFcds> {
    return apiClient.get<CreateAuditFcds>(`${this.getByIdEndpoint}${id}`);
  }

  async update(id: number, data: CreateAuditFcds): Promise<any> {
    return apiClient.put<any>(`${this.updateEndpoint}${id}`, data);
  }

  async create(data: CreateAuditFcds): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(this.createEndpoint, data);
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${id}`);
  }
}

export const auditsFcdsService = new AuditsFcdsService();
