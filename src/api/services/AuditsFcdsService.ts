import { API_CONFIG } from "../../config/api";
import type { CreateAuditFcds } from "../../types/types";
import { apiClient } from "../client";

class AuditsFcdsService {
  private createEndpoint = API_CONFIG.endpoints.auditsFCDS.create;

  async create(data: CreateAuditFcds): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(this.createEndpoint, data);
  }
}

export const auditsFcdsService = new AuditsFcdsService();
