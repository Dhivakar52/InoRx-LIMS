"use client";

// import { Input } from "@base-ui/react";
import { Label } from "../../ui/label";
import { useState } from "react";

interface Props {
  form: any;
  setForm: any;
  errors: any;
}

export default function AmendmentMetadata({
  form,
  setForm,
  errors,
}: Props) {
  const updateField = (
    field: string,
    value: any
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // const _amendmentReasons = [
  //   "Protocol Amendment",
  //   "IRB/IEC Ethics Committee Mandated Condition",
  //   "Safety Update / Adverse Event Risk Mitigation",
  //   "Operational Schedule Modification",
  //   "Typographical/Administrative Correction",
  //   "Endpoint/Test Panel Selection Update",
  // ];
  function handleChange(field: string, value: string): void {
    const max = 500;
    const newValue = value?.slice(0, max);
    updateField(field, newValue);
  }

  function removeDeviation(dev: string): void {
    const current: string[] = form?.associatedDeviations || [];
    const updated = current.filter((d) => d !== dev);
    updateField("associatedDeviations", updated);
  }

  // Local UI state for adding/removing deviations and CAPAs
  const [showDeviationInput, setShowDeviationInput] = useState(false);
  const [newDeviation, setNewDeviation] = useState("");

  function addDeviation(): void {
    const val = newDeviation?.trim();
    if (!val) return;
    const current: string[] = form?.associatedDeviations || [];
    updateField("associatedDeviations", [...current, val]);
    setNewDeviation("");
    setShowDeviationInput(false);
  }

  function removeCAPA(capa: string): void {
    const current: string[] = form?.associatedCAPAs || [];
    const updated = current.filter((c) => c !== capa);
    updateField("associatedCAPAs", updated);
  }

  const [showCAPAInput, setShowCAPAInput] = useState(false);
  const [newCAPA, setNewCAPA] = useState("");

  function addCAPA(): void {
    const val = newCAPA?.trim();
    if (!val) return;
    const current: string[] = form?.associatedCAPAs || [];
    updateField("associatedCAPAs", [...current, val]);
    setNewCAPA("");
    setShowCAPAInput(false);
  }

  return (
    <div className="space-y-6">
      <div className="pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Amendment Metadata
        </h2>

        <p className="text-sm text-gray-500">
          Enter amendment details and
          regulatory information.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">

        <div>
          <label className="text-sm font-medium">
            Amendment Code <span className="text-red-500">*</span>
          </label>

          <input
            value={form.amendmentCode}
            onChange={(e) =>
              updateField(
                "amendmentCode",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />

          {errors.amendmentCode && (
            <p className="text-red-500 text-xs mt-1">
              {errors.amendmentCode}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">
            Amendment Title <span className="text-red-500">*</span>
          </label>

          <input
            value={form.amendmentTitle}
            onChange={(e) =>
              updateField(
                "amendmentTitle",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />
          {errors.amendmentTitle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.amendmentTitle}
            </p>
          )}
        </div>
 <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Amendment Description</label>
        <textarea
          rows={3}
          value={form.amendmentDescription}
          onChange={(e) => handleChange("amendmentDescription", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500"
          placeholder="(Max 500 characters)"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-gray-500">{form.amendmentDescription?.length || 0}/500</span>
        </div>
      </div>
           <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Version Increment Type</label>
        <select
          value={form.versionIncrementType}
          onChange={(e) => handleChange("versionIncrementType", e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Minor">Minor (e.g., V1.0 to V1.1)</option>
          <option value="Major">Major (e.g., V1.0 to V2.0)</option>
        </select>
      </div>
        {/* <div>
          <label className="text-sm font-medium">
            Target Version
          </label>

          <input
            value={form.targetVersion}
            disabled
            className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-50"
          />
        </div> */}

        {/* <div>
          <label className="text-sm font-medium">
            Reason Category <span className="text-red-500">*</span>
          </label>

          <select
            value={
              form.amendmentReasonCategory
            }
            onChange={(e) =>
              updateField(
                "amendmentReasonCategory",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1">

            <option value="">
              Select
            </option>

            {amendmentReasons.map((x) => (
              <option key={x}>
                {x}
              </option>
            ))}
          </select>
          {errors.amendmentReasonCategory && (
            <p className="text-red-500 text-xs mt-1">
              {errors.amendmentReasonCategory}
            </p>
          )}
        </div> */}

        <div>
          <label className="text-sm font-medium">
            Release Date <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={form.releaseDate}
            onChange={(e) =>
              updateField(
                "releaseDate",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />
          {errors.releaseDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.releaseDate}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">
          Proposal  Effective Date  <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            value={form.effectiveDate}
            onChange={(e) =>
              updateField(
                "effectiveDate",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />

          {errors.effectiveDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.effectiveDate}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">
            IRB Approval Number
          </label>

          <input
            value={form.irbApprovalNumber}
            onChange={(e) =>
              updateField(
                "irbApprovalNumber",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            IRB Approval Date
          </label>

          <input
            type="date"
            value={form.irbApprovalDate}
            onChange={(e) =>
              updateField(
                "irbApprovalDate",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1"
          />
        </div>
  <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Associated Deviations</label>
          <div className="border border-gray-300 rounded-md p-3 min-h-[42px] bg-gray-50">
            <div className="flex flex-wrap gap-2 items-center">
              {form.associatedDeviations?.map((dev: string, idx: number) => (
                <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm flex items-center gap-1">
                  {dev}
                  <button type="button" onClick={() => removeDeviation(dev)} className="ml-1 text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
              {showDeviationInput ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={newDeviation}
                    onChange={(e) => setNewDeviation(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addDeviation()}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., DEV-ONC-014"
                    autoFocus
                  />
                  <button onClick={addDeviation} className="text-green-600 hover:text-green-800">✓</button>
                  <button onClick={() => { setShowDeviationInput(false); setNewDeviation(""); }} className="text-red-600 hover:text-red-800">✗</button>
                </div>
              ) : (
                <button onClick={() => setShowDeviationInput(true)} className="text-blue-600 text-sm hover:text-blue-800">+ Add</button>
              )}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Associated CAPAs</label>
          <div className="border border-gray-300 rounded-md p-3 min-h-[42px] bg-gray-50">
            <div className="flex flex-wrap gap-2 items-center">
              {form.associatedCAPAs?.map((capa: string, idx: number) => (
                <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm flex items-center gap-1">
                  {capa}
                  <button type="button" onClick={() => removeCAPA(capa)} className="ml-1 text-yellow-600 hover:text-yellow-800">×</button>
                </span>
              ))}
              {showCAPAInput ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={newCAPA}
                    onChange={(e) => setNewCAPA(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCAPA()}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-32 focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., CAPA-2026-008"
                    autoFocus
                  />
                  <button onClick={addCAPA} className="text-green-600 hover:text-green-800">✓</button>
                  <button onClick={() => { setShowCAPAInput(false); setNewCAPA(""); }} className="text-red-600 hover:text-red-800">✗</button>
                </div>
              ) : (
                <button onClick={() => setShowCAPAInput(true)} className="text-blue-600 text-sm hover:text-blue-800">+ Link</button>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* <div>
          <label className="text-sm font-medium">
            Migration Policy
          </label>

          <select
            value={form.migrationPolicy}
            onChange={(e) =>
              updateField(
                "migrationPolicy",
                e.target.value
              )
            }
            className="w-full border rounded-md h-10 px-3 mt-1">

            <option value="">
              Select
            </option>

            <option value="NEW_ONLY">
              Future Cohorts Only
            </option>

            <option value="GLOBAL">
              Global Transition
            </option>

            <option value="CUSTOM">
              Manual Assignment
            </option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="text-sm font-medium">
            Reason For Change <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={form.reasonForChange}
            onChange={(e) =>
              updateField(
                "reasonForChange",
                e.target.value
              )
            }
            className="w-full border rounded-md px-3 py-2 mt-1"
          />

          {errors.reasonForChange && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reasonForChange}
            </p>
          )}
        </div> */}

        <div className="col-span-1">
          <label className="text-sm font-medium">
            Root Cause Analysis <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={form.rootCause}
            onChange={(e) =>
              updateField(
                "rootCause",
                e.target.value
              )
            }
            className="w-full border rounded-md px-3 py-2 mt-1"
          />
          {errors.rootCause && (
            <p className="text-red-500 text-xs mt-1">
              {errors.rootCause}
            </p>
          )}
        </div>

              <div className="col-span-1">
          <label className="text-sm font-medium">
            Reason For Amendment <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={4}
            value={form.reasonForAmendment}
            onChange={(e) =>
              updateField(
                "reasonForAmendment",
                e.target.value
              )
            }
            className="w-full border rounded-md px-3 py-2 mt-1"
          />

          {errors.reasonForAmendment && (
            <p className="text-red-500 text-xs mt-1">
              {errors.reasonForAmendment}
            </p>
          )}
        </div> 
        <div className="col-span-1">
          <Label className="text-sm font-medium block mb-1">
            Consent Document <span className="text-red-500">*</span>
          </Label>

          <div className="relative">
            <input
              id="consentDocument"
              type="file"
              // onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                updateField(
                  "consentDocument",
                  e.target.files?.[0] || null
                )
              }
              className="hidden"
            />

            <label
              htmlFor="consentDocument"
              className={`
                flex flex-col items-center justify-center
                w-full min-h-[120px]
                border-2 border-dashed
                rounded-lg
                cursor-pointer
                transition-all
                bg-gray-50 hover:bg-gray-100
                ${
                  errors.consentDocument
                    ? "border-red-400"
                    : "border-gray-300 hover:border-[#00458F]"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <span className="text-sm font-medium text-gray-700">
                {form.consentDocument
                  ? form.consentDocument.name
                  : "Choose File or Drag & Drop"}
              </span>

              <span className="text-xs text-gray-500 mt-1">
                PDF, DOC, DOCX (Max 10 MB)
              </span>
            </label>
          </div>

           {errors.consentDocument && (
            <p className="text-red-500 text-xs mt-1">
              {errors.consentDocument}
            </p>
          )} 
        </div>
      </div>
    </div>
  );
}