import { API_CONFIG } from "../../config/api";
import type {
  Clients,
  Condition,
  ContainmentActions,
  Defects,
  DefectsRejections,
  Lines,
  MachineCodes,
  Material,
  Process,
  RejectionRead,
  ScrapList,
  Shifts,
  TypeScrap,
} from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;
  private getClientsEndpoint = API_CONFIG.endpoints.catalags.getClients;
  private getShiftsEndpoint = API_CONFIG.endpoints.catalags.getShifts;
  private getMaterialEndpoint = API_CONFIG.endpoints.catalags.getMaterial;
  private getDefectsRejectionsEndpoint =
    API_CONFIG.endpoints.catalags.getDefects;
  private getContainmentActionsEndpoint =
    API_CONFIG.endpoints.catalags.getContainmentActions;
  private getTypeScrapEndpoint = API_CONFIG.endpoints.catalags.getTypeScrap;
  private getScrapEndpoint = API_CONFIG.endpoints.catalags.getScrap;
  private getConditionByDefectEndpoint =
    API_CONFIG.endpoints.catalags.getConditionByDefect;
  private getProcessByLineEndpoint =
    API_CONFIG.endpoints.catalags.getProcessByLine;
  private getMachineCodesByProcessEndpoint =
    API_CONFIG.endpoints.catalags.getMachineCodesByProcess;
  private getDefectByTypeScrapEndpoint =
    API_CONFIG.endpoints.catalags.getDefectByTypeScrap;
  private getRejectionsEndpoint = API_CONFIG.endpoints.catalags.getRejections;

  async getLines(): Promise<Lines[]> {
    return apiClient.get<Lines[]>(this.getLinesEndpoint);
  }

  async getClients(): Promise<Clients[]> {
    return apiClient.get<Clients[]>(this.getClientsEndpoint);
  }

  async getShifts(): Promise<Shifts[]> {
    return apiClient.get<Shifts[]>(this.getShiftsEndpoint);
  }

  async getMaterial(): Promise<Material[]> {
    return apiClient.get<Material[]>(this.getMaterialEndpoint);
  }

  async getDefetcsRejections(): Promise<DefectsRejections[]> {
    return apiClient.get<DefectsRejections[]>(
      this.getDefectsRejectionsEndpoint,
    );
  }

  async getContainmentActions(): Promise<ContainmentActions[]> {
    return apiClient.get<ContainmentActions[]>(
      this.getContainmentActionsEndpoint,
    );
  }

  async getTypeScrap(): Promise<TypeScrap[]> {
    return apiClient.get<TypeScrap[]>(this.getTypeScrapEndpoint);
  }

  async getScrap(): Promise<ScrapList[]> {
    return apiClient.get<ScrapList[]>(this.getScrapEndpoint);
  }

  async getRejections(): Promise<RejectionRead[]> {
    return apiClient.get<RejectionRead[]>(this.getRejectionsEndpoint);
  }

  async getConditionByDefect(id: number): Promise<Condition[]> {
    return apiClient.get<Condition[]>(
      `${this.getConditionByDefectEndpoint}${id}`,
    );
  }

  async getProcessByLine(id: number): Promise<Process[]> {
    return apiClient.get<Process[]>(`${this.getProcessByLineEndpoint}${id}`);
  }

  async getMachineCodesByProcess(id: number): Promise<MachineCodes[]> {
    return apiClient.get<MachineCodes[]>(
      `${this.getMachineCodesByProcessEndpoint}${id}`,
    );
  }

  async getDefectByTypeScrap(id: number): Promise<Defects[]> {
    return apiClient.get<Defects[]>(
      `${this.getDefectByTypeScrapEndpoint}${id}`,
    );
  }
}

export const catalogsService = new CatalogsService();
