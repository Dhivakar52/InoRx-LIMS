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
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

type SampleStorage = {
  id: number;
  sampleId: string;
  sampleType: string;
  sampleDate: string;
  freezerId: string;
  coordinates: string;
  conditionStatus: string;
};
const SampleStorage = () => {
  const initialData = useMemo<SampleStorage[]>(
  () => [
    {
      id: 1,
      sampleId: "SMP001",
      sampleType: "Blood",
      sampleDate: "2026-06-10",
      freezerId: "FRZ-001",
      coordinates: "A1-B2",
      conditionStatus: "Good",
    },
    {
      id: 2,
      sampleId: "SMP002",
      sampleType: "Urine",
      sampleDate: "2026-06-11",
      freezerId: "FRZ-002",
      coordinates: "A2-B3",
      conditionStatus: "Damaged",
    },
    {
      id: 3,
      sampleId: "SMP003",
      sampleType: "Serum",
      sampleDate: "2026-06-12",
      freezerId: "FRZ-003",
      coordinates: "A3-B1",
      conditionStatus: "Good",
    },
    {
      id: 4,
      sampleId: "SMP004",
      sampleType: "Plasma",
      sampleDate: "2026-06-13",
      freezerId: "FRZ-001",
      coordinates: "B1-C1",
      conditionStatus: "Expired",
    },
  ],
  []
);
  const [data, _setData] = useState<SampleStorage[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [sampleTypeFilter, setSampleTypeFilter] =useState("");
  const [conditionFilter, setConditionFilter] =useState("");

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
  navigate("/sample/storage/new-add", {
    state: {
      mode: "view",
      data: item,
    },
  });
};

// EDIT
// const handleEdit = (
//   item: SampleStorage
// ) => {
//   navigate("/sample/storage/new-add", {
//     state: {
//       mode: "edit",
//       data: item,
//     },
//   });
// };

// // DELETE
// const handleDelete = (
//   item: SampleStorage
// ) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: `Delete ${item.sampleId}?`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       setData((prev) =>
//         prev.filter(
//           (d) => d.id !== item.id
//         )
//       );

//       Swal.fire(
//         "Deleted!",
//         "Sample removed successfully.",
//         "success"
//       );
//     }
//   });
// };
  const columns: ColumnDef<SampleStorage>[] =
  useMemo(
    () => [
      {
        accessorKey: "sampleId",
        header: "Sample ID",
      },
      {
        accessorKey: "sampleType",
        header: "Sample Type",
      },
      {
        accessorKey: "sampleDate",
        header: "Sample Date",
      },
      {
        accessorKey: "freezerId",
        header: "Freezer ID",
      },
      {
        accessorKey: "coordinates",
        header: "Coordinates",
      },
      {
        accessorKey: "conditionStatus",
        header: "Condition Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Good"
                  ? "bg-green-100 text-green-700"
                  : value === "Damaged"
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
        cell: ({ row }) => (
          <ActionMenu
            item={row.original}
            onView={handleView}
            //onEdit={handleEdit}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        ),
      },
    ],
    [openMenuId]
  );

  const filteredData = useMemo(() => {
  return data.filter((item) => {
    const sampleTypeMatch =
      !sampleTypeFilter ||
      item.sampleType === sampleTypeFilter;

    const conditionMatch =
      !conditionFilter ||
      item.conditionStatus === conditionFilter;

    return sampleTypeMatch && conditionMatch;
  });
}, [
  data,
  sampleTypeFilter,
  conditionFilter,
]);
  const table = useReactTable({
    data:filteredData,
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
      <div className="flex flex-wrap justify-end items-center mb-4 gap-3">
            <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search Sample..."
          />

          <ColumnToggle table={table} />

          <select
            value={sampleTypeFilter}
            onChange={(e) =>
              setSampleTypeFilter(e.target.value)
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">
              All Sample Types
            </option>
            <option value="Blood">
              Blood
            </option>
            <option value="Urine">
              Urine
            </option>
            <option value="Serum">
              Serum
            </option>
            <option value="Plasma">
              Plasma
            </option>
          </select>

          <select
            value={conditionFilter}
            onChange={(e) =>
              setConditionFilter(e.target.value)
            }
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option value="">
              All Conditions
            </option>
            <option value="Good">
              Good
            </option>
            <option value="Damaged">
              Damaged
            </option>
            <option value="Expired">
              Expired
            </option>
          </select>
          <NavigateButton
            label="Log Storage"
            path="/sample/storage/new-add"
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