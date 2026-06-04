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

interface ConsentRow {
  subjectCode: string;
  subjectName: string;
  currentConsentVersion: string;
  newConsentVersion: string;
  consentDate: string;
  status: string;
}

export default function ReConsentTab() {

  const [reConsentRequired, setReConsentRequired] =
    useState("Yes");

  const [subjects, setSubjects] =
    useState<ConsentRow[]>([
      {
        subjectCode: "SUB001",
        subjectName: "John Doe",
        currentConsentVersion: "ICF V1.0",
        newConsentVersion: "ICF V2.0",
        consentDate: "",
        status: "Pending",
      },
    ]);

  const updateRow = (
    index: number,
    field: keyof ConsentRow,
    value: string
  ) => {

    const temp = [...subjects];
    temp[index][field] = value;
    setSubjects(temp);
  };

  return (
    <div className="space-y-5">

      {/* Re Consent Setup */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold text-lg mb-4">
          Re-Consent Configuration
        </h3>

        <div className="grid grid-cols-3 gap-4">

          <div>
            <Label>
              Re-Consent Required
            </Label>

            <Select
              value={reConsentRequired}
              onValueChange={
                setReConsentRequired
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
          </div>

          <div>
            <Label>
              Consent Form Version
            </Label>

            <Input
              placeholder="ICF V2.0"
            />
          </div>

          <div>
            <Label>
              Effective Date
            </Label>

            <Input type="date" />
          </div>

        </div>

      </div>

      {/* Consent Tracking */}

      <div className="border rounded-lg overflow-auto">

        <div className="p-4 border-b">

          <h3 className="font-semibold">
            Subject Consent Tracking
          </h3>

        </div>

        <table className="w-full">

          <thead>

            <tr>

              <th>
                Subject Code
              </th>

              <th>
                Subject Name
              </th>

              <th>
                Current Consent
              </th>

              <th>
                New Consent
              </th>

              <th>
                Consent Date
              </th>

              <th>
                Status
              </th>

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
                      row.currentConsentVersion
                    }
                  </td>

                  <td>
                    {
                      row.newConsentVersion
                    }
                  </td>

                  <td>

                    <Input
                      type="date"
                      value={
                        row.consentDate
                      }
                      onChange={(e) =>
                        updateRow(
                          index,
                          "consentDate",
                          e.target.value
                        )
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

                        <SelectItem value="Pending">
                          Pending
                        </SelectItem>

                        <SelectItem value="Completed">
                          Completed
                        </SelectItem>

                        <SelectItem value="Waived">
                          Waived
                        </SelectItem>

                      </SelectContent>

                    </Select>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Pending
          </p>

          <h3 className="text-2xl font-bold text-yellow-600">

            {
              subjects.filter(
                x =>
                  x.status ===
                  "Pending"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Completed
          </p>

          <h3 className="text-2xl font-bold text-green-600">

            {
              subjects.filter(
                x =>
                  x.status ===
                  "Completed"
              ).length
            }

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-xs text-gray-500">
            Waived
          </p>

          <h3 className="text-2xl font-bold text-blue-600">

            {
              subjects.filter(
                x =>
                  x.status ===
                  "Waived"
              ).length
            }

          </h3>

        </div>

      </div>

      {/* Regulatory Notes */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-3">
          Regulatory Notes
        </h3>

        <Textarea
          rows={5}
          placeholder="
Document re-consent rationale,
IRB approval reference,
regulatory impact,
compliance notes..."
        />

      </div>

      {/* Audit Trail */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-3">
          Consent Audit History
        </h3>

        <div className="text-sm text-gray-600">

          All consent status
          updates will be tracked
          in amendment audit logs.

        </div>

      </div>

      {/* Validation */}

      <div className="border rounded-lg p-4 bg-yellow-50">

        <h3 className="font-semibold mb-2">
          Validation Rules
        </h3>

        <ul className="list-disc pl-5 text-sm space-y-1">

          <li>
            Re-consent required
            subjects cannot be
            migrated without
            completed consent.
          </li>

          <li>
            Consent version must
            match approved
            amendment version.
          </li>

          <li>
            Consent date cannot
            be earlier than
            amendment effective
            date.
          </li>

        </ul>

      </div>

    </div>
  );
}