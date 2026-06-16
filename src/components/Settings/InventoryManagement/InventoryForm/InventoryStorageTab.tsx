interface Props {
  formData: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  errors: any;
}

export default function InventoryStorageTab({
  formData,
  handleChange,
  errors,
}: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">

      {/* Facility / Site */}
      <div>
        <label className="block mb-1 font-medium">
          Facility / Site
          <span className="text-red-500 ml-1">*</span>
        </label>

        <select
          value={formData.facility}
          onChange={(e) =>
            handleChange(
              "facility",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select Facility
          </option>

          <option value="Boston General Hospital">
            Boston General Hospital
          </option>

          <option value="London Research Center">
            London Research Center
          </option>

          <option value="New York Clinical Lab">
            New York Clinical Lab
          </option>

          <option value="Singapore Bio Repository">
            Singapore Bio Repository
          </option>
        </select>

        {errors.facility && (
          <p className="text-red-500 text-xs mt-1">
            {errors.facility}
          </p>
        )}
      </div>

      {/* Storage Room */}
      <div>
        <label className="block mb-1 font-medium">
          Storage Room / Lab Name
        </label>

        <input
          type="text"
          value={formData.storageRoom}
          onChange={(e) =>
            handleChange(
              "storageRoom",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Enter Storage Room"
        />
      </div>

      {/* Storage Equipment */}
      <div>
        <label className="block mb-1 font-medium">
          Storage Equipment
          <span className="text-red-500 ml-1">*</span>
        </label>

        <select
          value={formData.storageEquipment}
          onChange={(e) =>
            handleChange(
              "storageEquipment",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select Equipment
          </option>

          <option value="Refrigerator #1 (2-8°C)">
            Refrigerator #1 (2-8°C)
          </option>

          <option value="Refrigerator #2 (2-8°C)">
            Refrigerator #2 (2-8°C)
          </option>

          <option value="Freezer #1 (-20°C)">
            Freezer #1 (-20°C)
          </option>

          <option value="Freezer #2 (-80°C)">
            Freezer #2 (-80°C)
          </option>

          <option value="Liquid Nitrogen Tank">
            Liquid Nitrogen Tank
          </option>
        </select>

        {errors.storageEquipment && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storageEquipment}
          </p>
        )}
      </div>

      {/* Shelf / Bin */}
      <div>
        <label className="block mb-1 font-medium">
          Shelf / Bin Location
        </label>

        <input
          type="text"
          value={formData.shelfBin}
          onChange={(e) =>
            handleChange(
              "shelfBin",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
          placeholder="Ex: Shelf A / Bin 12"
        />
      </div>

    </div>
  );
}