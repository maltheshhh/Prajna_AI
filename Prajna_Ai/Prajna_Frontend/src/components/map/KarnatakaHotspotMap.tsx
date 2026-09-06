import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { HotspotDataPoint } from '@/types';
import { useLanguage, formatDynamicText, formatCrimeType } from '@/context/LanguageContext';
import 'leaflet/dist/leaflet.css';

interface KarnatakaHotspotMapProps {
  data: HotspotDataPoint[];
}

export function KarnatakaHotspotMap({ data }: KarnatakaHotspotMapProps) {
  const { language, t } = useLanguage();
  const [crimeFilter, setCrimeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  const crimeTypes = Array.from(new Set(data.map(d => d.crimeType)));

  // Filter logic
  const filteredData = data.filter(point => {
    if (crimeFilter !== 'all' && point.crimeType !== crimeFilter) return false;
    if (severityFilter !== 'all' && point.severity !== severityFilter) return false;
    return true;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#8B0000'; // Dark Red
      case 'high': return '#D32F2F'; // Red
      case 'medium': return '#E65100'; // Orange
      case 'low': return '#F9A825'; // Yellow
      default: return '#0277BD';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'critical': return language === 'kn' ? 'ನಿರ್ಣಾಯಕ' : language === 'hi' ? 'गंभीर' : 'Critical';
      case 'high': return language === 'kn' ? 'ಹೆಚ್ಚು' : language === 'hi' ? 'उच्च' : 'High';
      case 'medium': return language === 'kn' ? 'ಮಧ್ಯಮ' : language === 'hi' ? 'मध्यम' : 'Medium';
      case 'low': return language === 'kn' ? 'ಕಡಿಮೆ' : language === 'hi' ? 'कम' : 'Low';
      default: return severity;
    }
  };

  return (
    <div className="flex flex-col h-full w-full rounded-lg border border-ksp-gray-200 bg-white shadow-sm overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
      {/* Map toolbar */}
      <div className="bg-white/95 border-b border-ksp-gray-200 p-3 flex flex-wrap items-center justify-between gap-3 dark:bg-ksp-navy-dark dark:border-ksp-navy-light z-40">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="text-ksp-gray-600 dark:text-ksp-gray-300">
              {language === 'kn' ? 'ಅಪರಾಧ ಪ್ರಕಾರ:' : language === 'hi' ? 'अपराध श्रेणी:' : 'Crime Type:'}
            </span>
            <select
              value={crimeFilter}
              onChange={(e) => setCrimeFilter(e.target.value)}
              className="rounded border border-ksp-gray-300 bg-white px-2 py-1 outline-none dark:bg-ksp-navy dark:border-ksp-navy-light dark:text-white"
            >
              <option value="all">{language === 'kn' ? 'ಎಲ್ಲಾ ಅಪರಾಧಗಳು' : language === 'hi' ? 'सभी अपराध' : 'All Crimes'}</option>
              {crimeTypes.map(type => (
                <option key={type} value={type}>{formatCrimeType(type, t)}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-ksp-gray-600 dark:text-ksp-gray-300">
              {language === 'kn' ? 'ತೀವ್ರತೆ:' : language === 'hi' ? 'गंभीरता:' : 'Severity:'}
            </span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded border border-ksp-gray-300 bg-white px-2 py-1 outline-none dark:bg-ksp-navy dark:border-ksp-navy-light dark:text-white"
            >
              <option value="all">{language === 'kn' ? 'ಎಲ್ಲಾ ತೀವ್ರತೆಗಳು' : language === 'hi' ? 'सभी तीव्रताएं' : 'All Severities'}</option>
              <option value="critical">{getSeverityLabel('critical')}</option>
              <option value="high">{getSeverityLabel('high')}</option>
              <option value="medium">{getSeverityLabel('medium')}</option>
              <option value="low">{getSeverityLabel('low')}</option>
            </select>
          </div>
        </div>

        <div className="text-[10px] font-bold text-ksp-navy dark:text-sky-300 font-mono">
          {language === 'kn'
            ? `${filteredData.length} ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ`
            : language === 'hi'
            ? `${filteredData.length} अपराध हॉटस्पॉट प्रदर्शित हो रहे हैं`
            : `DISPLAYING ${filteredData.length} CRIME HOTSPOTS`}
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 min-h-[450px] relative z-10">
        <MapContainer 
          center={[15.3173, 75.7139]} 
          zoom={7} 
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredData.map((point) => (
            <CircleMarker
              key={point.id}
              center={[point.latitude, point.longitude]}
              pathOptions={{
                color: getSeverityColor(point.severity),
                fillColor: getSeverityColor(point.severity),
                fillOpacity: 0.5,
                weight: 1.5
              }}
              radius={Math.max(5, Math.min(25, point.count / 2))}
            >
              <Popup>
                <div className="text-xs space-y-1 font-sans">
                  <div className="font-bold text-ksp-navy border-b pb-1">
                    {formatDynamicText(point.district, language)} ({formatDynamicText(point.taluk, language)})
                  </div>
                  <div><strong>{language === 'kn' ? 'ಅಪರಾಧ:' : language === 'hi' ? 'अपराध:' : 'Crime:'}</strong> {formatCrimeType(point.crimeType, t)}</div>
                  <div><strong>{language === 'kn' ? 'ಪ್ರಕರಣಗಳ ಸಂಖ್ಯೆ:' : language === 'hi' ? 'मामलों की संख्या:' : 'Case Count:'}</strong> {point.count}</div>
                  <div>
                    <strong>{language === 'kn' ? 'ತೀವ್ರತೆ:' : language === 'hi' ? 'गंभीरता:' : 'Severity:'}</strong> 
                    <span 
                      className="ml-1 px-1 rounded text-[10px] font-bold text-white uppercase"
                      style={{ backgroundColor: getSeverityColor(point.severity) }}
                    >
                      {getSeverityLabel(point.severity)}
                    </span>
                  </div>
                  <div>
                    <strong>{language === 'kn' ? 'ಪ್ರವೃತ್ತಿ:' : language === 'hi' ? 'रुझान:' : 'Trend:'}</strong> 
                    <span className={`ml-1 font-bold ${
                      point.trend === 'increasing' ? 'text-ksp-red' :
                      point.trend === 'decreasing' ? 'text-ksp-success' : 'text-ksp-gray-600'
                    }`}>
                      {point.trend === 'increasing' 
                        ? (language === 'kn' ? 'ಏರಿಕೆ' : language === 'hi' ? 'बढ़ता' : 'INCREASING')
                        : point.trend === 'decreasing'
                        ? (language === 'kn' ? 'ಇಳಿಕೆ' : language === 'hi' ? 'घटता' : 'DECREASING')
                        : (language === 'kn' ? 'ಸ್ಥಿರ' : language === 'hi' ? 'स्थिर' : 'STABLE')}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">ID: {point.id}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      {/* Map Legend */}
      <div className="bg-white border-t border-ksp-gray-200 p-3 flex flex-wrap justify-center gap-4 text-[10px] font-bold dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-white z-40">
        <div className="flex items-center space-x-1.5"><span className="h-3 w-3 rounded-full bg-[#8B0000]" /> <span>{language === 'kn' ? 'ನಿರ್ಣಾಯಕ ಹಾಟ್‌ಸ್ಪಾಟ್' : language === 'hi' ? 'गंभीर हॉटस्पॉट' : 'Critical Hotspot'}</span></div>
        <div className="flex items-center space-x-1.5"><span className="h-3 w-3 rounded-full bg-[#D32F2F]" /> <span>{language === 'kn' ? 'ಹೆಚ್ಚಿನ ತೀವ್ರತೆ' : language === 'hi' ? 'उच्च तीव्रता' : 'High Intensity'}</span></div>
        <div className="flex items-center space-x-1.5"><span className="h-3 w-3 rounded-full bg-[#E65100]" /> <span>{language === 'kn' ? 'ಮಧ್ಯಮ ತೀವ್ರತೆ' : language === 'hi' ? 'मध्यम तीव्रता' : 'Medium Intensity'}</span></div>
        <div className="flex items-center space-x-1.5"><span className="h-3 w-3 rounded-full bg-[#F9A825]" /> <span>{language === 'kn' ? 'ಕಡಿಮೆ ತೀವ್ರತೆ' : language === 'hi' ? 'कम तीव्रता' : 'Low Intensity'}</span></div>
      </div>
    </div>
  );
}
