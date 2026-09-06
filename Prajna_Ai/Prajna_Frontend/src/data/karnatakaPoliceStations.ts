export interface DistrictPoliceStations {
  district: string;
  zone: 'Bengaluru City' | 'Southern Range' | 'Western Range' | 'Eastern Range' | 'Northern Range' | 'North-Eastern Range' | 'Central Range';
  stations: string[];
}

export const KARNATAKA_DISTRICTS_STATIONS: DistrictPoliceStations[] = [
  {
    district: "Bengaluru City Commissionerate",
    zone: "Bengaluru City",
    stations: [
      "HSR Layout Police Station",
      "Upparpet Police Station (Majestic)",
      "Cubbon Park Police Station",
      "Koramangala Police Station",
      "Indiranagar Police Station",
      "Jayanagar Police Station",
      "Whitefield Police Station",
      "Ulsoor Police Station",
      "Ashok Nagar Police Station",
      "Madiwala Police Station",
      "Electronic City Police Station",
      "Commercial Street Police Station",
      "Shivajinagar Police Station",
      "Banashankari Police Station",
      "Rajajinagar Police Station",
      "Yeshwanthpur Police Station",
      "Peenya Police Station",
      "Yelahanka Police Station",
      "K.R. Puram Police Station",
      "Marathahalli Police Station",
      "Bellandur Police Station",
      "Varthur Police Station",
      "Frazer Town Police Station",
      "High Grounds Police Station",
      "Seshadripuram Police Station",
      "Chamarajpet Police Station",
      "Subramanyapura Police Station",
      "Cyber Crime Police Station (Bengaluru City)"
    ]
  },
  {
    district: "Bengaluru Rural",
    zone: "Central Range",
    stations: [
      "Doddaballapur Town Police Station",
      "Doddaballapur Rural Police Station",
      "Nelamangala Town Police Station",
      "Nelamangala Rural Police Station",
      "Hosakote Police Station",
      "Devanahalli Police Station",
      "Vijayapura Police Station",
      "Dobbaspet Police Station"
    ]
  },
  {
    district: "Mysuru City Commissionerate & District",
    zone: "Southern Range",
    stations: [
      "Devaraja Police Station (Mysuru)",
      "Lashkar Police Station",
      "Saraswathipuram Police Station",
      "Vijayanagar Police Station (Mysuru)",
      "Kuvempunagar Police Station",
      "Nazarbad Police Station",
      "V.V. Puram Police Station (Mysuru)",
      "Mandi Police Station",
      "Jayalakshmipuram Police Station",
      "Nanjangud Town Police Station",
      "Hunsur Town Police Station",
      "T. Narasipura Police Station",
      "K.R. Nagar Police Station",
      "Mysuru Cyber Crime Police Station"
    ]
  },
  {
    district: "Hubballi-Dharwad Commissionerate",
    zone: "Northern Range",
    stations: [
      "Hubballi Sub-Urban Police Station",
      "Hubballi Town Police Station",
      "Old Hubballi Police Station",
      "Dharwad Town Police Station",
      "Dharwad Sub-Urban Police Station",
      "Vidyanagar Police Station (Hubballi)",
      "Gokul Road Police Station",
      "Keshavapur Police Station",
      "APMC Navanagar Police Station",
      "Bendigeri Police Station",
      "Garag Police Station",
      "Alnavar Police Station"
    ]
  },
  {
    district: "Mangaluru City Commissionerate & Dakshina Kannada",
    zone: "Western Range",
    stations: [
      "Mangaluru North Police Station (Bunder)",
      "Mangaluru South Police Station (Pandeshwar)",
      "Mangaluru East Police Station (Kadri)",
      "Barke Police Station",
      "Urwa Police Station",
      "Ullal Police Station",
      "Panambur Police Station",
      "Surathkal Police Station",
      "Kavoor Police Station",
      "Bantwal Town Police Station",
      "Puttur Town Police Station",
      "Sullia Police Station",
      "Belthangady Police Station",
      "Moodabidri Police Station"
    ]
  },
  {
    district: "Belagavi Commissionerate & District",
    zone: "Northern Range",
    stations: [
      "Belagavi Market Police Station",
      "Khade Bazar Police Station",
      "Tilakwadi Police Station",
      "Camp Police Station (Belagavi)",
      "Shahapur Police Station (Belagavi)",
      "Vadgaon Police Station",
      "Gokak Town Police Station",
      "Chikkodi Police Station",
      "Athani Police Station",
      "Bailhongal Police Station",
      "Ramdurg Police Station",
      "Sankeshwar Police Station",
      "Kittur Police Station"
    ]
  },
  {
    district: "Kalaburagi Commissionerate & District",
    zone: "North-Eastern Range",
    stations: [
      "Station Bazar Police Station (Kalaburagi)",
      "Brahmpur Police Station",
      "Raghavendra Nagar Police Station",
      "Chowk Police Station",
      "University Police Station (Kalaburagi)",
      "Roza Police Station",
      "Aland Police Station",
      "Sedam Police Station",
      "Chittapur Police Station",
      "Afzalpur Police Station",
      "Jewargi Police Station",
      "Shahabad Town Police Station"
    ]
  },
  {
    district: "Shivamogga",
    zone: "Eastern Range",
    stations: [
      "Shivamogga Town Police Station",
      "Doddapete Police Station",
      "Kote Police Station (Shivamogga)",
      "Vinobanagar Police Station",
      "Tunga Nagar Police Station",
      "Bhadravathi Old Town Police Station",
      "Bhadravathi Paper Town Police Station",
      "Sagar Town Police Station",
      "Shikaripura Town Police Station",
      "Thirthahalli Police Station",
      "Soraba Police Station",
      "Hosanagara Police Station"
    ]
  },
  {
    district: "Ballari & Vijayanagara",
    zone: "Eastern Range",
    stations: [
      "Brucepet Police Station (Ballari)",
      "Cowl Bazar Police Station",
      "Gandhinagar Police Station (Ballari)",
      "Ballari Rural Police Station",
      "Toranagallu Police Station",
      "Hosapete Town Police Station",
      "Hampi Tourism Police Station",
      "Sandur Police Station",
      "Siruguppa Police Station",
      "Kampli Police Station",
      "Harapanahalli Police Station",
      "Kotturu Police Station"
    ]
  },
  {
    district: "Tumakuru",
    zone: "Central Range",
    stations: [
      "Tumakuru Town Police Station",
      "Tilak Park Police Station",
      "New Extension Police Station (Tumakuru)",
      "Kyathasandra Police Station",
      "Tiptur Town Police Station",
      "Kunigal Police Station",
      "Sira Town Police Station",
      "Madhugiri Police Station",
      "Pavagada Police Station",
      "Gubbi Police Station",
      "Chikkanayakanahalli Police Station"
    ]
  },
  {
    district: "Udupi",
    zone: "Western Range",
    stations: [
      "Udupi Town Police Station",
      "Manipal Police Station",
      "Malpe Police Station",
      "Kaup Police Station",
      "Kundapura Town Police Station",
      "Karkala Town Police Station",
      "Brahmavara Police Station",
      "Padubidri Police Station",
      "Byndoor Police Station",
      "Shankaranarayana Police Station"
    ]
  },
  {
    district: "Davanagere",
    zone: "Eastern Range",
    stations: [
      "Davanagere South Police Station",
      "Davanagere Extension Police Station",
      "Vidyanagar Police Station (Davanagere)",
      "KTJ Nagar Police Station",
      "Gandhinagar Police Station (Davanagere)",
      "Harihara Town Police Station",
      "Channagiri Police Station",
      "Honnali Police Station",
      "Jagalur Police Station"
    ]
  },
  {
    district: "Hassan",
    zone: "Southern Range",
    stations: [
      "Hassan City Police Station",
      "Hassan Extension Police Station",
      "Pension Mohalla Police Station",
      "Sakleshpur Town Police Station",
      "Channarayapatna Town Police Station",
      "Holenarasipura Town Police Station",
      "Arsikere Town Police Station",
      "Belur Police Station",
      "Alur Police Station",
      "Arkalgud Police Station"
    ]
  },
  {
    district: "Bidar",
    zone: "North-Eastern Range",
    stations: [
      "Bidar New Town Police Station",
      "Gandhi Gunj Police Station",
      "Market Police Station (Bidar)",
      "Janwada Police Station",
      "Humnabad Town Police Station",
      "Bhalki Town Police Station",
      "Basavakalyan Town Police Station",
      "Aurad Police Station"
    ]
  },
  {
    district: "Raichur",
    zone: "North-Eastern Range",
    stations: [
      "Raichur Sadar Bazar Police Station",
      "Raichur West Police Station",
      "Raichur Market Police Station",
      "Netaji Nagar Police Station",
      "Sindhanur Town Police Station",
      "Manvi Police Station",
      "Lingasugur Police Station",
      "Devadurga Police Station"
    ]
  },
  {
    district: "Vijayapura",
    zone: "Northern Range",
    stations: [
      "Gol Gumbaz Police Station (Vijayapura)",
      "Gandhi Chowk Police Station (Vijayapura)",
      "APMC Police Station (Vijayapura)",
      "Adarsh Nagar Police Station",
      "Indi Town Police Station",
      "Sindagi Police Station",
      "Muddebihal Police Station",
      "Basavana Bagewadi Police Station"
    ]
  },
  {
    district: "Bagalkot",
    zone: "Northern Range",
    stations: [
      "Bagalkot Town Police Station",
      "Navanagar Police Station (Bagalkot)",
      "Badami Police Station",
      "Ilkal Town Police Station",
      "Jamkhandi Town Police Station",
      "Mudhol Police Station",
      "Guledgudda Police Station",
      "Bilagi Police Station"
    ]
  },
  {
    district: "Chitradurga",
    zone: "Eastern Range",
    stations: [
      "Chitradurga Town Police Station",
      "Chitradurga Extension Police Station",
      "Chitradurga Fort Police Station",
      "Challakere Town Police Station",
      "Hiriyur Town Police Station",
      "Holalkere Police Station",
      "Hosadurga Police Station",
      "Molakalmuru Police Station"
    ]
  },
  {
    district: "Kolar & KGF",
    zone: "Central Range",
    stations: [
      "Kolar Town Police Station",
      "Galpet Police Station",
      "Robertsonpet Police Station (KGF)",
      "Andersonpet Police Station (KGF)",
      "Bangarapet Town Police Station",
      "Mulbagal Town Police Station",
      "Srinivaspur Police Station",
      "Malur Police Station"
    ]
  },
  {
    district: "Mandya",
    zone: "Southern Range",
    stations: [
      "Mandya Central Police Station",
      "Mandya West Police Station",
      "Maddur Town Police Station",
      "Pandavapura Police Station",
      "Srirangapatna Town Police Station",
      "Nagamangala Police Station",
      "Malavalli Town Police Station",
      "K.R. Pet Police Station"
    ]
  },
  {
    district: "Chikkamagaluru",
    zone: "Western Range",
    stations: [
      "Chikkamagaluru Town Police Station",
      "Basavanahalli Police Station",
      "Chikkamagaluru Rural Police Station",
      "Mudigere Police Station",
      "Kadur Town Police Station",
      "Tarikere Town Police Station",
      "Sringeri Police Station",
      "Koppa Police Station"
    ]
  },
  {
    district: "Kodagu (Madikeri)",
    zone: "Southern Range",
    stations: [
      "Madikeri Town Police Station",
      "Madikeri Rural Police Station",
      "Kushalnagar Town Police Station",
      "Virajpet Town Police Station",
      "Somwarpet Police Station",
      "Gonikoppal Police Station",
      "Napoklu Police Station"
    ]
  },
  {
    district: "Ramanagara",
    zone: "Central Range",
    stations: [
      "Ramanagara Town Police Station",
      "Ijoor Police Station",
      "Channapatna Town Police Station",
      "Magadi Town Police Station",
      "Kanakapura Town Police Station",
      "Harohalli Police Station",
      "Bidadi Police Station"
    ]
  },
  {
    district: "Chamarajanagar",
    zone: "Southern Range",
    stations: [
      "Chamarajanagar Town Police Station",
      "Chamarajanagar East Police Station",
      "Gundlupet Town Police Station",
      "Kollegal Town Police Station",
      "Hanur Police Station",
      "Yelandur Police Station"
    ]
  },
  {
    district: "Yadgir",
    zone: "North-Eastern Range",
    stations: [
      "Yadgir Town Police Station",
      "Yadgir Traffic Police Station",
      "Shahapur Town Police Station",
      "Surpur Town Police Station",
      "Gurmitkal Police Station",
      "Shorapur Police Station"
    ]
  },
  {
    district: "Gadag",
    zone: "Northern Range",
    stations: [
      "Gadag Town Police Station",
      "Betageri Police Station",
      "Mulgund Police Station",
      "Ron Police Station",
      "Shirahatti Police Station",
      "Mundargi Police Station",
      "Nargund Police Station"
    ]
  },
  {
    district: "Haveri",
    zone: "Northern Range",
    stations: [
      "Haveri Town Police Station",
      "Haveri Sub-Urban Police Station",
      "Ranebennur Town Police Station",
      "Byadgi Police Station",
      "Shiggaon Police Station",
      "Hirekerur Police Station",
      "Hangal Police Station"
    ]
  },
  {
    district: "Koppal",
    zone: "North-Eastern Range",
    stations: [
      "Koppal Town Police Station",
      "Koppal Rural Police Station",
      "Gangavathi Town Police Station",
      "Kushtagi Police Station",
      "Yelburga Police Station",
      "Kanakagiri Police Station"
    ]
  },
  {
    district: "Uttara Kannada (Karwar)",
    zone: "Western Range",
    stations: [
      "Karwar Town Police Station",
      "Chittakula Police Station",
      "Ankola Police Station",
      "Kumta Police Station",
      "Honnavar Police Station",
      "Bhatkal Town Police Station",
      "Sirsi Town Police Station",
      "Dandeli Town Police Station",
      "Yellapur Police Station",
      "Haliyal Police Station"
    ]
  },
  {
    district: "KSP Special Investigation & Cyber Wings",
    zone: "Bengaluru City",
    stations: [
      "CID Cyber Crime Police Station (Bengaluru HQ)",
      "State Crime Intelligence Cell (SCRB Bengaluru)",
      "State Anti-Terrorism Squad (ATS Karnataka)",
      "Western Range Cyber Police Station (Mangaluru)",
      "Northern Range Cyber Police Station (Belagavi)",
      "Southern Range Cyber Police Station (Mysuru)"
    ]
  }
];

// Helper to get flattened list of all stations with district
export const ALL_KARNATAKA_POLICE_STATIONS: { name: string; district: string }[] = KARNATAKA_DISTRICTS_STATIONS.flatMap(
  (d) => d.stations.map((s) => ({ name: s, district: d.district }))
);
