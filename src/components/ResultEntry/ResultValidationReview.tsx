"use client";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CheckCircle,
  XCircle,

  Microscope,

  ArrowLeft,
} from "lucide-react";

const ResultApprovalReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, data } = location.state || { mode: "view", data: null };

  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resultData = data || {
    id: 1,
    labNumber: "260254030",
    patientName: "RAVI KUMAR",
    uhidNo: "45",
    age: "52Y 3M 10D",
    gender: "Male",
    department: "Urology",
    testName: "HCV RNA PCR (Qualitative)",
    specimen: "Serum / Plasma",
    result: "Detected",
    ctValue: "28.5",
    method: "Real Time RT-PCR",
    kitDetails: "Cosara HCV Qualitative test kit",
    instrument: "CO DX BOX MIC qPCR cycler",
    limitOfDetection: "10 copies/microliter",
    interpretation: "Detected indicates either current HCV infection or activation of chronic HCV infection.",
    notes: "To correlate with HCV antibody assay and clinical condition.",
    submittedBy: "Julia Lydia.Y",
    submittedDate: "02/04/2026 14:30",
    requestDate: "02/04/2026",
  };

  const isApproveMode = mode === "approve";
  const isRejectMode = mode === "reject";
  const isViewMode = mode === "view";

  const handleSubmit = () => {
    if ((isApproveMode || isRejectMode) && !comments) {
      Swal.fire(
        "Warning",
        `Please enter ${isApproveMode ? "approval" : "rejection"} comments`,
        "warning"
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      Swal.fire(
        isApproveMode ? "Approved!" : "Rejected!",
        isApproveMode
          ? "Result has been approved successfully."
          : "Result has been rejected with comments.",
        "success"
      );
      setIsSubmitting(false);
      navigate("/result/approval");
    }, 1000);
  };

  const getResultBadge = () => {
    if (resultData.result === "Detected") {
      return <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">Detected ✓</span>;
    }
    return <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">Not Detected</span>;
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-3 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-[#00458F]">
              {isApproveMode && "Approve Result"}
              {isRejectMode && "Reject Result"}
              {isViewMode && "Result Details"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Lab No: {resultData.labNumber}</p>
          </div>
          <div>
            {isApproveMode && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <CheckCircle size={14} /> Approval Mode
              </span>
            )}
            {isRejectMode && (
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                <XCircle size={14} /> Rejection Mode
              </span>
            )}
          </div>
        </div>

        {/* Patient Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border rounded-lg p-3">
            <div className="text-sm text-gray-500">Patient Name</div>
            <div className="font-semibold">{resultData.patientName}</div>
          </div>
          <div className="bg-blue-50 border rounded-lg p-3">
            <div className="text-sm text-gray-500">UHID No</div>
            <div className="font-semibold">{resultData.uhidNo || "N/A"}</div>
          </div>
          <div className="bg-blue-50 border rounded-lg p-3">
            <div className="text-sm text-gray-500">Age / Gender</div>
            <div className="font-semibold">{resultData.age} / {resultData.gender}</div>
          </div>
          <div className="bg-blue-50 border rounded-lg p-3">
            <div className="text-sm text-gray-500">Department</div>
            <div className="font-semibold">{resultData.department}</div>
          </div>
        </div>

        {/* Test Result */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <Microscope size={18} /> Test Result
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4">
            <div>
              <div className="text-sm text-gray-500">Test Name</div>
              <div className="font-medium">{resultData.testName}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Specimen</div>
              <div className="font-medium">{resultData.specimen}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Result</div>
              <div className="mt-1">{getResultBadge()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Ct Value</div>
              <div className="font-medium">{resultData.ctValue || "N/A"}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Method</div>
              <div className="font-medium">{resultData.method}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Submitted By</div>
              <div className="font-medium">{resultData.submittedBy}</div>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-[#00458F] mb-3">Technical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Test Kit</div>
              <div className="font-medium">{resultData.kitDetails}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Instrument</div>
              <div className="font-medium">{resultData.instrument}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Limit of Detection</div>
              <div className="font-medium">{resultData.limitOfDetection}</div>
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-2">Result Interpretation</h3>
          <div className="bg-yellow-50 p-3 rounded-lg text-sm">{resultData.interpretation}</div>
          {resultData.notes && (
            <div className="mt-3">
              <div className="text-sm font-medium text-gray-700">Notes:</div>
              <div className="text-sm text-gray-600">{resultData.notes}</div>
            </div>
          )}
        </div>

        {/* Comments Section (for approve/reject) */}
        {(isApproveMode || isRejectMode) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isApproveMode ? "Approval Comments *" : "Rejection Reason *"}
            </label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={
                isApproveMode
                  ? "Enter approval remarks (e.g., Verified, QC passed)"
                  : "Enter reason for rejection (e.g., Invalid sample, Technical error)"
              }
              className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00458F]"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between pt-5 border-t">
          <button
            onClick={() => navigate("/result/approval")}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex gap-3">
            {isApproveMode && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                <CheckCircle size={16} /> Confirm Approval
              </button>
            )}
            {isRejectMode && (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                <XCircle size={16} /> Confirm Rejection
              </button>
            )}
            {isViewMode && (
              <button
                onClick={() => navigate("/result/approval")}
                className="px-5 py-2 rounded-md bg-[#00458F] text-white"
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultApprovalReview;