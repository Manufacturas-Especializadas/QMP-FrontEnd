import { API_CONFIG } from "../../config/api";
import type {
  Lines,
  MachineCodes,
  Material,
  Process,
  Shifts,
  TypeScrap,
} from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;
  private getShiftsEndpoint = API_CONFIG.endpoints.catalags.getShifts;
  private getMaterialEndpoint = API_CONFIG.endpoints.catalags.getMaterial;
  private getTypeScrapEndpoint = API_CONFIG.endpoints.catalags.getTypeScrap;
  private getProcessByLineEndpoint =
    API_CONFIG.endpoints.catalags.getProcessByLine;
  private getMachineCodesByProcessEndpoint =
    API_CONFIG.endpoints.catalags.getMachineCodesByProcess;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getLinesEndpoint);
  }

  async getShifts(): Promise<Shifts[]> {
    return apiClient.get<Shifts[]>(this.getShiftsEndpoint);
  }

  async getMaterial(): Promise<Material[]> {
    return apiClient.get<Material[]>(this.getMaterialEndpoint);
  }

  async getTypeScrap(): Promise<TypeScrap[]> {
    return apiClient.get<TypeScrap[]>(this.getTypeScrapEndpoint);
  }

  async getProcessByLine(id: number): Promise<Process[]> {
    return apiClient.get<Process[]>(`${this.getProcessByLineEndpoint}${id}`);
  }

  async getMachineCodesByProcess(id: number): Promise<MachineCodes[]> {
    return apiClient.get<MachineCodes[]>(
      `${this.getMachineCodesByProcessEndpoint}${id}`,
    );
  }
}

export const catalogsService = new CatalogsService();
