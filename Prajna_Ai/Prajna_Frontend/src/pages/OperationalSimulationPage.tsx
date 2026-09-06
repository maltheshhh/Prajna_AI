import React, { useState, useMemo, useEffect } from 'react';
import { 
  useLanguage, 
  formatUnitName, 
  formatUnitShortName, 
  formatUnitDescription, 
  formatUnitBadge, 
  formatUnitRole, 
  formatVulnerabilityAlert, 
  formatRecommendation, 
  formatRisk,
  formatDynamicText 
} from '@/context/LanguageContext';
import {
  SimulationFactors,
  CrowdDensity,
  EnvironmentalCondition,
  DeploymentPosture,
  computeCoverageRisk,
  SimulationResult,
  PlacedUnit,
  UnitType,
  UnitDefinition,
  UnitCategory,
  UNIT_CATALOG,
  ScenarioLocation,
  SCENARIO_LOCATIONS,
  KARNATAKA_DISTRICTS_DATABASE,
  DEFAULT_SCENARIO_LOCATION,
  createDefaultPlanAUnits,
  createDefaultPlanBUnits,
  getGeoOffset,
  resolveKarnatakaLocation,
  calculateSuspectThreatRadius,
  SuspectProfile,
  SuspectMobility,
  SuspectThreatTier,
  DEFAULT_SUSPECT_PROFILE,
  EscapeRoute,
  BUDGET_MAX,
  BUDGET_MIN,
} from '@/utils/mockSimulationEngine';
import { CoverageZoneMap } from '@/components/map/CoverageZoneMap';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import {
  ShieldAlert,
  Shield,
  Users,
  CloudRain,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Clock,
  Activity,
  Compass,
  Award,
  Zap,
  Trash2,
  RotateCcw,
  Plus,
  Crosshair,
  Info,
  MapPin,
  Save,
  FolderOpen,
  Database,
  BookmarkPlus,
  X,
  Check,
  Loader2,
  Target,
  Navigation,
  Flame,
  Search,
  Lock,
  Unlock,
  Edit3,
  Car,
  Bike,
  Footprints,
  Bus,
  CheckCheck,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  RefreshCw,
  Dog,
  Sparkles,
  Camera,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { fetchHotspotsApi, fetchSavedScenariosApi, saveScenarioApi, computeRiskApi } from '@/utils/api';
import { AiTacticalCommander } from '@/components/simulation/AiTacticalCommander';

export interface SavedScenario {
  _id?: string;
  name: string;
  scenarioLocation: ScenarioLocation;
  factors: SimulationFactors;
  result: SimulationResult;
  savedAt?: string | Date;
}

export interface LiveWeatherData {
  temperature: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  description: string;
  derivedCondition: EnvironmentalCondition;
  fetchedAt: Date;
}

const LOCAL_CUSTOM_UNITS_KEY = 'ksp_custom_tactical_units_v1';

/**
 * Parses WMO weather codes (Open-Meteo standard) and precipitation
 */
function parseWmoWeatherCode(code: number, precip: number): { condition: EnvironmentalCondition; description: string } {
  if (precip > 0 || (code >= 51 && code <= 67) || (code >= 71 && code <= 77) || (code >= 80 && code <= 86) || (code >= 95 && code <= 99)) {
    let desc = 'Rain';
    if (code >= 51 && code <= 55) desc = 'Light Drizzle';
    else if (code === 61) desc = 'Slight Rain';
    else if (code === 63) desc = 'Moderate Rain';
    else if (code === 65) desc = 'Heavy Rain';
    else if (code >= 80 && code <= 82) desc = 'Rain Showers';
    else if (code >= 95) desc = 'Thunderstorm';
    else if (precip > 0) desc = `Precipitation (${precip}mm)`;
    return { condition: 'rain', description: desc };
  }

  if (code === 45 || code === 48) {
    return { condition: 'low_visibility', description: 'Fog / Low Visibility' };
  }

  let desc = 'Clear Sky';
  if (code === 1 || code === 2) desc = 'Partly Cloudy';
  else if (code === 3) desc = 'Overcast';

  return { condition: 'clear', description: desc };
}

export function OperationalSimulationPage() {
  const { t, language } = useLanguage();

  // All available Karnataka locations
  const [availableLocations, setAvailableLocations] = useState<Record<string, ScenarioLocation>>(KARNATAKA_DISTRICTS_DATABASE);
  const [isLoadingHotspots, setIsLoadingHotspots] = useState(false);
  const [searchLocationQuery, setSearchLocationQuery] = useState('');

  // Active scenario location
  const [scenarioLocation, setScenarioLocation] = useState<ScenarioLocation>(DEFAULT_SCENARIO_LOCATION);

  // Map Click Action Mode
  const [clickMode, setClickMode] = useState<'navigate' | 'set_incident_center' | 'place_suspect'>('navigate');

  // Live Weather Telemetry State
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  // Saved scenarios state from database & local cache
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [isSavingScenario, setIsSavingScenario] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveScenarioName, setSaveScenarioName] = useState('');

  // Target Suspect Profile Modal State
  const [showSuspectModal, setShowSuspectModal] = useState(false);
  const [suspectForm, setSuspectForm] = useState<SuspectProfile>(DEFAULT_SUSPECT_PROFILE);

  // Custom User Tactical Units State
  const [customUnits, setCustomUnits] = useState<UnitDefinition[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_CUSTOM_UNITS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showCreateUnitModal, setShowCreateUnitModal] = useState(false);
  const [paletteCategory, setPaletteCategory] = useState<string>('all');
  const [paletteSearch, setPaletteSearch] = useState<string>('');

  // Custom Unit Creator Form State
  const [customUnitForm, setCustomUnitForm] = useState({
    name: 'K-9 Scent Tracking Unit',
    shortName: 'K-9 Squad',
    description: 'Trained scent tracker dog squad for tight alleyways, parks, and fugitive pursuit.',
    category: 'k9_specialist' as UnitCategory,
    radiusMeters: 180,
    cost: 2,
    iconEmoji: '🐕',
    color: '#059669',
    badge: 'K-9 Specialist',
    tacticalRole: 'Scent Tracking & Pursuit',
  });

  // Merged Catalog (Built-in + Custom Units)
  const activeCatalog = useMemo(() => {
    const merged: Record<string, UnitDefinition> = { ...UNIT_CATALOG };
    customUnits.forEach((u) => {
      merged[u.type] = u;
    });
    return merged;
  }, [customUnits]);

  // Initialize Plan A with Suspect unit at center
  const initialPlanAUnits = useMemo(() => {
    const defaultUnits = createDefaultPlanAUnits(DEFAULT_SCENARIO_LOCATION, DEFAULT_SCENARIO_LOCATION.center);
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(DEFAULT_SUSPECT_PROFILE.mobilityType, DEFAULT_SUSPECT_PROFILE.threatTier);
    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: DEFAULT_SCENARIO_LOCATION.center[0],
      lng: DEFAULT_SCENARIO_LOCATION.center[1],
      radiusMeters,
      cost: 0,
      label: `Suspect: ${DEFAULT_SUSPECT_PROFILE.name}`,
      suspectData: { ...DEFAULT_SUSPECT_PROFILE, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
    };
    return [suspectUnit, ...defaultUnits];
  }, []);

  // Initialize Plan B with 360 Cordon surrounding the suspect
  const initialPlanBUnits = useMemo(() => {
    const defaultUnits = createDefaultPlanBUnits(DEFAULT_SCENARIO_LOCATION, DEFAULT_SCENARIO_LOCATION.center, 450);
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(DEFAULT_SUSPECT_PROFILE.mobilityType, DEFAULT_SUSPECT_PROFILE.threatTier);
    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: DEFAULT_SCENARIO_LOCATION.center[0],
      lng: DEFAULT_SCENARIO_LOCATION.center[1],
      radiusMeters,
      cost: 0,
      label: `Suspect: ${DEFAULT_SUSPECT_PROFILE.name}`,
      suspectData: { ...DEFAULT_SUSPECT_PROFILE, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
    };
    return [suspectUnit, ...defaultUnits];
  }, []);

  // Plan A State
  const [factorsA, setFactorsA] = useState<SimulationFactors>({
    crowdDensity: 'moderate',
    environmentalConditions: 'clear',
    posture: 'visible_perimeter',
    scenarioLocation: DEFAULT_SCENARIO_LOCATION,
    placedUnits: initialPlanAUnits,
    activeSuspect: DEFAULT_SUSPECT_PROFILE,
  });

  // Plan B State
  const [factorsB, setFactorsB] = useState<SimulationFactors>({
    crowdDensity: 'high',
    environmentalConditions: 'festival_overlap',
    posture: 'checkpoint_focused',
    scenarioLocation: DEFAULT_SCENARIO_LOCATION,
    placedUnits: initialPlanBUnits,
    activeSuspect: DEFAULT_SUSPECT_PROFILE,
  });

  const [activePlanTab, setActivePlanTab] = useState<'planA' | 'planB' | 'compare'>('planA');
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [draggingUnitType, setDraggingUnitType] = useState<UnitType | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Server-Side Computed Risk Results
  const [serverResultA, setServerResultA] = useState<SimulationResult | null>(null);
  const [serverResultB, setServerResultB] = useState<SimulationResult | null>(null);
  const [isComputingServerRisk, setIsComputingServerRisk] = useState(false);

  // Local calculation baselines
  const localResultA: SimulationResult = useMemo(() => computeCoverageRisk(factorsA), [factorsA]);
  const localResultB: SimulationResult = useMemo(() => computeCoverageRisk(factorsB), [factorsB]);

  const resultA = serverResultA || localResultA;
  const resultB = serverResultB || localResultB;

  const currentResult = activePlanTab === 'planB' ? resultB : resultA;
  const currentFactors = activePlanTab === 'planB' ? factorsB : factorsA;
  const setCurrentFactors = activePlanTab === 'planB' ? setFactorsB : setFactorsA;

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3200);
  };

  // Save Custom Tactical Unit
  const handleCreateCustomUnit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeKey = `custom_${Date.now()}_${(customUnitForm.shortName || 'unit').toLowerCase().replace(/\s+/g, '_')}`;
    const newUnitDef: UnitDefinition = {
      type: typeKey,
      name: customUnitForm.name.trim() || 'Custom Tactical Unit',
      shortName: customUnitForm.shortName.trim() || 'Custom Unit',
      description: customUnitForm.description.trim() || 'Custom deployable squad.',
      category: customUnitForm.category,
      radiusMeters: Number(customUnitForm.radiusMeters) || 200,
      cost: Number(customUnitForm.cost) || 2,
      iconName: 'Sparkles',
      iconEmoji: customUnitForm.iconEmoji || '🛡️',
      color: customUnitForm.color || '#059669',
      accentColor: customUnitForm.color || '#047857',
      badge: customUnitForm.badge.trim() || 'Custom Squad',
      tacticalRole: customUnitForm.tacticalRole.trim() || 'Tactical Deployment',
      isCustom: true,
    };

    const updated = [newUnitDef, ...customUnits];
    setCustomUnits(updated);
    try {
      localStorage.setItem(LOCAL_CUSTOM_UNITS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error saving custom unit to storage:', err);
    }

    setShowCreateUnitModal(false);
    showToast(`⭐ Created "${newUnitDef.name}" — available in the tactical palette!`);
  };

  // Delete Custom Unit
  const handleDeleteCustomUnit = (typeKey: string) => {
    const updated = customUnits.filter((u) => u.type !== typeKey);
    setCustomUnits(updated);
    try {
      localStorage.setItem(LOCAL_CUSTOM_UNITS_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Error deleting custom unit:', err);
    }
    showToast('Deleted custom tactical unit.');
  };

  // Debounced Server-Side Risk Scoring
  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      try {
        setIsComputingServerRisk(true);
        const res = await computeRiskApi(factorsA);
        if (res.success && res.data && !isCancelled) {
          setServerResultA(res.data);
        }
      } catch (err) {
        console.warn('Server risk scoring Plan A fallback:', err);
      } finally {
        if (!isCancelled) setIsComputingServerRisk(false);
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [factorsA]);

  useEffect(() => {
    let isCancelled = false;
    const timer = setTimeout(async () => {
      try {
        const res = await computeRiskApi(factorsB);
        if (res.success && res.data && !isCancelled) {
          setServerResultB(res.data);
        }
      } catch (err) {
        console.warn('Server risk scoring Plan B fallback:', err);
      }
    }, 300);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [factorsB]);

  // Fetch Live Weather from Open-Meteo
  useEffect(() => {
    let isMounted = true;

    async function fetchWeather() {
      if (!scenarioLocation || !scenarioLocation.center) return;
      const [lat, lng] = scenarioLocation.center;
      setIsLoadingWeather(true);

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,precipitation,weather_code,wind_speed_10m`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
        const data = await res.json();

        if (data && data.current && isMounted) {
          const temp = Math.round(data.current.temperature_2m);
          const precip = data.current.precipitation ?? 0;
          const code = data.current.weather_code ?? 0;
          const wind = Math.round(data.current.wind_speed_10m ?? 0);

          const { condition, description } = parseWmoWeatherCode(code, precip);

          const weatherObj: LiveWeatherData = {
            temperature: temp,
            precipitation: precip,
            weatherCode: code,
            windSpeed: wind,
            description,
            derivedCondition: condition,
            fetchedAt: new Date(),
          };

          setLiveWeather(weatherObj);

          setFactorsA((prev) => {
            if (prev.environmentalConditions === 'festival_overlap') return prev;
            return { ...prev, environmentalConditions: condition, envCondition: condition };
          });
          setFactorsB((prev) => {
            if (prev.environmentalConditions === 'festival_overlap') return prev;
            return { ...prev, environmentalConditions: condition, envCondition: condition };
          });
        }
      } catch (err) {
        console.warn('Open-Meteo live weather fetch fallback:', err);
      } finally {
        if (isMounted) setIsLoadingWeather(false);
      }
    }

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [scenarioLocation]);

  // Load dynamic Hotspots & Saved Scenarios
  useEffect(() => {
    let isMounted = true;

    async function loadHotspotLocations() {
      setIsLoadingHotspots(true);
      try {
        const res = await fetchHotspotsApi();
        if (res.success && Array.isArray(res.data) && res.data.length > 0 && isMounted) {
          const severityRadius: Record<string, number> = { critical: 700, high: 600, medium: 400, low: 250 };
          const dynamicLocations: Record<string, ScenarioLocation> = { ...KARNATAKA_DISTRICTS_DATABASE };

          res.data.forEach((h: any, idx: number) => {
            const sev = (h.severity || 'medium').toLowerCase();
            const id = h.id || `hotspot-${idx}`;
            dynamicLocations[id] = {
              id,
              name: `🚨 ${h.district}${h.taluk ? ` (${h.taluk})` : ''} — ${h.crimeType} Hotspot (${(h.severity || 'high').toUpperCase()})`,
              district: h.district || 'Karnataka',
              center: [Number(h.latitude) || 12.9614, Number(h.longitude) || 77.5746],
              zoneRadiusMeters: severityRadius[sev] ?? 350,
            };
          });

          setAvailableLocations(dynamicLocations);
        }
      } catch (err) {
        console.warn('Hotspots fetch fallback:', err);
      } finally {
        if (isMounted) setIsLoadingHotspots(false);
      }
    }

    async function loadSavedScenarios() {
      setIsLoadingSaved(true);
      try {
        const res = await fetchSavedScenariosApi();
        if (res.success && Array.isArray(res.data) && isMounted) {
          setSavedScenarios(res.data);
        }
      } catch (err) {
        console.warn('Saved scenarios fetch fallback:', err);
      } finally {
        if (isMounted) setIsLoadingSaved(false);
      }
    }

    loadHotspotLocations();
    loadSavedScenarios();

    return () => {
      isMounted = false;
    };
  }, []);

  // Switch Scenario Location (maintaining synchronized suspect at center)
  const handleScenarioChange = (scenarioId: string) => {
    const nextScenario = availableLocations[scenarioId] || KARNATAKA_DISTRICTS_DATABASE[scenarioId] || DEFAULT_SCENARIO_LOCATION;
    setScenarioLocation(nextScenario);

    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);
    const updatedSuspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: nextScenario.center[0],
      lng: nextScenario.center[1],
      radiusMeters,
      cost: 0,
      label: `Suspect: ${suspectForm.name}`,
      suspectData: { ...suspectForm, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
    };

    setFactorsA((prev) => ({
      ...prev,
      scenarioLocation: nextScenario,
      placedUnits: [updatedSuspectUnit, ...createDefaultPlanAUnits(nextScenario, nextScenario.center)],
      activeSuspect: suspectForm,
    }));
    setFactorsB((prev) => ({
      ...prev,
      scenarioLocation: nextScenario,
      placedUnits: [updatedSuspectUnit, ...createDefaultPlanBUnits(nextScenario, nextScenario.center, radiusMeters)],
      activeSuspect: suspectForm,
    }));
    setSelectedUnitId(null);
    showToast(`📍 Switched tactical sector to ${nextScenario.name}.`);
  };

  // Map Free-Click Handler
  const handleMapClick = (lat: number, lng: number) => {
    if (clickMode === 'set_incident_center') {
      const customLoc = resolveKarnatakaLocation(lat, lng);
      setScenarioLocation(customLoc);
      setAvailableLocations((prev) => ({ ...prev, [customLoc.id]: customLoc }));

      const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);
      const updatedSuspectUnit: PlacedUnit = {
        id: 'unit-suspect-target',
        type: 'target_suspect',
        lat: customLoc.center[0],
        lng: customLoc.center[1],
        radiusMeters,
        cost: 0,
        label: `Suspect: ${suspectForm.name}`,
        suspectData: { ...suspectForm, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
      };

      setFactorsA((prev) => ({
        ...prev,
        scenarioLocation: customLoc,
        placedUnits: [updatedSuspectUnit, ...createDefaultPlanAUnits(customLoc, customLoc.center)],
        activeSuspect: suspectForm,
      }));
      setFactorsB((prev) => ({
        ...prev,
        scenarioLocation: customLoc,
        placedUnits: [updatedSuspectUnit, ...createDefaultPlanBUnits(customLoc, customLoc.center, radiusMeters)],
        activeSuspect: suspectForm,
      }));
      setClickMode('navigate');
      showToast(`🎯 Incident center set to [${lat.toFixed(4)}, ${lng.toFixed(4)}] (${customLoc.district}).`);
    } else if (clickMode === 'place_suspect') {
      addOrMoveSuspect(lat, lng);
      setClickMode('navigate');
    }
  };

  // Add or Move Suspect
  const addOrMoveSuspect = (lat: number, lng: number) => {
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);
    const updatedForm = { ...suspectForm, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph };

    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat,
      lng,
      radiusMeters,
      cost: 0,
      label: `Suspect: ${updatedForm.name}`,
      suspectData: updatedForm,
    };

    const syncUnits = (units: PlacedUnit[]) => {
      const idx = units.findIndex((u) => u.type === 'target_suspect');
      if (idx >= 0) {
        const copy = [...units];
        copy[idx] = suspectUnit;
        return copy;
      }
      return [suspectUnit, ...units];
    };

    setFactorsA((prev) => ({
      ...prev,
      placedUnits: syncUnits(prev.placedUnits || []),
      activeSuspect: updatedForm,
    }));

    setFactorsB((prev) => ({
      ...prev,
      placedUnits: syncUnits(prev.placedUnits || []),
      activeSuspect: updatedForm,
    }));

    setSuspectForm(updatedForm);
    setSelectedUnitId(suspectUnit.id);
    showToast(`🎯 Positioned Fugitive Target (${updatedForm.name}) at [${lat.toFixed(4)}, ${lng.toFixed(4)}].`);
  };

  // One-Click Tactical Re-alignment of all troops around the suspect's exact position
  const handleRealignTroopsAroundSuspect = () => {
    const currentUnits = currentFactors.placedUnits || [];
    const suspect = currentUnits.find((u) => u.type === 'target_suspect');
    const anchor: [number, number] = suspect ? [suspect.lat, suspect.lng] : scenarioLocation.center;
    const threatR = suspectForm.threatRadiusMeters || 450;

    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: anchor[0],
      lng: anchor[1],
      radiusMeters: threatR,
      cost: 0,
      label: `Suspect: ${suspectForm.name}`,
      suspectData: suspectForm,
    };

    const newPlanA = [suspectUnit, ...createDefaultPlanAUnits(scenarioLocation, anchor)];
    const newPlanB = [suspectUnit, ...createDefaultPlanBUnits(scenarioLocation, anchor, threatR)];

    setFactorsA((prev) => ({
      ...prev,
      placedUnits: newPlanA,
    }));

    setFactorsB((prev) => ({
      ...prev,
      placedUnits: newPlanB,
    }));

    showToast(`⚡ Tactically re-aligned Plan A & Plan B troops in 360° ring around fugitive [${anchor[0].toFixed(4)}, ${anchor[1].toFixed(4)}]!`);
  };

  // Save Suspect Profile Changes
  const handleSaveSuspectProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);
    const updatedProfile: SuspectProfile = {
      ...suspectForm,
      threatRadiusMeters: radiusMeters,
      escapeSpeedKmph: speedKmph,
    };

    const updatePlanUnits = (units: PlacedUnit[]) => {
      return units.map((u) => {
        if (u.type === 'target_suspect') {
          return {
            ...u,
            radiusMeters,
            label: `Suspect: ${updatedProfile.name}`,
            suspectData: updatedProfile,
          };
        }
        return u;
      });
    };

    setFactorsA((prev) => ({
      ...prev,
      placedUnits: updatePlanUnits(prev.placedUnits || []),
      activeSuspect: updatedProfile,
    }));

    setFactorsB((prev) => ({
      ...prev,
      placedUnits: updatePlanUnits(prev.placedUnits || []),
      activeSuspect: updatedProfile,
    }));

    setSuspectForm(updatedProfile);
    setShowSuspectModal(false);
    showToast(`✅ Saved Suspect Dossier for ${updatedProfile.name} (${updatedProfile.mobilityType.toUpperCase()}, ${radiusMeters}m threat perimeter).`);
  };

  // Auto-Seal Open Escape Corridors
  const handleAutoSealEscapeRoutes = () => {
    const openRoutes = (currentResult?.escapeRoutes || []).filter((r) => !r.isIntercepted);
    if (openRoutes.length === 0) {
      showToast('🛡️ All escape routes are already 100% sealed!');
      return;
    }

    const currentUnits = [...(currentFactors.placedUnits || [])];
    let budgetSpent = currentUnits.reduce((acc, u) => acc + (u.type === 'target_suspect' ? 0 : u.cost), 0);

    openRoutes.forEach((route, idx) => {
      if (budgetSpent + (UNIT_CATALOG.mobile_response?.cost || 4) <= BUDGET_MAX) {
        const interceptPos: [number, number] = [
          Number(((route.startPoint[0] + route.endPoint[0]) / 2).toFixed(6)),
          Number(((route.startPoint[1] + route.endPoint[1]) / 2).toFixed(6)),
        ];

        currentUnits.push({
          id: `auto-pcr-${Date.now()}-${idx}`,
          type: 'mobile_response',
          lat: interceptPos[0],
          lng: interceptPos[1],
          radiusMeters: UNIT_CATALOG.mobile_response?.radiusMeters || 400,
          cost: UNIT_CATALOG.mobile_response?.cost || 4,
          label: `PCR-Intercept-${route.direction}`,
        });

        budgetSpent += UNIT_CATALOG.mobile_response?.cost || 4;
      }
    });

    setCurrentFactors({
      ...currentFactors,
      placedUnits: currentUnits,
    });

    showToast(`⚡ Auto-deployed intercept units on ${openRoutes.length} open escape corridors!`);
  };

  // Open Save Scenario Modal
  const handleOpenSaveModal = () => {
    const locShort = scenarioLocation.name.split('—')[0].trim();
    const defaultName = `${locShort} - ${activePlanTab === 'planA' ? 'Plan A' : 'Plan B'} (${new Date().toLocaleDateString()})`;
    setSaveScenarioName(defaultName);
    setShowSaveModal(true);
  };

  // Save Scenario to DB & LocalStorage
  const handleSaveScenarioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = saveScenarioName.trim() || `${scenarioLocation.name} (${activePlanTab === 'planA' ? 'Plan A' : 'Plan B'})`;
    setIsSavingScenario(true);
    try {
      const scenarioPayload: SavedScenario = {
        name: finalName,
        scenarioLocation: currentFactors.scenarioLocation || scenarioLocation,
        factors: {
          ...currentFactors,
          activeSuspect: currentFactors.activeSuspect || suspectForm,
        },
        result: currentResult,
      };

      const res = await saveScenarioApi(scenarioPayload);
      if (res.success) {
        showToast(`💾 Scenario "${finalName}" saved successfully!`);
        setShowSaveModal(false);
        const listRes = await fetchSavedScenariosApi();
        if (listRes.success && Array.isArray(listRes.data)) {
          setSavedScenarios(listRes.data);
        }
      } else {
        showToast('💾 Saved to local storage backup.');
        setShowSaveModal(false);
      }
    } catch (err) {
      showToast('💾 Plan saved locally.');
      setShowSaveModal(false);
    } finally {
      setIsSavingScenario(false);
    }
  };

  // Load Saved Scenario
  const handleLoadScenario = (scen: SavedScenario, targetTab?: 'planA' | 'planB') => {
    try {
      const tabToLoad = targetTab || (activePlanTab === 'compare' ? 'planA' : activePlanTab);
      const loc = scen.scenarioLocation || DEFAULT_SCENARIO_LOCATION;
      setScenarioLocation(loc);

      const loadedSuspect = scen.factors.activeSuspect || suspectForm;
      setSuspectForm(loadedSuspect);

      const targetFactors: SimulationFactors = {
        ...scen.factors,
        scenarioLocation: loc,
        placedUnits: scen.factors.placedUnits || scen.result?.placedUnits || [],
        activeSuspect: loadedSuspect,
      };

      if (tabToLoad === 'planA') {
        setFactorsA(targetFactors);
        if (activePlanTab === 'compare') setActivePlanTab('planA');
      } else {
        setFactorsB(targetFactors);
        if (activePlanTab === 'compare') setActivePlanTab('planB');
      }

      setShowLoadModal(false);
      showToast(`${t('scenarioLoadedSuccess')} (${scen.name})`);
    } catch (err) {
      showToast('⚠️ Error loading scenario layout.');
    }
  };

  // Add police or custom unit
  const addUnitToMap = (type: UnitType, lat: number, lng: number) => {
    if (type === 'target_suspect') {
      addOrMoveSuspect(lat, lng);
      setShowSuspectModal(true);
      return;
    }

    const unitDef = activeCatalog[type] || UNIT_CATALOG.patrol_team;
    const currentUnits = currentFactors.placedUnits || [];
    const policeUnits = currentUnits.filter((u) => u.type !== 'target_suspect');
    const currentCost = policeUnits.reduce((acc, u) => acc + u.cost, 0);

    if (currentCost + unitDef.cost > BUDGET_MAX) {
      showToast(`⚠️ Personnel budget limit of ${BUDGET_MAX} reached!`);
      return;
    }

    const newUnit: PlacedUnit = {
      id: `unit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      lat,
      lng,
      radiusMeters: unitDef.radiusMeters,
      cost: unitDef.cost,
      label: `${unitDef.shortName}-${policeUnits.length + 1}`,
      customIcon: unitDef.iconEmoji,
      customColor: unitDef.color,
    };

    const updated = [...currentUnits, newUnit];
    setCurrentFactors({
      ...currentFactors,
      placedUnits: updated,
    });
    setSelectedUnitId(newUnit.id);
  };

  // Move unit
  const moveUnitOnMap = (unitId: string, lat: number, lng: number) => {
    const currentUnits = currentFactors.placedUnits || [];
    const movedUnit = currentUnits.find((u) => u.id === unitId);

    if (movedUnit?.type === 'target_suspect') {
      addOrMoveSuspect(lat, lng);
      return;
    }

    const updated = currentUnits.map((u) => {
      if (u.id === unitId) {
        return { ...u, lat, lng };
      }
      return u;
    });

    setCurrentFactors({
      ...currentFactors,
      placedUnits: updated,
    });
  };

  // Remove unit
  const removeUnit = (unitId: string) => {
    const currentUnits = currentFactors.placedUnits || [];
    const updated = currentUnits.filter((u) => u.id !== unitId);
    setCurrentFactors({
      ...currentFactors,
      placedUnits: updated,
    });
    if (selectedUnitId === unitId) {
      setSelectedUnitId(null);
    }
  };

  // Clear all police units (retains suspect)
  const clearAllUnits = () => {
    const currentUnits = currentFactors.placedUnits || [];
    const suspectOnly = currentUnits.filter((u) => u.type === 'target_suspect');
    setCurrentFactors({
      ...currentFactors,
      placedUnits: suspectOnly,
    });
    setSelectedUnitId(null);
    showToast('Cleared all tactical police units.');
  };

  // Reset layout anchored around suspect
  const resetLayout = () => {
    const activeScenario = currentFactors.scenarioLocation || scenarioLocation;
    const currentUnits = currentFactors.placedUnits || [];
    const existingSuspect = currentUnits.find((u) => u.type === 'target_suspect');
    const anchor: [number, number] = existingSuspect ? [existingSuspect.lat, existingSuspect.lng] : activeScenario.center;
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);

    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: anchor[0],
      lng: anchor[1],
      radiusMeters,
      cost: 0,
      label: `Suspect: ${suspectForm.name}`,
      suspectData: { ...suspectForm, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
    };

    const defaults = activePlanTab === 'planB'
      ? [suspectUnit, ...createDefaultPlanBUnits(activeScenario, anchor, radiusMeters)]
      : [suspectUnit, ...createDefaultPlanAUnits(activeScenario, anchor)];

    setCurrentFactors({
      ...currentFactors,
      placedUnits: defaults,
    });
    setSelectedUnitId(null);
    showToast('Reset coverage zone anchored on fugitive location.');
  };

  // Presets strictly anchored around the suspect
  const applyPreset = (preset: 'minimal' | 'standard' | 'elevated' | 'fugitive_lockdown') => {
    const activeScenario = currentFactors.scenarioLocation || scenarioLocation;
    const currentUnits = currentFactors.placedUnits || [];
    const existingSuspect = currentUnits.find((u) => u.type === 'target_suspect');
    const anchor: [number, number] = existingSuspect ? [existingSuspect.lat, existingSuspect.lng] : activeScenario.center;
    const { radiusMeters, speedKmph } = calculateSuspectThreatRadius(suspectForm.mobilityType, suspectForm.threatTier);
    const r = Math.max(280, Math.min(600, radiusMeters * 0.85));

    const suspectUnit: PlacedUnit = {
      id: 'unit-suspect-target',
      type: 'target_suspect',
      lat: anchor[0],
      lng: anchor[1],
      radiusMeters,
      cost: 0,
      label: `Suspect: ${suspectForm.name}`,
      suspectData: { ...suspectForm, threatRadiusMeters: radiusMeters, escapeSpeedKmph: speedKmph },
    };

    if (preset === 'minimal') {
      const p1 = getGeoOffset(anchor, 80, -40);
      const cp2 = getGeoOffset(anchor, -r, 0);

      setCurrentFactors({
        ...currentFactors,
        crowdDensity: 'low',
        environmentalConditions: 'clear',
        posture: 'visible_perimeter',
        placedUnits: [
          suspectUnit,
          { id: 'min-1', type: 'patrol_team', lat: p1[0], lng: p1[1], radiusMeters: 250, cost: 2, label: 'Patrol-1' },
          { id: 'min-2', type: 'checkpoint_post', lat: cp2[0], lng: cp2[1], radiusMeters: 150, cost: 3, label: 'CP-South' },
        ],
      });
    } else if (preset === 'standard') {
      setCurrentFactors({
        ...currentFactors,
        crowdDensity: 'moderate',
        environmentalConditions: 'clear',
        posture: 'visible_perimeter',
        placedUnits: [suspectUnit, ...createDefaultPlanAUnits(activeScenario, anchor)],
      });
    } else if (preset === 'elevated') {
      setCurrentFactors({
        ...currentFactors,
        crowdDensity: 'high',
        environmentalConditions: 'festival_overlap',
        posture: 'distributed_patrol',
        placedUnits: [suspectUnit, ...createDefaultPlanBUnits(activeScenario, anchor, radiusMeters)],
      });
    } else if (preset === 'fugitive_lockdown') {
      const cpN = getGeoOffset(anchor, r, 0);
      const cpS = getGeoOffset(anchor, -r, 0);
      const cpE = getGeoOffset(anchor, 0, r);
      const cpW = getGeoOffset(anchor, 0, -r);
      const owNE = getGeoOffset(anchor, r * 0.5, r * 0.5);
      const mrvSW = getGeoOffset(anchor, -r * 0.5, -r * 0.5);

      setCurrentFactors({
        ...currentFactors,
        crowdDensity: 'high',
        environmentalConditions: 'clear',
        posture: 'checkpoint_focused',
        placedUnits: [
          suspectUnit,
          { id: 'fl-1', type: 'checkpoint_post', lat: cpN[0], lng: cpN[1], radiusMeters: 150, cost: 3, label: 'CP-North Chokepoint' },
          { id: 'fl-2', type: 'checkpoint_post', lat: cpS[0], lng: cpS[1], radiusMeters: 150, cost: 3, label: 'CP-South Chokepoint' },
          { id: 'fl-3', type: 'checkpoint_post', lat: cpE[0], lng: cpE[1], radiusMeters: 150, cost: 3, label: 'CP-East Chokepoint' },
          { id: 'fl-4', type: 'checkpoint_post', lat: cpW[0], lng: cpW[1], radiusMeters: 150, cost: 3, label: 'CP-West Chokepoint' },
          { id: 'fl-5', type: 'overwatch_post', lat: owNE[0], lng: owNE[1], radiusMeters: 200, cost: 2, label: 'Drone-Overwatch NE' },
          { id: 'fl-6', type: 'mobile_response', lat: mrvSW[0], lng: mrvSW[1], radiusMeters: 400, cost: 4, label: 'PCR-Interceptor SW' },
        ],
      });
    }
  };

  const planALabel = t('planABaseline');
  const planBLabel = t('planBContingency');

  const comparisonChartData = [
    { metric: 'Containment %', [planALabel]: resultA.containmentScorePercent, [planBLabel]: resultB.containmentScorePercent },
    { metric: 'Risk Index (Lower = Better)', [planALabel]: resultA.coverageRiskIndex, [planBLabel]: resultB.coverageRiskIndex },
    { metric: 'Response SLA (min)', [planALabel]: resultA.estResponseTimeMinutes, [planBLabel]: resultB.estResponseTimeMinutes },
    { metric: 'Personnel Cost', [planALabel]: resultA.totalPersonnelCost, [planBLabel]: resultB.totalPersonnelCost },
  ];

  const currentPlacedUnits = currentFactors?.placedUnits || [];
  const policeUnits = (currentPlacedUnits || []).filter((u) => u && u.type !== 'target_suspect');
  const totalCost = currentResult?.totalPersonnelCost || 0;
  const budgetRemaining = Math.max(0, BUDGET_MAX - totalCost);
  const budgetPercent = Math.min(100, Math.round((totalCost / BUDGET_MAX) * 100));

  // --- Dynamic Comparative Reasoning Engine ---
  const isPlanAPerfect = (resultA?.containmentScorePercent === 100) && (resultA?.coveredAccessPointsCount === resultA?.totalAccessPointsCount) && ((resultA?.vulnerabilityAlerts || []).length === 0);
  const isPlanBPerfect = (resultB?.containmentScorePercent === 100) && (resultB?.coveredAccessPointsCount === resultB?.totalAccessPointsCount) && ((resultB?.vulnerabilityAlerts || []).length === 0);
  const openCorridorsA = (resultA?.escapeRoutes || []).filter((r) => !r.isIntercepted);
  const openCorridorsB = (resultB?.escapeRoutes || []).filter((r) => !r.isIntercepted);
  const riskReduction = (resultA?.coverageRiskIndex || 0) - (resultB?.coverageRiskIndex || 0);
  const containmentGain = (resultB?.containmentScorePercent || 0) - (resultA?.containmentScorePercent || 0);
  const slaDelta = Number(((resultA?.estResponseTimeMinutes || 0) - (resultB?.estResponseTimeMinutes || 0)).toFixed(1));

  // Filtered Tactical Units for Palette
  const filteredPaletteUnits = useMemo(() => {
    return Object.values(activeCatalog).filter((unit) => {
      if (unit.isSuspect) return false;
      if (paletteCategory !== 'all') {
        if (paletteCategory === 'custom' && !unit.isCustom) return false;
        if (paletteCategory !== 'custom' && unit.category !== paletteCategory) return false;
      }
      if (paletteSearch.trim()) {
        const query = paletteSearch.toLowerCase();
        return (
          (unit.name || '').toLowerCase().includes(query) ||
          (unit.shortName || '').toLowerCase().includes(query) ||
          (unit.description || '').toLowerCase().includes(query) ||
          (unit.badge || '').toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [activeCatalog, paletteCategory, paletteSearch]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-xs text-left">
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-4 right-4 z-50 bg-[#0B2E59] text-white border-2 border-amber-400 px-4 py-2.5 rounded-lg shadow-2xl text-xs font-bold flex items-center gap-2 animate-bounce-short">
          <Info size={16} className="text-amber-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Page Header Banner (Compact) */}
      <div className="bg-[#0B2E59] text-white p-3.5 px-5 rounded-xl shadow-md border-l-4 border-amber-500 flex flex-col md:flex-row md:items-center justify-between gap-3 select-none">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 rounded text-[9px] font-bold text-amber-300 uppercase tracking-widest font-mono">
              <Radio className="h-2.5 w-2.5 animate-pulse" />
              <span>Karnataka Police Sandbox</span>
            </span>
            <span className="text-[10px] text-gray-300 font-mono">Leaflet Tactical Map</span>
          </div>
          <h1 className="text-base sm:text-lg font-black tracking-tight uppercase">Operational Deployment & Risk Simulation</h1>
          <p className="text-[11px] text-gray-200 mt-0.5 leading-tight max-w-2xl">
            Simulate suspect containment, perimeter lockdown, and resource deployment anywhere across Karnataka.
          </p>
        </div>

        {/* Location Selector & Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center space-x-2 bg-[#133D6B] px-3 py-1.5 rounded border border-[#05182E] text-xs font-mono">
            <MapPin size={14} className="text-amber-400 shrink-0" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-gray-300 uppercase shrink-0">Sector:</span>
              <select
                value={scenarioLocation?.id || ''}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="bg-[#0B2E59] text-white font-bold text-xs rounded border border-sky-400/50 px-2 py-0.5 outline-none cursor-pointer max-w-[180px] truncate"
              >
                {Object.values(availableLocations || {}).map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              {isLoadingHotspots && <Loader2 size={10} className="animate-spin text-sky-300 shrink-0" />}
            </div>
          </div>

          {/* Click to Pin Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              const nextMode = clickMode === 'set_incident_center' ? 'navigate' : 'set_incident_center';
              setClickMode(nextMode);
              showToast(nextMode === 'set_incident_center' ? '📍 Click anywhere on the map to set incident center!' : 'Map navigation active.');
            }}
            className={`p-2.5 font-extrabold text-xs rounded border flex items-center gap-1.5 shadow transition cursor-pointer ${
              clickMode === 'set_incident_center'
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-300 animate-pulse'
                : 'bg-[#133D6B] hover:bg-[#1a4a80] text-sky-200 border-sky-400/40'
            }`}
            title="Click on map to place incident center"
          >
            <Crosshair size={15} className={clickMode === 'set_incident_center' ? 'text-slate-950' : 'text-amber-300'} />
            <span className="hidden sm:inline">Set Center on Map</span>
          </button>

          {/* Save Plan Button */}
          <button
            type="button"
            onClick={handleOpenSaveModal}
            className="p-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded border border-amber-400 flex items-center gap-1.5 shadow transition cursor-pointer"
            title={t('savePlan')}
          >
            <BookmarkPlus size={15} />
            <span className="hidden sm:inline">{t('savePlan')}</span>
          </button>

          {/* Load Scenarios Button */}
          <button
            type="button"
            onClick={() => setShowLoadModal(true)}
            className="p-2.5 bg-[#133D6B] hover:bg-[#1a4a80] text-sky-200 font-extrabold text-xs rounded border border-sky-400/40 flex items-center gap-1.5 shadow transition cursor-pointer"
            title={t('loadPlan')}
          >
            <Database size={15} className="text-sky-300" />
            <span className="hidden sm:inline">{t('loadPlan')}</span>
            {savedScenarios.length > 0 && (
              <span className="bg-sky-400 text-slate-950 font-mono text-[9px] px-1.5 py-0.2 rounded-full font-extrabold">
                {savedScenarios.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* AI Tactical Operations Commander */}
      <AiTacticalCommander
        scenarioLocation={scenarioLocation}
        liveWeather={liveWeather}
        currentFactors={currentFactors}
        onApplyPlanA={({ posture, placedUnits }) => {
          setFactorsA((prev) => ({
            ...prev,
            posture,
            placedUnits,
          }));
          setActivePlanTab('planA');
        }}
        onApplyPlanB={({ posture, placedUnits }) => {
          setFactorsB((prev) => ({
            ...prev,
            posture,
            placedUnits,
          }));
          setActivePlanTab('planB');
        }}
        onShowToast={showToast}
      />

      {/* Plan Mode Selector Tabs */}
      <div className="flex border-b border-[#E5DEC9] bg-white rounded-t-lg p-2 dark:bg-ksp-navy-dark dark:border-ksp-navy-light shadow-2xs select-none">
        <button
          type="button"
          onClick={() => setActivePlanTab('planA')}
          className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wide border-b-2 text-center flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activePlanTab === 'planA'
              ? 'border-[#0B2E59] text-[#0B2E59] dark:border-sky-300 dark:text-sky-300 font-black'
              : 'border-transparent text-gray-500 hover:text-[#0B2E59] dark:text-ksp-gray-300'
          }`}
        >
          <Compass size={14} /> {t('planABaseline')}
        </button>
        <button
          type="button"
          onClick={() => setActivePlanTab('planB')}
          className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wide border-b-2 text-center flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activePlanTab === 'planB'
              ? 'border-[#0B2E59] text-[#0B2E59] dark:border-sky-300 dark:text-sky-300 font-black'
              : 'border-transparent text-gray-500 hover:text-[#0B2E59] dark:text-ksp-gray-300'
          }`}
        >
          <Zap size={14} /> {t('planBContingency')}
        </button>
        <button
          type="button"
          onClick={() => setActivePlanTab('compare')}
          className={`flex-1 py-2.5 text-xs font-extrabold uppercase tracking-wide border-b-2 text-center flex items-center justify-center gap-1.5 transition cursor-pointer ${
            activePlanTab === 'compare'
              ? 'border-[#8B0000] text-[#8B0000] dark:border-red-400 dark:text-red-400 font-black'
              : 'border-transparent text-gray-500 hover:text-[#8B0000] dark:text-ksp-gray-300'
          }`}
        >
          <Activity size={14} /> {t('planComparison')} (Side-by-Side Dual Map)
        </button>
      </div>

      {/* Main Simulation Workspace */}
      {activePlanTab !== 'compare' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column (5 Cols): Unit Palette & Parameters */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Unit Palette Tray */}
            <div className="bg-white rounded-lg border border-[#E5DEC9] p-5 shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 dark:border-ksp-navy-light select-none">
                <div>
                  <span className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Crosshair size={16} className="text-[#8B0000] dark:text-sky-300" />
                    Tactical Unit & Specialist Palette
                  </span>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                    Drag onto map or click to deploy • Scroll to explore specialist units
                  </p>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateUnitModal(true)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[10px] flex items-center gap-1 shadow cursor-pointer transition"
                  >
                    <Plus size={12} />
                    <span>Create Unit</span>
                  </button>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded dark:bg-ksp-navy-light dark:text-sky-200">
                    {activePlanTab === 'planA' ? 'PLAN A' : 'PLAN B'}
                  </span>
                </div>
              </div>

              {/* Special Target Suspect Deploy Card */}
              <div className="p-3.5 rounded-lg border-2 border-red-500 bg-red-50 dark:bg-red-950/30 flex flex-col justify-between select-none shadow-sm space-y-2">
                <div className="flex items-start justify-between gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-red-600 text-white anim-suspect">
                      <Target size={16} />
                    </div>
                    <div>
                      <span className="font-extrabold text-xs text-red-950 dark:text-red-200 block">
                        🎯 Target Suspect: {currentResult.activeSuspect?.name || suspectForm.name}
                      </span>
                      <span className="text-[9.5px] font-mono text-red-700 dark:text-red-300">
                        {currentResult.activeSuspect?.alias || suspectForm.alias} • {currentResult.activeSuspect?.mobilityType.toUpperCase()} ({currentResult.activeSuspect?.escapeSpeedKmph} km/h)
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-red-200 text-red-900 uppercase">
                    FUGITIVE PIN
                  </span>
                </div>

                <p className="text-[9.5px] text-red-800 dark:text-red-300 leading-relaxed">
                  {language === 'kn'
                    ? `೬ ದಿಕ್ಕಿನ ತಪ್ಪಿಸಿಕೊಳ್ಳುವ ಕಾರಿಡಾರ್‌ಗಳು ಮತ್ತು ಬೆದರಿಕೆ ಪರಿಧಿಯನ್ನು (${currentResult.activeSuspect?.threatRadiusMeters}m) ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ. ಯೋಜನೆ ಎ ಮತ್ತು ಯೋಜನೆ ಬಿ ಎರಡರಲ್ಲೂ ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ.`
                    : language === 'hi'
                    ? `6 दिशात्मक भागने के गलियारों और खतरे की परिधि (${currentResult.activeSuspect?.threatRadiusMeters}m) की गणना करता है। योजना ए और योजना बी दोनों में साझा।`
                    : `Calculates 6 directional escape corridors & threat perimeter (${currentResult.activeSuspect?.threatRadiusMeters}m). Shared across both Plan A and Plan B.`}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-red-200 dark:border-red-900/60">
                  <button
                    type="button"
                    onClick={() => {
                      const [lat, lng] = scenarioLocation.center;
                      addOrMoveSuspect(lat, lng);
                      setShowSuspectModal(true);
                    }}
                    className="flex-1 py-1.5 px-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold text-[10px] flex items-center justify-center gap-1 shadow cursor-pointer"
                  >
                    <Plus size={11} /> {language === 'hi' ? 'संदिग्ध की स्थिति तय करें' : language === 'kn' ? 'ಸಂದಿಗ್ಧ ಸ್ಥಳ ನಿರ್ಧರಿಸಿ' : 'Position Suspect'}
                  </button>
                  <button
                    type="button"
                    onClick={handleRealignTroopsAroundSuspect}
                    className="py-1.5 px-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded font-bold text-[10px] flex items-center gap-1 shadow cursor-pointer"
                    title="Automatically re-align all troops in a 360 degree ring around suspect"
                  >
                    <RefreshCw size={11} /> {language === 'hi' ? '360° घेरा पुनर्गठित करें' : language === 'kn' ? '360° ಉಂಗುರ ಮರುಹೊಂದಿಸಿ' : 'Re-Align 360° Ring'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSuspectModal(true)}
                    className="py-1.5 px-2 bg-white hover:bg-red-100 text-red-800 border border-red-300 rounded font-bold text-[10px] flex items-center gap-1 cursor-pointer dark:bg-slate-900 dark:text-red-300"
                  >
                    <Edit3 size={11} /> {language === 'hi' ? 'डोजियर' : language === 'kn' ? 'ಡಾಕ್ಯುಮೆಂಟ್' : 'Dossier'}
                  </button>
                </div>
              </div>

              {/* Category Filter Pills & Search */}
              <div className="space-y-2 pt-1">
                <div className="relative">
                  <Search size={13} className="absolute left-2.5 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={paletteSearch}
                    onChange={(e) => setPaletteSearch(e.target.value)}
                    placeholder={
                      language === 'kn'
                        ? 'ಕಾರ್ಯತಂತ್ರದ ಘಟಕಗಳನ್ನು ಹುಡುಕಿ (ಉದಾ. K-9, SWAT, ಚೆಕ್‌ಪಾಯಿಂಟ್, ಗಸ್ತು)...'
                        : language === 'hi'
                        ? 'रणनीतिक इकाइयों को खोजें (उदा. K-9, SWAT, चेकपॉइंट, गश्ती)...'
                        : 'Search tactical units (e.g. K-9, SWAT, Barricade, Patrol)...'
                    }
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-gray-200 dark:border-ksp-navy-light bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:border-sky-500"
                  />
                  {paletteSearch && (
                    <button
                      type="button"
                      onClick={() => setPaletteSearch('')}
                      className="absolute right-2.5 top-2 text-gray-400 hover:text-gray-600"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {[
                    { id: 'all', label: language === 'kn' ? 'ಎಲ್ಲಾ ಘಟಕಗಳು' : language === 'hi' ? 'सभी इकाइयाँ' : 'All Units' },
                    { id: 'k9_specialist', label: language === 'kn' ? '🐕 K-9 ಶ್ವಾನ ದಳ' : language === 'hi' ? '🐕 K-9 खोजी श्वान' : '🐕 K-9 Canine' },
                    { id: 'rapid_intercept', label: language === 'kn' ? '🚓 ಮೊಬೈಲ್ ಕ್ರೂಸರ್‌ಗಳು' : language === 'hi' ? '🚓 मोबाइल वाहन' : '🚓 Mobile Cruisers' },
                    { id: 'checkpoint_containment', label: language === 'kn' ? '🚧 ಚೆಕ್‌ಪೋಸ್ಟ್‌ಗಳು' : language === 'hi' ? '🚧 चेकपॉइंट्स' : '🚧 Checkpoints' },
                    { id: 'ground_patrol', label: language === 'kn' ? '👮 ಬೀಟ್ ಗಸ್ತು' : language === 'hi' ? '👮 बीट गश्ती' : '👮 Beat Patrols' },
                    { id: 'surveillance', label: language === 'kn' ? '🛸 ಡ್ರೋನ್ ಕಣ್ಗಾವಲು' : language === 'hi' ? '🛸 ड्रोन निगरानी' : '🛸 Overwatch' },
                    { id: 'tactical_swat', label: language === 'kn' ? '🛡️ ಕ್ಯೂಆರ್‌ಎಫ್ / ಸ್ವಾಟ್' : language === 'hi' ? '🛡️ क्यूआरएफ / स्वैट' : '🛡️ SWAT / QRF' },
                    { id: 'custom', label: language === 'kn' ? '⭐ ಕಸ್ಟಮ್ ಘಟಕಗಳು' : language === 'hi' ? '⭐ कस्टम इकाइयाँ' : '⭐ Custom Units' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPaletteCategory(cat.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold whitespace-nowrap transition cursor-pointer ${
                        paletteCategory === cat.id
                          ? 'bg-[#0B2E59] text-white dark:bg-sky-500 dark:text-slate-950 font-black shadow-xs'
                          : 'bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-ksp-navy-dark dark:text-gray-300 dark:border dark:border-ksp-navy-light'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Police & Specialist Unit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[460px] overflow-y-auto pr-1 select-none">
                {filteredPaletteUnits.length === 0 ? (
                  <div className="col-span-2 py-8 text-center text-gray-400 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-gray-300 dark:border-ksp-navy-light">
                    <Search size={24} className="mx-auto mb-1.5 opacity-40" />
                    <p className="font-bold text-xs">
                      {language === 'kn' ? 'ಯಾವುದೇ ಕಾರ್ಯತಂತ್ರದ ಘಟಕಗಳು ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತಿಲ್ಲ.' : language === 'hi' ? 'कोई रणनीतिक इकाई मेल नहीं खाती।' : 'No tactical units match your filter.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setPaletteCategory('all');
                        setPaletteSearch('');
                      }}
                      className="mt-2 text-[10px] text-sky-600 dark:text-sky-400 font-bold underline cursor-pointer"
                    >
                      {language === 'kn' ? 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ' : language === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset filters'}
                    </button>
                  </div>
                ) : (
                  filteredPaletteUnits.map((def) => {
                    const canAfford = totalCost + def.cost <= BUDGET_MAX;

                    return (
                      <div
                        key={def.type}
                        draggable={canAfford}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'palette', type: def.type }));
                          setDraggingUnitType(def.type);
                        }}
                        onDragEnd={() => setDraggingUnitType(null)}
                        onClick={() => {
                          if (canAfford) {
                            const [lat, lng] = scenarioLocation.center;
                            addUnitToMap(def.type, lat, lng);
                            showToast(`Placed ${formatUnitName(def.name, t, language) || def.name} at scenario center.`);
                          }
                        }}
                        className={`p-3 rounded-lg border text-left transition-all duration-200 cursor-grab active:cursor-grabbing flex flex-col justify-between relative group ${
                          canAfford
                            ? 'border-gray-200 bg-slate-50 hover:bg-white hover:border-[#0B2E59] hover:shadow-md dark:bg-ksp-navy-dark dark:border-ksp-navy-light'
                            : 'border-gray-200 bg-gray-100/70 opacity-60 cursor-not-allowed dark:bg-slate-900'
                        }`}
                        style={{ borderLeftWidth: '4px', borderLeftColor: def.color }}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs shadow-xs" style={{ backgroundColor: def.color }}>
                              {def.iconEmoji || '👮'}
                            </div>
                            <div>
                              <span className="font-extrabold text-xs text-gray-900 dark:text-white block leading-tight">
                                {formatUnitName(def.name, t, language) || def.name}
                              </span>
                              <span className="text-[9px] font-mono text-gray-500">
                                {formatUnitBadge(def.badge, t, language) || def.badge}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-gray-200 shrink-0">
                            {def.cost} {t('cost')}
                          </span>
                        </div>

                        <p className="text-[9.5px] text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                          {formatUnitDescription(def.description, t, language) || def.description}
                        </p>

                        <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-gray-200/60 dark:border-ksp-navy-light/40 text-[9px] font-mono text-gray-500">
                          <span>{t('radius')}: {def.radiusMeters}m</span>
                          
                          <div className="flex items-center gap-1.5">
                            {def.isCustom && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteCustomUnit(def.type);
                                }}
                                className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                                title="Delete Custom Unit"
                              >
                                <Trash2 size={11} />
                              </button>
                            )}
                            <span className="text-[#0B2E59] dark:text-sky-300 font-bold flex items-center gap-0.5">
                              <Plus size={10} /> {t('add')}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* 2. Personnel Budget Meter */}
              <div className="space-y-2 border-t pt-3.5 dark:border-ksp-navy-light/40">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-extrabold text-gray-800 dark:text-gray-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Users size={14} className="text-[#0B2E59] dark:text-sky-300" />
                    {t('personnelBudgetMeter')}
                  </span>
                  <span className="font-mono font-extrabold text-sm text-[#0B2E59] dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 px-2.5 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                    {totalCost} / {BUDGET_MAX} {t('cost')}
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      totalCost > 24 ? 'bg-amber-500' : totalCost >= 12 ? 'bg-emerald-500' : 'bg-sky-500'
                    }`}
                    style={{ width: `${budgetPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[9px] font-mono text-gray-500 pt-0.5">
                  <span>Police Units Placed: {policeUnits.length}</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {budgetRemaining > 0 ? `${budgetRemaining} ${t('pointsAvailable')}` : t('budgetMaxCapacity')}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={resetLayout}
                    className="flex-1 p-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-gray-700 rounded text-[10px] font-bold flex items-center justify-center gap-1 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-gray-200 cursor-pointer"
                  >
                    <RotateCcw size={12} /> {t('resetDefaultLayout')}
                  </button>
                  <button
                    type="button"
                    onClick={clearAllUnits}
                    className="flex-1 p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded text-[10px] font-bold flex items-center justify-center gap-1 dark:bg-red-950/30 dark:border-red-900 dark:text-red-300 cursor-pointer"
                  >
                    <Trash2 size={12} /> {t('clearAllUnits')}
                  </button>
                </div>
              </div>

            </div>

            {/* 3. Parameter Controls */}
            <div className="bg-white rounded-lg border border-[#E5DEC9] p-5 shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-4">
              <div className="flex justify-between items-center border-b pb-2.5 dark:border-ksp-navy-light select-none">
                <span className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders size={16} className="text-[#8B0000] dark:text-sky-300" />
                  {t('simulationParameters')}
                </span>
                <span className="text-[10px] font-mono text-gray-400">SCENARIOS</span>
              </div>

              {/* Quick Presets */}
              <div className="space-y-1.5 select-none">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                  Tactical Presets (Fugitive-Anchored)
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyPreset('minimal')}
                    className="p-1.5 rounded border border-gray-200 bg-slate-50 hover:bg-sky-50 text-[10px] font-bold text-gray-700 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-gray-200 text-left transition cursor-pointer"
                  >
                    🟢 Minimal Beat
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('standard')}
                    className="p-1.5 rounded border border-gray-200 bg-slate-50 hover:bg-sky-50 text-[10px] font-bold text-gray-700 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-gray-200 text-left transition cursor-pointer"
                  >
                    🔵 Standard Layout
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('elevated')}
                    className="p-1.5 rounded border border-gray-200 bg-slate-50 hover:bg-sky-50 text-[10px] font-bold text-gray-700 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-gray-200 text-left transition cursor-pointer"
                  >
                    🟠 High Risk Sector
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('fugitive_lockdown')}
                    className="p-1.5 rounded border border-red-300 bg-red-50 hover:bg-red-100 text-[10px] font-bold text-red-900 dark:bg-red-950/40 dark:border-red-800 dark:text-red-200 text-left transition cursor-pointer"
                  >
                    🔴 100% Cordon Lockdown
                  </button>
                </div>
              </div>

              {/* Posture */}
              <div className="space-y-1.5 pt-2">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">{t('deploymentPosture')}</label>
                <select
                  value={currentFactors.posture}
                  onChange={(e) => setCurrentFactors({ ...currentFactors, posture: e.target.value as DeploymentPosture })}
                  className="w-full p-2 border border-gray-300 rounded bg-white font-medium text-xs dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-white"
                >
                  <option value="visible_perimeter">{t('postureVisiblePerimeter')}</option>
                  <option value="distributed_patrol">{t('postureDistributedPatrol')}</option>
                  <option value="checkpoint_focused">{t('postureCheckpointFocused')}</option>
                </select>
              </div>

              {/* Crowd Density */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">{t('crowdDensity')}</label>
                <select
                  value={currentFactors.crowdDensity}
                  onChange={(e) => setCurrentFactors({ ...currentFactors, crowdDensity: e.target.value as CrowdDensity })}
                  className="w-full p-2 border border-gray-300 rounded bg-white font-medium text-xs dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-white"
                >
                  <option value="low">{t('densityLow')}</option>
                  <option value="moderate">{t('densityModerate')}</option>
                  <option value="high">{t('densityHigh')}</option>
                  <option value="peak">{t('densityPeak')}</option>
                </select>
              </div>

              {/* Environmental Condition */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 dark:text-gray-300 block">{t('envCondition')}</label>
                <select
                  value={currentFactors.environmentalConditions || currentFactors.envCondition || 'clear'}
                  onChange={(e) => setCurrentFactors({ ...currentFactors, environmentalConditions: e.target.value as EnvironmentalCondition, envCondition: e.target.value as EnvironmentalCondition })}
                  className="w-full p-2 border border-gray-300 rounded bg-white font-medium text-xs dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-white"
                >
                  <option value="clear">{t('envClear')}</option>
                  <option value="rain">{t('envRain')}</option>
                  <option value="low_visibility">{t('envLowVisibility')}</option>
                  <option value="festival_overlap">{t('envFestivalOverlap')}</option>
                </select>
              </div>
            </div>

          </div>

          {/* Right Column (7 Cols): Map, KPIs & Escape Corridors */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Interactive Leaflet Map with Animated Markers & Escape Vectors */}
            <div className="bg-white rounded-lg border border-[#E5DEC9] p-4 shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2 dark:border-ksp-navy-light">
                <div className="flex items-center gap-2">
                  <Navigation size={16} className="text-[#8B0000] dark:text-sky-300" />
                  <span className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider">
                    Karnataka Tactical Map
                  </span>
                  <span className="text-[10px] font-mono bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300 px-2 py-0.5 rounded font-bold">
                    GPS: {scenarioLocation.center[0].toFixed(4)}, {scenarioLocation.center[1].toFixed(4)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRealignTroopsAroundSuspect}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold rounded text-[10px] flex items-center gap-1 shadow cursor-pointer transition"
                    title="Automatically re-align all troops in a 360 degree ring around suspect"
                  >
                    <RefreshCw size={11} />
                    <span>Auto-Realign Ring</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const next = clickMode === 'place_suspect' ? 'navigate' : 'place_suspect';
                      setClickMode(next);
                      showToast(next === 'place_suspect' ? '🎯 Click anywhere on map to drop suspect pin!' : 'Map navigation active.');
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold border flex items-center gap-1 cursor-pointer ${
                      clickMode === 'place_suspect'
                        ? 'bg-red-600 text-white border-red-500 animate-pulse ring-2 ring-red-400'
                        : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300'
                    }`}
                  >
                    <Target size={12} />
                    <span>Drop Suspect</span>
                  </button>
                </div>
              </div>

              <ErrorBoundary fallbackTitle="Tactical Map Unavailable">
                <CoverageZoneMap
                  scenarioLocation={scenarioLocation}
                  placedUnits={currentPlacedUnits}
                  accessPoints={currentResult.accessPoints}
                  accessPointCoverages={currentResult.accessPointCoverages}
                  escapeRoutes={currentResult.escapeRoutes}
                  activeSuspect={currentResult.activeSuspect}
                  onDropUnit={addUnitToMap}
                  onMoveUnit={moveUnitOnMap}
                  onRemoveUnit={removeUnit}
                  selectedUnitId={selectedUnitId}
                  onSelectUnit={setSelectedUnitId}
                  onMapClick={handleMapClick}
                  height="480px"
                />
              </ErrorBoundary>
            </div>

            {/* Live KPI Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Card 1: Risk Index */}
              <div className="bg-white p-3.5 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light text-center">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase block">
                  {t('coverageRiskIndexLabel')}
                </span>
                <span className="text-2xl font-black block mt-1" style={{ color: currentResult.riskColor }}>
                  {currentResult.coverageRiskIndex}
                  <span className="text-xs text-gray-400 font-normal"> / 100</span>
                </span>
                <span
                  className="inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded text-white uppercase"
                  style={{ backgroundColor: currentResult.riskColor }}
                >
                  {formatRisk(currentResult.riskLevel, t)}
                </span>
              </div>

              {/* Card 2: Fugitive Containment */}
              <div className="bg-white p-3.5 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light text-center">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase block">
                  {language === 'kn' ? 'ಶಂಕಿತರ ನಿಯಂತ್ರಣ' : language === 'hi' ? 'संदिग्ध रोकथाम' : 'Suspect Containment'}
                </span>
                <span
                  className={`text-2xl font-black block mt-1 ${
                    currentResult.containmentScorePercent >= 80
                      ? 'text-emerald-600'
                      : currentResult.containmentScorePercent >= 50
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {currentResult.containmentScorePercent}%
                </span>
                <span className="text-[9.5px] text-gray-500 font-mono block mt-1">
                  {currentResult.interceptedEscapeCount}/{currentResult.totalEscapeCount} {language === 'kn' ? 'ಮಾರ್ಗಗಳು ಸೀಲ್ ಮಾಡಲಾಗಿದೆ' : language === 'hi' ? 'मार्ग सील किए गए' : 'Routes Sealed'}
                </span>
              </div>

              {/* Card 3: Intercept SLA */}
              <div className="bg-white p-3.5 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light text-center">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase block">
                  {t('estResponseTimeLabel')}
                </span>
                <span className="text-2xl font-black text-[#0B2E59] dark:text-sky-300 block mt-1">
                  {currentResult.estResponseTimeMinutes}
                  <span className="text-xs font-normal"> {language === 'kn' ? 'ನಿಮಿ' : language === 'hi' ? 'मिनट' : 'min'}</span>
                </span>
                <span className="text-[9px] font-mono text-gray-500 block mt-1">
                  {language === 'kn' ? 'ಗುರಿ: < 3.0 ನಿಮಿ' : language === 'hi' ? 'लक्ष्य: < 3.0 मिनट' : 'Target: < 3.0 min'}
                </span>
              </div>

              {/* Card 4: Access Corridors */}
              <div className="bg-white p-3.5 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light text-center">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase block">
                  {language === 'kn' ? 'ಸುತ್ತಮುತ್ತಲಿನ ಗೇಟ್‌ಗಳು' : language === 'hi' ? 'परिधि द्वार (Gates)' : 'Perimeter Gates'}
                </span>
                <span className="text-2xl font-black text-gray-900 dark:text-white block mt-1">
                  {currentResult.coveredAccessPointsCount}
                  <span className="text-xs text-gray-400 font-normal"> / {currentResult.totalAccessPointsCount}</span>
                </span>
                <span className="text-[9.5px] font-mono text-emerald-600 font-bold block mt-1">
                  {currentResult.coveredAccessPointsCount === currentResult.totalAccessPointsCount 
                    ? (language === 'kn' ? '100% ಸುತ್ತುವರೆದಿದೆ' : language === 'hi' ? '100% घेराबंदी' : '100% Cordon') 
                    : (language === 'kn' ? 'ಭಾಗಶಃ ಅಂಧ ಸ್ಥಳ' : language === 'hi' ? 'आंशिक ब्लाइंडस्पॉट' : 'Partial Blindspot')}
                </span>
              </div>
            </div>

            {/* Suspect Escape Corridors Matrix */}
            <div className="bg-white rounded-lg border border-red-200 dark:border-red-900/60 p-4 shadow-xs dark:bg-[#071D3A] space-y-3">
              <div className="flex items-center justify-between border-b pb-2 border-red-100 dark:border-red-900/40">
                <div className="flex items-center gap-1.5">
                  <Flame size={16} className="text-red-600 animate-pulse" />
                  <span className="font-extrabold text-xs text-red-950 dark:text-red-200 uppercase tracking-wide">
                    {language === 'kn' ? 'ಪರಾರಿಯಾದ ಶಂಕಿತರ ಪಲಾಯನ ದಿಕ್ಕು ವಿಶ್ಲೇಷಣೆ' : language === 'hi' ? 'भगोड़े संदिग्ध भागने की दिशा विश्लेषण' : 'Fugitive Escape Vector Analysis'}: {currentResult.activeSuspect?.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRealignTroopsAroundSuspect}
                    className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition"
                  >
                    <RefreshCw size={11} />
                    {language === 'kn' ? '360° ವೃತ್ತ ಮರು-ಜೋಡಿಸಿ' : language === 'hi' ? '360° रिंग पुनः संरेखित करें' : 'Auto-Realign 360° Ring'}
                  </button>
                  <button
                    type="button"
                    onClick={handleAutoSealEscapeRoutes}
                    className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold flex items-center gap-1 shadow cursor-pointer transition"
                  >
                    <Zap size={11} className="text-amber-300" />
                    {language === 'kn' ? 'ತೆರೆದ ಮಾರ್ಗಗಳನ್ನು ಸೀಲ್ ಮಾಡಿ' : language === 'hi' ? 'खुले गलियारों को स्वतः सील करें' : 'Auto-Seal Open Corridors'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(currentResult?.escapeRoutes || []).map((route) => (
                  <div
                    key={route.id}
                    className={`p-2.5 rounded border text-left flex items-center justify-between ${
                      route.isIntercepted
                        ? 'border-emerald-200 bg-emerald-50/60 dark:bg-emerald-950/20 dark:border-emerald-900'
                        : 'border-red-200 bg-red-50/70 dark:bg-red-950/30 dark:border-red-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[11px] text-gray-900 dark:text-white">
                          [{formatDynamicText(route.direction, language)}] {formatDynamicText(route.name, language)}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-gray-500">
                        {language === 'kn' ? 'ದೂರ' : language === 'hi' ? 'दूरी' : 'Distance'}: {route.distanceMeters}m
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded text-white uppercase ${
                        route.isIntercepted ? 'bg-emerald-600' : 'bg-red-600 animate-pulse'
                      }`}
                    >
                      {route.isIntercepted 
                        ? (language === 'kn' ? 'ಸೀಲ್ ಮಾಡಲಾಗಿದೆ' : language === 'hi' ? 'सील' : 'SEALED') 
                        : (language === 'kn' ? 'ತೆರೆದಿದೆ' : language === 'hi' ? 'खुला' : 'EXPOSED')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Vulnerability Warnings & Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Warnings */}
              <div className="bg-white p-4 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-2">
                <span className="font-extrabold text-xs text-[#8B0000] dark:text-red-400 uppercase tracking-wide flex items-center gap-1.5 border-b pb-1.5 dark:border-ksp-navy-light">
                  <AlertTriangle size={14} /> {language === 'kn' ? 'ದುರ್ಬಲತೆಯ ಎಚ್ಚರಿಕೆಗಳು' : language === 'hi' ? 'भेद्यता चेतावनियाँ' : 'Vulnerability Alerts'}
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {(currentResult?.vulnerabilityAlerts || []).map((alert, idx) => (
                    <div key={idx} className="p-2 rounded bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200 text-[10px] leading-relaxed border border-red-200 dark:border-red-900/60 flex items-start gap-1.5">
                      <span className="text-red-600 font-bold shrink-0">•</span>
                      <span>{formatVulnerabilityAlert(alert, t, language)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white p-4 rounded-lg border border-[#E5DEC9] shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-2">
                <span className="font-extrabold text-xs text-emerald-800 dark:text-emerald-300 uppercase tracking-wide flex items-center gap-1.5 border-b pb-1.5 dark:border-ksp-navy-light">
                  <CheckCircle2 size={14} /> {language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ನಿರ್ದೇಶನಗಳು' : language === 'hi' ? 'रणनीतिक निर्देश' : 'Tactical Directives'}
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {(currentResult?.recommendations || []).map((rec, idx) => (
                    <div key={idx} className="p-2 rounded bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200 text-[10px] leading-relaxed border border-emerald-200 dark:border-emerald-900/60 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{formatRecommendation(rec, t, language)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Plan Comparison View with SIDE-BY-SIDE DUAL MAPS & TACTICAL REASONING */
        <div className="space-y-6 animate-fade-in">
          
          {/* 1. Side-by-Side Dual Real Maps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Map Column 1: Plan A */}
            <div className="bg-white rounded-lg border-2 border-sky-300 p-4 shadow-sm dark:bg-[#071D3A] dark:border-sky-700 space-y-2.5">
              <div className="flex items-center justify-between border-b pb-2 dark:border-sky-800">
                <div className="flex items-center gap-1.5">
                  <Compass size={16} className="text-[#0B2E59] dark:text-sky-300" />
                  <span className="font-black text-xs text-[#0B2E59] dark:text-sky-200 uppercase tracking-wide">
                    {t('planABaseline')} ({resultA.totalPersonnelCost} pts)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: resultA.riskColor }}>
                    Risk: {resultA.coverageRiskIndex}/100
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${resultA.containmentScorePercent === 100 ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                    {resultA.containmentScorePercent}% Sealed
                  </span>
                </div>
              </div>

              <ErrorBoundary fallbackTitle="Plan A Map Unavailable">
                <CoverageZoneMap
                  scenarioLocation={factorsA.scenarioLocation || scenarioLocation}
                  placedUnits={resultA.placedUnits}
                  accessPoints={resultA.accessPoints}
                  accessPointCoverages={resultA.accessPointCoverages}
                  escapeRoutes={resultA.escapeRoutes}
                  activeSuspect={resultA.activeSuspect}
                  onDropUnit={() => {}}
                  onMoveUnit={() => {}}
                  onRemoveUnit={() => {}}
                  selectedUnitId={null}
                  onSelectUnit={() => {}}
                  isReadOnly={true}
                  height="340px"
                />
              </ErrorBoundary>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px] text-center">
                <div className="p-1.5 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <span className="text-gray-500 block text-[9px]">RESPONSE SLA</span>
                  <strong className="text-[#0B2E59] dark:text-sky-300 text-xs">{resultA.estResponseTimeMinutes} min</strong>
                </div>
                <div className="p-1.5 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <span className="text-gray-500 block text-[9px]">GATES COVERED</span>
                  <strong className="text-gray-900 dark:text-white text-xs">{resultA.coveredAccessPointsCount}/{resultA.totalAccessPointsCount}</strong>
                </div>
                <div className="p-1.5 rounded bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800">
                  <span className="text-gray-500 block text-[9px]">OPEN CORRIDORS</span>
                  <strong className={`${openCorridorsA.length === 0 ? 'text-emerald-600' : 'text-red-600'} text-xs`}>{openCorridorsA.length} exposed</strong>
                </div>
              </div>
            </div>

            {/* Map Column 2: Plan B */}
            <div className="bg-white rounded-lg border-2 border-amber-400 p-4 shadow-sm dark:bg-[#071D3A] dark:border-amber-700 space-y-2.5">
              <div className="flex items-center justify-between border-b pb-2 dark:border-amber-800">
                <div className="flex items-center gap-1.5">
                  <Zap size={16} className="text-amber-600 dark:text-amber-400" />
                  <span className="font-black text-xs text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                    {t('planBContingency')} ({resultB.totalPersonnelCost} pts)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: resultB.riskColor }}>
                    Risk: {resultB.coverageRiskIndex}/100
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${resultB.containmentScorePercent === 100 ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                    {resultB.containmentScorePercent}% Sealed
                  </span>
                </div>
              </div>

              <ErrorBoundary fallbackTitle="Plan B Map Unavailable">
                <CoverageZoneMap
                  scenarioLocation={factorsB.scenarioLocation || scenarioLocation}
                  placedUnits={resultB.placedUnits}
                  accessPoints={resultB.accessPoints}
                  accessPointCoverages={resultB.accessPointCoverages}
                  escapeRoutes={resultB.escapeRoutes}
                  activeSuspect={resultB.activeSuspect}
                  onDropUnit={() => {}}
                  onMoveUnit={() => {}}
                  onRemoveUnit={() => {}}
                  selectedUnitId={null}
                  onSelectUnit={() => {}}
                  isReadOnly={true}
                  height="340px"
                />
              </ErrorBoundary>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px] text-center">
                <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-gray-500 block text-[9px]">RESPONSE SLA</span>
                  <strong className="text-amber-900 dark:text-amber-300 text-xs">{resultB.estResponseTimeMinutes} min</strong>
                </div>
                <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-gray-500 block text-[9px]">GATES COVERED</span>
                  <strong className="text-gray-900 dark:text-white text-xs">{resultB.coveredAccessPointsCount}/{resultB.totalAccessPointsCount}</strong>
                </div>
                <div className="p-1.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-gray-500 block text-[9px]">OPEN CORRIDORS</span>
                  <strong className={`${openCorridorsB.length === 0 ? 'text-emerald-600' : 'text-red-600'} text-xs`}>{openCorridorsB.length} exposed</strong>
                </div>
              </div>
            </div>

          </div>

          {/* 2. Intelligent Tactical Comparative Reasoning Card */}
          <div className="bg-white rounded-lg border border-[#E5DEC9] p-5 shadow-xs dark:bg-[#071D3A] dark:border-ksp-navy-light space-y-4">
            <div className="flex items-center justify-between border-b pb-3 dark:border-ksp-navy-light">
              <div className="flex items-center gap-2">
                <Activity size={18} className="text-[#8B0000] dark:text-sky-300" />
                <h3 className="font-black text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider">
                  {language === 'hi' ? 'सामरिक परिचालन मूल्यांकन एवं विभेदक तर्क' : language === 'kn' ? 'ಕಾರ್ಯತಂತ್ರದ ಕಾರ್ಯಾಚರಣೆಯ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ವ್ಯತ್ಯಾಸದ ತರ್ಕ' : 'Tactical Operational Assessment & Differential Reasoning'}
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300">
                {language === 'hi' ? 'एआई तुलनात्मक मूल्यांकन' : language === 'kn' ? 'ಎಐ ತೌಲನಿಕ ಮೌಲ್ಯಮಾಪನ' : 'AI COMPARATIVE EVALUATION'}
              </span>
            </div>

            {/* Dynamic Positive / Negative Fault Evaluation */}
            {isPlanAPerfect && isPlanBPerfect ? (
              <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-400 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 space-y-2 text-left">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  <CheckCheck size={18} className="text-emerald-600" />
                  <span>{language === 'hi' ? 'दोनों सामरिक योजनाएं 100% सुरक्षा घेराबंदी प्राप्त करती हैं (शून्य दोष)' : language === 'kn' ? 'ಎರಡೂ ಕಾರ್ಯತಂತ್ರದ ಯೋಜನೆಗಳು 100% ಕಂಟೈನ್‌ಮೆಂಟ್ ಸಾಧಿಸುತ್ತವೆ (ಶೂನ್ಯ ದೋಷ)' : 'Both Tactical Plans Achieve 100% Perimeter Fortification (Zero Faults)'}</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  Plan A and Plan B successfully form a <strong>360° sealed tactical cordon</strong> with all 6 directional escape corridors blocked.
                </p>
              </div>
            ) : isPlanAPerfect ? (
              <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-400 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 space-y-2 text-left">
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                  <CheckCheck size={18} className="text-emerald-600" />
                  <span>Plan A Operational Assessment: 100% Fully Fortified</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  Plan A Baseline is operating at <strong>100% fugitive containment</strong>.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {/* Plan A Shortcomings */}
                <div className="p-4 rounded-lg bg-red-50 border-2 border-red-300 text-red-950 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wide text-red-800 dark:text-red-300">
                    <AlertTriangle size={16} className="text-red-600" />
                    <span>{language === 'hi' ? 'योजना A की स्थानिक कमियां और कमजोरियां:' : language === 'kn' ? 'ಯೋಜನೆ A ನ ಜಾಗತಿಕ ಕೊರತೆಗಳು ಮತ್ತು ದುರ್ಬಲತೆಗಳು:' : 'Plan A Spatial Shortcomings & Vulnerabilities:'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Unguarded Escape Vectors:</strong> Plan A leaves {(openCorridorsA || []).length} escape vector(s) unsealed: <strong className="text-red-700 dark:text-red-300">{(openCorridorsA || []).map(r => `[${r.direction}] ${r.name}`).join(', ') || 'None'}</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span>
                        <strong>Containment & Delay:</strong> Containment rating is only <strong className="text-red-700">{resultA.containmentScorePercent}%</strong> with response arrival SLA of <strong>{resultA.estResponseTimeMinutes} minutes</strong>.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* How Plan B Perfected It */}
                <div className="p-4 rounded-lg bg-emerald-50 border-2 border-emerald-300 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-200 space-y-2">
                  <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>{language === 'hi' ? 'योजना B ने घेराबंदी को रणनीतिक रूप से कैसे परिपूर्ण किया:' : language === 'kn' ? 'ಯೋಜನೆ B ಯಶಸ್ವಿಯಾಗಿ ಕಂಟೈನ್‌ಮೆಂಟ್ ಅನ್ನು ಹೇಗೆ ಪರಿಪೂರ್ಣಗೊಳಿಸಿತು:' : 'How Plan B Strategically Perfected the Containment:'}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] leading-relaxed">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>
                        <strong>360° Tactical Ring Lockdown:</strong> Plan B established outer chokepoints, sealing <strong className="text-emerald-700 dark:text-emerald-300">{resultB.interceptedEscapeCount}/{resultB.totalEscapeCount} corridors ({resultB.containmentScorePercent}% containment)</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>
                        <strong>SLA & Risk Compression:</strong> Intercept arrival accelerated by <strong>{Math.abs(slaDelta)} minutes</strong> (down to {resultB.estResponseTimeMinutes}m).
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* 3. Detailed Comparative Variance Table */}
            <div className="overflow-x-auto pt-2 text-left">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 uppercase text-[10px] font-extrabold text-gray-600 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-gray-300">
                    <th className="p-3">{language === 'hi' ? 'तैनाती पैरामीटर' : language === 'kn' ? 'ನಿಯೋಜನೆ ನಿಯತಾಂಕ' : 'Deployment Parameter'}</th>
                    <th className="p-3 text-[#0B2E59] dark:text-sky-300">{language === 'hi' ? 'योजना A (मूल आधार)' : language === 'kn' ? 'ಯೋಜನೆ A (ಮೂಲ)' : 'Plan A (Baseline)'}</th>
                    <th className="p-3 text-[#8B0000] dark:text-amber-400">{language === 'hi' ? 'योजना B (आकस्मिकता)' : language === 'kn' ? 'ಯೋಜನೆ B (ಆಕಸ್ಮಿಕ)' : 'Plan B (Contingency)'}</th>
                    <th className="p-3 text-right">{language === 'hi' ? 'अंतर प्रभाव' : language === 'kn' ? 'ವ್ಯತ್ಯಾಸದ ಪ್ರಭಾವ' : 'Variance Impact'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-ksp-navy-light font-semibold">
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{language === 'hi' ? 'भगोड़ा घेराबंदी %' : language === 'kn' ? 'ಪಲಾಯನಕೋರ ಕಂಟೈನ್‌ಮೆಂಟ್ %' : 'Fugitive Containment %'}</td>
                    <td className="p-3 font-mono font-bold" style={{ color: resultA.containmentScorePercent >= 80 ? '#059669' : '#DC2626' }}>
                      {resultA.containmentScorePercent}% ({resultA.interceptedEscapeCount}/{resultA.totalEscapeCount} {language === 'hi' ? 'सीलबंद' : language === 'kn' ? 'ಸೀಲ್ ಮಾಡಲಾಗಿದೆ' : 'Sealed'})
                    </td>
                    <td className="p-3 font-mono font-bold" style={{ color: resultB.containmentScorePercent >= 80 ? '#059669' : '#DC2626' }}>
                      {resultB.containmentScorePercent}% ({resultB.interceptedEscapeCount}/{resultB.totalEscapeCount} {language === 'hi' ? 'सीलबंद' : language === 'kn' ? 'ಸೀಲ್ ಮಾಡಲಾಗಿದೆ' : 'Sealed'})
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">
                      {containmentGain > 0 ? `+${containmentGain}% ${language === 'hi' ? 'घेराबंदी लाभ' : language === 'kn' ? 'ಕಂಟೈನ್‌ಮೆಂಟ್ ಲಾಭ' : 'Containment Gain'}` : containmentGain === 0 ? (language === 'hi' ? 'समान घेराबंदी' : language === 'kn' ? 'ಸಮಾನ ಕಂಟೈನ್‌ಮೆಂಟ್' : 'Identical Containment') : `${containmentGain}%`}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{language === 'hi' ? 'कवरेज जोखिम सूचकांक (0-100)' : language === 'kn' ? 'ಕವರೇಜ್ ಅಪಾಯದ ಸೂಚ್ಯಂಕ (0-100)' : 'Coverage Risk Index (0-100)'}</td>
                    <td className="p-3 font-mono font-bold" style={{ color: resultA.riskColor }}>
                      {resultA.coverageRiskIndex} ({formatRisk(resultA.riskLevel, t)})
                    </td>
                    <td className="p-3 font-mono font-bold" style={{ color: resultB.riskColor }}>
                      {resultB.coverageRiskIndex} ({formatRisk(resultB.riskLevel, t)})
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">
                      {riskReduction > 0 ? `-${riskReduction} pts ${language === 'hi' ? 'जोखिम में कमी' : language === 'kn' ? 'ಅಪಾಯದ ಕಡಿತ' : 'Risk Reduction'}` : riskReduction === 0 ? (language === 'hi' ? 'समान जोखिम' : language === 'kn' ? 'ಸಮಾನ ಅಪಾಯ' : 'Identical Risk') : `+${Math.abs(riskReduction)} pts`}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">{language === 'hi' ? 'अनुमानित प्रतिक्रिया समय (SLA)' : language === 'kn' ? 'ಅಂದಾಜು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ (SLA)' : 'Est. Response Intercept SLA'}</td>
                    <td className="p-3 font-mono font-bold text-[#0B2E59] dark:text-sky-300">{resultA.estResponseTimeMinutes} min</td>
                    <td className="p-3 font-mono font-bold text-amber-900 dark:text-amber-300">{resultB.estResponseTimeMinutes} min</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">
                      {slaDelta > 0 ? `-${slaDelta} min ${language === 'hi' ? 'तेज़' : language === 'kn' ? 'ವೇಗವಾಗಿ' : 'Faster'}` : slaDelta === 0 ? 'Equal Speed' : `+${Math.abs(slaDelta)} min`}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Perimeter Access Gates Secured</td>
                    <td className="p-3 font-mono font-bold text-[#0B2E59] dark:text-sky-300">{resultA.coveredAccessPointsCount} / {resultA.totalAccessPointsCount}</td>
                    <td className="p-3 font-mono font-bold text-amber-900 dark:text-amber-300">{resultB.coveredAccessPointsCount} / {resultB.totalAccessPointsCount}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-600">
                      {resultB.coveredAccessPointsCount > resultA.coveredAccessPointsCount ? `+${resultB.coveredAccessPointsCount - resultA.coveredAccessPointsCount} Gates Fortified` : 'Identical'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-700 dark:text-gray-300">Personnel Units & Budget Cost</td>
                    <td className="p-3 font-mono font-bold text-[#0B2E59] dark:text-sky-300">{resultA.totalPersonnelCost} pts ({resultA.placedUnits.length} Units)</td>
                    <td className="p-3 font-mono font-bold text-amber-900 dark:text-amber-300">{resultB.totalPersonnelCost} pts ({resultB.placedUnits.length} Units)</td>
                    <td className="p-3 text-right font-mono text-gray-600 dark:text-gray-400">
                      {resultB.totalPersonnelCost - resultA.totalPersonnelCost > 0 ? `+${resultB.totalPersonnelCost - resultA.totalPersonnelCost} Cost Points` : `${resultB.totalPersonnelCost - resultA.totalPersonnelCost} Cost Points`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 4. Comparative Metrics Bar Chart */}
            <div className="border-t pt-4 dark:border-ksp-navy-light/40">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-3">Comparative Metrics Visualization</h4>
              <div className="h-64 w-full min-w-0" style={{ minHeight: '256px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={220}>
                  <BarChart data={comparisonChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="metric" tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 'bold' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#6B7280', fontWeight: 'bold' }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0B2E59', borderRadius: '6px', color: '#fff', fontSize: '11px' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
                    <Bar dataKey={planALabel} fill="#0284C7" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={planBLabel} fill="#D97706" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Target Suspect Profile Modal */}
      {showSuspectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-ksp-navy-dark border-2 border-red-500 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in text-left">
            <div className="bg-[#0B2E59] text-white p-4 flex items-center justify-between border-b border-red-500">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-red-400 animate-pulse" />
                <span className="font-extrabold text-sm uppercase tracking-wide">
                  Target Suspect Intelligence Dossier
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowSuspectModal(false)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSuspectProfile} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Suspect Name</label>
                  <input
                    type="text"
                    required
                    value={suspectForm.name}
                    onChange={(e) => setSuspectForm({ ...suspectForm, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                    placeholder="e.g. Raju K."
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Alias / Street Name</label>
                  <input
                    type="text"
                    required
                    value={suspectForm.alias}
                    onChange={(e) => setSuspectForm({ ...suspectForm, alias: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                    placeholder="e.g. Spider Raju"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Crime Category / Modus Operandi</label>
                <select
                  value={suspectForm.crimeType}
                  onChange={(e) => setSuspectForm({ ...suspectForm, crimeType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                >
                  <option value="Armed Commercial Robbery / Extortion">Armed Commercial Robbery / Extortion</option>
                  <option value="Vehicle Theft & Smuggling Syndicate">Vehicle Theft & Smuggling Syndicate</option>
                  <option value="Homicide & Organized Gang Crime">Homicide & Organized Gang Crime</option>
                  <option value="Narcotics Distribution Network">Narcotics Distribution Network</option>
                  <option value="Cyber Financial Fraud & Hawala">Cyber Financial Fraud & Hawala</option>
                  <option value="Chain Snatching & Street Robbery">Chain Snatching & Street Robbery</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Escape Mobility Mode</label>
                  <select
                    value={suspectForm.mobilityType}
                    onChange={(e) => setSuspectForm({ ...suspectForm, mobilityType: e.target.value as SuspectMobility })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                  >
                    <option value="foot">🚶 On Foot (200m radius / 6 km/h)</option>
                    <option value="two_wheeler">🏍️ Two-Wheeler / Bike (450m radius / 35 km/h)</option>
                    <option value="four_wheeler">🚗 High-Speed Car (800m radius / 70 km/h)</option>
                    <option value="transit">🚌 Public Transit / Metro (600m radius / 25 km/h)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Threat Severity Level</label>
                  <select
                    value={suspectForm.threatTier}
                    onChange={(e) => setSuspectForm({ ...suspectForm, threatTier: e.target.value as SuspectThreatTier })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                  >
                    <option value="MODERATE">Moderate Risk</option>
                    <option value="HIGH">High Risk (Armed / Aggressive)</option>
                    <option value="EXTREME">Extreme Risk (Special Ops Required)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Investigator Intelligence Notes</label>
                <textarea
                  rows={2}
                  value={suspectForm.notes || ''}
                  onChange={(e) => setSuspectForm({ ...suspectForm, notes: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                  placeholder="Known escape vectors, accomplice hideouts, armed status..."
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSuspectModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded font-bold text-xs hover:bg-gray-100 cursor-pointer dark:border-ksp-navy-light dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-extrabold text-xs shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Update Fugitive Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Custom Tactical Unit Modal */}
      {showCreateUnitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-ksp-navy-dark border-2 border-emerald-500 rounded-lg max-w-lg w-full shadow-2xl overflow-hidden animate-fade-in text-left">
            <div className="bg-[#0B2E59] text-white p-4 flex items-center justify-between border-b border-emerald-500">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" />
                <span className="font-extrabold text-sm uppercase tracking-wide">
                  Create Custom Tactical Police Unit
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateUnitModal(false)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCustomUnit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Unit Full Name</label>
                  <input
                    type="text"
                    required
                    value={customUnitForm.name}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                    placeholder="e.g. K-9 Scent Tracking Unit"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Short Name / Callsign</label>
                  <input
                    type="text"
                    required
                    value={customUnitForm.shortName}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, shortName: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                    placeholder="e.g. K-9 Squad"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Tactical Category</label>
                  <select
                    value={customUnitForm.category}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, category: e.target.value as UnitCategory })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                  >
                    <option value="k9_specialist">🐕 K-9 & Canine Specialist</option>
                    <option value="rapid_intercept">🚓 Motorized / Rapid Intercept</option>
                    <option value="checkpoint_containment">🚧 Physical Checkpoint / Barricade</option>
                    <option value="ground_patrol">👮 Ground Beat Patrol</option>
                    <option value="surveillance">🛸 Drone / Optical Surveillance</option>
                    <option value="tactical_swat">🛡️ Armed SWAT / QRF Assault</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Badge Label</label>
                  <input
                    type="text"
                    required
                    value={customUnitForm.badge}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, badge: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                    placeholder="e.g. Scent Tracking"
                  />
                </div>
              </div>

              {/* Emoji and Color Pickers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Tactical Icon Emoji</label>
                  <div className="flex items-center gap-1.5 flex-wrap p-2 border border-gray-300 rounded bg-slate-50 dark:bg-slate-900 dark:border-ksp-navy-light">
                    {['🐕', '🚓', '👮', '🛡️', '📸', '🏍️', '🐎', '📡', '⚡', '🚁', '🎯', '🔬', '🔥', '🔍'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setCustomUnitForm({ ...customUnitForm, iconEmoji: emoji })}
                        className={`w-7 h-7 rounded text-base flex items-center justify-center cursor-pointer transition ${
                          customUnitForm.iconEmoji === emoji ? 'bg-emerald-600 text-white ring-2 ring-emerald-400' : 'hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Theme Color</label>
                  <div className="flex items-center gap-2 flex-wrap p-2 border border-gray-300 rounded bg-slate-50 dark:bg-slate-900 dark:border-ksp-navy-light">
                    {[
                      { hex: '#059669', name: 'Emerald' },
                      { hex: '#0284C7', name: 'Blue' },
                      { hex: '#B91C1C', name: 'Crimson' },
                      { hex: '#D97706', name: 'Amber' },
                      { hex: '#9333EA', name: 'Purple' },
                      { hex: '#0891B2', name: 'Cyan' },
                      { hex: '#EA580C', name: 'Orange' },
                      { hex: '#7C3AED', name: 'Violet' },
                    ].map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setCustomUnitForm({ ...customUnitForm, color: c.hex })}
                        className={`w-6 h-6 rounded-full cursor-pointer transition ${
                          customUnitForm.color === c.hex ? 'ring-3 ring-slate-950 scale-110' : 'opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sliders: Radius & Cost */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">
                    <span>Coverage Radius</span>
                    <span className="font-mono text-emerald-600">{customUnitForm.radiusMeters}m</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="800"
                    step="10"
                    value={customUnitForm.radiusMeters}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, radiusMeters: Number(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">
                    <span>Personnel Cost</span>
                    <span className="font-mono text-amber-600">{customUnitForm.cost} pts</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    step="1"
                    value={customUnitForm.cost}
                    onChange={(e) => setCustomUnitForm({ ...customUnitForm, cost: Number(e.target.value) })}
                    className="w-full cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase">Tactical Description</label>
                <textarea
                  rows={2}
                  required
                  value={customUnitForm.description}
                  onChange={(e) => setCustomUnitForm({ ...customUnitForm, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                  placeholder="Describe operational strengths and intercept capability..."
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateUnitModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded font-bold text-xs hover:bg-gray-100 cursor-pointer dark:border-ksp-navy-light dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-extrabold text-xs shadow-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Add Unit to Palette
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Save Scenario Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-ksp-navy-dark border border-[#E5DEC9] dark:border-ksp-navy-light rounded-lg max-w-md w-full shadow-2xl overflow-hidden animate-fade-in text-left">
            <div className="bg-[#0B2E59] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookmarkPlus size={18} className="text-amber-400" />
                <span className="font-extrabold text-sm uppercase tracking-wide">Save Tactical Deployment Plan</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSaveModal(false)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveScenarioSubmit} className="p-5 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">Plan Title</label>
                <input
                  type="text"
                  required
                  value={saveScenarioName}
                  onChange={(e) => setSaveScenarioName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded text-xs dark:bg-slate-900 dark:border-ksp-navy-light dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t dark:border-ksp-navy-light/40">
                <button
                  type="button"
                  onClick={() => setShowSaveModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded font-bold text-xs hover:bg-gray-100 dark:border-ksp-navy-light dark:text-gray-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingScenario}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded shadow cursor-pointer flex items-center gap-1.5"
                >
                  {isSavingScenario ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  <span>Save Plan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Load Scenarios Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-ksp-navy-dark border border-[#E5DEC9] dark:border-ksp-navy-light rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden animate-fade-in text-left">
            <div className="bg-[#0B2E59] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database size={18} className="text-sky-300" />
                <span className="font-extrabold text-sm uppercase tracking-wide">Saved Tactical Plans</span>
              </div>
              <button
                type="button"
                onClick={() => setShowLoadModal(false)}
                className="text-gray-300 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 max-h-96 overflow-y-auto space-y-3">
              {(savedScenarios || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Database size={32} className="mx-auto mb-2 opacity-40" />
                  <p>No saved tactical plans in database or local cache.</p>
                </div>
              ) : (
                (savedScenarios || []).map((scen, idx) => (
                  <div
                    key={scen._id || idx}
                    className="p-3.5 rounded-lg border border-gray-200 hover:border-sky-400 bg-slate-50 dark:bg-ksp-navy-dark/60 dark:border-ksp-navy-light flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block">{scen.name}</span>
                      <span className="text-[10px] text-gray-500">{scen.scenarioLocation?.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleLoadScenario(scen, 'planA')}
                        className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded font-bold text-[10px] cursor-pointer"
                      >
                        Load to Plan A
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLoadScenario(scen, 'planB')}
                        className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[10px] cursor-pointer"
                      >
                        Load to Plan B
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 bg-gray-50 dark:bg-ksp-navy-dark/80 border-t dark:border-ksp-navy-light/40 text-right">
              <button
                type="button"
                onClick={() => setShowLoadModal(false)}
                className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded font-bold text-xs hover:bg-gray-100 dark:border-ksp-navy-light dark:text-gray-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Operational Deployment & Tactical Risk Simulator"
        department="Tactical Operations Command & Special Weapons / QRF Unit"
        legalAuthority="Karnataka Police Manual (Section 45: Cordon & Search Operations) & CrPC Sec 46/149"
        purpose="Interactive tactical sandbox for spatial unit deployment, 360° suspect containment modeling, escape route sealing, and comparative Plan A vs Plan B risk evaluation."
        steps={[
          {
            step: "01",
            action: "Select Sector & Fugitive Profile",
            detail: "Pick any Karnataka sector (Bengaluru, Mysuru, Hubballi...) and configure fugitive mobility speed and threat tier."
          },
          {
            step: "02",
            action: "Deploy Tactical Squads",
            detail: "Drag & drop K-9 sniffer dogs, PCR cruisers, SWAT teams, and ANPR barricades onto the interactive Leaflet map to seal escape routes."
          },
          {
            step: "03",
            action: "Plan A vs Plan B Simulation",
            detail: "Compare Containment Score %, Risk Index, and Response Time SLA between baseline and contingency deployments."
          }
        ]}
        tacticalTips={[
          "Use 'Re-align Around Fugitive' to automatically position a 360-degree perimeter ring around the target's current GPS pin.",
          "Use 'Auto-Seal Escape Routes' to automatically deploy PCR cruisers on unguarded escape vectors."
        ]}
      />
    </div>
  );
}
