"use client";

import { useState } from "react";

import ActiveStudySummary from "../AmendmentForm/ActiveStudySummary";
import AmendmentMetadata from "../AmendmentForm/AmendmentMetadata";
import ConfigurationTabs from "../AmendmentForm/ConfigurationTabs";
import DeltaReport from "../AmendmentForm/DeltaReport";
import SubjectMigration from "../AmendmentForm/SubjectMigration";
import SiteActivation from "../AmendmentForm/SiteActivation";
import KitReconciliation from "../AmendmentForm/KitReconciliation";


const steps = [
  "Study Summary",
  "Metadata",
  "Configuration",
  "Delta Report",
  "Migration",
  "Site Activation",
  "Kit Reconciliation",
  "Version History",
  "Review & Approval",
];

export default function StudyAmendmentStepper() {
  const [currentStep, setCurrentStep] =
    useState(0);

  const [errors, setErrors] = useState<any>(
    {}
  );

  const [form, setForm] = useState({
    studyId: 1,

    studyCode: "STUDY-001",

    studyTitle:
      "Cardiology Clinical Trial",

    currentVersion: "V1.0",

    targetVersion: "V2.0",

    status: "ACTIVE",

    amendmentCode: "",

    amendmentTitle: "",

    amendmentReasonCategory: "",

    reasonForChange: "",

    rootCause: "",

    irbApprovalNumber: "",

    irbApprovalDate: "",

    releaseDate: "",

    effectiveDate: "",

    migrationPolicy: "",
    cohorts: [
  {
    id: 1,
    armCode: "ARM-A",
    armName: "Control Arm",
    targetEnrollment: 100,
    status: "ACTIVE",
    actionType: 0,
  },
],

visits: [
  {
    id: 1,
    visitName: "Screening",
    visitDay: 0,
    deviationWindow: 2,
    mandatory: true,
    actionType: 0,
  },
],
specimens: [
 {
   id:1,
   specimenType:"Blood",
   tubeType:"EDTA",
   quantity:5,
   unit:"mL",
   required:true,
   actionType:0
 }
],

tests: [
 {
   id:1,
   testCode:"CBC",
   testName:"Complete Blood Count",
   category:"Hematology",
   mandatory:true,
   actionType:0
 }
],
migrationSubjects:[
 {
   subjectId:"SUB001",
   subjectName:"John",
   currentVersion:"V1.0",
   targetVersion:"V2.0",
   consentStatus:"PENDING",
   reConsentDate:"",
   selected:false
 }
],

siteActivations:[
 {
   siteId:1,
   siteCode:"SITE001",
   siteName:"Chennai Site",
   irbApprovalNumber:"",
   irbApprovalDate:"",
   siteEffectiveDate:"",
   status:"PENDING"
 }
],

kits:[
 {
   id:1,
   batchNo:"KIT001",
   kitType:"Blood Collection",
   version:"V1.0",
   quantity:250,
   status:"ACTIVE"
 }
],
approvalHistory:[
 {
  reviewerId:1,
  reviewerName:"Medical Monitor",
  role:"Medical Review",
  decision:"PENDING",
  comments:"",
  reviewedDate:""
 }
],

auditTrail:[
 {
  id:1,
  action:"Created",
  userName:"Admin",
  dateTime:"2026-06-01",
  remarks:"Initial Amendment Created"
 }
],

versionHistory:[
 {
  versionNo:"V1.0",
  effectiveDate:"2026-01-01",
  status:"Approved",
  approvedBy:"Sponsor"
 }
],

currentStatus:"DRAFT",

electronicSignature:"",

mfaVerified:false
  });

  const validateMetadata = () => {
    const validationErrors: any = {};

    if (!form.amendmentCode) {
      validationErrors.amendmentCode =
        "Required";
    }

    if (
      form.reasonForChange.trim()
        .length < 20
    ) {
      validationErrors.reasonForChange =
        "Minimum 20 characters required";
    }

    if (!form.effectiveDate) {
      validationErrors.effectiveDate =
        "Required";
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };
  
  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateMetadata()) {
        return;
      }
    }

    setCurrentStep((prev) =>
      Math.min(
        prev + 1,
        steps.length - 1
      )
    );
  };
  const prevStep = () => {
    setCurrentStep((prev) =>
      Math.max(prev - 1, 0)
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ActiveStudySummary
            form={form}
            onInitiateAmendment={() =>
              setCurrentStep(1)
            }
          />
        );

      case 1:
        return (
          <AmendmentMetadata
            form={form}
            setForm={setForm}
            errors={errors}
          />
        );
       case 2:
        return (
            <ConfigurationTabs
            form={form}
            setForm={setForm}
            />
        );
      case 3:
        return (
        <DeltaReport
            // form={form}
        />
        );
      case 4:
        return (
          <SubjectMigration
              // form={form}
              // setForm={setForm}
          />
        );

        case 5:
        return (
          <SiteActivation
              // form={form}
              // setForm={setForm}
          />
        );

        case 6:
        return (
          <KitReconciliation
              // form={form}
          />
        );
      default:
        return (
          <div className="text-center py-10">
            Upcoming Step
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">

        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center w-full">

                <div className="flex flex-col items-center">

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${
                      index <=
                      currentStep
                        ? "bg-[#00458F] text-white"
                        : "bg-gray-200"
                    }`}>

                    {index + 1}
                  </div>

                  <span className="text-xs mt-2 whitespace-nowrap">
                    {step}
                  </span>
                </div>

                {index !==
                  steps.length -
                    1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded
                    ${
                      index <
                      currentStep
                        ? "bg-[#00458F]"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            )
          )}
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-md bg-gray-100">

            Previous
          </button>

          <button
            onClick={nextStep}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">

            Next
          </button>
        </div>
      </div>
    </div>
  );
}