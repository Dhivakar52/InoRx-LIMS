import { Input } from "../../ui/input";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";


const initialVisitTemplate = [
  {
    visitName: "",
    visitType: "",
    targetDay: "",
    windowMinus: "",
    windowPlus: "",
    specimens: [],
    testCodes: [],
  },
];
export default function VisitConfigurator() {

const [visitTemplates, setVisitTemplates] = useState(initialVisitTemplate);


  const addVisitRow = () => {
  setVisitTemplates([
    ...visitTemplates,
    {
      visitName: "",
      visitType: "",
      targetDay: "",
      windowMinus: "",
      windowPlus: "",
      specimens: [],
      testCodes: [],
    },
  ]);
};

const removeVisitRow = (index:any) => {
  setVisitTemplates(
    visitTemplates.filter((_, i) => i !== index)
  );
};
// const updateArm = (
//   index: number,
//   field: string,
//   value: string
// ) => {
//   const updated = [...arm];
//   updated[index] = {
//     ...updated[index],
//     [field]: value,
//   };
//   setArm(updated);
// };
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Visit Templates Configurator Grid
        </h2>
      </div>

      <div className="flex justify-end">
        <button
          onClick={addVisitRow}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">

          <Plus size={16} />

          Add Visit Template
        </button>
        </div>

<div className="col-span-3 overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Visit Code <span className="text-red-500">*</span></th>
        <th className="border p-2">Visit Name <span className="text-red-500">*</span></th>
        <th className="border p-2">Visit Type</th>
        <th className="border p-2">Target Day <span className="text-red-500">*</span></th>
        <th className="border p-2">Window - <span className="text-red-500">*</span></th>
        <th className="border p-2">Window +<span className="text-red-500">*</span></th>
        <th className="border p-2">Required Specimen <span className="text-red-500">*</span></th>
        <th className="border p-2">Mapped Tests<span className="text-red-500">*</span></th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {visitTemplates.map((_visit: any, index: number) => (
        <tr key={index}>
          <td className="border p-2">
            <Input />
          </td>
          <td className="border p-2">
            <Input />
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Screening">
                  Screening
                </SelectItem>
                <SelectItem value="Baseline">
                  Baseline
                </SelectItem>
                <SelectItem value="Dosing">
                  Dosing
                </SelectItem>
                <SelectItem value="FollowUp">
                  Follow-Up
                </SelectItem>
                <SelectItem value="EndOfStudy">
                    End of Study
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Input type="number" />
          </td>

          <td className="border p-2">
            <Input type="number" min="0" />
          </td>

          <td className="border p-2">
            <Input type="number" min="0" />
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Specimen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Blood">
                  Blood
                </SelectItem>
                <SelectItem value="Urine">
                  Urine
                </SelectItem>
                <SelectItem value="Plasma">
                  Plasma
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Mapped Tests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBC">
                  CBC
                </SelectItem>
                <SelectItem value="LFT">
                  LFT
                </SelectItem>
                <SelectItem value="PK">
                  PK
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <button
              type="button"
              onClick={() => removeVisitRow(index)}
              className="text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
}