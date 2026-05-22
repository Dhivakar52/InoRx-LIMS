"use client";

import { useState } from "react";

const SampleRegistrationForm = () => {
  const [tests, setTests] = useState<string[]>([""]);

  const handleTestChange = (
    index: number,
    value: string
  ) => {
    const updated = [...tests];
    updated[index] = value;
    setTests(updated);
  };

  const addTestRequest = () => {
    setTests([...tests, ""]);
  };

  const removeTestRequest = (index: number) => {
    const updated = tests.filter((_, i) => i !== index);
    setTests(updated);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium">
          Sample ID
        </label>

        <input
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Sample ID"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Subject ID
        </label>

        <input
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Subject ID"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Sample Type
        </label>

        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option>Blood</option>
          <option>Urine</option>
          <option>Plasma</option>
          <option>Serum</option>
        </select>
      </div>

      <div className="col-span-3">
        <label className="text-sm font-medium">
          Sample Description
        </label>

        <textarea
          rows={4}
          className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
          placeholder="Enter sample description"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Quantity
        </label>

        <input
          type="number"
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Quantity"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Unit
        </label>

        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option>mL</option>
          <option>mg</option>
          <option>µL</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Sample Condition
        </label>

        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option>Good</option>
          <option>Hemolyzed</option>
          <option>Damaged</option>
          <option>Leaking</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Collection Date
        </label>

        <input
          type="date"
          className="w-full border rounded-md h-10 px-3 mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Received Date
        </label>

        <input
          type="date"
          className="w-full border rounded-md h-10 px-3 mt-1"
        />
      </div>

      <div>
        <label className="text-sm font-medium">
          Priority
        </label>

        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option>Routine</option>
          <option>Urgent</option>
          <option>STAT</option>
        </select>
      </div>

      <div className="col-span-3 mt-4">
        <div className="flex justify-between items-center mb-3">
          <label className="text-base font-semibold">
            Test Requests
          </label>

          <button
            type="button"
            onClick={addTestRequest}
            className="bg-[#00458F] text-white px-4 py-2 rounded-md text-sm">
            + Add Test
          </button>
        </div>

        <div className="space-y-3">
          {tests.map((test, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-3 items-end border rounded-lg p-4">
              
              <div className="col-span-5">
                <label className="text-sm font-medium">
                  Test Name
                </label>

                <select
                  value={test}
                  onChange={(e) =>
                    handleTestChange(index, e.target.value)
                  }
                  className="w-full border rounded-md h-10 px-3 mt-1">
                  <option value="">
                    Select Test
                  </option>

                  <option value="CBC">
                    CBC
                  </option>

                  <option value="LFT">
                    LFT
                  </option>

                  <option value="KFT">
                    KFT
                  </option>

                  <option value="HbA1c">
                    HbA1c
                  </option>

                  <option value="PCR">
                    PCR
                  </option>
                </select>
              </div>

              <div className="col-span-5">
                <label className="text-sm font-medium">
                  Remarks
                </label>

                <input
                  className="w-full border rounded-md h-10 px-3 mt-1"
                  placeholder="Enter Remarks"
                />
              </div>

              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    removeTestRequest(index)
                  }
                  disabled={tests.length === 1}
                  className={`w-full h-10 rounded-md text-sm ${
                    tests.length === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-red-100 text-red-600"
                  }`}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SampleRegistrationForm;