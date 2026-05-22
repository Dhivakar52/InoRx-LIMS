// src/components/AnalyzerIntegrationModule/AnalyzerForm.tsx
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

export default function AnalyzerForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.analyzerId || !formData.analyzerName || !formData.model) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }
    console.log("Final Data:", formData);
    Swal.fire("Success!", "Analyzer has been added successfully.", "success");
    navigate("/analyzer");
  };

  return (
    <FormWrapper title="Analyzer Information" onSubmit={handleSubmit}>
      <div className="space-y-2"><Label>Analyzer ID *</Label><Input placeholder="Enter Analyzer ID" onChange={(e) => handleChange("analyzerId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Analyzer Name *</Label><Input placeholder="Enter Analyzer Name" onChange={(e) => handleChange("analyzerName", e.target.value)} /></div>
      <div className="space-y-2"><Label>Model *</Label><Input placeholder="Enter Model" onChange={(e) => handleChange("model", e.target.value)} /></div>
      <div className="space-y-2"><Label>Status</Label><Select onValueChange={(v) => handleChange("status", v)}><SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger><SelectContent><SelectItem value="Online">Online</SelectItem><SelectItem value="Offline">Offline</SelectItem><SelectItem value="Maintenance">Maintenance</SelectItem><SelectItem value="Calibrating">Calibrating</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Last Calibration</Label><Input type="date" onChange={(e) => handleChange("lastCalibration", e.target.value)} /></div>
      <div className="space-y-2"><Label>Total Tests</Label><Input type="number" placeholder="0" onChange={(e) => handleChange("totalTests", e.target.value)} /></div>
      <div className="space-y-2"><Label>Integration Date</Label><Input type="date" onChange={(e) => handleChange("integrationDate", e.target.value)} /></div>
    </FormWrapper>
  );
}