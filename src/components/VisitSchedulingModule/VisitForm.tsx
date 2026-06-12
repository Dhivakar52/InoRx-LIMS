"use client";

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// ==================== TYPES ====================
interface Visit {
  code: string;
  name: string;
  day: number;
  tol: number;
  status: 'COMPLETED' | 'SCHEDULED' | 'MISSED';
  date: string;
  kit: string;
  vials: string;
  storage: string;
}

interface Subject {
  id: string;
  name: string;
  baseline: string;
  arm: string;
  visits: Visit[];
}

interface Errors {
  subjectId?: string;
  visitId?: string;
  visitName?: string;
  status?: string;
  newProposedDate?: string;
  reschedReason?: string;
  reschedJustification?: string;
}

// ==================== MOCK DATABASE ====================
const subjectsDb: Record<string, Subject> = {
  "SUBJ-ONC-BOS-0024": {
    id: "SUBJ-ONC-BOS-0024",
    name: "John Doe (PII Encrypted)",
    baseline: "2026-06-12",
    arm: "ARM-A (Masked Cohort)",
    visits: [
      { code: "V01", name: "Day 1 Baseline Dosing", day: 1, tol: 0, status: "COMPLETED", date: "2026-06-12", kit: "KIT-ONC-A-0902", vials: "2x EDTA (Purple), 1x SST (Gold)", storage: "Refrigerate 2-8°C" },
      { code: "V02", name: "Week 2 Safety Review", day: 14, tol: 2, status: "COMPLETED", date: "2026-06-26", kit: "KIT-ONC-A-0904", vials: "1x SST (Gold)", storage: "Refrigerate 2-8°C" },
      { code: "V03", name: "Week 4 Biomarker Check", day: 28, tol: 3, status: "SCHEDULED", date: "2026-07-10", kit: "KIT-ONC-A-0912", vials: "3x EDTA (Purple), 2x SST (Gold)", storage: "Store -20°C after centrifuge" },
      { code: "V04", name: "Week 8 Efficacy Scan", day: 56, tol: 3, status: "SCHEDULED", date: "2026-08-07", kit: "KIT-ONC-A-0940", vials: "1x Blood Draw", storage: "Refrigerate 2-8°C" },
      { code: "V05", name: "Week 12 Protocol Exit", day: 84, tol: 4, status: "SCHEDULED", date: "2026-09-04", kit: "KIT-ONC-A-0992", vials: "2x EDTA, 2x SST", storage: "Centrifuge & Freeze -80°C" }
    ]
  },
  "SUBJ-ONC-LON-0019": {
    id: "SUBJ-ONC-LON-0019",
    name: "Clara Oswald (PII Encrypted)",
    baseline: "2026-06-20",
    arm: "ARM-B (Masked Cohort)",
    visits: [
      { code: "V01", name: "Day 1 Baseline Dosing", day: 1, tol: 0, status: "COMPLETED", date: "2026-06-20", kit: "KIT-ONC-B-0801", vials: "2x EDTA, 1x SST", storage: "Refrigerate 2-8°C" },
      { code: "V02", name: "Week 2 Safety Review", day: 14, tol: 2, status: "SCHEDULED", date: "2026-07-04", kit: "KIT-ONC-B-0812", vials: "1x SST", storage: "Refrigerate 2-8°C" },
      { code: "V03", name: "Week 4 Biomarker Check", day: 28, tol: 3, status: "SCHEDULED", date: "2026-07-18", kit: "KIT-ONC-B-0822", vials: "3x EDTA, 2x SST", storage: "Centrifuge & Freeze -80°C" }
    ]
  }
};

// ==================== HELPER FUNCTIONS ====================
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (dateStr: string, days: number): Date => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days - 1);
  return date;
};

const getWindowRange = (baseline: string, day: number, tol: number): string => {
  if (tol === 0) return "Anchor Visit (No window)";
  const targetDate = addDays(baseline, day);
  const minDate = new Date(targetDate);
  minDate.setDate(minDate.getDate() - tol);
  const maxDate = new Date(targetDate);
  maxDate.setDate(maxDate.getDate() + tol);
  return `${formatDate(minDate)} to ${formatDate(maxDate)}`;
};

// Validation functions (similar to AmendmentForm pattern)
const validateVisitId = (visitId: string, existingVisits: Visit[]): string | null => {
  if (!visitId?.trim()) {
    return "Visit ID is required";
  }
  const regex = /^[A-Z0-9\-]+$/i;
  if (!regex.test(visitId)) {
    return "Visit ID must contain only letters, numbers, and hyphens";
  }
  if (visitId.length > 20) {
    return "Visit ID cannot exceed 20 characters";
  }
  if (existingVisits.some(v => v.code === visitId)) {
    return `Visit ID "${visitId}" already exists`;
  }
  return null;
};

const validateVisitName = (visitName: string): string | null => {
  if (!visitName?.trim()) {
    return "Visit Name is required";
  }
  if (visitName.length > 100) {
    return "Visit Name cannot exceed 100 characters";
  }
  if (visitName.trim().length < 3) {
    return "Visit Name must be at least 3 characters";
  }
  return null;
};

const validateStatus = (status: string): string | null => {
  if (!status) {
    return "Status is required";
  }
  return null;
};

const validateRescheduleReason = (reason: string): string | null => {
  if (!reason) {
    return "Reason Code is required";
  }
  return null;
};

const validateRescheduleJustification = (justification: string): string | null => {
  if (!justification?.trim()) {
    return "Audit justification is required";
  }
  if (justification.trim().length < 20) {
    return "Audit justification must be at least 20 characters";
  }
  if (justification.length > 500) {
    return "Audit justification cannot exceed 500 characters";
  }
  return null;
};

const validateProposedDate = (proposedDate: string, currentDate: string): string | null => {
  if (!proposedDate) {
    return "Proposed date is required";
  }
  const proposed = new Date(proposedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (proposed < today) {
    return "Proposed date cannot be in the past";
  }
  
  if (proposedDate === currentDate) {
    return "Proposed date must be different from current scheduled date";
  }
  
  return null;
};

// ==================== MAIN COMPONENT ====================
export default function UnifiedVisitScheduler() {
  // State from original wizard
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [selectedRowIdx, setSelectedRowIdx] = useState<number | null>(null);
  
  // Error state (like AmendmentForm)
  const [errors, setErrors] = useState<Errors>({});
  
  // Reschedule state (Section 2)
  const [showRescheduleSection, setShowRescheduleSection] = useState(false);
  const [activeReschedIdx, setActiveReschedIdx] = useState<number | null>(null);
  const [newProposedDate, setNewProposedDate] = useState("");
  const [reschedReason, setReschedReason] = useState("");
  const [reschedJustification, setReschedJustification] = useState("");
  const [isDeviation, setIsDeviation] = useState(false);
  
  // Form status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ===== VISIT FORM FIELDS =====
  const [visitFormData, setVisitFormData] = useState({
    visitId: "",
    subject: "",
    visitName: "",
    status: ""
  });

  // Load subject data when selected
  useEffect(() => {
    if (selectedSubjectId && subjectsDb[selectedSubjectId]) {
      const subject = subjectsDb[selectedSubjectId];
      setActiveSubject(subject);
      setVisits([...subject.visits]);
      setVisitFormData(prev => ({ ...prev, subject: subject.id }));
      setSelectedRowIdx(null);
      setShowRescheduleSection(false);
      setErrors({});
    } else {
      setActiveSubject(null);
      setVisits([]);
      setVisitFormData(prev => ({ ...prev, subject: "" }));
    }
  }, [selectedSubjectId]);

  const selectRow = (idx: number, kit: string, vials: string, storage: string) => {
    setSelectedRowIdx(idx);
    const kitSerialEl = document.getElementById('kit-serial');
    const kitVialsEl = document.getElementById('kit-vials');
    const kitStorageEl = document.getElementById('kit-storage');
    if (kitSerialEl) kitSerialEl.innerText = kit;
    if (kitVialsEl) kitVialsEl.innerText = vials;
    if (kitStorageEl) kitStorageEl.innerText = storage;
  };

  const updateScheduledDate = (index: number, newVal: string) => {
    const updatedVisits = [...visits];
    updatedVisits[index].date = newVal;
    setVisits(updatedVisits);
    if (activeSubject) {
      activeSubject.visits = updatedVisits;
    }
  };

  const openRescheduleSection = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const visit = visits[index];
    if (!visit) return;
    
    setActiveReschedIdx(index);
    setNewProposedDate(visit.date);
    setReschedReason("");
    setReschedJustification("");
    setIsDeviation(false);
    setShowRescheduleSection(true);
    setErrors({});
    
    const auditVisitEl = document.getElementById('audit-visit-code');
    const auditOrigDateEl = document.getElementById('audit-orig-date');
    if (auditVisitEl) auditVisitEl.innerText = `${visit.code} - ${visit.name}`;
    if (auditOrigDateEl) auditOrigDateEl.innerText = visit.date;
    
    setTimeout(() => {
      document.getElementById('reschedule-audit-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const checkProposedDeviation = (proposedDateStr: string) => {
    if (!activeSubject || activeReschedIdx === null) return;
    const visit = visits[activeReschedIdx];
    const targetDateObj = addDays(activeSubject.baseline, visit.day);
    const proposedDate = new Date(proposedDateStr);
    const diffTime = Math.abs(proposedDate.getTime() - targetDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setIsDeviation(diffDays > visit.tol);
  };

  const handleProposedDateChange = (date: string) => {
    setNewProposedDate(date);
    checkProposedDeviation(date);
    // Clear error when user types
    if (errors.newProposedDate) {
      setErrors(prev => ({ ...prev, newProposedDate: undefined }));
    }
  };

  // Validate reschedule fields (similar to validateMetadata in AmendmentForm)
  const validateReschedule = (): boolean => {
    const newErrors: Errors = {};
    
    if (activeReschedIdx !== null) {
      const currentVisit = visits[activeReschedIdx];
      const dateError = validateProposedDate(newProposedDate, currentVisit?.date || "");
      if (dateError) newErrors.newProposedDate = dateError;
      
      const reasonError = validateRescheduleReason(reschedReason);
      if (reasonError) newErrors.reschedReason = reasonError;
      
      const justificationError = validateRescheduleJustification(reschedJustification);
      if (justificationError) newErrors.reschedJustification = justificationError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate visit form fields
  const validateVisitForm = (): boolean => {
    const newErrors: Errors = {};
    
    const visitIdError = validateVisitId(visitFormData.visitId, visits);
    if (visitIdError) newErrors.visitId = visitIdError;
    
    const visitNameError = validateVisitName(visitFormData.visitName);
    if (visitNameError) newErrors.visitName = visitNameError;
    
    const statusError = validateStatus(visitFormData.status);
    if (statusError) newErrors.status = statusError;
    
    if (!selectedSubjectId) {
      newErrors.subjectId = "Please select a subject first";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const commitRescheduleInline = () => {
    if (activeReschedIdx === null) return;
    
    // Validate before committing
    if (!validateReschedule()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors before submitting',
        confirmButtonColor: '#00458F'
      });
      return;
    }
    
    const updatedVisits = [...visits];
    updatedVisits[activeReschedIdx].date = newProposedDate;
    setVisits(updatedVisits);
    if (activeSubject) {
      activeSubject.visits = updatedVisits;
    }
    
    // Audit trail message based on deviation
    const auditMessage = isDeviation 
      ? 'FDA 21 CFR Part 11 Audit Trail log written successfully. Minor Protocol Deviation logged.'
      : 'FDA 21 CFR Part 11 Audit Trail log written successfully. New scheduled date authorized.';
    
    Swal.fire({
      icon: 'success',
      title: 'Reschedule Authorized',
      text: auditMessage,
      confirmButtonColor: '#00458F'
    });
    
    setShowRescheduleSection(false);
    setActiveReschedIdx(null);
    setNewProposedDate("");
    setReschedReason("");
    setReschedJustification("");
    setIsDeviation(false);
    setErrors({});
  };

  const cancelRescheduleInline = () => {
    setShowRescheduleSection(false);
    setActiveReschedIdx(null);
    setErrors({});
  };

  // ===== VISIT FORM HANDLERS =====
  const handleVisitFormChange = (field: string, value: string) => {
    setVisitFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field as keyof Errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleVisitFormSubmit = () => {
    if (!validateVisitForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors before adding visit',
        confirmButtonColor: '#00458F'
      });
      return;
    }
    
    const newVisit: Visit = {
      code: visitFormData.visitId,
      name: visitFormData.visitName,
      day: visits.length > 0 ? Math.max(...visits.map(v => v.day)) + 14 : 1,
      tol: 3,
      status: visitFormData.status === 'Completed' ? 'COMPLETED' : visitFormData.status === 'Scheduled' ? 'SCHEDULED' : 'SCHEDULED',
      date: new Date().toISOString().split('T')[0],
      kit: 'KIT-NEW-001',
      vials: '2x EDTA, 1x SST',
      storage: 'Refrigerate 2-8°C'
    };
    
    const updatedVisits = [...visits, newVisit];
    setVisits(updatedVisits);
    if (activeSubject) {
      activeSubject.visits = updatedVisits;
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Visit has been added successfully.',
      confirmButtonColor: '#00458F'
    });
    
    setVisitFormData(prev => ({
      visitId: "",
      subject: prev.subject,
      visitName: "",
      status: ""
    }));
    setErrors({});
  };

  // ===== SAVE DRAFT FUNCTION =====
  const saveDraft = () => {
    if (!activeSubject) {
      Swal.fire({
        icon: 'warning',
        title: 'No Subject Selected',
        text: 'Please select a subject before saving draft.',
        confirmButtonColor: '#00458F'
      });
      return;
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Draft Saved',
      text: `Visit schedule for ${activeSubject.id} has been saved as draft.`,
      confirmButtonColor: '#00458F'
    });
  };

  // ===== SAVE & SUBMIT FUNCTION =====
  const saveSchedule = () => {
    if (!activeSubject) {
      Swal.fire({
        icon: 'warning',
        title: 'No Subject Selected',
        text: 'Please select a subject before saving.',
        confirmButtonColor: '#00458F'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      Swal.fire({
        icon: 'success',
        title: 'Schedule Saved!',
        text: 'Subject visit calendar schedule updated and committed to LIMS database. Dynamic notifications dispatched.',
        confirmButtonColor: '#00458F'
      });
      setIsSubmitting(false);
    }, 1000);
  };

  // ===== CANCEL FUNCTION =====
  const handleCancel = () => {
    Swal.fire({
      title: 'Cancel Changes?',
      text: 'Any unsaved changes will be lost. Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel',
      cancelButtonText: 'No, Stay',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#6C757D'
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedSubjectId("");
        setActiveSubject(null);
        setVisits([]);
        setSelectedRowIdx(null);
        setShowRescheduleSection(false);
        setVisitFormData({
          visitId: "",
          subject: "",
          visitName: "",
          status: ""
        });
        setErrors({});
        Swal.fire({
          icon: 'info',
          title: 'Cancelled',
          text: 'Changes have been discarded.',
          confirmButtonColor: '#00458F'
        });
      }
    });
  };

  // Render matrix rows
  const renderMatrixRows = () => {
    if (!activeSubject || visits.length === 0) return null;
    
    return visits.map((visit, idx) => {
      const targetDateObj = addDays(activeSubject.baseline, visit.day);
      const targetDateStr = formatDate(targetDateObj);
      const windowRange = getWindowRange(activeSubject.baseline, visit.day, visit.tol);
      
      let statusClass = "";
      if (visit.status === 'COMPLETED') statusClass = "status-completed";
      else if (visit.status === 'SCHEDULED') statusClass = "status-scheduled";
      else statusClass = "status-missed";
      
      return (
        <tr 
          key={visit.code} 
          className={selectedRowIdx === idx ? 'selected-row' : ''}
          onClick={() => selectRow(idx, visit.kit, visit.vials, visit.storage)}
          style={{ cursor: 'pointer' }}
        >
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}><strong>{visit.code}</strong></td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}>{visit.name}</td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}>Day {visit.day}</td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}>{targetDateStr}</td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6', fontSize: '12px', color: '#6C757D' }}>{windowRange}</td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}>
            <input 
              type="date" 
              value={visit.date}
              onChange={(e) => updateScheduledDate(idx, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={{ height: '32px', padding: '0 8px', width: '140px', borderRadius: '4px', border: '1px solid #DEE2E6' }}
            />
          </td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6' }}>
            <span className={`status-badge ${statusClass}`}>{visit.status}</span>
          </td>
          <td style={{ padding: '12px 16px', border: '1px solid #DEE2E6', textAlign: 'center' }}>
            <button 
              type="button" 
              className="btn-action"
              onClick={(e) => openRescheduleSection(e, idx)}
            >
              Reschedule
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Header with Title */}
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Subject Visit Scheduling</h1>
        </div>

        {/* SUBJECT SELECTOR CARD */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Subject ID <span className="text-red-500">*</span>
              </label>
              <select 
                value={selectedSubjectId} 
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                  errors.subjectId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" disabled>-- Choose Subject --</option>
                <option value="SUBJ-ONC-BOS-0024">SUBJ-ONC-BOS-0024</option>
                <option value="SUBJ-ONC-LON-0019">SUBJ-ONC-LON-0019</option>
              </select>
              {errors.subjectId && (
                <p className="text-red-500 text-xs mt-1">{errors.subjectId}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Full Name</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
                {activeSubject?.name || '-'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Baseline Dosing Date (Day 1)</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
                {activeSubject?.baseline || '-'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Treatment Arm</label>
              <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">
                {activeSubject?.arm || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* VISIT MATRIX TABLE */}
        <div className="mb-6">
          <div className="bg-[#1F497D] text-white px-4 py-3 rounded-t-lg">
            <h3 className="font-semibold">Subject Visit Schedule Matrix</h3>
          </div>
          <div className="overflow-x-auto border border-t-0 border-gray-200 rounded-b-lg">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Visit Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Visit Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Target Day</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Target Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Window Range</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Scheduled Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-200">Status</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visits.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-8 border border-gray-200">
                      Please select a Subject ID from the dropdown to load and compute the protocol visit schedule matrix.
                    </td>
                  </tr>
                ) : renderMatrixRows()}
              </tbody>
            </table>
          </div>
        </div>

        {/* RESCHEDULING AUDIT SECTION */}
        {showRescheduleSection && (
          <div id="reschedule-audit-section" className="mb-6 border border-yellow-200 rounded-lg overflow-hidden">
            <div className="bg-yellow-50 px-4 py-3 border-b border-yellow-200">
              <h3 className="font-semibold text-yellow-800">Section 2: Rescheduling Audit & Deviation Verification</h3>
            </div>
            <div className="p-4 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selected Visit Mapped</label>
                  <div id="audit-visit-code" className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">-</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Scheduled Date</label>
                  <div id="audit-orig-date" className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700">-</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Proposed Date <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="date" 
                    value={newProposedDate}
                    onChange={(e) => handleProposedDateChange(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                      errors.newProposedDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.newProposedDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.newProposedDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reason Code <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={reschedReason} 
                    onChange={(e) => {
                      setReschedReason(e.target.value);
                      if (errors.reschedReason) {
                        setErrors(prev => ({ ...prev, reschedReason: undefined }));
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                      errors.reschedReason ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="" disabled>-- Choose Reason --</option>
                    <option value="Patient Conflict">Patient Schedule Conflict</option>
                    <option value="Investigator Conflict">Investigator / Coordinator Unavailable</option>
                    <option value="Weather">Weather / Force Majeure</option>
                    <option value="Site Closure">Clinical Site Holiday/Closure</option>
                    <option value="Kit Shortage">Pre-analytical Vial/Kit Shortage</option>
                    <option value="Other">Other Justification (Required details)</option>
                  </select>
                  {errors.reschedReason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reschedReason}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Audit Justification Details (FDA 21 CFR Part 11 Compliance) <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    value={reschedJustification}
                    onChange={(e) => {
                      setReschedJustification(e.target.value);
                      if (errors.reschedJustification) {
                        setErrors(prev => ({ ...prev, reschedJustification: undefined }));
                      }
                    }}
                    placeholder="Provide detailed explanation for the reschedule change (FDA 21 CFR Part 11 Audit Trail log)..."
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] resize-none ${
                      errors.reschedJustification ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.reschedJustification && (
                    <p className="text-red-500 text-xs mt-1">{errors.reschedJustification}</p>
                  )}
                </div>
              </div>
              
              {isDeviation && (
                <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <div className="flex items-start gap-3">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-yellow-600 flex-shrink-0">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <div>
                      <strong className="text-yellow-800">Warning: Proposed Date is Out of Protocol Window Tolerance!</strong>
                      <p className="text-yellow-700 text-sm mt-1">The selected proposed date falls outside the allowed target window. Authorizing this reschedule will automatically file a <strong>Minor Protocol Deviation</strong> in LIMS.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelRescheduleInline}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel Reschedule
                </button>
                <button
                  onClick={commitRescheduleInline}
                  className="px-4 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#003570] transition-colors"
                >
                  Authorize & Apply Change
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SPECIMEN KIT MAPPINGS */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Section 3: Specimen Kit Mappings (Read-Only)</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">Kit Serial Number</span>
                <p id="kit-serial" className="text-gray-800 font-medium mt-1">KIT-001</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">Specimen Vials Required</span>
                <p id="kit-vials" className="text-gray-800 font-medium mt-1">3</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                <span className="text-xs font-semibold text-gray-500 uppercase">Storage Temperature Protocols</span>
                <p id="kit-storage" className="text-gray-800 font-medium mt-1">2-8°C</p>
              </div>
            </div>
          </div>
        </div>

        {/* ADD NEW VISIT RECORD SECTION */}
        <div className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700">Add New Visit Record</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit ID <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Visit ID" 
                  value={visitFormData.visitId}
                  onChange={(e) => handleVisitFormChange('visitId', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                    errors.visitId ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.visitId && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitId}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter Subject" 
                  value={visitFormData.subject}
                  disabled
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                />
                <p className="text-xs text-gray-400 mt-1">Auto-filled from selected subject</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visit Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Enter Visit Name" 
                  value={visitFormData.visitName}
                  onChange={(e) => handleVisitFormChange('visitName', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                    errors.visitName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.visitName && (
                  <p className="text-red-500 text-xs mt-1">{errors.visitName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status <span className="text-red-500">*</span>
                </label>
                <select 
                  value={visitFormData.status}
                  onChange={(e) => handleVisitFormChange('status', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00458F] ${
                    errors.status ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs mt-1">{errors.status}</p>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleVisitFormSubmit}
                className="px-4 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#003570] transition-colors"
              >
                Add Visit to Schedule
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>

          <div className="flex gap-3">
            <button
              onClick={saveDraft}
              className="px-5 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            >
              Save Draft
            </button>
            
            <button
              onClick={saveSchedule}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-md bg-[#00458F] text-white hover:bg-[#003570] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Visit Calendar"}
            </button>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>{`
        .status-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          text-transform: uppercase;
        }
        .status-scheduled {
          background-color: #E3F2FD;
          color: #0D47A1;
          border: 1px solid #BBDEFB;
        }
        .status-completed {
          background-color: #E8F5E9;
          color: #1B5E20;
          border: 1px solid #C8E6C9;
        }
        .status-missed {
          background-color: #FFEBEE;
          color: #C62828;
          border: 1px solid #FFCDD2;
        }
        .btn-action {
          background-color: white;
          border: 1px solid #DEE2E6;
          color: #00458F;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-action:hover {
          background-color: #00458F;
          color: white;
          border-color: #00458F;
        }
        .selected-row {
          background-color: #E7F1FF;
        }
        table tr:hover {
          background-color: #F8FAFC;
        }
      `}</style>
    </div>
  );
}