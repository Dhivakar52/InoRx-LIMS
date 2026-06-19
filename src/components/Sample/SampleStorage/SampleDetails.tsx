import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function SampleDetails({
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Sample ID */}
            <div className="space-y-2">
                    <Label>Sample ID<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Sample ID"
                     onChange={(e) => handleChange("sampleID", e.target.value)} />
                     {errors.sampleID && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.sampleID}
                        </p>
                    )}
            </div>

            {/* Sample Type */}
            <div className="space-y-2">
                <Label>Sample Type<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.sampleType}
                    onValueChange={(v) => handleChange("sampleType", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Sample Type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="WholeBlood">Whole Blood</SelectItem>
                    <SelectItem value="Serum">Serum</SelectItem>
                    <SelectItem value="Plasma">Plasma</SelectItem>
                    <SelectItem value="Tissue">Tissue</SelectItem>
                    <SelectItem value="Urine">Urine</SelectItem>
                    </SelectContent>
                </Select>
                {errors.sampleType && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.sampleType}
                            </p>
                        )}
            </div>

            {/* Volume */}
            <div className="space-y-2">
                    <Label>Volume/Quantity<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Volume"
                     onChange={(e) => handleChange("volume", e.target.value)} />
                     {errors.volume && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.volume}
                        </p>
                    )}
            </div>
                 {/* Sample Collection Date */}
            <div className="space-y-2">
                <Label>Sample Collection Date <span className="text-red-500">*</span></Label>
                <Input type="date" 
                disabled={isViewMode}
                value={formData.collectionDate}
                onChange={(e) =>
                    handleChange("collectionDate", e.target.value)
                  } />
                {errors.collectionDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.collectionDate}
                        </p>
                      )}
              </div>

        </div>
    </div>
  );
}