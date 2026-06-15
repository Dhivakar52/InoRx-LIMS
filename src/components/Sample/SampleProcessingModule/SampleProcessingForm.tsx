"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
 
  Building2,
  User,

} from "lucide-react";

const SampleProcessingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    processingType: "",
    assignedLab: "",
    assignedTechnician: "",
    startDate: "",
    endDate: "",
    priority: "Routine",
    processingStatus: "Pending",
    integrity: "",
    volumeCheck: "",
    temperatureCheck: "",
    qcStatus: "",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-8">

       
        <div className="border-b pb-3">
          <h2 className="text-xl font-semibold text-[#00458F]">
            Sample Processing
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Assign laboratory and perform sample processing workflow
          </p>
        </div>

        {/* Sample Details */}
        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-4">
            Sample Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">Sample ID</div>
              <div className="font-semibold mt-1">SMP-0001</div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">Subject ID</div>
              <div className="font-semibold mt-1">SUB-1001</div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">Sample Type</div>
              <div className="font-semibold mt-1">Blood</div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">Collection Date</div>
              <div className="font-semibold mt-1">20-06-2026</div>
            </div>

          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-4">
            Processing Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <div>
              <label className="text-sm font-medium">
                Processing Type
              </label>

              <select
                name="processingType"
                value={formData.processingType}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option value="">Select</option>
                <option>Centrifugation</option>
                <option>Aliquoting</option>
                <option>DNA Extraction</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Assigned Lab
              </label>

              <div className="relative mt-1">
                <Building2
                  size={16}
                  className="absolute left-3 top-3 text-gray-500"
                />

                <select
                  name="assignedLab"
                  value={formData.assignedLab}
                  onChange={handleChange}
                  className="w-full border rounded-md h-10 pl-10"
                >
                  <option value="">Select Lab</option>
                  <option>Central Lab</option>
                  <option>Biochemistry Lab</option>
                  <option>Molecular Lab</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Assigned Technician
              </label>

              <div className="relative mt-1">
                <User
                  size={16}
                  className="absolute left-3 top-3 text-gray-500"
                />

                <select
                  name="assignedTechnician"
                  value={formData.assignedTechnician}
                  onChange={handleChange}
                  className="w-full border rounded-md h-10 pl-10"
                >
                  <option value="">Select Technician</option>
                  <option>John</option>
                  <option>David</option>
                  <option>Arun</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Processing Start
              </label>

              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Processing End
              </label>

              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option>Routine</option>
                <option>Urgent</option>
                <option>STAT</option>
              </select>
            </div>

          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-4">
            Quality Check
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <div>
              <label className="text-sm font-medium">
                Sample Integrity
              </label>

              <select
                name="integrity"
                value={formData.integrity}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option value="">Select</option>
                <option>Pass</option>
                <option>Fail</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Volume Check
              </label>

              <select
                name="volumeCheck"
                value={formData.volumeCheck}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option value="">Select</option>
                <option>Pass</option>
                <option>Fail</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Temperature Check
              </label>

              <select
                name="temperatureCheck"
                value={formData.temperatureCheck}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option value="">Select</option>
                <option>Pass</option>
                <option>Fail</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                QC Status
              </label>

              <select
                name="qcStatus"
                value={formData.qcStatus}
                onChange={handleChange}
                className="w-full border rounded-md h-10 px-3 mt-1"
              >
                <option value="">Select</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>

          </div>
        </div>

        {/* Test Assignment */}
        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-4">
            Test Assignment
          </h3>

          <div className="">
            {/* <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="text-[#00458F]" />
              <span className="font-medium">
                Assigned Test : CBC
              </span>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Test Analyzer
              </label>

              <input
                placeholder="Enter Analyzer"
                className="w-full border rounded-md h-10 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Testing Completion Date
              </label>

              <input
                type="date"
                className="w-full border rounded-md h-10 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Test Status
              </label>

              <select className="w-full border rounded-md h-10 px-3">
                <option>Pending</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Processing Remarks
          </label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md px-3 py-2 mt-1"
            placeholder="Enter remarks"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center pt-5">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Back
          </button>

          <div className="flex gap-3">
            <button
              className="px-5 py-2 rounded-md bg-gray-500 text-white"
            >
              Save Draft
            </button>

            <button
              className="px-5 py-2 rounded-md bg-[#00458F] text-white"
            >
              Assign & Submit
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SampleProcessingForm;