import { useMemo, useState, useEffect, useCallback, useRef } from "react";
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
import { useNavigate } from "react-router-dom";


type SiteRegistration = {
  id: number;
  site: string;
  code: string;
  study: string;
  city: string;
  investigatorType: string;
  investigatorName: string;
  status: string;
};

type PanelMode = "view" | "edit" | null;

// ✅ COMPONENT
const SiteModule = () => {
  const initialData: SiteRegistration[] = useMemo(
    () => [
      {
        id: 1,
        site: "SITE001",
        code: "ST001",
        study: "Apollo",
        city: "Chennai",
        investigatorType: "Dr",
        investigatorName: "Kumar",
        status: "Active",
      },
      {
        id: 2,
        site: "SITE002",
        code: "ST002",
        study: "SRM",
        city: "Coimbatore",
        investigatorType: "Dr",
        investigatorName: "Raj",
        status: "Draft",
      },
      {
        id: 3,
        site: "SITE003",
        code: "ST003",
        study: "Fortis",
        city: "Madurai",
        investigatorType: "Dr",
        investigatorName: "Anitha",
        status: "Active",
      },
      {
        id: 4,
        site: "SITE004",
        code: "ST004",
        study: "MIOT",
        city: "Chennai",
        investigatorType: "Dr",
        investigatorName: "Suresh",
        status: "Inactive",
      },
      {
        id: 5,
        site: "SITE005",
        code: "ST005",
        study: "Vijaya",
        city: "Salem",
        investigatorType: "Dr",
        investigatorName: "Priya",
        status: "Active",
      },
      {
        id: 6,
        site: "SITE006",
        code: "ST006",
        study: "Apollo",
        city: "Trichy",
        investigatorType: "Dr",
        investigatorName: "Mohan",
        status: "Draft",
      },
      {
        id: 7,
        site: "SITE007",
        code: "ST007",
        study: "SRM",
        city: "Vellore",
        investigatorType: "Dr",
        investigatorName: "Divya",
        status: "Active",
      },
      {
        id: 8,
        site: "SITE008",
        code: "ST008",
        study: "Fortis",
        city: "Erode",
        investigatorType: "Dr",
        investigatorName: "Karthik",
        status: "Inactive",
      },
      {
        id: 9,
        site: "SITE009",
        code: "ST009",
        study: "MIOT",
        city: "Chennai",
        investigatorType: "Dr",
        investigatorName: "Lakshmi",
        status: "Active",
      },
      {
        id: 10,
        site: "SITE010",
        code: "ST010",
        study: "Vijaya",
        city: "Madurai",
        investigatorType: "Dr",
        investigatorName: "Arun",
        status: "Draft",
      },
    ],
    []
  );

  // ✅ STATES
  const [data, setData] = useState<SiteRegistration[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [loading, _setLoading] = useState(false);
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Panel state
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<SiteRegistration | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<SiteRegistration>>({});

  // ✅ CLOSE MENU (optimized)
  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // ✅ ACTIONS (memoized to prevent unnecessary re-renders)
  const handleView = () => {
    navigate("/study/site/new-add");
  };
  const handleEdit = () => {
    navigate("/study/site/new-add");
  };

  const handleDelete = useCallback((row: SiteRegistration) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${row.site}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== row.id));
        Swal.fire("Deleted!", "Site has been removed.", "success");
      }
    });
    setOpenMenuId(null);
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

 

  // ✅ COLUMNS (memoized with all dependencies)
  const siteRegistrationColumns: ColumnDef<SiteRegistration>[] = useMemo(
    () => [
      {
        accessorKey: "site",
        header: "Site",
      },
      {
        accessorKey: "code",
        header: "Code",
      },
      {
        accessorKey: "study",
        header: "Study",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "investigatorType",
        header: "Type",
      },
      {
        accessorKey: "investigatorName",
        header: "Name",
      },
      {
        accessorKey: "status",
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
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          );
        },
      },
    ],
    [handleView, handleEdit, handleDelete, openMenuId]
  );

  // ✅ PAGINATION
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE INSTANCE
  const table = useReactTable({
    data: data,
    columns: siteRegistrationColumns,
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
  const panelTitle = panelMode === "view" ? "View Site Registration" : "Edit Site Registration";

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* HEADER */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search Site..."
          />
          <ColumnToggle table={table} />
          <NavigateButton
            label="Add Site"
            path="/study/site/new-add"
            icon={<Plus size={18} />}
          />
        </div>

        <DataTable
          table={table}
          columns={siteRegistrationColumns}
          loading={loading} 
          tableWrapperRef={tableWrapperRef} 
        />

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
              <label className="block text-sm font-medium text-gray-600">Site</label>
              <p className="mt-1 text-gray-900">{selectedItem.site}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Code</label>
              <p className="mt-1 text-gray-900">{selectedItem.code}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Study</label>
              <p className="mt-1 text-gray-900">{selectedItem.study}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">City</label>
              <p className="mt-1 text-gray-900">{selectedItem.city}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Investigator Type</label>
              <p className="mt-1 text-gray-900">{selectedItem.investigatorType}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Investigator Name</label>
              <p className="mt-1 text-gray-900">{selectedItem.investigatorName}</p>
            </div>
            <div className="border-b pb-3 col-span-2">
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedItem.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : selectedItem.status === "Draft"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
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
                Site
              </label>
              <input
                type="text"
                value={editFormData.site || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, site: e.target.value })
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
                City
              </label>
              <input
                type="text"
                value={editFormData.city || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, city: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investigator Type
              </label>
              <input
                type="text"
                value={editFormData.investigatorType || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, investigatorType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investigator Name
              </label>
              <input
                type="text"
                value={editFormData.investigatorName || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, investigatorName: e.target.value })
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

export default SiteModule;