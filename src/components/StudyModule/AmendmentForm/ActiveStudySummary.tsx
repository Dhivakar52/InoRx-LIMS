"use client";

interface Props {
  form: any;
  onInitiateAmendment: () => void;
}

export default function ActiveStudySummary({
  form,
  onInitiateAmendment,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="pb-4">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Active Study Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Review active study information before
          initiating amendment.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-xs text-gray-500">
            Study Code
          </div>

          <div className="font-semibold mt-1">
            {form.studyCode}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-xs text-gray-500">
            Study Title
          </div>

          <div className="font-semibold mt-1">
            {form.studyTitle}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-xs text-gray-500">
            Current Version
          </div>

          <div className="font-semibold mt-1">
            {form.currentVersion}
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="text-xs text-gray-500">
            Status
          </div>

          <div className="font-semibold mt-1">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              {form.status}
            </span>
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">
              Study Start Date
            </label>

            <input
              value="2026-01-01"
              disabled
              className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Study End Date
            </label>

            <input
              value="2027-12-31"
              disabled
              className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Principal Investigator
            </label>

            <input
              value="Dr. John"
              disabled
              className="w-full border rounded-md h-10 px-3 mt-1 bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onInitiateAmendment}
            className="bg-[#00458F] text-white px-5 py-2 rounded-md">
            Initiate Amendment
          </button>
        </div>
      </div>
    </div>
  );
}