import { CheckCircle2, Clock3 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SampleTrackingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const sample =
    location.state?.data;

  if (!sample) {
    return (
      <div className="p-6">
        No Sample Tracking Data Found
      </div>
    );
  }

  const timeline = [
  {
    title: "Sample Registration",
    date: sample.registrationDate,
  },
  {
    title: "Sample Collection",
    date: sample.collectionDate,
  },
  {
    title: "Sample Acknowledgement",
    date: sample.acknowledgementDate,
  },
  {
    title: "Sample Processing",
    date: sample.processingDate,
  },
  {
    title: "Sample Storage",
    date: sample.storageDate,
  },

  ...(sample.shipmentDate
    ? [
        {
          title: "Sample Shipment",
          date: sample.shipmentDate,
        },
      ]
    : []),

  {
    title: "Result Entry",
    date: sample.resultEntryDate,
  },
  {
    title: "Result Validation",
    date: sample.resultValidationDate,
  },
];

  const handleExportCsv = () => {
    const csvData = [
  ["Field", "Value"],
  ["Sample ID", sample.sampleId],
  ["Sample Code", sample.sampleCode],
  ["Subject Code", sample.subjectCode],
  ["Department", sample.department],
  ["Registration Date", sample.registrationDate],
  ["Collection Date", sample.collectionDate],
  ["Acknowledgement Date", sample.acknowledgementDate],
  ["Processing Date", sample.processingDate],
  ["Storage Date", sample.storageDate],
  ...(sample.shipmentDate
  ? [["Shipment Date", sample.shipmentDate]]
  : []),
  ["Result Entry Date", sample.resultEntryDate || "Pending"],
  ["Result Validation Date", sample.resultValidationDate || "Pending"],
];
    const csvContent = csvData
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "SampleTracking.csv";
    link.click();
  };

  const currentStatus =
  sample.resultValidationDate
    ? "Result Validated"
    : sample.resultEntryDate
    ? "Result Entered"
    : sample.shipmentDate
    ? "Sample Shipped"
    : sample.storageDate
    ? "Sample Stored"
    : sample.processingDate
    ? "Sample Processing"
    : sample.acknowledgementDate
    ? "Sample Acknowledged"
    : sample.collectionDate
    ? "Sample Collected"
    : "Sample Registered";


  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
        {/* Header */}
        <div className="pb-3">
          <h2 className="text-xl font-semibold text-[#00458F]">
            Sample Tracking Details
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Complete sample lifecycle tracking information
          </p>
        </div>

        {/* Sample Information */}
        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-4">
            Sample Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">
                Sample ID
              </div>
              <div className="font-semibold mt-1">
                {sample.sampleId}
              </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">
                Sample Code
              </div>
              <div className="font-semibold mt-1">
                {sample.sampleCode}
              </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">
                Subject Code
              </div>
              <div className="font-semibold mt-1">
                {sample.subjectCode}
              </div>
            </div>

            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="text-xs text-gray-500">
                Department
              </div>
              <div className="font-semibold mt-1">
                {sample.department}
              </div>
            </div>
            <div className="bg-gray-50 border rounded-lg p-4">
            <div className="text-xs text-gray-500">
              Status
            </div>
            <div className="mt-2">
              <span
                className={`
                  font-semibold mt-1
                  ${
                    sample.resultValidationDate
                      ? "text-green-700"
                      : sample.resultEntryDate
                      ? "text-blue-700"
                      : sample.shipmentDate
                      ? "text-purple-700"
                      : sample.storageDate
                      ? "text-indigo-700"
                      : sample.processingDate
                      ? "text-yellow-700"
                      : sample.acknowledgementDate
                      ? "text-cyan-700"
                      : sample.collectionDate
                      ? "text-orange-700"
                      : "text-gray-700"
                  }
                `}
              >
                {currentStatus}
              </span>
            </div>
          </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-[#00458F] text-lg mb-6">
            Tracking Timeline
          </h3>

          <div className="space-y-4">
            {timeline.map((step, index) => (
              <div
                key={index}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full
                      flex items-center justify-center
                      font-semibold                    
                    `}
                  >
                    {
                      step.date ? (
                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                      ) : (
                        <Clock3 className="w-7 h-7 text-amber-500" />
                      )
                    }
                  </div>

                  {index !==
                    timeline.length - 1 && (
                    <div className="w-[2px] h-12 bg-gray-300" />
                  )}
                </div>

                <div className="pt-1">
                  <div className="font-medium">
                    {step.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {step.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate(-1)}
            className="
              px-5 py-2
              rounded-md
              bg-gray-200
              hover:bg-gray-300
            "
          >
            Back
          </button>

          <button
            onClick={handleExportCsv}
            className="
              px-5 py-2
              rounded-md
              bg-[#00458F]
              text-white
              hover:opacity-90
            "
          >
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default SampleTrackingForm;