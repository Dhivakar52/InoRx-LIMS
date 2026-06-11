"use client";

import { Plus, Trash2 } from "lucide-react";

interface Cohort {
  id: number;
  armCode: string;
  armName: string;
  actionType: 0 | 1 | 2 | 3;
}

interface Props {
  form: any;
  setForm: any;
}

export default function CohortGrid({ form, setForm }: Props) {
  const addCohort = () => {
    console.log("Add cohort clicked - Current cohorts:", form.cohorts);
    
    const newRow: Cohort = {
      id: Date.now(),
      armCode: "",
      armName: "",
      actionType: 1,
    };

    const updatedCohorts = [...form.cohorts, newRow];
    console.log("Updated cohorts:", updatedCohorts);

    setForm((prev: any) => {
      console.log("Previous form:", prev);
      return {
        ...prev,
        cohorts: updatedCohorts,
      };
    });
  };

  const updateRow = (index: number, field: string, value: string) => {
    const updated = [...form.cohorts];
    updated[index] = {
      ...updated[index],
      [field]: value,
      actionType: updated[index].actionType === 1 ? 1 : 2,
    };
    setForm((prev: any) => ({ ...prev, cohorts: updated }));
  };

  const removeRow = (index: number) => {
    const row = form.cohorts[index];
    const updated = [...form.cohorts];

    if (row.id && row.id.toString().length > 5) {
      updated[index] = { ...row, actionType: 3 };
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({ ...prev, cohorts: updated }));
  };

  const visibleRows = form.cohorts?.filter((x: Cohort) => x.actionType !== 3) || [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-lg">Section 5: Cloned Arms Configuration Workspace</h3>
        <button
          onClick={addCohort}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#003570] transition-colors"
        >
          <Plus size={16} />
          Add Arm
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Arm Code </th>
              <th className="p-3 text-left border-b">Arm Name </th>
              <th className="p-3 text-center border-b w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No arms configured. Click "Add Arm" to create one.
                </td>
              </tr>
            ) : (
              visibleRows.map((row: Cohort, index: number) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.armCode}
                      onChange={(e) => updateRow(index, "armCode", e.target.value)}
                      placeholder="e.g., ARM-A"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.armName}
                      onChange={(e) => updateRow(index, "armName", e.target.value)}
                      placeholder="e.g., Treatment Arm"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeRow(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}