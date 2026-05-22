import { useState } from "react";
import FormWrapper from "../../../common/FormWrapper";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";

export default function AddInventoryForm() {
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
      title="Add Inventory"
      onSubmit={handleSubmit}
    > 
       {/* Item */}
        <div className="space-y-2">
          <Label>Item </Label>
          <Input placeholder="Enter item name" onChange={(e) => handleChange("itemName", e.target.value)} />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category </Label>
          <Input placeholder="Enter category" onChange={(e) => handleChange("category", e.target.value)} />
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label>Quantity</Label>
          <Input 
            type="number"
            min="0"
            placeholder="Enter quantity"
            onChange={(e) => handleChange("quantity", e.target.value)} />
        </div>

        {/* Supplier */}
        <div className="space-y-2">
          <Label>Supplier</Label>
          <Input placeholder="Enter supplier" onChange={(e) => handleChange("supplier", e.target.value)} />
        </div>
        
        {/* Status */}
         <div className="space-y-2">
          <Label>Status</Label>
          <Select onValueChange={(v) => handleChange("status", v)}>
            <SelectTrigger className="w-full bg-white border">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              position="popper"
              className="bg-white border"
            >
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
    </FormWrapper>
  );
}