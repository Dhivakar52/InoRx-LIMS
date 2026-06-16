import { useMemo, useState, useEffect } from "react";
// import Swal from "sweetalert2";
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
import { useNavigate } from "react-router-dom";

// TYPE
type SampleAcknowledgmentRow = {
  id: number;
  sampleId: string;
  donorId: string;
  bloodGroup: string;
  componentType: string;
  acknowledgedDate: string;
  acknowledgedBy: string;
  status: string;
};

const SampleReviewGrid = () => {
 const data = useMemo<SampleAcknowledgmentRow[]>(
  () => [
    {
      id: 1,
      sampleId: "BB-20260001",
      donorId: "DON-1001",
      bloodGroup: "O+",
      componentType: "Whole Blood",
      acknowledgedDate: "2026-06-01",
      acknowledgedBy: "Lab User 1",
      status: "Acknowledged",
    },
    {
      id: 2,
      sampleId: "BB-20260002",
      donorId: "DON-1002",
      bloodGroup: "A+",
      componentType: "Packed RBC",
      acknowledgedDate: "",
      acknowledgedBy: "",
      status: "Pending Acknowledgment",
    },
    {
      id: 3,
      sampleId: "BB-20260003",
      donorId: "DON-1003",
      bloodGroup: "B+",
      componentType: "Platelets",
      acknowledgedDate: "2026-06-02",
      acknowledgedBy: "Lab User 2",
      status: "Acknowledged",
    },
    {
      id: 4,
      sampleId: "BB-20260004",
      donorId: "DON-1004",
      bloodGroup: "AB+",
      componentType: "Plasma",
      acknowledgedDate: "",
      acknowledgedBy: "",
      status: "Pending Acknowledgment",
    },
    {
      id: 5,
      sampleId: "BB-20260005",
      donorId: "DON-1005",
      bloodGroup: "O-",
      componentType: "Whole Blood",
      acknowledgedDate: "2026-06-03",
      acknowledgedBy: "Lab User 3",
      status: "Acknowledged",
    },
  ],
  []
);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [samples, setSamples] = useState(data);
  const statusColors: Record<string, string> = {
  "Pending Acknowledgment":
    "bg-yellow-100 text-yellow-700",
  Acknowledged:
    "bg-green-100 text-green-700",
};
  const navigate = useNavigate();

   
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

const handleAcknowledge = (
  item: SampleAcknowledgmentRow
) => {
  setSamples((prev) =>
    prev.map((row) =>
      row.id === item.id
        ? {
            ...row,
            status: "Acknowledged",
            acknowledgedDate: new Date()
              .toISOString()
              .split("T")[0],
            acknowledgedBy: "Current User",
          }
        : row
    )
  );
};

  const columns: ColumnDef<SampleAcknowledgmentRow>[] = [
  {
    accessorKey: "sampleId",
    header: "Sample ID",
  },
  {
    accessorKey: "donorId",
    header: "Donor ID",
  },
  {
    accessorKey: "bloodGroup",
    header: "Blood Group",
  },
  {
    accessorKey: "componentType",
    header: "Component Type",
  },
  {
    accessorKey: "acknowledgedDate",
    header: "Acknowledged Date",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    accessorKey: "acknowledgedBy",
    header: "Acknowledged By",
    cell: ({ getValue }) => getValue() || "-",
  },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusColors[value] ||
                    "bg-gray-100 text-gray-700"
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
          const isPending = item.status === "Pending Acknowledgment";
          return (
            <ActionMenu
            item={item}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            onView={() => navigate(`/sample/acknowledgement/new-add/${item.id}`)}
            onAck={isPending ? () => handleAcknowledge(item) : undefined}
            />
             
          );
        },
      },
    ];


  // ✅ PAGINATION
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE INSTANCE
  const table = useReactTable({
    data:samples,
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
  // const panelTitle = panelMode === "view" ? "View Study Version" : "Edit Study Version";

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
            label="Add Sample Acknowledgement"
            path="/sample/acknowledgement/new-add"
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

    </div>
  );
};

export default SampleReviewGrid;