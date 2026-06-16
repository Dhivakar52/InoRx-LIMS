"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DemographicsTab from "./DemographicsTab";
import AddressShippingTab from "./AddressShippingTab";
import StaffRoleMappingTab from "./StaffRoleMappingTab";
import StudySiteMappingTab from "./StudySiteMappingTab";

export default function SiteForm() {
  const location = useLocation();


  const initialData =
    location.state?.data;

  const steps = [
    "Demographics",
    "Address & Shipping",
    //"IRB & Accreditation",
    "Staff & Role Mapping",
    "Study Mapping"
  ];
  const [formData, setFormData] =
  useState<any>({
    siteStatus: "DRAFT",
    mappingStatus: "ACTIVE",
  });
  const [currentStep, setCurrentStep] =
  useState(0);

  const [successMsg, setSuccessMsg] = useState("");
  const [errors, setErrors] = useState<any>({});
  // const [formData, setFormData] = useState<any>({});
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [actionType, setActionType] = useState("");
  const [reasonForChange, setReasonForChange] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  const openActivateModal = () => {
    setActionType("ACTIVATE");
    setReasonForChange("");
    setShowReasonModal(true);
  };

const openSuspendModal = () => {
  setActionType("SUSPEND");
  setReasonForChange("");
  setShowReasonModal(true);
};
const handleConfirmAction = () => {
  if (!reasonForChange.trim()) {
    alert("Reason For Change is required");
    return;
  }

  const updatedStatus =
    actionType === "ACTIVATE"
      ? "ACTIVE"
      : "SUSPENDED";

  setFormData((prev: any) => ({
    ...prev,
    siteStatus: updatedStatus,
  }));

  console.log({
    action: actionType,
    reason: reasonForChange,
  });

  setShowReasonModal(false);

  setSuccessMsg(
    `Site ${updatedStatus} successfully`
  );

  setTimeout(() => {
    setSuccessMsg("");
  }, 3000);
};
  const validateDemographics = () => {
  const newErrors: any = {};

  if (!formData.siteCode?.trim()) {
    newErrors.siteCode =
      "Site Code is required";
  }
  const siteCodeRegex = /^[A-Z0-9-]+$/;
    if (
    !siteCodeRegex.test(
    formData.siteCode
    )
    ){
    newErrors.siteCode =
    "Only uppercase letters, numbers and hyphen allowed";
    }
  if (!formData.siteName?.trim()) {
    newErrors.siteName =
      "Site Name is required";
  }
  if(
    formData.siteName &&
    formData.siteName.length > 150
    ){
    newErrors.siteName =
    "Maximum 150 characters";
    }

  if (!formData.siteType?.trim()) {
    newErrors.siteType =
      "Site Type is required";
  }

  // if (!formData.siteStatus?.trim()) {
  //   newErrors.siteStatus =
  //     "Site Status is required";
  // }

  setErrors(newErrors);

  return (
    Object.keys(newErrors)
      .length === 0
  );
};
const validateAddress = () => {
  const newErrors: any = {};

  if (!formData.siteAddress?.trim()) {
    newErrors.siteAddress =
      "Street Address is required";
  }

  if (!formData.city?.trim()) {
    newErrors.city =
      "City is required";
  }

  if (!formData.country?.trim()) {
    newErrors.country =
      "Country is required";
  }

  if (!formData.postalCode?.trim()) {
    newErrors.postalCode =
      "Postal Code is required";
  }

  if (!formData.phoneNumber?.trim()) {
    newErrors.phoneNumber =
      "Phone Number is required";
  } else {
    const phoneRegex =
      /^\+?[1-9]\d{1,14}$/;

    if (
      !phoneRegex.test(
        formData.phoneNumber
      )
    ) {
      newErrors.phoneNumber =
        "Invalid phone number";
    }
  }

  if (!formData.contactEmail?.trim()) {
    newErrors.contactEmail =
      "Email is required";
  } else {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.contactEmail
      )
    ) {
      newErrors.contactEmail =
        "Invalid email address";
    }
  }

  if (!formData.timeZone?.trim()) {
    newErrors.timeZone =
      "Time Zone is required";
  }

  setErrors(newErrors);

  return (
    Object.keys(newErrors)
      .length === 0
  );
};

// const validateIRB = () => {
//   const newErrors: any = {};

//   if (
//     !formData.localIRBName?.trim()
//   ) {
//     newErrors.localIRBName =
//       "Local IRB Name is required";
//   }

//   if (
//     !formData.irbRegistrationNumber?.trim()
//   ) {
//     newErrors.irbRegistrationNumber =
//       "IRB Registration Number is required";
//   }

//   if (
//     formData.accreditationTypes?.length >
//       0 &&
//     !formData.accreditationExpiry
//   ) {
//     newErrors.accreditationExpiry =
//       "Accreditation Expiry is required";
//   }

//   if (
//     formData.accreditationExpiry
//   ) {
//     const selectedDate =
//       new Date(
//         formData.accreditationExpiry
//       );

//     const today = new Date();

//     today.setHours(0,0,0,0);

//     if (
//       selectedDate <= today
//     ) {
//       newErrors.accreditationExpiry =
//         "Expiry date must be future date";
//     }
//   }

//   const file =
//     formData.gcpCertificate;

//   if (file) {
//     const allowedTypes = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ];

//     if (
//       !allowedTypes.includes(
//         file.type
//       )
//     ) {
//       newErrors.gcpCertificate =
//         "Only PDF, DOC, DOCX files allowed";
//     }

//     if (
//       file.size >
//       5 * 1024 * 1024
//     ) {
//       newErrors.gcpCertificate =
//         "File size should not exceed 5 MB";
//     }
//   }

//   setErrors(newErrors);

//   return (
//     Object.keys(newErrors)
//       .length === 0
//   );
// };
const validateStaff = () => {
  const newErrors: any = {};

  if (!formData.leadPI) {
    newErrors.leadPI =
      "Lead PI is required";
  }

  if (!formData.siteCoordinator) {
    newErrors.siteCoordinator =
      "Site Coordinator is required";
  }

  // If study is blinded
  if (
    formData.studyType ===
      "BLINDED" &&
    !formData.unblindedPharmacist
  ) {
    newErrors.unblindedPharmacist =
      "Unblinded Pharmacist is required";
  }

  setErrors(newErrors);

  return (
    Object.keys(newErrors)
      .length === 0
  );
};
const validateStudyMapping = () => {
  const newErrors: any = {};

  if (!formData.studyId?.trim()) {
    newErrors.studyId =
      "Study Selection is required";
  }

  if (
    formData.localIrbReference &&
    !formData.localIrbApprovalDate
  ) {
    newErrors.localIrbApprovalDate =
      "Approval Date is required";
  }
  if( formData.localIrbReference && formData.localIrbApprovalDate && formData.siteEffectiveDate ){
    if(
    new Date(
    formData.localIrbApprovalDate
    ) >
    new Date(
    formData.siteEffectiveDate
    )
    ){
      newErrors.localIrbApprovalDate =
      "Approval Date cannot be after Effective Date";
    }
    }

  if (!formData.siteEffectiveDate) {
    newErrors.siteEffectiveDate =
      "Site Effective Date is required";
  }
  // const studyStartDate = selectedStudy.startDate;

  //   if(new Date(formData.siteEffectiveDate) <
  //   new Date(studyStartDate)
  //   ){
  //   newErrors.siteEffectiveDate = "Must be after Study Start Date";}
  setErrors(newErrors);

  return (
    Object.keys(newErrors).length === 0
  );
};
const validateCurrentStep = () => {
  switch (currentStep) {
    case 0:
      return validateDemographics();

    case 1:
      return validateAddress();

    case 2:
      return validateStaff();
    case 3:
      return validateStudyMapping();

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
const handleSubmit = () => {
  //const isValid =
  //   validateCurrentStep();

  // if (!isValid) return;

  console.log(formData);

  alert(
    "Site Registration Submitted Successfully"
  );
};
const handleSaveDraft = () => {
  //const isValid =
  //   validateCurrentStep();

  // if (!isValid) return;

  // setCurrentStep((prev) =>
  //   Math.min(
  //     prev + 1,
  //     steps.length - 1
  //   )
  // );
  setSuccessMsg(
    "Draft saved successfully"
  );

  setTimeout(() => {
    setSuccessMsg("");
  }, 3000);
};
const renderStep = () => {
  switch (currentStep) {
    case 0:
      return (
        <DemographicsTab
          formData={formData}
          handleChange={handleChange}
          isViewMode={false}
          errors={errors}
        />
      );

    case 1:
      return (
        <AddressShippingTab
          formData={formData}
          handleChange={handleChange}
          isViewMode={false}
          errors={errors}
        />
      );

    // case 2:
    //   return (
    //     <IRBAccreditationTab
    //       formData={formData}
    //       handleChange={handleChange}
    //       isViewMode={false}
    //       errors={errors}
    //     />
    //   );

    case 2:
      return (
        <StaffRoleMappingTab
          formData={formData}
          handleChange={handleChange}
          isViewMode={false}
          errors={errors}
        />
      );
     case 3:
      return (
        <StudySiteMappingTab
          formData={formData}
          handleChange={handleChange}
          isViewMode={false}
          errors={errors}
        />
      );

    default:
      return null;
  }
};

  // const handleChange = (
  //   name: string,
  //   value: string
  // ) => {
  //   setFormData((prev: any) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
const handleChange = (
  name: string,
  value: string
) => {
  setFormData((prev: any) => ({
    ...prev,
    [name]: value,
  }));

  setErrors((prev: any) => ({
    ...prev,
    [name]: "",
  }));
};

  return (
  <div className="p-6">
    {successMsg && (
        <div className="fixed top-5 right-5 z-[9999] bg-green-600 text-white px-5 py-3
            rounded-lg shadow-xl text-sm font-medium animate-slide-in">
            {successMsg}
            </div>
          )}
    <div className="bg-white rounded-xl shadow-md p-6">

      {/* <div className="flex items-center justify-between mb-8 overflow-x-auto"> */}
      <div className="flex items-center justify-between mb-8 overflow-visible">
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
                    // index <=
                    // currentStep
                    //   ? "bg-[#00458F] text-white"
                    //   : "bg-gray-200"
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
                    currentStep
                      // ? "bg-[#00458F]"
                      // : "bg-gray-200"
                      ? "bg-green-600": "bg-gray-200"
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

      <div className="flex justify-between items-center mt-8">
        {currentStep > 0 ? (
          <button
            onClick={prevStep}
            className="px-5 py-2 rounded-md bg-gray-100">
            Previous
          </button>
        ) : (
          <div />
        )}
        <div className="flex gap-3">
          {currentStep < steps.length - 1 ? (
            <>
              <button
                onClick={handleSaveDraft}
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
            <>
              {formData.siteStatus !== "ACTIVE" ? (
                <button
                  type="button"
                  onClick={openActivateModal}
                  className="px-5 py-2 rounded-md bg-green-600 text-white">
                  Activate Site
                </button>
              ) : (
                <button
                  type="button"
                  onClick={openSuspendModal}
                  className="px-5 py-2 rounded-md bg-red-600 text-white">
                  Suspend Site
                </button>
              )}
              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-md bg-[#00458F] text-white">
                Submit
              </button>
            </>
          )}
        </div>
        {/* <div className="flex gap-3">
          <button onClick={handleSaveDraft}
            className="px-5 py-2 rounded-md bg-gray-500 text-white">
            Save Draft
          </button>

          {currentStep <
          steps.length - 1 ? (
            <button
              onClick={
                nextStep
              }
              className="px-5 py-2 rounded-md bg-[#00458F] text-white">
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-green-600 text-white">
              Submit
            </button>
          )}
        </div> */}
        {showReasonModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[500px] p-6">
              <h2 className="text-xl font-semibold mb-4">
                {actionType === "ACTIVATE"
                  ? "Activate Site"
                  : "Suspend Site"}
              </h2>
              <label className="block text-sm font-medium mb-2">
                Reason For Change<span className="text-red-500 ml-1"> *</span>
              </label>
              <textarea
                rows={4}
                value={reasonForChange}
                onChange={(e) =>
                  setReasonForChange(
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-3"
                placeholder="Enter reason..."/>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() =>
                    setShowReasonModal(false)
                  }
                  className="px-4 py-2 rounded-md bg-gray-200">
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`px-4 py-2 rounded-md text-white ${
                    actionType === "ACTIVATE"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}>
                  Confirm
                </button>

              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  </div>
);
}