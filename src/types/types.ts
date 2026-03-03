export interface Lines {
  id: number;
  name: string;
}

export interface Shifts {
  id: number;
  name: string;
}

export interface Material {
  id: number;
  name: string;
}

export interface Process {
  id: number;
  name: string;
  lineId: number;
}

export interface MachineCodes {
  id: number;
  name: string;
  processId: number;
}

export interface TypeScrap {
  id: number;
  name: string;
}

export interface Defects {
  id: number;
  name: string;
  typeScrapId: number;
}

export interface Scrap {
  payRollNumber: number;
  alloy: string;
  diameter: string;
  wall: string;
  rdm: string;
  shiftId: number;
  processId: number;
  lineId: number;
  materialId: number;
  typeScrapId: number;
  machineCodeId: number | null;
  defectId: number;
  weight: number;
}
