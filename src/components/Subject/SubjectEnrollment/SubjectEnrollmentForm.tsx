
"use client";

import { useState, useEffect } from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { Barcode } from "lucide-react";

export default function SubjectEnrollmentForm() {
  const location = useLocation();

  const mode = location.state?.mode || "add";
  const initialData = location.state?.data;

  const isViewMode = mode === "view";

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [failureReason, setFailureReason] = useState("");
  const [showBarcode, setShowBarcode] = useState(false);
  const navigate = useNavigate();

  const armCohortOptions = [
  "Arm A - Treatment",
  "Arm B - Placebo",
  "Arm C - Comparator",
  "Cohort 1",
  "Cohort 2",
];

  useEffect(() => {
    if (initialData) {
      setFormData({
        studyCode: initialData.studyId || "",
        studyTitle: initialData.studyTitle || "",
        currentVersion: initialData.currentVersion || "",
        status: initialData.status || "",

        siteName: initialData.siteName || "",
        subjectId: initialData.subjectId || "",
        dob: initialData.dob || "",
        gender: initialData.gender || "",
        armCohort: initialData.armCohort || "",

        enrollmentDate: initialData.enrollmentDate || "",
        enrollmentStatus: initialData.enrollmentStatus || "",
        principalInvestigator:
          initialData.principalInvestigator || "Dr. John",
      });
    }
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    // live clear error when user fixes it
    if (submitted) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const calculateAge = (dob: string, enrollDate: string) => {
    if (!dob || !enrollDate) return 0;
    const birth = new Date(dob);
    const enroll = new Date(enrollDate);

    let age = enroll.getFullYear() - birth.getFullYear();
    const m = enroll.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && enroll.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };
  const validate = () => {
    const newErrors: any = {};

    if (!formData.siteName) newErrors.siteName = "Site Name is required";
    if (!formData.subjectId) newErrors.subjectId = "Subject ID is required";
    if (formData.subjectId && formData.subjectId.length > 30) {
      newErrors.subjectId = "Subject ID cannot exceed 30 characters";}
    if (formData.subjectId && !/^[A-Za-z0-9-_]+$/.test(formData.subjectId)) {
      newErrors.subjectId = "Invalid Subject ID format";}
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.enrollmentDate)
      newErrors.enrollmentDate = "Enrollment Date is required";
    if (!formData.enrollmentStatus)
      newErrors.enrollmentStatus = "Enrollment Status is required";
    if (formData.dob) {
      const today = new Date();

      if (new Date(formData.dob) >= today) {
        newErrors.dob = "Date of Birth must be in the past";
      }
    }
    if (!formData.armCohort)
      newErrors.armCohort = "Arm/Cohort is required";
    // if (
    //   formData.enrollmentDate &&
    //   new Date(formData.enrollmentDate) <
    //     new Date(studyStartDate)
    // ) {
    //   newErrors.enrollmentDate =
    //     "Enrollment Date must be after Study Start Date";
    // }
    return newErrors;
  };
  
  const getStatusClass = (status: string) => {
  switch (status) {
    case "ENROLLED":
      return "bg-green-100 text-green-700";

    case "SCREEN FAILURE":
      return "bg-red-100 text-red-700";

    case "WITHDRAWN":
      return "bg-yellow-100 text-yellow-700";

    case "DRAFT":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-blue-100 text-blue-700";
  }
};
   const handleSaveDraft = () => {
    setFormData((p: any) => ({ ...p, status: "DRAFT" }));
    console.log("DRAFT SAVED 👉", formData);
  };

  const handleConfirmEnrollment = () => {
    setSubmitted(true);

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length > 0) return;

    const age = calculateAge(formData.dob, formData.enrollmentDate);

    if (age < 18 || age > 75) {
      setFormData((p: any) => ({
        ...p,
         status: "SCREEN FAILURE",
         failureReason: "Age Ineligible",
      }));
      setShowFailureModal(true);
      return;
    }

    if (formData.subjectId === "SUBJ-001") {
      alert("Subject ID already exists!");
      return;
    }

    setFormData((p: any) => ({ ...p, status: "ENROLLED" }));
    console.log("ENROLLED 👉", formData);
  };

  const handleScreenFailureSave = () => {
    if (!failureReason) {
      alert("Reason required");
      return;
    }

    setFormData((p: any) => ({
      ...p,
      status: "SCREEN FAILURE",
      failureReason,
    }));

    setShowFailureModal(false);
    console.log("SCREEN FAILURE SAVED 👉", formData);
  };


  const ErrorText = ({ msg }: any) =>
    msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

  const Req = () => <span className="text-red-500 ml-1">*</span>;
  const handlePrint = () => {
    const content = document.getElementById("barcode-print");

    if (!content) return;

    const printWindow = window.open("", "", "width=800,height=600");

    printWindow?.document.write(`
      <html>
        <head>
          <title>Barcode Print</title>
        </head>
        <body style="display:flex;justify-content:center;align-items:center;height:100vh;">
          ${content.innerHTML}
        </body>
      </html>
    `);

    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
    printWindow?.close();
  };
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-xl font-bold text-[#00458F]">
          Subject Enrollment
        </h1>
        <div className="grid grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500">Study Code</div>
            <div className="font-semibold">{formData.studyCode || "STUDY-001"}</div>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500">Study Title</div>
            <div className="font-semibold">{formData.studyTitle || "Cardiology Clinical Trial"}</div>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500">Current Version</div>
            <div className="font-semibold">
              {formData.currentVersion || "V1.0"}
            </div>
          </div>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="text-xs text-gray-500">Status</div>
            <div className="font-semibold mt-1">
              <span className={`${getStatusClass(
                  formData.status
                )} px-3 py-1 rounded-full text-xs`}>
                {formData.status || "Active"}
              </span>
          </div>
          </div>
        </div>
        <h2 className="text-lg font-semibold text-[#00458F]">
          Subject Demographics & Identity
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Site Name <Req /></Label>
            <select
              disabled={isViewMode}
              value={formData.siteName}
              onChange={(e) => handleChange("siteName", e.target.value)}
              className="w-full border rounded-md h-10 px-3 mt-1">
              <option value="">Select Site</option>
              <option value="BOS">Boston Hospital</option>
              <option value="LON">London Clinic</option>
            </select>
            <ErrorText msg={errors.siteName} />
          </div>
          <div>
            <Label>Subject ID <Req /></Label>
            <Input
              disabled={isViewMode}
              value={formData.subjectId}
              onChange={(e) => handleChange("subjectId", e.target.value)}
             className="w-full border rounded-md h-10 px-3 mt-1"/>
            <ErrorText msg={errors.subjectId} />
          </div>
          <div>
            <Label>
              Arm / Cohort <Req />
            </Label>

            <select
              disabled={isViewMode}
              value={formData.armCohort || ""}
              onChange={(e) =>
                handleChange("armCohort", e.target.value)
              }
              className="w-full border rounded-md h-10 px-3 mt-1"
            >
              <option value="">Select Arm/Cohort</option>

              {armCohortOptions.map((arm) => (
                <option key={arm} value={arm}>
                  {arm}
                </option>
              ))}
            </select>

            <ErrorText msg={errors.armCohort} />
          </div>
          <div>
            <Label>Date of Birth <Req /></Label>
            <Input
              type="date"
              disabled={isViewMode}
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
             className="w-full border rounded-md h-10 px-3 mt-1"/>
            <ErrorText msg={errors.dob} />
          </div>
          <div>
            <Label>Gender <Req /></Label>
            <select
              disabled={isViewMode}
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full border rounded-md h-10 px-3 mt-1">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <ErrorText msg={errors.gender} />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          {/* <button onClick={() => navigate(-1)}
      className={`flex items-center gap-2 px-3 py-2 mb-3 border rounded-md bg-gray-100 hover:bg-gray-200 `}> */}
          <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-md bg-gray-200">
            {/* <ArrowLeft size={16} /> */}
            Back
          </button>
          <div className="flex gap-3">
            <button onClick={handleSaveDraft}
             className="px-5 py-2 rounded-md bg-gray-500 text-white">
              Save Draft
            </button>
            {/* <button onClick={() => setShowFailureModal(true)}
              className="px-5 py-2 rounded-md bg-red-600 text-white">
              Log Screen Failure
            </button> */}
            <button  onClick={handleConfirmEnrollment}
            className="px-5 py-2 rounded-md bg-[#00458F] text-white">
               Confirm Enrollment
            </button>
            {/* <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-purple-600 text-white">
              Submit
            </button> */}
            
            {/* <button
              onClick={() => {
                if (!formData.subjectId) {
                      alert("Subject ID required");
                      return;
                    }
                    setShowBarcode(true);
                  }}
              className="px-5 py-2 rounded-md bg-green-600 text-white">
              Print Barcode
            </button> */}
          </div>
        </div>
      </div>
      {showBarcode && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-lg font-semibold mb-4">
              Subject Barcode
            </h2>
            <div id="barcode-print"
              className="border rounded-lg p-6 flex flex-col items-center">
              <Barcode values={formData.subjectId} width={2} height={80}/>
              
              <p className="mt-2 text-sm font-medium">
                {formData.subjectId}
              </p>
              <p className="text-xs text-gray-500">
                {formData.siteName}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowBarcode(false)}
                className="px-4 py-2 bg-gray-300 rounded">
                Close
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-green-600 text-white rounded">
                Print
              </button>
            </div>
          </div>
        </div>
      )}
      {showFailureModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md w-[400px] space-y-4">
            <h2 className="font-bold text-red-600">Screen Failure</h2>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Enter reason..."
              value={failureReason}
              onChange={(e) => setFailureReason(e.target.value)}/>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFailureModal(false)}
                className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button
                onClick={handleScreenFailureSave}
                className="px-4 py-2 bg-red-600 text-white rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}