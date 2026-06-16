"use client";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PedigreeLineageTab from "../BiobankModule/BiobankForm/PedigreeLineageTab";
import AliquotDetailsTab from "../BiobankModule/BiobankForm/AliquotDetailsTab";
import QualityViabilityTab from "../BiobankModule/BiobankForm/QualityViabilityTab";
import ConsentRetentionTab from "../BiobankModule/BiobankForm/ConsentRetentionTab";
export default function BiobankForm() {
  const steps = [
    "Pedigree & Lineage",
    "Aliquot Details",
    "Quality & Viability",
    "Consent & Retention",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState<any>({});
  const location = useLocation();
  const navigate = useNavigate();
  const mode = location.state?.mode || "add";
  const selectedData = location.state?.data || null;
  const isView = mode === "view";
  // const isEdit = mode === "edit";
  const [formData, setFormData] =
  useState({
    parentSampleId: "",
    sourceStudy: "",
    derivativeType: "",

    biobankSampleId: "",
    initialVolume: "",
    preservationDate: "",
    storageEquipment: "",

    freezeThawCycles: "",
    viabilityScore: "",
    extractionMethod: "",

    consentStatus: "",
    retentionDate: "",
    statusAction: "",
    legalNotes: "",
  });

  const handleChange = (
    name: string,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev: any) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePedigree = () => {
    const newErrors: any = {};

    if (
      !formData.parentSampleId?.trim()
    ) {
      newErrors.parentSampleId =
        "Parent Sample ID is required";
    }

    if (
      !formData.derivativeType?.trim()
    ) {
      newErrors.derivativeType =
        "Derivative Type is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const validateAliquot = () => {
    const newErrors: any = {};

    if (
      !formData.biobankSampleId?.trim()
    ) {
      newErrors.biobankSampleId =
        "Biobank Sample ID is required";
    }

    if (
      !formData.initialVolume?.trim()
    ) {
      newErrors.initialVolume =
        "Initial Volume is required";
    }

    if (
      !formData.preservationDate
    ) {
      newErrors.preservationDate =
        "Preservation Date is required";
    }

    if (
      !formData.storageEquipment?.trim()
    ) {
      newErrors.storageEquipment =
        "Storage Equipment is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const validateQuality = () => {
    const newErrors: any = {};

    if (
      formData.freezeThawCycles ===
      ""
    ) {
      newErrors.freezeThawCycles =
        "Freeze-Thaw Cycles required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const validateConsent = () => {
    const newErrors: any = {};

    if (
      !formData.consentStatus
    ) {
      newErrors.consentStatus =
        "Consent Status required";
    }

    if (
      !formData.retentionDate
    ) {
      newErrors.retentionDate =
        "Retention Date required";
    }

    if (
      !formData.statusAction
    ) {
      newErrors.statusAction =
        "Status Action required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };
  useEffect(() => {
  const data = selectedData || {
    parentSample: "SMP-2026-001",
    sourceStudy: "Protocol A: Oncology Baseline",
    derivativeType: "DNA Extract",

    biobankId: "BIO-2026-991A",
    initialVolume: "0.5 mL",
    preservationDate: "2026-06-16",
    storageEquipment: "Freezer A1",

    thawCount: 0,
    viabilityScore: "9.5",
    extractionMethod: "Spin Column Extraction",

    consentStatus: "BROAD RESEARCH",
    retentionExpiry: "2036-06-16",
    statusAction: "APPROVED FOR PRESERVATION",
    legalNotes: "Retain for 10 years",
  };

  setFormData({
    parentSampleId: data.parentSample || "",
    sourceStudy: data.sourceStudy || "",
    derivativeType: data.derivativeType || "",

    biobankSampleId: data.biobankId || "",
    initialVolume: data.initialVolume || "",
    preservationDate: data.preservationDate || "",
    storageEquipment: data.storageEquipment || "",

    freezeThawCycles: data.thawCount?.toString() || "",
    viabilityScore: data.viabilityScore || "",
    extractionMethod: data.extractionMethod || "",

    consentStatus: data.consentStatus || "",
    retentionDate: data.retentionExpiry || "",
    statusAction: data.statusAction || "",
    legalNotes: data.legalNotes || "",
  });
}, [selectedData]);
  const validateCurrentStep =
    () => {
      switch (currentStep) {
        case 0:
          return validatePedigree();

        case 1:
          return validateAliquot();

        case 2:
          return validateQuality();

        case 3:
          return validateConsent();

        default:
          return true;
      }
    };

  const nextStep = () => {
    const isValid =
      validateCurrentStep();

    if (!isValid) return;

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
  const handleStepClick = (targetStep: number) => {
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep);
      return;
    }
    const isValid = validateCurrentStep();
    if (!isValid) return;
    setCurrentStep(targetStep);
  };
  const handleSubmit = () => {
    const isValid =
      validateConsent();

    if (!isValid) return;

    console.log(formData);

    setSuccessMsg(
      "Biobank Record Submitted Successfully"
    );

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const handleSaveDraft = () => {
    setSuccessMsg(
      "Draft Saved Successfully"
    );

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PedigreeLineageTab
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            readOnly={isView}
          />
        );

      case 1:
        return (
          <AliquotDetailsTab
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            readOnly={isView}
          />
        );

      case 2:
        return (
          <QualityViabilityTab
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            readOnly={isView}
          />
        );

      case 3:
        return (
          <ConsentRetentionTab
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            readOnly={isView}
          />
        );

      default:
        return null;
    }
  };
  return (
    <div className="p-6">
      {successMsg && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg z-50">
          {successMsg}
        </div>
      )}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map(
            (step, index) => (
              <div
                key={step}
                className="flex items-center w-full cursor-pointer"
                onClick={() => handleStepClick(index)}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${
                      index <
                      currentStep
                        ? "bg-green-600 text-white"
                        : index ===
                          currentStep
                        ? "bg-[#00458F] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
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
                    className={`flex-1 h-1 mx-2 rounded ${
                      index <
                      currentStep
                        ? "bg-green-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            )
          )}
        </div>
        {/* <h2 className="text-2xl font-bold text-[#00458F] mb-6">
          Step{" "}
          {currentStep + 1} of{" "}
          {steps.length}:{" "}
          {steps[currentStep]}
        </h2> */}
        <h2 className="text-2xl font-bold text-[#00458F] mb-6">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </h2>

        {renderStep()}
        <div className="flex justify-between mt-8">
        <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-md bg-gray-200">
            Back
          </button>
          {currentStep > 0 ? (
            <button
              onClick={prevStep}
              className="px-5 py-2 rounded-md bg-gray-200">
              Previous
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            {currentStep <
            steps.length - 1 ? (
              <>
                <button
                  onClick={
                    handleSaveDraft
                  }
                  className="px-5 py-2 rounded-md bg-gray-500 text-white">
                  Save Draft
                </button>
                <button
                  onClick={nextStep}
                  className="px-5 py-2 rounded-md bg-[#00458F] text-white">
                  Next
                </button>
              </>
            ) : (
              <button
                onClick={
                  handleSubmit
                }
                className="px-5 py-2 rounded-md bg-[#00458F] text-white">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}