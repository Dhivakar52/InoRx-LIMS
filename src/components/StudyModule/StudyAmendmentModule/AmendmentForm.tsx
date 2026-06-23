"use client";

import { useState } from "react";
import Swal from "sweetalert2";

import ActiveStudySummary from "../AmendmentForm/ActiveStudySummary";
import AmendmentMetadata from "../AmendmentForm/AmendmentMetadata";
import ConfigurationTabs from "../AmendmentForm/ConfigurationTabs";

import SubjectMigration from "../AmendmentForm/SubjectMigration";
import SiteActivation from "../AmendmentForm/SiteActivation";


const steps = [
  "Study Summary",
  "Amendment Details",
  "Migration Policy",
  "Cloned Workspace & Reconciliation",
  "Site Activation Deployment",

  // "Configuration",
  // "Delta Report",



];

export default function AmendmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    studyId: 1,
    studyCode: "STUDY-001",
    studyTitle: "Cardiology Clinical Trial",
    currentVersion: "V1.0",
    targetVersion: "V2.0",
    status: "ACTIVE",
    amendmentCode: "",
    amendmentTitle: "",
    amendmentDescription: "",
    amendmentReasonCategory: "",

    reasonForAmendment: "",
    rootCause: "",
    versionIncrementType: "Minor",
    effectiveDate: "",
    irbApprovalNumber: "",
    irbApprovalDate: "",
    releaseDate: "",
    migrationPolicy: "",
    protocolAttachment: null as File | null,
    consentDocument: null as File | null,
    associatedDeviations: [] as string[],
    associatedCAPAs: [] as string[],
    // Update cohorts to match the new structure
    cohorts: [
      { id: 1, armCode: "ARM-A", armName: "Active Cohort 50mg", actionType: 0 },
      { id: 2, armCode: "ARM-B", armName: "Placebo Control Group", actionType: 0 },
      { id: 3, armCode: "ARM-C", armName: "Extended Safety Cohort 100mg", actionType: 0 },
    ],

    // Update visits to match the new structure
    visits: [
      { id: 1, visitCode: "SCR", visitName: "Screening", targetDay: "-7", windowMinus: "3", windowPlus: "3", actionType: 0 },
      { id: 2, visitCode: "D01", visitName: "Baseline Dosing", targetDay: "0", windowMinus: "0", windowPlus: "1", actionType: 0 },
    ],

    migrationSubjects: [
      {
        subjectId: "SUB001",
        currentVersion: "V1.0",
        targetVersion: "V2.0",
        consentStatus: "PENDING",
        reConsentDate: "",
        selected: false
      }
    ],
    siteActivations: [
      {
        siteId: 1,
        siteCode: "SITE001",
        siteName: "Chennai Site",
        irbApprovalNumber: "",
        irbApprovalDate: "",
        siteEffectiveDate: "",
        status: "PENDING"
      }
    ],
    kits: [
      {
        id: 1,
        batchNo: "KIT001",
        kitType: "Blood Collection",
        version: "V1.0",
        quantity: 250,
        status: "ACTIVE"
      }
    ],
    approvalHistory: [
      {
        reviewerId: 1,
        reviewerName: "Medical Monitor",
        role: "Medical Review",
        decision: "PENDING",
        comments: "",
        reviewedDate: ""
      }
    ],
    auditTrail: [
      {
        id: 1,
        action: "Created",
        userName: "Admin",
        dateTime: "2026-06-01",
        remarks: "Initial Amendment Created"
      }
    ],
    versionHistory: [
      {
        versionNo: "V1.0",
        effectiveDate: "2026-01-01",
        status: "Approved",
        approvedBy: "Sponsor"
      }
    ],
    currentStatus: "DRAFT",
    electronicSignature: "",
    mfaVerified: false,
    rejectionComment: "",
  });

  // Add audit trail entry
  const addAuditEntry = (action: string, oldValue: any, newValue: any, reasonForChange: string) => {
    const entry = {
      id: Date.now(),
      action,
      userName: "CurrentUser",
      role: "Study Coordinator",
      dateTime: new Date().toISOString(),
      ipAddress: "127.0.0.1",
      oldValue: oldValue ? JSON.stringify(oldValue) : null,
      newValue: newValue ? JSON.stringify(newValue) : null,
      remarks: reasonForChange
    };
    setForm(prev => ({
      ...prev,
      auditTrail: [entry, ...(prev.auditTrail || [])]
    }));
  };

  // Validate Amendment Code format
  const validateAmendmentCode = (code: string) => {
    const regex = /^[A-Z0-9\-]+$/;
    return regex.test(code);
  };
  // const validateMigrationPolicy = () => {
  //   const newErrors: any = {};

  //   if (!form.migrationPolicy?.trim()) {
  //     newErrors.migrationPolicy = "Migration Policy is required";
  //   }

  //   setErrors((prev: any) => ({
  //     ...prev,
  //     ...newErrors,
  //   }));

  //   return Object.keys(newErrors).length === 0;
  // };
  // Validate Metadata - Complete as per document
  const validateMetadata = () => {
    const newErrors: any = {};

    // Amendment Code validation
    if (!form.amendmentCode?.trim()) {
      newErrors.amendmentCode = "Amendment Code is required";
    } else if (!validateAmendmentCode(form.amendmentCode)) {
      newErrors.amendmentCode = "Amendment Code must contain only uppercase letters, numbers, and hyphens";
    } else if (form.amendmentCode.length > 30) {
      newErrors.amendmentCode = "Amendment Code cannot exceed 30 characters";
    }

    // Amendment Title validation
    if (!form.amendmentTitle?.trim()) {
      newErrors.amendmentTitle = "Amendment Title is required";
    } else if (form.amendmentTitle.length > 150) {
      newErrors.amendmentTitle = "Amendment Title cannot exceed 150 characters";
    }

    // Amendment Description validation
    if (form.amendmentDescription && form.amendmentDescription.length > 500) {
      newErrors.amendmentDescription = "Amendment Description cannot exceed 500 characters";
    }

    // Reason for Amendment validation
    if (!form.reasonForAmendment?.trim()) {
      newErrors.reasonForAmendment = "Reason for Amendment is required";
    } else if (form.reasonForAmendment.trim().length < 20) {
      newErrors.reasonForAmendment = "Reason for Amendment must be at least 20 characters";
    } else if (form.reasonForAmendment.length > 1000) {
      newErrors.reasonForAmendment = "Reason for Amendment cannot exceed 1000 characters";
    }


    // Root Cause Analysis validation
    if (!form.rootCause?.trim()) {
      newErrors.rootCause = "Root Cause Analysis is required";
    } else if (form.rootCause.length > 1000) {
      newErrors.rootCause = "Root Cause Analysis cannot exceed 1000 characters";
    }

    // Proposed Effective Date validation
    if (!form.effectiveDate) {
      newErrors.effectiveDate = "Proposed Effective Date is required";
    } else {
      const proposedDate = new Date(form.effectiveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (proposedDate <= today) {
        newErrors.effectiveDate = "Proposed Effective Date must be in the future";
      }

      if (form.irbApprovalDate && proposedDate < new Date(form.irbApprovalDate)) {
        newErrors.effectiveDate = "Proposed Effective Date must be on or after IRB Approval Date";
      }
    }
    if (!form.releaseDate) {
      newErrors.releaseDate = "Release Date is required";
    } else {
      const proposedDate = new Date(form.releaseDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (proposedDate <= today) {
        newErrors.releaseDate = "Release Date must be in the future";
      }

      if (form.irbApprovalDate && proposedDate < new Date(form.irbApprovalDate)) {
        newErrors.releaseDate = "Release Date must be on or after IRB Approval Date";
      }
    }
    // IRB validation - If one is provided, both are required
    if (form.irbApprovalNumber && !form.irbApprovalDate) {
      newErrors.irbApprovalDate = "IRB Approval Date is required when IRB Number is provided";
    }
    if (form.irbApprovalDate && !form.irbApprovalNumber) {
      newErrors.irbApprovalNumber = "IRB Approval Number is required when IRB Date is provided";
    }

    // Consent Document validation
    if (!form.consentDocument) {
      newErrors.consentDocument = "Consent Document is required";
    } else {
      const file = form.consentDocument as File;
      const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (!allowedTypes.includes(file.type)) {
        newErrors.consentDocument = "Only PDF, DOC, DOCX files are allowed";
      }
      if (file.size > 10 * 1024 * 1024) {
        newErrors.consentDocument = "File size should not exceed 10 MB";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate Migration
  // const validateMigration = () => {
  //   const newErrors: any = {};

  //   if (!form.migrationPolicy) {
  //     newErrors.migrationPolicy = "Migration Policy is required";
  //   }

  //   // For Global Mid-Study Transition, check re-consent status
  //   if (form.migrationPolicy === "Global Mid-Study Transition") {
  //     const pendingSubjects = form.migrationSubjects.filter(
  //       (s: any) => s.consentStatus === "PENDING"
  //     );
  //     if (pendingSubjects.length > 0) {
  //       newErrors.migrationSubjects = `${pendingSubjects.length} subject(s) require re-consent before migration. System will block new kit generation until re-consent is completed.`;
  //     }

  //     // Validate re-consent dates are >= amendment release date
  //     const invalidDates = form.migrationSubjects.filter(
  //       (s: any) => s.reConsentDate && form.releaseDate && new Date(s.reConsentDate) < new Date(form.releaseDate)
  //     );
  //     if (invalidDates.length > 0) {
  //       newErrors.reConsentDates = `${invalidDates.length} subject(s) have re-consent dates before amendment release date`;
  //     }
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Validate Site Activations
  const validateSites = () => {
    const newErrors: any = {};

    const invalidSites = form.siteActivations.filter(
      (site: any) => site.status === "Activated" && (!site.irbApprovalNumber || !site.irbApprovalDate || !site.siteEffectiveDate)
    );

    if (invalidSites.length > 0) {
      newErrors.siteActivations = `${invalidSites.length} site(s) are missing required IRB information for activation`;
    }

    // Validate site effective dates >= local IRB approval date
    const dateErrors = form.siteActivations.filter(
      (site: any) => site.siteEffectiveDate && site.irbApprovalDate && new Date(site.siteEffectiveDate) < new Date(site.irbApprovalDate)
    );
    if (dateErrors.length > 0) {
      newErrors.siteEffectiveDates = `${dateErrors.length} site(s) have effective dates before their IRB approval date`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // MFA Verification
  const verifyMFA = async (password: string, mfaCode: string): Promise<boolean> => {
    // Replace with actual backend API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation - in production, verify against backend
        const isValid = password === "password123" && mfaCode === "123456";
        resolve(isValid);
      }, 1000);
    });
  };

  // Submit for Review
  const submitForReview = () => {
    if (!validateMetadata()) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fix the errors before submitting",
        icon: "error"
      });
      return;
    }

    Swal.fire({
      title: "Submit for Review?",
      text: "This will lock the configuration and submit for approval",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        setForm(prev => ({ ...prev, currentStatus: "SUBMITTED" }));
        addAuditEntry(
          "SUBMITTED_FOR_REVIEW",
          { status: "DRAFT" },
          { status: "SUBMITTED" },
          "Amendment submitted for review"
        );
        Swal.fire({
          title: "Submitted!",
          text: "Amendment has been submitted for review",
          icon: "success"
        });
      }
    });
  };

  // Sign & Activate with MFA
  const signAndActivate = async () => {
    if (form.currentStatus !== "SUBMITTED") {
      Swal.fire({
        title: "Error",
        text: "Amendment must be submitted for review before activation",
        icon: "error"
      });
      return;
    }

    const { value: credentials } = await Swal.fire({
      title: "MFA E-Signature Verification",
      html: `
        <div class="text-left">
          <p class="mb-3 text-sm text-gray-600">Reviewer: <strong>Current User</strong></p>
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Re-enter Password</label>
            <input type="password" id="password" class="swal2-input w-full" placeholder="Enter your password">
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium mb-1">Signature Meaning</label>
            <select id="signatureMeaning" class="swal2-select w-full">
              <option value="">Select signature meaning...</option>
              <option value="I approve the clinical and technical configurations of this amendment">I approve the clinical and technical configurations of this amendment</option>
              <option value="I authorize the deployment of this version">I authorize the deployment of this version to all applicable sites</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">2FA Verification Code</label>
            <input type="text" id="mfaCode" class="swal2-input w-full" placeholder="Enter 6-digit code" maxlength="6">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Sign & Activate",
      preConfirm: async () => {
        const password = (document.getElementById("password") as HTMLInputElement)?.value;
        const signatureMeaning = (document.getElementById("signatureMeaning") as HTMLSelectElement)?.value;
        const mfaCode = (document.getElementById("mfaCode") as HTMLInputElement)?.value;

        if (!password) {
          Swal.showValidationMessage("Password is required");
          return false;
        }
        if (!signatureMeaning) {
          Swal.showValidationMessage("Signature meaning is required");
          return false;
        }
        if (!mfaCode || mfaCode.length !== 6) {
          Swal.showValidationMessage("Valid 6-digit MFA code is required");
          return false;
        }

        const isValid = await verifyMFA(password, mfaCode);
        if (!isValid) {
          Swal.showValidationMessage("Invalid credentials or MFA code");
          return false;
        }

        return { password, signatureMeaning, mfaCode };
      },
    });

    if (credentials) {
      setIsSubmitting(true);

      // Simulate activation process
      setTimeout(() => {
        // Archive predecessor version and activate target version
        const updatedVersionHistory = [
          {
            versionNo: form.currentVersion,
            effectiveDate: form.effectiveDate || new Date().toISOString().split('T')[0],
            status: "ARCHIVED",
            approvedBy: "Current User",
            archivedDate: new Date().toISOString()
          },
          ...(form.versionHistory || [])
        ];

        setForm(prev => ({
          ...prev,
          currentStatus: "ACTIVATED",
          electronicSignature: credentials.signatureMeaning,
          mfaVerified: true,
          versionHistory: updatedVersionHistory,
          effectiveDate: form.effectiveDate || new Date().toISOString().split('T')[0]
        }));

        addAuditEntry(
          "ACTIVATED",
          { status: "SUBMITTED", version: form.currentVersion },
          { status: "ACTIVATED", version: form.targetVersion },
          `Amendment activated with MFA e-signature. Signature meaning: ${credentials.signatureMeaning}`
        );

        Swal.fire({
          title: "Amendment Activated!",
          html: `
            <p>Version ${form.targetVersion} has been successfully activated.</p>
            <p class="text-sm text-gray-500 mt-2">Predecessor version ${form.currentVersion} has been locked and archived.</p>
          `,
          icon: "success"
        });

        setIsSubmitting(false);
      }, 2000);
    }
  };

  // Return to Draft
  const returnToDraft = async () => {
    const { value: comment } = await Swal.fire({
      title: "Return to Draft",
      text: "Please provide a reason for returning this amendment",
      input: "textarea",
      inputPlaceholder: "Enter rejection comment (minimum 10 characters)...",
      inputAttributes: {
        "aria-label": "Rejection comment",
        required: "true",
        minlength: "10"
      },
      showCancelButton: true,
      confirmButtonText: "Return to Draft",
      preConfirm: (value) => {
        if (!value || value.length < 10) {
          Swal.showValidationMessage("Please provide a detailed reason (minimum 10 characters)");
          return false;
        }
        if (value.length > 500) {
          Swal.showValidationMessage("Comment cannot exceed 500 characters");
          return false;
        }
        return value;
      },
    });

    if (comment) {
      setForm(prev => ({
        ...prev,
        currentStatus: "RETURNED",
        rejectionComment: comment
      }));

      addAuditEntry(
        "RETURNED_TO_DRAFT",
        { status: "SUBMITTED" },
        { status: "RETURNED" },
        comment
      );

      Swal.fire({
        title: "Returned",
        text: "Amendment has been returned to draft status",
        icon: "info"
      });
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return validateMetadata();

      case 2:
        return true;

      case 4:
        return true;

      case 5:
        return validateSites();

      default:
        return true;
    }
  };

  const nextStep = () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      return;
    }
    const isValid = validateCurrentStep();
    if (!isValid) return;
    setCurrentStep(targetStep);
  };

  const saveDraft = () => {
    addAuditEntry(
      "DRAFT_SAVED",
      null,
      { amendmentCode: form.amendmentCode, amendmentTitle: form.amendmentTitle },
      "Draft saved by user"
    );
    Swal.fire({
      title: "Success",
      text: "Amendment draft saved successfully",
      icon: "success"
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ActiveStudySummary
            {...({ form, onInitiateAmendment: () => setCurrentStep(1) } as any)}
          />
        );
      case 1:
        return (
          <AmendmentMetadata
            {...({ form, setForm, errors, addAuditEntry } as any)}
          />
        );
      case 2:
        return (
          < SubjectMigration
            {...({ form, setForm, addAuditEntry } as any)}
          />
        );
      case 3:
        return (
          <ConfigurationTabs
            {...({ form } as any)}
          />
        );
      // case 4:
      //   return (
      //     <ConfigurationTabs
      //       {...({ form, setForm, errors, addAuditEntry } as any)}
      //     />
      //   );
      case 4:
        return (
          <SiteActivation
            {...({ form, setForm, errors, addAuditEntry } as any)}
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
        {/* Status Banner */}
        {form.currentStatus === "SUBMITTED" && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">⚠️ This amendment is pending review and approval. Dual MFA e-signature required for activation.</p>
          </div>
        )}

        {form.currentStatus === "ACTIVATED" && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✅ Version {form.targetVersion} has been activated. Predecessor version {form.currentVersion} is locked.</p>
          </div>
        )}

        {form.currentStatus === "RETURNED" && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">❌ Amendment returned to draft. Reason: {form.rejectionComment}</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center w-full cursor-pointer"
              onClick={() => handleStepClick(index)}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${index <= currentStep ? "bg-[#00458F] text-white" : "bg-gray-200"}`}>
                  {index + 1}
                </div>
                <span className="text-xs mt-2 whitespace-nowrap">{step}</span>
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded
                    ${index < currentStep ? "bg-[#00458F]" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {form.currentStatus === "DRAFT" && (
              <button
                onClick={saveDraft}
                className="px-5 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600"
              >
                Save Draft
              </button>
            )}

            {form.currentStatus === "DRAFT" && currentStep === steps.length - 1 && (
              <button
                onClick={submitForReview}
                className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit for Review
              </button>
            )}

            {form.currentStatus === "SUBMITTED" && currentStep === steps.length - 1 && (
              <>
                <button
                  onClick={returnToDraft}
                  className="px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Return to Draft
                </button>
                <button
                  onClick={signAndActivate}
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                >
                  {isSubmitting ? "Verifying..." : "Sign & Activate (MFA)"}
                </button>
              </>
            )}

            {currentStep < steps.length - 1 && form.currentStatus !== "SUBMITTED" && (
              <button
                onClick={nextStep}
                className="px-5 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#003570]"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}