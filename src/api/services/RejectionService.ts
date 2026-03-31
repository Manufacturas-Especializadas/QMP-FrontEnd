import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

class RejectionService {
  private getNextFolioEndpoint = API_CONFIG.endpoints.rejections.getNextFolio;
  private creatRejectionEndpoint = API_CONFIG.endpoints.rejections.create;

  async getNextFolio(): Promise<number> {
    return apiClient.get<number>(this.getNextFolioEndpoint);
  }

  async createRejection(data: FormData): Promise<void> {
    return apiClient.post<void>(this.creatRejectionEndpoint, data);
  }
}

export const rejectionService = new RejectionService();
