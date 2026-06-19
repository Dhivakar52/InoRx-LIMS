
"use client";

interface Props {
  department: string;
}

export default function ReportHeader({
  department,
}: Props) {
  return (
    <div className="border-gray-300 pb-6">
      <div className="flex items-center justify-between">

        <img
          src="/logo.png"
          alt="LIMS Logo"
          className="h-20 w-20 object-contain"
        />
        <div className="flex-1 text-center">

          <h1 className="text-3xl font-bold tracking-wide text-gray-800">
            CENTRAL CLINICAL LABORATORY
          </h1>

          <p className="text-lg font-semibold mt-1">
            SRM Medical College Hospital & Research Centre
          </p>

          <p className="text-sm text-gray-600">
            SRM Nagar, Potheri,
            Chengalpattu - 603203
          </p>

          <p className="text-sm text-gray-600">
            Tamil Nadu, India
          </p>

        </div>
        <div className="w-20"></div>

      </div>
      <div className="mt-6 text-center">

        <h2 className="text-xl font-bold uppercase tracking-wider">
          {department} Report
        </h2>

      </div>

    </div>
  );
}