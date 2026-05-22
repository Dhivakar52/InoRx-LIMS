"use client";

import { useState } from "react";
import {
  FlaskConical,
  Building2,
  User,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const TestAssignmentForm = () => {
  // ✅ THESE TESTS COME FROM SAMPLE REGISTRATION
  const [testAssignments, setTestAssignments] =
    useState([
      {
        id: 1,
        testName: "CBC",
        assignedLab: "",
        assignedTo: "",
        priority: "Routine",
        status: "Pending",
        expectedDate: "",
      },
      {
        id: 2,
        testName: "LFT",
        assignedLab: "",
        assignedTo: "",
        priority: "Urgent",
        status: "Pending",
        expectedDate: "",
      },
      {
        id: 3,
        testName: "PCR",
        assignedLab: "",
        assignedTo: "",
        priority: "Routine",
        status: "Pending",
        expectedDate: "",
      },
    ]);

  const handleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...testAssignments];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setTestAssignments(updated);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Test Assignment
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Assign laboratory and technician for
          requested tests
        </p>
      </div>

      {/* SAMPLE INFO */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-xs text-gray-500">
            Sample ID
          </div>

          <div className="font-semibold mt-1">
            SMP-0001
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-xs text-gray-500">
            Subject ID
          </div>

          <div className="font-semibold mt-1">
            SUB-1001
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-xs text-gray-500">
            Sample Type
          </div>

          <div className="font-semibold mt-1">
            Blood
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="text-xs text-gray-500">
            Total Tests
          </div>

          <div className="font-semibold mt-1 text-[#00458F]">
            {testAssignments.length}
          </div>
        </div>
      </div>

      {/* TEST LIST */}
      <div className="space-y-5">
        {testAssignments.map((test, index) => (
          <div
            key={test.id}
            className="border rounded-xl p-5 bg-white shadow-sm">
            
            {/* TEST HEADER */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-[#00458F] p-2 rounded-lg">
                  <FlaskConical size={18} />
                </div>

                <div>
                  <h3 className="font-semibold text-base">
                    {test.testName}
                  </h3>

                  <p className="text-xs text-gray-500">
                    Requested Test
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  test.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : test.status === "In Progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                {test.status}
              </span>
            </div>

            {/* FORM */}
            <div className="grid grid-cols-3 gap-5">
              {/* ASSIGNED LAB */}
              <div>
                <label className="text-sm font-medium">
                  Assigned Lab
                </label>

                <div className="relative mt-1">
                  <Building2
                    size={16}
                    className="absolute left-3 top-3 text-gray-500"
                  />

                  <select
                    value={test.assignedLab}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "assignedLab",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-md h-10 pl-10 pr-3">
                    
                    <option value="">
                      Select Lab
                    </option>

                    <option value="Central Lab">
                      Central Lab
                    </option>

                    <option value="Bio Chemistry Lab">
                      Bio Chemistry Lab
                    </option>

                    <option value="Molecular Lab">
                      Molecular Lab
                    </option>
                  </select>
                </div>
              </div>

              {/* ASSIGNED TO */}
              <div>
                <label className="text-sm font-medium">
                  Assigned Technician
                </label>

                <div className="relative mt-1">
                  <User
                    size={16}
                    className="absolute left-3 top-3 text-gray-500"
                  />

                  <select
                    value={test.assignedTo}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "assignedTo",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-md h-10 pl-10 pr-3">
                    
                    <option value="">
                      Select Technician
                    </option>

                    <option value="John">
                      John
                    </option>

                    <option value="David">
                      David
                    </option>

                    <option value="Arun">
                      Arun
                    </option>
                  </select>
                </div>
              </div>

              {/* PRIORITY */}
              <div>
                <label className="text-sm font-medium">
                  Priority
                </label>

                <select
                  value={test.priority}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "priority",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md h-10 px-3 mt-1">
                  
                  <option>Routine</option>
                  <option>Urgent</option>
                  <option>STAT</option>
                </select>
              </div>

              {/* EXPECTED DATE */}
              <div>
                <label className="text-sm font-medium">
                  Expected Completion
                </label>

                <div className="relative mt-1">
                  <Clock3
                    size={16}
                    className="absolute left-3 top-3 text-gray-500"
                  />

                  <input
                    type="date"
                    value={test.expectedDate}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "expectedDate",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-md h-10 pl-10 pr-3"
                  />
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm font-medium">
                  Test Status
                </label>

                <select
                  value={test.status}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "status",
                      e.target.value
                    )
                  }
                  className="w-full border rounded-md h-10 px-3 mt-1">
                  
                  <option>Pending</option>
                  <option>Assigned</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              {/* REMARKS */}
              <div className="col-span-3">
                <label className="text-sm font-medium">
                  Remarks
                </label>

                <textarea
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
                  placeholder={`Enter remarks for ${test.testName}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="border rounded-xl bg-gray-50 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-green-100 text-green-700 p-3 rounded-lg">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Assignment Summary
            </h3>

            <p className="text-sm text-gray-500">
              Overall test assignment status
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border rounded-lg p-4">
            <div className="text-xs text-gray-500">
              Total Tests
            </div>

            <div className="font-semibold mt-1 text-lg">
              {testAssignments.length}
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="text-xs text-gray-500">
              Pending
            </div>

            <div className="font-semibold mt-1 text-yellow-600">
              {
                testAssignments.filter(
                  (x) => x.status === "Pending"
                ).length
              }
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="text-xs text-gray-500">
              Assigned
            </div>

            <div className="font-semibold mt-1 text-blue-600">
              {
                testAssignments.filter(
                  (x) => x.status === "Assigned"
                ).length
              }
            </div>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <div className="text-xs text-gray-500">
              Completed
            </div>

            <div className="font-semibold mt-1 text-green-600">
              {
                testAssignments.filter(
                  (x) =>
                    x.status === "Completed"
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAssignmentForm;