"use client";

import {
  FileSpreadsheet,
  Printer,
} from "lucide-react";

interface Props {
  form: any;
}

export default function KitReconciliation({
  form,
}: Props) {

  return (
    <div className="space-y-6">

      <div className="flex justify-between">

        <div>
          <h2 className="text-xl font-semibold text-[#00458F]">
            Kit Reconciliation
          </h2>

          <p className="text-sm text-gray-500">
            Review impacted kits
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border px-4 py-2 rounded-md flex gap-2 items-center">
            <Printer size={16} />
            Print
          </button>

          <button className="bg-[#00458F] text-white px-4 py-2 rounded-md flex gap-2 items-center">
            <FileSpreadsheet
              size={16}
            />
            Export
          </button>

        </div>

      </div>

      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">
              Batch No
            </th>

            <th className="p-3">
              Kit Type
            </th>

            <th className="p-3">
              Version
            </th>

            <th className="p-3">
              Quantity
            </th>

            <th className="p-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {form.kits.map(
            (row: any) => (
              <tr
                key={row.id}
                className="border-t">

                <td className="p-3">
                  {row.batchNo}
                </td>

                <td className="p-3">
                  {row.kitType}
                </td>

                <td className="p-3">
                  {row.version}
                </td>

                <td className="p-3">
                  {row.quantity}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      row.status ===
                      "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : row.status ===
                          "OBSOLETE"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}>

                    {row.status}
                  </span>

                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

    </div>
  );
}