import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SecurityBadge } from '@/components/ui/SecurityBadge';
import { RoleSwitcher } from '@/components/ui/RoleSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

interface Officer {
  psId: string;
  name: string;
  rank: string;
  role: string;
  district: string;
  station: string;
  lastLogin: string;
  status: 'Active' | 'Locked';
}

export function GovernancePage() {
  const { user, role } = useAuth();
  const { t } = useLanguage();

  // Mock list of officers
  const [officers, setOfficers] = useState<Officer[]>([
    {
      psId: "KA/BLR/C/HSR-001",
      name: "SI Rajesh Kumar",
      rank: "Sub-Inspector",
      role: "investigator",
      district: "Bengaluru Urban",
      station: "HSR Layout PS",
      lastLogin: "2026-06-20T08:30:00Z",
      status: "Active"
    },
    {
      psId: "KA/BLR/C/JAY-002",
      name: "Inspector Shivanna M.",
      rank: "Inspector",
      role: "supervisor",
      district: "Bengaluru Urban",
      station: "Jayanagar PS",
      lastLogin: "2026-06-20T09:12:00Z",
      status: "Active"
    },
    {
      psId: "KA/MYS://N-045",
      name: "SI Lokesh Gowda",
      rank: "Sub-Inspector",
      role: "investigator",
      district: "Mysuru",
      station: "Mysuru North PS",
      lastLogin: "2026-06-19T21:40:00Z",
      status: "Active"
    },
    {
      psId: "KA/MNG/E-102",
      name: "Inspector Fatima B.",
      rank: "Inspector",
      role: "analyst",
      district: "Mangaluru",
      station: "Mangaluru East PS",
      lastLogin: "2026-06-20T05:00:00Z",
      status: "Active"
    },
    {
      psId: "KA/SCRB/HQ-001",
      name: "SP Divya J. (IPS)",
      rank: "SP - SCRB HQ",
      role: "policymaker",
      district: "Bengaluru Urban",
      station: "SCRB HQ",
      lastLogin: "2026-06-20T11:00:00Z",
      status: "Active"
    }
  ]);

  // Modal open states
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New officer form state
  const [newPsId, setNewPsId] = useState('');
  const [newName, setNewName] = useState('');
  const [newRank, setNewRank] = useState('Sub-Inspector');
  const [newRole, setNewRole] = useState('investigator');
  const [newDistrict, setNewDistrict] = useState('Bengaluru Urban');
  const [newStation, setNewStation] = useState('');

  // Handle revoking access
  const handleToggleStatus = (psId: string) => {
    setOfficers(prev => prev.map(o => {
      if (o.psId === psId) {
        return {
          ...o,
          status: o.status === 'Active' ? 'Locked' : 'Active'
        };
      }
      return o;
    }));
  };

  // Handle adding a new officer
  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPsId || !newName || !newStation) return;

    const newOfficer: Officer = {
      psId: newPsId,
      name: newName,
      rank: newRank,
      role: newRole,
      district: newDistrict,
      station: newStation,
      lastLogin: "Never Logged In",
      status: "Active"
    };

    setOfficers(prev => [...prev, newOfficer]);
    setShowAddModal(false);
    
    // Clear form
    setNewPsId('');
    setNewName('');
    setNewStation('');
  };

  const isSupervisor = role === 'supervisor';

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-xs">
      
      {/* Header Banner */}
      <div className="bg-ksp-navy text-white p-6 rounded-lg shadow border-l-4 border-ksp-red flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('f12Title') || 'F12: Secure Access & Governance'}</h1>
          <p className="text-sm text-ksp-gray-300 mt-1">
            {t('f12Desc') || 'Configure five-tier role permissions, switch sandbox authorization profiles, and manage system operators.'}
          </p>
        </div>
        {isSupervisor && (
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-ksp-red hover:bg-ksp-red-light text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 border border-red-900 transition-colors shadow-sm"
          >
            <Lucide.UserPlus size={16} /> Register New Officer
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Profile & Sandbox Switcher (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* User Profile Context */}
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2 dark:text-white dark:border-ksp-navy-light">
              <Lucide.User size={16} /> {t('authenticatedProfile')}
            </h2>
            
            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('officerName')}</span>
                  <span className="text-sm font-bold text-ksp-navy dark:text-sky-300">{user.name}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('psIdentifier')}</span>
                  <span className="text-sm font-mono font-bold text-ksp-navy dark:text-sky-300">{user.psId}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('rankDesignation')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800 dark:text-ksp-gray-200">{user.rank}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('authorizedRole')}</span>
                  <span className="text-sm font-semibold text-ksp-red uppercase font-mono">{user.role}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('homeDistrict')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800 dark:text-ksp-gray-200">{user.district}</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-ksp-gray-600 font-semibold uppercase dark:text-ksp-gray-400">{t('attachedPs')}</span>
                  <span className="text-sm font-medium text-ksp-gray-800 dark:text-ksp-gray-200">{user.station}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-ksp-gray-600">No active profile context detected.</p>
            )}
          </div>

          {/* Role switcher for demo purposes */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider pl-1 dark:text-white">
              Role Permission Sandbox
            </h2>
            <RoleSwitcher />
          </div>
        </div>

        {/* Right: Security Badges & Indicators (5 Cols) */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
            <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider flex items-center gap-1.5 border-b border-ksp-gray-100 pb-2 dark:text-white dark:border-ksp-navy-light">
              <Lucide.Shield size={16} /> Active Gateways & Security Badges
            </h2>
            <div className="flex flex-col gap-3">
              <SecurityBadge icon="Lock" label="SHA-256 Aadhaar Hash masking" status="active" />
              <SecurityBadge icon="Radio" label="KSP Secured VPN Tunnel (Active)" status="active" />
              <SecurityBadge icon="FileText" label="Immutable Security Auditing Logs" status="active" />
              <SecurityBadge icon="Fingerprint" label="Live Biometric Gateway Verified" status="active" />
              <SecurityBadge icon="Clock" label="15-min Inactivity Auto-logout" status="active" />
            </div>
          </div>
        </div>
      </div>

      {/* Operator Directory */}
      <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
        <div className="bg-ksp-gray-50 border-b border-ksp-gray-200 px-4 py-3 flex justify-between items-center dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/40">
          <span className="text-xs font-bold text-ksp-navy font-mono dark:text-white">
            AUTHORIZED SYSTEM OPERATORS DIRECTORY
          </span>
          <span className="text-[10px] bg-ksp-success text-white px-2 py-0.5 rounded font-mono">
            BIOMETRIC REGISTRY ACTIVE
          </span>
        </div>

        {isSupervisor ? (
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ksp-gray-100 text-ksp-gray-800 uppercase font-semibold border-b border-ksp-gray-200 dark:bg-ksp-navy-light/20 dark:text-ksp-gray-200 dark:border-ksp-navy-light">
                  <th className="p-3">PS Identifier ID</th>
                  <th className="p-3">Officer Name</th>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Security Role</th>
                  <th className="p-3">Jurisdiction District</th>
                  <th className="p-3">Police Station</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ksp-gray-200 dark:divide-ksp-navy-light font-medium">
                {officers.map(officer => (
                  <tr key={officer.psId} className="hover:bg-ksp-gray-50 dark:hover:bg-ksp-navy-light/5">
                    <td className="p-3 font-mono font-bold text-ksp-navy dark:text-sky-300">{officer.psId}</td>
                    <td className="p-3 text-ksp-gray-800 dark:text-ksp-gray-200">{officer.name}</td>
                    <td className="p-3 text-ksp-gray-600 dark:text-ksp-gray-400">{officer.rank}</td>
                    <td className="p-3">
                      <span className="bg-ksp-gray-100 text-ksp-navy border border-ksp-gray-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono dark:bg-ksp-navy-light dark:text-sky-300 dark:border-ksp-navy-light">
                        {officer.role}
                      </span>
                    </td>
                    <td className="p-3 text-ksp-gray-800 dark:text-ksp-gray-200">{officer.district}</td>
                    <td className="p-3 text-ksp-gray-600 dark:text-ksp-gray-400">{officer.station}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${
                        officer.status === 'Active'
                          ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-900/30'
                          : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/30'
                      }`}>
                        {officer.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleToggleStatus(officer.psId)}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                          officer.status === 'Active'
                            ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100 dark:border-red-900 dark:text-red-400 dark:bg-red-950/20'
                            : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100 dark:border-green-900 dark:text-green-400 dark:bg-green-950/20'
                        }`}
                      >
                        {officer.status === 'Active' ? 'Revoke Access' : 'Restore Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center border-t border-ksp-gray-200 dark:border-ksp-navy-light text-ksp-gray-600 dark:text-ksp-gray-400 space-y-4">
            <Lucide.ShieldAlert size={36} className="mx-auto text-ksp-red animate-pulse" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm uppercase text-red-800 dark:text-red-400">
                DIRECTORY RESTRICTED TO SYSTEM SUPERVISORS
              </h4>
              <p className="text-[11px] leading-relaxed max-w-lg mx-auto font-medium">
                To manage system access directories, toggle officer accounts, or reset biometric authentication registries, use the <strong>Role Permission Sandbox</strong> selector above to elevate your role to <strong>Supervisor</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Officer Modal (MOCKED) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-ksp-navy-dark/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg border border-ksp-gray-300 shadow-xl max-w-md w-full overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
            <div className="bg-ksp-navy text-white px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase flex items-center gap-1.5">
                <Lucide.UserPlus size={18} /> Register Investigation Officer
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-ksp-gray-300 font-bold"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddOfficer} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">PS Identifier (PS ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KA/BLR/C/HSR-013"
                    value={newPsId}
                    onChange={(e) => setNewPsId(e.target.value)}
                    className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">Officer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SI Anand Gowda"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">Rank</label>
                    <select
                      value={newRank}
                      onChange={(e) => setNewRank(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    >
                      <option value="Sub-Inspector">Sub-Inspector</option>
                      <option value="Inspector">Inspector</option>
                      <option value="Deputy Superintendent (DySP)">DySP</option>
                      <option value="Superintendent (SP)">Superintendent (SP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">Security Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    >
                      <option value="investigator">Investigator</option>
                      <option value="analyst">Analyst</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="policymaker">Policymaker</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">District</label>
                    <select
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    >
                      <option value="Bengaluru Urban">Bengaluru Urban</option>
                      <option value="Mysuru">Mysuru</option>
                      <option value="Mangaluru">Mangaluru</option>
                      <option value="Hubballi-Dharwad">Hubballi-Dharwad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1 dark:text-ksp-gray-200">Police Station</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HSR Layout PS"
                      value={newStation}
                      onChange={(e) => setNewStation(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-ksp-gray-300 rounded text-ksp-gray-800 hover:bg-ksp-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-ksp-navy hover:bg-ksp-navy-light text-white font-bold px-5 py-2 rounded border border-ksp-navy-dark transition"
                >
                  Register Officer
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Role-Based Access Control (RBAC) & Governance Administration"
        department="State Police Headquarters (SPHQ) IT & Administration Wing"
        legalAuthority="Official Secrets Act & Information Technology (Reasonable Security Practices) Rules"
        purpose="Tiered officer permission enforcement, biometric verification management, station roster auditing, and session lock controls."
        steps={[
          {
            step: "01",
            action: "Inspect Security Clearance",
            detail: "Verify active officer tier (Investigator, Crime Analyst, Station Supervisor, HQ Policymaker) and access rights."
          },
          {
            step: "02",
            action: "Roster Management",
            detail: "Filter station personnel by role or station jurisdiction; lock inactive accounts or register newly commissioned officers."
          },
          {
            step: "03",
            action: "Role Switcher Simulation",
            detail: "Test UI access gating dynamically by switching role perspectives in the security testing console."
          }
        ]}
        tacticalTips={[
          "Supervisor and Policymaker roles hold statutory authority to approve warrants and export state-wide analytical intelligence.",
          "Locked officer credentials immediately revoke active session JWTs across all terminal clients."
        ]}
      />
    </div>
  );
}
