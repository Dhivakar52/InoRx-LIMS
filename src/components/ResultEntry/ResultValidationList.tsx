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
import { ActionMenu } from "../../common/ActionMenu";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type ApprovalResult = {
  id: number;
  labNumber: string;
  patientName: string;
  testName: string;
  result: "Detected" | "Not Detected";
  ctValue: string;
  requestDate: string;
  submittedBy: string;
  submittedDate: string;
  status: "Pending Approval" | "Approved" | "Rejected";
};

const ResultApprovalList = () => {
  const initialData = useMemo<ApprovalResult[]>(
    () => [
      {
        id: 1,
        labNumber: "260254030",
        patientName: "RAVI KUMAR",
        testName: "HCV RNA PCR (Qualitative)",
        result: "Detected",
        ctValue: "28.5",
        requestDate: "02/04/2026",
        submittedBy: "Julia Lydia.Y",
        submittedDate: "02/04/2026 14:30",
        status: "Pending Approval",
      },
      {
        id: 2,
        labNumber: "260254031",
        patientName: "SUNDARI",
        testName: "HCV RNA PCR (Qualitative)",
        result: "Not Detected",
        ctValue: "N/A",
        requestDate: "02/04/2026",
        submittedBy: "Julia Lydia.Y",
        submittedDate: "02/04/2026 15:15",
        status: "Pending Approval",
      },
      {
        id: 3,
        labNumber: "260254032",
        patientName: "VENKATESH",
        testName: "HCV RNA PCR (Qualitative)",
        result: "Detected",
        ctValue: "32.1",
        requestDate: "01/04/2026",
        submittedBy: "Julia Lydia.Y",
        submittedDate: "01/04/2026 16:45",
        status: "Pending Approval",
      },
      {
        id: 4,
        labNumber: "260254033",
        patientName: "JOTHI",
        testName: "HCV RNA PCR (Qualitative)",
        result: "Not Detected",
        ctValue: "N/A",
        requestDate: "01/04/2026",
        submittedBy: "Julia Lydia.Y",
        submittedDate: "01/04/2026 17:20",
        status: "Approved",
      },
      {
        id: 5,
        labNumber: "260254034",
        patientName: "SELVAKUMAR",
        testName: "HCV RNA PCR (Qualitative)",
        result: "Detected",
        ctValue: "29.8",
        requestDate: "31/03/2026",
        submittedBy: "Julia Lydia.Y",
        submittedDate: "31/03/2026 18:00",
        status: "Rejected",
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

  const handleView = (item: ApprovalResult) => {
    navigate("/result/approval/review", { state: { mode: "view", data: item } });
  };

  const handleApprove = (item: ApprovalResult) => {
    navigate("/result/approval/review", { state: { mode: "approve", data: item } });
  };

  const handleReject = (item: ApprovalResult) => {
    Swal.fire({
      title: "Reject Result",
      text: `Reject result for ${item.patientName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) =>
          prev.map((r) =>
            r.id === item.id ? { ...r, status: "Rejected" } : r
          )
        );
        Swal.fire("Rejected!", "Result has been rejected.", "success");
      }
    });
  };

  const columns: ColumnDef<ApprovalResult>[] = [
    { accessorKey: "labNumber", header: "Lab No." },
    { accessorKey: "patientName", header: "Patient Name" },
    { accessorKey: "testName", header: "Test Name" },
    {
      accessorKey: "result",
      header: "Result",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              value === "Detected" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    { accessorKey: "ctValue", header: "Ct Value" },
    { accessorKey: "requestDate", header: "Request Date" },
    { accessorKey: "submittedBy", header: "Submitted By" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const value = getValue<string>();
        let colorClass = "";
        if (value === "Pending Approval") colorClass = "bg-yellow-100 text-yellow-700";
        else if (value === "Approved") colorClass = "bg-green-100 text-green-700";
        else if (value === "Rejected") colorClass = "bg-red-100 text-red-700";
        return <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>{value}</span>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        if (item.status !== "Pending Approval") {
          return (
            <ActionMenu
              item={item}
              onView={handleView}
              onEdit={undefined}
              onDelete={undefined}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          );
        }
        return (
          <ActionMenu
            item={item}
            onView={handleView}
            onEdit={handleApprove}   // Edit = Approve
            onDelete={handleReject}  // Delete = Reject
            openMenuId={openMenuId}
            setOpenMenuId={setOpenMenuId}
          />
        );
      },
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
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#00458F]">Result Approval</h1>
            <p className="text-sm text-gray-500 mt-1">
              Approve or reject pending test results
            </p>
          </div>
          <div className="flex gap-3">
            <TableSearch
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search by Lab No./Patient..."
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
};

export default ResultApprovalList;