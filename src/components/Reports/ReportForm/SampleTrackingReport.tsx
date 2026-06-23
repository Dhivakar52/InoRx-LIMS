export default function SampleTrackingReport() {

  const rows = [
    {
      subjectId: "3142433",
      dept: "Bio-Chemistry",
      status: "Approved",
    },
    {
      subjectId: "4176321",
      dept: "Bio-Chemistry",
      status: "Printed",
    },
  ];

  return (

    <>
      {/* <h2 className="text-lg font-bold mt-6">
        SAMPLE TRACKING REPORT
      </h2> */}

      <table className="w-full border mt-4">

        <thead>

          <tr>

            <th className="border p-2">
              Subject ID
            </th>

            <th className="border p-2">
              Department
            </th>

            <th className="border p-2">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {rows.map((row) => (

            <tr key={row.subjectId}>

              <td className="border p-2">
                {row.subjectId}
              </td>

              <td className="border p-2">
                {row.dept}
              </td>

              <td className="border p-2">
                {row.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  );
}