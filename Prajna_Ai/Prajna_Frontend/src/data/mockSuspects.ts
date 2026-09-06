import { SuspectProfile } from '@/types';

export const mockSuspects: SuspectProfile[] = [
  {
    id: 'SUS-001',
    name: 'Raju K.',
    aliases: ['Shorty Raju', 'Kulla Raju'],
    age: 29,
    gender: 'male',
    photoUrl: undefined,
    aadharHash: 'a12b34c56def7890',
    district: 'Bengaluru Urban',
    knownAddresses: [
      'Slum Quarter, Lakkasandra, Wilson Garden, Bengaluru',
      'No. 45, 1st Cross, Begur Road, Bommanahalli, Bengaluru'
    ],
    linkedFIRs: ['FIR-001', 'FIR-004', 'FIR-015'],
    moSignature: 'Daytime housebreaking using duplicate key',
    riskTier: 'high',
    totalCases: 6,
    isRepeatOffender: true,
    lastKnownActivity: '2026-01-28T09:45:00.000Z',
    associateIds: ['SUS-002', 'SUS-005'],
    financialAccounts: ['SBI-XXXXX98213']
  },
  {
    id: 'SUS-002',
    name: 'Venkatesh M.',
    aliases: ['Macha Venky', 'Speed Venky'],
    age: 26,
    gender: 'male',
    photoUrl: undefined,
    aadharHash: 'b56c78d90ef1234a',
    district: 'Mysuru',
    knownAddresses: [
      'No. 12, Naganahalli Village, Mysuru Outer Road, Mysuru',
      'Behind Bus Stand, Kuvempunagar, Mysuru'
    ],
    linkedFIRs: ['FIR-002', 'FIR-012', 'FIR-022'],
    moSignature: 'Night-time housebreaking by levering window grills',
    riskTier: 'high',
    totalCases: 4,
    isRepeatOffender: true,
    lastKnownActivity: '2026-02-05T22:00:00.000Z',
    associateIds: ['SUS-001', 'SUS-003'],
    financialAccounts: ['CANARA-XXXXX34123']
  },
  {
    id: 'SUS-003',
    name: 'Nagaraj R.',
    aliases: ['Naga', 'Double Naga'],
    age: 32,
    gender: 'male',
    photoUrl: undefined,
    aadharHash: 'c78d90e1234ab56c',
    district: 'Mysuru',
    knownAddresses: [
      'Gokulam 3rd Stage, Near Water Tank, Mysuru',
      'Chamarajanagar Town, Karnataka'
    ],
    linkedFIRs: ['FIR-002', 'FIR-022'],
    moSignature: 'Night-time housebreaking by levering window grills',
    riskTier: 'medium',
    totalCases: 2,
    isRepeatOffender: true,
    lastKnownActivity: '2026-01-15T22:00:00.000Z',
    associateIds: ['SUS-002'],
    financialAccounts: []
  },
  {
    id: 'SUS-004',
    name: 'Suresh Gowda',
    aliases: ['Gowdru', 'Bullet Suresh'],
    age: 35,
    gender: 'male',
    photoUrl: undefined,
    aadharHash: 'd90e123ab56c78d9',
    district: 'Bengaluru Urban',
    knownAddresses: [
      'Kanakapura Main Road, Harohalli, Ramanagara',
      'Rent House, Sector 2, HSR Layout, Bengaluru'
    ],
    linkedFIRs: ['FIR-004', 'FIR-014'],
    moSignature: 'Pillion rider on Pulsar bike snatching chain from walking lady',
    riskTier: 'high',
    totalCases: 5,
    isRepeatOffender: true,
    lastKnownActivity: '2026-01-28T09:45:00.000Z',
    associateIds: ['SUS-001'],
    financialAccounts: ['HDFC-XXXXX11223']
  },
  {
    id: 'SUS-005',
    name: 'Fatima B.',
    aliases: ['Zoya', 'Drug Queen'],
    age: 28,
    gender: 'female',
    photoUrl: undefined,
    aadharHash: 'e123ab56c78d90ef',
    district: 'Mangaluru',
    knownAddresses: [
      'Near Ullal Dargah, Ullal, Mangaluru',
      'PG Accommodation, Jyothi Circle, Mangaluru'
    ],
    linkedFIRs: ['FIR-005', 'FIR-025'],
    moSignature: 'Peddling synthetic drugs (MDMA) near college campuses',
    riskTier: 'high',
    totalCases: 3,
    isRepeatOffender: true,
    lastKnownActivity: '2026-02-02T23:30:00.000Z',
    associateIds: ['SUS-006', 'SUS-001'],
    financialAccounts: ['ICICI-XXXXX88990']
  },
  {
    id: 'SUS-006',
    name: 'Imran Khan',
    aliases: ['Bhaiyya', 'KGF Imran'],
    age: 31,
    gender: 'male',
    photoUrl: undefined,
    aadharHash: 'f456ab78c90d12ef',
    district: 'Mangaluru',
    knownAddresses: [
      'Bunder Area, Mangaluru',
      'Valachil, Mangaluru'
    ],
    linkedFIRs: ['FIR-005', 'FIR-035'],
    moSignature: 'Peddling synthetic drugs (MDMA) near college campuses',
    riskTier: 'medium',
    totalCases: 2,
    isRepeatOffender: true,
    lastKnownActivity: '2026-02-02T23:30:00.000Z',
    associateIds: ['SUS-005'],
    financialAccounts: []
  }
];

// Dynamically generate the remaining 24 suspects to complete the array of 30
const districtsList = [
  'Bengaluru Urban', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi',
  'Kalaburagi', 'Raichur', 'Tumakuru', 'Shivamogga', 'Davanagere'
];
const namesList = [
  'Nagaraj S.', 'Manjunath S.', 'Prakash D.', 'Raghavendra S.', 'Anwar Pasha',
  'Karthik Gowda', 'Vijay Kumar', 'Basavaraj M.', 'Sandeep Patil', 'Sharanappa L.',
  'Ganesh Murthy', 'Channappa Gowda', 'Harish Naik', 'Mallikarjun R.', 'Shankar V.',
  'Ananth Gowda', 'Muniraju N.', 'Ravikiran K.', 'Santosh Gowda', 'Naveen Kumar',
  'Kiran Naik', 'Vinay Prasad', 'Sachin Gowda', 'Pradeep Gowda'
];

const moSignaturesList = [
  'Daytime housebreaking using duplicate key',
  'ATM card skimming at isolated kiosks',
  'Highway vehicle interception at night',
  'Online investment fraud via WhatsApp',
  'Chain snatching on two-wheeler in crowded markets',
  'Pickpocketing near bus stands during rush hour'
];

for (let i = 7; i <= 30; i++) {
  const name = namesList[(i - 7) % namesList.length];
  const district = districtsList[(i - 7) % districtsList.length];
  const mo = moSignaturesList[(i - 7) % moSignaturesList.length];
  const riskTiers: ('high' | 'medium' | 'low')[] = ['high', 'medium', 'low'];
  const risk = riskTiers[(i - 7) % 3];

  mockSuspects.push({
    id: `SUS-0${i < 10 ? '0' : ''}${i}`,
    name: name,
    aliases: [`${name.split(' ')[0]} Bhai`, `${name.split(' ')[0]} Anna`],
    age: 22 + (i % 25),
    gender: i % 15 === 0 ? 'female' : 'male',
    aadharHash: `hash-${i}f923b092-${i}`,
    district: district,
    knownAddresses: [
      `Street No. ${i}, Near Police Chowki, ${district}`,
      `House No. ${10 + i}, Old Town, ${district}`
    ],
    linkedFIRs: [`FIR-0${i}`],
    moSignature: mo,
    riskTier: risk,
    totalCases: 1 + (i % 3),
    isRepeatOffender: i % 3 === 0,
    lastKnownActivity: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    associateIds: i % 4 === 0 ? [`SUS-0${i - 1}`] : [],
    financialAccounts: i % 2 === 0 ? [`SBI-XXXXX5${i}29`] : []
  });
}
