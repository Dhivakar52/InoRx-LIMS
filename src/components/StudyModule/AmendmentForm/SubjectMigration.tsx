
"use client";

import { useMemo } from "react";

interface Subject {
  subjectId: string;
  reConsentStatus: string;
  reConsentDate: string;
  reconsentLoggedBy: string;


  selected?: boolean;
}

export default function SubjectMigration({ form, setForm, errors, addAuditEntry }: any) {
  const updateSubject = (index: number, field: string, value: any) => {
    const updated = [...form.migrationSubjects];
    updated[index] = { ...updated[index], [field]: value };
    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectAll = (checked: boolean) => {
    const updated = form.migrationSubjects.map((x: Subject) => ({
      ...x,
      selected: checked,
    }));
    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectedCount = useMemo(
    () => form.migrationSubjects.filter((x: Subject) => x.selected).length,
    [form.migrationSubjects]
  );

  const addReconsentRow = () => {
    const newSubject: Subject = {
      subjectId: "",


      reConsentStatus: "PENDING",
      reConsentDate: "",

      reconsentLoggedBy: "",
      selected: false,
    };
    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: [...prev.migrationSubjects, newSubject],
    }));
    addAuditEntry("ADDED_SUBJECT", null, newSubject, "New subject added to migration list");
  };

  const deleteSubject = (index: number) => {
    const deleted = form.migrationSubjects[index];
    const updated = form.migrationSubjects.filter((_: any, i: number) => i !== index);
    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: updated,
    }));
    addAuditEntry("DELETED_SUBJECT", deleted, null, `Subject ${deleted.subjectId} removed`);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#1A365D]">
          Subject Migration & Re-consent Tracking
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage subject migration to amended protocol version
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
          <div className="text-sm text-gray-600">Total Subjects</div>
          <div className="text-2xl font-bold text-gray-800">{form.migrationSubjects.length}</div>
        </div>
        <div className="border rounded-lg p-4 bg-green-50 border-green-200">
          <div className="text-sm text-gray-600">Selected</div>
          <div className="text-2xl font-bold text-green-600">{selectedCount}</div>
        </div>
        <div className="border rounded-lg p-4 bg-purple-50 border-purple-200">
          <div className="text-sm text-gray-600">Completed Consent</div>
          <div className="text-2xl font-bold text-purple-600">
            {form.migrationSubjects.filter((x: Subject) => x.reConsentStatus === "COMPLETED").length}
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
          <div className="text-sm text-gray-600">Pending Consent</div>
          <div className="text-2xl font-bold text-orange-600">
            {form.migrationSubjects.filter((x: Subject) => x.reConsentStatus === "PENDING").length}
          </div>
        </div>
      </div>

      {/* Migration Policy Section */}
      <div className="border rounded-lg p-5 bg-gray-50 border-gray-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <label className="font-semibold text-gray-700">
              Migration Policy:<span className="text-red-500 ml-1">*</span>
            </label>
            <div>
              <select
                value={form.migrationPolicy}
                onChange={(e) => setForm((prev: any) => ({ ...prev, migrationPolicy: e.target.value }))}
                className="border border-gray-300 rounded-md h-10 px-3 bg-white"
              >
                <option value="">Select Policy</option>
                <option value="Future Cohorts Only">Future Cohorts Only (Existing subjects remain on V1.0)</option>
                <option value="Global Mid-Study Transition">Global Mid-Study Transition (Active subjects transition to new protocol visits)</option>
                <option value="Manual Assignment">Manual Assignment (Selected case-by-case)</option>
              </select>
              {errors?.migrationPolicy && <p className="text-red-500 text-xs mt-1">{errors.migrationPolicy}</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.mandatoryReConsent}
                onChange={(e) => setForm((prev: any) => ({ ...prev, mandatoryReConsent: e.target.checked }))}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-sm text-gray-700">Mandatory Subject Re-Consent Check</span>
            </label>

            <button
              onClick={() => selectAll(true)}
              className="px-4 py-2 bg-[#0056D2] text-white rounded-md text-sm font-medium hover:bg-[#0045A6] transition"
            >
              Select All
            </button>

            <button
              onClick={addReconsentRow}
              className="px-4 py-2 border border-[#0056D2] text-[#0056D2] rounded-md text-sm font-medium hover:bg-blue-50 transition flex items-center gap-1"
            >
              + Add Subject
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-white font-semibold text-sm w-12">
                <input type="checkbox" onChange={(e) => selectAll(e.target.checked)} className="w-4 h-4" />
              </th>
              <th className="p-3 text-left text-white font-semibold text-sm">Subject ID</th>

              <th className="p-3 text-left text-white font-semibold text-sm">Re-consent Status</th>
              <th className="p-3 text-left text-white font-semibold text-sm">Re-consent Date</th>
              <th className="p-3 text-left text-white font-semibold text-sm">Re-Consent-LoggedBY</th>
              <th className="p-3 text-center text-white font-semibold text-sm w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {form.migrationSubjects.map((row: Subject, index: number) => (
              <tr key={row.subjectId || index} className="border-t border-gray-200 even:bg-[#F2F5F8]">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={(e) => updateSubject(index, "selected", e.target.checked)}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3 font-medium">
                  {row.subjectId || <input type="text" placeholder="Enter Subject ID" className="border rounded px-2 py-1 text-sm w-full" onChange={(e) => updateSubject(index, "subjectId", e.target.value)} />}
                </td>

                <td className="p-3">
                  <select value={row.reConsentStatus} onChange={(e) => updateSubject(index, "reConsentStatus", e.target.value)} className="border rounded px-2 py-1 text-sm">
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="WAIVED">WAIVED</option>
                  </select>
                </td>
                <td className="p-3">
                  <input type="date" value={row.reConsentDate === "--" ? "" : row.reConsentDate} onChange={(e) => updateSubject(index, "reConsentDate", e.target.value)} className="border rounded px-2 py-1 text-sm" disabled={row.reConsentStatus === "WAIVED"} />
                </td>
                <td className="p-3 font-medium">
                  {row.reconsentLoggedBy || <input type="text" placeholder="Enter Re-Consent Logged By" className="border rounded px-2 py-1 text-sm w-full" onChange={(e) => updateSubject(index, "reConsentLoggedBy", e.target.value)} />}
                </td>
                <td className="p-3 text-center">
                  <button onClick={() => deleteSubject(index)} className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 bg-gray-50 border-t text-sm text-gray-500">Showing {form.migrationSubjects.length} subjects</div>
      </div>
    </div>
  );
}