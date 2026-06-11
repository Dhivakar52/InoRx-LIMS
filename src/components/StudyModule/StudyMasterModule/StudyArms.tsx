import { Input } from "../../ui/input";
import { Plus, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { StudyArmData } from "./StudyMasterStepper";

interface Props {
  arm: StudyArmData[];
  setArm: React.Dispatch<React.SetStateAction<StudyArmData[]>>;
  errors: any;
  setErrors: any;
}

export default function StudyArms({
  arm,
  setArm,
  errors,
  setErrors
}: Props) {


const [searchParams] = useSearchParams();
const mode = searchParams.get("mode");
const isViewMode = mode === "view";


const addArmRow = () => {
  setArm((prev) => [
    ...prev,
    {
      armCode: "",
      armName: "",
    },
  ]);
};

const removeArmRow = (index: number) => {
  setArm((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

const updateArm = (
  index: number,
  field: keyof StudyArmData,
  value: string
) => {
  let error = "";

  if (field === "armCode") {
    if (
      value &&
      !/^[a-zA-Z0-9]+$/.test(value)
    ) {
      error = "Only alphanumeric characters allowed";
    }

    setErrors((prev: any) => ({
      ...prev,
      [`armCode_${index}`]: error,
    }));
  }

  setArm((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, [field]: value }
        : item
    )
  );
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
              maxLength={15}
              onChange={(e) =>
                updateArm(
                  index,
                  "armCode",
                  e.target.value
                )
              }
              disabled={isViewMode}
            />
             {errors[`armCode_${index}`] && (
             <p className="text-red-500 text-xs mt-1">
              {errors[`armCode_${index}`]}
            </p>
             )}
          </td>

          <td className="border p-2">
            <Input
              value={arm.armName}
              maxLength={100}
              onChange={(e) =>
                updateArm(
                  index,
                  "armName",
                  e.target.value
                )
              }
              disabled={isViewMode}
            />
            {errors[`armName_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`armName_${index}`]}
            </p>
          )}
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