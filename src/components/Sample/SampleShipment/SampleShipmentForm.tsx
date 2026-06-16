"use client";

import { useState } from "react";

import {  useSearchParams } from "react-router-dom";
import SampleShipmentDetails from "./SampleShipmentDetails";
import PackageRequirements from "./PackageRequirements";
import SampleManifest from "./SampleManifest";
import DispatchAndcompliance from "./DispatchAndCompliance";

const steps = [
  "Shipment Details",
  "Package Requirements",
  "Sample Manifest",
  "Dispatch & Compliance",
];

export interface SampleShipmentData {
  courier:string,
  trackingNumber:string,
  originSite:string,
  destinationSite:string,
  plannedDispatchDate:string,

  packageType:string,
  targetTransitTempertaure:string,
  grossWeight:string,
  dimensions:string,

  samplesToShip:string,
  biohazardGoodsClass:string,
  totalSampleCount:string,

  AirwayBill: File[],
  preparedBy:string,
  complianceCheck:boolean,
  specialDispatchInstructions:string
};
 
const initialFormData:SampleShipmentData = {
  courier:"",
  trackingNumber:"",
  originSite:"",
  destinationSite:"",
  plannedDispatchDate:"",

  packageType:"",
  targetTransitTempertaure:"",
  grossWeight:"",
  dimensions:"",

  samplesToShip:"",
  biohazardGoodsClass:"",
  totalSampleCount:"",
  
  AirwayBill:[],
  preparedBy:"",
  complianceCheck:false,
  specialDispatchInstructions:""

};


export default function SampleShipmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<any>({});
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isViewMode = mode === "view";

    const validateShipmentDetails = () => {
        const validationErrors: any = {};

      if (!formData.courier)
        validationErrors.courier = "Courier is Required";

      if (!formData.originSite)
        validationErrors.originSite = "Origin Site is required";

      if (!formData.destinationSite)
        validationErrors.destinationSite = "Destination Site is required";

      if (!formData.plannedDispatchDate)
        validationErrors.plannedDispatchDate = "Planned Dispatch Date is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validatePackageRequirements = () => {
        const validationErrors: any = {};

      if (!formData.packageType)
        validationErrors.packageType = "Package Type is Required";

      if (!formData.targetTransitTempertaure)
        validationErrors.targetTransitTempertaure = "Target Transit Tempertaure is required";

      if (!formData.grossWeight)
        validationErrors.grossWeight = "Gross Weight is required";

      setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validateSampleManifest = () => {
        const validationErrors: any = {};

      if (!formData.samplesToShip)
        validationErrors.samplesToShip = "Samples To Ship is Required";

      if (!formData.biohazardGoodsClass)
        validationErrors.biohazardGoodsClass = "Dangerous Goods Class is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };
  
  const validateDispatchAndCompliance = () => {
        const validationErrors: any = {};

      // if (!formData.AirwayBill.length) {
      //   validationErrors.protocolAttachment =
      //     "Airway Bill is required";
      // } else {
      //   const allowedTypes = [
      //     "application/pdf",
      //     "application/msword", 
      //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //   ];

      //   for (const file of formData.AirwayBill) {
      //     if (!allowedTypes.includes(file.type)) {
      //       validationErrors.AirwayBill =
      //         "Only PDF, DOC and DOCX files are allowed";
      //       break;
      //     }

      //     if (file.size > 5 * 1024 * 1024) {
      //       validationErrors.AirwayBill =
      //         `${file.name} exceeds 5 MB limit`;
      //       break;
      //     }
      //   }
      // }

      if (!formData.preparedBy)
        validationErrors.preparedBy = "Prepared By is required";

       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

  const validateSampleShipment = () => {
    switch (currentStep) {
      case 0:
        return validateShipmentDetails();

      case 1:
        return validatePackageRequirements();

      case 2:
        return validateSampleManifest();

      case 3:
        return validateDispatchAndCompliance();

      default:
        return true;
    }
  };
  const nextStep = () => {
    const isValid =validateSampleShipment();

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
      if (!validateSampleShipment()) {
        return;
      }
    }
  }


  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <SampleShipmentDetails
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case 1:
        return (
          <PackageRequirements
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
       case 2:
        return (
            <SampleManifest
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            />
        );
      case 3:
        return (
        <DispatchAndcompliance
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

  const isValid = validateSampleShipment();

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
           // onClick={}
            className="px-5 py-2 rounded-md bg-gray text-black">
            Save As Draft
          </button>
          }
          <button
            onClick={() => ( currentStep === 3? submitForReview(): nextStep())}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">

            {currentStep===3?"Dispatch Shipment" : "Next"}
          </button>
        </div>
      </div>
        
      </div>
    </div>
  );
}