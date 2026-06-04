"use client";

import { useMemo } from "react";

interface DeltaRow {
  section: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
  changeType: "Added" | "Modified" | "Deleted";
}

type Props = {
  deltaRows?: DeltaRow[];
};

export default function DeltaReportTab({
  deltaRows = [],
}: Props) {

  const summary = useMemo(() => {

    return {
      added: deltaRows.filter(
        (x) => x.changeType === "Added"
      ).length,

      modified: deltaRows.filter(
        (x) => x.changeType === "Modified"
      ).length,

      deleted: deltaRows.filter(
        (x) => x.changeType === "Deleted"
      ).length,
    };

  }, [deltaRows]);

  const getBadge = (
    type: string
  ) => {

    switch (type) {

      case "Added":
        return (
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
            Added
          </span>
        );

      case "Modified":
        return (
          <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
            Modified
          </span>
        );

      case "Deleted":
        return (
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
            Deleted
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">

      {/* Summary */}

      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Added Changes
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            {summary.added}
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Modified Changes
          </p>

          <h3 className="text-2xl font-bold text-yellow-600">
            {summary.modified}
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Deleted Changes
          </p>

          <h3 className="text-2xl font-bold text-red-600">
            {summary.deleted}
          </h3>

        </div>

      </div>

      {/* Delta Grid */}

      <div className="border rounded-lg overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50">

              <th>Section</th>

              <th>Field</th>

              <th>Old Value</th>

              <th>New Value</th>

              <th>Change Type</th>

            </tr>

          </thead>

          <tbody>

            {deltaRows.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No changes available
                </td>

              </tr>

            ) : (

              deltaRows.map(
                (row, index) => (

                  <tr key={index}>

                    <td>
                      {row.section}
                    </td>

                    <td>
                      {row.fieldName}
                    </td>

                    <td>

                      <div className="max-w-[250px] break-words">

                        {row.oldValue || "-"}

                      </div>

                    </td>

                    <td>

                      <div className="max-w-[250px] break-words">

                        {row.newValue || "-"}

                      </div>

                    </td>

                    <td>

                      {getBadge(
                        row.changeType
                      )}

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

      {/* Protocol Comparison */}

      <div className="grid grid-cols-2 gap-4">

        <div className="border rounded-lg p-4">

          <h3 className="font-semibold mb-3">
            Current Protocol
          </h3>

          <div className="space-y-2 text-sm">

            <div>
              Version : V1.0
            </div>

            <div>
              Status : Active
            </div>

            <div>
              Effective :
              01-Jan-2026
            </div>

          </div>

        </div>

        <div className="border rounded-lg p-4">

          <h3 className="font-semibold mb-3">
            Proposed Protocol
          </h3>

          <div className="space-y-2 text-sm">

            <div>
              Version : V2.0
            </div>

            <div>
              Status : Draft
            </div>

            <div>
              Effective :
              15-Feb-2026
            </div>

          </div>

        </div>

      </div>

      {/* Change Impact */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-3">
          Change Impact Assessment
        </h3>

        <div className="grid grid-cols-4 gap-4">

          <div className="border rounded p-3">

            <p className="text-xs text-gray-500">
              Subject Impact
            </p>

            <p className="font-medium">
              Yes
            </p>

          </div>

          <div className="border rounded p-3">

            <p className="text-xs text-gray-500">
              Site Impact
            </p>

            <p className="font-medium">
              Yes
            </p>

          </div>

          <div className="border rounded p-3">

            <p className="text-xs text-gray-500">
              Lab Impact
            </p>

            <p className="font-medium">
              No
            </p>

          </div>

          <div className="border rounded p-3">

            <p className="text-xs text-gray-500">
              Safety Impact
            </p>

            <p className="font-medium">
              Yes
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}