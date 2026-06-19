import { User } from "lucide-react";

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

export default function PatientDetails({
  formData,
  handleChange,
}: Props) {
  return (
    <div className="bg-white border rounded-xl">

      <div className="bg-[#00458F] text-white px-4 py-3 rounded-t-xl flex items-center gap-2">
        <User size={18} />
        <span className="font-semibold">
          Patient Information
        </span>
      </div>

      <div className="p-4">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Subject ID
            </label>

            <input
              type="text" disabled
              name="subjectId"
              value={formData.subjectId }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
             <input
              type="text" disabled
              name="patientName"
              value={formData.patientName }
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Gender
            </label>

            <select
              name="gender" disabled
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            >
              <option value="">
                Select
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Age
            </label>

            <input
              type="text" disabled
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Department
            </label>

           <select
              name="department" disabled
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3">

              <option>Select</option>

              <option value="Bacteriology">Bacteriology</option>

              <option value="Bio Chemistry">Bio Chemistry</option>

              <option value="Clinical Pathology">Clinical Pathology</option>

              <option value="Molecular Biology">Molecular Biology</option>

              <option value="Serology">Serology</option>

              </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ward
            </label>

            <input
              type="text" disabled
              name="ward"
              value={formData.ward}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Referred By
            </label>

            <input
              type="text" disabled
              name="referredBy"
              value={formData.referredBy}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Request Date
            </label>

            <input
              type="date"
              name="requestDate"
              value={formData.requestDate}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Receipt Date
            </label>

            <input
              type="date"
              name="receiptDate"
              value={formData.receiptDate}
              onChange={handleChange}
              className="w-full border rounded h-10 px-3"
            />
          </div>

        </div>

        <div className="mt-4">

          <label className="block text-sm font-medium mb-1">
            Diagnosis
          </label>

          <textarea
            rows={3}
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

        </div>

      </div>

    </div>
  );
}