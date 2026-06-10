// "use client";

// import { useState } from "react";
// import FormWrapper from "../../../common/FormWrapper";
// import { Input } from "../../ui/input";
// import { Label } from "../../ui/label";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "../../ui/select";

// export default function VisitForm() {
//   const [formData, setFormData] = useState<any>({});

//   const handleChange = (name: string, value: string) => {
//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("Visit Data 👉", formData);
//   };

//   return (
//     <FormWrapper
//       title="Add Site Registration"
//       onSubmit={handleSubmit}
//     >
    

//             {/* Study Code */}
//             <div className="space-y-2">
//               <Label>Study Code *</Label>
//               <Select
//                 value={formData.studyCode || ""}
//                 onValueChange={(v) => handleChange("studyCode", v)}
//               >
//                 <SelectTrigger className="w-full bg-white border">
//                   <SelectValue placeholder="Select Study Code" />
//                 </SelectTrigger>

//                 <SelectContent
//                   position="popper"
//                   sideOffset={4}
//                   className="bg-white border z-50"
//                 >
//                   <SelectItem value="SC001">SC001</SelectItem>
//                   <SelectItem value="SC002">SC002</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Site Code */}
//             <div className="space-y-2">
//               <Label>Site Code *</Label>
//               <Input
//                 onChange={(e) =>
//                   handleChange("siteCode", e.target.value)
//                 }
//               />
//             </div>

//             {/* Site Type */}
//             <div className="space-y-2">
//               <Label>Site Type *</Label>
//               <Select
//                 value={formData.siteType || ""}
//                 onValueChange={(v) => handleChange("siteType", v)}
//               >
//                 <SelectTrigger className="w-full bg-white border">
//                   <SelectValue placeholder="Select Site Type" />
//                 </SelectTrigger>

//                 <SelectContent
//                   position="popper"
//                   sideOffset={4}
//                   className="bg-white border z-50"
//                 >
//                   <SelectItem value="clinical">Clinical</SelectItem>
//                   <SelectItem value="hospital">Hospital</SelectItem>
//                   <SelectItem value="research">Research</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Site Name */}
//             <div className="space-y-2">
//               <Label>Site Name *</Label>
//               <Input
//                 onChange={(e) =>
//                   handleChange("siteName", e.target.value)
//                 }
//               />
//             </div>

//             {/* Site Address */}
//             <div className="space-y-2">
//               <Label>Site Address *</Label>
//               <Input
//                 onChange={(e) =>
//                   handleChange("siteAddress", e.target.value)
//                 }
//               />
//             </div>

//             {/* Investigator */}
//             <div className="space-y-2">
//               <Label>Investigator *</Label>
//               <Input
//                 onChange={(e) =>
//                   handleChange("investigator", e.target.value)
//                 }
//               />
//             </div>

         
//     </FormWrapper>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import FormWrapper from "../../../common/FormWrapper";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";

export default function SiteRegistrationForm() {
  const location = useLocation();

  const mode = location.state?.mode || "add";
  const initialData = location.state?.data;

  const isViewMode = mode === "view";

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Site Registration Data 👉", formData);
  };

  const requiredFields = [
    "studyCode",
    "siteCode",
    "siteName",
    "siteType",
    "siteStatus",
    "country",
    "principalInvestigator",
    "contactNumber",
    "email",
  ];

  const isFormValid = requiredFields.every(
    (field) => formData[field]
  );

  return (
    <FormWrapper
      title={
        mode === "view"
          ? "View Site Registration"
          : mode === "edit"
          ? "Edit Site Registration"
          : "Add Site Registration"
      }
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      {/* Site Information */}

      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Site Information
      </div>

      <div className="space-y-2">
        <Label>Study Code *</Label>
        <Select
          value={formData.studyCode || ""}
          onValueChange={(v) =>
            handleChange("studyCode", v)
          }
          disabled={isViewMode}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Study Code" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ST001">ST001</SelectItem>
            <SelectItem value="ST002">ST002</SelectItem>
            <SelectItem value="ST003">ST003</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Site Code *</Label>
        <Input
          disabled={isViewMode}
          value={formData.siteCode || ""}
          onChange={(e) =>
            handleChange("siteCode", e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Site Name *</Label>
        <Input
          disabled={isViewMode}
          value={formData.siteName || ""}
          onChange={(e) =>
            handleChange("siteName", e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Site Type *</Label>
        <Select
          disabled={isViewMode}
          value={formData.siteType || ""}
          onValueChange={(v) =>
            handleChange("siteType", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Site Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Hospital">
              Hospital
            </SelectItem>
            <SelectItem value="Research Center">
              Research Center
            </SelectItem>
            <SelectItem value="Clinic">
              Clinic
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Site Status *</Label>
        <Select
          disabled={isViewMode}
          value={formData.siteStatus || ""}
          onValueChange={(v) =>
            handleChange("siteStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Active">
              Active
            </SelectItem>
            <SelectItem value="Pending">
              Pending
            </SelectItem>
            <SelectItem value="Inactive">
              Inactive
            </SelectItem>
            <SelectItem value="Closed">
              Closed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Site Activation Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.activationDate || ""}
          onChange={(e) =>
            handleChange(
              "activationDate",
              e.target.value
            )
          }
        />
      </div>

      {/* Address Information */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Address Information
      </div>

      <div className="space-y-2 col-span-3">
        <Label>Site Address *</Label>
        <Input
          disabled={isViewMode}
          value={formData.siteAddress || ""}
          onChange={(e) =>
            handleChange(
              "siteAddress",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <Input
          disabled={isViewMode}
          value={formData.city || ""}
          onChange={(e) =>
            handleChange("city", e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>State</Label>
        <Input
          disabled={isViewMode}
          value={formData.state || ""}
          onChange={(e) =>
            handleChange("state", e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Country *</Label>
        <Input
          disabled={isViewMode}
          value={formData.country || ""}
          onChange={(e) =>
            handleChange("country", e.target.value)
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Postal Code</Label>
        <Input
          disabled={isViewMode}
          value={formData.postalCode || ""}
          onChange={(e) =>
            handleChange(
              "postalCode",
              e.target.value
            )
          }
        />
      </div>

      {/* Principal Investigator */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Principal Investigator Information
      </div>

      <div className="space-y-2">
        <Label>Principal Investigator *</Label>
        <Input
          disabled={isViewMode}
          value={
            formData.principalInvestigator || ""
          }
          onChange={(e) =>
            handleChange(
              "principalInvestigator",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Investigator License No</Label>
        <Input
          disabled={isViewMode}
          value={formData.licenseNo || ""}
          onChange={(e) =>
            handleChange(
              "licenseNo",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Specialization</Label>
        <Input
          disabled={isViewMode}
          value={formData.specialization || ""}
          onChange={(e) =>
            handleChange(
              "specialization",
              e.target.value
            )
          }
        />
      </div>

      {/* Contact Information */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Contact Information
      </div>

      <div className="space-y-2">
        <Label>Contact Number *</Label>
        <Input
          disabled={isViewMode}
          value={formData.contactNumber || ""}
          onChange={(e) =>
            handleChange(
              "contactNumber",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Alternate Number</Label>
        <Input
          disabled={isViewMode}
          value={formData.alternateNumber || ""}
          onChange={(e) =>
            handleChange(
              "alternateNumber",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Email *</Label>
        <Input
          type="email"
          disabled={isViewMode}
          value={formData.email || ""}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
        />
      </div>

      {/* Regulatory Information */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Regulatory Information
      </div>

      <div className="space-y-2">
        <Label>IRB / IEC Number</Label>
        <Input
          disabled={isViewMode}
          value={formData.irbNumber || ""}
          onChange={(e) =>
            handleChange(
              "irbNumber",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Approval Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.approvalDate || ""}
          onChange={(e) =>
            handleChange(
              "approvalDate",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Approval Expiry Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.expiryDate || ""}
          onChange={(e) =>
            handleChange(
              "expiryDate",
              e.target.value
            )
          }
        />
      </div>

      {/* Site Capacity */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Site Capacity Information
      </div>

      <div className="space-y-2">
        <Label>Target Enrollment</Label>
        <Input
          type="number"
          disabled={isViewMode}
          value={formData.targetEnrollment || ""}
          onChange={(e) =>
            handleChange(
              "targetEnrollment",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Current Enrollment</Label>
        <Input
          type="number"
          disabled={isViewMode}
          value={formData.currentEnrollment || ""}
          onChange={(e) =>
            handleChange(
              "currentEnrollment",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Available Study Coordinators</Label>
        <Input
          type="number"
          disabled={isViewMode}
          value={formData.coordinatorCount || ""}
          onChange={(e) =>
            handleChange(
              "coordinatorCount",
              e.target.value
            )
          }
        />
      </div>

      {/* Remarks */}

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Additional Remarks
      </div>

      <div className="space-y-2 col-span-3">
        <Label>Remarks</Label>
        <textarea
          rows={4}
          disabled={isViewMode}
          value={formData.remarks || ""}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          onChange={(e) =>
            handleChange("remarks", e.target.value)
          }
          placeholder="Enter remarks"
        />
      </div>
    </FormWrapper>
  );
}