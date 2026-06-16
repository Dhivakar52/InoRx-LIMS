interface Props {
  formData: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  errors: any;
}

export default function InventoryLotTab({
  formData,
  handleChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Lot Number */}
      <div>
        <label className="block mb-1 font-medium">
          Lot / Batch Number
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          value={formData.lotNumber}
          onChange={(e) =>
            handleChange(
              "lotNumber",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Lot Number"
        />

        {errors.lotNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.lotNumber}
          </p>
        )}
      </div>

      {/* Quantity Received */}
      <div>
        <label className="block mb-1 font-medium">
          Quantity Received (Units)
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="number"
          min="0"
          value={formData.quantityReceived}
          onChange={(e) =>
            handleChange(
              "quantityReceived",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Quantity"
        />

        {errors.quantityReceived && (
          <p className="text-red-500 text-xs mt-1">
            {errors.quantityReceived}
          </p>
        )}
      </div>

      {/* Receipt Date */}
      <div>
        <label className="block mb-1 font-medium">
          Date of Receipt
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="date"
          value={formData.receiptDate}
          onChange={(e) =>
            handleChange(
              "receiptDate",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />

        {errors.receiptDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.receiptDate}
          </p>
        )}
      </div>

      {/* Expiration Date */}
      <div>
        <label className="block mb-1 font-medium">
          Expiration Date
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="date"
          value={formData.expirationDate}
          onChange={(e) =>
            handleChange(
              "expirationDate",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />

        {errors.expirationDate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.expirationDate}
          </p>
        )}
      </div>

    </div>
  );
}