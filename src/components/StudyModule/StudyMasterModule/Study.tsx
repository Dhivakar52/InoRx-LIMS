import { useMemo, useState, useEffect, useCallback } from "react";
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
import CustomPanel from "../../../common/CustomPanel";
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

type AuditLog = {
  id: number;
  action: "CREATE" | "UPDATE" | "DELETE" | "VIEW";
  recordId: number;
  recordType: string;
  oldData: string | null;
  newData: string | null;
  changedBy: string;
  changedAt: string;
  ipAddress: string;
};

// Panel modes
type PanelMode = "view" | "edit" |"audit"| null;

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
        newStatus: "Submitted",
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
        newStatus: "Approved",
      },
    ],
    []
  )
);

// ✅ SIMPLE DEMO AUDIT LOG DATA
const getDemoAuditLogs = (visitId: string, visitName: string): AuditLog[] => {
  return [
    {
      id: 1,
      action: "CREATE",
      recordId: 1,
      recordType: "Visit",
      oldData: null,
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "VIEW",
      recordId: 1,
      recordType: "Visit",
      oldData: null,
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      changedBy: "dr.smith@example.com",
      changedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.101",
    },
    {
      id: 3,
      action: "UPDATE",
      recordId: 1,
      recordType: "Visit",
      oldData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Scheduled" }, null, 2),
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "In Progress" }, null, 2),
      changedBy: "coordinator@example.com",
      changedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.102",
    },
    {
      id: 4,
      action: "UPDATE",
      recordId: 1,
      recordType: "Visit",
      oldData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "In Progress" }, null, 2),
      newData: JSON.stringify({ visitId, subject: "SUB001", visitName, status: "Completed" }, null, 2),
      changedBy: "admin@example.com",
      changedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleString(),
      ipAddress: "192.168.1.100",
    },
  ];
};

  const [auditLogs, _setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(study => {
      initialLogs.push(...getDemoAuditLogs(study.code, study.study));
    });
    return initialLogs;
  });
  
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
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<StudyVersion | null>(null);
    const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  
  // const [editFormData, setEditFormData] = useState<Partial<StudyVersion>>({});
  const navigate = useNavigate();

    const handleAuditLog = useCallback((item: StudyVersion) => {
      const logs = auditLogs.filter(log => log.recordId === item.id);
      setSelectedAuditLogs(logs);
      setSelectedItem(item);
      setPanelMode("audit");
    }, [auditLogs]);

    //  const addAuditLog = useCallback((
    //     action: AuditLog["action"],
    //     recordId: number,
    //     oldData: any | null,
    //     newData: any | null
    //   ) => {
    //     const newLog: AuditLog = {
    //       id: auditLogs.length + 1,
    //       action,
    //       recordId,
    //       recordType: "Visit",
    //       oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
    //       newData: newData ? JSON.stringify(newData, null, 2) : null,
    //       changedBy: localStorage.getItem("userName") || "Current User",
    //       changedAt: new Date().toLocaleString(),
    //       ipAddress: "127.0.0.1",
    //     };
    //     setAuditLogs((prev) => [newLog, ...prev]);
    //   }, [auditLogs.length]);
    
    
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

  
    const handleClosePanel = useCallback(() => {
      setPanelMode(null);
      setSelectedItem(null);
      setSelectedAuditLogs([]);
    }, []);
  
  
    const getActionBadge = (action: AuditLog["action"]) => {
      const styles = {
        CREATE: "bg-green-100 text-green-700",
        UPDATE: "bg-blue-100 text-blue-700",
        DELETE: "bg-red-100 text-red-700",
        VIEW: "bg-gray-100 text-gray-700",
      };
      return styles[action];
    };

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
          const isDraft = item.newStatus === "Draft";
          return (
            <ActionMenu
              item={item}
               openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              onView={() => navigate(`/study/master/new-add/${item.id}?mode=view&status=${item.newStatus.toLowerCase()}`)}
              onEdit={
                    isDraft
                      ? () =>
                          navigate(
                            `/study/master/new-add/${item.id}?mode=edit&status=${item.newStatus.toLowerCase()}`
                          )
                      : undefined
                  }  
               onAuditLog={handleAuditLog}
        
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

       <CustomPanel 
        isOpen={panelMode === "audit"} 
        title={`Audit Log - ${selectedItem?.id || ""}`} 
        onClose={handleClosePanel} 
        onSave={handleClosePanel} 
        saveLabel="Close"
      >
        {selectedAuditLogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">No audit records found</p>
          </div>
        ) : (
          <div className="space-y-0">
            {selectedAuditLogs.map((log, idx) => (
              <div key={log.id} className="flex">
                {/* Timeline Line */}
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-3 h-3 rounded-full ${getActionBadge(log.action).split(' ')[0]}`}></div>
                  {idx < selectedAuditLogs.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '40px' }}></div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-400">{log.changedAt}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mb-2">
                      By: <span className="text-gray-700">{log.changedBy}</span>
                    </p>
                    
                    {log.oldData && (
                      <div className="mt-2 text-xs">
                        <span className="text-gray-500">Before: </span>
                        <span className="text-gray-700 font-mono">{log.oldData.substring(0, 100)}...</span>
                      </div>
                    )}
                    
                    {log.newData && (
                      <div className="mt-1 text-xs">
                        <span className="text-gray-500">After: </span>
                        <span className="text-gray-700 font-mono">{log.newData.substring(0, 100)}...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CustomPanel>
    </div>
  );
};

export default StudyVersionTable;