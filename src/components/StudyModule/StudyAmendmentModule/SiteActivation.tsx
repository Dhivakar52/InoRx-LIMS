"use client";

import {
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";

export default function SiteActivation() {
  const sites = [
    {
      name: "Boston General Hospital",
      pi: "Dr. Jane Ross",
      irbNumber: "IRB-BOS-2026-12",
      irbDate: "2026-05-24",
      effectiveDate: "2026-06-01",
      status: "Activated",
    },
    {
      name: "Mayo Clinic Center",
      pi: "Dr. John Doe",
      irbNumber: "IRB-MAY-2026-44",
      irbDate: "2026-05-28",
      effectiveDate: "2026-06-05",
      status: "Activated",
    },
    {
      name: "MD Anderson Cancer Center",
      pi: "Dr. Sarah Smith",
      irbNumber: "--",
      irbDate: "--",
      effectiveDate: "--",
      status: "Pending IRB Details",
    },
    {
      name: "UCSF Medical Center",
      pi: "Dr. Alan Turing",
      irbNumber: "IRB-SFO-2026-88",
      irbDate: "2026-05-30",
      effectiveDate: "2026-06-10",
      status: "Approved (Pending Activation)",
    },
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Activated":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            <CheckCircle size={14} />
            Activated
          </span>
        );

      case "Approved (Pending Activation)":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <Info size={14} />
            Approved (Pending Activation)
          </span>
        );

      case "Pending IRB Details":
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-700">
            <AlertCircle size={14} />
            Pending IRB Details
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            Not Activated
          </span>
        );
    }
  };

  const renderAction = (status: string) => {
    if (status === "Pending IRB Details") {
      return (
        <button className="inline-flex items-center gap-2 rounded-md border border-blue-500 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
          <FileText size={16} />
          Log IRB
        </button>
      );
    }

    return (
      <label className="inline-flex cursor-pointer items-center gap-3">
        <div className="relative">
          <input
            type="checkbox"
            defaultChecked
            className="peer sr-only"
          />

          <div className="h-6 w-11 rounded-full bg-green-500 peer-checked:bg-green-500"></div>

          <div className="absolute left-[22px] top-[2px] h-5 w-5 rounded-full bg-white shadow"></div>
        </div>

        <span className="text-sm text-gray-700">
          Deploy Version
        </span>
      </label>
    );
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Site Activation Matrix
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Manage site-by-site deployment of Protocol V2.0.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <Download size={16} />
            Export Matrix
          </button>

          <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-50">
            <Filter size={16} />
            Filters
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-4 text-left text-sm font-semibold">
                Site Name
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Principal Investigator
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Local IRB Approval Number
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Local IRB Approval Date
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Effective Date
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Site Status
              </th>

              <th className="border p-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sites.map((site, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="border p-4">{site.name}</td>

                <td className="border p-4">{site.pi}</td>

                <td className="border p-4">{site.irbNumber}</td>

                <td className="border p-4">{site.irbDate}</td>

                <td className="border p-4">{site.effectiveDate}</td>

                <td className="border p-4">
                  {renderStatusBadge(site.status)}
                </td>

                <td className="border p-4">
                  {renderAction(site.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-wrap items-center gap-8 text-sm text-gray-500">
        <span>
          Showing {sites.length} of {sites.length} sites
        </span>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
          Activated
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-500"></span>
          Approved (Pending Activation)
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          Pending IRB Details
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-gray-400"></span>
          Not Activated
        </div>
      </div>
    </div>
  );
}