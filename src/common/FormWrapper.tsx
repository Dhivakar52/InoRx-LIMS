"use client";

import type { ReactNode } from "react";
import { Card } from "../components/ui/card";
import FormActions from "../common/FormActions";
import BackButton from "../common/BackButton";

export default function FormWrapper({
  title,
  children,
  onSubmit,
  onCancel,
  saveText,
  cancelText,
  columns = 3,
}: {
  title?: string;
  children: ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
  saveText?: string;
  cancelText?: string;
  columns?: number;
}) {
  return (
    <Card className="border-0 m-4 bg-white shadow-sm rounded-xl">
      
      <div className="p-4">

        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {title}
          </h2>
        </div>

        {/* Dynamic Fields */}
        <div className={`grid grid-cols-${columns} gap-4`}>
          {children}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-5">
          <BackButton />
          <FormActions
            onSave={onSubmit}
            onCancel={onCancel || (() => console.log("Cancelled"))}
            saveText={saveText}
            cancelText={cancelText}
          />
        </div>
      </div>
    </Card>
  );
}