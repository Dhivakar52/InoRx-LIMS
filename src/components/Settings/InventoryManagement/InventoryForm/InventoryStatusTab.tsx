interface Props {
  formData: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  errors: any;
}

export default function InventoryStatusTab({
  formData,
  handleChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Low Stock Alert Threshold */}
      <div>
        <label className="block mb-1 font-medium">
          Low Stock Alert Threshold (Units)
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="number"
          min="0"
          value={formData.lowStockThreshold}
          onChange={(e) =>
            handleChange(
              "lowStockThreshold",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Threshold"
        />

        {errors.lowStockThreshold && (
          <p className="text-red-500 text-xs mt-1">
            {errors.lowStockThreshold}
          </p>
        )}
      </div>

      {/* Expiry Alert Trigger */}
      <div>
        <label className="block mb-1 font-medium">
          Expiry Alert Trigger
          <span className="text-red-500 ml-1">*</span>
        </label>

        <select
          value={formData.expiryAlert}
          onChange={(e) =>
            handleChange(
              "expiryAlert",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select Alert Trigger
          </option>

          <option value="30 Days Before Expiry">
            30 Days Before Expiry
          </option>

          <option value="60 Days Before Expiry">
            60 Days Before Expiry
          </option>

          <option value="90 Days Before Expiry">
            90 Days Before Expiry
          </option>

          <option value="120 Days Before Expiry">
            120 Days Before Expiry
          </option>
        </select>

        {errors.expiryAlert && (
          <p className="text-red-500 text-xs mt-1">
            {errors.expiryAlert}
          </p>
        )}
      </div>

      {/* Initial Lifecycle Status */}
      <div>
        <label className="block mb-1 font-medium">
          Initial Lifecycle Status
          <span className="text-red-500 ml-1">*</span>
        </label>

        <select
          value={formData.lifecycleStatus}
          onChange={(e) =>
            handleChange(
              "lifecycleStatus",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select Status
          </option>

          <option value="QUARANTINED (PENDING QC)">
            QUARANTINED (PENDING QC)
          </option>

          <option value="ACTIVE">
            ACTIVE
          </option>

          <option value="LOW STOCK">
            LOW STOCK
          </option>

          <option value="EXPIRED">
            EXPIRED
          </option>

          <option value="DISPOSED">
            DISPOSED
          </option>
        </select>

        {errors.lifecycleStatus && (
          <p className="text-red-500 text-xs mt-1">
            {errors.lifecycleStatus}
          </p>
        )}
      </div>

      {/* Receipt Notes */}
      <div>
        <label className="block mb-1 font-medium">
          Receipt Notes
        </label>

        <input
          type="text"
          value={formData.receiptNotes}
          onChange={(e) =>
            handleChange(
              "receiptNotes",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Notes"
        />
      </div>

      {/* Full Width Notes Area (Optional Alternative) */}
      <div className="col-span-2">
        <label className="block mb-1 font-medium">
          Additional Remarks
        </label>

        <textarea
          rows={4}
          value={formData.receiptNotes}
          onChange={(e) =>
            handleChange(
              "receiptNotes",
              e.target.value
            )
          }
          className="w-full border rounded-md p-3"
          placeholder="Enter additional inventory remarks..."
        />
      </div>

    </div>
  );
}