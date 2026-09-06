import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavSubItem {
  icon: string;
  translationKey: string;
  labelEn: string;
  path: string;
  roles: string[];
  isOriginal?: boolean;
}

interface NavGroup {
  id: string;
  titleKey: string;
  titleEn: string;
  icon: string;
  items: NavSubItem[];
}

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const { role } = useAuth();
  const { t, language } = useLanguage();
  const location = useLocation();

  // Define categorized accordion navigation structure
  const navGroups: NavGroup[] = [
    {
      id: 'overview',
      titleKey: 'overviewCommand',
      titleEn: 'Overview & Command',
      icon: 'LayoutDashboard',
      items: [
        { icon: 'LayoutDashboard', translationKey: 'dashboard', labelEn: 'Dashboard', path: '/', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'] },
        { icon: 'MessageSquare', translationKey: 'f1Title', labelEn: 'Conversational Crime Intelligence', path: '/chatbot', roles: ['investigator', 'analyst', 'supervisor'] },
        { icon: 'Radio', translationKey: 'rtccTitle', labelEn: 'Real-Time Crime Center (RTCC)', path: '/rtcc', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'], isOriginal: true }
      ]
    },
    {
      id: 'biometrics',
      titleKey: 'biometricsInvestigation',
      titleEn: 'AI Biometrics & Investigation',
      icon: 'ScanFace',
      items: [
        { icon: 'ScanFace', translationKey: 'f8Title', labelEn: 'AI Face Search & Suspect Identification', path: '/face-search', roles: ['investigator', 'analyst', 'supervisor'], isOriginal: true },
        { icon: 'UserSearch', translationKey: 'f5Title', labelEn: 'Criminology Offender Profiling', path: '/offender-profiling', roles: ['investigator', 'analyst', 'supervisor'] },
        { icon: 'Lightbulb', translationKey: 'f7Title', labelEn: 'Investigator Decision Support', path: '/decision-support', roles: ['investigator', 'analyst', 'supervisor'] }
      ]
    },
    {
      id: 'analytics',
      titleKey: 'analyticsTactical',
      titleEn: 'Crime Analytics & Operations',
      icon: 'Network',
      items: [
        { icon: 'Network', translationKey: 'f2Title', labelEn: 'Criminal Network Analysis', path: '/network', roles: ['investigator', 'analyst', 'supervisor'] },
        { icon: 'TrendingUp', translationKey: 'f3Title', labelEn: 'Crime Pattern & Trends', path: '/trends-analytics', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'] },
        { icon: 'BarChart3', translationKey: 'f4Title', labelEn: 'Sociological Crime Insights', path: '/sociological-insights', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'] },
        { icon: 'Banknote', translationKey: 'f9Title', labelEn: 'Financial Crime & Link Analysis', path: '/financial', roles: ['investigator', 'analyst', 'supervisor'] },
        { icon: 'AlertTriangle', translationKey: 'f10Title', labelEn: 'Crime Forecasting & Early Warning', path: '/forecasting-alerts', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'] },
        { icon: 'BrainCircuit', translationKey: 'f6Title', labelEn: 'Recidivism Probability Engine', path: '/recidivism-engine', roles: ['investigator', 'analyst', 'supervisor'], isOriginal: true },
        { icon: 'ShieldAlert', translationKey: 'f13Title', labelEn: 'Operational Deployment & Risk Simulation', path: '/operational-simulation', roles: ['investigator', 'analyst', 'supervisor', 'policymaker'], isOriginal: true }
      ]
    },
    {
      id: 'governance',
      titleKey: 'governanceAudit',
      titleEn: 'Governance & Audit',
      icon: 'ShieldCheck',
      items: [
        { icon: 'FileSpreadsheet', translationKey: 'f11Title', labelEn: 'Explainable AI & Transparent Analytics', path: '/explainability', roles: ['investigator', 'analyst', 'supervisor'] },
        { icon: 'Lock', translationKey: 'f12Title', labelEn: 'Role-Based Access & Security Governance', path: '/governance', roles: ['supervisor', 'investigator', 'analyst', 'policymaker'] }
      ]
    }
  ];

  // Group open/collapse state tracking
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    overview: true,
    biometrics: true,
    analytics: true,
    governance: true
  });

  // Auto-expand group containing current active path on navigation or load
  useEffect(() => {
    navGroups.forEach(group => {
      const hasActiveRoute = group.items.some(item => {
        if (item.path === '/') return location.pathname === '/';
        return location.pathname.startsWith(item.path);
      });
      if (hasActiveRoute) {
        setOpenGroups(prev => ({ ...prev, [group.id]: true }));
      }
    });
  }, [location.pathname]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const renderNavItem = (item: NavSubItem) => {
    // Role check filter
    if (role && !item.roles.includes(role)) return null;

    const IconComponent = (Lucide as any)[item.icon] || Lucide.Circle;
    const labelText = t(item.translationKey as any) || item.labelEn;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          `flex items-start space-x-3 px-3 py-2.5 my-1 rounded-xl text-xs md:text-[13px] font-bold transition-all select-none ${
            isActive
              ? 'bg-[#0B2E59] border-l-4 border-[#FF9F1C] text-white shadow-md font-black'
              : 'text-blue-100/80 hover:bg-[#133D6B]/60 hover:text-white'
          }`
        }
      >
        {({ isActive }) => (
          <>
            <IconComponent className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${isActive ? 'text-[#FFB800]' : 'text-blue-200/80'}`} />
            {!collapsed && (
              <span className={`whitespace-normal break-words leading-snug font-bold ${isActive ? 'text-white font-extrabold' : ''}`}>
                {labelText}
                {item.isOriginal && (
                  <span className="italic font-normal text-[11px] text-amber-300 dark:text-amber-400 ml-1.5 opacity-90 inline-block font-sans">
                    <em>{language === 'kn' ? '(ಮೂಲ)' : language === 'hi' ? '(मूल)' : '(Original)'}</em>
                  </span>
                )}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside 
      className={`flex flex-col border-r border-[#0B2E59]/40 dark:border-blue-950/60 bg-[#071D3A] dark:bg-[#020617] text-white transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-72'
      } select-none shrink-0 h-[calc(100vh-64px)] justify-between shadow-lg`}
    >
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-3.5 scrollbar-thin scrollbar-thumb-blue-900/40">
        {navGroups.map(group => {
          // Filter group items based on user role permissions
          const allowedSubItems = group.items.filter(item => !role || item.roles.includes(role));
          if (allowedSubItems.length === 0) return null;

          const isGroupOpen = !!openGroups[group.id];
          const GroupIcon = (Lucide as any)[group.icon] || Lucide.Folder;
          const groupTitle = language === 'hi'
            ? (group.id === 'overview' ? 'अवलोकन और कमान' : group.id === 'biometrics' ? 'एआई बायोमेट्रिक्स और जांच' : group.id === 'analytics' ? 'अपराध विश्लेषण और संचालन' : 'शासन और लेखा परीक्षा')
            : language === 'kn'
            ? (group.id === 'overview' ? 'ಅವಲೋಕನ & ಕಮಾಂಡ್' : group.id === 'biometrics' ? 'ಎಐ ಬಯೋಮೆಟ್ರಿಕ್ಸ್ & ತನಿಖೆ' : group.id === 'analytics' ? 'ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ & ಕಾರ್ಯಾಚರಣೆಗಳು' : 'ಆಡಳಿತ & ಆಡಿಟ್')
            : group.titleEn;

          return (
            <div key={group.id} className="space-y-1">
              {!collapsed ? (
                /* Expandable Category Accordion Header */
                <button
                  type="button"
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg hover:bg-white/5 text-[#FF9F1C] font-mono text-xs font-black uppercase tracking-wider transition cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <GroupIcon className="h-4 w-4 text-[#FF9F1C] shrink-0" />
                    <span className="whitespace-normal break-words text-left text-xs font-black">{groupTitle}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0 ml-1">
                    <span className="px-1.5 py-0.5 rounded bg-blue-900 text-blue-100 text-[10px] font-mono font-bold">
                      {allowedSubItems.length}
                    </span>
                    {isGroupOpen ? (
                      <Lucide.ChevronDown className="h-4 w-4 text-[#FF9F1C]" />
                    ) : (
                      <Lucide.ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>
              ) : (
                /* Collapsed Divider */
                <div className="border-t border-white/10 my-2" />
              )}

              {/* Accordion Sub-items List */}
              {(!collapsed ? isGroupOpen : true) && (
                <div className={`${!collapsed ? 'pl-2 border-l-2 border-blue-800/40 ml-2 space-y-1' : 'space-y-1'}`}>
                  {allowedSubItems.map(item => renderNavItem(item))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="border-t border-white/10 p-3 bg-[#05152A]">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex w-full items-center justify-center rounded-xl bg-[#0B2E59] p-2.5 text-white hover:bg-[#133D6B] border border-[#FF9F1C]/30 transition shadow-xs cursor-pointer"
        >
          {collapsed ? (
            <Lucide.ChevronRight className="h-4 w-4 text-[#FFB800]" />
          ) : (
            <div className="flex items-center space-x-2 text-xs md:text-sm font-black font-mono text-[#FFB800]">
              <Lucide.ChevronLeft className="h-4 w-4" />
              <span>{t('collapseMenu')}</span>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
