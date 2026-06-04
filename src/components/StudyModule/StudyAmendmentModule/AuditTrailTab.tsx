"use client";

export default function AuditTrailTab() {

  const logs = [
    {
      date: "01-Jun-2026",
      user: "Admin",
      action: "Created Amendment",
    },
    {
      date: "03-Jun-2026",
      user: "QA User",
      action: "Updated Visit Schedule",
    },
    {
      date: "05-Jun-2026",
      user: "PI",
      action: "Approved Amendment",
    },
  ];

  return (
    <div className="border rounded-lg overflow-auto">

      <table className="w-full">

        <thead>

          <tr>

            <th>Date</th>
            <th>User</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {logs.map(
            (
              row,
              index
            ) => (

              <tr key={index}>

                <td>
                  {row.date}
                </td>

                <td>
                  {row.user}
                </td>

                <td>
                  {row.action}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}