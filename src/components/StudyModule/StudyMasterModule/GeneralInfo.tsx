import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
   formData: any;
    setFormData: any;
    errors: any;
    setErrors:any;
}

export default function GeneralInfo({
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
// const isActive = status === "active";

 const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

  if (field === "studyTitle") {
    let error = "";

    if (value.trim() && !/^[A-Za-z\s]+$/.test(value)) {
  error = "Only alphabets are allowed";
}
    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }
  if (field === "studyDescription") {
    let error = "";

   if (value.trim() && !/^[A-Za-z\s]+$/.test(value)) {
  error = "Only alphabets are allowed";
}

    setErrors((prev: any) => ({
      ...prev,
      studyTitle: error,
    }));
  }
     
  };
  return (
    <div className="space-y-6">
      <div className="border-b">
        {/* <h2 className="text-xl font-semibold text-[#00458F]">
          General Information
        </h2> */}
      </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Study Code */}
    <div className="space-y-2">
    <Label>Study Code <span className="text-red-500">*</span></Label>
     <Input disabled={isViewMode} 
        value={formData.studyCode}
        onChange={(e) => handleChange("studyCode", e.target.value)}
        maxLength={30}/>
     {errors.studyCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyCode}
            </p>
          )}
    </div>

      {/* Study Type */}
  <div className="space-y-2">
    <Label>Study Type <span className="text-red-500">*</span></Label>
    <Select
      onValueChange={(v) =>
        handleChange("studyType", v)
      }
      disabled={isViewMode}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Study Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Interventional">
          Interventional
        </SelectItem>
        <SelectItem value="Observational">
          Observational
        </SelectItem>
        <SelectItem value="Bioequivalence">
          Bioequivalence
        </SelectItem>
        <SelectItem value="PK/PD">
          PK/PD
        </SelectItem>
        <SelectItem value="Diagnostic">
          Diagnostic
        </SelectItem>
        <SelectItem value="Molecular Study">
          Molecular Study
        </SelectItem>
        <SelectItem value="Epidemiological">
          Epidemiological
        </SelectItem>
        <SelectItem value="Device Study">
          Device Study
        </SelectItem>
        <SelectItem value="Registry Study">
          Registry Study
        </SelectItem>
        <SelectItem value="Pilot Study">
          Pilot Study
        </SelectItem>
      </SelectContent>
    </Select>
    {errors.studyType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyType}
            </p>
          )}
  </div>

   {/* Study Phase */}
    <div className="space-y-2">
    <Label>Study Phase <span className="text-red-500">*</span></Label>
    <Select
      onValueChange={(v) =>
        handleChange("studyPhase", v)
      }
      disabled={isViewMode}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Study Phase" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Phase I">
          Phase I
        </SelectItem>
        <SelectItem value="Phase II">
          Phase II
        </SelectItem>
        <SelectItem value="Phase III">
          Phase III
        </SelectItem>
        <SelectItem value="Phase IV">
          Phase IV
        </SelectItem>
        <SelectItem value="Post Marketing">
          Post Marketing
        </SelectItem>
        <SelectItem value="NA / Non-Phase">
          NA / Non-Phase
        </SelectItem>
      </SelectContent>
    </Select>
        {errors.studyPhase && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyPhase}
            </p>
          )}
  </div>
</div>
     
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

         {/* Study Title */}
  <div className="space-y-2 col-span-3">
    <Label>Study Title <span className="text-red-500">*</span></Label>
    <textarea      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"      
    value={formData.studyTitle}
      onChange={(e) =>
        handleChange("studyTitle", e.target.value)
      }
      disabled={isViewMode}
      maxLength={500}
    />
    {errors.studyTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyTitle}
            </p>
          )}
  </div>

</div>

   {/* Study Description */}
<div className="space-y-2 col-span-3">
    <Label>Study Description <span className="text-red-500">*</span></Label>
    <textarea      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      value={formData.studyDescription}
      onChange={(e) =>
        handleChange("studyDescription", e.target.value)
      }
      disabled={isViewMode}
      maxLength={1000}
    />
    {errors.studyDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyDescription}
            </p>
          )}
  </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Country */}
 <div className="space-y-2">
    <Label>Country</Label>
    <Select
      onValueChange={(v) =>
        handleChange("country", v)
      }
      disabled={isViewMode}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="India">
          India
        </SelectItem>
        <SelectItem value="USA">
          USA
        </SelectItem>
              
      </SelectContent>
    </Select>
  </div>

     {/* Region */}
  <div className="space-y-2">
    <Label>Region</Label>
    <Select
      onValueChange={(v) =>
        handleChange("region", v)
      }
      disabled={isViewMode}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Region" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Chennai">
          Chennai
        </SelectItem>
        <SelectItem value="Bangalore">
          Bangalore
        </SelectItem>
        <SelectItem value="Mumbai">
          Mumbai
        </SelectItem>
        
      </SelectContent>
    </Select>
  </div>
</div>
  
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Start Date */}
  <div className="space-y-2">
    <Label>Start Date <span className="text-red-500">*</span></Label>
    <Input
      type="date"
      value={formData.startDate}
      onChange={(e) =>
        handleChange("startDate", e.target.value)
      }
      disabled={isViewMode}
    />
    {errors.startDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.startDate}
            </p>
          )}
  </div>

         {/* End Date */}
  <div className="space-y-2">
    <Label>End Date <span className="text-red-500">*</span> </Label>
    <Input
      type="date"
      value={formData.endDate}
      onChange={(e) =>
        handleChange("endDate", e.target.value)
      }
      disabled={isViewMode}
    />
    {errors.endDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate}
            </p>
          )}
  </div>
  </div>
    </div>
  );
}