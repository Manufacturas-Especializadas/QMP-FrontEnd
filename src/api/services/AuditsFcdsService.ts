import { API_CONFIG } from "../../config/api";
import type {
  AuditFcdsList,
  AvailableMonth,
  CreateAuditFcds,
  PagedResponse,
} from "../../types/types";
import { apiClient } from "../client";

class AuditsFcdsService {
  private getAuditsFcdsEndpoint = API_CONFIG.endpoints.auditsFCDS.getAuditFcds;
  private getByIdEndpoint = API_CONFIG.endpoints.auditsFCDS.getById;
  private exportToExcelEndpoint = API_CONFIG.endpoints.auditsFCDS.exportToExcel;
  private availableMonthsEndpoint =
    API_CONFIG.endpoints.auditsFCDS.availableMonths;
  private createEndpoint = API_CONFIG.endpoints.auditsFCDS.create;
  private updateEndpoint = API_CONFIG.endpoints.auditsFCDS.update;
  private deleteEndpoint = API_CONFIG.endpoints.auditsFCDS.delete;

  async getAuditsFcds(pageNumber: number = 1, pageSize: number = 10): Promise<PagedResponse<AuditFcdsList>> {
    const url = `${this.getAuditsFcdsEndpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return apiClient.get<PagedResponse<AuditFcdsList>>(url);
  }

  async getById(id: number): Promise<CreateAuditFcds> {
    return apiClient.get<CreateAuditFcds>(`${this.getByIdEndpoint}${id}`);
  }

  async availableMonths(): Promise<AvailableMonth[]> {
    return apiClient.get<AvailableMonth[]>(this.availableMonthsEndpoint);
  }

  async exportToExcel(year: number, month: number): Promise<void> {
    const formattedMonth = month.toString().padStart(2, "0");

    const urlWithParams = `${this.exportToExcelEndpoint}?year=${year}&month=${formattedMonth}`;

    const filename = `Reporte_Auditorias_FCD_${year}_${formattedMonth}.xlsx`;

    await apiClient.downloadFile(urlWithParams, filename);
  }

  async update(id: number, data: CreateAuditFcds): Promise<any> {
    return apiClient.put<any>(`${this.updateEndpoint}${id}`, data);
  }

  async create(data: CreateAuditFcds): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>(this.createEndpoint, data);
  }

  async delete(id: number): Promise<any> {
    return apiClient.delete<any>(`${this.deleteEndpoint}${id}`);
  }
}

export const auditsFcdsService = new AuditsFcdsService();
