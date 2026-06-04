// src/components/FinalQCApprovalModule/FinalQCApprovalTable.tsx
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

type QCApproval = {
  id: number;
  qcId: string;
  batchId: string;
  subjectId: string;
  testName: string;
  qcDate: string;
  qcType: "Daily" | "Weekly" | "Monthly" | "Lot Change";
  controlLevel: "Low" | "Normal" | "High";
  observedValue: string;
  expectedRange: string;
  deviation: string;
  status: "Pending" | "In Review" | "Approved" | "Rejected" | "Needs Retest";
  approvedBy: string | null;
  approvalDate: string | null;
  qcTechnician: string;
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
const getDemoAuditLogs = (qcId: string, testName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "QC Approval",
      oldData: null,
      newData: JSON.stringify({ qcId, batchId: "BATCH001", subjectId: "SUB001", testName, qcDate: "2024-01-10", qcType: "Daily", controlLevel: "Normal", observedValue: "5.0", expectedRange: "4.8-5.2", deviation: "0.2", status: "Pending", qcTechnician: "Tech John", comments: "Initial QC run" }, null, 2),
      changedBy: "qc.technician@example.com",
      changedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "UPDATE",
      recordId: 1,
      recordType: "QC Approval",
      oldData: JSON.stringify({ qcId, status: "Pending" }, null, 2),
      newData: JSON.stringify({ qcId, status: "In Review", comments: "Sent for supervisor review" }, null, 2),
      changedBy: "qc.supervisor@example.com",
      changedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "VIEW",
      recordId: 1,
      recordType: "QC Approval",
      oldData: null,
      newData: JSON.stringify({ qcId, testName, status: "In Review" }, null, 2),
      changedBy: "quality.manager@example.com",
      changedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "QC Approval",
      oldData: JSON.stringify({ qcId, status: "In Review" }, null, 2),
      newData: JSON.stringify({ qcId, status: "Approved", approvedBy: "Dr. Smith", approvalDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], comments: "QC passed - Approved for use" }, null, 2),
      changedBy: "quality.manager@example.com",
      changedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
  ];
};

const FinalQCApprovalTable = () => {
  const [data, setData] = useState<QCApproval[]>([
    { id: 1, qcId: "QC001", batchId: "BATCH001", subjectId: "SUB001", testName: "CBC", qcDate: "2024-01-10", qcType: "Daily", controlLevel: "Normal", observedValue: "5.0", expectedRange: "4.8-5.2", deviation: "0.2", status: "Approved", approvedBy: "Dr. Smith", approvalDate: "2024-01-10", qcTechnician: "Tech John", comments: "Within limits" },
    { id: 2, qcId: "QC002", batchId: "BATCH001", subjectId: "SUB001", testName: "Glucose", qcDate: "2024-01-10", qcType: "Daily", controlLevel: "Normal", observedValue: "98", expectedRange: "95-105", deviation: "3", status: "Approved", approvedBy: "Dr. Smith", approvalDate: "2024-01-10", qcTechnician: "Tech John", comments: "Acceptable" },
    { id: 3, qcId: "QC003", batchId: "BATCH002", subjectId: "SUB002", testName: "Lipid Profile", qcDate: "2024-01-12", qcType: "Weekly", controlLevel: "High", observedValue: "210", expectedRange: "195-205", deviation: "5", status: "Pending", approvedBy: null, approvalDate: null, qcTechnician: "Tech Mary", comments: "Slightly high" },
    { id: 4, qcId: "QC004", batchId: "BATCH002", subjectId: "SUB002", testName: "LFT", qcDate: "2024-01-12", qcType: "Daily", controlLevel: "Low", observedValue: "38", expectedRange: "35-45", deviation: "3", status: "In Review", approvedBy: null, approvalDate: null, qcTechnician: "Tech Mary", comments: "Within range" },
    { id: 5, qcId: "QC005", batchId: "BATCH003", subjectId: "SUB003", testName: "KFT", qcDate: "2024-01-15", qcType: "Daily", controlLevel: "Normal", observedValue: "0.95", expectedRange: "0.9-1.1", deviation: "0.05", status: "Approved", approvedBy: "Dr. Johnson", approvalDate: "2024-01-15", qcTechnician: "Tech Robert", comments: "Good" },
    { id: 6, qcId: "QC006", batchId: "BATCH003", subjectId: "SUB003", testName: "TSH", qcDate: "2024-01-15", qcType: "Lot Change", controlLevel: "Normal", observedValue: "3.8", expectedRange: "3.5-4.2", deviation: "0.3", status: "Rejected", approvedBy: "Dr. Johnson", approvalDate: "2024-01-15", qcTechnician: "Tech Robert", comments: "Out of spec - new lot failed" },
    { id: 7, qcId: "QC007", batchId: "BATCH004", subjectId: "SUB004", testName: "Vitamin D", qcDate: "2024-01-18", qcType: "Weekly", controlLevel: "Low", observedValue: "28", expectedRange: "30-35", deviation: "2", status: "Needs Retest", approvedBy: null, approvalDate: null, qcTechnician: "Tech Sarah", comments: "Below range - retest required" },
    { id: 8, qcId: "QC008", batchId: "BATCH004", subjectId: "SUB004", testName: "Iron Studies", qcDate: "2024-01-18", qcType: "Daily", controlLevel: "Normal", observedValue: "68", expectedRange: "65-75", deviation: "3", status: "Approved", approvedBy: "Dr. Smith", approvalDate: "2024-01-18", qcTechnician: "Tech Sarah", comments: "Acceptable" },
    { id: 9, qcId: "QC009", batchId: "BATCH005", subjectId: "SUB005", testName: "HbA1c", qcDate: "2024-01-20", qcType: "Monthly", controlLevel: "High", observedValue: "5.9", expectedRange: "5.5-6.0", deviation: "0.1", status: "Pending", approvedBy: null, approvalDate: null, qcTechnician: "Tech John", comments: "Borderline" },
    { id: 10, qcId: "QC010", batchId: "BATCH005", subjectId: "SUB005", testName: "CRP", qcDate: "2024-01-20", qcType: "Daily", controlLevel: "Normal", observedValue: "3.5", expectedRange: "3.0-4.0", deviation: "0.5", status: "In Review", approvedBy: null, approvalDate: null, qcTechnician: "Tech John", comments: "Within range" },
    { id: 11, qcId: "QC011", batchId: "BATCH006", subjectId: "SUB006", testName: "Electrolytes", qcDate: "2024-01-22", qcType: "Daily", controlLevel: "Normal", observedValue: "140", expectedRange: "138-142", deviation: "2", status: "Approved", approvedBy: "Dr. Johnson", approvalDate: "2024-01-22", qcTechnician: "Tech Mary", comments: "Good" },
    { id: 12, qcId: "QC012", batchId: "BATCH006", subjectId: "SUB006", testName: "Coagulation", qcDate: "2024-01-22", qcType: "Lot Change", controlLevel: "Normal", observedValue: "12.8", expectedRange: "12.0-13.0", deviation: "0.2", status: "Needs Retest", approvedBy: null, approvalDate: null, qcTechnician: "Tech Mary", comments: "New lot verification needed" },
    { id: 13, qcId: "QC013", batchId: "BATCH007", subjectId: "SUB007", testName: "Cardiac Markers", qcDate: "2024-01-25", qcType: "Weekly", controlLevel: "Low", observedValue: "0.048", expectedRange: "0.045-0.055", deviation: "0.003", status: "Approved", approvedBy: "Dr. Smith", approvalDate: "2024-01-25", qcTechnician: "Tech Robert", comments: "Pass" },
    { id: 14, qcId: "QC014", batchId: "BATCH007", subjectId: "SUB007", testName: "Inflammatory", qcDate: "2024-01-25", qcType: "Daily", controlLevel: "High", observedValue: "9.2", expectedRange: "8.5-9.5", deviation: "0.3", status: "Rejected", approvedBy: "Dr. Smith", approvalDate: "2024-01-25", qcTechnician: "Tech Robert", comments: "High bias detected" },
    { id: 15, qcId: "QC015", batchId: "BATCH008", subjectId: "SUB008", testName: "Hormone Panel", qcDate: "2024-01-28", qcType: "Monthly", controlLevel: "Normal", observedValue: "48", expectedRange: "45-55", deviation: "3", status: "Pending", approvedBy: null, approvalDate: null, qcTechnician: "Tech Sarah", comments: "Pending review" },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(qc => {
      initialLogs.push(...getDemoAuditLogs(qc.qcId, qc.testName));
    });
    return initialLogs;
  });
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<QCApproval | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<QCApproval>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "QC Approval",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);

  const handleView = useCallback((item: QCApproval) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: QCApproval) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: QCApproval) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: QCApproval) => {
    Swal.fire({
      title: "Delete QC Record?",
      text: `Delete QC record ${item.qcId} for ${item.testName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Deleted!", "QC record has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      const oldData = { ...selectedItem };
      const newData: QCApproval = {
        ...selectedItem,
        ...editFormData,
        approvalDate: editFormData.status === "Approved" && !editFormData.approvalDate ? new Date().toISOString().split('T')[0] : editFormData.approvalDate ?? selectedItem.approvalDate,
        approvedBy: editFormData.status === "Approved" && !editFormData.approvedBy ? "Current QC Approver" : editFormData.approvedBy ?? selectedItem.approvedBy,
      } as QCApproval;
      setData((prevData) => prevData.map((item) => item.id === selectedItem.id ? newData : item));
      addAuditLog("UPDATE", selectedItem.id, oldData, newData);
      Swal.fire("Updated!", "QC approval status updated.", "success");
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

  const getStatusColor = (status: QCApproval["status"]) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "In Review": return "bg-blue-100 text-blue-700";
      case "Rejected": return "bg-red-100 text-red-700";
      case "Needs Retest": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDeviationStatus = (deviation: string) => {
    const devNum = parseFloat(deviation);
    if (devNum < 1) return "text-green-600";
    if (devNum < 3) return "text-yellow-600";
    return "text-red-600";
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

  const columns: ColumnDef<QCApproval>[] = useMemo(() => [
    { accessorKey: "qcId", header: "QC ID" },
    { accessorKey: "batchId", header: "Batch ID" },
    { accessorKey: "testName", header: "Test Name" },
    { accessorKey: "qcType", header: "QC Type" },
    { accessorKey: "controlLevel", header: "Level" },
    { accessorKey: "observedValue", header: "Observed" },
    { accessorKey: "deviation", header: "Deviation", cell: ({ getValue }) => { const value = getValue<string>(); return <span className={getDeviationStatus(value)}>{value}</span>; } },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => { const value = getValue<QCApproval["status"]>(); return <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>{value}</span>; } },
    { id: "actions", header: "Actions", cell: ({ row }) => (<ActionMenu<QCApproval> item={row.original} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAuditLog={handleAuditLog} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />) },
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
            <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search QC records..." />
            <ColumnToggle table={table} />
            <NavigateButton label="Add QC Record" path="/qc/new-add" icon={<Plus size={18} />} />
          </div>
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>

      <CustomPanel isOpen={panelMode === "view"} title="View QC Record" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-600">QC ID</label><p className="mt-1 text-gray-900">{selectedItem.qcId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Batch ID</label><p className="mt-1 text-gray-900">{selectedItem.batchId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Subject ID</label><p className="mt-1 text-gray-900">{selectedItem.subjectId}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Test Name</label><p className="mt-1 text-gray-900">{selectedItem.testName}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">QC Date</label><p className="mt-1 text-gray-900">{selectedItem.qcDate}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">QC Type</label><p className="mt-1 text-gray-900">{selectedItem.qcType}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Control Level</label><p className="mt-1 text-gray-900">{selectedItem.controlLevel}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Observed Value</label><p className="mt-1 text-gray-900">{selectedItem.observedValue}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Expected Range</label><p className="mt-1 text-gray-900">{selectedItem.expectedRange}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Deviation</label><p className={`mt-1 ${getDeviationStatus(selectedItem.deviation)}`}>{selectedItem.deviation}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">QC Technician</label><p className="mt-1 text-gray-900">{selectedItem.qcTechnician}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
            <div><label className="block text-sm font-medium text-gray-600">Approved By</label><p className="mt-1 text-gray-900">{selectedItem.approvedBy || "Not approved"}</p></div>
            <div><label className="block text-sm font-medium text-gray-600">Approval Date</label><p className="mt-1 text-gray-900">{selectedItem.approvalDate || "N/A"}</p></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-600">Comments</label><p className="mt-1 text-gray-900">{selectedItem.comments || "No comments"}</p></div>
          </div>
        )}
      </CustomPanel>

      <CustomPanel isOpen={panelMode === "edit"} title="QC Review & Approval" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Submit Decision">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700">Observed Value</label><input type="text" value={editFormData.observedValue || ""} onChange={(e) => setEditFormData({ ...editFormData, observedValue: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Deviation</label><input type="text" value={editFormData.deviation || ""} onChange={(e) => setEditFormData({ ...editFormData, deviation: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as QCApproval["status"] })} className="w-full px-3 py-2 border rounded-lg"><option value="Pending">Pending</option><option value="In Review">In Review</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option><option value="Needs Retest">Needs Retest</option></select></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Comments</label><textarea rows={4} value={editFormData.comments || ""} onChange={(e) => setEditFormData({ ...editFormData, comments: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="Add QC review comments..."/></div>
          </div>
        )}
      </CustomPanel>

      {/* ✅ SIMPLE AUDIT LOG PANEL */}
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.qcId || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
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

export default FinalQCApprovalTable;