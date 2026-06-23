"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Barcode from "react-barcode";
import { useRef } from "react";
import { Plus, Trash2 } from "lucide-react";

// Mock data for specimens and departments
const scheduleOptions = [
  "Screening Visit",
  "Baseline Visit",
  "Week 1",
  "Week 2",
  "Week 4",
  "Week 8",
  "End of Study",
];
const testOptions = [
  "Albumin",
  "ALP",
  "Amylase",
  "ALT",
  "AST",
  "Bilirubin",
  "Creatinine",
  "Glucose",
  "Culture Sensitivity",
  "Gram Stain",
  "CBC",
  "Hemoglobin",
];
const specimenOptions = [
  "Serum",
  "Plasma",
  "Whole Blood",
  "Urine",
  "CSF",
  "Saliva",
  "Tissue",
  "Sputum"
];

const departmentOptions = [
  "Bio-Chemistry",
  "Bacteriology",
  "Hematology",
  "Immunology",
  "Pathology",
  "Microbiology",
  "Virology",
  "Toxicology"
];

const initialTests = [
  {
    id: 1,
    schedule: "Screening Visit",
    departments: ["Biochemistry"],
    tests: ["Albumin", "ALP"],
    specimen: ["Serum"],
    selected: true,
  },
  {
    id: 2,
    schedule: "Baseline Visit",
    departments: ["Biochemistry", "Immunology"],
    tests: ["ALT", "AST"],
    specimen: ["Serum"],
    selected: true,
  },
  {
    id: 3,
    schedule: "Week 1",
    departments: ["Clinical Pathology"],
    tests: ["CBC", "Hemoglobin"],
    specimen: ["Whole Blood"],
    selected: true,
  },
  {
    id: 4,
    schedule: "Week 4",
    departments: ["Microbiology"],
    tests: ["Culture Sensitivity", "Gram Stain"],
    specimen: ["Urine"],
    selected: true,
  },
  {
    id: 5,
    schedule: "End of Study",
    departments: ["Biochemistry", "Clinical Pathology"],
    tests: ["Creatinine", "Glucose", "Bilirubin"],
    specimen: ["Plasma"],
    selected: true,
  },
];

// Mock JSON data for subjects
const subjectsData = [
  {
    subjectCode: "SUB-001",
    name: "John Smith",
    dateOfBirth: "1985-03-15",
    age: 41,
    gender: "Male",
    studyCode: "STUDY-A-2024",
    protocolNumber: "PROTO-001",
    visitScheduleCode: "VISIT-BASELINE-01",
  },
  {
    subjectCode: "SUB-002",
    name: "Sarah Johnson",
    dateOfBirth: "1990-07-22",
    age: 36,
    gender: "Female",
    studyCode: "STUDY-A-2024",
    protocolNumber: "PROTO-002",
    visitScheduleCode: "VISIT-WEEK-04",
  },
  {
    subjectCode: "SUB-003",
    name: "Michael Brown",
    dateOfBirth: "1978-11-08",
    age: 48,
    gender: "Male",
    studyCode: "STUDY-B-2024",
    protocolNumber: "PROTO-003",
    visitScheduleCode: "VISIT-SCREENING-01",
  },
  {
    subjectCode: "SUB-004",
    name: "Emily Davis",
    dateOfBirth: "1995-01-30",
    age: 31,
    gender: "Female",
    studyCode: "STUDY-B-2024",
    protocolNumber: "PROTO-004",
    visitScheduleCode: "VISIT-WEEK-12",
  },
  {
    subjectCode: "SUB-005",
    name: "Robert Wilson",
    dateOfBirth: "1982-09-10",
    age: 44,
    gender: "Male",
    studyCode: "STUDY-C-2024",
    protocolNumber: "PROTO-005",
    visitScheduleCode: "VISIT-END-01",
  },
];

export default function TestRegistrationForm() {
  const [tests, setTests] = useState(initialTests);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [subjectDetails, setSubjectDetails] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const [barcodes, setBarcodes] = useState<
    {
      testId: number;
      examName: string;
      barcodeValue: string;
    }[]
  >([]);
  const navigate = useNavigate();
  const [showTests, setShowTests] = useState(false);

    const updateTest = (
    id: number,
    field: string,
    value: any
  ) => {
    setTests((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };
  const handleCheckboxChange = (id: number) => {
    setTests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = (e: any) => {
    const checked = e.target.checked;

    setTests((prev) =>
      prev.map((item) => ({
        ...item,
        selected: checked,
      }))
    );
  };

  const handleGetDetails = () => {
    const foundSubject = subjectsData.find(
      (subject) => subject.subjectCode === selectedSubjectCode
    );
    setSubjectDetails(foundSubject || null);
    setShowTests(true);
  };

  const toggleTest = (
  id: number,
  testName: string
) => {
  setTests((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        const current = item.tests || [];

        return {
          ...item,
          tests: current.includes(testName)
            ? current.filter(
                (x) => x !== testName
              )
            : [...current, testName],
        };
      }

      return item;
    })
  );
};
  
  // Toggle department selection
  const toggleDepartment = (id: number, department: string) => {
    setTests((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const currentDepartments = item.departments;
          const updatedDepartments = currentDepartments.includes(department)
            ? currentDepartments.filter((d) => d !== department)
            : [...currentDepartments, department];
          return { ...item, departments: updatedDepartments };
        }
        return item;
      })
    );
  };

    const toggleSpecimen = (
      id: number,
      specimen: string
    ) => {
      setTests((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const currentSpecimens =
              item.specimen || [];

            const updatedSpecimens =
              currentSpecimens.includes(specimen)
                ? currentSpecimens.filter(
                    (s) => s !== specimen
                  )
                : [
                    ...currentSpecimens,
                    specimen,
                  ];

            return {
              ...item,
              specimen: updatedSpecimens,
            };
          }

          return item;
        })
      );
    };

  const handleSave = () => {
    const selectedTests = tests.filter((item) => item.selected);

    const payload = {
      subjectDetails: subjectDetails,
      selectedTests: selectedTests,
    };

    console.log("Payload to Save:", payload);

    // API Call
    // axios.post("/api/save-tests", payload);
  };

  const handleGenerateBarcode = () => {
    if (!subjectDetails) {
      alert("Please select a subject");
      return;
    }

    const selectedTests = tests.filter((x) => x.selected);

    const generated = selectedTests.map((test, index) => ({
      testId: test.id,
      examName:  test.tests?.join(", ") || "",
      barcodeValue: `TR${String(index + 1).padStart(6, "0")}`,
    }));

    setBarcodes(generated);
  };

  const handleAddRow = () => {
  const newRow = {
    id: Date.now(),
    schedule: "",
    departments: [],
    tests: [],
    specimen: [],
    selected: true,
  };

  setTests((prev) => [...prev, newRow]);
};

const handleDeleteRow = (id: number) => {
  setTests((prev) =>
    prev.filter((item) => item.id !== id)
  );
};
  const handlePrintBarcodes = () => {
    const printContents = printRef.current?.innerHTML;

    if (!printContents) return;

    const printWindow = window.open("", "_blank");

    printWindow?.document.write(`
      <html>
        <head>
          <title>Barcode Labels</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 10px;
            }
            .label {
              width: 200px;
              border: 1px solid #d1d5db;
              border-radius: 6px;
              padding: 8px;
              margin: 6px;
              display: inline-block;
              box-sizing: border-box;
            }
            .label div {
              text-align: center;
            }
            svg {
              width: auto !important;
              height: auto !important;
            }
            .test-name {
              font-weight: bold;
              margin-bottom: 8px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow?.document.close();
    printWindow?.focus();

    setTimeout(() => {
      printWindow?.print();
      printWindow?.close();
    }, 500);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-xl font-bold text-[#00458F]">
          Test Registration
        </h1>
        {/* Subject Lookup Section */}
        <div className="flex items-end gap-4 mb-4">
          <div className="w-64">
            <label className="block text-sm font-medium mb-1">
              Subject Details
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              value={selectedSubjectCode}
              onChange={(e) => setSelectedSubjectCode(e.target.value)}
            >
              <option value="">Select Subject Code</option>
              {subjectsData.map((subject) => (
                <option key={subject.subjectCode} value={subject.subjectCode}>
                  {subject.subjectCode}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleGetDetails}
            className="px-4 py-2 bg-[#00458F] text-white rounded hover:bg-blue-700"
          >
            Get Details
          </button>
        </div>

        {/* Subject Details Display */}
        {subjectDetails && (
          <div className="grid grid-cols-4 gap-4 p-3 border rounded bg-white">
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Subject Code
              </label>
              <span className="text-sm">{subjectDetails.subjectCode}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Date of Birth
              </label>
              <span className="text-sm">{subjectDetails.dateOfBirth}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Age
              </label>
              <span className="text-sm">{subjectDetails.age}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Gender
              </label>
              <span className="text-sm">{subjectDetails.gender}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Study Code
              </label>
              <span className="text-sm">{subjectDetails.studyCode}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Protocol Number
              </label>
              <span className="text-sm">{subjectDetails.protocolNumber}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Visit Schedule Code
              </label>
              <span className="text-sm">
                {subjectDetails.visitScheduleCode}
              </span>
            </div>
          </div>
        )}

        {/* Available Tests Section */}
        {showTests && (
          <>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-[#00458F]">
                Available Tests
              </h2>

              <button
                type="button"
                onClick={handleAddRow}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  bg-[#00458F]
                  text-white
                  rounded-md
                  hover:bg-[#00356d]
                  whitespace-nowrap
                "
              >
                <Plus size={16} />
                Add Row
              </button>
            </div>
            <div className="col-span-3 overflow-x-auto">
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2">
                      <input
                        type="checkbox"
                        checked={tests.every((x) => x.selected)}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="border p-2">Schedule</th>
                    <th className="border p-2">Department</th>
                    <th className="border p-2">Test Name</th>
                    <th className="border p-2">Specimen</th>
                    <th className="border p-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {tests.map((test) => (
                    <tr key={test.id}>
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          checked={test.selected}
                          onChange={() => handleCheckboxChange(test.id)}
                        />
                      </td>
                      <td className="border p-2">
                        <select
                          className="w-full border rounded px-2 py-1"
                          value={test.schedule}
                          onChange={(e) =>
                            updateTest(test.id, "schedule", e.target.value)
                          }
                        >
                          <option value="">Select Schedule</option>

                          {scheduleOptions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border p-2">
                        <div className="relative">
                          <div className="flex flex-wrap gap-1 mb-1">
                            {test.departments.map((dept) => (
                              <span
                                key={dept}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                              >
                                {dept}
                                <button
                                  onClick={() => toggleDepartment(test.id, dept)}
                                  className="ml-1 text-green-600 hover:text-green-800"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <select
                            className="w-full border rounded px-2 py-1 text-sm"
                            onChange={(e) => {
                              if (e.target.value) {
                                toggleDepartment(test.id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                            value=""
                          >
                            <option value="">Add Department...</option>
                            {departmentOptions
                              .filter((opt) => !test.departments.includes(opt))
                              .map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept}
                                </option>
                              ))}
                          </select>
                        </div>
                      </td>

                      <td className="border p-2">
                        <div className="relative">

                          <div className="flex flex-wrap gap-1 mb-1">
                            {(test.tests || []).map(
                              (item) => (
                                <span
                                  key={item}
                                  className="
                                    bg-blue-100
                                    text-blue-800
                                    text-xs
                                    px-2
                                    py-1
                                    rounded
                                  "
                                >
                                  {item}

                                  <button
                                    onClick={() =>
                                      toggleTest(
                                        test.id,
                                        item
                                      )
                                    }
                                    className="ml-1"
                                  >
                                    ×
                                  </button>
                                </span>
                              )
                            )}
                          </div>

                          <select
                            className="
                              w-full
                              border
                              rounded
                              px-2
                              py-1
                            "
                            value=""
                            onChange={(e) => {
                              if (e.target.value) {
                                toggleTest(
                                  test.id,
                                  e.target.value
                                );
                                e.target.value = "";
                              }
                            }}
                          >
                            <option value="">
                              Add Test...
                            </option>

                            {testOptions
                              .filter(
                                (opt) =>
                                  !test.tests.includes(opt)
                              )
                              .map((item) => (
                                <option
                                  key={item}
                                  value={item}
                                >
                                  {item}
                                </option>
                              ))}
                          </select>
                        </div>
                      </td>

                      <td className="border p-2">
                        <div className="flex flex-wrap gap-1 mb-1">
                          {(test.specimen || []).map(
                            (item) => (
                              <span
                                key={item}
                                className="
                                  bg-orange-100
                                  text-orange-800
                                  text-xs
                                  px-2
                                  py-1
                                  rounded
                                "
                              >
                                {item}

                                <button
                                  onClick={() =>
                                    toggleSpecimen(
                                      test.id,
                                      item
                                    )
                                  }
                                  className="ml-1"
                                >
                                  ×
                                </button>
                              </span>
                            )
                          )}
                        </div>

                        <select
                          value=""
                          className="
                            w-full
                            border
                            rounded
                            px-2
                            py-1
                          "
                          onChange={(e) => {
                            if (e.target.value) {
                              toggleSpecimen(
                                test.id,
                                e.target.value
                              );
                            }
                          }}
                        >
                          <option value="">
                            Add Specimen...
                          </option>

                          {specimenOptions
                            .filter(
                              (opt) =>
                                !test.specimen?.includes(opt)
                            )
                            .map((item) => (
                              <option
                                key={item}
                                value={item}
                              >
                                {item}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td className="border p-2 text-center">                     
                       <button
                          type="button"
                          onClick={() => handleDeleteRow(test.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-md bg-gray-200">
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleGenerateBarcode}
              className="px-5 py-2 rounded-md bg-green-600 text-white"
            >
              Generate Barcode
            </button>
            <button
              onClick={handlePrintBarcodes}
              disabled={barcodes.length === 0}
              className="px-5 py-2 rounded-md bg-purple-600 text-white disabled:bg-gray-400"
            >
              Print Labels
            </button>
            <button onClick={handleSave}
              className="px-5 py-2 rounded-md bg-[#00458F] text-white">
              Save
            </button>
          </div>
        </div>
          </>
        )}

        {barcodes.length > 0 && (
          <div ref={printRef}>
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[#00458F] mb-4">
                Generated Barcodes
              </h3>

              <div className="flex flex-wrap gap-4">
                {barcodes.map((item) => (
                  <div
                    key={item.testId}
                    className="label border border-gray-300 rounded-md p-3 bg-white w-[220px] shadow-sm"
                  >
                    <div className="font-semibold text-sm text-center">
                      {item.examName}
                    </div>

                    <div className="text-xs text-center text-gray-600 mb-2">
                      {subjectDetails?.subjectCode}
                    </div>

                    <div className="flex justify-center mt-2">
                      <Barcode
                        value={item.barcodeValue}
                        width={0.8}
                        height={30}
                        fontSize={9}
                        margin={0}
                        displayValue
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}