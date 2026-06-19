import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { X, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Props {
    formData: any;
    setFormData: any;
    errors: any;
}

export default function SampleManifest({
    formData,
    setFormData,
    errors
}: Props) {

  const sampleOptions = [
    { id: "SMP-2026-001", label: "SMP-2026-001 (Serum)" },
    { id: "SMP-2026-005", label: "SMP-2026-005 (Serum)" },
    { id: "SMP-2026-008", label: "SMP-2026-008 (Serum)" },
    { id: "SMP-2026-009", label: "SMP-2026-009 (Serum)" },
    { id: "SMP-2026-012", label: "SMP-2026-012 (Plasma)" },
  ];
  
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedSamples = formData.samplesToShip || [];
  const mode = searchParams.get("mode");
  const isViewMode = mode === "view";

  // Close dropdown menu if user clicks anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle item additions or removals
  const handleSelectSample = (sampleId: string) => {
    if (selectedSamples.includes(sampleId)) {
      const updated = selectedSamples.filter((id: string) => id !== sampleId);
      handleChange("samplesToShip", updated);
    } else {
      handleChange("samplesToShip", [...selectedSamples, sampleId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* <div className="border-b"></div> */}

        <div className="space-y-2 relative z-50"
            ref={dropdownRef}
            >
            <Label>
                Select Samples to Ship<span className="text-red-500">*</span>
            </Label>

                <div
                onClick={() => !isViewMode && setIsOpen(!isOpen)}
                className="flex min-h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm"
                >
                   
                <div className="flex flex-wrap gap-1.5 items-center flex-1 pr-6">
                {selectedSamples.length === 0 && (
                    <span className="text-muted-foreground">Select Samples</span>
                )}
                
                {selectedSamples.map((sampleId: string) => (
                    <div
                    key={sampleId}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 font-medium text-xs px-2 py-1 rounded-sm border border-blue-100 z-10"
                    onClick={(e) => e.stopPropagation()} // Stop menu toggle on pill click
                    >
                    <span>{sampleId}</span>
                    {!isViewMode && (
                        <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSelectSample(sampleId);
                        }}
                        className="hover:bg-blue-100 rounded p-0.5 text-blue-500 transition-colors"
                        >
                        <X className="h-3 w-3" />
                        </button>
                    )}
                    </div>
                ))}
                </div>

                <div className="text-muted-foreground opacity-50 shrink-0">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
            </div>

            {/* Floating list selection popup options matching design guidelines */}
            {isOpen && !isViewMode && (
                <div className="absolute left-0 right-0 top-full mt-1 max-h-60 w-full overflow-auto rounded-md border border-input bg-popover text-popover-foreground shadow-md z-50 p-1 bg-white">
                {sampleOptions.map((option) => {
                    const isSelected = selectedSamples.includes(option.id);
                    return (
                    <div
                        key={option.id}
                        onClick={() => handleSelectSample(option.id)}
                        className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-slate-100 ${
                        isSelected ? "bg-slate-50 font-medium text-blue-600" : "text-slate-900"
                        }`}
                    >
                        <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {isSelected && <span className="text-xs font-bold text-blue-600">✓</span>}
                        </div>
                    </div>
                    );
                })}
                </div>
            )}

            {errors.samplesToShip && (
                <p className="text-red-500 text-xs mt-1">
                {errors.samplesToShip}
                </p>
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Biohazard / Dangerous Goods Class */}
            <div className="space-y-2">
                <Label>Biohazard / Dangerous Goods Class <span className="text-red-500">*</span></Label>
                <Select
                    value={formData.biohazardGoodsClass}
                    onValueChange={(v) => handleChange("biohazardGoodsClass", v)}
                    disabled={isViewMode}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Dangerous Goods Class" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="UN3373">UN3373 Human Biological Substance, Category B</SelectItem>
                    <SelectItem value="Exempt">Exempt Human Specimen</SelectItem>
                    <SelectItem value="UN1845">UN1845 Dry Ice (with UN3373)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.biohazardGoodsClass && (
                            <p className="text-red-500 text-xs mt-1">
                            {errors.biohazardGoodsClass}
                            </p>
                        )}
            </div>
            {/* Total Sample Count */}
            <div className="space-y-2">
                <Label>Total Sample Count</Label>
                <Input 
                    type="number"
                    min={0}
                    disabled={isViewMode}
                    placeholder="Please Enter Total Sample Count"
                    value={formData.totalSampleCount || ""}
                    onChange={(e) => handleChange("totalSampleCount", e.target.value)} 
                />
                {errors.totalSampleCount && (
                    <p className="text-red-500 text-xs mt-1">
                    {errors.totalSampleCount}
                    </p>
                )}
            </div>
        </div>
    </div>
  );
}
