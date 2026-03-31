import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

class RejectionService {
  private getNextFolioEndpoint = API_CONFIG.endpoints.rejections.getNextFolio;
  private creatRejectionEndpoint = API_CONFIG.endpoints.rejections.create;
  private updateRejectionEndpoint = API_CONFIG.endpoints.rejections.update;

  async getNextFolio(): Promise<number> {
    return apiClient.get<number>(this.getNextFolioEndpoint);
  }

  async createRejection(data: FormData): Promise<void> {
    return apiClient.post<void>(this.creatRejectionEndpoint, data);
  }

  async updateRejection(id: number, data: FormData): Promise<void> {
    return apiClient.put<void>(`${this.updateRejectionEndpoint}${id}`, data);
  }
}

export const rejectionService = new RejectionService();
