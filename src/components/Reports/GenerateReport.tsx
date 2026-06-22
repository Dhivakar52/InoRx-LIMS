
"use client";

import { useRef, useState } from "react";
import {
  Printer,
  // FileSpreadsheet,
  // FileDown,
} from "lucide-react";

import ReportLayout from "./ReportLayout";
import { useReactToPrint } from "react-to-print";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

const subjectIds = [
  "",
  "SUBJ-001",
  "SUBJ-002",
  "SUBJ-003",
  "SUBJ-004",
  "SUBJ-005",
];

const departments = [
  "",
  "Biochemistry",
  "Immunoassay",
  "Clinical Pathology",
  "Microbiology",
  "Sample Tracking",
];

export default function GenerateReport() {
  const [department, setDepartment] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const reportRef =
    useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `${department}_Report`,
  });
  // const handlePdf = async () => {
  //   if (!reportRef.current) return;

  //   const canvas = await html2canvas(reportRef.current, {
  //     scale: 2,
  //     useCORS: true,
  //   });

  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "mm", "a4");

  //   const pageWidth = pdf.internal.pageSize.getWidth();
  //   const pageHeight = pdf.internal.pageSize.getHeight();

  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;

  //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   while (heightLeft > 0) {
  //     position = heightLeft - imgHeight;
  //     pdf.addPage();
  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }

  //   pdf.save(`${department}_Report.pdf`);
  // };
  // const handleExcel = () => {
  // if (!reportRef.current) return;

  //   const table = reportRef.current.querySelector("table");

  //   if (!table) {
  //     alert("No table found in report");
  //     return;
  //   }

  //   const workbook = XLSX.utils.table_to_book(table, {
  //     sheet: department,
  //   });

  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });

  //   const blob = new Blob([excelBuffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });

  //   // saveAs(blob, `${department}_Report.xlsx`);
  // };
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="bg-white rounded-xl border shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full lg:w-[800px]">

  {/* Subject ID */}

  <div>
    <label className="block text-sm font-semibold mb-2">
      Subject ID
    </label>

    <select
      value={subjectId}
      onChange={(e) =>
        setSubjectId(e.target.value)
      }
      className="
        w-full
        h-11
        rounded-lg
        border
        border-gray-300
        px-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      {subjectIds.map((item) => (
        <option
          key={item}
          value={item}
        >
          {item === ""
            ? "Select Subject ID"
            : item}
        </option>
      ))}
    </select>
  </div>

  {/* Department */}

  <div>
    <label className="block text-sm font-semibold mb-2">
      Department
    </label>

    <select
      value={department}
      onChange={(e) =>
        setDepartment(e.target.value)
      }
      className="
        w-full
        h-11
        rounded-lg
        border
        border-gray-300
        px-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    >
      {departments.map((item) => (
        <option
          key={item}
          value={item}
        >
          {item === ""
            ? "Select Department"
            : item}
        </option>
      ))}
    </select>
  </div>

</div>

          <div className="flex flex-wrap gap-3">

            <button
              disabled={!subjectId || !department}
              onClick={handlePrint}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-[#00458F]
                px-5
                h-11
                text-white
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                hover:bg-[#00458F]
              "
            >
              <Printer size={18} />
              Print
            </button>

            {/* <button
              disabled={!department}
              onClick={handlePdf}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-red-600
                px-5
                h-11
                text-white
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                hover:bg-red-700
              "
            >
              <FileDown size={18} />
              Export PDF
            </button>

            <button
              disabled={!department}
              onClick={handleExcel}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                bg-green-600
                px-5
                h-11
                text-white
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                hover:bg-green-700
              "
            >
              <FileSpreadsheet size={18} />
              Export Excel
            </button> */}

          </div>

        </div>

      </div>

     {subjectId && department && (
        <div
          ref={reportRef}
          className="
            mt-8
            rounded-xl
            border
            bg-white
            shadow-sm
            overflow-hidden
          "
        >
          <ReportLayout
            subjectId={subjectId}
            department={department}
          />
        </div>
      )}

    </div>
  );
}