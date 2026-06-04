// src/components/BiobankManagementModule/BiobankManagementTable.tsx
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

type BiobankSample = {
  id: number;
  sampleId: string;
  subjectId: string;
  sampleType: "Blood" | "Serum" | "Plasma" | "Urine" | "Tissue";
  collectionDate: string;
  storageLocation: string;
  temperature: string;
  quantity: number;
  unit: string;
  status: "Available" | "Used" | "Expired" | "Quarantined";
  expiryDate: string;
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
const getDemoAuditLogs = (sampleId: string, sampleType: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Biobank Sample",
      oldData: null,
      newData: JSON.stringify({ sampleId, subjectId: "SUB001", sampleType, collectionDate: "2024-01-10", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 5, unit: "mL", status: "Available", expiryDate: "2025-01-10" }, null, 2),
      changedBy: "lab.technician@example.com",
      changedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "VIEW",
      recordId: 1,
      recordType: "Biobank Sample",
      oldData: null,
      newData: JSON.stringify({ sampleId, sampleType, status: "Available" }, null, 2),
      changedBy: "researcher@example.com",
      changedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "UPDATE",
      recordId: 1,
      recordType: "Biobank Sample",
      oldData: JSON.stringify({ sampleId, storageLocation: "Freezer A1" }, null, 2),
      newData: JSON.stringify({ sampleId, storageLocation: "Freezer B2" }, null, 2),
      changedBy: "lab.manager@example.com",
      changedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "Biobank Sample",
      oldData: JSON.stringify({ sampleId, quantity: 5, status: "Available" }, null, 2),
      newData: JSON.stringify({ sampleId, quantity: 3, status: "Used" }, null, 2),
      changedBy: "researcher@example.com",
      changedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
  ];
};

const BiobankManagementTable = () => {
  const [data, setData] = useState<BiobankSample[]>([
    { id: 1, sampleId: "BIO001", subjectId: "SUB001", sampleType: "Blood", collectionDate: "2024-01-10", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 5, unit: "mL", status: "Available", expiryDate: "2025-01-10" },
    { id: 2, sampleId: "BIO002", subjectId: "SUB001", sampleType: "Serum", collectionDate: "2024-01-10", storageLocation: "Freezer B2", temperature: "-20°C", quantity: 3, unit: "mL", status: "Available", expiryDate: "2025-01-10" },
    { id: 3, sampleId: "BIO003", subjectId: "SUB002", sampleType: "Plasma", collectionDate: "2024-01-12", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 4, unit: "mL", status: "Used", expiryDate: "2025-01-12" },
    { id: 4, sampleId: "BIO004", subjectId: "SUB002", sampleType: "Urine", collectionDate: "2024-01-12", storageLocation: "Rack C3", temperature: "4°C", quantity: 10, unit: "mL", status: "Available", expiryDate: "2024-07-12" },
    { id: 5, sampleId: "BIO005", subjectId: "SUB003", sampleType: "Tissue", collectionDate: "2024-01-15", storageLocation: "Freezer D4", temperature: "-80°C", quantity: 2, unit: "g", status: "Available", expiryDate: "2026-01-15" },
    { id: 6, sampleId: "BIO006", subjectId: "SUB003", sampleType: "Blood", collectionDate: "2024-01-15", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 6, unit: "mL", status: "Expired", expiryDate: "2024-01-15" },
    { id: 7, sampleId: "BIO007", subjectId: "SUB004", sampleType: "Serum", collectionDate: "2024-01-18", storageLocation: "Freezer B2", temperature: "-20°C", quantity: 3, unit: "mL", status: "Quarantined", expiryDate: "2025-01-18" },
    { id: 8, sampleId: "BIO008", subjectId: "SUB004", sampleType: "Plasma", collectionDate: "2024-01-18", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 4, unit: "mL", status: "Available", expiryDate: "2025-01-18" },
    { id: 9, sampleId: "BIO009", subjectId: "SUB005", sampleType: "Urine", collectionDate: "2024-01-20", storageLocation: "Rack C3", temperature: "4°C", quantity: 8, unit: "mL", status: "Available", expiryDate: "2024-07-20" },
    { id: 10, sampleId: "BIO010", subjectId: "SUB005", sampleType: "Blood", collectionDate: "2024-01-20", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 5, unit: "mL", status: "Used", expiryDate: "2025-01-20" },
    { id: 11, sampleId: "BIO011", subjectId: "SUB006", sampleType: "Tissue", collectionDate: "2024-01-22", storageLocation: "Freezer D4", temperature: "-80°C", quantity: 3, unit: "g", status: "Available", expiryDate: "2026-01-22" },
    { id: 12, sampleId: "BIO012", subjectId: "SUB006", sampleType: "Serum", collectionDate: "2024-01-22", storageLocation: "Freezer B2", temperature: "-20°C", quantity: 2, unit: "mL", status: "Available", expiryDate: "2025-01-22" },
    { id: 13, sampleId: "BIO013", subjectId: "SUB007", sampleType: "Plasma", collectionDate: "2024-01-25", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 4, unit: "mL", status: "Expired", expiryDate: "2024-01-25" },
    { id: 14, sampleId: "BIO014", subjectId: "SUB007", sampleType: "Blood", collectionDate: "2024-01-25", storageLocation: "Freezer A1", temperature: "-80°C", quantity: 5, unit: "mL", status: "Quarantined", expiryDate: "2025-01-25" },
    { id: 15, sampleId: "BIO015", subjectId: "SUB008", sampleType: "Urine", collectionDate: "2024-01-28", storageLocation: "Rack C3", temperature: "4°C", quantity: 10, unit: "mL", status: "Available", expiryDate: "2024-07-28" },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(sample => {
      initialLogs.push(...getDemoAuditLogs(sample.sampleId, sample.sampleType));
    });
    return initialLogs;
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<BiobankSample | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<BiobankSample>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "Biobank Sample",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);

  const handleView = useCallback((item: BiobankSample) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: BiobankSample) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: BiobankSample) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: BiobankSample) => {
    Swal.fire({
      title: "Delete Sample?",
      text: `Delete ${item.sampleId} (${item.sampleType})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Deleted!", "Sample has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      const oldData = { ...selectedItem };
      const newData = { ...selectedItem, ...editFormData };
      setData((prevData) => prevData.map((item) => item.id === selectedItem.id ? newData : item));
      addAuditLog("UPDATE", selectedItem.id, oldData, newData);
      Swal.fire("Updated!", "Sample updated.", "success");
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

  const getStatusColor = (status: BiobankSample["status"]) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-700";
      case "Used": return "bg-blue-100 text-blue-700";
      case "Expired": return "bg-red-100 text-red-700";
      case "Quarantined": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSampleTypeIcon = (type: BiobankSample["sampleType"]) => {
    const icons = { Blood: "🩸", Serum: "💧", Plasma: "💉", Urine: "🧪", Tissue: "🔬" };
    return icons[type];
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

  const columns: ColumnDef<BiobankSample>[] = useMemo(() => [
    { accessorKey: "sampleId", header: "Sample ID" },
    { accessorKey: "subjectId", header: "Subject ID" },
    { accessorKey: "sampleType", header: "Sample Type", cell: ({ getValue }) => { const value = getValue<BiobankSample["sampleType"]>(); return <span>{getSampleTypeIcon(value)} {value}</span>; } },
    { accessorKey: "collectionDate", header: "Collection Date" },
    { accessorKey: "storageLocation", header: "Location" },
    { accessorKey: "temperature", header: "Temp" },
    { accessorKey: "quantity", header: "Qty" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => { const value = getValue<BiobankSample["status"]>(); return <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>{value}</span>; } },
    { id: "actions", header: "Actions", cell: ({ row }) => (<ActionMenu<BiobankSample> item={row.original} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onAuditLog={handleAuditLog} openMenuId={openMenuId} setOpenMenuId={setOpenMenuId} />) },
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
            <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search samples..." />
            <ColumnToggle table={table} />
            <NavigateButton label="Add Sample" path="/biobank/new-add" icon={<Plus size={18} />} />
          </div>
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>

      <CustomPanel isOpen={panelMode === "view"} title="View Sample" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (<div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-600">Sample ID</label><p className="mt-1 text-gray-900">{selectedItem.sampleId}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Subject ID</label><p className="mt-1 text-gray-900">{selectedItem.subjectId}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Sample Type</label><p className="mt-1 text-gray-900">{getSampleTypeIcon(selectedItem.sampleType)} {selectedItem.sampleType}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Collection Date</label><p className="mt-1 text-gray-900">{selectedItem.collectionDate}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Storage Location</label><p className="mt-1 text-gray-900">{selectedItem.storageLocation}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Temperature</label><p className="mt-1 text-gray-900">{selectedItem.temperature}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Quantity</label><p className="mt-1 text-gray-900">{selectedItem.quantity} {selectedItem.unit}</p></div>
          <div><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
          <div className="col-span-2"><label className="block text-sm font-medium text-gray-600">Expiry Date</label><p className="mt-1 text-gray-900">{selectedItem.expiryDate}</p></div>
        </div>)}
      </CustomPanel>

      <CustomPanel isOpen={panelMode === "edit"} title="Edit Sample" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Save Changes">
        {selectedItem && (<div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700">Sample Type</label><select value={editFormData.sampleType || ""} onChange={(e) => setEditFormData({ ...editFormData, sampleType: e.target.value as BiobankSample["sampleType"] })} className="w-full px-3 py-2 border rounded-lg"><option value="Blood">Blood</option><option value="Serum">Serum</option><option value="Plasma">Plasma</option><option value="Urine">Urine</option><option value="Tissue">Tissue</option></select></div>
          <div><label className="block text-sm font-medium text-gray-700">Storage Location</label><input type="text" value={editFormData.storageLocation || ""} onChange={(e) => setEditFormData({ ...editFormData, storageLocation: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Quantity</label><input type="number" value={editFormData.quantity || ""} onChange={(e) => setEditFormData({ ...editFormData, quantity: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-medium text-gray-700">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as BiobankSample["status"] })} className="w-full px-3 py-2 border rounded-lg"><option value="Available">Available</option><option value="Used">Used</option><option value="Expired">Expired</option><option value="Quarantined">Quarantined</option></select></div>
          <div className="col-span-2"><label className="block text-sm font-medium text-gray-700">Expiry Date</label><input type="date" value={editFormData.expiryDate || ""} onChange={(e) => setEditFormData({ ...editFormData, expiryDate: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
        </div>)}
      </CustomPanel>

      {/* ✅ SIMPLE AUDIT LOG PANEL */}
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.sampleId || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
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

export default BiobankManagementTable;