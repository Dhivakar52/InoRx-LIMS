import { ShieldCheck } from "lucide-react";

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

const serologyTests = [
  {
    test: "HBsAg",
    method: "Rapid Card Test",
    range: "Non Reactive",
  },
  {
    test: "HCV",
    method: "Rapid Card Test",
    range: "Non Reactive",
  },
  {
    test: "HIV I & II",
    method: "Rapid Card Test",
    range: "Non Reactive",
  },
  {
    test: "Dengue NS1",
    method: "Immunochromatography",
    range: "Negative",
  },
  {
    test: "Dengue IgM",
    method: "Immunochromatography",
    range: "Negative",
  },
  {
    test: "Dengue IgG",
    method: "Immunochromatography",
    range: "Negative",
  },
  {
    test: "CRP",
    method: "Latex Agglutination",
    range: "< 6 mg/L",
  },
  {
    test: "RA Factor",
    method: "Latex Agglutination",
    range: "< 20 IU/ml",
  },
  {
    test: "ASO",
    method: "Latex Agglutination",
    range: "< 200 IU/ml",
  },
  {
    test: "Widal O",
    method: "Tube Method",
    range: "<1:80",
  },
  {
    test: "Widal H",
    method: "Tube Method",
    range: "<1:80",
  },
  {
    test: "VDRL",
    method: "Flocculation",
    range: "Non Reactive",
  },
];

export default function SerologyResult({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <ShieldCheck size={18} />
          <span className="font-semibold">
            Serology Result Entry
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
                  Method
                </th>
                <th className="border p-2">
                  Result
                </th>
                <th className="border p-2">
                  Reference Range
                </th>
                <th className="border p-2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {serologyTests.map(
                (item, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border p-2">
                      {item.test}
                    </td>
                    <td className="border p-2">
                      {item.method}
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name={`sero_result_${index}`}
                        value={
                          formData[
                            `sero_result_${index}`
                          ] || ""
                        }
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                        placeholder="Enter Result"
                      />
                    </td>
                    <td className="border p-2">
                      {item.range}
                    </td>
                    <td className="border p-2">
                      <select
                        name={`sero_status_${index}`}
                        value={
                          formData[
                            `sero_status_${index}`
                          ] || ""
                        }
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1">
                        <option value="">
                          Select
                        </option>
                        <option value="Reactive">
                          Reactive
                        </option>
                        <option value="Non Reactive">
                          Non Reactive
                        </option>
                        <option value="Positive">
                          Positive
                        </option>
                        <option value="Negative">
                          Negative
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
        <label>
          Interpretation
        </label>
          <textarea
            rows={4}
            name="serologyInterpretation"
            value={
              formData.serologyInterpretation ||
              ""
            }
            onChange={handleChange}
            className="w-full border rounded p-3"
            placeholder="Enter Interpretation"
          />
      </div>
    <div className="">
        <label className="block text-sm font-medium mb-2">
          Clinical Notes
        </label>
          <textarea
            rows={3}
            name="serologyNotes"
            value={
              formData.serologyNotes || ""
            }
            onChange={handleChange}
            className="w-full border rounded p-3"
            placeholder="Additional Notes"
          />
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3">
          Verification Details
        </div>
        <div className="p-4 grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Verified By
            </label>
            <input
              name="verifiedBy"
              value={
                formData.verifiedBy || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Checked By
            </label>
            <input
              name="checkedBy"
              value={
                formData.checkedBy || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Report Date
            </label>
            <input
              type="date"
              name="reportDate"
              value={
                formData.reportDate || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}