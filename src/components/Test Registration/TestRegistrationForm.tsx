"use client";

import { useState } from "react";
import { Input } from "./../ui/input";
import { Label } from "./../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./../ui/select";

import FormWrapper from "./../../common/FormWrapper";

export default function TestRegistrationForm() {
  const [formData, setFormData] = useState<any>({
    status: "Pending",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Test Registration Data 👉", formData);
  };

  const requiredFields = [
    "studyCode",
    "subjectId",
    "visitName",
    "testName",
    "scheduledDate",
    "status",
  ];

  const isFormValid = requiredFields.every(
    (field) => formData[field]
  );

  return (
    <FormWrapper
      title="Test Registration Form"
      onSubmit={handleSubmit}
      isValid={isFormValid}
    >
      {/* Study Code */}
      <div className="space-y-2">
        <Label>Study Code *</Label>
        <Select
          value={formData.studyCode || ""}
          onValueChange={(v) => handleChange("studyCode", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Study Code" />
          </SelectTrigger>
        <SelectContent
        position="popper"
        sideOffset={4}
        className="z-50 bg-white"
        >
            <SelectItem value="ST001">ST001</SelectItem>
            <SelectItem value="ST002">ST002</SelectItem>
            <SelectItem value="ST003">ST003</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subject ID */}
      <div className="space-y-2">
        <Label>Subject ID *</Label>
        <Input
          value={formData.subjectId || ""}
          onChange={(e) =>
            handleChange("subjectId", e.target.value)
          }
        />
      </div>

      {/* Subject Name */}
      <div className="space-y-2">
        <Label>Subject Name</Label>
        <Input
          value={formData.subjectName || ""}
          onChange={(e) =>
            handleChange("subjectName", e.target.value)
          }
        />
      </div>

      {/* Visit */}
      <div className="space-y-2">
        <Label>Visit *</Label>
        <Select
          value={formData.visitName || ""}
          onValueChange={(v) => handleChange("visitName", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Visit" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            sideOffset={4}
            className="z-50 bg-white"
            >
            <SelectItem value="Screening">Screening</SelectItem>
            <SelectItem value="Baseline">Baseline</SelectItem>
            <SelectItem value="Follow Up 1">
              Follow Up 1
            </SelectItem>
            <SelectItem value="Follow Up 2">
              Follow Up 2
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Test Name */}
      <div className="space-y-2">
        <Label>Test Name *</Label>
        <Input
          value={formData.testName || ""}
          onChange={(e) =>
            handleChange("testName", e.target.value)
          }
        />
      </div>

      {/* Test Type */}
      <div className="space-y-2">
        <Label>Test Type</Label>
        <Select
          value={formData.testType || ""}
          onValueChange={(v) => handleChange("testType", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Test Type" />
          </SelectTrigger>
         <SelectContent
            position="popper"
            sideOffset={4}
            className="z-50 bg-white"
            >
            <SelectItem value="Laboratory">
              Laboratory
            </SelectItem>
            <SelectItem value="Radiology">
              Radiology
            </SelectItem>
            <SelectItem value="Cardiology">
              Cardiology
            </SelectItem>
            <SelectItem value="Vital Signs">
              Vital Signs
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Scheduled Date */}
      <div className="space-y-2">
        <Label>Scheduled Date *</Label>
        <Input
          type="date"
          value={formData.scheduledDate || ""}
          onChange={(e) =>
            handleChange("scheduledDate", e.target.value)
          }
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status *</Label>
        <Select
          value={formData.status || ""}
          onValueChange={(v) => handleChange("status", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
         <SelectContent
            position="popper"
            sideOffset={4}
            className="z-50 bg-white"
            >
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Result Status */}
      <div className="space-y-2">
        <Label>Result Status</Label>
        <Select
          value={formData.resultStatus || ""}
          onValueChange={(v) =>
            handleChange("resultStatus", v)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Result Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Awaiting">
              Awaiting
            </SelectItem>
            <SelectItem value="Reviewed">
              Reviewed
            </SelectItem>
            <SelectItem value="Approved">
              Approved
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Remarks */}
      <div className="space-y-2 col-span-3">
        <Label>Remarks</Label>
        <Input
          value={formData.remarks || ""}
          onChange={(e) =>
            handleChange("remarks", e.target.value)
          }
          placeholder="Enter remarks"
        />
      </div>
    </FormWrapper>
  );
}