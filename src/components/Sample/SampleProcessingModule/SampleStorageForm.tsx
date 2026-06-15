// "use client";

// import { Snowflake, MapPin } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const  SampleStorageForm = () => {
//     const navigate = useNavigate();
  
//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
//     <div className="space-y-6">
//       <div className="border-b pb-3">
//         <h2 className="text-xl font-semibold text-[#00458F]">
//            Sample Storage Form
//         </h2>

//         <p className="text-sm text-gray-500 mt-1">
//           Assign sample storage location and monitor conditions
//         </p>
//       </div>

//       <div className="grid grid-cols-3 gap-5">
//         <div>
//           <label className="text-sm font-medium">
//             Storage Location
//           </label>

//           <div className="relative mt-1">
//             <MapPin
//               size={16}
//               className="absolute left-3 top-3 text-gray-400"
//             />

//             <input
//               className="w-full border rounded-md h-10 pl-10 pr-3"
//               placeholder="Enter Storage Location"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Freezer ID
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Enter Freezer ID"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Storage Type
//           </label>

//           <select className="w-full border rounded-md h-10 px-3 mt-1">
//             <option>Freezer</option>
//             <option>Cold Room</option>
//             <option>Refrigerator</option>
//             <option>Ambient</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Rack Number
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Enter Rack Number"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Shelf Number
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Enter Shelf Number"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Box Number
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Enter Box Number"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Position
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Ex: A1 / B2"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Temperature
//           </label>

//           <div className="relative mt-1">
//             <Snowflake
//               size={16}
//               className="absolute left-3 top-3 text-blue-500"
//             />

//             <input
//               className="w-full border rounded-md h-10 pl-10 pr-3"
//               placeholder="-20°C"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Storage Status
//           </label>

//           <select className="w-full border rounded-md h-10 px-3 mt-1">
//             <option>Assigned</option>
//             <option>Pending</option>
//             <option>Transferred</option>
//             <option>Disposed</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Assigned Date
//           </label>

//           <input
//             type="date"
//             className="w-full border rounded-md h-10 px-3 mt-1"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Assigned By
//           </label>

//           <input
//             className="w-full border rounded-md h-10 px-3 mt-1"
//             placeholder="Enter User Name"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium">
//             Retention Period
//           </label>

//           <select className="w-full border rounded-md h-10 px-3 mt-1">
//             <option>1 Month</option>
//             <option>3 Months</option>
//             <option>6 Months</option>
//             <option>1 Year</option>
//             <option>Permanent</option>
//           </select>
//         </div>

//         <div className="col-span-3">
//           <label className="text-sm font-medium">
//             Storage Remarks
//           </label>

//           <textarea
//             rows={4}
//             className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
//             placeholder="Enter storage remarks"
//           />
//         </div>
//              <div className="flex justify-between pt-6">
//           {/* <button onClick={() => navigate(-1)}
//       className={`flex items-center gap-2 px-3 py-2 mb-3 border rounded-md bg-gray-100 hover:bg-gray-200 `}> */}
//           <button onClick={() => navigate(-1)} className="px-5 py-2 rounded-md bg-gray-200">
//             {/* <ArrowLeft size={16} /> */}
//             Back
//           </button>
//           <div className="flex gap-3">
//             <button
//              className="px-5 py-2 rounded-md bg-gray-500 text-white">
//               Save Draft
//             </button>
//             {/* <button onClick={() => setShowFailureModal(true)}
//               className="px-5 py-2 rounded-md bg-red-600 text-white">
//               Log Screen Failure
//             </button> */}
//             <button  
//             className="px-5 py-2 rounded-md bg-[#00458F] text-white">
//                Confirm Enrollment
//             </button>
//           </div>
//         </div>
//       </div>
// </div>
// </div>
//     </div>
//   );
// };

// export default SampleStorageForm;
"use client";

import { Snowflake, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SampleStorageForm = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b pb-3 mb-6">
          <h2 className="text-xl font-semibold text-[#00458F]">
            Sample Storage
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Assign sample storage location and monitor conditions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Storage Location */}
          <div>
            <label className="text-sm font-medium">
              Storage Location
            </label>

            <div className="relative mt-1">
              <MapPin
                size={16}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                className="w-full border rounded-md h-10 pl-10 pr-3"
                placeholder="Enter Storage Location"
              />
            </div>
          </div>

          {/* Freezer ID */}
          <div>
            <label className="text-sm font-medium">
              Freezer ID
            </label>

            <input
              className="w-full border rounded-md h-10 px-3 mt-1"
              placeholder="Enter Freezer ID"
            />
          </div>

          {/* Storage Type */}
          <div>
            <label className="text-sm font-medium">
              Storage Type
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Select Storage Type</option>
              <option>Freezer</option>
              <option>Cold Room</option>
              <option>Refrigerator</option>
              <option>Ambient</option>
            </select>
          </div>

          {/* Aliquot */}
          <div>
            <label className="text-sm font-medium">
              Aliquot
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Select Aliquot</option>
              <option>Aliquot 1</option>
              <option>Aliquot 2</option>
              <option>Aliquot 3</option>
              <option>Aliquot 4</option>
            </select>
          </div>

          {/* Compliance Control */}
          <div>
            <label className="text-sm font-medium">
              Compliance Control
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Select Compliance</option>
              <option>Compliant</option>
              <option>Under Review</option>
              <option>Non-Compliant</option>
            </select>
          </div>

          {/* Rack Number */}
          <div>
            <label className="text-sm font-medium">
              Rack Number
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Select Rack</option>
              <option>Rack A</option>
              <option>Rack B</option>
              <option>Rack C</option>
              <option>Rack D</option>
            </select>
          </div>

          {/* Shelf Number */}
          <div>
            <label className="text-sm font-medium">
              Shelf Number
            </label>

            <input
              className="w-full border rounded-md h-10 px-3 mt-1"
              placeholder="Enter Shelf Number"
            />
          </div>

          {/* Box Number */}
          <div>
            <label className="text-sm font-medium">
              Box Number
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Select Box</option>
              <option>Box 1</option>
              <option>Box 2</option>
              <option>Box 3</option>
              <option>Box 4</option>
            </select>
          </div>

          {/* Position */}
          <div>
            <label className="text-sm font-medium">
              Position
            </label>

            <input
              className="w-full border rounded-md h-10 px-3 mt-1"
              placeholder="Ex: A1 / B2"
            />
          </div>

          {/* Temperature */}
          <div>
            <label className="text-sm font-medium">
              Temperature
            </label>

            <div className="relative mt-1">
              <Snowflake
                size={16}
                className="absolute left-3 top-3 text-blue-500"
              />

              <input
                className="w-full border rounded-md h-10 pl-10 pr-3"
                placeholder="-20°C"
              />
            </div>
          </div>

          {/* Storage Status */}
          <div>
            <label className="text-sm font-medium">
              Storage Status
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>Assigned</option>
              <option>Pending</option>
              <option>Transferred</option>
              <option>Disposed</option>
            </select>
          </div>

          {/* Assigned Date */}
          <div>
            <label className="text-sm font-medium">
              Assigned Date
            </label>

            <input
              type="date"
              className="w-full border rounded-md h-10 px-3 mt-1"
            />
          </div>

          {/* Assigned By */}
          <div>
            <label className="text-sm font-medium">
              Assigned By
            </label>

            <input
              className="w-full border rounded-md h-10 px-3 mt-1"
              placeholder="Enter User Name"
            />
          </div>

          {/* Retention Period */}
          <div>
            <label className="text-sm font-medium">
              Retention Period
            </label>

            <select className="w-full border rounded-md h-10 px-3 mt-1">
              <option>1 Month</option>
              <option>3 Months</option>
              <option>6 Months</option>
              <option>1 Year</option>
              <option>Permanent</option>
            </select>
          </div>

          {/* Remarks */}
          <div className="col-span-1 md:col-span-3">
            <label className="text-sm font-medium">
              Storage Remarks
            </label>

            <textarea
              rows={4}
              className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
              placeholder="Enter storage remarks"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-8 pt-5">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Back
          </button>

          <div className="flex gap-3">
            <button className="px-5 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600">
              Save Draft
            </button>

            <button className="px-5 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#00366d]">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleStorageForm;