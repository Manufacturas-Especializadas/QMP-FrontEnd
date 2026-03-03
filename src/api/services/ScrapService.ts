import { API_CONFIG } from "../../config/api";
import type { Scrap, ScrapRead } from "../../types/types";
import { apiClient } from "../client";

class ScrapService {
  private getScrapByIdEndpoint = API_CONFIG.endpoints.scrap.getById;
  private createScrapEndpoint = API_CONFIG.endpoints.scrap.createScrap;

  async getScrapById(id: number): Promise<ScrapRead> {
    return apiClient.get<ScrapRead>(`${this.getScrapByIdEndpoint}${id}`);
  }

  async createScrap(data: Scrap): Promise<void> {
    return apiClient.post<void>(this.createScrapEndpoint, data);
  }
}

export const scrapService = new ScrapService();
