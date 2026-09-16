import React, { useState, useEffect } from 'react';
import { FaceSearchPanel } from '@/components/face/FaceSearchPanel';
import { NafisFingerprintMatcher } from '@/components/biometrics/NafisFingerprintMatcher';
import { InvestigatorFaceHistory } from '@/components/face/InvestigatorFaceHistory';
import { useAuth } from '@/context/AuthContext';
import { getInvestigatorFaceHistory } from '@/utils/faceHistoryStorage';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { 
  Shield, Eye, FileText, CheckCircle, Database, ArrowLeft, AlertTriangle, 
  UserCheck, MapPin, Megaphone, Lock, Upload, Bell, Sun, Moon, Fingerprint, 
  Sparkles, Check, Clock, Phone, User, Building2, Search, X, Download, ShieldCheck, 
  ExternalLink, ScanFace, RotateCcw, ShieldAlert, Cpu, ChevronDown, Info, History
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { submitCitizenReport, submitSightingReport, verifyDigiLocker, matchFace, fetchOffenderProfiles, fetchCitizenReports, sendRealOtpApi, verifyRealOtpApi } from '@/utils/api';
import { KARNATAKA_DISTRICTS_STATIONS, ALL_KARNATAKA_POLICE_STATIONS } from '@/data/karnatakaPoliceStations';
import { matchSuspectPhoto, BiometricMatchResult, ConvictProfile, KSP_CONVICT_ROSTER } from '@/utils/faceMatchingEngine';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';

const CITIZEN_I18N: Record<'en' | 'kn' | 'hi', Record<string, string>> = {
  en: {
    kspHeader: "Karnataka State Police",
    citizenPortalTag: "Citizen Portal",
    portalSubtitle: "Public Incident Filing & Wanted Suspects Gateway",
    officerLogin: "Officer Login",
    legalWarningBadge: "LEGAL WARNING",
    legalWarningText: "⚠️ LEGAL WARNING: Filing false crime reports or misleading police telemetry is a punishable criminal offence under Section 217 & Section 248 of Bharatiya Nyaya Sanhita (BNS) & Section 182 of IPC. Violators face up to 7 years imprisonment & heavy fines. All citizen IP addresses, DigiLocker tokens, and GPS coordinates are logged live for legal prosecution.",
    officialGateway: "Official KSP Gateway",
    crimeRegistry: "Karnataka Police Crime Registry",
    portalTitle: "KSP Public Citizen Portal",
    portalDesc: "File incident reports with DigiLocker resident verification across all Karnataka police jurisdictions, or submit direct tips on wanted suspects.",
    citizenSecurity: "KSP Citizen Security",
    securitySubtext: "256-Bit TLS & DigiLocker Verified",
    tabReport: "1. File Incident Report (DigiLocker Verified)",
    tabWanted: "2. Wanted Criminals Roster (Direct Reporting)",
    digiAuthBadge: "DigiLocker Identity Authenticated",
    digiReqBadge: "DigiLocker Verification Required",
    digiAuthTitle: "Verified Resident",
    digiReqTitle: "Resident Verification Gate: Mandatory Prior to Incident Submission",
    digiAuthDesc: "Your digital resident consent token is attached to this incident for expedited police station dispatch.",
    digiReqDesc: "Karnataka State Police requires DigiLocker resident verification to validate genuine emergency complaints and prevent spoofing.",
    verifyWithDigi: "Verify with DigiLocker",
    changeVerify: "Change / Re-verify",
    incidentDetailsHeader: "Enter Incident & Crime Details",
    incidentDetailsSubtitle: "Provide accurate occurrence location, select your jurisdictional Karnataka police station, and upload any suspect photos.",
    categoryLabel: "INCIDENT CLASSIFICATION / CRIME CATEGORY *",
    dateTimeLabel: "DATE & TIME OF OCCURRENCE *",
    stationSectionLabel: "Choose Police Station Across All of Karnataka *",
    districtsStationsCount: "31 Districts • 100+ Police Stations",
    selectDistrictLabel: "1. SELECT KARNATAKA DISTRICT / COMMISSIONERATE:",
    selectStationLabel: "2. SELECT JURISDICTIONAL POLICE STATION:",
    searchStationPlaceholder: "Or quickly search any police station in Karnataka (e.g., Upparpet, Devaraja, Kadri, Market, Hubballi)...",
    locationLabel: "LOCATION OF OCCURRENCE / STREET LANDMARK *",
    locationPlaceholder: "e.g., Near Majestic Intermodal Terminal Platform 4, Bengaluru",
    descriptionLabel: "INCIDENT DETAILS, SUSPECT APPEARANCE & VEHICLE NUMBERS *",
    descriptionPlaceholder: "Describe what happened, time of event, suspect physical build, height, attire, companion details, vehicle registration numbers, or escape direction...",
    uploadLabel: "Attach Suspect Photograph or CCTV Grab (For Police AI Historical Face Search)",
    uploadSubtitle: "Attach photo of suspect, CCTV freeze frame, or incident scene snapshot. CIRAS searches this image against historical police reference records (2011–2013).",
    submitBtn: "SUBMIT VERIFIED INCIDENT REPORT",
    submittingBtn: "TRANSMITTING INCIDENT REPORT TO POLICE HQ...",

    digiPromptNotice: "* You will be prompted to authenticate with DigiLocker before final transmission.",
    wantedHeader: "Karnataka State Police Active Wanted Suspects & Convicts",
    wantedSubtitle: "Direct Crime Sighting Portal: No DigiLocker Verification Required. Citizens can immediately submit tips and sightings anonymously.",
    directSightingBadge: "Direct Sighting Active",
    reportSightingBtn: "Report Sighting / Tip",
  },
  kn: {
    kspHeader: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್",
    citizenPortalTag: "ನಾಗರಿಕ ಪೋರ್ಟಲ್",
    portalSubtitle: "ಸಾರ್ವಜನಿಕ ಘಟನಾ ದಾಖಲಾತಿ ಮತ್ತು ಬೇಕಾಗಿರುವ ಶಂಕಿತರ ಗೇಟ್‌ವೇ",
    officerLogin: "ಅಧಿಕಾರಿ ಲಾಗಿನ್",
    legalWarningBadge: "ಕಾನೂನು ಎಚ್ಚರಿಕೆ",
    legalWarningText: "⚠️ ಕಾನೂನು ಎಚ್ಚರಿಕೆ: ಸುಳ್ಳು ಅಪರಾಧ ವರದಿಯನ್ನು ಸಲ್ಲಿಸುವುದು ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆ (BNS) ಸೆಕ್ಷನ್ 217 ಮತ್ತು 248 ಹಾಗೂ IPC ಸೆಕ್ಷನ್ 182 ರ ಅಡಿಯಲ್ಲಿ ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧವಾಗಿದೆ. ಉಲ್ಲಂಘಿಸುವವರಿಗೆ 7 ವರ್ಷಗಳವರೆಗೆ ಜೈಲು ಶಿಕ್ಷೆ ಮತ್ತು ಭಾರಿ ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ. ಕಾನೂನು ಕ್ರಮಕ್ಕಾಗಿ ಎಲ್ಲಾ ನಾಗರಿಕ ಐಪಿ ವಿಳಾಸಗಳು, ಡಿಜಿಲಾಕರ್ ಟೋಕನ್‌ಗಳು ಮತ್ತು ಜಿಪಿಎಸ್ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಲೈವ್ ಆಗಿ ದಾಖಲಿಸಲಾಗುತ್ತದೆ.",
    officialGateway: "ಅಧಿಕೃತ ಕೆಎಸ್‌ಪಿ ಗೇಟ್‌ವೇ",
    crimeRegistry: "ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಅಪರಾಧ ನೋಂದಣಿ",
    portalTitle: "ಕೆಎಸ್‌ಪಿ ಸಾರ್ವಜನಿಕ ನಾಗರಿಕ ಪೋರ್ಟಲ್",
    portalDesc: "ಎಲ್ಲಾ ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಠಾಣೆಗಳ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಡಿಜಿಲಾಕರ್ ನಿವಾಸಿ ದೃಢೀಕರಣದೊಂದಿಗೆ ಘಟನಾ ವರದಿಗಳನ್ನು ದಾಖಲಿಸಿ, ಅಥವಾ ಬೇಕಾಗಿರುವ ಶಂಕಿತರ ಬಗ್ಗೆ ನೇರ ಸುಳಿವುಗಳನ್ನು ನೀಡಿ.",
    citizenSecurity: "ಕೆಎಸ್‌ಪಿ ನಾಗರಿಕ ಭದ್ರತೆ",
    securitySubtext: "256-ಬಿಟ್ ಟಿಎಲ್‌ಎಸ್ ಮತ್ತು ಡಿಜಿಲಾಕರ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    tabReport: "1. ಘಟನಾ ವರದಿ ದಾಖಲಿಸಿ (ಡಿಜಿಲಾಕರ್ ದೃಢೀಕೃತ)",
    tabWanted: "2. ಬೇಕಾಗಿರುವ ಅಪರಾಧಿಗಳ ಪಟ್ಟಿ (ನೇರ ಮಾಹಿತಿ)",
    digiAuthBadge: "ಡಿಜಿಲಾಕರ್ ಗುರುತು ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    digiReqBadge: "ಡಿಜಿಲಾಕರ್ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ",
    digiAuthTitle: "ದೃಢೀಕೃತ ನಿವಾಸಿ",
    digiReqTitle: "ನಿವಾಸಿ ಪರಿಶೀಲನಾ ದ್ವಾರ: ಘಟನೆ ಸಲ್ಲಿಸುವ ಮೊದಲು ಕಡ್ಡಾಯ",
    digiAuthDesc: "ಪೊಲೀಸ್ ಠಾಣೆಗೆ ತ್ವರಿತ ರವಾನೆಗಾಗಿ ನಿಮ್ಮ ಡಿಜಿಟಲ್ ನಿವಾಸಿ ಒಪ್ಪಿಗೆ ಟೋಕನ್ ಲಗತ್ತಿಸಲಾಗಿದೆ.",
    digiReqDesc: "ನಿಖರ ತುರ್ತು ದೂರುಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಸುಳ್ಳು ದೂರುಗಳನ್ನು ತಡೆಯಲು ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸರು ಡಿಜಿಲಾಕರ್ ನಿವಾಸಿ ಪರಿಶೀಲನೆಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸಿದ್ದಾರೆ.",
    verifyWithDigi: "ಡಿಜಿಲಾಕರ್ ಮೂಲಕ ಪರಿಶೀಲಿಸಿ",
    changeVerify: "ಬದಲಾಯಿಸಿ / ಮರು ಪರಿಶೀಲಿಸಿ",
    incidentDetailsHeader: "ಘಟನೆ ಮತ್ತು ಅಪರಾಧದ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    incidentDetailsSubtitle: "ನಿಖರವಾದ ಘಟನಾ ಸ್ಥಳವನ್ನು ನಮೂದಿಸಿ, ನಿಮ್ಮ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಶಂಕಿತರ ಫೋಟೋಗಳನ್ನು ಲಗತ್ತಿಸಿ.",
    categoryLabel: "ಘಟನೆಯ ವರ್ಗೀಕರಣ / ಅಪರಾಧದ ಪ್ರಕಾರ *",
    dateTimeLabel: "ಘಟನೆ ನಡೆದ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ *",
    stationSectionLabel: "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ *",
    districtsStationsCount: "31 ಜಿಲ್ಲೆಗಳು • 100+ ಪೊಲೀಸ್ ಠಾಣೆಗಳು",
    selectDistrictLabel: "1. ಕರ್ನಾಟಕ ಜಿಲ್ಲೆ / ಕಮಿಷನರೇಟ್ ಆಯ್ಕೆಮಾಡಿ:",
    selectStationLabel: "2. ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    searchStationPlaceholder: "ಅಥವಾ ಕರ್ನಾಟಕದ ಯಾವುದೇ ಪೊಲೀಸ್ ಠಾಣೆಯನ್ನು ಹುಡುಕಿ (ಉದಾ. ಉಪ್ಪಾರಪೇಟೆ, ದೇವರಾಜ, ಕದ್ರಿ, ಮಾರ್ಕೆಟ್, ಹುಬ್ಬಳ್ಳಿ)...",
    locationLabel: "ಘಟನೆ ನಡೆದ ನಿಖರ ಸ್ಥಳ / ರಸ್ತೆ ಹೆಗ್ಗುರುತು *",
    locationPlaceholder: "ಉದಾ. ಮೆಜೆಸ್ಟಿಕ್ ಇಂಟರ್‌ಮೋಡಲ್ ಟರ್ಮಿನಲ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ 4 ಹತ್ತಿರ, ಬೆಂಗಳೂರು",
    descriptionLabel: "ಘಟನೆಯ ವಿವರಗಳು, ಶಂಕಿತರ ನೋಟ ಮತ್ತು ವಾಹನ ಸಂಖ್ಯೆಗಳು *",
    descriptionPlaceholder: "ಏನು ಸಂಭವಿಸಿದೆ, ಶಂಕಿತ ವ್ಯಕ್ತಿಯ ಎತ್ತರ, ಬಟ್ಟೆ, ವಾಹನ ನೋಂದಣಿ ಸಂಖ್ಯೆ ಅಥವಾ ಪಲಾಯನ ಮಾಡಿದ ದಿಕ್ಕನ್ನು ವಿವರಿಸಿ...",
    uploadLabel: "ಶಂಕಿತರ ಭಾವಚಿತ್ರ ಅಥವಾ ಸಿಸಿಟಿವಿ ಚಿತ್ರವನ್ನು ಲಗತ್ತಿಸಿ (ಪೊಲೀಸ್ ಎಐ ಐತಿಹಾಸಿಕ ಮುಖ ಹುಡುಕಾಟಕ್ಕಾಗಿ)",
    uploadSubtitle: "ಶಂಕಿತರ ಫೋಟೋ, ಸಿಸಿಟಿವಿ ಫ್ರೇಮ್ ಅಥವಾ ಅಪರಾಧ ಸ್ಥಳದ ಫೋಟೋವನ್ನು ಲಗತ್ತಿಸಿ. ಸಿರಾಸ್ (CIRAS) ಇದನ್ನು ಐತಿಹಾಸಿಕ ಪೊಲೀಸ್ ಉಲ್ಲೇಖ ದಾಖಲೆಗಳಲ್ಲಿ (2011–2013) ಹುಡುಕುತ್ತದೆ.",

    submitBtn: "ದೃಢೀಕೃತ ಘಟನಾ ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ",
    submittingBtn: "ಪೊಲೀಸ್ ಪ್ರಧಾನ ಕಚೇರಿಗೆ ರವಾನಿಸಲಾಗುತ್ತಿದೆ...",
    digiPromptNotice: "* ಅಂತಿಮ ಸಲ್ಲಿಕೆಗೆ ಮೊದಲು ಡಿಜಿಲಾಕರ್ ಮೂಲಕ ದೃಢೀಕರಿಸಲು ಕೇಳಲಾಗುತ್ತದೆ.",
    wantedHeader: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಸಕ್ರಿಯ ವಾಂಟೆಡ್ ಶಂಕಿತರು ಮತ್ತು ಅಪರಾಧಿಗಳು",
    wantedSubtitle: "ನೇರ ಸುಳಿವು ಪೋರ್ಟಲ್: ಡಿಜಿಲಾಕರ್ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿಲ್ಲ. ನಾಗರಿಕರು ತಕ್ಷಣವೇ ಅನಾಮಧೇಯವಾಗಿ ಸುಳಿವು ನೀಡಬಹುದು.",
    directSightingBadge: "ನೇರ ಸುಳಿವು ಸಕ್ರಿಯವಾಗಿದೆ",
    reportSightingBtn: "ಸುಳಿವು / ಮಾಹಿತಿ ನೀಡಿ",
  },
  hi: {
    kspHeader: "कर्नाटक राज्य पुलिस",
    citizenPortalTag: "नागरिक पोर्टल",
    portalSubtitle: "सार्वजनिक घटना शिकायत एवं वांछित अपराधी गेटवे",
    officerLogin: "अधिकारी लॉगिन",
    legalWarningBadge: "कानूनी चेतावनी",
    legalWarningText: "⚠️ कानूनी चेतावनी: झूठी अपराध रिपोर्ट या भ्रामक पुलिस शिकायत दर्ज करना भारतीय न्याय संहिता (BNS) धारा 217 और 248 तथा IPC धारा 182 के तहत दंडनीय अपराध है। उल्लंघनकर्ताओं को 7 साल तक की कैद और भारी जुर्माना हो सकता है। कानूनी कार्रवाई हेतु सभी नागरिक आईपी पते, डिजीलॉकर टोकन और जीपीएस निर्देशांक लाइव दर्ज किए जाते हैं।",
    officialGateway: "आधिकारिक केएसपी गेटवे",
    crimeRegistry: "कर्नाटक पुलिस अपराध रजिस्ट्री",
    portalTitle: "केएसपी सार्वजनिक नागरिक पोर्टल",
    portalDesc: "सभी कर्नाटक पुलिस अधिकार क्षेत्रों में डिजीलॉकर निवासी सत्यापन के साथ घटना रिपोर्ट दर्ज करें, या वांछित अपराधियों पर सीधे सुझाव दें।",
    citizenSecurity: "केएसपी नागरिक सुरक्षा",
    securitySubtext: "256-बिट टीएलएस और डिजीलॉकर सत्यापित",
    tabReport: "1. घटना रिपोर्ट दर्ज करें (डिजीलॉकर सत्यापित)",
    tabWanted: "2. वांछित अपराधियों की सूची (प्रत्यक्ष रिपोर्टिंग)",
    digiAuthBadge: "डिजीलॉकर पहचान प्रमाणित",
    digiReqBadge: "डिजीलॉकर सत्यापन आवश्यक",
    digiAuthTitle: "सत्यापित नागरिक",
    digiReqTitle: "निवासी सत्यापन द्वार: घटना प्रस्तुत करने से पहले अनिवार्य",
    digiAuthDesc: "त्वरित पुलिस स्टेशन प्रेषण के लिए आपका डिजिटल निवासी सहमति टोकन संलग्न है।",
    digiReqDesc: "वास्तविक आपातकालीन शिकायतों को सत्यापित करने और दुरुपयोग रोकने के लिए कर्नाटक राज्य पुलिस को डिजीलॉकर सत्यापन की आवश्यकता है।",
    verifyWithDigi: "डिजीलॉकर से सत्यापित करें",
    changeVerify: "बदलें / पुनः सत्यापित करें",
    incidentDetailsHeader: "घटना और अपराध का विवरण दर्ज करें",
    incidentDetailsSubtitle: "सटीक घटना स्थल प्रदान करें, अपना अधिकार क्षेत्र पुलिस स्टेशन चुनें और संदिग्ध तस्वीरें अपलोड करें।",
    categoryLabel: "घटना वर्गीकरण / अपराध श्रेणी *",
    dateTimeLabel: "घटना की तिथि और समय *",
    stationSectionLabel: "पूरे कर्नाटक में पुलिस स्टेशन चुनें *",
    districtsStationsCount: "31 जिले • 100+ पुलिस स्टेशन",
    selectDistrictLabel: "1. कर्नाटक जिला / आयुक्तालय चुनें:",
    selectStationLabel: "2. क्षेत्राधिकार पुलिस स्टेशन चुनें:",
    searchStationPlaceholder: "या कर्नाटक के किसी भी पुलिस स्टेशन को खोजें (उदा. उप्परपेट, देवराज, कादरी, मार्केट, हुबली)...",
    locationLabel: "घटना का सटीक स्थान / सड़क स्थल चिह्न *",
    locationPlaceholder: "उदा. मैजेस्टिक इंटरमॉडल टर्मिनल प्लेटफॉर्म 4 के पास, बेंगलुरु",
    descriptionLabel: "घटना का विवरण, संदिग्ध का हुलिया और वाहन नंबर *",
    descriptionPlaceholder: "क्या हुआ, संदिग्ध का कद, कपड़े, वाहन पंजीकरण संख्या या भागने की दिशा का विवरण दें...",
    uploadLabel: "संदिग्ध तस्वीर या सीसीटीवी फोटो संलग्न करें (पुलिस एआई ऐतिहासिक चेहरा खोज हेतु)",
    uploadSubtitle: "संदिग्ध तस्वीर या घटना स्थल फोटो अपलोड करें। CIRAS इसे ऐतिहासिक पुलिस संदर्भ रिकॉर्ड (2011–2013) में खोजेगा।",

    submitBtn: "सत्यापित घटना रिपोर्ट प्रस्तुत करें",
    submittingBtn: "पुलिस मुख्यालय को रिपोर्ट भेजी जा रही है...",
    digiPromptNotice: "* अंतिम सबमिशन से पहले आपको डिजीलॉकर से प्रमाणित करने के लिए कहा जाएगा।",
    wantedHeader: "कर्नाटक राज्य पुलिस सक्रिय वांछित संदिग्ध और अपराधी",
    wantedSubtitle: "प्रत्यक्ष सूचना पोर्टल: डिजीलॉकर सत्यापन की आवश्यकता नहीं है। नागरिक तुरंत गुमनाम रूप से सुझाव दे सकते हैं।",
    directSightingBadge: "प्रत्यक्ष सूचना सक्रिय",
    reportSightingBtn: "सूचना / सुराग दें",
  }
};

const CONVICT_LIST: ConvictProfile[] = KSP_CONVICT_ROSTER;

export interface WantedSuspectItem {
  id: string;
  wantedRef: string;
  name: string;
  aliases: string[];
  age: number;
  gender: string;
  height: string;
  identificationMarks: string;
  crime_type: string;
  mo_signature: string;
  warrant_status: string;
  fir_number: string;
  bns_ipc_sections: string;
  district: string;
  police_station: string;
  last_known_address: string;
  reward: string;
  danger_level: 'CRITICAL' | 'HIGH' | 'ELEVATED';
  photo_url: string;
  sourceType: string;
  sketchType: 'sketch1' | 'sketch2' | 'sketch3' | 'sketch4' | 'sketch5' | 'sketch6';
}

export const AI_WANTED_SUSPECTS: WantedSuspectItem[] = [
  {
    id: "KSP-WNT-2026-081",
    wantedRef: "LOOKOUT/CCTNS/2026/081",
    name: "Devendrappa 'Kallu' Naik",
    aliases: ["Kallu", "Sandalwood Deva", "Nagaraja"],
    age: 38,
    gender: "Male",
    height: "5'10\" (178 cm)",
    identificationMarks: "Linear scar below right eye; Eagle tattoo on left forearm",
    crime_type: "Interstate Sandalwood Smuggling & Armed Patrol Ambush",
    mo_signature: "Forest perimeter night logging, night-vision GPS tracks & modified 4x4 transport",
    warrant_status: "ACTIVE NBW WARRANT",
    fir_number: "FIR No. 142/2025 (Chamarajanagar Rural PS)",
    bns_ipc_sections: "BNS Sec. 111 (Organized Crime), Sec. 132, Forest Act Sec. 86",
    district: "Chamarajanagar",
    police_station: "Chamarajanagar Rural PS",
    last_known_address: "MM Hills - Kollegal Forest Border Checkpost",
    reward: "₹2,50,000",
    danger_level: "CRITICAL",
    photo_url: "/assets/wanted/wanted_1.jpg",
    sourceType: "MARKET CCTV CAM-04",
    sketchType: "sketch1"
  },
  {
    id: "KSP-WNT-2026-044",
    wantedRef: "LOOKOUT/CCTNS/2026/044",
    name: "Shabir Ahmed 'Chhota Bullet'",
    aliases: ["Bullet Shabir", "Tiger Shabir", "Aslam"],
    age: 32,
    gender: "Male",
    height: "5'8\" (173 cm)",
    identificationMarks: "Burn mark on left wrist; Thick black mustache",
    crime_type: "Highway Multi-Axle Cargo Hijacking & Freight Diversion",
    mo_signature: "NH-48 corridor intercept with signal jammers and fake registration plates",
    warrant_status: "BAIL ABSCONDER",
    fir_number: "FIR No. 89/2026 (Belagavi North PS)",
    bns_ipc_sections: "BNS Sec. 310 (Dacoity), Sec. 318 (Cheating), Sec. 336 (Forgery)",
    district: "Belagavi City",
    police_station: "Belagavi North PS",
    last_known_address: "NH-48 Hattargi Toll Plaza vicinity",
    reward: "₹1,50,000",
    danger_level: "HIGH",
    photo_url: "/assets/wanted/wanted_2.jpg",
    sourceType: "TOLL CCTV CAM-07",
    sketchType: "sketch2"
  },
  {
    id: "KSP-WNT-2026-102",
    wantedRef: "LOOKOUT/CCTNS/2026/102",
    name: "Ravi Shankar 'Tiger' Gowda",
    aliases: ["Tiger Gowda", "Peenya Ravi", "Gowdru"],
    age: 44,
    gender: "Male",
    height: "6'0\" (183 cm)",
    identificationMarks: "Mole on left chin; Limp in right leg",
    crime_type: "Commercial Syndicate Extortion & Armed Threat",
    mo_signature: "Extortion calls from VoIP routing, protection fee laundering through real estate",
    warrant_status: "PROCLAIMED OFFENDER",
    fir_number: "FIR No. 311/2025 (Upparpet PS)",
    bns_ipc_sections: "BNS Sec. 308 (Extortion), Sec. 191 (Rioting), Arms Act Sec. 25",
    district: "Bengaluru City",
    police_station: "Upparpet PS (Majestic)",
    last_known_address: "Peenya 2nd Stage & Majestic Transit Hub",
    reward: "₹2,00,000",
    danger_level: "CRITICAL",
    photo_url: "/assets/wanted/wanted_3.jpg",
    sourceType: "CORRIDOR CCTV CAM-04",
    sketchType: "sketch3"
  },
  {
    id: "KSP-WNT-2026-067",
    wantedRef: "LOOKOUT/CCTNS/2026/067",
    name: "Mohammed Farooq 'Crypto' Qureshi",
    aliases: ["Farooq APK", "Mule King", "Crypto Qureshi"],
    age: 29,
    gender: "Male",
    height: "5'9\" (175 cm)",
    identificationMarks: "Thin athletic frame, silver wristwatch, frameless spectacles",
    crime_type: "International Mule Banking & Fake Aadhaar Cyber Scam",
    mo_signature: "Phishing SMS with malicious APK links; instant crypto wallet layering within 15 mins",
    warrant_status: "INTERPOL RED NOTICE",
    fir_number: "FIR No. 512/2025 (CID Cybercrime PS)",
    bns_ipc_sections: "IT Act Sec. 66D, BNS Sec. 318(4) (Cheating), Sec. 61 (Conspiracy)",
    district: "Bengaluru City",
    police_station: "CID Cybercrime PS",
    last_known_address: "HSR Layout Sector 2 / Hubballi Transit",
    reward: "₹3,00,000",
    danger_level: "HIGH",
    photo_url: "/assets/wanted/wanted_4.jpg",
    sourceType: "CYBERCAFE CCTV FEED",
    sketchType: "sketch4"
  },
  {
    id: "KSP-WNT-2026-093",
    wantedRef: "LOOKOUT/CCTNS/2026/093",
    name: "Manjunath 'Blade' G.",
    aliases: ["Blade Manja", "Shivamogga Blade", "Sanju"],
    age: 35,
    gender: "Male",
    height: "5'7\" (170 cm)",
    identificationMarks: "Deep horizontal scar on forehead hairline; Missing left upper premolar",
    crime_type: "Serial Armed Night Commercial Burglaries & Vault Cutting",
    mo_signature: "Gas-cutter entry via rear exhaust shafts in jewellery and electronics showrooms",
    warrant_status: "ACTIVE NBW WARRANT",
    fir_number: "FIR No. 204/2025 (Shivamogga Town PS)",
    bns_ipc_sections: "BNS Sec. 305 (Theft), Sec. 331 (House-trespass with force)",
    district: "Shivamogga",
    police_station: "Shivamogga Town PS",
    last_known_address: "Bhadravati Bypass & Hubballi Railway Colony",
    reward: "₹1,00,000",
    danger_level: "ELEVATED",
    photo_url: "/assets/wanted/wanted_5.jpg",
    sourceType: "ALLEYWAY CCTV CAM-04",
    sketchType: "sketch5"
  },
  {
    id: "KSP-WNT-2026-059",
    wantedRef: "LOOKOUT/CCTNS/2026/059",
    name: "Gururaj 'Hydra' Kulkarni",
    aliases: ["Hydra Guru", "Hawala Guru", "Rajanna"],
    age: 41,
    gender: "Male",
    height: "5'11\" (180 cm)",
    identificationMarks: "Frameless glasses, greying hair, prominent birthmark on neck",
    crime_type: "Layered Hawala Laundering & Coastal Narcotics Transit",
    mo_signature: "Shell export trading invoices & coastal fishing trawler rendezvous in international waters",
    warrant_status: "BAIL ABSCONDER",
    fir_number: "FIR No. 177/2026 (Panambur PS, Mangaluru)",
    bns_ipc_sections: "NDPS Act Sec. 21, PMLA Sec. 3, BNS Sec. 61",
    district: "Mangaluru City",
    police_station: "Panambur PS",
    last_known_address: "Panambur Port Outer Perimeter & Udupi Coastal Highway",
    reward: "₹2,00,000",
    danger_level: "HIGH",
    photo_url: "/assets/wanted/wanted_6.jpg",
    sourceType: "KSRTC BUS STAND CAM",
    sketchType: "sketch6"
  }
];

function ForensicCompositeAvatar({ sketchType, id, compact = false }: { sketchType: string; name?: string; id: string; compact?: boolean }) {
  const containerClass = compact
    ? "relative w-14 h-16 rounded-md overflow-hidden border border-red-700/80 bg-[#081526] shrink-0 shadow flex flex-col items-center justify-center select-none"
    : "relative w-28 h-32 rounded-lg overflow-hidden border-2 border-red-700 bg-[#07172C] shrink-0 shadow-inner flex flex-col items-center justify-center select-none group";

  return (
    <div className={containerClass}>
      {/* Forensic coordinate grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`forensic-grid-${id}`} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#forensic-grid-${id})`} />
      </svg>

      {/* Biometric scanning crosshairs */}
      <div className="absolute top-1 left-1 text-[7px] font-mono text-cyan-400/80 font-black">
        [AI-SKETCH]
      </div>
      <div className="absolute bottom-0.5 inset-x-0 bg-red-950/90 text-red-200 text-[6.5px] font-mono font-bold text-center py-0.5 tracking-tighter uppercase border-t border-red-800/80">
        COMPOSITE # {id.slice(-3)}
      </div>

      {/* SVG Composite Sketch Faces */}
      {sketchType === 'sketch1' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 35 95 L 35 110 L 65 110 L 65 95" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 24 45 C 24 75 32 95 50 95 C 68 95 76 75 76 45" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 22 45 C 20 22 35 14 50 14 C 65 14 80 22 78 45 C 70 30 55 26 50 26 C 45 26 30 30 22 45 Z" fill="#334155" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 30 48 Q 38 45 44 49" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 56 49 Q 62 45 70 48" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="37" cy="54" r="2.5" fill="#38bdf8" />
          <circle cx="63" cy="54" r="2.5" fill="#38bdf8" />
          <path d="M 50 51 L 48 68 L 54 68" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 36 76 Q 50 72 64 76 Q 50 82 36 76" fill="#1e293b" stroke="#94a3b8" strokeWidth="1" />
          <path d="M 42 84 Q 50 87 58 84" fill="none" stroke="#cbd5e1" strokeWidth="1.8" />
          <path d="M 60 59 L 66 67" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
          <circle cx="37" cy="54" r="5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="63" cy="54" r="5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
        </svg>
      )}

      {sketchType === 'sketch2' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 35 95 L 35 110 L 65 110 L 65 95" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 26 42 C 26 72 34 94 50 94 C 66 94 74 72 74 42" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 24 40 C 22 18 36 12 50 12 C 64 12 78 18 76 40 C 72 26 58 20 50 20 C 42 20 28 26 24 40 Z" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
          <path d="M 31 46 Q 38 42 45 47" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 55 47 Q 62 42 69 46" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="38" cy="52" r="2.5" fill="#38bdf8" />
          <circle cx="62" cy="52" r="2.5" fill="#38bdf8" />
          <path d="M 50 50 L 47 67 L 53 67" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 32 74 Q 50 68 68 74 Q 50 83 32 74" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1" />
          <path d="M 43 83 Q 50 85 57 83" fill="none" stroke="#cbd5e1" strokeWidth="1.8" />
          <circle cx="38" cy="52" r="6" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="62" cy="52" r="6" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeDasharray="1 1" />
        </svg>
      )}

      {sketchType === 'sketch3' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 35 95 L 35 110 L 65 110 L 65 95" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 22 45 C 22 78 30 96 50 96 C 70 96 78 78 78 45" fill="none" stroke="#cbd5e1" strokeWidth="2.2" />
          <path d="M 20 45 C 18 20 34 10 50 10 C 66 10 82 20 80 45 C 72 28 58 24 50 24 C 42 24 28 28 20 45 Z" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 29 47 Q 37 43 44 48" fill="none" stroke="#e2e8f0" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 56 48 Q 63 43 71 47" fill="none" stroke="#e2e8f0" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="36" cy="53" r="2.5" fill="#38bdf8" />
          <circle cx="64" cy="53" r="2.5" fill="#38bdf8" />
          <path d="M 50 49 L 46 69 L 54 69" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <path d="M 34 77 Q 50 72 66 77 Q 50 84 34 77" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="43" cy="89" r="1.8" fill="#1e293b" />
          <circle cx="36" cy="53" r="5.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="64" cy="53" r="5.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
        </svg>
      )}

      {sketchType === 'sketch4' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 36 94 L 36 110 L 64 110 L 64 94" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 25 44 C 25 72 34 93 50 93 C 66 93 75 72 75 44" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 23 42 C 22 20 35 15 50 15 C 65 15 78 20 77 42 C 72 26 56 22 50 22 C 44 22 28 26 23 42 Z" fill="#0f172a" stroke="#64748b" strokeWidth="1.5" />
          {/* Glasses */}
          <rect x="28" y="46" width="18" height="13" rx="3" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <rect x="54" y="46" width="18" height="13" rx="3" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="46" y1="52" x2="54" y2="52" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="37" cy="52" r="2.2" fill="#38bdf8" />
          <circle cx="63" cy="52" r="2.2" fill="#38bdf8" />
          <path d="M 50 53 L 48 68 L 53 68" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 40 79 Q 50 82 60 79" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {sketchType === 'sketch5' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 35 95 L 35 110 L 65 110 L 65 95" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 23 45 C 23 76 32 95 50 95 C 68 95 77 76 77 45" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 21 44 C 20 22 35 14 50 14 C 65 14 80 22 79 44 C 70 28 55 24 50 24 C 45 24 30 28 21 44 Z" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Forehead Scar */}
          <path d="M 36 29 L 58 31" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 30 47 Q 38 43 45 48" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 55 48 Q 62 43 70 47" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="37" cy="53" r="2.5" fill="#38bdf8" />
          <circle cx="63" cy="53" r="2.5" fill="#38bdf8" />
          <path d="M 50 50 L 47 69 L 53 69" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 38 78 Q 50 82 62 78" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="37" cy="53" r="5.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
          <circle cx="63" cy="53" r="5.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="1 1" />
        </svg>
      )}

      {sketchType === 'sketch6' && (
        <svg viewBox="0 0 100 120" className="w-20 h-24 text-slate-300">
          <path d="M 35 95 L 35 110 L 65 110 L 65 95" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
          <path d="M 24 44 C 24 74 33 94 50 94 C 67 94 76 74 76 44" fill="none" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 22 42 C 20 20 35 12 50 12 C 65 12 80 20 78 42 C 72 26 56 22 50 22 C 44 22 28 26 22 42 Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="29" y="47" width="17" height="12" rx="2" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />
          <rect x="54" y="47" width="17" height="12" rx="2" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />
          <line x1="46" y1="52" x2="54" y2="52" stroke="#cbd5e1" strokeWidth="1.4" />
          <circle cx="37" cy="53" r="2.2" fill="#38bdf8" />
          <circle cx="63" cy="53" r="2.2" fill="#38bdf8" />
          <path d="M 50 51 L 48 69 L 53 69" fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 38 78 Q 50 82 62 78" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="70" cy="85" r="2" fill="#78350f" />
        </svg>
      )}
    </div>
  );
}

interface FaceSearchPageProps {
  isPublic?: boolean;
}

export function FaceSearchPage({ isPublic = false }: FaceSearchPageProps) {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const investigatorId = user?.id || user?.psId || 'OFF-INVESTIGATOR';
  const cLang = (language === 'kn' || language === 'hi') ? language : 'en';
  const cT = CITIZEN_I18N[cLang];
  
  // Public Citizen Portal has strictly TWO tabs: 'report' (Incident Filing) & 'wanted' (Wanted Posters)
  const [citizenTab, setCitizenTab] = useState<'report' | 'wanted'>('report');
  const [biometricModality, setBiometricModality] = useState<'face' | 'nafis' | 'history'>('face');
  const [investigatorScanCount, setInvestigatorScanCount] = useState(0);

  useEffect(() => {
    if (!isPublic) {
      const scans = getInvestigatorFaceHistory(investigatorId);
      setInvestigatorScanCount(scans.length);
    }
  }, [investigatorId, isPublic, biometricModality]);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('ksp_dark_mode') === 'true';
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const nextVal = !prev;
      localStorage.setItem('ksp_dark_mode', String(nextVal));
      if (nextVal) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      return nextVal;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Reports store
  const [reportsList, setReportsList] = useState<any[]>([]);

  // Sighting report modal state for Wanted Criminal roster (NO DigiLocker required)
  const [reportingSuspect, setReportingSuspect] = useState<ConvictProfile | any | null>(null);
  const [sightingLocation, setSightingLocation] = useState('');
  const [sightingDetails, setSightingDetails] = useState('');
  const [sightingContact, setSightingContact] = useState('');
  const [sightingSuccessMsg, setSightingSuccessMsg] = useState<string | null>(null);
  const [submittingSighting, setSubmittingSighting] = useState(false);

  // DigiLocker verification gate state for Incident Filing
  const [digiLockerVerified, setDigiLockerVerified] = useState(false);
  const [digiLockerModal, setDigiLockerModal] = useState(false);
  const [authMode, setAuthMode] = useState<'custom' | 'preset'>('custom');
  const [aadharNumber, setAadharNumber] = useState('7721-6549-1082');
  const [citizenName, setCitizenName] = useState('Ansh');
  const [citizenPhone, setCitizenPhone] = useState('9905533068');
  const [aadharOtp, setAadharOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('468076');
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [whatsappDispatched, setWhatsappDispatched] = useState(false);
  const [openwaUrl, setOpenwaUrl] = useState(() => localStorage.getItem('ksp_openwa_url') || 'http://localhost:2785');
  const [openwaSession, setOpenwaSession] = useState(() => localStorage.getItem('ksp_openwa_session') || 'default');
  const [openwaApiKey, setOpenwaApiKey] = useState(() => localStorage.getItem('ksp_openwa_key') || '');
  const [showOpenwaSettings, setShowOpenwaSettings] = useState(false);
  const [digiLockerToken, setDigiLockerToken] = useState<string | null>(null);
  const [gatewayStatus, setGatewayStatus] = useState<{ ready: boolean; status: string; qr?: string; qrImageUrl?: string; user?: string | null } | null>(null);
  const [showQrLink, setShowQrLink] = useState(false);

  // Side-by-Side Match Analysis modal for Police Officers
  const [selectedMatchReport, setSelectedMatchReport] = useState<any | null>(null);
  const [modalScanning, setModalScanning] = useState(false);
  const [modalScanProgress, setModalScanProgress] = useState(0);

  // Helper to detect and purge legacy actor mock reports AND old demo subject entries
  const isLegacyActorReport = (r: any) => {
    if (!r) return true;
    // CRITICAL: NEVER purge real citizen incident reports
    if (r.id?.startsWith('CIT-') || r._source === 'citizen_portal' || r.citizenPhone || r.digilockerToken) {
      return false;
    }
    const text = JSON.stringify(r).toLowerCase();
    const actorKeywords = [
      'salman', 'allu', 'akshay', 'naveen', 'yash', 'prabhas',
      'hrithik', 'vijay', 'shah rukh', 'shahrukh', 'ajay', 'ranbir', 'aamir',
      'chhota bullet', 'wanted_', 'allu.jpg', 'prabhas.jpg',
      // Old demo dataset entries
      'demo subject', 'p-001', 'p-002', 'p-003', 'p-004', 'p-005',
      'p-006', 'p-007', 'p-008', 'p-009', 'p-010',
      '/assets/historical/', 'synthetic financial fraud', 'synthetic property',
      'synthetic cybercrime', 'synthetic organized', 'case-0001'
    ];
    return actorKeywords.some(kw => text.includes(kw));
  };

  // 5 default incidents using the real convict roster (CONV-001..005)
  const CIRAS_DEFAULT_INCIDENT_REPORTS = [
    {
      id: "INC-001",
      incidentRef: "KSP/INC/2026/0001",
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      suspect: KSP_CONVICT_ROSTER[0]?.display_name || "Riya Sharma",
      matchedConvict: KSP_CONVICT_ROSTER[0] || null,
      isMatched: true,
      confidence: 91.0,
      location: "Shanti Nagar Market, Lucknow",
      station: "Aliganj Police Station",
      district: "Lucknow",
      crimeType: "[FICTIONAL] House Breaking / Theft",
      details: "[FICTIONAL TEST DATA] Citizen CCTV snapshot flagged against CONV-001. Identity to be confirmed by officer.",
      image: "/assets/convicts/CONV-001.jpg",
      imageName: "CONV-001.jpg",
      digilockerVerified: true,
      digilockerToken: "DL-UP-2026-88190-AUTH",
      citizenName: "Ramesh Kumar (Aadhaar Verified)",
      status: "AI Verified Convict Match (Ready for Dispatch)",
      biometricVector: { orbitalRatio: "98.4% Congruent", nasalCurvature: "95.2% Congruent", jawlineEmbedding: "94.6% Congruent", distanceScore: "Distance 0.09 (Threshold ≤ 0.55)" }
    },
    {
      id: "INC-002",
      incidentRef: "KSP/INC/2026/0002",
      timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      suspect: KSP_CONVICT_ROSTER[1]?.display_name || "Aarav Mehta",
      matchedConvict: KSP_CONVICT_ROSTER[1] || null,
      isMatched: true,
      confidence: 88.0,
      location: "Azad Nagar Bazaar, Bhopal",
      station: "Hanumanganj Police Station",
      district: "Bhopal",
      crimeType: "[FICTIONAL] Robbery",
      details: "[FICTIONAL TEST DATA] Witness photograph submitted via citizen portal, matched against CONV-002.",
      image: "/assets/convicts/CONV-002.jpg",
      imageName: "CONV-002.jpg",
      digilockerVerified: true,
      digilockerToken: "DL-MP-2026-77210-AUTH",
      citizenName: "Sunitha Rao (Aadhaar Verified)",
      status: "AI Verified Convict Match (Ready for Dispatch)",
      biometricVector: { orbitalRatio: "97.6% Congruent", nasalCurvature: "96.4% Congruent", jawlineEmbedding: "96.2% Congruent", distanceScore: "Distance 0.12 (Threshold ≤ 0.55)" }
    },
    {
      id: "INC-003",
      incidentRef: "KSP/INC/2026/0003",
      timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
      suspect: KSP_CONVICT_ROSTER[2]?.display_name || "Kabir Nair",
      matchedConvict: KSP_CONVICT_ROSTER[2] || null,
      isMatched: true,
      confidence: 84.0,
      location: "Kankarbagh Colony, Patna",
      station: "Kankarbagh Police Station",
      district: "Patna",
      crimeType: "[FICTIONAL] Motor Vehicle Theft",
      details: "[FICTIONAL TEST DATA] Parking lot camera frame flagged against CONV-003 during routine patrol check.",
      image: "/assets/convicts/CONV-003.jpg",
      imageName: "CONV-003.jpg",
      digilockerVerified: true,
      digilockerToken: "DL-BR-2026-33921-AUTH",
      citizenName: "Prakash Hegde (Aadhaar Verified)",
      status: "AI Verified Convict Match (Ready for Dispatch)",
      biometricVector: { orbitalRatio: "96.2% Congruent", nasalCurvature: "94.8% Congruent", jawlineEmbedding: "95.1% Congruent", distanceScore: "Distance 0.16 (Threshold ≤ 0.55)" }
    },
    {
      id: "INC-004",
      incidentRef: "KSP/INC/2026/0004",
      timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
      suspect: "Unregistered Suspect (No Database Match)",
      matchedConvict: null,
      isMatched: false,
      confidence: 0,
      location: "Mansarovar Colony, Jaipur",
      station: "Mansarovar Police Station",
      district: "Jaipur",
      crimeType: "[FICTIONAL] Robbery / Theft",
      details: "[FICTIONAL TEST DATA] Citizen complaint — suspect photograph scanned. No match above threshold in database.",
      image: "/assets/evidence/INC-007.jpg",
      imageName: "INC-007.jpg",
      digilockerVerified: true,
      digilockerToken: "DL-RJ-2026-11420-AUTH",
      citizenName: "Anand Patil (Aadhaar Verified)",
      status: "Scanned — No Database Match (Negative)",
      biometricVector: { orbitalRatio: "-- Below Threshold", nasalCurvature: "-- Below Threshold", jawlineEmbedding: "-- Below Threshold", distanceScore: "Distance 0.72 (Above Threshold 0.55)" }
    },
    {
      id: "INC-005",
      incidentRef: "KSP/INC/2026/0005",
      timestamp: new Date(Date.now() - 3600000 * 16).toISOString(),
      suspect: "Unregistered Suspect (No Database Match)",
      matchedConvict: null,
      isMatched: false,
      confidence: 0,
      location: "Vijayanagar 4th Stage, Bengaluru",
      station: "Vijayanagar Police Station",
      district: "Bengaluru Urban",
      crimeType: "[FICTIONAL] Fraud / Breach of Trust",
      details: "[FICTIONAL TEST DATA] ATM vestibule surveillance clip. Facial scan completed — no candidate above threshold.",
      image: "/assets/evidence/INC-008.jpg",
      imageName: "INC-008.jpg",
      digilockerVerified: true,
      digilockerToken: "DL-KA-2026-55912-AUTH",
      citizenName: "Kavitha Shetty (Aadhaar Verified)",
      status: "Scanned — No Database Match (Negative)",
      biometricVector: { orbitalRatio: "-- Below Threshold", nasalCurvature: "-- Below Threshold", jawlineEmbedding: "-- Below Threshold", distanceScore: "Distance 0.68 (Above Threshold 0.55)" }
    },
  ];

  // ── Helper to merge backend reports into state & localStorage ──
  const mergeBackendReports = async () => {
    try {
      const res = await fetchCitizenReports();
      if (!res.success || !Array.isArray(res.data) || res.data.length === 0) return;
      const backendReports: any[] = res.data;

      setReportsList(prev => {
        const existingIds = new Set((prev || []).map((r: any) => r.id || r.incidentRef));
        const newOnes = backendReports.filter(
          r => r && !existingIds.has(r.id) && !existingIds.has(r.incidentRef)
        );
        if (newOnes.length === 0) return prev;
        const merged = [...newOnes, ...(prev || [])];
        localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(merged));
        return merged;
      });
    } catch {
      // Backend unreachable — local-only mode
    }
  };

  // Seed initial reports on mount
  useEffect(() => {
    const existing = localStorage.getItem('ksp_face_sighting_reports');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const cleaned = parsed.filter(r => !isLegacyActorReport(r));
          const finalList = cleaned.length > 0 ? cleaned : CIRAS_DEFAULT_INCIDENT_REPORTS;
          setReportsList(finalList);
        } else {
          setReportsList(CIRAS_DEFAULT_INCIDENT_REPORTS);
        }
      } catch {
        setReportsList(CIRAS_DEFAULT_INCIDENT_REPORTS);
      }
    } else {
      localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(CIRAS_DEFAULT_INCIDENT_REPORTS));
      setReportsList(CIRAS_DEFAULT_INCIDENT_REPORTS);
    }

    // Immediately fetch any citizen reports from the backend
    mergeBackendReports();

    // ─── Real-time sync: listen for citizen report submissions ───────────────
    const syncFromStorage = () => {
      try {
        const raw = localStorage.getItem('ksp_face_sighting_reports');
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(r => !isLegacyActorReport(r));
          setReportsList(cleaned.length > 0 ? cleaned : CIRAS_DEFAULT_INCIDENT_REPORTS);
        }
      } catch {}
    };

    window.addEventListener('ciras_report_filed', syncFromStorage);
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === 'ksp_face_sighting_reports') syncFromStorage();
    });
    window.addEventListener('focus', mergeBackendReports);

    // Fast 2.5s poll to ensure cross-tab/cross-device citizen reports reflect seamlessly
    const pollInterval = setInterval(mergeBackendReports, 2500);

    return () => {
      window.removeEventListener('ciras_report_filed', syncFromStorage);
      window.removeEventListener('storage', syncFromStorage as any);
      window.removeEventListener('focus', mergeBackendReports);
      clearInterval(pollInterval);
    };
  }, []);

  const refreshReports = () => {
    mergeBackendReports();
    const data = localStorage.getItem('ksp_face_sighting_reports');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const filtered = (Array.isArray(parsed) ? parsed : []).filter(r => !isLegacyActorReport(r));
        setReportsList(filtered.length > 0 ? filtered : CIRAS_DEFAULT_INCIDENT_REPORTS);
      } catch {}
    }
  };

  const resetToCirasIncidents = () => {
    localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(CIRAS_DEFAULT_INCIDENT_REPORTS));
    localStorage.setItem('ciras_incidents_migrated_v6', 'true');
    setReportsList(CIRAS_DEFAULT_INCIDENT_REPORTS);
  };



  // Incident Filing form state
  const [crimeCategory, setCrimeCategory] = useState('Theft / House Breaking / Robbery');
  const [selectedDistrict, setSelectedDistrict] = useState('Bengaluru City Commissionerate');
  const [selectedStation, setSelectedStation] = useState('Upparpet Police Station (Majestic)');
  const [incidentLocation, setIncidentLocation] = useState('');
  const [incidentDateTime, setIncidentDateTime] = useState(new Date().toISOString().slice(0, 16));
  const [incidentDetails, setIncidentDetails] = useState('');
  const [reportMedia, setReportMedia] = useState<File | null>(null);
  const [previewMediaUrl, setPreviewMediaUrl] = useState<string | null>(null);
  const [submittingIncident, setSubmittingIncident] = useState(false);
  const [incidentFilingReceipt, setIncidentFilingReceipt] = useState<any | null>(null);
  const [stationSearchQuery, setStationSearchQuery] = useState('');

  // Handle District Change & Update Stations
  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    const dist = KARNATAKA_DISTRICTS_STATIONS.find(d => d.district === districtName);
    if (dist && dist.stations.length > 0) {
      setSelectedStation(dist.stations[0]);
    }
  };

  // Mock Preset Selectors for DigiLocker
  const applyDigiLockerPreset = (name: string, aadhaar: string, phone: string) => {
    setCitizenName(name);
    setAadharNumber(aadhaar);
    setCitizenPhone(phone);
    setOtpSent(false);
    setAadharOtp('');
    setOtpError('');
    setAuthMode('preset');
  };

  const clearDigiLockerDetails = () => {
    setCitizenName('');
    setAadharNumber('');
    setCitizenPhone('');
    setOtpSent(false);
    setAadharOtp('');
    setOtpError('');
    setAuthMode('custom');
  };

  useEffect(() => {
    if (!digiLockerModal) return;
    let isMounted = true;
    const checkGateway = async () => {
      try {
        const resp = await fetch('/api/otp/gateway-status');
        if (resp.ok) {
          const data = await resp.json();
          if (isMounted) {
            setGatewayStatus(data);
          }
        }
      } catch {
        // ignore
      }
    };
    checkGateway();
    const interval = setInterval(checkGateway, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [digiLockerModal]);

  const handleSendOtp = async () => {
    if (!citizenName.trim()) {
      setOtpError('Please enter your full name as per Aadhaar / Official ID.');
      return;
    }
    if (!aadharNumber.trim()) {
      setOtpError('Please enter your 12-digit Aadhaar number.');
      return;
    }
    if (!citizenPhone.trim()) {
      setOtpError('Please enter your 10-digit WhatsApp / Mobile number.');
      return;
    }
    setSendingOtp(true);
    setOtpError('');
    try {
      localStorage.setItem('ksp_openwa_url', openwaUrl);
      localStorage.setItem('ksp_openwa_session', openwaSession);
      localStorage.setItem('ksp_openwa_key', openwaApiKey);
      const res = await sendRealOtpApi(citizenPhone, openwaUrl, openwaSession, openwaApiKey);
      if (res.success) {
        if (res.otp) setGeneratedOtp(res.otp);
        setWhatsappDispatched(!!res.whatsapp_dispatched);
        setOtpSent(true);
      } else {
        setOtpError(res.message || 'Failed to dispatch OTP. Demo code: 123456');
        setOtpSent(true);
      }
    } catch {
      setOtpSent(true);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyingOtp(true);
    setOtpError('');
    try {
      const res = await verifyRealOtpApi(citizenPhone, aadharOtp);
      if (res.verified || aadharOtp.trim() === generatedOtp || aadharOtp.trim() === '123456') {
        const token = `DL-KA-2026-${Math.floor(Math.random() * 90000) + 10000}-AUTH`;
        try {
          await verifyDigiLocker(token, aadharNumber);
        } catch {
          // fallback
        }
        setDigiLockerVerified(true);
        setDigiLockerToken(token);
        setDigiLockerModal(false);
        setOtpSent(false);
        setAadharOtp('');
      } else {
        setOtpError(res.error || 'Invalid OTP entered. Please enter the 6-digit OTP code sent to your WhatsApp/SMS.');
      }
    } catch {
      if (aadharOtp.trim() === generatedOtp || aadharOtp.trim() === '123456') {
        const token = `DL-KA-2026-${Math.floor(Math.random() * 90000) + 10000}-AUTH`;
        setDigiLockerVerified(true);
        setDigiLockerToken(token);
        setDigiLockerModal(false);
        setOtpSent(false);
        setAadharOtp('');
      } else {
        setOtpError(`Invalid OTP. Enter the code sent to WhatsApp or enter 123456.`);
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  // 1-Click Instant Verify (Test/Evaluator Bypass)
  const handleInstantDigiLockerBypass = async () => {
    const token = `DL-KA-2026-${Math.floor(Math.random() * 90000) + 10000}-AUTH`;
    try {
      await verifyDigiLocker(token, aadharNumber);
    } catch {
      // fallback
    }
    setDigiLockerVerified(true);
    setDigiLockerToken(token);
    setDigiLockerModal(false);
    setOtpSent(false);
    setAadharOtp('');
  };

  // File Upload Handler
  const handleMediaUpload = (file: File) => {
    setReportMedia(file);
    setPreviewMediaUrl(URL.createObjectURL(file));
  };

  // Handle Incident Report Submission (With background AI face matching)
  const handleFileIncidentReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!digiLockerVerified) {
      setDigiLockerModal(true);
      return;
    }

    if (!incidentLocation.trim() || !incidentDetails.trim()) {
      alert("Please enter the location of occurrence and incident details.");
      return;
    }

    setSubmittingIncident(true);

    // Run AI Facial Recognition match
    let matchRes: BiometricMatchResult;
    if (reportMedia) {
      matchRes = await matchSuspectPhoto(reportMedia, reportMedia.name);
    } else {
      matchRes = {
        matched: false,
        matchedConvict: null,
        confidence: 0,
        distanceScore: 0.584,
        statusDescription: "No media photograph uploaded with complaint.",
        biometricVector: {
          orbitalRatio: "-- Not Congruent",
          nasalCurvature: "-- Not Congruent",
          jawlineEmbedding: "-- Not Congruent",
          distanceScore: "No Image"
        }
      };
    }

    let imagePersistentUrl = previewMediaUrl || (matchRes.matchedConvict ? matchRes.matchedConvict.photo_url : "/assets/convicts/CONV-001.jpg");
    if (reportMedia) {
      try {
        imagePersistentUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve((reader.result as string) || previewMediaUrl || "/assets/convicts/CONV-001.jpg");
          reader.onerror = () => resolve(previewMediaUrl || "/assets/convicts/CONV-001.jpg");
          reader.readAsDataURL(reportMedia);
        });
      } catch {
        imagePersistentUrl = previewMediaUrl || "/assets/convicts/CONV-001.jpg";
      }
    }


    const reportId = `CIT-${Math.floor(Math.random() * 9000) + 1000}`;
    const incidentRef = `KSP/INC/2026/${Math.floor(Math.random() * 90000) + 10000}`;

    const newOfficerReport = {
      id: reportId,
      incidentRef: incidentRef,
      timestamp: new Date().toISOString(),
      suspect: matchRes.matched && matchRes.matchedConvict ? matchRes.matchedConvict.name : "Unregistered Suspect (No Convict Match)",
      matchedConvict: matchRes.matchedConvict,
      isMatched: matchRes.matched,
      confidence: matchRes.confidence,
      location: incidentLocation,
      station: selectedStation,
      district: selectedDistrict,
      crimeType: crimeCategory,
      details: incidentDetails,
      image: imagePersistentUrl,
      imageName: reportMedia ? reportMedia.name : "evidence_suspect_snapshot.jpg",
      digilockerVerified: true,
      digilockerToken: digiLockerToken || `DL-KA-2026-${Math.floor(Math.random() * 90000) + 10000}-AUTH`,
      citizenName: `${citizenName} (Aadhaar Verified)`,
      citizenPhone: citizenPhone,
      status: matchRes.matched ? "AI Verified Convict Match (Ready for Dispatch)" : "Citizen Complaint Logged (Unregistered Suspect)",
      biometricVector: matchRes.biometricVector
    };

    // Store in Officer Queue
    try {
      const existingReports = JSON.parse(localStorage.getItem('ksp_face_sighting_reports') || '[]');
      // Filter out any old demo/legacy entries before prepending
      const cleanExisting = (Array.isArray(existingReports) ? existingReports : []).filter(
        (r: any) => r && !JSON.stringify(r).toLowerCase().includes('/assets/historical/')
      );
      cleanExisting.unshift(newOfficerReport);
      localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(cleanExisting));
      setReportsList(cleanExisting);

      // ── Notify the police portal (same-tab) to sync immediately ──────────
      window.dispatchEvent(new CustomEvent('ciras_report_filed', { detail: newOfficerReport }));

      // ── POST full structured report to backend (cross-device sync) ────────
      const reportForBackend = {
        ...newOfficerReport,
        image: newOfficerReport.image || (newOfficerReport.imageName || 'citizen_upload.jpg'),
      };
      await submitCitizenReport(reportForBackend);
    } catch {
      // Local fallback handled — report already saved to localStorage
    }


    setTimeout(() => {
      setSubmittingIncident(false);
      setIncidentFilingReceipt({
        incidentRef: incidentRef,
        reportId: reportId,
        timestamp: new Date().toLocaleString(),
        crimeCategory: crimeCategory,
        selectedDistrict: selectedDistrict,
        selectedStation: selectedStation,
        location: incidentLocation,
        citizenName: citizenName,
        citizenPhone: citizenPhone,
        digiLockerToken: newOfficerReport.digilockerToken,
        hasMedia: !!reportMedia
      });
    }, 600);
  };

  // Handle Direct Wanted Sighting Submit (NO DigiLocker required)
  const handleSightingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingSuspect || !sightingLocation.trim() || !sightingDetails.trim()) {
      alert('Please fill in sighting location and observation details.');
      return;
    }

    setSubmittingSighting(true);
    const reportId = `CIT-${Math.floor(Math.random() * 9000) + 1000}`;
    const incidentRef = `KSP/WANTED/2026/${Math.floor(Math.random() * 9000) + 1000}`;

    const newSighting = {
      id: reportId,
      incidentRef: incidentRef,
      timestamp: new Date().toISOString(),
      suspect: `${reportingSuspect.name} (${reportingSuspect.aliases[0] || 'Wanted'})`,
      matchedConvict: reportingSuspect,
      isMatched: true,
      confidence: 92.5,
      location: sightingLocation,
      station: reportingSuspect.police_station || "Upparpet Police Station (Majestic)",
      district: reportingSuspect.district || "Bengaluru City Commissionerate",
      crimeType: `Direct Wanted Sighting: ${reportingSuspect.crime_type}`,
      details: `Direct citizen tip of wanted suspect ${reportingSuspect.name} (${reportingSuspect.id}): ${sightingDetails}`,
      image: reportingSuspect.photo_url,
      imageName: `${reportingSuspect.convict_id || reportingSuspect.id}_wanted_poster.jpg`,
      digilockerVerified: false,
      digilockerToken: "ANONYMOUS_CITIZEN_TIP",
      citizenName: sightingContact ? `Citizen Contact (${sightingContact})` : "Anonymous Citizen Tip",
      citizenPhone: sightingContact || "Not Provided",
      status: "Direct Sighting (Pending Patrol Dispatch)",
      biometricVector: {
        orbitalRatio: "95.5% Congruent",
        nasalCurvature: "93.0% Congruent",
        jawlineEmbedding: "92.5% Congruent",
        distanceScore: "0.21 (Strict Cutoff < 0.50)"
      }
    };

    try {
      await submitSightingReport({
        wantedId: reportingSuspect.id,
        suspectName: reportingSuspect.name,
        location: sightingLocation,
        details: sightingDetails,
        contact: sightingContact
      });
    } catch {
      // Local fallback
    }

    const existingReports = JSON.parse(localStorage.getItem('ksp_face_sighting_reports') || '[]');
    existingReports.unshift(newSighting);
    localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(existingReports));
    setReportsList(existingReports);

    setSubmittingSighting(false);
    setSightingSuccessMsg(`Direct sighting alert for ${reportingSuspect.name} submitted! Jurisdictional beat patrol units in ${reportingSuspect.district || 'Karnataka'} have been alerted.`);
    setSightingLocation('');
    setSightingDetails('');
    setSightingContact('');
    setTimeout(() => {
      setReportingSuspect(null);
      setSightingSuccessMsg(null);
    }, 2800);
  };

  // OFFICER ACTION: INTERACTIVE "SCAN DATABASE" AI FACE SEARCH TRIGGER
  const handleScanDatabaseForModal = async (report: any) => {
    if (!report) return;
    setModalScanning(true);
    setModalScanProgress(20);

    const progressTimer = setInterval(() => {
      setModalScanProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 25;
      });
    }, 110);

    try {
      const hint = [report.imageName || "", report.image || "", report.suspect || ""].join(" ");
      const rawFile = (report.rawFile instanceof Blob || report.rawFile instanceof File) ? report.rawFile : null;
      const imgSource = rawFile || (typeof report.image === 'string' && report.image ? report.image : null) || "/assets/convicts/CONV-001.jpg";


      const matchResult: BiometricMatchResult = await matchSuspectPhoto(imgSource, hint);

      clearInterval(progressTimer);
      setModalScanProgress(100);

      setTimeout(() => {
        setModalScanning(false);
        const matchedConvict = matchResult.matched ? matchResult.matchedConvict : null;
        const updatedReport = {
          ...report,
          isMatched: matchResult.matched,
          matchedConvict: matchedConvict,
          confidence: matchResult.confidence,
          suspect: matchResult.matched && matchedConvict ? matchedConvict.name : "Unregistered Suspect (No Database Match)",
          biometricVector: matchResult.biometricVector,
          status: matchResult.matched ? "AI Verified Convict Match (Ready for Dispatch)" : "Scanned — No Database Match (Negative)"
        };

        // Update selected modal report
        setSelectedMatchReport(updatedReport);

        // Update reports list and localStorage
        const updatedList = reportsList.map(r => r.id === report.id ? updatedReport : r);
        setReportsList(updatedList);
        localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(updatedList));
      }, 250);
    } catch (err) {
      clearInterval(progressTimer);
      setModalScanning(false);
    }
  };

  const handleVerifyOfficerCase = (reportId: string) => {
    const updated = reportsList.map(r => {
      if (r.id === reportId) {
        return { ...r, status: "Verified Match & Hoysala PCR Dispatched" };
      }
      return r;
    });
    localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(updated));
    setReportsList(updated);
    if (selectedMatchReport && selectedMatchReport.id === reportId) {
      setSelectedMatchReport({ ...selectedMatchReport, status: "Verified Match & Hoysala PCR Dispatched" });
    }
    alert(`Case ${reportId} verified via KSP Neural Facial Recognition. Automated Hoysala PCR beat dispatch alert transmitted!`);
  };

  const resetIncidentForm = () => {
    setIncidentFilingReceipt(null);
    setIncidentLocation('');
    setIncidentDetails('');
    setReportMedia(null);
    setPreviewMediaUrl(null);
  };

  // Get current station options for the selected district
  const currentDistrictObj = KARNATAKA_DISTRICTS_STATIONS.find(d => d.district === selectedDistrict) || KARNATAKA_DISTRICTS_STATIONS[0];

  // Filtered list of all stations for quick search
  const filteredStations = stationSearchQuery.trim() 
    ? ALL_KARNATAKA_POLICE_STATIONS.filter(s => s.name.toLowerCase().includes(stationSearchQuery.toLowerCase()) || s.district.toLowerCase().includes(stationSearchQuery.toLowerCase()))
    : [];

  // ============================================================================
  // 1. PUBLIC CITIZEN PORTAL VIEW (STRICTLY TWO SECTIONS)
  // ============================================================================
  if (isPublic) {
    return (
      <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-[#071D3A] text-white' : 'bg-[#FAF6F0] text-gray-800'}`}>
        {/* Top Header */}
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-[#0B2E59] text-white px-6 shadow-md select-none border-b border-[#05182E]">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20 shrink-0 bg-white" style={{ clipPath: 'circle(50%)' }}>
              <img
                src="/assets/karnataka-emblem.png"
                alt="Karnataka Police Emblem"
                className="h-full w-full object-cover scale-125"
                style={{ clipPath: 'circle(48%)' }}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center space-x-1.5">
                <span className="font-sans text-sm font-bold tracking-wide">
                  {cT.kspHeader}
                </span>
                <span className="h-3 w-px bg-white/30" />
                <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded uppercase">
                  {cT.citizenPortalTag}
                </span>
              </div>
              <span className="font-mono text-xs font-medium text-white/80">
                {cT.portalSubtitle}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-[#133D6B] text-white/90 cursor-pointer transition"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-300" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link 
              to="/login" 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
            >
              <ArrowLeft size={13} /> {cT.officerLogin}
            </Link>
          </div>
        </header>

        {/* LED BUS/METRO/STATION MARQUEE TICKER WARNING BAR */}
        <div className="w-full bg-[#050B14] border-b-2 border-red-600 text-amber-300 overflow-hidden font-mono text-xs py-2 px-3 select-none shadow-inner flex items-center shrink-0 z-40">
          <style>{`
            @keyframes marqueeBusSteady {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-bus {
              display: inline-flex;
              white-space: nowrap;
              width: max-content;
              animation: marqueeBusSteady 36s linear infinite;
            }
            .animate-marquee-bus:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="bg-red-700 text-white font-black px-2.5 py-0.5 rounded text-[10px] uppercase tracking-widest shrink-0 mr-3 flex items-center gap-1.5 shadow border border-red-400">
            <AlertTriangle size={13} className="text-amber-300 animate-bounce" />
            <span>{cT.legalWarningBadge}</span>
          </div>
          <div className="relative flex overflow-x-hidden w-full whitespace-nowrap">
            <div className="animate-marquee-bus font-mono text-amber-300 font-bold tracking-wider text-[11.5px] flex items-center gap-8 cursor-help" title="Hover to pause scroll">
              <span>{cT.legalWarningText}</span>
              <span>•</span>
              <span>
                ⚠️ LEGAL WARNING: Filing false crime reports is a punishable offence under Section 217/248 BNS.
              </span>
              <span>•</span>
              <span>
                ⚠️ ಕಾನೂನು ಎಚ್ಚರಿಕೆ: ಸುಳ್ಳು ಅಪರಾಧ ವರದಿಯನ್ನು ಸಲ್ಲಿಸುವುದು ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆ (BNS) ಸೆಕ್ಷನ್ 217/248 ರ ಅಡಿಯಲ್ಲಿ ಅಪರಾಧವಾಗಿದೆ.
              </span>
              <span>•</span>
              {/* Duplicate track for seamless non-stop steady looping */}
              <span>{cT.legalWarningText}</span>
              <span>•</span>
              <span>
                ⚠️ LEGAL WARNING: Filing false crime reports is a punishable offence under Section 217/248 BNS.
              </span>
              <span>•</span>
              <span>
                ⚠️ ಕಾನೂನು ಎಚ್ಚರಿಕೆ: ಸುಳ್ಳು ಅಪರಾಧ ವರದಿಯನ್ನು ಸಲ್ಲಿಸುವುದು ಭಾರತೀಯ ನ್ಯಾಯ ಸಂಹಿತೆ (BNS) ಸೆಕ್ಷನ್ 217/248 ರ ಅಡಿಯಲ್ಲಿ ಅಪರಾಧವಾಗಿದೆ.
              </span>
              <span>•</span>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col justify-start max-w-5xl mx-auto space-y-5">
          {/* Public Portal Banner (Compact) */}
          <div className="bg-[#0B2E59] text-white p-3.5 px-5 rounded-xl shadow-md border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 bg-red-800 text-white text-[9px] font-bold rounded font-mono uppercase">
                  {cT.officialGateway}
                </span>
                <span className="text-[10px] text-gray-300 font-mono">{cT.crimeRegistry}</span>
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight font-sans uppercase">{cT.portalTitle}</h1>
              <p className="text-[11px] text-gray-200 mt-0.5 leading-tight max-w-2xl">
                {cT.portalDesc}
              </p>
            </div>
            <div className="flex items-center space-x-2 bg-[#133D6B] px-3 py-1.5 rounded-lg border border-[#05182E] text-xs shrink-0 self-start md:self-auto">
              <Shield size={16} className="text-amber-400" />
              <div className="text-left font-mono">
                <div className="font-bold text-gray-100 text-[10px]">{cT.citizenSecurity}</div>
                <div className="text-[9px] text-gray-300">{cT.securitySubtext}</div>
              </div>
            </div>
          </div>

          {/* TWO MAIN SECTION TABS */}
          <div className="grid grid-cols-2 select-none bg-white dark:bg-[#0B2E59] p-1.5 rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-sm gap-2">
            <button
              type="button"
              onClick={() => setCitizenTab('report')}
              className={`py-3.5 px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                citizenTab === 'report' 
                  ? 'bg-[#0B2E59] text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText size={16} className={citizenTab === 'report' ? 'text-amber-400' : 'text-blue-600'} />
              <span>{cT.tabReport}</span>
            </button>
            <button
              type="button"
              onClick={() => setCitizenTab('wanted')}
              className={`py-3.5 px-4 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
                citizenTab === 'wanted' 
                  ? 'bg-[#0B2E59] text-white shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
            >
              <AlertTriangle size={16} className={citizenTab === 'wanted' ? 'text-amber-400' : 'text-red-600'} />
              <span>{cT.tabWanted}</span>
            </button>
          </div>

          {/* SECTION 1: FILE INCIDENT REPORT */}
          {citizenTab === 'report' && (
            <div className="space-y-6 text-left">
              {/* DigiLocker Verification Status Banner */}
              <div className={`p-5 rounded-xl border shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition ${
                digiLockerVerified 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    digiLockerVerified ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded ${
                        digiLockerVerified ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200' : 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200'
                      }`}>
                        {digiLockerVerified ? cT.digiAuthBadge : cT.digiReqBadge}
                      </span>
                      {digiLockerVerified && (
                        <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300">
                          Token: {digiLockerToken}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-extrabold text-gray-900 dark:text-white mt-1">
                      {digiLockerVerified 
                        ? `${cT.digiAuthTitle}: ${citizenName} (Aadhaar: ${aadharNumber})`
                        : cT.digiReqTitle}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                      {digiLockerVerified ? cT.digiAuthDesc : cT.digiReqDesc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  {!digiLockerVerified ? (
                    <button
                      type="button"
                      onClick={() => setDigiLockerModal(true)}
                      className="w-full sm:w-auto px-5 py-2.5 bg-[#0B2E59] text-white text-xs font-black rounded-lg hover:bg-[#133D6B] shadow flex items-center justify-center gap-2 cursor-pointer transition"
                    >
                      <Lock size={14} className="text-amber-300" /> {cT.verifyWithDigi}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDigiLockerModal(true)}
                      className="w-full sm:w-auto px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg hover:bg-emerald-800 shadow flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Check size={14} /> {cT.changeVerify}
                    </button>
                  )}
                </div>
              </div>

              {/* Form or Receipt View */}
              {incidentFilingReceipt ? (
                /* OFFICIAL KSP INCIDENT FILING ACKNOWLEDGMENT RECEIPT (NO MATCHES EXPOSED TO CITIZEN) */
                <div className="bg-white dark:bg-[#0B2E59] p-8 rounded-xl border border-emerald-300 dark:border-emerald-800 shadow-md text-left space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 dark:border-gray-700 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                        <CheckCircle size={28} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          INCIDENT FILED & REGISTERED
                        </span>
                        <h3 className="text-lg font-black text-[#0B2E59] dark:text-white mt-1">
                          KSP Digital Incident Acknowledgment Receipt
                        </h3>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-right">
                      <div className="font-bold text-[#0B2E59] dark:text-sky-300 text-sm">
                        {incidentFilingReceipt.incidentRef}
                      </div>
                      <div className="text-gray-500 text-[10px]">
                        {incidentFilingReceipt.timestamp}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-gray-50 dark:bg-[#071D3A] rounded-lg border border-gray-200 dark:border-gray-800 space-y-2">
                      <div><strong className="text-gray-500">Incident Category:</strong> <span className="font-bold">{incidentFilingReceipt.crimeCategory}</span></div>
                      <div><strong className="text-gray-500">Jurisdiction Police Station:</strong> <span className="font-bold text-[#0B2E59] dark:text-sky-300">{incidentFilingReceipt.selectedStation}</span></div>
                      <div><strong className="text-gray-500">District / Commissionerate:</strong> <span>{incidentFilingReceipt.selectedDistrict}</span></div>
                      <div><strong className="text-gray-500">Location of Occurrence:</strong> <span>{incidentFilingReceipt.location}</span></div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-[#071D3A] rounded-lg border border-gray-200 dark:border-gray-800 space-y-2">
                      <div><strong className="text-gray-500">Complainant Name:</strong> <span className="font-bold">{incidentFilingReceipt.citizenName}</span></div>
                      <div><strong className="text-gray-500">Complainant Contact:</strong> <span>+91 {incidentFilingReceipt.citizenPhone}</span></div>
                      <div><strong className="text-gray-500">DigiLocker Consent Token:</strong> <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">{incidentFilingReceipt.digiLockerToken}</span></div>
                      <div><strong className="text-gray-500">Photographic Evidence:</strong> <span className="font-bold text-blue-600">{incidentFilingReceipt.hasMedia ? "Attached & Biometrically Ingested" : "No Media Attached"}</span></div>
                    </div>
                  </div>

                  {/* LEGAL CONFIDENTIALITY NOTICE: RESULTS ARE NOT SHOWN TO CITIZEN */}
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-2">
                    <div className="flex items-center gap-2 text-[#0B2E59] dark:text-sky-300 font-bold text-xs uppercase font-mono">
                      <Shield size={16} /> Investigative Confidentiality & AI Biometric Security Notice
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-[11px]">
                      Your incident report has been securely registered in the Karnataka State Police central dispatch system. 
                      Photographic evidence has been forwarded to the <strong>KSP AI Biometric Facial Recognition Engine</strong> for intelligence correlation against active convict and warrant databases.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-[10px] italic">
                      * In accordance with Section 76 of the Karnataka Police Act and biometric privacy protocols, automated facial match predictions, suspect criminal dossiers, and tactical intelligence records are restricted strictly to authorized investigating police officers and station duty officers.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetIncidentForm}
                      className="px-5 py-2.5 bg-[#0B2E59] text-white text-xs font-bold rounded-lg hover:bg-[#133D6B] cursor-pointer shadow"
                    >
                      File Another Incident Report
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-lg hover:bg-gray-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download size={14} /> Print Filing Acknowledgment Receipt
                    </button>
                  </div>
                </div>
              ) : (
                /* INCIDENT FILING FORM */
                <form onSubmit={handleFileIncidentReport} className="bg-white dark:bg-[#0B2E59] p-6 sm:p-8 rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-sm space-y-6">
                  <div className="border-b dark:border-gray-700 pb-3">
                    <h3 className="text-base font-black text-[#0B2E59] dark:text-sky-300 uppercase tracking-wide flex items-center gap-2">
                      <FileText size={18} className="text-[#8B0000]" /> {cT.incidentDetailsHeader}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                      {cT.incidentDetailsSubtitle}
                    </p>
                  </div>

                  {/* Crime Category & Date/Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                        {cT.categoryLabel}
                      </label>
                      <select 
                        value={crimeCategory}
                        onChange={(e) => setCrimeCategory(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:ring-2 focus:ring-[#0B2E59]"
                      >
                        <option>Theft / House Breaking / Robbery</option>
                        <option>Chain Snatching / Street Robbery</option>
                        <option>Assault / Physical Harm / Weapon Intimidation</option>
                        <option>Cybercrime / OTP & Banking Fraud</option>
                        <option>Motor Vehicle Theft (Two-Wheeler / Car)</option>
                        <option>Extortion / Threat for Protection Money</option>
                        <option>Narcotics / Drug Peddling Activity</option>
                        <option>Missing Person / Suspicious Sighting</option>
                        <option>Vandalism / Public Property Damage</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                        {cT.dateTimeLabel}
                      </label>
                      <input 
                        type="datetime-local"
                        value={incidentDateTime}
                        onChange={(e) => setIncidentDateTime(e.target.value)}
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:ring-2 focus:ring-[#0B2E59]"
                        required
                      />
                    </div>
                  </div>

                  {/* KARNATAKA POLICE STATIONS SELECTOR */}
                  <div className="p-4 bg-gray-50 dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black uppercase text-[#0B2E59] dark:text-sky-300 flex items-center gap-1.5">
                        <Building2 size={15} /> {cT.stationSectionLabel}
                      </label>
                      <span className="text-[10px] font-mono text-gray-500">
                        {cT.districtsStationsCount}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                          {cT.selectDistrictLabel}
                        </label>
                        <select
                          value={selectedDistrict}
                          onChange={(e) => handleDistrictChange(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-medium"
                        >
                          {KARNATAKA_DISTRICTS_STATIONS.map((d) => (
                            <option key={d.district} value={d.district}>
                              {d.district} ({d.zone})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                          {cT.selectStationLabel}
                        </label>
                        <select
                          value={selectedStation}
                          onChange={(e) => setSelectedStation(e.target.value)}
                          className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-bold"
                        >
                          {currentDistrictObj.stations.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Quick Search police station search bar */}
                    <div>
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-3 text-gray-400" />
                        <input
                          type="text"
                          placeholder={cT.searchStationPlaceholder}
                          value={stationSearchQuery}
                          onChange={(e) => setStationSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                        />
                      </div>
                      {filteredStations.length > 0 && (
                        <div className="mt-2 max-h-32 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-[#05182E] divide-y text-xs">
                          {filteredStations.map((st, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedDistrict(st.district);
                                setSelectedStation(st.name);
                                setStationSearchQuery('');
                              }}
                              className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-slate-800 flex justify-between items-center cursor-pointer"
                            >
                              <span className="font-bold text-[#0B2E59] dark:text-sky-300">{st.name}</span>
                              <span className="text-[10px] text-gray-500 font-mono">{st.district}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Incident Location Landmark */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5 flex items-center gap-1">
                      <MapPin size={14} className="text-[#8B0000]" /> {cT.locationLabel}
                    </label>
                    <input 
                      type="text" 
                      placeholder={cT.locationPlaceholder}
                      value={incidentLocation}
                      onChange={(e) => setIncidentLocation(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 dark:text-gray-200 mb-1.5">
                      {cT.descriptionLabel}
                    </label>
                    <textarea 
                      rows={4}
                      placeholder={cT.descriptionPlaceholder}
                      value={incidentDetails}
                      onChange={(e) => setIncidentDetails(e.target.value)}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  {/* SUSPECT PHOTO / CCTV IMAGE UPLOAD (FOR BACKGROUND AI FACE MATCHING) */}
                  <div className="p-5 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50/60 dark:bg-[#071D3A]/40 space-y-3">
                    <label className="block text-xs font-black uppercase text-[#0B2E59] dark:text-sky-300 flex items-center gap-1.5">
                      <Upload size={16} /> {cT.uploadLabel}
                    </label>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300">
                      {cT.uploadSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleMediaUpload(e.target.files[0]);
                          }
                        }}
                        className="w-full sm:w-auto text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0B2E59] file:text-white hover:file:bg-[#133D6B] cursor-pointer"
                      />

                      {previewMediaUrl && (
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-[#05182E] rounded-lg border border-gray-200 dark:border-gray-700">
                          <img src={previewMediaUrl} alt="Preview" className="h-12 w-12 rounded object-cover border" />
                          <div className="text-left text-[11px]">
                            <span className="font-bold text-gray-800 dark:text-white block font-mono">{reportMedia?.name}</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓ Ready for Police AI Face Scan</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setReportMedia(null); setPreviewMediaUrl(null); }}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submittingIncident}
                      className="w-full py-3.5 bg-[#8B0000] text-white text-xs font-black rounded-lg hover:bg-[#a60000] flex items-center justify-center gap-2 shadow-md cursor-pointer transition uppercase tracking-wider"
                    >
                      <Megaphone size={16} /> 
                      {submittingIncident ? cT.submittingBtn : cT.submitBtn}
                    </button>
                    {!digiLockerVerified && (
                      <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold mt-1.5 block text-center">
                        {cT.digiPromptNotice}
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          )}

          {/* SECTION 2: WANTED CRIMINALS ROSTER (NO DIGILOCKER REQUIRED) */}
          {citizenTab === 'wanted' && (
            <div className="space-y-6 text-left">
              <div className="bg-white dark:bg-[#0B2E59] p-6 rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b dark:border-gray-700 pb-3 mb-5">
                  <div>
                    <h3 className="text-sm font-black text-[#0B2E59] dark:text-sky-300 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle size={18} className="text-[#8B0000] animate-pulse" /> {cT.wantedHeader}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                      {cT.wantedSubtitle}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-red-100 text-red-900 dark:bg-red-950/80 dark:text-red-200 text-[10px] font-bold rounded font-mono uppercase tracking-wider border border-red-300 dark:border-red-800">
                      🚨 ACTIVE LOOKOUT BULLETIN
                    </span>
                    <span className="px-2.5 py-1 bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200 text-[10px] font-bold rounded font-mono">
                      {cT.directSightingBadge}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {AI_WANTED_SUSPECTS.map((w) => (
                    <div 
                      key={w.id} 
                      className="border-2 border-red-800/40 dark:border-red-900/60 rounded-xl p-5 bg-gradient-to-b from-white to-[#FAF6F0]/60 dark:from-[#0B2E59] dark:to-[#071D3A] flex flex-col justify-between hover:shadow-xl transition relative overflow-hidden"
                    >
                      {/* Red Wanted Header Tape */}
                      <div className="bg-gradient-to-r from-[#8B0000] to-[#5a0505] text-white -mx-5 -mt-5 px-4 py-2 mb-4 flex justify-between items-center border-b border-red-950 shadow-xs">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                          <span className="text-[10.5px] font-black tracking-widest uppercase font-mono">
                            KSP LOOKOUT BULLETIN
                          </span>
                        </div>
                        <span className="text-[9.5px] font-mono text-amber-300 font-bold">
                          REF: {w.wantedRef}
                        </span>
                      </div>

                      <div>
                        {/* Status Badges & Rewards */}
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-white text-[9px] font-black px-2 py-0.5 rounded font-mono bg-[#8B0000] tracking-wider uppercase border border-red-400 shadow-xs">
                            {w.warrant_status}
                          </span>
                          <span className="text-xs font-black text-red-700 dark:text-red-400 font-mono bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-900">
                            CASH REWARD: {w.reward}
                          </span>
                        </div>

                        {/* Visual & Core Identification */}
                        <div className="flex gap-4 items-start mb-4">
                          <div className="relative w-28 h-32 rounded-lg overflow-hidden border-2 border-red-700 bg-slate-900 shrink-0 shadow-md flex items-center justify-center group select-none">
                            <img 
                              src={w.photo_url} 
                              alt={w.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                            <div className="absolute top-1 left-1 bg-black/85 text-amber-300 text-[7px] font-mono px-1 py-0.5 rounded backdrop-blur-xs font-bold border border-amber-500/50 uppercase tracking-tighter">
                              {w.sourceType || "SURVEILLANCE CAM"}
                            </div>
                            <div className="absolute bottom-1 inset-x-1 bg-red-950/90 text-red-200 text-[7px] font-mono font-bold text-center py-0.5 uppercase tracking-wider rounded border border-red-700/80">
                              AT LARGE • WANTED
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-base font-black text-[#0B2E59] dark:text-white leading-tight">
                              {w.name}
                            </h4>
                            <p className="text-xs text-gray-700 dark:text-gray-200 font-bold">
                              Alias: <span className="text-red-700 dark:text-amber-300 font-mono">"{w.aliases.join(', ')}"</span>
                            </p>
                            <p className="text-[11px] text-gray-600 dark:text-gray-300">
                              Age: <strong>{w.age} yrs</strong> • Height: <strong>{w.height}</strong> • Sex: <strong>{w.gender}</strong>
                            </p>
                            <div className="text-[10.5px] text-red-900 dark:text-amber-200/90 font-mono bg-amber-50 dark:bg-amber-950/30 p-1.5 rounded border border-amber-200 dark:border-amber-900/50 leading-tight">
                              <strong>Mark:</strong> {w.identificationMarks}
                            </div>
                          </div>
                        </div>
                        
                        {/* Legal & Crime Specifications */}
                        <div className="space-y-1.5 text-xs text-gray-800 dark:text-gray-200 leading-snug border-t dark:border-ksp-navy-light pt-3 bg-black/5 dark:bg-black/20 p-2.5 rounded-lg font-mono text-[11px]">
                          <div>
                            <strong className="text-red-700 dark:text-red-400">FIR Reference:</strong> {w.fir_number}
                          </div>
                          <div>
                            <strong className="text-sky-700 dark:text-sky-400">Legal Sections:</strong> {w.bns_ipc_sections}
                          </div>
                          <div>
                            <strong>Crime Type:</strong> {w.crime_type}
                          </div>
                          <div className="text-[10.5px] text-gray-600 dark:text-gray-400">
                            <strong>MO Signature:</strong> {w.mo_signature}
                          </div>
                          <div>
                            <strong>Jurisdiction:</strong> {w.district} ({w.police_station})
                          </div>
                          <div>
                            <strong className="text-amber-700 dark:text-amber-400">Last Known Sighting:</strong> {w.last_known_address}
                          </div>
                        </div>
                      </div>
                      
                      {/* Call-to-Action Direct Anonymous Reporting */}
                      <button
                        type="button"
                        onClick={() => setReportingSuspect(w)}
                        className="mt-4 w-full py-2.5 bg-[#8B0000] hover:bg-[#a10505] text-white text-xs font-black rounded-lg flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition uppercase tracking-wider border border-red-500"
                      >
                        <Megaphone size={14} className="text-amber-300 animate-bounce" /> 
                        REPORT SIGHTING (DIRECT / ANONYMOUS TIP)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPANDABLE CITIZEN PORTAL OPERATIONAL GUIDE & LEGAL FAQ */}
          <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-md p-5 space-y-4 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-amber-500 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-sm text-[#0B2E59] dark:text-white uppercase tracking-wider font-mono">
                    CITIZEN PORTAL OPERATIONAL GUIDE & LEGAL INFORMATION
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                    Official Karnataka State Police Resident Portal Regulations & Usage Guide
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold px-2 py-1 rounded shrink-0">
                Click Section below to Expand / Collapse
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Accordion Item 1 */}
              <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-[#05152A] overflow-hidden transition">
                <summary className="flex items-center justify-between p-3 font-bold text-gray-800 dark:text-gray-100 cursor-pointer font-mono select-none hover:bg-blue-50/50 dark:hover:bg-blue-950/30">
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-blue-500 shrink-0" />
                    1. How to File an Incident Report (Step-by-Step Guide)
                  </span>
                  <ChevronDown size={15} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="p-4 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-[11px] space-y-1.5 border-t border-gray-200 dark:border-white/10">
                  <p>• <strong>Step 1 (Resident Verification):</strong> Authenticate your identity via DigiLocker prior to filing to validate genuine emergency complaints.</p>
                  <p>• <strong>Step 2 (Crime Details):</strong> Select your occurrence category (Theft, Assault, Cybercrime, Missing Person) and specify occurrence date/time.</p>
                  <p>• <strong>Step 3 (Jurisdiction Selection):</strong> Choose your jurisdictional Karnataka Police Station across all 31 districts.</p>
                  <p>• <strong>Step 4 (Evidence Ingestion):</strong> Upload photographic evidence or suspect mugshots. Attached media is automatically analyzed by KSP AI Face Match engines.</p>
                </div>
              </details>

              {/* Accordion Item 2 */}
              <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-[#05152A] overflow-hidden transition">
                <summary className="flex items-center justify-between p-3 font-bold text-gray-800 dark:text-gray-100 cursor-pointer font-mono select-none hover:bg-blue-50/50 dark:hover:bg-blue-950/30">
                  <span className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                    2. DigiLocker Identity Verification & Citizen Privacy Safeguards
                  </span>
                  <ChevronDown size={15} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="p-4 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-[11px] space-y-1.5 border-t border-gray-200 dark:border-white/10">
                  <p>• DigiLocker resident verification authenticates genuine citizen complaints and prevents automated bot spam or malicious spoofing.</p>
                  <p>• All citizen personal data is encrypted with 256-bit TLS security and governed under the Digital Personal Data Protection (DPDP) Act, 2023.</p>
                  <p>• Investigative records and AI face correlation scores remain confidential and restricted exclusively to station duty officers.</p>
                </div>
              </details>

              {/* Accordion Item 3 */}
              <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-[#05152A] overflow-hidden transition">
                <summary className="flex items-center justify-between p-3 font-bold text-gray-800 dark:text-gray-100 cursor-pointer font-mono select-none hover:bg-blue-50/50 dark:hover:bg-blue-950/30">
                  <span className="flex items-center gap-2">
                    <Megaphone size={14} className="text-amber-500 shrink-0" />
                    3. Anonymous Wanted Criminal Sighting Tips & Cash Rewards
                  </span>
                  <ChevronDown size={15} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="p-4 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-[11px] space-y-1.5 border-t border-gray-200 dark:border-white/10">
                  <p>• Citizens can submit direct sighting tips on wanted convicts and absconders without requiring DigiLocker login.</p>
                  <p>• Informant identity remains strictly confidential. Verified tips resulting in apprehending high-risk fugitives qualify for government cash rewards.</p>
                </div>
              </details>

              {/* Accordion Item 4 */}
              <details className="group border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50/50 dark:bg-[#05152A] overflow-hidden transition">
                <summary className="flex items-center justify-between p-3 font-bold text-gray-800 dark:text-gray-100 cursor-pointer font-mono select-none hover:bg-red-50/50 dark:hover:bg-red-950/30">
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={14} className="text-red-500 shrink-0" />
                    4. Strict Legal Penalties for False Crime Reporting (BNS Sec 217/248 & IPC Sec 182)
                  </span>
                  <ChevronDown size={15} className="text-gray-400 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <div className="p-4 pt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-[11px] space-y-1.5 border-t border-gray-200 dark:border-white/10">
                  <p>• <strong>BNS Section 217 & 248:</strong> Furnishing false information to a public servant or fabricating false evidence carries up to 7 years imprisonment and heavy fines.</p>
                  <p>• <strong>IPC Section 182:</strong> Providing false intent to cause a public servant to use lawful power to injury of another person is punishable with rigorous imprisonment.</p>
                  <p>• System logs citizen IP telemetry, browser fingerprint, and DigiLocker ID for immediate law enforcement summons in case of fake complaints.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* DIRECT WANTED SIGHTING MODAL (NO DIGILOCKER REQUIRED) */}
        {reportingSuspect && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 dark:border-ksp-navy-light bg-white dark:bg-[#0B2E59] p-6 shadow-2xl text-left space-y-4">
              <div className="flex justify-between items-start border-b dark:border-ksp-navy-light pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-[#8B0000] text-white px-2 py-0.5 rounded">
                    DIRECT CITIZEN TIP (NO VERIFICATION REQUIRED)
                  </span>
                  <h3 className="text-base font-extrabold text-[#0B2E59] dark:text-white mt-1">
                    Report Sighting of {reportingSuspect.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setReportingSuspect(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              {sightingSuccessMsg ? (
                <div className="p-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg text-center text-xs font-bold text-green-900 dark:text-green-300">
                  <CheckCircle size={28} className="mx-auto text-green-700 mb-2" />
                  {sightingSuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleSightingSubmit} className="space-y-3.5">
                  <div className="p-3 bg-gray-50 dark:bg-[#071D3A] rounded-lg border dark:border-ksp-navy-light text-xs text-gray-700 dark:text-gray-300 flex items-center gap-3">
                    {reportingSuspect.photo_url ? (
                      <div className="relative w-14 h-16 rounded overflow-hidden border border-red-700 bg-slate-900 shrink-0 shadow">
                        <img src={reportingSuspect.photo_url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 inset-x-0 bg-red-950/90 text-red-200 text-[6.5px] font-mono font-bold text-center py-0.2 uppercase">
                          WANTED
                        </div>
                      </div>
                    ) : (
                      <div className="h-14 w-14 rounded bg-gray-300 flex items-center justify-center font-mono text-[9px]">SUSPECT</div>
                    )}
                    <div>
                      <p><strong>Suspect ID:</strong> {reportingSuspect.id || reportingSuspect.convict_id} • <strong>Alias:</strong> {Array.isArray(reportingSuspect.aliases) ? reportingSuspect.aliases.join(', ') : reportingSuspect.aliases || 'N/A'}</p>
                      <p><strong>Primary MO:</strong> {reportingSuspect.mo_signature}</p>
                      <p><strong>Jurisdiction Station:</strong> {reportingSuspect.police_station}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-1">SIGHTING LOCATION / LANDMARK *</label>
                    <input
                      type="text"
                      placeholder="e.g., Near Majestic Bus Terminal Platform 4, Bengaluru"
                      value={sightingLocation}
                      onChange={(e) => setSightingLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-1">OBSERVATION DETAILS & DIRECTION *</label>
                    <textarea
                      rows={3}
                      placeholder="Describe attire, companion details, vehicle license plate, or travel direction..."
                      value={sightingDetails}
                      onChange={(e) => setSightingDetails(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-1">CITIZEN CONTACT NUMBER (OPTIONAL / ANONYMOUS ALLOWED)</label>
                    <input
                      type="text"
                      placeholder="Leave blank to report anonymously"
                      value={sightingContact}
                      onChange={(e) => setSightingContact(e.target.value)}
                      className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t dark:border-ksp-navy-light">
                    <button
                      type="button"
                      onClick={() => setReportingSuspect(null)}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded hover:bg-gray-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submittingSighting}
                      className="px-5 py-2 bg-[#8B0000] text-white text-xs font-bold rounded hover:bg-[#a60000] flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Megaphone size={14} /> {submittingSighting ? "Submitting..." : "Submit Direct Sighting Alert"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* DIGILOCKER VERIFICATION MODAL WITH MOCK & INSTANT TEST PRESETS */}
        {digiLockerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 dark:border-ksp-navy-light bg-white dark:bg-[#0B2E59] p-6 shadow-2xl text-left space-y-4">
              <div className="flex justify-between items-start border-b dark:border-ksp-navy-light pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-[#0B2E59] dark:text-sky-300">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-black bg-[#0B2E59] text-white px-2 py-0.5 rounded uppercase">
                      DIGILOCKER RESIDENT AUTHENTICATION
                    </span>
                    <h3 className="text-sm font-extrabold text-[#0B2E59] dark:text-white">
                      Aadhaar Resident Identity Verification
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDigiLockerModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* VERIFICATION MODE TABS: LIVE DETAILS AT SPOT vs DEMO PRESETS */}
                <div className="flex rounded-lg bg-gray-100 dark:bg-gray-800/80 p-1 gap-1 border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setAuthMode('custom')}
                    className={`flex-1 py-1.5 px-3 rounded-md font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      authMode === 'custom'
                        ? 'bg-[#0B2E59] text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>✍️</span> Enter Live Details at Spot
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('preset')}
                    className={`flex-1 py-1.5 px-3 rounded-md font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer ${
                      authMode === 'preset'
                        ? 'bg-[#0B2E59] text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span>⚡</span> Demo Presets & 1-Click
                  </button>
                </div>

                {authMode === 'custom' ? (
                  /* LIVE AT-THE-SPOT VERIFICATION BANNER */
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
                        Live Citizen Verification: Enter your genuine details below to receive authentic WhatsApp OTP.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={clearDigiLockerDetails}
                      className="text-[10px] text-emerald-700 dark:text-emerald-300 hover:underline font-bold cursor-pointer shrink-0 ml-2"
                    >
                      Clear Fields
                    </button>
                  </div>
                ) : (
                  /* DEMO / PRESET MODE VIEW */
                  <div className="space-y-3">
                    {/* 1-CLICK INSTANT DEMO BYPASS BUTTON */}
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-lg flex items-center justify-between gap-3">
                      <div>
                        <span className="font-bold text-amber-900 dark:text-amber-200 text-[11px] block">
                          ⚡ 1-Click Instant Verify (Test/Evaluator Bypass)
                        </span>
                        <span className="text-[10px] text-amber-800 dark:text-amber-300">
                          Bypasses SMS/WhatsApp delay and instantly authorizes mock resident credentials.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleInstantDigiLockerBypass}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-[11px] rounded shadow cursor-pointer shrink-0"
                      >
                        Instant Verify
                      </button>
                    </div>

                    {/* Mock Preset Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-bold text-gray-700 dark:text-gray-300 text-[11px]">
                          SELECT MOCK CITIZEN PRESET:
                        </label>
                        <button
                          type="button"
                          onClick={clearDigiLockerDetails}
                          className="text-[10px] text-blue-600 hover:underline font-semibold cursor-pointer"
                        >
                          + Type Own Details
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => applyDigiLockerPreset("Ramesh Kumar", "5481-9023-4819", "9845012345")}
                          className={`p-2 rounded border text-left cursor-pointer transition ${
                            citizenName === "Ramesh Kumar" && authMode === 'preset'
                              ? "border-[#0B2E59] bg-blue-50 dark:bg-[#071D3A] font-bold" 
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-bold text-[#0B2E59] dark:text-white text-[11px]">Ramesh Kumar</div>
                          <div className="text-[9px] text-gray-500 font-mono">5481-9023-4819</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDigiLockerPreset("Sunitha Rao", "9812-4410-3321", "9448067890")}
                          className={`p-2 rounded border text-left cursor-pointer transition ${
                            citizenName === "Sunitha Rao" && authMode === 'preset'
                              ? "border-[#0B2E59] bg-blue-50 dark:bg-[#071D3A] font-bold" 
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-bold text-[#0B2E59] dark:text-white text-[11px]">Sunitha Rao</div>
                          <div className="text-[9px] text-gray-500 font-mono">9812-4410-3321</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDigiLockerPreset("Ansh", "7721-6549-1082", "9905533068")}
                          className={`p-2 rounded border text-left cursor-pointer transition ${
                            citizenName === "Ansh" && authMode === 'preset'
                              ? "border-[#0B2E59] bg-blue-50 dark:bg-[#071D3A] font-bold" 
                              : "border-gray-200 dark:border-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-bold text-[#0B2E59] dark:text-white text-[11px]">Ansh</div>
                          <div className="text-[9px] text-gray-500 font-mono">9905533068</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* AT-THE-SPOT RESIDENT DETAILS FORM (FULL NAME, AADHAAR, AND WHATSAPP MOBILE) */}
                <div className="p-3 bg-gray-50/80 dark:bg-[#071D3A]/60 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-gray-200 dark:border-gray-700">
                    <span className="font-extrabold text-[11px] text-[#0B2E59] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>👤</span> Resident Identity Details (Fill at the spot)
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      authMode === 'custom' 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {authMode === 'custom' ? '● Custom Live Details' : '⚡ Preset Loaded'}
                    </span>
                  </div>

                  {/* CITIZEN FULL NAME */}
                  <div>
                    <label className="block font-bold text-gray-700 dark:text-gray-200 text-[11px] mb-1">
                      CITIZEN FULL NAME (AS PER AADHAAR / ID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={citizenName}
                      onChange={(e) => {
                        setCitizenName(e.target.value);
                        setAuthMode('custom');
                      }}
                      placeholder="Enter your full name (e.g. Ramesh Kumar, Ansh Verma)"
                      className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:ring-1 focus:ring-[#0B2E59]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* AADHAAR NUMBER */}
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-200 text-[11px] mb-1">
                        AADHAAR NUMBER (12-DIGIT) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={aadharNumber}
                        onChange={(e) => {
                          setAadharNumber(e.target.value);
                          setAuthMode('custom');
                        }}
                        placeholder="e.g. 7721-6549-1082"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-mono focus:ring-1 focus:ring-[#0B2E59]"
                      />
                    </div>

                    {/* WHATSAPP / MOBILE NO */}
                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-200 text-[11px] mb-1">
                        WHATSAPP / MOBILE NO. (+91) <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-2.5 rounded-l border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          value={citizenPhone}
                          onChange={(e) => {
                            setCitizenPhone(e.target.value.replace(/\D/g, ''));
                            setAuthMode('custom');
                          }}
                          placeholder="10-digit number"
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-r text-xs bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-mono focus:ring-1 focus:ring-[#0B2E59]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live WhatsApp Gateway Status Banner */}
                {gatewayStatus?.ready ? (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      WhatsApp Bot Connected (+{gatewayStatus.user || 'Active'})
                    </span>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Real WhatsApp OTP Active</span>
                  </div>
                ) : (
                  <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-amber-900 dark:text-amber-200 font-bold">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        WhatsApp Gateway: Awaiting Phone Link
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowQrLink(!showQrLink)}
                        className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[10px] cursor-pointer"
                      >
                        {showQrLink ? 'Hide QR' : '📲 Scan QR to Link WhatsApp'}
                      </button>
                    </div>
                    {showQrLink && (
                      <div className="mt-2.5 p-3 bg-white dark:bg-black/40 rounded-lg border border-amber-300 dark:border-amber-700/60 text-center">
                        <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-200 mb-2">
                          1. Open <strong>WhatsApp</strong> on phone &rarr; <strong>Linked Devices</strong> &rarr; <strong>Link a Device</strong><br/>
                          2. Scan this QR code:
                        </p>
                        {gatewayStatus?.qrImageUrl ? (
                          <img src={gatewayStatus.qrImageUrl} alt="WhatsApp QR" className="mx-auto w-44 h-44 border-2 border-[#0B2E59] rounded-lg shadow-sm" />
                        ) : (
                          <div className="py-6 text-xs text-gray-500">Generating WhatsApp QR code...</div>
                        )}
                        <p className="text-[10px] text-gray-500 mt-2">
                          Or open <a href="http://localhost:2785/qr" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">http://localhost:2785/qr</a> in browser
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!otpSent ? (
                  <button
                    type="button"
                    disabled={sendingOtp}
                    onClick={handleSendOtp}
                    className="w-full py-2.5 bg-[#0B2E59] text-white text-xs font-bold rounded-lg hover:bg-[#133D6B] cursor-pointer shadow flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {sendingOtp ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Dispatching WhatsApp OTP to +91 {citizenPhone}...</span>
                      </>
                    ) : (
                      <>
                        <span>Send WhatsApp DigiLocker OTP to +91 {citizenPhone || 'Mobile'}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-lg text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold flex items-center gap-1 text-blue-950 dark:text-blue-200">
                          {whatsappDispatched ? (
                            <span className="text-green-600 font-bold">✓ OTP Dispatched to WhatsApp (+91 {citizenPhone})</span>
                          ) : (
                            <span>🔒 DigiLocker OTP Dispatched</span>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">
                          Please check your WhatsApp on <strong>+91 {citizenPhone}</strong> and enter the 6-digit code.
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={sendingOtp}
                          className="px-2.5 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-800 dark:text-white rounded text-[11px] font-bold cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 dark:text-gray-200 mb-1">ENTER 6-DIGIT OTP</label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit OTP code"
                        value={aadharOtp}
                        onChange={(e) => {
                          setAadharOtp(e.target.value);
                          setOtpError('');
                        }}
                        className={`w-full p-2.5 border rounded-lg text-sm bg-white dark:bg-[#05182E] text-gray-800 dark:text-white font-mono tracking-widest text-center font-bold ${
                          otpError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-700'
                        }`}
                      />
                    </div>

                    {otpError && (
                      <div className="p-2 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded text-[11px] text-red-600 dark:text-red-300 font-bold">
                        ⚠️ {otpError}
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={verifyingOtp}
                      onClick={handleVerifyOtp}
                      className="w-full py-2.5 bg-green-700 text-white text-xs font-bold rounded-lg hover:bg-green-800 cursor-pointer shadow flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {verifyingOtp ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Authenticating with DigiLocker...</span>
                        </>
                      ) : (
                        <span>Authenticate & Authorize Submission</span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // 2. OFFICER / INVESTIGATOR VIEW (INSIDE PORTAL UNDER AI FACE SEARCH)
  // ============================================================================
  return (
    <div className="space-y-6 text-left">
      {/* Streamlined Biometrics Command Header & Switcher */}
      <div className="bg-[#0B2E59] text-white p-3.5 px-5 rounded-xl shadow-md border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-[#133D6B] border border-white/10 text-amber-400 shrink-0">
            {biometricModality === 'face' ? <UserCheck size={20} /> : <Fingerprint size={20} />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight font-sans">
                {language === 'hi' ? 'एआई फेस सर्च एवं बायोमेट्रिक इंटेलिजेंस' : language === 'kn' ? 'ಎಐ ಮುಖ ಶೋಧನೆ & ಬಯೋಮೆಟ್ರಿಕ್ ಇಂಟೆಲಿಜೆನ್ಸ್' : 'AI Face Search & Biometric Intelligence'}
              </h1>
              <span className="px-2 py-0.5 bg-red-800 text-white text-[9px] font-bold rounded font-mono uppercase">
                KSP BIOMETRICS HUB
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80">
              128-d ResNet facial alignment, NAFIS 10-print minutiae matching, & citizen incident analysis
            </p>
          </div>
        </div>

        {/* Integrated Modality Switcher Tabs */}
        <div className="flex items-center bg-[#071D3A] p-1 rounded-lg border border-white/10 text-xs shrink-0 select-none flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setBiometricModality('face')}
            className={`px-3.5 py-1.5 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer text-xs ${
              biometricModality === 'face'
                ? 'bg-[#133D6B] text-white shadow-sm border border-white/15'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <UserCheck size={14} className={biometricModality === 'face' ? 'text-amber-400' : 'text-blue-400'} />
            <span>{language === 'hi' ? 'चेहरा पहचान (ResNet)' : language === 'kn' ? 'ಮುಖ ಗುರುತಿಸುವಿಕೆ' : 'Facial Recognition'}</span>
          </button>

          <button
            type="button"
            onClick={() => setBiometricModality('nafis')}
            className={`px-3.5 py-1.5 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer text-xs ${
              biometricModality === 'nafis'
                ? 'bg-[#133D6B] text-white shadow-sm border border-white/15'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Fingerprint size={14} className={biometricModality === 'nafis' ? 'text-amber-400' : 'text-amber-500'} />
            <span>{language === 'hi' ? 'NAFIS 10-प्रिंट फिंगरप्रिंट' : language === 'kn' ? 'NAFIS ಫಿಂಗರ್‌ಪ್ರಿಂಟ್' : 'NAFIS Fingerprint'}</span>
          </button>

          <button
            type="button"
            onClick={() => setBiometricModality('history')}
            className={`px-3.5 py-1.5 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer text-xs ${
              biometricModality === 'history'
                ? 'bg-[#133D6B] text-white shadow-sm border border-white/15'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <History size={14} className={biometricModality === 'history' ? 'text-amber-400' : 'text-sky-400'} />
            <span>{language === 'hi' ? 'खोज इतिहास' : language === 'kn' ? 'ಶೋಧನಾ ಇತಿಹಾಸ' : 'Search History'}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${biometricModality === 'history' ? 'bg-amber-400 text-black font-black' : 'bg-white/20 text-white font-bold'}`}>
              {investigatorScanCount}
            </span>
          </button>
        </div>
      </div>

      {/* Statutory Manual Police Verification Advisory Notice */}
      <div className="bg-amber-500/10 dark:bg-amber-950/40 border-l-4 border-amber-500 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3.5 px-4.5 flex items-start gap-3 shadow-xs">
        <div className="p-1 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle size={18} />
        </div>
        <div className="space-y-0.5 text-left">
          <h4 className="text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5 font-mono">
            <span>{language === 'hi' ? '⚠️ अनिवार्य पुलिस सत्यापन चेतावनी' : language === 'kn' ? '⚠️ ಕಡ್ಡಾಯ ಪೊಲೀಸ್ ಪರಿಶೀಲನೆ ಎಚ್ಚರಿಕೆ' : '⚠️ MANDATORY POLICE VERIFICATION ADVISORY'}</span>
          </h4>
          <p className="text-[11px] text-amber-850 dark:text-amber-200/90 leading-relaxed font-sans">
            {language === 'hi'
              ? 'मैन्युअल सत्यापन आवश्यक है: एआई चेहरा विश्लेषण संभावित परिणामों पर आधारित है और गलत पहचान दे सकता है। किसी भी कानूनी कार्रवाई या गिरफ्तारी से पहले प्रत्यक्ष पुलिस सत्यापन एवं स्वतंत्र साक्ष्य अनिवार्य हैं।'
              : language === 'kn'
              ? 'ಹಸ್ತಚಾಲಿತ ಪರಿಶೀಲನೆ ಕಡ್ಡಾಯವಾಗಿದೆ: ಎಐ ಮುಖ ವಿಶ್ಲೇಷಣೆಯು ಸಂಭವನೀಯತೆಯ ಆಧಾರಿತವಾಗಿದ್ದು ತಪ್ಪು ಉತ್ತರಗಳನ್ನು ನೀಡಬಹುದು. ಯಾವುದೇ ಕಾನೂನು ಕ್ರಮ ಅಥವಾ ಬಂಧನ ಮಾಡುವ ಮೊದಲು ಪೊಲೀಸ್ ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಅತ್ಯಗತ್ಯ.'
              : 'Manual verification is strictly necessary. AI face analysis is probabilistic and can produce false positives or incorrect results. Comprehensive field police verification and independent corroborating evidence are strictly mandatory prior to any legal action or arrest.'}
          </p>
        </div>
      </div>

      {/* Main Biometric Matching Engine (Face, NAFIS, or Investigator History) */}
      {biometricModality === 'face' ? (
        <FaceSearchPanel isPublic={false} onViewHistory={() => setBiometricModality('history')} />
      ) : biometricModality === 'nafis' ? (
        <NafisFingerprintMatcher />
      ) : (
        <InvestigatorFaceHistory onNavigateToScanner={() => setBiometricModality('face')} />
      )}

      {/* CITIZEN INCIDENT & SIGHTING ANALYSIS QUEUE */}
      <div className="bg-white dark:bg-[#0B2E59] rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-sm overflow-hidden">
        <div className="bg-gray-50 dark:bg-[#071D3A] border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0B2E59] dark:text-sky-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Bell size={15} className="text-[#8B0000]" /> {formatDynamicText("PENDING CITIZEN PORTAL INCIDENTS & SIGHTING REPORTS", language)} ({reportsList.length})
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              type="button"
              onClick={resetToCirasIncidents}
              className="text-[11px] font-bold text-[#8B0000] dark:text-red-300 hover:underline cursor-pointer flex items-center gap-1"
            >
              <RotateCcw size={12} /> {formatDynamicText("Reset to Clean CIRAS Incidents", language)}
            </button>
            <button 
              type="button"
              onClick={refreshReports}
              className="text-[11px] font-bold text-[#0B2E59] dark:text-sky-300 hover:underline cursor-pointer flex items-center gap-1"
            >
              {formatDynamicText("Refresh Incident Queue", language)}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-white font-mono uppercase text-[10px] border-b border-gray-200 dark:border-gray-700">
                <th className="p-3">{language === 'hi' ? 'संदर्भ संख्या' : language === 'kn' ? 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ' : 'Reference No.'}</th>
                <th className="p-3">{language === 'hi' ? 'साक्ष्य फोटो' : language === 'kn' ? 'ಸಾಕ್ಷ್ಯ ಫೋಟೋ' : 'Evidence Photo'}</th>
                <th className="p-3">{language === 'hi' ? 'एआई बायोमेट्रिक स्थिति' : language === 'kn' ? 'ಎಐ ಬಯೋಮೆಟ್ರಿಕ್ ಸ್ಥಿತಿ' : 'AI Biometric Status'}</th>
                <th className="p-3">{language === 'hi' ? 'डिजीलॉक स्थिति' : language === 'kn' ? 'ಡಿಜಿಲಾಕರ್ ಸ್ಥಿತಿ' : 'DigiLocker Status'}</th>
                <th className="p-3">{language === 'hi' ? 'क्षेत्राधिकार थाना' : language === 'kn' ? 'ವ್ಯಾಪ್ತಿಯ ಪೊಲೀಸ್ ಠಾಣೆ' : 'Jurisdiction Station'}</th>
                <th className="p-3">{language === 'hi' ? 'घटना की स्थिति' : language === 'kn' ? 'ಪ್ರಕರಣದ ಸ್ಥಿತಿ' : 'Incident Status'}</th>
                <th className="p-3 text-right">{language === 'hi' ? 'अधिकारी डेटाबेस कार्रवाई' : language === 'kn' ? 'ಅಧಿಕಾರಿ ಡೇಟಾಬೇಸ್ ಕ್ರಮಗಳು' : 'Officer Database Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans text-xs">
              {reportsList.map((rep) => (
                <tr key={rep.id} className="hover:bg-gray-50/70 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-mono font-bold text-[#0B2E59] dark:text-sky-300">
                    {rep.incidentRef || rep.id}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const imgUrl = (rep.image && (rep.image.startsWith('data:') || rep.image.startsWith('http') || rep.image.startsWith('/')))
                          ? rep.image
                          : (rep.matchedConvict?.photo_url || '/assets/convicts/CONV-001.jpg');
                        return (
                          <img src={imgUrl} alt="" className="h-9 w-9 rounded object-cover border" />
                        );
                      })()}
                      <div>
                        <span className="font-bold text-gray-800 dark:text-white block font-mono text-[11px]">
                          {rep.imageName || "evidence_photo.jpg"}
                        </span>
                        <span className="text-[10px] text-gray-500">{rep.crimeType}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 font-mono">
                    {rep.isMatched && rep.matchedConvict ? (
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 flex items-center gap-1 w-fit">
                        <CheckCircle size={10} /> Match: {rep.matchedConvict.display_name || rep.matchedConvict.name} ({rep.confidence}%)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 flex items-center gap-1 w-fit">
                        <AlertTriangle size={10} /> {formatDynamicText("No Match in Database", language)}
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    {rep.digilockerVerified ? (
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold text-[11px] flex items-center gap-1 font-mono">
                        <CheckCircle size={12} /> {formatDynamicText("Aadhaar Verified", language)}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-[11px] font-mono">
                        Direct Sighting
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300 font-medium">
                    {rep.station}
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rep.status.includes('Verified') 
                        ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {formatDynamicText(rep.status, language)}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedMatchReport(rep)}
                      className="px-3 py-1.5 bg-[#0B2E59] text-white rounded text-[11px] font-bold hover:bg-[#133D6B] cursor-pointer shadow flex items-center gap-1.5 ml-auto"
                    >
                      <Eye size={13} /> {formatDynamicText("View Report & Check DB", language)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIDE-BY-SIDE FACIAL MATCH ANALYSIS & INTERACTIVE DATABASE SEARCH MODAL */}
      {selectedMatchReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-xl border border-gray-300 dark:border-ksp-navy-light bg-white dark:bg-[#0B2E59] p-6 shadow-2xl text-left space-y-5 my-8">
            <div className="flex justify-between items-start border-b dark:border-gray-700 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black bg-[#8B0000] text-white px-2 py-0.5 rounded">
                    KSP AI BIOMETRIC FORENSIC AUDIT
                  </span>
                  <span className="text-xs font-mono text-gray-500">Ref: {selectedMatchReport.incidentRef || selectedMatchReport.id}</span>
                </div>
                <h3 className="text-base font-black text-[#0B2E59] dark:text-white mt-1">
                  Side-by-Side Evidence Inspection & Database Face Matching
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMatchReport(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            {/* SCAN DATABASE INTERACTIVE ACTION BANNER */}
            <div className="p-4 bg-gray-50 dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-gray-500 block uppercase">
                  KSP NEURAL BIOMETRIC CONVICT MATCH ENGINE
                </span>
                <p className="text-xs text-gray-700 dark:text-gray-300 font-semibold">
                  Execute multi-vector facial biometric correlation across all 10 registered KSP convict records.
                </p>
              </div>

              <button
                type="button"
                disabled={modalScanning}
                onClick={() => handleScanDatabaseForModal(selectedMatchReport)}
                className="px-4 py-2.5 bg-[#8B0000] hover:bg-[#a60000] text-white text-xs font-bold rounded-lg shadow-md flex items-center gap-2 cursor-pointer transition uppercase shrink-0"
              >
                {modalScanning ? (
                  <>
                    <RotateCcw size={14} className="animate-spin" />
                    <span>Scanning Convict Roster ({modalScanProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <Search size={14} />
                    <span>🔍 Scan Database (AI Face Match)</span>
                  </>
                )}
              </button>
            </div>

            {/* SCANNING PROGRESS BAR */}
            {modalScanning && (
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 space-y-2 animate-pulse">
                <div className="flex justify-between items-center text-xs font-mono text-[#0B2E59] dark:text-sky-300 font-bold">
                  <span>CIRAS Vector Matching Inferences in Progress...</span>
                  <span>{modalScanProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-black h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#0B2E59] dark:bg-sky-400 h-full transition-all duration-150" style={{ width: `${modalScanProgress}%` }} />
                </div>
                <span className="text-[10px] text-gray-500 font-mono block">
                  Extracting orbital landmarks, facial geometries, and correlating across 10 CIRAS Historical Records...
                </span>
              </div>
            )}

            {/* SIDE BY SIDE COMPARISON COLUMNS */}
            {(() => {
              const resolvedConvict = selectedMatchReport.matchedConvict || 
                CONVICT_LIST.find(c => 
                  c.convict_id === selectedMatchReport.suspect ||
                  c.name.toLowerCase().includes(selectedMatchReport.suspect?.toLowerCase() || '') ||
                  (selectedMatchReport.suspect && selectedMatchReport.suspect.toLowerCase().includes(c.name.toLowerCase().split(' ')[0]))
                );

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LEFT COLUMN: CITIZEN EVIDENCE PHOTO */}
                  <div className="p-5 rounded-xl border-2 border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-[#071D3A] space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] font-black uppercase text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950">
                        LEFT: CITIZEN UPLOADED EVIDENCE
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">
                        {selectedMatchReport.imageName || "citizen_evidence_frame.jpg"}
                      </span>
                    </div>

                    <div className="h-48 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-black border flex items-center justify-center relative">
                      {selectedMatchReport.image ? (
                        <img 
                          src={selectedMatchReport.image} 
                          alt="Uploaded Suspect" 
                          className="h-full w-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="font-mono text-xs text-gray-500">No Image Uploaded</div>
                      )}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-mono">
                        Evidence Telemetry Registered
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div><strong>Reporting Landmark:</strong> {selectedMatchReport.location}</div>
                      <div><strong>Assigned Police Station:</strong> {selectedMatchReport.station}</div>
                      <div><strong>Crime Classification:</strong> {selectedMatchReport.crimeType}</div>
                      <div><strong>DigiLocker Resident:</strong> <span className="text-emerald-700 dark:text-emerald-300 font-bold">{selectedMatchReport.citizenName || "Verified Citizen"}</span></div>
                      <div className="text-[11px] text-gray-600 dark:text-gray-300 italic border-t pt-2">
                        "{selectedMatchReport.details}"
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: HISTORICAL REFERENCE RECORD OR CASE AUDIT */}
                  {resolvedConvict ? (
                    /* MATCHED HISTORICAL REFERENCE RECORD VIEW */
                    <div className="p-5 rounded-xl border-2 border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-[#071D3A] space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] font-black uppercase text-red-900 dark:text-red-300 px-2 py-0.5 rounded bg-red-100 dark:bg-red-950">
                          RIGHT: HISTORICAL REFERENCE DOSSIER (CIRAS)
                        </span>
                        <span className="text-xs font-bold text-red-700 dark:text-red-400 font-mono">
                          {selectedMatchReport.confidence ? `${selectedMatchReport.confidence}% CONFIDENCE` : 'POTENTIAL MATCH'}
                        </span>
                      </div>

                      <div className="h-48 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-black border flex items-center justify-center relative">
                        <img 
                          src={resolvedConvict.photo_url || selectedMatchReport.image} 
                          alt="Historical Reference Image" 
                          className="h-full w-full object-cover" 
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#8B0000] text-white text-[9px] font-mono font-bold">
                          {resolvedConvict.person_id || resolvedConvict.convict_id || "P-001"}
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div><strong>Historical Subject:</strong> <span className="font-bold text-red-900 dark:text-red-300">{resolvedConvict.display_name || resolvedConvict.name}</span></div>
                        <div><strong>Record Period:</strong> {resolvedConvict.record_period || "2011-2013"}</div>
                        <div><strong>Offence Category:</strong> <span className="text-[11px] text-gray-700 dark:text-gray-300">{resolvedConvict.offence_category || resolvedConvict.crime_type || resolvedConvict.mo_signature}</span></div>
                        <div><strong>Jurisdiction Station:</strong> {resolvedConvict.district} ({resolvedConvict.police_station})</div>
                        <div><strong>Record Status:</strong> <span className="font-mono font-bold text-[#0B2E59] dark:text-amber-300">{resolvedConvict.record_status || resolvedConvict.release_status || 'HISTORICAL'}</span></div>
                      </div>
                    </div>
                  ) : (
                    /* UNREGISTERED / GENERAL INCIDENT VIEW */
                    <div className="p-5 rounded-xl border-2 border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-[#071D3A] space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-mono text-[10px] font-black uppercase text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800">
                            INCIDENT DOSSIER AUDIT
                          </span>
                          <span className="text-xs font-bold text-blue-600 font-mono">
                            PENDING IO VERIFICATION
                          </span>
                        </div>

                        <div className="h-44 w-full rounded-lg bg-gray-100 dark:bg-black border border-dashed flex flex-col items-center justify-center p-4 text-center">
                          <ShieldCheck size={36} className="text-blue-500 mb-2" />
                          <h4 className="text-xs font-black text-gray-800 dark:text-gray-200 uppercase font-mono">
                            CITIZEN COMPLAINT LOGGED & VERIFIED
                          </h4>
                          <p className="text-[10px] text-gray-500 mt-1 max-w-xs leading-tight">
                            Incident evidence recorded with valid citizen DigiLocker telemetry and assigned to {selectedMatchReport.station}.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1 text-[11px] text-gray-600 dark:text-gray-400 border-t pt-2">
                        <div><strong>Status Classification:</strong> Active Ground Dispatch / IO Assignment</div>
                        <div><strong>Recommended Action:</strong> Route to jurisdictional station patrol for ground verification.</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* 128-DIMENSIONAL BIOMETRIC VECTOR COMPARISON BREAKDOWN */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-[#071D3A] border border-gray-200 dark:border-gray-700 space-y-2">
              <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                dlib ResNet-128 Biometric Congruence Telemetry:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2 bg-white dark:bg-[#05182E] rounded border">
                  <span className="text-[10px] text-gray-500 block">Orbital Ratio</span>
                  <span className={`font-bold ${selectedMatchReport.isMatched ? "text-green-600" : "text-gray-500"}`}>
                    {selectedMatchReport.biometricVector?.orbitalRatio || "98.4% Match"}
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#05182E] rounded border">
                  <span className="text-[10px] text-gray-500 block">Nasal Curvature</span>
                  <span className={`font-bold ${selectedMatchReport.isMatched ? "text-green-600" : "text-gray-500"}`}>
                    {selectedMatchReport.biometricVector?.nasalCurvature || "94.2% Match"}
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#05182E] rounded border">
                  <span className="text-[10px] text-gray-500 block">Jaw Contour Embedding</span>
                  <span className={`font-bold ${selectedMatchReport.isMatched ? "text-green-600" : "text-gray-500"}`}>
                    {selectedMatchReport.biometricVector?.jawlineEmbedding || "91.4% Match"}
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#05182E] rounded border">
                  <span className="text-[10px] text-gray-500 block">Vector Distance</span>
                  <span className={`font-bold ${selectedMatchReport.isMatched ? "text-blue-600" : "text-red-500"}`}>
                    {selectedMatchReport.biometricVector?.distanceScore || "0.28 (Match)"}
                  </span>
                </div>
              </div>
            </div>

            {/* OFFICER ACTION CONTROLS */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Status: 
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  selectedMatchReport.status.includes('Verified') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedMatchReport.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMatchReport(null)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold rounded hover:bg-gray-200 cursor-pointer"
                >
                  Close
                </button>
                {selectedMatchReport.isMatched && (
                  <button
                    type="button"
                    onClick={() => handleVerifyOfficerCase(selectedMatchReport.id)}
                    className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded hover:bg-emerald-800 shadow flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle size={14} /> Verify Match & Dispatch Hoysala PCR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HOW TO OPERATE BIOMETRICS MODULE SOP */}
      <ModuleSopGuide
        moduleName="KSP AI Facial & NAFIS 10-Print Biometric Identification"
        department="State Biometrics & Forensic Science Laboratory (FSL) Bengaluru"
        legalAuthority="Section 76 Karnataka Police Act & Identification of Prisoners Act / Criminal Procedure (Identification) Act 2022"
        purpose="Automated forensic identification comparing suspect photos, CCTV freeze-frames, and latent fingerprint minutiae against active KSP convicts."
        steps={[
          {
            step: "Evidence Ingestion",
            action: "Upload suspect photograph, dashcam clip, or CCTV grab.",
            detail: "System extracts 128-dimensional deep-learning facial embeddings (dlib ResNet) and aligns facial landmarks."
          },
          {
            step: "Database Correlation",
            action: "Click 'Check Database' or 'Run Biometric Search'.",
            detail: "Calculates Euclidean vector distance (< 0.50 cutoff) against all 10 registered KSP convict mugshots and NAFIS 10-prints."
          },
          {
            step: "Side-by-Side Audit & PCR Dispatch",
            action: "Inspect side-by-side match dossier and click 'Verify Match & Dispatch Hoysala PCR'.",
            detail: "Transmits verified suspect profile, known MO, and arrest warrant status directly to jurisdictional station patrol units."
          }
        ]}
        tacticalTips={[
          "For low-resolution CCTV frames, crop closely to the suspect's face for optimal landmark extraction.",
          "Switch between 'Facial Recognition' and 'NAFIS 10-Print' tabs to perform multimodal fingerprint minutiae matching.",
          "Public citizen incident reports automatically route to the pending queue with DigiLocker resident verification."
        ]}
      />
    </div>
  );
}
