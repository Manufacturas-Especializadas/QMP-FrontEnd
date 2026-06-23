import { API_CONFIG } from "../../config/api";
import type {
  AuditsPoints,
  CategoryOperators,
  Clients,
  Condition,
  ContainmentActions,
  Defects,
  DefectsRejections,
  Lines,
  MachineCodes,
  MachinesByLines,
  Material,
  PipeDiameters,
  Process,
  RejectionRead,
  Roles,
  ScrapList,
  Shifts,
  TypeMeasuringEquipment,
  TypeScrap,
  WallsOfDiameters,
} from "../../types/types";
import { apiClient } from "../client";

class CatalogsService {
  private getRolesEndpoint = API_CONFIG.endpoints.catalags.getRoles;
  private getLinesEndpoint = API_CONFIG.endpoints.catalags.getLines;
  private getClientsEndpoint = API_CONFIG.endpoints.catalags.getClients;
  private getShiftsEndpoint = API_CONFIG.endpoints.catalags.getShifts;
  private getMaterialEndpoint = API_CONFIG.endpoints.catalags.getMaterial;
  private getAuditsStartPointsEndpoint =
    API_CONFIG.endpoints.catalags.getStartPoints;
  private getAuditsEndPointsEndpoint =
    API_CONFIG.endpoints.catalags.getEndPonints;
  private getDefectsRejectionsEndpoint =
    API_CONFIG.endpoints.catalags.getDefects;
  private getContainmentActionsEndpoint =
    API_CONFIG.endpoints.catalags.getContainmentActions;
  private getTypeScrapEndpoint = API_CONFIG.endpoints.catalags.getTypeScrap;
  private getCategoryOperatorEndpoint =
    API_CONFIG.endpoints.catalags.getCategoryOperators;
  private getTypeMeasuringEquipmentEndpoint =
    API_CONFIG.endpoints.catalags.getTypeMeasuringEquipment;
  private getScrapEndpoint = API_CONFIG.endpoints.catalags.getScrap;
  private getConditionByDefectEndpoint =
    API_CONFIG.endpoints.catalags.getConditionByDefect;
  private getProcessByLineEndpoint =
    API_CONFIG.endpoints.catalags.getProcessByLine;
  private getMachineCodesByProcessEndpoint =
    API_CONFIG.endpoints.catalags.getMachineCodesByProcess;
  private getMachinesByLinesEndpoint =
    API_CONFIG.endpoints.catalags.getMachinesByLines;
  private getPipeDiametersEndpoint =
    API_CONFIG.endpoints.catalags.getPipeDiameters;
  private getWallsOfDiametersEndpoint =
    API_CONFIG.endpoints.catalags.getWallsOfDiameter;
  private getDefectByTypeScrapEndpoint =
    API_CONFIG.endpoints.catalags.getDefectByTypeScrap;
  private getRejectionsEndpoint = API_CONFIG.endpoints.catalags.getRejections;

  async getRoles(): Promise<Roles[]> {
    return apiClient.get<Roles[]>(this.getRolesEndpoint);
  }

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

  async getCategorysOperators(): Promise<CategoryOperators[]> {
    return apiClient.get<CategoryOperators[]>(this.getCategoryOperatorEndpoint);
  }

  async getAuditsStartPoints(): Promise<AuditsPoints[]> {
    return apiClient.get<AuditsPoints[]>(this.getAuditsStartPointsEndpoint);
  }

  async getAuditsEndPoints(): Promise<AuditsPoints[]> {
    return apiClient.get<AuditsPoints[]>(this.getAuditsEndPointsEndpoint);
  }

  async getTypeMeasuringEquipment(): Promise<TypeMeasuringEquipment[]> {
    return apiClient.get<TypeMeasuringEquipment[]>(
      this.getTypeMeasuringEquipmentEndpoint,
    );
  }

  async getPipeDiameters(): Promise<PipeDiameters[]> {
    return apiClient.get<PipeDiameters[]>(this.getPipeDiametersEndpoint);
  }

  async getWallsOfDiameters(): Promise<WallsOfDiameters[]> {
    return apiClient.get<WallsOfDiameters[]>(this.getWallsOfDiametersEndpoint);
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

  async getMachinesByLines(linesIds: number[]): Promise<MachinesByLines[]> {
    const params = new URLSearchParams();
    linesIds.forEach((id) => params.append("lineIds", id.toString()));

    return apiClient.get<MachinesByLines[]>(this.getMachinesByLinesEndpoint, {
      params,
    });
  }

  async getDefectByTypeScrap(id: number): Promise<Defects[]> {
    return apiClient.get<Defects[]>(
      `${this.getDefectByTypeScrapEndpoint}${id}`,
    );
  }
}

export const catalogsService = new CatalogsService();
