import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { TopHeader } from '@/components/layout/TopHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';

import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Page Imports
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ChatbotPage } from '@/pages/ChatbotPage';
import { NetworkAnalysisPage } from '@/pages/NetworkAnalysisPage';
import { HotspotIntelligencePage } from '@/pages/HotspotIntelligencePage';
import { PredictiveInsightsPage } from '@/pages/PredictiveInsightsPage';
import { OffenderProfilingPage } from '@/pages/OffenderProfilingPage';
import { FaceSearchPage } from '@/pages/FaceSearchPage';
import { FinancialAnalysisPage } from '@/pages/FinancialAnalysisPage';
import { ReportsAuditPage } from '@/pages/ReportsAuditPage';
import { UserManagementPage } from '@/pages/UserManagementPage';
import { SettingsPage } from '@/pages/SettingsPage';

// F1-F12 Standalone Page Imports
import { TrendsAnalyticsPage } from '@/pages/TrendsAnalyticsPage';
import { SociologicalInsightsPage } from '@/pages/SociologicalInsightsPage';
import { RecidivismEnginePage } from '@/pages/RecidivismEnginePage';
import { DecisionSupportPage } from '@/pages/DecisionSupportPage';
import { ForecastingAlertsPage } from '@/pages/ForecastingAlertsPage';
import { ExplainableAiPage } from '@/pages/ExplainableAiPage';
import { GovernancePage } from '@/pages/GovernancePage';
import { OperationalSimulationPage } from '@/pages/OperationalSimulationPage';
import { RealTimeCrimeCenterPage } from '@/pages/RealTimeCrimeCenterPage';

export function App() {
  const { isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('ksp_dark_mode');
    return saved === 'true';
  });

  // Sync dark mode class to document.documentElement and body on mount & change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const nextVal = !prev;
      localStorage.setItem('ksp_dark_mode', String(nextVal));
      return nextVal;
    });
  };

  // If not authenticated, the only allowed pages are /login and /citizen-search.
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/citizen-search" element={<FaceSearchPage isPublic={true} />} />
        <Route path="/citizen/report" element={<FaceSearchPage isPublic={true} />} />
        <Route path="/citizen" element={<FaceSearchPage isPublic={true} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'dark bg-[#071D3A] text-white' 
        : 'bg-[#FAF6F0] text-ksp-gray-800'
    }`}>
      {/* Sticky Header */}
      <TopHeader 
        currentLanguage={language}
        onLanguageChange={setLanguage}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Layout Area */}
      <div className="flex flex-1 relative">
        {/* Collapsible Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} onToggleCollapse={toggleSidebar} />

        {/* Content Body Container */}
        <main className={`flex-1 p-6 overflow-y-auto h-[calc(100vh-64px)] transition-colors duration-200 ${
          darkMode ? 'bg-[#020617]' : 'bg-[#FAF6F0]'
        }`}>
          <ErrorBoundary fallbackTitle="Module Interface Notice" fallbackMessage="The selected module encountered a rendering exception. Click retry below to reload.">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/network" element={<NetworkAnalysisPage />} />
              <Route path="/hotspots" element={<HotspotIntelligencePage />} />
              <Route path="/predictive" element={<PredictiveInsightsPage />} />
              <Route path="/offender-profiling" element={<OffenderProfilingPage />} />
              <Route path="/face-search" element={<FaceSearchPage />} />
              <Route path="/financial" element={<FinancialAnalysisPage />} />
              <Route path="/reports" element={<ReportsAuditPage />} />
              <Route path="/user-management" element={<UserManagementPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Dedicated Standalone Routes for F1-F12 Solutions */}
              <Route path="/trends-analytics" element={<TrendsAnalyticsPage />} />
              <Route path="/sociological-insights" element={<SociologicalInsightsPage />} />
              <Route path="/recidivism-engine" element={<RecidivismEnginePage />} />
              <Route path="/decision-support" element={<DecisionSupportPage />} />
              <Route path="/forecasting-alerts" element={<ForecastingAlertsPage />} />
              <Route path="/explainability" element={<ExplainableAiPage />} />
              <Route path="/governance" element={<GovernancePage />} />
              <Route path="/operational-simulation" element={<OperationalSimulationPage />} />
              <Route path="/rtcc" element={<RealTimeCrimeCenterPage />} />
              <Route path="/citizen-search" element={<FaceSearchPage isPublic={true} />} />
              <Route path="/citizen/report" element={<FaceSearchPage isPublic={true} />} />
              <Route path="/citizen" element={<FaceSearchPage isPublic={true} />} />
              
              {/* Fallback to Dashboard */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

