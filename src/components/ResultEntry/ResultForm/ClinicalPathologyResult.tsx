import { Microscope } from "lucide-react";

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

const pathologyTests = [
  "Colour",
  "Appearance",
  "Specific Gravity",
  "Reaction (pH)",
  "Albumin",
  "Sugar",
  "Ketone Bodies",
  "Bile Salts",
  "Bile Pigments",
  "Urobilinogen",
  "Blood",
  "Pus Cells",
  "Red Blood Cells",
  "Epithelial Cells",
  "Casts",
  "Crystals",
  "Bacteria",
  "Yeast Cells",
  "Mucus Threads",
  "Parasites",
  "Others",
];

export default function ClinicalPathologyResult({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <Microscope size={18} />
          <span className="font-semibold">
            Clinical Pathology Result Entry
          </span>
        </div>
        <div className="max-h-[550px] overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <th className="border p-2 w-20">
                  S.No
                </th>
                <th className="border p-2">
                  Parameter
                </th>
                <th className="border p-2">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {pathologyTests.map(
                (item, index) => (
                  <tr key={index}>
                    <td className="border p-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border p-2">
                      {item}
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        name={`clinical_${index}`}
                        value={
                          formData[
                            `clinical_${index}`
                          ] || ""
                        }
                        onChange={handleChange}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3">
          Microscopic Examination
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pus Cells
            </label>
            <input
              name="pusCells"
              value={formData.pusCells || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              RBC
            </label>
            <input
              name="rbc"
              value={formData.rbc || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Epithelial Cells
            </label>
            <input
              name="epithelialCells"
              value={
                formData.epithelialCells || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Crystals
            </label>
            <input
              name="crystals"
              value={
                formData.crystals || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
        </div>
      </div>
      <div >
        <label className="block text-sm font-medium mb-2">
          Interpretation
        </label>
        <textarea
          rows={4}
          name="clinicalInterpretation"
          value={
            formData.clinicalInterpretation || ""
          }
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
      </div>
      <div >
        <label className="block text-sm font-medium mb-2">
          Remarks
        </label>
        <textarea
          rows={3}
          name="clinicalRemarks"
          value={
            formData.clinicalRemarks || ""
          }
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
      </div>
    </div>
  );
}