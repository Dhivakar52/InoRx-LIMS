import { useMemo, useState, useEffect, useCallback } from "react";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../../common/DataTable";
import Pagination from "../../../common/Pagination";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import { ActionMenu } from "../../../common/ActionMenu";
import NavigateButton from "../../../common/NavigateButton";
import { Plus } from "lucide-react";

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
  const data = useMemo<Subject[]>(
    () => [
      { id: 1, subject: "SUB001", studyId: "ST001", study: "Cardiology Study", code: "CD01", gender: "Male", arm: "Arm A", enrollment: "Enrolled", status: "Active" },
      { id: 2, subject: "SUB002", studyId: "ST002", study: "Diabetes Study", code: "DB02", gender: "Female", arm: "Arm B", enrollment: "Screening", status: "Pending" },
      { id: 3, subject: "SUB003", studyId: "ST003", study: "Cancer Trial", code: "CT03", gender: "Male", arm: "Arm C", enrollment: "Enrolled", status: "Active" },
      { id: 4, subject: "SUB004", studyId: "ST004", study: "Neurology Study", code: "NR04", gender: "Female", arm: "Arm A", enrollment: "Completed", status: "Closed" },
      { id: 5, subject: "SUB005", studyId: "ST005", study: "COVID Vaccine", code: "CV05", gender: "Male", arm: "Arm B", enrollment: "Enrolled", status: "Active" },
      { id: 6, subject: "SUB006", studyId: "ST006", study: "Heart Research", code: "HR06", gender: "Female", arm: "Arm C", enrollment: "Screening", status: "Pending" },
      { id: 7, subject: "SUB007", studyId: "ST007", study: "Kidney Study", code: "KD07", gender: "Male", arm: "Arm A", enrollment: "Enrolled", status: "Active" },
      { id: 8, subject: "SUB008", studyId: "ST008", study: "Liver Study", code: "LV08", gender: "Female", arm: "Arm B", enrollment: "Withdrawn", status: "Inactive" },
      { id: 9, subject: "SUB009", studyId: "ST009", study: "Asthma Trial", code: "AS09", gender: "Male", arm: "Arm C", enrollment: "Completed", status: "Closed" },
      { id: 10, subject: "SUB010", studyId: "ST010", study: "BP Monitoring", code: "BP10", gender: "Female", arm: "Arm A", enrollment: "Enrolled", status: "Active" },
      { id: 11, subject: "SUB011", studyId: "ST011", study: "Mental Health", code: "MH11", gender: "Male", arm: "Arm B", enrollment: "Screening", status: "Pending" },
      { id: 12, subject: "SUB012", studyId: "ST012", study: "Skin Research", code: "SK12", gender: "Female", arm: "Arm C", enrollment: "Enrolled", status: "Active" },
      { id: 13, subject: "SUB013", studyId: "ST013", study: "Eye Vision Study", code: "EV13", gender: "Male", arm: "Arm A", enrollment: "Completed", status: "Closed" },
      { id: 14, subject: "SUB014", studyId: "ST014", study: "Bone Density", code: "BD14", gender: "Female", arm: "Arm B", enrollment: "Enrolled", status: "Active" },
      { id: 15, subject: "SUB015", studyId: "ST015", study: "Nutrition Study", code: "NT15", gender: "Male", arm: "Arm C", enrollment: "Withdrawn", status: "Inactive" },
    ],
    []
  );

  const [data, setData] = useState<Subject[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // close menu (optional keep)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const columns: ColumnDef<Subject>[] = useMemo(
    () => [
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "studyId", header: "Study ID" },
      { accessorKey: "study", header: "Study" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "arm", header: "Arm/Cohort" },
      { accessorKey: "enrollment", header: "Enrollment" },

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
                  : value === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : value === "Closed"
                  ? "bg-gray-200 text-gray-700"
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
        cell: ({ row }) => (
          <ActionMenu
            item={row.original}
            onView={(data) => console.log("View:", data)}
            onEdit={(data) => console.log("Edit:", data)}
            onDelete={(data) => console.log("Delete:", data)}
          />
        ),
      },
    ],
    []
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
          <NavigateButton
            label="Add Subject"
            path="/subject/master/sub-add"
            icon={<Plus size={18} />}
          />
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}/>
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