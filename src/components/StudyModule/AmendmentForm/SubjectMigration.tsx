"use client";

import { useMemo } from "react";

interface Props {
  form: any;
  setForm: any;
}

export default function SubjectMigration({
  form,
  setForm,
}: Props) {

  const updateSubject = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [
      ...form.migrationSubjects,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectAll = (
    checked: boolean
  ) => {
    const updated =
      form.migrationSubjects.map(
        (x: any) => ({
          ...x,
          selected: checked,
        })
      );

    setForm((prev: any) => ({
      ...prev,
      migrationSubjects: updated,
    }));
  };

  const selectedCount =
    useMemo(
      () =>
        form.migrationSubjects.filter(
          (x: any) => x.selected
        ).length,
      [form.migrationSubjects]
    );

  return (
    <div className="space-y-6">

      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Subject Migration
        </h2>

        <p className="text-sm text-gray-500">
          Manage subject migration to
          amended protocol version
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">

        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="text-sm text-gray-500">
            Total Subjects
          </div>

          <div className="text-2xl font-bold">
            {
              form.migrationSubjects
                .length
            }
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-sm text-gray-500">
            Selected
          </div>

          <div className="text-2xl font-bold text-green-600">
            {selectedCount}
          </div>
        </div>

      </div>

      <div className="border rounded-lg p-4">

        <div className="mb-4 flex justify-between">

          <div>
            <label className="font-medium">
              Migration Policy
            </label>

            <select
              value={
                form.migrationPolicy
              }
              onChange={(e) =>
                setForm(
                  (prev: any) => ({
                    ...prev,
                    migrationPolicy:
                      e.target.value,
                  })
                )
              }
              className="border rounded-md h-10 px-3 ml-4">

              <option value="">
                Select
              </option>

              <option value="NEW_ONLY">
                Future Cohorts Only
              </option>

              <option value="GLOBAL">
                Global Transition
              </option>

              <option value="MANUAL">
                Manual Assignment
              </option>
            </select>
          </div>

          <button
            onClick={() =>
              selectAll(true)
            }
            className="bg-[#00458F] text-white px-4 py-2 rounded-md">

            Select All
          </button>

        </div>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                Select
              </th>

              <th className="p-3">
                Subject ID
              </th>

              <th className="p-3">
                Name
              </th>

              <th className="p-3">
                Current Version
              </th>

              <th className="p-3">
                Target Version
              </th>

              <th className="p-3">
                Consent Status
              </th>

              <th className="p-3">
                Re-consent Date
              </th>
            </tr>
          </thead>

          <tbody>
            {form.migrationSubjects.map(
              (
                row: any,
                index: number
              ) => (
                <tr
                  key={
                    row.subjectId
                  }
                  className="border-t">

                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={
                        row.selected
                      }
                      onChange={(e) =>
                        updateSubject(
                          index,
                          "selected",
                          e.target
                            .checked
                        )
                      }
                    />
                  </td>

                  <td className="p-3">
                    {
                      row.subjectId
                    }
                  </td>

                  <td className="p-3">
                    {
                      row.subjectName
                    }
                  </td>

                  <td className="p-3">
                    {
                      row.currentVersion
                    }
                  </td>

                  <td className="p-3">
                    {
                      row.targetVersion
                    }
                  </td>

                  <td>
                    <select
                      value={
                        row.consentStatus
                      }
                      onChange={(
                        e
                      ) =>
                        updateSubject(
                          index,
                          "consentStatus",
                          e.target
                            .value
                        )
                      }
                      className="border rounded-md h-9 px-2">

                      <option>
                        PENDING
                      </option>

                      <option>
                        COMPLETED
                      </option>

                      <option>
                        WAIVED
                      </option>
                    </select>
                  </td>

                  <td>
                    <input
                      type="date"
                      value={
                        row.reConsentDate
                      }
                      onChange={(
                        e
                      ) =>
                        updateSubject(
                          index,
                          "reConsentDate",
                          e.target
                            .value
                        )
                      }
                      className="border rounded-md h-9 px-2"
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}