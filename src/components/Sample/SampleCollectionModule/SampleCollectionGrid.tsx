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
type SampleCollectionRow = {
  id:number;
  sampleId: string;
  donorId: string;
  bloodGroup: string;
  componentType: string;
  collectedDate: string;
  collectedBy: string;
  status: string;
};

const SampleCollectionGrid = () => {
 const data = useMemo<SampleCollectionRow[]>(
  () => [
    {
     id:1,
      sampleId: "BB-20260001",
      donorId: "DON-1001",
      bloodGroup: "O+",
      componentType: "Whole Blood",
      collectedDate: "2026-06-01",
      collectedBy: "Nurse Priya",
      status: "Collected",
    },
    {
      id:2,
      sampleId: "BB-20260002",
      donorId: "DON-1002",
      bloodGroup: "A+",
      componentType: "Packed RBC",
      collectedDate: "",
      collectedBy: "",
      status: "Pending Collection",
    },
    {
      id:3,
      sampleId: "BB-20260003",
      donorId: "DON-1003",
      bloodGroup: "B+",
      componentType: "Platelets",
      collectedDate: "2026-06-02",
      collectedBy: "Nurse Kumar",
      status: "Collected",
    },
    {
      id:4,
      sampleId: "BB-20260004",
      donorId: "DON-1004",
      bloodGroup: "AB+",
      componentType: "Plasma",
      collectedDate: "",
      collectedBy: "",
      status: "Pending Collection",
    },
    {
      id:5,
      sampleId: "BB-20260005",
      donorId: "DON-1005",
      bloodGroup: "O-",
      componentType: "Whole Blood",
      collectedDate: "2026-06-03",
      collectedBy: "Nurse Meena",
      status: "Collected",
    },
    {
      id:6,
      sampleId: "BB-20260006",
      donorId: "DON-1006",
      bloodGroup: "A-",
      componentType: "Packed RBC",
      collectedDate: "",
      collectedBy: "",
      status: "Pending Collection",
    },
    {
      id:7,
      sampleId: "BB-20260007",
      donorId: "DON-1007",
      bloodGroup: "B-",
      componentType: "Platelets",
      collectedDate: "2026-06-04",
      collectedBy: "Nurse Priya",
      status: "Collected",
    },
    { 
      id:8,
      sampleId: "BB-20260008",
      donorId: "DON-1008",
      bloodGroup: "AB-",
      componentType: "Plasma",
      collectedDate: "",
      collectedBy: "",
      status: "Pending Collection",
    },
    {
      id:9,
      sampleId: "BB-20260009",
      donorId: "DON-1009",
      bloodGroup: "O+",
      componentType: "Whole Blood",
      collectedDate: "2026-06-05",
      collectedBy: "Nurse Kumar",
      status: "Collected",
    },
    {
      id:10,
      sampleId: "BB-20260010",
      donorId: "DON-1010",
      bloodGroup: "A+",
      componentType: "Packed RBC",
      collectedDate: "",
      collectedBy: "",
      status: "Pending Collection",
    },
  ],
  []
);
  
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [samples, setSamples] = useState(data);
  const statusColors: Record<string, string> = {
  "Pending Collection": "bg-gray-100 text-gray-700",
  Collected: "bg-green-100 text-green-700",
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
// const handleView = (item: SampleCollectionRow) => {
//   navigate("/sample/collection/new-add", {
//     state: {
//       mode: "view",
//       data: item,
//     },
//   });
// };

const handleCollect = (item: SampleCollectionRow) => {
  setSamples((prev) =>
    prev.map((row) =>
      row.sampleId === item.sampleId
        ? {
            ...row,
            status: "Collected",
            collectedDate: new Date()
              .toISOString()
              .split("T")[0],
            collectedBy: "Current User",
          }
        : row
    )
  );
};

  const columns: ColumnDef<SampleCollectionRow>[] = [
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
    accessorKey: "collectedDate",
    header: "Collected Date",
    cell: ({ getValue }) => getValue() || "-",
  },
  {
    accessorKey: "collectedBy",
    header: "Collected By",
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
          const isPending = item.status === "Pending Collection";
          return (
            <ActionMenu
            item={item}
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
            onView={() => navigate(`/sample/collection/new-add/${item.id}`)}
            onCollect={isPending ? () => handleCollect(item) : undefined}
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
            label="Add Sample Collection"
            path="/sample/collection/new-add"
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

export default SampleCollectionGrid;