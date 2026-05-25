import  { useMemo, useState, useCallback } from "react";
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
import CustomPanel from "../../common/CustomPanel";

// ✅ TYPE
type TestOrder = {
  id: number;
  testOrder: string;
  sample: string;
  method: string;
  result: string;
  analyst: string;
  status: string;
  date: string;
};

type PanelMode = "view" | "edit" | null;

const Result = () => {
  // ✅ DATA with provided entries
  const initialData: TestOrder[] = useMemo(
    () => [
      {
        id: 1,
        testOrder: "TO-2024-001",
        sample: "WL-2024-001",
        method: "HPLC Assay",
        result: "99.2% PASS",
        analyst: "Sarah Chen",
        status: "Approved",
        date: "Aug 14",
      },
      {
        id: 2,
        testOrder: "TO-2024-002",
        sample: "WL-2024-001",
        method: "Water Content",
        result: "0.8% PASS",
        analyst: "Mike Johnson",
        status: "Pending Review",
        date: "Aug 14",
      },
      {
        id: 3,
        testOrder: "TO-2024-003",
        sample: "WL-2024-002",
        method: "Dissolution",
        result: "96% in 30 min PASS",
        analyst: "Lisa Park",
        status: "Approved",
        date: "Aug 15",
      },
      {
        id: 4,
        testOrder: "TO-2024-004",
        sample: "WL-2024-003",
        method: "Related Substances",
        result: "Total impurities 0.12% PASS",
        analyst: "Sarah Chen",
        status: "Pending Review",
        date: "Aug 16",
      },
      {
        id: 5,
        testOrder: "TO-2024-005",
        sample: "WL-2024-004",
        method: "Assay by HPLC",
        result: "99.8% PASS",
        analyst: "Lisa Park",
        status: "In QA Review",
        date: "Aug 17",
      },
      {
        id: 6,
        testOrder: "TO-2024-006",
        sample: "WL-2024-005",
        method: "Dissolution",
        result: "92% in 30 min FAIL",
        analyst: "Mike Johnson",
        status: "OOS Investigation",
        date: "Aug 18",
      },
      {
        id: 7,
        testOrder: "TO-2024-007",
        sample: "WL-2024-006",
        method: "Content Uniformity",
        result: "AV = 12.3 PASS",
        analyst: "Sarah Chen",
        status: "Approved",
        date: "Aug 19",
      },
      {
        id: 8,
        testOrder: "TO-2024-008",
        sample: "WL-2024-007",
        method: "Assay by HPLC",
        result: "101.1% PASS",
        analyst: "Lisa Park",
        status: "Pending Review",
        date: "Aug 20",
      },
    ],
    []
  );

  const [data, setData] = useState<TestOrder[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  
  // Panel state
  const [panelMode, setPanelMode] = useState<PanelMode>(null);
  const [selectedItem, setSelectedItem] = useState<TestOrder | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<TestOrder>>({});

  // ✅ View handler
  const handleView = useCallback((item: TestOrder) => {
    console.log("View:", item);
    setSelectedItem(item);
    setPanelMode("view");
  }, []);

  // ✅ Edit handler
  const handleEdit = useCallback((item: TestOrder) => {
    console.log("Edit:", item);
    setSelectedItem(item);
    setEditFormData({ ...item });
    setPanelMode("edit");
  }, []);

  // ✅ Delete handler with SweetAlert2
  const handleDelete = useCallback((item: TestOrder) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete ${item.testOrder} - ${item.method}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((d) => d.id !== item.id));
        Swal.fire("Deleted!", "Test order has been removed.", "success");
      }
    });
  }, []);

  // ✅ Save edited data
  const handleSaveEdit = useCallback(() => {
    if (selectedItem && editFormData) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id ? { ...item, ...editFormData } : item
        )
      );
      console.log("Saved:", { ...selectedItem, ...editFormData });
      setPanelMode(null);
      setSelectedItem(null);
      setEditFormData({});
    }
  }, [selectedItem, editFormData]);

  // ✅ Close panel
  const handleClosePanel = useCallback(() => {
    setPanelMode(null);
    setSelectedItem(null);
    setEditFormData({});
  }, []);

  // ✅ Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending Review":
        return "bg-yellow-100 text-yellow-700";
      case "In QA Review":
        return "bg-blue-100 text-blue-700";
      case "OOS Investigation":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ✅ Get result color (PASS vs FAIL)
  const getResultColor = (result: string) => {
    if (result.includes("PASS")) {
      return "text-green-700 font-medium";
    } else if (result.includes("FAIL")) {
      return "text-red-700 font-medium";
    }
    return "text-gray-700";
  };

  // ✅ COLUMNS
  const columns: ColumnDef<TestOrder>[] = useMemo(
    () => [
      { accessorKey: "testOrder", header: "Test Order" },
      { accessorKey: "sample", header: "Sample" },
      { accessorKey: "method", header: "Method" },
      { 
        accessorKey: "result", 
        header: "Result",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span className={`${getResultColor(value)}`}>
              {value}
            </span>
          );
        }
      },
      { accessorKey: "analyst", header: "Analyst" },
      { 
        accessorKey: "status", 
        header: "Status",
        cell: ({ getValue }) => {
          const value = getValue<string>();
          return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(value)}`}>
              {value}
            </span>
          );
        }
      },
      { accessorKey: "date", header: "Date" },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <ActionMenu
              item={item}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ],
    [handleView, handleEdit, handleDelete]
  );

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // ✅ TABLE
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
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: "includesString",
  });

  // ✅ Panel title based on mode
  const panelTitle = panelMode === "view" ? "View Test Order" : "Edit Test Order";

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* HEADER */}
        <div className="flex justify-end items-center mb-4 gap-3">
          <TableSearch
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search test orders..."
          />
          <ColumnToggle table={table} />
        </div>

        {/* TABLE */}
        <DataTable table={table} columns={columns} />

        {/* PAGINATION */}
        <Pagination
          table={table}
          totalCount={table.getFilteredRowModel().rows.length}
        />
      </div>

      {/* CUSTOM PANEL - View Mode */}
      <CustomPanel
        isOpen={panelMode === "view"}
        title={panelTitle}
        onClose={handleClosePanel}
        onSave={handleClosePanel}
        saveLabel="Close"
      >
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Test Order</label>
              <p className="mt-1 text-gray-900">{selectedItem.testOrder}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Sample</label>
              <p className="mt-1 text-gray-900">{selectedItem.sample}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Method</label>
              <p className="mt-1 text-gray-900">{selectedItem.method}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Result</label>
              <p className={`mt-1 ${getResultColor(selectedItem.result)}`}>{selectedItem.result}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Analyst</label>
              <p className="mt-1 text-gray-900">{selectedItem.analyst}</p>
            </div>
            <div className="border-b pb-3">
              <label className="block text-sm font-medium text-gray-600">Date</label>
              <p className="mt-1 text-gray-900">{selectedItem.date}</p>
            </div>
            <div className="border-b pb-3 col-span-2">
              <label className="block text-sm font-medium text-gray-600">Status</label>
              <p className="mt-1">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </CustomPanel>

      {/* CUSTOM PANEL - Edit Mode */}
      <CustomPanel
        isOpen={panelMode === "edit"}
        title={panelTitle}
        onClose={handleClosePanel}
        onSave={handleSaveEdit}
        saveLabel="Save Changes"
      >
        {selectedItem && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Order
              </label>
              <input
                type="text"
                value={editFormData.testOrder || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, testOrder: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sample
              </label>
              <input
                type="text"
                value={editFormData.sample || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, sample: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Method
              </label>
              <input
                type="text"
                value={editFormData.method || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, method: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Result
              </label>
              <input
                type="text"
                value={editFormData.result || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, result: e.target.value })
                }
                placeholder="e.g., 99.2% PASS or 92% FAIL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Analyst
              </label>
              <input
                type="text"
                value={editFormData.analyst || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, analyst: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="text"
                value={editFormData.date || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, date: e.target.value })
                }
                placeholder="e.g., Aug 14"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={editFormData.status || ""}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Approved">Approved</option>
                <option value="Pending Review">Pending Review</option>
                <option value="In QA Review">In QA Review</option>
                <option value="OOS Investigation">OOS Investigation</option>
              </select>
            </div>
          </div>
        )}
      </CustomPanel>
    </div>
  );
};

export default Result;