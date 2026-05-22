// src/components/BiobankModule/BiobankForm.tsx
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

export default function BiobankForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subjectId || !formData.storageLocation || !formData.expiryDate) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }
    console.log("Final Data:", formData);
    Swal.fire("Success!", "Sample has been added successfully.", "success");
    navigate("/biobank");
  };

  return (
    <FormWrapper title="Biobank Sample Information" onSubmit={handleSubmit}>
      <div className="space-y-2"><Label>Sample ID</Label><Input value="Auto Generated" disabled /></div>
      <div className="space-y-2"><Label>Subject ID *</Label><Input placeholder="Enter Subject ID" onChange={(e) => handleChange("subjectId", e.target.value)} /></div>
      <div className="space-y-2"><Label>Sample Type</Label><Select onValueChange={(v) => handleChange("sampleType", v)}><SelectTrigger><SelectValue placeholder="Select Sample Type" /></SelectTrigger><SelectContent><SelectItem value="Blood">Blood</SelectItem><SelectItem value="Serum">Serum</SelectItem><SelectItem value="Plasma">Plasma</SelectItem><SelectItem value="Urine">Urine</SelectItem><SelectItem value="Tissue">Tissue</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Collection Date</Label><Input type="date" onChange={(e) => handleChange("collectionDate", e.target.value)} /></div>
      <div className="space-y-2"><Label>Storage Location *</Label><Input placeholder="e.g., Freezer A1" onChange={(e) => handleChange("storageLocation", e.target.value)} /></div>
      <div className="space-y-2"><Label>Temperature</Label><Input placeholder="-80°C" onChange={(e) => handleChange("temperature", e.target.value)} /></div>
      <div className="space-y-2"><Label>Quantity</Label><Input type="number" placeholder="1" onChange={(e) => handleChange("quantity", e.target.value)} /></div>
      <div className="space-y-2"><Label>Unit</Label><Select onValueChange={(v) => handleChange("unit", v)}><SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger><SelectContent><SelectItem value="mL">mL</SelectItem><SelectItem value="g">g</SelectItem><SelectItem value="mg">mg</SelectItem></SelectContent></Select></div>
      <div className="space-y-2"><Label>Expiry Date *</Label><Input type="date" onChange={(e) => handleChange("expiryDate", e.target.value)} /></div>
    </FormWrapper>
  );
}