import { useMemo, useState, useEffect } from "react";

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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

type SampleReception = {
  id: number;
  sampleId: string;
  subjectId: string;
  studyCode: string;
  sampleType: string;
  collectionDate: string;
  receivedDate: string;
  status: string;
};

const SampleReception = () => {
  // const data = useMemo<SampleReception[]>(
  const initialData = useMemo<SampleReception[]>(
    () => [
      {
        id: 1,
        sampleId: "SMP001",
        subjectId: "SUB001",
        studyCode: "SC001",
        sampleType: "Blood",
        collectionDate: "12-Feb-2026",
        receivedDate: "13-Feb-2026",
        status: "Received",
      },
      {
        id: 2,
        sampleId: "SMP002",
        subjectId: "SUB002",
        studyCode: "SC001",
        sampleType: "Urine",
        collectionDate: "14-Feb-2026",
        receivedDate: "15-Feb-2026",
        status: "Pending",
      },
      {
        id: 3,
        sampleId: "SMP003",
        subjectId: "SUB003",
        studyCode: "SC002",
        sampleType: "Serum",
        collectionDate: "16-Feb-2026",
        receivedDate: "17-Feb-2026",
        status: "Rejected",
      },
      {
        id: 4,
        sampleId: "SMP004",
        subjectId: "SUB004",
        studyCode: "SC002",
        sampleType: "Blood",
        collectionDate: "18-Feb-2026",
        receivedDate: "19-Feb-2026",
        status: "Received",
      },
      {
        id: 5,
        sampleId: "SMP005",
        subjectId: "SUB005",
        studyCode: "SC003",
        sampleType: "Plasma",
        collectionDate: "20-Feb-2026",
        receivedDate: "21-Feb-2026",
        status: "Pending",
      },
      {
        id: 6,
        sampleId: "SMP006",
        subjectId: "SUB006",
        studyCode: "SC003",
        sampleType: "Urine",
        collectionDate: "22-Feb-2026",
        receivedDate: "23-Feb-2026",
        status: "Received",
      },
      {
        id: 7,
        sampleId: "SMP007",
        subjectId: "SUB007",
        studyCode: "SC004",
        sampleType: "Blood",
        collectionDate: "24-Feb-2026",
        receivedDate: "25-Feb-2026",
        status: "Rejected",
      },
      {
        id: 8,
        sampleId: "SMP008",
        subjectId: "SUB008",
        studyCode: "SC004",
        sampleType: "Serum",
        collectionDate: "26-Feb-2026",
        receivedDate: "27-Feb-2026",
        status: "Received",
      },
      {
        id: 9,
        sampleId: "SMP009",
        subjectId: "SUB009",
        studyCode: "SC005",
        sampleType: "Plasma",
        collectionDate: "28-Feb-2026",
        receivedDate: "01-Mar-2026",
        status: "Pending",
      },
      {
        id: 10,
        sampleId: "SMP010",
        subjectId: "SUB010",
        studyCode: "SC005",
        sampleType: "Blood",
        collectionDate: "02-Mar-2026",
        receivedDate: "03-Mar-2026",
        status: "Received",
      },
    ],
    []
  );
  const [data, setData] =
  useState<SampleReception[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
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
  // VIEW
const handleView = (
  item: SampleReception
) => {
  navigate("/sample/master/smp-add", {
    state: {
      mode: "view",
      data: item,
    },
  });
};

// EDIT
const handleEdit = (
  item: SampleReception
) => {
  navigate("/sample/master/smp-add", {
    state: {
      mode: "edit",
      data: item,
    },
  });
};

// DELETE
const handleDelete = (
  item: SampleReception
) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${item.sampleId}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setData((prev) =>
        prev.filter(
          (d) => d.id !== item.id
        )
      );

      Swal.fire(
        "Deleted!",
        "Sample removed successfully.",
        "success"
      );
    }
  });
};
  const columns: ColumnDef<SampleReception>[] = useMemo(
    () => [
      {
        accessorKey: "sampleId",
        header: "Sample ID",
      },
      {
        accessorKey: "subjectId",
        header: "Subject ID",
      },
      {
        accessorKey: "studyCode",
        header: "Study Code",
      },
      {
        accessorKey: "sampleType",
        header: "Sample Type",
      },
      {
        accessorKey: "collectionDate",
        header: "Collection Date",
      },
      {
        accessorKey: "receivedDate",
        header: "Received Date",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Received"
                  ? "bg-green-100 text-green-700"
                  : value === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}>
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
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search Sample..."
          />

          <ColumnToggle table={table} />

          <NavigateButton
            label="Add Sample"
            path="/sample/master/smp-add"
            icon={<Plus size={18} />}
          />
        </div>

        <DataTable table={table} columns={columns} />

        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />
      </div>
    </div>
  );
};

export default SampleReception;