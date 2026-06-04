"use client";

import { useState } from "react";

import FormWrapper from "../../../common/FormWrapper";
import GeneralInformationTab from "../StudyAmendmentModule/GeneralInformation";
import ProtocolChangesTab from "../StudyAmendmentModule/ProtocolChangesTab";
import CohortsTab from "../StudyAmendmentModule/CohortsTab";
import VisitScheduleTab from "../StudyAmendmentModule/VisitScheduleTab";
import DeltaReportTab from "../StudyAmendmentModule/DeltaReportTab";
import SubjectMigrationTab from "../StudyAmendmentModule/SubjectMigrationTab";
import ReConsentTab from "../StudyAmendmentModule/ReConsentTab";
import DocumentsTab from "../StudyAmendmentModule/DocumentsTab";
import ApprovalWorkflowTab from "../StudyAmendmentModule/ApprovalWorkflowTab";
import AuditTrailTab from "../StudyAmendmentModule/AuditTrailTab";
import ReviewAndSubmitTab from "../StudyAmendmentModule/ReviewAndSubmitTab";

export default function AmendmentForm() {

  const [activeTab, setActiveTab] =
    useState("General Information");

  const tabs = [
    "General Information",
    "Protocol Changes",
    "Cohorts",
    "Visit Schedule",
    "Delta Report",
    "Subject Migration",
    "Re-Consent",
    "Documents",
    "Approval Workflow",
    "Audit Trail",
    "Review & Submit",
  ];
  const [formData, setFormData] = useState({
  studyCode: "",
  studyTitle: "",
  currentVersion: "",

  amendmentCode: "",
  amendmentTitle: "",
  newVersion: "",

  reasonCategory: "",
  deviationId: "",
  capaId: "",

  rootCause: "",
  amendmentReason: "",

  releaseDate: "",
  effectiveDate: "",

  irbApprovalNo: "",
  irbApprovalDate: "",
});
const handleChange = (
  field: string,
  value: any
) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));

  setErrors((prev: any) => ({
    ...prev,
    [field]: "",
  }));
};
const validateForm = () => {
  const newErrors: any = {};

  if (!formData.studyCode)
    newErrors.studyCode =
      "Study Code is required";

  if (!formData.amendmentCode)
    newErrors.amendmentCode =
      "Amendment Code is required";

  if (!formData.amendmentTitle)
    newErrors.amendmentTitle =
      "Amendment Title is required";

  if (!formData.newVersion)
    newErrors.newVersion =
      "Version is required";

  if (!formData.rootCause)
    newErrors.rootCause =
      "Root Cause is required";

  if (
    !formData.amendmentReason ||
    formData.amendmentReason.length < 20
  ) {
    newErrors.amendmentReason =
      "Minimum 20 characters required";
  }

  setErrors(newErrors);

  return (
    Object.keys(newErrors).length === 0
  );
};

const [errors, setErrors] = useState<any>({});
const handleSubmit = () => {

  if (!validateForm())
    return;

  console.log(
    "Amendment Data",
    formData
  );

};

  return (

    <FormWrapper
      title="Study Amendment"
      onSubmit={handleSubmit}
      columns={1}
    >

      {/* Header */}

      <div className="col-span-1">

        <div className="flex justify-between items-center mb-4">

          <div>

            <h2 className="text-xl font-bold">

              Amendment :
              AMD-2026-001

            </h2>

            <p className="text-sm text-gray-500">

              Protocol Version Upgrade

            </p>

          </div>

          <div>

            <span className="px-3 py-2 rounded bg-yellow-100 text-yellow-700">

              Draft

            </span>

          </div>

        </div>

      </div>

      {/* Tabs */}

      <div className="col-span-1">

        <div className="border-b mb-5">

          <div className="flex gap-2 overflow-x-auto pb-2">

            {tabs.map(tab => (

              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`px-4 py-2 rounded-md whitespace-nowrap transition
                  ${
                    activeTab === tab
                      ? "themeColor"
                      : "bg-gray-100"
                  }
                `}
              >
                {tab}
              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="col-span-1">

        {activeTab ===
          "General Information" && (
            <GeneralInformationTab
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />       
             )}

        {activeTab ===
          "Protocol Changes" && (
          <ProtocolChangesTab />
        )}

        {activeTab ===
          "Cohorts" && (
          <CohortsTab />
        )}

        {activeTab ===
          "Visit Schedule" && (
          <VisitScheduleTab />
        )}

        {activeTab ===
          "Delta Report" && (
          <DeltaReportTab />
        )}

        {activeTab ===
          "Subject Migration" && (
          <SubjectMigrationTab />
        )}

        {activeTab ===
          "Re-Consent" && (
          <ReConsentTab />
        )}

        {activeTab ===
          "Documents" && (
          <DocumentsTab />
        )}

        {activeTab ===
          "Approval Workflow" && (
          <ApprovalWorkflowTab />
        )}

        {activeTab ===
          "Audit Trail" && (
          <AuditTrailTab />
        )}

        {activeTab ===
          "Review & Submit" && (
          <ReviewAndSubmitTab />
        )}

      </div>

    </FormWrapper>

  );
}