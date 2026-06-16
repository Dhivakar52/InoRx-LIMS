"use client";

import { useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import SampleDetails from "./SampleDetails";
import StorageCoordinates from "./StorageCoordinates";
import ConditionMonitoring from "./ConditionMonitoring";
import MovementAndTracking from "./MovementAndTracking";

const steps = [
  "Sample Details",
  "Storage Coordinates",
  "Condition Monitoring",
  "Movement & Tracking",
];

export interface SampleStorageData {
  sampleID: string,
  sampleType: string,
  volume: string,
  collectionDate: string,

 site:string,
 labName:string,
 freezerID:string,
 rackNumber:string,
 boxNumber:string,
 slot:string,

 currentTemparature:string,
 targetRange:string,
 complainceStatus:string,
 complainceNotes:string,

 action:string,
 handledBy:string,
 movementRemarks:string
};
 
const initialFormData:SampleStorageData = {
  sampleID: "",
  sampleType: "",
  volume: "",
  collectionDate: "",

  site:"",
  labName:"",
  freezerID:"",
  rackNumber:"",
  boxNumber:"",
  slot:"",

  currentTemparature:"",
  targetRange:"",
  complainceStatus:"",
  complainceNotes:"",

  action:"",
  handledBy:"",
  movementRemarks:""

};


export default function SampleStorageForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<any>({});
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isViewMode = mode === "view";
  const navigate = useNavigate();

    const validateSampleDetails = () => {
        const validationErrors: any = {};

      if (!formData.sampleID)
        validationErrors.sampleID = "Sample ID is Required";

      if (!formData.sampleType)
        validationErrors.sampleType = "Sample Type is required";

      if (!formData.volume)
        validationErrors.volume = "Volume /Quantity is required";

        if (!formData.collectionDate)
        validationErrors.collectionDate = "Collection Date is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validateStorageCoordinates = () => {
        const validationErrors: any = {};

      if (!formData.site)
        validationErrors.site = "Site is Required";

      if (!formData.labName)
        validationErrors.labName = "Lab Name is required";

      if (!formData.freezerID)
        validationErrors.freezerID = "Freezer ID is required";

      if (!formData.rackNumber)
        validationErrors.rackNumber = "Rack Number is required";

      if (!formData.boxNumber)
        validationErrors.boxNumber = "Box Number is required";

      if (!formData.slot)
        validationErrors.slot = "Slot/Position is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validateConditionMonitoring = () => {
        const validationErrors: any = {};

      if (!formData.currentTemparature)
        validationErrors.currentTemparature = "Current Temparature is Required";

      if (!formData.targetRange)
        validationErrors.targetRange = "Target Range is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };
  
  const validateMovementAndTracking = () => {
        const validationErrors: any = {};

      if (!formData.action)
        validationErrors.action = "Reason is Required";

      if (!formData.handledBy)
        validationErrors.handledBy = "Target Range is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validateSampleStorage = () => {
    switch (currentStep) {
      case 0:
        return validateSampleDetails();

      case 1:
        return validateStorageCoordinates();

      case 2:
        return validateConditionMonitoring();

      case 3:
        return validateMovementAndTracking();

      default:
        return true;
    }
  };
  const nextStep = () => {
    const isValid =validateSampleStorage();

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

  const submitForReview=()=>{
   if(currentStep===4){
      if (!validateSampleStorage()) {
        return;
      }
    }
  }


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <SampleDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case 1:
        return (
          <StorageCoordinates
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
       case 2:
        return (
            <ConditionMonitoring
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            />
        );
      case 3:
        return (
        <MovementAndTracking
            formData={formData}
            setFormData={setFormData}
            errors={errors}
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

  const handleStepClick = (
  targetStep: number
) => {
  if (
    targetStep <= currentStep
  ) {
    setCurrentStep(targetStep);
    return;
  }

  const isValid = validateSampleStorage();

  if (!isValid) return;

  setCurrentStep(targetStep);
};
  return (
    <div className="p-6">
          {/* {successMsg && (
        <div className="fixed top-5 right-5 z-[9999] bg-green-600 text-white px-5 py-3
            rounded-lg shadow-xl text-sm font-medium animate-slide-in">
            {successMsg}
            </div>
          )} */}
      <div className="bg-white rounded-xl shadow-md p-6">

        <div className="flex items-center justify-between mb-8 overflow-x-auto">
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
                   index < currentStep
                  ? "bg-green-600 text-white"
                  : index === currentStep
                  ? "bg-[#00458F] text-white ring-4 ring-blue-100"
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
                    currentStep? "bg-green-600": "bg-gray-200"
                  }`}
                />
              )}
            </div>
          )
        )}
        </div>

        <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#00458F]">
          Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
        </h2>
      </div>
      {renderStep()}
        <div className="flex items-center justify-between mt-8">

          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-md bg-gray-100">
            Previous
          </button>
        <div className="flex gap-3">
          {isViewMode?"":
           <button
            onClick={() => navigate(`/sample/storage`)}
            className="px-5 py-2 rounded-md bg-gray text-black">
            Cancel
          </button>
          }
           
          <button
            onClick={() => ( currentStep === 3? submitForReview(): nextStep())}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">

            {currentStep===3?"Log Sample Storage" : "Next"}
          </button>
        </div>
      </div>
        
      </div>
    </div>
  );
}