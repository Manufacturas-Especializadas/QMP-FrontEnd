import { API_CONFIG } from "../../config/api";
import type { Lines, Shifts } from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;
  private getShiftsEndpoint = API_CONFIG.endpoints.catalags.getShifts;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getLinesEndpoint);
  }

  async getShifts(): Promise<Shifts[]> {
    return apiClient.get<Shifts[]>(this.getShiftsEndpoint);
  }
}

export const catalogsService = new CatalogsService();
