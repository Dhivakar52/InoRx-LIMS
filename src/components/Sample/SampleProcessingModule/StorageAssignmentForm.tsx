"use client";

import { Snowflake, MapPin, Archive } from "lucide-react";

const StorageAssignmentForm = () => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Storage Assignment
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Assign sample storage location and monitor conditions
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div>
          <label className="text-sm font-medium">
            Storage Location
          </label>

          <div className="relative mt-1">
            <MapPin
              size={16}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              className="w-full border rounded-md h-10 pl-10 pr-3"
              placeholder="Enter Storage Location"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Freezer ID
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Enter Freezer ID"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Storage Type
          </label>

          <select className="w-full border rounded-md h-10 px-3 mt-1">
            <option>Freezer</option>
            <option>Cold Room</option>
            <option>Refrigerator</option>
            <option>Ambient</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">
            Rack Number
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Enter Rack Number"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Shelf Number
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Enter Shelf Number"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Box Number
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Enter Box Number"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Position
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Ex: A1 / B2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Temperature
          </label>

          <div className="relative mt-1">
            <Snowflake
              size={16}
              className="absolute left-3 top-3 text-blue-500"
            />

            <input
              className="w-full border rounded-md h-10 pl-10 pr-3"
              placeholder="-20°C"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">
            Storage Status
          </label>

          <select className="w-full border rounded-md h-10 px-3 mt-1">
            <option>Assigned</option>
            <option>Pending</option>
            <option>Transferred</option>
            <option>Disposed</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">
            Assigned Date
          </label>

          <input
            type="date"
            className="w-full border rounded-md h-10 px-3 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Assigned By
          </label>

          <input
            className="w-full border rounded-md h-10 px-3 mt-1"
            placeholder="Enter User Name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Retention Period
          </label>

          <select className="w-full border rounded-md h-10 px-3 mt-1">
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
            <option>1 Year</option>
            <option>Permanent</option>
          </select>
        </div>

        <div className="col-span-3">
          <label className="text-sm font-medium">
            Storage Remarks
          </label>

          <textarea
            rows={4}
            className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
            placeholder="Enter storage remarks"
          />
        </div>
      </div>

    </div>
  );
};

export default StorageAssignmentForm;