"use client";

import { useEffect, useState } from "react";
import FormWrapper from "../../../common/FormWrapper";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useParams, useSearchParams } from "react-router-dom";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import axios from "axios";


export default function StudyMasterStepper() {
  const [amendmentAllowed, setAmendmentAllowed] = useState("Yes");

const { id } = useParams();

const [searchParams] = useSearchParams();

const mode = searchParams.get("mode");
const status= searchParams.get("status");

const isViewMode = mode === "view";
const isEditMode = mode === "edit";
const isDraft = status === "draft";
const isApproved = status === "approved";
const isSubmitted = status === "submitted";
const isActive = status === "active";

// const isAddMode = !mode;
  const [formData, setFormData] = useState({
    studyCode: "Auto Generated",
    studyTitle: "",
    studyDescription: "",
    studyType: "",
    studyPhase: "",
    studyStatus: "Draft",
    startDate: "",
    endDate: "",

    protocolNumber: "",
    protocolVersion: "",
    protocolDate: "",
    amendmentAllowed: "Yes",

    sponsorName: "",
    croName: "",
    principalInvestigator: "",
    studyCoordinator: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const fetchStudy = async (studyId: string) => {
  try {
    const response = await axios.get(
      `/api/study/${studyId}`
    );

    setFormData(response.data);

    setAmendmentAllowed(
      response.data.amendmentAllowed || "No"
    );
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (!id) return;

  fetchStudy(id);
}, [id]);
const handleSubmit = async () => {
  try {
    const payload = {
      ...formData,
      studyStatus: "Draft",
    };

    if (id) {
      await axios.put(
        `/api/study/${id}`,
        payload
      );
    } else {
      await axios.post(
        "/api/study",
        payload
      );
    }

    alert("Draft Saved");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <FormWrapper
  onSubmit={handleSubmit}
  onCancel={() => window.history.back()}
  saveText= {isDraft ? "Submit Study":(isSubmitted? "Approve Study": (isApproved? "Activate Study" :(isActive ? "Suspend Study" : (isEditMode ? "Update Study" : "Save as Draft"))))}
  cancelText={isSubmitted ? "Return Study" : (isActive ? "Close Study" : "Cancel")}
>
  {/* Study Information Header */}
  <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
    Study Information
  </div>

  <div className="space-y-2">
    <Label>Study Code <span className="text-red-500">*</span></Label>
    <Input value={formData.studyCode} disabled={isViewMode} />
  </div>

  <div className="space-y-2">
    <Label>Study Title <span className="text-red-500">*</span></Label>
    <Input
      value={formData.studyTitle}
      onChange={(e) =>
        handleChange("studyTitle", e.target.value)
      }
      disabled={isViewMode}
    />
  </div>

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
  </div>

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
  </div>
      

  {/* <div className="space-y-2">
    <Label>Study Status *</Label>
    <Select
      defaultValue="Draft"
      onValueChange={(v) =>
        handleChange("studyStatus", v)
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Draft">
          Draft
        </SelectItem>
        <SelectItem value="Active">
          Active
        </SelectItem>
      </SelectContent>
    </Select>
  </div> */}
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
        <SelectItem value="United States">
          United States
        </SelectItem>
        <SelectItem value="Japan">
          Japan
        </SelectItem>
        
      </SelectContent>
    </Select>
  </div>

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
  
  <div className="space-y-2 col-span-3">
    <Label>Study Description <span className="text-red-500">*</span></Label>
    <textarea      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      value={formData.studyDescription}
      onChange={(e) =>
        handleChange("studyDescription", e.target.value)
      }
      disabled={isViewMode}
    />
  </div>
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
  </div>

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
  </div>

  {/* Protocol Information Header */}
  <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
    Protocol Information
  </div>

  <div className="space-y-2">
    <Label>Protocol Number <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
  </div>
  <div className="space-y-2">
    <Label>Protocol Title <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
  </div>
  <div className="space-y-2">
    <Label>Protocol Version <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
  </div>
  <div className="space-y-2">
    <Label>Protocol Date <span className="text-red-500">*</span></Label>
    <Input type="date" disabled={isViewMode} />
  </div>

<div className="space-y-2">
    <Label>Classification</Label>
    <Select
      onValueChange={(v) =>
        handleChange("classification", v)
      }
      disabled={isViewMode}
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
  </div>
  <div className="space-y-2">
  <Label>Amendment Allowed *</Label>

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
      <Label>Amendment Number</Label>
      <Input disabled={isViewMode}/>
    </div>

    <div className="space-y-2">
      <Label>Amendment Version</Label>
      <Input  disabled={isViewMode}/>
    </div>
  </>
)}

  {/* Sponsor Header */}
<div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
  Sponsor & CRO Information
</div>

{/* Sponsor Name */}
<div className="space-y-2">
  <Label>Sponsor Name *</Label>
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
</div>
    <div className="space-y-2">
    <Label>Sponsor Contact</Label>
    <Input disabled={isViewMode} />
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
    <div className="space-y-2">
    <Label>CRO Contact</Label>
    <Input disabled={isViewMode} />
  </div>
{/* Principal Investigator */}
<div className="space-y-2">
  <Label>Principal Investigator *</Label>
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
</div>
  <div className="space-y-2">
    <Label>Study Director</Label>
    <Input disabled={isViewMode} />
  </div>
  <div className="space-y-2">
    <Label>Medical Monitor</Label>
    <Input disabled={isViewMode} />
  </div>
  <div className="space-y-2">
    <Label>Regulatory Contact</Label>
    <Input disabled={isViewMode} />
  </div>
{/* Coordinator Name */}
<div className="space-y-2">
  <Label>StudyCoordinator</Label>
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
</FormWrapper>
  );
}