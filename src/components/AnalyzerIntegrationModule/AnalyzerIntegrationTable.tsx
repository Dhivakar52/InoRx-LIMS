// src/components/AnalyzerIntegrationModule/AnalyzerIntegrationTable.tsx
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

type Analyzer = {
  id: number;
  analyzerId: string;
  analyzerName: string;
  model: string;
  status: "Online" | "Offline" | "Maintenance" | "Calibrating";
  lastCalibration: string;
  totalTests: number;
  integrationDate: string;
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
const getDemoAuditLogs = (analyzerId: string, analyzerName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Analyzer",
      oldData: null,
      newData: JSON.stringify({ analyzerId, analyzerName, model: "Cobas 6000", status: "Offline", lastCalibration: "2024-01-10", totalTests: 0, integrationDate: "2024-01-10" }, null, 2),
      changedBy: "lab.admin@example.com",
      changedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "UPDATE",
      recordId: 1,
      recordType: "Analyzer",
      oldData: JSON.stringify({ analyzerId, analyzerName, model: "Cobas 6000", status: "Offline" }, null, 2),
      newData: JSON.stringify({ analyzerId, analyzerName, model: "Cobas 6000", status: "Online", lastCalibration: "2024-01-15", totalTests: 12500 }, null, 2),
      changedBy: "tech.john@example.com",
      changedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "VIEW",
      recordId: 1,
      recordType: "Analyzer",
      oldData: null,
      newData: JSON.stringify({ analyzerId, analyzerName, status: "Online", totalTests: 12500 }, null, 2),
      changedBy: "quality.team@example.com",
      changedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "Analyzer",
      oldData: JSON.stringify({ analyzerId, analyzerName, status: "Online" }, null, 2),
      newData: JSON.stringify({ analyzerId, analyzerName, status: "Maintenance", lastCalibration: "2024-01-15" }, null, 2),
      changedBy: "tech.john@example.com",
      changedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 5,
      action: "UPDATE",
      recordId: 1,
      recordType: "Analyzer",
      oldData: JSON.stringify({ analyzerId, analyzerName, status: "Maintenance" }, null, 2),
      newData: JSON.stringify({ analyzerId, analyzerName, status: "Online", lastCalibration: "2024-02-20", totalTests: 18700 }, null, 2),
      changedBy: "lab.admin@example.com",
      changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
  ];
};

const AnalyzerIntegrationTable = () => {
  const [data, setData] = useState<Analyzer[]>([
    { id: 1, analyzerId: "ANL001", analyzerName: "Roche Cobas 6000", model: "Cobas 6000", status: "Online", lastCalibration: "2024-01-15", totalTests: 12500, integrationDate: "2023-06-10" },
    { id: 2, analyzerId: "ANL002", analyzerName: "Abbott Architect", model: "Architect i2000", status: "Online", lastCalibration: "2024-01-20", totalTests: 8900, integrationDate: "2023-07-15" },
    { id: 3, analyzerId: "ANL003", analyzerName: "Siemens Advia", model: "Advia 2120i", status: "Maintenance", lastCalibration: "2024-01-10", totalTests: 4500, integrationDate: "2023-08-20" },
    { id: 4, analyzerId: "ANL004", analyzerName: "Beckman Coulter", model: "AU680", status: "Calibrating", lastCalibration: "2024-01-18", totalTests: 6700, integrationDate: "2023-09-05" },
    { id: 5, analyzerId: "ANL005", analyzerName: "Mindray BS-480", model: "BS-480", status: "Offline", lastCalibration: "2024-01-05", totalTests: 3200, integrationDate: "2023-10-12" },
    { id: 6, analyzerId: "ANL006", analyzerName: "Roche Cobas 8000", model: "Cobas 8000", status: "Online", lastCalibration: "2024-01-22", totalTests: 18700, integrationDate: "2023-11-01" },
    { id: 7, analyzerId: "ANL007", analyzerName: "Abbott Alinity", model: "Alinity ci", status: "Online", lastCalibration: "2024-01-19", totalTests: 10300, integrationDate: "2023-12-10" },
    { id: 8, analyzerId: "ANL008", analyzerName: "Siemens Centaur", model: "Centaur XP", status: "Maintenance", lastCalibration: "2024-01-12", totalTests: 5600, integrationDate: "2024-01-05" },
    { id: 9, analyzerId: "ANL009", analyzerName: "Beckman DXI 800", model: "DXI 800", status: "Calibrating", lastCalibration: "2024-01-21", totalTests: 7800, integrationDate: "2024-01-15" },
    { id: 10, analyzerId: "ANL010", analyzerName: "Ortho Vitros", model: "5600", status: "Online", lastCalibration: "2024-01-23", totalTests: 4300, integrationDate: "2024-01-20" },
    { id: 11, analyzerId: "ANL011", analyzerName: "BioRad D-10", model: "D-10", status: "Offline", lastCalibration: "2024-01-08", totalTests: 2900, integrationDate: "2023-12-01" },
    { id: 12, analyzerId: "ANL012", analyzerName: "Sysmex XN-1000", model: "XN-1000", status: "Online", lastCalibration: "2024-01-24", totalTests: 11200, integrationDate: "2023-11-15" },
    { id: 13, analyzerId: "ANL013", analyzerName: "Roche LightCycler", model: "480", status: "Maintenance", lastCalibration: "2024-01-14", totalTests: 3400, integrationDate: "2023-10-20" },
    { id: 14, analyzerId: "ANL014", analyzerName: "Abbott m2000", model: "m2000", status: "Online", lastCalibration: "2024-01-16", totalTests: 6200, integrationDate: "2023-09-25" },
    { id: 15, analyzerId: "ANL015", analyzerName: "BD FACS Canto", model: "FACS Canto II", status: "Calibrating", lastCalibration: "2024-01-17", totalTests: 5100, integrationDate: "2023-08-30" },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(analyzer => {
      initialLogs.push(...getDemoAuditLogs(analyzer.analyzerId, analyzer.analyzerName));
    });
    return initialLogs;
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Analyzer | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<Analyzer>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "Analyzer",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);

  const handleView = useCallback((item: Analyzer) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: Analyzer) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: Analyzer) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: Analyzer) => {
    Swal.fire({
      title: "Remove Analyzer?",
      text: `Remove ${item.analyzerName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Removed!", "Analyzer has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      const oldData = { ...selectedItem };
      const newData = { ...selectedItem, ...editFormData };
      setData((prev) => prev.map((item) => item.id === selectedItem.id ? newData : item));
      addAuditLog("UPDATE", selectedItem.id, oldData, newData);
      Swal.fire("Updated!", "Analyzer updated.", "success");
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

  const getStatusColor = (status: Analyzer["status"]) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-700";
      case "Offline": return "bg-red-100 text-red-700";
      case "Maintenance": return "bg-orange-100 text-orange-700";
      case "Calibrating": return "bg-yellow-100 text-yellow-700";
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

  const columns: ColumnDef<Analyzer>[] = useMemo(() => [
    { accessorKey: "analyzerId", header: "Analyzer ID" },
    { accessorKey: "analyzerName", header: "Analyzer Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "lastCalibration", header: "Last Calibration" },
    { accessorKey: "totalTests", header: "Total Tests" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => { const value = getValue<Analyzer["status"]>(); return <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>{value}</span>; } },
    { id: "actions", header: "Actions", cell: ({ row }) => (<ActionMenu<Analyzer> item={row.original} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAuditLog={handleAuditLog} />) },
  ], [handleView, handleEdit, handleDelete, handleAuditLog]);

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
            <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search analyzers..." />
            <ColumnToggle table={table} />
            <NavigateButton label="Add Analyzer" path="/analyzer/new-add" icon={<Plus size={18} />} />
          </div>
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>

      <CustomPanel isOpen={panelMode === "view"} title="View Analyzer" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (<div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-600">Analyzer ID</label><p className="mt-1 text-gray-900">{selectedItem.analyzerId}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Analyzer Name</label><p className="mt-1 text-gray-900">{selectedItem.analyzerName}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Model</label><p className="mt-1 text-gray-900">{selectedItem.model}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
          <div><label className="block text-sm font-medium text-gray-600">Last Calibration</label><p className="mt-1 text-gray-900">{selectedItem.lastCalibration}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Total Tests</label><p className="mt-1 text-gray-900">{selectedItem.totalTests.toLocaleString()}</p></div>
          <div className="col-span-2"><label className="block text-sm font-medium text-gray-600">Integration Date</label><p className="mt-1 text-gray-900">{selectedItem.integrationDate}</p></div>
        </div>)}
      </CustomPanel>

      <CustomPanel isOpen={panelMode === "edit"} title="Edit Analyzer" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Save Changes">
        {selectedItem && (<div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700">Analyzer ID</label><input type="text" value={editFormData.analyzerId || ""} onChange={(e) => setEditFormData({ ...editFormData, analyzerId: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Analyzer Name</label><input type="text" value={editFormData.analyzerName || ""} onChange={(e) => setEditFormData({ ...editFormData, analyzerName: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Model</label><input type="text" value={editFormData.model || ""} onChange={(e) => setEditFormData({ ...editFormData, model: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as Analyzer["status"] })} className="w-full px-3 py-2 border rounded-lg"><option value="Online">Online</option><option value="Offline">Offline</option><option value="Maintenance">Maintenance</option><option value="Calibrating">Calibrating</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700">Last Calibration</label><input type="date" value={editFormData.lastCalibration || ""} onChange={(e) => setEditFormData({ ...editFormData, lastCalibration: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
        </div>)}
      </CustomPanel>

      {/* ✅ SIMPLE AUDIT LOG PANEL */}
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.analyzerId || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
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

export default AnalyzerIntegrationTable;