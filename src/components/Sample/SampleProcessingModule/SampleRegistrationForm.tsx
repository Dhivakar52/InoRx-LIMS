"use client";

import { Printer, RefreshCw } from "lucide-react";
import {  useEffect, useState } from "react";

const SampleRegistrationForm = () => {
  const [tests, setTests] = useState<string[]>([""]);
  const [barcodeRequired, setBarcodeRequired] = useState("Yes");
  const [barcode, setBarcode] = useState("");
  const [receivedDateTime, setReceivedDateTime] = useState("");
  const [collectionDateTime, setCollectionDateTime] = useState("");
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
  const generateBarcode = () => {
    const random = Math.floor(
      100000 + Math.random() * 900000
    );

    setBarcode(`BAR-${random}`);
  };
  useEffect(() => {
    if (barcodeRequired === "Yes") {
      generateBarcode();
    } else {
      setBarcode("");
    }
  }, [barcodeRequired]);
  const handlePrint = () => {
  const printContent = document.getElementById("barcode-print");

  if (!printContent) return;

  const printWindow = window.open("", "", "width=800,height=600");

  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Barcode</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .barcode-container {
            border: 1px solid #ccc;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            width: 320px;
          }

          .barcode-lines {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 2px;
            height: 90px;
            margin-bottom: 16px;
          }

          .line1 {
            width: 3px;
            height: 100%;
            background: black;
          }

          .line2 {
            width: 2px;
            height: 70%;
            background: black;
          }

          .line3 {
            width: 1px;
            height: 90%;
            background: black;
          }

          .barcode-text {
            letter-spacing: 6px;
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>

      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label className="text-sm font-medium">
          Study Code
        </label>
        <input
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Study Code" value="STUDY-001" disabled
        />
      </div>
        <div>
        <label className="text-sm font-medium">
          Subject ID
        </label>
        <input
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Subject ID"
          value="SUBJECT-001"
          disabled
        />
      </div>
      <div>
        <label className="text-sm font-medium">
          Department
        </label>

        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option value="">
            Select Department
          </option>
          <option value="Radiology">
            Radiology
          </option>
          <option value="Cardiology">
            Cardiology
          </option>
          <option value="Neurology">
            Neurology
          </option>
          <option value="Oncology">
            Oncology
          </option>
          <option value="Orthopedics">
            Orthopedics
          </option>
          <option value="Pathology">
            Pathology
          </option>
          <option value="Emergency Medicine">
            Emergency Medicine
          </option>
          <option value="Pediatrics">
            Pediatrics
          </option>
          <option value="Dermatology">
            Dermatology
          </option>
          <option value="General Medicine">
            General Medicine
          </option>
        </select>
      </div>
      <div>
        <label className="text-sm font-medium">
          Sponsor / CRO Name
        </label>
        <input
          className="w-full border rounded-md h-10 px-3 mt-1"
          placeholder="Enter Sponsor / CRO Name"
        />
      </div>
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
          Priority
        </label>
        <select className="w-full border rounded-md h-10 px-3 mt-1">
          <option>Routine</option>
          <option>Urgent</option>
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
        <div className="space-y-4">
          {tests.map((test, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-white">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-3">
                  <label className="text-sm font-medium">
                    Test Name
                  </label>

                  <select
                    value={test}
                    onChange={(e) =>
                      handleTestChange(
                        index,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-md h-10 px-3 mt-1"
                  >
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

                {/* Sample Type */}
                <div className="col-span-2">
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

                {/* Quantity */}
                <div className="col-span-1">
                  <label className="text-sm font-medium">
                    Quantity
                  </label>

                  <input
                    type="number"
                    className="w-full border rounded-md h-10 px-3 mt-1"
                    placeholder="Qty"
                  />
                </div>

                {/* Unit */}
                <div className="col-span-1">
                  <label className="text-sm font-medium">
                    Unit
                  </label>

                  <select className="w-full border rounded-md h-10 px-3 mt-1">
                    <option>mL</option>
                    <option>mg</option>
                    <option>µL</option>
                  </select>
                </div>

                {/* Sample Condition */}
                <div className="col-span-2">
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

                {/* Collection Date */}
                <div className="col-span-3">
                  <label className="text-sm font-medium">
                    Collection Date
                  </label>

                  <input
                    type="date"
                    className="w-full border rounded-md h-10 px-3 mt-1"
                  />
                </div>

                {/* Remarks */}
                <div className="col-span-10">
                  <label className="text-sm font-medium">
                    Remarks
                  </label>

                  <input
                    type="text"
                    className="w-full border rounded-md h-10 px-3 mt-1"
                    placeholder="Enter Remarks"
                  />
                </div>

                {/* Remove */}
                <div className="col-span-2 flex items-end">
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
                    }`}
                  >
                    Remove
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
      <label className="text-sm font-medium">
        Received Date & Time
      </label>

      <input
        type="datetime-local"
        value={receivedDateTime}
        onChange={(e) =>
          setReceivedDateTime(e.target.value)
        }
        className="w-full border rounded-md h-10 px-3 mt-1"
      />
    </div>
      <div>
      <label className="text-sm font-medium">
        Collection Date & Time
      </label>

      <input
        type="datetime-local"
        value={collectionDateTime }
        onChange={(e) =>
          setCollectionDateTime(e.target.value)
        }
        className="w-full border rounded-md h-10 px-3 mt-1"
      />
    </div>
      <div>
        <label className="text-sm font-medium">
          Generate Barcode Label
        </label>
        <select
          value={barcodeRequired}
          onChange={(e) =>
            setBarcodeRequired(
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3 mt-1">
          <option value="Yes">
            Yes
          </option>
          <option value="No">
            No
          </option>
        </select>
      </div>
      {barcodeRequired === "Yes" && (
     <div className="col-span-3 mt-6">
      <div className="border rounded-xl p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold">
              Barcode Preview
            </h3>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={generateBarcode}
                className="flex items-center gap-2 border border-[#00458F] text-[#00458F] px-4 py-2 rounded-md hover:bg-blue-50">
                <RefreshCw size={16} />
                Generate
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-2 bg-[#00458F] text-white px-4 py-2 rounded-md hover:bg-[#00366f]">
                
                <Printer size={16} />
                Print
              </button>

            </div>
          </div>

          <div id="barcode-print" className="bg-white border rounded-xl p-8 flex flex-col items-center">
            
            <div className="flex items-end gap-[2px] h-24">
              {[...Array(45)].map((_, index) => (
                <div
                  key={index}
                  className={`bg-black ${
                    index % 2 === 0
                      ? "w-[3px] h-full"
                      : index % 3 === 0
                      ? "w-[2px] h-[70%]"
                      : "w-[1px] h-[90%]"
                  }`}
                />
              ))}
            </div>

            <div className="mt-4 text-lg tracking-[6px] font-semibold">
              {barcode}
            </div>

            <div className="mt-3 text-sm text-gray-500">
              Sample Label Generated Successfully
            </div>
          </div>
        </div>
        </div>
        )}
    </div>
  );
};

export default SampleRegistrationForm;