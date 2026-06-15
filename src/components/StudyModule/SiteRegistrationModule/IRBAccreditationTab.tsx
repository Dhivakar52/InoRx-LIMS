"use client";
import {useState, useRef, useEffect,} from "react";
import { Input } from "./../../ui/input";
import { Label } from "./../../ui/label";
import { X, ChevronDown } from "lucide-react";

interface Props {
  formData: any;
  errors: any;
  handleChange: (
    name: string,
    value: any
  ) => void;
  isViewMode: boolean;
}

export default function IRBAccreditationTab({
  formData,
  handleChange,
  isViewMode,
  errors,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accreditationOptions = [
  "CLIA",
  "CAP",
  "ISO_15189",
  "NABL",
  "LOCAL_REGULATORY",
];

const handleAccreditationChange = (
  value: string
) => {
  const selected =
    formData.accreditationTypes || [];

  const updated =
    selected.includes(value)
      ? selected.filter(
          (x: string) =>
            x !== value
        )
      : [...selected, value];

  handleChange(
    "accreditationTypes",
    updated
  );
};
useEffect(() => {
  const handleOutsideClick = (
    event: MouseEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
      )
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleOutsideClick
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleOutsideClick
    );
}, []);
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>
          Local IRB Name<span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          disabled={isViewMode}
          maxLength={150}
          value={
            formData.localIRBName || ""
          }
          onChange={(e: any) =>
            handleChange(
              "localIRBName",
              e.target.value
            )
          }
         className="w-full border rounded-md h-10 px-3 mt-1"/>
        {errors.localIRBName && (
          <p className="text-red-500 text-xs">
            {errors.localIRBName}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
          IRB Registration Number <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input
          disabled={isViewMode}
          maxLength={50}
          value={
            formData.irbRegistrationNumber ||
            ""
          }
          onChange={(e: any) =>
            handleChange(
              "irbRegistrationNumber",
              e.target.value
            )
          }
         className="w-full border rounded-md h-10 px-3 mt-1"/>

        {errors.irbRegistrationNumber && (
          <p className="text-red-500 text-xs">
            {
              errors.irbRegistrationNumber
            }
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label>
          Accreditation Expiry <span className="text-red-500 ml-1">*</span>
        </Label>
        <Input  type="date" disabled={isViewMode}
          value={
            formData.accreditationExpiry ||
            ""
          }
          onChange={(e: any) =>
            handleChange(
              "accreditationExpiry",
              e.target.value
            )
          }
         className="w-full border rounded-md h-10 px-3 mt-1" />
        {errors.accreditationExpiry && (
          <p className="text-red-500 text-xs">
            {
              errors.accreditationExpiry
            }
          </p>
        )}
      </div>
      <div className="space-y-2 relative" ref={dropdownRef}>
          <Label>Accreditation Type</Label>
          <div
            onClick={() =>
              !isViewMode &&
              setIsOpen(!isOpen)
            }
            className="
              w-full
              border border-gray-300
              rounded-md
              min-h-[40px]
              px-3 py-2
              bg-white
              flex items-center justify-between
              cursor-pointer
              hover:border-[#00458F]
            "
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {formData.accreditationTypes?.length >
              0 ? (
                formData.accreditationTypes.map(
                  (item: string) => (
                    <span
                      key={item}
                      className="
                        inline-flex items-center
                        gap-1
                        bg-blue-50
                        text-[#00458F]
                        border border-blue-200
                        px-2 py-1
                        rounded
                        text-xs
                      "
                    >
                      {item}

                      {!isViewMode && (
                        <X
                          size={12}
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccreditationChange(
                              item
                            );
                          }}
                        />
                      )}
                    </span>
                  )
                )
              ) : (
                <span className="text-gray-400 text-sm">
                  Select Accreditation
                </span>
              )}
            </div>

            <ChevronDown
              size={16}
              className={`transition-transform ${
                isOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </div>
          {isOpen && (
            <div
              className="
                absolute
                top-full
                left-0
                right-0
                mt-1
                z-50
                bg-white
                border border-gray-300
                rounded-md
                shadow-md
                max-h-56
                overflow-auto
              "
            >
              {accreditationOptions.map(
                (item) => (
                  <label
                    key={item}
                    className="
                      flex items-center
                      gap-2
                      px-3 py-2
                      hover:bg-gray-50
                      cursor-pointer
                    "
                  >
                    <input
                      type="checkbox"
                      checked={
                        formData.accreditationTypes?.includes(
                          item
                        ) || false
                      }
                      onChange={() =>
                        handleAccreditationChange(
                          item
                        )
                      }
                    />

                    <span>{item}</span>
                  </label>
                )
              )}
            </div>
          )}
          {errors.accreditationTypes && (
            <p className="text-red-500 text-xs">
              {errors.accreditationTypes}
            </p>
          )}
        </div>
      <div className="col-span-2">
        <Label>GCP Certificate Upload</Label>
        <div className="grid grid-cols-2 gap-4 mt-2">

          <div>
            <input
              id="gcpCertificate"
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const newFiles = Array.from(
                  e.target.files || []
                );

                handleChange(
                  "gcpCertificate",
                  [
                    ...(formData.gcpCertificate || []),
                    ...newFiles,
                  ]
                );
              }}
            />

            <label
              htmlFor="gcpCertificate"
              className={`
                flex flex-col items-center justify-center
                w-full h-[160px]
                border-2 border-dashed
                rounded-lg
                cursor-pointer
                bg-gray-50
                hover:bg-gray-100
                transition-all
                ${
                  errors.gcpCertificate
                    ? "border-red-400"
                    : "border-gray-300 hover:border-[#00458F]"
                }
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>

              <span className="font-medium text-sm">
                Click to Upload
              </span>

              <span className="text-xs text-gray-500 mt-2">
                PDF / DOC / DOCX
              </span>

              <span className="text-xs text-gray-500">
                Multiple Files Allowed
              </span>
            </label>
          </div>
          <div
            className="rounded-lg min-h-[160px] max-h-[160px] overflow-y-auto p-3 bg-white">
            {formData.gcpCertificate?.length > 0 ? (
              <div className="space-y-2">
                {formData.gcpCertificate.map(
                  (
                    file: File,
                    index: number
                  ) => (
                    <div
                      key={index}
                      className=" flex  items-center  justify-between border  rounded-md px-3 py-2 ">
                      <span
                        className=" text-blue-600 cursor-pointer hover:underline truncate flex-1 "
                        onClick={() => {
                          const fileUrl =
                            URL.createObjectURL(
                              file
                            );
                          window.open(
                            fileUrl,
                            "_blank"
                          );
                        }}>
                        {file.name}
                      </span>
                      {!isViewMode && (
                        <button type="button"
                          onClick={() => {
                            const updated =
                              formData.gcpCertificate.filter(
                                (
                                  _: File,
                                  i: number
                                ) =>
                                  i !== index
                              );
                            handleChange(
                              "gcpCertificate",
                              updated
                            );
                          }} >
                          <X
                            size={16}
                            className="text-red-500"
                          />
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                className=" h-full flex items-center justify-center text-sm text-gray-400 ">
                {/* No files uploaded */}
              </div>
            )}
          </div>

        </div>
        {errors.gcpCertificate && (
          <p className="text-red-500 text-xs mt-1">
            {errors.gcpCertificate}
          </p>
        )}
      </div>
    </div>
  );
}