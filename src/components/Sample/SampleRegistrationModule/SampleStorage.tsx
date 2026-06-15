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

type SampleStorage = {
  id: number;
  sampleId: string;
  subjectId: string;
  studyCode: string;
  sampleType: string;
  storageLocation: string;
  freezerId: string;
  rackNo: string;
  boxNo: string;
  temperature: string;
  storageStatus: string;
};
const SampleStorage = () => {
  const initialData = useMemo<SampleStorage[]>(
  () => [
    {
      id: 1,
      sampleId: "SMP001",
      subjectId: "SUB001",
      studyCode: "ST001",
      sampleType: "Blood",
      storageLocation: "Room-A",
      freezerId: "FRZ-001",
      rackNo: "R01",
      boxNo: "B01",
      temperature: "-20°C",
      storageStatus: "Assigned",
    },
    {
      id: 2,
      sampleId: "SMP002",
      subjectId: "SUB002",
      studyCode: "ST001",
      sampleType: "Urine",
      storageLocation: "Room-A",
      freezerId: "FRZ-001",
      rackNo: "R02",
      boxNo: "B02",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 3,
      sampleId: "SMP003",
      subjectId: "SUB003",
      studyCode: "ST002",
      sampleType: "Serum",
      storageLocation: "Room-B",
      freezerId: "FRZ-002",
      rackNo: "R03",
      boxNo: "B03",
      temperature: "-20°C",
      storageStatus: "Pending",
    },
    {
      id: 4,
      sampleId: "SMP004",
      subjectId: "SUB004",
      studyCode: "ST002",
      sampleType: "Plasma",
      storageLocation: "Room-B",
      freezerId: "FRZ-002",
      rackNo: "R04",
      boxNo: "B04",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 5,
      sampleId: "SMP005",
      subjectId: "SUB005",
      studyCode: "ST003",
      sampleType: "Blood",
      storageLocation: "Room-C",
      freezerId: "FRZ-003",
      rackNo: "R05",
      boxNo: "B05",
      temperature: "-20°C",
      storageStatus: "Transferred",
    },
    {
      id: 6,
      sampleId: "SMP006",
      subjectId: "SUB006",
      studyCode: "ST003",
      sampleType: "Urine",
      storageLocation: "Room-C",
      freezerId: "FRZ-003",
      rackNo: "R06",
      boxNo: "B06",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 7,
      sampleId: "SMP007",
      subjectId: "SUB007",
      studyCode: "ST004",
      sampleType: "Serum",
      storageLocation: "Room-D",
      freezerId: "FRZ-004",
      rackNo: "R07",
      boxNo: "B07",
      temperature: "-20°C",
      storageStatus: "Disposed",
    },
    {
      id: 8,
      sampleId: "SMP008",
      subjectId: "SUB008",
      studyCode: "ST004",
      sampleType: "Plasma",
      storageLocation: "Room-D",
      freezerId: "FRZ-004",
      rackNo: "R08",
      boxNo: "B08",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 9,
      sampleId: "SMP009",
      subjectId: "SUB009",
      studyCode: "ST005",
      sampleType: "Blood",
      storageLocation: "Room-E",
      freezerId: "FRZ-005",
      rackNo: "R09",
      boxNo: "B09",
      temperature: "-20°C",
      storageStatus: "Pending",
    },
    {
      id: 10,
      sampleId: "SMP010",
      subjectId: "SUB010",
      studyCode: "ST005",
      sampleType: "Urine",
      storageLocation: "Room-E",
      freezerId: "FRZ-005",
      rackNo: "R10",
      boxNo: "B10",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 11,
      sampleId: "SMP011",
      subjectId: "SUB011",
      studyCode: "ST006",
      sampleType: "Serum",
      storageLocation: "Room-F",
      freezerId: "FRZ-006",
      rackNo: "R11",
      boxNo: "B11",
      temperature: "-20°C",
      storageStatus: "Transferred",
    },
    {
      id: 12,
      sampleId: "SMP012",
      subjectId: "SUB012",
      studyCode: "ST006",
      sampleType: "Plasma",
      storageLocation: "Room-F",
      freezerId: "FRZ-006",
      rackNo: "R12",
      boxNo: "B12",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 13,
      sampleId: "SMP013",
      subjectId: "SUB013",
      studyCode: "ST007",
      sampleType: "Blood",
      storageLocation: "Room-G",
      freezerId: "FRZ-007",
      rackNo: "R13",
      boxNo: "B13",
      temperature: "-20°C",
      storageStatus: "Pending",
    },
    {
      id: 14,
      sampleId: "SMP014",
      subjectId: "SUB014",
      studyCode: "ST007",
      sampleType: "Urine",
      storageLocation: "Room-G",
      freezerId: "FRZ-007",
      rackNo: "R14",
      boxNo: "B14",
      temperature: "-80°C",
      storageStatus: "Assigned",
    },
    {
      id: 15,
      sampleId: "SMP015",
      subjectId: "SUB015",
      studyCode: "ST008",
      sampleType: "Serum",
      storageLocation: "Room-H",
      freezerId: "FRZ-008",
      rackNo: "R15",
      boxNo: "B15",
      temperature: "-20°C",
      storageStatus: "Disposed",
    },
  ],
  []
);
  const [data, setData] =
  useState<SampleStorage[]>(initialData);
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
  item: SampleStorage
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
  item: SampleStorage
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
  item: SampleStorage
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
  const columns: ColumnDef<SampleStorage>[] = useMemo(
    () => [
      {
        accessorKey: "storageLocation",
        header: "Storage Location",
      },
      {
        accessorKey: "freezerId",
        header: "Freezer ID",
      },
      {
        accessorKey: "rackNo",
        header: "Rack No",
      },
      {
        accessorKey: "boxNo",
        header: "Box No",
      },
      {
        accessorKey: "temperature",
        header: "Temperature",
      },
      {
        accessorKey: "storageStatus",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Assigned"
                  ? "bg-green-100 text-green-700"
                  : value === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : value === "Transferred"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {value}
            </span>
          );
        }
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
            label="Add Sample Storage"
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

export default SampleStorage;