"use client";

import { useState } from "react";
import SampleLabelingForm from "../SampleProcessingModule/SampleLabelingForm";
import SampleRegistrationForm from "../SampleProcessingModule/SampleRegistrationForm";
// import StorageAssignmentForm from "../SampleProcessingModule/SampleStorageForm";
// import TestAssignmentForm from "../SampleProcessingModule/TestAssignmentForm";

const steps = [
  "Sample Registration",
  "Sample Labeling",
  // "Storage Assignment",
  "Test Assignment",
];

export default function SampleReceptionStepper() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SampleRegistrationForm />;

      case 1:
        return <SampleLabelingForm />;

      // case 2:
      //   return <StorageAssignmentForm />;

      // case 3:
      //   return <TestAssignmentForm />;

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* STEP HEADER */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-center w-full">
              
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${
                    index <= currentStep
                      ? "bg-[#00458F] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                  {index + 1}
                </div>

                <span
                  className={`text-xs mt-2 text-center whitespace-nowrap
                  ${
                    index <= currentStep
                      ? "text-[#00458F] font-medium"
                      : "text-gray-500"
                  }`}>
                  {step}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded
                  ${
                    index < currentStep
                      ? "bg-[#00458F]"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* FORM CONTENT */}
        <div>{renderStep()}</div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-5 py-2 rounded-md text-sm font-medium
            ${
              currentStep === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200"
            }`}>
            Previous
          </button>

          {currentStep !== steps.length - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-5 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#00366f]">
              Next
            </button>
          ) : (
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-green-500 text-white hover:bg-green-600">
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}