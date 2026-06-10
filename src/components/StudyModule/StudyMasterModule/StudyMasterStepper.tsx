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
import { Textarea } from "../../ui/textarea";


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


const initialFormData = {
  studyCode: "Auto Generated",
  studyTitle: "",
  studyDescription: "",
  studyType: "",
  studyPhase: "",
  studyStatus: "Draft",
  startDate: "",
  endDate: "",

  protocolNumber: "",
  protocolTitle: "",
  protocolVersion: "",
  protocolDate: "",
  irbApprovalDate: "",
  amendmentAllowed: "Yes",

  sponsorName: "",
  croName: "",
  principalInvestigator: "",
  studyCoordinator: "",

  country: "",
  region: "",
  classification: "",
};
const initialVisitTemplate = [
  {
    visitName: "",
    visitType: "",
    targetDay: "",
    windowMinus: "",
    windowPlus: "",
    specimens: [],
    testCodes: [],
  },
];

const initialCohort = [
  {
    cohortCode: "",
    cohortName: "",
    armAssociation: "",
    description: "",
    eligibilityCriteria: "",
    enrollmentTarget: "",
    doseLevel: "",
    status: "Active",
  },
];

const [formData, setFormData] = useState(initialFormData);

const [visitTemplates, setVisitTemplates] = useState(initialVisitTemplate);

const [cohorts, setCohorts] = useState(initialCohort);

const [errors, setErrors] = useState<any>({});
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

const studyMetaData = () => {
    const validationErrors: any = {};

   if (!formData.studyCode)
    validationErrors.studyCode =
      "Study Code Required";

  if (!formData.studyTitle)
    validationErrors.studyTitle =
      "Study Title Required";

  if (!formData.studyType)
    validationErrors.studyType =
      "Study Type Required";

    if (!formData.studyPhase)
    validationErrors.studyPhase =
      "Study Phase Required";

  if (
    !formData.studyDescription ||
    formData.studyDescription.trim().length < 20
  ) {
    validationErrors.studyDescription =
      "Study Description required";
  }


  if (
    formData.startDate &&
    new Date(formData.endDate) <
      new Date(formData.startDate)
  ) {
    validationErrors.startDate =
      "Start Date must be before End Date";
  }
  if (!formData.sponsorName)
    validationErrors.sponsorName =
      "Sponsor Name Required";
  if (!formData.principalInvestigator)
    validationErrors.principalInvestigator =
      "Principal Investigator Required";
  if (!formData.studyCoordinator)
    validationErrors.studyCoordinator =
      "Study Coordinator Required";
  if(!formData.protocolNumber)
    validationErrors.protocolNumber =
      "Protocol Number Required";
  if(!formData.protocolTitle)
    validationErrors.protocolTitle =
      "Protocol Title Required";
  if(!formData.protocolVersion)
    validationErrors.protocolVersion =
      "Protocol Version Required";
  if(!formData.protocolDate)
    validationErrors.protocolDate =
      "Protocol Date Required";
    if(!formData.irbApprovalDate)
    validationErrors.irbApprovalDate =
      "IRB Approval Date Required";
    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };
useEffect(() => {
  if (!id) return;

  fetchStudy(id);
}, [id]);
const handleSubmit = async () => {
  try {
    debugger;
    studyMetaData();
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

const addVisitRow = () => {
  setVisitTemplates([
    ...visitTemplates,
    {
      visitName: "",
      visitType: "",
      targetDay: "",
      windowMinus: "",
      windowPlus: "",
      specimens: [],
      testCodes: [],
    },
  ]);
};

const removeVisitRow = (index:any) => {
  setVisitTemplates(
    visitTemplates.filter((_, i) => i !== index)
  );
};

const addCohortRow = () => {
  setCohorts([
    ...cohorts,
    {
      cohortCode: "",
      cohortName: "",
      armAssociation: "",
      description: "",
      eligibilityCriteria: "",
      enrollmentTarget: "",
      doseLevel: "",
      status: "Active",
    },
  ]);
};

const removeCohortRow = (index: number) => {
  setCohorts(cohorts.filter((_, i) => i !== index));
};

const updateCohort = (
  index: number,
  field: string,
  value: string
) => {
  const updated = [...cohorts];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };
  setCohorts(updated);
};

const handleClearForm = () => {
  setFormData(initialFormData);

  setAmendmentAllowed("Yes");

  setVisitTemplates(initialVisitTemplate);

  setCohorts(initialCohort);
};
  return (
    <FormWrapper
  onSubmit={handleSubmit}
  onCancel={handleClearForm}
  saveText= {isDraft ? "Submit Study":(isSubmitted? "Approve Study": (isApproved? "Activate Study" :(isActive ? "Suspend Study" : (isEditMode ? "Update Study" : "Save as Draft"))))}
  cancelText={isSubmitted ? "Return Study" : (isActive ? "Close Study" : "Clear")}
>
  {/* Study Information Header */}
  <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
    Study Information
  </div>

  <div className="space-y-2">
    <Label>Study Code <span className="text-red-500">*</span></Label>
    <Input value={formData.studyCode}
     readOnly
     disabled={isViewMode} />
     {errors.studyCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyCode}
            </p>
          )}
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
    {errors.studyTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyTitle}
            </p>
          )}
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
    {errors.studyType && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyType}
            </p>
          )}
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
    {errors.studyDescription && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyDescription}
            </p>
          )}
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
    {errors.studyPhase && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyPhase}
            </p>
          )}
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
        <SelectItem value="USA">
          USA
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

  {/* Protocol Information Header */}
  <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
    Protocol Information
  </div>

  <div className="space-y-2">
    <Label>Protocol Number <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
    {errors.protocolNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolNumber}
            </p>
          )}
  </div>
  <div className="space-y-2">
    <Label>Protocol Title <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
    {errors.protocolTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolTitle}
            </p>
          )}
  </div>
  <div className="space-y-2">
    <Label>Protocol Version <span className="text-red-500">*</span></Label>
    <Input disabled={isViewMode} />
    {errors.protocolVersion && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolVersion}
            </p>
          )}
  </div>
  <div className="space-y-2">
    <Label>Protocol Date <span className="text-red-500">*</span></Label>
    <Input type="date" disabled={isViewMode} />
    {errors.protocolDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.protocolDate}
            </p>
          )}
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
    <Label>IRB Approval Date <span className="text-red-500">*</span></Label>
    <Input type="date" disabled={isViewMode} />
    {errors.irbApprovalDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.irbApprovalDate}
            </p>
          )}
  </div>
  <div className="space-y-2">
  <Label>Amendment Allowed</Label>

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
    <Textarea disabled={isViewMode} />
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
  {errors.studyCoordinator && (
            <p className="text-red-500 text-xs mt-1">
              {errors.studyCoordinator}
            </p>
          )}
</div>

<div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
  Visit Templates
</div>

<div className="col-span-3 overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Visit Code <span className="text-red-500">*</span></th>
        <th className="border p-2">Visit Name </th>
        <th className="border p-2">Visit Type</th>
        <th className="border p-2">Target Day </th>
        <th className="border p-2">Window - </th>
        <th className="border p-2">Window +</th>
        <th className="border p-2">Required Specimen </th>
        <th className="border p-2">Test Codes </th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {visitTemplates.map((_visit: any, index: number) => (
        <tr key={index}>
          <td className="border p-2">
            <Input />
          </td>
          <td className="border p-2">
            <Input />
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Screening">
                  Screening
                </SelectItem>
                <SelectItem value="Baseline">
                  Baseline
                </SelectItem>
                <SelectItem value="Treatment">
                  Treatment
                </SelectItem>
                <SelectItem value="FollowUp">
                  Follow-Up
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Input type="number" />
          </td>

          <td className="border p-2">
            <Input type="number" min="0" />
          </td>

          <td className="border p-2">
            <Input type="number" min="0" />
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Specimen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Blood">
                  Blood
                </SelectItem>
                <SelectItem value="Urine">
                  Urine
                </SelectItem>
                <SelectItem value="Plasma">
                  Plasma
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Test Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBC">
                  CBC
                </SelectItem>
                <SelectItem value="LFT">
                  LFT
                </SelectItem>
                <SelectItem value="PK">
                  PK
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">
                  Active
                </SelectItem>
                <SelectItem value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <button
              type="button"
              onClick={() => removeVisitRow(index)}
              className="text-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    type="button"
    onClick={addVisitRow}
    className="mt-3 px-3 py-2 bg-blue-600 text-white rounded"
  >
    + Add Visit
  </button>
</div>

<div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
  Cohort Configuration
</div>

<div className="col-span-3 overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Cohort Code<span className="text-red-500">*</span></th>
        <th className="border p-2">Cohort Name</th>
        <th className="border p-2">Arm Association</th>
        <th className="border p-2">Description</th>
        <th className="border p-2">Eligibility Criteria</th>
        <th className="border p-2">Enrollment Target</th>
        <th className="border p-2">Dose Level</th>
        <th className="border p-2">Status</th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {cohorts.map((cohort, index) => (
        <tr key={index}>
          <td className="border p-2">
            <Input
              value={cohort.cohortCode}
              onChange={(e) =>
                updateCohort(
                  index,
                  "cohortCode",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Input
              value={cohort.cohortName}
              onChange={(e) =>
                updateCohort(
                  index,
                  "cohortName",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Select
              value={cohort.armAssociation}
              onValueChange={(value) =>
                updateCohort(
                  index,
                  "armAssociation",
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Arm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arm A">
                  Arm A
                </SelectItem>
                <SelectItem value="Arm B">
                  Arm B
                </SelectItem>
                <SelectItem value="Arm C">
                  Arm C
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <textarea
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={cohort.description}
              onChange={(e) =>
                updateCohort(
                  index,
                  "description",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <textarea             
             className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={cohort.eligibilityCriteria}
              onChange={(e) =>
                updateCohort(
                  index,
                  "eligibilityCriteria",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Input
              type="number"
              value={cohort.enrollmentTarget}
              onChange={(e) =>
                updateCohort(
                  index,
                  "enrollmentTarget",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Input
              value={cohort.doseLevel}
              onChange={(e) =>
                updateCohort(
                  index,
                  "doseLevel",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Select
              value={cohort.status}
              onValueChange={(value) =>
                updateCohort(index, "status", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">
                  Active
                </SelectItem>
                <SelectItem value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <button
              type="button"
              onClick={() => removeCohortRow(index)}
              className="text-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    type="button"
    onClick={addCohortRow}
    className="mt-3 px-3 py-2 bg-blue-600 text-white rounded"
  >
    + Add Cohort
  </button>
</div>
</FormWrapper>
  );
}