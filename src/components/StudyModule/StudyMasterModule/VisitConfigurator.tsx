import { Input } from "../../ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useSearchParams } from "react-router-dom";
import type { StudyVisitData } from "./StudyMasterStepper";

interface Props {
    visit: StudyVisitData[];
    setVisit: React.Dispatch<React.SetStateAction<StudyVisitData[]>>;
    errors: any;
    setErrors:any;
}

const specimenOptions = [
  "Blood",
  "Urine",
  "Plasma",
  "Serum",
  "Saliva",
];

const testOptions = [
  "CBC",
  "LFT",
  "PK",
  "Biomarker",
  "HbA1c",
];

export default function VisitConfigurator({
    visit,
    setVisit,
    errors,
    setErrors
}: Props) {

const [searchParams] = useSearchParams();
const mode = searchParams.get("mode");
const isViewMode = mode === "view";


const toggleMultiSelect = (
  index: number,
  field: "specimen" | "mappedTests",
  value: string
) => {
  setVisit((prev) =>
    prev.map((item, i) => {
      if (i !== index) return item;

      const currentValues = item[field] || [];

      return {
        ...item,
        [field]: currentValues.includes(value)
          ? currentValues.filter((v: string) => v !== value)
          : [...currentValues, value],
      };
    })
  );
};
  const addVisitRow = () => {
  setVisit([
    ...visit,
    {
      visitCode:"",
      visitName: "",
      visitType: "",
      targetDay: "",
      windowMinus: "",
      windowPlus: "",
      specimen: [],
      mappedTests: [],
    },
  ]);
};

const removeVisitRow = (index:any) => {
  setVisit(
    visit.filter((_, i) => i !== index)
  );
};

const updateVisit = (
  index: number,
  field: string,
  value: string
) => {
let error = "";

  if (field === "visitCode") {
    if (
      value &&
      !/^[a-zA-Z0-9]+$/.test(value)
    ) {
      error = "Only alphanumeric characters allowed";
    }

    setErrors((prev: any) => ({
      ...prev,
      [`visitCode_${index}`]: error,
    }));
  }

  setVisit((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, [field]: value }
        : item
    )
  );
};

  return (
    <div className="space-y-6">
      <div className="border-b">
        {/* <h2 className="text-xl font-semibold text-[#00458F]">
          Visit Templates Configurator Grid
        </h2> */}
      </div>

      <div className="flex justify-end">
        <button
          onClick={addVisitRow}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">

          <Plus size={16} />

          Add Visit Template
        </button>
        </div>

<div className="col-span-3 overflow-x-auto">
  <table className="w-full border">
    <thead>
  <tr className="bg-gray-100">
    <th className="border p-2 w-[10%]">Visit Code</th>
    <th className="border p-2 w-[12%]">Visit Name</th>
    <th className="border p-2 w-[8%]">Visit Type</th>
    <th className="border p-2 w-[8%]">Target Day</th>
    <th className="border p-2 w-[8%]">Window -</th>
    <th className="border p-2 w-[8%]">Window +</th>

    <th className="border p-2 w-[18%]">
      Required Specimen
    </th>

    <th className="border p-2 w-[18%]">
      Mapped Tests
    </th>

    <th className="border p-2 w-[5%]">
      Action
    </th>
  </tr>
</thead>

    <tbody>
      {visit.map((_visit: any, index: number) => (
        <tr key={index}>
          <td className="border p-2">
            <Input onChange={(e) =>
                updateVisit(
                  index,
                  "visitCode",
                  e.target.value
                )
              }
              maxLength={15}/>
              {errors[`visitCode_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`visitCode_${index}`]}
            </p>
          )}
          </td>
          <td className="border p-2">
            <Input onChange={(e) =>
                updateVisit(
                  index,
                  "visitName",
                  e.target.value
                )
              }
              maxLength={100}/>
              {errors[`visitName_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`visitName_${index}`]}
            </p>
          )}
          </td>

          <td className="border p-2">
            <Select 
            disabled={isViewMode}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Screening">
                  Screening
                </SelectItem>
                <SelectItem value="Baseline">
                  Baseline
                </SelectItem>
                <SelectItem value="Dosing">
                  Dosing
                </SelectItem>
                <SelectItem value="FollowUp">
                  Follow-Up
                </SelectItem>
                <SelectItem value="EndOfStudy">
                    End of Study
                </SelectItem>
              </SelectContent>
            </Select>
          </td>

          <td className="border p-2">
            <Input type="number" onChange={(e) =>
                updateVisit(
                  index,
                  "targetDay",
                  e.target.value
                )
              }  />

              {errors[`targetDay_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`targetDay_${index}`]}
            </p>
          )}
          </td>

          <td className="border p-2">
            <Input type="number" min="0" 
            onChange={(e) =>
                updateVisit(
                  index,
                  "windowMinus",
                  e.target.value
                )
              }/>
              {errors[`windowMinus_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`windowMinus_${index}`]}
            </p>
          )}
          </td>

          <td className="border p-2">
            <Input type="number" min="0" 
            onChange={(e) =>
                updateVisit(
                  index,
                  "windowPlus",
                  e.target.value
                )
              }/>
              {errors[`windowPlus_${index}`]  && (
            <p className="text-red-500 text-xs mt-1">
              {errors[`windowPlus_${index}`]}
            </p>
          )}
          </td>

          <td className="border p-2">
              <div className="space-y-2">

                <select
                  onChange={(e) => {
                    if (!e.target.value) return;

                    toggleMultiSelect(
                      index,
                      "specimen",
                      e.target.value
                    );

                    e.target.value = "";
                  }}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select Specimen</option>

                  {specimenOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-1">
                  {(visit[index].specimen || []).map(
                    (specimen: string) => (
                      <span
                        key={specimen}
                        className="
                          bg-blue-100
                          text-blue-700
                          px-2 py-1
                          rounded-full
                          text-xs
                          flex
                          items-center
                          gap-1
                        "
                      >
                        {specimen}

                        <button
                          type="button"
                          onClick={() =>
                            toggleMultiSelect(
                              index,
                              "specimen",
                              specimen
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    )
                  )}
                </div>
              </div>
            </td>

            <td className="border p-2">
              <div className="space-y-2">

                <select
                  onChange={(e) => {
                    if (!e.target.value) return;

                    toggleMultiSelect(
                      index,
                      "mappedTests",
                      e.target.value
                    );

                    e.target.value = "";
                  }}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">
                    Select Test
                  </option>

                  {testOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-1">
                  {(visit[index].mappedTests || []).map(
                    (test: string) => (
                      <span
                        key={test}
                        className="
                          bg-green-100
                          text-green-700
                          px-2 py-1
                          rounded-full
                          text-xs
                          flex
                          items-center
                          gap-1
                        "
                      >
                        {test}

                        <button
                          type="button"
                          onClick={() =>
                            toggleMultiSelect(
                              index,
                              "mappedTests",
                              test
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    )
                  )}
                </div>
              </div>
            </td>

          <td className="border p-2">
            <button
              type="button"
              onClick={() => removeVisitRow(index)}
              className="text-red-600"
            >
              <Trash2 size={18} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
  );
}