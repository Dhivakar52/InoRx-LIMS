"use client";

// Hardcoded data matching the image exactly
const deltaRows = [
  {
    entity: "Visit 3 Target Day",
    oldValue: "Day 14 (+/- 1 day)",
    newValue: "Day 15 (+/- 2 days)",
    changeType: "Modified"
  },
  {
    entity: "Visit 3 Specimen Tube",
    oldValue: "EDTA Lavender-top Tube",
    newValue: "Serum Separator Tube (SST)",
    changeType: "Modified"
  },
  {
    entity: "Cohort C (High Dose)",
    oldValue: "Not Configured",
    newValue: "Added Cohort C with 20 subjects target",
    changeType: "Added"
  },
  {
    entity: "Visit 1 Test Menu",
    oldValue: "CBC, CMP, Lipid Panel",
    newValue: "CBC, CMP",
    changeType: "Deleted"
  }
];

export default function DeltaReport() {
  const added = deltaRows.filter((x) => x.changeType === "Added").length;
  const modified = deltaRows.filter((x) => x.changeType === "Modified").length;
  const deleted = deltaRows.filter((x) => x.changeType === "Deleted").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-5 bg-green-50">
          <div className="text-sm text-gray-500">Added</div>
          <div className="text-2xl font-bold text-green-600">{added}</div>
        </div>
        <div className="border rounded-lg p-5 bg-blue-50">
          <div className="text-sm text-gray-500">Modified</div>
          <div className="text-2xl font-bold text-blue-600">{modified}</div>
        </div>
        <div className="border rounded-lg p-5 bg-red-50">
          <div className="text-sm text-gray-500">Deleted</div>
          <div className="text-2xl font-bold text-red-600">{deleted}</div>
        </div>
      </div>

      {/* Delta Comparison Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Configuration Element</th>
              <th className="p-3 text-left">Version 1.0 (Active)</th>
              <th className="p-3 text-left">Version 2.0 (Draft)</th>
              <th className="p-3 text-left">Change Type</th>
            </tr>
          </thead>
          <tbody>
            {deltaRows.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-3 font-medium">{row.entity}</td>
                <td className="p-3 text-gray-700">{row.oldValue}</td>
                <td className="p-3 text-gray-700">{row.newValue}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        row.changeType === "Added"
                          ? "bg-green-100 text-green-700"
                          : row.changeType === "Modified"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {row.changeType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="text-xs text-gray-500 border-t pt-3 mt-2">
        Delta comparison shows configuration differences between Version 1.0 (Active) and Version 2.0 (Draft).
      </div>
    </div>
  );
}