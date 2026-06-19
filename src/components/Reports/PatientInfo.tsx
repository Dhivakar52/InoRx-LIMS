
"use client";

interface PatientInfoProps {
  patient: {
    subjectId: string;
    patientName: string;
    ageGender: string;
    department: string;
    consultant: string;
    labNo: string;
    sampleType: string;
    collectedOn: string;
    receivedOn: string;
    approvedOn: string;
  };
}

export default function PatientInfo({
  patient,
}: PatientInfoProps) {
  return (
    <div className="mt-6 border border-gray-300 rounded-md overflow-hidden">

      <div className="bg-gray-100 border-b px-4 py-2">
        <h3 className="font-semibold text-gray-700">
          Patient Information
        </h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="Subject ID"
          value={patient.subjectId}
        />
        <InfoCard
          label="Name"
          value={patient.patientName}
        />
        <InfoCard
          label="Age / Gender"
          value={patient.ageGender}
        />
        <InfoCard
          label="Department"
          value={patient.department}
        />
        <InfoCard
          label="Consultant"
          value={patient.consultant}
        />
        <InfoCard
          label="Lab No"
          value={patient.labNo}
        />
        <InfoCard
          label="Sample Type"
          value={patient.sampleType}
        />
        <InfoCard
          label="Collected On"
          value={patient.collectedOn}
        />
        <InfoCard
          label="Received On"
          value={patient.receivedOn}
        />
        <InfoCard
          label="Approved On"
          value={patient.approvedOn}
        />
      </div>
    </div>
  );
}

interface CardProps {
  label: string;
  value: string;
}

function InfoCard({
  label,
  value,
}: CardProps) {
  return (
    <div className="border-r border-b p-3">

      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      <p className="font-semibold text-gray-800 mt-1">
        {value}
      </p>

    </div>
  );
}