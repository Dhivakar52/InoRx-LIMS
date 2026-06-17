import PatientInfo from "../PatientInfo";
import ReportTable from "./ReportTable";
import ReportFooter from "../Footer";

export default function BiochemistryReport() {

  const patient = {
    patientName: "JAHEEDHA PARVEEN",
    uhid: "4065635",
    ipNo: "2626998",
    ageGender: "26 Years / Female",
    department: "Biochemistry",
    consultant: "Dr. Rajesh",
    labNo: "BIO240001",
    sampleType: "Urine",
    collectedOn: "17-Jun-2026 09:10 AM",
    receivedOn: "17-Jun-2026 09:45 AM",
    approvedOn: "17-Jun-2026 10:25 AM",
  };
  const rows = [
  {
    test: "Urine Albumin",
    result: "Negative",
    unit: "",
    referenceRange: "Negative",
    status: "NORMAL",
  },
  {
    test: "Urine Sugar",
    result: "Negative",
    unit: "",
    referenceRange: "Negative",
    status: "NORMAL",
  },
  {
    test: "Urine pH",
    result: "6.5",
    unit: "",
    referenceRange: "5.0 - 8.0",
    status: "NORMAL",
  },
  {
    test: "Specific Gravity",
    result: "1.030",
    unit: "",
    referenceRange: "1.005 - 1.030",
    status: "NORMAL",
  },
];

  return (
    <>
      <PatientInfo patient={patient} />

      <ReportTable
        title="BIOCHEMISTRY REPORT"
        rows={rows}
      />
      <ReportFooter
        remarks="Urine routine examination is within normal limits."
        doctorName="Dr. S. Kannan"
        qualification="MD (Biochemistry)"
      />
    </>
  );
}
