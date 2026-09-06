export type CrowdDensity = 'low' | 'moderate' | 'high' | 'peak';
export type EnvironmentalCondition = 'clear' | 'rain' | 'low_visibility' | 'festival_overlap';
export type DeploymentPosture = 'visible_perimeter' | 'distributed_patrol' | 'checkpoint_focused';

export type UnitCategory = 'ground_patrol' | 'checkpoint_containment' | 'rapid_intercept' | 'surveillance' | 'k9_specialist' | 'tactical_swat' | 'custom';

export type UnitType =
  | 'patrol_team'
  | 'checkpoint_post'
  | 'mobile_response'
  | 'overwatch_post'
  | 'k9_unit'
  | 'qrf_swat'
  | 'anpr_smart_barricade'
  | 'traffic_bike_intercept'
  | 'mounted_police'
  | 'target_suspect'
  | string;

export type SuspectMobility = 'foot' | 'two_wheeler' | 'four_wheeler' | 'transit';
export type SuspectThreatTier = 'MODERATE' | 'HIGH' | 'EXTREME';

export interface SuspectProfile {
  id: string;
  name: string;
  alias: string;
  crimeType: string;
  threatTier: SuspectThreatTier;
  mobilityType: SuspectMobility;
  threatRadiusMeters: number;
  escapeSpeedKmph: number;
  notes?: string;
}

export interface EscapeRoute {
  id: string;
  name: string;
  direction: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTH_EAST' | 'SOUTH_WEST' | 'NORTH_WEST' | 'SOUTH_EAST';
  bearingDeg: number;
  startPoint: [number, number]; // [lat, lng] (suspect pos)
  endPoint: [number, number];   // [lat, lng] (perimeter exit)
  distanceMeters: number;
  isIntercepted: boolean;
  interceptedByUnitId?: string;
  interceptedByUnitType?: UnitType;
  interceptDistanceMeters?: number;
  threatRating: 'HIGH' | 'MEDIUM' | 'CRITICAL';
}

export interface ScenarioLocation {
  id: string;
  name: string;
  district: string;
  center: [number, number]; // [lat, lng]
  zoneRadiusMeters: number;
  isCustom?: boolean;
}

export interface PlacedUnit {
  id: string;
  type: UnitType;
  lat: number;
  lng: number;
  radiusMeters: number; // Real meter radius
  cost: number;
  label?: string;
  customIcon?: string;
  customColor?: string;
  suspectData?: SuspectProfile;
}

export interface UnitDefinition {
  type: UnitType;
  name: string;
  shortName: string;
  description: string;
  radiusMeters: number;
  cost: number;
  iconName: string;
  iconEmoji?: string;
  category: UnitCategory;
  color: string;
  accentColor: string;
  badge: string;
  tacticalRole: string;
  isSuspect?: boolean;
  isCustom?: boolean;
}

export const UNIT_CATALOG: Record<string, UnitDefinition> = {
  patrol_team: {
    type: 'patrol_team',
    name: 'Patrol Team (Beat Sweeping)',
    shortName: 'Patrol',
    description: 'Medium radius beat sweepers. Agile mobile presence for crowd corridor sweeps.',
    radiusMeters: 250,
    cost: 2,
    iconName: 'Users',
    iconEmoji: '👮',
    category: 'ground_patrol',
    color: '#0284C7', // Sky blue
    accentColor: '#0369A1',
    badge: 'Standard Beat',
    tacticalRole: 'General Sector Patrol',
  },
  checkpoint_post: {
    type: 'checkpoint_post',
    name: 'Checkpoint Post (Access Control)',
    shortName: 'Checkpoint',
    description: 'Stationary physical containment. Fortifies ingress and egress choke points (+3 security bonus).',
    radiusMeters: 150,
    cost: 3,
    iconName: 'Shield',
    iconEmoji: '🚧',
    category: 'checkpoint_containment',
    color: '#D97706', // Amber
    accentColor: '#B45309',
    badge: 'Choke Point Cordon',
    tacticalRole: 'Access Control & Screening',
  },
  mobile_response: {
    type: 'mobile_response',
    name: 'Mobile Response Vehicle (PCR Van)',
    shortName: 'PCR Van',
    description: 'Large radius motorized cruiser. Drastically accelerates emergency incident response (-0.45 min SLA).',
    radiusMeters: 400,
    cost: 4,
    iconName: 'Zap',
    iconEmoji: '🚓',
    category: 'rapid_intercept',
    color: '#DB2777', // Pink/Rose
    accentColor: '#BE185D',
    badge: 'Rapid Intercept',
    tacticalRole: 'Wide-Area Rapid Intercept',
  },
  overwatch_post: {
    type: 'overwatch_post',
    name: 'Drone Overwatch Post (Spotting Node)',
    shortName: 'Overwatch',
    description: 'Elevated optical spotting node. Mitigates weather, darkness, and fog detection blindness by up to 70%.',
    radiusMeters: 200,
    cost: 2,
    iconName: 'Radio',
    iconEmoji: '🛸',
    category: 'surveillance',
    color: '#9333EA', // Purple
    accentColor: '#7E22CE',
    badge: 'Telemetry & Spotting',
    tacticalRole: 'Visibility & Telemetry Boost',
  },
  k9_unit: {
    type: 'k9_unit',
    name: 'K-9 Sniffer & Tracking Canine Squad',
    shortName: 'K-9 Squad',
    description: 'Trained police scent-tracking dog unit. Excels in tracking fugitive scent trails through narrow alleys and dense crowds.',
    radiusMeters: 180,
    cost: 2,
    iconName: 'Dog',
    iconEmoji: '🐕',
    category: 'k9_specialist',
    color: '#059669', // Emerald
    accentColor: '#047857',
    badge: 'K-9 Scent Tracker',
    tacticalRole: 'Fugitive Tracking & Alley Sweeps',
  },
  qrf_swat: {
    type: 'qrf_swat',
    name: 'QRF Tactical Assault Squad (SWAT)',
    shortName: 'QRF Team',
    description: 'Special Weapons and Tactics assault unit. High-stopping-power cordon against armed or extreme-tier fugitives.',
    radiusMeters: 220,
    cost: 4,
    iconName: 'ShieldAlert',
    iconEmoji: '🛡️',
    category: 'tactical_swat',
    color: '#B91C1C', // Dark Crimson
    accentColor: '#991B1B',
    badge: 'Armed Tactical Team',
    tacticalRole: 'High-Threat Fugitive Neutralization',
  },
  anpr_smart_barricade: {
    type: 'anpr_smart_barricade',
    name: 'ANPR Smart Camera Barricade',
    shortName: 'ANPR Gate',
    description: 'Automated Number Plate Recognition with spike strips. Instantly flags and intercepts fleeing motor vehicles.',
    radiusMeters: 160,
    cost: 3,
    iconName: 'Camera',
    iconEmoji: '📸',
    category: 'checkpoint_containment',
    color: '#EA580C', // Orange
    accentColor: '#C2410C',
    badge: 'Smart Barricade',
    tacticalRole: 'Automated Vehicle Intercept',
  },
  traffic_bike_intercept: {
    type: 'traffic_bike_intercept',
    name: 'Traffic Interceptor Motorcycle Squad',
    shortName: 'Bike Pursuit',
    description: 'Twin high-agility motorcycle patrol. Weaves through traffic jams and tight alleys faster than 4-wheeler cruisers.',
    radiusMeters: 350,
    cost: 3,
    iconName: 'Bike',
    iconEmoji: '🏍️',
    category: 'rapid_intercept',
    color: '#0891B2', // Cyan
    accentColor: '#0E7490',
    badge: 'Motorbike Pursuit',
    tacticalRole: 'Congested Alley Pursuit',
  },
  mounted_police: {
    type: 'mounted_police',
    name: 'Mounted Police Cavalry Squad',
    shortName: 'Mounted Cavalry',
    description: 'Equine police cavalry. Provides elevated crowd visibility and psychological deterrence in markets and open grounds.',
    radiusMeters: 280,
    cost: 3,
    iconName: 'Award',
    iconEmoji: '🐎',
    category: 'ground_patrol',
    color: '#7C3AED', // Violet
    accentColor: '#6D28D9',
    badge: 'Mounted Cavalry',
    tacticalRole: 'High-Vantage Crowd Control',
  },
  target_suspect: {
    type: 'target_suspect',
    name: 'Target Suspect / Fugitive Pin',
    shortName: 'Suspect',
    description: 'High-Value Target pin. Dynamically calculates active escape routes and threat perimeter based on crime modus operandi.',
    radiusMeters: 300,
    cost: 0,
    iconName: 'Target',
    iconEmoji: '🎯',
    category: 'custom',
    color: '#DC2626', // Red
    accentColor: '#991B1B',
    badge: 'Fugitive Target',
    tacticalRole: 'Target Tracking & Containment',
    isSuspect: true,
  },
};

export interface AccessPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'entry' | 'exit' | 'checkpoint' | 'patrol_node';
  capacityStatus: 'nominal' | 'strained' | 'congested';
}

export interface UnitMarker {
  id: string;
  callsign: string;
  lat: number;
  lng: number;
  posture: DeploymentPosture;
  coverageRadiusMeters: number;
  type: UnitType;
}

export interface SimulationFactors {
  personnelCount?: number;
  crowdDensity: CrowdDensity;
  environmentalConditions?: EnvironmentalCondition;
  envCondition?: EnvironmentalCondition;
  posture: DeploymentPosture;
  placedUnits?: PlacedUnit[];
  scenarioLocation?: ScenarioLocation;
  activeSuspect?: SuspectProfile;
}

export interface AccessPointCoverage {
  pointId: string;
  name: string;
  isCovered: boolean;
  coveredByUnits: string[];
}

export interface SimulationResult {
  factors: SimulationFactors;
  scenarioLocation: ScenarioLocation;
  coverageRiskIndex: number;
  estResponseTimeMinutes: number;
  coverageIntegrityScore: number;
  riskLevel: 'LOW' | 'MODERATE' | 'ELEVATED' | 'CRITICAL';
  riskColor: string;
  vulnerabilityAlerts: string[];
  recommendations: string[];
  unitMarkers: UnitMarker[];
  accessPoints: AccessPoint[];
  placedUnits: PlacedUnit[];
  accessPointCoverages: AccessPointCoverage[];
  coveredAccessPointsCount: number;
  totalAccessPointsCount: number;
  totalPersonnelCost: number;
  budgetLimit: number;
  unitsBreakdown: Record<UnitType, number>;
  escapeRoutes: EscapeRoute[];
  interceptedEscapeCount: number;
  totalEscapeCount: number;
  containmentScorePercent: number;
  activeSuspect: SuspectProfile | null;
  timeToCordonMinutes: number;
  calculatedAt: string;
  serverSide?: boolean;
}

export const BUDGET_MIN = 4;
export const BUDGET_MAX = 30;

// All 31 Karnataka Districts and Key Hubs Database
export const KARNATAKA_DISTRICTS_DATABASE: Record<string, ScenarioLocation> = {
  kr_market: {
    id: 'kr_market',
    name: 'K.R. Market (City Market), Bengaluru',
    district: 'Bengaluru Urban',
    center: [12.9614, 77.5746],
    zoneRadiusMeters: 400,
  },
  majestic: {
    id: 'majestic',
    name: 'Majestic Bus & Rail Terminal, Bengaluru',
    district: 'Bengaluru Urban',
    center: [12.9774, 77.5708],
    zoneRadiusMeters: 450,
  },
  mysuru_palace: {
    id: 'mysuru_palace',
    name: 'Mysuru Palace Precinct, Mysuru',
    district: 'Mysuru',
    center: [12.3052, 76.6552],
    zoneRadiusMeters: 500,
  },
  hubballi_central: {
    id: 'hubballi_central',
    name: 'CBT Circle, Hubballi-Dharwad',
    district: 'Dharwad',
    center: [15.3524, 75.1432],
    zoneRadiusMeters: 450,
  },
  mangaluru_port: {
    id: 'mangaluru_port',
    name: 'Hampankatta & Central Hub, Mangaluru',
    district: 'Dakshina Kannada',
    center: [12.8703, 74.8436],
    zoneRadiusMeters: 500,
  },
  belagavi_fort: {
    id: 'belagavi_fort',
    name: 'Belagavi Central Precinct, Belagavi',
    district: 'Belagavi',
    center: [15.8497, 74.4977],
    zoneRadiusMeters: 450,
  },
  kalaburagi_hub: {
    id: 'kalaburagi_hub',
    name: 'Super Market & Station Road, Kalaburagi',
    district: 'Kalaburagi',
    center: [17.3297, 76.8343],
    zoneRadiusMeters: 400,
  },
  davanagere_market: {
    id: 'davanagere_market',
    name: 'Jayadeva Circle, Davanagere',
    district: 'Davanagere',
    center: [14.4644, 75.9218],
    zoneRadiusMeters: 400,
  },
  ballari_city: {
    id: 'ballari_city',
    name: 'Royal Circle & Cantonment, Ballari',
    district: 'Ballari',
    center: [15.1394, 76.9214],
    zoneRadiusMeters: 450,
  },
  vijayapura_gol_gumbaz: {
    id: 'vijayapura_gol_gumbaz',
    name: 'Gol Gumbaz Precinct, Vijayapura',
    district: 'Vijayapura',
    center: [16.8302, 75.7100],
    zoneRadiusMeters: 450,
  },
  shivamogga_gandhi_park: {
    id: 'shivamogga_gandhi_park',
    name: 'Gandhi Park & Bus Stand, Shivamogga',
    district: 'Shivamogga',
    center: [13.9299, 75.5681],
    zoneRadiusMeters: 400,
  },
  tumakuru_city: {
    id: 'tumakuru_city',
    name: 'Town Hall Circle, Tumakuru',
    district: 'Tumakuru',
    center: [13.3409, 77.1006],
    zoneRadiusMeters: 400,
  },
  udupi_temple: {
    id: 'udupi_temple',
    name: 'Car Street & City Center, Udupi',
    district: 'Udupi',
    center: [13.3409, 74.7421],
    zoneRadiusMeters: 400,
  },
  hassan_circle: {
    id: 'hassan_circle',
    name: 'N.R. Circle & Central Bus Stand, Hassan',
    district: 'Hassan',
    center: [13.0072, 76.1030],
    zoneRadiusMeters: 400,
  },
  bidar_fort: {
    id: 'bidar_fort',
    name: 'Bidar Fort & Old City Hub, Bidar',
    district: 'Bidar',
    center: [17.9104, 77.5199],
    zoneRadiusMeters: 450,
  },
  raichur_station: {
    id: 'raichur_station',
    name: 'Station Road Precinct, Raichur',
    district: 'Raichur',
    center: [16.2120, 77.3439],
    zoneRadiusMeters: 400,
  },
  kolar_clock_tower: {
    id: 'kolar_clock_tower',
    name: 'Clock Tower & Market, Kolar',
    district: 'Kolar',
    center: [13.1367, 78.1292],
    zoneRadiusMeters: 350,
  },
  mandya_sugar_town: {
    id: 'mandya_sugar_town',
    name: 'Sanjay Circle, Mandya',
    district: 'Mandya',
    center: [12.5218, 76.8951],
    zoneRadiusMeters: 350,
  },
  chikkamagaluru_town: {
    id: 'chikkamagaluru_town',
    name: 'Azad Park & Bus Stand, Chikkamagaluru',
    district: 'Chikkamagaluru',
    center: [13.3161, 75.7720],
    zoneRadiusMeters: 400,
  },
  chitradurga_fort: {
    id: 'chitradurga_fort',
    name: 'Chitradurga Fort Gateway, Chitradurga',
    district: 'Chitradurga',
    center: [14.2251, 76.3980],
    zoneRadiusMeters: 450,
  },
  bagalkote_navanagar: {
    id: 'bagalkote_navanagar',
    name: 'Navanagar Sector 1, Bagalkote',
    district: 'Bagalkote',
    center: [16.1691, 75.6615],
    zoneRadiusMeters: 400,
  },
  gadag_betageri: {
    id: 'gadag_betageri',
    name: 'Pala Badami Road, Gadag-Betageri',
    district: 'Gadag',
    center: [15.4286, 75.6322],
    zoneRadiusMeters: 350,
  },
  haveri_hub: {
    id: 'haveri_hub',
    name: 'Hosamani Siddappa Circle, Haveri',
    district: 'Haveri',
    center: [14.7954, 75.3991],
    zoneRadiusMeters: 350,
  },
  yadgir_city: {
    id: 'yadgir_city',
    name: 'Subhash Chowk, Yadgir',
    district: 'Yadgir',
    center: [16.7700, 77.1378],
    zoneRadiusMeters: 350,
  },
  chamarajanagar_town: {
    id: 'chamarajanagar_town',
    name: 'B.R. Ambedkar Circle, Chamarajanagar',
    district: 'Chamarajanagar',
    center: [11.9261, 76.9437],
    zoneRadiusMeters: 350,
  },
  koppal_city: {
    id: 'koppal_city',
    name: 'Ashok Circle & Market, Koppal',
    district: 'Koppal',
    center: [15.3484, 76.1557],
    zoneRadiusMeters: 350,
  },
  ramanagara_silk_hub: {
    id: 'ramanagara_silk_hub',
    name: 'Ijoor & Market Junction, Ramanagara',
    district: 'Ramanagara',
    center: [12.7150, 77.2811],
    zoneRadiusMeters: 350,
  },
  karwar_beach_port: {
    id: 'karwar_beach_port',
    name: 'Rabindranath Tagore Beach Corridor, Karwar',
    district: 'Uttara Kannada',
    center: [14.8185, 74.1300],
    zoneRadiusMeters: 450,
  },
  madikeri_coorg: {
    id: 'madikeri_coorg',
    name: 'Madikeri Fort & Raja Seat, Kodagu',
    district: 'Kodagu',
    center: [12.4244, 75.7382],
    zoneRadiusMeters: 400,
  },
  chikkaballapura_circle: {
    id: 'chikkaballapura_circle',
    name: 'Sir M.V. Circle, Chikkaballapura',
    district: 'Chikkaballapura',
    center: [13.4325, 77.7275],
    zoneRadiusMeters: 350,
  },
  hosapete_vijayanagara: {
    id: 'hosapete_vijayanagara',
    name: 'College Circle & Hampi Road, Vijayanagara (Hosapete)',
    district: 'Vijayanagara',
    center: [15.2689, 76.3909],
    zoneRadiusMeters: 450,
  },
};

export const SCENARIO_LOCATIONS = KARNATAKA_DISTRICTS_DATABASE;
export const DEFAULT_SCENARIO_LOCATION = KARNATAKA_DISTRICTS_DATABASE.kr_market;

/**
 * Calculates Haversine geodesic distance in meters between two lat/lng coordinates
 */
export function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000; // Earth's mean radius in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculates geographic lat/lng point at specified meter offsets from a center
 */
export function getGeoOffset(center: [number, number], metersNorth: number, metersEast: number): [number, number] {
  const [lat, lng] = center;
  const latOffset = metersNorth / 111320;
  const lngOffset = metersEast / (111320 * Math.cos((lat * Math.PI) / 180));
  return [Number((lat + latOffset).toFixed(6)), Number((lng + lngOffset).toFixed(6))];
}

/**
 * Finds the nearest known Karnataka district for arbitrary click coordinates
 */
export function resolveKarnatakaLocation(lat: number, lng: number): ScenarioLocation {
  let nearestLoc = DEFAULT_SCENARIO_LOCATION;
  let minDistance = Infinity;

  Object.values(KARNATAKA_DISTRICTS_DATABASE).forEach((loc) => {
    const d = getDistanceMeters(lat, lng, loc.center[0], loc.center[1]);
    if (d < minDistance) {
      minDistance = d;
      nearestLoc = loc;
    }
  });

  const distKm = (minDistance / 1000).toFixed(1);
  const isClose = minDistance < 5000;

  return {
    id: `custom-ksp-${lat.toFixed(4)}-${lng.toFixed(4)}`,
    name: isClose ? `${nearestLoc.name} (Sector Pin)` : `Tactical Incident [${lat.toFixed(4)}, ${lng.toFixed(4)}] (${distKm} km from ${nearestLoc.district})`,
    district: nearestLoc.district,
    center: [lat, lng],
    zoneRadiusMeters: 450,
    isCustom: true,
  };
}

/**
 * Calculates dynamic suspect threat radius and escape speed based on mobility & threat tier
 */
export function calculateSuspectThreatRadius(mobility: SuspectMobility, threatTier: SuspectThreatTier): { radiusMeters: number; speedKmph: number } {
  let baseRadius = 250;
  let baseSpeed = 10;

  switch (mobility) {
    case 'foot':
      baseRadius = 200;
      baseSpeed = 6;
      break;
    case 'two_wheeler':
      baseRadius = 450;
      baseSpeed = 35;
      break;
    case 'four_wheeler':
      baseRadius = 800;
      baseSpeed = 70;
      break;
    case 'transit':
      baseRadius = 600;
      baseSpeed = 25;
      break;
  }

  const tierMultiplier = threatTier === 'EXTREME' ? 1.4 : threatTier === 'HIGH' ? 1.2 : 1.0;
  return {
    radiusMeters: Math.round(baseRadius * tierMultiplier),
    speedKmph: Math.round(baseSpeed * tierMultiplier),
  };
}

/**
 * Generates directional escape vectors from suspect position toward outer perimeter
 */
export function generateSuspectEscapeRoutes(
  suspect: SuspectProfile,
  suspectPos: [number, number],
  placedUnits: PlacedUnit[],
  zoneRadiusMeters: number = 450
): EscapeRoute[] {
  const directions: Array<{
    dir: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'NORTH_EAST' | 'SOUTH_WEST';
    bearingDeg: number;
    name: string;
    northOffset: number;
    eastOffset: number;
  }> = [
    { dir: 'NORTH', bearingDeg: 0, name: 'North Highway Arterial Egress', northOffset: zoneRadiusMeters * 1.05, eastOffset: 0 },
    { dir: 'NORTH_EAST', bearingDeg: 45, name: 'North-East Commercial By-pass', northOffset: zoneRadiusMeters * 0.8, eastOffset: zoneRadiusMeters * 0.8 },
    { dir: 'EAST', bearingDeg: 90, name: 'East Ring Road Junction', northOffset: 0, eastOffset: zoneRadiusMeters * 1.05 },
    { dir: 'SOUTH', bearingDeg: 180, name: 'South Transit Hub & Alleyways', northOffset: -zoneRadiusMeters * 1.05, eastOffset: 0 },
    { dir: 'SOUTH_WEST', bearingDeg: 225, name: 'South-West Residential Alley Egress', northOffset: -zoneRadiusMeters * 0.8, eastOffset: -zoneRadiusMeters * 0.8 },
    { dir: 'WEST', bearingDeg: 270, name: 'West Metro Corridor & Expressway', northOffset: 0, eastOffset: -zoneRadiusMeters * 1.05 },
  ];

  const policeUnits = (placedUnits || []).filter((u) => u && u.type !== 'target_suspect');

  return directions.map((d, idx) => {
    const endPoint = getGeoOffset(suspectPos, d.northOffset, d.eastOffset);
    const distanceMeters = getDistanceMeters(suspectPos[0], suspectPos[1], endPoint[0], endPoint[1]);

    // Check if any police unit's radius covers or intercepts this ray
    let isIntercepted = false;
    let interceptedByUnitId: string | undefined;
    let interceptedByUnitType: UnitType | undefined;
    let minInterceptDist = Infinity;

    policeUnits.forEach((unit) => {
      // Check distance from unit to ray segment
      const distToEndpoint = getDistanceMeters(unit.lat, unit.lng, endPoint[0], endPoint[1]);
      const distToMidpoint = getDistanceMeters(
        unit.lat,
        unit.lng,
        (suspectPos[0] + endPoint[0]) / 2,
        (suspectPos[1] + endPoint[1]) / 2
      );

      const effectiveCoverage = unit.radiusMeters * 1.1;

      if (distToEndpoint <= effectiveCoverage || distToMidpoint <= effectiveCoverage) {
        isIntercepted = true;
        if (distToMidpoint < minInterceptDist) {
          minInterceptDist = distToMidpoint;
          interceptedByUnitId = unit.id;
          interceptedByUnitType = unit.type;
        }
      }
    });

    return {
      id: `escape-route-${idx + 1}`,
      name: d.name,
      direction: d.dir,
      bearingDeg: d.bearingDeg,
      startPoint: suspectPos,
      endPoint,
      distanceMeters: Math.round(distanceMeters),
      isIntercepted,
      interceptedByUnitId,
      interceptedByUnitType,
      interceptDistanceMeters: isIntercepted ? Math.round(minInterceptDist) : undefined,
      threatRating: suspect.threatTier === 'EXTREME' ? 'CRITICAL' : isIntercepted ? 'MEDIUM' : 'HIGH',
    };
  });
}

/**
 * Generates strategic perimeter access points around scenario location
 */
export function getScenarioAccessPoints(scenario: ScenarioLocation = DEFAULT_SCENARIO_LOCATION): AccessPoint[] {
  const r = scenario.zoneRadiusMeters * 0.8;
  const north = getGeoOffset(scenario.center, r, 0);
  const south = getGeoOffset(scenario.center, -r, 0);
  const east = getGeoOffset(scenario.center, 0, r);
  const west = getGeoOffset(scenario.center, 0, -r);

  return [
    {
      id: 'AP-1',
      name: 'North Ingress Gate (Main)',
      lat: north[0],
      lng: north[1],
      type: 'entry',
      capacityStatus: 'nominal',
    },
    {
      id: 'AP-2',
      name: 'South Egress Corridor',
      lat: south[0],
      lng: south[1],
      type: 'exit',
      capacityStatus: 'nominal',
    },
    {
      id: 'AP-3',
      name: 'East Hub Checkpoint',
      lat: east[0],
      lng: east[1],
      type: 'checkpoint',
      capacityStatus: 'nominal',
    },
    {
      id: 'AP-4',
      name: 'West Promenade Patrol Node',
      lat: west[0],
      lng: west[1],
      type: 'patrol_node',
      capacityStatus: 'nominal',
    },
  ];
}

export function createDefaultPlanAUnits(
  scenario: ScenarioLocation = DEFAULT_SCENARIO_LOCATION,
  anchorPos?: [number, number]
): PlacedUnit[] {
  const center = anchorPos || scenario.center;
  const p1 = getGeoOffset(center, 90, -50);
  const cp2 = getGeoOffset(center, -240, 0);
  const mrv3 = getGeoOffset(center, 120, 120);
  const ow4 = getGeoOffset(center, 50, -100);

  return [
    {
      id: 'unit-a-1',
      type: 'patrol_team',
      lat: p1[0],
      lng: p1[1],
      radiusMeters: UNIT_CATALOG.patrol_team.radiusMeters,
      cost: UNIT_CATALOG.patrol_team.cost,
      label: 'Patrol-Core',
    },
    {
      id: 'unit-a-2',
      type: 'checkpoint_post',
      lat: cp2[0],
      lng: cp2[1],
      radiusMeters: UNIT_CATALOG.checkpoint_post.radiusMeters,
      cost: UNIT_CATALOG.checkpoint_post.cost,
      label: 'CP-South Egress',
    },
    {
      id: 'unit-a-3',
      type: 'mobile_response',
      lat: mrv3[0],
      lng: mrv3[1],
      radiusMeters: UNIT_CATALOG.mobile_response.radiusMeters,
      cost: UNIT_CATALOG.mobile_response.cost,
      label: 'PCR-NorthEast Intercept',
    },
    {
      id: 'unit-a-4',
      type: 'overwatch_post',
      lat: ow4[0],
      lng: ow4[1],
      radiusMeters: UNIT_CATALOG.overwatch_post.radiusMeters,
      cost: UNIT_CATALOG.overwatch_post.cost,
      label: 'Drone-Overwatch',
    },
  ];
}

export function createDefaultPlanBUnits(
  scenario: ScenarioLocation = DEFAULT_SCENARIO_LOCATION,
  anchorPos?: [number, number],
  threatRadiusMeters: number = 450
): PlacedUnit[] {
  const center = anchorPos || scenario.center;
  const r = Math.max(280, Math.min(600, threatRadiusMeters * 0.85));

  // 4 Cardinal Choke-point Checkpoints surrounding the suspect
  const cpNorth = getGeoOffset(center, r, 0);
  const cpSouth = getGeoOffset(center, -r, 0);
  const cpEast = getGeoOffset(center, 0, r);
  const cpWest = getGeoOffset(center, 0, -r);

  // 2 Mobile Response PCR Cruisers along diagonal escape corridors
  const mrvNW = getGeoOffset(center, r * 0.65, -r * 0.65);
  const mrvSE = getGeoOffset(center, -r * 0.65, r * 0.65);

  // 2 Aerial Overwatch Drones
  const owNE = getGeoOffset(center, r * 0.45, r * 0.45);
  const owSW = getGeoOffset(center, -r * 0.45, -r * 0.45);

  // 1 Beat Patrol core sweeper
  const pCore = getGeoOffset(center, 40, -40);

  return [
    {
      id: 'unit-b-1',
      type: 'checkpoint_post',
      lat: cpNorth[0],
      lng: cpNorth[1],
      radiusMeters: UNIT_CATALOG.checkpoint_post.radiusMeters,
      cost: UNIT_CATALOG.checkpoint_post.cost,
      label: 'CP-North Chokepoint',
    },
    {
      id: 'unit-b-2',
      type: 'checkpoint_post',
      lat: cpSouth[0],
      lng: cpSouth[1],
      radiusMeters: UNIT_CATALOG.checkpoint_post.radiusMeters,
      cost: UNIT_CATALOG.checkpoint_post.cost,
      label: 'CP-South Chokepoint',
    },
    {
      id: 'unit-b-3',
      type: 'checkpoint_post',
      lat: cpEast[0],
      lng: cpEast[1],
      radiusMeters: UNIT_CATALOG.checkpoint_post.radiusMeters,
      cost: UNIT_CATALOG.checkpoint_post.cost,
      label: 'CP-East Chokepoint',
    },
    {
      id: 'unit-b-4',
      type: 'checkpoint_post',
      lat: cpWest[0],
      lng: cpWest[1],
      radiusMeters: UNIT_CATALOG.checkpoint_post.radiusMeters,
      cost: UNIT_CATALOG.checkpoint_post.cost,
      label: 'CP-West Chokepoint',
    },
    {
      id: 'unit-b-5',
      type: 'mobile_response',
      lat: mrvNW[0],
      lng: mrvNW[1],
      radiusMeters: UNIT_CATALOG.mobile_response.radiusMeters,
      cost: UNIT_CATALOG.mobile_response.cost,
      label: 'PCR-Interceptor NW',
    },
    {
      id: 'unit-b-6',
      type: 'mobile_response',
      lat: mrvSE[0],
      lng: mrvSE[1],
      radiusMeters: UNIT_CATALOG.mobile_response.radiusMeters,
      cost: UNIT_CATALOG.mobile_response.cost,
      label: 'PCR-Interceptor SE',
    },
    {
      id: 'unit-b-7',
      type: 'overwatch_post',
      lat: owNE[0],
      lng: owNE[1],
      radiusMeters: UNIT_CATALOG.overwatch_post.radiusMeters,
      cost: UNIT_CATALOG.overwatch_post.cost,
      label: 'Drone-Overwatch NE',
    },
    {
      id: 'unit-b-8',
      type: 'overwatch_post',
      lat: owSW[0],
      lng: owSW[1],
      radiusMeters: UNIT_CATALOG.overwatch_post.radiusMeters,
      cost: UNIT_CATALOG.overwatch_post.cost,
      label: 'Drone-Overwatch SW',
    },
    {
      id: 'unit-b-9',
      type: 'patrol_team',
      lat: pCore[0],
      lng: pCore[1],
      radiusMeters: UNIT_CATALOG.patrol_team.radiusMeters,
      cost: UNIT_CATALOG.patrol_team.cost,
      label: 'Patrol-Core Sweep',
    },
  ];
}

export const DEFAULT_PLAN_A_UNITS = createDefaultPlanAUnits(DEFAULT_SCENARIO_LOCATION);
export const DEFAULT_PLAN_B_UNITS = createDefaultPlanBUnits(DEFAULT_SCENARIO_LOCATION);

const densityWeights: Record<CrowdDensity, number> = {
  low: 0.8,
  moderate: 1.0,
  high: 1.4,
  peak: 1.8,
};

const envWeights: Record<EnvironmentalCondition, number> = {
  clear: 1.0,
  rain: 1.25,
  low_visibility: 1.35,
  festival_overlap: 1.5,
};

const postureFactors: Record<DeploymentPosture, number> = {
  visible_perimeter: 1.1,
  distributed_patrol: 1.2,
  checkpoint_focused: 1.05,
};

export const DEFAULT_SUSPECT_PROFILE: SuspectProfile = {
  id: 'sus-default',
  name: 'Raju K. alias "Spider"',
  alias: 'Spider Raju',
  crimeType: 'Armed Commercial Robbery / Extortion',
  threatTier: 'HIGH',
  mobilityType: 'two_wheeler',
  threatRadiusMeters: 450,
  escapeSpeedKmph: 35,
  notes: 'Armed with concealed weapon. Known to flee via narrow residential bylanes on two-wheeler.',
};

/**
 * Main simulation evaluation engine
 */
export function computeCoverageRisk(factors: SimulationFactors): SimulationResult {
  const envCondition = factors.environmentalConditions || factors.envCondition || 'clear';
  const density = factors.crowdDensity || 'moderate';
  const posture = factors.posture || 'visible_perimeter';
  const scenario = factors.scenarioLocation || DEFAULT_SCENARIO_LOCATION;

  // Extract placed units
  const placedUnits: PlacedUnit[] = factors.placedUnits && factors.placedUnits.length > 0
    ? factors.placedUnits
    : createDefaultPlanAUnits(scenario);

  // Separate police units vs suspect pin
  const policeUnits = placedUnits.filter((u) => u.type !== 'target_suspect');
  const suspectUnit = placedUnits.find((u) => u.type === 'target_suspect');

  // Derive personnel count from placed units' cost
  const totalPersonnelCost = policeUnits.reduce((sum, u) => sum + (u.cost || 2), 0);
  const clampedPersonnel = Math.max(BUDGET_MIN, Math.min(BUDGET_MAX, totalPersonnelCost > 0 ? totalPersonnelCost : (factors.personnelCount || 12)));

  // Units breakdown
  const unitsBreakdown: Record<UnitType, number> = {
    patrol_team: 0,
    checkpoint_post: 0,
    mobile_response: 0,
    overwatch_post: 0,
    target_suspect: suspectUnit ? 1 : 0,
  };
  policeUnits.forEach((u) => {
    if (unitsBreakdown[u.type] !== undefined) {
      unitsBreakdown[u.type]++;
    }
  });

  // Access Points for the scenario
  const accessPoints = getScenarioAccessPoints(scenario);

  // Spatial Overlap Calculation: Check which access points are covered by placed units
  const accessPointCoverages: AccessPointCoverage[] = accessPoints.map((ap) => {
    const coveringUnits: string[] = [];
    policeUnits.forEach((unit) => {
      const distance = getDistanceMeters(unit.lat, unit.lng, ap.lat, ap.lng);
      if (distance <= unit.radiusMeters) {
        coveringUnits.push(unit.id);
      }
    });

    return {
      pointId: ap.id,
      name: ap.name,
      isCovered: coveringUnits.length > 0,
      coveredByUnits: coveringUnits,
    };
  });

  const coveredAccessPointsCount = accessPointCoverages.filter((c) => c.isCovered).length;
  const totalAccessPointsCount = accessPoints.length;
  const uncoveredAccessPoints = accessPointCoverages.filter((c) => !c.isCovered);

  // Active Suspect & Dynamic Escape Routes
  const activeSuspect: SuspectProfile = suspectUnit?.suspectData || factors.activeSuspect || DEFAULT_SUSPECT_PROFILE;
  const suspectPos: [number, number] = suspectUnit ? [suspectUnit.lat, suspectUnit.lng] : scenario.center;
  const escapeRoutes = generateSuspectEscapeRoutes(activeSuspect, suspectPos, placedUnits, scenario.zoneRadiusMeters);
  const interceptedEscapeCount = escapeRoutes.filter((r) => r.isIntercepted).length;
  const totalEscapeCount = escapeRoutes.length;
  const containmentScorePercent = totalEscapeCount > 0 ? Math.round((interceptedEscapeCount / totalEscapeCount) * 100) : 100;

  // Time to complete cordon
  const mrvCount = unitsBreakdown.mobile_response;
  const timeToCordonMinutes = Math.max(1.0, Number(((activeSuspect.threatRadiusMeters / 100) / (mrvCount > 0 ? 3.5 : 1.8)).toFixed(1)));

  // Weights & Factors
  const densityWeight = densityWeights[density] || 1.0;
  let envWeight = envWeights[envCondition] || 1.0;
  const postureFactor = postureFactors[posture] || 1.0;

  // Overwatch Post modifier: Overwatch units improve spotting and mitigate weather penalties
  const overwatchCount = unitsBreakdown.overwatch_post;
  if (overwatchCount > 0 && (envCondition === 'rain' || envCondition === 'low_visibility')) {
    const weatherDrag = envWeight - 1.0;
    const mitigation = Math.min(0.7, overwatchCount * 0.4);
    envWeight = 1.0 + weatherDrag * (1 - mitigation);
  }

  // Base Risk from parameters
  const baseRisk = (densityWeight * envWeight * 500) / (clampedPersonnel * postureFactor);

  // Spatial Coverage Penalty/Bonus
  const spatialGapPenalty = uncoveredAccessPoints.length * 9;

  // Checkpoint fortify bonus: if checkpoint_post is placed covering an AP
  let checkpointBonus = 0;
  accessPointCoverages.forEach((apCov) => {
    if (apCov.isCovered) {
      const hasCheckpoint = policeUnits.some(
        (u) => apCov.coveredByUnits.includes(u.id) && u.type === 'checkpoint_post'
      );
      if (hasCheckpoint) {
        checkpointBonus += 3;
      }
    }
  });

  // Suspect escape penalty: Open escape routes elevate risk
  const escapeGapPenalty = (totalEscapeCount - interceptedEscapeCount) * 5;

  // Calculate final coverage risk index clamped between 5 and 95
  const rawRisk = baseRisk + spatialGapPenalty + escapeGapPenalty - checkpointBonus;
  const coverageRiskIndex = Math.max(5, Math.min(95, Math.round(rawRisk)));
  const coverageIntegrityScore = 100 - coverageRiskIndex;

  // Estimated Response Time:
  const mrvSpeedBonus = mrvCount * 0.45;
  const rawResponseTime = Math.max(
    1.2,
    Number((((35 - clampedPersonnel) * 0.25 * (envWeight / postureFactor)) - mrvSpeedBonus).toFixed(1))
  );
  const estResponseTimeMinutes = rawResponseTime;

  // Determine Risk Level & Color
  let riskLevel: 'LOW' | 'MODERATE' | 'ELEVATED' | 'CRITICAL' = 'LOW';
  let riskColor = '#0E7A0D'; // Green

  if (coverageRiskIndex >= 70) {
    riskLevel = 'CRITICAL';
    riskColor = '#8B0000'; // Dark Red
  } else if (coverageRiskIndex >= 50) {
    riskLevel = 'ELEVATED';
    riskColor = '#E65100'; // Amber/Orange
  } else if (coverageRiskIndex >= 30) {
    riskLevel = 'MODERATE';
    riskColor = '#F57C00'; // Light Orange
  }

  // Vulnerability Alerts & Heuristics
  const vulnerabilityAlerts: string[] = [];
  const recommendations: string[] = [];

  // 1. Suspect Containment Alerts
  if (containmentScorePercent < 50) {
    const openRoutes = escapeRoutes.filter((r) => !r.isIntercepted).map((r) => r.direction).join(', ');
    vulnerabilityAlerts.push(
      `🚨 Active Fugitive Containment Breach: ${activeSuspect.name} has ${totalEscapeCount - interceptedEscapeCount} open escape corridors (${openRoutes}). High risk of egress.`
    );
    recommendations.push(
      `Deploy PCR Cruisers or Checkpoint Barricades on ${openRoutes} corridors to seal fugitive escape vectors.`
    );
  } else if (containmentScorePercent >= 100) {
    vulnerabilityAlerts.push(
      `🎯 100% Cordon Enclosure: All ${totalEscapeCount} escape corridors for suspect ${activeSuspect.name} are locked down.`
    );
  }

  // 2. Spatial Vulnerability Warnings for Uncovered Access Points
  if (uncoveredAccessPoints.length > 0) {
    uncoveredAccessPoints.forEach((uncovered) => {
      vulnerabilityAlerts.push(
        `Spatial Coverage Gap: Access Point ${uncovered.pointId} (${uncovered.name}) has no police unit coverage in ${scenario.district}.`
      );
    });
    recommendations.push(
      `Deploy a Checkpoint Post or Beat Patrol to cover ${uncoveredAccessPoints.map((u) => u.pointId).join(', ')}.`
    );
  }

  // 3. Budget / Personnel Deficit Alerts
  if (totalPersonnelCost < 8 && (density === 'high' || density === 'peak')) {
    vulnerabilityAlerts.push(
      'Critical Personnel Deficit: Deployed tactical budget (< 8 units) is insufficient for high-density crowds.'
    );
    recommendations.push('Mobilize minimum 6 reserve quick-response personnel from neighboring police stations.');
  }

  // 4. Environmental Weather Hazard & Overwatch Assistance
  if (envCondition === 'rain' || envCondition === 'low_visibility') {
    if (overwatchCount === 0) {
      vulnerabilityAlerts.push(
        'Environmental Visibility Hazard: Adverse weather reduces visual tracking radius by ~40% without aerial drone overwatch.'
      );
      recommendations.push('Deploy a Drone Overwatch Post or switch posture to Checkpoint-Focused Ingress.');
    } else {
      recommendations.push(`Active Drone Overwatch (${overwatchCount} nodes) mitigating adverse weather detection blindness.`);
    }
  }

  // 5. Mobile Response Benefit
  if (mrvCount > 0) {
    recommendations.push(
      `PCR Mobile Cruiser active: Emergency intercept SLA accelerated to ${estResponseTimeMinutes} minutes.`
    );
  }

  if (vulnerabilityAlerts.length === 0) {
    vulnerabilityAlerts.push(`Optimal Sector Coverage: All access corridors in ${scenario.name} are fortified.`);
    recommendations.push('Maintain active radio check-ins every 30 minutes. Log telemetry to CCTNS audit trail.');
  }

  // Markers
  const unitMarkers: UnitMarker[] = placedUnits.map((unit, idx) => ({
    id: unit.id,
    callsign: unit.label || `${UNIT_CATALOG[unit.type]?.shortName || 'Unit'}-${idx + 1}`,
    lat: unit.lat,
    lng: unit.lng,
    posture,
    coverageRadiusMeters: unit.radiusMeters,
    type: unit.type,
  }));

  return {
    factors: {
      ...factors,
      personnelCount: clampedPersonnel,
      environmentalConditions: envCondition,
      envCondition,
      placedUnits,
      scenarioLocation: scenario,
      activeSuspect,
    },
    scenarioLocation: scenario,
    coverageRiskIndex,
    estResponseTimeMinutes,
    coverageIntegrityScore,
    riskLevel,
    riskColor,
    vulnerabilityAlerts,
    recommendations,
    unitMarkers,
    accessPoints,
    placedUnits,
    accessPointCoverages,
    coveredAccessPointsCount,
    totalAccessPointsCount,
    totalPersonnelCost,
    budgetLimit: BUDGET_MAX,
    unitsBreakdown,
    escapeRoutes,
    interceptedEscapeCount,
    totalEscapeCount,
    containmentScorePercent,
    activeSuspect,
    timeToCordonMinutes,
    calculatedAt: new Date().toISOString(),
  };
}


