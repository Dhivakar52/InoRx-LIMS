interface Props {
  formData: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  errors: any;
  readOnly?: boolean;
}

export default function PedigreeLineageTab({
  formData,
  handleChange,
  errors,
  readOnly,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label>
          Parent Clinical Sample ID  <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.parentSampleId}
          onChange={(e) =>
            handleChange(
              "parentSampleId",
              e.target.value
            )
          }
          readOnly={readOnly}
          className="w-full border rounded-md h-10 px-3"
        />

        {errors.parentSampleId && (
          <p className="text-red-500 text-xs">
            {errors.parentSampleId}
          </p>
        )}
      </div>

      <div>
        <label>
          Source Clinical Trial / Study
        </label>

        <input
          type="text"
          value={formData.sourceStudy}
          onChange={(e) =>
            handleChange(
              "sourceStudy",
              e.target.value
            )
          }
          readOnly={readOnly}
          className="w-full border rounded-md h-10 px-3"
        />
      </div>

      <div>
        <label>
          Derivative / Specimen Type  <span className="text-red-500">*</span>
        </label>

        <select
          value={formData.derivativeType}
          onChange={(e) =>
            handleChange(
              "derivativeType",
              e.target.value
            )
          }
          className="w-full border rounded-md h-10 px-3"
        >
          <option value="">
            Select
          </option>

          <option>
            DNA Extract
          </option>

          <option>
            RNA Extract
          </option>

          <option>
            Plasma Aliquot
          </option>

          <option>
            PBMC
          </option>
        </select>
          
        {errors.derivativeType && (
          <p className="text-red-500 text-xs">
            {errors.derivativeType}
          </p>
        )}
      </div>

    </div>
  );
}