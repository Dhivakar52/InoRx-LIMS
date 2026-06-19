import { useSearchParams } from "react-router-dom";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import type { SampleShipmentData } from "./SampleShipmentForm";
import { Checkbox } from "../../ui/checkbox";
import { Textarea } from "../../ui/textarea";

interface Props {
    formData: SampleShipmentData;
     setFormData: React.Dispatch<React.SetStateAction<SampleShipmentData>>;
     errors: Record<string, string>;
}

export default function DispatchAndcompliance({
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
      {/* <div className="border-b">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Sponsor & CRO Details
        </h2>
      </div> */}
      <div className="space-y-2 col-span-2">
              <Label>Airway Bill / Commercial Invoice Upload</Label>
               <div className="relative">
                  <input
                      id="AirwayBill"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                      const files = Array.from(e.target.files || []);
      
                      setFormData((prev) => ({
                        ...prev,
                        AirwayBill: [
                          ...prev.AirwayBill,
                          ...files,
                        ],
                      }));
                    }}
                      className="hidden"
                    />
                  <label htmlFor="AirwayBill"
                    className={`
                      flex flex-col items-center justify-center
                      w-full min-h-[120px]
                      border-2 border-dashed
                      rounded-lg
                      cursor-pointer
                      transition-all
                      bg-gray-50 hover:bg-gray-100
                      ${
                        errors.AirwayBill
                          ? "border-red-400"
                          : "border-gray-300 hover:border-[#00458F]"
                      }
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <div className="text-sm font-medium text-gray-700">
                      {formData.AirwayBill.length > 0 ? (
                        formData.AirwayBill.map((file, index) => (
                          <div key={`${file.name}-${index}`}>
                            {file.name}
                          </div>
                        ))
                      ) : (
                        "Upload Airway Bill or Manifest PDF"
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, JPG (Max 5MB)
                    </span>
                  </label>
                </div>
              {errors.AirwayBill && (
                <p className="text-red-500 text-xs">
                  {errors.AirwayBill}
                </p>
              )}
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Prepared & Packed By */}
            <div className="space-y-2">
                <Label>Prepared & Packed By<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.preparedBy}
                    onValueChange={(v) => handleChange("preparedBy", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Packer" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Person1">Person 1</SelectItem>
                    <SelectItem value="Person2">Person 2</SelectItem>
                    <SelectItem value="Person3">Person 3</SelectItem>
                    </SelectContent>
                </Select>
                {errors.preparedBy && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.preparedBy}
                            </p>
                        )}
            </div>

            {/* Compliance Check */}
            <div className="space-y-3">
                <Label>
                    Compliance Check
                </Label>

                <div className="flex items-center gap-3">
                    <Checkbox
                    id="complianceCheck"
                    checked={formData.complianceCheck || false}
                    disabled={isViewMode}
                    onCheckedChange={(checked:any) =>
                        handleChange("complianceCheck", checked)
                    }
                    />

                    <label
                    htmlFor="complianceCheck"
                    className="text-sm text-gray-700 cursor-pointer"
                    >
                    I certify the package meets IATA/ADR regulations.
                    </label>
                </div>

                {errors.complianceCheck && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors.complianceCheck}
                    </p>
                )}
                </div>
                

        </div>

{/* Special Dispatch Instructions */}
        <div className="space-y-2">
                    <Label>Special Dispatch Instructions</Label>
                    <Textarea disabled={isViewMode}
                    placeholder="Enter Dispatch Instructions"
                     onChange={(e) => handleChange("specialDispatchInstructions", e.target.value)} />
                     {errors.specialDispatchInstructions && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.specialDispatchInstructions}
                        </p>
                    )}
            </div>
    </div>
  );
}