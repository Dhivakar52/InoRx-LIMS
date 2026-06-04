"use client";

import { Button } from "../../../components/ui/button";

export default function ReviewAndSubmitTab() {

  return (
    <div className="space-y-5">

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold mb-4">
          Amendment Review Summary
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div className="border rounded p-3">
            Protocol Changes : 12
          </div>

          <div className="border rounded p-3">
            Cohort Changes : 3
          </div>

          <div className="border rounded p-3">
            Visit Changes : 5
          </div>

        </div>

      </div>

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold mb-3">
          Validation Status
        </h3>

        <ul className="list-disc pl-5">

          <li>
            All mandatory fields completed
          </li>

          <li>
            Documents uploaded
          </li>

          <li>
            Re-consent configured
          </li>

          <li>
            Migration validated
          </li>

        </ul>

      </div>

      <div className="flex justify-end gap-3">

        <Button
          type="button"
          className="btn-theme-edit"
        >
          Save Draft
        </Button>

        <Button
          type="button"
          className="btn-theme-save"
        >
          Submit Amendment
        </Button>

      </div>

    </div>
  );
}