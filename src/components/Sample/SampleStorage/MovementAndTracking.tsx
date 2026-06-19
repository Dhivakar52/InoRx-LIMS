import { useSearchParams } from "react-router-dom";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function ConditionMonitoring({
    formData,
    setFormData,
    errors
}: Props) {

const [searchParams] = useSearchParams();

    const mode = searchParams.get("mode");
    const isViewMode = mode === "view";

 const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

  };
  return (
    <div className="space-y-6">
      {/* <div className="border-b">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Sponsor & CRO Details
        </h2>
      </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Action*/}
            <div className="space-y-2">
                <Label>Action/Reason<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.action}
                    onValueChange={(v) => handleChange("action", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Action" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="IntialStorage">Intial Storage</SelectItem>
                    <SelectItem value="Relocation">Relocation</SelectItem>
                    <SelectItem value="CheckoutforAssay">Checkout for Assay</SelectItem>
                    <SelectItem value="Disposal">Disposal</SelectItem>
                    </SelectContent>
                </Select>
                {errors.action && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.action}
                            </p>
                        )}
            </div>

            {/* Action*/}
            <div className="space-y-2">
                <Label>Handled By<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.handledBy}
                    onValueChange={(v) => handleChange("handledBy", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Handled By" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="TechnicianA">Technician A</SelectItem>
                    <SelectItem value="TechnicianB">Technician B</SelectItem>
                    <SelectItem value="TechnicianC">Technician C</SelectItem>
                    <SelectItem value="TechnicianD">Technician D</SelectItem>
                    </SelectContent>
                </Select>
                {errors.handledBy && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.handledBy}
                            </p>
                        )}
            </div>
        </div>

            {/* Movement Remarks*/}
            <div className="space-y-2">
                    <Label>Movement Remarks</Label>
                    <Textarea disabled={isViewMode}
                    placeholder="Add any details regarding this action..."
                     onChange={(e) => handleChange("movementRemarks", e.target.value)} />
                     {errors.movementRemarks && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.movementRemarks}
                        </p>
                    )}
            </div>

    </div>
  );
}