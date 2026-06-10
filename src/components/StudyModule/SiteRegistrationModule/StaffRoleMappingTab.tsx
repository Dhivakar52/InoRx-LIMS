"use client";

import { Label } from "./../../ui/label";

interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  isViewMode: boolean;
}

export default function StaffRoleMappingTab({
  formData,
  handleChange,
  isViewMode,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Lead PI */}

      <div className="space-y-2">
        <Label>
          Lead PI
          <span className="text-red-500 ml-1">*</span>
        </Label>

        <select
          disabled={isViewMode}
          value={formData.leadPI || ""}
          onChange={(e) =>
            handleChange(
              "leadPI",
              e.target.value
            )
          }
           className="w-full border rounded-md h-10 px-3 mt-1"
        >
          <option value="">
            Select Lead PI
          </option>

          <option value="USR001">
            Dr. John Smith
          </option>

          <option value="USR002">
            Dr. David Kumar
          </option>

          <option value="USR003">
            Dr. Sarah Wilson
          </option>
        </select>

        {errors.leadPI && (
          <p className="text-red-500 text-xs">
            {errors.leadPI}
          </p>
        )}
      </div>

      {/* Site Coordinator */}

      <div className="space-y-2">
        <Label>
          Site Coordinator
          <span className="text-red-500 ml-1">*</span>
        </Label>

        <select
          disabled={isViewMode}
          value={
            formData.siteCoordinator || ""
          }
          onChange={(e) =>
            handleChange(
              "siteCoordinator",
              e.target.value
            )
          }
           className="w-full border rounded-md h-10 px-3 mt-1"
        >
          <option value="">
            Select Site Coordinator
          </option>

          <option value="USR101">
            Priya Raj
          </option>

          <option value="USR102">
            Anitha Kumar
          </option>

          <option value="USR103">
            John Peter
          </option>
        </select>

        {errors.siteCoordinator && (
          <p className="text-red-500 text-xs">
            {errors.siteCoordinator}
          </p>
        )}
      </div>

      {/* Unblinded Pharmacist */}

      <div className="space-y-2">
        <Label>
          Unblinded Pharmacist
        </Label>

        <select
          disabled={isViewMode}
          value={
            formData.unblindedPharmacist ||
            ""
          }
          onChange={(e) =>
            handleChange(
              "unblindedPharmacist",
              e.target.value
            )
          }
           className="w-full border rounded-md h-10 px-3 mt-1"
        >
          <option value="">
            Select Pharmacist
          </option>

          <option value="USR201">
            Michael Brown
          </option>

          <option value="USR202">
            Ravi Kumar
          </option>

          <option value="USR203">
            Emily Watson
          </option>
        </select>

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