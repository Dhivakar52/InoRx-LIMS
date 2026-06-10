import { Input } from "../../ui/input";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";


const initialArm = [
  {
    armCode: "",
    armName: ""
  },
];
export default function StudyArms() {

const [arm, setArm] = useState(initialArm);


  const addArmRow = () => {
  setArm([
    ...arm,
    {
      armCode: "",
      armName: "",
    },
  ]);
};

const removeArmRow = (index: number) => {
  setArm(arm.filter((_, i) => i !== index));
};

const updateArm = (
  index: number,
  field: string,
  value: string
) => {
  const updated = [...arm];
  updated[index] = {
    ...updated[index],
    [field]: value,
  };
  setArm(updated);
};
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Study Arms & Group Setup
        </h2>
      </div>

      <div className="flex justify-end">
        <button
          onClick={addArmRow}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">

          <Plus size={16} />

          Add Treatment Arm
        </button>
        </div>
<div className="col-span-3 overflow-x-auto">
  <table className="w-full border">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2">Arm Code<span className="text-red-500">*</span></th>
        <th className="border p-2">Arm Name<span className="text-red-500" >*</span></th>
        <th className="border p-2">Action</th>
      </tr>
    </thead>

    <tbody>
      {arm.map((arm, index) => (
        <tr key={index}>
          <td className="border p-2">
            <Input
              value={arm.armCode}
              onChange={(e) =>
                updateArm(
                  index,
                  "armCode",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2">
            <Input
              value={arm.armName}
              onChange={(e) =>
                updateArm(
                  index,
                  "armName",
                  e.target.value
                )
              }
            />
          </td>

          <td className="border p-2 text-center align-middle">
            <button
              type="button"
              onClick={() => removeArmRow(index)}
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