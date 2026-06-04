"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Upload,
  FileText,
  Trash2,
} from "lucide-react";

interface DocumentRow {
  documentType: string;
  documentName: string;
  version: string;
  effectiveDate: string;
  status: string;
}

export default function DocumentsTab() {

  const [documents, setDocuments] =
    useState<DocumentRow[]>([
      {
        documentType: "Protocol",
        documentName: "Protocol_V2.pdf",
        version: "V2.0",
        effectiveDate: "2026-01-10",
        status: "Approved",
      },
    ]);

  const removeDocument = (
    index: number
  ) => {

    setDocuments(
      documents.filter(
        (_, i) => i !== index
      )
    );
  };

  return (
    <div className="space-y-5">

      <div className="border rounded-lg p-4">

        <h3 className="font-semibold mb-4">
          Upload Amendment Documents
        </h3>

        <div className="grid grid-cols-4 gap-4">

          <div>
            <Label>
              Document Type
            </Label>
            <Input />
          </div>

          <div>
            <Label>
              Version
            </Label>
            <Input />
          </div>

          <div>
            <Label>
              Effective Date
            </Label>
            <Input type="date" />
          </div>

          <div className="flex items-end">

            <Button
              type="button"
              className="btn-theme-save"
            >
              <Upload size={16}/>
              Upload
            </Button>

          </div>

        </div>

      </div>

      <div className="border rounded-lg overflow-auto">

        <table className="w-full">

          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Version</th>
              <th>Effective</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {documents.map(
              (
                row,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {row.documentType}
                  </td>

                  <td>

                    <div className="flex items-center gap-2">

                      <FileText size={16} />

                      {row.documentName}

                    </div>

                  </td>

                  <td>
                    {row.version}
                  </td>

                  <td>
                    {row.effectiveDate}
                  </td>

                  <td>

                    <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">

                      {row.status}

                    </span>

                  </td>

                  <td>

                    <Button
                      type="button"
                      className="btn-theme-reject"
                      onClick={() =>
                        removeDocument(
                          index
                        )
                      }
                    >
                      <Trash2 size={14}/>
                    </Button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}