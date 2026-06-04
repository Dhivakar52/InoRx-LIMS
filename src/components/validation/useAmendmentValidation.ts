import type { StudyAmendmentDto } from "../../dataTypes/StudyAmendmentDto";

export const validateMetadata = (
  form: StudyAmendmentDto
) => {
  const errors: any = {};

  if (!form.amendmentCode)
    errors.amendmentCode =
      "Amendment Code Required";

  if (!form.amendmentTitle)
    errors.amendmentTitle =
      "Amendment Title Required";

  if (
    !form.reasonForChange ||
    form.reasonForChange.trim().length < 20
  ) {
    errors.reasonForChange =
      "Minimum 20 characters required";
  }

  if (!form.effectiveDate) {
    errors.effectiveDate =
      "Effective Date Required";
  }

  if (
    form.effectiveDate &&
    new Date(form.effectiveDate) <
      new Date()
  ) {
    errors.effectiveDate =
      "Cannot be backdated";
  }

  if (
    form.irbApprovalDate &&
    form.effectiveDate &&
    new Date(form.effectiveDate) <
      new Date(form.irbApprovalDate)
  ) {
    errors.effectiveDate =
      "Must be after IRB approval";
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
  };
};
export const validateMigration =
(
 form:any
) => {

 const errors:any = {};

 form.migrationSubjects
 .forEach(
   (subject:any) => {

     if(
       subject.selected &&
       subject.consentStatus !==
       "WAIVED" &&
       !subject.reConsentDate
     ){
       errors[
        subject.subjectId
       ] =
       "Re-consent required";
     }
   }
 );

 return {
   isValid:
     Object.keys(errors)
     .length === 0,
   errors,
 };
};
export const validateSites =
(
 sites:any[]
) => {

 const errors:any = {};

 sites.forEach(
 (
  site:any
 ) => {

 if(
   site.siteEffectiveDate &&
   site.irbApprovalDate &&
   new Date(
    site.siteEffectiveDate
   ) <
   new Date(
    site.irbApprovalDate
   )
 ){
   errors[
     site.siteCode
   ] =
   "Effective date must be after IRB approval";
 }
 });

 return {
   isValid:
     Object.keys(errors)
      .length === 0,
   errors,
 };
};
export const validateBeforeSubmit=
(
 form:any
)=>{

 const errors:string[]=[];

 if(
  !form.electronicSignature
 ){
  errors.push(
   "Electronic signature required"
  );
 }

 if(
  !form.mfaVerified
 ){
  errors.push(
   "MFA verification required"
  );
 }

 const pending=
 form.approvalHistory.some(
  (x:any)=>
   x.decision===
   "PENDING"
 );

 if(pending){
  errors.push(
   "Pending approvals exist"
  );
 }

 return{
  isValid:
   errors.length===0,
  errors
 };
};