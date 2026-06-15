import {  useMemo, useState } from "react";
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
import NavigateButton from "../../../common/NavigateButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


type SampleTrackingRow = {
  sampleId: string;
  donorId: string;
  bloodGroup: string;
  componentType: string;
  currentLocation: string;
  currentStatus: string;
};

const SampleTrackingList = () => {
 

const data = useMemo<SampleTrackingRow[]>(
  () => [
    {
      sampleId: "BB-20260001",
      donorId: "DON-1001",
      bloodGroup: "O+",
      componentType: "Packed RBC",
      currentLocation: "Freezer F01",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260002",
      donorId: "DON-1002",
      bloodGroup: "A+",
      componentType: "Platelets",
      currentLocation: "Screening Lab",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260003",
      donorId: "DON-1003",
      bloodGroup: "B+",
      componentType: "Plasma",
      currentLocation: "Issue Counter",
      currentStatus: "Completed",
    },
    {
      sampleId: "BB-20260004",
      donorId: "DON-1004",
      bloodGroup: "AB+",
      componentType: "Whole Blood",
      currentLocation: "Collection Room",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260005",
      donorId: "DON-1005",
      bloodGroup: "O-",
      componentType: "Packed RBC",
      currentLocation: "Freezer F02",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260006",
      donorId: "DON-1006",
      bloodGroup: "A-",
      componentType: "Plasma",
      currentLocation: "Storage Unit A",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260007",
      donorId: "DON-1007",
      bloodGroup: "B-",
      componentType: "Platelets",
      currentLocation: "Screening Lab",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260008",
      donorId: "DON-1008",
      bloodGroup: "AB-",
      componentType: "Cryoprecipitate",
      currentLocation: "Freezer F03",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260009",
      donorId: "DON-1009",
      bloodGroup: "O+",
      componentType: "Packed RBC",
      currentLocation: "Issue Counter",
      currentStatus: "Completed",
    },
    {
      sampleId: "BB-20260010",
      donorId: "DON-1010",
      bloodGroup: "A+",
      componentType: "Whole Blood",
      currentLocation: "Collection Room",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260011",
      donorId: "DON-1011",
      bloodGroup: "B+",
      componentType: "Plasma",
      currentLocation: "Freezer F01",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260012",
      donorId: "DON-1012",
      bloodGroup: "AB+",
      componentType: "Platelets",
      currentLocation: "Screening Lab",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260013",
      donorId: "DON-1013",
      bloodGroup: "O-",
      componentType: "Cryoprecipitate",
      currentLocation: "Storage Unit B",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260014",
      donorId: "DON-1014",
      bloodGroup: "A-",
      componentType: "Packed RBC",
      currentLocation: "Issue Counter",
      currentStatus: "Completed",
    },
    {
      sampleId: "BB-20260015",
      donorId: "DON-1015",
      bloodGroup: "B-",
      componentType: "Whole Blood",
      currentLocation: "Collection Room",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260016",
      donorId: "DON-1016",
      bloodGroup: "AB-",
      componentType: "Plasma",
      currentLocation: "Freezer F02",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260017",
      donorId: "DON-1017",
      bloodGroup: "O+",
      componentType: "Platelets",
      currentLocation: "Screening Lab",
      currentStatus: "In Progress",
    },
    {
      sampleId: "BB-20260018",
      donorId: "DON-1018",
      bloodGroup: "A+",
      componentType: "Cryoprecipitate",
      currentLocation: "Storage Unit C",
      currentStatus: "Stored",
    },
    {
      sampleId: "BB-20260019",
      donorId: "DON-1019",
      bloodGroup: "B+",
      componentType: "Packed RBC",
      currentLocation: "Issue Counter",
      currentStatus: "Completed",
    },
    {
      sampleId: "BB-20260020",
      donorId: "DON-1020",
      bloodGroup: "AB+",
      componentType: "Whole Blood",
      currentLocation: "Freezer F03",
      currentStatus: "Stored",
    },
  ],
  []
);

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
    const navigate = useNavigate();
    // const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  
    // useEffect(() => {
    //   const close = (e: MouseEvent) => {
    //     if (!(e.target as HTMLElement).closest(".menu-container")) {
    //       setOpenMenuId(null);
    //     }
    //   };
  
    //   document.addEventListener("click", close);
  
    //   return () => document.removeEventListener("click", close);
    // }, []);

const handleView = (item: SampleTrackingRow) => {
  navigate("/sample/tracking/add", {
    state: {
      mode: "view",
      data: item,
    },
  });
};
    

  const columns: ColumnDef<SampleTrackingRow>[] = [
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
      accessorKey: "currentLocation",
      header: "Current Location",
    },
    {
      accessorKey: "currentStatus",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium
            ${
              value === "Stored"
                ? "bg-green-100 text-green-700"
                : value === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
//  {
//      id: "actions",
//      header: "Actions",
//      cell: ({ row }) => (
//        <ActionMenu
//          item={row.original}
//          onView={handleView}
//         //   onEdit={handleEdit}
//         // onDelete={handleDelete}
//           openMenuId={openMenuId}
//         setOpenMenuId={setOpenMenuId}
//        />
//      ),
//    },
{
  id: "actions",
  header: "Actions",
  cell: ({ row }) => (
    <button
      onClick={() => handleView(row.original)}
      className="px-3 py-1 bg-gray-500 text-white rounded-md text-sm"
    >
      View
    </button>
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

        <div className="flex justify-end items-center gap-3 mb-4">

          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search Sample..."
          />

          <ColumnToggle table={table} />

          <NavigateButton
            label="Add Sample Tracking"
            path="/sample/tracking/add"
            icon={<Plus size={18} />}
          />

        </div>

        <DataTable table={table} columns={columns} />

        <Pagination
          table={table}
          totalCount={
            table.getFilteredRowModel().rows.length
          }
        />
      </div>
    </div>
  );
};

export default SampleTrackingList;



