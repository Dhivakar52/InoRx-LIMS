// src/components/ResultsReviewModule/ResultsReviewTable.tsx
import { useMemo, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../common/DataTable";
import TableSearch from "../../common/TableSearch";
import ColumnToggle from "../../common/ColumnToggle";
import Pagination from "../../common/Pagination";
import { ActionMenu } from "../../common/ActionMenu";
import NavigateButton from "../../common/NavigateButton";
import { Plus } from "lucide-react";
import CustomPanel from "../../common/CustomPanel";

type TestResult = {
  id: number;
  resultId: string;
  subjectId: string;
  testName: string;
  analyzerId: string;
  resultValue: string;
  referenceRange: string;
  unit: string;
  collectedDate: string;
  reviewedDate: string | null;
  reviewedBy: string | null;
  status: "Pending" | "In Review" | "Approved" | "Rejected" | "Amended";
  comments: string;
};

type AuditLog = {
  id: number;
  action: "CREATE" | "UPDATE" | "DELETE" | "VIEW";
  recordId: number;
  recordType: string;
  oldData: string | null;
  newData: string | null;
  changedBy: string;
  changedAt: string;
  ipAddress: string;
};

type PanelMode = "view" | "edit" | "audit" | null;

// ✅ DEMO AUDIT LOG DATA
const getDemoAuditLogs = (resultId: string, testName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Test Result",
      oldData: null,
      newData: JSON.stringify({ resultId, subjectId: "SUB001", testName, analyzerId: "ANL001", resultValue: "5.2", referenceRange: "4.5-11.0", unit: "x10^3/uL", collectedDate: "2024-01-10", status: "Pending", comments: "" }, null, 2),
      changedBy: "lab.tech@example.com",
      changedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "VIEW",
      recordId: 1,
      recordType: "Test Result",
      oldData: null,
      newData: JSON.stringify({ resultId, testName, status: "Pending" }, null, 2),
      changedBy: "dr.smith@example.com",
      changedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "UPDATE",
      recordId: 1,
      recordType: "Test Result",
      oldData: JSON.stringify({ resultId, status: "Pending" }, null, 2),
      newData: JSON.stringify({ resultId, status: "In Review", comments: "Under review" }, null, 2),
      changedBy: "dr.smith@example.com",
      changedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "Test Result",
      oldData: JSON.stringify({ resultId, status: "In Review" }, null, 2),
      newData: JSON.stringify({ resultId, status: "Approved", reviewedBy: "Dr. Johnson", comments: "Normal range - Approved" }, null, 2),
      changedBy: "dr.johnson@example.com",
      changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
  ];
};

const ResultsReviewTable = () => {
  const [data, setData] = useState<TestResult[]>([
    { id: 1, resultId: "RES001", subjectId: "SUB001", testName: "Complete Blood Count", analyzerId: "ANL001", resultValue: "5.2", referenceRange: "4.5-11.0", unit: "x10^3/uL", collectedDate: "2024-01-10", reviewedDate: null, reviewedBy: null, status: "Pending", comments: "" },
    { id: 2, resultId: "RES002", subjectId: "SUB001", testName: "Glucose", analyzerId: "ANL002", resultValue: "95", referenceRange: "70-100", unit: "mg/dL", collectedDate: "2024-01-10", reviewedDate: "2024-01-11", reviewedBy: "Dr. Smith", status: "Approved", comments: "Normal range" },
    { id: 3, resultId: "RES003", subjectId: "SUB002", testName: "Lipid Profile", analyzerId: "ANL003", resultValue: "220", referenceRange: "<200", unit: "mg/dL", collectedDate: "2024-01-12", reviewedDate: null, reviewedBy: null, status: "In Review", comments: "Borderline high" },
    { id: 4, resultId: "RES004", subjectId: "SUB002", testName: "Liver Function", analyzerId: "ANL004", resultValue: "45", referenceRange: "10-40", unit: "U/L", collectedDate: "2024-01-12", reviewedDate: "2024-01-13", reviewedBy: "Dr. Johnson", status: "Rejected", comments: "Out of range - requires retest" },
    { id: 5, resultId: "RES005", subjectId: "SUB003", testName: "Kidney Function", analyzerId: "ANL005", resultValue: "0.9", referenceRange: "0.6-1.2", unit: "mg/dL", collectedDate: "2024-01-15", reviewedDate: "2024-01-16", reviewedBy: "Dr. Smith", status: "Approved", comments: "Normal" },
    { id: 6, resultId: "RES006", subjectId: "SUB003", testName: "Thyroid Stimulating Hormone", analyzerId: "ANL001", resultValue: "3.5", referenceRange: "0.4-4.0", unit: "mIU/L", collectedDate: "2024-01-15", reviewedDate: null, reviewedBy: null, status: "Pending", comments: "" },
    { id: 7, resultId: "RES007", subjectId: "SUB004", testName: "Vitamin D", analyzerId: "ANL002", resultValue: "25", referenceRange: "30-100", unit: "ng/mL", collectedDate: "2024-01-18", reviewedDate: "2024-01-19", reviewedBy: "Dr. Johnson", status: "Amended", comments: "Low - supplement recommended" },
    { id: 8, resultId: "RES008", subjectId: "SUB004", testName: "Iron Studies", analyzerId: "ANL003", resultValue: "65", referenceRange: "50-170", unit: "ug/dL", collectedDate: "2024-01-18", reviewedDate: "2024-01-19", reviewedBy: "Dr. Smith", status: "Approved", comments: "Normal" },
    { id: 9, resultId: "RES009", subjectId: "SUB005", testName: "Hemoglobin A1C", analyzerId: "ANL004", resultValue: "5.7", referenceRange: "4.0-5.6", unit: "%", collectedDate: "2024-01-20", reviewedDate: null, reviewedBy: null, status: "In Review", comments: "Pre-diabetes range" },
    { id: 10, resultId: "RES010", subjectId: "SUB005", testName: "C-Reactive Protein", analyzerId: "ANL005", resultValue: "3.2", referenceRange: "<1.0", unit: "mg/L", collectedDate: "2024-01-20", reviewedDate: "2024-01-21", reviewedBy: "Dr. Johnson", status: "Rejected", comments: "High - check sample integrity" },
    { id: 11, resultId: "RES011", subjectId: "SUB006", testName: "Electrolytes", analyzerId: "ANL001", resultValue: "138", referenceRange: "135-145", unit: "mmol/L", collectedDate: "2024-01-22", reviewedDate: "2024-01-23", reviewedBy: "Dr. Smith", status: "Approved", comments: "Normal" },
    { id: 12, resultId: "RES012", subjectId: "SUB006", testName: "Coagulation Profile", analyzerId: "ANL002", resultValue: "12.5", referenceRange: "11-13.5", unit: "seconds", collectedDate: "2024-01-22", reviewedDate: null, reviewedBy: null, status: "Pending", comments: "" },
    { id: 13, resultId: "RES013", subjectId: "SUB007", testName: "Cardiac Markers", analyzerId: "ANL003", resultValue: "0.05", referenceRange: "<0.04", unit: "ng/mL", collectedDate: "2024-01-25", reviewedDate: "2024-01-26", reviewedBy: "Dr. Johnson", status: "Approved", comments: "Normal" },
    { id: 14, resultId: "RES014", subjectId: "SUB007", testName: "Inflammatory Markers", analyzerId: "ANL004", resultValue: "8.5", referenceRange: "0-5", unit: "mg/L", collectedDate: "2024-01-25", reviewedDate: null, reviewedBy: null, status: "In Review", comments: "Elevated - possible infection" },
    { id: 15, resultId: "RES015", subjectId: "SUB008", testName: "Hormone Panel", analyzerId: "ANL005", resultValue: "45", referenceRange: "15-70", unit: "pg/mL", collectedDate: "2024-01-28", reviewedDate: "2024-01-29", reviewedBy: "Dr. Smith", status: "Amended", comments: "Within range" },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(result => {
      initialLogs.push(...getDemoAuditLogs(result.resultId, result.testName));
    });
    return initialLogs;
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<TestResult | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<TestResult>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "Test Result",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);

  const handleView = useCallback((item: TestResult) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: TestResult) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: TestResult) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: TestResult) => {
    Swal.fire({
      title: "Delete Result?",
      text: `Delete result ${item.resultId} for ${item.subjectId}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Deleted!", "Result has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      const status = editFormData.status ?? selectedItem.status;
      const oldData = { ...selectedItem };
      const newData = {
        ...selectedItem,
        ...editFormData,
        status,
        reviewedDate: status !== "Pending" ? (editFormData.reviewedDate || new Date().toISOString().split("T")[0]) : selectedItem.reviewedDate,
        reviewedBy: status !== "Pending" ? (editFormData.reviewedBy || "Current User") : selectedItem.reviewedBy,
      } as TestResult;
      setData((prevData) => prevData.map((item) => item.id === selectedItem.id ? newData : item));
      addAuditLog("UPDATE", selectedItem.id, oldData, newData);
      Swal.fire("Updated!", "Result reviewed and updated.", "success");
      setPanelMode(null);
      setSelectedItem(null);
      setEditFormData({});
    }
  }, [selectedItem, editFormData, addAuditLog]);

  const handleClosePanel = useCallback(() => {
    setPanelMode(null);
    setSelectedItem(null);
    setEditFormData({});
    setSelectedAuditLogs([]);
  }, []);

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "In Review": return "bg-blue-100 text-blue-700";
      case "Rejected": return "bg-red-100 text-red-700";
      case "Amended": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getActionBadge = (action: AuditLog["action"]) => {
    const styles = {
      CREATE: "bg-green-100 text-green-700",
      UPDATE: "bg-blue-100 text-blue-700",
      DELETE: "bg-red-100 text-red-700",
      VIEW: "bg-gray-100 text-gray-700",
    };
    return styles[action];
  };

  const columns: ColumnDef<TestResult>[] = useMemo(() => [
    { accessorKey: "resultId", header: "Result ID" },
    { accessorKey: "subjectId", header: "Subject ID" },
    { accessorKey: "testName", header: "Test Name" },
    { accessorKey: "resultValue", header: "Value" },
    { accessorKey: "unit", header: "Unit" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => { const value = getValue<TestResult["status"]>(); return <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>{value}</span>; } },
    { id: "actions", header: "Actions", cell: ({ row }) => (<ActionMenu<TestResult> item={row.original} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAuditLog={handleAuditLog} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />) },
  ], [handleView, handleEdit, handleDelete, handleAuditLog, openMenuId]);

  const table = useReactTable({
    data, columns, state: { globalFilter, columnVisibility, pagination },
    onGlobalFilterChange: setGlobalFilter, onColumnVisibilityChange: setColumnVisibility, onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800"></h2>
          <div className="flex gap-3">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search results..." />
            <ColumnToggle table={table} />
            <NavigateButton label="Add Result" path="/results/new-add" icon={<Plus size={18} />} />
          </div>
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>

      <CustomPanel isOpen={panelMode === "view"} title="View Result" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-600">Result ID</label><p className="mt-1 text-gray-900">{selectedItem.resultId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Subject ID</label><p className="mt-1 text-gray-900">{selectedItem.subjectId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Test Name</label><p className="mt-1 text-gray-900">{selectedItem.testName}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Analyzer</label><p className="mt-1 text-gray-900">{selectedItem.analyzerId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Result Value</label><p className="mt-1 text-gray-900">{selectedItem.resultValue} {selectedItem.unit}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Reference Range</label><p className="mt-1 text-gray-900">{selectedItem.referenceRange}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Collected Date</label><p className="mt-1 text-gray-900">{selectedItem.collectedDate}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Reviewed Date</label><p className="mt-1 text-gray-900">{selectedItem.reviewedDate || "Not reviewed"}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Reviewed By</label><p className="mt-1 text-gray-900">{selectedItem.reviewedBy || "Not assigned"}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-600">Comments</label><p className="mt-1 text-gray-900">{selectedItem.comments || "No comments"}</p></div>
          </div>
        )}
      </CustomPanel>

      <CustomPanel isOpen={panelMode === "edit"} title="Review Result" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Submit Review">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Result Value</label><input type="text" value={editFormData.resultValue || ""} onChange={(e) => setEditFormData({ ...editFormData, resultValue: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as TestResult["status"] })} className="w-full px-3 py-2 border rounded-lg"><option value="Pending">Pending</option><option value="In Review">In Review</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option><option value="Amended">Amended</option></select></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Comments</label><textarea rows={4} value={editFormData.comments || ""} onChange={(e) => setEditFormData({ ...editFormData, comments: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Add review comments..."/></div>
          </div>
        )}
      </CustomPanel>

      {/* ✅ SIMPLE AUDIT LOG PANEL */}
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.resultId || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedAuditLogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">No audit records found</p>
          </div>
        ) : (
          <div className="space-y-0">
            {selectedAuditLogs.map((log, idx) => (
              <div key={log.id} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-3 h-3 rounded-full ${getActionBadge(log.action).split(' ')[0]}`}></div>
                  {idx < selectedAuditLogs.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '40px' }}></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-400">{log.changedAt}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">By: <span className="text-gray-700">{log.changedBy}</span></p>
                    {log.oldData && (
                      <div className="mt-2 text-xs">
                        <span className="text-gray-500">Before: </span>
                        <span className="text-gray-700 font-mono">{log.oldData.substring(0, 100)}...</span>
                      </div>
                    )}
                    {log.newData && (
                      <div className="mt-1 text-xs">
                        <span className="text-gray-500">After: </span>
                        <span className="text-gray-700 font-mono">{log.newData.substring(0, 100)}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CustomPanel>
    </div>
  );
};

export default ResultsReviewTable;