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
import CustomPanel from "../../../common/CustomPanel";
import * as Dialog from "@radix-ui/react-dialog";

// ✅ TYPE

type User = {
  id: number;
  name: string;
  age:number;
  email: string;
  location:string;
  bloodgroup:string;
  phonenumber:string;
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
const UserForm = () => {

   const getDemoAuditLogs = (visitId: string, visitName: string): AuditLog[] => {
    return [
      {
        id: 1,
        action: "CREATE",
        recordId: 1,
        recordType: "User",
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
        recordType: "User",
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
        recordType: "User",
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
        recordType: "User",
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
        recordType: "User",
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
  
     const [data, setData] = useState<User[]>(() =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        age:31,
        email: `user${i + 1}@gmail.com`,
        location:'Chennai',
        bloodgroup:'O+',
        phonenumber:'9876543210'
      })),

  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 // Initialize with some demo audit logs for existing records
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(userItem => {
      const demos = getDemoAuditLogs(userItem.name, userItem.email);
      initialLogs.push(...demos);
    });
    return initialLogs;
  });

  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<User | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

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
      recordType: "User",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);


  const handleDelete = useCallback((item: User) => {
    console.log("Delete:", item);
    setIsDeleteDialogOpen(true);
    setOpenMenuId(null);
    const oldData = { ...item };
    setData((prev) => prev.filter((d) => d.id !== item.id));
    addAuditLog("DELETE", item.id, oldData, null);
  }, []);

  const handleView = useCallback((item: User) => {
    setSelectedItem(item);
    setPanelMode("view");
    addAuditLog("VIEW", item.id, null, item);
  }, [addAuditLog]);

  const handleEdit = useCallback((item: User) => {
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  const handleAuditLog = useCallback((item: User) => {
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
      // Swal.fire("Updated!", "User item has been updated.", "success");
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

  const getActionBadge = (action: AuditLog["action"]) => {
    const styles = {
      CREATE: "bg-green-100 text-green-700",
      UPDATE: "bg-blue-100 text-blue-700",
      DELETE: "bg-red-100 text-red-700",
      VIEW: "bg-gray-100 text-gray-700",
    };
    return styles[action];
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
  const columns: ColumnDef<User>[] = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
        { accessorKey: "age", header: "Age" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "bloodgroup", header: "Blood Group" },
      { accessorKey: "phonenumber", header: "Phone Number" },
 {
         id: "actions",
         header: "Actions",
         cell: ({ row }) => (
           <ActionMenu<User>
             item={row.original}
             onView={handleView}
             onEdit={handleEdit}
             onDelete={handleDelete}
             onAuditLog={handleAuditLog}
           />
         ),
       },
    ],
    [openMenuId, handleView, handleEdit, handleDelete]
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
            label="Add User"
            path="/user-form/new"
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
            <CustomPanel isOpen={panelMode === "view"} title="View User" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
              {selectedItem && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">ID</label><p className="mt-1 text-gray-900">{selectedItem.id}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Name</label><p className="mt-1 text-gray-900">{selectedItem.name}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Age</label><p className="mt-1 text-gray-900">{selectedItem.age}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Email</label><p className="mt-1 text-gray-900">{selectedItem.email}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Location</label><p className="mt-1 text-gray-900">{selectedItem.location}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Blood Group</label><p className="mt-1 text-gray-900">{selectedItem.bloodgroup}</p></div>
                  <div className="border-b pb-3"><label className="block text-sm font-medium text-gray-600">Phone Number</label><p className="mt-1 text-gray-900">{selectedItem.phonenumber}</p></div>
                </div>
              )}
            </CustomPanel>
      
            {/* Edit Panel */}
            <CustomPanel isOpen={panelMode === "edit"} title="Edit User" onClose={handleClosePanel} onSave={handleSaveEdit} saveLabel="Save Changes">
              {selectedItem && (
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input type="text" value={editFormData.name || ""} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Age</label><input type="number" value={editFormData.age || 0} onChange={(e) => setEditFormData({ ...editFormData, age: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" value={editFormData.email || ""} onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><input type="text" value={editFormData.location || ""} onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label><input type="text" value={editFormData.bloodgroup || ""} onChange={(e) => setEditFormData({ ...editFormData, bloodgroup: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="text" value={editFormData.phonenumber || ""} onChange={(e) => setEditFormData({ ...editFormData, phonenumber: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
                </div>
              )}
            </CustomPanel>
      
            {/* Audit Log Panel with Demo Data */}
             <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.name || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
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
              Are you sure you want to delete this User?
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

export default UserForm;