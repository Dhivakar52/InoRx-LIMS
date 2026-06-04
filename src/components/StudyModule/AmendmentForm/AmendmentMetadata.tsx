"use client";

import { Input } from "@base-ui/react";
import { Label } from "../../ui/label";

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

  const amendmentReasons = [
    "Protocol Amendment",
    "IRB/IEC Ethics Committee Mandated Condition",
    "Safety Update / Adverse Event Risk Mitigation",
    "Operational Schedule Modification",
    "Typographical/Administrative Correction",
    "Endpoint/Test Panel Selection Update",
  ];
  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0] || null;

  updateField("consentDocument", file);
};
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
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
            Amendment Code *
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
            Amendment Title *
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
        </div>

        <div>
          <label className="text-sm font-medium">
            Target Version
          </label>

          <input
            value={form.targetVersion}
            disabled
            className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-50"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Reason Category *
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
        </div>

        <div>
          <label className="text-sm font-medium">
            Release Date *
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
        </div>

        <div>
          <label className="text-sm font-medium">
            Effective Date *
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

        <div>
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
            Reason For Change *
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
        </div>

        <div className="col-span-1">
          <label className="text-sm font-medium">
            Root Cause *
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
        </div>
        <div className="col-span-1">
          <Label className="text-sm font-medium block mb-1">
            Consent Document *
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