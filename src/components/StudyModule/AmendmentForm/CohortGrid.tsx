"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

interface Props {
  form: any;
  setForm: any;
}

export default function CohortGrid({
  form,
  setForm,
}: Props) {
  const addCohort = () => {
    const newRow = {
      id: Date.now(),

      armCode: "",

      armName: "",

      targetEnrollment: 0,

      status: "ACTIVE",

      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      cohorts: [
        ...prev.cohorts,
        newRow,
      ],
    }));
  };

  const updateRow = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [
      ...form.cohorts,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,

      actionType:
        updated[index].actionType === 1
          ? 1
          : 2,
    };

    setForm((prev: any) => ({
      ...prev,
      cohorts: updated,
    }));
  };

  const removeRow = (
    index: number
  ) => {
    const row =
      form.cohorts[index];

    if (
      row.status ===
      "ACTIVE_SUBJECTS"
    ) {
      alert(
        "Cannot delete active cohort"
      );

      return;
    }

    const updated = [
      ...form.cohorts,
    ];

    if (row.id > 0) {
      updated[index] = {
        ...row,
        actionType: 3,
      };
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({
      ...prev,
      cohorts: updated,
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">
          Cohort Configuration
        </h3>

        <button
          onClick={addCohort}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">

          <Plus size={16} />

          Add Cohort
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                Arm Code
              </th>

              <th className="p-3">
                Arm Name
              </th>

              <th className="p-3">
                Enrollment
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {form.cohorts
              .filter(
                (x: any) =>
                  x.actionType !== 3
              )
              .map(
                (
                  row: any,
                  index: number
                ) => (
                  <tr
                    key={row.id}
                    className="border-t">

                    <td className="p-2">
                      <input
                        value={
                          row.armCode
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "armCode",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-md h-9 px-2"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          row.armName
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "armName",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-md h-9 px-2"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        type="number"
                        value={
                          row.targetEnrollment
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "targetEnrollment",
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                        className="w-full border rounded-md h-9 px-2"
                      />
                    </td>

                    <td className="p-2">
                      <select
                        value={
                          row.status
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-md h-9 px-2">

                        <option>
                          ACTIVE
                        </option>

                        <option>
                          INACTIVE
                        </option>
                      </select>
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() =>
                          removeRow(
                            index
                          )
                        }
                        className="text-red-600">

                        <Trash2
                          size={
                            18
                          }
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}