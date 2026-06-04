"use client";

export default function ApprovalWorkflowTab() {

  const steps = [
    "Draft",
    "CRA Review",
    "PI Approval",
    "QA Review",
    "Regulatory Approval",
    "Sponsor Approval",
    "Activated",
  ];

  return (
    <div className="space-y-5">

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold mb-5">
          Approval Workflow
        </h3>

        <div className="flex justify-between">

          {steps.map(
            (
              step,
              index
            ) => (

              <div
                key={index}
                className="flex flex-col items-center"
              >

                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center">

                  {index + 1}

                </div>

                <span className="text-xs mt-2">

                  {step}

                </span>

              </div>

            )
          )}

        </div>

      </div>

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold mb-4">
          Current Status
        </h3>

        <span className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded">

          QA Review Pending

        </span>

      </div>

    </div>
  );
}