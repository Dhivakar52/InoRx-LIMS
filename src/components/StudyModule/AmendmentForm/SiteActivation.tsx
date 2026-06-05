"use client";

import { useMemo, useState } from "react";

interface SiteActivation {
  siteId: string;
  siteName: string;
  principalInvestigator: string;
  localIrbApprovalNumber: string;
  localIrbApprovalDate: string;
  effectiveDate: string;
  siteStatus: string;
}

export default function SiteActivation() {
  const [sites, setSites] = useState<SiteActivation[]>([
    {
      siteId: "SITE-01",
      siteName: "Boston General Hospital",
      principalInvestigator: "Dr. Jane Ross",
      localIrbApprovalNumber: "IRB-BOS-2026-12",
      localIrbApprovalDate: "2026-05-24",
      effectiveDate: "2026-06-01",
      siteStatus: "Activated",
    },
    {
      siteId: "SITE-02",
      siteName: "Mayo Clinic Center",
      principalInvestigator: "Dr. John Doe",
      localIrbApprovalNumber: "IRB-MAY-2026-44",
      localIrbApprovalDate: "2026-05-28",
      effectiveDate: "2026-06-05",
      siteStatus: "Activated",
    },
    {
      siteId: "SITE-03",
      siteName: "MD Anderson Cancer Center",
      principalInvestigator: "Dr. Sarah Smith",
      localIrbApprovalNumber: "--",
      localIrbApprovalDate: "--",
      effectiveDate: "--",
      siteStatus: "Pending IRB Details",
    },
    {
      siteId: "SITE-04",
      siteName: "UCSF Medical Center",
      principalInvestigator: "Dr. Alan Turing",
      localIrbApprovalNumber: "IRB-SFO-2026-88",
      localIrbApprovalDate: "2026-05-30",
      effectiveDate: "2026-06-10",
      siteStatus: "Approved (Pending Activation)",
    },
  ]);

  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const updateRow = (index: number, field: string, value: any) => {
    const updated = [...sites];
    updated[index] = { ...updated[index], [field]: value };
    setSites(updated);
  };

  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const matchesSearch =
        filterText === "" ||
        site.siteName.toLowerCase().includes(filterText.toLowerCase()) ||
        site.principalInvestigator.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesStatus =
        statusFilter === "" || site.siteStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [sites, filterText, statusFilter]);

  const getStatusIcon = (status: string) => {
    if (status === "Activated") return "";
    if (status === "Approved (Pending Activation)") return "";
    if (status === "Pending IRB Details") return "";
    return "⚠️";
  };

  const getActionButton = (status: string, rowIndex: number) => {
    if (status === "Activated") {
      return (
        <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
          ✅ Deploy Version
        </button>
      );
    }
    if (status === "Approved (Pending Activation)") {
      return (
        <button 
          onClick={() => updateRow(rowIndex, "siteStatus", "Activated")}
          className="bg-[#00458F] text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          ✅Deploy Version
        </button>
      );
    }
    if (status === "Pending IRB Details") {
      return (
        <button className="bg-yellow-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
          📋 Log IRB
        </button>
      );
    }
    return null;
  };

  const exportMatrix = () => {
    const headers = ["Site Name", "Principal Investigator", "Local IRB Approval Number", "Local IRB Approval Date", "Effective Date", "Site Status"];
    const csvData = sites.map(site => [
      site.siteName,
      site.principalInvestigator,
      site.localIrbApprovalNumber,
      site.localIrbApprovalDate,
      site.effectiveDate,
      site.siteStatus
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "site_activation_matrix.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: sites.length,
    activated: sites.filter(s => s.siteStatus === "Activated").length,
    pending: sites.filter(s => s.siteStatus === "Pending IRB Details").length,
    approved: sites.filter(s => s.siteStatus === "Approved (Pending Activation)").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Site Activation Matrix
        </h2>
        <p className="text-sm text-gray-500">
          Manage site-by-site deployment of Protocol V2.0
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-sm text-gray-500">Total Sites</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-sm text-gray-500"> Activated</div>
          <div className="text-2xl font-bold text-green-600">{stats.activated}</div>
        </div>
        <div className="border rounded-lg p-4 bg-yellow-50">
          <div className="text-sm text-gray-500"> Approved (Pending)</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.approved}</div>
        </div>
        <div className="border rounded-lg p-4 bg-red-50">
          <div className="text-sm text-gray-500"> Pending IRB</div>
          <div className="text-2xl font-bold text-red-600">{stats.pending}</div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-3 flex-1">
          <input
            type="text"
            placeholder="Search by site or investigator..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border rounded-md h-10 px-3 flex-1 max-w-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md h-10 px-3"
          >
            <option value="">All Statuses</option>
            <option value="Activated">Activated</option>
            <option value="Approved (Pending Activation)"> Approved (Pending Activation)</option>
            <option value="Pending IRB Details"> Pending IRB Details</option>
          </select>
        </div>
      
      </div>

      {/* Main Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Site Name</th>
              <th className="p-3 text-left">Principal Investigator</th>
              <th className="p-3 text-left">Local IRB Approval Number</th>
              <th className="p-3 text-left">Local IRB Approval Date</th>
              <th className="p-3 text-left">Effective Date</th>
              <th className="p-3 text-left">Site Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((row, index) => {
              const originalIndex = sites.findIndex(s => s.siteId === row.siteId);
              return (
                <tr key={row.siteId} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.siteName}</td>
                  <td className="p-3">{row.principalInvestigator}</td>
                  <td className="p-3">
                    <input
                      value={row.localIrbApprovalNumber}
                      onChange={(e) =>
                        updateRow(originalIndex, "localIrbApprovalNumber", e.target.value)
                      }
                      className="border rounded-md h-9 px-2 w-40"
                      placeholder="IRB Number"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={row.localIrbApprovalDate !== "--" ? row.localIrbApprovalDate : ""}
                      onChange={(e) =>
                        updateRow(originalIndex, "localIrbApprovalDate", e.target.value || "--")
                      }
                      className="border rounded-md h-9 px-2"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={row.effectiveDate !== "--" ? row.effectiveDate : ""}
                      onChange={(e) =>
                        updateRow(originalIndex, "effectiveDate", e.target.value || "--")
                      }
                      className="border rounded-md h-9 px-2"
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span>{getStatusIcon(row.siteStatus)}</span>
                      <select
                        value={row.siteStatus}
                        onChange={(e) => updateRow(originalIndex, "siteStatus", e.target.value)}
                        className="border rounded-md h-9 px-2"
                      >
                        <option value="Activated">Activated</option>
                        <option value="Approved (Pending Activation)">Approved (Pending Activation)</option>
                        <option value="Pending IRB Details">Pending IRB Details</option>
                      </select>
                    </div>
                  </td>
                  <td className="p-3">
                    {getActionButton(row.siteStatus, originalIndex)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredSites.length} of {sites.length} sites
          </div>
        
        </div>
      </div>
    </div>
  );
}