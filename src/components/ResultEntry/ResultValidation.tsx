import { useState, useEffect } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { ActionMenu } from "../../common/ActionMenu";
import TableSearch from "../../common/TableSearch";
import { DataTable } from "../../common/DataTable";
import ColumnToggle from "../../common/ColumnToggle";
import Pagination from "../../common/Pagination";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export type ResultValidationData = {
  id: number;

  sampleId: string;
  sampleCode: string;
  subjectCode: string;

  studyCode: string;
  protocolNo: string;

  department: string;
  testName: string;
  parameter: string;

  resultValue: string;
  unit: string;
  referenceRange: string;

  collectionDate: string;
  processingDate: string;

  analystName: string;
  reviewerName: string;

  resultEntryDate: string;

  validationStatus:
    | "Pending"
    | "Validated"
    | "Rejected"
    | "Query Raised";

  validationDate?: string;
  validatedBy?: string;

  remarks?: string;
};
const ResultValidationList = () => {
  const initialData: ResultValidationData[] = [
  {
  id: 1,

  sampleId: "SMP001",
  sampleCode: "SC001",
  subjectCode: "SUB001",

  studyCode: "STUDY-001",
  protocolNo: "PROTO-2026-001",

  department: "Hematology",
  testName: "Complete Blood Count",
  parameter: "Hemoglobin",

  resultValue: "13.5",
  unit: "g/dL",
  referenceRange: "12.0 - 16.0",

  collectionDate: "2026-06-02",
  processingDate: "2026-06-03",

  analystName: "John",
  reviewerName: "Michael",

  resultEntryDate: "2026-06-06",

  validationStatus: "Validated",
  validationDate: "2026-06-07",
  validatedBy: "Dr. Smith",

  remarks: "Within acceptable range"
},
 {
  id: 2,

  sampleId: "SMP002",
  sampleCode: "SC002",
  subjectCode: "SUB002",

  studyCode: "STUDY-002",
  protocolNo: "PROTO-2026-002",

  department: "Biochemistry",
  testName: "Blood Glucose",
  parameter: "Glucose",

  resultValue: "110",
  unit: "mg/dL",
  referenceRange: "70 - 100",

  collectionDate: "2026-06-13",
  processingDate: "2026-06-14",

  analystName: "David",
  reviewerName: "",

  resultEntryDate: "2026-06-15",

  validationStatus: "Pending",

  validationDate: "",
  validatedBy: "",

  remarks: ""
},
  {
  id: 3,

  sampleId: "SMP003",
  sampleCode: "SC003",
  subjectCode: "SUB003",

  studyCode: "STUDY-003",
  protocolNo: "PROTO-2026-003",

  department: "Microbiology",
  testName: "Culture Test",
  parameter: "Bacterial Growth",

  resultValue: "Positive",
  unit: "-",
  referenceRange: "-",

  collectionDate: "2026-06-10",
  processingDate: "2026-06-11",

  analystName: "Kevin",
  reviewerName: "Robert",

  resultEntryDate: "2026-06-12",

  validationStatus: "Rejected",

  validationDate: "2026-06-13",
  validatedBy: "Dr. James",

  remarks: "Result mismatch. Re-analysis required."
}
];
  const [data, setData] = useState<ResultValidationData[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<"validate" | "reject" | null>(null);

  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [openESign, setOpenESign] = useState(false);

  const [eSignData, setESignData] = useState({
  userName: "",
  password: "",
  reason: "",
  });

  const [eSignErrors, setESignErrors] = useState<any>({});


  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", close);

    return () => document.removeEventListener("click", close);
  }, []);
 
  
    const handleView = (item: ResultValidationData) => {
    navigate("/result/validation/view", {
      state: {
        mode: "view",
        data: item,
      },
    });
    };

       const validateESign = () => {
    const errors: any = {};

    if (!eSignData.userName.trim()) {
      errors.userName = "Username is required";
    }

    if (!eSignData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!eSignData.reason.trim()) {
      errors.reason = "Reason is required";
    }

    setESignErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleApproveContinue = async () => {
      if (!validateESign()) return;

    const payload = {
      sampleId: selectedRecord?.sampleId,
      username: eSignData.userName,
      password: eSignData.password,
      reason: eSignData.reason,
      action: actionType,
    };

    console.log(payload);

    setData((prev) =>
        prev.map((item) =>
          item.id === selectedRecord.id
            ? {
                ...item,
                validationStatus:
                  actionType === "validate"
                    ? "Validated"
                    : "Rejected",
                validationDate:
                  new Date().toISOString().split("T")[0],
                validatedBy: eSignData.userName,
                remarks: eSignData.reason,
              }
            : item
        )
      );

    setOpenESign(false);
};

   const handleValidate = (row: ResultValidationData) => {
      setSelectedRecord(row);
      setActionType("validate");
      setOpenESign(true);
    };

    const handleReject = (row: ResultValidationData) => {
      setSelectedRecord(row);
      setActionType("reject");
      setOpenESign(true);
    };

      const columns: ColumnDef<ResultValidationData>[] = [
        {
          accessorKey: "sampleId",
          header: "Sample ID",
        },
        {
          accessorKey: "sampleCode",
          header: "Sample Code",
        },
        {
          accessorKey: "subjectCode",
          header: "Subject Code",
        },
        {
          accessorKey: "studyCode",
          header: "Study Code",
        },
        {
          accessorKey: "department",
          header: "Department",
        },
        {
          accessorKey: "testName",
          header: "Test Name",
        },
        {
          accessorKey: "parameter",
          header: "Parameter",
        },
        {
          accessorKey: "resultValue",
          header: "Result",
        },
        {
          accessorKey: "unit",
          header: "Unit",
        },
        {
          accessorKey: "analystName",
          header: "Analyst",
        },
        {
          accessorKey: "resultEntryDate",
          header: "Result Entry Date",
        },
        {
          accessorKey: "validationStatus",
          header: "Status",
          cell: ({ row }) => {
            const status = row.original.validationStatus;

            return (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  status === "Validated"
                    ? "bg-green-100 text-green-700"
                    : status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : status === "Query Raised"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {status}
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
              onValidate={row.original.validationStatus === "Pending"? () => handleValidate(row.original): undefined}
              onReject={row.original.validationStatus === "Pending"? () => handleReject(row.original): undefined}
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
      <div className="flex flex-wrap justify-end items-center mb-4 gap-3">
            <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search Sample..."
          />

          <ColumnToggle table={table} />

        </div>

        <DataTable table={table} columns={columns} />

        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />
      </div>

      <Dialog.Root
  open={openESign}
  onOpenChange={setOpenESign}
>
  <Dialog.Portal>

    <Dialog.Overlay className="fixed inset-0 bg-black/50" />

    <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg">

     <Dialog.Title className="text-lg font-semibold mb-4">
        {actionType === "validate"
          ? "Validate Result"
          : "Reject Result"}
      </Dialog.Title>

      <div className="border p-4 rounded bg-gray-50">

      <p className="text-sm mb-4">
        By signing in you are hereby authorizing a{" "}
        <span className="font-semibold">
          {actionType === "validate"
            ? "Result Validation"
            : "Result Rejection"}
        </span>{" "}
        operation on this activity.
      </p>

      <div className="grid grid-cols-[120px_1fr] gap-3 items-center">

        <Label>Username</Label>

        <div>
          <Input
            value={eSignData.userName}
            onChange={(e) =>
              setESignData((prev) => ({
                ...prev,
                userName: e.target.value,
              }))
            }
          />

          {eSignErrors.userName && (
            <p className="text-red-500 text-xs">
              {eSignErrors.userName}
            </p>
          )}
        </div>

        <Label>Password</Label>

        <div>
          <Input
            type="password"
            value={eSignData.password}
            onChange={(e) =>
              setESignData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          {eSignErrors.password && (
            <p className="text-red-500 text-xs">
              {eSignErrors.password}
            </p>
          )}
        </div>

      </div>

    </div>

    <div className="border p-4 rounded">

      <Label>
        {actionType === "validate"
          ? "Validation Comments"
          : "Reason for Rejection"}
      </Label>

      <textarea
        rows={4}
        className="w-full mt-2 border rounded-md p-2"
        value={eSignData.reason}
        onChange={(e) =>
          setESignData((prev) => ({
            ...prev,
            reason: e.target.value,
          }))
        }
      />

      {eSignErrors.reason && (
        <p className="text-red-500 text-xs">
          {eSignErrors.reason}
        </p>
      )}

    </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setOpenESign(false)}
        >
          Cancel
        </Button>

        <Button
          onClick={handleApproveContinue}
          className={
            actionType === "validate"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }
        >
          {actionType === "validate"
            ? "Validate"
            : "Reject"}
        </Button>
      </div>

    </Dialog.Content>

  </Dialog.Portal>
</Dialog.Root>
    </div>
  );
};

export default ResultValidationList;