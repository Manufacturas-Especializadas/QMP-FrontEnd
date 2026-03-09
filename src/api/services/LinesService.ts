import { API_CONFIG } from "../../config/api";
import type { LineRead, LinesCreate } from "../../types/types";
import { apiClient } from "../client";

class LinesService {
  private getLineByIdEndpoint = API_CONFIG.endpoints.lines.lineById;
  private createEndpoint = API_CONFIG.endpoints.lines.create;
  private updateEndpoint = API_CONFIG.endpoints.lines.update;
  private deleteEndpoint = API_CONFIG.endpoints.lines.delete;

  async getLineById(id: number): Promise<LineRead> {
    return apiClient.get<LineRead>(`${this.getLineByIdEndpoint}${id}`);
  }

  async create(formData: LinesCreate): Promise<void> {
    await apiClient.post<void>(this.createEndpoint, formData);
  }

  async update(formData: LinesCreate, id: number): Promise<void> {
    await apiClient.put<void>(`${this.updateEndpoint}${id}`, formData);
  }

  async delete(id: number): Promise<void> {
    await apiClient.delete<void>(`${this.deleteEndpoint}${id}`);
  }
}

export const linesService = new LinesService();
