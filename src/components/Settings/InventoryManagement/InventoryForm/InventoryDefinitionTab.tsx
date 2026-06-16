interface Props {
  formData: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  errors: any;
}

export default function InventoryDefinitionTab({
  formData,
  handleChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Item Name */}
      <div>
        <label className="block mb-1 font-medium">
          Item Name
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          value={formData.itemName}
          onChange={(e) =>
            handleChange(
              "itemName",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Item Name"
        />

        {errors.itemName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.itemName}
          </p>
        )}
      </div>

      {/* Item Category */}
      <div>
        <label className="block mb-1 font-medium">
          Item Category
          <span className="text-red-500 ml-1">*</span>
        </label>

        <select
          value={formData.itemCategory}
          onChange={(e) =>
            handleChange(
              "itemCategory",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select Category
          </option>

          <option value="Extraction Kit">
            Extraction Kit
          </option>

          <option value="PCR Reagent">
            PCR Reagent
          </option>

          <option value="Consumable">
            Consumable
          </option>

          <option value="Buffer">
            Buffer
          </option>

          <option value="Control Material">
            Control Material
          </option>
        </select>

        {errors.itemCategory && (
          <p className="text-red-500 text-xs mt-1">
            {errors.itemCategory}
          </p>
        )}
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block mb-1 font-medium">
          Manufacturer / Vendor
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          value={formData.vendor}
          onChange={(e) =>
            handleChange(
              "vendor",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Manufacturer"
        />

        {errors.vendor && (
          <p className="text-red-500 text-xs mt-1">
            {errors.vendor}
          </p>
        )}
      </div>

      {/* Catalog Number */}
      <div>
        <label className="block mb-1 font-medium">
          Catalog Number / SKU
          <span className="text-red-500 ml-1">*</span>
        </label>

        <input
          type="text"
          value={formData.catalogNumber}
          onChange={(e) =>
            handleChange(
              "catalogNumber",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Catalog Number"
        />

        {errors.catalogNumber && (
          <p className="text-red-500 text-xs mt-1">
            {errors.catalogNumber}
          </p>
        )}
      </div>

    </div>
  );
}