import { useMemo, useState, useEffect } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../../common/DataTable";
import Pagination from "../../../common/Pagination";
import TableSearch from "../../../common/TableSearch";
import ColumnToggle from "../../../common/ColumnToggle";
import { ActionMenu } from "../../../common/ActionMenu";
import NavigateButton from "../../../common/NavigateButton";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type Subject = {
  id: number;
  subject: string;
  studyId: string;
  study: string;
  code: string;
  gender: string;
  arm: string;
  enrollment: string;
  status: string;

  dob: string;
  age: string;

  consentVersion: string;
  consentTimestamp: string;
  consentTakenBy: string;

  eligibilityValidated: string;

  screeningStatus: string;
  screeningFailure: string;

  medicalRemarks: string;
};

const Subject = () => {
const initialData = useMemo<Subject[]>(
  () => [
    {
      id: 1,
      subject: "SUB001",
      studyId: "ST001",
      study: "Cardiology Study",
      code: "CD01",
      gender: "Male",
      arm: "Arm A",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1998-05-10",
      age: "27",
      consentVersion: "V1",
      consentTimestamp: "2026-05-20",
      consentTakenBy: "Dr John",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Fit for study",
    },
    {
      id: 2,
      subject: "SUB002",
      studyId: "ST002",
      study: "Diabetes Study",
      code: "DB02",
      gender: "Female",
      arm: "Arm B",
      enrollment: "Screening",
      status: "Pending",
      dob: "1995-08-14",
      age: "30",
      consentVersion: "V2",
      consentTimestamp: "2026-05-18",
      consentTakenBy: "Dr Smith",
      eligibilityValidated: "No",
      screeningStatus: "Under Review",
      screeningFailure: "Sugar level high",
      medicalRemarks: "Need further validation",
    },
    {
      id: 3,
      subject: "SUB003",
      studyId: "ST003",
      study: "Cancer Trial",
      code: "CT03",
      gender: "Male",
      arm: "Arm C",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1992-02-22",
      age: "34",
      consentVersion: "V1",
      consentTimestamp: "2026-05-15",
      consentTakenBy: "Dr Watson",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Eligible",
    },
    {
      id: 4,
      subject: "SUB004",
      studyId: "ST004",
      study: "Neurology Study",
      code: "NR04",
      gender: "Female",
      arm: "Arm A",
      enrollment: "Completed",
      status: "Closed",
      dob: "1990-11-11",
      age: "36",
      consentVersion: "V3",
      consentTimestamp: "2026-05-12",
      consentTakenBy: "Dr Adams",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Completed successfully",
    },
    {
      id: 5,
      subject: "SUB005",
      studyId: "ST005",
      study: "COVID Vaccine",
      code: "CV05",
      gender: "Male",
      arm: "Arm B",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1999-01-09",
      age: "26",
      consentVersion: "V2",
      consentTimestamp: "2026-05-11",
      consentTakenBy: "Dr Kevin",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Healthy subject",
    },
    {
      id: 6,
      subject: "SUB006",
      studyId: "ST006",
      study: "Heart Research",
      code: "HR06",
      gender: "Female",
      arm: "Arm C",
      enrollment: "Screening",
      status: "Pending",
      dob: "1994-03-15",
      age: "31",
      consentVersion: "V1",
      consentTimestamp: "2026-05-10",
      consentTakenBy: "Dr Lisa",
      eligibilityValidated: "No",
      screeningStatus: "Review Pending",
      screeningFailure: "BP fluctuation",
      medicalRemarks: "Requires monitoring",
    },
    {
      id: 7,
      subject: "SUB007",
      studyId: "ST007",
      study: "Kidney Study",
      code: "KD07",
      gender: "Male",
      arm: "Arm A",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1988-07-21",
      age: "38",
      consentVersion: "V2",
      consentTimestamp: "2026-05-09",
      consentTakenBy: "Dr White",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Normal condition",
    },
    {
      id: 8,
      subject: "SUB008",
      studyId: "ST008",
      study: "Liver Study",
      code: "LV08",
      gender: "Female",
      arm: "Arm B",
      enrollment: "Withdrawn",
      status: "Inactive",
      dob: "1997-06-30",
      age: "28",
      consentVersion: "V1",
      consentTimestamp: "2026-05-08",
      consentTakenBy: "Dr Brown",
      eligibilityValidated: "No",
      screeningStatus: "Failed",
      screeningFailure: "Liver enzyme issue",
      medicalRemarks: "Withdrawn from trial",
    },
    {
      id: 9,
      subject: "SUB009",
      studyId: "ST009",
      study: "Asthma Trial",
      code: "AS09",
      gender: "Male",
      arm: "Arm C",
      enrollment: "Completed",
      status: "Closed",
      dob: "1991-12-12",
      age: "35",
      consentVersion: "V3",
      consentTimestamp: "2026-05-07",
      consentTakenBy: "Dr Parker",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Trial completed",
    },
    {
      id: 10,
      subject: "SUB010",
      studyId: "ST010",
      study: "BP Monitoring",
      code: "BP10",
      gender: "Female",
      arm: "Arm A",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1993-09-09",
      age: "32",
      consentVersion: "V1",
      consentTimestamp: "2026-05-06",
      consentTakenBy: "Dr Helen",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Good condition",
    },
    {
      id: 11,
      subject: "SUB011",
      studyId: "ST011",
      study: "Mental Health",
      code: "MH11",
      gender: "Male",
      arm: "Arm B",
      enrollment: "Screening",
      status: "Pending",
      dob: "1996-04-18",
      age: "29",
      consentVersion: "V2",
      consentTimestamp: "2026-05-05",
      consentTakenBy: "Dr Rose",
      eligibilityValidated: "No",
      screeningStatus: "Under Review",
      screeningFailure: "Stress indicators",
      medicalRemarks: "Needs counseling",
    },
    {
      id: 12,
      subject: "SUB012",
      studyId: "ST012",
      study: "Skin Research",
      code: "SK12",
      gender: "Female",
      arm: "Arm C",
      enrollment: "Enrolled",
      status: "Active",
      dob: "2000-02-20",
      age: "25",
      consentVersion: "V1",
      consentTimestamp: "2026-05-04",
      consentTakenBy: "Dr Clara",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "No allergies",
    },
    {
      id: 13,
      subject: "SUB013",
      studyId: "ST013",
      study: "Eye Vision Study",
      code: "EV13",
      gender: "Male",
      arm: "Arm A",
      enrollment: "Completed",
      status: "Closed",
      dob: "1989-08-08",
      age: "37",
      consentVersion: "V2",
      consentTimestamp: "2026-05-03",
      consentTakenBy: "Dr Xavier",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Vision improved",
    },
    {
      id: 14,
      subject: "SUB014",
      studyId: "ST014",
      study: "Bone Density",
      code: "BD14",
      gender: "Female",
      arm: "Arm B",
      enrollment: "Enrolled",
      status: "Active",
      dob: "1992-10-01",
      age: "33",
      consentVersion: "V1",
      consentTimestamp: "2026-05-02",
      consentTakenBy: "Dr Emma",
      eligibilityValidated: "Yes",
      screeningStatus: "Passed",
      screeningFailure: "None",
      medicalRemarks: "Healthy bones",
    },
    {
      id: 15,
      subject: "SUB015",
      studyId: "ST015",
      study: "Nutrition Study",
      code: "NT15",
      gender: "Male",
      arm: "Arm C",
      enrollment: "Withdrawn",
      status: "Inactive",
      dob: "1995-05-05",
      age: "30",
      consentVersion: "V3",
      consentTimestamp: "2026-05-01",
      consentTakenBy: "Dr Noah",
      eligibilityValidated: "No",
      screeningStatus: "Failed",
      screeningFailure: "Diet mismatch",
      medicalRemarks: "Subject withdrew voluntarily",
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
  const [data, setData] = useState<Subject[]>(initialData);
  const navigate = useNavigate();
  // close menu (optional keep)
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
  const handleView = (item: Subject) => {
  navigate("/subject/master/sub-add", {
    state: {
      mode: "view",
      data: item,
    },
  });
};

const handleEdit = (item: Subject) => {
  navigate("/subject/master/sub-add", {
    state: {
      mode: "edit",
      data: item,
    },
  });
};
const handleDelete = (item: Subject) => {
  Swal.fire({
    title: "Are you sure?",
    text: `Delete ${item.subject}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setData((prev) =>
        prev.filter((d) => d.id !== item.id)
      );

      Swal.fire(
        "Deleted!",
        "Subject removed successfully.",
        "success"
      );
    }
  });
};
  const columns: ColumnDef<Subject>[] = useMemo(
    () => [
      { accessorKey: "subject", header: "Subject" },
      { accessorKey: "studyId", header: "ID" },
      { accessorKey: "study", header: "Study" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "gender", header: "Gender" },
      { accessorKey: "arm", header: "Arm/Cohort" },
      { accessorKey: "enrollment", header: "Enrollment" },

      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Active"
                  ? "bg-green-100 text-green-700"
                  : value === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : value === "Closed"
                  ? "bg-gray-200 text-gray-700"
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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ),
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

        {/* HEADER */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search..."
          />
          <ColumnToggle table={table} />
          <NavigateButton
            label="Add Subject"
            path="/subject/master/sub-add"
            icon={<Plus size={18} />}
          />
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}/>
      </div>
    </div>
  );
};

export default Subject;