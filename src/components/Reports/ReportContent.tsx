import type { ReportData } from "../../dataTypes/reportData";

interface Props {
    report: ReportData;
}

export default function ReportContent({ report }: Props) {

    return (

        <div className="mt-8">

            <h2 className="text-xl font-bold">
                {report.title}
            </h2>

            <p className="mt-3">
                {report.summary}
            </p>

            <table className="w-full mt-8 border">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="border p-2">ID</th>

                        <th className="border p-2">Employee</th>

                        <th className="border p-2">Status</th>

                        <th className="border p-2">Remarks</th>

                    </tr>

                </thead>

                <tbody>

                    {report.table.map((row:any) => (

                        <tr key={row.id}>

                            <td className="border p-2">{row.id}</td>

                            <td className="border p-2">{row.employee}</td>

                            <td className="border p-2">{row.status}</td>

                            <td className="border p-2">{row.remarks}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );
}