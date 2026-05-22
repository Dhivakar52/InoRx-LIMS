// src/components/VisitModule/VisitTable.tsx
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

type Visit = {
  id: number;
  visitId: string;
  subject: string;
  visitName: string;
  status: string;
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

// ✅ SIMPLE DEMO AUDIT LOG DATA
const getDemoAuditLogs = (visitId: string, visitName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Visit",
      oldData: null,
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "VIEW",
      recordId: 1,
      recordType: "Visit",
      oldData: null,
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      changedBy: "dr.smith@example.com",
      changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "UPDATE",
      recordId: 1,
      recordType: "Visit",
      oldData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "In Progress" }, null, 2),
      changedBy: "coordinator@example.com",
      changedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "Visit",
      oldData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "In Progress" }, null, 2),
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Completed" }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
  ];
};

const VisitTable = () => {
  const [data, setData] = useState<Visit[]>([
    { id: 1, visitId: "VIS001", subject: "SUB001", visitName: "Screening", status: "Scheduled" },
    { id: 2, visitId: "VIS002", subject: "SUB001", visitName: "Baseline", status: "Completed" },
    { id: 3, visitId: "VIS003", subject: "SUB002", visitName: "Screening", status: "Completed" },
    { id: 4, visitId: "VIS004", subject: "SUB002", visitName: "Baseline", status: "Scheduled" },
    { id: 5, visitId: "VIS005", subject: "SUB003", visitName: "Week 1", status: "In Progress" },
    { id: 6, visitId: "VIS006", subject: "SUB003", visitName: "Week 2", status: "Scheduled" },
    { id: 7, visitId: "VIS007", subject: "SUB004", visitName: "Screening", status: "Completed" },
    { id: 8, visitId: "VIS008", subject: "SUB004", visitName: "Baseline", status: "Completed" },
    { id: 9, visitId: "VIS009", subject: "SUB005", visitName: "Week 1", status: "In Progress" },
    { id: 10, visitId: "VIS010", subject: "SUB005", visitName: "Week 2", status: "Scheduled" },
    { id: 11, visitId: "VIS011", subject: "SUB006", visitName: "Screening", status: "Scheduled" },
    { id: 12, visitId: "VIS012", subject: "SUB006", visitName: "Baseline", status: "In Progress" },
    { id: 13, visitId: "VIS013", subject: "SUB007", visitName: "Week 1", status: "Completed" },
    { id: 14, visitId: "VIS014", subject: "SUB007", visitName: "Week 2", status: "Scheduled" },
    { id: 15, visitId: "VIS015", subject: "SUB008", visitName: "Screening", status: "Completed" },
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(visit => {
      initialLogs.push(...getDemoAuditLogs(visit.visitId, visit.visitName));
    });
    return initialLogs;
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Visit | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<Visit>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const addAuditLog = useCallback((
    action: AuditLog["action"],
    recordId: number,
    oldData: any | null,
    newData: any | null
  ) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "Visit",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);

  const handleView = useCallback((item: Visit) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: Visit) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: Visit) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: Visit) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item.visitId} - ${item.visitName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Deleted!", "Visit has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      const oldData = { ...selectedItem };
      const newData = { ...selectedItem, ...editFormData };
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id ? newData : item
        )
      );
      addAuditLog("UPDATE", selectedItem.id, oldData, newData);
      Swal.fire("Updated!", "Visit has been updated.", "success");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Scheduled": return "bg-blue-100 text-blue-700";
      case "In Progress": return "bg-yellow-100 text-yellow-700";
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

  const columns: ColumnDef<Visit>[] = useMemo(
    () => [
      { accessorKey: "visitId", header: "Visit ID" },
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "visitName", header: "Visit" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>
              {value}
            </span>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <ActionMenu<Visit>
            item={row.original}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAuditLog={handleAuditLog}
          />
        ),
      },
    ],
    [handleView, handleEdit, handleDelete, handleAuditLog]
  );

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnVisibility, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search visits..." />
          <ColumnToggle table={table} />
          <NavigateButton
            label="Add Visit"
            path="/visit/new-add"
            icon={<Plus size={18} />}
          />
        </div>

        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>

      {/* View Panel */}
      <CustomPanel isOpen={panelMode === "view"} title="View Visit" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Visit ID</label><p className="mt-1 text-gray-900">{selectedItem.visitId}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Subject</label><p className="mt-1 text-gray-900">{selectedItem.subject}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Visit Name</label><p className="mt-1 text-gray-900">{selectedItem.visitName}</p></div>
            <div className="border-b pb-3 col-span-2"><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
          </div>
        )}
      </CustomPanel>

      {/* Edit Panel */}
      <CustomPanel isOpen={panelMode === "edit"} title="Edit Visit" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Save Changes">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit ID</label><input type="text" value={editFormData.visitId || ""} onChange={(e) => setEditFormData({ ...editFormData, visitId: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input type="text" value={editFormData.subject || ""} onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Visit Name</label><input type="text" value={editFormData.visitName || ""} onChange={(e) => setEditFormData({ ...editFormData, visitName: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="Scheduled">Scheduled</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option></select></div>
          </div>
        )}
      </CustomPanel>

      {/* ✅ SIMPLE AUDIT LOG PANEL - Timeline Design */}
      <CustomPanel 
        isOpen={panelMode === "audit"} 
        title={`Audit Log - ${selectedItem?.visitId || ""}`} 
        onClose={handleClosePanel} 
        onSave={handleClosePanel} 
        saveLabel="Close"
      >
        {selectedAuditLogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">No audit records found</p>
          </div>
        ) : (
          <div className="space-y-0">
            {selectedAuditLogs.map((log, idx) => (
              <div key={log.id} className="flex">
                {/* Timeline Line */}
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-3 h-3 rounded-full ${getActionBadge(log.action).split(' ')[0]}`}></div>
                  {idx < selectedAuditLogs.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '40px' }}></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-400">{log.changedAt}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">
                      By: <span className="text-gray-700">{log.changedBy}</span>
                    </p>
                    
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

export default VisitTable;