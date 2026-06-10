
"use client";

import { useState, useEffect, } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Trash2,
} from "lucide-react";
import { Input } from "./../ui/input";
import { Label } from "./../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./../ui/select";

import FormWrapper from "./../../common/FormWrapper";

interface Aliquot {
  aliquotNo: number;
  type: string;
  volume: string;
  collected: boolean;

  preparedBy: string;
  preparedDate: string;

  cryoboxNo: string;
  slotNo: string;

  storageTemp: string;
  comments: string;
}
export default function TestRegistrationForm() {
  const location = useLocation();

  const mode = location.state?.mode || "add";
  const initialData = location.state?.data;

  const isViewMode = mode === "view";

  const [formData, setFormData] = useState<any>({
  studyCode: "",
  protocolId: "",
  sponsorName: "",

  siteId: "",
  investigatorName: "",
  instituteName: "",

  participantId: "",
  subjectName: "",

  gender: "",
  dob: "",

  visitType: "",
  collectionDate: "",
  collectionTime: "",

  specimenIdentificationNo: "",

  testType: "Immunogenicity",
  specimenType: "Serum",

  serumObtainedVolume: "",
  barcodeNo: "",

  status: "Pending",
  resultStatus: "",

  remarks: "",
});
  const [aliquots, setAliquots] =
  useState<Aliquot[]>([
    {
      aliquotNo: 1,
      type: "Primary",
      volume: "1.5",
      collected: true,

      preparedBy: "",
      preparedDate: "",

      cryoboxNo: "",
      slotNo: "",

      storageTemp: "-20°C",
      comments: "",
    },

    {
      aliquotNo: 2,
      type: "Primary",
      volume: "1.5",
      collected: true,

      preparedBy: "",
      preparedDate: "",

      cryoboxNo: "",
      slotNo: "",

      storageTemp: "-20°C",
      comments: "",
    },

    {
      aliquotNo: 3,
      type: "Backup",
      volume: "Remaining",
      collected: true,

      preparedBy: "",
      preparedDate: "",

      cryoboxNo: "",
      slotNo: "",

      storageTemp: "-20°C",
      comments: "",
    },
  ]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        studyCode: initialData.studyCode || "",
        protocolId: initialData.protocolId || "",
        siteId: initialData.siteId || "",

        subjectId: initialData.subjectId || "",
        subjectName: initialData.subjectName || "",
        gender: initialData.gender || "",
        dob: initialData.dob || "",

        visitName: initialData.visitName || "",
        visitDate: initialData.visitDate || "",

        collectionDate:
          initialData.collectionDate || "",
        collectionTime:
          initialData.collectionTime || "",

        barcodeNo: initialData.barcodeNo || "",
        specimenId: initialData.specimenId || "",
        specimenType:
          initialData.specimenType || "",
        sampleVolume:
          initialData.sampleVolume || "",

        freezerNo: initialData.freezerNo || "",
        rackNo: initialData.rackNo || "",
        cryoboxNo:
          initialData.cryoboxNo || "",
        slotNo: initialData.slotNo || "",

        testType: initialData.testType || "",
        testName: initialData.testName || "",
        priority: initialData.priority || "",

        status:
          initialData.status || "Pending",

        resultStatus:
          initialData.resultStatus || "",

        remarks: initialData.remarks || "",
      });

      if (
        initialData.aliquots &&
        initialData.aliquots.length > 0
      ) {
        setAliquots(initialData.aliquots);
      }
    }
  }, [initialData]);

  const handleChange = (
    name: string,
    value: string
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateAliquot = (
    index: number,
    field: keyof Aliquot,
    value: any
  ) => {
    const updated = [...aliquots];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setAliquots(updated);
  };

  const addAliquot = () => {
  setAliquots([
    ...aliquots,
    {
      aliquotNo: aliquots.length + 1,
      type: "",
      volume: "",
      collected: false,

      preparedBy: "",
      preparedDate: "",

      cryoboxNo: "",
      slotNo: "",

      storageTemp: "-20°C",
      comments: "",
    },
  ]);
};

  const removeAliquot = (index: number) => {
    const updated = aliquots.filter(
      (_, i) => i !== index
    );
    setAliquots(updated);
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      aliquots,
    };

    console.log(
      "Test Registration Payload",
      payload
    );
  };

  return (
    <FormWrapper
      // title={
      //   mode === "view"
      //     ? "View Test Registration"
      //     : mode === "edit"
      //     ? "Edit Test Registration"
      //     : "Add Test Registration"
      // }
      onSubmit={handleSubmit}>

      <div className="col-span-3 font-semibold text-lg mt-2 text-[#00458F] pb-2">
        Study Information
      </div>

      <div className="space-y-2">
        <Label>Study Code *</Label>
        <Select
          disabled={isViewMode}
          value={formData.studyCode || ""}
          onValueChange={(v:any) =>
            handleChange("studyCode", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Study" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ST001">
              ST001
            </SelectItem>
            <SelectItem value="ST002">
              ST002
            </SelectItem>
            <SelectItem value="ST003">
              ST003
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Protocol ID</Label>
        <Input
          disabled={isViewMode}
          value={formData.protocolId || ""}
          onChange={(e:any) =>
            handleChange(
              "protocolId",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Site ID</Label>
        <Input
          disabled={isViewMode}
          value={formData.siteId || ""}
          onChange={(e:any) =>
            handleChange(
              "siteId",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Sponsor</Label>

        <Input
          disabled={isViewMode}
          value={formData.sponsorName || ""}
          onChange={(e) =>
            handleChange(
              "sponsorName",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Investigator Name</Label>

        <Input
          disabled={isViewMode}
          value={
            formData.investigatorName || ""
          }
          onChange={(e) =>
            handleChange(
              "investigatorName",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>
          Institute Name & Location
        </Label>

        <Input
          disabled={isViewMode}
          value={
            formData.instituteName || ""
          }
          onChange={(e) =>
            handleChange(
              "instituteName",
              e.target.value
            )
          }
        />
      </div>


      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Subject Information
      </div>

      <div className="space-y-2">
        <Label>Subject ID *</Label>
        <Input
          disabled={isViewMode}
          value={formData.subjectId || ""}
          onChange={(e:any) =>
            handleChange(
              "subjectId",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Subject Name</Label>
        <Input
          disabled={isViewMode}
          value={formData.subjectName || ""}
          onChange={(e:any) =>
            handleChange(
              "subjectName",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <Select
          disabled={isViewMode}
          value={formData.gender || ""}
          onValueChange={(v:any) =>
            handleChange("gender", v)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Male">
              Male
            </SelectItem>
            <SelectItem value="Female">
              Female
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>DOB</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.dob || ""}
          onChange={(e:any) =>
            handleChange("dob", e.target.value)
          }
        />
      </div>

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Visit Information
      </div>

      <div className="space-y-2">
        <Label>Visit</Label>
        <Select
          disabled={isViewMode}
          value={formData.visitType || ""}
          onValueChange={(v) =>
            handleChange("visitType", v)
          }>
          <SelectTrigger>
            <SelectValue placeholder="Visit" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Day1">
              Day 1
            </SelectItem>

            <SelectItem value="Day29">
              Day 2
            </SelectItem>

            <SelectItem value="Day181">
              Day 3
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Visit Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.visitDate || ""}
          onChange={(e:any) =>
            handleChange(
              "visitDate",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Collection Date</Label>
        <Input
          type="date"
          disabled={isViewMode}
          value={formData.collectionDate || ""}
          onChange={(e:any) =>
            handleChange(
              "collectionDate",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Collection Time</Label>
        <Input
          type="time"
          disabled={isViewMode}
          value={formData.collectionTime || ""}
          onChange={(e:any) =>
            handleChange(
              "collectionTime",
              e.target.value
            )
          }
        />
      </div>

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Sample Information
      </div>

      <div className="space-y-2">
        <Label>Barcode No</Label>
        <Input
          disabled={isViewMode}
          value={formData.barcodeNo || ""}
          onChange={(e:any) =>
            handleChange(
              "barcodeNo",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Specimen ID</Label>
        <Input
          disabled={isViewMode}
          value={formData.specimenId || ""}
          onChange={(e:any) =>
            handleChange(
              "specimenId",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Specimen Type</Label>
        <Input
          disabled={isViewMode}
          value={formData.specimenType || ""}
          onChange={(e:any) =>
            handleChange(
              "specimenType",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Approximate Serum Volume (ml)</Label>
        <Input
          disabled={isViewMode}
          value={formData.sampleVolume || ""}
          onChange={(e:any) =>
            handleChange(
              "sampleVolume",
              e.target.value
            )
          }
        />
      </div>
      
      <div className="space-y-2">
        <Label>
          Specimen Identification Number
        </Label>

        <Input
          disabled={isViewMode}
          value={
            formData.specimenIdentificationNo ||
            ""
          }
          onChange={(e) =>
            handleChange(
              "specimenIdentificationNo",
              e.target.value
            )
          }
        />
      </div>

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Test Information
      </div>

      <div className="space-y-2">
        <Label>Test Type</Label>
        <Select
          disabled={isViewMode}
          value={formData.testType || ""}
          onValueChange={(v:any) =>
            handleChange("testType", v)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Immunogenicity">
              Immunogenicity
            </SelectItem>
            <SelectItem value="PK">
              PK
            </SelectItem>
            <SelectItem value="PD">
              PD
            </SelectItem>
            <SelectItem value="Safety">
              Safety
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Test Name</Label>
        <Input
          disabled={isViewMode}
          value={formData.testName || ""}
          onChange={(e:any) =>
            handleChange(
              "testName",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Priority</Label>
        <Select
          disabled={isViewMode}
          value={formData.priority || ""}
          onValueChange={(v) =>
            handleChange("priority", v)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="Routine">
              Routine
            </SelectItem>
            <SelectItem value="Urgent">
              Urgent
            </SelectItem>
          </SelectContent>
        </Select>
      </div>


      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2 flex justify-between">
        <span>Aliquot Details</span>

        {!isViewMode && (
          <button
          onClick={addAliquot}
          className="bg-[#00458F] text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus size={16} />
          Add Row
        </button>
        )}
      </div>

      <div className="col-span-3 overflow-auto">
        <table className="w-full border text-sm">
          <thead>
            <tr>
              <th className="border p-2">
                Aliquot No
              </th>
              <th className="border p-2">
                Type
              </th>
              <th className="border p-2">
                Volume
              </th>
              <th className="border p-2">
                Collected
              </th>
              <th className="border p-2">
                Prepared By
              </th>
              <th className="border p-2">
                Prepared Date
              </th>
              <th className="border p-2">
                Cryobox No
              </th>
              <th className="border p-2">
                Slot No
              </th>
              <th className="border p-2">
                Storage Temp
              </th>
              <th className="border p-2">
                Comments
              </th>
              {!isViewMode && (
                <th className="border p-2">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {aliquots.map((a, index) => (
              <tr key={index}>
                <td className="border p-2">
                  {a.aliquotNo}
                </td>

                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.type}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "type",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.volume}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "volume",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2 text-center">
                  <input
                    type="checkbox"
                    disabled={isViewMode}
                    checked={a.collected}
                    onChange={(e) =>
                      updateAliquot(
                        index,
                        "collected",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td className="border p-2">
                  <Input
                    value={a.preparedBy}
                    disabled={isViewMode}
                    onChange={(e) =>
                      updateAliquot(
                        index,
                        "preparedBy",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2">
                  <Input
                    type="date"
                    value={a.preparedDate}
                    disabled={isViewMode}
                    onChange={(e) =>
                      updateAliquot(
                        index,
                        "preparedDate",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.cryoboxNo}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "cryoboxNo",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.slotNo}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "slotNo",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.storageTemp}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "storageTemp",
                        e.target.value
                      )
                    }
                  />
                </td>

                <td className="border p-2">
                  <Input
                    disabled={isViewMode}
                    value={a.comments}
                    onChange={(e:any) =>
                      updateAliquot(
                        index,
                        "comments",
                        e.target.value
                      )
                    }
                  />
                </td>

                {!isViewMode && (
                  <td className="border p-2">
                    <button
                      type="button"
                      onClick={() =>
                        removeAliquot(index)
                      } className="text-red-600">
                       <Trash2
                          size={
                            18
                          }/>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-span-3 font-semibold text-lg mt-4 text-[#00458F] pb-2">
        Result Information
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Input
          disabled={isViewMode}
          value={formData.status || ""}
          onChange={(e:any) =>
            handleChange(
              "status",
              e.target.value
            )
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Result Status</Label>
        <Input
          disabled={isViewMode}
          value={formData.resultStatus || ""}
          onChange={(e:any) =>
            handleChange(
              "resultStatus",
              e.target.value
            )
          }
        />
      </div>

      <div className="col-span-3 space-y-2">
        <Label>Remarks</Label>

        <textarea
          rows={4}
          disabled={isViewMode}
          value={formData.remarks || ""}
          className="w-full rounded-md border border-input px-3 py-2 text-sm resize-none"
          onChange={(e) =>
            handleChange(
              "remarks",
              e.target.value
            )
          }
        />
      </div>
    </FormWrapper>
  );
}