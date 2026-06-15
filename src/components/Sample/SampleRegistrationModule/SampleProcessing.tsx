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

type SampleProcessing = {
  id: number;
  sampleId: string;
  subjectId: string;
  studyCode: string;
  sampleType: string;
  assignedLab: string;
  technician: string;
  processingType: string;
  processingStatus: string;
  qcStatus: string;
};

const SampleProcessing = () => {
  // const data = useMemo<SampleProcessing[]>(
 const initialData = useMemo<SampleProcessing[]>(
  () => [
    {
      id: 1,
      sampleId: "SMP001",
      subjectId: "SUB001",
      studyCode: "ST001",
      sampleType: "Blood",
      assignedLab: "Central Lab",
      technician: "John",
      processingType: "Aliquoting",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 2,
      sampleId: "SMP002",
      subjectId: "SUB002",
      studyCode: "ST001",
      sampleType: "Urine",
      assignedLab: "Biochemistry Lab",
      technician: "David",
      processingType: "Centrifugation",
      processingStatus: "In Progress",
      qcStatus: "Pending",
    },
    {
      id: 3,
      sampleId: "SMP003",
      subjectId: "SUB003",
      studyCode: "ST002",
      sampleType: "Serum",
      assignedLab: "Molecular Lab",
      technician: "Arun",
      processingType: "DNA Extraction",
      processingStatus: "Pending",
      qcStatus: "Pending",
    },
    {
      id: 4,
      sampleId: "SMP004",
      subjectId: "SUB004",
      studyCode: "ST002",
      sampleType: "Plasma",
      assignedLab: "Central Lab",
      technician: "Kumar",
      processingType: "Aliquoting",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 5,
      sampleId: "SMP005",
      subjectId: "SUB005",
      studyCode: "ST003",
      sampleType: "Blood",
      assignedLab: "Hematology Lab",
      technician: "Priya",
      processingType: "Centrifugation",
      processingStatus: "In Progress",
      qcStatus: "Pending",
    },
    {
      id: 6,
      sampleId: "SMP006",
      subjectId: "SUB006",
      studyCode: "ST003",
      sampleType: "Urine",
      assignedLab: "Clinical Lab",
      technician: "Ravi",
      processingType: "Filtration",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 7,
      sampleId: "SMP007",
      subjectId: "SUB007",
      studyCode: "ST004",
      sampleType: "Serum",
      assignedLab: "Central Lab",
      technician: "Meena",
      processingType: "Aliquoting",
      processingStatus: "Pending",
      qcStatus: "Pending",
    },
    {
      id: 8,
      sampleId: "SMP008",
      subjectId: "SUB008",
      studyCode: "ST004",
      sampleType: "Plasma",
      assignedLab: "Molecular Lab",
      technician: "Vijay",
      processingType: "DNA Extraction",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 9,
      sampleId: "SMP009",
      subjectId: "SUB009",
      studyCode: "ST005",
      sampleType: "Blood",
      assignedLab: "Biochemistry Lab",
      technician: "Anitha",
      processingType: "Centrifugation",
      processingStatus: "In Progress",
      qcStatus: "Pending",
    },
    {
      id: 10,
      sampleId: "SMP010",
      subjectId: "SUB010",
      studyCode: "ST005",
      sampleType: "Urine",
      assignedLab: "Clinical Lab",
      technician: "Suresh",
      processingType: "Filtration",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 11,
      sampleId: "SMP011",
      subjectId: "SUB011",
      studyCode: "ST006",
      sampleType: "Serum",
      assignedLab: "Central Lab",
      technician: "Karthik",
      processingType: "Aliquoting",
      processingStatus: "Pending",
      qcStatus: "Rejected",
    },
    {
      id: 12,
      sampleId: "SMP012",
      subjectId: "SUB012",
      studyCode: "ST006",
      sampleType: "Plasma",
      assignedLab: "Hematology Lab",
      technician: "Deepa",
      processingType: "Centrifugation",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 13,
      sampleId: "SMP013",
      subjectId: "SUB013",
      studyCode: "ST007",
      sampleType: "Blood",
      assignedLab: "Molecular Lab",
      technician: "Hari",
      processingType: "DNA Extraction",
      processingStatus: "In Progress",
      qcStatus: "Pending",
    },
    {
      id: 14,
      sampleId: "SMP014",
      subjectId: "SUB014",
      studyCode: "ST007",
      sampleType: "Urine",
      assignedLab: "Clinical Lab",
      technician: "Lakshmi",
      processingType: "Filtration",
      processingStatus: "Completed",
      qcStatus: "Approved",
    },
    {
      id: 15,
      sampleId: "SMP015",
      subjectId: "SUB015",
      studyCode: "ST008",
      sampleType: "Serum",
      assignedLab: "Central Lab",
      technician: "Manoj",
      processingType: "Aliquoting",
      processingStatus: "In Progress",
      qcStatus: "Pending",
    },
  ],
  []
);
  const [data, setData] =
  useState<SampleProcessing[]>(initialData);
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
  item: SampleProcessing
) => {
  navigate("/sample/master/smppro-add", {
    state: {
      mode: "view",
      data: item,
    },
  });
};

// EDIT
const handleEdit = (
  item: SampleProcessing
) => {
  navigate("/sample/master/smppro-add", {
    state: {
      mode: "edit",
      data: item,
    },
  });
};

// DELETE
const handleDelete = (
  item: SampleProcessing    
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
  const columns: ColumnDef<SampleProcessing>[] = [
  {
    accessorKey: "sampleId",
    header: "Sample ID",
  },
  {
    accessorKey: "subjectId",
    header: "Subject ID",
  },
  {
    accessorKey: "sampleType",
    header: "Sample Type",
  },
  {
    accessorKey: "assignedLab",
    header: "Assigned Lab",
  },
  {
    accessorKey: "technician",
    header: "Technician",
  },
  {
    accessorKey: "processingType",
    header: "Processing Type",
  },
  {
    accessorKey: "processingStatus",
    header: "Processing Status",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === "Completed"
              ? "bg-green-100 text-green-700"
              : value === "In Progress"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {value}
        </span>
      );
    },
  },
  {
    accessorKey: "qcStatus",
    header: "QC Status",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      return (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            value === "Approved"
              ? "bg-green-100 text-green-700"
              : value === "Rejected"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
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
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        openMenuId={openMenuId}
        setOpenMenuId={setOpenMenuId}
      />
    ),
  },
];

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
            label="Add Sample Processing"
            path="/sample/master/smppro-add"
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

export default SampleProcessing;