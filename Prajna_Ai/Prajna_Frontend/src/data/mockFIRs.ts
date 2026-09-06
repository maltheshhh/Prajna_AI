import { FIRRecord } from '@/types';

const districts = [
  { name: 'Bengaluru Urban', lat: 12.9716, lng: 77.5946, station: 'HSR Layout PS' },
  { name: 'Mysuru', lat: 12.2958, lng: 76.6394, station: 'Kuvempunagar PS' },
  { name: 'Hubballi-Dharwad', lat: 15.3647, lng: 75.1240, station: 'Vidyanagar PS' },
  { name: 'Mangaluru', lat: 12.9141, lng: 74.8560, station: 'Pandeshwar PS' },
  { name: 'Belagavi', lat: 15.8497, lng: 74.4977, station: 'Khade Bazar PS' },
  { name: 'Kalaburagi', lat: 17.3297, lng: 76.8343, station: 'Chowk PS' },
  { name: 'Raichur', lat: 16.2076, lng: 77.3463, station: 'Netaji Nagar PS' },
  { name: 'Tumakuru', lat: 13.3379, lng: 77.1173, station: 'Kyathasandra PS' },
  { name: 'Shivamogga', lat: 13.9299, lng: 75.5681, station: 'Tunga PS' },
  { name: 'Davanagere', lat: 14.4644, lng: 75.9218, station: 'KTJ Nagar PS' },
];

const crimeTypes = [
  { type: 'Theft', acts: ['Sec 379 IPC', 'Sec 303 BNS'], mo: 'Daytime housebreaking using duplicate key' },
  { type: 'Robbery', acts: ['Sec 392 IPC', 'Sec 309 BNS'], mo: 'Snatching gold chain from pedestrian at knife-point' },
  { type: 'Burglary / Housebreaking', acts: ['Sec 457 IPC', 'Sec 331 BNS'], mo: 'Night-time housebreaking by levering window grills' },
  { type: 'Cybercrime', acts: ['Sec 66 IT Act', 'Sec 66D IT Act'], mo: 'Vishing call claiming fake lottery win leading to OTP fraud' },
  { type: 'Murder', acts: ['Sec 302 IPC', 'Sec 103 BNS'], mo: 'Personal enmity leading to physical assault with sharp weapon' },
  { type: 'Assault', acts: ['Sec 323 IPC', 'Sec 325 IPC', 'Sec 115 BNS'], mo: 'Street brawl arising from sudden provocation over parking' },
  { type: 'Kidnapping', acts: ['Sec 363 IPC', 'Sec 137 BNS'], mo: 'Kidnapping minor for ransom using Maruti Omni van' },
  { type: 'Vehicle Theft', acts: ['Sec 379 IPC', 'Sec 303 BNS'], mo: 'Two-wheeler theft using master key from shopping mall parking' },
  { type: 'Chain Snatching', acts: ['Sec 356 IPC', 'Sec 379 IPC', 'Sec 303 BNS'], mo: 'Pillion rider on Pulsar bike snatching chain from walking lady' },
  { type: 'Cheating/Fraud', acts: ['Sec 420 IPC', 'Sec 318 BNS'], mo: 'Job placement fraud promising government job on cash payment' },
  { type: 'Drug Offences', acts: ['Sec 20 NDPS Act', 'Sec 22 NDPS Act'], mo: 'Peddling synthetic drugs (MDMA) near college campuses' },
  { type: 'Dowry Death', acts: ['Sec 304B IPC', 'Sec 80 BNS'], mo: 'Harassment for dowry leading to suspicious death' },
];

const AccusedNamesList = [
  'Raju K.', 'Venkatesh M.', 'Suresh Gowda', 'Fatima B.', 'Nagaraj R.', 'Manjunath S.',
  'Prakash D.', 'Imran Khan', 'Shivakumar H.', 'Deepa R.', 'Raghavendra S.',
  'Anwar Pasha', 'Karthik Gowda', 'Vijay Kumar', 'Basavaraj M.', 'Sandeep Patil',
  'Sharanappa L.', 'Ganesh Murthy', 'Channappa Gowda', 'Harish Naik',
];

const ComplainantNamesList = [
  'Lakshmi N.', 'Krishna Murthy', 'Savitha Rao', 'Mohammed Ali', 'Guru Prasad',
  'Meenakshi S.', 'Ramachandra K.', 'Sarswathi M.', 'Shekar Gowda', 'Shalini P.',
];

const IONamesList = [
  'SI Rajesh Kumar', 'Inspector Kavitha M.', 'SI Sunil Dutt', 'Inspector Raghavendra',
  'SI Deepa Gowda', 'Inspector Mohan Raju', 'SI Vijay Prasad', 'SI Basavaraj K.',
];

// Helper to generate a random date in 2025/2026
function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const rawFIRs: FIRRecord[] = [];

// Seed first 20 records explicitly for consistent realism
rawFIRs.push(
  {
    id: 'FIR-001',
    firNumber: '0012/2026',
    district: 'Bengaluru Urban',
    policeStation: 'HSR Layout PS',
    dateOfOffence: '2026-01-10T14:30:00.000Z',
    dateOfRegistration: '2026-01-11T10:00:00.000Z',
    crimeType: 'Theft',
    actsAndSections: ['Sec 379 IPC', 'Sec 303 BNS'],
    modusOperandi: 'Daytime housebreaking using duplicate key',
    complainantName: 'Lakshmi N.',
    accusedNames: ['Raju K.'],
    victimNames: ['Lakshmi N.'],
    status: 'under_investigation',
    severity: 'medium',
    location: {
      latitude: 12.9116,
      longitude: 77.6346,
      address: 'Sector 3, HSR Layout, Bengaluru',
      beat: 'Beat 4',
      circle: 'HSR Sub-division',
    },
    summary: 'Complainant reported that gold ornaments worth Rs. 1.5 Lakhs were stolen from her residence during the day. Access was gained using a duplicate key. Suspect Raju K. identified by CCTV analysis.',
    ioName: 'SI Rajesh Kumar',
    linkedFIRs: ['FIR-015'],
  },
  {
    id: 'FIR-002',
    firNumber: '0034/2026',
    district: 'Mysuru',
    policeStation: 'Kuvempunagar PS',
    dateOfOffence: '2026-01-15T22:00:00.000Z',
    dateOfRegistration: '2026-01-16T09:15:00.000Z',
    crimeType: 'Burglary / Housebreaking',
    actsAndSections: ['Sec 457 IPC', 'Sec 331 BNS'],
    modusOperandi: 'Night-time housebreaking by levering window grills',
    complainantName: 'Krishna Murthy',
    accusedNames: ['Venkatesh M.', 'Nagaraj R.'],
    victimNames: ['Krishna Murthy'],
    status: 'open',
    severity: 'high',
    location: {
      latitude: 12.2858,
      longitude: 76.6294,
      address: 'M-Block, Kuvempunagar, Mysuru',
      beat: 'Beat 2',
      circle: 'Mysuru South Circle',
    },
    summary: 'Accused levered the kitchen window iron grills of a locked house at night and decamped with cash worth Rs. 3 Lakhs and silver articles. Neighbors reported seeing two individuals.',
    ioName: 'SI Sunil Dutt',
    linkedFIRs: [],
  },
  {
    id: 'FIR-003',
    firNumber: '0023/2026',
    district: 'Kalaburagi',
    policeStation: 'Chowk PS',
    dateOfOffence: '2026-01-20T11:00:00.000Z',
    dateOfRegistration: '2026-01-20T14:00:00.000Z',
    crimeType: 'Cybercrime',
    actsAndSections: ['Sec 66D IT Act'],
    modusOperandi: 'Vishing call claiming fake lottery win leading to OTP fraud',
    complainantName: 'Mohammed Ali',
    accusedNames: ['Unknown'],
    victimNames: ['Mohammed Ali'],
    status: 'under_investigation',
    severity: 'medium',
    location: {
      latitude: 17.3327,
      longitude: 76.8443,
      address: 'Gunj Area, Kalaburagi',
      beat: 'Beat 5',
      circle: 'Kalaburagi North Circle',
    },
    summary: 'The victim received a phone call from an unknown person claiming to be a bank manager. The caller obtained the victim\'s net banking OTP under the pretext of upgrading their account, leading to an unauthorized transfer of Rs. 49,800.',
    ioName: 'SI Deepa Gowda',
    linkedFIRs: [],
  },
  {
    id: 'FIR-004',
    firNumber: '0045/2026',
    district: 'Bengaluru Urban',
    policeStation: 'HSR Layout PS',
    dateOfOffence: '2026-01-28T09:45:00.000Z',
    dateOfRegistration: '2026-01-28T12:00:00.000Z',
    crimeType: 'Chain Snatching',
    actsAndSections: ['Sec 356 IPC', 'Sec 379 IPC'],
    modusOperandi: 'Pillion rider on Pulsar bike snatching chain from walking lady',
    complainantName: 'Savitha Rao',
    accusedNames: ['Suresh Gowda', 'Raju K.'],
    victimNames: ['Savitha Rao'],
    status: 'chargesheeted',
    severity: 'high',
    location: {
      latitude: 12.9216,
      longitude: 77.6246,
      address: '14th Main, HSR Layout, Bengaluru',
      beat: 'Beat 3',
      circle: 'HSR Sub-division',
    },
    summary: 'While the complainant was walking back from a local temple, two motor-cyclists on a black Pulsar bike approached from behind. The pillion rider snatched her gold mangalasutra weighing 40g and sped away.',
    ioName: 'SI Rajesh Kumar',
    linkedFIRs: ['FIR-001', 'FIR-015'],
  },
  {
    id: 'FIR-005',
    firNumber: '0005/2026',
    district: 'Mangaluru',
    policeStation: 'Pandeshwar PS',
    dateOfOffence: '2026-02-02T23:30:00.000Z',
    dateOfRegistration: '2026-02-03T01:30:00.000Z',
    crimeType: 'Drug Offences',
    actsAndSections: ['Sec 20 NDPS Act'],
    modusOperandi: 'Peddling synthetic drugs (MDMA) near college campuses',
    complainantName: 'State (KSP)',
    accusedNames: ['Imran Khan', 'Fatima B.'],
    victimNames: ['Society'],
    status: 'under_investigation',
    severity: 'critical',
    location: {
      latitude: 12.9041,
      longitude: 74.8460,
      address: 'Jyothi Circle, Mangaluru',
      beat: 'Beat 1',
      circle: 'Mangaluru City Range',
    },
    summary: 'Based on a credible tip-off, a raid was conducted. Accused Imran Khan and Fatima B. were apprehended while in possession of 15g of MDMA crystals, meant for sale to college students in the locality.',
    ioName: 'Inspector Kavitha M.',
    linkedFIRs: [],
  }
);

// Fill remaining up to 50 programmatically with realistic variety
const startYear = new Date('2025-01-01');
const endYear = new Date('2026-06-01');

for (let i = 6; i <= 50; i++) {
  const districtObj = districts[i % districts.length];
  const crimeTypeObj = crimeTypes[i % crimeTypes.length];
  const accusedName = AccusedNamesList[i % AccusedNamesList.length];
  const coAccused = i % 7 === 0 ? [AccusedNamesList[(i + 3) % AccusedNamesList.length]] : [];
  const complainant = ComplainantNamesList[i % ComplainantNamesList.length];
  const io = IONamesList[i % IONamesList.length];
  
  const latJitter = (Math.random() - 0.5) * 0.05;
  const lngJitter = (Math.random() - 0.5) * 0.05;
  
  const offenceDate = getRandomDate(startYear, endYear);
  const regDate = new Date(new Date(offenceDate).getTime() + (Math.random() * 2 + 0.1) * 24 * 60 * 60 * 1000).toISOString();
  
  const statuses: ('open' | 'under_investigation' | 'chargesheeted' | 'closed' | 'convicted')[] = [
    'open', 'under_investigation', 'chargesheeted', 'closed', 'convicted'
  ];
  const severities: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical'];

  rawFIRs.push({
    id: `FIR-0${i}`,
    firNumber: `${String(i).padStart(4, '0')}/${new Date(regDate).getFullYear()}`,
    district: districtObj.name,
    policeStation: districtObj.station,
    dateOfOffence: offenceDate,
    dateOfRegistration: regDate,
    crimeType: crimeTypeObj.type,
    actsAndSections: crimeTypeObj.acts,
    modusOperandi: crimeTypeObj.mo,
    complainantName: complainant,
    accusedNames: [accusedName, ...coAccused],
    victimNames: [complainant],
    status: statuses[i % statuses.length],
    severity: severities[i % severities.length],
    location: {
      latitude: districtObj.lat + latJitter,
      longitude: districtObj.lng + lngJitter,
      address: `Ward ${i % 15}, Near landmark, ${districtObj.name}`,
      beat: `Beat ${1 + (i % 6)}`,
      circle: `${districtObj.name} Central Circle`,
    },
    summary: `Detailed investigation report for registered offence ${crimeTypeObj.type}. Incident occurred near public area. Modus Operandi matches historical signature ${crimeTypeObj.mo}. Access method is noted. The case is registered under appropriate acts.`,
    ioName: io,
    linkedFIRs: i % 11 === 0 ? [`FIR-00${1 + (i % 5)}`] : [],
  });
}

export const mockFIRs: FIRRecord[] = rawFIRs;
