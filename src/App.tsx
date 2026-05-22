// src/App.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './pages/HomePage';

import Login from './pages/auth/Login/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import type { UserRole } from './dataTypes/roles';
import { ROLE_PAGES } from './dataTypes/roles';
import { AuthProvider } from './components/ContextAPI/AuthContext.tsx';
import ForgotPassword from './pages/auth/Login/ForgotPassword.tsx';
import Study from './components/StudyModule/StudyMasterModule/Study.tsx';
import VerifyOtp from './pages/auth/Login/VerifyOtp';
import ResetPassword from './pages/auth/Login/ResetPassword';
import SiteModule from './components/StudyModule/SiteRegistrationModule/SiteModule.tsx';
import AmendmentModule from './components/StudyModule/StudyAmendmentModule/AmendmentModule.tsx';
import Adverse from './components/Subject/AdverseEvents/Adverse.tsx';
import Subject from './components/Subject/SubjectEnrollment/Subject.tsx';
import VisitSchedule from './components/VisitSchedulingModule/VisitSchedule.tsx';
import AmendmentForm from './components/StudyModule/StudyAmendmentModule/AmendmentForm.tsx';
import SiteForm from './components/StudyModule/SiteRegistrationModule/SiteForm.tsx';
import TestRegistration from './components/Test Registration/TestRegistration.tsx';
import TestRegistrationForm from "./components/Test Registration/TestRegistrationForm.tsx";
import GenerateReport from "./components/Reports/GenerateReport.tsx";
import Result from "./components/ResultModule/Result.tsx";
import Dashboard from './components/Dashboard/Dashboard.tsx';
import StudyMasterStepper from './components/StudyModule/StudyMasterModule/StudyMasterStepper.tsx';

// Import all 5 modules

import VisitForm from './components/VisitSchedulingModule/VisitForm.tsx';
import AnalyzerIntegrationTable from './components/AnalyzerIntegrationModule/AnalyzerIntegrationTable.tsx';
import AnalyzerForm from './components/AnalyzerIntegrationModule/AnalyzerForm.tsx';
import BiobankManagementTable from './components/BiobankModule/BiobankManagementTable.tsx';
import BiobankForm from './components/BiobankModule/BiobankForm.tsx';
import ResultsReviewTable from './components/ResultsReviewModule/ResultsReviewTable.tsx';
import ResultsForm from './components/ResultsReviewModule/ResultsForm.tsx';
import FinalQCApprovalTable from './components/FinalQCApproval/FinalQCApprovalTable.tsx';
import QcForm from './components/FinalQCApproval/QcForm.tsx';

const HomeWithKey = () => {
  const location = useLocation();
  return <HomePage key={location.key} />;
};

const pageComponents: Record<string, React.ReactNode> = {
  'Admin': <Dashboard />,
  'Home': <HomeWithKey />,
  'Study': <Study />,
  'AmendmentModule': <AmendmentModule />,
  'SiteModule': <SiteModule />,
  'Enrollment': <Subject />,
  'Adverse': <Adverse />,
  'Visit': <VisitSchedule />,
  'TestRegistration': <TestRegistration />,
  'GenerateReport': <GenerateReport />,
  'Result': <Result />,
};

const getAllowedRoles = (pageLabel: string): UserRole[] => {
  const matches = Object.entries(ROLE_PAGES)
    .filter(([_, pages]) => pages.includes(pageLabel))
    .map(([role]) => role as UserRole);
  if (matches.length === 0) {
    return Object.keys(ROLE_PAGES) as UserRole[];
  }
  return matches;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null | undefined>(undefined);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole') as UserRole | null;
    setUserRole(storedRole);
  }, []);

  if (userRole === undefined) return null;

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login setUserRole={setUserRole} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<Layout />}>
            {Object.entries(pageComponents).map(([label, component]) => {
              const path = '/' + label.toLowerCase().replace(/\s+/g, '-');
              const allowedRoles = getAllowedRoles(label);
              return (
                <Route
                  key={label}
                  path={path}
                  element={
                    <ProtectedRoute userRole={userRole} allowedRoles={allowedRoles}>
                      {component}
                    </ProtectedRoute>
                  }
                />
              );
            })}

            {/* Visit Module */}
            <Route path="/visit" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><VisitSchedule /></ProtectedRoute>} />
            <Route path="/visit/new-add" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><VisitForm /></ProtectedRoute>} />

            {/* Analyzer Integration Module */}
            <Route path="/analyzer" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><AnalyzerIntegrationTable /></ProtectedRoute>} />
            <Route path="/analyzer/new-add" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><AnalyzerForm /></ProtectedRoute>} />

            {/* Biobank Management Module */}
            <Route path="/biobank" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><BiobankManagementTable /></ProtectedRoute>} />
            <Route path="/biobank/new-add" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><BiobankForm /></ProtectedRoute>} />

            {/* Results Review Module */}
            <Route path="/results" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><ResultsReviewTable /></ProtectedRoute>} />
            <Route path="/results/new-add" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><ResultsForm /></ProtectedRoute>} />

            {/* Final QC Approval Module */}
            <Route path="/qc" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><FinalQCApprovalTable /></ProtectedRoute>} />
            <Route path="/qc/new-add" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><QcForm /></ProtectedRoute>} />

            {/* Existing Routes */}
            <Route path="/study/master" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><Study /></ProtectedRoute>} />
            <Route path="/study/amendment" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><AmendmentModule /></ProtectedRoute>} />
            <Route path="/study/site" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><SiteModule /></ProtectedRoute>} />
            <Route path="/subject/enrollment" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><Subject /></ProtectedRoute>} />
            <Route path="/subject/adverse" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><Adverse /></ProtectedRoute>} />
            <Route path="/reports/generate" element={<ProtectedRoute userRole={userRole} allowedRoles={['admin']}><GenerateReport /></ProtectedRoute>} />
            <Route path="/study/master/new-add" element={<StudyMasterStepper />} />
            <Route path="/study/amendment/new-add" element={<AmendmentForm />} />
            <Route path="/testRegistration/new-add" element={<TestRegistrationForm />} />
            <Route path="/study/site/new-add" element={<SiteForm />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

