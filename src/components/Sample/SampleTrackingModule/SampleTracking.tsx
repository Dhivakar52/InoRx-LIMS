"use client";

import {
  CheckCircle2,
  Clock3,
  MapPin,
  
  Package,
  Printer,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SampleTracking = () => {
  const navigate = useNavigate();

  const trackingSteps = [
    {
      title: "Sample Registered",
      date: "14-Jun-2026 09:00 AM",
      status: "completed",
    },
    {
      title: "Sample Collected",
      date: "14-Jun-2026 09:15 AM",
      status: "completed",
    },
    {
      title: "Sample Received",
      date: "14-Jun-2026 09:45 AM",
      status: "completed",
    },
    {
      title: "Screening Completed",
      date: "14-Jun-2026 11:00 AM",
      status: "completed",
    },
    {
      title: "Component Separation",
      date: "14-Jun-2026 11:45 AM",
      status: "completed",
    },
    {
      title: "Stored In Blood Bank",
      date: "14-Jun-2026 12:15 PM",
      status: "completed",
    },
    {
      title: "Ready For Issue",
      date: "Awaiting Request",
      status: "active",
    },
    {
      title: "Issued",
      date: "",
      status: "pending",
    },
  ];

  const movementHistory = [
    {
      date: "14-Jun-2026 09:15",
      from: "Collection Room",
      to: "Reception",
      by: "Nurse",
      status: "Completed",
    },
    {
      date: "14-Jun-2026 09:45",
      from: "Reception",
      to: "Screening Lab",
      by: "Technician",
      status: "Completed",
    },
    {
      date: "14-Jun-2026 11:30",
      from: "Screening Lab",
      to: "Component Lab",
      by: "Technician",
      status: "Completed",
    },
    {
      date: "14-Jun-2026 12:15",
      from: "Component Lab",
      to: "Storage",
      by: "Blood Bank Staff",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-8">

        {/* Header */}
        <div className="border-b pb-3">
          <h2 className="text-xl font-semibold text-[#00458F]">
            Sample Tracking
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Track sample movement and current location
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-blue-50 border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Sample ID
            </div>
            <div className="font-semibold text-lg">
              BB-20260001
            </div>
          </div>

          <div className="bg-blue-50 border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Donor ID
            </div>
            <div className="font-semibold text-lg">
              DON-10025
            </div>
          </div>

          <div className="bg-blue-50 border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Blood Group
            </div>
            <div className="font-semibold text-lg">
              O+
            </div>
          </div>

          <div className="bg-blue-50 border rounded-lg p-4">
            <div className="text-sm text-gray-500">
              Component
            </div>
            <div className="font-semibold text-lg">
              Packed RBC
            </div>
          </div>

        </div>

        {/* Current Status */}
        <div>
          <h3 className="text-lg font-semibold text-[#00458F] mb-4">
            Current Status
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">
                Current Status
              </div>

              <span className="inline-flex mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                Stored
              </span>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">
                Current Location
              </div>

              <div className="flex items-center gap-2 mt-2">
                <MapPin size={16} />
                Freezer F-01
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">
                Temperature
              </div>

              <div className="font-semibold mt-2">
                -30°C
              </div>
            </div>

          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-[#00458F] mb-6">
            Tracking Timeline
          </h3>

          <div className="space-y-6">

            {trackingSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <div>
                  {step.status === "completed" && (
                    <CheckCircle2
                      size={22}
                      className="text-green-600"
                    />
                  )}

                  {step.status === "active" && (
                    <Clock3
                      size={22}
                      className="text-blue-600"
                    />
                  )}

                  {step.status === "pending" && (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                </div>

                <div className="flex-1 border-l pl-4 pb-4">
                  <div className="font-medium">
                    {step.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {step.date}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Blood Bank Details */}
        <div>
          <h3 className="text-lg font-semibold text-[#00458F] mb-4">
            Blood Bank Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Blood Group
              </div>
              <div className="font-semibold">
                O Positive
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Bag Number
              </div>
              <div className="font-semibold">
                BAG-20260025
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Component Type
              </div>
              <div className="font-semibold">
                Packed RBC
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Screening Status
              </div>
              <div className="font-semibold text-green-600">
                Cleared
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Cross Match
              </div>
              <div className="font-semibold text-yellow-600">
                Pending
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="text-gray-500 text-sm">
                Expiry Date
              </div>
              <div className="font-semibold">
                14-Jul-2026
              </div>
            </div>

          </div>
        </div>

        {/* Movement History */}
        <div>
          <h3 className="text-lg font-semibold text-[#00458F] mb-4">
            Movement History
          </h3>

          <div className="overflow-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-[#00458F] text-white">
                <tr>
                  <th className="p-3 text-left">
                    Date & Time
                  </th>
                  <th className="p-3 text-left">
                    From
                  </th>
                  <th className="p-3 text-left">
                    To
                  </th>
                  <th className="p-3 text-left">
                    Action By
                  </th>
                  <th className="p-3 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {movementHistory.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {item.date}
                    </td>

                    <td className="p-3">
                      {item.from}
                    </td>

                    <td className="p-3">
                      {item.to}
                    </td>

                    <td className="p-3">
                      {item.by}
                    </td>

                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Back
          </button>

          <div className="flex gap-3">

            <button className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-500 text-white">
              <Package size={16} />
              View History
            </button>

            <button className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#00458F] text-white">
              <Printer size={16} />
              Print Report
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SampleTracking;