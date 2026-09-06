import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Circle,
  CircleMarker,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ScenarioLocation,
  PlacedUnit,
  AccessPoint,
  AccessPointCoverage,
  UnitType,
  UNIT_CATALOG,
  EscapeRoute,
  SuspectProfile,
} from '@/utils/mockSimulationEngine';
import { useLanguage, formatUnitName, formatUnitRole } from '@/context/LanguageContext';
import { Trash2, Radio, Shield, Users, Zap, CheckCircle2, AlertTriangle, Target, Navigation, Flame } from 'lucide-react';

export interface CoverageZoneMapProps {
  scenarioLocation: ScenarioLocation;
  placedUnits: PlacedUnit[];
  accessPoints: AccessPoint[];
  accessPointCoverages: AccessPointCoverage[];
  escapeRoutes?: EscapeRoute[];
  activeSuspect?: SuspectProfile | null;
  onDropUnit: (type: UnitType, lat: number, lng: number) => void;
  onMoveUnit: (unitId: string, lat: number, lng: number) => void;
  onRemoveUnit: (unitId: string) => void;
  selectedUnitId: string | null;
  onSelectUnit: (unitId: string | null) => void;
  onMapClick?: (lat: number, lng: number) => void;
  isReadOnly?: boolean;
  height?: string;
}

// Child component to fit bounds tightly to scenario radius
function AutoZoomToScenario({
  center,
  radiusMeters,
}: {
  center: [number, number];
  radiusMeters: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!center || !center[0] || !center[1]) return;
    try {
      const bounds = L.latLng(center).toBounds(radiusMeters * 2);
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [24, 24] });
      }
    } catch {
      // Graceful fallback
    }
  }, [map, center[0], center[1], radiusMeters]);

  return null;
}

// Map Click Listener
function MapEventsHandler({
  onClick,
  isReadOnly,
}: {
  onClick?: (lat: number, lng: number) => void;
  isReadOnly?: boolean;
}) {
  useMapEvents({
    click: (e) => {
      if (!isReadOnly && onClick) {
        onClick(Number(e.latlng.lat.toFixed(6)), Number(e.latlng.lng.toFixed(6)));
      }
    },
  });
  return null;
}

// Capture live Leaflet map instance
function MapInstanceCapture({
  onMapReady,
}: {
  onMapReady: (map: L.Map) => void;
}) {
  const map = useMap();
  useEffect(() => {
    if (map) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  return null;
}

export function CoverageZoneMap({
  scenarioLocation,
  placedUnits,
  accessPoints,
  accessPointCoverages,
  escapeRoutes = [],
  activeSuspect = null,
  onDropUnit,
  onMoveUnit,
  onRemoveUnit,
  selectedUnitId,
  onSelectUnit,
  onMapClick,
  isReadOnly = false,
  height = '480px',
}: CoverageZoneMapProps) {
  const { t, language } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleMapReady = useCallback((map: L.Map) => {
    setMapInstance(map);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    if (isReadOnly) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (isReadOnly) return;
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isReadOnly || !mapInstance) return;
    e.preventDefault();
    setIsDragOver(false);

    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const latlng = mapInstance.containerPointToLatLng([x, y]);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (dataStr) {
        const payload = JSON.parse(dataStr);
        if (payload.source === 'palette' && payload.type) {
          onDropUnit(payload.type as UnitType, Number(latlng.lat.toFixed(6)), Number(latlng.lng.toFixed(6)));
        }
      }
    } catch {
      // Fallback
    }
  };

  // Animated High-Fidelity DivIcons
  const createUnitDivIcon = (unit: PlacedUnit, isSelected: boolean) => {
    const def = UNIT_CATALOG[unit.type] || {
      type: unit.type,
      name: unit.label || 'Tactical Unit',
      shortName: unit.label || 'Unit',
      description: '',
      radiusMeters: unit.radiusMeters || 200,
      cost: unit.cost ?? 2,
      color: unit.customColor || '#0284C7',
      accentColor: '#0369A1',
      badge: 'Tactical Unit',
      tacticalRole: 'Tactical Deployment',
      iconEmoji: unit.customIcon || '👮',
    };
    const isSuspect = unit.type === 'target_suspect';

    let iconHtml = '';

    if (isSuspect) {
      // Suspect / High-Value Target Marker with Pulsing Crosshair
      iconHtml = `
        <div class="relative flex items-center justify-center anim-suspect" style="width: 44px; height: 44px;">
          <div class="absolute inset-0 rounded-full border-2 border-red-600 bg-red-600/30 anim-radar"></div>
          <div class="w-9 h-9 rounded-full bg-red-700 border-2 border-white shadow-2xl flex items-center justify-center text-white z-10 font-bold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="22" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="12" x2="2" y2="12"></line>
              <line x1="12" y1="6" x2="12" y2="2"></line>
              <line x1="12" y1="22" x2="12" y2="18"></line>
            </svg>
          </div>
          <div class="absolute -top-3.5 bg-red-900 text-amber-300 text-[8px] font-extrabold px-1 rounded shadow border border-red-500 whitespace-nowrap uppercase">
            TARGET
          </div>
        </div>
      `;
    } else if (unit.type === 'k9_unit') {
      // K-9 Sniffer Dog Squad with Emerald Scent Radar
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
          <div class="absolute inset-0 rounded-full border border-emerald-400 bg-emerald-500/30 anim-radar"></div>
          <div class="w-8 h-8 rounded-full bg-emerald-700 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[12px]">
            🐕
          </div>
          <div class="absolute -bottom-2 bg-emerald-950 text-emerald-200 text-[7.5px] font-mono px-1 rounded border border-emerald-400 font-bold">
            K-9
          </div>
        </div>
      `;
    } else if (unit.type === 'qrf_swat') {
      // QRF SWAT Assault Team with Crimson Armor Strobe
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 42px; height: 42px;">
          <div class="absolute inset-0 rounded-full border-2 border-red-600 bg-red-700/20 anim-strobe-amber"></div>
          <div class="w-8 h-8 rounded-full bg-red-900 border-2 border-amber-400 shadow-xl flex items-center justify-center text-white font-extrabold text-[12px]">
            🛡️
          </div>
          <div class="absolute -bottom-2 bg-red-950 text-red-200 text-[7.5px] font-mono px-1 rounded border border-red-500 font-bold">
            QRF SWAT
          </div>
        </div>
      `;
    } else if (unit.type === 'anpr_smart_barricade') {
      // ANPR Camera Gate
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 38px; height: 38px;">
          <div class="absolute inset-0 rounded-full border border-orange-400 bg-orange-500/20 anim-strobe-amber"></div>
          <div class="w-8 h-8 rounded-full bg-orange-600 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[11px]">
            📸
          </div>
          <div class="absolute -bottom-2 bg-orange-950 text-orange-200 text-[7.5px] font-mono px-1 rounded border border-orange-400 font-bold">
            ANPR
          </div>
        </div>
      `;
    } else if (unit.type === 'traffic_bike_intercept') {
      // Traffic Pursuit Motorbike
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 38px; height: 38px;">
          <div class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 anim-siren-blue"></div>
          <div class="w-8 h-8 rounded-full bg-cyan-700 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[11px]">
            🏍️
          </div>
          <div class="absolute -bottom-2 bg-cyan-950 text-cyan-200 text-[7.5px] font-mono px-1 rounded border border-cyan-400 font-bold">
            BIKE
          </div>
        </div>
      `;
    } else if (unit.type === 'mounted_police') {
      // Mounted Cavalry Unit
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
          <div class="w-8 h-8 rounded-full bg-violet-700 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[12px]">
            🐎
          </div>
          <div class="absolute -bottom-2 bg-violet-950 text-violet-200 text-[7.5px] font-mono px-1 rounded border border-violet-400 font-bold">
            CAVALRY
          </div>
        </div>
      `;
    } else if (unit.type === 'mobile_response') {
      // PCR Cruiser with Alternating Red & Blue Siren Strobes
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
          <div class="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-red-500 anim-siren-red"></div>
          <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 anim-siren-blue"></div>
          <div class="w-8 h-8 rounded-full bg-[#0B2E59] border-2 border-white shadow-xl flex items-center justify-center text-sky-300 font-extrabold text-[10px]">
            🚓
          </div>
          <div class="absolute -bottom-2 bg-slate-950/90 text-white text-[7.5px] font-mono px-1 rounded border border-sky-400 font-bold">
            PCR
          </div>
        </div>
      `;
    } else if (unit.type === 'checkpoint_post') {
      // Barricade with Flashing Amber Hazard Beacon
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 38px; height: 38px;">
          <div class="absolute inset-0 rounded-full border border-amber-400 bg-amber-400/20 anim-strobe-amber"></div>
          <div class="w-8 h-8 rounded-full bg-amber-600 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[10px]">
            🚧
          </div>
          <div class="absolute -bottom-2 bg-amber-950 text-amber-300 text-[7.5px] font-mono px-1 rounded border border-amber-500 font-bold">
            CORDON
          </div>
        </div>
      `;
    } else if (unit.type === 'overwatch_post') {
      // Drone Spotter with Spinning Propeller
      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 40px; height: 40px;">
          <div class="absolute inset-0 rounded-full border-2 border-dashed border-purple-400 anim-drone-spin"></div>
          <div class="w-8 h-8 rounded-full bg-purple-700 border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[10px]">
            🛸
          </div>
          <div class="absolute -bottom-2 bg-purple-950 text-purple-200 text-[7.5px] font-mono px-1 rounded border border-purple-400 font-bold">
            DRONE
          </div>
        </div>
      `;
    } else {
      // Beat Patrol Cop or Custom Unit
      const emoji = unit.customIcon || def?.iconEmoji || '👮';
      const label = (unit.label || def?.shortName || 'UNIT').substring(0, 8);
      const color = unit.customColor || def?.color || '#0284C7';

      iconHtml = `
        <div class="relative flex items-center justify-center" style="width: 36px; height: 36px;">
          <div class="absolute inset-0 rounded-full border border-sky-400 bg-sky-400/30 anim-radar"></div>
          <div class="w-7 h-7 rounded-full border-2 border-white shadow-xl flex items-center justify-center text-white font-extrabold text-[10px]" style="background-color: ${color};">
            ${emoji}
          </div>
          <div class="absolute -bottom-2 bg-slate-950 text-sky-200 text-[7.5px] font-mono px-1 rounded border border-sky-400 font-bold whitespace-nowrap">
            ${label}
          </div>
        </div>
      `;
    }

    const haloStyle = isSelected
      ? 'box-shadow: 0 0 0 3px #FFFFFF, 0 0 16px 4px rgba(14, 165, 233, 0.9); transform: scale(1.2);'
      : '';

    return L.divIcon({
      className: 'custom-tactical-unit-icon',
      html: `<div style="${haloStyle}; cursor: ${isReadOnly ? 'default' : 'grab'};">${iconHtml}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div
      ref={mapContainerRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative w-full rounded-lg overflow-hidden border transition-all duration-200 ${
        isDragOver
          ? 'border-sky-500 ring-2 ring-sky-400 bg-sky-950/20'
          : 'border-slate-300 dark:border-slate-800 shadow-md'
      }`}
      style={{ height }}
    >
      <MapContainer
        center={scenarioLocation.center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <AutoZoomToScenario
          center={scenarioLocation.center}
          radiusMeters={scenarioLocation.zoneRadiusMeters}
        />
        <MapInstanceCapture onMapReady={handleMapReady} />
        <MapEventsHandler onClick={onMapClick} isReadOnly={isReadOnly} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 1. Operational Scenario Boundary Circle */}
        <Circle
          center={scenarioLocation.center}
          radius={scenarioLocation.zoneRadiusMeters}
          pathOptions={{
            color: '#0284C7',
            dashArray: '6 6',
            weight: 2,
            fillColor: '#38BDF8',
            fillOpacity: 0.07,
          }}
        />

        {/* Tactical HQ Center Node */}
        <CircleMarker
          center={scenarioLocation.center}
          radius={7}
          pathOptions={{
            color: '#0B2E59',
            fillColor: '#38BDF8',
            fillOpacity: 1,
            weight: 2.5,
          }}
        >
          <Popup>
            <div className="text-xs font-sans space-y-1">
              <div className="font-bold text-[#0B2E59] border-b pb-1">
                📍 {scenarioLocation.name}
              </div>
              <div><strong>{t('jurisdiction')}:</strong> {scenarioLocation.district}</div>
              <div><strong>{t('coverageRadius')}:</strong> {scenarioLocation.zoneRadiusMeters}m</div>
            </div>
          </Popup>
        </CircleMarker>

        {/* 2. Dynamic Suspect Escape Vectors (Polylines) */}
        {escapeRoutes.map((route) => {
          const isIntercepted = route.isIntercepted;

          return (
            <React.Fragment key={`escape-frag-${route.id}`}>
              {/* Directional Path Polyline */}
              <Polyline
                positions={[route.startPoint, route.endPoint]}
                pathOptions={{
                  color: isIntercepted ? '#10B981' : '#EF4444',
                  weight: isIntercepted ? 3 : 3.5,
                  dashArray: isIntercepted ? 'none' : '6 6',
                  opacity: isIntercepted ? 0.85 : 0.95,
                  className: isIntercepted ? '' : 'anim-escape-vector',
                }}
              />

              {/* Escape Endpoint Node */}
              <CircleMarker
                center={route.endPoint}
                radius={isIntercepted ? 6 : 8}
                pathOptions={{
                  color: isIntercepted ? '#047857' : '#B91C1C',
                  fillColor: isIntercepted ? '#10B981' : '#EF4444',
                  fillOpacity: 1,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-xs font-sans space-y-1 p-0.5 min-w-[160px]">
                    <div className="flex items-center justify-between border-b pb-1 font-bold">
                      <span className="text-gray-900">{route.direction} Escape Route</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded text-white font-mono ${
                          isIntercepted ? 'bg-emerald-600' : 'bg-red-600 animate-pulse'
                        }`}
                      >
                        {isIntercepted ? 'INTERCEPTED' : 'OPEN EXPOSURE'}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-600">
                      <div><strong>Corridor:</strong> {route.name}</div>
                      <div><strong>Distance:</strong> {route.distanceMeters}m</div>
                      {isIntercepted && (
                        <div className="text-emerald-700 font-bold mt-1">
                          🛡️ Blocked by police unit radius ({route.interceptDistanceMeters}m away)
                        </div>
                      )}
                      {!isIntercepted && (
                        <div className="text-red-600 font-bold mt-1 flex items-center gap-1">
                          ⚠️ Vulnerable Egress: Deploy unit to seal route
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}

        {/* 3. Strategic Access Points (AP-1 to AP-4) */}
        {accessPoints.map((ap) => {
          const cov = accessPointCoverages.find((c) => c.pointId === ap.id);
          const isCovered = cov?.isCovered ?? false;

          return (
            <React.Fragment key={`ap-frag-${ap.id}`}>
              <CircleMarker
                center={[ap.lat, ap.lng]}
                radius={15}
                pathOptions={{
                  color: isCovered ? '#10B981' : '#EF4444',
                  fillColor: isCovered ? '#10B981' : '#EF4444',
                  fillOpacity: isCovered ? 0.2 : 0.25,
                  weight: 1,
                  dashArray: isCovered ? 'none' : '3 3',
                }}
              />
              <CircleMarker
                center={[ap.lat, ap.lng]}
                radius={9}
                pathOptions={{
                  color: isCovered ? '#065F46' : '#991B1B',
                  fillColor: isCovered ? '#059669' : '#DC2626',
                  fillOpacity: 0.9,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-xs font-sans space-y-1.5 p-0.5">
                    <div className="font-bold text-gray-900 border-b pb-1 flex items-center justify-between gap-2">
                      <span>{ap.id}: {ap.name}</span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase ${
                          isCovered ? 'bg-emerald-600' : 'bg-red-600'
                        }`}
                      >
                        {isCovered ? t('secured') : t('exposed')}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-600">
                      <strong>{t('status')}:</strong> {isCovered ? t('coveredByUnitRadius') : t('noTacticalCoverage')}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>
          );
        })}

        {/* 4. Placed Units & Target Suspects */}
        {placedUnits.map((unit) => {
          const def = UNIT_CATALOG[unit.type] || {
            type: unit.type,
            name: unit.label || 'Tactical Unit',
            shortName: unit.label || 'Unit',
            description: '',
            radiusMeters: unit.radiusMeters || 200,
            cost: unit.cost ?? 2,
            color: unit.customColor || '#0284C7',
            accentColor: '#0369A1',
            badge: 'Tactical Unit',
            tacticalRole: 'Tactical Deployment',
            iconEmoji: unit.customIcon || '👮',
          };
          const isSelected = selectedUnitId === unit.id;
          const isSuspect = unit.type === 'target_suspect';

          return (
            <React.Fragment key={`unit-frag-${unit.id}`}>
              {/* Coverage / Threat Radius Circle */}
              <Circle
                center={[unit.lat, unit.lng]}
                radius={unit.radiusMeters}
                pathOptions={{
                  color: isSuspect ? '#EF4444' : def.color || '#0284C7',
                  fillColor: isSuspect ? '#EF4444' : def.color || '#0284C7',
                  fillOpacity: isSuspect ? 0.16 : isSelected ? 0.25 : 0.14,
                  weight: isSuspect ? 2 : isSelected ? 2 : 1,
                  dashArray: isSuspect ? '5 5' : isSelected ? 'none' : '4 4',
                }}
              />

              {/* Draggable Animated Marker */}
              <Marker
                position={[unit.lat, unit.lng]}
                draggable={!isReadOnly}
                icon={createUnitDivIcon(unit, isSelected)}
                eventHandlers={{
                  click: () => onSelectUnit(unit.id),
                  dragend: (e) => {
                    const latlng = e.target.getLatLng();
                    onMoveUnit(unit.id, Number(latlng.lat.toFixed(6)), Number(latlng.lng.toFixed(6)));
                  },
                }}
              >
                <Popup>
                  <div className="text-xs font-sans space-y-2 p-0.5 min-w-[190px]">
                    <div className="flex items-center justify-between border-b pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-gray-900">
                          {isSuspect ? (unit.suspectData?.name || 'Target Suspect') : (unit.label || formatUnitName(unit.type, t, language))}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSuspect ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {isSuspect ? 'FUGITIVE' : `${def.cost} ${t('cost')}`}
                      </span>
                    </div>

                    {isSuspect && unit.suspectData ? (
                      <div className="text-[11px] text-gray-700 space-y-1">
                        <div><strong>Alias:</strong> {unit.suspectData.alias}</div>
                        <div><strong>Offence:</strong> {unit.suspectData.crimeType}</div>
                        <div><strong>Mobility:</strong> {unit.suspectData.mobilityType.toUpperCase()} ({unit.suspectData.escapeSpeedKmph} km/h)</div>
                        <div><strong>Threat Perimeter:</strong> {unit.radiusMeters}m</div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-gray-600 leading-relaxed">
                        <div><strong>{t('role')}:</strong> {formatUnitRole(unit.type, t, language) || def.tacticalRole}</div>
                        <div><strong>{t('coverageRadius')}:</strong> {unit.radiusMeters}m</div>
                      </div>
                    )}

                    <div className="text-[10px] font-mono text-gray-400">
                      GPS: [{unit.lat.toFixed(5)}, {unit.lng.toFixed(5)}]
                    </div>

                    {!isReadOnly && (
                      <div className="pt-1.5 border-t flex justify-end">
                        <button
                          type="button"
                          onClick={() => onRemoveUnit(unit.id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={11} /> {t('removeUnit')}
                        </button>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>

      {/* Floating Drag-over Guide Indicator */}
      {isDragOver && (
        <div className="absolute inset-0 z-30 pointer-events-none bg-sky-950/20 backdrop-blur-[1px] flex items-center justify-center">
          <div className="bg-[#0B2E59] text-white px-4 py-2 rounded-lg border border-sky-400 font-bold text-xs shadow-2xl flex items-center gap-2">
            <Zap size={14} className="text-amber-400 animate-pulse" />
            <span>{t('dropUnitHint')}</span>
          </div>
        </div>
      )}
    </div>
  );
}

