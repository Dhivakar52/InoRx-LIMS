"use client";

export interface ReportRow {
  test: string;
  result: string;
  unit: string;
  referenceRange: string;
  status?:string;
}

interface Props {
  title: string;
  rows: ReportRow[];
}

export default function ReportTable({
  title,
  rows,
}: Props) {
  return (
    <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">

      <div className="bg-[#00458F] text-white px-4 py-2 font-semibold">
        {title}
      </div>

      <table className="w-full border-collapse">

        <thead className="bg-gray-100">

          <tr>

            <th className="border p-2 text-left">
              Investigation
            </th>

            <th className="border p-2 text-center">
              Result
            </th>

            <th className="border p-2 text-center">
              Unit
            </th>

            <th className="border p-2 text-center">
              Biological Reference Interval
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50"
            >
              <td className="border p-2">
                {row.test}
              </td>

              <td
                className={`border p-2 text-center font-semibold
                  ${
                    row.status === "HIGH"
                      ? "text-red-600"
                      : row.status === "LOW"
                      ? "text-blue-600"
                      : "text-gray-900"
                  }
                `}
              >
                {row.result}
              </td>

              <td className="border p-2 text-center">
                {row.unit}
              </td>

              <td className="border p-2 text-center">
                {row.referenceRange}
              </td>
            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}