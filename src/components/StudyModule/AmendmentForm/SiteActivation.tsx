"use client";

interface Props {
  form: any;
  setForm: any;
}

export default function SiteActivation({
  form,
  setForm,
}: Props) {

  const updateRow = (
    index: number,
    field: string,
    value: any
  ) => {
    const updated = [
      ...form.siteActivations,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setForm((prev: any) => ({
      ...prev,
      siteActivations:
        updated,
    }));
  };

  return (
    <div className="space-y-6">

      <div className="border-b pb-3">
        <h2 className="text-xl font-semibold text-[#00458F]">
          Site Activation
        </h2>
      </div>

      <table className="w-full border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">
              Site Code
            </th>

            <th className="p-3">
              Site Name
            </th>

            <th className="p-3">
              IRB Number
            </th>

            <th className="p-3">
              IRB Date
            </th>

            <th className="p-3">
              Effective Date
            </th>

            <th className="p-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {form.siteActivations.map(
            (
              row: any,
              index: number
            ) => (
              <tr
                key={row.siteId}
                className="border-t">

                <td className="p-3">
                  {row.siteCode}
                </td>

                <td className="p-3">
                  {row.siteName}
                </td>

                <td>
                  <input
                    value={
                      row.irbApprovalNumber
                    }
                    onChange={(
                      e
                    ) =>
                      updateRow(
                        index,
                        "irbApprovalNumber",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-md h-9 px-2"
                  />
                </td>

                <td>
                  <input
                    type="date"
                    value={
                      row.irbApprovalDate
                    }
                    onChange={(
                      e
                    ) =>
                      updateRow(
                        index,
                        "irbApprovalDate",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-md h-9 px-2"
                  />
                </td>

                <td>
                  <input
                    type="date"
                    value={
                      row.siteEffectiveDate
                    }
                    onChange={(
                      e
                    ) =>
                      updateRow(
                        index,
                        "siteEffectiveDate",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-md h-9 px-2"
                  />
                </td>

                <td>
                  <select
                    value={
                      row.status
                    }
                    onChange={(
                      e
                    ) =>
                      updateRow(
                        index,
                        "status",
                        e.target
                          .value
                      )
                    }
                    className="border rounded-md h-9 px-2">

                    <option>
                      PENDING
                    </option>

                    <option>
                      ACTIVE
                    </option>

                    <option>
                      SUPERSEDED
                    </option>

                  </select>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

    </div>
  );
}