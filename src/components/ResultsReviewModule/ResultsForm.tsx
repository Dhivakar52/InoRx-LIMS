// src/components/ResultsReviewModule/ResultsForm.tsx
"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../common/FormWrapper";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Swal from "sweetalert2";

export default function ResultsForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subjectId || !formData.testName || !formData.resultValue) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }
    console.log("Final Data:", formData);
    Swal.fire("Success!", "Test result has been added successfully.", "success");
    navigate("/results");
  };

  return (
    <FormWrapper title="Test Result Information" onSubmit={handleSubmit}>
      <div className="space-y-2"><Label>Result ID</Label><Input value="Auto Generated" disabled /></div>
      <div className="space-y-2"><Label>Subject ID *</Label><Input placeholder="Enter Subject ID" onChange={(e) => handleChange("subjectId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Test Name *</Label><Input placeholder="Enter Test Name" onChange={(e) => handleChange("testName", e.target.value)} /></div>
      <div className="space-y-2"><Label>Analyzer ID</Label><Input placeholder="Enter Analyzer ID" onChange={(e) => handleChange("analyzerId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Result Value *</Label><Input placeholder="Enter Result Value" onChange={(e) => handleChange("resultValue", e.target.value)} /></div>
      <div className="space-y-2"><Label>Reference Range</Label><Input placeholder="e.g., 4.5-11.0" onChange={(e) => handleChange("referenceRange", e.target.value)} /></div>
      <div className="space-y-2"><Label>Unit</Label><Input placeholder="e.g., mg/dL" onChange={(e) => handleChange("unit", e.target.value)} /></div>
      <div className="space-y-2"><Label>Collected Date</Label><Input type="date" onChange={(e) => handleChange("collectedDate", e.target.value)} /></div>
      <div className="space-y-2"><Label>Comments</Label><Input placeholder="Add comments" onChange={(e) => handleChange("comments", e.target.value)} /></div>
    </FormWrapper>
  );
}