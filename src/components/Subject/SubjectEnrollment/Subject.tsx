import { useMemo, useState, useEffect } from "react";

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
      { accessorKey: "studyId", header: "ID" },
      { accessorKey: "study", header: "Study" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "gender", header: "Gender" },
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
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        ),
      },
    ],
    [openMenuId]
  );

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
            label="Add Subject Enrollment "
            path="/subject/master/sub-add"
            icon={<Plus size={18} />}
          />
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}/>
      </div>
    </div>
  );
};

export default Subject;