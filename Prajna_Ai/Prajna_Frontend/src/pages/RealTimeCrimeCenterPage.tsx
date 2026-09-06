import React, { useState, useEffect, useMemo } from 'react';
import {
  Radio,
  Video,
  Shield,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Car,
  Camera,
  MapPin,
  Clock,
  Compass,
  Zap,
  Activity,
  Search,
  Crosshair,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RefreshCw,
  Send,
  Sliders,
  Eye,
  Lock,
  Unlock,
  Layers,
  Fuel,
  Gauge,
  PhoneCall,
  Flame,
  FileText,
  UserCheck,
  ChevronRight,
  Info,
  Check,
  Play,
  Pause,
  ArrowRight,
  Siren,
  Sparkles,
  Award
} from 'lucide-react';
import { KarnatakaHotspotMap } from '@/components/map/KarnatakaHotspotMap';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import { LiveDeviceCameraFeed } from '@/components/rtcc/LiveDeviceCameraFeed';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';

// Types for RTCC Telemetry and ANPR Scan
export interface AnprCamera {
  id: string;
  name: string;
  junction: string;
  lat: number;
  lng: number;
  status: 'ONLINE' | 'CALIBRATING' | 'OFFLINE';
  lanes: number;
  scansPerMin: number;
  lastCapture: string;
  lastCaptureTime: string;
  ptzPreset?: string;
}

export interface PcrPatrolVan {
  unitId: string;
  callsign: string;
  officer: string;
  lat: number;
  lng: number;
  status: 'PURSUING' | 'STANDBY' | 'ON_PATROL' | 'AVAILABLE';
  speedKmh: number;
  fuelPercent: number;
  assignedIncident: string | null;
  etaMinutes: number;
  equipped: string[];
}

export interface Incident112 {
  incidentId: string;
  type: string;
  callerPhone: string;
  location: string;
  lat: number;
  lng: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: string;
  assignedUnits: string[];
  targetPlate: string | null;
  reportedAt: string;
  details: string;
}

export interface PtzFeed {
  camId: string;
  name: string;
  resolution: string;
  pan: string;
  tilt: string;
  zoom: string;
  nightVision: string;
  liveStreamStatus: string;
  feedUrl: string;
}

export interface ChokePoint {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  lat: number;
  lng: number;
  status: 'READY_TO_SEAL' | 'STANDBY' | 'DEPLOYED' | 'SEALED';
  assignedUnits: string[];
  interceptionTactics: string;
  personnelStrength: number;
  commandContact: string;
}

export interface AnprScanResult {
  status: 'HOTLIST_HIT' | 'CLEAR' | 'ERROR';
  isHotlist: boolean;
  threatTier: 'CRITICAL_TIER_1' | 'HIGH_TIER_2' | 'MEDIUM' | 'CLEAN';
  alertType: string;
  searchedPlate: string;
  detectionTimestamp: string;
  confidenceScore: number;
  crimeCategory: string;
  linkedFir?: string;
  suspect?: {
    name: string;
    convictId: string;
    photoUrl: string;
    riskTier: string;
    aliases: string[];
    warrantStatus: string;
    weaponsFlag: string;
    previousConvictions: number;
    gangAffiliation?: string;
  } | null;
  vehicle: {
    registration: string;
    makeModel: string;
    chassisNo: string;
    engineNo: string;
    vahanOwner: string;
    fuelType: string;
    color: string;
    lastSightingLocation: string;
    lat: number;
    lng: number;
    speedKmh: number;
    travelHeading: string;
    cameraCaptured: string;
  };
  vahanDetails?: {
    status: string;
    registeringAuthority: string;
    fitnessValidTill: string;
    insuranceValidTill: string;
    pucValidTill: string;
    pendingTrafficChallans: number;
    stolenReportStatus: string;
    blacklistStatus: string;
    hypothecation?: string;
  };
  tacticalCordon?: {
    cordonCode: string;
    protocol: string;
    suggestedAction: string;
    chokePoints: ChokePoint[];
  } | null;
}

// Fallback Mock Data for instant offline/standalone reliability
const DEFAULT_CAMERAS: AnprCamera[] = [
  {
    id: "CAM-ANPR-01",
    name: "Silk Board Junction - North Outbound",
    junction: "Silk Board Flyover Ramp",
    lat: 12.9176,
    lng: 77.6233,
    status: "ONLINE",
    lanes: 4,
    scansPerMin: 142,
    lastCapture: "KA-01-MJ-4912",
    lastCaptureTime: "Just now",
    ptzPreset: "Sector 4 North"
  },
  {
    id: "CAM-ANPR-02",
    name: "Hebbal Flyover - Airport Corridor Inbound",
    junction: "Hebbal Outer Ring Flyover",
    lat: 13.0358,
    lng: 77.5970,
    status: "ONLINE",
    lanes: 6,
    scansPerMin: 198,
    lastCapture: "KA-04-NB-8821",
    lastCaptureTime: "1 min ago",
    ptzPreset: "Airport Expressway Lane 1-3"
  },
  {
    id: "CAM-ANPR-03",
    name: "MG Road - Trinity Circle Junction",
    junction: "Trinity Metro Station Axis",
    lat: 12.9738,
    lng: 77.6190,
    status: "ONLINE",
    lanes: 4,
    scansPerMin: 110,
    lastCapture: "KA-03-HA-9081",
    lastCaptureTime: "3 mins ago",
    ptzPreset: "Central CBD"
  },
  {
    id: "CAM-ANPR-04",
    name: "Majestic KSRTC Terminal Ingress",
    junction: "Majestic Interchange Gateway",
    lat: 12.9774,
    lng: 77.5708,
    status: "ONLINE",
    lanes: 3,
    scansPerMin: 165,
    lastCapture: "KA-05-EV-4410",
    lastCaptureTime: "2 mins ago",
    ptzPreset: "Bus Depot Perimeter"
  },
  {
    id: "CAM-ANPR-05",
    name: "Indiranagar 100ft Road - CMH Cross",
    junction: "100ft Road Junction",
    lat: 12.9719,
    lng: 77.6412,
    status: "ONLINE",
    lanes: 2,
    scansPerMin: 94,
    lastCapture: "KA-01-AB-1234",
    lastCaptureTime: "Just now",
    ptzPreset: "East Sector Patrol"
  },
  {
    id: "CAM-ANPR-06",
    name: "Electronic City Toll Plaza Gate 4",
    junction: "Hosur Elevated Tollway",
    lat: 12.8452,
    lng: 77.6602,
    status: "ONLINE",
    lanes: 8,
    scansPerMin: 240,
    lastCapture: "KA-51-MD-9988",
    lastCaptureTime: "4 mins ago",
    ptzPreset: "Inter-State Border Watch"
  }
];

const CAM_TARGET_MAP: Record<string, { plate: string; makeModel: string; threat: string; speed: string }> = {
  'PTZ-01': { plate: 'KA-01-MJ-4912', makeModel: 'MAHINDRA SCORPIO-N', threat: 'HOTLIST THREAT #1', speed: '74 KM/H • HEADING: 018° N' },
  'PTZ-02': { plate: 'KA-04-NB-8821', makeModel: 'HYUNDAI CRETA SX', threat: 'HOTLIST THREAT #2', speed: '88 KM/H • HEADING: 350° N' },
  'PTZ-03': { plate: 'KA-03-HA-9081', makeModel: 'TOYOTA FORTUNER GR-S', threat: 'HIGH ALERT (SNATCHING)', speed: '42 KM/H • HEADING: 090° E' },
  'PTZ-04': { plate: 'KA-05-EV-4410', makeModel: 'TATA NEXON EV MAX', threat: 'SUSPICIOUS (DUPLICATE PLATE)', speed: '38 KM/H • HEADING: 270° W' },
  'PTZ-05': { plate: 'KA-01-AB-1234', makeModel: 'MARUTI SUZUKI SWIFT', threat: 'VAHAN CLEAN RECORD', speed: '45 KM/H • HEADING: 120° SE' },
  'PTZ-06': { plate: 'KA-51-MD-9988', makeModel: 'BMW 3-SERIES M SPORT', threat: 'INTER-STATE CHECK CLEAR', speed: '92 KM/H • HEADING: 180° S' },
};

const DEFAULT_PCR_VANS: PcrPatrolVan[] = [
  {
    unitId: "HYS-104",
    callsign: "Hoysala-104 (Koramangala Sector)",
    officer: "PSI Manjunath K. (KA-POL-8841)",
    lat: 12.9352,
    lng: 77.6245,
    status: "PURSUING",
    speedKmh: 56,
    fuelPercent: 84,
    assignedIncident: "INC-112-9921",
    etaMinutes: 2.1,
    equipped: ["Dynamic Net Cordon", "ANPR Mobile Dashcam", "VHF Tactical Radio", "Spike Strips"]
  },
  {
    unitId: "HYS-088",
    callsign: "Hoysala-088 (Jayanagar 4th Block)",
    officer: "ASI Ramesh Babu (KA-POL-7712)",
    lat: 12.9298,
    lng: 77.5840,
    status: "STANDBY",
    speedKmh: 28,
    fuelPercent: 92,
    assignedIncident: "INC-112-9934",
    etaMinutes: 4.0,
    equipped: ["Spike Strips", "Body-Worn Camera", "Emergency Medical Kit"]
  },
  {
    unitId: "HYS-212",
    callsign: "Hoysala-212 (Indiranagar / Old Airport)",
    officer: "PI Suresh Kumar (KA-POL-6509)",
    lat: 12.9592,
    lng: 77.6480,
    status: "ON_PATROL",
    speedKmh: 35,
    fuelPercent: 76,
    assignedIncident: null,
    etaMinutes: 5.2,
    equipped: ["Garuda Tactical Cordon Kit", "Mobile Plate Reader"]
  },
  {
    unitId: "HYS-419",
    callsign: "Hoysala-419 (Hebbal / Outer Ring)",
    officer: "PSI Deepa Patil (KA-POL-9014)",
    lat: 13.0320,
    lng: 77.5890,
    status: "PURSUING",
    speedKmh: 68,
    fuelPercent: 71,
    assignedIncident: "INC-112-9928",
    etaMinutes: 2.5,
    equipped: ["Highway Pursuit Kit", "Heavy Tyre Deflator", "Night Vision PTZ"]
  },
  {
    unitId: "HYS-305",
    callsign: "Hoysala-305 (Whitefield ITPL)",
    officer: "ASI Prakash Naik (KA-POL-5481)",
    lat: 12.9860,
    lng: 77.7310,
    status: "AVAILABLE",
    speedKmh: 0,
    fuelPercent: 95,
    assignedIncident: null,
    etaMinutes: 0,
    equipped: ["Standard Hoysala Response Kit"]
  }
];

const DEFAULT_INCIDENTS: Incident112[] = [
  {
    incidentId: "INC-112-9921",
    type: "ARMED_ROBBERY_VEHICLE_FLEEING",
    callerPhone: "+91-98801-XXXXX",
    location: "Hosur Road - Silk Board Corridor",
    lat: 12.9176,
    lng: 77.6233,
    priority: "CRITICAL",
    status: "TACTICAL_CORDON_ACTIVE",
    assignedUnits: ["HYS-104", "HYS-088"],
    targetPlate: "KA-01-MJ-4912",
    reportedAt: "3 mins ago",
    details: "Armed robbery suspect 'Bullet' Shankar fleeing north in Black Scorpio-N. ANPR hit confirmed."
  },
  {
    incidentId: "INC-112-9928",
    type: "INTERSTATE_CONTRABAND_INTERCEPT",
    callerPhone: "+91-94480-XXXXX",
    location: "Hebbal Expressway Outbound",
    lat: 13.0358,
    lng: 77.5970,
    priority: "HIGH",
    status: "PURSUIT_IN_PROGRESS",
    assignedUnits: ["HYS-419"],
    targetPlate: "KA-04-NB-8821",
    reportedAt: "5 mins ago",
    details: "High speed White Creta carrying commercial NDPS contraband heading towards NH 44 toll."
  },
  {
    incidentId: "INC-112-9934",
    type: "COMMERCIAL_BURGLARY_ALARM",
    callerPhone: "+91-80255-XXXXX",
    location: "Commercial Street East Circle",
    lat: 12.9815,
    lng: 77.6085,
    priority: "MEDIUM",
    status: "UNIT_DISPATCHED",
    assignedUnits: ["HYS-212"],
    targetPlate: null,
    reportedAt: "8 mins ago",
    details: "Automated silent store alarm triggered. CCTV confirms 2 individuals at perimeter."
  }
];

const DEFAULT_PTZ_FEEDS: PtzFeed[] = [
  {
    camId: "PTZ-01",
    name: "Silk Board Junction High-Mast PTZ",
    resolution: "1080p @ 60 FPS",
    pan: "184° S-SW",
    tilt: "-18°",
    zoom: "18x Optical",
    nightVision: "IR_ACTIVE",
    liveStreamStatus: "STREAMING",
    feedUrl: "rtsp://ksp-rtcc-bengaluru/cam01-silkboard/live"
  },
  {
    camId: "PTZ-02",
    name: "Hebbal Outer Ring Flyover Dual PTZ",
    resolution: "4K Ultra-HD @ 30 FPS",
    pan: "042° NE",
    tilt: "-12°",
    zoom: "24x Optical",
    nightVision: "THERMAL_HYBRID",
    liveStreamStatus: "STREAMING",
    feedUrl: "rtsp://ksp-rtcc-bengaluru/cam02-hebbal/live"
  },
  {
    camId: "PTZ-03",
    name: "Majestic Interstate Bus Interchange Dome",
    resolution: "1080p @ 60 FPS",
    pan: "270° W",
    tilt: "-30°",
    zoom: "10x Optical",
    nightVision: "COLOR_LOW_LIGHT",
    liveStreamStatus: "STREAMING",
    feedUrl: "rtsp://ksp-rtcc-bengaluru/cam03-majestic/live"
  },
  {
    camId: "PTZ-04",
    name: "MG Road Brigade Junction 360° Cam",
    resolution: "1080p @ 60 FPS",
    pan: "120° SE",
    tilt: "-15°",
    zoom: "12x Optical",
    nightVision: "OPTICAL_DAY_NIGHT",
    liveStreamStatus: "STREAMING",
    feedUrl: "rtsp://ksp-rtcc-bengaluru/cam04-mgroad/live"
  }
];

export function RealTimeCrimeCenterPage() {
  const { t, language } = useLanguage();

  // Telemetry state
  const [telemetryStatus, setTelemetryStatus] = useState<'connected' | 'connecting' | 'fallback'>('connecting');
  const [activePcrUnitsCount, setActivePcrUnitsCount] = useState<number>(142);
  const [cadLatency, setCadLatency] = useState<number>(14.2);
  const [droneSectors, setDroneSectors] = useState<number>(8);
  const [anprCameras, setAnprCameras] = useState<AnprCamera[]>(DEFAULT_CAMERAS);
  const [pcrPatrolVans, setPcrPatrolVans] = useState<PcrPatrolVan[]>(DEFAULT_PCR_VANS);
  const [incidents112, setIncidents112] = useState<Incident112[]>(DEFAULT_INCIDENTS);
  const [ptzFeeds, setPtzFeeds] = useState<PtzFeed[]>(DEFAULT_PTZ_FEEDS);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<'commandWall' | 'anprScanner' | 'fleetTracker' | 'incidents112'>('commandWall');

  // Selected PTZ Camera for Live Switcher
  const [selectedPtzId, setSelectedPtzId] = useState<string>('PTZ-01');
  const [ptzZoomLevel, setPtzZoomLevel] = useState<number>(18);
  const [isNightVisionOn, setIsNightVisionOn] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [gridMode, setGridMode] = useState<boolean>(false);

  // Video source for the main viewport: simulated PTZ feeds, or the
  // operator's own laptop webcam / external USB camera device.
  const [cameraSource, setCameraSource] = useState<'simulated' | 'device'>('simulated');

  // ANPR Scanner State
  const [inputPlate, setInputPlate] = useState<string>('KA-01-MJ-4912');
  const [selectedCameraForScan, setSelectedCameraForScan] = useState<string>('CAM-ANPR-01');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<AnprScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<string[]>(['KA-01-MJ-4912', 'KA-04-NB-8821', 'KA-01-AB-1234']);

  // Tactical Cordon & Dispatch State
  const [cordonDeployed, setCordonDeployed] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<{ active: boolean; message: string; dispatchId?: string } | null>(null);
  const [activeChokePointStatus, setActiveChokePointStatus] = useState<Record<string, 'READY_TO_SEAL' | 'DEPLOYED' | 'SEALED'>>({});

  // Clock
  const [currentUtcTime, setCurrentUtcTime] = useState<string>('');
  const [currentIstTime, setCurrentIstTime] = useState<string>('');

  // Clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toUTCString().replace('GMT', 'UTC'));
      setCurrentIstTime(now.toLocaleTimeString('en-IN', { hour12: false, timeZone: 'Asia/Kolkata' }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch telemetry from http://localhost:8000/api/rtcc/telemetry
  const fetchTelemetry = async () => {
    try {
      setTelemetryStatus('connecting');
      const res = await fetch('http://localhost:8000/api/rtcc/telemetry', {
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        setTelemetryStatus('connected');
        if (data.activePcrUnits) setActivePcrUnitsCount(data.activePcrUnits);
        if (data.cadStreamLatencyMs) setCadLatency(data.cadStreamLatencyMs);
        if (data.droneCoverageSectors) setDroneSectors(data.droneCoverageSectors);
        if (data.anprCameras && Array.isArray(data.anprCameras)) setAnprCameras(data.anprCameras);
        if (data.pcrPatrolVans && Array.isArray(data.pcrPatrolVans)) setPcrPatrolVans(data.pcrPatrolVans);
        if (data.incidents112 && Array.isArray(data.incidents112)) setIncidents112(data.incidents112);
        if (data.ptzFeeds && Array.isArray(data.ptzFeeds)) setPtzFeeds(data.ptzFeeds);
      } else {
        setTelemetryStatus('fallback');
      }
    } catch {
      setTelemetryStatus('fallback');
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const pollInterval = setInterval(fetchTelemetry, 10000); // poll every 10s
    return () => clearInterval(pollInterval);
  }, []);

  // Execute ANPR Scan
  const handleExecuteScan = async (plateToScan?: string) => {
    const plate = (plateToScan || inputPlate).trim().toUpperCase();
    if (!plate) return;

    setIsScanning(true);
    setCordonDeployed(false);
    setDispatchStatus(null);

    // Save to history
    if (!scanHistory.includes(plate)) {
      setScanHistory(prev => [plate, ...prev.slice(0, 5)]);
    }

    try {
      // Query http://localhost:8000/api/anpr/scan
      const res = await fetch('http://localhost:8000/api/anpr/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plate, cameraId: selectedCameraForScan })
      });

      if (res.ok) {
        const result: AnprScanResult = await res.json();
        setScanResult(result);
      } else {
        // Fallback local logic for instant responsiveness
        generateLocalScanResult(plate);
      }
    } catch {
      // Backend not running on port 8000 -> use local fallback engine
      generateLocalScanResult(plate);
    } finally {
      setTimeout(() => {
        setIsScanning(false);
      }, 500);
    }
  };

  // Local fallback scan generator
  const generateLocalScanResult = (plate: string) => {
    const clean = plate.replace(/[\s\-]/g, '').toUpperCase();
    if (clean === 'KA01MJ4912' || clean === '01MJ4912') {
      setScanResult({
        status: 'HOTLIST_HIT',
        isHotlist: true,
        threatTier: 'CRITICAL_TIER_1',
        alertType: 'RED_CORNER_VEHICLE_CORDON_ALERT',
        searchedPlate: 'KA-01-MJ-4912',
        detectionTimestamp: new Date().toISOString(),
        confidenceScore: 99.4,
        crimeCategory: 'Armed Bank Robbery & Escaped Under-Trial (IPC 392 / 307 / Arms Act 25)',
        linkedFir: 'FIR No. 0419/2026 - Madiwala PS',
        suspect: {
          name: "Raju @ Shankar 'Bullet' Gowda",
          convictId: 'KSP-CONV-2026-084',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80',
          riskTier: 'CRITICAL',
          aliases: ['Bullet Shankar', 'Black Scorpio Gang', 'Gowda'],
          warrantStatus: 'Active Non-Bailable Warrant (NBW-8921/2025)',
          weaponsFlag: 'ARMED & DANGEROUS (7.65mm Pistol Reported)',
          previousConvictions: 6,
          gangAffiliation: 'South Bengaluru Extortion Syndicate'
        },
        vehicle: {
          registration: 'KA-01-MJ-4912',
          makeModel: 'Mahindra Scorpio-N (Metallic Black)',
          chassisNo: 'MA1MK2XXXXXXXX912',
          engineNo: 'D140XXXX4912',
          vahanOwner: 'Shankar R. (Forged RC - High Alert)',
          fuelType: 'Diesel mHawk 2.2L',
          color: 'Black Metallic',
          lastSightingLocation: 'Silk Board Junction - Northbound Ramp',
          lat: 12.9176,
          lng: 77.6233,
          speedKmh: 74,
          travelHeading: 'North towards Koramangala / Hosur Road Outer Ring Corridor',
          cameraCaptured: 'CAM-ANPR-01 (Silk Board Main Mast)'
        },
        vahanDetails: {
          status: 'HIGH_ALERT_HOTLIST',
          registeringAuthority: 'RTO Bengaluru South (KA-01)',
          fitnessValidTill: '2029-08-14 (Expired / Suspended)',
          insuranceValidTill: '2025-01-10 (Lapsed)',
          pucValidTill: '2025-06-30 (Expired)',
          pendingTrafficChallans: 14,
          stolenReportStatus: 'STOLEN VEHICLE / FORGED RC (FIR 0419/2026)',
          blacklistStatus: 'RED CORNER BLACKLISTED (KSP / SCRB)',
          hypothecation: 'Canara Bank Commercial Lien (Defaulted)'
        },
        tacticalCordon: {
          cordonCode: 'CORDON-NET-ALPHA-SILKBOARD',
          protocol: 'Dynamic 3-Choke-Point Perimeter Seal',
          suggestedAction: 'Deploy Automated Dynamic Net at Choke Point Alpha. Authorize spike strips and seal exit ramps.',
          chokePoints: [
            {
              id: 'CP-1',
              name: "Choke Point Alpha: St. John's Hospital Outer Ring Corridor",
              distanceKm: 1.2,
              etaMinutes: 2.1,
              lat: 12.9305,
              lng: 77.6210,
              status: 'READY_TO_SEAL',
              assignedUnits: ['Hoysala-104 (Koramangala)', 'Traffic Interceptor-09'],
              interceptionTactics: 'Spike-Strip Deployment + Rapid Barricade Across 3 Inbound Lanes',
              personnelStrength: 6,
              commandContact: 'PSI Manjunath K. (+91-94481-90104)'
            },
            {
              id: 'CP-2',
              name: 'Choke Point Bravo: Dairy Circle Underpass Ingress',
              distanceKm: 2.4,
              etaMinutes: 4.0,
              lat: 12.9388,
              lng: 77.6015,
              status: 'STANDBY',
              assignedUnits: ['Hoysala-088 (Jayanagar)', 'Garuda Tactical Team QRT-3'],
              interceptionTactics: 'Underpass Barrier Lockdown + Armed Overwatch Post',
              personnelStrength: 8,
              commandContact: 'ASI Ramesh Babu (+91-94481-90088)'
            },
            {
              id: 'CP-3',
              name: 'Choke Point Charlie: Agara Lake Outer Ring Egress',
              distanceKm: 3.1,
              etaMinutes: 5.2,
              lat: 12.9220,
              lng: 77.6450,
              status: 'STANDBY',
              assignedUnits: ['Hoysala-212 (Indiranagar)', 'Garuda Tactical Team Alpha'],
              interceptionTactics: 'Outer Ring Road Blockade + Drone High-Zoom Pursuit Lock',
              personnelStrength: 6,
              commandContact: 'PI Suresh Kumar (+91-94481-90212)'
            }
          ]
        }
      });
    } else if (clean === 'KA04NB8821' || clean === '04NB8821') {
      setScanResult({
        status: 'HOTLIST_HIT',
        isHotlist: true,
        threatTier: 'HIGH_TIER_2',
        alertType: 'NARCOTICS_INTERCEPTION_HOTLIST_WARRANT',
        searchedPlate: 'KA-04-NB-8821',
        detectionTimestamp: new Date().toISOString(),
        confidenceScore: 98.7,
        crimeCategory: 'Inter-State Commercial Narcotics Trafficking (NDPS Act Sec 21/29 / BNS 318)',
        linkedFir: 'FIR No. 1102/2026 - Yelahanka New Town PS',
        suspect: {
          name: "Imran @ 'Speed' Pasha",
          convictId: 'KSP-CONV-2026-119',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80',
          riskTier: 'HIGH',
          aliases: ['Imran Bhai', 'Whitefield Courier', 'Pasha'],
          warrantStatus: 'Special NDPS Court Intercept Warrant (LOC-7712/2026)',
          weaponsFlag: 'POTENTIAL CONCEALED WEAPONS',
          previousConvictions: 3,
          gangAffiliation: 'Inter-State Chemical Contraband Network'
        },
        vehicle: {
          registration: 'KA-04-NB-8821',
          makeModel: 'Hyundai Creta SX (Polar White)',
          chassisNo: 'MALC2XXXXXXXX8821',
          engineNo: 'G4FJXXXX8821',
          vahanOwner: 'Syndicate Logistics Front Pvt Ltd',
          fuelType: 'Petrol Turbo 1.5L',
          color: 'Polar White',
          lastSightingLocation: 'Hebbal Flyover Junction - Airport Outbound Lane 2',
          lat: 13.0358,
          lng: 77.5970,
          speedKmh: 88,
          travelHeading: 'North towards Devanahalli / NH-44 Airport Toll Gateway',
          cameraCaptured: 'CAM-ANPR-02 (Hebbal Flyover Dual PTZ)'
        },
        vahanDetails: {
          status: 'HOTLIST_SEARCH_WARRANT',
          registeringAuthority: 'RTO Yelahanka (KA-04)',
          fitnessValidTill: '2030-03-22 (Valid)',
          insuranceValidTill: '2026-12-10 (ICICI Lombard)',
          pucValidTill: '2026-10-15 (Valid)',
          pendingTrafficChallans: 6,
          stolenReportStatus: 'FLAGGED UNDER NDPS INTERCEPT WARRANT',
          blacklistStatus: 'SPECIAL COURT LOCK (LOC-7712/2026)',
          hypothecation: 'HDFC Car Loan (Active Lien)'
        },
        tacticalCordon: {
          cordonCode: 'CORDON-NET-BRAVO-HEBBAL',
          protocol: 'Airport Corridor Fast-Track Intercept Protocol',
          suggestedAction: 'Lockdown Yelahanka Toll Plaza FASTag Lanes 3-6. Dispatch Highway Patrol Interceptor 11 to box in.',
          chokePoints: [
            {
              id: 'CP-1',
              name: 'Choke Point Alpha: Kodigehalli Gate Junction',
              distanceKm: 1.8,
              etaMinutes: 2.5,
              lat: 13.0480,
              lng: 77.5910,
              status: 'READY_TO_SEAL',
              assignedUnits: ['Hoysala-419 (Hebbal)', 'Highway Patrol HP-11'],
              interceptionTactics: 'Traffic Funneling into Single Inspection Bay + Spike Strip Standby',
              personnelStrength: 5,
              commandContact: 'PSI Deepa Patil (+91-94481-90419)'
            },
            {
              id: 'CP-2',
              name: 'Choke Point Bravo: Yelahanka Bypass Toll Plaza',
              distanceKm: 4.6,
              etaMinutes: 5.0,
              lat: 13.1005,
              lng: 77.5960,
              status: 'STANDBY',
              assignedUnits: ['Hoysala-502 (Yelahanka)', 'Traffic Interceptor-14'],
              interceptionTactics: 'FASTag Automated Boom Barrier Lock + Armed Checkpoint',
              personnelStrength: 7,
              commandContact: 'ASI Govindappa (+91-94481-90502)'
            },
            {
              id: 'CP-3',
              name: 'Choke Point Charlie: Devanahalli Airport Toll Barrier',
              distanceKm: 11.2,
              etaMinutes: 9.8,
              lat: 13.2010,
              lng: 77.7120,
              status: 'STANDBY',
              assignedUnits: ['Airport Quick Response Team (QRT)', 'HP-04'],
              interceptionTactics: 'Full Toll Barrier Lockdown + Armed Perimeter Enclosure',
              personnelStrength: 10,
              commandContact: 'PI Venkatesh (+91-94481-90700)'
            }
          ]
        }
      });
    } else {
      setScanResult({
        status: 'CLEAR',
        isHotlist: false,
        threatTier: 'CLEAN',
        alertType: 'STANDARD_VAHAN_REGISTRATION',
        searchedPlate: plate,
        detectionTimestamp: new Date().toISOString(),
        confidenceScore: 99.8,
        crimeCategory: 'CLEAN - No Stolen Vehicle Report or Outstanding Warrants Found',
        linkedFir: 'None (No Criminal Records Associated)',
        suspect: null,
        vehicle: {
          registration: plate,
          makeModel: 'Tata Nexon EV Max / Maruti Suzuki Swift (Pearl White)',
          chassisNo: 'MATB349281729120',
          engineNo: 'ENG44109281',
          vahanOwner: 'Verified Citizen (Aadhaar / VAHAN 4.0 Verified)',
          fuelType: 'Electric / Petrol BS-VI',
          color: 'Pearl White',
          lastSightingLocation: 'Indiranagar 100ft Road - Traffic Flow Camera 05',
          lat: 12.9719,
          lng: 77.6412,
          speedKmh: 42,
          travelHeading: 'Normal City Commute (South-East)',
          cameraCaptured: 'CAM-ANPR-05 (Indiranagar Traffic Mast)'
        },
        vahanDetails: {
          status: 'ACTIVE_REGISTERED',
          registeringAuthority: 'RTO Bengaluru Central (KA-01 / KA-04)',
          fitnessValidTill: '2031-11-20',
          insuranceValidTill: '2027-04-15 (National Insurance Co.)',
          pucValidTill: '2026-12-31',
          pendingTrafficChallans: 0,
          stolenReportStatus: 'CLEAR / NOT STOLEN',
          blacklistStatus: 'CLEAN (No Blacklist)',
          hypothecation: 'State Bank of India (HPA Clear)'
        },
        tacticalCordon: null
      });
    }
  };

  // Trigger initial scan on mount
  useEffect(() => {
    handleExecuteScan('KA-01-MJ-4912');
  }, []);

  // 1-Click Automated Tactical Dispatch
  const handleDeployTacticalCordon = async () => {
    if (!scanResult || !scanResult.tacticalCordon) return;
    setCordonDeployed(true);

    try {
      const res = await fetch('http://localhost:8000/api/rtcc/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cordonCode: scanResult.tacticalCordon.cordonCode,
          plate: scanResult.searchedPlate,
          units: ['Hoysala-104', 'Hoysala-088', 'Hoysala-212', 'Garuda QRT'],
          chokePoint: 'All 3 Choke Points (Dynamic Net Seal)'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setDispatchStatus({
          active: true,
          message: data.message,
          dispatchId: data.dispatchId
        });
      } else {
        setDispatchStatus({
          active: true,
          message: `TACTICAL CORDON DEPLOYED: CAD Mobilization dispatched to Hoysala fleet for ${scanResult.searchedPlate}.`,
          dispatchId: `DSP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
        });
      }
    } catch {
      setDispatchStatus({
        active: true,
        message: `TACTICAL CORDON DEPLOYED: CAD Mobilization dispatched to Hoysala fleet for ${scanResult.searchedPlate}.`,
        dispatchId: `DSP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
      });
    }

    // Set all choke points to DEPLOYED
    const updatedStatus: Record<string, 'DEPLOYED'> = {};
    scanResult.tacticalCordon.chokePoints.forEach(cp => {
      updatedStatus[cp.id] = 'DEPLOYED';
    });
    setActiveChokePointStatus(updatedStatus);
  };

  // Toggle Choke Point Status
  const toggleChokePoint = (cpId: string) => {
    setActiveChokePointStatus(prev => {
      const current = prev[cpId] || 'READY_TO_SEAL';
      return {
        ...prev,
        [cpId]: current === 'READY_TO_SEAL' ? 'DEPLOYED' : current === 'DEPLOYED' ? 'SEALED' : 'READY_TO_SEAL'
      };
    });
  };

  // Active selected PTZ object
  const activePtz = useMemo(() => {
    return ptzFeeds.find(p => p.camId === selectedPtzId) || ptzFeeds[0];
  }, [ptzFeeds, selectedPtzId]);

  const currentCamTarget = CAM_TARGET_MAP[activePtz.camId] || CAM_TARGET_MAP['PTZ-01'];

  return (
    <div className="flex flex-col space-y-6 pb-12 text-ksp-gray-800 dark:text-gray-100 min-h-screen">
      {/* Top Tactical Command Header (Compact) */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#071D3A] via-[#0B2E59] to-[#05152A] p-3.5 sm:p-4 text-white shadow-md border border-white/10">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#FF9F1C]/15 blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Siren className="h-5 w-5 text-[#FFB800] shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-mono">
                  {t('rtccTitle')}
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-extrabold font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {language === 'kn' ? 'ಲೈವ್' : language === 'hi' ? 'लाइव' : 'LIVE'}
                </span>
              </div>
              <p className="text-[11px] text-blue-200/80">
                {language === 'kn' ? 'ಲೈವ್ ಕಮಾಂಡ್ ವಾಲ್, ANPR ಪ್ಲೇಟ್ ಸ್ಕ್ಯಾನರ್, ಹೊಯ್ಸಳ ಪಿಸಿಆರ್ ಡಿಸ್ಪ್ಯಾಚ್ & 112 CAD ಸ್ಟ್ರೀಮ್' : language === 'hi' ? 'लाइव कमांड वॉल, एएनपीआर प्लेट स्कैनर, होयसला पीसीआर डिस्पैच और 112 सीएडी स्ट्रीम' : 'Live Command Wall, ANPR Plate Scanner, Hoysala PCR Dispatch & 112 CAD Stream'}
              </p>
            </div>
          </div>

          {/* Real-Time Telemetry & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-[#071D3A]/80 border border-white/10 rounded-lg px-2.5 py-1 text-right shadow-inner">
              <div className="text-[8.5px] uppercase font-mono text-blue-300">
                {language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ಗಡಿಯಾರ' : language === 'hi' ? 'रणनीतिक घड़ी' : 'Tactical Clock'}
              </div>
              <div className="text-xs font-black font-mono text-[#FFB800]">{currentIstTime || '19:00:32 IST'}</div>
            </div>

            <button
              onClick={fetchTelemetry}
              title="Re-sync Telemetry"
              className="flex items-center gap-1.5 bg-[#0B2E59] hover:bg-[#133D6B] text-white px-2.5 py-1.5 rounded-lg border border-[#FF9F1C]/40 text-[11px] font-bold transition shadow cursor-pointer hover:border-[#FF9F1C]"
            >
              <RefreshCw className="h-3 w-3 text-[#FFB800]" />
              <span>{language === 'kn' ? 'CAD ಸಿಂಕ್' : language === 'hi' ? 'सीएडी सिंक' : 'SYNC CAD'}</span>
            </button>
          </div>
        </div>

        {/* Compact Metrics Strip */}
        <div className="mt-2.5 pt-2.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="bg-black/30 border border-white/5 rounded-lg p-2 px-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-gray-400 block leading-none">
                {language === 'kn' ? 'ಪಿಸಿಆರ್ ಗಸ್ತು' : language === 'hi' ? 'पीसीआर गश्त' : 'PCR Patrols'}
              </span>
              <span className="text-sm font-black font-mono text-white leading-tight">
                {activePcrUnitsCount} {language === 'kn' ? 'ಘಟಕಗಳು' : language === 'hi' ? 'इकाइयां' : 'Units'}
              </span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-lg p-2 px-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500/20 text-[#FFB800] rounded">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-gray-400 block leading-none">
                {language === 'kn' ? 'ANPR ಸ್ಕ್ಯಾನ್‌ಗಳು/ನಿಮಿ' : language === 'hi' ? 'एएनपीआर स्कैन/मिनट' : 'ANPR Scans/Min'}
              </span>
              <span className="text-sm font-black font-mono text-[#FFB800] leading-tight">3,840</span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-lg p-2 px-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-gray-400 block leading-none">
                {language === 'kn' ? 'ಕ್ಯಾಮರಾಗಳು ಆನ್‌ಲೈನ್' : language === 'hi' ? 'कैमरे ऑनलाइन' : 'Cameras Online'}
              </span>
              <span className="text-sm font-black font-mono text-white leading-tight">1,248</span>
            </div>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-lg p-2 px-3 flex items-center gap-2.5">
            <div className="p-1.5 bg-red-500/20 text-red-400 rounded">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase text-gray-400 block leading-none">
                {language === 'kn' ? 'ಸಕ್ರಿಯ ಸುತ್ತುವರಿಕೆಗಳು' : language === 'hi' ? 'सक्रिय घेराबंदी' : 'Active Cordons'}
              </span>
              <span className="text-sm font-black font-mono text-red-400 leading-tight">
                {cordonDeployed 
                  ? (language === 'kn' ? '4 ಸೀಲ್ ಮಾಡಲಾಗಿದೆ' : language === 'hi' ? '4 सील' : '4 Sealed') 
                  : (language === 'kn' ? '3 ಸಜ್ಜಾಗಿದೆ' : language === 'hi' ? '3 सुसज्जित' : '3 Armed')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ksp-gray-200 dark:border-white/10 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('commandWall')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'commandWall'
                ? 'bg-[#0B2E59] text-white border-b-2 border-[#FF9F1C] shadow-md dark:bg-blue-600'
                : 'bg-white dark:bg-[#0B2E59]/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0B2E59]'
            }`}
          >
            <Video className="h-4 w-4 text-[#FFB800]" />
            <span>{language === 'hi' ? 'सामरिक कमांड वॉल' : language === 'kn' ? 'ಕಾರ್ಯತಂತ್ರದ ಕಮಾಂಡ್ ವಾಲ್' : 'Tactical Command Wall'}</span>
          </button>

          <button
            onClick={() => setActiveTab('anprScanner')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'anprScanner'
                ? 'bg-[#0B2E59] text-white border-b-2 border-[#FF9F1C] shadow-md dark:bg-blue-600'
                : 'bg-white dark:bg-[#0B2E59]/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0B2E59]'
            }`}
          >
            <Camera className="h-4 w-4 text-[#FFB800]" />
            <span>{language === 'hi' ? 'एएनपीआर प्लेट स्कैनर एवं घेराबंदी' : language === 'kn' ? 'ಎಎನ್‌ಪಿಆರ್ ಪ್ಲೇಟ್ ಸ್ಕ್ಯಾನರ್ & ಕಾರ್ಡನ್' : 'ANPR Plate Scanner & Cordon Matrix'}</span>
            {scanResult?.isHotlist && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('fleetTracker')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'fleetTracker'
                ? 'bg-[#0B2E59] text-white border-b-2 border-[#FF9F1C] shadow-md dark:bg-blue-600'
                : 'bg-white dark:bg-[#0B2E59]/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0B2E59]'
            }`}
          >
            <Car className="h-4 w-4 text-cyan-400" />
            <span>{language === 'hi' ? 'हॉयसला बेड़ा ट्रैकर' : language === 'kn' ? 'ಹೊಯ್ಸಳ ಪಡೆ ಟ್ರ್ಯಾಕರ್' : 'Hoysala Fleet Tracker'} ({pcrPatrolVans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('incidents112')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer ${
              activeTab === 'incidents112'
                ? 'bg-[#0B2E59] text-white border-b-2 border-[#FF9F1C] shadow-md dark:bg-blue-600'
                : 'bg-white dark:bg-[#0B2E59]/40 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#0B2E59]'
            }`}
          >
            <PhoneCall className="h-4 w-4 text-red-400" />
            <span>{language === 'hi' ? '112 आपातकालीन धारा' : language === 'kn' ? '112 ತುರ್ತು ಸ್ಟ್ರೀಮ್' : '112 CAD Stream'} ({incidents112.length})</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span>KSP SECURE RTCC NETWORK 256-BIT ENCRYPTED</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: TACTICAL COMMAND WALL (PTZ Switcher + Video Wall + C2 Feed)       */}
      {/* ========================================================================= */}
      {activeTab === 'commandWall' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main PTZ Viewport & Video Switcher (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-ksp-gray-200 dark:border-white/10 bg-white dark:bg-[#071D3A] shadow-xl overflow-hidden">
              {/* Viewport Header Bar */}
              <div className="bg-[#0B2E59] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                  </span>
                  <div>
                    <div className="text-xs font-black tracking-wide text-[#FFB800] uppercase font-mono">
                      {activePtz.camId} — {activePtz.name}
                    </div>
                    <div className="text-[10px] text-blue-200 font-mono">
                      {activePtz.resolution} • Pan {activePtz.pan} • Tilt {activePtz.tilt} • Zoom {ptzZoomLevel}x
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNightVisionOn(!isNightVisionOn)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                      isNightVisionOn 
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>{isNightVisionOn ? 'IR NIGHT VISION ON' : 'IR OFF'}</span>
                  </button>

                  <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
                    title={isSoundOn ? 'Mute Intercom' : 'Unmute Intercom'}
                  >
                    {isSoundOn ? <Volume2 className="h-4 w-4 text-emerald-400" /> : <VolumeX className="h-4 w-4 text-gray-400" />}
                  </button>

                  <button
                    onClick={() => setGridMode(!gridMode)}
                    disabled={cameraSource === 'device'}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition disabled:opacity-40 disabled:cursor-not-allowed ${
                      gridMode ? 'bg-[#FF9F1C] text-[#071D3A]' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {gridMode ? '1x1 FOCUS' : '2x2 MATRIX'}
                  </button>

                  <button
                    onClick={() => setCameraSource(cameraSource === 'device' ? 'simulated' : 'device')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                      cameraSource === 'device' ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    title="Use your laptop webcam or an external USB camera as the viewport source"
                  >
                    <Camera className="h-3.5 w-3.5" />
                    <span>{cameraSource === 'device' ? 'LOCAL DEVICE CAM' : 'USE LOCAL CAMERA'}</span>
                  </button>
                </div>
              </div>

              {/* Live Device Camera (laptop webcam / external USB camera) */}
              {cameraSource === 'device' ? (
                <LiveDeviceCameraFeed />
              ) : !gridMode ? (
                <div className={`relative h-96 sm:h-[420px] w-full overflow-hidden flex items-center justify-center ${
                  isNightVisionOn 
                    ? 'bg-emerald-950/90 text-emerald-300' 
                    : 'bg-gradient-to-b from-slate-900 via-gray-900 to-black text-white'
                }`}>
                  {/* Grid Overlay / Reticle */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Top Tactical Telemetry HUD */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono">
                      <div className="text-[#FFB800] font-bold">KSP HIGH-RESOLUTION OPTICAL STREAM</div>
                      <div className="text-gray-300">FPS: 59.94 | BITRATE: 8.4 Mbps | LATENCY: 12ms</div>
                    </div>

                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono text-right">
                      <div className="text-emerald-400 font-bold">● REC ACTIVE</div>
                      <div className="text-gray-300">{currentIstTime}</div>
                    </div>
                  </div>

                  {/* Simulated Moving Traffic & Vehicle Tracking Boxes */}
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    {/* Dynamic High-Resolution Crosshair and Detection Box */}
                    <div className="relative w-72 h-44 border-2 border-[#FF9F1C] rounded-lg p-2 flex flex-col justify-between shadow-2xl bg-black/40 backdrop-blur-xs animate-pulse">
                      <div className="flex items-center justify-between text-[10px] font-mono bg-[#FF9F1C] text-[#071D3A] px-2 py-0.5 font-black rounded">
                        <span>{language === 'kn' ? 'ANPR ಆಪ್ಟಿಕಲ್ ಗುರಿ ಲಾಕ್' : language === 'hi' ? 'ANPR ऑप्टिकल टारगेट लॉक' : 'ANPR OPTICAL TARGET LOCK'}</span>
                        <span>{language === 'kn' ? 'ವಿಶ್ವಾಸಾರ್ಹತೆ 99.4%' : language === 'hi' ? 'विश्वसनीयता 99.4%' : 'CONFIDENCE 99.4%'}</span>
                      </div>

                      {/* Dynamic License Plate Banner Inside Frame */}
                      <div className="text-center my-auto">
                        <div className="inline-block bg-[#FFB800] text-[#071D3A] font-black text-lg sm:text-xl font-mono px-3 py-1 rounded shadow-md border-2 border-black tracking-widest">
                          {currentCamTarget.plate}
                        </div>
                        <div className="text-[10px] font-mono text-red-400 mt-1 font-bold">
                          {language === 'kn' ? 'ವೇಗ:' : language === 'hi' ? 'गति:' : 'SPEED:'} {currentCamTarget.speed}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-blue-200">
                        <span>{language === 'kn' ? 'ಮಾದರಿ:' : language === 'hi' ? 'मॉडल:' : 'MODEL:'} {currentCamTarget.makeModel}</span>
                        <span className="text-red-400 font-black">{formatDynamicText(currentCamTarget.threat, language)}</span>
                      </div>

                      {/* Corner Target Markers */}
                      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white" />
                      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white" />
                    </div>

                    {/* Background Secondary Target 2 */}
                    <div className="absolute top-16 right-16 border border-cyan-500/60 rounded p-1.5 text-[9px] font-mono bg-black/40 text-cyan-300">
                      <div>KA-03-HA-9081</div>
                      <div className="text-gray-400">{formatDynamicText('42 KM/H • CLEAR', language)}</div>
                    </div>

                    {/* Background Secondary Target 3 */}
                    <div className="absolute bottom-16 left-16 border border-cyan-500/60 rounded p-1.5 text-[9px] font-mono bg-black/40 text-cyan-300">
                      <div>KA-05-EV-4410</div>
                      <div className="text-gray-400">{formatDynamicText('38 KM/H • VAHAN VALID', language)}</div>
                    </div>
                  </div>

                  {/* Bottom PTZ On-Screen Display Control Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
                      <span className="text-gray-400">{language === 'kn' ? 'ಜೂಮ್:' : language === 'hi' ? 'ज़ूम:' : 'ZOOM:'}</span>
                      <button
                        onClick={() => setPtzZoomLevel(prev => Math.max(1, prev - 1))}
                        className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-[#FFB800] font-bold">{ptzZoomLevel}x</span>
                      <button
                        onClick={() => setPtzZoomLevel(prev => Math.min(30, prev + 1))}
                        className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleExecuteScan(currentCamTarget.plate)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black uppercase font-mono shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <Crosshair className="h-3.5 w-3.5" />
                        <span>{language === 'kn' ? 'ಲಾಕ್ & ಸ್ಕ್ಯಾನ್' : language === 'hi' ? 'लॉक & स्कैन' : 'LOCK & SCAN'} {currentCamTarget.plate}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* 2x2 Camera Matrix Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-black">
                  {ptzFeeds.map(feed => (
                    <div
                      key={feed.camId}
                      onClick={() => {
                        setSelectedPtzId(feed.camId);
                        setGridMode(false);
                        const targetInfo = CAM_TARGET_MAP[feed.camId] || CAM_TARGET_MAP['PTZ-01'];
                        handleExecuteScan(targetInfo.plate);
                      }}
                      className={`relative h-48 bg-slate-900 border rounded-xl overflow-hidden cursor-pointer group transition p-3 flex flex-col justify-between ${
                        selectedPtzId === feed.camId ? 'border-[#FF9F1C] ring-2 ring-[#FF9F1C]' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono bg-black/60 px-2 py-1 rounded">
                        <span className="text-[#FFB800] font-bold">{feed.camId}</span>
                        <span className="text-emerald-400">LIVE ●</span>
                      </div>

                      <div className="text-center text-xs font-bold text-white group-hover:text-[#FFB800] transition">
                        {feed.name}
                        <div className="text-[10px] font-mono text-gray-400 font-normal">{feed.resolution}</div>
                      </div>

                      <div className="text-[9px] font-mono text-blue-200 flex justify-between bg-black/60 px-2 py-1 rounded">
                        <span>{feed.pan}</span>
                        <span>{feed.zoom}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* PTZ Switcher Camera Preset Ribbon */}
              <div className="p-4 bg-gray-50 dark:bg-[#05152A] border-t border-ksp-gray-200 dark:border-white/10">
                <div className="text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>{language === 'kn' ? 'ಲೈವ್ ಜಂಕ್ಷನ್ ವಿಡಿಯೋ ವಾಲ್ ಸ್ವಿಚರ್' : language === 'hi' ? 'लाइव जंक्शन वीडियो वॉल स्विचर' : 'Live Junction Video Wall Switcher'}</span>
                  <span className="text-[11px] text-blue-500 dark:text-blue-400 font-normal">{language === 'kn' ? 'ಸಕ್ರಿಯ ವ್ಯೂಪೋರ್ಟ್ ಬದಲಾಯಿಸಲು ಮತ್ತು ಗುರಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಲು ಯಾವುದೇ ಕ್ಯಾಮರಾ ಕ್ಲಿಕ್ ಮಾಡಿ' : language === 'hi' ? 'सक्रिय व्यूपोर्ट बदलने और लक्ष्य स्कैन करने के लिए किसी भी कैमरे पर क्लिक करें' : 'Click any camera to switch active viewport & scan target'}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {anprCameras.map(cam => (
                    <button
                      key={cam.id}
                      onClick={() => {
                        const matchingPtz = ptzFeeds.find(p => p.camId.replace('PTZ', '') === cam.id.replace('CAM-ANPR', '')) || ptzFeeds[0];
                        setSelectedPtzId(matchingPtz.camId);
                        const targetInfo = CAM_TARGET_MAP[matchingPtz.camId] || CAM_TARGET_MAP['PTZ-01'];
                        handleExecuteScan(targetInfo.plate);
                      }}
                      className={`p-2.5 rounded-xl text-left transition border cursor-pointer ${
                        selectedPtzId.includes(cam.id.slice(-2))
                          ? 'bg-[#0B2E59] text-white border-[#FF9F1C] shadow-md'
                          : 'bg-white dark:bg-[#071D3A] text-gray-700 dark:text-gray-300 border-ksp-gray-200 dark:border-white/10 hover:border-blue-400'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span className="font-bold text-[#FFB800]">{cam.id}</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-[11px] font-bold truncate">{cam.junction}</div>
                      <div className="text-[9.5px] text-gray-500 dark:text-gray-400 font-mono mt-0.5 truncate">
                        {language === 'kn' ? 'ಕೊನೆಯದು:' : language === 'hi' ? 'अंतिम:' : 'Last:'} {cam.lastCapture}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Tactical Intercept & CAD Mini Feed (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Threat Intercept Snapshot */}
            <div className="rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/20 via-[#071D3A] to-[#071D3A] p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-red-500/20 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500 animate-bounce" />
                  <span className="text-xs font-black uppercase tracking-wider text-red-400 font-mono">
                    {language === 'kn' ? 'ಆದ್ಯತೆಯ ಪ್ರತಿಬಂಧಕ ಸುತ್ತುವರಿಕೆ' : language === 'hi' ? 'प्राथमिकता अवरोधन घेराबंदी' : 'Priority Intercept Cordon'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-red-500 text-white px-2 py-0.5 rounded font-black">
                  {language === 'kn' ? 'ಕೋಡ್ ರೆಡ್' : language === 'hi' ? 'कोड रेड' : 'CODE RED'}
                </span>
              </div>

              {scanResult?.isHotlist ? (
                <div className="space-y-4">
                  <div className="bg-black/40 border border-red-500/30 rounded-xl p-3.5">
                    <div className="text-[10px] font-mono text-gray-400 uppercase">{language === 'kn' ? 'ಗುರಿ ವಾಹನ & ನಂಬರ್ ಪ್ಲೇಟ್' : language === 'hi' ? 'लक्ष्य वाहन & नंबर प्लेट' : 'Target Vehicle & Plate'}</div>
                    <div className="text-lg font-black font-mono text-[#FFB800] tracking-wider mt-0.5">
                      {scanResult.searchedPlate}
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {scanResult.vehicle?.makeModel || 'Mahindra Scorpio-N (Metallic Black)'}
                    </div>
                    <div className="text-[11px] text-red-300 font-semibold mt-1">
                      {language === 'kn' ? 'ಶಂಕಿತ:' : language === 'hi' ? 'संदिग्ध:' : 'Suspect:'} {scanResult.suspect?.name} ({scanResult.suspect?.convictId})
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-blue-300 font-bold">
                      {language === 'kn' ? 'ಡೈನಾಮಿಕ್ 3-ಚೋಕ್-ಪಾಯಿಂಟ್ ಸುತ್ತುವರಿಕೆ ಜಾಲ:' : language === 'hi' ? 'गतिशील 3-चोक-पॉइंट घेराबंदी जाल:' : 'Dynamic 3-Choke-Point Cordon Net:'}
                    </div>
                    {scanResult.tacticalCordon?.chokePoints.map((cp) => (
                      <div
                        key={cp.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-black/30 border border-white/10 text-xs font-mono"
                      >
                        <div>
                          <div className="font-bold text-white">{formatDynamicText(cp.name.split(':')[0], language)}</div>
                          <div className="text-[10px] text-gray-400">ETA: {cp.etaMinutes}m | {cp.distanceKm}km</div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {formatDynamicText(activeChokePointStatus[cp.id] || cp.status, language)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleDeployTacticalCordon}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider font-mono shadow-xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Siren className="h-4 w-4" />
                    <span>{cordonDeployed ? (language === 'kn' ? 'ಸುತ್ತುವರಿಕೆ ಸೀಲ್ ಆಗಿದೆ (CAD ಪ್ರಸಾರ ಸಕ್ರಿಯ)' : language === 'hi' ? 'घेराबंदी सील (सीएडी प्रसारण सक्रिय)' : 'CORDON SEALED (CAD BROADCAST ACTIVE)') : (language === 'kn' ? '1-ಕ್ಲಿಕ್ ಕಾರ್ಯಾಚರಣೆಯ ಡಿಸ್ಪ್ಯಾಚ್' : language === 'hi' ? '1-क्लिक रणनीतिक डिस्पैच' : '1-CLICK TACTICAL DISPATCH')}</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-400 space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                  <div className="text-xs font-bold text-white">{language === 'kn' ? 'ಯಾವುದೇ ಸಕ್ರಿಯ ಪ್ರತಿಬಂಧಕ ಪ್ರಚೋದಿಸಲಾಗಿಲ್ಲ' : language === 'hi' ? 'कोई सक्रिय इंटरसेप्ट ट्रिगर नहीं हुआ' : 'No Active Intercept Triggered'}</div>
                  <div className="text-[11px] text-gray-400">{language === 'kn' ? '3-ಚೋಕ್-ಪಾಯಿಂಟ್ ಪ್ರತಿಬಂಧಕ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ತೊಡಗಿಸಿಕೊಳ್ಳಲು ಹಾಟ್‌ಲಿಸ್ಟ್ ಮಾಡಿದ ಪ್ಲೇಟ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.' : language === 'hi' ? '3-चोक-पॉइंट इंटरसेप्ट मैट्रिक्स संलग्न करने के लिए हॉटलिस्ट प्लेट स्कैन करें।' : 'Scan a hotlisted plate to engage the 3-choke-point intercept matrix.'}</div>
                </div>
              )}
            </div>

            {/* Live 112 CAD Triage Feed */}
            <div className="rounded-2xl border border-ksp-gray-200 dark:border-white/10 bg-white dark:bg-[#071D3A] p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-ksp-gray-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-ksp-gray-800 dark:text-white font-mono">
                    {language === 'kn' ? '112 CAD ಲೈವ್ ಸ್ಟ್ರೀಮ್' : language === 'hi' ? '112 सीएडी लाइव स्ट्रीम' : '112 CAD Live Stream'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{language === 'kn' ? 'ಸ್ಟ್ರೀಮಿಂಗ್ ●' : language === 'hi' ? 'स्ट्रीमिंग ●' : 'STREAMING ●'}</span>
              </div>

              <div className="space-y-2.5">
                {incidents112.map(inc => (
                  <div
                    key={inc.incidentId}
                    className="p-3 rounded-xl bg-gray-50 dark:bg-[#05152A] border border-ksp-gray-200 dark:border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-blue-500 dark:text-blue-300">{inc.incidentId}</span>
                      <span className={`px-2 py-0.5 rounded font-black ${
                        inc.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {inc.priority === 'CRITICAL' ? (language === 'kn' ? 'ನಿರ್ಣಾಯಕ' : language === 'hi' ? 'गंभीर' : 'CRITICAL') : (language === 'kn' ? 'ಅಧಿಕ' : language === 'hi' ? 'उच्च' : inc.priority)}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-ksp-gray-800 dark:text-gray-100">{formatDynamicText(inc.location, language)}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">{formatDynamicText(inc.details, language)}</div>
                    <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 pt-1 flex items-center justify-between">
                      <span>{language === 'kn' ? 'ನಿಯೋಜಿಸಲಾಗಿದೆ:' : language === 'hi' ? 'आवंटित:' : 'Assigned:'} {inc.assignedUnits.join(', ')}</span>
                      <span>{inc.reportedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE ANPR VEHICLE PLATE SCANNER & CORDON MATRIX            */}
      {/* ========================================================================= */}
      {activeTab === 'anprScanner' && (
        <div className="space-y-6">
          {/* Scanner Control Deck */}
          <div className="rounded-2xl border border-ksp-gray-200 dark:border-white/10 bg-white dark:bg-[#071D3A] p-6 shadow-xl space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-tight text-ksp-gray-800 dark:text-white flex items-center gap-2 font-mono">
                  <Camera className="h-5 w-5 text-[#FFB800]" />
                  {language === 'kn' ? 'ANPR ವಾಹನ ಪ್ಲೇಟ್ ಸ್ಕ್ಯಾನರ್ & ಕಾರ್ಡನ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್' : language === 'hi' ? 'एएनपीआर वाहन प्लेट स्कैनर और घेराबंदी मैट्रिक्स' : 'ANPR Vehicle Plate Scanner & Cordon Matrix'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'kn' ? 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ ನಂಬರ್ ಪ್ಲೇಟ್‌ಗಳನ್ನು ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಜಾಮೀನು ರಹಿತ ವಾರಂಟ್‌ಗಳು, ಕದ್ದ ವಾಹನಗಳ ಡೇಟಾಬೇಸ್ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸುತ್ತದೆ ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ 3-ಚೋಕ್-ಪಾಯಿಂಟ್ ಸುತ್ತುವರಿಕೆ ಜಾಲಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತದೆ.' : language === 'hi' ? 'स्कैन किए गए लाइसेंस प्लेट नंबरों को सीसीटीएनएस गैर-जमानती वारंट, चोरी के वाहन डेटाबेस के खिलाफ क्रॉस-रेफरेंस करता है और स्वचालित 3-चोक-पॉइंट घेराबंदी जाल को ट्रिगर करता है।' : 'Cross-references scanned license plate numbers against CCTNS Non-Bailable Warrants, Stolen Vehicle DB, and triggers automated 3-choke-point cordon nets.'}
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-slate-700 dark:text-gray-400 font-extrabold">{language === 'kn' ? 'ತ್ವರಿತ ಪ್ರಿಸೆಟ್‌ಗಳು:' : language === 'hi' ? 'त्वरित प्रीसेट:' : 'Quick Presets:'}</span>
                <button
                  onClick={() => {
                    setInputPlate('KA-01-MJ-4912');
                    handleExecuteScan('KA-01-MJ-4912');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-black bg-red-100 dark:bg-red-950/80 text-red-800 dark:text-red-300 border border-red-300 dark:border-red-700/60 hover:bg-red-200 dark:hover:bg-red-900 transition cursor-pointer shadow-xs"
                >
                  🚨 KA-01-MJ-4912 ({language === 'kn' ? 'ಸಶಸ್ತ್ರ ದರೋಡೆ' : language === 'hi' ? 'सशस्त्र डकैती' : 'Armed Robbery'})
                </button>
                <button
                  onClick={() => {
                    setInputPlate('KA-04-NB-8821');
                    handleExecuteScan('KA-04-NB-8821');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-black bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 hover:bg-amber-200 dark:hover:bg-amber-900 transition cursor-pointer shadow-xs"
                >
                  ⚠️ KA-04-NB-8821 ({language === 'kn' ? 'NDPS ಮಾದಕವಸ್ತು' : language === 'hi' ? 'एनडीपीएस मादक पदार्थ' : 'NDPS Contraband'})
                </button>
                <button
                  onClick={() => {
                    setInputPlate('KA-01-AB-1234');
                    handleExecuteScan('KA-01-AB-1234');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition cursor-pointer shadow-xs"
                >
                  🟢 KA-01-AB-1234 ({language === 'kn' ? 'ಪರಿಶುದ್ಧ ನಾಗರಿಕ' : language === 'hi' ? 'स्वच्छ नागरिक' : 'Clean Citizen'})
                </button>
              </div>
            </div>

            {/* Input Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-4 space-y-1">
                <label className="text-xs font-mono uppercase font-bold text-gray-500 dark:text-gray-400">
                  {language === 'kn' ? 'ಗುರಿ ಕ್ಯಾಮೆರಾ ಮೂಲ' : language === 'hi' ? 'लक्ष्य कैमरा स्रोत' : 'Target Camera Source'}
                </label>
                <select
                  value={selectedCameraForScan}
                  onChange={(e) => setSelectedCameraForScan(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-[#05152A] border border-ksp-gray-300 dark:border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-ksp-gray-800 dark:text-white outline-none focus:border-[#FF9F1C]"
                >
                  {anprCameras.map(cam => (
                    <option key={cam.id} value={cam.id}>
                      {cam.id} — {cam.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-5 space-y-1">
                <label className="text-xs font-mono uppercase font-bold text-gray-500 dark:text-gray-400">
                  {language === 'kn' ? 'ವಾಹನದ ನಂಬರ್ ಪ್ಲೇಟ್ ಸಂಖ್ಯೆ' : language === 'hi' ? 'वाहन लाइसेंस प्लेट नंबर' : 'Vehicle License Plate Number'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputPlate}
                    onChange={(e) => setInputPlate(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteScan()}
                    placeholder={language === 'kn' ? 'ಉದಾ. KA-01-MJ-4912' : language === 'hi' ? 'उदा. KA-01-MJ-4912' : 'E.g. KA-01-MJ-4912'}
                    className="w-full bg-gray-50 dark:bg-[#05152A] border border-ksp-gray-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono font-black tracking-widest text-[#071D3A] dark:text-[#FFB800] uppercase outline-none focus:border-[#FF9F1C]"
                  />
                  <div className="absolute right-3 top-2.5 text-xs font-mono text-gray-400">IND</div>
                </div>
              </div>

              <div className="md:col-span-3 flex items-end">
                <button
                  onClick={() => handleExecuteScan()}
                  disabled={isScanning}
                  className="w-full py-2.5 px-5 rounded-xl bg-[#0B2E59] hover:bg-[#133D6B] text-white font-black text-xs uppercase font-mono tracking-wider shadow-lg transition border border-[#FF9F1C]/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isScanning ? (
                    <>
                      <RefreshCw className="h-4 w-4 text-[#FFB800] animate-spin" />
                      <span>{language === 'kn' ? 'ಡೇಟಾಬೇಸ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...' : language === 'hi' ? 'डेटाबेस स्कैन हो रहा है...' : 'SCANNING DATABASE...'}</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 text-[#FFB800]" />
                      <span>{language === 'kn' ? 'ಸ್ಕ್ಯಾನ್ & ಕ್ರಾಸ್-ರೆಫರೆನ್ಸ್' : language === 'hi' ? 'स्कैन और क्रॉस-रेफरेंस' : 'SCAN & CROSS-REFERENCE'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Scan Results Presentation */}
          {scanResult && (
            <div className="space-y-6">
              {/* Hotlist Threat Banner (If Hit) */}
              {scanResult.isHotlist ? (
                <div className="rounded-2xl border-2 border-red-500 bg-gradient-to-r from-red-950 via-[#071D3A] to-red-950 p-6 text-white shadow-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-red-600/30 border border-red-500 flex items-center justify-center shrink-0">
                        <Siren className="h-7 w-7 text-red-400 animate-bounce" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-red-500 text-white font-mono text-[11px] font-black uppercase tracking-wider">
                          🚨 CRITICAL HOTLIST INTERCEPT HIT
                        </div>
                        <h3 className="text-xl font-black font-mono tracking-tight text-white mt-1">
                          {scanResult.searchedPlate} — {scanResult.alertType}
                        </h3>
                        <p className="text-xs text-red-200 font-semibold">
                          {scanResult.crimeCategory} • {scanResult.linkedFir}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <div className="text-[10px] text-gray-300 uppercase">Detection Confidence</div>
                      <div className="text-2xl font-black text-red-400">{scanResult.confidenceScore}%</div>
                      <div className="text-[9.5px] text-gray-400">Cross-referenced CCTNS DB</div>
                    </div>
                  </div>

                  {/* Suspect & Vehicle Details Split Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-red-500/30">
                    {/* Suspect Dossier (6 cols) */}
                    <div className="md:col-span-6 bg-black/40 border border-red-500/20 rounded-xl p-4 space-y-3">
                      <div className="text-xs font-mono uppercase font-black text-red-400 flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" />
                        <span>{language === 'kn' ? 'ಗುರುತಿಸಲಾದ ಶಂಕಿತರ ವಿವರ' : language === 'hi' ? 'पहचाने गए संदिग्ध की प्रोफ़ाइल' : 'Identified Suspect Profile'}</span>
                      </div>

                      <div className="flex items-start gap-4">
                        <img
                          src={scanResult.suspect?.photoUrl}
                          alt={scanResult.suspect?.name}
                          className="h-24 w-24 rounded-xl object-cover border-2 border-red-500 shrink-0 shadow-md"
                        />
                        <div className="space-y-1 text-xs">
                          <div className="text-base font-black text-white">{scanResult.suspect?.name}</div>
                          <div className="text-blue-300 font-mono text-[11px]">ID: {scanResult.suspect?.convictId}</div>
                          <div className="text-gray-300 text-[11px]">
                            {language === 'kn' ? 'ಅಪರನಾಮಗಳು:' : language === 'hi' ? 'उर्फ:' : 'Aliases:'} {scanResult.suspect?.aliases.join(', ')}
                          </div>
                          <div className="text-amber-300 font-bold text-[11px]">
                            {formatDynamicText(scanResult.suspect?.warrantStatus || '', language)}
                          </div>
                          <div className="inline-block px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] mt-1">
                            {formatDynamicText(scanResult.suspect?.weaponsFlag || '', language)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Vehicle Details & Sighting Vector (6 cols) */}
                    <div className="md:col-span-6 bg-black/40 border border-red-500/20 rounded-xl p-4 space-y-3">
                      <div className="text-xs font-mono uppercase font-black text-amber-400 flex items-center gap-2">
                        <Car className="h-4 w-4" />
                        <span>{language === 'kn' ? 'ವಾಹನ ಪತ್ತೆ ಮತ್ತು ಪಲಾಯನ ವೆಕ್ಟರ್' : language === 'hi' ? 'वाहन दृश्य और पलायन वेक्टर' : 'Vehicle Sighting & Flight Vector'}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <span className="text-gray-400 block text-[10px]">{language === 'kn' ? 'ಮಾದರಿ:' : language === 'hi' ? 'मॉडल:' : 'Make & Model:'}</span>
                          <span className="font-bold text-white">{scanResult.vehicle?.makeModel || 'Tata Nexon EV / Commercial Vehicle'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">{language === 'kn' ? 'ವೇಗ:' : language === 'hi' ? 'गति:' : 'Captured Speed:'}</span>
                          <span className="font-bold text-red-400">{scanResult.vehicle?.speedKmh || 45} km/h ({language === 'kn' ? 'ಅತಿವೇಗ' : language === 'hi' ? 'अत्यधिक' : 'Excessive'})</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">{language === 'kn' ? 'ಕೊನೆಯ ಕ್ಯಾಮೆರಾ:' : language === 'hi' ? 'अंतिम कैमरा:' : 'Last Camera:'}</span>
                          <span className="font-bold text-blue-200">{scanResult.vehicle?.cameraCaptured || 'CAM-ANPR-01'}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[10px]">{language === 'kn' ? 'ಆರ್‌ಸಿ ಸ್ಥಿತಿ:' : language === 'hi' ? 'आरसी स्थिति:' : 'RC Status:'}</span>
                          <span className="font-bold text-amber-300">{formatDynamicText(scanResult.vehicle?.vahanOwner || 'Verified Citizen', language)}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-xs text-gray-300">
                        <span className="font-mono text-gray-400">{language === 'kn' ? 'ದಿಕ್ಕು ವೆಕ್ಟರ್:' : language === 'hi' ? 'दिशा वेक्टर:' : 'Direction Vector:'}</span> {formatDynamicText(scanResult.vehicle?.travelHeading || 'Normal Traffic Vector', language)}
                      </div>
                    </div>
                  </div>

                  {/* 3-CHOKE-POINT TACTICAL INTERCEPT CORDON MATRIX */}
                  {scanResult.tacticalCordon && (
                    <div className="pt-4 border-t border-red-500/30 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="text-sm font-black font-mono uppercase text-[#FFB800] flex items-center gap-2">
                            <Crosshair className="h-4 w-4 text-[#FFB800]" />
                            <span>{language === 'kn' ? 'ಡೈನಾಮಿಕ್ 3-ಚೋಕ್-ಪಾಯಿಂಟ್ ಯುದ್ಧತಂತ್ರದ ಸುತ್ತುವರಿಕೆ ಕಾರ್ಡನ್' : language === 'hi' ? 'गतिशील 3-चोक-पॉइंट सामरिक घेराबंदी' : 'Dynamic 3-Choke-Point Tactical Intercept Cordon'}</span>
                          </div>
                          <p className="text-xs text-gray-300 font-sans">
                            {formatDynamicText(scanResult.tacticalCordon.suggestedAction, language)}
                          </p>
                        </div>

                        <button
                          onClick={handleDeployTacticalCordon}
                          className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:brightness-110 text-white font-black text-xs uppercase font-mono tracking-wider shadow-2xl transition flex items-center gap-2 cursor-pointer shrink-0"
                        >
                          <Siren className="h-4 w-4" />
                          <span>{cordonDeployed ? (language === 'kn' ? 'ಸುತ್ತುವರಿಕೆ ನಿಯೋಜಿಸಲಾಗಿದೆ & ಸಜ್ಜಾಗಿದೆ' : language === 'hi' ? 'घेराबंदी तैनात और सुसज्जित' : 'CORDON DEPLOYED & ARMED') : (language === 'kn' ? '1-ಕ್ಲಿಕ್ ಎಲ್ಲಾ 3 ಕಾರ್ಡನ್‌ಗಳನ್ನು ರವಾನಿಸಿ' : language === 'hi' ? '1-क्लिक सभी 3 घेराबंदी भेजें' : '1-CLICK DISPATCH ALL 3 CORDONS')}</span>
                        </button>
                      </div>

                      {/* Choke Points Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {scanResult.tacticalCordon.chokePoints.map((cp, index) => {
                          const currentStatus = activeChokePointStatus[cp.id] || cp.status;
                          return (
                            <div
                              key={cp.id}
                              className={`rounded-xl p-4 border transition flex flex-col justify-between space-y-3 ${
                                currentStatus === 'DEPLOYED' || currentStatus === 'SEALED'
                                  ? 'bg-red-950/40 border-red-500 ring-1 ring-red-500'
                                  : 'bg-black/40 border-white/15'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs font-mono">
                                  <span className="font-black text-[#FFB800]">{language === 'kn' ? `ಚೋಕ್ ಪಾಯಿಂಟ್ #${index + 1}` : language === 'hi' ? `चोक पॉइंट #${index + 1}` : `CHOKE POINT #${index + 1}`}</span>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                                    currentStatus === 'DEPLOYED' ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-500/20 text-amber-300'
                                  }`}>
                                    {formatDynamicText(currentStatus, language)}
                                  </span>
                                </div>
                                <h4 className="text-xs font-black text-white">{formatDynamicText(cp.name, language)}</h4>
                              </div>

                              <div className="space-y-1.5 text-[11px] font-mono bg-black/30 p-2.5 rounded-lg border border-white/5">
                                <div className="flex justify-between text-gray-300">
                                  <span>{language === 'kn' ? 'ದೂರ:' : language === 'hi' ? 'दूरी:' : 'Distance:'}</span>
                                  <span className="font-bold text-white">{cp.distanceKm} km</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                  <span>{language === 'kn' ? 'ಅಂದಾಜು ಸಮಯ:' : language === 'hi' ? 'ईटीए:' : 'Intercept ETA:'}</span>
                                  <span className="font-bold text-emerald-400">{cp.etaMinutes} mins</span>
                                </div>
                                <div className="flex justify-between text-gray-300">
                                  <span>{language === 'kn' ? 'ನಿಯೋಜಿತ ಘಟಕಗಳು:' : language === 'hi' ? 'आवंटित इकाइयां:' : 'Assigned Units:'}</span>
                                  <span className="font-bold text-cyan-300">{cp.assignedUnits.join(', ')}</span>
                                </div>
                                <div className="text-amber-200/90 text-[10px] pt-1 border-t border-white/10">
                                  {language === 'kn' ? 'ತಂತ್ರಗಳು:' : language === 'hi' ? 'रणनीति:' : 'Tactics:'} {formatDynamicText(cp.interceptionTactics, language)}
                                </div>
                              </div>

                              <button
                                onClick={() => toggleChokePoint(cp.id)}
                                className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <span>{currentStatus === 'DEPLOYED' ? (language === 'kn' ? 'ಸ್ಥಿತಿ: ಸಕ್ರಿಯ ಸೀಲ್' : language === 'hi' ? 'स्थिति: सक्रिय सील' : 'STATUS: ACTIVE SEAL') : (language === 'kn' ? 'ಚೋಕ್ ಸೀಲ್ ಅಧಿಕೃತಗೊಳಿಸಿ' : language === 'hi' ? 'चोक सील अधिकृत करें' : 'AUTHORIZE CHOKE SEAL')}</span>
                                <ChevronRight className="h-3 w-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dispatch Confirmation Toast/Banner */}
                      {dispatchStatus && (
                        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                            <span>{formatDynamicText(dispatchStatus.message, language)} (DISPATCH ID: {dispatchStatus.dispatchId})</span>
                          </div>
                          <span className="font-bold text-[#FFB800]">ETA: 2.1 MINS</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Clean Plate Verified Citizen Display */
                <div className="rounded-2xl border border-emerald-500/40 bg-[#071D3A] p-6 text-white shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/30">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-black uppercase border border-emerald-500/30">
                          ✓ CLEAN KSP VAHAN 4.0 REGISTRATION
                        </div>
                        <h3 className="text-xl font-black font-mono tracking-tight text-white mt-1">
                          {scanResult.searchedPlate} — VALID & VERIFIED
                        </h3>
                        <p className="text-xs text-emerald-300 font-bold">
                          {scanResult.crimeCategory}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0">
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Verification Score</div>
                      <div className="text-2xl font-black text-emerald-400">{scanResult.confidenceScore || 99.8}%</div>
                      <div className="text-[9.5px] text-gray-300 font-semibold">Clean Records Match</div>
                    </div>
                  </div>

                  {/* VAHAN 4.0 Detailed Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#05152A] border border-white/10 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-mono font-black text-amber-400 uppercase">{language === 'kn' ? 'ವಾಹನದ ವಿವರಗಳು' : language === 'hi' ? 'वाहन का विवरण' : 'Vehicle Particulars'}</div>
                      <div className="space-y-1 text-xs">
                        <div className="text-white font-bold">{scanResult.vehicle?.makeModel || 'Tata Nexon EV / Maruti Suzuki Swift (Pearl White)'}</div>
                        <div className="text-gray-200 font-mono text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಚಾಸಿಸ್:' : language === 'hi' ? 'चेसिस:' : 'Chassis:'}</span> {scanResult.vehicle?.chassisNo || 'MATB349281729120'}</div>
                        <div className="text-gray-200 font-mono text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಎಂಜಿನ್:' : language === 'hi' ? 'इंजन:' : 'Engine:'}</span> {scanResult.vehicle?.engineNo || 'ENG44109281'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಇಂಧನ:' : language === 'hi' ? 'ईंधन:' : 'Fuel:'}</span> {scanResult.vehicle?.fuelType || 'Electric / Petrol BS-VI'}</div>
                      </div>
                    </div>

                    <div className="bg-[#05152A] border border-white/10 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-mono font-black text-amber-400 uppercase">{language === 'kn' ? 'ನೋಂದಣಿ & ಅನುಸರಣೆ' : language === 'hi' ? 'पंजीकरण और अनुपालन' : 'Registration & Compliance'}</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="text-emerald-400 font-bold">{language === 'kn' ? 'ಆರ್‌ಟಿಒ:' : language === 'hi' ? 'आरटीओ:' : 'RTO:'} {scanResult.vahanDetails?.registeringAuthority || 'RTO Bengaluru Central (KA-01 / KA-04)'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಫಿಟ್‌ನೆಸ್ ಮಾನ್ಯತೆ:' : language === 'hi' ? 'फिटनेस वैधता:' : 'Fitness Valid:'}</span> {scanResult.vahanDetails?.fitnessValidTill || '2031-11-20 (Valid)'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ವಿಮೆ:' : language === 'hi' ? 'बीमा:' : 'Insurance:'}</span> {scanResult.vahanDetails?.insuranceValidTill || '2027-04-15 (National Insurance Co.)'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">PUC:</span> {scanResult.vahanDetails?.pucValidTill || '2026-12-31 (Valid)'}</div>
                      </div>
                    </div>

                    <div className="bg-[#05152A] border border-white/10 rounded-xl p-4 space-y-2">
                      <div className="text-xs font-mono font-black text-amber-400 uppercase">{language === 'kn' ? 'ಸಂಚಾರ ಮತ್ತು ಪೊಲೀಸ್ ಅನುಮತಿಗಳು' : language === 'hi' ? 'यातायात और पुलिस क्लीयरेंस' : 'Traffic & Police Clearances'}</div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="text-emerald-400 font-bold"><span className="text-gray-400">{language === 'kn' ? 'ಕಳ್ಳತನ ಸ್ಥಿತಿ:' : language === 'hi' ? 'चोरी स्थिति:' : 'Stolen Status:'}</span> {scanResult.vahanDetails?.stolenReportStatus || 'CLEAR / NOT STOLEN'}</div>
                        <div className="text-emerald-400 font-bold"><span className="text-gray-400">{language === 'kn' ? 'ಕಪ್ಪುಪಟ್ಟಿ ಸ್ಥಿತಿ:' : language === 'hi' ? 'ब्लैकलिस्ट स्थिति:' : 'Blacklist Status:'}</span> {scanResult.vahanDetails?.blacklistStatus || 'CLEAN (No Warrants)'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಬಾಕಿ ಚಲನ್‌ಗಳು:' : language === 'hi' ? 'लंबित चालान:' : 'Outstanding Challans:'}</span> {scanResult.vahanDetails?.pendingTrafficChallans ?? 0} {language === 'kn' ? 'ಪಾವತಿಸದ' : language === 'hi' ? 'अदत्त' : 'Unpaid'}</div>
                        <div className="text-gray-200 text-[11px]"><span className="text-gray-400">{language === 'kn' ? 'ಬ್ಯಾಂಕ್ ಹೊಣೆಗಾರಿಕೆ:' : language === 'hi' ? 'बैंक धारणाधिकार:' : 'Bank Lien:'}</span> {scanResult.vahanDetails?.hypothecation || 'NIL / Clear'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HOYSALA FLEET PATROL TRACKER                                      */}
      {/* ========================================================================= */}
      {activeTab === 'fleetTracker' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-ksp-gray-200 dark:border-white/10 bg-white dark:bg-[#071D3A] p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-tight text-ksp-gray-800 dark:text-white flex items-center gap-2 font-mono">
                  <Car className="h-5 w-5 text-cyan-400" />
                  {language === 'kn' ? 'ಹೊಯ್ಸಳ ಪಿಸಿಆರ್ ಪಡೆ ನೈಜ-ಸಮಯದ GPS ಟೆಲಿಮೆಟ್ರಿ' : language === 'hi' ? 'होयसला पीसीआर बेड़ा वास्तविक समय जीपीएस टेलीमेट्री' : 'Hoysala PCR Fleet Real-Time GPS Telemetry'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'kn' ? '142 ಮೊಬೈಲ್ ಪೊಲೀಸ್ ಪ್ರತಿಕ್ರಿಯೆ ಘಟಕಗಳು, ಟೆಲಿಮೆಟ್ರಿ ಸ್ಥಿತಿ, ಪ್ರಭಾರ ಅಧಿಕಾರಿಗಳು, ಚೇಸ್ ವೆಕ್ಟರ್‌ಗಳು ಮತ್ತು ತುರ್ತು ಕಿಟ್ ಸಾಮರ್ಥ್ಯಗಳ ನೇರ ಟ್ರ್ಯಾಕಿಂಗ್.' : language === 'hi' ? '142 मोबाइल पुलिस प्रतिक्रिया इकाइयों, टेलीमेट्री स्थिति, प्रभारी अधिकारियों, चेस वैक्टर और आपातकालीन किट क्षमताओं की लाइव ट्रैकिंग।' : 'Live tracking of 142 mobile police response units, telemetry status, officers in-charge, dynamic chase vectors, and emergency kit capabilities.'}
                </p>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  ● {language === 'kn' ? '100% CAD ರವಾನೆಗೆ ಸಿದ್ಧ' : language === 'hi' ? '100% सीएडी प्रेषण तैयार' : '100% CAD DISPATCH READY'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pcrPatrolVans.map(van => (
                <div
                  key={van.unitId}
                  className="rounded-xl border border-ksp-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#05152A] p-4 space-y-3 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-[#FFB800]" />
                      <span className="text-xs font-black font-mono text-ksp-gray-800 dark:text-white">
                        {van.unitId}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black font-mono ${
                      van.status === 'PURSUING'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                        : van.status === 'STANDBY'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {formatDynamicText(van.status, language)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs font-black text-slate-900 dark:text-white">{van.callsign}</div>
                    <div className="text-[11px] text-slate-700 dark:text-gray-300 font-mono font-bold">{language === 'kn' ? 'ಅಧಿಕಾರಿ:' : language === 'hi' ? 'अधिकारी:' : 'Officer:'} {van.officer}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-black/30 p-2.5 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-600 dark:text-gray-400 block text-[9.5px] font-bold">{language === 'kn' ? 'ವೇಗ:' : language === 'hi' ? 'गति:' : 'Speed:'}</span>
                      <span className="font-bold text-amber-700 dark:text-[#FFB800]">{van.speedKmh} km/h</span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-gray-400 block text-[9.5px] font-bold">{language === 'kn' ? 'ಇಂಧನ ಮಟ್ಟ:' : language === 'hi' ? 'ईंधन स्तर:' : 'Fuel Level:'}</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{van.fuelPercent}%</span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-gray-400 block text-[9.5px] font-bold">{language === 'kn' ? 'ನಿರ್ದೇಶಾಂಕಗಳು:' : language === 'hi' ? 'निर्देशांक:' : 'Coordinates:'}</span>
                      <span className="text-slate-900 dark:text-gray-200 font-bold text-[10px]">{van.lat.toFixed(3)}, {van.lng.toFixed(3)}</span>
                    </div>
                    <div>
                      <span className="text-slate-600 dark:text-gray-400 block text-[9.5px] font-bold">{language === 'kn' ? 'ಘಟನೆ:' : language === 'hi' ? 'घटना:' : 'Incident:'}</span>
                      <span className="text-blue-700 dark:text-blue-300 font-bold text-[10px]">{formatDynamicText(van.assignedIncident || 'Patrolling Sector', language)}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-600 dark:text-gray-400 uppercase font-bold">{language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆ ಉಪಕರಣಗಳು:' : language === 'hi' ? 'सामरिक उपकरण:' : 'Tactical Equipment:'}</div>
                    <div className="flex flex-wrap gap-1">
                      {van.equipped.map((eq, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 text-[9.5px] font-mono font-bold border border-blue-200 dark:border-blue-800/40">
                          {formatDynamicText(eq, language)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 112 EMERGENCY CAD STREAM & INCIDENT LOG                           */}
      {/* ========================================================================= */}
      {activeTab === 'incidents112' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-ksp-gray-200 dark:border-white/10 bg-white dark:bg-[#071D3A] p-6 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-black tracking-tight text-ksp-gray-800 dark:text-white flex items-center gap-2 font-mono">
                  <PhoneCall className="h-5 w-5 text-emerald-400" />
                  {language === 'kn' ? 'ಕರ್ನಾಟಕ ERSS 112 CAD ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಫೀಡ್' : language === 'hi' ? 'कर्नाटक ईआरएसएस 112 सीएडी आपातकालीन प्रतिक्रिया फ़ीड' : 'Karnataka ERSS 112 CAD Emergency Response Feed'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'kn' ? 'ಬೆಂಗಳೂರು ಪೊಲೀಸ್ ಆಯುಕ್ತಾಲಯ ಮತ್ತು ಜಿಲ್ಲಾ RTCC ಕನ್ಸೋಲ್‌ಗಳೊಂದಿಗೆ ಸಿಂಕ್ರೊನೈಸ್ ಮಾಡಲಾದ ನೈಜ-ಸಮಯದ ಕಂಪ್ಯೂಟರ್ ನೆರವಿನ ರವಾನೆ (CAD) ಘಟನಾ ಲಾಗ್.' : language === 'hi' ? 'बेंगलुरु पुलिस आयुक्तालय और जिला आरटीसीसी कंसोल के साथ सिंक्रनाइज़ रीयल-टाइम कंप्यूटर-एडेड डिस्पैच (सीएडी) घटना लॉग।' : 'Real-time Computer-Aided Dispatch incident log synchronized with Bengaluru Police Commissionerate and district RTCC consoles.'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {incidents112.map(inc => (
                <div
                  key={inc.incidentId}
                  onClick={() => {
                    if (inc.targetPlate) {
                      setInputPlate(inc.targetPlate);
                      setActiveTab('commandWall');
                      handleExecuteScan(inc.targetPlate);
                    }
                  }}
                  className="rounded-xl border border-ksp-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#05152A] hover:bg-white dark:hover:bg-[#071D3A] p-5 space-y-3 shadow-md transition cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded text-xs font-mono font-black ${
                        inc.priority === 'CRITICAL' 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-amber-500 text-black'
                      }`}>
                        {inc.priority === 'CRITICAL' ? (language === 'kn' ? 'ನಿರ್ಣಾಯಕ ಆದ್ಯತೆ' : language === 'hi' ? 'गंभीर प्राथमिकता' : 'CRITICAL PRIORITY') : (language === 'kn' ? 'ಹೆಚ್ಚಿನ ಆದ್ಯತೆ' : language === 'hi' ? 'उच्च प्राथमिकता' : `${inc.priority} PRIORITY`)}
                      </span>
                      <span className="text-sm font-black font-mono text-ksp-gray-800 dark:text-white group-hover:text-[#FFB800] transition">
                        {inc.incidentId} — {formatDynamicText(inc.type.replace(/_/g, ' '), language)}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                      {language === 'kn' ? 'ವರದಿ:' : language === 'hi' ? 'रिपोर्ट:' : 'Reported:'} {inc.reportedAt} | {language === 'kn' ? 'ಕರೆದಾರ:' : language === 'hi' ? 'कॉलर:' : 'Caller:'} {inc.callerPhone}
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {formatDynamicText(inc.details, language)}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ksp-gray-200 dark:border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-4">
                      <span className="text-blue-500 dark:text-blue-300">
                        {language === 'kn' ? 'ಸ್ಥಳ:' : language === 'hi' ? 'स्थान:' : 'Location:'} {formatDynamicText(inc.location, language)} ({inc.lat.toFixed(4)}, {inc.lng.toFixed(4)})
                      </span>
                      {inc.targetPlate && (
                        <span className="text-[#FFB800] font-bold">
                          {language === 'kn' ? 'ಸಂಬಂಧಿತ ಪ್ಲೇಟ್:' : language === 'hi' ? 'संबंधित प्लेट:' : 'Associated Plate:'} {inc.targetPlate}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">{language === 'kn' ? 'ಘಟಕಗಳು:' : language === 'hi' ? 'इकाइयां:' : 'Units:'} {inc.assignedUnits.join(', ')}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (inc.targetPlate) {
                            setInputPlate(inc.targetPlate);
                            setActiveTab('commandWall');
                            handleExecuteScan(inc.targetPlate);
                          }
                        }}
                        className="px-3 py-1 rounded-lg bg-[#0B2E59] hover:bg-[#133D6B] text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Crosshair className="h-3 w-3 text-[#FFB800]" />
                        <span>{language === 'kn' ? 'ಕಾರ್ಡನ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ತೊಡಗಿಸಿಕೊಳ್ಳಿ' : language === 'hi' ? 'घेराबंदी मैट्रिक्स संलग्न करें' : 'ENGAGE CORDON MATRIX'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Real-Time Crime Center (RTCC) 24/7 Command Wall"
        department="State Police Command & Control Center (Dial 112 Command Ops)"
        legalAuthority="Section 149 BNSS & Motor Vehicles Act (Automated Number Plate Enforcement)"
        purpose="Live CCTV multi-stream telemetry, AI optical ANPR vehicle hit scanning, live PCR cruiser GPS tracking, and emergency Dial-112 CAD dispatch matrix."
        steps={[
          {
            step: "01",
            action: "Monitor 24/7 Command Wall",
            detail: "Watch simulated live CCTV feeds across major junctions with optical AI overlay and motion bounding boxes."
          },
          {
            step: "02",
            action: "Execute ANPR Hit Scan",
            detail: "Scan vehicle license plates (e.g. KA01AB1234) to trace historical toll/camera trajectory and trigger automated cordon interception."
          },
          {
            step: "03",
            action: "Fleet Tracker & Dial 112 Dispatch",
            detail: "Review GPS telemetry for active patrol cruisers and dispatch nearest responder to active emergency CAD calls."
          }
        ]}
        tacticalTips={[
          "Click 'Engage Cordon Matrix' to automatically compute optimal interception choke-points for fleeing vehicles.",
          "Use the CCTV full-screen toggle to focus on critical incident surveillance cameras."
        ]}
      />
    </div>
  );
}
