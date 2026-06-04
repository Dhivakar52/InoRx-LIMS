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

interface VisitRow {
  visitName: string;
  currentDay: string;
  newDay: string;
  windowBefore: string;
  windowAfter: string;
  specimenRequired: string;
  status: string;
  specimenCollected: boolean;
}

export default function VisitScheduleTab() {

  const [visits, setVisits] =
    useState<VisitRow[]>([
      {
        visitName: "",
        currentDay: "",
        newDay: "",
        windowBefore: "",
        windowAfter: "",
        specimenRequired: "No",
        status: "Active",
        specimenCollected: false,
      },
    ]);

  const addVisit = () => {
    setVisits([
      ...visits,
      {
        visitName: "",
        currentDay: "",
        newDay: "",
        windowBefore: "",
        windowAfter: "",
        specimenRequired: "No",
        status: "Active",
        specimenCollected: false,
      },
    ]);
  };

  const updateVisit = (
    index: number,
    field: keyof VisitRow,
    value: any
  ) => {
    const temp = [...visits];
    // temp[index][field] = value;
    setVisits(temp);
  };

  const removeVisit = (
    index: number
  ) => {

    const row = visits[index];

    if (row.specimenCollected) {

      alert(
        "Collected specimen visit cannot be deleted. Mark as inactive."
      );

      return;
    }

    setVisits(
      visits.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="space-y-5">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h3 className="font-semibold text-lg">
          Visit Schedule Configuration
        </h3>

        <Button
          type="button"
          className="btn-theme-save"
          onClick={addVisit}
        >
          <Plus size={16} />
          Add Visit
        </Button>

      </div>

      {/* Grid */}

      <div className="overflow-auto border rounded-lg">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50">

              <th>Visit</th>

              <th>
                Current Day
              </th>

              <th>
                New Day
              </th>

              <th>
                Window -
              </th>

              <th>
                Window +
              </th>

              <th>
                Specimen
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

            {visits.map(
              (
                row,
                index
              ) => (

                <tr key={index}>

                  <td>

                    <Input
                      value={
                        row.visitName
                      }
                      onChange={(e) =>
                        updateVisit(
                          index,
                          "visitName",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      value={
                        row.currentDay
                      }
                      onChange={(e) =>
                        updateVisit(
                          index,
                          "currentDay",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      value={
                        row.newDay
                      }
                      onChange={(e) =>
                        updateVisit(
                          index,
                          "newDay",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      value={
                        row.windowBefore
                      }
                      onChange={(e) =>
                        updateVisit(
                          index,
                          "windowBefore",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Input
                      value={
                        row.windowAfter
                      }
                      onChange={(e) =>
                        updateVisit(
                          index,
                          "windowAfter",
                          e.target.value
                        )
                      }
                    />

                  </td>

                  <td>

                    <Select
                      value={
                        row.specimenRequired
                      }
                      onValueChange={(v) =>
                        updateVisit(
                          index,
                          "specimenRequired",
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

                  <td>

                    <Select
                      value={
                        row.status
                      }
                      onValueChange={(v) =>
                        updateVisit(
                          index,
                          "status",
                          v
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

                    <Button
                      type="button"
                      className="btn-theme-reject"
                      onClick={() =>
                        removeVisit(
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

      {/* Visit Impact */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">
          Visit Schedule Impact
        </h3>

        <Textarea
          rows={5}
          placeholder="
Describe visit timing changes,
patient impact,
lab collection changes,
schedule impact..."
        />

      </div>

      {/* Delta Preview */}

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">
          Amendment Delta Preview
        </h3>

        <div className="overflow-auto">

          <table className="w-full">

            <thead>

              <tr>

                <th>Visit</th>

                <th>Old Day</th>

                <th>New Day</th>

                <th>
                  Change Type
                </th>

              </tr>

            </thead>

            <tbody>

              {visits
                .filter(
                  (x) =>
                    x.currentDay !==
                    x.newDay
                )
                .map(
                  (
                    row,
                    index
                  ) => (

                    <tr key={index}>

                      <td>
                        {
                          row.visitName
                        }
                      </td>

                      <td>
                        {
                          row.currentDay
                        }
                      </td>

                      <td>
                        {
                          row.newDay
                        }
                      </td>

                      <td>

                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">

                          Modified

                        </span>

                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}