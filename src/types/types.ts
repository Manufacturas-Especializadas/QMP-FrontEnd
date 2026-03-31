export const UserRole = {
  Admin: "Admin",
  Ingeniero: "Ingeniero",
  Operador: "Operador",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface Lines {
  id: number;
  name: string;
}

export interface Clients {
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

export interface DefectsRejections {
  id: number;
  name: string;
}

export interface ContainmentActions {
  id: number;
  name: string;
}

export interface Condition {
  id: number;
  name: string;
  defectId: number;
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

export interface VerifyScrapPayload {
  id: number;
  isVerified: boolean;
  verifiedWeight: number | null;
}

export interface LinesCreate {
  lineName: string;
}

export interface LineRead {
  id: number;
  lineName: string;
}

export interface ClientCreate {
  clientName: string;
}

export interface ClientRead {
  id: number;
  clientName: string;
}

export interface UsersList {
  payRollNumber: string;
  createdAt: string;
  isActive: boolean;
  roleName: string;
}

export interface UserRegister {
  employeeNumber: string;
  roleId: number;
}

export interface UserLogin {
  employeeNumber: string;
  password: string;
}

export interface ScrapRead {
  id: number;
  payRollNumber: number;
  alloy: string;
  diameter: string;
  wall: string;
  rdm: string;
  weight: number;
  createdAt: string;
  shiftName: string;
  lineName: string;
  processName: string;
  machineCodeName: any;
  typeScrapName: string;
  defectName: string;
  isVerified: boolean;
  verifiedWeight: any;
}

export interface ScrapList {
  id: number;
  payRollNumber: number;
  alloy: string;
  diameter: string;
  wall: string;
  rdm: string;
  shiftName: string;
  processName: string;
  lineName: string;
  materialName: string;
  typeScrapName: string;
  machineCodeName: string;
  defectName: string;
  weight: number;
  createdAt: string;
  isVerified: boolean;
  verifiedWeight: number;
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

export interface Rejections {
  inspector: string;
  partNumber: string;
  numberOfPieces: number;
  idDefect: number;
  idCondition: number;
  description: string;
  idLine: number;
  idClient: number;
  operatorPayRoll: number;
  idContainmentAction: number;
  folio: number;
  photos: string[];
}

export interface RejectionList {
  id: number;
  title: string;
  description: string;
  rejectionDate: string;
  imageUrl: string | null;
  hasEvidence: boolean;
  creatingPayroll: number;
}
