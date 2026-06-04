"use client";

import { Plus, Trash2 } from "lucide-react";

interface Props {
  form: any;
  setForm: any;
}

export default function TestPanelGrid({
  form,
  setForm,
}: Props) {
  const addTest = () => {
    const test = {
      id: Date.now(),
      testCode: "",
      testName: "",
      category: "",
      mandatory: true,
      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      tests: [
        ...prev.tests,
        test,
      ],
    }));
  };

  const updateTest = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [...form.tests];

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
      tests: updated,
    }));
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold">
          Test Panel Configuration
        </h3>

        <button
          onClick={addTest}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex gap-2">

          <Plus size={16} />
          Add Test
        </button>
      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">
              Test Code
            </th>

            <th className="p-3">
              Test Name
            </th>

            <th className="p-3">
              Category
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
          {form.tests
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
                        row.testCode
                      }
                      onChange={(e) =>
                        updateTest(
                          index,
                          "testCode",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md h-9 px-2"
                    />
                  </td>

                  <td className="p-2">
                    <input
                      value={
                        row.testName
                      }
                      onChange={(e) =>
                        updateTest(
                          index,
                          "testName",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md h-9 px-2"
                    />
                  </td>

                  <td className="p-2">
                    <input
                      value={
                        row.category
                      }
                      onChange={(e) =>
                        updateTest(
                          index,
                          "category",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md h-9 px-2"
                    />
                  </td>

                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={
                        row.mandatory
                      }
                      onChange={(e) =>
                        updateTest(
                          index,
                          "mandatory",
                          e.target
                            .checked
                        )
                      }
                    />
                  </td>

                  <td className="text-center">
                    <Trash2
                      size={18}
                      className="text-red-500 cursor-pointer"
                    />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}