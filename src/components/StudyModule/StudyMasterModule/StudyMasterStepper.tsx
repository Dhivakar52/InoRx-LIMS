"use client";

import { useState } from "react";

import GeneralInfo from "./GeneralInfo";
import ProtocolSettings from "./ProtocolSettings";
import SponsorAndCRO from "./SponsorAndCRO";
import StudyArms from "./StudyArms";
import VisitConfigurator from "./VisitConfigurator";


const steps = [
  "General Information",
  "Protocol Settings",
  "Sponsor & CRO",
  "Study Arms",
  "Visit Configuration",
];

 
const initialFormData = {
  studyCode: "Auto Generated",
  studyTitle: "",
  studyDescription: "",
  studyType: "",
  studyPhase: "",
  country: "",
  region: "",
  startDate: "",
  endDate: "",

  protocolNumber:"",
  protocolTitle:"",
  protocolVersion:"",
  protocolDate:"",
  classification:"",
  isAmmendmentAllowed:"",
  ammendmentNumber:"",
  ammendmentVersion:"",

  sponsorName:"",
  principalInvestigator:""

};
// const initialVisitTemplate = [
//   {
//     visitName: "",
//     visitType: "",
//     targetDay: "",
//     windowMinus: "",
//     windowPlus: "",
//     specimens: [],
//     testCodes: [],
//   },
// ];

// const initialCohort = [
//   {
//     cohortCode: "",
//     cohortName: "",
//     armAssociation: "",
//     description: "",
//     eligibilityCriteria: "",
//     enrollmentTarget: "",
//     doseLevel: "",
//     status: "Active",
//   },
// ];

export default function StudyMasterStepper() {
  const [currentStep, setCurrentStep] = useState(0);


const [formData, setFormData] = useState(initialFormData);

// const [visitTemplates, setVisitTemplates] = useState(initialVisitTemplate);

// const [cohorts, setCohorts] = useState(initialCohort);

const [errors, setErrors] = useState<any>({});
  // const handleChange = (field: string, value: string) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };


  const validateStudyMaster = () => {
    const validationErrors: any = {};

   if (!formData.studyCode)
    validationErrors.studyCode = "Study Code is Required";

  if (!formData.studyTitle)
    validationErrors.studyTitle = "Study Title is required";

  if (!formData.studyType)
    validationErrors.studyType = "Study Type is required";

    if (!formData.studyPhase)
    validationErrors.studyPhase = "Study Phase is required";

  if (!formData.studyDescription || formData.studyDescription.trim().length < 20) 
    validationErrors.studyDescription = "Study Description is required";
  
  if(!formData.startDate)
    validationErrors.startDate = "Start Date is required";

  if(!formData.endDate)
    validationErrors.endDate = "End Date is required";

  if ( formData.startDate && new Date(formData.endDate) < new Date(formData.startDate) ) 
    validationErrors.startDate = "Start Date must be before End Date";

  if(!formData.protocolNumber)
    validationErrors.protocolNumber = "Protocol Number is required";

  if(!formData.protocolTitle)
    validationErrors.protocolTitle =  "Protocol Title is required";

  if(!formData.protocolVersion)
    validationErrors.protocolVersion = "Protocol Version is required";

  if(!formData.protocolDate)
    validationErrors.protocolDate = "Protocol Date is required";
  
  if(!formData.classification)
    validationErrors.classification="Classification is required"

  if(!formData.isAmmendmentAllowed)
    validationErrors.isAmmendmentAllowed="Plase select Yes/No"
  
  if(!formData.ammendmentNumber)
    validationErrors.ammendmentNumber="Ammendment Number is required"

  if(formData.isAmmendmentAllowed && !formData.ammendmentVersion)
    validationErrors.ammendmentVersion="Ammendment Version is required"

    if (!formData.sponsorName)
    validationErrors.sponsorName = "Sponsor Name Required";

  if (!formData.principalInvestigator)
    validationErrors.principalInvestigator = "Principal Investigator Required";
  // if (!formData.studyCoordinator)
  //   validationErrors.studyCoordinator =
  //     "Study Coordinator Required";


    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };
  
  const nextStep = () => {
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
      if (!validateStudyMaster()) {
        return;
      }
    }
  }
  const draftSave=()=>{
    
  }
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <GeneralInfo
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );

      case 1:
        return (
          <ProtocolSettings
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
       case 2:
        return (
            <SponsorAndCRO
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            />
        );
      case 3:
        return (
        <StudyArms/>   
        );
      case 4:
        return (
          <VisitConfigurator
              // form={form}
              // setForm={setForm}
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
        <div className="flex items-center justify-between mt-8">

          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-5 py-2 rounded-md bg-gray-100">
            Previous
          </button>
        <div className="flex gap-3">
           <button
            onClick={draftSave}
            className="px-5 py-2 rounded-md bg-gray text-black">
            Save As Draft
          </button>
          <button
            onClick={currentStep===4?submitForReview:nextStep}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">

            {currentStep===4?"Submit for Review" : "Next"}
          </button>
        </div>
      </div>
        
      </div>
    </div>
  );
}