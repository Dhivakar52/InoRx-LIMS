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
// import axios from "axios";

// TYPE
type StudyVersion = {
  id: number;
  study: string;
  code: string;
  oldVersion: string;
  versionDate: string;
  newStatus: string;
};


// Panel modes
// type PanelMode = "view" | "edit" | null;

const StudyVersionTable = () => {
 const [data, _setData] = useState<StudyVersion[]>(
  useMemo(
    () => [
      {
        id: 1,
        study: "ST-2026-001",
        code: "PROT-ONC-101",
        oldVersion: "Interventional",
        versionDate: "ABC Pharma",
        newStatus: "Draft",
      },
      {
        id: 2,
        study: "ST-2026-002",
        code: "PROT-CARD-205",
        oldVersion: "Observational",
        versionDate: "MedLife Sciences",
        newStatus: "Active",
      },
      {
        id: 3,
        study: "ST-2026-003",
        code: "PROT-DIAB-310",
        oldVersion: "Interventional",
        versionDate: "Global Biotech",
        newStatus: "Approved",
      },
      {
        id: 4,
        study: "ST-2026-004",
        code: "PROT-NEUR-115",
        oldVersion: "Observational",
        versionDate: "Nova Healthcare",
        newStatus: "Draft",
      },
      {
        id: 5,
        study: "ST-2026-005",
        code: "PROT-ONC-450",
        oldVersion: "Interventional",
        versionDate: "Zenith Pharma",
        newStatus: "Active",
      },
      {
        id: 6,
        study: "ST-2026-006",
        code: "PROT-RESP-122",
        oldVersion: "Observational",
        versionDate: "BioCore Labs",
        newStatus: "Submitted",
      },
      {
        id: 7,
        study: "ST-2026-007",
        code: "PROT-GAST-330",
        oldVersion: "Interventional",
        versionDate: "WellCare Pharma",
        newStatus: "Draft",
      },
      {
        id: 8,
        study: "ST-2026-008",
        code: "PROT-ORTH-411",
        oldVersion: "Observational",
        versionDate: "Apex Therapeutics",
        newStatus: "Active",
      },
      {
        id: 9,
        study: "ST-2026-009",
        code: "PROT-CARD-522",
        oldVersion: "Interventional",
        versionDate: "LifeGen Research",
        newStatus: "Draft",
      },
      {
        id: 10,
        study: "ST-2026-010",
        code: "PROT-ONC-611",
        oldVersion: "Observational",
        versionDate: "CureNova Pharma",
        newStatus: "Active",
      },
      {
        id: 11,
        study: "ST-2026-011",
        code: "PROT-IMM-720",
        oldVersion: "Interventional",
        versionDate: "Trinity Biotech",
        newStatus: "Draft",
      },
      {
        id: 12,
        study: "ST-2026-012",
        code: "PROT-NEPH-144",
        oldVersion: "Observational",
        versionDate: "FutureMed Labs",
        newStatus: "Active",
      },
      {
        id: 13,
        study: "ST-2026-013",
        code: "PROT-ENDO-299",
        oldVersion: "Interventional",
        versionDate: "Prime Clinicals",
        newStatus: "Active",
      },
      {
        id: 14,
        study: "ST-2026-014",
        code: "PROT-DERM-366",
        oldVersion: "Observational",
        versionDate: "Alpha Bio Research",
        newStatus: "Draft",
      },
      {
        id: 15,
        study: "ST-2026-015",
        code: "PROT-HEMO-488",
        oldVersion: "Interventional",
        versionDate: "GreenCross Pharma",
        newStatus: "Active",
      },
    ],
    []
  )
);

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const statusColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Submitted: "bg-blue-100 text-blue-700",
  Returned: "bg-orange-100 text-orange-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Active: "bg-green-100 text-green-700",
  Suspended: "bg-red-100 text-red-700",
  Closed: "bg-slate-200 text-slate-700",
};
  // Panel state
  // const [panelMode, setPanelMode] = useState<PanelMode>(null);
  // const [selectedItem, setSelectedItem] = useState<StudyVersion | null>(null);
  // const [editFormData, setEditFormData] = useState<Partial<StudyVersion>>({});
  const navigate = useNavigate();
//   const handleView = useCallback((item: StudyVersion) => {
//     console.log("View:", item);
//     setSelectedItem(item);
//     setPanelMode("view");
//     setOpenMenuId(null);
//   }, []);

//   const handleEdit = useCallback((item: StudyVersion) => {
//     console.log("Edit:", item);
//     setSelectedItem(item);
//     setEditFormData({ ...item });
//     setPanelMode("edit");
//     setOpenMenuId(null);
//   }, []);

//  const handleDelete = useCallback((item: StudyVersion) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: `Delete ${item.study}?`,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       setData((prev) => prev.filter((d) => d.id !== item.id));

//       Swal.fire("Deleted!", "Study has been removed.", "success");
//     }
//   });
// }, []);

  // // ✅ Save edited data
  // const handleSaveEdit = useCallback(() => {
  //   if (selectedItem && editFormData) {
  //     setData((prevData) =>
  //       prevData.map((item) =>
  //         item.id === selectedItem.id ? { ...item, ...editFormData } : item
  //       )
  //     );
  //     console.log("Saved:", { ...selectedItem, ...editFormData });
  //     setPanelMode(null);
  //     setSelectedItem(null);
  //     setEditFormData({});
  //   }
  // }, [selectedItem, editFormData]);

  // ✅ Close panel
  // const handleClosePanel = useCallback(() => {
  //   setPanelMode(null);
  //   setSelectedItem(null);
  //   setEditFormData({});
  // }, []);

//   const handleSubmitStudy = async (item: StudyVersion) => {
//   Swal.fire({
//     title: "Are you sure you want to submit the study?",
//     text: "Once submitted, it cannot be edited.",
//     icon: "question",
//     showCancelButton: true,
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       await axios.put(
//         `/api/study/${item.id}/submit`
//       );

//       //loadData();
//     }
//   });
// };

//   const handleApproveStudy = async (item: StudyVersion) => {
//   Swal.fire({
//     title: "Are you sure you want to change the status of the study to Active?",
//     // text: "Once approved, it cannot be edited.",
//     icon: "question",
//     showCancelButton: true,
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       await axios.put(
//         `/api/study/${item.id}/approve`
//       );

//       //loadData();
//     }
//   });
// };
  // ✅ CLOSE DROPDOWN WHEN CLICKING OUTSIDE
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

  // ✅ COLUMNS (memoized)
  const columns: ColumnDef<StudyVersion>[] = useMemo(
    () => [
      { accessorKey: "study", header: "StudyCode" },
      { accessorKey: "code", header: "protocol number" },
      { accessorKey: "oldVersion", header: "studyType" },
      { accessorKey: "versionDate", header: "Sponsor Name" },
      {
        accessorKey: "newStatus",
        header: "Study Status",
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
          return (
            <ActionMenu
              item={item}
               openMenuId={openMenuId}
               setOpenMenuId={setOpenMenuId}
              onView={() => navigate(`/study/master/new-add/${item.id}?mode=view&status=${item.newStatus.toLowerCase()}`)}
              onEdit={() => navigate(`/study/master/new-add/${item.id}?mode=edit&status=${item.newStatus.toLowerCase()}`)}
            />
          );
        },
      },
    ],
    [navigate,openMenuId]
  );

  // ✅ PAGINATION
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE INSTANCE
  const table = useReactTable({
    data,
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
            label="Add Study"
            path="/study/master/new-add"
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

export default StudyVersionTable;