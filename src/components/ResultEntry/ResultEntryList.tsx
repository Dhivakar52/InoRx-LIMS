import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../common/DataTable";
import TableSearch from "../../common/TableSearch";
import ColumnToggle from "../../common/ColumnToggle";
import Pagination from "../../common/Pagination";
import NavigateButton from "../../common/NavigateButton";
import { ActionMenu } from "../../common/ActionMenu";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type ResultEntryRow = {
  id: number;
  labNumber: string;
  patientName: string;
  uhidNo: string;
  age: string;
  gender: string;
  testName: string;
  result: "Detected" | "Not Detected" | "Pending";
  ctValue: string;
  requestDate: string;
  status: "Pending" | "Completed" | "Approved";
  approvedBy: string;
};

const ResultEntryList = () => {
const initialData = useMemo<ResultEntryRow[]>(
  () => [
    {
      id: 1,
      labNumber: "260254020",
      patientName: "APPASAMY",
      uhidNo: "5",
      age: "75Y 3M 17D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Detected",
      ctValue: "28.5",
      requestDate: "01/04/2026",
      status: "Approved",
      approvedBy: "Dr. Senthil Kumar",
    },
    {
      id: 2,
      labNumber: "260254021",
      patientName: "KUMARESAN",
      uhidNo: "8",
      age: "45Y 2M 10D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Not Detected",
      ctValue: "N/A",
      requestDate: "01/04/2026",
      status: "Completed",
      approvedBy: "",
    },
    {
      id: 3,
      labNumber: "260254022",
      patientName: "MEENA",
      uhidNo: "12",
      age: "32Y 5M 0D",
      gender: "Female",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Pending",
      ctValue: "",
      requestDate: "31/03/2026",
      status: "Pending",
      approvedBy: "",
    },
    {
      id: 4,
      labNumber: "260254023",
      patientName: "RAJENDRAN",
      uhidNo: "23",
      age: "58Y 2M 15D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Detected",
      ctValue: "32.1",
      requestDate: "30/03/2026",
      status: "Approved",
      approvedBy: "Dr. Rajesh",
    },
    {
      id: 5,
      labNumber: "260254024",
      patientName: "SELVI",
      uhidNo: "34",
      age: "62Y 8M 0D",
      gender: "Female",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Not Detected",
      ctValue: "N/A",
      requestDate: "30/03/2026",
      status: "Completed",
      approvedBy: "",
    },
    {
      id: 6,
      labNumber: "260254025",
      patientName: "GANESAN",
      uhidNo: "41",
      age: "51Y 1M 5D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Detected",
      ctValue: "26.8",
      requestDate: "29/03/2026",
      status: "Approved",
      approvedBy: "Dr. Senthil Kumar",
    },
    {
      id: 7,
      labNumber: "260254026",
      patientName: "LAKSHMI",
      uhidNo: "56",
      age: "40Y 9M 12D",
      gender: "Female",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Pending",
      ctValue: "",
      requestDate: "29/03/2026",
      status: "Pending",
      approvedBy: "",
    },
    {
      id: 8,
      labNumber: "260254027",
      patientName: "MURUGAN",
      uhidNo: "63",
      age: "68Y 0M 3D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Not Detected",
      ctValue: "N/A",
      requestDate: "28/03/2026",
      status: "Approved",
      approvedBy: "Dr. Meena",
    },
    {
      id: 9,
      labNumber: "260254028",
      patientName: "PRIYA",
      uhidNo: "77",
      age: "29Y 6M 20D",
      gender: "Female",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Detected",
      ctValue: "35.2",
      requestDate: "28/03/2026",
      status: "Completed",
      approvedBy: "",
    },
    {
      id: 10,
      labNumber: "260254029",
      patientName: "SATHISH",
      uhidNo: "89",
      age: "55Y 11M 2D",
      gender: "Male",
      testName: "HCV RNA PCR (Qualitative)",
      result: "Pending",
      ctValue: "",
      requestDate: "27/03/2026",
      status: "Pending",
      approvedBy: "",
    },
  ],
  []
);

  const [data, setData] = useState(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
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

  const handleView = (item: ResultEntryRow) => {
    navigate("/result/entry/view", { state: { mode: "view", data: item } });
  };

  const handleEdit = (item: ResultEntryRow) => {
    navigate("/result/entry/edit", { state: { mode: "edit", data: item } });
  };

  const handleDelete = (item: ResultEntryRow) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete result for ${item.patientName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== item.id));
        Swal.fire("Deleted!", "Result removed successfully.", "success");
      }
    });
  };

  const columns: ColumnDef<ResultEntryRow>[] = [
    { accessorKey: "labNumber", header: "Lab No." },
    { accessorKey: "patientName", header: "Patient Name" },
    { accessorKey: "uhidNo", header: "UHID No" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "testName", header: "Test Name" },
    {
      accessorKey: "result",
      header: "Result",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "Detected"
                ? "bg-red-100 text-red-700"
                : value === "Not Detected"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    { accessorKey: "ctValue", header: "Ct Value" },
    { accessorKey: "requestDate", header: "Request Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "Approved"
                ? "bg-green-100 text-green-700"
                : value === "Completed"
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
    state: { globalFilter, columnVisibility, pagination },
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
            placeholder="Search by Lab No./Patient..."
          />
          <ColumnToggle table={table} />
          <NavigateButton
            label="New Result Entry"
            path="/result/entry/new"
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

export default ResultEntryList;