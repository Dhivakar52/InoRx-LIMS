import { useNavigate, useLocation } from "react-router-dom";
import { Microscope, ArrowLeft } from "lucide-react";

const ResultValidationView = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = location.state || {};

  const resultData = data || {
    sampleId: "SMP001",
    sampleCode: "SC001",
    subjectCode: "SUB001",

    studyCode: "STUDY-001",
    protocolNo: "PROTO-2026-001",

    department: "Hematology",

    testName: "Complete Blood Count",
    parameter: "Hemoglobin",

    resultValue: "13.5",
    unit: "g/dL",
    referenceRange: "12.0 - 16.0",

    collectionDate: "2026-06-02",
    processingDate: "2026-06-03",

    analystName: "John",
    reviewerName: "Michael",

    resultEntryDate: "2026-06-06",

    validationStatus: "Pending",

    validationDate: "",
    validatedBy: "",

    remarks: "",
  };

  const getStatusClass = () => {
    switch (resultData.validationStatus) {
      case "Validated":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Query Raised":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">

        {/* Header */}
        <div className="border-b pb-4">
          <h2 className="text-xl font-semibold text-[#00458F]">
            Result Validation Details
          </h2>

          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm text-gray-500">
              Sample ID : {resultData.sampleId}
            </p>

            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()}`}
            >
              {resultData.validationStatus}
            </span>
          </div>
        </div>

        {/* Sample Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Sample Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border rounded-lg p-3">
              <div className="text-sm text-gray-500">
                Sample ID
              </div>
              <div className="font-semibold">
                {resultData.sampleId}
              </div>
            </div>

            <div className="bg-blue-50 border rounded-lg p-3">
              <div className="text-sm text-gray-500">
                Sample Code
              </div>
              <div className="font-semibold">
                {resultData.sampleCode}
              </div>
            </div>

            <div className="bg-blue-50 border rounded-lg p-3">
              <div className="text-sm text-gray-500">
                Subject Code
              </div>
              <div className="font-semibold">
                {resultData.subjectCode}
              </div>
            </div>

            <div className="bg-blue-50 border rounded-lg p-3">
              <div className="text-sm text-gray-500">
                Department
              </div>
              <div className="font-semibold">
                {resultData.department}
              </div>
            </div>
          </div>
        </div>

        {/* Study Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Study Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
            <div>
              <div className="text-sm text-gray-500">
                Study Code
              </div>
              <div className="font-medium">
                {resultData.studyCode}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Protocol Number
              </div>
              <div className="font-medium">
                {resultData.protocolNo}
              </div>
            </div>
          </div>
        </div>

        {/* Collection Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Collection Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-lg p-4">
            <div>
              <div className="text-sm text-gray-500">
                Collection Date
              </div>
              <div className="font-medium">
                {resultData.collectionDate}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Processing Date
              </div>
              <div className="font-medium">
                {resultData.processingDate}
              </div>
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <Microscope size={18} />
            Test Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4">
            <div>
              <div className="text-sm text-gray-500">
                Test Name
              </div>
              <div className="font-medium">
                {resultData.testName}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Parameter
              </div>
              <div className="font-medium">
                {resultData.parameter}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Analyst
              </div>
              <div className="font-medium">
                {resultData.analystName}
              </div>
            </div>
          </div>
        </div>

        {/* Result Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Result Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">
                Result Value
              </div>
              <div className="font-medium">
                {resultData.resultValue}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Unit
              </div>
              <div className="font-medium">
                {resultData.unit}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Reference Range
              </div>
              <div className="font-medium">
                {resultData.referenceRange}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Result Entry Date
              </div>
              <div className="font-medium">
                {resultData.resultEntryDate}
              </div>
            </div>
          </div>
        </div>

        {/* Validation Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Validation Information
          </h3>

          <div className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-gray-500">
                Status
              </div>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusClass()}`}
              >
                {resultData.validationStatus}
              </span>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Validated By
              </div>
              <div className="font-medium">
                {resultData.validatedBy || "-"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Validation Date
              </div>
              <div className="font-medium">
                {resultData.validationDate || "-"}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">
                Reviewer
              </div>
              <div className="font-medium">
                {resultData.reviewerName || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Remarks
          </h3>

          <div className="border rounded-lg p-4 bg-gray-50">
            {resultData.remarks || "No Remarks Available"}
          </div>
        </div>

        {/* Audit Trail */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3">
            Audit Trail
          </h3>

          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Action</th>
                <th className="border p-2 text-left">User</th>
                <th className="border p-2 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-2">
                  Result Entered
                </td>
                <td className="border p-2">
                  {resultData.analystName}
                </td>
                <td className="border p-2">
                  {resultData.resultEntryDate}
                </td>
              </tr>

              <tr>
                <td className="border p-2">
                  Reviewed
                </td>
                <td className="border p-2">
                  {resultData.reviewerName || "-"}
                </td>
                <td className="border p-2">
                  {resultData.resultEntryDate}
                </td>
              </tr>

              {resultData.validationDate && (
                <tr>
                  <td className="border p-2">
                    {resultData.validationStatus}
                  </td>
                  <td className="border p-2">
                    {resultData.validatedBy}
                  </td>
                  <td className="border p-2">
                    {resultData.validationDate}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-5 border-t">
          <button
            onClick={() => navigate("/result/validation")}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultValidationView;
