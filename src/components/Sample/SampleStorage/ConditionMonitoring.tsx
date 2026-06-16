import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
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

    // const { id } = useParams();

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
      <div className="border-b">
        {/* <h2 className="text-xl font-semibold text-[#00458F]">
          Sponsor & CRO Details
        </h2> */}
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

           {/* Current Temperature */}
            <div className="space-y-2">
                <Label>
                    Current Temperature
                    <span className="text-red-500">*</span>
                </Label>

                <Input
                    type="number"
                    step="0.1"
                    disabled={isViewMode}
                    placeholder="Please Enter Current Temperature"
                    value={formData.currentTemperature}
                    onChange={(e) =>
                    handleChange("currentTemparature", e.target.value)
                    }
                />

                {errors.currentTemparature && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors.currentTemparature}
                    </p>
                )}
                </div>

            {/* Target Range*/}
            <div className="space-y-2">
                <Label>Target Range<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.targetRange}
                    onValueChange={(v) => handleChange("targetRange", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Target Range" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="-80">-80°C</SelectItem>
                    <SelectItem value="-20">-20°C</SelectItem>
                    <SelectItem value="4">2-8°C</SelectItem>
                    <SelectItem value="ambient">Ambient</SelectItem>
                    </SelectContent>
                </Select>
                {errors.targetRange && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.targetRange}
                            </p>
                        )}
            </div>

            {/* Complaince Status */}
            <div className="space-y-2">
                    <Label>Complaince Status</Label>
                    <Select
                    value={formData.complainceStatus}
                    onValueChange={(v) => handleChange("complainceStatus", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Complaince Status" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Complaint">Complaint</SelectItem>
                    <SelectItem value="Deviation">Deviation</SelectItem>
                    </SelectContent>
                </Select>
                     {errors.complainceStatus && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.complainceStatus}
                        </p>
                    )}
            </div>

            {/* Complaince Notes*/}
            {formData.complainceStatus === "Deviation" && (
            <div className="space-y-2">
                    <Label>Complaince Notes</Label>
                    <Textarea disabled={isViewMode}
                    placeholder="Enter Notes if Deviation occurs"
                     onChange={(e) => handleChange("complainceNotes", e.target.value)} />
                     {errors.complainceNotes && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.complainceNotes}
                        </p>
                    )}
            </div>
            )}
        </div>
    </div>
  );
}