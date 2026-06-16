import {
  FlaskConical,
  Microscope,
  FileText,
} from "lucide-react";

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

export default function MolecularBiologyResult({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <FlaskConical size={18} />
          <span className="font-semibold">
            Molecular Biology Result
          </span>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Test Name
            </label>
            <input
              type="text"
              name="testName"
              value={formData.testName || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Specimen
            </label>
            <input
              type="text"
              name="specimen"
              value={formData.specimen || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Result
            </label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="result"
                  value="Detected"
                  checked={
                    formData.result ===
                    "Detected"
                  }
                  onChange={handleChange}
                />
                <span className="text-red-600 font-medium">
                  Detected
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="result"
                  value="Not Detected"
                  checked={
                    formData.result ===
                    "Not Detected"
                  }
                  onChange={handleChange}
                />
                <span className="text-green-600 font-medium">
                  Not Detected
                </span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Ct Value
            </label>
            <input
              type="text"
              name="ctValue"
              value={formData.ctValue || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
              placeholder="28.5"
            />
          </div>
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <Microscope size={18} />
          <span>
            Technical Information
          </span>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Method
            </label>
            <input
              name="method"
              value={formData.method || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Test Kit
            </label>
            <input
              name="kitDetails"
              value={
                formData.kitDetails || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Instrument
            </label>
            <input
              name="instrument"
              value={
                formData.instrument || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Limit Of Detection
            </label>
            <input
              name="limitOfDetection"
              value={
                formData.limitOfDetection ||
                ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3 flex items-center gap-2">
          <FileText size={18} />
          <span>
            Result Interpretation
          </span>
        </div>
        <div className="p-4">
          <textarea
            rows={4}
            name="interpretation"
            value={
              formData.interpretation || ""
            }
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>
      </div>
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-[#00458F] text-white px-4 py-3">
          Approval Details
        </div>
        <div className="p-4 grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Approved By
            </label>
            <select
              name="approvedBy"
              value={
                formData.approvedBy || ""
              }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            >
              <option value="">
                Select
              </option>

              <option>
                Dr. Senthil Kumar
              </option>

              <option>
                Dr. Rajesh
              </option>

              <option>
                Dr. Meena
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Done By
            </label>

            <input
              name="doneBy"
              value={formData.doneBy || ""}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>
            <input
              value={formData.status || ""}
              readOnly
              className="w-full border rounded h-10 px-3 bg-gray-100"
            />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          Notes
        </label>
        <textarea
          rows={3}
          name="notes"
          value={formData.notes || ""}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />
      </div>
    </div>
  );
}