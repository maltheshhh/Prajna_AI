import { RecidivismScore } from '@/types';

export const mockRecidivismScores: RecidivismScore[] = [
  {
    suspectId: 'SUS-001',
    suspectName: 'Raju K.',
    riskScore: 73,
    predictedCrimeType: 'Vehicle Theft',
    predictedTimeline: '60% probability within 6 weeks',
    predictedZone: 'Bengaluru South — Jayanagar area',
    triggerFactors: [
      'Released 45 days ago from Parappana Agrahara Central Jail',
      'Two known associates (Venkatesh M., Nagaraj R.) recently active in same district',
      'Historical pattern of monsoon-season offending (June-September)',
      'High unemployment in the Whitefield industrial area'
    ],
    lastUpdated: '2026-02-15T12:00:00.000Z'
  },
  {
    suspectId: 'SUS-002',
    suspectName: 'Venkatesh M.',
    riskScore: 89,
    predictedCrimeType: 'Burglary / Housebreaking',
    predictedTimeline: '85% probability within 4 weeks',
    predictedZone: 'Mysuru North — Gokulam area',
    triggerFactors: [
      'Released 15 days ago',
      'Immediate reconnect with co-accused Nagaraj R.',
      'Active phone contacts with fence suspect in Bengaluru',
      'Unresolved financial debts with local lenders'
    ],
    lastUpdated: '2026-02-18T10:30:00.000Z'
  },
  {
    suspectId: 'SUS-003',
    suspectName: 'Nagaraj R.',
    riskScore: 54,
    predictedCrimeType: 'Burglary / Housebreaking',
    predictedTimeline: '45% probability within 12 weeks',
    predictedZone: 'Mysuru South — Kuvempunagar area',
    triggerFactors: [
      'Historical pattern of offending in locked houses during wedding season',
      'Associating with high-risk offender Venkatesh M.',
      'Unstable employment status'
    ],
    lastUpdated: '2026-02-10T14:15:00.000Z'
  },
  {
    suspectId: 'SUS-004',
    suspectName: 'Suresh Gowda',
    riskScore: 81,
    predictedCrimeType: 'Chain Snatching',
    predictedTimeline: '75% probability within 5 weeks',
    predictedZone: 'Bengaluru East — Indiranagar area',
    triggerFactors: [
      'Prior convictions for grab-and-run thefts',
      'Frequent visits to gold buying establishments in KR Market',
      'Access to registered vehicle KA-01-AB-1234 commonly used in offenses'
    ],
    lastUpdated: '2026-02-12T09:00:00.000Z'
  },
  {
    suspectId: 'SUS-005',
    suspectName: 'Fatima B.',
    riskScore: 78,
    predictedCrimeType: 'Drug Offences',
    predictedTimeline: '70% probability within 8 weeks',
    predictedZone: 'Mangaluru City — Jyothi Circle area',
    triggerFactors: [
      'Prior history of MDMA trafficking',
      'Active supply network in college hostels',
      'Encrypted messaging app activity spike detected'
    ],
    lastUpdated: '2026-02-16T15:20:00.000Z'
  }
];

// Add 10 more programmatically to complete 15 entries
const suspectNames = [
  'Imran Khan', 'Nagaraj S.', 'Manjunath S.', 'Prakash D.', 'Raghavendra S.',
  'Anwar Pasha', 'Karthik Gowda', 'Vijay Kumar', 'Basavaraj M.', 'Sandeep Patil'
];

const crimeTypes = [
  'Theft', 'Burglary / Housebreaking', 'Cybercrime', 'Drug Offences', 'Cheating/Fraud'
];

const zones = [
  'Hubballi Central — Vidyanagar', 'Belagavi City — Khade Bazar', 'Kalaburagi North — Gunj',
  'Raichur Town — Netaji Nagar', 'Tumakuru Central — Kyathasandra', 'Shivamogga Town — Tunga Area',
  'Davanagere City — KTJ Nagar', 'Vijayapura — Indi Road', 'Ballari City — Sandur Area', 'Udupi Town — Kundapura'
];

const triggerPool = [
  'High unemployment in offender\'s home district',
  'Two known associates recently active in same district',
  'Unstable home address or migrant labor movement',
  'Historical pattern of seasonal offending',
  'Previous conviction for similar crime type',
  'Frequent visits to known crime hotspot areas',
  'Phone calls to active suspects under investigation',
  'Financial distress due to loss of occupation'
];

for (let i = 6; i <= 15; i++) {
  const suspectId = `SUS-0${i < 10 ? '0' : ''}${i}`;
  const name = suspectNames[i - 6];
  const score = Math.floor(Math.random() * 55) + 30; // scores 30-85
  const crime = crimeTypes[i % crimeTypes.length];
  const zone = zones[i - 6];
  
  // Pick random trigger factors
  const triggers = [
    triggerPool[i % triggerPool.length],
    triggerPool[(i + 3) % triggerPool.length]
  ];
  if (score > 60) {
    triggers.push(triggerPool[(i + 5) % triggerPool.length]);
  }

  mockRecidivismScores.push({
    suspectId: suspectId,
    suspectName: name,
    riskScore: score,
    predictedCrimeType: crime,
    predictedTimeline: `${score - 10}% probability within ${Math.floor(score / 8)} weeks`,
    predictedZone: zone,
    triggerFactors: triggers,
    lastUpdated: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString()
  });
}
