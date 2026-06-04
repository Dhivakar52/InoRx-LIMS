export const calculateStatus=
(
 form:any
)=>{

 const approvals=
 form.approvalHistory;

 const rejected=
 approvals.some(
  (x:any)=>
   x.decision===
   "REJECTED"
 );

 if(rejected)
  return "REJECTED";

 const approved=
 approvals.every(
  (x:any)=>
   x.decision===
   "APPROVED"
 );

 if(approved)
  return "APPROVED";

 return "IN REVIEW";
};