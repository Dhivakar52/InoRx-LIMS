"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  FilePenLine,
} from "lucide-react";

export default function ProtocolConfigurations() {
  const [arms, setArms] = useState([
    { code: "ARM-A", name: "Cohort A", target: 120 },
    { code: "ARM-B", name: "Cohort B", target: 180 },
    { code: "ARM-C", name: "Cohort C", target: 150 },
  ]);

  const [visits, setVisits] = useState([
    {
      name: "Screening",
      day: "Day -14 to -1",
      margin: "+/- 2 days",
      tube: "EDTA Lavender",
    },
    {
      name: "Visit 1",
      day: "Day 0",
      margin: "+/- 1 day",
      tube: "Serum Red",
    },
    {
      name: "Visit 2",
      day: "Day 7",
      margin: "+/- 2 days",
      tube: "EDTA Lavender",
    },
    {
      name: "Visit 3",
      day: "Day 15",
      margin: "+/- 2 days",
      tube: "Serum Red",
    },
    {
      name: "Visit 4",
      day: "Day 28",
      margin: "+/- 3 days",
      tube: "EDTA Lavender",
    },
  ]);

  const totalTarget = arms.reduce(
    (sum, arm) => sum + Number(arm.target),
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        {/* Arms */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">
              Study Arms & Cohorts
            </h3>

            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-blue-600 hover:bg-blue-50">
              <Plus size={16} />
              Add Arm
            </button>
          </div>

          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 border">Arm Code</th>
                  <th className="p-3 border">Cohort Name</th>
                  <th className="p-3 border">Target Enrollment</th>
                  <th className="p-3 border"></th>
                </tr>
              </thead>

              <tbody>
                {arms.map((arm, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <input
                        value={arm.code}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        value={arm.name}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        type="number"
                        value={arm.target}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border text-center">
                      <Trash2
                        size={18}
                        className="mx-auto text-gray-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between p-4 font-medium">
              <span>Total Target Enrollment</span>
              <span>{totalTarget}</span>
            </div>
          </div>
        </div>

        {/* Visits */}
        <div className="bg-white border rounded-lg shadow-sm">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold text-lg">
              Visit Template Grid
            </h3>

            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-blue-600 hover:bg-blue-50">
              <Plus size={16} />
              Add Visit
            </button>
          </div>

          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="p-3 border">Visit Name</th>
                  <th className="p-3 border">Target Day</th>
                  <th className="p-3 border">Deviation Margin</th>
                  <th className="p-3 border">Tube Type</th>
                  <th className="p-3 border"></th>
                </tr>
              </thead>

              <tbody>
                {visits.map((visit, index) => (
                  <tr key={index}>
                    <td className="border p-2">
                      <input
                        value={visit.name}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        value={visit.day}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border p-2">
                      <input
                        value={visit.margin}
                        className="w-full border rounded px-2 py-2"
                        readOnly
                      />
                    </td>

                    <td className="border p-2">
                      <select
                        value={visit.tube}
                        className="w-full border rounded px-2 py-2"
                      >
                        <option>EDTA Lavender</option>
                        <option>Serum Red</option>
                      </select>
                    </td>

                    <td className="border text-center">
                      <Trash2
                        size={18}
                        className="mx-auto text-gray-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Test Panels */}
      <div className="bg-white border rounded-lg shadow-sm mt-5 p-5">
        <h3 className="font-semibold mb-5">
          Associated Test Panels
        </h3>

        <div className="grid md:grid-cols-4 gap-6">
          {["CBC", "CMP", "Lipid Profile", "PK Assay"].map(
            (panel) => (
              <label
                key={panel}
                className="flex items-center gap-3"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4"
                />
                {panel}
              </label>
            )
          )}
        </div>
      </div>

      {/* Footer */}
      {/* <div className="flex justify-end gap-4 mt-6">
        <button className="px-6 py-3 border rounded-md font-medium">
          Save Draft
        </button>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700">
          Submit for Review
        </button>
      </div> */}
    </div>
  );
}