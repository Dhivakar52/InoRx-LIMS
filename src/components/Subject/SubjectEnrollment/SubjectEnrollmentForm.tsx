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

export default function SubjectEnrollmentForm() {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Subject Enrollment Data 👉", formData);
  };

  const requiredFields = [
    "studyCode",
    "subjectId",
    "dob",
    "gender",
    "arm",
    "enrollmentStatus",
    "consentVersion",
    "consentTimestamp",
    "consentTakenBy",
    "eligibilityValidated",
  ];

  const isFormValid = requiredFields.every((f) => formData[f]);

  return (

    <FormWrapper
      title="Subject Enrollment Module"
      onSubmit={handleSubmit}
      isValid={isFormValid}>
      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Subject Information
      </div>
      <div className="space-y-2 ">
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
      <div className="space-y-2 ">
        <Label>Subject ID</Label>
        <Input
          onChange={(e) => handleChange("subjectId", e.target.value)}/>
      </div>
      <div className="space-y-2 ">
        <Label>DOB *</Label>
        <Input
          type="date"
          onChange={(e) => handleChange("dob", e.target.value)}/>
      </div>
      <div className="space-y-2 ">
        <Label>Gender </Label>
        <Select
          value={formData.gender || ""}
          onValueChange={(v) => handleChange("gender", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 ">
        <Label>Age</Label>
        <Input
          disabled
          placeholder="Auto Generated"
          value={formData.age || ""}/>
      </div>
     <div className="space-y-2 ">
        <Label>Arm/Cohort</Label>
        <Select
          value={formData.arm || ""}
          onValueChange={(v) => handleChange("arm", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Arm" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Arm A">Arm A</SelectItem>
            <SelectItem value="Arm B">Arm B</SelectItem>
            <SelectItem value="Arm C">Arm C</SelectItem>
          </SelectContent>
        </Select>
      </div>
     <div className="space-y-2 ">
        <Label>Enrollment Status</Label>
        <Select
          value={formData.enrollmentStatus || ""}
          onValueChange={(v) => handleChange("enrollmentStatus", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Enrollment Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border z-50">
            <SelectItem value="Enrolled">Enrolled</SelectItem>
            <SelectItem value="Screening">Screening</SelectItem>
            <SelectItem value="Withdrawn">Withdrawn</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Consent Details
      </div>
      <div className="space-y-2 ">
        <Label>Consent Version </Label>
        <Input
          onChange={(e) =>
            handleChange("consentVersion", e.target.value)
          }/>
      </div>
      <div className="space-y-2 ">
        <Label>Consent Timestamp *</Label>
        <Input
          type="date"
          onChange={(e) =>
            handleChange("consentTimestamp", e.target.value)
          }/>
      </div>
      <div className="space-y-2 ">
        <Label>Consent Taken By</Label>
        <Input
          onChange={(e) =>
            handleChange("consentTakenBy", e.target.value)
          }/>
      </div>
      <div className="space-y-2 ">
        <Label>Consent Document</Label>
        <Input type="file" />
      </div>
      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Eligibility Details
      </div>
      <div className="space-y-2 ">
        <Label>Eligibility Validated</Label>
        <Select
          value={formData.eligibilityValidated || ""}
          onValueChange={(v) => handleChange("eligibilityValidated", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Eligibility" />
          </SelectTrigger>

          <SelectContent className="bg-white border z-50">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 ">
        <Label>Screening Status</Label>
        <Input
          onChange={(e) =>
            handleChange("screeningStatus", e.target.value)
          }/>
      </div>
      <div className="space-y-2 ">
        <Label>Screening Failure</Label>
        <Input
          onChange={(e) =>
            handleChange("screeningFailure", e.target.value)
          }/>
      </div>
      <div className="space-y-2 col-span-3">
        <Label>Medical Remarks</Label>
        <textarea
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            onChange={(e) =>
            handleChange("medicalRemarks", e.target.value)
            }
            placeholder="Enter medical remarks"/>
        </div>
    </FormWrapper>
  );
}