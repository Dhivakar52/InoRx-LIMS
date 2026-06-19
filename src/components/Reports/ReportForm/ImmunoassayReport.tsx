import ReportFooter from "../Footer";
import PatientInfo from "../PatientInfo";
import ReportTable from "./ReportTable";

  const patient = {
    subjectId: "4065635",
    patientName: "JAHEEDHA PARVEEN",
    ageGender: "26 Years / Female",
    department: "Immunoassay",
    consultant: "Dr. Rajesh",
    labNo: "IMM240012",
    sampleType: "Serum",
    collectedOn: "17-Jun-2026 09:10 AM",
    receivedOn: "17-Jun-2026 09:45 AM",
    approvedOn: "17-Jun-2026 11:15 AM",
  };

const rows = [
  {
    test: "TSH",
    result: "6.42",
    unit: "µIU/mL",
    referenceRange: "0.35 - 4.94",
    status: "HIGH",
  },
  {
    test: "Free T4",
    result: "1.18",
    unit: "ng/dL",
    referenceRange: "0.70 - 1.48",
    status: "NORMAL",
  },
  {
    test: "Vitamin D",
    result: "18",
    unit: "ng/mL",
    referenceRange: "30 - 100",
    status: "LOW",
  },
];

export default function ImmunoassayReport() {
  return (
    <>
      <PatientInfo patient={patient} />

      <ReportTable
        title="IMMUNOASSAY REPORT"
        rows={rows}
      />
      <ReportFooter
        remarks="TSH is elevated. Clinical correlation advised."
        doctorName="Dr. Priya Raman"
        qualification="MD (Pathology)"
      />
    </>
  );
}
//   return (
//     <>
//       <PatientInfo patient={patient} />

//       {/* Report Table */}
//     </>
//   );
// }