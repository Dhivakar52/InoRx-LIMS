"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import {
  Plus,
  Trash2,
  Pencil,
} from "lucide-react";

interface CohortRow {
  cohortCode: string;
  cohortName: string;
  targetEnrollment: string;
  currentEnrollment: string;
  status: string;
  impactNote: string;
}

export default function CohortsTab() {

  const [cohorts, setCohorts] =
    useState<CohortRow[]>([
      {
        cohortCode: "",
        cohortName: "",
        targetEnrollment: "",
        currentEnrollment: "0",
        status: "Active",
        impactNote: "",
      },
    ]);

  const addRow = () => {
    setCohorts([
      ...cohorts,
      {
        cohortCode: "",
        cohortName: "",
        targetEnrollment: "",
        currentEnrollment: "0",
        status: "Active",
        impactNote: "",
      },
    ]);
  };

  const updateRow = (
    index: number,
    field: keyof CohortRow,
    value: string
  ) => {

    const temp = [...cohorts];

    temp[index][field] = value;

    setCohorts(temp);
  };

  const deleteRow = (
    index: number
  ) => {

    const row = cohorts[index];

    if (
      Number(
        row.currentEnrollment
      ) > 0
    ) {

      alert(
        "Cannot delete cohort with enrolled subjects"
      );

      return;
    }

    setCohorts(
      cohorts.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="space-y-5">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex justify-between items-center">

        <h3 className="font-semibold text-lg">

          Cohort Management

        </h3>

        <Button
          type="button"
          onClick={addRow}
          className="btn-theme-save"
        >
          <Plus size={16} />

          Add Cohort
        </Button>

      </div>

      {/* ================================= */}
      {/* COHORT GRID */}
      {/* ================================= */}

      <div className="overflow-auto border rounded-lg">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50">

              <th>
                Cohort Code
              </th>

              <th>
                Cohort Name
              </th>

              <th>
                Target Enrollment
              </th>

              <th>
                Current Enrollment
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {cohorts.map(
              (
                row,
                index
              ) => (

                <tr key={index}>

                  <td>

                    <Input
                      value={
                        row.cohortCode
                      }
                      onChange={(
                        e
                      ) =>
                        updateRow(
                          index,
                          "cohortCode",
                          e.target
                            .value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      value={
                        row.cohortName
                      }
                      onChange={(
                        e
                      ) =>
                        updateRow(
                          index,
                          "cohortName",
                          e.target
                            .value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      type="number"
                      value={
                        row.targetEnrollment
                      }
                      onChange={(
                        e
                      ) =>
                        updateRow(
                          index,
                          "targetEnrollment",
                          e.target
                            .value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      disabled
                      value={
                        row.currentEnrollment
                      }
                    />

                  </td>

                  <td>

                    <Select
                      value={
                        row.status
                      }
                      onValueChange={(
                        value
                      ) =>
                        updateRow(
                          index,
                          "status",
                          value
                        )
                      }
                    >

                      <SelectTrigger>

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="Active">
                          Active
                        </SelectItem>

                        <SelectItem value="Inactive">
                          Inactive
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                  <td>

                    <div className="flex gap-2">

                      <Button
                        type="button"
                        size={
                          "sm" as any
                        }
                        className="btn-theme-edit"
                      >
                        <Pencil
                          size={14}
                        />
                      </Button>

                      <Button
                        type="button"
                        size={
                          "sm" as any
                        }
                        className="btn-theme-reject"
                        onClick={() =>
                          deleteRow(
                            index
                          )
                        }
                      >
                        <Trash2
                          size={14}
                        />
                      </Button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* ================================= */}
      {/* IMPACT NOTE */}
      {/* ================================= */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">

          Cohort Impact Summary

        </h3>

        <div className="grid grid-cols-1 gap-4">

          <div>

            <Label>

              Amendment Impact On
              Cohorts

            </Label>

            <Textarea
              rows={5}
              placeholder="
Describe impact on cohort allocation,
enrollment strategy,
subject assignment,
randomization plan..."
            />

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* SUMMARY CARD */}
      {/* ================================= */}

      <div className="grid grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Total Cohorts
          </p>

          <h3 className="text-xl font-bold">

            {cohorts.length}

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Active Cohorts
          </p>

          <h3 className="text-xl font-bold">

            {
              cohorts.filter(
                (x) =>
                  x.status ===
                  "Active"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Inactive Cohorts
          </p>

          <h3 className="text-xl font-bold">

            {
              cohorts.filter(
                (x) =>
                  x.status ===
                  "Inactive"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Total Planned Enrollment
          </p>

          <h3 className="text-xl font-bold">

            {cohorts.reduce(
              (
                sum,
                row
              ) =>
                sum +
                Number(
                  row.targetEnrollment ||
                    0
                ),
              0
            )}

          </h3>

        </div>

      </div>

    </div>
  );
}