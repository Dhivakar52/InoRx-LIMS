"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";

interface SubjectRow {
  subjectCode: string;
  subjectName: string;
  currentVersion: string;
  targetVersion: string;
  status: string;
}

export default function SubjectMigrationTab() {

  const [migrationType, setMigrationType] =
    useState("Future");

  const [subjects, setSubjects] =
    useState<SubjectRow[]>([
      {
        subjectCode: "SUB001",
        subjectName: "Subject 001",
        currentVersion: "V1.0",
        targetVersion: "V2.0",
        status: "Eligible",
      },
      {
        subjectCode: "SUB002",
        subjectName: "Subject 002",
        currentVersion: "V1.0",
        targetVersion: "V2.0",
        status: "Eligible",
      },
    ]);

  const updateSubject = (
    index: number,
    field: keyof SubjectRow,
    value: string
  ) => {

    const temp = [...subjects];

    temp[index][field] = value;

    setSubjects(temp);
  };

  return (
    <div className="space-y-5">

      {/* Migration Policy */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Migration Policy
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <label className="border rounded-lg p-4 cursor-pointer">

            <input
              type="radio"
              checked={
                migrationType ===
                "Future"
              }
              onChange={() =>
                setMigrationType(
                  "Future"
                )
              }
            />

            <span className="ml-2 font-medium">
              Future Cohorts Only
            </span>

            <p className="text-xs text-gray-500 mt-2">
              Only newly enrolled
              subjects will use
              new amendment.
            </p>

          </label>

          <label className="border rounded-lg p-4 cursor-pointer">

            <input
              type="radio"
              checked={
                migrationType ===
                "Global"
              }
              onChange={() =>
                setMigrationType(
                  "Global"
                )
              }
            />

            <span className="ml-2 font-medium">
              Global Transition
            </span>

            <p className="text-xs text-gray-500 mt-2">
              All active subjects
              automatically move
              to new version.
            </p>

          </label>

          <label className="border rounded-lg p-4 cursor-pointer">

            <input
              type="radio"
              checked={
                migrationType ===
                "Manual"
              }
              onChange={() =>
                setMigrationType(
                  "Manual"
                )
              }
            />

            <span className="ml-2 font-medium">
              Manual Assignment
            </span>

            <p className="text-xs text-gray-500 mt-2">
              User manually selects
              subjects.
            </p>

          </label>

        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Total Subjects
          </p>

          <h3 className="text-2xl font-bold">
            {subjects.length}
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Eligible
          </p>

          <h3 className="text-2xl font-bold text-green-600">
            {
              subjects.filter(
                (x) =>
                  x.status ===
                  "Eligible"
              ).length
            }
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Pending
          </p>

          <h3 className="text-2xl font-bold text-yellow-600">
            {
              subjects.filter(
                (x) =>
                  x.status ===
                  "Pending"
              ).length
            }
          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Excluded
          </p>

          <h3 className="text-2xl font-bold text-red-600">
            {
              subjects.filter(
                (x) =>
                  x.status ===
                  "Excluded"
              ).length
            }
          </h3>

        </div>

      </div>

      {/* Manual Assignment Grid */}

      {migrationType ===
        "Manual" && (

        <div className="border rounded-lg overflow-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-gray-50">

                <th>
                  Subject Code
                </th>

                <th>
                  Subject Name
                </th>

                <th>
                  Current Version
                </th>

                <th>
                  Target Version
                </th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {subjects.map(
                (
                  row,
                  index
                ) => (

                  <tr key={index}>

                    <td>
                      {
                        row.subjectCode
                      }
                    </td>

                    <td>
                      {
                        row.subjectName
                      }
                    </td>

                    <td>
                      {
                        row.currentVersion
                      }
                    </td>

                    <td>

                      <Input
                        value={
                          row.targetVersion
                        }
                        onChange={(
                          e
                        ) =>
                          updateSubject(
                            index,
                            "targetVersion",
                            e.target
                              .value
                          )
                        }
                      />

                    </td>

                    <td>

                      <span
                        className={
                          row.status ===
                          "Eligible"
                            ? "px-2 py-1 rounded bg-green-100 text-green-700 text-xs"
                            : row.status ===
                              "Pending"
                            ? "px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs"
                            : "px-2 py-1 rounded bg-red-100 text-red-700 text-xs"
                        }
                      >
                        {row.status}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

      {/* Migration Validation */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">
          Migration Validation
        </h3>

        <ul className="list-disc pl-6 text-sm space-y-2">

          <li>
            Subject must be Active
          </li>

          <li>
            Subject must not be
            Withdrawn
          </li>

          <li>
            Subject must not have
            completed final visit
          </li>

          <li>
            Re-Consent may be
            required before
            migration
          </li>

        </ul>

      </div>

      {/* Migration Preview */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">
          Migration Preview
        </h3>

        <p className="text-sm text-gray-600">

          Selected migration
          policy will update
          subject assignments
          during amendment
          activation.

        </p>

        <Button
          type="button"
          className="btn-theme-save mt-4"
        >
          Preview Migration
        </Button>

      </div>

    </div>
  );
}