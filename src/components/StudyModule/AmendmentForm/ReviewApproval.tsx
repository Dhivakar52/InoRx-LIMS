"use client";

interface Props{
 form:any;
 setForm:any;
}

export default function ReviewApproval({
 form,
 setForm
}:Props){

 const updateDecision=(
  index:number,
  decision:string
 )=>{

  const updated=[
   ...form.approvalHistory
  ];

  updated[index]={
   ...updated[index],
   decision
  };

  setForm(
   (prev:any)=>({
    ...prev,
    approvalHistory:
    updated
   })
  );
 };

 return(
  <div className="space-y-5">

   <h2 className="text-xl font-semibold text-[#00458F]">
     Review & Approval
   </h2>

   <table className="w-full border">

    <thead className="bg-gray-100">
      <tr>

       <th className="p-3">
        Reviewer
       </th>

       <th className="p-3">
        Role
       </th>

       <th className="p-3">
        Decision
       </th>

       <th className="p-3">
        Comments
       </th>

      </tr>
    </thead>

    <tbody>

    {form.approvalHistory.map(
     (
      row:any,
      index:number
     )=>(
      <tr
       key={index}
       className="border-t">

       <td className="p-3">
        {row.reviewerName}
       </td>

       <td className="p-3">
        {row.role}
       </td>

       <td className="p-3">

        <select
         value={
          row.decision
         }
         onChange={(e)=>
          updateDecision(
           index,
           e.target.value
          )
         }
         className="border rounded-md h-9 px-2">

         <option>
          PENDING
         </option>

         <option>
          APPROVED
         </option>

         <option>
          REJECTED
         </option>

        </select>

       </td>

       <td className="p-3">

        <input
          value={
           row.comments
          }
          onChange={(e)=>{

            const updated=[
             ...form.approvalHistory
            ];

            updated[index]
            .comments=
            e.target.value;

            setForm(
             (prev:any)=>({
              ...prev,
              approvalHistory:
              updated
             })
            );
          }}
          className="w-full border rounded-md h-9 px-2"
        />

       </td>

      </tr>
    ))}

    </tbody>

   </table>

  </div>
 );
}