import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

class RejectionService {
  private getNextFolioEndpoint = API_CONFIG.endpoints.rejections.getNextFolio;

  async getNextFolio(): Promise<number> {
    return apiClient.get<number>(this.getNextFolioEndpoint);
  }
}

export const rejectionService = new RejectionService();
