"use client";

import { useState } from "react";
import Barcode from "react-barcode";
import { useNavigate } from "react-router-dom";

  const initialTests = [
  {
    id: 1,
    barcode: "TR000001",
    examName: "CREATININE",
    specimen: "Serum",
    subDepartment: "Bio-Chemistry",
    collectionStatus: "Pending",
    collectionDate: "",
    collectedBy: "",
    selected: false,
  },
  {
    id: 2,
    barcode: "TR000002",
    examName: "UREA",
    specimen: "Serum",
    subDepartment: "Bio-Chemistry",
    collectionStatus: "Pending",
    collectionDate: "",
    collectedBy: "",
    selected: false,
  },
  {
    id: 3,
    barcode: "TR000003",
    examName: "URIC ACID",
    specimen: "Serum",
    subDepartment: "Bio-Chemistry",
    collectionStatus: "Pending",
    collectionDate: "",
    collectedBy: "",
    selected: false
  },
  {
    id: 4,
    barcode: "TR000004",
    examName: "LIPID PROFILE",
    specimen: "Serum",
    subDepartment: "Bacteriology",
    collectionStatus: "Pending",
    collectionDate: "",
    collectedBy: "",
    selected: false
  },
  {
    id: 5,
    barcode: "TR000005",
    examName: "LIVER FUNCTION TEST",
    specimen: "Serum",
    subDepartment: "Bio-Chemistry",
    collectionStatus: "Pending",
    collectionDate: "",
    collectedBy: "",
    selected: false
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


export default function SampleCollection() {
  const [tests, setTests] = useState(initialTests);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState("");
  const [subjectDetails, setSubjectDetails] = useState<any>(null);
    const navigate = useNavigate();

  const handleGetDetails = () => {
    const foundSubject = subjectsData.find(
      (subject) => subject.subjectCode === selectedSubjectCode
    );
    setSubjectDetails(foundSubject || null);
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

 const handleCollectSample = (id: number) => {
  const currentDate = new Date().toLocaleString();

  setTests((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            collectionStatus: "Collected",
            collectionDate: currentDate,
          }
        : item
    )
  );
};

const handleCollectorChange = (
  id: number,
  collectorName: string
) => {
  setTests((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            collectedBy: collectorName,
          }
        : item
    )
  );
};

  return (
<div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        <h1 className="text-xl font-bold text-[#00458F]">
          Sample Collection
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
          <div>
          <div className="grid grid-cols-4 gap-4 p-3 border rounded bg-white">
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Subject Code
              </label>
              <span className="text-sm">{subjectDetails.subjectCode}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600">
                Name
              </label>
              <span className="text-sm">{subjectDetails.name}</span>
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
<br/>
          <h2 className="text-xl font-semibold text-[#00458F]">
          Tests to be Collected
        </h2>
      <div className="col-span-3 overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">S.No</th>
              <th className="border p-2">Barcode</th>
              <th className="border p-2">Exam Name</th>
              <th className="border p-2">Specimen</th>
              <th className="border p-2">Department</th>
              <th className="border p-2">Collection Status</th>
              <th className="border p-2">Collected On</th>
              <th className="border p-2">Collected By</th>
              <th className="border p-2">Status</th>            
            </tr>
          </thead>

          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td className="border p-2">
                 {test.id} 
                </td>
                <td className="border p-2">
                  <Barcode
                    value={test.barcode}
                    width={0.8}
                    height={30}
                    fontSize={8}
                    displayValue={false}
                  />
                </td>

                <td className="border p-2">
                  {test.examName}
                </td>

                <td className="border p-2">
                  {test.specimen}
                </td>

                <td className="border p-2">
                  {test.subDepartment} 
                </td>

                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      test.collectionStatus === "Collected"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {test.collectionStatus}
                  </span>
                </td>
                <td className="border p-2">
                  {test.collectionDate || "-"}
                </td>
                 <td className="border p-2">
                    <select
                      value={test.collectedBy}
                      onChange={(e) =>
                        handleCollectorChange(
                          test.id,
                          e.target.value
                        )
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Select</option>
                      <option value="Lab Technician">
                        Lab Technician
                      </option>
                      <option value="Nurse">
                        Nurse
                      </option>
                      <option value="Research Coordinator">
                        Research Coordinator
                      </option>
                      <option value="Phlebotomist">
                        Phlebotomist
                      </option>
                    </select>
                  </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleCollectSample(test.id)}
                    disabled={test.collectionStatus === "Collected"}
                    className={`px-3 py-1 rounded text-white ${
                      test.collectionStatus === "Collected"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {test.collectionStatus === "Collected"
                      ? "Collected"
                      : "Collect"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between pt-6">
          {/* <button onClick={() => navigate(-1)}
      className={`flex items-center gap-2 px-3 py-2 mb-3 border rounded-md bg-gray-100 hover:bg-gray-200 `}> */}
          <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-md bg-gray-200">
            {/* <ArrowLeft size={16} /> */}
            Back
          </button>
          <div className="flex gap-3">
            <button onClick={handleSave}
             className="px-5 py-2 rounded-md bg-[#00458F] text-white">
              Save
            </button>
          </div>
        </div>
        </div>
        )}

        
    </div>
    </div>
  );
}
