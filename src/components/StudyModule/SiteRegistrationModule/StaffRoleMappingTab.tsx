"use client";

import { Input } from "../../ui/input";
import { Label } from "./../../ui/label";
import Select from "react-select";
interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  isViewMode: boolean;
}
const leadPIOptions = [
  {
    value: "USR001",
    label: "Dr. John Smith"
  },
  {
    value: "USR002",
    label: "Dr. David Kumar"
  },
  {
    value: "USR003",
    label: "Dr. Sarah Wilson"
  }
];

const pharmacistOptions = [
  {
    value: "USR201",
    label: "Michael Brown"
  },
  {
    value: "USR202",
    label: "Ravi Kumar"
  },
  {
    value: "USR203",
    label: "Emily Watson"
  }
];
export default function StaffRoleMappingTab({
  formData,
  handleChange,
  isViewMode,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>
          Lead PI <span className="text-red-500 ml-1">*</span>
        </Label>
         <Select isDisabled={isViewMode}
            placeholder="Select Lead PI"
            options={leadPIOptions}
            value={
              leadPIOptions.find(
                x =>
                  x.value ===
                  formData.leadPI
              ) || null
            }
            onChange={(selected) =>
              handleChange(
                "leadPI",
                selected?.value || ""
              )
            }
          />
        {errors.leadPI && (
          <p className="text-red-500 text-xs">
            {errors.leadPI}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
         Laboratory Director<span className="text-red-500 ml-1">*</span>
        </Label>
         <Input  disabled={isViewMode}
          placeholder="Please Enter Laboratory Director"
         onChange={(e) =>handleChange("labDirector", e.target.value)}
        />
        {errors.labDirectorOptions && (
          <p className="text-red-500 text-xs">
            {errors.labDirectorOptions}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
         Quality Assurance (QA)<span className="text-red-500 ml-1">*</span>
        </Label>
          <Input  disabled={isViewMode}
          placeholder="Please Enter Quality Assurance"
         onChange={(e) =>handleChange("qualityAssurance", e.target.value)}
        />
        {errors.qualityAssuranceOptions && (
          <p className="text-red-500 text-xs">
            {errors.qualityAssuranceOptions}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
         Scientist(s)<span className="text-red-500 ml-1">*</span>
        </Label>
          <Input  disabled={isViewMode}
          placeholder="Please Enter Scientist"
         onChange={(e) =>handleChange("scientist", e.target.value)}
        />
        {errors.scientistOptions && (
          <p className="text-red-500 text-xs">
            {errors.scientistOptions}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
         Laboratory Technician(s)<span className="text-red-500 ml-1">*</span>
        </Label>
          <Input  disabled={isViewMode}
          placeholder="Please Enter Laboratory Technician"
         onChange={(e) =>handleChange("labTechnician", e.target.value)}
        />
        {errors.labTechOptions && (
          <p className="text-red-500 text-xs">
            {errors.labTechOptions}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label>
          Site Coordinator<span className="text-red-500 ml-1">*</span>
        </Label>
          <Input  disabled={isViewMode}
          placeholder="Please Enter Site Coordinator"
         onChange={(e) =>handleChange("siteCoordinator", e.target.value)}
        />
        {errors.siteCoordinator && (
          <p className="text-red-500 text-xs">
            {errors.siteCoordinator}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label> Unblinded Pharmacist</Label>
        <Select isDisabled={isViewMode}
          placeholder="Select Pharmacist"
          options={pharmacistOptions}
          value={
            pharmacistOptions.find(
              x =>
                x.value ===
                formData.unblindedPharmacist
            ) || null
          }
          onChange={(selected) =>
            handleChange(
              "unblindedPharmacist",
              selected?.value || ""
            )
          }
        />
        {isViewMode === false && (
          <p className="text-xs text-gray-500">
            Required only for blinded
            studies
          </p>
        )}

        {errors.unblindedPharmacist && (
          <p className="text-red-500 text-xs">
            {errors.unblindedPharmacist}
          </p>
        )}
      </div>

    </div>
  );
}