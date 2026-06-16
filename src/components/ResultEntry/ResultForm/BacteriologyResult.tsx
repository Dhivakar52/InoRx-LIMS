import { FlaskConical } from "lucide-react";

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

const antibiotics = [
  "Ampicillin",
  "Amoxicillin",
  "Cefotaxime",
  "Ceftriaxone",
  "Gentamicin",
  "Amikacin",
  "Ciprofloxacin",
  "Levofloxacin",
  "Meropenem",
  "Imipenem",
];

export default function BacteriologyResult({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="space-y-6">


      <div className="border rounded-xl overflow-hidden">

        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <FlaskConical size={18} />
          <span className="font-semibold">
            Preliminary Result
          </span>
        </div>

        <div className="p-4">

          <table className="w-full border">

            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 w-20">
                  S.No
                </th>

                <th className="border p-2">
                  Test
                </th>

                <th className="border p-2">
                  Result
                </th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="border p-2 text-center">
                  1
                </td>

                <td className="border p-2">
                  Gram Stain
                </td>

                <td className="border p-2">
                  <input
                    name="gramStain"
                    value={
                      formData.gramStain || ""
                    }
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-2 text-center">
                  2
                </td>

                <td className="border p-2">
                  Wet Mount
                </td>

                <td className="border p-2">
                  <input
                    name="wetMount"
                    value={
                      formData.wetMount || ""
                    }
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-2 text-center">
                  3
                </td>

                <td className="border p-2">
                  Colony Count
                </td>

                <td className="border p-2">
                  <input
                    name="colonyCount"
                    value={
                      formData.colonyCount || ""
                    }
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-2 text-center">
                  4
                </td>

                <td className="border p-2">
                  Culture Report
                </td>

                <td className="border p-2">
                  <input
                    name="cultureReport"
                    value={
                      formData.cultureReport || ""
                    }
                    onChange={handleChange}
                    className="w-full border rounded px-2 py-1"
                  />
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <div className="border rounded-xl overflow-hidden">

        <div className="bg-[#00458F] text-white px-4 py-3">
          Final Culture Result
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Organism Isolated
            </label>

            <input
              name="organism"
              value={formData.organism || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
              placeholder="E.coli"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Colony Count
            </label>

            <input
              name="finalColonyCount"
              value={
                formData.finalColonyCount || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
              placeholder=">100000 CFU/ml"
            />
          </div>

        </div>

      </div>


      <div className="border rounded-xl overflow-hidden">

        <div className="bg-[#00458F] text-white px-4 py-3">
          Antibiotic Sensitivity Pattern
        </div>

        <div className="overflow-auto">

          <table className="w-full border">

            <thead>

              <tr className="bg-gray-100">

                <th className="border p-2">
                  Antibiotic
                </th>

                <th className="border p-2">
                  Result
                </th>

              </tr>

            </thead>

            <tbody>

              {antibiotics.map(
                (item, index) => (
                  <tr key={index}>

                    <td className="border p-2">
                      {item}
                    </td>

                    <td className="border p-2">

                      <select
                        name={`ab_${index}`}
                        className="w-full border rounded px-2 py-1"
                      >
                        <option value="">
                          Select
                        </option>

                        <option value="S">
                          Sensitive (S)
                        </option>

                        <option value="I">
                          Intermediate (I)
                        </option>

                        <option value="R">
                          Resistant (R)
                        </option>

                      </select>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      <div className="">

        <label className="block text-sm font-medium mb-2">
          Remarks
        </label>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks || ""}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

      </div>

    </div>
  );
}