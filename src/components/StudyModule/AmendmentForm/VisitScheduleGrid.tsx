"use client";

import { Plus, Trash2 } from "lucide-react";

interface Visit {
  id: number;
  visitCode: string;
  visitName: string;
  targetDay: string;
  windowMinus: string;
  windowPlus: string;
  actionType: 0 | 1 | 2 | 3;
}

interface Props {
  form: any;
  setForm: any;
}

export default function VisitScheduleGrid({ form, setForm }: Props) {
  const addVisit = () => {
    console.log("Add visit clicked - Current visits:", form.visits);
    
    const newRow: Visit = {
      id: Date.now(),
      visitCode: "",
      visitName: "",
      targetDay: "",
      windowMinus: "",
      windowPlus: "",
      actionType: 1,
    };

    const updatedVisits = [...form.visits, newRow];
    console.log("Updated visits:", updatedVisits);

    setForm((prev: any) => ({
      ...prev,
      visits: updatedVisits,
    }));
  };

  const updateRow = (index: number, field: string, value: string) => {
    const updated = [...form.visits];
    updated[index] = {
      ...updated[index],
      [field]: value,
      actionType: updated[index].actionType === 1 ? 1 : 2,
    };
    setForm((prev: any) => ({ ...prev, visits: updated }));
  };

  const removeRow = (index: number) => {
    const row = form.visits[index];
    const updated = [...form.visits];

    if (row.id && row.id.toString().length > 5) {
      updated[index] = { ...row, actionType: 3 };
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({ ...prev, visits: updated }));
  };

  const visibleRows = form.visits?.filter((x: Visit) => x.actionType !== 3) || [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-lg">Section 5: Cloned Visits Configuration Workspace</h3>
        <button
          onClick={addVisit}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#003570] transition-colors"
        >
          <Plus size={16} />
          Add Visit
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Visit Code </th>
              <th className="p-3 text-left border-b">Visit Name </th>
              <th className="p-3 text-left border-b">Target Day </th>
              <th className="p-3 text-left border-b">Window - </th>
              <th className="p-3 text-left border-b">Window +   </th>
              <th className="p-3 text-center border-b w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No visits configured. Click "Add Visit" to create one.
                </td>
              </tr>
            ) : (
              visibleRows.map((row: Visit, index: number) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.visitCode}
                      onChange={(e) => updateRow(index, "visitCode", e.target.value)}
                      placeholder="e.g., SCR"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.visitName}
                      onChange={(e) => updateRow(index, "visitName", e.target.value)}
                      placeholder="e.g., Screening"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.targetDay}
                      onChange={(e) => updateRow(index, "targetDay", e.target.value)}
                      placeholder="e.g., -7"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.windowMinus}
                      onChange={(e) => updateRow(index, "windowMinus", e.target.value)}
                      placeholder="e.g., 3"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.windowPlus}
                      onChange={(e) => updateRow(index, "windowPlus", e.target.value)}
                      placeholder="e.g., 3"
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