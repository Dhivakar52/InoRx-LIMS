"use client";

import { useState } from "react";

import GeneralInfo from "./GeneralInfo";
import ProtocolSettings from "./ProtocolSettings";
import SponsorAndCRO from "./SponsorAndCRO";
import StudyArms from "./StudyArms";
import VisitConfigurator from "./VisitConfigurator";
import { useSearchParams } from "react-router-dom";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../../ui/button";


const steps = [
  "General Information",
  "Protocol Settings",
  "Sponsor & CRO",
  "Study Arms",
  "Visit Configuration",
];

export interface StudyMasterData {
  studyCode: string,
  studyTitle: string,
  studyDescription: string,
  studyType: string,
  studyPhase: string,
  country: string,
  region: string,
  startDate: string,
  endDate: string,

  protocolNumber:string,
  protocolTitle:string,
  protocolVersion:string,
  protocolDate:string,
  classification:string,
  isAmmendmentAllowed:string,
  ammendmentNumber:string,
  ammendmentVersion:string,
  protocolAttachment: File[],

  sponsorName:string,
  sponsorContact:string,
  croName:string,
  croContact:string,
  principalInvestigator:string,
  principalInvestigatorAddress:string,
  studyDirector:string,
  medicalMonitor:string,
  regulatoryContact:string,
  studyCoordinator:string,
};
 
const initialFormData:StudyMasterData = {
  studyCode: "",
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
  protocolAttachment: [],

  sponsorName:"",
  sponsorContact:"",
  croName:"",
  croContact:"",
  principalInvestigator:"",
  principalInvestigatorAddress:"",
  studyDirector:"",
  medicalMonitor:"",
  regulatoryContact:"",
  studyCoordinator:"",
};

export interface StudyArmData {
  armCode: string;
  armName: string;
}

const initialArmData: StudyArmData[] = [
  {
    armCode: "",
    armName: "",
  },
];

export interface StudyVisitData{
  visitCode:string,
  visitName:string,
  visitType:string,
  targetDay:string,
  windowMinus:string,
  windowPlus:string,
  specimen:string[],
  mappedTests:string[]
}

const initialVisitData:StudyVisitData[]=[
  {
      visitCode:"",
      visitName:"",
      visitType:"",
      targetDay:"",
      windowMinus:"",
      windowPlus:"",
      specimen:[],
      mappedTests:[]
  }
]


export default function StudyMasterStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [armData, setArmData] = useState<StudyArmData[]>(initialArmData);  
  const [visitData, setVisitData] = useState<StudyVisitData[]>(initialVisitData);  
  const [errors, setErrors] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [openESign, setOpenESign] = useState(false);

  const [eSignData, setESignData] = useState({
  userName: "",
  password: "",
  reason: "",
  });

  const [eSignErrors, setESignErrors] = useState<any>({});
    const mode = searchParams.get("mode");
    const status= searchParams.get("status");
    const isViewMode = mode === "view";
    const isApproved = status === "approved";
    const isSubmitted = status === "submitted";
    const isActive = status === "active";

    const validateStudySetup = () => {
        const validationErrors: any = {};

      if (!formData.studyCode)
        validationErrors.studyCode = "Study Code is Required";

      if (!formData.studyTitle)
        validationErrors.studyTitle = "Study Title is required";

      if (!formData.studyType)
        validationErrors.studyType = "Study Type is required";

        if (!formData.studyPhase)
        validationErrors.studyPhase = "Study Phase is required";

      if (!formData.studyDescription) 
        validationErrors.studyDescription = "Study Description is required";
      
      if(!formData.startDate)
        validationErrors.startDate = "Start Date is required";

      if(!formData.endDate)
        validationErrors.endDate = "End Date is required";

      if ( formData.startDate && new Date(formData.endDate) < new Date(formData.startDate) ) 
        validationErrors.startDate = "Start Date must be before End Date";
       setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

    const validateProtocolInfo = () => {
        const validationErrors: any = {};

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

     if (!formData.protocolAttachment.length) {
        validationErrors.protocolAttachment =
          "Protocol Attachment is required";
      } else {
        const allowedTypes = [
          "application/pdf",
          "application/msword", 
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

        for (const file of formData.protocolAttachment) {
          if (!allowedTypes.includes(file.type)) {
            validationErrors.protocolAttachment =
              "Only PDF, DOC and DOCX files are allowed";
            break;
          }

          if (file.size > 5 * 1024 * 1024) {
            validationErrors.protocolAttachment =
              `${file.name} exceeds 5 MB limit`;
            break;
          }
        }
      }
     
       setErrors(validationErrors);

       return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

    const validateSponsorAndCRO = () => {
        const validationErrors: any = {};

      if (!formData.sponsorName)
        validationErrors.sponsorName = "Sponsor Name is required";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (formData.sponsorContact?.trim() && !emailRegex.test(formData.sponsorContact))
        validationErrors.sponsorContact = "Invalid email address";

      if (formData.croContact?.trim() && !emailRegex.test(formData.croContact))
        validationErrors.croContact = "Invalid email address";     

      if (!formData.principalInvestigator)
        validationErrors.principalInvestigator = "Principal Investigator is required";
      
      setErrors(validationErrors);
      return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

    const validateArm = () => {
        const validationErrors: any = {};

      armData.forEach((item, index) => {
      if (!item.armCode.trim()) {
        validationErrors[`armCode_${index}`] = "Arm Code is required";
      }

      if (!item.armName.trim()) {
        validationErrors[`armName_${index}`] = "Arm Name is required";
      }
    });

    setErrors(validationErrors);
    return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

    const validateVisit= () => {
        const validationErrors: any = {};

      visitData.forEach((item, index) => {
        if (!item.visitCode.trim()) {
          validationErrors[`visitCode_${index}`] = "Visit Code  is required";
        }

        if (!item.visitName.trim()) {
          validationErrors[`visitName_${index}`] ="Visit Name is required";
        }
        if (!item.targetDay.toString()) {
          validationErrors[`targetDay_${index}`] ="Target Day is required";
        }
        if (!item.windowMinus.toString()) {
          validationErrors[`windowMinus_${index}`] ="Window Minus is required";
        }
        if (!item.windowPlus.toString()) {
          validationErrors[`windowPlus_${index}`] ="Window Plus is required";
        }
        if (!item.specimen) {
          validationErrors[`specimen_${index}`] ="Specimen is required";
        }
        if (!item.mappedTests) {
          validationErrors[`mappedTests_${index}`] ="Mapped Test is required";
        }
      });

        setErrors(validationErrors);

        return (
          Object.keys(validationErrors)
            .length === 0
        );
  };

    const validateESign = () => {
    const errors: any = {};

    if (!eSignData.userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!eSignData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!eSignData.reason.trim()) {
      errors.reason = "Reason is required";
    }

    setESignErrors(errors);

    return Object.keys(errors).length === 0;
  };
  
  const validateStudyMaster = () => {
    switch (currentStep) {
      case 0:
        return validateStudySetup();

      case 1:
        return validateProtocolInfo();

      case 2:
        return validateSponsorAndCRO();

      case 3:
        return validateArm();

      case 4:
        return validateVisit();

      default:
        return true;
    }
  };
  const nextStep = () => {
    debugger;
    const isValid =validateStudyMaster();

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
            setErrors={setErrors}
          />
        );

      case 1:
        return (
          <ProtocolSettings
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
       case 2:
        return (
            <SponsorAndCRO
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            />
        );
      case 3:
        return (
        <StudyArms
            arm={armData}
            setArm={setArmData}
            errors={errors}
            setErrors={setErrors}
        />   
        );
      case 4:
        return (
          <VisitConfigurator
              visit={visitData}
              setVisit={setVisitData}
              errors={errors}
              setErrors={setErrors}
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

  const handleApproveContinue = async () => {
  if (!validateESign()) return;

  // API Call
  const payload = {
    username: eSignData.userName,
    password: eSignData.password,
    reason: eSignData.reason,
    action: "Approve",
  };

  console.log(payload);

  setOpenESign(false);
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
    validateStudyMaster();

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
            onClick={draftSave}
            className="px-5 py-2 rounded-md bg-gray text-black">
            Save As Draft
          </button>
          }
           {(isActive&& currentStep===4) ?
           <button
            //onClick={draftSave}
            className="px-5 py-2 rounded-md bg-[#e80716] text-white">
            Close Study
          </button>
          :(isSubmitted&&currentStep===4)&&
           <button
            //onClick={draftSave}
            className="px-5 py-2 rounded-md bg-[#e80716] text-white">
            Return Study
          </button>
          }
          <button
            onClick={() =>( isSubmitted && currentStep === 4) ? setOpenESign(true):
               ( currentStep === 4? submitForReview(): nextStep())}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">

            {(isActive && currentStep===4)?"Suspend Study":( (isApproved && currentStep===4)?"Activate Study":(( isSubmitted&& currentStep===4)?"Approve Study":(currentStep===4?"Submit for Review" : "Next")))}
          </button>
        </div>
      </div>
        
      </div>

     
    
<Dialog.Root
  open={openESign}
  onOpenChange={setOpenESign}
>
  <Dialog.Portal>

    <Dialog.Overlay className="fixed inset-0 bg-black/50" />

    <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">

      <Dialog.Title className="text-lg font-semibold mb-4">
        Digital Signature
      </Dialog.Title>

      <div className="border p-4 rounded bg-gray-50">

      <p className="text-sm mb-4">
        By signing in you are hereby authorizing
        an approve operation on this activity.
      </p>

      <div className="grid grid-cols-[120px_1fr] gap-3 items-center">

        <Label>Username</Label>

        <div>
          <Input
            value={eSignData.userName}
            onChange={(e) =>
              setESignData((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />

          {eSignErrors.userName && (
            <p className="text-red-500 text-xs">
              {eSignErrors.userName}
            </p>
          )}
        </div>

        <Label>Password</Label>

        <div>
          <Input
            type="password"
            value={eSignData.password}
            onChange={(e) =>
              setESignData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          {eSignErrors.password && (
            <p className="text-red-500 text-xs">
              {eSignErrors.password}
            </p>
          )}
        </div>

      </div>

    </div>

    <div className="border p-4 rounded">

      <Label>
        Reason for Activity
      </Label>

      <textarea
        rows={4}
        className="w-full mt-2 border rounded-md p-2"
        value={eSignData.reason}
        onChange={(e) =>
          setESignData((prev) => ({
            ...prev,
            reason: e.target.value,
          }))
        }
      />

      {eSignErrors.reason && (
        <p className="text-red-500 text-xs">
          {eSignErrors.reason}
        </p>
      )}

    </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setOpenESign(false)}
        >
          Cancel
        </Button>

        <Button onClick={handleApproveContinue}>
          Continue
        </Button>
      </div>

    </Dialog.Content>

  </Dialog.Portal>
</Dialog.Root>
    </div>
  );
}