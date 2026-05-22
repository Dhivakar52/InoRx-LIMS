// src/components/FinalQCApprovalModule/QcForm.tsx
"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../common/FormWrapper";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import Swal from "sweetalert2";

export default function QcForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.testName || !formData.observedValue) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }
    console.log("Final Data:", formData);
    Swal.fire("Success!", "QC record has been added successfully.", "success");
    navigate("/qc");
  };

  return (
    <FormWrapper title="QC Record Information" onSubmit={handleSubmit}>
      <div className="space-y-2"><Label>QC ID</Label><Input value="Auto Generated" disabled /></div>
      <div className="space-y-2"><Label>Batch ID</Label><Input placeholder="Enter Batch ID" onChange={(e) => handleChange("batchId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Subject ID</Label><Input placeholder="Enter Subject ID" onChange={(e) => handleChange("subjectId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Test Name *</Label><Input placeholder="Enter Test Name" onChange={(e) => handleChange("testName", e.target.value)} /></div>
      <div className="space-y-2"><Label>QC Type</Label><Select onValueChange={(v) => handleChange("qcType", v)}><SelectTrigger><SelectValue placeholder="Select QC Type" /></SelectTrigger><SelectContent><SelectItem value="Daily">Daily</SelectItem><SelectItem value="Weekly">Weekly</SelectItem><SelectItem value="Monthly">Monthly</SelectItem><SelectItem value="Lot Change">Lot Change</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Control Level</Label><Select onValueChange={(v) => handleChange("controlLevel", v)}><SelectTrigger><SelectValue placeholder="Select Control Level" /></SelectTrigger><SelectContent><SelectItem value="Low">Low</SelectItem><SelectItem value="Normal">Normal</SelectItem><SelectItem value="High">High</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Observed Value *</Label><Input placeholder="Enter Observed Value" onChange={(e) => handleChange("observedValue", e.target.value)} /></div>
      <div className="space-y-2"><Label>Expected Range</Label><Input placeholder="e.g., 4.8-5.2" onChange={(e) => handleChange("expectedRange", e.target.value)} /></div>
      <div className="space-y-2"><Label>QC Technician</Label><Input placeholder="Enter Technician Name" onChange={(e) => handleChange("qcTechnician", e.target.value)} /></div>
      <div className="space-y-2"><Label>Comments</Label><Input placeholder="Add comments" onChange={(e) => handleChange("comments", e.target.value)} /></div>
    </FormWrapper>
  );
}