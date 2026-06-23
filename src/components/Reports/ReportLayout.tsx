"use client";

import ReportHeader from "./ReportHeader";
// import ReportFooter from "./Footer";

import BiochemistryReport from "../Reports/ReportForm/BiochemistryReport";
import ImmunoassayReport from "../Reports/ReportForm/ImmunoassayReport";
import SampleTrackingReport from "../Reports/ReportForm/SampleTrackingReport";

interface Props {
  department: string;
}

export default function ReportLayout({
  department,
}: Props) {

  const renderReport = () => {

    switch (department) {

      case "Biochemistry":
        return <BiochemistryReport />;

      case "Immunoassay":
        return <ImmunoassayReport />;

      case "Sample Tracking":
        return <SampleTrackingReport />;

      default:
        return null;
    }
  };

  return (

    <div className="bg-white p-10">

      <ReportHeader
        department={department}
      />

      <div className="mt-8">

        {renderReport()}

      </div>

      {/* <ReportFooter
      remarks=""
      doctorName=""
      qualification="" /> */}

    </div>

  );
}