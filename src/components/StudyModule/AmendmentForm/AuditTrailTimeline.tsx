"use client";

interface Props{
 auditTrail:any[];
}

export default function AuditTrailTimeline({
 auditTrail
}:Props){

 return(
  <div className="space-y-5">

   <h2 className="text-xl font-semibold text-[#00458F]">
    Audit Trail
   </h2>

   {auditTrail.map(
    (item:any)=>(
     <div
      key={item.id}
      className="border-l-4 border-[#00458F] pl-5 py-2">

      <div className="font-semibold">
       {item.action}
      </div>

      <div className="text-sm text-gray-500">
       {item.userName}
      </div>

      <div className="text-xs text-gray-400">
       {item.dateTime}
      </div>

      <div className="text-sm mt-2">
       {item.remarks}
      </div>

     </div>
   ))}
  </div>
 );
}