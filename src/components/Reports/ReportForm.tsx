"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

import FormWrapper from "../../common/FormWrapper";

export default function ReportForm() {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Report Filters 👉", formData);
  };

  return (
    <FormWrapper
      title="Sample Tracking Report"
      onSubmit={handleSubmit}
    >
      {/* Study Code */}
      <div className="space-y-2">
        <Label>Study Code</Label>
        <Input
          value={formData.studyCode || ""}
          onChange={(e) =>
            handleChange("studyCode", e.target.value)
          }
          
        />
      </div>

      {/* Protocol Number */}
      <div className="space-y-2">
        <Label>Protocol Number</Label>
        <Input
          value={formData.protocolNumber || ""}
          onChange={(e) =>
            handleChange("protocolNumber", e.target.value)
          }
        />
      </div>

      {/* Subject ID */}
      <div className="space-y-2">
        <Label>Subject ID</Label>
        <Input
          value={formData.subjectId || ""}
          onChange={(e) =>
            handleChange("subjectId", e.target.value)
          }
        />
      </div>

      {/* Visit / Timepoint */}
      <div className="space-y-2">
        <Label>Visit / Timepoint</Label>
        <Input
          value={formData.visitTimepoint || ""}
          onChange={(e) =>
            handleChange("visitTimepoint", e.target.value)
          }
        />
      </div>

      {/* Sample ID */}
      <div className="space-y-2">
        <Label>Sample ID</Label>
        <Input
          value={formData.sampleId || ""}
          onChange={(e) =>
            handleChange("sampleId", e.target.value)
          }
        />
      </div>

      {/* Accession Number */}
      <div className="space-y-2">
        <Label>Accession Number</Label>
        <Input
          value={formData.accessionNumber || ""}
          onChange={(e) =>
            handleChange("accessionNumber", e.target.value)
          }
        />
      </div>

      {/* Sample Type */}
      <div className="space-y-2">
        <Label>Sample Type</Label>
        <Select
          value={formData.sampleType || ""}
          onValueChange={(v) =>
            handleChange("sampleType", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Sample Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Blood">Blood</SelectItem>
            <SelectItem value="Serum">Serum</SelectItem>
            <SelectItem value="Plasma">Plasma</SelectItem>
            <SelectItem value="Urine">Urine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Aliquot Number */}
      <div className="space-y-2">
        <Label>Aliquot Number</Label>
        <Input
          value={formData.aliquotNumber || ""}
          onChange={(e) =>
            handleChange("aliquotNumber", e.target.value)
          }
        />
      </div>

      {/* Collection Date-Time */}
      <div className="space-y-2">
        <Label>Collection Date-Time</Label>
        <Input
          type="datetime-local"
          value={formData.collectionDateTime || ""}
          onChange={(e) =>
            handleChange(
              "collectionDateTime",
              e.target.value
            )
          }
        />
      </div>

      {/* Received Date-Time */}
      <div className="space-y-2">
        <Label>Received Date-Time</Label>
        <Input
          type="datetime-local"
          value={formData.receivedDateTime || ""}
          onChange={(e) =>
            handleChange(
              "receivedDateTime",
              e.target.value
            )
          }
        />
      </div>

      {/* Storage Location */}
      <div className="space-y-2">
        <Label>Storage Location</Label>
        <Input
          value={formData.storageLocation || ""}
          onChange={(e) =>
            handleChange(
              "storageLocation",
              e.target.value
            )
          }
        />
      </div>

      {/* Chain of Custody Status */}
      <div className="space-y-2">
        <Label>Chain of Custody Status</Label>
        <Select
          value={formData.chainOfCustodyStatus || ""}
          onValueChange={(v) =>
            handleChange("chainOfCustodyStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Transferred">
              Transferred
            </SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Processing Status */}
      <div className="space-y-2">
        <Label>Processing Status</Label>
        <Select
          value={formData.processingStatus || ""}
          onValueChange={(v) =>
            handleChange("processingStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Processing">
              Processing
            </SelectItem>
            <SelectItem value="Completed">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* QC Status */}
      <div className="space-y-2">
        <Label>QC Status</Label>
        <Select
          value={formData.qcStatus || ""}
          onValueChange={(v) =>
            handleChange("qcStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select QC Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pass">Pass</SelectItem>
            <SelectItem value="Fail">Fail</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Review Status */}
      <div className="space-y-2">
        <Label>Review Status</Label>
        <Select
          value={formData.reviewStatus || ""}
          onValueChange={(v) =>
            handleChange("reviewStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Review Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Reviewed">
              Reviewed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* QA Approval Status */}
      <div className="space-y-2">
        <Label>QA Approval Status</Label>
        <Select
          value={formData.qaApprovalStatus || ""}
          onValueChange={(v) =>
            handleChange("qaApprovalStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select QA Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Approved">
              Approved
            </SelectItem>
            <SelectItem value="Rejected">
              Rejected
            </SelectItem>
            <SelectItem value="Pending">
              Pending
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Dispatch Status */}
      <div className="space-y-2">
        <Label>Dispatch Status</Label>
        <Select
          value={formData.dispatchStatus || ""}
          onValueChange={(v) =>
            handleChange("dispatchStatus", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Dispatch Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dispatched">
              Dispatched
            </SelectItem>
            <SelectItem value="Pending">
              Pending
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Flag */}
      <div className="space-y-2">
        <Label>Audit Flag</Label>
        <Select
          value={formData.auditFlag || ""}
          onValueChange={(v) =>
            handleChange("auditFlag", v)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Audit Flag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </FormWrapper>
  );
}