export interface AmendmentDto {
  amendmentId: number;

  studyCode: string;
  studyTitle: string;

  currentVersion: string;
  newVersion: string;

  amendmentCode: string;
  amendmentTitle: string;

  amendmentCategory: string;

  releaseDate: string;
  effectiveDate: string;

  irbApprovalNo: string;
  irbApprovalDate: string;

  amendmentBy: string;

  rootCause: string;
  amendmentReason: string;

  migrationPolicy: string;

  status: string;
}