// entityExtractor.js — Prajna-AI KSP Crime Intelligence

function extractEntities(query) {
  const entities = {};
  const q = query.toLowerCase();

  // =========================
  // Karnataka Districts
  // =========================
  const districts = {
    "bengaluru": "Bengaluru Urban",
    "bangalore": "Bengaluru Urban",
    "bengaluru urban": "Bengaluru Urban",
    "bengaluru rural": "Bengaluru Rural",
    "mysuru": "Mysuru",
    "mysore": "Mysuru",
    "mangaluru": "Dakshina Kannada",
    "mangalore": "Dakshina Kannada",
    "udupi": "Udupi",
    "shivamogga": "Shivamogga",
    "shimoga": "Shivamogga",
    "belagavi": "Belagavi",
    "belgaum": "Belagavi",
    "kalaburagi": "Kalaburagi",
    "gulbarga": "Kalaburagi",
    "ballari": "Ballari",
    "bellary": "Ballari",
    "raichur": "Raichur",
    "yadgir": "Yadgir",
    "bidar": "Bidar",
    "bagalkot": "Bagalkot",
    "vijayapura": "Vijayapura",
    "bijapur": "Vijayapura",
    "gadag": "Gadag",
    "haveri": "Haveri",
    "davanagere": "Davanagere",
    "tumakuru": "Tumakuru",
    "tumkur": "Tumakuru",
    "hassan": "Hassan",
    "kodagu": "Kodagu",
    "mandya": "Mandya",
    "kolar": "Kolar",
    "chikkaballapura": "Chikkaballapura",
    "chikkamagaluru": "Chikkamagaluru",
    "ramanagara": "Ramanagara",
    "chamarajanagar": "Chamarajanagar",
    "koppal": "Koppal",
    "uttara kannada": "Uttara Kannada",
    "dharwad": "Dharwad",
    "vijayanagara": "Vijayanagara"
  };

  for (const [key, value] of Object.entries(districts)) {
    if (q.includes(key)) {
      entities.district = value;
      break;
    }
  }

  // =========================
  // Crime Types
  // =========================
  const crimeTypes = {
    "Theft": [
      "theft",
      "steal",
      "stolen"
    ],

    "Vehicle Theft": [
      "vehicle theft",
      "bike theft",
      "car theft",
      "motorcycle theft"
    ],

    "Robbery": [
      "robbery",
      "rob"
    ],

    "Burglary": [
      "burglary",
      "housebreaking",
      "house break"
    ],

    "Cybercrime": [
      "cybercrime",
      "cyber crime",
      "phishing",
      "hacking",
      "online fraud",
      "otp fraud"
    ],

    "Murder": [
      "murder",
      "homicide",
      "killing"
    ],

    "Assault": [
      "assault",
      "attack"
    ],

    "Kidnapping": [
      "kidnap",
      "abduction"
    ],

    "Chain Snatching": [
      "chain snatching",
      "snatching"
    ],

    "Fraud": [
      "fraud",
      "cheating",
      "scam"
    ],

    "Drug Offence": [
      "drug",
      "ndps",
      "narcotics"
    ],

    "Dowry Death": [
      "dowry",
      "dowry death"
    ]
  };

  outerLoop:
  for (const [crime, keywords] of Object.entries(crimeTypes)) {
    for (const keyword of keywords) {
      if (q.includes(keyword)) {
        entities.crimeType = crime;
        break outerLoop;
      }
    }
  }

  // =========================
  // FIR Number
  // =========================
  const firMatch = q.match(/\b\d{1,5}\/\d{4}\b/);

  if (firMatch) {
    entities.firNumber = firMatch[0];
  }

  // =========================
  // Year
  // =========================
  const yearMatch = q.match(/\b(2023|2024|2025|2026|2027)\b/);

  if (yearMatch) {
    entities.year = parseInt(yearMatch[0]);
  }

  // =========================
  // Case Status
  // =========================
  const statuses = {
    "open": "open",
    "closed": "closed",
    "under investigation": "under_investigation",
    "chargesheeted": "chargesheeted",
    "convicted": "convicted",
    "pending": "under_investigation"
  };

  for (const [key, value] of Object.entries(statuses)) {
    if (q.includes(key)) {
      entities.status = value;
      break;
    }
  }

  // =========================
  // Police Stations
  // =========================
  const policeStations = [
    "shivajinagar ps",
    "hsr layout ps",
    "vidyanagar ps",
    "ashok nagar ps",
    "jayanagar ps",
    "banashankari ps"
  ];

  for (const station of policeStations) {
    if (q.includes(station)) {
      entities.policeStation = station
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      break;
    }
  }

  return entities;
}

module.exports = extractEntities;