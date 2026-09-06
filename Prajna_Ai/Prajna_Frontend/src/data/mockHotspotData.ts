import { HotspotDataPoint } from '@/types';

const districtCenters = [
  { name: 'Bengaluru Urban', lat: 12.9716, lng: 77.5946, taluks: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal'] },
  { name: 'Mysuru', lat: 12.2958, lng: 76.6394, taluks: ['Mysuru', 'Nanjangud', 'T Narasipura', 'Hunsur'] },
  { name: 'Hubballi-Dharwad', lat: 15.3647, lng: 75.1240, taluks: ['Hubli', 'Dharwad', 'Kundgol', 'Navalgund'] },
  { name: 'Mangaluru', lat: 12.9141, lng: 74.8560, taluks: ['Mangaluru', 'Bantwal', 'Puttur', 'Belthangady'] },
  { name: 'Belagavi', lat: 15.8497, lng: 74.4977, taluks: ['Belagavi', 'Gokak', 'Athani', 'Chikodi'] },
  { name: 'Kalaburagi', lat: 17.3297, lng: 76.8343, taluks: ['Kalaburagi', 'Aland', 'Afzalpur', 'Sedam'] },
  { name: 'Raichur', lat: 16.2076, lng: 77.3463, taluks: ['Raichur', 'Manvi', 'Sindhanur', 'Devadurga'] },
  { name: 'Tumakuru', lat: 13.3379, lng: 77.1173, taluks: ['Tumkur', 'Tiptur', 'Kunigal', 'Sira'] },
  { name: 'Shivamogga', lat: 13.9299, lng: 75.5681, taluks: ['Shimoga', 'Bhadravathi', 'Sagar', 'Shikaripura'] },
  { name: 'Davanagere', lat: 14.4644, lng: 75.9218, taluks: ['Davanagere', 'Harihar', 'Channagiri', 'Honnali'] },
  { name: 'Vijayapura', lat: 16.8302, lng: 75.7100, taluks: ['Vijayapura', 'Indi', 'Sindgi', 'Muddebihal'] },
  { name: 'Ballari', lat: 15.1394, lng: 76.9214, taluks: ['Ballari', 'Sandur', 'Siruguppa', 'Kampli'] },
  { name: 'Udupi', lat: 13.3409, lng: 74.7421, taluks: ['Udupi', 'Kundapura', 'Karkala'] },
  { name: 'Hassan', lat: 13.0068, lng: 76.1004, taluks: ['Hassan', 'Arsikere', 'Channarayapatna', 'Hole Narsipur'] }
];

const crimeCategories = [
  'Theft', 'Robbery', 'Burglary / Housebreaking', 'Cybercrime', 'Murder',
  'Assault', 'Kidnapping', 'Vehicle Theft', 'Chain Snatching', 'Cheating/Fraud',
  'Drug Offences', 'Dowry Death'
];

const periods = ['2025-Q1', '2025-Q2', '2025-Q3', '2025-Q4', '2026-Q1'];

const rawHotspots: HotspotDataPoint[] = [];

// Seed explicit high severity points in key districts
rawHotspots.push(
  {
    id: 'HOT-001',
    latitude: 12.9216,
    longitude: 77.6246,
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru South',
    crimeType: 'Theft',
    count: 42,
    severity: 'critical',
    trend: 'increasing',
    period: '2026-Q1'
  },
  {
    id: 'HOT-002',
    latitude: 12.9116,
    longitude: 77.6346,
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru South',
    crimeType: 'Chain Snatching',
    count: 28,
    severity: 'high',
    trend: 'increasing',
    period: '2026-Q1'
  },
  {
    id: 'HOT-003',
    latitude: 12.2958,
    longitude: 76.6394,
    district: 'Mysuru',
    taluk: 'Mysuru',
    crimeType: 'Burglary / Housebreaking',
    count: 31,
    severity: 'high',
    trend: 'stable',
    period: '2026-Q1'
  },
  {
    id: 'HOT-004',
    latitude: 12.9041,
    longitude: 74.8560,
    district: 'Mangaluru',
    taluk: 'Mangaluru',
    crimeType: 'Drug Offences',
    count: 38,
    severity: 'critical',
    trend: 'increasing',
    period: '2026-Q1'
  },
  {
    id: 'HOT-005',
    latitude: 17.3297,
    longitude: 76.8343,
    district: 'Kalaburagi',
    taluk: 'Kalaburagi',
    crimeType: 'Cybercrime',
    count: 19,
    severity: 'medium',
    trend: 'stable',
    period: '2026-Q1'
  }
);

// Programmatically generate 80+ points
for (let i = 6; i <= 85; i++) {
  const districtObj = districtCenters[i % districtCenters.length];
  const taluk = districtObj.taluks[i % districtObj.taluks.length];
  const crimeType = crimeCategories[i % crimeCategories.length];
  const period = periods[i % periods.length];
  
  // Add GPS jitter to spread the points around the district center
  const latJitter = (Math.random() - 0.5) * 0.08;
  const lngJitter = (Math.random() - 0.5) * 0.08;

  const count = Math.floor(Math.random() * 25) + 5;
  const trends: ('increasing' | 'stable' | 'decreasing')[] = ['increasing', 'stable', 'decreasing'];
  const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];

  const severity = count > 20 ? 'high' : count > 12 ? 'medium' : 'low';

  rawHotspots.push({
    id: `HOT-0${i < 10 ? '0' : ''}${i}`,
    latitude: districtObj.lat + latJitter,
    longitude: districtObj.lng + lngJitter,
    district: districtObj.name,
    taluk: taluk,
    crimeType: crimeType,
    count: count,
    severity: count > 23 ? 'critical' : severity,
    trend: trends[i % 3],
    period: period
  });
}

export const mockHotspotData: HotspotDataPoint[] = rawHotspots;
