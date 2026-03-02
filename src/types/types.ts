export interface Lines {
  id: number;
  name: string;
}

export interface Shifts {
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
