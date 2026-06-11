"use client";

import { Label } from "./../../ui/label";
import { Input } from "./../../ui/input";
import Select from "react-select";

interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: string
  ) => void;
  isViewMode: boolean;
}
const studyOptions = [
  {
    value: "ST001",
    label:
      "ST001 - Cardiology Clinical Trial"
  },
  {
    value: "ST002",
    label:
      "ST002 - Diabetes Research Study"
  },
  {
    value: "ST003",
    label:
      "ST003 - Oncology Phase III Trial"
  }
];
export default function StudySiteMappingTab({
  formData,
  errors,
  handleChange,
  isViewMode,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="space-y-2">
        <Label>
          Study Selection
          <span className="text-red-500">*</span>
        </Label>
        <Select
          isDisabled={isViewMode}
          placeholder="Select Study"
          options={studyOptions}
          value={
            studyOptions.find(
              x => x.value === formData.studyId
            ) || null
          }
          onChange={(selected) =>
            handleChange(
              "studyId",
              selected?.value || ""
            )
          }/>
        {errors.studyId && (
          <p className="text-red-500 text-xs">
            {errors.studyId}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label> Local IRB Reference </Label>
        <Input
          disabled={isViewMode}
          value={
            formData.localIrbReference ||
            ""
          }
          onChange={(e: any) =>
            handleChange(
              "localIrbReference",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"
          maxLength={50}/>
      </div>
      <div className="space-y-2">
        <Label>  Local IRB Approval Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={
            formData.localIrbApprovalDate ||
            ""
          }
          onChange={(e: any) =>
            handleChange(
              "localIrbApprovalDate",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.localIrbApprovalDate && (
          <p className="text-red-500 text-xs mt-1">
            {
              errors.localIrbApprovalDate
            }
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label> Site Effective Date <span className="text-red-500"> *</span></Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={
            formData.siteEffectiveDate ||
            ""
          }
          onChange={(e: any) =>
            handleChange(
              "siteEffectiveDate",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1" />
        {errors.siteEffectiveDate && (
          <p className="text-red-500 text-xs mt-1">
            {
              errors.siteEffectiveDate
            }
          </p>
        )}
      </div>
        <div className="space-y-2">
        <Label> Mapping Status</Label>
        <select
          disabled={isViewMode}
          value={
            formData.mappingStatus ||
            "ACTIVE"
          }
          onChange={(e) =>
            handleChange(
              "mappingStatus",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1">
          <option value="ACTIVE">
            ACTIVE
          </option>
          <option value="INACTIVE">
            INACTIVE
          </option>
        </select>
      </div>
     {/* <div>
        <label className="text-sm font-medium">
            Mapping Status
        </label>

        <select
            value={formData.siteStatus || "ACTIVE"}
            disabled
            className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-100 cursor-not-allowed">
            <option value="ACTIVE">Active</option>
            <option value="IN-ACTIVE">In-Active</option>
        </select>
        </div> */}

    </div>
  );
}