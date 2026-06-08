"use client";

import { useState } from "react";
import { Printer, Trash2, FileText } from "lucide-react";

interface ObsoleteKit {
  id: string;
  kitBatchId: string;
  siteLocation: string;
  visitTarget: string;
  deprecatedSpecimenTube: string;
  actionRequired: string;
  status: string;
}

export default function KitReconciliation() {
  const [obsoleteKits] = useState<ObsoleteKit[]>([
    {
      id: "1",
      kitBatchId: "KIT-BATCH-104A",
      siteLocation: "Boston General",
      visitTarget: "Visit 3",
      deprecatedSpecimenTube: "EDTA Lavender-top",
      actionRequired: "Recall & Mark Destroyed",
      status: "Pending Return",
    },
    {
      id: "2",
      kitBatchId: "KIT-BATCH-104B",
      siteLocation: "Mayo Clinic",
      visitTarget: "Visit 3",
      deprecatedSpecimenTube: "EDTA Lavender-top",
      actionRequired: "Recall & Mark Destroyed",
      status: "Quarantined",
    },
    {
      id: "3",
      kitBatchId: "KIT-BATCH-202A",
      siteLocation: "Boston General",
      visitTarget: "Visit 3",
      deprecatedSpecimenTube: "EDTA Lavender-top",
      actionRequired: "Replace tube insert",
      status: "Reconciled",
    },
  ]);

  const [] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending return":
        return "bg-red-100 text-red-800 border-red-200";
      case "quarantined":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "reconciled":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending return":
        return "";
      case "quarantined":
        return "";
      case "reconciled":
        return "";
      default:
        return "";
    }
  };

  const getActionButton = (action: string) => {
    if (action.includes("Recall")) {
      return (
        <button className="bg-red-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-red-700">
          <Trash2 size={14} />
          Process Recall
        </button>
      );
    }
    if (action.includes("Replace")) {
      return (
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:bg-blue-700">
          <FileText size={14} />
          Replace Insert
        </button>
      );
    }
    return null;
  };

  const handlePrintBarcodeLog = () => {
    // Create printable content
    const printContent = `
      <html>
        <head>
          <title>Obsolete Kit Barcode Log</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #00458F; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .barcode { font-family: monospace; font-size: 18px; letter-spacing: 2px; }
          </style>
        </head>
        <body>
          <h1>Obsolete Kit Barcode Log - Protocol V2.0</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr><th>Kit Batch ID</th><th>Site Location</th><th>Barcode</th></tr>
            </thead>
            <tbody>
              ${obsoleteKits.map(kit => `
                <tr>
                  <td>${kit.kitBatchId}</td>
                  <td>${kit.siteLocation}</td>
                  <td class="barcode">${kit.kitBatchId}-${Math.floor(Math.random() * 10000)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleDeactivateObsoleteCodes = () => {
    if (confirm("Are you sure you want to deactivate all obsolete kit codes? This action cannot be undone.")) {
      alert("Obsolete kit codes have been deactivated successfully!");
      // Here you would make an API call to deactivate the codes
    }
  };


  const stats = {
    total: obsoleteKits.length,
    pendingReturn: obsoleteKits.filter(k => k.status === "Pending Return").length,
    quarantined: obsoleteKits.filter(k => k.status === "Quarantined").length,
    reconciled: obsoleteKits.filter(k => k.status === "Reconciled").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-[#00458F]">
            Kit Reconciliation
          </h2>
          <p className="text-sm text-gray-500">
            Review impacted kits and manage obsolete inventory
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrintBarcodeLog}
            className="border border-gray-300 px-4 py-2 rounded-md flex gap-2 items-center hover:bg-gray-50 transition-colors"
          >
            <Printer size={16} />
            Print Obsolete Barcode Log
          </button>

          <button
            onClick={handleDeactivateObsoleteCodes}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex gap-2 items-center hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            Deactivate Obsolete Kit Codes
          </button>

          {/* <button
            onClick={handleExport}
            className="bg-[#00458F] text-white px-4 py-2 rounded-md flex gap-2 items-center hover:bg-[#003670] transition-colors"
          >
            <FileSpreadsheet size={16} />
            Export Matrix
          </button> */}
        </div>
      </div>
      {/* Warning Banner */}
      {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="text-yellow-600" size={24} />
          <div>
            <p className="text-yellow-800 font-medium">
              Warning: {stats.total} pre-labeled kits in current inventory are obsolete under Version 2.0.
            </p>
            <p className="text-yellow-600 text-sm">
              These kits cannot be used for the amended protocol. Please take appropriate action for each batch.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-medium text-yellow-800">
            {stats.pendingReturn} Pending • {stats.quarantined} Quarantined • {stats.reconciled} Reconciled
          </span>
        </div>
      </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="text-sm text-gray-500"> Pending Return</div>
          <div className="text-2xl font-bold text-red-600">{stats.pendingReturn}</div>
        </div>
        <div className="border rounded-lg p-4 bg-orange-50">
          <div className="text-sm text-gray-500"> Quarantined</div>
          <div className="text-2xl font-bold text-orange-600">{stats.quarantined}</div>
        </div>
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-sm text-gray-500"> Reconciled</div>
          <div className="text-2xl font-bold text-green-600">{stats.reconciled}</div>
        </div>
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-sm text-gray-500">Total Obsolete Batches</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </div>
      </div>

      {/* Main Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Kit Batch ID</th>
              <th className="p-3 text-left">Site Location</th>
              <th className="p-3 text-left">Visit Target</th>
              <th className="p-3 text-left">Deprecated Specimen Tube</th>
              <th className="p-3 text-left">Action Required</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {obsoleteKits.map((kit) => (
              <tr key={kit.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-3 font-mono font-medium">{kit.kitBatchId}</td>
                <td className="p-3">{kit.siteLocation}</td>
                <td className="p-3">{kit.visitTarget}</td>
                <td className="p-3">
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {kit.deprecatedSpecimenTube}
                  </span>
                </td>
                <td className="p-3">
                  <span className="text-sm font-medium">
                    {kit.actionRequired}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span>{getStatusIcon(kit.status)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(kit.status)}`}>
                      {kit.status}
                    </span>
                  </div>
                </td>
                <td className="p-3">
                  {getActionButton(kit.actionRequired)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {obsoleteKits.length} of {obsoleteKits.length} obsolete kit batches
          </div>
          
        </div>
      </div>

      {/* Additional Information */}
      
    </div>
  );
}