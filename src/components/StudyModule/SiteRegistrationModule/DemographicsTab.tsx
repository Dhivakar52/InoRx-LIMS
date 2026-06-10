"use client";

import { Input } from "./../../ui/input";
import { Label } from "./../../ui/label";

interface Props {
  formData: any;
  errors:any;
  handleChange: (
    name: string,
    value: string
  ) => void;
  isViewMode: boolean;
}

export default function DemographicsTab({
  formData,
  handleChange,
  isViewMode,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Site Code <span className="text-red-500">*</span></Label>
        <input
            value={formData.siteCode}
            onChange={(e) =>
              handleChange(
                "siteCode",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"/>
          {errors.siteCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.siteCode}
            </p>
          )}
      </div>

      <div className="space-y-2">
        <Label>Site Name <span className="text-red-500">*</span></Label>
        <Input
          disabled={isViewMode}
          value={formData.siteName || ""}
          onChange={(e:any) =>
            handleChange(
              "siteName",
              e.target.value
            )
          }
        className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.siteName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.siteName}
            </p>
          )}
      </div>

      <div>
        <label className="text-sm font-medium">
            Site Type <span className="text-red-500">*</span>
          </label>

          <select
            value={formData.siteType}
            onChange={(e) =>
              handleChange(
                "siteType",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1">

            <option value="">
              Select Type
            </option>

            <option value="NEW_ONLY">
              Investigative Site
            </option>

            <option value="GLOBAL">
              Satelite Clinic
            </option>

            <option value="CUSTOM">
              Central Lab
            </option>

            <option value="CUSTOM">
              Depot
            </option>
          </select>
          {errors.siteType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.siteType}
            </p>
          )}
        </div>
        <div>
        <label className="text-sm font-medium">
            Site Status
        </label>

        <select
            value={formData.siteStatus || "DRAFT"}
            disabled
            className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-100 cursor-not-allowed">
            <option value="DRAFT">
            Draft
            </option>

            <option value="ACTIVE">
            Active
            </option>

            <option value="SUBMITTED">
            Suspended
            </option>

            <option value="CLOSED">
            Inactive
            </option>
        </select>
        </div>
        {/* <div>
        <label className="text-sm font-medium">
            Site Status
          </label>

          <select
            value={formData.siteStatus}
            onChange={(e) =>
              handleChange(
                "siteStatus",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1">

            <option value="">
              Select Status
            </option>

            <option value="NEW_ONLY">
              Active
            </option>

            <option value="GLOBAL">
              Draft
            </option>

            <option value="CUSTOM">
              Submitted
            </option>

            <option value="CUSTOM">
              Closed
            </option>
          </select>
        </div> */}
      {/* <div className="space-y-2">
        <Label>Site Activation Date</Label>

        <Input
          type="date"
          disabled={isViewMode}
          value={
            formData.activationDate || ""
          }
          onChange={(e:any) =>
            handleChange(
              "activationDate",
              e.target.value
            )
          }
        className="w-full border rounded-md h-10 px-3 mt-1"/>
      </div> */}
    </div>
  );
}