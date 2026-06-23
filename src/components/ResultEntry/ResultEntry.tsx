"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubjectDetails from "./ResultForm/SubjectDetails";
import BacteriologyResult from "../ResultEntry/ResultForm/BacteriologyResult";
import BioChemistryResult from "../ResultEntry/ResultForm/BioChemistryResult";
import ClinicalPathologyResult from "../ResultEntry/ResultForm/ClinicalPathologyResult";
import MolecularBiologyResult from "../ResultEntry/ResultForm/MolecularBiologyResult";
import SerologyResult from "../ResultEntry/ResultForm/SerologyResult";

const departmentOptions = [
  "Select Department",
  "Bacteriology",
  "Bio Chemistry",
  "Clinical Pathology",
  "Molecular Biology",
  "Serology",
];

export default function ResultEntry() {
  const navigate = useNavigate();

  const [selectedDepartment, setSelectedDepartment] =
    useState("");

  const [formData, setFormData] = useState({
    labNumber: "",
    subjectId: "",
    gender: "",
    age: "",
    department: "",
    requestDate: "",
    receiptDate: "",
    referredBy: "",
    diagnosis: "",

    approvedBy: "",
    doneBy: "",
    status: "Pending",

    result: "",
    interpretation: "",
    notes: "",

    ctValue: "",

    gramStain: "",
    wetMount: "",
    colonyCount: "",
    cultureReport: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetDetails = () => {
    Swal.fire(
      "Success",
      "Subject details loaded",
      "success"
    );

    setFormData((prev) => ({
      ...prev,
      subjectId: "SUB12345",
      gender: "Male",
      age: "35",
      department: "Bacteriology",
      referredBy: "Dr. Kumar",
    }));
  };

  const handleSave = () => {
    Swal.fire(
      "Saved",
      "Result saved successfully",
      "success"
    );
  };

  const handleApprove = () => {
    Swal.fire(
      "Approved",
      "Result approved successfully",
      "success"
    );

    setFormData((prev) => ({
      ...prev,
      status: "Approved",
    }));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-xl font-bold text-[#00458F]">
            Result Entry
          </h2>
          {/* <div className="flex gap-2">
            <button className="p-2 bg-gray-100 rounded">
              <Printer size={18} />
            </button>
            <button className="p-2 bg-gray-100 rounded">
              <Download size={18} />
            </button>
          </div> */}
        </div>
        <div className="grid md:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="block text-sm mb-1">
              Lab Number
            </label>
            <input
              type="text"
              name="labNumber"
              value={formData.labNumber}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGetDetails}
              className="h-10 px-5 bg-[#00458F] text-white rounded">
              Get Details
            </button>
          </div>
          <div>
            <label className="block text-sm mb-1">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) =>
                setSelectedDepartment(
                  e.target.value
                )
              }
              className="w-full border rounded h-10 px-3">
              {departmentOptions.map((dept) => (
                <option
                  key={dept}
                  value={dept}
                >
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6">
          <SubjectDetails
            formData={formData}
            handleChange={handleChange} />
        </div>
        <div className="mt-6">
          {selectedDepartment ===
            "Bacteriology" && (
              <BacteriologyResult
                formData={formData}
                handleChange={handleChange}
              />
            )}

          {selectedDepartment ===
            "Bio Chemistry" && (
              <BioChemistryResult
                formData={formData}
                handleChange={handleChange}
              />
            )}

          {selectedDepartment ===
            "Clinical Pathology" && (
              <ClinicalPathologyResult
                formData={formData}
                handleChange={handleChange}
              />
            )}

          {selectedDepartment ===
            "Molecular Biology" && (
              <MolecularBiologyResult
                formData={formData}
                handleChange={handleChange}
              />
            )}

          {selectedDepartment ===
            "Serology" && (
              <SerologyResult
                formData={formData}
                handleChange={handleChange}
              />
            )}
        </div>
        <div className="flex justify-between mt-8 pt-5">
          <button
            onClick={() =>
              navigate("/result/entry")
            }
            className="px-5 py-2 bg-gray-200 rounded flex items-center gap-2">
            {/* <ArrowLeft size={16} /> */}
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-gray-500 text-white text-white rounded flex items-center gap-2">
              {/* <Save size={16} /> */}
              Save Draft
            </button>
            <button
              onClick={handleApprove}
              className="px-5 py-2 bg-[#00458F] text-white rounded flex items-center gap-2">
              {/* <CheckCircle size={16} /> */}
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}