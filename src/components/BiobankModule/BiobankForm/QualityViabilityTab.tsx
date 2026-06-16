export default function QualityViabilityTab({
  formData,
  handleChange,
  errors,
}: any) {
  return (
    <div className="grid grid-cols-3 gap-4">

      <div>
        <label>
          Current Freeze-Thaw Cycles <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          value={
            formData.freezeThawCycles
          }
          onChange={(e) =>
            handleChange(
              "freezeThawCycles",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.freezeThawCycles && (
          <p className="text-red-500 text-xs">
            {errors.freezeThawCycles}
          </p>
        )}
      </div>

      <div>
        <label>
          Viability Score / RIN
        </label>

        <input
          value={
            formData.viabilityScore
          }
          onChange={(e) =>
            handleChange(
              "viabilityScore",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />
      </div>

      <div>
        <label>
          Extraction / Prep Method
        </label>

        <input
          value={
            formData.extractionMethod
          }
          onChange={(e) =>
            handleChange(
              "extractionMethod",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />
      </div>

    </div>
  );
}