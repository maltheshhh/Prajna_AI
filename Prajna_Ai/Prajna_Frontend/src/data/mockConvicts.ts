export interface ConvictProfile {
  id: string;
  convict_id: string;
  person_id?: string;
  display_name?: string;
  name: string;
  aliases: string[];
  photo_filename: string;
  photo_url: string;
  crime_type: string;
  mo_signature: string;
  conviction_date: string;
  release_status: string;
  record_status?: string;
  record_period?: string;
  record_type?: string;
  last_known_address: string;
  district: string;
  police_station: string;
  linked_firs: string[];
  risk_tier: 'High' | 'Medium' | 'Low';
  age?: number;
  reward?: string;
}

export const mockConvicts: ConvictProfile[] = [
  {
    "id": "CONV-001",
    "convict_id": "CONV-001",
    "person_id": "CONV-001",
    "name": "Riya Sharma",
    "display_name": "Riya Sharma",
    "aliases": [
      "Riya"
    ],
    "photo_filename": "CONV-001.jpg",
    "photo_url": "/assets/convicts/CONV-001.jpg",
    "crime_type": "[FICTIONAL] House Breaking / Theft",
    "mo_signature": "[FICTIONAL TEST DATA] Targeted unoccupied residential properties during daytime hours.",
    "conviction_date": "2022-06-17",
    "release_status": "Parole",
    "record_status": "Parole",
    "record_period": "2022-present",
    "record_type": "CONVICT_RECORD",
    "last_known_address": "Shanti Nagar, Ward 14, Lucknow, Uttar Pradesh",
    "district": "Lucknow",
    "police_station": "Aliganj Police Station",
    "linked_firs": [
      "FIR-184/2020",
      "FIR-57/2021"
    ],
    "risk_tier": "Medium"
  },
  {
    "id": "CONV-002",
    "convict_id": "CONV-002",
    "person_id": "CONV-002",
    "name": "Aarav Mehta",
    "display_name": "Aarav Mehta",
    "aliases": [
      "Avi"
    ],
    "photo_filename": "CONV-002.jpg",
    "photo_url": "/assets/convicts/CONV-002.jpg",
    "crime_type": "[FICTIONAL] Robbery",
    "mo_signature": "[FICTIONAL TEST DATA] Operated in pairs and targeted isolated fictional locations.",
    "conviction_date": "2021-11-09",
    "release_status": "In Custody",
    "record_status": "In Custody",
    "record_period": "2021-present",
    "record_type": "CONVICT_RECORD",
    "last_known_address": "Azad Nagar, Bhopal, Madhya Pradesh",
    "district": "Bhopal",
    "police_station": "Hanumanganj Police Station",
    "linked_firs": [
      "FIR-312/2019",
      "FIR-88/2020"
    ],
    "risk_tier": "High"
  },
  {
    "id": "CONV-003",
    "convict_id": "CONV-003",
    "person_id": "CONV-003",
    "name": "Kabir Nair",
    "display_name": "Kabir Nair",
    "aliases": [
      "Kabi"
    ],
    "photo_filename": "CONV-003.jpg",
    "photo_url": "/assets/convicts/CONV-003.jpg",
    "crime_type": "[FICTIONAL] Motor Vehicle Theft",
    "mo_signature": "[FICTIONAL TEST DATA] Targeted motorcycles parked in poorly monitored public areas.",
    "conviction_date": "2023-02-14",
    "release_status": "Released on Bail",
    "record_status": "Released on Bail",
    "record_period": "2023-present",
    "record_type": "CONVICT_RECORD",
    "last_known_address": "Kankarbagh, Patna, Bihar",
    "district": "Patna",
    "police_station": "Kankarbagh Police Station",
    "linked_firs": [
      "FIR-126/2021",
      "FIR-203/2022",
      "FIR-19/2023"
    ],
    "risk_tier": "Medium"
  },
  {
    "id": "CONV-004",
    "convict_id": "CONV-004",
    "person_id": "CONV-004",
    "name": "Ananya Iyer",
    "display_name": "Ananya Iyer",
    "aliases": [
      "Anu"
    ],
    "photo_filename": "CONV-004.jpg",
    "photo_url": "/assets/convicts/CONV-004.jpg",
    "crime_type": "[FICTIONAL] Fraud / Breach of Trust",
    "mo_signature": "[FICTIONAL TEST DATA] Obtained money through fictional business representations and false claims.",
    "conviction_date": "2020-09-28",
    "release_status": "Parole",
    "record_status": "Parole",
    "record_period": "2020-present",
    "record_type": "CONVICT_RECORD",
    "last_known_address": "Vijayanagar, Bengaluru, Karnataka",
    "district": "Bengaluru Urban",
    "police_station": "Vijayanagar Police Station",
    "linked_firs": [
      "FIR-91/2019",
      "FIR-44/2020"
    ],
    "risk_tier": "Medium"
  },
  {
    "id": "CONV-005",
    "convict_id": "CONV-005",
    "person_id": "CONV-005",
    "name": "Priya Rao",
    "display_name": "Priya Rao",
    "aliases": [
      "Priya"
    ],
    "photo_filename": "CONV-005.jpg",
    "photo_url": "/assets/convicts/CONV-005.jpg",
    "crime_type": "[FICTIONAL] Robbery / Theft",
    "mo_signature": "[FICTIONAL TEST DATA] Targeted fictional commercial locations and pedestrians carrying visible valuables.",
    "conviction_date": "2022-12-05",
    "release_status": "Released on Bail",
    "record_status": "Released on Bail",
    "record_period": "2022-present",
    "record_type": "CONVICT_RECORD",
    "last_known_address": "Mansarovar, Jaipur, Rajasthan",
    "district": "Jaipur",
    "police_station": "Mansarovar Police Station",
    "linked_firs": [
      "FIR-245/2021",
      "FIR-71/2022"
    ],
    "risk_tier": "High"
  }
];
