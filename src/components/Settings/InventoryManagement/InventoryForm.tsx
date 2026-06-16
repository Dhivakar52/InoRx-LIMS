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

type Inventory = {
  id: number;
  itemName: string;
  lotNumber: string;
  category: string;
  storageLocation: string;
  expirationDate: string;
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

const InventoryForm = () => {

  const getDemoAuditLogs = (qcId: string, testName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Inventory",
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
      recordType: "Inventory",
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
      recordType: "Inventory",
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
      recordType: "Inventory",
      oldData: JSON.stringify({ qcId, status: "In Review" }, null, 2),
      newData: JSON.stringify({ qcId, status: "Approved", approvedBy: "Dr. Smith", approvalDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], comments: "QC passed - Approved for use" }, null, 2),
      changedBy: "quality.manager@example.com",
      changedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
  ];
};

 const [data, setData] = useState<Inventory[]>([
  {
    id: 1,
    itemName: "QIAamp DNA Blood Kit",
    lotNumber: "LOT-8493021",
    category: "Extraction",
    storageLocation: "Boston Gen / Fridge 2",
    expirationDate: "2027-12-31",
    status: "QUARANTINED",
  },
  {
    id: 2,
    itemName: "TaqMan PCR Master Mix",
    lotNumber: "LOT-MM9902",
    category: "PCR",
    storageLocation: "Boston Gen / Freezer 5",
    expirationDate: "2026-08-15",
    status: "ACTIVE",
  },
  {
    id: 3,
    itemName: "Eppendorf Tubes 1.5mL",
    lotNumber: "LOT-EP441",
    category: "Consumable",
    storageLocation: "Boston Gen / Cabinet A",
    expirationDate: "2030-01-01",
    status: "ACTIVE",
  },
  {
    id: 4,
    itemName: "RNA Lysis Buffer",
    lotNumber: "LOT-RB001",
    category: "Extraction",
    storageLocation: "London Lab / Room 2",
    expirationDate: "2026-07-01",
    status: "LOW STOCK",
  },
  {
    id: 5,
    itemName: "Cryovials 2mL",
    lotNumber: "LOT-CV887",
    category: "Storage",
    storageLocation: "New York Lab / Shelf 3",
    expirationDate: "2029-05-12",
    status: "ACTIVE",
  },
  {
    id: 6,
    itemName: "DNA Stabilization Reagent",
    lotNumber: "LOT-DS221",
    category: "Preservation",
    storageLocation: "Boston Gen / Freezer 1",
    expirationDate: "2027-10-20",
    status: "ACTIVE",
  },
  {
    id: 7,
    itemName: "Proteinase K",
    lotNumber: "LOT-PK113",
    category: "Extraction",
    storageLocation: "London Lab / Fridge 1",
    expirationDate: "2026-09-30",
    status: "LOW STOCK",
  },
  {
    id: 8,
    itemName: "PCR Plate 96 Well",
    lotNumber: "LOT-PCR777",
    category: "PCR",
    storageLocation: "Berlin Lab / Cabinet B",
    expirationDate: "2028-04-18",
    status: "ACTIVE",
  },
  {
    id: 9,
    itemName: "Liquid Nitrogen Tank Refill",
    lotNumber: "LOT-LN900",
    category: "Storage",
    storageLocation: "Boston Gen / Cryo Room",
    expirationDate: "2026-12-31",
    status: "ACTIVE",
  },
  {
    id: 10,
    itemName: "RNase-Free Water",
    lotNumber: "LOT-RW555",
    category: "Reagent",
    storageLocation: "Singapore Lab / Shelf 2",
    expirationDate: "2026-06-30",
    status: "EXPIRED",
  },
]);
const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";

    case "LOW STOCK":
      return "bg-yellow-100 text-yellow-700";

    case "QUARANTINED":
      return "bg-orange-100 text-orange-700";

    case "EXPIRED":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
      const initialLogs: AuditLog[] = [];
      data.forEach(inv => {
        initialLogs.push(...getDemoAuditLogs(inv.itemName, inv.category));
      });
      return initialLogs;
    });

  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [_editFormData, setEditFormData] = useState<Partial<Inventory>>({});

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
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
    const oldData = { ...item };
    setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
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


  // const handleSaveEdit = useCallback(() => {
  //   if (selectedItem && editFormData) {
  //     const oldData = { ...selectedItem };
  //     const newData = { ...selectedItem, ...editFormData };
  //     setData((prevData) =>
  //       prevData.map((item) =>
  //         item.id === selectedItem.id ? newData : item
  //       )
  //     );
  //     addAuditLog("UPDATE", selectedItem.id, oldData, newData);
  //     // Swal.fire("Updated!", "Inventory item has been updated.", "success");
  //     setPanelMode(null);
  //     setSelectedItem(null);
  //     setEditFormData({});
  //   }
  // }, [selectedItem, editFormData, addAuditLog]);

  const handleClosePanel = useCallback(() => {
    setPanelMode(null);
    setSelectedItem(null);
    setEditFormData({});
    setSelectedAuditLogs([]);
  }, []);

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "Available": return "bg-green-100 text-green-700";
  //     case "Out of Stock": return "bg-yellow-100 text-yellow-700";
  //     default: return "bg-gray-100 text-gray-700";
  //   }
  // };

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

  const columns: ColumnDef<Inventory>[] = useMemo(
  () => [
    {
      accessorKey: "itemName",
      header: "ITEM NAME",
    },
    {
      accessorKey: "lotNumber",
      header: "LOT NUMBER",
    },
    {
      accessorKey: "category",
      header: "CATEGORY",
    },
    {
      accessorKey: "storageLocation",
      header: "STORAGE LOCATION",
    },
    {
      accessorKey: "expirationDate",
      header: "EXPIRATION DATE",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
              value
            )}`}
          >
            {value}
          </span>
        );
      },
    },

    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <ActionMenu<Inventory>
          item={row.original}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAuditLog={handleAuditLog}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      ),
    },
  ],
  [
    openMenuId,
    handleView,
    handleEdit,
    handleDelete,
    handleAuditLog,
  ]
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
      {/* Audit Log Panel with Demo Data */}
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.itemName || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
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