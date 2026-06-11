"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";


// ============ COHORT GRID COMPONENT ============
function CohortGrid({ form, setForm }: { form: any; setForm: any }) {
  const addCohort = () => {
    const newRow = {
      id: Date.now(),
      armCode: "",
      armName: "",
      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      cohorts: [...prev.cohorts, newRow],
    }));
  };

  const updateRow = (index: number, field: string, value: string) => {
    const updated = [...form.cohorts];
    updated[index] = {
      ...updated[index],
      [field]: value,
      actionType: updated[index].actionType === 1 ? 1 : 2,
    };
    setForm((prev: any) => ({ ...prev, cohorts: updated }));
  };

  const removeRow = (index: number) => {
    const row = form.cohorts[index];
    const updated = [...form.cohorts];

    if (row.id && row.id.toString().length > 5) {
      updated[index] = { ...row, actionType: 3 };
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({ ...prev, cohorts: updated }));
  };

  const visibleRows = form.cohorts?.filter((x: any) => x.actionType !== 3) || [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-lg">Section 5: Cloned Arms Configuration Workspace</h3>
        <button
          onClick={addCohort}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#003570]"
        >
          <Plus size={16} />
          Add Arm
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Arm Code *</th>
              <th className="p-3 text-left border-b">Arm Name *</th>
              <th className="p-3 text-center border-b w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-gray-500">
                  No arms configured. Click "Add Arm" to create one.
                </td>
              </tr>
            ) : (
              visibleRows.map((row: any, index: number) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.armCode}
                      onChange={(e) => updateRow(index, "armCode", e.target.value)}
                      placeholder="e.g., ARM-A"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.armName}
                      onChange={(e) => updateRow(index, "armName", e.target.value)}
                      placeholder="e.g., Treatment Arm"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button onClick={() => removeRow(index)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ VISIT SCHEDULE GRID COMPONENT ============
function VisitScheduleGrid({ form, setForm }: { form: any; setForm: any }) {
  const addVisit = () => {
    const newRow = {
      id: Date.now(),
      visitCode: "",
      visitName: "",
      targetDay: "",
      windowMinus: "",
      windowPlus: "",
      actionType: 1,
    };

    setForm((prev: any) => ({
      ...prev,
      visits: [...prev.visits, newRow],
    }));
  };

  const updateRow = (index: number, field: string, value: string) => {
    const updated = [...form.visits];
    updated[index] = {
      ...updated[index],
      [field]: value,
      actionType: updated[index].actionType === 1 ? 1 : 2,
    };
    setForm((prev: any) => ({ ...prev, visits: updated }));
  };

  const removeRow = (index: number) => {
    const row = form.visits[index];
    const updated = [...form.visits];

    if (row.id && row.id.toString().length > 5) {
      updated[index] = { ...row, actionType: 3 };
    } else {
      updated.splice(index, 1);
    }

    setForm((prev: any) => ({ ...prev, visits: updated }));
  };

  const visibleRows = form.visits?.filter((x: any) => x.actionType !== 3) || [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h3 className="font-semibold text-lg">Section 5: Cloned Visits Configuration Workspace</h3>
        <button
          onClick={addVisit}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#003570]"
        >
          <Plus size={16} />
          Add Visit
        </button>
      </div>

      <div className="overflow-auto border rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border-b">Visit Code *</th>
              <th className="p-3 text-left border-b">Visit Name *</th>
              <th className="p-3 text-left border-b">Target Day *</th>
              <th className="p-3 text-left border-b">Window - *</th>
              <th className="p-3 text-left border-b">Window + *</th>
              <th className="p-3 text-center border-b w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  No visits configured. Click "Add Visit" to create one.
                </td>
              </tr>
            ) : (
              visibleRows.map((row: any, index: number) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.visitCode}
                      onChange={(e) => updateRow(index, "visitCode", e.target.value)}
                      placeholder="e.g., SCR"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.visitName}
                      onChange={(e) => updateRow(index, "visitName", e.target.value)}
                      placeholder="e.g., Screening"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.targetDay}
                      onChange={(e) => updateRow(index, "targetDay", e.target.value)}
                      placeholder="e.g., -7"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.windowMinus}
                      onChange={(e) => updateRow(index, "windowMinus", e.target.value)}
                      placeholder="e.g., 3"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.windowPlus}
                      onChange={(e) => updateRow(index, "windowPlus", e.target.value)}
                      placeholder="e.g., 3"
                      className="w-full border border-gray-300 rounded-md h-9 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F]"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button onClick={() => removeRow(index)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============ KIT RECONCILIATION COMPONENT ============
interface ObsoleteKit {
   id: string;
  kitBatchSerial: string;
  siteCode: string;
  targetVisit: string;
  quantityObsolete: string;
  disposalProtocolMapped: string;
  actionRequired: string;
  status: string;
}

function KitReconciliationComponent() {
  const [obsoleteKits] = useState<ObsoleteKit[]>([
    {
      id: "1",
      kitBatchSerial: "KIT-BATCH-104A",
      siteCode: "BOS-GEN-01",
      targetVisit: "Baseline Dosing (D01)",
      quantityObsolete: "12 Kits",
      disposalProtocolMapped: "Incinerate / Log waste inventory",
      actionRequired: "Recall & Mark Destroyed",
      status: "Pending Return",
    },
    {
      id: "2",
      kitBatchSerial: "KIT-BATCH-104B",
      siteCode: "LON-CLI-02",
      targetVisit: "Baseline Dosing (D01)",
      quantityObsolete: "8 Kits",
      disposalProtocolMapped: "Incinerate / Log waste inventory",
      actionRequired: "Recall & Mark Destroyed",
      status: "Quarantined",
    },
    {
      id: "3",
      kitBatchSerial: "KIT-BATCH-202A",
      siteCode: "BOS-GEN-01",
      targetVisit: "Visit 3",
      quantityObsolete: "5 Kits",
      disposalProtocolMapped: "Return to Sponsor",
      actionRequired: "Replace tube insert",
      status: "Reconciled",
    },
  ]);
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

 







  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-[#00458F]">Kit Reconciliation</h2>
          <p className="text-sm text-gray-500">Review impacted kits and manage obsolete inventory</p>
        </div>
       
      </div>

     

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Kit Batch Serial</th>
              <th className="p-3 text-left">Site Code</th>
              <th className="p-3 text-left"> Target Visit</th>
              <th className="p-3 text-left">Quantity Obsolete</th>
              <th className="p-3 text-left">Disposal Protocol Mapped</th>
         
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {obsoleteKits.map((kit) => (
              <tr key={kit.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono font-medium">{kit.kitBatchSerial}</td>
                <td className="p-3">{kit.siteCode}</td>
                <td className="p-3">{kit.targetVisit}</td>
                <td className="p-3"><span className="bg-gray-100 px-2 py-1 rounded text-sm">{kit.quantityObsolete}</span></td>
                <td className="p-3"><span className="text-sm font-medium">{kit.disposalProtocolMapped}</span></td>
                <td className="p-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(kit.status)}`}>{kit.status}</span></td>
             
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 bg-gray-50 border-t">
          <div className="text-sm text-gray-500">Showing {obsoleteKits.length} of {obsoleteKits.length} obsolete kit batches</div>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN CONFIGURATION TABS COMPONENT ============
const deltaRows = [
  { entity: "Visit 3 Target Day", oldValue: "Day 14 (+/- 1 day)", newValue: "Day 15 (+/- 2 days)", changeType: "Modified" },
  { entity: "Visit 3 Specimen Tube", oldValue: "EDTA Lavender-top Tube", newValue: "Serum Separator Tube (SST)", changeType: "Modified" },
  { entity: "Cohort C (High Dose)", oldValue: "Not Configured", newValue: "Added Cohort C with 20 subjects target", changeType: "Added" },
  { entity: "Visit 1 Test Menu", oldValue: "CBC, CMP, Lipid Panel", newValue: "CBC, CMP", changeType: "Deleted" },
];

interface Props {
  form: any;
  setForm: any;
}

export default function ConfigurationTabs({ form, setForm }: Props) {
  const [activeTab, setActiveTab] = useState("Arms");

  const added = deltaRows.filter((x) => x.changeType === "Added").length;
  const modified = deltaRows.filter((x) => x.changeType === "Modified").length;
  const deleted = deltaRows.filter((x) => x.changeType === "Deleted").length;

  const tabs = [
    { key: "Arms", label: "Arms & Cohorts" },
    { key: "visit", label: "Visit Schedule" },
    { key: "kit", label: "Kit Reconciliation" },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">Cloned Workspace & Reconciliation</h2>
        <p className="text-sm text-gray-500 mt-1">Review cloned workspace changes and reconcile configuration updates before approval.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-xl p-5 bg-green-50">
          <div className="text-sm text-gray-500">Added</div>
          <div className="text-3xl font-bold text-green-600">{added}</div>
        </div>
        <div className="border rounded-xl p-5 bg-blue-50">
          <div className="text-sm text-gray-500">Modified</div>
          <div className="text-3xl font-bold text-blue-600">{modified}</div>
        </div>
        <div className="border rounded-xl p-5 bg-red-50">
          <div className="text-sm text-gray-500">Deleted</div>
          <div className="text-3xl font-bold text-red-600">{deleted}</div>
        </div>
      </div>

      <div className="flex gap-3 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === tab.key ? "bg-[#00458F] text-white" : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="border rounded-xl p-5 bg-white">
        {activeTab === "Arms" && <CohortGrid form={form} setForm={setForm} />}
        {activeTab === "visit" && <VisitScheduleGrid form={form} setForm={setForm} />}
        {activeTab === "kit" && <KitReconciliationComponent />}
      </div>

      
    </div>
  );
}