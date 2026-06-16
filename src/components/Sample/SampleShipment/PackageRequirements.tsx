import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function PackageRequirements({
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

            {/* Package Type */}
            <div className="space-y-2">
                <Label>Package Type<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.packageType}
                    onValueChange={(v) => handleChange("packageType", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Package Type" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="DryIceShipper">Dry Ice Shipper</SelectItem>
                    <SelectItem value="LN2">LN2 Dewar (Vapor Phase)</SelectItem>
                    <SelectItem value="AmbientBox">Ambient Box</SelectItem>
                    <SelectItem value="GelColdPacks">Gel Cold Packs (2-8°C)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.packageType && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.packageType}
                            </p>
                        )}
            </div>

            {/* Target Transit Tempertaure */}
            <div className="space-y-2">
                <Label>Target Transit Tempertaure<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.targetTransitTempertaure}
                    onValueChange={(v) => handleChange("targetTransitTempertaure", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Target Transit Tempertaure" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="-80">-80°C (Deep Freeze)</SelectItem>
                    <SelectItem value="-150">-150°C (Cryo)</SelectItem>
                    <SelectItem value="4">2-8°C (Refrigerated)</SelectItem>
                    <SelectItem value="ambient">Ambient (15-25°C)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.targetTransitTempertaure && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.targetTransitTempertaure}
                            </p>
                        )}
            </div>

            {/* Gross Weight */}
            <div className="space-y-2">
                <Label>
                    Gross Weight (kg)
                    <span className="text-red-500">*</span>
                </Label>

                <Input
                    type="number"
                    step="0.1"
                    min={0}
                    disabled={isViewMode}
                    placeholder="e.g., 15.5"
                    value={formData.grossWeight}
                    onChange={(e) =>
                    handleChange("grossWeight", e.target.value)
                    }
                />

                {errors.grossWeight && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors.grossWeight}
                    </p>
                )}
                </div>

            {/* Dimensions */}
            <div className="space-y-2">
                    <Label>Dimensions (L * W * H cm)</Label>
                    <Input disabled={isViewMode}
                    placeholder="e.g., 10 * 10* 10"
                     onChange={(e) => handleChange("dimensions", e.target.value)} />
                     {errors.dimensions && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.dimensions}
                        </p>
                    )}
            </div>
        </div>
    </div>
  );
}