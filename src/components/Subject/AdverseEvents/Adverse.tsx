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
import { Plus } from "lucide-react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

type AE = {
  id: number;

  ae: string;
  subject: string;
  severity: string;
  date: string;
  status: string;

  studyCode: string;
  onsetDate: string;
  resolutionDate: string;
  eventDescription: string;

  seriousEvent: string;
  expectedEvent: string;
  causalityAssessment: string;
  outcomeStatus: string;

  reportedBy: string;
  investigatorReviewStatus: string;
  medicalMonitorReview: string;
  finalAssessment: string;
  reviewComment: string;
};

const Adverse = () => {
const initialData = useMemo<AE[]>(
  () => [
    {
      id: 1,
      ae: "AE001",
      subject: "SUB001",
      severity: "Mild",
      date: "12-Feb",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-02-12",
      resolutionDate: "2026-02-14",
      eventDescription: "Mild headache after medication",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Related",
      outcomeStatus: "Recovered",

      reportedBy: "Dr John",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Confirmed",
      reviewComment: "Patient recovered well",
    },

    {
      id: 2,
      ae: "AE002",
      subject: "SUB002",
      severity: "Severe",
      date: "15-Feb",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-02-15",
      resolutionDate: "2026-02-20",
      eventDescription: "Severe allergic reaction",

      seriousEvent: "Yes",
      expectedEvent: "No",
      causalityAssessment: "Possible",
      outcomeStatus: "Recovering",

      reportedBy: "Dr Smith",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Follow-up Required",
      reviewComment: "Need additional observation",
    },

    {
      id: 3,
      ae: "AE003",
      subject: "SUB003",
      severity: "Moderate",
      date: "18-Feb",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-02-18",
      resolutionDate: "2026-02-22",
      eventDescription: "Vomiting and nausea",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Related",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Watson",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Confirmed",
      reviewComment: "Monitor patient condition",
    },

    {
      id: 4,
      ae: "AE004",
      subject: "SUB004",
      severity: "Mild",
      date: "20-Feb",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-02-20",
      resolutionDate: "2026-02-21",
      eventDescription: "Minor skin irritation",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Unrelated",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Adams",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Closed",
      reviewComment: "No further action needed",
    },

    {
      id: 5,
      ae: "AE005",
      subject: "SUB005",
      severity: "Severe",
      date: "22-Feb",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-02-22",
      resolutionDate: "2026-02-28",
      eventDescription: "High fever reported",

      seriousEvent: "Yes",
      expectedEvent: "No",
      causalityAssessment: "Possible",
      outcomeStatus: "Recovering",

      reportedBy: "Dr Brown",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Follow-up Required",
      reviewComment: "Hospital observation required",
    },

    {
      id: 6,
      ae: "AE006",
      subject: "SUB006",
      severity: "Moderate",
      date: "24-Feb",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-02-24",
      resolutionDate: "2026-02-27",
      eventDescription: "Fatigue and weakness",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Related",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Taylor",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Closed",
      reviewComment: "Symptoms resolved",
    },

    {
      id: 7,
      ae: "AE007",
      subject: "SUB007",
      severity: "Mild",
      date: "26-Feb",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-02-26",
      resolutionDate: "2026-02-27",
      eventDescription: "Mild dizziness",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Possible",
      outcomeStatus: "Recovering",

      reportedBy: "Dr Miller",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Confirmed",
      reviewComment: "Continue monitoring",
    },

    {
      id: 8,
      ae: "AE008",
      subject: "SUB008",
      severity: "Severe",
      date: "28-Feb",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-02-28",
      resolutionDate: "2026-03-04",
      eventDescription: "Chest pain reported",

      seriousEvent: "Yes",
      expectedEvent: "No",
      causalityAssessment: "Related",
      outcomeStatus: "Recovering",

      reportedBy: "Dr Lee",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Follow-up Required",
      reviewComment: "Cardiology review advised",
    },

    {
      id: 9,
      ae: "AE009",
      subject: "SUB009",
      severity: "Moderate",
      date: "02-Mar",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-03-02",
      resolutionDate: "2026-03-06",
      eventDescription: "Skin rash observed",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Unrelated",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Harris",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Confirmed",
      reviewComment: "Temporary allergy",
    },

    {
      id: 10,
      ae: "AE010",
      subject: "SUB010",
      severity: "Mild",
      date: "04-Mar",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-03-04",
      resolutionDate: "2026-03-05",
      eventDescription: "Injection site pain",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Related",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Evans",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Closed",
      reviewComment: "Normal reaction",
    },

    {
      id: 11,
      ae: "AE011",
      subject: "SUB011",
      severity: "Severe",
      date: "06-Mar",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-03-06",
      resolutionDate: "2026-03-10",
      eventDescription: "Shortness of breath",

      seriousEvent: "Yes",
      expectedEvent: "No",
      causalityAssessment: "Possible",
      outcomeStatus: "Recovering",

      reportedBy: "Dr White",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Follow-up Required",
      reviewComment: "Requires respiratory evaluation",
    },

    {
      id: 12,
      ae: "AE012",
      subject: "SUB012",
      severity: "Moderate",
      date: "08-Mar",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-03-08",
      resolutionDate: "2026-03-11",
      eventDescription: "Nausea after dosage",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Related",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Green",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Closed",
      reviewComment: "Resolved with medication",
    },

    {
      id: 13,
      ae: "AE013",
      subject: "SUB013",
      severity: "Mild",
      date: "10-Mar",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-03-10",
      resolutionDate: "2026-03-12",
      eventDescription: "Mild cough",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Unrelated",
      outcomeStatus: "Recovered",

      reportedBy: "Dr Clark",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Confirmed",
      reviewComment: "Likely seasonal issue",
    },

    {
      id: 14,
      ae: "AE014",
      subject: "SUB014",
      severity: "Severe",
      date: "12-Mar",
      status: "Closed",

      studyCode: "SC002",
      onsetDate: "2026-03-12",
      resolutionDate: "2026-03-18",
      eventDescription: "Loss of consciousness",

      seriousEvent: "Yes",
      expectedEvent: "No",
      causalityAssessment: "Related",
      outcomeStatus: "Recovering",

      reportedBy: "Dr King",
      investigatorReviewStatus: "Approved",
      medicalMonitorReview: "Reviewed",
      finalAssessment: "Follow-up Required",
      reviewComment: "Patient stabilized",
    },

    {
      id: 15,
      ae: "AE015",
      subject: "SUB015",
      severity: "Moderate",
      date: "14-Mar",
      status: "Open",

      studyCode: "SC001",
      onsetDate: "2026-03-14",
      resolutionDate: "2026-03-17",
      eventDescription: "Body pain and fatigue",

      seriousEvent: "No",
      expectedEvent: "Yes",
      causalityAssessment: "Possible",
      outcomeStatus: "Recovering",

      reportedBy: "Dr Walker",
      investigatorReviewStatus: "Pending",
      medicalMonitorReview: "Pending",
      finalAssessment: "Confirmed",
      reviewComment: "Observation ongoing",
    },
  ],
  []
);

  const [data, setData] = useState<AE[]>(initialData);

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-container")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", close);

    return () =>
      document.removeEventListener("click", close);
  }, []);

  // VIEW
  const handleView = (item: AE) => {
    navigate("/subject/master/adv-add", {
      state: {
        mode: "view",
        data: item,
      },
    });
  };

  // EDIT
  const handleEdit = (item: AE) => {
    navigate("/subject/master/adv-add", {
      state: {
        mode: "edit",
        data: item,
      },
    });
  };

  // DELETE
  const handleDelete = (item: AE) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item.ae}?`,
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
          "Adverse event removed successfully.",
          "success"
        );
      }
    });
  };

  const columns: ColumnDef<AE>[] = useMemo(
    () => [
      { accessorKey: "ae", header: "AE" },

      { accessorKey: "subject", header: "Subject" },

      {
        accessorKey: "severity",
        header: "Severity",

        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Severe"
                  ? "bg-red-100 text-red-700"
                  : value === "Moderate"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {value}
            </span>
          );
        },
      },

      { accessorKey: "date", header: "Date" },

      {
        accessorKey: "status",
        header: "Status",

        cell: ({ getValue }) => {
          const value = getValue<string>();

          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                value === "Open"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
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
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search..."
          />

          <ColumnToggle table={table} />

          <NavigateButton
            label="Add Event"
            path="/subject/master/adv-add"
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

export default Adverse;