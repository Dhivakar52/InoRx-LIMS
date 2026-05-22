import { useMemo, useState } from "react";
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
import NavigateButton from "../../common/NavigateButton";
import CustomPanel from "../../common/CustomPanel";

import { Plus } from "lucide-react";

type Registration = {
  registrationId: string;
  subjectId: string;
  subjectName: string;
  studyId: string;
  visitName: string;
  testName: string;
  testType: string;
  registrationDate: string;
  scheduledDate: string;
  status: string;
  resultStatus: string;
};

const RegistrationTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  // const [isEditOpen, setIsEditOpen] = useState(false);
  // const [isViewOpen, setIsViewOpen] = useState(false);
  // const [selectedRow, setSelectedRow] = useState<Registration | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
const [panelMode, setPanelMode] = useState<"view" | "edit">("view");
const [selectedRow, setSelectedRow] = useState<Registration | null>(null);

 const data = useMemo<Registration[]>(
  () => [
    {
      registrationId: "TR001",
      subjectId: "SUB001",
      subjectName: "Arun Kumar",
      studyId: "ST001",
      visitName: "Screening",
      testName: "Complete Blood Count (CBC)",
      testType: "Laboratory",
      registrationDate: "08-05-2026",
      scheduledDate: "10-05-2026",
      status: "Completed",
      resultStatus: "Approved",
    },
    {
      registrationId: "TR002",
      subjectId: "SUB002",
      subjectName: "Priya Sharma",
      studyId: "ST001",
      visitName: "Baseline",
      testName: "ECG",
      testType: "Cardiology",
      registrationDate: "10-05-2026",
      scheduledDate: "12-05-2026",
      status: "Completed",
      resultStatus: "Reviewed",
    },
    {
      registrationId: "TR003",
      subjectId: "SUB003",
      subjectName: "Rahul Verma",
      studyId: "ST002",
      visitName: "Follow Up - 1",
      testName: "Blood Glucose",
      testType: "Laboratory",
      registrationDate: "12-05-2026",
      scheduledDate: "14-05-2026",
      status: "Pending",
      resultStatus: "Awaiting",
    },
    {
      registrationId: "TR004",
      subjectId: "SUB004",
      subjectName: "Sneha Reddy",
      studyId: "ST002",
      visitName: "Baseline",
      testName: "Liver Function Test",
      testType: "Laboratory",
      registrationDate: "13-05-2026",
      scheduledDate: "15-05-2026",
      status: "Scheduled",
      resultStatus: "Awaiting",
    },
    {
      registrationId: "TR005",
      subjectId: "SUB005",
      subjectName: "Vikram Singh",
      studyId: "ST003",
      visitName: "Screening",
      testName: "Urine Analysis",
      testType: "Laboratory",
      registrationDate: "14-05-2026",
      scheduledDate: "16-05-2026",
      status: "Completed",
      resultStatus: "Approved",
    },
    {
      registrationId: "TR006",
      subjectId: "SUB006",
      subjectName: "Kavya Nair",
      studyId: "ST003",
      visitName: "Follow Up - 2",
      testName: "Chest X-Ray",
      testType: "Radiology",
      registrationDate: "15-05-2026",
      scheduledDate: "18-05-2026",
      status: "Scheduled",
      resultStatus: "Awaiting",
    },
    {
      registrationId: "TR007",
      subjectId: "SUB007",
      subjectName: "Mohammed Ali",
      studyId: "ST004",
      visitName: "Baseline",
      testName: "HbA1c",
      testType: "Laboratory",
      registrationDate: "16-05-2026",
      scheduledDate: "19-05-2026",
      status: "Completed",
      resultStatus: "Reviewed",
    },
  ],
  []
);

  const columns: ColumnDef<Registration>[] = useMemo(
    () => [
      {
        accessorKey: "registrationId",
        header: "Registration ID",
      },
      {
        accessorKey: "subjectId",
        header: "Subject ID",
      },
      {
        accessorKey: "subjectName",
        header: "Subject Name",
      },
      {
        accessorKey: "studyId",
        header: "Study ID",
      },
      {
        accessorKey: "visitName",
        header: "Visit",
      },
      {
        accessorKey: "testName",
        header: "Test Name",
      },
      {
        accessorKey: "testType",
        header: "Test Type",
      },
      {
        accessorKey: "scheduledDate",
        header: "Scheduled Date",
      },
      {
        accessorKey: "resultStatus",
        header: "Result Status",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Completed"
                  ? "bg-green-100 text-green-700"
                  : value === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
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

          return (
            <ActionMenu
              item={item}
            //  onView={(data) => {
            //     setSelectedRow(data);
            //     setIsViewOpen(true);
            //   }}
            //   onEdit={(data) => {
            //     setSelectedRow(data);
            //     setIsEditOpen(true);
            //   }}
            onView={(data) => {
              setSelectedRow(data);
              setPanelMode("view");
              setIsPanelOpen(true);
            }}
            onEdit={(data) => {
              setSelectedRow(data);
              setPanelMode("edit");
              setIsPanelOpen(true);
            }}
              onAuditLog={(data) => console.log("Audit Log:", data)}
              onDelete={(data) => console.log("Delete:", data)}
            />
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnVisibility,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSave = () => {
  if (panelMode === "view") {
    setIsPanelOpen(false);
    return;
  }
  // API Call

  setIsPanelOpen(false);
};
  return (
    <>
      <div className="p-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-end items-center mb-4 gap-3">
            <TableSearch
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search..."
            />

            <ColumnToggle table={table} />

            <NavigateButton
              label="Add Test"
              path="/testRegistration/new-add"
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

     <CustomPanel
  isOpen={isPanelOpen}
  title={
    panelMode === "view"
      ? "View Test Registration"
      : "Edit Test Registration"
  }
  onClose={() => {
    setIsPanelOpen(false);
    setSelectedRow(null);
  }}
  onSave={handleSave}
  saveLabel={panelMode === "view" ? "Close" : "Update"}
>
  {selectedRow && (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Registration ID
        </label>
        <input
          type="text"
          value={selectedRow.registrationId}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Subject ID
        </label>
        <input
          type="text"
          value={selectedRow.subjectId}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-gray-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Subject Name
        </label>
        <input
          type="text"
          value={selectedRow.subjectName}
          readOnly={panelMode === "view"}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              subjectName: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Test Name
        </label>
        <input
          type="text"
          value={selectedRow.testName}
          readOnly={panelMode === "view"}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              testName: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Status
        </label>

        <select
          value={selectedRow.status}
          disabled={panelMode === "view"}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              status: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Result Status
        </label>

        <select
          value={selectedRow.resultStatus}
          disabled={panelMode === "view"}
          onChange={(e) =>
            setSelectedRow({
              ...selectedRow,
              resultStatus: e.target.value,
            })
          }
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="Awaiting">Awaiting</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Approved">Approved</option>
        </select>
      </div>
    </div>
  )}
</CustomPanel>
    </>
  );
};

export default RegistrationTable;