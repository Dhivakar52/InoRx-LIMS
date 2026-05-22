import { useState } from "react";
import FormWrapper from "../../../common/FormWrapper";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";


export default function AddUserForm() {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Final Data:", formData);
  };

  return (
    <FormWrapper
      title="Add User"
      onSubmit={handleSubmit}
    >
       {/* Name */}
        <div className="space-y-2">
          <Label>Name </Label>
          <Input placeholder="Enter name" onChange={(e) => handleChange("name", e.target.value)} />
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label>Age </Label>
          <Input 
          type="number"
            min="0"
            placeholder="Enter age"
          onChange={(e) => handleChange("age", e.target.value)} />
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input placeholder="Enter email" onChange={(e) => handleChange("email", e.target.value)} />
        </div>

         {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Input placeholder="Enter location" onChange={(e) => handleChange("location", e.target.value)} />
        </div>

        {/* Blood Group */}
        <div className="space-y-2">
          <Label>Blood Group</Label>
          <Input placeholder="Enter blood group" onChange={(e) => handleChange("bloodgroup", e.target.value)} />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input placeholder="Enter phone number" onChange={(e) => handleChange("phonenumber", e.target.value)} />
        </div>
    </FormWrapper>
  );
}