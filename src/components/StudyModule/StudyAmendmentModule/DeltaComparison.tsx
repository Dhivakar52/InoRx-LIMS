import { Download, Info } from "lucide-react";

export default function DeltaComparison() {
  const deltaData = [
    {
      element: "Visit 3 Target Day",
      oldValue: "Day 14 (+/- 1 day)",
      newValue: "Day 15 (+/- 2 days)",
      status: "Modified",
    },
    {
      element: "Visit 3 Specimen Tube",
      oldValue: "EDTA Lavender-top Tube",
      newValue: "Serum Separator Tube (SST)",
      status: "Modified",
    },
    {
      element: "Cohort C (High Dose)",
      oldValue: "Not Configured",
      newValue: "Added Cohort C with 20 subjects target",
      status: "Added",
    },
    {
      element: "Visit 1 Test Menu",
      oldValue: "CBC, CMP, Lipid Panel",
      newValue: "CBC, CMP",
      status: "Deleted",
    },
  ];

  function getStatusStyle(status: string) {
    switch (status) {
      case "Added":
        return "bg-green-100 text-green-800";
      case "Modified":
        return "bg-orange-100 text-orange-800";
      case "Deleted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="bg-white border rounded-lg p-5">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">
            Comparison Summary
          </h3>

          <div className="flex gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Added (1)
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-400" />
              Modified (2)
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Deleted (1)
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-blue-600 hover:bg-blue-50">
          <Download size={16} />
          Export Delta Report
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-4 text-left">
                Configuration Element
              </th>

              <th className="border p-4 text-left">
                Version 1.0 (Active)
              </th>

              <th className="border p-4 text-left">
                Version 2.0 (Draft)
              </th>

              <th className="border p-4 w-36"></th>
            </tr>
          </thead>

          <tbody>
            {deltaData.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-4">
                  {item.element}
                </td>

                <td
                  className={`border p-4 ${
                    item.status === "Modified"
                      ? "bg-orange-50"
                      : ""
                  }`}
                >
                  {item.oldValue}
                </td>

                <td
                  className={`border p-4 ${
                    item.status === "Added"
                      ? "bg-green-50"
                      : item.status === "Modified"
                      ? "bg-orange-50"
                      : "bg-red-50"
                  }`}
                >
                  {item.newValue}
                </td>

                <td className="border p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-6 border-t pt-4 flex items-center gap-2 text-sm text-gray-600">
        <Info
          size={16}
          className="text-blue-600"
        />

        Delta comparison shows configuration differences
        between Version 1.0 (Active) and Version 2.0
        (Draft).
      </div>
    </div>
  );
}