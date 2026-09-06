import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, Language } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { getLivePortalNotifications, PortalNotification } from '@/utils/notifications';

interface TopHeaderProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function TopHeader({
  currentLanguage,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
}: TopHeaderProps) {
  const { user, logout, switchRole } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsList, setNotificationsList] = useState<PortalNotification[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(() => new Date());

  // Real-time clock ticking every second (Hours, Minutes, Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setNotificationsList(getLivePortalNotifications());
  }, [showNotifications]);

  const handleNotificationClick = (item: PortalNotification) => {
    setShowNotifications(false);
    if (item.route) {
      navigate(item.route);
    }
  };

  const roleLabels: Record<string, string> = {
    investigator: 'IO',
    analyst: 'CA',
    supervisor: 'SHO',
    policymaker: 'HQ',
    citizen: 'CIT',
  };

  const unreadCount = notificationsList.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-[#071D3A] dark:bg-[#020617] border-b border-[#0B2E59]/80 dark:border-blue-950/80 px-3 md:px-5 flex items-center justify-between shadow-md relative z-30 select-none">
      {/* Left side: KSP Emblem and System Title */}
      <div className="flex items-center space-x-2.5">
        <div className="w-10 h-10 rounded-full border-2 border-[#FF9F1C] bg-white p-0.5 shadow-sm shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src="/assets/karnataka-emblem.png"
            alt="Karnataka State Police Emblem"
            className="w-full h-full object-contain"
            style={{ clipPath: 'circle(48%)' }}
          />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center space-x-2">
            <span className="font-sans text-sm md:text-base font-black tracking-wide text-white drop-shadow-xs">
              {t('karnatakaStatePolice')}
            </span>
            <span className="h-3.5 w-px bg-white/30" />
            <span className="font-mono text-[10px] font-black text-[#071D3A] bg-[#FF9F1C] px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
              CIRAS 1.0
            </span>
          </div>
          <span className="font-mono text-xs font-semibold text-[#FFB800] tracking-wide">
            {t('platformName')} • <span className="text-white/80 font-normal">{language === 'kn' ? 'KSP ಗಾಗಿ ಸಂಭಾಷಣಾ ಅಪರಾಧ ಗುಪ್ತಚರ' : language === 'hi' ? 'केएसपी के लिए संवादात्मक अपराध इंटेलिजेंस' : 'Conversational Crime Intelligence for KSP'}</span>
          </span>
        </div>
      </div>

      {/* Right side: Compact Icons Bar with Expand on Hover */}
      <div className="flex items-center gap-2 md:gap-2.5">

        {/* 🕒 Live Operational Date & Time — Compact by default (ticking seconds), date expands on hover */}
        <div className="group hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#071D3A]/70 hover:bg-[#071D3A] border border-[#FF9F1C]/30 hover:border-[#FF9F1C]/60 text-white font-mono text-xs shadow-xs transition-all duration-300 select-none cursor-default">
          <Lucide.Clock className="h-3.5 w-3.5 text-[#FFB800] shrink-0 animate-pulse" />
          <span className="text-[#FF9F1C] font-black tracking-wider text-xs">
            {currentDateTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </span>
          <div className="max-w-0 opacity-0 group-hover:max-w-36 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden flex items-center gap-1 whitespace-nowrap pl-0 group-hover:pl-1.5 border-l-0 group-hover:border-l border-white/20">
            <span className="text-gray-300 font-bold text-[11px]">
              {currentDateTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* ⚡ Quick FIR Lookup — Compact icon button by default, text expands on hover */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); document.getElementById('dashboard-rapid-search')?.focus(); window.location.pathname !== '/' && (window.location.href = '/'); }}
          className="group hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FF9F1C] hover:bg-[#FFB800] text-[#071D3A] font-black text-xs shadow transition-all duration-300 shrink-0 cursor-pointer"
          title="Jump to CCTNS FIR Rapid Search"
        >
          <Lucide.Search className="h-4 w-4 shrink-0 text-[#071D3A]" />
          <div className="max-w-0 opacity-0 group-hover:max-w-28 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap">
            <span className="font-black text-xs pr-1">FIR Lookup</span>
          </div>
        </a>

        {/* Notification Panel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="relative p-2 rounded-xl bg-[#071D3A]/60 hover:bg-[#133D6B] border border-[#FF9F1C]/30 text-white cursor-pointer transition shadow-xs"
            title="Live Operational Notifications"
          >
            <Lucide.Bell className="h-5 w-5 text-[#FFB800]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F1C] opacity-75"></span>
                <span className="relative inline-flex items-center justify-center rounded-full h-4 w-4 bg-[#FF9F1C] text-[#071D3A] font-mono text-[9px] font-black">
                  {unreadCount}
                </span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-88 rounded-2xl border-2 border-[#0B2E59] bg-white p-3.5 shadow-2xl dark:bg-[#071D3A] dark:border-[#FF9F1C]/40 text-gray-800 dark:text-white z-50 text-left">
              <div className="border-b border-gray-100 pb-2.5 px-1 text-xs font-extrabold dark:border-slate-800 flex justify-between items-center">
                <span className="uppercase tracking-wider text-[#0B2E59] dark:text-[#FFB800] flex items-center gap-1.5 font-mono">
                  <Lucide.BellRing size={15} className="text-[#FF9F1C]" />
                  {t('livealerts')}
                </span>
                <span className="text-[10px] bg-[#FF9F1C] text-[#071D3A] px-2 py-0.5 rounded-full font-mono font-black">
                  {unreadCount} PENDING
                </span>
              </div>

              <div className="mt-2.5 space-y-2 max-h-96 overflow-y-auto">
                {notificationsList.length === 0 ? (
                  <p className="text-xs text-gray-500 text-center py-4">No active notifications</p>
                ) : (
                  notificationsList.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => handleNotificationClick(n)}
                      className={`w-full text-left flex flex-col rounded-xl p-2.5 text-[11px] leading-snug hover:bg-blue-50 dark:hover:bg-[#133D6B]/50 border-l-4 transition cursor-pointer ${
                        n.type === 'critical' 
                          ? 'border-[#8B0000] bg-red-50/40 dark:bg-red-950/20' 
                          : n.type === 'warning'
                          ? 'border-[#FF9F1C] bg-amber-50/40 dark:bg-amber-950/20'
                          : 'border-[#00529B] bg-blue-50/40 dark:bg-blue-950/20'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-extrabold text-[#0B2E59] dark:text-white flex-1">
                          {n.title}
                        </span>
                        <span className="text-[9px] uppercase font-mono font-black bg-[#0B2E59] text-[#FFB800] px-1.5 py-0.5 rounded shadow-2xs shrink-0">
                          {n.badge}
                        </span>
                      </div>
                      
                      <span className="text-[10px] text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                        {n.sub}
                      </span>
                      
                      <div className="flex justify-between items-center text-[9px] text-gray-400 font-mono mt-1.5 pt-1 border-t border-gray-100 dark:border-gray-800">
                        <span>{n.time}</span>
                        <span className="text-[#0B2E59] dark:text-[#FFB800] font-black flex items-center gap-0.5">
                          View & Action <Lucide.ArrowUpRight size={11} />
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Language Toggle */}
        <LanguageToggle currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />

        {/* Dark Mode Toggle */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          className="p-2 rounded-xl bg-[#071D3A]/60 hover:bg-[#133D6B] border border-white/10 text-white cursor-pointer transition shadow-xs"
        >
          {darkMode ? <Lucide.Sun className="h-4.5 w-4.5 text-[#FFB800]" /> : <Lucide.Moon className="h-4.5 w-4.5 text-white/90" />}
        </button>

        {/* User Profile Dropdown — Collapsed by default (badge-only), expands smoothly on hover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="group flex items-center space-x-1.5 md:space-x-2 rounded-xl bg-[#071D3A]/80 hover:bg-[#133D6B] p-1.5 md:px-2.5 border border-[#FF9F1C]/40 transition-all duration-300 cursor-pointer shadow-xs"
            title={`${user?.name || 'Officer'} (${user?.rank}) — Click for options`}
          >
            {/* Officer Avatar Badge with Initials */}
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#0B2E59] to-[#00529B] border border-[#FF9F1C] flex items-center justify-center font-black text-xs text-[#FFB800] tracking-wider shadow-inner shrink-0 group-hover:scale-105 transition-transform">
              {user?.name?.split(' ').map((n) => n[0]).join('') || 'SI'}
            </div>

            {/* Collapsed Name & Rank — Expands on hover */}
            <div className="max-w-0 opacity-0 group-hover:max-w-52 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-hidden flex flex-col items-start text-left whitespace-nowrap pl-0 group-hover:pl-1">
              <span className="text-xs font-black leading-tight text-white">{user?.name}</span>
              <span className="text-[10px] text-[#FFB800] font-mono font-bold leading-none mt-0.5">
                {user?.rank} ({user?.role})
              </span>
            </div>

            <Lucide.ChevronDown className="h-4 w-4 text-[#FFB800] shrink-0 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-ksp-gray-200 bg-white p-2 shadow-xl dark:bg-ksp-navy-dark dark:border-ksp-navy-light text-ksp-gray-800 dark:text-white z-50 text-left">
              <div className="px-3 py-2 border-b border-ksp-gray-100 dark:border-ksp-navy-light text-left">
                <p className="text-xs font-bold text-[#0B2E59] dark:text-white">{t('rankinfo') || 'Officer Rank Profile'}</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-300">
                  {user?.station} | {user?.district}
                </p>
              </div>
              
              <div className="px-3 py-2 border-b border-ksp-gray-100 dark:border-ksp-navy-light text-left space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">{t('simulationRole')}</span>
                <select
                  value={user?.role || 'investigator'}
                  onChange={(e) => switchRole(e.target.value as any)}
                  className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-[11px] font-bold outline-none focus:border-[#00529B] text-gray-800"
                >
                  <option value="investigator">{t('roleInvestigator')}</option>
                  <option value="analyst">{t('roleAnalyst')}</option>
                  <option value="supervisor">{t('roleSupervisor')}</option>
                  <option value="policymaker">{t('rolePolicymaker')}</option>
                </select>
              </div>

              <div className="mt-1 space-y-0.5">
                <button
                  type="button"
                  onClick={logout}
                  className="flex w-full items-center space-x-2 rounded p-2 text-xs font-bold text-ksp-red hover:bg-red-50 dark:hover:bg-red-950/20 text-left cursor-pointer"
                >
                  <Lucide.LogOut className="h-4 w-4" />
                  <span>{t('logout')}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
