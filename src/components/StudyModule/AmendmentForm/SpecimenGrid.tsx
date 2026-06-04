"use client";

import { Plus, Trash2 } from "lucide-react";

interface Props {
  form: any;
  setForm: any;
}

export default function SpecimenGrid({
  form,
  setForm,
}: Props) {
  const addSpecimen = () => {
    const specimen = {
      id: Date.now(),
      specimenType: "",
      tubeType: "",
      quantity: 0,
      unit: "mL",
      required: true,
      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      specimens: [
        ...prev.specimens,
        specimen,
      ],
    }));
  };

  const updateRow = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [
      ...form.specimens,
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
      specimens: updated,
    }));
  };

  const deleteRow = (
    index: number
  ) => {
    const updated = [
      ...form.specimens,
    ];

    updated[index].actionType = 3;

    setForm((prev: any) => ({
      ...prev,
      specimens: updated,
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">
          Specimen Configuration
        </h3>

        <button
          onClick={addSpecimen}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">

          <Plus size={16} />
          Add Specimen
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                Specimen Type
              </th>

              <th className="p-3">
                Tube Type
              </th>

              <th className="p-3">
                Quantity
              </th>

              <th className="p-3">
                Unit
              </th>

              <th className="p-3">
                Required
              </th>

              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {form.specimens
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
                          row.specimenType
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "specimenType",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-md h-9 px-2"
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          row.tubeType
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "tubeType",
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
                          row.quantity
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "quantity",
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
                        value={row.unit}
                        onChange={(e) =>
                          updateRow(
                            index,
                            "unit",
                            e.target.value
                          )
                        }
                        className="w-full border rounded-md h-9 px-2">

                        <option>
                          mL
                        </option>

                        <option>
                          µL
                        </option>

                        <option>
                          mg
                        </option>
                      </select>
                    </td>

                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={
                          row.required
                        }
                        onChange={(e) =>
                          updateRow(
                            index,
                            "required",
                            e.target
                              .checked
                          )
                        }
                      />
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() =>
                          deleteRow(
                            index
                          )
                        }>
                        <Trash2
                          size={18}
                          className="text-red-500"
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