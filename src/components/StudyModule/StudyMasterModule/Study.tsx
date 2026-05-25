import { useMemo, useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../../common/DataTable";
import Pagination from "../../../common/Pagination";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import { ActionMenu } from "../../../common/ActionMenu";
import NavigateButton from "../../../common/NavigateButton";
import { Plus } from "lucide-react";
import CustomPanel from "../../../common/CustomPanel";

// ✅ TYPE
type StudyVersion = {
  id: number;
  study: string;
  code: string;
  oldVersion: string;
  versionDate: string;
  newStatus: string;
};

// Panel modes
type PanelMode = "view" | "edit" | null;

const StudyVersionTable = () => {
  const [data, setData] = useState<StudyVersion[]>(
    useMemo(
      () => [
        {
          id: 1,
          study: "ST001",
          code: "v1.0",
          oldVersion: "v0.9",
          versionDate: "01-Jan-26",
          newStatus: "Active",
        },
        {
          id: 2,
          study: "ST002",
          code: "v1.1",
          oldVersion: "v1.0",
          versionDate: "03-Jan-26",
          newStatus: "Draft",
        },
        {
          id: 3,
          study: "ST003",
          code: "v2.0",
          oldVersion: "v1.5",
          versionDate: "05-Jan-26",
          newStatus: "Active",
        },
        {
          id: 4,
          study: "ST004",
          code: "v2.1",
          oldVersion: "v2.0",
          versionDate: "07-Jan-26",
          newStatus: "Inactive",
        },
        {
          id: 5,
          study: "ST005",
          code: "v3.0",
          oldVersion: "v2.5",
          versionDate: "09-Jan-26",
          newStatus: "Draft",
        },
        {
          id: 6,
          study: "ST006",
          code: "v3.1",
          oldVersion: "v3.0",
          versionDate: "11-Jan-26",
          newStatus: "Active",
        },
        {
          id: 7,
          study: "ST007",
          code: "v4.0",
          oldVersion: "v3.5",
          versionDate: "13-Jan-26",
          newStatus: "Draft",
        },
        {
          id: 8,
          study: "ST008",
          code: "v4.1",
          oldVersion: "v4.0",
          versionDate: "15-Jan-26",
          newStatus: "Active",
        },
        {
          id: 9,
          study: "ST009",
          code: "v5.0",
          oldVersion: "v4.5",
          versionDate: "17-Jan-26",
          newStatus: "Inactive",
        },
        {
          id: 10,
          study: "ST010",
          code: "v5.1",
          oldVersion: "v5.0",
          versionDate: "19-Jan-26",
          newStatus: "Active",
        },
        {
          id: 11,
          study: "ST011",
          code: "v6.0",
          oldVersion: "v5.5",
          versionDate: "21-Jan-26",
          newStatus: "Draft",
        },
        {
          id: 12,
          study: "ST012",
          code: "v6.1",
          oldVersion: "v6.0",
          versionDate: "23-Jan-26",
          newStatus: "Active",
        },
        {
          id: 13,
          study: "ST013",
          code: "v7.0",
          oldVersion: "v6.5",
          versionDate: "25-Jan-26",
          newStatus: "Inactive",
        },
        {
          id: 14,
          study: "ST014",
          code: "v7.1",
          oldVersion: "v7.0",
          versionDate: "27-Jan-26",
          newStatus: "Draft",
        },
        {
          id: 15,
          study: "ST015",
          code: "v8.0",
          oldVersion: "v7.5",
          versionDate: "29-Jan-26",
          newStatus: "Active",
        },
      ],
      []
    )
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [_openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  // Panel state
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<StudyVersion | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<StudyVersion>>({});

  

  const handleView = useCallback((item: StudyVersion) => {
    console.log("View:", item);
    setSelectedItem(item);
    setPanelMode("view");
    setOpenMenuId(null);
  }, []);

  const handleEdit = useCallback((item: StudyVersion) => {
    console.log("Edit:", item);
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
    setOpenMenuId(null);
  }, []);

 const handleDelete = useCallback((item: StudyVersion) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${item.study}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setData((prev) => prev.filter((d) => d.id !== item.id));

      Swal.fire("Deleted!", "Study has been removed.", "success");
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

  // ✅ CLOSE DROPDOWN WHEN CLICKING OUTSIDE
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
  const columns: ColumnDef<StudyVersion>[] = useMemo(
    () => [
      { accessorKey: "study", header: "Study" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "oldVersion", header: "Old Version" },
      { accessorKey: "versionDate", header: "Version Date" },
      {
        accessorKey: "newStatus",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Active"
                  ? "bg-green-100 text-green-700"
                  : value === "Draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
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

  // ✅ Panel title based on mode
  const panelTitle = panelMode === "view" ? "View Study Version" : "Edit Study Version";

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
            label="Add Study"
            path="/study/master/new-add"
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

      {/* CUSTOM PANEL - View Mode */}
      <CustomPanel
        isOpen={panelMode === "view"}
        title={panelTitle}
        onClose={handleClosePanel}
        onSave={() => {}} // No save action for view mode, or you can make it close
        saveLabel="Close"
      >
        {selectedItem && (
         <div className="grid grid-cols-2 gap-4">
  
  <div className="border-b pb-3">
    <label className="block text-sm font-medium text-gray-600">Study</label>
    <p className="mt-1 text-gray-900">{selectedItem.study}</p>
  </div>

  <div className="border-b pb-3">
    <label className="block text-sm font-medium text-gray-600">Code</label>
    <p className="mt-1 text-gray-900">{selectedItem.code}</p>
  </div>

  <div className="border-b pb-3">
    <label className="block text-sm font-medium text-gray-600">Old Version</label>
    <p className="mt-1 text-gray-900">{selectedItem.oldVersion}</p>
  </div>

  <div className="border-b pb-3">
    <label className="block text-sm font-medium text-gray-600">Version Date</label>
    <p className="mt-1 text-gray-900">{selectedItem.versionDate}</p>
  </div>

  <div className="border-b pb-3 col-span-2">
    <label className="block text-sm font-medium text-gray-600">Status</label>
    <p className="mt-1">
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          selectedItem.newStatus === "Active"
            ? "bg-green-100 text-green-700"
            : selectedItem.newStatus === "Draft"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {selectedItem.newStatus}
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
      Study
    </label>
    <input
      type="text"
      value={editFormData.study || ""}
      onChange={(e) =>
        setEditFormData({ ...editFormData, study: e.target.value })
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Code
    </label>
    <input
      type="text"
      value={editFormData.code || ""}
      onChange={(e) =>
        setEditFormData({ ...editFormData, code: e.target.value })
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Old Version
    </label>
    <input
      type="text"
      value={editFormData.oldVersion || ""}
      onChange={(e) =>
        setEditFormData({ ...editFormData, oldVersion: e.target.value })
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Version Date
    </label>
    <input
      type="text"
      value={editFormData.versionDate || ""}
      onChange={(e) =>
        setEditFormData({ ...editFormData, versionDate: e.target.value })
      }
      placeholder="DD-MMM-YY"
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* Full width field */}
  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Status
    </label>
    <select
      value={editFormData.newStatus || ""}
      onChange={(e) =>
        setEditFormData({ ...editFormData, newStatus: e.target.value })
      }
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="Active">Active</option>
      <option value="Draft">Draft</option>
      <option value="Inactive">Inactive</option>
    </select>
  </div>

</div>
        )}
      </CustomPanel>
    </div>
  );
};

export default StudyVersionTable;