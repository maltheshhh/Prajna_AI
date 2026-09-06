import React, { useState, useEffect, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useLanguage, formatCrimeType, formatIncidentStatus, formatIncidentDetails, formatDynamicText } from '@/context/LanguageContext';
import { fetchApi, fetchCitizenReports, fetchDashboardData, fetchFIRsApi, fetchOffenderProfiles, fetchHotspotsApi } from '@/utils/api';
import { getLivePortalNotifications, PortalNotification } from '@/utils/notifications';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';

// Clean Stat Card Component
function DashboardStatCard({ 
  label, 
  value, 
  icon, 
  subLabel,
  colorClass, 
  bgCircleClass,
  onClick
}: {
  label: string;
  value: string | number;
  icon: string;
  subLabel?: string;
  colorClass: string;
  bgCircleClass: string;
  onClick?: () => void;
}) {
  const IconComponent = (Lucide as any)[icon] || Lucide.Circle;
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white rounded-xl border border-[#E5DEC9] dark:border-blue-900/40 p-4 shadow-xs flex items-center gap-3.5 text-left select-none dark:bg-[#071D3A] transition hover:shadow-md hover:border-[#0B2E59] ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Icon Box */}
      <div className={`h-11 w-11 rounded-xl ${bgCircleClass} flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10`}>
        <IconComponent className={`h-5 w-5 ${colorClass}`} />
      </div>
      
      {/* Metrics Values */}
      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-black text-gray-500 dark:text-gray-300 block tracking-wider font-mono">
          {label}
        </span>
        <span className="text-xl font-black text-[#0B2E59] dark:text-white mt-0.5 block font-mono">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {subLabel && (
          <span className="text-[9px] text-gray-400 font-mono mt-0.5">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
}

// Skeleton loader for stat cards while data is fetching
function StatCardSkeleton() {
  return (
    <div className="relative bg-white rounded-xl border border-[#E5DEC9] dark:border-blue-900/40 p-4 shadow-xs flex items-center gap-3.5 dark:bg-[#071D3A] animate-pulse">
      <div className="h-11 w-11 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-2.5 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-5 w-10 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-2 w-20 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  // Dark mode state listener for Recharts SVG rendering
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Capabilities expanded by default so officers can see all modules immediately
  const [capabilitiesExpanded, setCapabilitiesExpanded] = useState(true);
  const [capabilityCategory, setCapabilityCategory] = useState<'all' | 'investigation' | 'analytics' | 'financial' | 'command'>('all');

  // Loading state for skeleton placeholders
  const [isLoading, setIsLoading] = useState(true);

  // Backend CCTNS live data stores
  const [firs, setFirs] = useState<any[]>([]);
  const [suspects, setSuspects] = useState<any[]>([]);
  const [hotspots, setHotspots] = useState<any[]>([]);

  // Live FIR Rapid Search bar state
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [quickSearchResults, setQuickSearchResults] = useState<any[]>([]);

  // Local state for live stats from CCTNS dataset
  const [stats, setStats] = useState<any>({
    totalFIRs: 1000,
    activeInvestigations: 209,
    criticalHotspots: 220,
    knownOffenders: 200,
    repeatOffenders: 124,
    catalystStatus: '100% CCTNS Linked'
  });

  // Citizen & Police Reports state
  const [stationReports, setStationReports] = useState<any[]>([]);
  const [generalReports, setGeneralReports] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [routingFeedback, setRoutingFeedback] = useState<string | null>(null);
  const [liveAlerts, setLiveAlerts] = useState<PortalNotification[]>([]);

  useEffect(() => {
    loadAllDashboardData();
    loadStationSightingReports();
    setLiveAlerts(getLivePortalNotifications());
  }, []);

  async function loadAllDashboardData() {
    try {
      const [dashRes, firsRes, suspectsRes, hotspotsRes] = await Promise.allSettled([
        fetchDashboardData(),
        fetchFIRsApi(),
        fetchOffenderProfiles(),
        fetchHotspotsApi()
      ]);

      if (dashRes.status === 'fulfilled' && dashRes.value?.success && dashRes.value.data) {
        setStats((prev: any) => ({ ...prev, ...dashRes.value.data }));
      }
      if (firsRes.status === 'fulfilled' && firsRes.value?.success && Array.isArray(firsRes.value?.data)) {
        const firData = firsRes.value.data;
        setFirs(firData);
        setStats((prev: any) => ({
          ...prev,
          totalFIRs: firData.length || 1000
        }));
      }
      if (suspectsRes.status === 'fulfilled' && suspectsRes.value?.success && Array.isArray(suspectsRes.value?.data)) {
        const suspectData = suspectsRes.value.data;
        setSuspects(suspectData);
        setStats((prev: any) => ({
          ...prev,
          knownOffenders: suspectData.length || 200
        }));
      }
      if (hotspotsRes.status === 'fulfilled' && hotspotsRes.value?.success && Array.isArray(hotspotsRes.value?.data)) {
        const hotspotData = hotspotsRes.value.data;
        setHotspots(hotspotData);
        setStats((prev: any) => ({
          ...prev,
          criticalHotspots: hotspotData.length || 220
        }));
      }
    } catch (err) {
      console.warn('Dashboard data fetch fallback:', err);
    } finally {
      // Always clear skeleton loader — fallback data is ready
      setIsLoading(false);
    }
  }

  async function loadStationSightingReports() {
    try {
      const apiRes = await fetchCitizenReports();
      if (apiRes.success && apiRes.data) {
        if (apiRes.data.stationAlerts) {
          setStationReports(apiRes.data.stationAlerts);
        }
        if (apiRes.data.reports) {
          setGeneralReports(apiRes.data.reports);
          return;
        }
      }
    } catch {
      // Fallback
    }

    const localData = localStorage.getItem('ksp_general_crime_reports');
    if (localData) {
      try {
        setGeneralReports(JSON.parse(localData));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Clean high-priority operational incidents
      const initialIncidents = [
        {
          id: "KSP-INC-2026-901",
          crimeType: "Theft / House Breaking",
          location: "K.R. Market Flyover, Bengaluru",
          station: "City Market Police Station",
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          details: "Citizen reported suspected daytime burglary attempt by 2 individuals on black Pulsar motorcycle.",
          contact: "+91 98450 12345 (DigiLocker Verified)",
          status: "Pending Investigation & Dispatch",
          media: "evidence_frame_kr_01.jpg",
          routing: {
            department: "Central Crime Branch (CCB)",
            departmentKey: "ccb",
            redirectUrl: "/offender-profiling"
          },
          matchedSuspect: {
            id: "CONV-001",
            name: "Allu Arjun (Cobra Raju)",
            confidence: 94.6,
            photo_url: "/assets/convicts/Convict_1.jpg",
            reason: "Neural Vector Match against KSP 10-Convict Biometric Database (CONV-001)."
          }
        },
        {
          id: "KSP-INC-2026-902",
          crimeType: "Cybercrime / Banking OTP Fraud",
          location: "HSR Layout 5th Main, Bengaluru",
          station: "HSR Layout Police Station",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          details: "VoIP spoofing ring extracting banking OTP credentials claiming fake traffic challan gateway.",
          contact: "+91 94480 67890 (DigiLocker Verified)",
          status: "Pending Investigation & Dispatch",
          routing: {
            department: "CID Cyber Crime Division",
            departmentKey: "cyber",
            redirectUrl: "/financial"
          },
          matchedSuspect: {
            id: "CONV-009",
            name: "Shiva Rajkumar (Gully Karthik)",
            confidence: 88.5,
            photo_url: "/assets/convicts/Convict_9.jpg",
            reason: "Modus Operandi & phone spoofing ring signature matches active cybercrime syndicate."
          }
        },
        {
          id: "KSP-INC-2026-903",
          crimeType: "Chain Snatching / Street Robbery",
          location: "Vijayanagar 2nd Stage, Bengaluru",
          station: "Vijayanagar Police Station",
          timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
          details: "CCTV snapshot of individual involved in commercial altercation and brandishing weapons.",
          contact: "+91 98860 54321 (DigiLocker Verified)",
          status: "Routed to CCB Anti-Snatching Squad",
          routing: {
            department: "Central Crime Branch (CCB)",
            departmentKey: "ccb",
            redirectUrl: "/face-search"
          },
          matchedSuspect: {
            id: "CONV-004",
            name: "Prabhas Raju (Blade Praveen)",
            confidence: 96.2,
            photo_url: "/assets/convicts/Convict_4.jpg",
            reason: "Facial identity match verified via dlib ResNet-128 (Distance 0.14 < 0.50)."
          }
        }
      ];
      setGeneralReports(initialIncidents);
      localStorage.setItem('ksp_general_crime_reports', JSON.stringify(initialIncidents));
    }
  }

  // Quick FIR / Suspect search helper across real CCTNS datasets
  const handleQuickSearch = (query: string) => {
    setQuickSearchQuery(query);
    if (!query.trim()) {
      setQuickSearchResults([]);
      return;
    }
    const q = query.toLowerCase().trim();

    // 1. Search suspects & convicts
    const allSuspects = suspects;
    const matchedSuspects = allSuspects
      .filter((c: any) => 
        c.name?.toLowerCase().includes(q) || 
        c.id?.toLowerCase().includes(q) || 
        (Array.isArray(c.aliases) && c.aliases.some((a: string) => a.toLowerCase().includes(q))) ||
        c.crime_type?.toLowerCase().includes(q) ||
        c.primaryCrime?.toLowerCase().includes(q)
      )
      .map((c: any) => ({
        title: `${c.name} (${c.id})`,
        sub: `Suspect Dossier • ${c.crime_type || c.primaryCrime || 'Active Offender'} • ${c.district || 'Karnataka'}`,
        path: '/offender-profiling',
        type: 'Offender'
      }));

    // 2. Search 1,000 CCTNS FIRs
    const matchedFIRs = firs
      .filter((f: any) => 
        f.firNumber?.toLowerCase().includes(q) || 
        f.id?.toLowerCase().includes(q) || 
        f.crimeType?.toLowerCase().includes(q) || 
        f.district?.toLowerCase().includes(q) || 
        f.policeStation?.toLowerCase().includes(q) ||
        f.accusedName?.toLowerCase().includes(q)
      )
      .map((f: any) => ({
        title: `${f.firNumber || f.id}: ${f.crimeType} (${f.policeStation || f.district || 'KSP'})`,
        sub: `${f.status || 'Active Case'} • Section ${f.ipcSection || '379'} IPC • Accused: ${f.accusedName || 'Identified'}`,
        path: '/trends-analytics',
        type: 'FIR Record'
      }));

    // 3. Match police stations if applicable
    const matchedStations = [
      { name: 'Upparpet Police Station (Majestic)', sub: 'Bengaluru City Commissionerate • Station Code: KA-BLR-014', path: '/hotspots' },
      { name: 'Devaraja Police Station (Mysuru)', sub: 'Mysuru City Police • Station Code: KA-MYS-002', path: '/hotspots' },
      { name: 'HSR Layout Police Station (Bengaluru)', sub: 'South East Division • Station Code: KA-BLR-089', path: '/hotspots' }
    ].filter(s => s.name.toLowerCase().includes(q)).map(s => ({
      title: s.name,
      sub: s.sub,
      path: s.path,
      type: 'Police Station'
    }));

    const combined = [...matchedSuspects, ...matchedFIRs, ...matchedStations].slice(0, 6);
    setQuickSearchResults(combined);
  };

  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts: Record<string, number> = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0
    };

    if (firs && firs.length > 0) {
      firs.forEach((f: any) => {
        const dateStr = f.incidentDate || f.dateOfIncident || f.registrationDate;
        if (dateStr) {
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) {
            const mName = months[d.getMonth()];
            if (counts[mName] !== undefined) {
              counts[mName]++;
            }
          }
        }
      });
    }

    // Baseline SCRB 12-month annual telemetry distribution
    const fallbackBase: Record<string, number> = {
      Jan: 165, Feb: 180, Mar: 195, Apr: 145, May: 170, Jun: 145,
      Jul: 160, Aug: 188, Sep: 172, Oct: 194, Nov: 152, Dec: 168
    };

    return months.map((m) => {
      const val = counts[m] > 0 ? counts[m] : fallbackBase[m];
      const isSurge = val >= 185;
      return {
        name: m,
        value: val,
        // In dark mode: Electric Sky Blue (#38BDF8) for standard, Glowing Red (#EF4444) for surge
        // In light mode: KSP Navy (#0B2E59) for standard, KSP Crimson (#8B0000) for surge
        fill: isSurge 
          ? (isDarkMode ? '#EF4444' : '#8B0000') 
          : (isDarkMode ? '#38BDF8' : '#0B2E59')
      };
    });
  }, [firs, isDarkMode]);

  const handleDispatchPatrol = (reportId: string) => {
    const updated = generalReports.map(r => {
      if (r.id === reportId) {
        return { ...r, status: "Hoysala PCR Dispatched & Station Logged" };
      }
      return r;
    });
    localStorage.setItem('ksp_general_crime_reports', JSON.stringify(updated));
    setGeneralReports(updated);
    if (selectedReport && selectedReport.id === reportId) {
      setSelectedReport({ ...selectedReport, status: "Hoysala PCR Dispatched & Station Logged" });
    }
    setRoutingFeedback(`🚨 Emergency Hoysala PCR dispatch alert triggered for incident ${reportId}. Jurisdictional beat units notified.`);
    setTimeout(() => setRoutingFeedback(null), 4000);
  };

  const handleRouteDepartment = (departmentName: string, redirectPath?: string) => {
    if (!selectedReport) return;
    const reportId = selectedReport.id;
    const updated = generalReports.map(r => {
      if (r.id === reportId) {
        return { 
          ...r, 
          status: `Routed to ${departmentName}`,
          routing: { department: departmentName, redirectUrl: redirectPath || r.routing?.redirectUrl }
        };
      }
      return r;
    });
    localStorage.setItem('ksp_general_crime_reports', JSON.stringify(updated));
    setGeneralReports(updated);
    setSelectedReport({ 
      ...selectedReport, 
      status: `Routed to ${departmentName}`,
      routing: { department: departmentName, redirectUrl: redirectPath || selectedReport.routing?.redirectUrl }
    });

    setRoutingFeedback(`Incident ${reportId} successfully transferred & routed to ${departmentName}.`);
    setTimeout(() => setRoutingFeedback(null), 4000);
  };

  // 12 CIRAS Official Capabilities categorized by police department
  const capabilities = [
    { 
      id: 'F8', 
      title: 'AI Facial & 10-Print Biometric Identification', 
      desc: 'Deep-learning ResNet-128 identity matching against KSP convict database & ISO NAFIS minutiae engine.', 
      icon: 'ScanFace', 
      path: '/face-search', 
      department: 'State Biometrics & Forensics Cell', 
      category: 'investigation',
      badge: 'ResNet-128 / NAFIS', 
      color: 'border-l-4 border-l-red-600' 
    },
    { 
      id: 'F5', 
      title: 'Criminology-Based Offender Profiling', 
      desc: 'Criminal dossier timeline mapping Modus Operandi signatures, recurring associates, and weapon types.', 
      icon: 'UserSearch', 
      path: '/offender-profiling', 
      department: 'Central Crime Branch (CCB)', 
      category: 'investigation',
      badge: 'Criminology MO', 
      color: 'border-l-4 border-l-indigo-600' 
    },
    { 
      id: 'F2', 
      title: 'Criminal Association Network Analysis', 
      desc: 'Interactive Cytoscape relationship graphs linking suspect, victim, location, and phone spoofing nodes.', 
      icon: 'Network', 
      path: '/network', 
      department: 'State Intelligence Bureau (SIB)', 
      category: 'investigation',
      badge: 'Cytoscape.js Graphs', 
      color: 'border-l-4 border-l-blue-600' 
    },
    { 
      id: 'F7', 
      title: 'Investigator AI Decision Support', 
      desc: 'Automated case brief summaries, lead suggestions, and Section 161 CrPC interrogation question prompts.', 
      icon: 'Lightbulb', 
      path: '/decision-support', 
      department: 'Criminal Investigation Dept (CID)', 
      category: 'investigation',
      badge: 'Investigation Copilot', 
      color: 'border-l-4 border-l-amber-600' 
    },
    { 
      id: 'F3', 
      title: 'Crime Pattern & Trend Analytics', 
      desc: 'Interactive time-series charts, district-wise crime comparisons, and seasonal surge analysis.', 
      icon: 'TrendingUp', 
      path: '/trends-analytics', 
      department: 'State Crime Records Bureau (SCRB)', 
      category: 'analytics',
      badge: 'Time-Series Forecast', 
      color: 'border-l-4 border-l-emerald-600' 
    },
    { 
      id: 'F4', 
      title: 'Sociological & Demographic Insights', 
      desc: 'Demographic overlays correlating crime concentrations with urbanization, transit hubs, and economic indicators.', 
      icon: 'BarChart3', 
      path: '/sociological-insights', 
      department: 'SCRB Research Division', 
      category: 'analytics',
      badge: 'Demographics', 
      color: 'border-l-4 border-l-purple-600' 
    },
    { 
      id: 'F10', 
      title: 'Crime Forecasting & Early Warning', 
      desc: 'Rule-based early-warning alerts and statistical patrol resource deployment recommendations.', 
      icon: 'AlertTriangle', 
      path: '/forecasting-alerts', 
      department: 'Police HQ Operations Center', 
      category: 'analytics',
      badge: 'Early Warning', 
      color: 'border-l-4 border-l-orange-600' 
    },
    { 
      id: 'F6', 
      title: 'Recidivism & Bail Risk Scoring', 
      desc: 'QuickML probability model calculating re-offence risk based on prior convictions and MO similarity.', 
      icon: 'BrainCircuit', 
      path: '/recidivism-engine', 
      department: 'Judicial & Prosecution Liaison', 
      category: 'financial',
      badge: 'ML Recidivism', 
      color: 'border-l-4 border-l-red-700' 
    },
    { 
      id: 'F9', 
      title: 'Financial Crime & Smurfing Analysis', 
      desc: 'Money trail visualization detecting transaction structuring below the ₹50,000 reporting threshold.', 
      icon: 'Banknote', 
      path: '/financial', 
      department: 'Economic Offenses Wing (EOW)', 
      category: 'financial',
      badge: 'FIU Structuring', 
      color: 'border-l-4 border-l-green-600' 
    },
    { 
      id: 'F1', 
      title: 'Conversational Multilingual Crime Intelligence', 
      desc: 'NLP assistant querying 1,000 FIR records with context-aware English & Kannada inputs.', 
      icon: 'MessageSquare', 
      path: '/chatbot', 
      department: 'Prajna AI Core Engine', 
      category: 'command',
      badge: 'KSP RAG AI', 
      color: 'border-l-4 border-l-[#0B2E59]' 
    },
    { 
      id: 'F13', 
      title: 'Operational Patrol Simulation & RTCC', 
      desc: 'Live digital twin sandbox optimizing Hoysala vehicle placement and patrol routes.', 
      icon: 'ShieldAlert', 
      path: '/operational-simulation', 
      department: 'Command & Control Room', 
      category: 'command',
      badge: 'Digital Twin', 
      color: 'border-l-4 border-l-cyan-600' 
    },
    { 
      id: 'F12', 
      title: 'DPDP Act Governance & Access Audit', 
      desc: 'Strict 5-tier role-based access control, cryptographic hash verification, and audit logs.', 
      icon: 'Lock', 
      path: '/governance', 
      department: 'Inspector General Oversight Cell', 
      category: 'command',
      badge: '5-Tier RBAC', 
      color: 'border-l-4 border-l-slate-700' 
    }
  ];

  const filteredCapabilities = capabilityCategory === 'all' 
    ? capabilities 
    : capabilities.filter(c => c.category === capabilityCategory);

  // Priority triage helper — P1 Critical / P2 High / P3 Medium based on crime type
  const getIncidentPriority = (crimeType: string): { label: string; dotColor: string; badgeClass: string; cardBorderClass: string } => {
    const ct = (crimeType || '').toLowerCase();
    if (
      ct.includes('murder') || ct.includes('robbery') || ct.includes('kidnap') ||
      ct.includes('weapon') || ct.includes('assault') || ct.includes('snatching') ||
      ct.includes('chain') || ct.includes('dacoity') || ct.includes('extortion')
    ) {
      return {
        label: 'P1 CRITICAL',
        dotColor: 'bg-red-600',
        badgeClass: 'bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-800',
        cardBorderClass: 'border-l-4 border-l-red-600 border border-red-200 dark:border-red-900/60'
      };
    }
    if (
      ct.includes('cyber') || ct.includes('fraud') || ct.includes('otp') ||
      ct.includes('theft') || ct.includes('burglary') || ct.includes('breaking') ||
      ct.includes('banking') || ct.includes('financial') || ct.includes('cheating')
    ) {
      return {
        label: 'P2 HIGH',
        dotColor: 'bg-amber-500',
        badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800',
        cardBorderClass: 'border-l-4 border-l-amber-500 border border-amber-200 dark:border-amber-900/60'
      };
    }
    return {
      label: 'P3 MEDIUM',
      dotColor: 'bg-blue-500',
      badgeClass: 'bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900',
      cardBorderClass: 'border-l-4 border-l-blue-500 border border-blue-100 dark:border-blue-900/50'
    };
  };


  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-xs">
      
      {/* Toast Routing Feedback Alert */}
      {routingFeedback && (
        <div className="fixed top-4 right-4 z-50 bg-[#0B2E59] text-white px-5 py-3 rounded-lg shadow-2xl border-l-4 border-emerald-500 flex items-center gap-3 text-xs font-bold animate-bounce select-none">
          <Lucide.CheckCircle className="h-5 w-5 text-emerald-400" />
          <span>{routingFeedback}</span>
        </div>
      )}

      {/* TOP EMERGENCY CITIZEN SIGHTING ALERT BANNER */}
      {stationReports.length > 0 && (
        <div className="border border-[#8B0000] bg-red-50 dark:bg-red-950/40 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left shadow-sm select-none">
          <div className="flex items-start gap-2.5">
            <Lucide.BellRing className="h-5 w-5 text-[#8B0000] dark:text-red-400 shrink-0 mt-0.5 animate-bounce" />
            <div>
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#8B0000] dark:text-red-300">
                🚨 {t('urgentSightingAlert')} ({stationReports[0].station})
              </h4>
              <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 mt-0.5 leading-relaxed">
                A citizen reported an active sighting matching wanted convict <strong>{stationReports[0].suspect} ({stationReports[0].confidence}% Match)</strong> at <strong>{stationReports[0].location}</strong>.
              </p>
            </div>
          </div>
          <Link
            to="/face-search"
            className="shrink-0 bg-[#8B0000] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#a60000] text-center shadow cursor-pointer transition flex items-center gap-1.5"
          >
            <Lucide.ShieldCheck size={14} /> Open Biometric Verification
          </Link>
        </div>
      )}

      {/* 1. POLICE OPERATIONS COMMAND HEADER & RAPID ACTIONS (COMPACT & SLEEK) */}
      <div className="relative rounded-xl bg-gradient-to-r from-[#071D3A] via-[#0B2E59] to-[#133D6B] text-white p-3.5 md:p-4.5 shadow-md border-l-4 border-[#FF9F1C] text-left space-y-2.5 z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-[#FF9F1C] px-2 py-0.5 rounded text-[9px] font-black text-[#071D3A] uppercase tracking-wider mb-1">
              <span>{language === 'kn' ? 'CCTNS ಲೈವ್ ಅಪರಾಧ ಗುಪ್ತಚರ ಗೇಟ್‌ವೇ' : language === 'hi' ? 'सीसीटीएनएस लाइव अपराध इंटेलिजेंस गेटवे' : 'CCTNS LIVE CRIME INTELLIGENCE GATEWAY'}</span>
            </div>
            <h1 className="text-base md:text-lg lg:text-xl font-black tracking-tight text-white leading-tight">
              {language === 'kn' ? 'ಪ್ರಜ್ಞಾ-AI: ಕೆಎಸ್‌ಪಿಗಾಗಿ ಸಂಭಾಷಣಾ ಅಪರಾಧ ಗುಪ್ತಚರ ವ್ಯವಸ್ಥೆ' : language === 'hi' ? 'प्रज्ञा-AI: केएसपी के लिए संवादात्मक अपराध इंटेलिजेंस प्रणाली' : 'Prajna-AI: A Conversational Crime Intelligence System for KSP'}
            </h1>
            <p className="text-[11px] text-gray-300 mt-0.5 max-w-xl line-clamp-1 md:line-clamp-none">
              {language === 'kn' ? 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಠಾಣಾ ಕರ್ತವ್ಯ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ತನಿಖಾಧಿಕಾರಿಗಳಿಗೆ ನೈಜ-ಸಮಯದ ಕಾರ್ಯಾಚರಣಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.' : language === 'hi' ? 'पूरे कर्नाटक में स्टेशन ड्यूटी अधिकारियों और जांच अधिकारियों के लिए रीयल-टाइम परिचालन डैशबोर्ड।' : 'Real-time operational dashboard for station duty officers and investigators across Karnataka.'}
            </p>
          </div>

          {/* Quick Police Operations Launchers */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link
              to="/face-search"
              className="px-2.5 py-1.5 rounded-lg bg-[#8B0000] hover:bg-[#a60000] font-bold text-[11px] text-white flex items-center gap-1.5 shadow transition"
            >
              <Lucide.ScanFace size={13} className="text-amber-300" />
              <span>{language === 'kn' ? 'ಎಐ ಮುಖ & NAFIS ಹುಡುಕಾಟ' : language === 'hi' ? 'एआई चेहरा & NAFIS खोज' : 'AI Face & NAFIS Search'}</span>
            </Link>

            <Link
              to="/chatbot"
              className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/30 font-bold text-[11px] text-white flex items-center gap-1.5 transition"
            >
              <Lucide.MessageSquare size={13} className="text-amber-300" />
              <span>{language === 'kn' ? 'ಪ್ರಜ್ಞಾ AI ಗೆ ಕೇಳಿ' : language === 'hi' ? 'प्रज्ञा AI से पूछें' : 'Ask Prajna AI'}</span>
            </Link>

            <Link
              to="/rtcc"
              className="px-2.5 py-1.5 rounded-lg bg-[#FF9F1C] hover:bg-[#FFB800] font-black text-[11px] text-[#071D3A] flex items-center gap-1.5 transition shadow"
            >
              <Lucide.Radio size={13} />
              <span>{language === 'kn' ? 'ಲೈವ್ RTCC ಫೀಡ್' : language === 'hi' ? 'लाइव RTCC फ़ीड' : 'Live RTCC Feed'}</span>
            </Link>
          </div>
        </div>

        {/* CCTNS LIVE RAPID LOOKUP SEARCH BAR */}
        <div className="relative pt-1">
          <div className="relative flex items-center">
            <Lucide.Search className="absolute left-3 top-2.5 text-gray-400 h-3.5 w-3.5" />
            <input
              id="dashboard-rapid-search"
              name="dashboard-rapid-search"
              type="text"
              placeholder={language === 'kn' ? 'ತ್ವರಿತ CCTNS ಹುಡುಕಾಟ: ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆ (ಉದಾ. FIR-184), ಶಂಕಿತರ ಹೆಸರು (ಉದಾ. ಅಲ್ಲು, ಪ್ರವೀಣ್), ಅಪರಾಧ ಪ್ರಕಾರ ಅಥವಾ ಠಾಣೆ ಮೂಲಕ ಹುಡುಕಿ...' : language === 'hi' ? 'त्वरित सीसीटीएनएस खोज: एफआईआर संख्या (उदा. FIR-184), संदिग्ध का नाम (उदा. अल्लू, प्रवीण), अपराध प्रकार या थाना द्वारा खोजें...' : 'Rapid CCTNS Lookup: Search by FIR No. (e.g., FIR-184), Suspect Name (e.g., Allu, Praveen), Crime Type, or Police Station...'}
              value={quickSearchQuery}
              onChange={(e) => handleQuickSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/20 rounded-lg text-xs text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"
            />
            {quickSearchQuery && (
              <button 
                type="button" 
                onClick={() => { setQuickSearchQuery(''); setQuickSearchResults([]); }}
                className="absolute right-2.5 text-gray-300 hover:text-white"
              >
                <Lucide.X size={13} />
              </button>
            )}
          </div>

          {/* Quick Search Instant Autocomplete Dropdown - Elevated on top */}
          {quickSearchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl z-50 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800 text-left max-h-80 overflow-y-auto">
              {quickSearchResults.map((res, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    navigate(res.path);
                    setQuickSearchQuery('');
                    setQuickSearchResults([]);
                  }}
                  className="p-3 hover:bg-blue-50 dark:hover:bg-slate-800 flex justify-between items-center cursor-pointer text-xs transition"
                >
                  <div>
                    <span className="font-bold text-[#0B2E59] dark:text-sky-300 block">{res.title}</span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{res.sub}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-[9px] font-mono font-bold text-gray-700 dark:text-gray-300 uppercase">
                    {res.type} ↗
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>



      {/* 2. KPI STAT CARD ROW — Top-priority police metrics at a glance */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {isLoading ? (
          // Skeleton shimmer while async data loads
          Array.from({ length: 6 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <>
            <DashboardStatCard
              label={language === 'kn' ? 'ಒಟ್ಟು ಎಫ್‌ಐಆರ್‌ಗಳು' : language === 'hi' ? 'कुल एफआईआर' : 'Total FIRs'}
              value={stats.totalFIRs}
              icon="FileText"
              subLabel={language === 'kn' ? 'CCTNS ನೋಂದಾಯಿತ' : language === 'hi' ? 'सीसीटीएनएस पंजीकृत' : 'CCTNS Registered'}
              colorClass="text-blue-700 dark:text-blue-300"
              bgCircleClass="bg-blue-50 dark:bg-blue-950/60"
              onClick={() => navigate('/trends-analytics')}
            />
            <DashboardStatCard
              label={language === 'kn' ? 'ಸಕ್ರಿಯ ತನಿಖೆಗಳು' : language === 'hi' ? 'सक्रिय जाँच' : 'Active Investigations'}
              value={stats.activeInvestigations}
              icon="Search"
              subLabel={language === 'kn' ? 'ತೆರೆದ ಪ್ರಕರಣ ಕಡತಗಳು' : language === 'hi' ? 'खुली केस फाइलें' : 'Open Case Files'}
              colorClass="text-amber-700 dark:text-amber-300"
              bgCircleClass="bg-amber-50 dark:bg-amber-950/60"
              onClick={() => navigate('/offender-profiling')}
            />
            <DashboardStatCard
              label={language === 'kn' ? 'ನಿರ್ಣಾಯಕ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು' : language === 'hi' ? 'गंभीर हॉटस्पॉट' : 'Critical Hotspots'}
              value={stats.criticalHotspots}
              icon="MapPin"
              subLabel={language === 'kn' ? 'ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳು' : language === 'hi' ? 'कर्नाटक जिले' : 'Karnataka Districts'}
              colorClass="text-red-700 dark:text-red-300"
              bgCircleClass="bg-red-50 dark:bg-red-950/60"
              onClick={() => navigate('/hotspots')}
            />
            <DashboardStatCard
              label={language === 'kn' ? 'ತಿಳಿದಿರುವ ಅಪರಾಧಿಗಳು' : language === 'hi' ? 'ज्ञात अपराधी' : 'Known Offenders'}
              value={stats.knownOffenders}
              icon="UserX"
              subLabel={language === 'kn' ? 'NAFIS + CCTNS' : language === 'hi' ? 'NAFIS + सीसीटीएनएस' : 'NAFIS + CCTNS'}
              colorClass="text-purple-700 dark:text-purple-300"
              bgCircleClass="bg-purple-50 dark:bg-purple-950/60"
              onClick={() => navigate('/offender-profiling')}
            />
            <DashboardStatCard
              label={language === 'kn' ? 'ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳು' : language === 'hi' ? 'अभ्यस्त अपराधी' : 'Repeat Offenders'}
              value={stats.repeatOffenders}
              icon="Repeat"
              subLabel={language === 'kn' ? 'ಜಾಮೀನು ಅಪಾಯ: ಅಧಿಕ' : language === 'hi' ? 'ज़मानत जोखिम: उच्च' : 'Bail Risk: HIGH'}
              colorClass="text-orange-700 dark:text-orange-300"
              bgCircleClass="bg-orange-50 dark:bg-orange-950/60"
              onClick={() => navigate('/recidivism-engine')}
            />
            <DashboardStatCard
              label={language === 'kn' ? 'CCTNS ಸಿಂಕ್' : language === 'hi' ? 'सीसीटीएनएस सिंक' : 'CCTNS Sync'}
              value={stats.catalystStatus ? (language === 'kn' ? '100% ಸಂಪರ್ಕಿತ' : language === 'hi' ? '100% लिंक किया गया' : stats.catalystStatus) : (language === 'kn' ? '100% ಸಂಪರ್ಕಿತ' : language === 'hi' ? '100% लिंक किया गया' : '100% Linked')}
              icon="ShieldCheck"
              subLabel={language === 'kn' ? 'ಎಲ್ಲಾ ಠಾಣೆಗಳು ಆನ್‌ಲೈನ್' : language === 'hi' ? 'सभी थाने ऑनलाइन' : 'All Stations Online'}
              colorClass="text-emerald-700 dark:text-emerald-300"
              bgCircleClass="bg-emerald-50 dark:bg-emerald-950/60"
            />
          </>
        )}
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (CLEAN 2-COLUMN SPLIT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Spans): Analytics & Live Incident Stream */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Crime Trend Chart */}
          <div className="bg-white rounded-xl border border-[#E5DEC9] p-5 shadow-xs text-left dark:bg-[#071D3A] dark:border-ksp-navy-light">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4 dark:border-ksp-navy-light select-none">
              <span className="font-extrabold text-sm text-[#0B2E59] uppercase tracking-wider dark:text-white flex items-center gap-1.5">
                <Lucide.TrendingUp className="h-4 w-4 text-[#8B0000] dark:text-sky-300" />
                {language === 'kn' ? 'ಮಾಸಿಕ ಅಪರಾಧ ಸಂಭವನೀಯತೆ & ಋತುಮಾನ ಪ್ರವೃತ್ತಿಗಳು (2026 ಒಟ್ಟು)' : language === 'hi' ? 'मासिक अपराध घटनाएं और मौसमी रुझान (2026 समग्र)' : 'Monthly Crime Incidence & Seasonal Trends (2026 Aggregate)'}
              </span>
              <span className="text-[10px] font-mono text-gray-500 font-bold">
                {language === 'kn' ? 'ಎಸ್‌ಸಿಆರ್‌ಬಿ ಡೈನಾಮಿಕ್ ಟೆಲಿಮೆಟ್ರಿ' : language === 'hi' ? 'एससीआरबी डायनामिक टेलीमेट्री' : 'SCRB Dynamic Telemetry'}
              </span>
            </div>

            <div className="h-48 w-full min-w-0" style={{ minHeight: '192px' }}>
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={180}>
                <BarChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke={isDarkMode ? '#94A3B8' : '#64748B'} 
                    fontSize={10} 
                    tick={{ fill: isDarkMode ? '#E2E8F0' : '#475569', fontSize: 10 }}
                    tickLine={false} 
                    axisLine={false} 
                    interval={0} 
                    tickFormatter={(val) => formatDynamicText(val, language)}
                  />
                  <YAxis 
                    stroke={isDarkMode ? '#94A3B8' : '#64748B'} 
                    fontSize={11} 
                    tick={{ fill: isDarkMode ? '#E2E8F0' : '#475569', fontSize: 11 }}
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#071D3A' : '#0B2E59', 
                      borderRadius: '8px', 
                      color: '#fff', 
                      fontSize: '11px', 
                      border: isDarkMode ? '1px solid #1E3A5F' : 'none' 
                    }}
                  />
                  <ReferenceLine
                    y={Math.round(trendData.reduce((sum, d) => sum + d.value, 0) / trendData.length)}
                    stroke="#FF9F1C"
                    strokeDasharray="4 3"
                    strokeWidth={1.5}
                    label={{ value: language === 'kn' ? 'ಸರಾಸರಿ' : language === 'hi' ? 'औसत' : 'Avg', position: 'insideTopRight', fontSize: 10, fill: '#FF9F1C', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {trendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* LIVE CITIZEN INCIDENTS & DEPARTMENT ROUTING FEED */}
          <div className="bg-white rounded-xl border border-[#E5DEC9] p-5 shadow-xs text-left dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 dark:border-ksp-navy-light select-none">
              <div className="flex items-center gap-2">
                <Lucide.ShieldCheck className="h-4 w-4 text-[#8B0000] dark:text-sky-300" />
                <h3 className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider">
                  Live Incident Queue & Department Routing ({generalReports.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                ● Live Dispatch Sync
              </span>
            </div>

            <div className="space-y-3.5">
              {generalReports.map((report) => {
                const priority = getIncidentPriority(report.crimeType || report.category || '');
                return (
                <div key={report.id} className={`rounded-xl p-4 bg-gray-50/40 dark:bg-[#05182E] space-y-3 hover:shadow-md transition ${priority.cardBorderClass}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${priority.badgeClass}`}>
                        {priority.label}
                      </span>
                      <span className="font-mono font-bold text-xs text-[#0B2E59] dark:text-sky-300">
                        {report.id}
                      </span>
                      <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded bg-gray-200 dark:bg-slate-800">
                        {report.crimeType || report.category || 'Incident'}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono shrink-0">
                      {report.timestamp ? new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </span>
                  </div>

                  <div className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                    <p><strong>Occurrence Location:</strong> {report.location || report.sightingLocation || 'Karnataka Jurisdiction'}{report.station ? ` (${report.station})` : report.assignedStation ? ` (${report.assignedStation})` : ''}</p>
                    <p className="italic text-[11px] text-gray-600 dark:text-gray-400">"{report.details || report.description || 'Incident registered.'}"</p>
                  </div>

                  {/* Suspect AI Biometric Match Box */}
                  {report.matchedSuspect && (
                    <div className="p-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={report.matchedSuspect.photo_url} 
                          alt="" 
                          className="h-10 w-10 rounded object-cover border border-red-300 shrink-0" 
                        />
                        <div>
                          <span className="font-bold text-red-900 dark:text-red-300 block text-[11px]">
                            AI Match: {report.matchedSuspect.name} ({report.matchedSuspect.confidence}%)
                          </span>
                          <span className="text-[10px] text-gray-500 dark:text-gray-400">
                            {report.matchedSuspect.reason}
                          </span>
                        </div>
                      </div>
                      <Link
                        to="/face-search"
                        className="px-2.5 py-1 bg-[#8B0000] text-white text-[10px] font-bold rounded hover:bg-[#a60000] shrink-0"
                      >
                        Inspect Dossier ↗
                      </Link>
                    </div>
                  )}

                  {/* Police Action Bar: Direct Route to Department & Hoysala PCR Dispatch */}
                  <div className="flex flex-wrap items-center justify-between pt-2 border-t dark:border-gray-700 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500 font-bold uppercase">Assigned Unit:</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (report.routing?.redirectUrl) {
                            navigate(report.routing.redirectUrl);
                          } else {
                            setSelectedReport(report);
                          }
                        }}
                        className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-sky-300 border border-blue-200 dark:border-blue-800 rounded text-[10px] font-black hover:bg-blue-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Lucide.Building2 size={11} />
                        <span>{report.routing?.department || "Central Crime Branch"} ↗</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedReport(report)}
                        className="px-2.5 py-1 text-gray-600 dark:text-gray-300 hover:text-[#0B2E59] font-bold text-[10px] cursor-pointer"
                      >
                        Change Department Route
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDispatchPatrol(report.id)}
                        className="px-4 py-1.5 bg-[#8B0000] text-white font-black text-xs rounded-lg hover:bg-[#a60000] shadow-md cursor-pointer flex items-center gap-1.5 tracking-wide"
                      >
                        <Lucide.Send size={12} /> Dispatch Hoysala PCR
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 Spans): Priority AI Operations Feed & District Pressure */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Priority AI Alerts Block (Clicking Redirects to Department) */}
          <div className="bg-white rounded-xl border border-[#E5DEC9] p-5 shadow-xs text-left dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 dark:border-ksp-navy-light select-none">
              <span className="font-extrabold text-sm text-[#0B2E59] uppercase tracking-wider dark:text-white flex items-center gap-1.5">
                <Lucide.Bell className="h-4 w-4 text-[#8B0000] dark:text-sky-300" />
                {language === 'kn' ? 'ಲೈವ್ ಕಾರ್ಯಾಚರಣೆಗಳ ಫೀಡ್' : language === 'hi' ? 'लाइव ऑपरेशन्स फ़ीड' : 'Live Operations Feed'}
              </span>
              <span className="text-[10px] font-mono font-bold text-gray-400">
                {language === 'kn' ? 'ರೂಟ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : language === 'hi' ? 'रूट करने हेतु क्लिक करें' : 'Click to Route'}
              </span>
            </div>

            <div className="space-y-1.5">
              {(liveAlerts.length > 0 ? liveAlerts : getLivePortalNotifications()).slice(0, 6).map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => { if (alert.route) navigate(alert.route); }}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-blue-50/70 dark:hover:bg-slate-800 transition cursor-pointer border border-gray-100 dark:border-gray-800 hover:border-[#0B2E59] group"
                >
                  <span className={`h-2 w-2 rounded-full shrink-0 ${alert.dotColor || 'bg-[#8B0000]'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-gray-800 dark:text-white truncate">{formatDynamicText(alert.title, language)}</span>
                      <span className="text-[9px] font-mono font-black bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded shrink-0">{formatDynamicText(alert.badge, language)}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate block">{formatDynamicText(alert.sub, language)}</span>
                  </div>
                  <Lucide.ArrowUpRight size={12} className="shrink-0 text-gray-300 group-hover:text-[#0B2E59] dark:group-hover:text-sky-300 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* District Crime Pressure Matrix */}
          <div className="bg-white rounded-xl border border-[#E5DEC9] p-5 shadow-xs text-left dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-3">
            <div className="border-b border-gray-100 pb-3 dark:border-ksp-navy-light select-none">
              <span className="font-extrabold text-sm text-[#0B2E59] uppercase tracking-wider dark:text-white flex items-center gap-1.5">
                <Lucide.MapPin className="h-4 w-4 text-[#8B0000] dark:text-sky-300" />
                District Crime Pressure Matrix
              </span>
            </div>

            <div className="space-y-3 pt-1">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Bengaluru Urban (CCB Hub)</span>
                  <span className="text-red-700 dark:text-red-400 uppercase font-mono">HIGH (85%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-800">
                  <div className="bg-[#8B0000] h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Mysuru (Devaraja PS)</span>
                  <span className="text-amber-600 dark:text-amber-400 uppercase font-mono">MED (48%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-800">
                  <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Hubballi-Dharwad</span>
                  <span className="text-amber-600 dark:text-amber-400 uppercase font-mono">MED (38%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-800">
                  <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-gray-700 dark:text-gray-300">Mangaluru Coastal</span>
                  <span className="text-blue-600 dark:text-blue-400 uppercase font-mono">LOW (24%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-800">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '24%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* LIVE CRIME HOTSPOT MINI-MAP */}
          <div className="bg-white rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-xs text-left dark:bg-[#071D3A] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-ksp-navy-light select-none">
              <span className="font-extrabold text-sm text-[#0B2E59] uppercase tracking-wider dark:text-white flex items-center gap-1.5">
                <Lucide.MapPin className="h-4 w-4 text-[#8B0000] dark:text-sky-300" />
                Live Hotspot Map
              </span>
              <Link
                to="/hotspots"
                className="text-[10px] font-black text-[#0B2E59] dark:text-sky-300 hover:text-[#8B0000] flex items-center gap-0.5"
              >
                Full Map <Lucide.ArrowUpRight size={11} />
              </Link>
            </div>

            {hotspots.length > 0 ? (
              <div className="h-[260px] w-full relative z-10">
                <MapContainer
                  center={[15.3173, 75.7139]}
                  zoom={6}
                  scrollWheelZoom={false}
                  zoomControl={false}
                  style={{ height: '100%', width: '100%' }}
                  attributionControl={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {hotspots.slice(0, 40).map((point: any) => {
                    const sevColor = point.severity === 'critical' ? '#8B0000'
                      : point.severity === 'high' ? '#D32F2F'
                      : point.severity === 'medium' ? '#E65100'
                      : '#F9A825';
                    return (
                      <CircleMarker
                        key={point.id}
                        center={[point.latitude || 15.3, point.longitude || 75.7]}
                        pathOptions={{ color: sevColor, fillColor: sevColor, fillOpacity: 0.55, weight: 1.5 }}
                        radius={Math.max(5, Math.min(18, (point.count || 5) / 2))}
                      >
                        <Popup>
                          <div className="text-xs space-y-0.5">
                            <div className="font-bold text-[#0B2E59]">{point.district || 'Karnataka'}</div>
                            <div><strong>Crime:</strong> {point.crimeType || 'Multiple'}</div>
                            <div><strong>Cases:</strong> {point.count || 'Active'}</div>
                            <div>
                              <span className="px-1 rounded text-[10px] font-bold text-white uppercase" style={{ backgroundColor: sevColor }}>
                                {point.severity || 'medium'}
                              </span>
                            </div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}
                </MapContainer>
              </div>
            ) : (
              /* Fallback when hotspot data hasn't loaded yet */
              <div className="h-[260px] flex flex-col items-center justify-center gap-3 bg-gray-50/60 dark:bg-[#05182E]">
                <Lucide.Map className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400">Loading Live Map Feed...</p>
                  <Link to="/hotspots" className="text-[11px] font-black text-[#0B2E59] dark:text-sky-300 hover:underline mt-1 block">
                    Open Full Hotspot Intelligence →
                  </Link>
                </div>
              </div>
            )}

            {/* Mini legend */}
            <div className="px-4 py-2 border-t border-gray-100 dark:border-ksp-navy-light flex items-center gap-3 flex-wrap">
              {[
                { label: 'Critical', color: '#8B0000' },
                { label: 'High', color: '#D32F2F' },
                { label: 'Medium', color: '#E65100' },
                { label: 'Low', color: '#F9A825' },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 4. COLLAPSIBLE CORE CAPABILITY GATEWAY (IMAGE 2 REQUIREMENT SOLVED) */}
      <div className="bg-white rounded-2xl border border-[#E5DEC9] shadow-sm dark:bg-[#071D3A] dark:border-ksp-navy-light text-left overflow-hidden">
        {/* Collapsible Header Bar with Toggle */}
        <div 
          onClick={() => setCapabilitiesExpanded(!capabilitiesExpanded)}
          className="p-5 bg-gray-50/70 dark:bg-[#05182E] flex items-center justify-between cursor-pointer select-none hover:bg-gray-100/80 transition"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#0B2E59] text-white">
              <Lucide.ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider">
                  {language === 'kn' ? 'ಕೆಎಸ್‌ಪಿ ಸಿರಾಸ್ ಗುಪ್ತಚರ ಮಾಡ್ಯೂಲ್‌ಗಳು & ಇಲಾಖಾ ಗೇಟ್‌ವೇ' : language === 'hi' ? 'केएसपी सिरास इंटेलिजेंस मॉड्यूल और विभाग गेटवे' : 'KSP CIRAS Intelligence Modules & Department Gateway'}
                </h3>
                <span className="text-[10px] font-bold bg-[#0B2E59] text-white px-2 py-0.2 rounded font-mono">
                  {language === 'kn' ? '12 ಪರಿಹಾರಗಳು' : language === 'hi' ? '12 समाधान' : '12 SOLUTIONS'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                {capabilitiesExpanded 
                  ? (language === 'kn' ? 'ಮಾಡ್ಯೂಲ್ ಕನ್ಸೋಲ್ ಕುಗ್ಗಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ. ಆ ವಿಭಾಗಕ್ಕೆ ನೇರವಾಗಿ ಮರುನಿರ್ದೇಶಿಸಲು ಯಾವುದೇ ಇಲಾಖಾ ಸಾಮರ್ಥ್ಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ.' : language === 'hi' ? 'मॉड्यूल कंसोल संक्षिप्त करने के लिए क्लिक करें। उस प्रभाग पर सीधे पुनर्निर्देशित करने के लिए किसी भी विभागीय क्षमता का चयन करें।' : 'Click to collapse module console. Select any department capability to redirect directly to that division.')
                  : (language === 'kn' ? 'ಕುಗ್ಗಿಸಬಹುದಾದ ಮೆನು: ಎಲ್ಲಾ 12 ವಿಶೇಷ ಕೆಎಸ್‌ಪಿ ಅಪರಾಧ ಗುಪ್ತಚರ ವಿಭಾಗಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ.' : language === 'hi' ? 'संक्षिप्त करने योग्य मेनू: सभी 12 विशिष्ट केएसपी अपराध इंटेलिजेंस प्रभागों तक पहुंचने के लिए क्लिक करें।' : 'Collapsible menu: Click to expand and access all 12 specialized KSP crime intelligence divisions.')}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border text-[#0B2E59] dark:text-white text-xs font-black flex items-center gap-1.5 shadow-xs"
          >
            {capabilitiesExpanded ? (
              <>
                <span>{language === 'kn' ? 'ಗೇಟ್‌ವೇ ಕುಗ್ಗಿಸಿ' : language === 'hi' ? 'गेटवे संक्षिप्त करें' : 'Collapse Gateway'}</span>
                <Lucide.ChevronUp size={15} />
              </>
            ) : (
              <>
                <span>{language === 'kn' ? '12 ಪರಿಹಾರಗಳನ್ನು ವಿಸ್ತರಿಸಿ' : language === 'hi' ? '12 समाधान विस्तृत करें' : 'Expand 12 Solutions'}</span>
                <Lucide.ChevronDown size={15} />
              </>
            )}
          </button>
        </div>

        {/* Expandable Module Drawer */}
        {capabilitiesExpanded && (
          <div className="p-6 space-y-5 border-t dark:border-gray-700">
            {/* Department Category Filter Pills */}
            <div className="flex flex-wrap gap-2 select-none">
              <button
                type="button"
                onClick={() => setCapabilityCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  capabilityCategory === 'all' 
                    ? 'bg-[#0B2E59] text-white shadow' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {language === 'kn' ? 'ಎಲ್ಲಾ 12 ಮಾಡ್ಯೂಲ್‌ಗಳು' : language === 'hi' ? 'सभी 12 मॉड्यूल' : 'All 12 Modules'}
              </button>
              <button
                type="button"
                onClick={() => setCapabilityCategory('investigation')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  capabilityCategory === 'investigation' 
                    ? 'bg-[#0B2E59] text-white shadow' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {language === 'kn' ? '🔍 ತನಿಖೆ ಮತ್ತು ಬಯೋಮೆಟ್ರಿಕ್ಸ್ (CCB / ಫೋರೆನ್ಸಿಕ್ಸ್)' : language === 'hi' ? '🔍 जाँच और बायोमेट्रिक्स (CCB / फोरेंसिक)' : '🔍 Investigation & Biometrics (CCB / Forensics)'}
              </button>
              <button
                type="button"
                onClick={() => setCapabilityCategory('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  capabilityCategory === 'analytics' 
                    ? 'bg-[#0B2E59] text-white shadow' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {language === 'kn' ? '📈 ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ & ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳು (SCRB)' : language === 'hi' ? '📈 अपराध विश्लेषण और हॉटस्पॉट (SCRB)' : '📈 Crime Analytics & Hotspots (SCRB)'}
              </button>
              <button
                type="button"
                onClick={() => setCapabilityCategory('financial')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  capabilityCategory === 'financial' 
                    ? 'bg-[#0B2E59] text-white shadow' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {language === 'kn' ? '💳 ಆರ್ಥಿಕ ಅಪರಾಧಗಳು & ಮರುಕಳಿಸುವಿಕೆ (EOW)' : language === 'hi' ? '💳 आर्थिक अपराध और पुनरावृत्ति (EOW)' : '💳 Economic Offenses & Recidivism (EOW)'}
              </button>
              <button
                type="button"
                onClick={() => setCapabilityCategory('command')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  capabilityCategory === 'command' 
                    ? 'bg-[#0B2E59] text-white shadow' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {language === 'kn' ? '🛡️ ಕಮಾಂಡ್ & ಆಡಳಿತ (HQ)' : language === 'hi' ? '🛡️ कमांड और शासन (HQ)' : '🛡️ Command & Governance (HQ)'}
              </button>
            </div>

            {/* Capability Cards Grid (With Direct Department Redirects) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
              {filteredCapabilities.map((cap) => {
                const IconComponent = (Lucide as any)[cap.icon] || Lucide.Circle;
                return (
                  <div 
                    key={cap.id}
                    onClick={() => navigate(cap.path)}
                    className={`bg-gray-50/50 dark:bg-slate-800/40 p-4 rounded-xl border border-gray-200 dark:border-gray-700 transition cursor-pointer flex flex-col justify-between hover:shadow-md hover:border-[#0B2E59] dark:hover:border-sky-400 ${cap.color}`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="p-2 bg-white dark:bg-[#071D3A] rounded-lg shadow-xs text-[#0B2E59] dark:text-sky-300">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-mono font-black px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#0B2E59] dark:text-sky-300">
                          {formatDynamicText(cap.badge, language)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-gray-500 dark:text-gray-400 font-bold block">
                          {formatDynamicText(cap.department, language)}
                        </span>
                        <h4 className="font-extrabold text-xs text-[#0B2E59] dark:text-white uppercase tracking-wide mt-0.5">
                          {formatDynamicText(cap.title, language)}
                        </h4>
                      </div>

                      <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        {formatDynamicText(cap.desc, language)}
                      </p>
                    </div>

                    <div className="pt-3 border-t dark:border-gray-700 flex justify-between items-center mt-2">
                      <span className="text-[10px] text-gray-500 font-mono">
                        {language === 'kn' ? 'ಮಾಡ್ಯೂಲ್' : language === 'hi' ? 'मॉड्यूल' : 'Module'} {cap.id}
                      </span>
                      <span className="text-[11px] font-black text-[#0B2E59] dark:text-sky-300 hover:text-red-700 flex items-center gap-1">
                        {language === 'kn' ? 'ಇಲಾಖೆಗೆ ಮರುನಿರ್ದೇಶಿಸಿ' : language === 'hi' ? 'विभाग पर पुनर्निर्देशित करें' : 'Redirect to Department'} <Lucide.ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* DEPARTMENT ROUTING & DETAIL DIALOG */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-xl border border-gray-200 dark:border-ksp-navy-light bg-white dark:bg-[#0B2E59] p-6 shadow-2xl text-left space-y-4">
            <div className="flex justify-between items-start border-b dark:border-ksp-navy-light pb-3">
              <div>
                <span className="text-[9px] font-mono font-black bg-[#0B2E59] text-white px-2 py-0.5 rounded uppercase">
                  DEPARTMENT ROUTING CONSOLE
                </span>
                <h3 className="text-sm font-extrabold text-[#0B2E59] dark:text-white mt-1">
                  Route Incident {selectedReport.id} to Specialized Division
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-3 bg-gray-50 dark:bg-[#071D3A] rounded-lg border text-xs space-y-1">
              <p><strong>Crime Category:</strong> {selectedReport.crimeType}</p>
              <p><strong>Location:</strong> {selectedReport.location}</p>
              <p className="italic text-gray-600 dark:text-gray-300">"{selectedReport.details}"</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                SELECT TARGET POLICE DEPARTMENT / SQUAD:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleRouteDepartment("Central Crime Branch (CCB Anti-Theft)", "/offender-profiling")}
                  className="p-2.5 rounded-lg border hover:border-[#0B2E59] bg-white dark:bg-[#05182E] text-left font-bold cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition flex items-center justify-between"
                >
                  <span>🏛️ Central Crime Branch (CCB)</span>
                  <Lucide.ArrowUpRight size={13} className="text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleRouteDepartment("CID Cyber Crime Division", "/financial")}
                  className="p-2.5 rounded-lg border hover:border-[#0B2E59] bg-white dark:bg-[#05182E] text-left font-bold cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition flex items-center justify-between"
                >
                  <span>💻 CID Cyber & Financial Cell</span>
                  <Lucide.ArrowUpRight size={13} className="text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleRouteDepartment("State Biometrics & Forensic Squad", "/face-search")}
                  className="p-2.5 rounded-lg border hover:border-[#0B2E59] bg-white dark:bg-[#05182E] text-left font-bold cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition flex items-center justify-between"
                >
                  <span>👤 Biometrics & Forensics</span>
                  <Lucide.ArrowUpRight size={13} className="text-gray-400" />
                </button>

                <button
                  type="button"
                  onClick={() => handleRouteDepartment("Jurisdictional Beat Patrol Division", "/hotspots")}
                  className="p-2.5 rounded-lg border hover:border-[#0B2E59] bg-white dark:bg-[#05182E] text-left font-bold cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition flex items-center justify-between"
                >
                  <span>🚨 Law & Order PCR Squad</span>
                  <Lucide.ArrowUpRight size={13} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t dark:border-ksp-navy-light">
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. STANDARD OPERATING PROCEDURE & HOW TO OPERATE DRAWER */}
      <div id="sop-guide-anchor" />
      <ModuleSopGuide
        moduleName="Prajna-AI: A Conversational Crime Intelligence System for KSP"
        department="State Police Command & Control Centre / SCRB Karnataka"
        legalAuthority="Section 154 CrPC / Section 173 BNSS, Section 76 Karnataka Police Act & CCTNS Operating Guidelines"
        purpose="Central operations command console for monitoring real-time crime incidents, tracking FIRs, and routing cases to specialized police branches."
        steps={[
          {
            step: "Rapid Search & CCTNS Query",
            action: "Type any FIR number, suspect alias, or station in the top search bar.",
            detail: "Instant auto-completion matches against 1,000 real CCTNS FIRs and 10 registered KSP convict files."
          },
          {
            step: "Emergency Beat & PCR Dispatch",
            action: "Click 'Dispatch Hoysala PCR' on any high-priority citizen incident.",
            detail: "Transmits GPS coordinates, crime classification, and suspect photo to the nearest patrolling Hoysala vehicle."
          },
          {
            step: "Specialized Department Routing",
            action: "Click 'Redirect to Department' to transfer the case dossier.",
            detail: "Instantly routes cases to CCB (Theft/Burglary), CID Cyber (OTP Fraud), or State Biometrics (Face/Fingerprint)."
          }
        ]}
        tacticalTips={[
          "Use the 'Expand 12 Solutions' toggle at the bottom to access specialized investigative intelligence modules.",
          "Click any priority alert on the right feed to jump directly into the relevant department analysis tool.",
          "All CCTNS statistics and telemetry update dynamically from active police station databases."
        ]}
      />

      {/* FLOATING HELP BUTTON — scrolls to SOP Guide from anywhere on dashboard */}
      <button
        type="button"
        title="Standard Operating Procedure Guide"
        onClick={() => document.getElementById('sop-guide-anchor')?.scrollIntoView({ behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-[#0B2E59] dark:bg-[#133D6B] text-white shadow-xl border-2 border-[#FF9F1C] flex items-center justify-center hover:bg-[#133D6B] hover:scale-110 transition-all cursor-pointer group"
      >
        <Lucide.HelpCircle className="h-5 w-5 text-[#FFB800] group-hover:rotate-12 transition-transform" />
        <span className="absolute right-14 bg-[#0B2E59] text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-lg border border-[#FF9F1C]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          SOP / How-To Guide
        </span>
      </button>

    </div>
  );
}
