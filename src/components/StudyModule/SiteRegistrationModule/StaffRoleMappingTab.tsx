"use client";

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

const coordinatorOptions = [
  {
    value: "USR101",
    label: "Priya Raj"
  },
  {
    value: "USR102",
    label: "Anitha Kumar"
  },
  {
    value: "USR103",
    label: "John Peter"
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
          Site Coordinator<span className="text-red-500 ml-1">*</span>
        </Label>
         <Select isDisabled={isViewMode}
            placeholder="Select Site Coordinator"
            options={coordinatorOptions}
            value={
              coordinatorOptions.find(
                x =>
                  x.value ===
                  formData.siteCoordinator
              ) || null
            }
            onChange={(selected) =>
              handleChange(
                "siteCoordinator",
                selected?.value || ""
              )
            }
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