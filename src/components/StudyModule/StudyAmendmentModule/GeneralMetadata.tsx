"use client";

import { useState } from "react";

interface GeneralMetadataFormData {
  amendmentCode: string;
  amendmentTitle: string;
  irbApprovalNo: string;
  irbApprovalDate: string;
  effectiveDate: string;
  linkedDeviations: string[];
  associatedCapa: string;
  rootCause: string;
  amendmentReason: string;
}

interface GeneralMetadataProps {
  formData: GeneralMetadataFormData;
  handleChange: (field: keyof GeneralMetadataFormData, value: any) => void;
}

export default function GeneralMetadata({ formData, handleChange }: GeneralMetadataProps) {
  // Local state for adding new deviation
  const [newDeviation, setNewDeviation] = useState("");
  const [showDeviationInput, setShowDeviationInput] = useState(false);
  
  // Local state for CAPA linking
  const [newCapa, setNewCapa] = useState("");
  const [showCapaInput, setShowCapaInput] = useState(false);

  // Add a new protocol deviation
  const addDeviation = () => {
    if (newDeviation.trim() && !formData.linkedDeviations.includes(newDeviation.trim())) {
      handleChange("linkedDeviations", [...formData.linkedDeviations, newDeviation.trim()]);
      setNewDeviation("");
      setShowDeviationInput(false);
    }
  };

  // Remove a deviation
  const removeDeviation = (devToRemove: string) => {
    handleChange("linkedDeviations", formData.linkedDeviations.filter(dev => dev !== devToRemove));
  };

  // Link a CAPA ID
  const linkCapa = () => {
    if (newCapa.trim() && newCapa.trim() !== formData.associatedCapa) {
      handleChange("associatedCapa", newCapa.trim());
      setNewCapa("");
      setShowCapaInput(false);
    }
  };

  // Remove CAPA link
  const removeCapa = () => {
    handleChange("associatedCapa", "");
  };

  // Handle Enter key for deviation input
  const handleDeviationKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addDeviation();
    } else if (e.key === "Escape") {
      setShowDeviationInput(false);
      setNewDeviation("");
    }
  };

  // Handle Enter key for CAPA input
  const handleCapaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      linkCapa();
    } else if (e.key === "Escape") {
      setShowCapaInput(false);
      setNewCapa("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Amendment Code Row - Two columns */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amendment Code
          </label>
          <input
            type="text"
            value={formData.amendmentCode}
            onChange={(e) => handleChange("amendmentCode", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., AMD-ONC-002"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amendment Title
          </label>
          <input
            type="text"
            value={formData.amendmentTitle}
            onChange={(e) => handleChange("amendmentTitle", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., Schedule and Specimen Adjustments"
          />
        </div>
      </div>

      {/* IRB and Dates Row - Three columns */}
      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ethics Committee IRB Approval No.
          </label>
          <input
            type="text"
            value={formData.irbApprovalNo}
            onChange={(e) => handleChange("irbApprovalNo", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="e.g., IRB-2026-ONC-99"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IRB Approval Date
          </label>
          <input
            type="date"
            value={formData.irbApprovalDate}
            onChange={(e) => handleChange("irbApprovalDate", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposed Effective Date
          </label>
          <input
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => handleChange("effectiveDate", e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Linked Records Row - Two columns with interactive tag management */}
      <div className="grid grid-cols-2 gap-6">
        {/* Linked Protocol Deviations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Linked Protocol Deviations
          </label>
          <div className="border border-gray-300 rounded-md p-3 min-h-[42px] bg-gray-50">
            <div className="flex flex-wrap gap-2 items-center">
              {formData.linkedDeviations.map((dev: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  {dev}
                  <button
                    type="button"
                    onClick={() => removeDeviation(dev)}
                    className="ml-1 text-blue-600 hover:text-blue-800 font-medium"
                    aria-label={`Remove ${dev}`}
                  >
                    ×
                  </button>
                </span>
              ))}
              
              {showDeviationInput ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={newDeviation}
                    onChange={(e) => setNewDeviation(e.target.value)}
                    onKeyDown={handleDeviationKeyDown}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., DEV-ONC-014"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={addDeviation}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeviationInput(false);
                      setNewDeviation("");
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDeviationInput(true)}
                  className="text-blue-600 text-sm hover:text-blue-800 font-medium"
                >
                  + Add
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Associated CAPA ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Associated CAPA ID
          </label>
          <div className="border border-gray-300 rounded-md p-3 min-h-[42px] bg-gray-50">
            <div className="flex items-center gap-2 flex-wrap">
              {formData.associatedCapa && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm flex items-center gap-1">
                  {formData.associatedCapa}
                  <button
                    type="button"
                    onClick={removeCapa}
                    className="ml-1 text-yellow-600 hover:text-yellow-800 font-medium"
                    aria-label="Remove CAPA"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {showCapaInput ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={newCapa}
                    onChange={(e) => setNewCapa(e.target.value)}
                    onKeyDown={handleCapaKeyDown}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., CAPA-2026-008"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={linkCapa}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCapaInput(false);
                      setNewCapa("");
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    ✗
                  </button>
                </div>
              ) : (
                !formData.associatedCapa && (
                  <button
                    type="button"
                    onClick={() => setShowCapaInput(true)}
                    className="text-blue-600 text-sm hover:text-blue-800 font-medium"
                  >
                    + Link
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Root Cause Analysis */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Root Cause Analysis
        </label>
        <textarea
          rows={3}
          value={formData.rootCause}
          onChange={(e) => handleChange("rootCause", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Describe the root cause analysis..."
        />
      </div>

      {/* Mandatory Reason for Amendment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mandatory Reason for Amendment
        </label>
        <textarea
          rows={3}
          value={formData.amendmentReason}
          onChange={(e) => handleChange("amendmentReason", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Describe the reason for this amendment..."
        />
        <div className="flex justify-end mt-1">
          <span
            className={`text-xs ${
              formData.amendmentReason.length < 20 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {formData.amendmentReason.length}/20 minimum characters
          </span>
        </div>
      </div>
    </div>
  );
}