"use client";

import { getDeltaRows }
  from "../../../dataTypes/AmendmentDeltaHelper";

interface Props {
  form: any;
}

export default function DeltaReport({
  form,
}: Props) {

  const deltaRows = [
    ...getDeltaRows(
      form.cohorts,
      "Cohort"
    ),

    ...getDeltaRows(
      form.visits,
      "Visit"
    ),

    ...getDeltaRows(
      form.specimens,
      "Specimen"
    ),

    ...getDeltaRows(
      form.tests,
      "Test Panel"
    ),
  ];

  const added =
    deltaRows.filter(
      (x) =>
        x.changeType ===
        "Added"
    ).length;

  const modified =
    deltaRows.filter(
      (x) =>
        x.changeType ===
        "Modified"
    ).length;

  const deleted =
    deltaRows.filter(
      (x) =>
        x.changeType ===
        "Deleted"
    ).length;

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded-lg p-5 bg-green-50">
          <div className="text-sm text-gray-500">
            Added
          </div>

          <div className="text-2xl font-bold text-green-600">
            {added}
          </div>
        </div>

        <div className="border rounded-lg p-5 bg-blue-50">
          <div className="text-sm text-gray-500">
            Modified
          </div>

          <div className="text-2xl font-bold text-blue-600">
            {modified}
          </div>
        </div>

        <div className="border rounded-lg p-5 bg-red-50">
          <div className="text-sm text-gray-500">
            Deleted
          </div>

          <div className="text-2xl font-bold text-red-600">
            {deleted}
          </div>
        </div>

      </div>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">
              Entity
            </th>

            <th className="p-3">
              Name
            </th>

            <th className="p-3">
              Change Type
            </th>
          </tr>
        </thead>

        <tbody>
          {deltaRows.map(
            (
              row,
              index
            ) => (
              <tr
                key={index}
                className="border-t">

                <td className="p-3">
                  {row.entity}
                </td>

                <td className="p-3">
                  {row.name}
                </td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs
                    ${
                      row.changeType ===
                      "Added"
                        ? "bg-green-100 text-green-700"
                        : row.changeType ===
                          "Modified"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}>

                    {row.changeType}
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