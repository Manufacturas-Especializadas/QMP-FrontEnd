export const UserRole = {
  Admin: "Admin",
  Ingeniero: "Ingeniero",
  Operador: "Operador",
  CalidadProveedores: "Calidad Proveedores",
  InspectorCalidad: "Inspector de Calidad",
  InspectorScrap: "Inspector Scrap",
  Produccion: "Producción",
  AnalistaCalidad: "Analista de Calidad",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

export interface Roles {
  id: number;
  roleName: string;
}

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

export interface MachinesByLines {
  id: number;
  name: string;
  lineId: number;
}

export interface CategoryOperators {
  id: number;
  name: string;
}

export interface TypeMeasuringEquipment {
  id: number;
  name: string;
}

export interface PipeDiameters {
  id: number;
  name: string;
}

export interface WallsOfDiameters {
  id: number;
  name: string;
}

export interface AuditsPoints {
  id: number;
  name: string;
}

export interface UsersList {
  id: number;
  payRollNumber: string;
  createdAt: string;
  isActive: boolean;
  roleName: string;
}

export interface UserRegister {
  employeeNumber: string;
  roleId: number;
}

export interface EditUserPayload {
  id: number;
  newEmployeeNumber: string;
  newRoleId: number;
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

export interface RejectionRead {
  id: number;
  folio: number;
  inspector: string;
  partNumber: string;
  numberOfPieces: number;
  operatorPayroll: number;
  description: string;
  image: string;
  informedSignature: string;
  createdAt: string;
  defectName: string;
  conditionName: string;
  lineName: string;
  clientName: string;
  userName: string;
  containmentActionName: string;
}

export interface RejectionResponse {
  id: number;
  folio: number;
  inspector: string;
  partNumber: string;
  numberOfPieces: number;
  operatorPayroll: number;
  description: string;
  image: string | null;
  informedSignature: string | null;
  createdAt: string;
  defectName: string;
  conditionName: string;
  lineName: string;
  clientName: string;
  userName: string;
  containmentActionName: string;
  idDefect: number;
  idCondition: number;
  idLine: number;
  idClient: number;
  idContainmentAction: number;
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

export interface AvailableMonth {
  year: number;
  month: number;
  monthName: string;
}

export interface DetailedAuditFcds {
  id?: number | null | undefined;
  shiftId?: number | null | undefined;
  fcdsProcessId?: number | null | undefined;
  partNumber?: string | undefined;
  lineIds?: number[] | undefined;
  isProductConforming?: boolean | undefined;
  rejectionId?: number | undefined;
  traceability?: Traceability | undefined;
  controls?: Controls | undefined;
  physicals?: Physicals | undefined;
  dimensionalSpecs?: DimensionalSpec[] | undefined;
  visualChecklists?: any[];
}

export interface CreateAuditFcds {
  id?: number | null | undefined;
  shiftId?: number | null | undefined;
  fcdsProcessId?: number | null | undefined;
  partNumber?: string | undefined;
  lineIds?: number[] | undefined;
  isProductConforming?: boolean | undefined;
  rejectionId?: number | undefined;
  traceability?: Traceability | undefined;
  controls?: Controls | undefined;
  physicals?: Physicals | undefined;
  dimensionalSpecs?: DimensionalSpec[] | undefined;
  visualChecklists?: any[];
}

export interface UpdateAuditFcds {
  shiftId: number;
  fcdsProcessId: number;
  partNumber: string;
  lineIds: number[];
  rejectionId: number;
  isProductConforming: boolean;
  traceability: Traceability;
  controls: Controls;
  physicals: Physicals;
  dimensionalSpecs: DimensionalSpec[];
  visualChecklists: VisualChecklist[];
}

export interface AuditFcdsList {
  id: number;
  auditDate: string;
  inspectorName: string;
  processName: string;
  partNumber: string;
  linesSummary: string;
  isProductConforming: boolean;
  folioRDM: any;
}

export interface Traceability {
  machineCodeIds: number[];
  operatorsPayroll: string;
  categoryId: number;
  typeMeasuringEquipmentId: number | null;
  shopOrder: string | null;
  batchPipe: string | null;
  pipeDiameterId: number | null;
  pipeWallId: number | null;
  equipmentSerials: string[];
}

export interface Controls {
  mttoValidation: number;
  realese1stPiece: number;
  spc: number;
  materialCorrectlyIdentified: number;
  identifiedMeasuringEquipment: number;
  calibratedMeasuringEquipment: number;
  itProcess: number;
  typeOil: string;
  lastHourOfRelease: string;
}

export interface Physicals {
  brands: number;
  blows: number;
  pollution: number;
  ovality: number;
  burr: number;
  warped: number;
  excessOil: number;
}

export interface DimensionalSpec {
  specName: string;
  expectedValue: string;
  realValue: string;
}

export interface VisualChecklist {
  checkpointName: string;
  resultValue: number;
}

export interface AuditScrapList {
  id: number;
  auditDate: string;
  userId: number;
  inspectorName: string;
  shiftId: number;
  leaderPayroll: number;
  shiftName: string;
  lineNames: string[];
  findingsCount: number;
}

export interface AuditFindingScrapRead {
  id: number;
  typeScrapId: number;
  typeScrapName: string;
  estimatedWeight: number;
  materialCorrectlyIdentified: number;
  materialCorrectlySegregated: number;
  unreportedReason: string | null;
  imageEvidence: string | null;
  supervisorSignature: string | null;
}

export interface DetailedAuditScrap {
  id: number;
  auditDate: string;
  userId: number;
  inspectorName: string;
  lineIds: number[];
  shiftId: number;
  shiftName: string;
  leaderPayroll: number;
  lineNames: string[];
  findings: AuditFindingScrapRead[];
}

export interface CreateAuditScrapPayload {
  shiftId: number;
  leaderPayroll: number;
  lineIds: number[];
  findings: {
    id: number;
    typeScrapId: number;
    estimatedWeight: number;
    materialCorrectlyIdentified: number;
    materialCorrectlySegregated: number;
    unreportedReason?: string;
    imageFiles?: File[] | null | undefined;
    signatureFile?: File | null;
  }[];
}

export interface UpdateAuditScrapPayload {
  shiftId: number;
  leaderPayroll: number;
  lineIds: number[];
  findings: {
    id: number;
    typeScrapId: number;
    estimatedWeight: number;
    materialCorrectlyIdentified: number;
    materialCorrectlySegregated: number;
    unreportedReason?: string;
    imageFile?: File | null;
    signatureFile?: File | null;
    keepImageUrl?: string | null;
    keepSignatureUrl?: string | null;
  }[];
}

export interface AuditFindingACDRead {
  id: number;
  startPointId: number;
  startPointName: string;
  endPointId: number;
  endPointName: string;
  partNumber: string;
  numberOfPieces: number;
  sampleSize: string;
  packerPayroll: number;
  containerIdMatch: boolean | null;
  frontView: number;
  sideView: number;
  topView: number;
  isometricView: number;
  completeProcess: boolean | null;
  isProductConforming: boolean;
}

export interface AuditACDRead {
  id: number;
  auditDate: string;
  userId: number;
  inspectorName: string;
  shiftId: number;
  shiftName: string;
  rejectionId: number | null;
  rejectionFolio: number | null;
  lineNames: string[];
  lineIds: number[];
  findings: AuditFindingACDRead[];
}

export interface CreateAuditACDPayload {
  shiftId: number;
  rejectionId: number | null;
  lineIds: number[];
  findings: {
    startPointId: number;
    endPointId: number;
    partNumber: string;
    numberOfPieces: number;
    sampleSize: string;
    packerPayroll: number;
    containerIdMatch: boolean | null;
    frontView: number;
    sideView: number;
    topView: number;
    isometricView: number;
    completeProcess: boolean | null;
    isProductConforming: boolean;
  }[];
}

export interface UpdateAuditACDPayload {
  shiftId: number;
  rejectionId: number | null;
  lineIds: number[];
  findings: {
    id: number;
    startPointId: number;
    endPointId: number;
    partNumber: string;
    numberOfPieces: number;
    sampleSize: string;
    packerPayroll: number;
    containerIdMatch: boolean | null;
    frontView: number;
    sideView: number;
    topView: number;
    isometricView: number;
    completeProcess: boolean | null;
    isProductConforming: boolean;
  }[];
}
