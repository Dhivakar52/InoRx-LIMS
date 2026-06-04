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
} from "lucide-react";

interface ProtocolChange {
  sectionName: string;
  changeType: string;
  oldValue: string;
  newValue: string;
  reason: string;
  regulatoryImpact: string;
  subjectImpact: string;
}

export default function ProtocolChangesTab() {

  const [changes, setChanges] =
    useState<ProtocolChange[]>([
      {
        sectionName: "",
        changeType: "",
        oldValue: "",
        newValue: "",
        reason: "",
        regulatoryImpact: "No",
        subjectImpact: "No",
      },
    ]);

  const addRow = () => {

    setChanges([
      ...changes,
      {
        sectionName: "",
        changeType: "",
        oldValue: "",
        newValue: "",
        reason: "",
        regulatoryImpact: "No",
        subjectImpact: "No",
      },
    ]);

  };

  const removeRow = (
    index: number
  ) => {

    setChanges(
      changes.filter(
        (_, i) => i !== index
      )
    );

  };

  const updateRow = (
    index: number,
    field: keyof ProtocolChange,
    value: string
  ) => {

    const temp = [...changes];

    temp[index][field] = value;

    setChanges(temp);
  };

  return (
    <div className="space-y-5">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-lg font-semibold">

            Protocol Changes

          </h3>

          <p className="text-sm text-gray-500">

            Define all protocol modifications
            introduced by this amendment.

          </p>

        </div>

        <Button
          type="button"
          className="btn-theme-save"
          onClick={addRow}
        >
          <Plus size={16} />

          Add Change

        </Button>

      </div>

      {/* Change Grid */}

      <div className="overflow-auto border rounded-lg">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50">

              <th>Section</th>

              <th>Change Type</th>

              <th>Old Value</th>

              <th>New Value</th>

              <th>Reason</th>

              <th>Regulatory</th>

              <th>Subject</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {changes.map(
              (
                row,
                index
              ) => (

                <tr key={index}>

                  {/* Section */}

                  <td>

                    <Input
                      placeholder="Eligibility Criteria"
                      value={
                        row.sectionName
                      }
                      onChange={(e) =>
                        updateRow(
                          index,
                          "sectionName",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  {/* Change Type */}

                  <td>

                    <Select
                      value={
                        row.changeType
                      }
                      onValueChange={(v) =>
                        updateRow(
                          index,
                          "changeType",
                          v
                        )
                      }
                    >

                      <SelectTrigger>

                        <SelectValue placeholder="Select" />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="Added">
                          Added
                        </SelectItem>

                        <SelectItem value="Modified">
                          Modified
                        </SelectItem>

                        <SelectItem value="Removed">
                          Removed
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                  {/* Old */}

                  <td>

                    <Textarea
                      rows={3}
                      value={
                        row.oldValue
                      }
                      onChange={(e) =>
                        updateRow(
                          index,
                          "oldValue",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  {/* New */}

                  <td>

                    <Textarea
                      rows={3}
                      value={
                        row.newValue
                      }
                      onChange={(e) =>
                        updateRow(
                          index,
                          "newValue",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  {/* Reason */}

                  <td>

                    <Textarea
                      rows={3}
                      value={
                        row.reason
                      }
                      onChange={(e) =>
                        updateRow(
                          index,
                          "reason",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  {/* Regulatory */}

                  <td>

                    <Select
                      value={
                        row.regulatoryImpact
                      }
                      onValueChange={(v) =>
                        updateRow(
                          index,
                          "regulatoryImpact",
                          v
                        )
                      }
                    >

                      <SelectTrigger>

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="Yes">
                          Yes
                        </SelectItem>

                        <SelectItem value="No">
                          No
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                  {/* Subject */}

                  <td>

                    <Select
                      value={
                        row.subjectImpact
                      }
                      onValueChange={(v) =>
                        updateRow(
                          index,
                          "subjectImpact",
                          v
                        )
                      }
                    >

                      <SelectTrigger>

                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="Yes">
                          Yes
                        </SelectItem>

                        <SelectItem value="No">
                          No
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                  {/* Delete */}

                  <td>

                    <Button
                      type="button"
                      className="btn-theme-reject"
                      onClick={() =>
                        removeRow(
                          index
                        )
                      }
                    >
                      <Trash2
                        size={14}
                      />
                    </Button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* Impact Assessment */}

      <div className="border rounded-lg p-5">

        <h3 className="font-semibold mb-4">

          Protocol Impact Assessment

        </h3>

        <div className="grid grid-cols-2 gap-4">

          <div>

            <Label>
              Overall Impact Summary
            </Label>

            <Textarea
              rows={5}
              placeholder="
Describe amendment impact on protocol execution,
study conduct,
data collection,
subject safety..."
            />

          </div>

          <div>

            <Label>
              Risk Assessment
            </Label>

            <Textarea
              rows={5}
              placeholder="
Risk introduced by protocol change,
mitigation strategy,
monitoring plan..."
            />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">

            Total Changes

          </p>

          <h3 className="text-2xl font-bold">

            {changes.length}

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">

            Added

          </p>

          <h3 className="text-2xl font-bold text-green-600">

            {
              changes.filter(
                x =>
                  x.changeType ===
                  "Added"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">

            Modified

          </p>

          <h3 className="text-2xl font-bold text-yellow-600">

            {
              changes.filter(
                x =>
                  x.changeType ===
                  "Modified"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">

            Removed

          </p>

          <h3 className="text-2xl font-bold text-red-600">

            {
              changes.filter(
                x =>
                  x.changeType ===
                  "Removed"
              ).length
            }

          </h3>

        </div>

      </div>

    </div>
  );
}