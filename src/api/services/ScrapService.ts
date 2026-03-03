import { API_CONFIG } from "../../config/api";
import type { Scrap } from "../../types/types";
import { apiClient } from "../client";

class ScrapService {
  private createScrapEndpoint = API_CONFIG.endpoints.scrap.createScrap;

  async createScrap(data: Scrap): Promise<void> {
    return apiClient.post<void>(this.createScrapEndpoint, data);
  }
}

export const scrapService = new ScrapService();
