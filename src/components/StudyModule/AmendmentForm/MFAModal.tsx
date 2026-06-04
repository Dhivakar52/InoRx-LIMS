"use client";

import { useState } from "react";

interface Props{
 open:boolean;
 onClose:()=>void;
 onVerified:()=>void;
}

export default function MFAModal({
 open,
 onClose,
 onVerified
}:Props){

 const [otp,setOtp]=
 useState("");

 if(!open) return null;

 const verifyOTP=()=>{

  if(
    otp==="123456"
  ){
    onVerified();
    onClose();
  }
 };

 return(
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

   <div className="bg-white p-6 rounded-lg w-[400px]">

    <h2 className="text-lg font-semibold mb-4">
      MFA Verification
    </h2>

    <input
      value={otp}
      onChange={(e)=>
        setOtp(
         e.target.value
        )
      }
      placeholder="Enter OTP"
      className="w-full border rounded-md h-10 px-3"
    />

    <div className="flex justify-end gap-3 mt-5">

      <button
       onClick={onClose}
       className="border px-4 py-2 rounded-md">

       Cancel
      </button>

      <button
       onClick={verifyOTP}
       className="bg-[#00458F] text-white px-4 py-2 rounded-md">

       Verify
      </button>

    </div>

   </div>

  </div>
 );
}