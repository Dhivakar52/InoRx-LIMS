import { Beaker } from "lucide-react";

interface Props {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => void;
}

const bioChemTests = [
  {
    test: "CHOLESTEROL",
    unit: "mg/dL",
    range: "150 - 200",
  },
  {
    test: "TRIGLYCERIDES",
    unit: "mg/dL",
    range: "50 - 150",
  },
  {
    test: "HDL-C",
    unit: "mg/dL",
    range: "> 40",
  },
  {
    test: "LDL-C",
    unit: "mg/dL",
    range: "< 100",
  },
  {
    test: "VLDL-C",
    unit: "mg/dL",
    range: "5 - 40",
  },
  {
    test: "UREA",
    unit: "mg/dL",
    range: "15 - 45",
  },
  {
    test: "CREATININE",
    unit: "mg/dL",
    range: "0.6 - 1.2",
  },
  {
    test: "URIC ACID",
    unit: "mg/dL",
    range: "3.5 - 7.2",
  },
  {
    test: "SODIUM",
    unit: "mmol/L",
    range: "135 - 145",
  },
  {
    test: "POTASSIUM",
    unit: "mmol/L",
    range: "3.5 - 5.5",
  },
  {
    test: "CHLORIDE",
    unit: "mmol/L",
    range: "98 - 107",
  },
  {
    test: "CALCIUM",
    unit: "mg/dL",
    range: "8.5 - 10.5",
  },
];

export default function BioChemistryResult({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="rounded-xl overflow-hidden">

      <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
        <Beaker size={18} />
        <span className="font-semibold">
          Bio Chemistry Result Entry
        </span>
      </div>

      <div className="overflow-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="border p-2">
                S.No
              </th>

              <th className="border p-2">
                Test Name
              </th>

              <th className="border p-2">
                Result
              </th>

              <th className="border p-2">
                Unit
              </th>

              <th className="border p-2">
                Reference Range
              </th>

              <th className="border p-2">
                Flag
              </th>

            </tr>

          </thead>

          <tbody>

            {bioChemTests.map(
              (item, index) => (
                <tr key={index}>

                  <td className="border p-2 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-2">
                    {item.test}
                  </td>

                  <td className="border p-2">

                    <input
                      type="text"
                      name={`bio_${index}`}
                      value={
                        formData[
                          `bio_${index}`
                        ] || ""
                      }
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    />

                  </td>

                  <td className="border p-2">
                    {item.unit}
                  </td>

                  <td className="border p-2">
                    {item.range}
                  </td>

                  <td className="border p-2">

                    <select
                      name={`flag_${index}`}
                      value={
                        formData[
                          `flag_${index}`
                        ] || ""
                      }
                      onChange={handleChange}
                      className="w-full border rounded px-2 py-1"
                    >
                      <option value="">
                        Normal
                      </option>

                      <option value="High">
                        High
                      </option>

                      <option value="Low">
                        Low
                      </option>

                    </select>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Interpretation
        </label>

        <textarea
          rows={4}
          name="bioInterpretation"
          value={
            formData.bioInterpretation || ""
          }
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Remarks
        </label>

        <textarea
          rows={3}
          name="bioRemarks"
          value={
            formData.bioRemarks || ""
          }
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

      </div>

    </div>
  );
}