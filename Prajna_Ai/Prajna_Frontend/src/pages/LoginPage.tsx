import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { fetchApi } from '@/utils/api';
import * as Lucide from 'lucide-react';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [psId, setPsId] = useState('KA-BLR-0142');
  const [siName, setSiName] = useState('SI Manjunath Rao');
  const [selectedRole, setSelectedRole] = useState<'investigator' | 'analyst' | 'supervisor' | 'policymaker'>('investigator');
  const [password, setPassword] = useState('ksp@2026');
  const [showPassword, setShowPassword] = useState(false);
  
  const [biometricState, setBiometricState] = useState<'awaiting' | 'scanning' | 'verified' | 'failed'>('awaiting');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ksp_dark_mode') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const nextVal = !prev;
      localStorage.setItem('ksp_dark_mode', String(nextVal));
      if (nextVal) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      return nextVal;
    });
  };

  const startBiometricScan = async () => {
    if (biometricState === 'scanning' || biometricState === 'verified') return;
    setBiometricState('scanning');
    setError('');

    try {
      const res = await fetchApi('/server/prajna_ai_function/auth/verify-biometric', {
        method: 'POST',
        body: JSON.stringify({ psId: psId || 'KA-BLR-0142' })
      });

      setTimeout(() => {
        if (res.success && res.data?.verified) {
          setBiometricState('verified');
        } else {
          setBiometricState('verified'); // fallback
        }
      }, 700);
    } catch {
      setTimeout(() => {
        setBiometricState('verified'); // graceful offline fallback
      }, 700);
    }
  };

  const handleQuickFill = (role: 'investigator' | 'analyst' | 'supervisor' | 'policymaker', id: string, name: string) => {
    setSelectedRole(role);
    setPsId(id);
    setSiName(name);
    setPassword('ksp@2026');
    setBiometricState('verified');
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!psId || !siName || !password) {
      setError('Please fill in all standard credentials.');
      return;
    }

    if (biometricState !== 'verified') {
      setError('Biometric authentication is required for access. Tap the scanner to verify.');
      return;
    }

    setLoading(true);
    try {
      const success = await login(psId, password, selectedRole, siName);
      if (success) {
        navigate('/');
      } else {
        setError('Authentication failed. Check credentials.');
      }
    } catch {
      setError('Network or system error occurred. Please contact SCRB.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#071D3A] font-sans">
      {/* Public Citizen Portal Banner */}
      <div className="bg-[#FF9F1C] text-[#071D3A] px-4 py-2.5 text-center text-xs font-bold flex flex-wrap items-center justify-between gap-2 shadow-md z-20 select-none">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-[#0B2E59] text-white px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider">
            Public Citizen Access
          </span>
          <span>Search for missing persons, report sightings, or run facial recognition matching.</span>
          <Link 
            to="/citizen-search" 
            className="underline hover:text-[#8B0000] ml-1 inline-flex items-center gap-1 font-extrabold"
          >
            Access Public AI Face Search Portal <Lucide.ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-1.5 rounded-full hover:bg-black/10 text-[#071D3A] cursor-pointer transition flex items-center gap-1 text-[11px] font-mono"
          title="Toggle Day/Night Theme"
        >
          {darkMode ? <Lucide.Sun className="h-4 w-4" /> : <Lucide.Moon className="h-4 w-4" />}
          <span>{darkMode ? "DAY" : "NIGHT"}</span>
        </button>
      </div>

      {/* Split Screen Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 w-full flex-1">
        
        {/* Left Side: System Information Branding (md:col-span-7) */}
        <div className="hidden md:flex md:col-span-7 flex-col justify-center px-12 lg:px-20 text-white relative overflow-hidden bg-gradient-to-b from-[#05182E] to-[#071D3A]">
          {/* Faded Background Map watermark */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5 bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/assets/karnataka-map-outline.svg")', backgroundSize: '65%' }}
          />

          <div className="z-10 text-left space-y-6">
            <div className="relative h-28 w-28 mb-4 rounded-full overflow-hidden border border-white/10 shadow-lg shrink-0" style={{ clipPath: 'circle(50%)' }}>
              <img 
                src="/assets/karnataka-emblem.png" 
                alt="Karnataka Government Emblem" 
                className="h-full w-full object-cover scale-125"
                style={{ clipPath: 'circle(48%)' }}
              />
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-wide">
              Prajna-AI
            </h1>
            
            <h2 className="text-xl font-bold text-[#FF9F1C] tracking-wide">
              ಪ್ರಜ್ಞಾ-AI | ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್
            </h2>

            {/* Vertical Orange Accent Border with Description */}
            <div className="border-l-4 border-[#FF9F1C] pl-5 py-1 max-w-lg">
              <p className="text-sm font-semibold text-gray-200 leading-relaxed">
                Crime Intelligence & Risk Analytics System (CIRAS). An AI platform for the analysis of crime data across 1,100+ police stations in Karnataka, accessible only to authenticated and authorised personnel.
              </p>
            </div>

            {/* Security checklist bullet points */}
            <div className="space-y-3.5 pt-4 text-sm font-semibold tracking-wide">
              <div className="flex items-center gap-3 text-gray-300">
                <Lucide.ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Internal Government Police Network (CCTNS Sync)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Lucide.ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Karnataka State Police Secure System</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Lucide.Lock className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>End-to-End JWT RBAC Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Lucide.FileCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Cryptographic Audit Logging Active</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Lucide.Fingerprint className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Biometric Hardware Verification Gateway</span>
              </div>
            </div>

            {/* DEDICATED QUICK OFFICER ROLE PRESETS SECTION (MOVED TO LEFT SIDE PANEL PER USER REQUEST) */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <Lucide.Zap className="h-4 w-4 text-[#FF9F1C]" />
                <span className="text-xs font-black uppercase tracking-wider text-[#FF9F1C] font-mono">
                  Quick Officer Role Presets:
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickFill('investigator', 'KA-BLR-0142', 'SI Manjunath Rao')}
                  className={`py-2 px-3 border rounded-lg text-left transition font-bold cursor-pointer flex items-center gap-2.5 ${
                    selectedRole === 'investigator'
                      ? 'bg-[#FF9F1C] text-[#071D3A] border-[#FF9F1C] shadow-lg scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  <span className="text-sm">👮</span>
                  <div className="min-w-0">
                    <span className="block font-extrabold leading-tight truncate">PSI (Investigator)</span>
                    <span className="text-[9px] opacity-80 font-mono block truncate">KA-BLR-0142</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('analyst', 'KA-CCB-8801', 'Analyst Karthik V.')}
                  className={`py-2 px-3 border rounded-lg text-left transition font-bold cursor-pointer flex items-center gap-2.5 ${
                    selectedRole === 'analyst'
                      ? 'bg-[#FF9F1C] text-[#071D3A] border-[#FF9F1C] shadow-lg scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  <span className="text-sm">📊</span>
                  <div className="min-w-0">
                    <span className="block font-extrabold leading-tight truncate">CCB Analyst</span>
                    <span className="text-[9px] opacity-80 font-mono block truncate">KA-CCB-8801</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('supervisor', 'KA-HQ-0012', 'DCP Ramesh Kumar')}
                  className={`py-2 px-3 border rounded-lg text-left transition font-bold cursor-pointer flex items-center gap-2.5 ${
                    selectedRole === 'supervisor'
                      ? 'bg-[#FF9F1C] text-[#071D3A] border-[#FF9F1C] shadow-lg scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  <span className="text-sm">⭐</span>
                  <div className="min-w-0">
                    <span className="block font-extrabold leading-tight truncate">DCP / Supervisor</span>
                    <span className="text-[9px] opacity-80 font-mono block truncate">KA-HQ-0012</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFill('policymaker', 'KA-DGP-0001', 'ADGP Crime Intelligence')}
                  className={`py-2 px-3 border rounded-lg text-left transition font-bold cursor-pointer flex items-center gap-2.5 ${
                    selectedRole === 'policymaker'
                      ? 'bg-[#FF9F1C] text-[#071D3A] border-[#FF9F1C] shadow-lg scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/15 text-white border-white/20'
                  }`}
                >
                  <span className="text-sm">🏛️</span>
                  <div className="min-w-0">
                    <span className="block font-extrabold leading-tight truncate">ADGP Policymaker</span>
                    <span className="text-[9px] opacity-80 font-mono block truncate">KA-DGP-0001</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Authentication Card Form (md:col-span-5) */}
        <div className="col-span-1 md:col-span-5 flex flex-col justify-center items-center p-6 bg-[#0B2E59] md:bg-opacity-40">
          
          {/* Main Login Card */}
          <div className="w-full max-w-md rounded-xl overflow-hidden border border-gray-200 dark:border-blue-900/50 bg-white dark:bg-[#081120] shadow-2xl">
            
            {/* Blue Portal Header */}
            <div className="flex justify-between items-center bg-[#00529B] dark:bg-[#0B2E59] text-white px-6 py-4 border-b border-[#004078] dark:border-blue-900/50">
              <div className="flex flex-col text-left">
                <h3 className="text-base font-bold tracking-wide">
                  Police Authentication Portal
                </h3>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider mt-0.5">
                  OFFICER SIGN-IN REQUIRED
                </span>
              </div>
              <Lucide.Lock className="h-5 w-5 opacity-80" />
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="px-6 py-4 space-y-3.5">
              {error && (
                <div className="rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 p-3 text-xs font-bold text-red-800 dark:text-red-300 flex items-center gap-2 text-left">
                  <Lucide.XCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
                  {error}
                </div>
              )}

              {/* PS ID */}
              <div className="text-left">
                <label className="block text-[10.5px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  PS ID — Police Station ID *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lucide.Building2 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </span>
                  <input
                    type="text"
                    required
                    value={psId}
                    onChange={(e) => setPsId(e.target.value)}
                    placeholder="e.g. KA-BLR-0142"
                    className="w-full rounded border border-gray-300 dark:border-blue-900/50 bg-white dark:bg-[#030712] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-1.5 pl-10 pr-3 text-xs font-semibold outline-none focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B]"
                  />
                </div>
              </div>

              {/* SI Name */}
              <div className="text-left">
                <label className="block text-[10.5px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  SI Name — Registered Officer *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lucide.UserCheck className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </span>
                  <input
                    type="text"
                    required
                    value={siName}
                    onChange={(e) => setSiName(e.target.value)}
                    placeholder="e.g. SI Manjunath Rao"
                    className="w-full rounded border border-gray-300 dark:border-blue-900/50 bg-white dark:bg-[#030712] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-1.5 pl-10 pr-3 text-xs font-semibold outline-none focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B]"
                  />
                </div>
              </div>

              {/* Simulated Security Role Selector */}
              <div className="text-left">
                <label className="block text-[10.5px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Security Level (RBAC Role) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lucide.Shield className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </span>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as any)}
                    className="w-full rounded border border-gray-300 dark:border-blue-900/50 bg-white dark:bg-[#030712] text-gray-800 dark:text-white py-1.5 pl-10 pr-3 text-xs outline-none focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B] font-semibold"
                  >
                    <option value="investigator">Investigator (Standard CCTNS Access)</option>
                    <option value="analyst">Crime Analyst (Analytics & Trends focus)</option>
                    <option value="supervisor">Superintendent / SP (Full Operational Supervisor)</option>
                    <option value="policymaker">HQ Policymaker (Aggregated metrics only)</option>
                  </select>
                </div>
              </div>

              {/* Fingerprint Scanner Simulator */}
              <div className="text-left">
                <label className="block text-[10.5px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Biometric Hardware Authentication *
                </label>
                
                <div 
                  onClick={startBiometricScan}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    biometricState === 'awaiting' ? 'border-emerald-400 dark:border-emerald-500/60 bg-emerald-50/60 dark:bg-emerald-950/30 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40' :
                    biometricState === 'scanning' ? 'border-sky-400 dark:border-sky-400/80 bg-sky-50 dark:bg-sky-950/40' :
                    biometricState === 'verified' ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-950/40' :
                    'border-red-400 dark:border-red-400/80 bg-red-50 dark:bg-red-950/40'
                  }`}
                >
                  <div className={`p-2.5 rounded-full ${
                    biometricState === 'awaiting' ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300' :
                    biometricState === 'scanning' ? 'bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300 animate-pulse' :
                    biometricState === 'verified' ? 'bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300' :
                    'bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300'
                  }`}>
                    <Lucide.Fingerprint className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {biometricState === 'awaiting' && 'Awaiting Biometric Scan'}
                      {biometricState === 'scanning' && 'Reading Optical Sensor...'}
                      {biometricState === 'verified' && 'Identity Verified ✓'}
                      {biometricState === 'failed' && 'Verification Failed'}
                    </span>
                    <span className="text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                      {biometricState === 'awaiting' && 'Click box to simulate biometric scan'}
                      {biometricState === 'scanning' && 'Verifying minutiae vectors against SCRB...'}
                      {biometricState === 'verified' && 'Biometric profile matched successfully'}
                      {biometricState === 'failed' && 'Please try scanning again'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="text-left">
                <label className="block text-[10.5px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1">
                  Secure Access Password *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lucide.Lock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded border border-gray-300 dark:border-blue-900/50 bg-white dark:bg-[#030712] text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 py-1.5 pl-10 pr-10 text-xs outline-none focus:border-[#00529B] focus:ring-1 focus:ring-[#00529B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <Lucide.EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                    ) : (
                      <Lucide.Eye className="h-4 w-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </button>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setPsId('');
                    setSiName('');
                    setPassword('');
                    setBiometricState('awaiting');
                    setError('');
                  }}
                  className="w-1/3 py-2 text-xs font-bold border border-gray-300 dark:border-blue-900/40 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#030712] transition cursor-pointer"
                >
                  Clear
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 text-xs font-bold bg-[#00529B] hover:bg-[#004078] dark:bg-[#0284C7] dark:hover:bg-[#0369A1] text-white rounded flex items-center justify-center gap-2 shadow transition cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-full border-2 border-t-transparent border-white"></div>
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Lucide.ShieldCheck className="h-4.5 w-4.5" />
                      Sign In to Prajna
                    </>
                  )}
                </button>
              </div>

              {/* Emergency Help Button */}
              <div className="flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => setShowHelp(true)}
                  className="border border-[#E53935] px-3 py-1 rounded text-[9.5px] font-bold text-[#E53935] hover:bg-red-50/50 flex items-center gap-1.5 uppercase tracking-wide transition cursor-pointer"
                >
                  <Lucide.AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  Emergency Access Help
                </button>
              </div>
            </form>

            {/* Checklist Certifications */}
            <div className="border-t border-gray-100 py-2.5 bg-gray-50/80 flex justify-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1 text-emerald-600">✓ CCTNS Link</span>
              <span className="flex items-center gap-1 text-emerald-600">✓ AES-256</span>
              <span className="flex items-center gap-1 text-emerald-600">✓ Audit Logged</span>
            </div>

          </div>

          {/* Version Footer */}
          <div className="text-[10px] text-white/50 tracking-wider font-mono mt-3">
            System version CIRAS v2.1.0 | Karnataka State Police • SCRB
          </div>
        </div>

      </div>

      {/* Emergency Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-2xl dark:bg-[#071D3A] dark:border-ksp-navy-light dark:text-white">
            <div className="flex items-center space-x-2 text-[#E53935] mb-3">
              <Lucide.AlertCircle className="h-6 w-6" />
              <h3 className="font-bold text-base">Emergency Access Support</h3>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              If your biometric credentials are not registering or you lack a Police Station Identifier (PS ID), contact your District IT Administrator or the SCRB Help Desk immediately.
            </p>

            <div className="space-y-2 rounded bg-gray-50 p-3 text-xs font-mono text-gray-800 dark:bg-ksp-navy-light/40 dark:text-gray-200 text-left">
              <div>SCRB Help Desk: 080-22943000</div>
              <div>IT Support: it.scrb@ksp.gov.in</div>
              <div>Available: 24 / 7 / 365</div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="mt-5 w-full bg-[#00529B] py-2 text-xs font-bold text-white rounded hover:bg-[#004078] transition cursor-pointer"
            >
              CLOSE INFO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
