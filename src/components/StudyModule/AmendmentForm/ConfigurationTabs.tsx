"use client";

import { useState } from "react";

import CohortGrid from "../AmendmentForm/CohortGrid";
import VisitScheduleGrid from "../AmendmentForm/VisitScheduleGrid";
import SpecimenGrid from "../AmendmentForm/SpecimenGrid";
import TestPanelGrid from "../AmendmentForm/TestPanelGrid";

interface Props {
  form: any;
  setForm: any;
}

export default function ConfigurationTabs({
  form,
  setForm,
}: Props) {
  const [activeTab, setActiveTab] =
    useState("cohort");

  const tabs = [
    {
      key: "cohort",
      label: "Cohorts",
    },
    {
      key: "visit",
      label: "Visit Schedule",
    },
    {
      key: "specimen",
      label: "Specimens",
    },
    {
      key: "test",
      label: "Test Panels",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Configuration Management
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Manage study configuration
          amendments
        </p>
      </div>

      <div className="flex gap-3 border-b pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() =>
              setActiveTab(tab.key)
            }
            className={`px-4 py-2 rounded-md text-sm font-medium
            ${
              activeTab === tab.key
                ? "bg-[#00458F] text-white"
                : "bg-gray-100"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "cohort" && (
        <CohortGrid
          form={form}
          setForm={setForm}
        />
      )}

      {activeTab === "visit" && (
        <VisitScheduleGrid
          form={form}
          setForm={setForm}
        />
      )}

      {activeTab === "specimen" && (
        <SpecimenGrid
          form={form}
          setForm={setForm}
        />
      )}

      {activeTab === "test" && (
        <TestPanelGrid
          form={form}
          setForm={setForm}
        />
      )}
    </div>
  );
}