import { API_CONFIG } from "../../config/api";
import type { Lines, Process, Shifts } from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;
  private getShiftsEndpoint = API_CONFIG.endpoints.catalags.getShifts;
  private getProcessByLineEndpoint =
    API_CONFIG.endpoints.catalags.getProcessByLine;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getLinesEndpoint);
  }

  async getShifts(): Promise<Shifts[]> {
    return apiClient.get<Shifts[]>(this.getShiftsEndpoint);
  }

  async getProcessByLine(id: number): Promise<Process[]> {
    return apiClient.get<Process[]>(`${this.getProcessByLineEndpoint}${id}`);
  }
}

export const catalogsService = new CatalogsService();
