export interface StudyAmendmentDto {
  studyId: number;

  studyCode: string;
  studyTitle: string;

  currentVersion: string;
  targetVersion: string;

  status:
  | "DRAFT"
  | "SUBMITTED"
  | "RETURNED"
  | "APPROVED"
  | "ACTIVE"
  | "ARCHIVED";

  amendmentCode: string;
  amendmentTitle: string;

  amendmentReasonCategory: string;

  reasonForChange: string;

  rootCause: string;

  irbApprovalNumber: string;
  irbApprovalDate: string;

  releaseDate: string;
  effectiveDate: string;

  migrationPolicy: string;

  deviationIds: string[];
  capaIds: string[];
  cohorts: CohortDto[];
  visits: VisitDto[];
  specimens: SpecimenDto[];
  tests: TestPanelDto[];
  migrationSubjects: MigrationSubjectDto[];

  siteActivations: SiteActivationDto[];

  kits: KitReconciliationDto[];
  approvalHistory: ApprovalDto[];

  auditTrail: AuditTrailDto[];

  versionHistory: VersionHistoryDto[];

  currentStatus: string;

  electronicSignature: string;

  mfaVerified: boolean;
}
export interface CohortDto {
  id: number;
  armCode: string;
  armName: string;
  targetEnrollment: number;
  status: string;
  actionType: number; // 0=NoChange,1=Add,2=Edit,3=Delete
}

export interface VisitDto {
  id: number;
  visitName: string;
  visitDay: number;
  deviationWindow: number;
  mandatory: boolean;
  actionType: number;
}
export interface SpecimenDto {
  id: number;
  specimenType: string;
  tubeType: string;
  quantity: number;
  unit: string;
  required: boolean;
  actionType: number;
}

export interface TestPanelDto {
  id: number;
  testCode: string;
  testName: string;
  category: string;
  mandatory: boolean;
  actionType: number;
}
export interface MigrationSubjectDto {
  subjectId: string;
  currentVersion: string;

  targetVersion: string;

  consentStatus:
  | "PENDING"
  | "COMPLETED"
  | "WAIVED";

  reConsentDate: string;

  selected: boolean;
}

export interface SiteActivationDto {
  siteId: number;

  siteCode: string;

  siteName: string;

  irbApprovalNumber: string;

  irbApprovalDate: string;

  siteEffectiveDate: string;

  status:
  | "PENDING"
  | "ACTIVE"
  | "SUPERSEDED";
}

export interface KitReconciliationDto {
  id: number;

  batchNo: string;

  kitType: string;

  version: string;

  quantity: number;

  status:
  | "ACTIVE"
  | "OBSOLETE"
  | "ARCHIVED";
}
export interface ApprovalDto {
  reviewerId: number;

  reviewerName: string;

  role: string;

  decision:
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

  comments: string;

  reviewedDate: string;
}

export interface AuditTrailDto {
  id: number;

  action: string;

  userName: string;

  dateTime: string;

  remarks: string;
}

export interface VersionHistoryDto {
  versionNo: string;

  effectiveDate: string;

  status: string;

  approvedBy: string;
}