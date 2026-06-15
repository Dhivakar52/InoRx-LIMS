"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Save,
  Printer,
  Download,
  CheckCircle,
  User,
  Calendar,
  FlaskConical,
  Microscope,
  FileText,
  ArrowLeft,
} from "lucide-react";

type ResultFormData = {
  id?: number;
  labNumber: string;
  patientName: string;
  uhidNo: string;
  ipNo: string;
  gender: string;
  age: string;
  department: string;
  ward: string;
  requestDate: string;
  receiptDate: string;
  referredBy: string;
  diagnosis: string;
  testName: string;
  specimen: string;
  result: "Detected" | "Not Detected" | "";
  ctValue: string;
  method: string;
  kitDetails: string;
  instrument: string;
  limitOfDetection: string;
  interpretation: string;
  notes: string;
  approvedBy: string;
  doneBy: string;
  status: string;
  reportDate: string;
};

const ResultEntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = location.state?.mode || "new";
  const existingData = location.state?.data;

  const [formData, setFormData] = useState<ResultFormData>({
    labNumber: "",
    patientName: "",
    uhidNo: "",
    ipNo: "",
    gender: "",
    age: "",
    department: "",
    ward: "",
    requestDate: "",
    receiptDate: "",
    referredBy: "",
    diagnosis: "",
    testName: "HCV RNA PCR (Qualitative)",
    specimen: "Serum / Plasma",
    result: "",
    ctValue: "",
    method: "Real Time RT-PCR",
    kitDetails: "Cosara HCV Qualitative test kit",
    instrument: "CO DX BOX MIC qPCR cycler",
    limitOfDetection: "10 copies/microliter",
    interpretation: "",
    notes: "",
    approvedBy: "",
    doneBy: "Julia Lydia.Y",
    status: "Pending",
    reportDate: "",
  });

  useEffect(() => {
    if (existingData && mode !== "new") {
      setFormData(existingData);
    }
  }, [existingData, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResultChange = (value: "Detected" | "Not Detected") => {
    setFormData((prev) => ({ ...prev, result: value }));
    if (value === "Detected") {
      setFormData((prev) => ({
        ...prev,
        interpretation: "Detected indicates either current HCV infection or activation of chronic HCV infection.",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        interpretation: "Not Detected indicates either absence of infection or RNA copies below the limit of detection.",
      }));
    }
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Save Result",
      text: "Are you sure you want to save this result?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#00458F",
      confirmButtonText: "Yes, Save",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "Result has been saved successfully.", "success");
        navigate("/result/entry");
      }
    });
  };

  const handleApprove = () => {
    Swal.fire({
      title: "Approve Result",
      text: "Are you sure you want to approve this result?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      confirmButtonText: "Yes, Approve",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => ({
          ...prev,
          status: "Approved",
          reportDate: new Date().toLocaleDateString("en-GB"),
        }));
        Swal.fire("Approved!", "Result has been approved.", "success");
      }
    });
  };

  const handlePrint = () => {
    Swal.fire("Print", "Printing report...", "info");
  };

  const handleDownload = () => {
    Swal.fire("Download", "Downloading report...", "success");
  };

  const isViewMode = mode === "view";
  // const isEditMode = mode === "edit";

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Header */}
        <div className="border-b pb-3 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-[#00458F]">
              {isViewMode ? "Result Details" : "Result Entry"}
            </h2>
          </div>
          {!isViewMode && (
            <div className="flex gap-2">
              <button onClick={handlePrint} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200" title="Print">
                <Printer size={18} />
              </button>
              <button onClick={handleDownload} className="p-2 bg-gray-100 rounded-md hover:bg-gray-200" title="Download">
                <Download size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Patient Information */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <User size={18} /> Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lab Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="labNumber"
                value={formData.labNumber}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UHID No</label>
              <input
                type="text"
                name="uhidNo"
                value={formData.uhidNo}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IP No</label>
              <input
                type="text"
                name="ipNo"
                value={formData.ipNo}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isViewMode}
                placeholder="e.g., 75Y 3M 17D"
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <Calendar size={18} /> Request Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Request Date</label>
              <input
                type="text"
                name="requestDate"
                value={formData.requestDate}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Date</label>
              <input
                type="text"
                name="receiptDate"
                value={formData.receiptDate}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Referred By</label>
              <input
                type="text"
                name="referredBy"
                value={formData.referredBy}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                disabled={isViewMode}
                rows={2}
                className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Test Results */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <FlaskConical size={18} /> Test Results
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
              <input
                type="text"
                name="testName"
                value={formData.testName}
                disabled
                className="w-full border rounded-md h-10 px-3 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specimen</label>
              <input
                type="text"
                name="specimen"
                value={formData.specimen}
                disabled
                className="w-full border rounded-md h-10 px-3 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Result <span className="text-red-500">*</span></label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="result"
                    value="Detected"
                    checked={formData.result === "Detected"}
                    onChange={() => handleResultChange("Detected")}
                    disabled={isViewMode}
                    className="mr-2 w-4 h-4"
                  />
                  <span className="text-red-600 font-medium">Detected </span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="result"
                    value="Not Detected"
                    checked={formData.result === "Not Detected"}
                    onChange={() => handleResultChange("Not Detected")}
                    disabled={isViewMode}
                    className="mr-2 w-4 h-4"
                  />
                  <span className="text-green-600 font-medium">Not Detected</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ct Value</label>
              <input
                type="text"
                name="ctValue"
                value={formData.ctValue}
                onChange={handleChange}
                disabled={isViewMode}
                placeholder="e.g., 28.5"
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Method</label>
              <input
                type="text"
                name="method"
                value={formData.method}
                disabled
                className="w-full border rounded-md h-10 px-3 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Technical Information */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <Microscope size={18} /> Technical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Kit</label>
              <input
                type="text"
                name="kitDetails"
                value={formData.kitDetails}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instrument</label>
              <input
                type="text"
                name="instrument"
                value={formData.instrument}
                onChange={handleChange}
                disabled={isViewMode}
                className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Limit of Detection</label>
              <input
                type="text"
                name="limitOfDetection"
                value={formData.limitOfDetection}
                disabled
                className="w-full border rounded-md h-10 px-3 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Interpretation & Notes */}
        <div>
          <h3 className="text-md font-semibold text-[#00458F] mb-3 flex items-center gap-2">
            <FileText size={18} /> Result Interpretation
          </h3>
          <textarea
            name="interpretation"
            value={formData.interpretation}
            onChange={handleChange}
            disabled={isViewMode}
            rows={3}
            className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
          />
          <label className="block text-sm font-medium text-gray-700 mt-3 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            disabled={isViewMode}
            rows={2}
            placeholder="To correlate with HCV antibody assay and clinical condition."
            className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
          />
        </div>

        {/* Approval Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
            <select
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleChange}
              disabled={isViewMode}
              className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
            >
              <option value="">--Select--</option>
              <option value="Dr. Senthil Kumar">Dr. Senthil Kumar</option>
              <option value="Dr. Rajesh">Dr. Rajesh</option>
              <option value="Dr. Meena">Dr. Meena</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Done By</label>
            <input
              type="text"
              name="doneBy"
              value={formData.doneBy}
              onChange={handleChange}
              disabled={isViewMode}
              className="w-full border rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-[#00458F] disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <div className={`px-3 py-2 rounded-md text-sm font-medium ${
              formData.status === "Approved" ? "bg-green-100 text-green-700" : 
              formData.status === "Completed" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {formData.status}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-5 border-t">
          <button
            onClick={() => navigate("/result/entry")}
            className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex gap-3">
            {!isViewMode && (
              <>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#00366d]"
                >
                  <Save size={16} /> Save Result
                </button>
                {formData.status !== "Approved" && (
                  <button
                    onClick={handleApprove}
                    className="flex items-center gap-2 px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultEntryForm;