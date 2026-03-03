import { API_CONFIG } from "../../config/api";
import type { Scrap, ScrapRead, VerifyScrapPayload } from "../../types/types";
import { apiClient } from "../client";

class ScrapService {
  private getScrapByIdEndpoint = API_CONFIG.endpoints.scrap.getById;
  private createScrapEndpoint = API_CONFIG.endpoints.scrap.createScrap;
  private verifyScrapEndpoint = API_CONFIG.endpoints.scrap.verify;

  async getScrapById(id: number): Promise<ScrapRead> {
    return apiClient.get<ScrapRead>(`${this.getScrapByIdEndpoint}${id}`);
  }

  async createScrap(data: Scrap): Promise<void> {
    return apiClient.post<void>(this.createScrapEndpoint, data);
  }

  async verifyScrap(data: VerifyScrapPayload): Promise<void> {
    return apiClient.patch<void>(this.verifyScrapEndpoint, data);
  }
}

export const scrapService = new ScrapService();
