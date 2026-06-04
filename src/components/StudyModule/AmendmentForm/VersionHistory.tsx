"use client";

interface Props{
 versionHistory:any[];
}

export default function VersionHistory({
 versionHistory
}:Props){

 return(
  <div className="space-y-4">

   <h2 className="text-xl font-semibold text-[#00458F]">
    Version History
   </h2>

   <table className="w-full border rounded-lg">

    <thead className="bg-gray-100">
      <tr>
       <th className="p-3">
        Version
       </th>

       <th className="p-3">
        Effective Date
       </th>

       <th className="p-3">
        Status
       </th>

       <th className="p-3">
        Approved By
       </th>
      </tr>
    </thead>

    <tbody>

     {versionHistory.map(
      (
       row:any,
       index:number
      )=>(
      <tr
       key={index}
       className="border-t">

       <td className="p-3">
        {row.versionNo}
       </td>

       <td className="p-3">
        {row.effectiveDate}
       </td>

       <td className="p-3">
        {row.status}
       </td>

       <td className="p-3">
        {row.approvedBy}
       </td>

      </tr>
     ))}
    </tbody>

   </table>

  </div>
 );
}