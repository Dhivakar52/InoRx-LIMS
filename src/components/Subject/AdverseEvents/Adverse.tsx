import { useMemo, useState, useEffect, useCallback } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../../common/DataTable";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import Pagination from "../../../common/Pagination";
import { ActionMenu } from "../../../common/ActionMenu";
import NavigateButton from "../../../common/NavigateButton";
import { Plus } from "lucide-react";
type AE = {
  id: number;
  ae: string;
  subject: string;
  severity: string;
  date: string;
  status: string;
};

const Adverse = () => {
  const data = useMemo<AE[]>(
    () => [
      { id: 1, ae: "AE001", subject: "SUB001", severity: "Mild", date: "12-Feb", status: "Open" },
      { id: 2, ae: "AE002", subject: "SUB002", severity: "Severe", date: "15-Feb", status: "Closed" },
      { id: 3, ae: "AE003", subject: "SUB003", severity: "Moderate", date: "18-Feb", status: "Open" },
      { id: 4, ae: "AE004", subject: "SUB004", severity: "Mild", date: "20-Feb", status: "Closed" },
      { id: 5, ae: "AE005", subject: "SUB005", severity: "Severe", date: "22-Feb", status: "Open" },
      { id: 6, ae: "AE006", subject: "SUB006", severity: "Moderate", date: "24-Feb", status: "Closed" },
      { id: 7, ae: "AE007", subject: "SUB007", severity: "Mild", date: "26-Feb", status: "Open" },
      { id: 8, ae: "AE008", subject: "SUB008", severity: "Severe", date: "28-Feb", status: "Closed" },
      { id: 9, ae: "AE009", subject: "SUB009", severity: "Moderate", date: "02-Mar", status: "Open" },
      { id: 10, ae: "AE010", subject: "SUB010", severity: "Mild", date: "04-Mar", status: "Closed" },
      { id: 11, ae: "AE011", subject: "SUB011", severity: "Severe", date: "06-Mar", status: "Open" },
      { id: 12, ae: "AE012", subject: "SUB012", severity: "Moderate", date: "08-Mar", status: "Closed" },
      { id: 13, ae: "AE013", subject: "SUB013", severity: "Mild", date: "10-Mar", status: "Open" },
      { id: 14, ae: "AE014", subject: "SUB014", severity: "Severe", date: "12-Mar", status: "Closed" },
      { id: 15, ae: "AE015", subject: "SUB015", severity: "Moderate", date: "14-Mar", status: "Open" },
    ],
    []
  );

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

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

  const columns: ColumnDef<AE>[] = useMemo(
    () => [
      { accessorKey: "ae", header: "AE" },
      { accessorKey: "subject", header: "Subject" },
      {
        accessorKey: "severity",
        header: "Severity",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Severe"
                  ? "bg-red-100 text-red-700"
                  : value === "Moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}>
              {value}
            </span>
          );
        },
      },
      { accessorKey: "date", header: "Date" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Open"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
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
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search..."/>
          <ColumnToggle table={table} />
          <NavigateButton
            label="Add Event"
            path="/subject/master/adv-add"
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

export default Adverse;