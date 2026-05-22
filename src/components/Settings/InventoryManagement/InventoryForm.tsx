import { useMemo, useState, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { Plus } from "lucide-react";
import { DataTable } from "../../../common/DataTable";
import Pagination from "../../../common/Pagination";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import { ActionMenu } from "../../../common/ActionMenu";
import NavigateButton from "../../../common/NavigateButton";
import * as Dialog from "@radix-ui/react-dialog";
import CustomPanel from "../../../common/CustomPanel";

// ✅ TYPE
type Inventory = {
  id: number;
  itemName: string;
  category: string;
  quantity:number;
  supplier:string;
  status:string;
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

const InventoryForm = () => {

  const getDemoAuditLogs = (visitId: string, visitName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Inventory",
      oldData: null,
      newData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "Scheduled"
      }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "VIEW",
      recordId: 1,
      recordType: "Inventory",
      oldData: null,
      newData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "Scheduled"
      }, null, 2),
      changedBy: "dr.smith@example.com",
      changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "UPDATE",
      recordId: 1,
      recordType: "Inventory",
      oldData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "Scheduled"
      }, null, 2),
      newData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "In Progress"
      }, null, 2),
      changedBy: "coordinator@example.com",
      changedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "VIEW",
      recordId: 1,
      recordType: "Inventory",
      oldData: null,
      newData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "In Progress"
      }, null, 2),
      changedBy: "dr.johnson@example.com",
      changedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.103",
    },
    {
      id: 5,
      action: "UPDATE",
      recordId: 1,
      recordType: "Inventory",
      oldData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "In Progress"
      }, null, 2),
      newData: JSON.stringify({
        visitId: visitId,
        subject: "SUB001",
        visitName: visitName,
        status: "Completed"
      }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
  ];
};

  // ✅ DATA
   const [data, setData] = useState<Inventory[]>([
  {
    id: 1,
    itemName: "Blood Collection Tubes",
    category: "Laboratory",
    quantity: 120,
    supplier: "MedSupply Pvt Ltd",
    status: "In Stock",
  },
  {
    id: 2,
    itemName: "Syringes 5ml",
    category: "Medical Consumables",
    quantity: 45,
    supplier: "HealthCare Medicals",
    status: "Low Stock",
  },
  {
    id: 3,
    itemName: "Glucose Testing Strips",
    category: "Diagnostics",
    quantity: 300,
    supplier: "DiagnoTech",
    status: "In Stock",
  },
  {
    id: 4,
    itemName: "MRI Contrast Dye",
    category: "Radiology",
    quantity: 12,
    supplier: "Radiant Pharma",
    status: "Low Stock",
  },
  {
    id: 5,
    itemName: "Surgical Gloves",
    category: "Safety",
    quantity: 500,
    supplier: "SafeCare Ltd",
    status: "In Stock",
  },
  {
    id: 6,
    itemName: "COVID Test Kits",
    category: "Virology",
    quantity: 0,
    supplier: "BioGen Labs",
    status: "Out of Stock",
  },
]);

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 // Initialize with some demo audit logs for existing records
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(inventoryItem => {
      const demos = getDemoAuditLogs(inventoryItem.category, inventoryItem.itemName);
      initialLogs.push(...demos);
    });
    return initialLogs;
  });

  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<Inventory>>({});

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
      recordType: "Inventory",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);


  const handleDelete = useCallback((item: Inventory) => {
    console.log("Delete:", item);
    setIsDeleteDialogOpen(true);
    setOpenMenuId(null);
  }, []);

  const handleView = useCallback((item: Inventory) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: Inventory) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: Inventory) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);


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
      // Swal.fire("Updated!", "Inventory item has been updated.", "success");
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
      case "Available": return "bg-green-100 text-green-700";
      case "Out of Stock": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getActionColor = (action: AuditLog["action"]) => {
    switch (action) {
      case "CREATE": return "bg-green-100 text-green-700 border-green-200";
      case "UPDATE": return "bg-blue-100 text-blue-700 border-blue-200";
      case "DELETE": return "bg-red-100 text-red-700 border-red-200";
      case "VIEW": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getActionIcon = (action: AuditLog["action"]) => {
    switch (action) {
      case "CREATE": return "➕";
      case "UPDATE": return "✏️";
      case "DELETE": return "🗑️";
      case "VIEW": return "👁️";
      default: return "📋";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ COLUMNS (memoized)
  const columns: ColumnDef<Inventory>[] = useMemo(
    () => [
      { accessorKey: "itemName", header: "Item" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "supplier", header: "Supplier" },
      { accessorKey: "status", header: "Status" },
      
       {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <ActionMenu<Inventory>
            item={row.original}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAuditLog={handleAuditLog}
          />
        ),
      },
    ],
    [openMenuId,handleView, handleEdit, handleDelete, handleAuditLog]
  );

  // ✅ PAGINATION
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE INSTANCE
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter,
      columnVisibility,
    },

    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: "includesString",
  });

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">

        {/* HEADER */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search..."
          />

          <ColumnToggle table={table} />
         <NavigateButton
            label="Add Inventory"
            path="/inventory/new"
            icon={<Plus size={18} />}
            />

        </div>

        {/* TABLE */}
        <DataTable table={table} columns={columns} />

        {/* PAGINATION */}
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />

      </div>
 {/* View Panel */}
      <CustomPanel isOpen={panelMode === "view"} title="View Inventory" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">ID</label><p className="mt-1 text-gray-900">{selectedItem.id}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Item Name</label><p className="mt-1 text-gray-900">{selectedItem.itemName}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Category</label><p className="mt-1 text-gray-900">{selectedItem.category}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Quantity</label><p className="mt-1 text-gray-900">{selectedItem.quantity}</p></div>
            <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Supplier</label><p className="mt-1 text-gray-900">{selectedItem.supplier}</p></div>
            <div className="border-b pb-3 col-span-2"><label className="block text-sm font-medium text-gray-600">Status</label><p className="mt-1"><span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedItem.status)}`}>{selectedItem.status}</span></p></div>
          </div>
        )}
      </CustomPanel>

      {/* Edit Panel */}
      <CustomPanel isOpen={panelMode === "edit"} title="Edit Inventory" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Save Changes">
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label><input type="text" value={editFormData.itemName || ""} onChange={(e) => setEditFormData({ ...editFormData, itemName: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label><input type="text" value={editFormData.category || ""} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label><input type="number" value={editFormData.quantity || 0} onChange={(e) => setEditFormData({ ...editFormData, quantity: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label><input type="text" value={editFormData.supplier || ""} onChange={(e) => setEditFormData({ ...editFormData, supplier: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
            <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={editFormData.status || ""} onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="In Stock">In Stock</option><option value="Low Stock">Low Stock</option><option value="Out of Stock">Out Of Stock</option></select></div>
          </div>
        )}
      </CustomPanel>

      {/* Audit Log Panel with Demo Data */}
      <CustomPanel 
        isOpen={panelMode === "audit"} 
        title={`Audit Log - ${selectedItem?.id || ""} (${selectedItem?.itemName || ""})`} 
        onClose={handleClosePanel} 
        onSave={handleClosePanel} 
        saveLabel="Close"
      >
        {selectedAuditLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <div className="text-gray-500 mb-2">No audit records found for this item.</div>
            <div className="text-sm text-gray-400">When you view, edit, or delete this record, activities will appear here.</div>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {/* Summary Stats */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">📊 Activity Summary</div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> CREATE: {selectedAuditLogs.filter(l => l.action === "CREATE").length}</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> UPDATE: {selectedAuditLogs.filter(l => l.action === "UPDATE").length}</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500"></span> VIEW: {selectedAuditLogs.filter(l => l.action === "VIEW").length}</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> DELETE: {selectedAuditLogs.filter(l => l.action === "DELETE").length}</div>
              </div>
            </div>

            {/* Audit Log Entries */}
            {selectedAuditLogs.map((log, index) => (
              <div key={log.id} className={`border rounded-lg p-4 ${getActionColor(log.action)} bg-opacity-30`}>
                <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)} border`}>
                      {getActionIcon(log.action)} {log.action}
                    </span>
                    <span className="text-xs text-gray-500">
                      #{log.id}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{log.changedAt}</div>
                    <div className="text-xs text-gray-400">IP: {log.ipAddress}</div>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="text-xs font-medium text-gray-600">👤 Changed By:</span>
                  <span className="text-xs text-gray-700 ml-2">{log.changedBy}</span>
                </div>

                {log.oldData && (
                  <div className="mb-3">
                    <div className="text-xs font-medium text-red-600 mb-1 flex items-center gap-1">
                      <span>📄 Before Change:</span>
                    </div>
                    <pre className="text-xs bg-red-50 p-2 rounded border border-red-200 overflow-x-auto max-h-32 overflow-y-auto">{log.oldData}</pre>
                  </div>
                )}
                
                {log.newData && (
                  <div>
                    <div className="text-xs font-medium text-green-600 mb-1 flex items-center gap-1">
                      <span>📄 After Change:</span>
                    </div>
                    <pre className="text-xs bg-green-50 p-2 rounded border border-green-200 overflow-x-auto max-h-32 overflow-y-auto">{log.newData}</pre>
                  </div>
                )}

                {/* Timeline connector */}
                {index < selectedAuditLogs.length - 1 && (
                  <div className="relative mt-3">
                    <div className="absolute left-4 top-0 w-px h-4 bg-gray-300"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CustomPanel>
      {/* ================= Delete Confirmation Dialog ================= */}
<Dialog.Root
  open={isDeleteDialogOpen}
  onOpenChange={setIsDeleteDialogOpen}
>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
    <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-sm
      -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">

      <Dialog.Title className="text-center text-lg font-semibold text-gray-900">
        Are you sure you want to delete this Inventory?
      </Dialog.Title>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsDeleteDialogOpen(false)}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
          No
        </button>
        <button
          
          className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700">
          Yes
        </button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
    </div>
  );
};

export default InventoryForm;