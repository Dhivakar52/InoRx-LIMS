"use client";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

type Props = {
  formData: any;
  errors: any;
  handleChange: (
    field: string,
    value: any
  ) => void;
};

export default function GeneralInformation({
  formData,
  errors,
  handleChange,
}: Props) {
  return (
    <div className="space-y-6">

      {/* ========================================= */}
      {/* STUDY INFORMATION */}
      {/* ========================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Study Information
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <Label>
              Study Code *
            </Label>

            <Select
              value={formData.studyCode}
              onValueChange={(v) =>
                handleChange("studyCode", v)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Study" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ST001">
                  ST001
                </SelectItem>

                <SelectItem value="ST002">
                  ST002
                </SelectItem>
              </SelectContent>
            </Select>

            {errors.studyCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.studyCode}
              </p>
            )}
          </div>

          <div>
            <Label>
              Study Title
            </Label>

            <Input
              value={
                formData.studyTitle
              }
              disabled
            />
          </div>

          <div>
            <Label>
              Current Version
            </Label>

            <Input
              value={
                formData.currentVersion
              }
              disabled
            />
          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* AMENDMENT DETAILS */}
      {/* ========================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Amendment Details
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <Label>
              Amendment Code *
            </Label>

            <Input
              value={
                formData.amendmentCode
              }
              onChange={(e) =>
                handleChange(
                  "amendmentCode",
                  e.target.value
                )
              }
            />

            {errors.amendmentCode && (
              <p className="text-red-500 text-xs mt-1">
                {
                  errors.amendmentCode
                }
              </p>
            )}
          </div>

          <div>
            <Label>
              Amendment Title *
            </Label>

            <Input
              value={
                formData.amendmentTitle
              }
              onChange={(e) =>
                handleChange(
                  "amendmentTitle",
                  e.target.value
                )
              }
            />

            {errors.amendmentTitle && (
              <p className="text-red-500 text-xs mt-1">
                {
                  errors.amendmentTitle
                }
              </p>
            )}
          </div>

          <div>
            <Label>
              New Version *
            </Label>

            <Input
              value={
                formData.newVersion
              }
              onChange={(e) =>
                handleChange(
                  "newVersion",
                  e.target.value
                )
              }
            />

            {errors.newVersion && (
              <p className="text-red-500 text-xs mt-1">
                {errors.newVersion}
              </p>
            )}
          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* REASON CATEGORY */}
      {/* ========================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Amendment Reason
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <Label>
              Reason Category *
            </Label>

            <Select
              value={
                formData.reasonCategory
              }
              onValueChange={(v) =>
                handleChange(
                  "reasonCategory",
                  v
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reason" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="Protocol Amendment">
                  Protocol Amendment
                </SelectItem>

                <SelectItem value="Safety Update">
                  Safety Update
                </SelectItem>

                <SelectItem value="Administrative Correction">
                  Administrative Correction
                </SelectItem>

                <SelectItem value="IRB Requirement">
                  IRB Requirement
                </SelectItem>

                <SelectItem value="Operational Change">
                  Operational Change
                </SelectItem>

              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              Linked Deviation
            </Label>

            <Select
              value={
                formData.deviationId
              }
              onValueChange={(v) =>
                handleChange(
                  "deviationId",
                  v
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Deviation" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="DV001">
                  DV001
                </SelectItem>

                <SelectItem value="DV002">
                  DV002
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              Linked CAPA
            </Label>

            <Select
              value={
                formData.capaId
              }
              onValueChange={(v) =>
                handleChange(
                  "capaId",
                  v
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select CAPA" />
              </SelectTrigger>

              <SelectContent>

                <SelectItem value="CAPA001">
                  CAPA001
                </SelectItem>

                <SelectItem value="CAPA002">
                  CAPA002
                </SelectItem>

              </SelectContent>
            </Select>
          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* ROOT CAUSE */}
      {/* ========================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Root Cause Analysis
        </h3>

        <div className="grid grid-cols-1 gap-4">

          <div>
            <Label>
              Root Cause *
            </Label>

            <Textarea
              rows={4}
              value={
                formData.rootCause
              }
              onChange={(e) =>
                handleChange(
                  "rootCause",
                  e.target.value
                )
              }
            />

            {errors.rootCause && (
              <p className="text-red-500 text-xs mt-1">
                {errors.rootCause}
              </p>
            )}
          </div>

          <div>
            <Label>
              Reason For Change *
            </Label>

            <Textarea
              rows={5}
              value={
                formData.amendmentReason
              }
              onChange={(e) =>
                handleChange(
                  "amendmentReason",
                  e.target.value
                )
              }
            />

            <div className="flex justify-between mt-1">

              <span className="text-xs text-gray-500">
                Minimum 20 characters
              </span>

              <span className="text-xs text-gray-500">
                {
                  formData
                    .amendmentReason
                    ?.length || 0
                }{" "}
                Characters
              </span>

            </div>

            {errors.amendmentReason && (
              <p className="text-red-500 text-xs mt-1">
                {
                  errors.amendmentReason
                }
              </p>
            )}
          </div>

        </div>

      </div>

      {/* ========================================= */}
      {/* REGULATORY INFORMATION */}
      {/* ========================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Regulatory Information
        </h3>

        <div className="grid grid-cols-4 gap-4">

          <div>
            <Label>
              Release Date *
            </Label>

            <Input
              type="date"
              value={
                formData.releaseDate
              }
              onChange={(e) =>
                handleChange(
                  "releaseDate",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Effective Date *
            </Label>

            <Input
              type="date"
              value={
                formData.effectiveDate
              }
              onChange={(e) =>
                handleChange(
                  "effectiveDate",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              IRB Approval No
            </Label>

            <Input
              value={
                formData.irbApprovalNo
              }
              onChange={(e) =>
                handleChange(
                  "irbApprovalNo",
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              IRB Approval Date
            </Label>

            <Input
              type="date"
              value={
                formData.irbApprovalDate
              }
              onChange={(e) =>
                handleChange(
                  "irbApprovalDate",
                  e.target.value
                )
              }
            />
          </div>

        </div>

      </div>

    </div>
  );
}