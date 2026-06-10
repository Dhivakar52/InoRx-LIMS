import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useState } from "react";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function ProtocolSettings({
    formData,
    setFormData,
    errors,
}: Props) {

    // const { id } = useParams();
const [amendmentAllowed, setAmendmentAllowed] = useState("Yes");

const [searchParams] = useSearchParams();

const mode = searchParams.get("mode");
// const status= searchParams.get("status");

    const isViewMode = mode === "view";
// const isEditMode = mode === "edit";
// const isDraft = status === "draft";
// const isApproved = status === "approved";
// const isSubmitted = status === "submitted";
// const isActive = status === "active";

 const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Protocol Settings
        </h2>
      </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="space-y-2">
    <Label>Protocol Number <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode}
    value={formData.protocolNumber} />
    {errors.protocolNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolNumber}
            </p>
          )}
  </div>
  <div className="space-y-2">
    <Label>Protocol Title <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} 
    value={formData.protocolTitle}/>
    {errors.protocolTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolTitle}
            </p>
          )}
  </div>
  <div className="space-y-2">
    <Label>Protocol Version <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} 
    value={formData.protocolVersion}/>
    {errors.protocolVersion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolVersion}
            </p>
          )}
  </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div className="space-y-2">
    <Label>Protocol Date <span className="text-red-500">*</span></Label>
    <Input type="date" 
    disabled={isViewMode}
    value={formData.protocolDate} />
    {errors.protocolDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolDate}
            </p>
          )}
  </div>

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

{amendmentAllowed === "Yes" && (
  <>
    <div className="space-y-2">
      <Label>Amendment Number<span className="text-red-500">*</span></Label>
      <Input disabled={isViewMode}/>
      {errors.ammendmentNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ammendmentNumber}
            </p>
          )}
    </div>

    <div className="space-y-2">
      <Label>Amendment Version<span className="text-red-500">*</span></Label>
      <Input  disabled={isViewMode}/>
      {errors.ammendmentVersion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.ammendmentVersion}
            </p>
          )}
    </div>
  </>
)}
   </div>
    </div>
  );
}