export type DepartmentType =
  | "Bacteriology"
  | "Bio Chemistry"
  | "Clinical Pathology"
  | "Molecular Biology"
  | "Serology";

export interface SubjectInfo {
  labNumber: string;
  uhidNo: string;
  ipNo: string;
  gender: string;
  age: string;
  department: string;
  requestDate: string;
  receiptDate: string;
  referredBy: string;
  diagnosis: string;
}