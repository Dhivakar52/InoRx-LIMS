"use client";

interface Props{
 form:any;
 setForm:any;
}

export default function ElectronicSignature({
 form,
 setForm
}:Props){

 return(
  <div className="space-y-4">

   <h2 className="text-xl font-semibold text-[#00458F]">
     Electronic Signature
   </h2>

   <div>

    <label>
      Full Name
    </label>

    <input
      value={
       form.electronicSignature
      }
      onChange={(e)=>
       setForm(
        (prev:any)=>({
         ...prev,
         electronicSignature:
         e.target.value
        })
       )
      }
      className="w-full border rounded-md h-10 px-3"
    />

   </div>

  </div>
 );
}