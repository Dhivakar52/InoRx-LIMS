"use client";

import { useState } from "react";

import InventoryDefinitionTab from "../InventoryManagement/InventoryForm/InventoryDefinitionTab";
import InventoryLotTab from "../InventoryManagement/InventoryForm/InventoryLotTab";
import InventoryStorageTab from "../InventoryManagement/InventoryForm/InventoryStorageTab";
import InventoryStatusTab from "../InventoryManagement/InventoryForm/InventoryStatusTab";
import { useNavigate } from "react-router-dom";

export default function AddInventoryForm() {
  const steps = [
    "Reagent / Kit Definition",
    "Lot & Expiration Rules",
    "Physical Storage Location",
    "Stock Alerts & Initial Status",
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const [successMsg, setSuccessMsg] = useState("");

  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: "QIAamp DNA Blood Mini Kit",
    itemCategory: "Extraction Kit",
    vendor: "QIAGEN",
    catalogNumber: "",

    lotNumber: "LOT-8493021",
    quantityReceived: "10",
    receiptDate: "2026-06-16",
    expirationDate: "",

    facility: "Boston General Hospital",
    storageRoom: "Main Prep Lab - Area B",
    storageEquipment: "",
    shelfBin: "",

    lowStockThreshold: "2",
    expiryAlert: "60 Days Before Expiry",
    lifecycleStatus: "QUARANTINED (PENDING QC)",
    receiptNotes: "",
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

  // STEP 1 VALIDATION
  const validateStep1 = () => {
    const newErrors: any = {};

    if (!formData.itemName?.trim()) {
      newErrors.itemName =
        "Item Name is required";
    }

    if (!formData.itemCategory?.trim()) {
      newErrors.itemCategory =
        "Item Category is required";
    }

    if (!formData.vendor?.trim()) {
      newErrors.vendor =
        "Manufacturer / Vendor is required";
    }

    if (!formData.catalogNumber?.trim()) {
      newErrors.catalogNumber =
        "Catalog Number is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // STEP 2 VALIDATION
  const validateStep2 = () => {
    const newErrors: any = {};

    if (!formData.lotNumber?.trim()) {
      newErrors.lotNumber =
        "Lot Number is required";
    }

    if (
      !formData.quantityReceived
    ) {
      newErrors.quantityReceived =
        "Quantity Received is required";
    }

    if (!formData.receiptDate) {
      newErrors.receiptDate =
        "Receipt Date is required";
    }

    if (!formData.expirationDate) {
      newErrors.expirationDate =
        "Expiration Date is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const validateStep3 = () => {
    const newErrors: any = {};

    if (!formData.facility?.trim()) {
      newErrors.facility =
        "Facility is required";
    }

    if (
      !formData.storageEquipment?.trim()
    ) {
      newErrors.storageEquipment =
        "Storage Equipment is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const validateStep4 = () => {
    const newErrors: any = {};

    if (
      !formData.lowStockThreshold
    ) {
      newErrors.lowStockThreshold =
        "Threshold is required";
    }

    if (!formData.expiryAlert) {
      newErrors.expiryAlert =
        "Expiry Alert is required";
    }

    if (
      !formData.lifecycleStatus
    ) {
      newErrors.lifecycleStatus =
        "Lifecycle Status is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const validateCurrentStep =
    () => {
      switch (currentStep) {
        case 0:
          return validateStep1();

        case 1:
          return validateStep2();

        case 2:
          return validateStep3();

        case 3:
          return validateStep4();

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

  const handleStepClick = (
    targetStep: number
  ) => {
    if (
      targetStep <= currentStep
    ) {
      setCurrentStep(targetStep);
      return;
    }

    const isValid =
      validateCurrentStep();

    if (!isValid) return;

    setCurrentStep(targetStep);
  };

  const handleSaveDraft = () => {
    console.log(
      "Draft Saved",
      formData
    );

    setSuccessMsg(
      "Draft Saved Successfully"
    );

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const handleSubmit = () => {
    const isValid =
      validateStep4();

    if (!isValid) return;

    console.log(
      "Inventory Submitted",
      formData
    );

    setSuccessMsg(
      "Inventory Saved Successfully"
    );

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <InventoryDefinitionTab
            formData={formData}
            handleChange={
              handleChange
            }
            errors={errors}
          />
        );

      case 1:
        return (
          <InventoryLotTab
            formData={formData}
            handleChange={
              handleChange
            }
            errors={errors}
          />
        );

      case 2:
        return (
          <InventoryStorageTab
            formData={formData}
            handleChange={
              handleChange
            }
            errors={errors}
          />
        );

      case 3:
        return (
          <InventoryStatusTab
            formData={formData}
            handleChange={
              handleChange
            }
            errors={errors}
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
                onClick={() =>
                  handleStepClick(
                    index
                  )
                }
              >
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
                    className={`flex-1 h-1 mx-2 rounded
                    ${
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
        <h2 className="text-2xl font-bold text-[#00458F] mb-6">
          Step{" "}
          {currentStep + 1} of{" "}
          {steps.length}:{" "}
          {steps[currentStep]}
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