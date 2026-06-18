import { API_CONFIG } from "../../config/api";
import type { AuditFcdsList, CreateAuditFcds } from "../../types/types";
import { apiClient } from "../client";

class AuditsFcdsService {
  private getAuditsFcdsEndpoint = API_CONFIG.endpoints.auditsFCDS.getAuditFcds;
  private createEndpoint = API_CONFIG.endpoints.auditsFCDS.create;

  async getAuditsFcds(): Promise<AuditFcdsList[]> {
    return apiClient.get<AuditFcdsList[]>(this.getAuditsFcdsEndpoint);
  }

  async create(data: CreateAuditFcds): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(this.createEndpoint, data);
  }
}

export const auditsFcdsService = new AuditsFcdsService();
