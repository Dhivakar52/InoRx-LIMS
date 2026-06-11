"use client";

import { Input } from "./../../ui/input";
import { Label } from "./../../ui/label";

interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: string
  ) => void;
  isViewMode: boolean;
}

export default function AddressShippingTab({
  formData,
  handleChange,
  isViewMode,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Street Address<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input disabled={isViewMode}
          value={formData.siteAddress || ""}
          maxLength={250}
          onChange={(e: any) =>
            handleChange(
              "siteAddress",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1" />
        {errors.siteAddress && (
          <p className="text-red-500 text-xs">
            {errors.siteAddress}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label> City<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          disabled={isViewMode}
          value={formData.city || ""}
          maxLength={100}
          onChange={(e: any) =>
            handleChange(
              "city",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.city && (
          <p className="text-red-500 text-xs">
            {errors.city}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label> Country <span className="text-red-500 ml-1">*</span>
        </Label>
        <select
          disabled={isViewMode}
          value={formData.country || ""}
          onChange={(e) =>
            handleChange(
              "country",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1">
          <option value="">
            Select Country
          </option>
          <option value="India">
            India
          </option>
          <option value="United States">
            United States
          </option>
          <option value="United Kingdom">
            United Kingdom
          </option>
          <option value="Singapore">
            Singapore
          </option>
          <option value="Australia">
            Australia
          </option>
        </select>
        {errors.country && (
          <p className="text-red-500 text-xs">
            {errors.country}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Postal Code<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          disabled={isViewMode}
          value={formData.postalCode || ""}
          maxLength={20}
          onChange={(e: any) =>
            handleChange(
              "postalCode",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.postalCode && (
          <p className="text-red-500 text-xs">
            {errors.postalCode}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
          Phone Number
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input disabled={isViewMode}
          value={formData.phoneNumber || ""}
          maxLength={30}
          onChange={(e: any) =>
            handleChange(
              "phoneNumber",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs">
            {errors.phoneNumber}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Contact Email
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          type="email"
          disabled={isViewMode}
          value={formData.contactEmail || ""}
          maxLength={100}
          onChange={(e: any) =>
            handleChange(
              "contactEmail",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.contactEmail && (
          <p className="text-red-500 text-xs">
            {errors.contactEmail}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>Time Zone <span className="text-red-500 ml-1">*</span> </Label>
        <select
          disabled={isViewMode}
          value={formData.timeZone || ""}
          onChange={(e) =>
            handleChange(
              "timeZone",
              e.target.value
            )
          }
         className="w-full border rounded-md h-10 px-3 mt-1">
          <option value="">
            Select Time Zone
          </option>
          <option value="IST">
            Indian Standard Time (IST)
          </option>
          <option value="EST">
            Eastern Standard Time (EST)
          </option>
          <option value="GMT">
            Greenwich Mean Time (GMT)
          </option>
          <option value="SGT">
            Singapore Time (SGT)
          </option>
        </select>
        {errors.timeZone && (
          <p className="text-red-500 text-xs">
            {errors.timeZone}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium">Site Status </label>
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
    </div>
  );
}