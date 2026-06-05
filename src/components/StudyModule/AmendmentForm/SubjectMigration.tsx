"use client";

import { useMemo, useState } from "react";

interface Subject {
  subjectId: string;
  siteCode: string;
  predecessorVersion: string;
  targetVersion: string;
  reConsentStatus: string;
  reConsentDate: string;
  collectionStatus: string;
  selected?: boolean;
}

interface FormData {
  migrationPolicy: string;
  mandatoryReConsent: boolean;
  migrationSubjects: Subject[];
}

export default function SubjectMigration() {
  const [form, setForm] = useState<FormData>({
    migrationPolicy: "GLOBAL",
    mandatoryReConsent: true,
    migrationSubjects: [
      {
        subjectId: "SUB-1001",
        siteCode: "SITE-01",
        predecessorVersion: "V1.0",
        targetVersion: "V2.0",
        reConsentStatus: "Completed",
        reConsentDate: "2026-05-28",
        collectionStatus: "V2.0 Active",
        selected: false,
      },
      {
        subjectId: "SUB-1002",
        siteCode: "SITE-01",
        predecessorVersion: "V1.0",
        targetVersion: "V2.0",
        reConsentStatus: "Pending",
        reConsentDate: "--",
        collectionStatus: "Blocked - Default V1.0",
        selected: false,
      },
      {
        subjectId: "SUB-1003",
        siteCode: "SITE-02",
        predecessorVersion: "V1.0",
        targetVersion: "V2.0",
        reConsentStatus: "Completed",
        reConsentDate: "2026-05-29",
        collectionStatus: "V2.0 Active",
        selected: false,
      },
      {
        subjectId: "SUB-1004",
        siteCode: "SITE-02",
        predecessorVersion: "V1.0",
        targetVersion: "V1.0",
        reConsentStatus: "Waived",
        reConsentDate: "--",
        collectionStatus: "Legacy V1.0 Locked",
        selected: false,
      },
    ],
  });

  const updateSubject = (index: number, field: string, value: any) => {
    const updated = [...form.migrationSubjects];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectAll = (checked: boolean) => {
    const updated = form.migrationSubjects.map((x) => ({
      ...x,
      selected: checked,
    }));
    setForm((prev) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectedCount = useMemo(
    () => form.migrationSubjects.filter((x) => x.selected).length,
    [form.migrationSubjects]
  );

  const getConsentStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "";
      case "pending":
        return "";
      case "waived":
        return "";
      default:
        return "";
    }
  };

  const getConsentStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-red-600";
      case "waived":
        return "text-gray-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Subject Migration & Re-consent Tracking
        </h2>
        <p className="text-sm text-gray-500">
          Manage subject migration to amended protocol version
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-sm text-gray-500">Total Subjects</div>
          <div className="text-2xl font-bold">{form.migrationSubjects.length}</div>
        </div>

        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-sm text-gray-500">Selected</div>
          <div className="text-2xl font-bold text-green-600">{selectedCount}</div>
        </div>

        <div className="border rounded-lg p-4 bg-purple-50">
          <div className="text-sm text-gray-500">Completed Consent</div>
          <div className="text-2xl font-bold text-purple-600">
            {form.migrationSubjects.filter((x) => x.reConsentStatus === "Completed").length}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-orange-50">
          <div className="text-sm text-gray-500">Pending Consent</div>
          <div className="text-2xl font-bold text-orange-600">
            {form.migrationSubjects.filter((x) => x.reConsentStatus === "Pending").length}
          </div>
        </div>
      </div>

      {/* Migration Policy Section */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="font-medium">Migration Policy:</label>
            <select
              value={form.migrationPolicy}
              onChange={(e) => setForm((prev) => ({ ...prev, migrationPolicy: e.target.value }))}
              className="border rounded-md h-10 px-3"
            >
              <option value="">Select</option>
              <option value="NEW_ONLY">Future Cohorts Only</option>
              <option value="GLOBAL">Global Transition</option>
              <option value="MANUAL">Manual Assignment</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.mandatoryReConsent}
                onChange={(e) => setForm((prev) => ({ ...prev, mandatoryReConsent: e.target.checked }))}
              />
              <span className="text-sm">Mandatory Subject Re-Consent Check</span>
            </label>

            <button
              onClick={() => selectAll(true)}
              className="bg-[#00458F] text-white px-4 py-2 rounded-md hover:bg-[#003670]"
            >
              Select All
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left w-12">
                <input
                  type="checkbox"
                  onChange={(e) => selectAll(e.target.checked)}
                  checked={selectedCount === form.migrationSubjects.length && form.migrationSubjects.length > 0}
                />
              </th>
              <th className="p-3 text-left">Subject ID</th>
              <th className="p-3 text-left">Site Code</th>
              <th className="p-3 text-left">Predecessor Version</th>
              <th className="p-3 text-left">Target Version</th>
              <th className="p-3 text-left">Re-consent Status</th>
              <th className="p-3 text-left">Re-consent Date</th>
              <th className="p-3 text-left">Collection Status</th>
            </tr>
          </thead>
          <tbody>
            {form.migrationSubjects.map((row, index) => (
              <tr key={row.subjectId} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={(e) => updateSubject(index, "selected", e.target.checked)}
                  />
                </td>
                <td className="p-3 font-medium">{row.subjectId}</td>
                <td className="p-3">{row.siteCode}</td>
                <td className="p-3">{row.predecessorVersion}</td>
                <td className="p-3">
                  <select
                    value={row.targetVersion}
                    onChange={(e) => updateSubject(index, "targetVersion", e.target.value)}
                    className="border rounded-md h-8 px-2 text-sm"
                  >
                    <option value="V1.0">V1.0</option>
                    <option value="V2.0">V2.0</option>
                  </select>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className={getConsentStatusClass(row.reConsentStatus)}>
                      {getConsentStatusIcon(row.reConsentStatus)}
                    </span>
                    <select
                      value={row.reConsentStatus}
                      onChange={(e) => updateSubject(index, "reConsentStatus", e.target.value)}
                      className="border rounded-md h-8 px-2 text-sm"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Pending"> Pending</option>
                      <option value="Waived">Waived</option>
                    </select>
                  </div>
                </td>
                <td className="p-3">
                  <input
                    type="date"
                    value={row.reConsentDate === "--" ? "" : row.reConsentDate}
                    onChange={(e) =>
                      updateSubject(index, "reConsentDate", e.target.value || "--")
                    }
                    className="border rounded-md h-8 px-2 text-sm"
                    disabled={row.reConsentStatus === "Waived"}
                  />
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.collectionStatus.includes("Active")
                        ? "bg-green-100 text-green-800"
                        : row.collectionStatus.includes("Blocked")
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {row.collectionStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t text-sm text-gray-500">
          Showing {form.migrationSubjects.length} of {form.migrationSubjects.length} subjects
        </div>
      </div>
    </div>
  );
}