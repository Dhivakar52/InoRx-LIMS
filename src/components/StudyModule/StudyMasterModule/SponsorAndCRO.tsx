import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Textarea } from "../../ui/textarea";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
    setErrors:any;
}

export default function SponsorAndCRO({
    formData,
    setFormData,
    errors,
    setErrors
}: Props) {

    // const { id } = useParams();

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

    if (field === "sponsorContact") {
    let error = "";
    if (value.trim() && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
    error = "Please enter a valid email address";
    }

    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }
  };
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Sponsor & CRO Details
        </h2>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Sponsor Name<span className="text-red-500">*</span></Label>
                <Select
                    value={formData.sponsorName}
                    onValueChange={(v) => handleChange("sponsorName", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Sponsor" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="ABC Pharma">ABC Pharma</SelectItem>
                    <SelectItem value="XYZ Life Sciences">XYZ Life Sciences</SelectItem>
                    <SelectItem value="Global Biotech">Global Biotech</SelectItem>
                    </SelectContent>
                </Select>
                {errors.sponsorName && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.sponsorName}
                            </p>
                        )}
                </div>
                {/* Sponsor Contact */}
                <div className="space-y-2">
                    <Label>Sponsor Contact</Label>
                    <Input disabled={isViewMode}
                     onChange={(e) => handleChange("sponsorContact", e.target.value)} 
                     maxLength={100}/>
                     {errors.sponsorContact && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.sponsorContact}
                        </p>
                    )}
                </div>


                {/* CRO Name */}
                <div className="space-y-2">
                <Label>CRO Name</Label>
                <Select
                    value={formData.croName}
                    onValueChange={(v) => handleChange("croName", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select CRO" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="IQVIA">IQVIA</SelectItem>
                    <SelectItem value="PPD">PPD</SelectItem>
                    <SelectItem value="ICON">ICON</SelectItem>
                    <SelectItem value="Parexel">Parexel</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                {/* CRO Contact */}
                <div className="space-y-2">
                    <Label>CRO Contact</Label>
                    <Input disabled={isViewMode}
                     onChange={(e) => handleChange("croContact", e.target.value)} 
                     maxLength={100} />
                     {errors.croContact && (
                        <p className="text-red-500 text-xs mt-1">
                        {errors.croContact}
                        </p>
                    )}
                </div>
                
                {/* Principal Investigator */}
                <div className="space-y-2">
                <Label>Principal Investigator <span className="text-red-500">*</span></Label>
                <Select
                    value={formData.principalInvestigator}
                    onValueChange={(v) =>
                    handleChange("principalInvestigator", v)
                    }
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Investigator" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Dr Raj Kumar">
                        Dr Raj Kumar
                    </SelectItem>
                    <SelectItem value="Dr Priya">
                        Dr Priya
                    </SelectItem>
                    <SelectItem value="Dr Arun">
                        Dr Arun
                    </SelectItem>
                    </SelectContent>
                </Select>
                {errors.principalInvestigator && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.principalInvestigator}
                            </p>
                        )}
                </div>
                <div className="space-y-2">
                    <Label>Principal Investigator Address</Label>
                    <Textarea disabled={isViewMode}
                     onChange={(e) => handleChange("principalInvestigatorAddress", e.target.value)} 
                     maxLength={250}  />
                </div>
                <div className="space-y-2">
                    <Label>Study Director</Label>
                    <Input disabled={isViewMode}
                     onChange={(e) => handleChange("studyDirector", e.target.value)} 
                     maxLength={100}
                      />
                </div>
                <div className="space-y-2">
                    <Label>Medical Monitor</Label>
                    <Input disabled={isViewMode} 
                     onChange={(e) => handleChange("medicalMonitor", e.target.value)} 
                     maxLength={100}/>
                </div>
                <div className="space-y-2">
                    <Label>Regulatory Contact</Label>
                    <Input disabled={isViewMode} 
                     onChange={(e) => handleChange("regulatoryContact", e.target.value)} 
                     maxLength={100}/>
                </div>
                {/* Coordinator Name */}
                <div className="space-y-2">
                <Label>Study Coordinator</Label>
                <Select
                    value={formData.studyCoordinator}
                    onValueChange={(v) =>
                    handleChange("studyCoordinator", v)
                    }
                    disabled={isViewMode} 
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Study Coordinator" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="Coordinator A">
                        Coordinator A
                    </SelectItem>
                    <SelectItem value="Coordinator B">
                        Coordinator B
                    </SelectItem>
                    <SelectItem value="Coordinator C">
                        Coordinator C
                    </SelectItem>
                    </SelectContent>
                </Select>
                
                </div>
        </div>
    </div>
  );
}