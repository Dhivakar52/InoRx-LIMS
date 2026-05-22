// src/components/VisitModule/VisitForm.tsx
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

export default function VisitForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.visitId || !formData.subject || !formData.visitName) {
      Swal.fire("Error!", "Please fill all required fields.", "error");
      return;
    }
    console.log("Final Data:", formData);
    Swal.fire("Success!", "Visit has been added successfully.", "success");
    navigate("/visit");
  };

  return (
    <FormWrapper title="Visit Information" onSubmit={handleSubmit}>
      {/* Visit ID */}
      <div className="space-y-2">
        <Label>Visit ID *</Label>
        <Input 
          placeholder="Enter Visit ID" 
          onChange={(e) => handleChange("visitId", e.target.value)} 
        />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label>Subject *</Label>
        <Input 
          placeholder="Enter Subject" 
          onChange={(e) => handleChange("subject", e.target.value)} 
        />
      </div>

      {/* Visit Name */}
      <div className="space-y-2">
        <Label>Visit Name *</Label>
        <Input 
          placeholder="Enter Visit Name" 
          onChange={(e) => handleChange("visitName", e.target.value)} 
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status *</Label>
        <Select onValueChange={(v) => handleChange("status", v)}>
          <SelectTrigger className="w-full bg-white border">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border">
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FormWrapper>
  );
}