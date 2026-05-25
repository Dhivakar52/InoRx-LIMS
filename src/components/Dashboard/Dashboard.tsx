import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../common/DataTable";
import Pagination from "../../common/Pagination";
import TableSearch from "../../common/TableSearch";
import ColumnToggle from "../../common/ColumnToggle";

import {
  Users,
  TestTube,
  Clock3,
  FileCheck,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

type Registration = {
  id: number;
  patientName: string;
  testName: string;
  doctor: string;
  status: string;
};

export default function Dashboard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const registrations: Registration[] = useMemo(
    () => [
      {
        id: 1001,
        patientName: "Kumar",
        testName: "CBC",
        doctor: "Dr. Raj",
        status: "Completed",
      },
      {
        id: 1002,
        patientName: "Priya",
        testName: "LFT",
        doctor: "Dr. Anand",
        status: "Pending",
      },
      {
        id: 1003,
        patientName: "Rahul",
        testName: "Blood Sugar",
        doctor: "Dr. Kumar",
        status: "Completed",
      },
      {
        id: 1004,
        patientName: "Divya",
        testName: "Thyroid",
        doctor: "Dr. Priya",
        status: "In Progress",
      },
      {
        id: 1005,
        patientName: "Arun",
        testName: "Lipid Profile",
        doctor: "Dr. Kumar",
        status: "Completed",
      },
      {
        id: 1006,
        patientName: "Meena",
        testName: "Vitamin D",
        doctor: "Dr. Raj",
        status: "Pending",
      },
    ],
    []
  );

  const columns: ColumnDef<Registration>[] = [
    {
      accessorKey: "id",
      header: "Reg No",
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "testName",
      header: "Test Name",
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              status === "Completed"
                ? "bg-green-100 text-green-700"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data: registrations,
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
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  const stats = [
    {
      title: "Total Patients",
      value: "1,250",
      icon: Users,
    },
    {
      title: "Total Tests",
      value: "3,420",
      icon: TestTube,
    },
    {
      title: "Pending Tests",
      value: "145",
      icon: Clock3,
    },
    {
      title: "Completed Reports",
      value: "3,100",
      icon: FileCheck,
    },
    {
      title: "Critical Results",
      value: "25",
      icon: AlertTriangle,
    },
    {
      title: "Revenue",
      value: "₹2.4L",
      icon: IndianRupee,
    },
  ];

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold">
          Laboratory Information Management System
        </h3>
        {/* <p className="text-sm text-gray-500">
          Laboratory Information Management System
        </p> */}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    {item.value}
                  </h2>
                </div>

                <div className="bg-blue-50 p-2 rounded-md">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts + Department */}
      <div className="grid lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">
            Critical Alerts
          </h3>

          <div className="space-y-2">
            <div className="bg-red-50 border border-red-200 rounded-md p-2 text-sm">
              Hemoglobin below critical level
            </div>

            <div className="bg-red-50 border border-red-200 rounded-md p-2 text-sm">
              Blood Sugar above 400 mg/dL
            </div>

            <div className="bg-red-50 border border-red-200 rounded-md p-2 text-sm">
              Positive Dengue Cases Found
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold mb-3">
            Department Statistics
          </h3>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm">
                <span>Biochemistry</span>
                <span>320</span>
              </div>

              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-blue-500 rounded w-[70%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Pathology</span>
                <span>450</span>
              </div>

              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-green-500 rounded w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm">
                <span>Microbiology</span>
                <span>210</span>
              </div>

              <div className="h-2 bg-gray-200 rounded mt-1">
                <div className="h-2 bg-yellow-500 rounded w-[50%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Registrations */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">
            Recent Registrations
          </h3>

          <div className="flex gap-2">
            <TableSearch
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search..."
            />

            <ColumnToggle table={table} />
          </div>
        </div>

        <DataTable table={table} columns={columns} />

        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />
      </div>
    </div>
  );
}