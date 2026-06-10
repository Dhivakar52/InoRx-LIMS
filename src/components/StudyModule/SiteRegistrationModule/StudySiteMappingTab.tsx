"use client";

import { Label } from "./../../ui/label";
import { Input } from "./../../ui/input";

interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: string
  ) => void;
  isViewMode: boolean;
}

export default function StudySiteMappingTab({
  formData,
  errors,
  handleChange,
  isViewMode,
}: Props) {
  const studies = [
    {
      id: "ST001",
      name:
        "Cardiology Clinical Trial",
    },
    {
      id: "ST002",
      name:
        "Diabetes Research Study",
    },
    {
      id: "ST003",
      name:
        "Oncology Phase III Trial",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5">

      <div>
        <Label>
          Study Selection
          <span className="text-red-500">
            *
          </span>
        </Label>

        <select
          disabled={isViewMode}
          value={
            formData.studyId || ""
          }
          onChange={(e) =>
            handleChange(
              "studyId",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"
        >
          <option value="">
            Select Study
          </option>

          {studies.map(
            (study) => (
              <option
                key={study.id}
                value={study.id}
              >
                {study.id} -{" "}
                {study.name}
              </option>
            )
          )}
        </select>

        {errors.studyId && (
          <p className="text-red-500 text-xs mt-1">
            {errors.studyId}
          </p>
        )}
      </div>

      <div>
        <Label>
          Local IRB Reference
        </Label>

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
          maxLength={50}
        />
      </div>

      <div>
        <Label>
          Local IRB Approval Date
        </Label>

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
          className="w-full border rounded-md h-10 px-3 mt-1"
        />

        {errors.localIrbApprovalDate && (
          <p className="text-red-500 text-xs mt-1">
            {
              errors.localIrbApprovalDate
            }
          </p>
        )}
      </div>

      <div>
        <Label>
          Site Effective Date
          <span className="text-red-500">
            *
          </span>
        </Label>

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
          className="w-full border rounded-md h-10 px-3 mt-1"
        />

        {errors.siteEffectiveDate && (
          <p className="text-red-500 text-xs mt-1">
            {
              errors.siteEffectiveDate
            }
          </p>
        )}
      </div>
      
        <div>
        <Label>
          Mapping Status
        </Label>

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
          className="w-full border rounded-md h-10 px-3 mt-1"
        >
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