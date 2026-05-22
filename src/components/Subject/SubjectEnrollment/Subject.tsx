import { useMemo, useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../../common/DataTable";
import Pagination from "../../../common/Pagination";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import { ActionMenu } from "../../../common/ActionMenu";
import CustomPanel from "../../../common/CustomPanel";

type Subject = {
  id: number;
  subject: string;
  studyId: string;
  study: string;
  code: string;
  gender: string;
  arm: string;
  enrollment: string;
  status: string;
};

type PanelMode = "view" | "edit" | null;

const Subject = () => {
  const initialData: Subject[] = useMemo(() => [
    {
      id: 1,
      subject: "SUB001",
      studyId: "ST001",
      study: "Apollo Study",
      code: "ARM-A",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 2,
      subject: "SUB002",
      studyId: "ST002",
      study: "SRM Research",
      code: "ARM-B",
      gender: "Male",
      arm: "Control Group",
      enrollment: "Screening",
      status: "Pending",
    },
    {
      id: 3,
      subject: "SUB003",
      studyId: "ST003",
      study: "Fortis Trial",
      code: "ARM-C",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 4,
      subject: "SUB004",
      studyId: "ST004",
      study: "MIOT Study",
      code: "ARM-A",
      gender: "Male",
      arm: "Placebo Group",
      enrollment: "Failed",
      status: "Inactive",
    },
    {
      id: 5,
      subject: "SUB005",
      studyId: "ST005",
      study: "Vijaya Research",
      code: "ARM-B",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 6,
      subject: "SUB006",
      studyId: "ST006",
      study: "Apollo Study",
      code: "ARM-C",
      gender: "Male",
      arm: "Control Group",
      enrollment: "Screening",
      status: "Pending",
    },
    {
      id: 7,
      subject: "SUB007",
      studyId: "ST007",
      study: "SRM Research",
      code: "ARM-A",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 8,
      subject: "SUB008",
      studyId: "ST008",
      study: "Fortis Trial",
      code: "ARM-B",
      gender: "Male",
      arm: "Placebo Group",
      enrollment: "Withdrawn",
      status: "Inactive",
    },
    {
      id: 9,
      subject: "SUB009",
      studyId: "ST009",
      study: "MIOT Study",
      code: "ARM-C",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 10,
      subject: "SUB010",
      studyId: "ST010",
      study: "Vijaya Research",
      code: "ARM-A",
      gender: "Male",
      arm: "Control Group",
      enrollment: "Screening",
      status: "Pending",
    },
    {
      id: 11,
      subject: "SUB011",
      studyId: "ST011",
      study: "Apollo Study",
      code: "ARM-B",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 12,
      subject: "SUB012",
      studyId: "ST012",
      study: "SRM Research",
      code: "ARM-C",
      gender: "Male",
      arm: "Placebo Group",
      enrollment: "Failed",
      status: "Inactive",
    },
    {
      id: 13,
      subject: "SUB013",
      studyId: "ST013",
      study: "Fortis Trial",
      code: "ARM-A",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
    {
      id: 14,
      subject: "SUB014",
      studyId: "ST014",
      study: "MIOT Study",
      code: "ARM-B",
      gender: "Male",
      arm: "Control Group",
      enrollment: "Screening",
      status: "Pending",
    },
    {
      id: 15,
      subject: "SUB015",
      studyId: "ST015",
      study: "Vijaya Research",
      code: "ARM-C",
      gender: "Female",
      arm: "Treatment Group",
      enrollment: "Enrolled",
      status: "Active",
    },
  ], []);

  const [data, setData] = useState<Subject[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
  // Panel state
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<Subject | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Subject>>({});

  // ✅ overlay position
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  // ✅ close outside
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // ✅ toggle menu
  const handleToggleMenu = useCallback(
    (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 5,
        left: rect.right - 130,
      });
      setOpenMenuId((prev) => (prev === id ? null : id));
    },
    []
  );

  // ✅ View handler
  const handleView = useCallback((item: Subject) => {
    console.log("View:", item);
    setSelectedItem(item);
    setPanelMode("view");
    setOpenMenuId(null);
  }, []);

  // ✅ Edit handler
  const handleEdit = useCallback((item: Subject) => {
    console.log("Edit:", item);
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
    setOpenMenuId(null);
  }, []);

  // ✅ Delete handler with SweetAlert2
  const handleDelete = useCallback((item: Subject) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item.subject}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== item.id));
        Swal.fire("Deleted!", "Subject has been removed.", "success");
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

  // ✅ Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Get enrollment color
  const getEnrollmentColor = (enrollment: string) => {
    switch (enrollment) {
      case "Enrolled":
        return "bg-green-100 text-green-700";
      case "Screening":
        return "bg-blue-100 text-blue-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      case "Withdrawn":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns: ColumnDef<Subject>[] = useMemo(
    () => [
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "studyId", header: "Study ID" },
      { accessorKey: "study", header: "Study" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "arm", header: "Arm/Cohort" },
      { 
        accessorKey: "enrollment", 
        header: "Enrollment",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${getEnrollmentColor(value)}`}>
              {value}
            </span>
          );
        }
      },
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
        }
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
      }
    ],
    [handleView, handleEdit, handleDelete]
  );

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
  const panelTitle = panelMode === "view" ? "View Subject" : "Edit Subject";

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
              <label className="block text-sm font-medium text-gray-600">Subject</label>
              <p className="mt-1 text-gray-900">{selectedItem.subject}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Study ID</label>
              <p className="mt-1 text-gray-900">{selectedItem.studyId}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Study</label>
              <p className="mt-1 text-gray-900">{selectedItem.study}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Code</label>
              <p className="mt-1 text-gray-900">{selectedItem.code}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Gender</label>
              <p className="mt-1 text-gray-900">{selectedItem.gender}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Arm/Cohort</label>
              <p className="mt-1 text-gray-900">{selectedItem.arm}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Enrollment</label>
              <p className="mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getEnrollmentColor(selectedItem.enrollment)}`}>
                  {selectedItem.enrollment}
                </span>
              </p>
            </div>
            <div className="border-b pb-3">
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
                Study ID
              </label>
              <input
                type="text"
                value={editFormData.studyId || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, studyId: e.target.value })
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
                Gender
              </label>
              <select
                value={editFormData.gender || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, gender: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Arm/Cohort
              </label>
              <input
                type="text"
                value={editFormData.arm || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, arm: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enrollment
              </label>
              <select
                value={editFormData.enrollment || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, enrollment: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Screening">Screening</option>
                <option value="Failed">Failed</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>
            <div>
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
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        )}
      </CustomPanel>
    </div>
  );
};

export default Subject;