"use client";

export default function VersionHistory() {
  const versions = [
    { version: "V2.2", status: "DRAFT", author: "John Doe", date: "2026-06-01", amendment: "AMD-2026-001", reason: "Modify visit windows", subjects: 0 },
    { version: "V2.1", status: "ARCHIVED", author: "Sarah Smith", date: "2026-03-20", amendment: "AMD-2025-089", reason: "Safety update", subjects: 42 },
    { version: "V2.0", status: "ARCHIVED", author: "Admin", date: "2026-01-15", amendment: "Initial", reason: "Initial protocol release", subjects: 0 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Version Timeline</h3>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>

        {versions.map((ver, idx) => (
          <div key={ver.version} className="relative flex gap-4 mb-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
              ver.status === "DRAFT" ? "bg-yellow-500" : "bg-gray-400"
            }`}>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="flex-1 border rounded-lg p-4 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{ver.version}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-xs mt-1 ${
                    ver.status === "DRAFT" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {ver.status}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{ver.date}</div>
                  <div>Author: {ver.author}</div>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <p><strong>Amendment:</strong> {ver.amendment}</p>
                <p><strong>Reason:</strong> {ver.reason}</p>
                {ver.subjects > 0 && <p><strong>Subjects Enrolled:</strong> {ver.subjects}</p>}
              </div>
              {idx === 0 && (
                <div className="mt-3 p-2 bg-blue-50 rounded text-sm">
                  ◄─── You are here (Current Draft)
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="px-4 py-2 bg-gray-500 text-white rounded-md">View Full History Report</button>
    </div>
  );
}