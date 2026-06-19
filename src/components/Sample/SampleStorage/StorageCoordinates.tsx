import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function StorageCoordinates({
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

            {/* Site*/}
            <div className="space-y-2">
                <Label>Site<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.sampleType}
                    onValueChange={(v) => handleChange("site", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="BostonGeneralHospital">Boston General Hospital</SelectItem>
                    <SelectItem value="NewYorkClinic">New York Clinic</SelectItem>
                    <SelectItem value="LondonCentralLab">London Central Lab</SelectItem>
                    </SelectContent>
                </Select>
                {errors.site && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.site}
                            </p>
                        )}
            </div>

             {/* Room/Lab Name */}
            <div className="space-y-2">
                    <Label>Room/Lab Name<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Lab Name"
                     onChange={(e) => handleChange("labName", e.target.value)} />
                     {errors.labName && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.labName}
                        </p>
                    )}
            </div>

            {/* Freezer ID */}
            <div className="space-y-2">
                <Label>Freezer ID<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.freezerID}
                    onValueChange={(v) => handleChange("freezerID", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Freezer ID" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="FRZ-80-01">FRZ-80-01 (ULT -80°C)</SelectItem>
                    <SelectItem value="FRZ-20-05">FRZ-20-05 (Standard -20°C)</SelectItem>
                    <SelectItem value="LN2-TANK-02">LN2-TANK-02 (Cryo)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.freezerID && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.freezerID}
                            </p>
                        )}
            </div>

            {/* Rack Number */}
            <div className="space-y-2">
                    <Label>Rack Number<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Rack Number"
                     onChange={(e) => handleChange("rackNumber", e.target.value)} />
                     {errors.rackNumber && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.rackNumber}
                        </p>
                    )}
            </div>

            {/* Box Number */}
            <div className="space-y-2">
                    <Label>Box Number<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Box Number"
                     onChange={(e) => handleChange("boxNumber", e.target.value)} />
                     {errors.boxNumber && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.boxNumber}
                        </p>
                    )}
            </div>

            {/* Slot/Position */}
            <div className="space-y-2">
                    <Label>Slot/Position<span className="text-red-500">*</span></Label>
                    <Input disabled={isViewMode}
                    placeholder="Please Enter Slot"
                     onChange={(e) => handleChange("slot", e.target.value)} />
                     {errors.slot && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.slot}
                        </p>
                    )}
            </div>
        </div>
    </div>
  );
}