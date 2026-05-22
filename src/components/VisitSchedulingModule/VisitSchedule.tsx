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
import CustomPanel from "../../common/CustomPanel";

// ✅ TYPE
type Visit = {
  id: number;
  visitId: string;
  subject: string;
  visitName: string;
  status: string;
};

type PanelMode = "view" | "edit" | null;

const VisitTable = () => {
  // ✅ DATA with 15 entries
  const initialData: Visit[] = useMemo(
    () => [
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
    ],
    []
  );

  const [data, setData] = useState<Visit[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  
  // Panel state
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Visit | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Visit>>({});

  // ✅ View handler
  const handleView = useCallback((item: Visit) => {
    console.log("View:", item);
    setSelectedItem(item);
    setPanelMode("view");
  }, []);

  // ✅ Edit handler
  const handleEdit = useCallback((item: Visit) => {
    console.log("Edit:", item);
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  // ✅ Delete handler with SweetAlert2
  const handleDelete = useCallback((item: Visit) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item.visitId} - ${item.visitName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== item.id));
        Swal.fire("Deleted!", "Visit has been removed.", "success");
      }
    });
  }, []);

  // ✅ Save edited data
  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id ? { ...item, ...editFormData } : item
        )
      );
      console.log("Saved:", { ...selectedItem, ...editFormData });
      setPanelMode(null);
      setSelectedItem(null);
      setEditFormData({});
    }
  }, [selectedItem, editFormData]);

  // ✅ Close panel
  const handleClosePanel = useCallback(() => {
    setPanelMode(null);
    setSelectedItem(null);
    setEditFormData({});
  }, []);

  // ✅ Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ COLUMNS
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
        cell: ({ row }) => {
          const item = row.original;
          return (
            <ActionMenu
              item={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE
  const table = useReactTable({
    data,
    columns,
    state: { 
      globalFilter, 
      columnVisibility,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  // ✅ Panel title based on mode
  const panelTitle = panelMode === "view" ? "View Visit" : "Edit Visit";

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* HEADER */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search visits..."
          />
          <ColumnToggle table={table} />
        </div>

        {/* TABLE */}
        <DataTable table={table} columns={columns} />

        {/* PAGINATION */}
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />
      </div>

      {/* CUSTOM PANEL - View Mode */}
      <CustomPanel
        isOpen={panelMode === "view"}
        title={panelTitle}
        onClose={handleClosePanel}
        onSave={handleClosePanel}
        saveLabel="Close"
      >
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Visit ID</label>
              <p className="mt-1 text-gray-900">{selectedItem.visitId}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Subject</label>
              <p className="mt-1 text-gray-900">{selectedItem.subject}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Visit Name</label>
              <p className="mt-1 text-gray-900">{selectedItem.visitName}</p>
            </div>
            <div className="border-b pb-3 col-span-2">
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <p className="mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </CustomPanel>

      {/* CUSTOM PANEL - Edit Mode */}
      <CustomPanel
        isOpen={panelMode === "edit"}
        title={panelTitle}
        onClose={handleClosePanel}
        onSave={handleSaveEdit}
        saveLabel="Save Changes"
      >
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visit ID
              </label>
              <input
                type="text"
                value={editFormData.visitId || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, visitId: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={editFormData.subject || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, subject: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visit Name
              </label>
              <input
                type="text"
                value={editFormData.visitName || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, visitName: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={editFormData.status || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        )}
      </CustomPanel>
    </div>
  );
};

export default VisitTable;