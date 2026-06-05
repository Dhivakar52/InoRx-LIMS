"use client";

import {
  AlertTriangle,
  Printer,
  Ban,
  CircleAlert,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function KitReconciliation() {
  const kits = [
    {
      batchId: "KIT-BATCH-104A",
      site: "Boston General",
      visit: "Visit 3",
      tube: "EDTA Lavender-top",
      action: "Recall & Mark Destroyed",
      status: "Pending Return",
    },
    {
      batchId: "KIT-BATCH-104B",
      site: "Mayo Clinic",
      visit: "Visit 3",
      tube: "EDTA Lavender-top",
      action: "Recall & Mark Destroyed",
      status: "Quarantined",
    },
    {
      batchId: "KIT-BATCH-202A",
      site: "Boston General",
      visit: "Visit 3",
      tube: "EDTA Lavender-top",
      action: "Replace tube insert",
      status: "Reconciled",
    },
  ];

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Return":
        return <CircleAlert size={14} />;

      case "Quarantined":
        return <ShieldAlert size={14} />;

      case "Reconciled":
        return <CheckCircle2 size={14} />;

      default:
        return null;
    }
  };

    function getStatusStyle(status: string) {
      switch (status) {
        case "Pending Return":
          return "bg-orange-100 text-orange-700";
        case "Quarantined":
          return "bg-yellow-100 text-yellow-700";
        case "Reconciled":
          return "bg-emerald-100 text-emerald-700";
        default:
          return "bg-slate-100 text-slate-700";
      }
    }

  return (
    <div className="space-y-6">
      {/* Warning Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center gap-4">
        <AlertTriangle
          size={28}
          className="text-orange-500"
        />

        <p className="text-sm">
          <span className="font-semibold text-orange-600">
            Warning:
          </span>{" "}
          36 pre-labeled kits in current inventory are
          obsolete under Version 2.0.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button
          className="flex items-center gap-2
          border border-green-500 text-green-600
          px-5 py-2 rounded-md hover:bg-green-50"
        >
          <Printer size={18} />
          Print Obsolete Barcode Log
        </button>

        <button
          className="flex items-center gap-2
          bg-red-600 text-white
          px-5 py-2 rounded-md hover:bg-red-700"
        >
          <Ban size={18} />
          Deactivate Obsolete Kit Codes
        </button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-4 border">
                Kit Batch ID
              </th>
              <th className="p-4 border">
                Site Location
              </th>
              <th className="p-4 border">
                Visit Target
              </th>
              <th className="p-4 border">
                Deprecated Specimen Tube
              </th>
              <th className="p-4 border">
                Action Required
              </th>
              <th className="p-4 border">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {kits.map((kit, index) => (
              <tr key={index}>
                <td className="border p-4">
                  {kit.batchId}
                </td>

                <td className="border p-4">
                  {kit.site}
                </td>

                <td className="border p-4">
                  {kit.visit}
                </td>

                <td className="border p-4">
                  {kit.tube}
                </td>

                <td className="border p-4">
                  {kit.action}
                </td>

                <td className="border p-4 text-center">
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm ${getStatusStyle(
                      kit.status
                    )}`}
                  >
                    {renderStatusIcon(
                      kit.status
                    )}
                    {kit.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500">
        Showing 3 of 3 obsolete kit batches
      </p>
    </div>
  );
}