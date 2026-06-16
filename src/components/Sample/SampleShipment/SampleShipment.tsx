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

type SampleShipment = {
  id: number;
  trackingNumber: string;
  courier: string;
  originSite: string;
  destination: string;
  dispatchDate: string;
  status: string;
};

const SampleShipment = () => {
  const initialData = useMemo<SampleShipment[]>(
  () => [
    {
      id: 1,
      trackingNumber: "TRK1001",
      courier: "DHL",
      originSite: "Chennai",
      destination: "Mumbai",
      dispatchDate: "2026-06-01",
      status: "In Transit",
    },
    {
      id: 2,
      trackingNumber: "TRK1002",
      courier: "FedEx",
      originSite: "Chennai",
      destination: "Delhi",
      dispatchDate: "2026-06-02",
      status: "Delivered",
    },
    {
      id: 3,
      trackingNumber: "TRK1003",
      courier: "Blue Dart",
      originSite: "Bangalore",
      destination: "Hyderabad",
      dispatchDate: "2026-06-03",
      status: "Pending",
    },
    {
      id: 4,
      trackingNumber: "TRK1004",
      courier: "DHL",
      originSite: "Mumbai",
      destination: "Pune",
      dispatchDate: "2026-06-04",
      status: "Delivered",
    },
    {
      id: 5,
      trackingNumber: "TRK1005",
      courier: "FedEx",
      originSite: "Delhi",
      destination: "Chennai",
      dispatchDate: "2026-06-05",
      status: "In Transit",
    },
    {
      id: 6,
      trackingNumber: "TRK1006",
      courier: "Blue Dart",
      originSite: "Pune",
      destination: "Mumbai",
      dispatchDate: "2026-06-06",
      status: "Pending",
    },
    {
      id: 7,
      trackingNumber: "TRK1007",
      courier: "DHL",
      originSite: "Hyderabad",
      destination: "Bangalore",
      dispatchDate: "2026-06-07",
      status: "Delivered",
    },
    {
      id: 8,
      trackingNumber: "TRK1008",
      courier: "FedEx",
      originSite: "Chennai",
      destination: "Kolkata",
      dispatchDate: "2026-06-08",
      status: "In Transit",
    },
    {
      id: 9,
      trackingNumber: "TRK1009",
      courier: "Blue Dart",
      originSite: "Mumbai",
      destination: "Delhi",
      dispatchDate: "2026-06-09",
      status: "Pending",
    },
    {
      id: 10,
      trackingNumber: "TRK1010",
      courier: "DHL",
      originSite: "Bangalore",
      destination: "Chennai",
      dispatchDate: "2026-06-10",
      status: "Delivered",
    },
    {
      id: 11,
      trackingNumber: "TRK1011",
      courier: "FedEx",
      originSite: "Delhi",
      destination: "Pune",
      dispatchDate: "2026-06-11",
      status: "In Transit",
    },
    {
      id: 12,
      trackingNumber: "TRK1012",
      courier: "Blue Dart",
      originSite: "Hyderabad",
      destination: "Mumbai",
      dispatchDate: "2026-06-12",
      status: "Delivered",
    },
    {
      id: 13,
      trackingNumber: "TRK1013",
      courier: "DHL",
      originSite: "Chennai",
      destination: "Bangalore",
      dispatchDate: "2026-06-13",
      status: "Pending",
    },
    {
      id: 14,
      trackingNumber: "TRK1014",
      courier: "FedEx",
      originSite: "Kolkata",
      destination: "Delhi",
      dispatchDate: "2026-06-14",
      status: "Delivered",
    },
    {
      id: 15,
      trackingNumber: "TRK1015",
      courier: "Blue Dart",
      originSite: "Mumbai",
      destination: "Chennai",
      dispatchDate: "2026-06-15",
      status: "In Transit",
    },
  ],
  []
);

  const [data, _setData] = useState<SampleShipment[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [courierFilter, setCourierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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
    item: SampleShipment
  ) => {
    navigate("/sample/shipment/new-add", {
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
  const columns: ColumnDef<SampleShipment>[] = useMemo(
  () => [
    {
      accessorKey: "trackingNumber",
      header: "Tracking Number",
    },
    {
      accessorKey: "courier",
      header: "Courier",
    },
    {
      accessorKey: "originSite",
      header: "Origin Site",
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "dispatchDate",
      header: "Dispatch Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "Delivered"
                ? "bg-green-100 text-green-700"
                : value === "In Transit"
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionMenu
          item={row.original}
          onView={handleView}
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
    const courierMatch =
      !courierFilter ||
      item.courier === courierFilter;

    const statusMatch =
      !statusFilter ||
      item.status === statusFilter;

    return courierMatch && statusMatch;
  });
}, [
  data,
  courierFilter,
  statusFilter,
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
              value={courierFilter}
              onChange={(e) =>
                setCourierFilter(e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Couriers</option>
              <option value="DHL">DHL</option>
              <option value="FedEx">FedEx</option>
              <option value="Blue Dart">Blue Dart</option>
            </select>

          <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </select>

          <NavigateButton
            label="Create Shipment"
            path="/sample/shipment/new-add"
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

export default SampleShipment;