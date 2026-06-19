import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
}

export default function SampleShipmentDetails({
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

           {/* Courier/Logistics Provider */}
            <div className="space-y-2">
                <Label>Courier/Logistics Provider<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.courier}
                    onValueChange={(v) => handleChange("courier", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Courier Provider" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="WorldCourier">World Courier</SelectItem>
                    <SelectItem value="FedEx">FedEx Express</SelectItem>
                    <SelectItem value="Marken">Marken</SelectItem>
                    <SelectItem value="DHL">DHL Medical Express</SelectItem>
                    </SelectContent>
                </Select>
                {errors.courier && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.courier}
                            </p>
                        )}
            </div>
             {/* Sample ID */}
            <div className="space-y-2">
                    <Label>Tracking/AWB Number</Label>
                    <Input disabled={isViewMode}
                    placeholder="e.g., AWB-901-20349"
                     onChange={(e) => handleChange("trackingNumber", e.target.value)} />
                     {errors.trackingNumber && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.trackingNumber}
                        </p>
                    )}
            </div>

            {/* Origin Site */}
            <div className="space-y-2">
                <Label>Origin Site<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.originSite}
                    onValueChange={(v) => handleChange("originSite", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Origin Site" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="BostonGeneralHospital">Boston General Hospital</SelectItem>
                    <SelectItem value="NewYorkClinic">New York Clinic</SelectItem>
                   </SelectContent>
                </Select>
                {errors.originSite && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.originSite}
                            </p>
                        )}
            </div>

            {/* Destination Site */}
            <div className="space-y-2">
                <Label>Destination Site<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.destinationSite}
                    onValueChange={(v) => handleChange("destinationSite", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Destination Site" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="LondonCentralProcessingLab">London Central Processing Lab</SelectItem>
                    <SelectItem value="CentralStorageDepot">Central Storage Depot</SelectItem>
                   </SelectContent>
                </Select>
                {errors.destinationSite && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.destinationSite}
                            </p>
                        )}
            </div>

            {/* Planned Dispatch Date */}
            <div className="space-y-2">
                <Label>Planned Dispatch Date <span className="text-red-500">*</span></Label>
                <Input type="date" 
                disabled={isViewMode}
                value={formData.plannedDispatchDate}
                onChange={(e) =>
                    handleChange("plannedDispatchDate", e.target.value)
                  } />
                {errors.plannedDispatchDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.plannedDispatchDate}
                        </p>
                      )}
              </div>

        </div>
    </div>
  );
}