export default function ConsentRetentionTab({
  formData,
  handleChange,
  errors,
}: any) {
  return (
    <div className="grid grid-cols-2 gap-4">

      <div>
        <label>
          Patient Consent Status <span className="text-red-500">*</span>                
        </label>

        <select
          value={
            formData.consentStatus
          }
          onChange={(e) =>
            handleChange(
              "consentStatus",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select
          </option>

          <option>
            Broad Future Research (De-identified)
          </option>

          <option>
            Specific Disease Research
          </option>

          <option>
            Withdrawn
          </option>
        </select>
        {errors.consentStatus && (
          <p className="text-red-500 text-xs">
            {errors.consentStatus}
          </p>
        )}
      </div>

      <div>
        <label>
          Maximum Legal Retention Date <span className="text-red-500">*</span>
        </label>

        <input
          type="date"
          value={
            formData.retentionDate
          }
          onChange={(e) =>
            handleChange(
              "retentionDate",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        />
        {errors.retentionDate && (
          <p className="text-red-500 text-xs">
            {errors.retentionDate}
          </p>
        )}

      </div>

      <div>
        <label>
          Status Action
        </label>

        <select
          value={
            formData.statusAction
          }
          onChange={(e) =>
            handleChange(
              "statusAction",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option>
            APPROVED FOR PRESERVATION
          </option>

          <option>
            HOLD
          </option>

          <option>
            DESTROY
          </option>
        </select>
      </div>

      <div className="col-span-2">
        <label>
          Legal / Destruction Notes
        </label>

        <textarea
          rows={4}
          value={
            formData.legalNotes
          }
          onChange={(e) =>
            handleChange(
              "legalNotes",
              e.target.value
            )
          }
          className="w-full border rounded-md p-3"
        />
      </div>

    </div>
  );
}