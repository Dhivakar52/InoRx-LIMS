export default function AliquotDetailsTab({
  formData,
  handleChange,
  errors,
  readOnly = false,
}: any) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div>
        <label>
          Biobank Sample ID  <span className="text-red-500">*</span>
        </label>

        <input
          value={
            formData.biobankSampleId
          }
          onChange={(e) =>
            handleChange(
              "biobankSampleId",
              e.target.value
            )
          }
          readOnly={readOnly} 
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.biobankSampleId && (
          <p className="text-red-500 text-xs">
            {errors.biobankSampleId}
          </p>
        )}
      </div>

      <div>
        <label>
          Initial Volume  <span className="text-red-500">*</span>
        </label>

        <input
          value={
            formData.initialVolume
          }
          onChange={(e) =>
            handleChange(
              "initialVolume",
              e.target.value
            )
          }
          readOnly={readOnly}
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.initialVolume && (
          <p className="text-red-500 text-xs">
            {errors.initialVolume}
          </p>
        )}
      </div>

      <div>
        <label>
          Preservation Date  <span className="text-red-500">*</span>
        </label>

        <input    
          type="date"
          value={
            formData.preservationDate
          }
          onChange={(e) =>
            handleChange(
              "preservationDate",
              e.target.value
            )
          }
          readOnly={readOnly}
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.preservationDate && (
          <p className="text-red-500 text-xs">
            {errors.preservationDate}
          </p>
        )}
      </div>

      <div>
        <label>
          Storage Equipment  <span className="text-red-500">*</span>
        </label>

        <input
          value={
            formData.storageEquipment
          } 
          onChange={(e) =>
            handleChange(
              "storageEquipment",
              e.target.value
            )
          }     
          readOnly={readOnly}
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.storageEquipment && (
          <p className="text-red-500 text-xs">
            {errors.storageEquipment}
          </p>
        )}
      </div>
    </div>
  );
}