"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

interface Props {
  form: any;
  setForm: any;
}

export default function VisitScheduleGrid({
  form,
  setForm,
}: Props) {
  const addVisit = () => {
    const visit = {
      id: Date.now(),

      visitName: "",

      visitDay: 0,

      deviationWindow: 0,

      mandatory: true,

      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      visits: [
        ...prev.visits,
        visit,
      ],
    }));
  };

  const updateVisit = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [
      ...form.visits,
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
      visits: updated,
    }));
  };

  const deleteVisit = (
    index: number
  ) => {
    const updated = [
      ...form.visits,
    ];

    const row =
      updated[index];

    if (row.id > 0) {
      row.actionType = 3;
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({
      ...prev,
      visits: updated,
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">
          Visit Schedule
        </h3>

        <button
          onClick={addVisit}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex gap-2 items-center">

          <Plus size={16} />

          Add Visit
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                Visit Name
              </th>

              <th className="p-3">
                Day
              </th>

              <th className="p-3">
                Window
              </th>

              <th className="p-3">
                Mandatory
              </th>

              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {form.visits
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
                          row.visitName
                        }
                        onChange={(e) =>
                          updateVisit(
                            index,
                            "visitName",
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
                          row.visitDay
                        }
                        onChange={(e) =>
                          updateVisit(
                            index,
                            "visitDay",
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
                      <input
                        type="number"
                        value={
                          row.deviationWindow
                        }
                        onChange={(e) =>
                          updateVisit(
                            index,
                            "deviationWindow",
                            Number(
                              e.target
                                .value
                            )
                          )
                        }
                        className="w-full border rounded-md h-9 px-2"
                      />
                    </td>

                    <td className="p-2 text-center">
                      <input
                        type="checkbox"
                        checked={
                          row.mandatory
                        }
                        onChange={(e) =>
                          updateVisit(
                            index,
                            "mandatory",
                            e.target
                              .checked
                          )
                        }
                      />
                    </td>

                    <td className="p-2">
                      <button
                        onClick={() =>
                          deleteVisit(
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