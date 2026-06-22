import { API_CONFIG } from "../../config/api";
import { apiClient } from "../client";

class RejectionService {
  private getNextFolioEndpoint = API_CONFIG.endpoints.rejections.getNextFolio;
  private availableMonthEndpoint =
    API_CONFIG.endpoints.rejections.availableMonths;
  private exportByMonthEndpoint = API_CONFIG.endpoints.rejections.exportByMonth;
  private creatRejectionEndpoint = API_CONFIG.endpoints.rejections.create;
  private updateRejectionEndpoint = API_CONFIG.endpoints.rejections.update;
  private deleteRejectionEndpoint = API_CONFIG.endpoints.rejections.delete;

  async getNextFolio(): Promise<number> {
    return apiClient.get<number>(this.getNextFolioEndpoint);
  }

  async getAvailableMonth(): Promise<string[]> {
    return apiClient.get<string[]>(this.availableMonthEndpoint);
  }

  async exportByMonth(montYear: string): Promise<void> {
    const url = `${this.exportByMonthEndpoint}?monthYear=${encodeURIComponent(montYear)}`;
    const fileName = `Reporte_Rechazos_${montYear.replace(" ", "_")}.xlsx`;

    return apiClient.downloadFile(url, fileName);
  }

  async createRejection(data: FormData): Promise<void> {
    return apiClient.post<void>(this.creatRejectionEndpoint, data);
  }

  async updateRejection(id: number, data: FormData): Promise<void> {
    return apiClient.put<void>(`${this.updateRejectionEndpoint}${id}`, data);
  }

  async deleteRejection(id: number): Promise<void> {
    return apiClient.delete<void>(`${this.deleteRejectionEndpoint}${id}`);
  }
}

export const rejectionService = new RejectionService();
