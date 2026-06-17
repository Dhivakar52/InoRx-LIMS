
"use client";

// import Image from "next/image";

interface Props {
  remarks?: string;
  doctorName: string;
  qualification: string;
  qrCode?: string;
}

export default function ReportFooter({
  remarks,
  doctorName,
  qualification,
}: Props) {
  return (
    <div className="mt-8">

      {/* Remarks */}

      {remarks && (
        <div className="border rounded-md p-4 mb-6">

          <h4 className="font-semibold text-gray-700 mb-2">
            Remarks
          </h4>

          <p className="text-gray-700">
            {remarks}
          </p>

        </div>
      )}

      {/* Signature */}

      <div className="flex justify-between items-end">

        {/* QR */}

        <div>

          {/* {qrCode ? (
            <Image
              src={qrCode}
              alt="QR Code"
              width={90}
              height={90}
            />
          ) : (
            <div className="w-[90px] h-[90px] border flex items-center justify-center text-xs text-gray-500">
              QR Code
            </div>
          )} */}

        </div>

        {/* Doctor */}

        <div className="text-right">

          <div className="h-16" />

          <p className="font-bold">
            {doctorName}
          </p>

          <p className="text-sm text-gray-600">
            {qualification}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Authorized Signatory
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t mt-8 pt-3 text-center text-xs text-gray-500">

        *** End of Report ***

        <br />

        This is a computer generated report and
        does not require a physical signature.

      </div>

    </div>
  );
}