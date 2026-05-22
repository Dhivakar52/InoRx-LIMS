"use client";

import { useState } from "react";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";

import FormWrapper from "../../../common/FormWrapper";

export default function AdverseEventTrackingForm() {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Adverse Event Data 👉", formData);
  };

  const requiredFields = [
    "studyCode",
    "subjectId",
    "adverseEventId",
    "eventDescription",
    "onsetDate",
    "severityLevel",
  ];

  const isFormValid = requiredFields.every((f) => formData[f]);

  return (
    <FormWrapper
      title="Adverse Event Tracking Module"
      onSubmit={handleSubmit}
      isValid={isFormValid}>
      
      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Event Information
      </div>
      <div className="space-y-2">
        <Label>Study Code *</Label>
        <Select
          value={formData.studyCode || ""}
          onValueChange={(v) => handleChange("studyCode", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Study Code" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="SC001">SC001</SelectItem>
            <SelectItem value="SC002">SC002</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Subject ID *</Label>
        <Select
          value={formData.subjectId || ""}
          onValueChange={(v) => handleChange("subjectId", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Subject ID" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="SUB001">SUB001</SelectItem>
            <SelectItem value="SUB002">SUB002</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Adverse Event ID *</Label>
        <Input
          disabled
          placeholder="Auto Generated"
          value={formData.adverseEventId || "AE-0001"}/>
      </div>
    <div className="space-y-2">
        <Label>Event Category</Label>
        <Input
          disabled
          placeholder="Auto Generated"
          value={formData.eventCategory || "Adverse Event"}/>
      </div>
      <div className="space-y-2">
        <Label>Onset Date *</Label>
        <Input
          type="date"
          onChange={(e) =>
            handleChange("onsetDate", e.target.value)
          } />
      </div>
      <div className="space-y-2">
        <Label>Resolution Date</Label>
        <Input
          type="date"
          onChange={(e) =>
            handleChange("resolutionDate", e.target.value)
          }/>
      </div>
      <div className="space-y-2 col-span-3">
        <Label>Event Description *</Label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Enter event description"
          onChange={(e) =>
            handleChange("eventDescription", e.target.value)
          }/>
      </div>
      <div className="col-span-3 font-semibold text-lg mt-6 text-[#00458F] pb-2">
        Severity Assessment
      </div>
      <div className="space-y-2">
        <Label>Severity Level *</Label>
        <Select
          value={formData.severityLevel || ""}
          onValueChange={(v) =>
            handleChange("severityLevel", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Severity" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Mild">Mild</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
            <SelectItem value="Severe">Severe</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Serious Event</Label>
        <Select
          value={formData.seriousEvent || ""}
          onValueChange={(v) =>
            handleChange("seriousEvent", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Yes / No" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Expected Event</Label>
        <Select
          value={formData.expectedEvent || ""}
          onValueChange={(v) =>
            handleChange("expectedEvent", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Yes / No" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Causality Assessment</Label>
        <Select
          value={formData.causalityAssessment || ""}
          onValueChange={(v) =>
            handleChange("causalityAssessment", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Assessment" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Related">Related</SelectItem>
            <SelectItem value="Unrelated">Unrelated</SelectItem>
            <SelectItem value="Possible">Possible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Outcome Status</Label>
        <Select
          value={formData.outcomeStatus || ""}
          onValueChange={(v) =>
            handleChange("outcomeStatus", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Outcome" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Recovered">Recovered</SelectItem>
            <SelectItem value="Recovering">Recovering</SelectItem>
            <SelectItem value="Not Recovered">
              Not Recovered
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-3 font-semibold text-lg mt-6 text-[#00458F] pb-2">
        Review Workflow
      </div>
      <div className="space-y-2">
        <Label>Reported By</Label>
        <Input
          onChange={(e) =>
            handleChange("reportedBy", e.target.value)
          }/>
      </div>
      <div className="space-y-2">
        <Label>Investigator Review Status</Label>
        <Select
          value={formData.investigatorReviewStatus || ""}
          onValueChange={(v) =>
            handleChange("investigatorReviewStatus", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Approved">Approved</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Medical Monitor Review</Label>
        <Select
          value={formData.medicalMonitorReview || ""}
          onValueChange={(v) =>
            handleChange("medicalMonitorReview", v) }>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Review" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">Reviewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Final Assessment</Label>
        <Select
          value={formData.finalAssessment || ""}
          onValueChange={(v) =>
            handleChange("finalAssessment", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Assessment" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
            <SelectItem value="Follow-up Required">
              Follow-up Required
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 col-span-3">
        <Label>Review Comment</Label>
        <textarea
          rows={4}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder="Enter review comments"
          onChange={(e) =>
            handleChange("reviewComment", e.target.value)
          }/>
      </div>
    </FormWrapper>
  );
}