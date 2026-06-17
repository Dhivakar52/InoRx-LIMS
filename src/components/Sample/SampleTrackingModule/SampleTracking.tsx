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
import { useNavigate } from "react-router-dom";

export type SampleTrackingData = {
  id: number;
  sampleId: string;
  sampleCode: string;
  subjectCode: string;
  department: string;

  registrationDate: string;
  collectionDate: string;
  acknowledgementDate: string;
  processingDate: string;
  storageDate: string;

  shipmentDate?: string;
  resultEntryDate?: string;
  resultValidationDate?: string;
};
const SampleTracking = () => {
  const initialData: SampleTrackingData[] = [
  {
    id: 1,
    sampleId: "SMP001",
    sampleCode: "SC001",
    subjectCode: "SUB001",
    department: "Hematology",
    registrationDate: "2026-06-01",
    collectionDate: "2026-06-02",
    acknowledgementDate: "2026-06-02",
    processingDate: "2026-06-03",
    storageDate: "2026-06-04",
    shipmentDate: "2026-06-05",
    resultEntryDate: "2026-06-06",
    resultValidationDate: "2026-06-07",
  },
  {
  id: 2,
  sampleId: "SMP002",
  sampleCode: "SC002",
  subjectCode: "SUB002",
  department: "Cytology",

  registrationDate: "2026-06-12",
  collectionDate: "2026-06-13",
  acknowledgementDate: "2026-06-13",
  processingDate: "2026-06-14",
  storageDate: "2026-06-15",

  shipmentDate: "",
  resultEntryDate: "",
  resultValidationDate: "",
},
  {
    id: 3,
    sampleId: "SMP003",
    sampleCode: "SC003",
    subjectCode: "SUB003",
    department: "Microbiology",
    registrationDate: "2026-06-03",
    collectionDate: "2026-06-04",
    acknowledgementDate: "2026-06-04",
    processingDate: "2026-06-05",
    storageDate: "2026-06-06",
    shipmentDate: "2026-06-07",
    resultEntryDate: "2026-06-08",
    resultValidationDate: "2026-06-09",
  },
  {
    id: 4,
    sampleId: "SMP004",
    sampleCode: "SC004",
    subjectCode: "SUB004",
    department: "Pathology",
    registrationDate: "2026-06-04",
    collectionDate: "2026-06-05",
    acknowledgementDate: "2026-06-05",
    processingDate: "2026-06-06",
    storageDate: "2026-06-07",
    shipmentDate: "2026-06-08",
    resultEntryDate: "2026-06-09",
    resultValidationDate: "2026-06-10",
  },
  {
    id: 5,
    sampleId: "SMP005",
    sampleCode: "SC005",
    subjectCode: "SUB005",
    department: "Immunology",
    registrationDate: "2026-06-05",
    collectionDate: "2026-06-06",
    acknowledgementDate: "2026-06-06",
    processingDate: "2026-06-07",
    storageDate: "2026-06-08",
    shipmentDate: "2026-06-09",
    resultEntryDate: "2026-06-10",
    resultValidationDate: "2026-06-11",
  },
  {
    id: 6,
    sampleId: "SMP006",
    sampleCode: "SC006",
    subjectCode: "SUB006",
    department: "Virology",
    registrationDate: "2026-06-06",
    collectionDate: "2026-06-07",
    acknowledgementDate: "2026-06-07",
    processingDate: "2026-06-08",
    storageDate: "2026-06-09",
    shipmentDate: "2026-06-10",
    resultEntryDate: "2026-06-11",
    resultValidationDate: "2026-06-12",
  },
  {
    id: 7,
    sampleId: "SMP007",
    sampleCode: "SC007",
    subjectCode: "SUB007",
    department: "Molecular Biology",
    registrationDate: "2026-06-07",
    collectionDate: "2026-06-08",
    acknowledgementDate: "2026-06-08",
    processingDate: "2026-06-09",
    storageDate: "2026-06-10",
    shipmentDate: "2026-06-11",
    resultEntryDate: "2026-06-12",
    resultValidationDate: "2026-06-13",
  },
  {
    id: 8,
    sampleId: "SMP008",
    sampleCode: "SC008",
    subjectCode: "SUB008",
    department: "Clinical Chemistry",
    registrationDate: "2026-06-08",
    collectionDate: "2026-06-09",
    acknowledgementDate: "2026-06-09",
    processingDate: "2026-06-10",
    storageDate: "2026-06-11",
    shipmentDate: "2026-06-12",
    resultEntryDate: "2026-06-13",
    resultValidationDate: "2026-06-14",
  },
  {
    id: 9,
    sampleId: "SMP009",
    sampleCode: "SC009",
    subjectCode: "SUB009",
    department: "Toxicology",
    registrationDate: "2026-06-09",
    collectionDate: "2026-06-10",
    acknowledgementDate: "2026-06-10",
    processingDate: "2026-06-11",
    storageDate: "2026-06-12",
    shipmentDate: "2026-06-13",
    resultEntryDate: "2026-06-14",
    resultValidationDate: "2026-06-15",
  },
  {
    id: 10,
    sampleId: "SMP010",
    sampleCode: "SC010",
    subjectCode: "SUB010",
    department: "Genetics",
    registrationDate: "2026-06-10",
    collectionDate: "2026-06-11",
    acknowledgementDate: "2026-06-11",
    processingDate: "2026-06-12",
    storageDate: "2026-06-13",
    shipmentDate: "2026-06-14",
    resultEntryDate: "2026-06-15",
    resultValidationDate: "2026-06-16",
  },
  {
    id: 11,
    sampleId: "SMP011",
    sampleCode: "SC011",
    subjectCode: "SUB011",
    department: "Parasitology",
    registrationDate: "2026-06-11",
    collectionDate: "2026-06-12",
    acknowledgementDate: "2026-06-12",
    processingDate: "2026-06-13",
    storageDate: "2026-06-14",
    shipmentDate: "2026-06-15",
    resultEntryDate: "2026-06-16",
    resultValidationDate: "2026-06-17",
  },
  {
    id: 12,
    sampleId: "SMP012",
    sampleCode: "SC012",
    subjectCode: "SUB012",
    department: "Cytology",
    registrationDate: "2026-06-12",
    collectionDate: "2026-06-13",
    acknowledgementDate: "2026-06-13",
    processingDate: "2026-06-14",
    storageDate: "2026-06-15",
    shipmentDate: "2026-06-16",
    resultEntryDate: "2026-06-17",
    resultValidationDate: "2026-06-18",
  },
  {
  id: 13,
  sampleId: "SMP013",
  sampleCode: "SC013",
  subjectCode: "SUB013",
  department: "Cytology",

  registrationDate: "2026-06-12",
  collectionDate: "2026-06-13",
  acknowledgementDate: "2026-06-13",
  processingDate: "2026-06-14",
  storageDate: "2026-06-15",

  shipmentDate: "",
  resultEntryDate: "",
  resultValidationDate: "",
}
];
  const [data, _setData] = useState<SampleTrackingData[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
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
 
  
    const handleView = (item: SampleTrackingData) => {
    navigate("/sample/tracking/view", {
      state: {
        mode: "view",
        data: item,
      },
    });
    };


      const columns: ColumnDef<SampleTrackingData>[] = useMemo(
      () => [
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
          accessorKey: "department",
          header: "Department",
        },
        {
          accessorKey: "registrationDate",
          header: "Registration Date",
        },
        {
          accessorKey: "collectionDate",
          header: "Collection Date",
        },
        {
          accessorKey: "acknowledgementDate",
          header: "Acknowledgement Date",
        },
        {
          accessorKey: "processingDate",
          header: "Processing Date",
        },
        {
          accessorKey: "storageDate",
          header: "Storage Date",
        },
        // {
        //   accessorKey: "shipmentDate",
        //   header: "Shipment Date",
        // },
        // {
        //   accessorKey: "resultEntryDate",
        //   header: "Result Entry Date",
        // },
        // {
        //   accessorKey: "resultValidationDate",
        //   header: "Result Validation Date",
        // },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <ActionMenu
              item={row.original}
              onView={handleView}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
            />
          ),
        },
      ],
      [openMenuId]
    );

//     const sampleTypeMatch =
//       !sampleTypeFilter ||
//       item.sampleType === sampleTypeFilter;

//     const conditionMatch =
//       !conditionFilter ||
//       item.conditionStatus === conditionFilter;

//     return sampleTypeMatch && conditionMatch;
//   });
// }, [
//   data,
//   sampleTypeFilter,
//   conditionFilter,
// ]);
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
    </div>
  );
};

export default SampleTracking;