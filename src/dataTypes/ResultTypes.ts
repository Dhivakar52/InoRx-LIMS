export type DepartmentType =
  | "Bacteriology"
  | "Bio Chemistry"
  | "Clinical Pathology"
  | "Molecular Biology"
  | "Serology";

export interface PatientInfo {
  labNumber: string;
  patientName: string;
  uhidNo: string;
  ipNo: string;
  gender: string;
  age: string;
  department: string;
  ward: string;
  requestDate: string;
  receiptDate: string;
  referredBy: string;
  diagnosis: string;
}