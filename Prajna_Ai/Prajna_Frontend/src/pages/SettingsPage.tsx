import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SecurityBadge } from '@/components/ui/SecurityBadge';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, User, Settings2, Accessibility, Info, Database } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  // Accessibility states (Mock)
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [highContrast, setHighContrast] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-ksp-navy text-white p-6 rounded-lg shadow border-l-4 border-ksp-red flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('settingsTitle')}</h1>
          <p className="text-sm text-ksp-gray-300 mt-1">
            {t('settingsDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-ksp-navy-light px-4 py-2 rounded border border-ksp-navy-dark text-xs">
          <Shield size={16} className="text-ksp-red" />
          <span className="font-mono text-ksp-gray-100">Preferences Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Profile & Role Switcher (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* User Profile Context */}
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2">
              <User size={16} /> {t('authenticatedProfile')}
            </h2>
            
            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('officerName')}</span>
                  <span className="text-sm font-bold text-ksp-navy">{user.name}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('psIdentifier')}</span>
                  <span className="text-sm font-mono font-bold text-ksp-navy">{user.psId}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('rankDesignation')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800">{user.rank}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('authorizedRole')}</span>
                  <span className="text-sm font-semibold text-ksp-red uppercase font-mono">{user.role}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('homeDistrict')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800">{user.district}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase">{t('attachedPs')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800">{user.station}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-ksp-gray-600">No active profile context detected.</p>
            )}
          </div>

          {/* Role switcher for demo purposes */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider pl-1">
              Role Permission Sandbox
            </h2>
            <RoleSwitcher />
          </div>

          {/* Accessibility Settings */}
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2">
              <Accessibility size={16} /> {t('accessibilityPrefs')}
            </h2>

            <div className="space-y-4 text-xs text-ksp-gray-800">
              
              {/* Font Size Selector */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold block">{t('fontScale')}</span>
                  <span className="text-ksp-gray-600 block">Scale typography for high-visibility readability.</span>
                </div>
                <div className="flex gap-2">
                  {(['sm', 'md', 'lg'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1 rounded font-bold uppercase transition ${
                        fontSize === size 
                          ? 'bg-ksp-navy text-white' 
                          : 'border border-ksp-gray-300 text-ksp-gray-800 hover:bg-ksp-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Mode */}
              <div className="flex items-center justify-between border-t border-ksp-gray-100 pt-3">
                <div>
                  <span className="font-semibold block">High Contrast Mode</span>
                  <span className="text-ksp-gray-600 block">Delineate structural components using high contrast lines.</span>
                </div>
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                    highContrast ? 'bg-ksp-navy' : 'bg-ksp-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                    highContrast ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

              {/* Alerts & Notifications */}
              <div className="flex items-center justify-between border-t border-ksp-gray-100 pt-3">
                <div>
                  <span className="font-semibold block">Live Crime Spikes Alerts</span>
                  <span className="text-ksp-gray-600 block">Receive browser toasts when high-risk early warning spikes occur.</span>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
                    notificationsEnabled ? 'bg-ksp-navy' : 'bg-ksp-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Security Indicators & System Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Security Protocols Indicators */}
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2">
              <Shield size={16} /> {t('activeBadges')}
            </h2>
            <div className="flex flex-col gap-3">
              <SecurityBadge icon="Lock" label="SHA-256 Aadhaar Hash masking" status="active" />
              <SecurityBadge icon="Radio" label="KSP Secured VPN Tunnel (Active)" status="active" />
              <SecurityBadge icon="FileText" label="Immutable Security Auditing Logs" status="active" />
              <SecurityBadge icon="Fingerprint" label="Live Biometric Gateway Verified" status="active" />
              <SecurityBadge icon="Clock" label="15-min Inactivity Auto-logout" status="active" />
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2">
              <Info size={16} /> {t('deploymentInfo')}
            </h2>
            
            <div className="space-y-3 text-xs text-ksp-gray-800">
              <div className="flex justify-between border-b border-ksp-gray-100 pb-1.5">
                <span className="font-semibold text-ksp-gray-600">Application Version</span>
                <span className="font-mono font-bold">v2.1.0 (CIRAS Production)</span>
              </div>
              <div className="flex justify-between border-b border-ksp-gray-100 pb-1.5">
                <span className="font-semibold text-ksp-gray-600">Zoho Catalyst Cloud tier</span>
                <span className="font-bold text-ksp-navy flex items-center gap-1">
                  <Database size={12} /> Catalyst Premium Gate
                </span>
              </div>
              <div className="flex justify-between border-b border-ksp-gray-100 pb-1.5">
                <span className="font-semibold text-ksp-gray-600">Catalyst Project ID</span>
                <span className="font-mono text-ksp-gray-600">ksp-ciras-production-2026</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-ksp-gray-600">Last Deployment Compile</span>
                <span className="font-mono text-ksp-gray-600">2026-06-20T18:50:00Z</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
