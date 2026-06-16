import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import {  useState } from "react";

import React from "react";
import type { StudyMasterData } from "./StudyMasterStepper";

interface Props {
  formData: StudyMasterData;
  setFormData: React.Dispatch<React.SetStateAction<StudyMasterData>>;
  errors: Record<string, string>;
  setErrors:any;
}

export default function ProtocolSettings({
    formData,
    setFormData,
    errors,
    setErrors
}: Props) {

    // const { id } = useParams();
  const [amendmentAllowed, setAmendmentAllowed] = useState("No");

const [searchParams] = useSearchParams();

const mode = searchParams.get("mode");
const isViewMode = mode === "view";

 const handleChange = (field: keyof StudyMasterData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    if (field === "protocolTitle") {
    let error = "";

   if (value.trim() && !/^[A-Za-z\s]+$/.test(value)) {
      error = "Only alphabets are allowed";
    }

    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }
if (field === "ammendmentNumber") {
    let error = "";

   if (!value.trim()) {
    error = "Ammendment Number is required";
  } 
    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }

  if (field === "ammendmentVersion") {
    let error = "";

   if (!value.trim()) {
    error = "Ammendment Version is required";
  } 
    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }
}

  return (
    <div className="space-y-6">
      <div className="border-b">
        {/* <h2 className="text-xl font-semibold text-[#00458F]">
          Protocol Settings
        </h2> */}
      </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Protocol Code */}
    <div className="space-y-2">
    <Label>Protocol Number <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode}
    value={formData.protocolNumber}
    onChange={(e) =>
        handleChange("protocolNumber", e.target.value)
      }
      maxLength={50} />
    {errors.protocolNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolNumber}
            </p>
          )}
  </div>

{/* Protocol Title */}
  <div className="space-y-2">
    <Label>Protocol Title <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} 
    value={formData.protocolTitle}
    onChange={(e) =>
        handleChange("protocolTitle", e.target.value)
      }
      maxLength={250}
    />
    {errors.protocolTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolTitle}
            </p>
          )}
  </div>

  {/* Protocol Version */}
  <div className="space-y-2">
    <Label>Protocol Version <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} 
    value={formData.protocolVersion}
    onChange={(e) =>
        handleChange("protocolVersion", e.target.value)
      }
    maxLength={15}
    />
    {errors.protocolVersion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolVersion}
            </p>
          )}
  </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Protocol Date */}
  <div className="space-y-2">
    <Label>Protocol Date <span className="text-red-500">*</span></Label>
    <Input type="date" 
    disabled={isViewMode}
    value={formData.protocolDate}
    onChange={(e) =>
        handleChange("protocolDate", e.target.value)
      } />
    {errors.protocolDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolDate}
            </p>
          )}
  </div>

    {/* Classification */}
  <div className="space-y-2">
    <Label>Classification<span className="text-red-500">*</span></Label>
    <Select
      onValueChange={(v) =>
        handleChange("classification", v)
      }
      disabled={isViewMode}
      value={formData.classification}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Classification" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Blinded">
          Blinded
        </SelectItem>
        <SelectItem value="Unblinded">
          Unblinded
        </SelectItem>
       </SelectContent>
    </Select>
    {errors.classification && (
            <p className="text-red-500 text-xs mt-1">
              {errors.classification}
            </p>
          )}
  </div>

    {/* <div className="space-y-2">
    <Label>IRB Approval Date <span className="text-red-500">*</span></Label>
    <Input type="date" disabled={isViewMode} />
    {errors.irbApprovalDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.irbApprovalDate}
            </p>
          )}
  </div> */}
 {/* Is Ammendment Allowed */}
  <div className="space-y-2">
    <Label>Amendment Allowed<span className="text-red-500">*</span></Label>

    <RadioGroup
      value={amendmentAllowed}
      onValueChange={setAmendmentAllowed}
      className="flex gap-5 pt-2"
      disabled={isViewMode}
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="Yes" id="yes" />
        <Label htmlFor="yes">Yes</Label>
      </div>

      <div className="flex items-center gap-2">
        <RadioGroupItem value="No" id="no" />
        <Label htmlFor="no">No</Label>
      </div>
    </RadioGroup>
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{amendmentAllowed === "Yes" && (
  <>
    <div className="space-y-2">
      <Label>Amendment Number<span className="text-red-500">*</span></Label>
      <Input disabled={isViewMode}
      onChange={(e) =>
        handleChange("studyDescription", e.target.value)
      }
      maxLength={20}
      />
      {errors.ammendmentNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ammendmentNumber}
            </p>
          )}
    </div>

    <div className="space-y-2">
      <Label>Amendment Version<span className="text-red-500">*</span></Label>
      <Input  disabled={isViewMode}
      onChange={(e) =>
        handleChange("studyDescription", e.target.value)
      }
      maxLength={15}
      />
      {errors.ammendmentVersion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ammendmentVersion}
            </p>
          )}
    </div>
  </>
)}
</div>


      <div className="space-y-2 col-span-2">
        <Label>Protocol Attachment<span className="text-red-500">*</span></Label>
         <div className="relative">
            <input
                id="protocolAttachment"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                const files = Array.from(e.target.files || []);

                setFormData((prev) => ({
                  ...prev,
                  protocolAttachment: [
                    ...prev.protocolAttachment,
                    ...files,
                  ],
                }));
              }}
                className="hidden"
              />
            <label htmlFor="protocolAttachment"
              className={`
                flex flex-col items-center justify-center
                w-full min-h-[120px]
                border-2 border-dashed
                rounded-lg
                cursor-pointer
                transition-all
                bg-gray-50 hover:bg-gray-100
                ${
                  errors.protocolAttachment
                    ? "border-red-400"
                    : "border-gray-300 hover:border-[#00458F]"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <div className="text-sm font-medium text-gray-700">
                {formData.protocolAttachment.length > 0 ? (
                  formData.protocolAttachment.map((file, index) => (
                    <div key={`${file.name}-${index}`}>
                      {file.name}
                    </div>
                  ))
                ) : (
                  "Choose File or Drag & Drop"
                )}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                PDF, DOCX (Max 5 MB)
              </span>
            </label>
          </div>
        {errors.protocolAttachment && (
          <p className="text-red-500 text-xs">
            {errors.protocolAttachment}
          </p>
        )}
      </div>
  



{formData.protocolAttachment.map((file, index) => (
  <div
    key={`${file.name}-${index}`}
    className="flex items-center justify-between"
  >
    <span>{file.name}</span>

    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          protocolAttachment:
            prev.protocolAttachment.filter(
              (_, i) => i !== index
            ),
        }))
      }
      className="text-red-500"
    >
      ×
    </button>
  </div>
))}
    </div>
  );
}