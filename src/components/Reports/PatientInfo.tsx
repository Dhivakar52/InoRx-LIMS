
"use client";

interface PatientInfoProps {
  patient: {
    patientName: string;
    uhid: string;
    ipNo: string;
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

        {/* Patient Name */}

        <InfoCard
          label="Patient Name"
          value={patient.patientName}
        />

        {/* UHID */}

        <InfoCard
          label="UHID"
          value={patient.uhid}
        />

        {/* IP */}

        <InfoCard
          label="IP No"
          value={patient.ipNo}
        />

        {/* Age */}

        <InfoCard
          label="Age / Gender"
          value={patient.ageGender}
        />

        {/* Department */}

        <InfoCard
          label="Department"
          value={patient.department}
        />

        {/* Consultant */}

        <InfoCard
          label="Consultant"
          value={patient.consultant}
        />

        {/* Lab */}

        <InfoCard
          label="Lab No"
          value={patient.labNo}
        />

        {/* Sample */}

        <InfoCard
          label="Sample Type"
          value={patient.sampleType}
        />

        {/* Collected */}

        <InfoCard
          label="Collected On"
          value={patient.collectedOn}
        />

        {/* Received */}

        <InfoCard
          label="Received On"
          value={patient.receivedOn}
        />

        {/* Approved */}

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