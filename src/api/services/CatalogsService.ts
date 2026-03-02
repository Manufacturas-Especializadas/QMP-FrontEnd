import { API_CONFIG } from "../../config/api";
import type { Lines } from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getLinesEndpoint);
  }
}

export const catalogsService = new CatalogsService();
