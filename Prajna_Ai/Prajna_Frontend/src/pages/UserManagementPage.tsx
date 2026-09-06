import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Shield, UserPlus, UserMinus, ShieldAlert, Key, Fingerprint, Lock, Unlock, AlertTriangle } from 'lucide-react';

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

export function UserManagementPage() {
  const { role } = useAuth();
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
    },
    {
      psId: "KA/HBL/C-082",
      name: "SI Anwar Pasha",
      rank: "Sub-Inspector",
      role: "investigator",
      district: "Hubballi-Dharwad",
      station: "Hubballi Central PS",
      lastLogin: "2026-06-18T14:22:00Z",
      status: "Active"
    },
    {
      psId: "KA/BEL/W-051",
      name: "SI Vijay Kumar",
      rank: "Sub-Inspector",
      role: "investigator",
      district: "Belagavi",
      station: "Belagavi Town PS",
      lastLogin: "2026-06-17T09:15:00Z",
      status: "Locked"
    },
    {
      psId: "KA/MYS://S-019",
      name: "Inspector Suresh Kumar",
      rank: "Inspector",
      role: "analyst",
      district: "Mysuru",
      station: "Mysuru South PS",
      lastLogin: "2026-06-20T10:05:00Z",
      status: "Active"
    },
    {
      psId: "KA/TUM/C-002",
      name: "SI Manjunath Gowda",
      rank: "Sub-Inspector",
      role: "investigator",
      district: "Tumakuru",
      station: "Tumakuru Central PS",
      lastLogin: "2026-06-19T18:30:00Z",
      status: "Active"
    },
    {
      psId: "KA/BLR/C/HSR-012",
      name: "WPC Savitha K.",
      rank: "Police Constable",
      role: "investigator",
      district: "Bengaluru Urban",
      station: "HSR Layout PS",
      lastLogin: "2026-06-15T08:00:00Z",
      status: "Locked"
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

  if (role !== 'supervisor') {
    return (
      <div className="bg-white rounded-lg border border-red-200 shadow-sm p-12 text-center max-w-2xl mx-auto mt-12 space-y-6">
        <ShieldAlert size={64} className="mx-auto text-ksp-red animate-pulse" />
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-red-900 uppercase">{t('accessRestrictedSupervisor')}</h2>
          <p className="text-xs text-ksp-gray-600 font-mono">
            Error Code: 403_ACCESS_DENIED_JURISDICTION_LOCK
          </p>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded text-xs text-red-900 text-left space-y-2">
          <p className="font-bold flex items-center gap-1">
            <AlertTriangle size={14} /> Security Advisory Notice:
          </p>
          <p>
            Your current assigned demo role is <span className="font-bold font-mono">[{role}]</span>. Access to the User Management and Security Credentials page is strictly reserved for <span className="font-bold font-mono">[supervisor]</span> (State Command Staff / Administrator).
          </p>
          <p>
            To test this page, go to the <span className="font-bold text-ksp-navy">Settings / Role Swapping</span> tab and switch your role to <span className="font-bold text-ksp-navy">Supervisor</span>.
          </p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-ksp-navy text-white p-6 rounded-lg shadow border-l-4 border-ksp-red flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t('userManagementTitle')}</h1>
          <p className="text-sm text-ksp-gray-300 mt-1">
            {t('userManagementDesc')}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-ksp-red hover:bg-ksp-red-light text-white font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 border border-red-900 transition-colors shadow-sm"
        >
          <UserPlus size={16} /> Register New Officer
        </button>
      </div>

      {/* Officers List Table */}
      <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm overflow-hidden">
        <div className="bg-ksp-gray-50 border-b border-ksp-gray-200 px-4 py-3 flex justify-between items-center">
          <span className="text-xs font-bold text-ksp-navy font-mono">
            AUTHORIZED SYSTEM OPERATORS ({officers.length})
          </span>
          <span className="text-[10px] bg-ksp-success text-white px-2 py-0.5 rounded font-mono">
            BIOMETRIC REGISTRY ACTIVE
          </span>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ksp-gray-100 text-ksp-gray-800 uppercase font-semibold border-b border-ksp-gray-200">
                <th className="p-3">PS Identifier ID</th>
                <th className="p-3">Officer Name</th>
                <th className="p-3">Rank</th>
                <th className="p-3">Security Role</th>
                <th className="p-3">Jurisdiction District</th>
                <th className="p-3">Police Station</th>
                <th className="p-3">Last Active Login</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ksp-gray-200 font-medium">
              {officers.map(officer => (
                <tr key={officer.psId} className="hover:bg-ksp-gray-50">
                  <td className="p-3 font-mono font-bold text-ksp-navy">{officer.psId}</td>
                  <td className="p-3 text-ksp-gray-800">{officer.name}</td>
                  <td className="p-3 text-ksp-gray-600">{officer.rank}</td>
                  <td className="p-3">
                    <span className="bg-ksp-gray-100 text-ksp-navy border border-ksp-gray-200 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono">
                      {officer.role}
                    </span>
                  </td>
                  <td className="p-3 text-ksp-gray-800">{officer.district}</td>
                  <td className="p-3 text-ksp-gray-600">{officer.station}</td>
                  <td className="p-3 text-ksp-gray-600 font-mono">
                    {officer.lastLogin.includes('T') 
                      ? new Date(officer.lastLogin).toLocaleString() 
                      : officer.lastLogin}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${
                      officer.status === 'Active'
                        ? 'bg-green-100 text-green-800 border-green-200'
                        : 'bg-red-100 text-red-800 border-red-200'
                    }`}>
                      {officer.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => handleToggleStatus(officer.psId)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors ${
                        officer.status === 'Active'
                          ? 'border-red-300 text-red-700 bg-red-50 hover:bg-red-100'
                          : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                      }`}
                    >
                      {officer.status === 'Active' ? 'Revoke Access' : 'Restore Access'}
                    </button>
                    <button
                      onClick={() => alert(`Biometric enrollment workflow triggered for ${officer.name}`)}
                      className="border border-ksp-navy text-ksp-navy hover:bg-ksp-gray-50 px-2.5 py-1 rounded text-[10px] font-bold transition-colors"
                    >
                      Re-enroll Biometric
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Officer Modal (MOCKED) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-ksp-navy-dark/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-lg border border-ksp-gray-300 shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-ksp-navy text-white px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase flex items-center gap-1.5">
                <UserPlus size={18} /> Register Investigation Officer
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
                  <label className="block font-semibold text-ksp-gray-800 mb-1">PS Identifier (PS ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KA/BLR/C/HSR-013"
                    value={newPsId}
                    onChange={(e) => setNewPsId(e.target.value)}
                    className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-ksp-gray-800 mb-1">Officer Name (as in Aadhaar)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SI Anand Gowda"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1">Rank</label>
                    <select
                      value={newRank}
                      onChange={(e) => setNewRank(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800"
                    >
                      <option value="Sub-Inspector">Sub-Inspector</option>
                      <option value="Inspector">Inspector</option>
                      <option value="Deputy Superintendent (DySP)">DySP</option>
                      <option value="Superintendent (SP)">Superintendent (SP)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1">System Security Role</label>
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800"
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
                    <label className="block font-semibold text-ksp-gray-800 mb-1">District</label>
                    <select
                      value={newDistrict}
                      onChange={(e) => setNewDistrict(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded bg-white text-ksp-gray-800"
                    >
                      <option value="Bengaluru Urban">Bengaluru Urban</option>
                      <option value="Mysuru">Mysuru</option>
                      <option value="Mangaluru">Mangaluru</option>
                      <option value="Hubballi-Dharwad">Hubballi-Dharwad</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-ksp-gray-800 mb-1">Police Station</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HSR Layout PS"
                      value={newStation}
                      onChange={(e) => setNewStation(e.target.value)}
                      className="w-full p-2 border border-ksp-gray-200 rounded focus:ring-1 focus:ring-ksp-navy"
                    />
                  </div>
                </div>

              </div>

              {/* Security Advisory */}
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-950 flex items-start gap-1.5">
                <Fingerprint size={18} className="shrink-0 text-ksp-red mt-0.5" />
                <div>
                  <span className="font-bold block">Biometric Enrollment Required</span>
                  <span className="block mt-0.5">
                    Registering details does not grant database access. The officer must report to the SCRB Biometric center to register their fingerprint credentials mapping to this PS ID.
                  </span>
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

    </div>
  );
}
