// src/components/BiobankManagementModule/BiobankManagementTable.tsx
import { useMemo, useState, useCallback } from "react";
import Swal from "sweetalert2";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "../../common/DataTable";
import TableSearch from "../../common/TableSearch";
import ColumnToggle from "../../common/ColumnToggle";
import Pagination from "../../common/Pagination";
import { ActionMenu } from "../../common/ActionMenu";
import NavigateButton from "../../common/NavigateButton";
import { Plus } from "lucide-react";
import CustomPanel from "../../common/CustomPanel";
// import { useNavigate } from "react-router-dom";

type BiobankSample = {
  id: number;
  biobankId: string;
  parentSample: string;
  derivativeType: string;
  thawCount: number;
  retentionExpiry: string;
  consentStatus: string;
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

type PanelMode = "view" | "edit" | "audit" | null;

const BiobankManagementTable = () => {
  const [data, setData] = useState<BiobankSample[]>([
  {
    id: 1,
    biobankId: "BIO-2026-991A",
    parentSample: "SMP-2026-001",
    derivativeType: "DNA Extract",
    thawCount: 0,
    retentionExpiry: "2036-06-16",
    consentStatus: "BROAD RESEARCH",
  },
  {
    id: 2,
    biobankId: "BIO-2026-992B",
    parentSample: "SMP-2026-042",
    derivativeType: "PBMC",
    thawCount: 1,
    retentionExpiry: "2036-06-16",
    consentStatus: "SPECIFIC DISEASE",
  },
  {
    id: 3,
    biobankId: "BIO-2025-101A",
    parentSample: "SMP-2025-010",
    derivativeType: "RNA Extract",
    thawCount: 3,
    retentionExpiry: "2035-01-01",
    consentStatus: "BROAD RESEARCH",
  },
  {
    id: 4,
    biobankId: "BIO-2024-005C",
    parentSample: "SMP-2024-005",
    derivativeType: "Plasma Aliquot",
    thawCount: 0,
    retentionExpiry: "2024-06-01",
    consentStatus: "WITHDRAWN",
  },
]);
 const getConsentColor = (status: string) => {
  switch (status) {
    case "BROAD RESEARCH":
      return "bg-green-100 text-green-700";

    case "SPECIFIC DISEASE":
      return "bg-blue-100 text-blue-700";

    case "WITHDRAWN":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const initialLogs: AuditLog[] = [];
    data.forEach(_sample => {
      // initialLogs.push(...getDemoAuditLogs(sample.id, sample.derivativeType ));
    });
    return initialLogs;
  });

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<BiobankSample | null>(null);
  const [selectedAuditLogs, setSelectedAuditLogs] = useState<AuditLog[]>([]);
  const [_editFormData, setEditFormData] = useState<Partial<BiobankSample>>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  //  const navigate = useNavigate();

  const addAuditLog = useCallback((action: AuditLog["action"], recordId: number, oldData: any | null, newData: any | null) => {
    const newLog: AuditLog = {
      id: auditLogs.length + 1,
      action,
      recordId,
      recordType: "Biobank Sample",
      oldData: oldData ? JSON.stringify(oldData, null, 2) : null,
      newData: newData ? JSON.stringify(newData, null, 2) : null,
      changedBy: localStorage.getItem("userName") || "Current User",
      changedAt: new Date().toLocaleString(),
      ipAddress: "127.0.0.1",
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [auditLogs.length]);


  // const handleEdit = (item: BiobankSample) => {
  //   navigate("/biobank/form", {
  //     state: {
  //       mode: "edit",
  //       data: item,
  //     },
  //   });
  // };
  // const handleView = (item: BiobankSample) => {
  //   navigate("/biobank/form", {
  //     state: {
  //       mode: "view",
  //       data: item,
  //     },
  //   });
  // };
  const handleAuditLog = useCallback((item: BiobankSample) => {
    const logs = auditLogs.filter(log => log.recordId === item.id);
    setSelectedAuditLogs(logs);
    setSelectedItem(item);
    setPanelMode("audit");
  }, [auditLogs]);

  const handleDelete = useCallback((item: BiobankSample) => {
    Swal.fire({
      title: "Delete Sample?",
      text: `Delete ${item.id} (${item.derivativeType})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const oldData = { ...item };
        setData((prev) => prev.filter((d) => d.id !== item.id));
        addAuditLog("DELETE", item.id, oldData, null);
        Swal.fire("Deleted!", "Sample has been removed.", "success");
      }
    });
  }, [addAuditLog]);

  const handleClosePanel = useCallback(() => {
    setPanelMode(null);
    setSelectedItem(null);
    setEditFormData({});
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

  const columns: ColumnDef<BiobankSample>[] = useMemo(
  () => [
    {
      accessorKey: "biobankId",
      header: "Biobank ID",
    },
    {
      accessorKey: "parentSample",
      header: "Parent Sample",
    },
    {
      accessorKey: "derivativeType",
      header: "Derivative Type",
    },
    {
      accessorKey: "thawCount",
      header: "Thaw Count",
      cell: ({ getValue }) => (
        <span className="font-medium">
          {getValue<number>()}
        </span>
      ),
    },
    {
      accessorKey: "retentionExpiry",
      header: "Retention Expiry",
    },
    {
      accessorKey: "consentStatus",
      header: "Consent Status",
      cell: ({ getValue }) => {
        const value = getValue<string>();

        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${getConsentColor(
              value
            )}`}
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
        <ActionMenu<BiobankSample>
          item={row.original}
          // onView={handleView}
          // onEdit={handleEdit}
          onDelete={handleDelete}
          onAuditLog={handleAuditLog}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      ),
    },
  ],
  [
    // handleView,
    // handleEdit,
    handleDelete,
    handleAuditLog,
    openMenuId,
  ]
);

  const table = useReactTable({
    data, columns, state: { globalFilter, columnVisibility, pagination },
    onGlobalFilterChange: setGlobalFilter, onColumnVisibilityChange: setColumnVisibility, onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800"></h2>
          <div className="flex gap-3">
            <TableSearch value={globalFilter} onChange={setGlobalFilter} placeholder="Search samples..." />
            <ColumnToggle table={table} />
            <NavigateButton label="Add Aliquots" path="/biobank/new-add" icon={<Plus size={18} />} />
          </div>
        </div>
        <DataTable table={table} columns={columns} />
        <Pagination table={table} totalCount={table.getFilteredRowModel().rows.length} />
      </div>
      <CustomPanel isOpen={panelMode === "audit"} title={`Audit Log - ${selectedItem?.id || ""}`} onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
        {selectedAuditLogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📋</div>
            <p className="text-gray-500">No audit records found</p>
          </div>
        ) : (
          <div className="space-y-0">
            {selectedAuditLogs.map((log, idx) => (
              <div key={log.id} className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className={`w-3 h-3 rounded-full ${getActionBadge(log.action).split(' ')[0]}`}></div>
                  {idx < selectedAuditLogs.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 my-1" style={{ minHeight: '40px' }}></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-xs text-gray-400">{log.changedAt}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">By: <span className="text-gray-700">{log.changedBy}</span></p>
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

export default BiobankManagementTable;