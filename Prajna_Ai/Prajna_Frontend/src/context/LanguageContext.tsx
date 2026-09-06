import React, { createContext, useContext, useState } from 'react';

export const translations = {
  "en": {
    "karnatakaStatePolice": "KARNATAKA STATE POLICE",
    "platformName": "Prajna-AI",
    "restrictedAccess": "RESTRICTED POLICE DATABASE GATEWAY",
    "livealerts": "NOTIFICATIONS & INTELLIGENCE ALERTS",
    "live": "LIVE ●",
    "logout": "LOGOUT SECURE SESSION",
    "rankinfo": "Station Rank",
    "dashboard": "Dashboard",
    "aiAssistant": "AI Assistant",
    "criminalNetworks": "Criminal Networks",
    "hotspotIntel": "Hotspot Intel",
    "predictiveInsights": "Predictive Insights",
    "offenderProfiling": "Offender Profiling",
    "faceSearch": "Face Search",
    "financialAnalysis": "Financial Analysis",
    "reportsAudit": "Reports & Audit",
    "userManagement": "User Management",
    "settings": "Settings",
    "collapseMenu": "COLLAPSE MENU",
    "totalCaseFiles": "Total Case Files (NoSQL)",
    "activeInvestigations": "Active Investigations",
    "criticalHotspots": "Critical Hotspots",
    "knownOffendersProfiled": "Known Offenders Profiled",
    "repeatAccused": "Repeat Accused (Risk Flag)",
    "catalystHostSync": "Catalyst Host Sync",
    "welcomeHeader": "PRAJNA-AI CRIME INTEL PORTAL",
    "welcomeSubtitle": "Intelligent conversational engine and predictive risk platform mapping CCTNS crime records. Query case history, construct criminal association graphs, and access early-warning forecasts.",
    "askAi": "ASK AI ASSISTANT",
    "viewAssociations": "VIEW ASSOCIATIONS",
    "coreCapabilitiesGateway": "CORE CAPABILITY GATEWAY (12 PROPOSED SOLUTIONS)",
    "coreCapabilitiesGatewayDesc": "Quick-access console for all 12 official CIRAS capabilities mapped to the KSP Datathon requirements.",
    "f1Title": "Conversational Crime Intelligence",
    "f1Desc": "NLP chatbot querying 1000 FIR records with context-aware English & Kannada inputs.",
    "f2Title": "Criminal Network Analysis",
    "f2Desc": "Interactive Cytoscape relationship graphs linking suspect, victim, location, and account nodes.",
    "f3Title": "Crime Pattern & Trend Analytics",
    "f3Desc": "Interactive time-series charts, district-wise comparisons, and seasonal pattern analysis.",
    "f4Title": "Sociological Crime Insights",
    "f4Desc": "Demographic overlays correlating crime concentrations with urbanization and socio-economic stress.",
    "f5Title": "Criminology-Based Offender Profiling",
    "f5Desc": "Comprehensive criminal dossier timeline visualizer mapping Modus Operandi signatures.",
    "f6Title": "Recidivism Probability Engine",
    "f6Desc": "Predictive modeling calculating reoffending probability, crime type, timeline, and hot zones.",
    "f7Title": "Investigator Decision Support",
    "f7Desc": "Automated Claude-generated case brief summaries and proactive investigative lead suggestions.",
    "f8Title": "AI Face Search & Suspect Identification",
    "f8Desc": "KSP Neural Biometrics age-invariant geometry matching and secure citizen threat watchlists.",
    "f9Title": "Financial Crime & Link Analysis",
    "f9Desc": "Money trail visualization detecting transaction structuring below the ₹50,000 threshold.",
    "f10Title": "Crime Forecasting & Early Warning",
    "f10Desc": "Rule-based early-warning alerts and statistical resource deployment recommendations.",
    "f11Title": "Explainable AI & Transparent Analytics",
    "f11Desc": "Verifiable source citations for all conversational outputs with signed audit event validation.",
    "f12Title": "Secure Role-Based Access & Governance",
    "f12Desc": "Five-tier RBAC permissions with immutable cryptographically-locked database audit logs.",
    "recentEntries": "RECENT CCTNS CASE FILE ENTRIES",
    "queryFullRoster": "Query Full Roster →",
    "firNumber": "FIR Number",
    "crimeCategory": "Crime Category",
    "jurisdictionStation": "Jurisdiction Station",
    "registrationDate": "Registration Date",
    "ioAssigned": "IO assigned",
    "caseStatus": "Case Status",
    "chatbotTitle": "CONVERSATIONAL CRIME ASSISTANT",
    "chatbotSubtitle": "Natural language interface mapping FIRs stored on KSP database.",
    "sessionIntel": "SESSION INTELLIGENCE",
    "sessionId": "Session ID",
    "serverLatency": "Server Latency",
    "model": "Model",
    "helpfulTips": "HELPFUL COMMAND TIPS",
    "tip1": "Type FIR 0012/2026 to get instant case briefs.",
    "tip2": "Ask for Raju K. to fetch criminal profiling dossier.",
    "tip3": "Search Theft cases in Mysuru to generate regional graphs.",
    "crimeChatbot": "Crime intelligence chatbot",
    "authorizedNotice": "Authorized Karnataka Police Department's departmental AI assistant. All queries are logged and monitored for security compliance.",
    "searching": "PRAJNA-AI SEARCHING FIR DATABASE...",
    "clear": "Clear",
    "export": "Export PDF",
    "secureChannel": "Secure Channel • Connected to Catalyst QuickML",
    "reportsTitle": "Reports & Security Audit Terminal",
    "reportsDesc": "Monitor the immutable KSP query audit trail, check Zoho Catalyst serverless infrastructure health, and compile executive crime reports.",
    "auditLocked": "Audit Registry Locked (Immutable)",
    "secureAuditLogs": "Secure Audit Logs",
    "catalystCloudStatus": "Catalyst Cloud Status",
    "executiveReportGenerator": "Executive Report Generator",
    "tamperProofLockActive": "⚠ Tamper-Proof Cryptographic Lock Active",
    "tamperProofDesc": "In compliance with CCTNS audit directives, every user event (login, query, export, face scan) is cryptographically signed and logged. These logs are immutable and stored in isolated security zones inside Zoho Catalyst Datastore.",
    "immutableSecurityAuditLogs": "IMMUTABLE SECURITY AUDIT LOGS",
    "tamperProofRecord": "TAMPER-PROOF RECORD",
    "actionFilter": "Action:",
    "allActions": "All Actions",
    "timestamp": "Timestamp",
    "user": "User",
    "role": "Role",
    "action": "Action",
    "details": "Details",
    "ipAddress": "IP Address",
    "latency": "Latency",
    "showingPage": "Showing Page",
    "of": "of",
    "totalEntries": "total entries",
    "previous": "PREVIOUS",
    "next": "NEXT",
    "zohoCatalystLiveDeploymentStatus": "ZOHO CATALYST LIVE DEPLOYMENT STATUS",
    "platform": "Platform",
    "projectId": "Project ID",
    "refreshing": "REFRESHING...",
    "syncServices": "SYNC SERVICES",
    "databaseIndexHighlight": "📊 DATABASE INDEX: 1,000 FIR RECORDS INDEXED IN NOSQL STORE",
    "latestIndex": "LATEST INDEX: 15 JUNE 2026",
    "responseLatency": "Response latency:",
    "recordCapacity": "Record Capacity:",
    "units": "units",
    "checked": "Checked:",
    "configureReport": "Configure Crime Analytics PDF Report (SmartBrowz integration)",
    "reportClass": "Report Class",
    "classInvestigation": "State Crime Summary & Investigation Analytics",
    "classTrends": "District-wise Crime Trend Analytics",
    "classOffenders": "Accused & Repeat Offender Recidivism Risk Directory",
    "classAudit": "System Access Audit Trail Export",
    "temporalScope": "Temporal Scope",
    "scope30days": "Last 30 Days (Standard Audit)",
    "scope90days": "Last Quarter (Q2 2026)",
    "scope1year": "Last 12 Months (Comprehensive)",
    "scopeCustom": "Custom Date Range (All Time)",
    "districtJurisdiction": "District Jurisdiction",
    "distAll": "All Karnataka Districts (SCRB Aggregated)",
    "distBlr": "Bengaluru City (Urban)",
    "distMys": "Mysuru City",
    "distMng": "Mangaluru City",
    "distHbl": "Hubballi-Dharwad",
    "maskPii": "Mask Citizen PII / Aadhar Hashes (Direct compliance safeguard)",
    "autoSign": "Automatically sign generated PDF with current Officer ID",
    "compileReport": "Compile Executive PDF Report",
    "generating": "Generating Document",
    "resetParams": "Reset Parameters",
    "zohoSmartBrowz": "Zoho SmartBrowz PDF Compiler",
    "serverlessEngine": "Serverless Compile Engine",
    "serverlessEngineDesc": "Report compiling is offloaded to Zoho Catalyst serverless micro-services via SmartBrowz. Pre-populated templates render high-fidelity vectors and charts directly into signed A4 PDF reports.",
    "compilingAssets": "Compiling assets...",
    "pdfSuccess": "PDF Compiled Successfully",
    "pdfSuccessDesc": "Report has been signed with security hash and downloaded to your workstation. ID: ",
    "offenderProfilingTitle": "Criminology-Based Offender Profiling",
    "offenderProfilingDesc": "Analyze known repeat offenders, modus operandi signatures, and algorithmically projected recidivism risk metrics.",
    "dbSyncActive": "KSP Database Sync Active",
    "filtersParameters": "Filters & Parameters",
    "searchPlaceholder": "Search by Name, Alias, MO or ID...",
    "riskTier": "Risk Tier",
    "district": "District",
    "allRiskTiers": "All Risk Tiers",
    "highRisk": "High Risk",
    "mediumRisk": "Medium Risk",
    "lowRisk": "Low Risk",
    "allDistricts": "All Districts",
    "showRepeatOnly": "Show Repeat Offenders Only (isRepeatOffender = true)",
    "matchingOffenders": "MATCHING OFFENDERS",
    "noOffendersMatch": "No offenders match the specified filter criteria.",
    "cases": "CASES",
    "selectOffenderInstructions": "Select an offender from the sidebar to view full criminological profile.",
    "aliases": "Aliases:",
    "none": "None",
    "yrs": "Yrs",
    "moSignature": "Modus Operandi Signature",
    "biometricLinkStatus": "Biometric Link Status",
    "aadharHashVerified": "Aadhar Hash Verified",
    "lastKnownActivity": "Last Known Activity",
    "addressesRegistered": "Addresses registered",
    "recidivismWarningEngine": "Recidivism Probability & Warning Engine (QuickML Model)",
    "catalystQuickMlLive": "CATALYST QUICKML LIVE",
    "riskScore": "Risk Score",
    "criticalRiskTier": "CRITICAL RISK TIER",
    "mediumWarningTier": "MEDIUM WARNING TIER",
    "lowAttentionTier": "LOW ATTENTION TIER",
    "predictedCrimeType": "Predicted Crime Type",
    "predictedZone": "High Probability Zone",
    "timelineProjection": "Timeline Projection",
    "highProbabilityZone": "High Probability Zone",
    "modelLastUpdated": "Model Last Updated",
    "identifiedRiskFactors": "Identified Risk Trigger Factors",
    "recidivismTimelineTargets": "Recidivism Timeline & Targets",
    "modelTransparencyDisclosure": "Algorithm Model transparency disclosure:",
    "modelTransparencyText": "Recidivism probability scores are processed using machine learning regression models running multi-factor intersection weights. These mathematical projections are designed purely for law enforcement deployment resource optimization and must not be used as primary judicial evidence.",
    "noPredictiveMetrics": "No advanced predictive recidivism metrics available for this suspect ID.",
    "criminalCaseTimeline": "Criminal Case Timeline",
    "noActiveCaseAssociations": "No active case associations catalogued in the system.",
    "linkedToCrimeEvent": "Linked to crime event as co-accused / prime suspect.",
    "firLink": "FIR LINK",
    "coOffenderDirectory": "Co-Offender & Associate Directory",
    "noCoOffenderLinks": "No known co-offender links registered in this database.",
    "associate": "ASSOCIATE",
    "viewProfile": "View Profile",
    "hotspotsTitle": "CRIME HOTSPOT INTELLIGENCE — KARNATAKA MAP",
    "hotspotsDesc": "District and Taluk-level crime density map. Interactive circle markers scale by incident volume and severity.",
    "risingCrimeTrends": "Rising Crime Trends",
    "totalHotspotsMonitored": "Total Hotspots Monitored",
    "regions": "Regions",
    "beats": "Beats",
    "points": "points",
    "networkTitle": "CRIMINAL NETWORK & ASSOCIATION ANALYSIS",
    "networkDesc": "Discover hidden linkages between suspect, victim, vehicle, phone numbers, and bank account structuring nodes.",
    "intelDossier": "INTELLIGENCE DOSSIER",
    "nodeLabel": "Node Label",
    "typeClassification": "Type / Classification",
    "riskAssessmentTier": "Risk Assessment Tier",
    "metadataProperties": "METADATA PROPERTIES",
    "generateOffenderDossier": "GENERATE OFFENDER DOSSIER",
    "clickNodePrompt": "Click a node inside the network map to populate dossier metadata",
    "legendSuspectHigh": "Suspect (High)",
    "legendSuspectMed": "Suspect (Med)",
    "legendVictim": "Victim",
    "legendLocation": "Location",
    "legendVehicle": "Vehicle",
    "legendPhone": "Phone",
    "legendAccount": "Account",
    "legendCase": "Case",
    "predictiveTitle": "PREDICTIVE INSIGHTS & RECIDIVISM FORECASTS",
    "predictiveDesc": "AI risk modeling (AutoML / KSP CIRAS RAG) analyzing repeat offending probability and regional crime trends.",
    "crimeSpikeForecast": "CRIME SPIKE FORECAST",
    "gangTracker": "ORGANIZED GANG TRACKER",
    "resourceRecommendations": "RESOURCE DEPLOYMENT RECS",
    "recidivismRoster": "HIGH-RISK RECIDIVISM ROSTER",
    "accusedOffender": "Accused Offender",
    "predictedCrime": "Predicted Crime",
    "targetZone": "Target Zone",
    "triggerFactorsReasoning": "AI Trigger Factors / Reasoning",
    "demographicsAge": "Demographic Breakdown: Age of Accused",
    "demographicsGender": "Demographic Breakdown: Gender Ratio",
    "faceSearchTitle": "AI Face Search & Suspect Identification",
    "faceSearchDesc": "Utilize KSP SCRB Facial Recognition to scan, match, and log suspicious biometric facial profiles.",
    "biometricProtocol": "Biometric Identification Protocol & Safeguards",
    "biometricMatchingTerminal": "Biometric Matching Terminal",
    "recentCognitiveAudits": "RECENT COGNITIVE SEARCH AUDITS",
    "secureAccessLog": "SECURE ACCESS LOG",
    "financialTitle": "Financial Crime & Transaction Link Analysis",
    "financialDesc": "Track suspicious account structuring (below ₹50,000 reporting threshold), mule account transfers, and narcotics layering networks.",
    "totalLoggedVolume": "Total Logged Volume",
    "suspiciousLayering": "Suspicious Layering",
    "structuringAlerts": "Structuring Alerts",
    "activeFiuQueries": "Active FIU Queries",
    "transactionAuditLedger": "Transaction Audit Ledger",
    "moneyTrailTitle": "Money Trail Link Visualizer",
    "sourceAccount": "Source Account",
    "destinationAccount": "Destination Account",
    "linkedOffenderProfile": "Linked Offender Profile",
    "settingsTitle": "System Settings & Controls",
    "settingsDesc": "Configure system preferences, view authenticated profile context, switch authorization roles, and inspect active security controls.",
    "authenticatedProfile": "Authenticated Officer Profile",
    "officerName": "Officer Name",
    "psIdentifier": "PS Identifier (PS ID)",
    "rankDesignation": "Rank / Designation",
    "authorizedRole": "Current Authorized Role",
    "homeDistrict": "Home District",
    "attachedPs": "Attached Police Station",
    "accessibilityPrefs": "Accessibility Preferences",
    "fontScale": "Interface Font Scale",
    "activeBadges": "Active Gateways & Security Badges",
    "deploymentInfo": "Catalyst Core Deployment Info",
    "userManagementTitle": "User Management & Credentials",
    "userManagementDesc": "Manage authorized police profiles, assign roles, reset security keys, and lock/unlock officer access.",
    "accessRestrictedSupervisor": "ACCESS RESTRICTED — LEVEL 4 AUTHORITY REQUIRED",
    "registerNewOfficer": "Register New Officer",
    "authorizedOperatorsDirectory": "AUTHORIZED SYSTEM OPERATORS DIRECTORY",
    "securityRole": "Security Role",
    "actions": "Actions",
    "revokeAccess": "Revoke Access",
    "restoreAccess": "Restore Access",
    "biometricEnrollment": "Biometric Enrollment",
    "lastActiveLogin": "Last Active Login",
    "activeStatus": "Active",
    "lockedStatus": "Locked",
    "f13Title": "Operational Deployment & Risk Simulation",
    "f13Desc": "Digital-twin area & event coverage planning with hypothetical risk forecasting and plan comparison.",
    "rtccTitle": "Real-Time Crime Center (RTCC)",
    "rtccDesc": "Live tactical command wall, real-time ANPR scanner, PTZ camera switcher, Hoysala fleet tracker, and dynamic intercept cordon.",
    "operationalSimulationTitle": "Operational Deployment & Risk Simulation Sandbox",
    "operationalSimulationDesc": "Simulate crowd density, environmental conditions, and resource placement for hypothetical area/event coverage planning.",
    "simulationBadge": "Simulated / Demo Data — Not Operational Intelligence.",
    "simulationParameters": "Simulation Parameters & Factors",
    "personnelCount": "Personnel / Units Deployed",
    "crowdDensity": "Crowd Density",
    "densityLow": "Low Density",
    "densityModerate": "Moderate",
    "densityHigh": "High Density",
    "densityPeak": "Peak (Festival / Mela)",
    "envCondition": "Environmental Condition",
    "envClear": "Clear Weather",
    "envRain": "Heavy Rain / Monsoon",
    "envLowVisibility": "Low Visibility / Fog",
    "envFestivalOverlap": "Festival Crowd Overlap",
    "deploymentPosture": "Deployment Posture",
    "postureVisiblePerimeter": "Visible Perimeter Guard",
    "postureDistributedPatrol": "Distributed Mobile Patrol",
    "postureCheckpointFocused": "Checkpoint-Focused Ingress",
    "coverageRiskIndex": "Coverage Risk Index",
    "estResponseTime": "Est. Response Time",
    "vulnerabilityAlerts": "Vulnerability & Coverage Gap Flags",
    "planComparisonTitle": "Comparative Coverage Analysis (Plan A vs Plan B)",
    "planAName": "Plan A (Baseline Deployment)",
    "planBName": "Plan B (Contingency / Elevated)",
    "comparePlans": "Compare Deployment Plans",
    "comparativeTakeaway": "Comparative Analysis Takeaway",
    "coverageScore": "Coverage Integrity Score",
    "zoneCoverageMap": "Digital Twin Coverage Zone Map",
    "accessPointsLabel": "Perimeter Access Points & Checkpoints",
    "activeUnitsLabel": "Active Deployed Units",
    "riskReadout": "Computed Risk Readout",
    "unitPaletteTitle": "Tactical Unit Palette (Drag & Drop)",
    "unitPaletteDesc": "Drag units into the coverage zone to assign sectors. Drag placed units to reposition, or drag off map to remove.",
    "personnelBudgetMeter": "Personnel Strength Budget",
    "budgetUsed": "Budget Used",
    "budgetRemaining": "Budget Remaining",
    "patrolTeam": "Patrol Team",
    "checkpointPost": "Checkpoint Post",
    "mobileResponse": "Mobile Response Vehicle",
    "overwatchPost": "Overwatch Post",
    "dragHint": "Drag onto map to deploy",
    "repositionHint": "Drag placed units to reposition • Drag off map to remove",
    "clearAllUnits": "Clear All Units",
    "resetDefaultLayout": "Reset Layout",
    "coveredStatus": "Covered & Secured",
    "uncoveredStatus": "Exposed Corridor",
    "unitCost": "Cost",
    "unitRadius": "Radius",
    "digiLockerGateTitle": "DigiLocker Identity Verification Gate",
    "digiLockerGateDesc": "Verify your resident credentials via DigiLocker to file emergency priority reports.",
    "verifyWithDigiLocker": "Authenticate via DigiLocker",
    "verifiedCitizen": "DigiLocker Resident Verified",
    "skipDigiLocker": "Proceed Without Verification (Standard Queue)",
    "uploadMediaEvidence": "Upload Photographic / Video Evidence",
    "mediaUploadHint": "Optional JPG, PNG, MP4 up to 25MB",
    "incidentReportDetails": "Citizen Incident Sighting & Dispatch Dossier",
    "autoMatchedSuspects": "AI Auto-Matched Suspect Leads (Face Similarity)",
    "redirectDepartment": "Route to Jurisdictional Station / Department",
    "crimeTrendTimeSeries": "Crime Trend Time-Series (2026 Monthly Incidents)",
    "scrbAggregate": "SCRB AGGREGATE",
    "activeWatchlist": "Active Repeat Offenders Watchlist",
    "viewAllDossiers": "View All Dossiers →",
    "offenderId": "Offender ID",
    "fullName": "Full Name",
    "linkedCases": "Linked Cases",
    "crimeType": "Crime Type",
    "risk": "Risk",
    "high": "High",
    "medium": "Medium",
    "low": "Low",
    "aiAlerts": "AI Alerts",
    "topHotspots": "Top Hotspot Districts",
    "alert1Title": "Spike in burglary cases — Whitefield zone",
    "alert1Sub": "Bengaluru East | 2 hrs ago",
    "alert2Title": "Repeat offender pattern detected across 3 cases",
    "alert2Sub": "Mysuru District | 5 hrs ago",
    "alert3Title": "Cybercrime cluster forming near tech corridor",
    "alert3Sub": "Bengaluru Urban | 9 hrs ago",
    "alert4Title": "Seasonal rise predicted — chain snatching, festival period",
    "alert4Sub": "Statewide | 1 day ago",
    "alert5Title": "Routine model retraining completed successfully",
    "alert5Sub": "System | 1 day ago",
    "monthJan": "JAN",
    "monthFeb": "FEB",
    "monthMar": "MAR",
    "monthApr": "APR",
    "monthMay": "MAY",
    "monthJun": "JUN",
    "monthJul": "JUL",
    "monthAug": "AUG",
    "monthSep": "SEP",
    "monthOct": "OCT",
    "monthNov": "NOV",
    "monthDec": "DEC",
    "theftRobbery": "Theft / Robbery",
    "burglary": "Burglary",
    "vehicleTheft": "Vehicle Theft",
    "cybercrime": "Cybercrime",
    "assault": "Assault",
    "otherCrime": "Other",
    "theftBurglary": "Theft / Burglary",
    "cyberFraud": "Cyber Fraud",
    "assaultViolence": "Assault / Violence",
    "urgentSightingAlert": "Urgent Sighting Alert for Your Station",
    "sightingNotice": "A citizen recently reported a sighting matching an active suspect in your jurisdiction. Review photo & evidence payload.",
    "openDispatchPortal": "Open Dispatch Portal",
    "scrbBanner": "State Crime Records Bureau",
    "startInvestigation": "Start Investigation",
    "liveCitizenFeed": "Live Citizen Emergency Incident Feed",
    "stationAlerts": "STATION ALERTS",
    "noActiveReports": "No active citizen incident reports today.",
    "location": "Location",
    "status": "Status",
    "incidentDescription": "Incident Description:",
    "suspectMatchDetected": "Suspect Match Detected:",
    "viewFullReport": "View Full Report & Suspect Match",
    "dispatchPatrol": "DISPATCH PATROL",
    "patrolDispatched": "PATROL DISPATCHED",
    "thirteenCapabilities": "13 CAPABILITIES",
    "coreSolutions": "Core Crime Intelligence Solutions (11 Capabilities)",
    "governanceModules": "System Transparency & Governance Modules (2 Capabilities)",
    "launch": "LAUNCH",
    "incidentDossier": "Incident Dossier",
    "jurisdictionalStation": "Jurisdictional Station",
    "loggedTime": "Logged Time",
    "currentStatus": "Current Status",
    "citizenNarrative": "Citizen Narrative & Incident Details",
    "attachedEvidence": "Attached Evidence Payload",
    "photo": "PHOTO",
    "citizenEvidenceDesc": "Citizen uploaded evidence file linked to incident reference.",
    "autoMatchResult": "Parallel AI Suspect Auto-Match Result",
    "match": "Match",
    "viewSuspectDossier": "View Suspect Dossier",
    "facialMatchDesc": "Facial geometric match based on uploaded image frame.",
    "coreIntelligence": "Core Intelligence",
    "governanceAndAudit": "Governance & Audit",
    "twelveMonthCrimeTrend": "12-Month Crime Trend (Case Volume)",
    "casesRegistered": "Cases Registered",
    "crimeCategoryDistribution": "Crime Category Distribution",
    "crimeVolumeComparison": "Crime Volume Comparison By District",
    "seasonalCrimeActivity": "Seasonal Crime Activity Overlay (Quarterly)",
    "twoHoursAgo": "2 hrs ago",
    "fiveHoursAgo": "5 hrs ago",
    "nineHoursAgo": "9 hrs ago",
    "oneDayAgo": "1 day ago",
    "fiveMinutesAgo": "5m ago",
    "twelveMinutesAgo": "12m ago",
    "oneHourAgo": "1h ago",
    "openStatus": "Open",
    "underInvestigation": "Under Investigation",
    "chargesheeted": "Chargesheeted",
    "closedStatus": "Closed",
    "rising": "Rising",
    "declining": "Declining",
    "stable": "Stable",
    "loadingTrendAnalytics": "Loading Trend Analytics...",
    "trendsAnalytics": "Trends Analytics",
    "officialCrimeDataSource": "OFFICIAL CRIME DATA SOURCE CITED",
    "aiConfidence": "AI Confidence",
    "audit": "Audit",
    "stopSpeaking": "Stop",
    "speak": "Speak",
    "hideReasoning": "HIDE AI REASONING METADATA",
    "showReasoning": "EXPLAINABLE AI: VIEW REASONING METADATA",
    "reasoningBullet1": "Scanned 1,000 JSON documents in Catalyst NoSQL.",
    "reasoningBullet2": "Filtered vectors using Claude API keyphrase matches.",
    "reasoningBullet3": "Extracted matching records mapping specific modus operandi.",
    "reasoningBullet4": "Citations matched to standard SCRB CCTNS database schemas.",
    "intelligenceCommandSuggestions": "INTELLIGENCE COMMAND SUGGESTIONS",
    "roleInvestigator": "Investigator",
    "roleAnalyst": "Analyst",
    "roleSupervisor": "Supervisor",
    "rolePolicymaker": "Policymaker",
    "roleCitizen": "Citizen",
    "simulationRole": "Simulation Role",
    "pendingPatrolDispatch": "Pending Patrol Dispatch",
    "pendingInvestigation": "Pending Investigation & Dispatch",
    "patrolDispatchedLogged": "Patrol Dispatched & Station Logged",
    "pendingVerification": "Pending Verification",
    "incidentSnatchingDoubleRoad": "Snatching of gold chain by two motorcycle riders. Accused fled towards double road.",
    "incidentBagSnatchingGate": "Citizen reported bag snatching by 2 suspects on black Pulsar motorcycle near entrance gate.",
    "incidentOtpScamBank": "OTP scam transaction reported. Unauthorized debit of ₹45,000 from banking portal.",
    "incidentOtpChallanGateway": "Suspicious OTP harvesting call claiming to be KSP traffic challan gateway.",
    "contactNumber": "Contact",
    "anonymousReport": "Anonymous Report",
    "forecastSpikeBangalore": "Bengaluru Urban — Theft forecasted to spike 40% in the next 30 days based on seasonal wedding and monsoon patterns. Recommend beat patrol enhancements.",
    "forecastGangTracker": "Network-Alpha Gang Activity: 3 members of the HSR theft cohort recently active within Mysuru district. Cross-jurisdiction alert issued to Kuvempunagar PS.",
    "forecastResourceDeployment": "Early Warning recommendation: Deploy additional patrol vehicles near KR Market and commercial complexes between 18:00 and 22:00 hours daily.",
    "genderMale": "Male",
    "genderFemale": "Female",
    "genderOther": "Other",
    "socioEconomicTitle": "Socio-Economic & Sociological Crime Correlations",
    "sociologicalBriefingTitle": "Sociological Analysis Briefing",
    "sociologicalBriefingText": "Correlation analysis mapping CCTNS crime records against taluk census profiles indicates that regions exhibiting high urban migration and unemployment rates show a 2.7x higher concentration of opportunistic property offences.",
    "criminologyActionPolicy": "Criminology Action Policy:",
    "criminologyActionPolicyText": "Prioritize development of local beat networks in areas with high density of commercial liquor outlets and rapid migratory expansion.",
    "selectCaseFile": "Select Case File",
    "caseBriefSummary": "Case Brief Summary",
    "similarCaseFinder": "Similar Case Finder",
    "suggestedLeads": "Suggested Investigative Leads",
    "similarCaseAnalytics": "Similar Case Analytics",
    "quickMlModelActive": "Catalyst QuickML Model Active",
    "moDaytimeHousebreaking": "Daytime housebreaking using duplicate key",
    "moNightHousebreaking": "Night-time housebreaking by levering window grills",
    "moChainSnatching": "Pillion rider on Pulsar bike snatching chain from pedestrian",
    "moPeddlingDrugs": "Peddling synthetic drugs (MDMA) near college campuses",
    "moAtmSkimming": "ATM card skimming at isolated kiosks",
    "moHighwayInterception": "Highway vehicle interception at night",
    "moWhatsappFraud": "Online investment fraud via WhatsApp",
    "moPickpocketing": "Pickpocketing near bus stands during rush hour",
    "moVishingLottery": "Vishing call claiming fake lottery win leading to OTP fraud",
    "moPersonalEnmity": "Personal enmity leading to physical assault with sharp weapon",
    "moStreetBrawl": "Street brawl arising from sudden provocation over parking",
    "moKidnappingOmni": "Kidnapping minor for ransom using Maruti Omni van",
    "moVehicleTheftMasterKey": "Two-wheeler theft using master key from shopping mall parking",
    "moJobPlacementFraud": "Job placement fraud promising government job on cash payment",
    "moDowryHarassment": "Harassment for dowry leading to suspicious death",
    "triggerParappanaJail": "Released 45 days ago from Parappana Agrahara Central Jail",
    "triggerReleased15Days": "Released 15 days ago from judicial custody",
    "triggerTwoAssociates": "Two known criminal associates recently active in same district",
    "triggerMonsoonPattern": "Historical pattern of monsoon & festival season offending",
    "triggerUnemployment": "High unemployment and financial distress in local area",
    "triggerReconnectCoaccused": "Immediate reconnect with previous co-accused offenders",
    "triggerPhoneCallsSuspects": "Active phone contacts with fence suspects and wanted persons",
    "triggerFinancialDistress": "Severe financial distress and unresolved debts with lenders",
    "triggerLockedHouses": "Historical pattern of targeting locked houses during wedding season",
    "triggerAssociatingHighRisk": "Frequently associating with high-risk repeat offenders",
    "triggerUnstableAddress": "Unstable residential address or migrant labor movement",
    "triggerPriorConviction": "Prior convictions for similar crime types and modus operandi",
    "triggerHotspotVisits": "Frequent visits to known crime hotspot areas and markets",
    "triggerVehicleAccess": "Access to registered vehicle commonly used in offenses",
    "triggerMdmaTrafficking": "Prior history of synthetic drug (MDMA) trafficking",
    "triggerHostelSupply": "Active drug supply network near college student hostels",
    "triggerEncryptedApp": "Encrypted messaging app communication spike detected",
    "secureCaseBrief": "Secure Case Brief",
    "investigationOfficer": "Investigation Officer",
    "legalCitation": "Legal Citation",
    "summaryDescription": "Summary Description",
    "moNotes": "Modus Operandi (MO Notes)",
    "severity": "Severity",
    "critical": "Critical",
    "similarCasesMatchIntro": "Attribute matching shows the following cases in the database share similar Modus Operandi and spatial attributes:",
    "noSimilarCases": "No similar crime signatures detected in this district database.",
    "suggestedLeadsIntro": "Based on crime mapping of co-offenders and historical locations for the accused, the system suggests the following priority leads:",
    "leadFinancialPattern": "Cross-reference the financial link pattern with other active accounts registered in this beat.",
    "leadSharedLocation": "Investigate the shared location nodes connected to prime suspect co-offenders.",
    "leadCdrAnalysis": "Verify call details records (CDR) of the suspect within the circle area during the offence time frame.",
    "summaryFirGoldOrnaments": "Complainant reported that gold ornaments worth Rs. 1.5 Lakhs were stolen from her residence during the day. Access was gained using a duplicate key. Suspect Raju K. identified by CCTV analysis.",
    "summaryFirWindowGrills": "Accused levered the kitchen window iron grills of a locked house at night and decamped with cash worth Rs. 3 Lakhs and silver articles. Neighbors reported seeing two individuals.",
    "summaryFirOtpVishing": "The victim received a phone call from an unknown person claiming to be a bank manager. The caller obtained the victim's net banking OTP under the pretext of upgrading their account, leading to an unauthorized transfer of Rs. 49,800.",
    "summaryFirPulsarSnatching": "While the complainant was walking back from a local temple, two motor-cyclists on a black Pulsar bike approached from behind. The pillion rider snatched her gold mangalasutra weighing 40g and sped away.",
    "summaryFirMdmaRaid": "Based on a credible tip-off, a raid was conducted. Accused Imran Khan and Fatima B. were apprehended while in possession of 15g of MDMA crystals, meant for sale to college students in the locality.",
    "summaryFirGeneric": "Detailed investigation report for registered offence. Incident occurred near public area. Modus Operandi matches historical signature. Access method is noted. The case is registered under appropriate legal acts.",
    "transactionTransfer": "Transfer",
    "transactionWithdrawal": "Withdrawal",
    "transactionDeposit": "Deposit",
    "transactionStructured": "Structured",
    "structuringWarningTitle": "Structuring Warning (IT Act / BNS)",
    "structuringWarningDesc": "This transaction shows structuring hallmarks. Multiple identical amounts just below ₹50,000 (PAN reporting limit) were transferred sequentially within 24 hours. Represents likely layering of proceeds of cybercrime/narcotics.",
    "standardTransactionDesc": "Standard transaction path. No immediate structural alerts triggered for this node sequence.",
    "planABaseline": "Plan A (Baseline Strategy)",
    "planBContingency": "Plan B (Contingency Strategy)",
    "planComparison": "Plan A vs Plan B Comparison",
    "mapInteractionHint": "Drag unit cards onto the map • Drag placed markers to reposition • Click marker to remove",
    "cost": "Cost",
    "radius": "Radius",
    "add": "Add",
    "unitsPlaced": "Units Placed",
    "pointsAvailable": "Points Available",
    "budgetMaxCapacity": "⚠️ Budget Max Capacity",
    "quickPresets": "Quick Presets",
    "presetMinimal": "Minimal",
    "presetStandard": "Standard",
    "presetFestival": "Festival",
    "presetMonsoon": "Monsoon",
    "accessPointsSecured": "Access Points: {0} / {1} Secured",
    "targetSla": "Target SLA: < 4.0 min",
    "apsCovered": "{0}/4 APs Covered",
    "tacticalRecommendation": "Tactical Recommendation:",
    "comparativeMetricsChart": "Comparative Metrics Chart",
    "deploymentParameter": "Deployment Parameter / Metric",
    "secured": "SECURED",
    "exposed": "EXPOSED",
    "coveredByUnitRadius": "✅ Covered by active unit radius",
    "noTacticalCoverage": "⚠️ No tactical unit coverage",
    "coverageRadius": "Coverage Radius",
    "removeUnit": "Remove Unit",
    "dropUnitHint": "Drop unit onto map at exact coordinate",
    "varianceImpact": "Variance / Delta Impact",
    "compareDesc": "Evaluate spatial trade-offs and perimeter risk deltas between Plan A (Baseline) and Plan B (Contingency) real-map deployments.",
    "simulationGuardrailText": "Strict Guardrail Directive: Units cover a designated geographic place/sector, not an individual. No autonomous movement, suspect paths, combat, or neutralization. The sandbox derives area coverage risk and perimeter integrity only.",
    "personnelUnitsBudget": "Personnel Units & Budget Cost",
    "accessPointsSecuredLabel": "Access Points Secured",
    "coverageRiskIndexLabel": "Coverage Risk Index (0-100)",
    "estResponseTimeLabel": "Estimated Response Time",
    "displayingHotspots": "DISPLAYING CRIME HOTSPOTS",
    "jurisdiction": "Jurisdiction",
    "savePlan": "Save Plan",
    "loadPlan": "Load Saved Plan",
    "savedPlans": "Saved Scenarios & Deployments",
    "noSavedScenarios": "No saved scenarios found in database.",
    "saveScenarioModalTitle": "Save Operational Deployment Scenario",
    "scenarioNameLabel": "Scenario Name",
    "scenarioSavedSuccess": "Scenario successfully saved to database.",
    "scenarioLoadedSuccess": "Scenario loaded successfully.",
    "loadingHotspots": "Loading real hotspots...",
    "saveToDb": "Save to Database",
    "loadFromDb": "Load from Database",
    "savedAt": "Saved At",
    "loadScenarioAction": "Load Scenario",
    "enterScenarioName": "Enter a name for this deployment scenario...",
    "liveWeather": "Live Weather",
    "fetchingLiveWeather": "Fetching live weather...",
    "liveWeatherActive": "Live Weather Telemetry Active",
    "serverRiskActive": "Server-Side Risk Scoring Active",
    "aiTacticalCommander": "AI Tactical Operations Commander",
    "aiCommanderSubtitle": "Autonomous deployment strategist powered by actual FIR intelligence & live weather telemetry",
    "districtCrimeTelemetry": "District Crime Telemetry",
    "primaryThreatCrime": "Primary Threat Pattern",
    "activeFIRs": "Active FIR Records",
    "aiStrategySelect": "Select AI Strategic Objective",
    "strategyHotspotTitle": "Anti-Crime Hotspot Deterrence",
    "strategyHotspotDesc": "Deploys targeted beat sweeps and central rapid intercept squads against primary historical crime types.",
    "strategyCordonTitle": "100% Perimeter Cordon & Lockdown",
    "strategyCordonDesc": "Fortifies all 4 perimeter access corridors with stationary checkpoints and biometric gateways.",
    "strategyRapidTitle": "Rapid Intercept & SLA Acceleration",
    "strategyRapidDesc": "Maximizes Mobile Response Vehicles (MRVs) to achieve sub-2.5 minute emergency SLA across all quadrants.",
    "strategyWeatherTitle": "Adverse Weather & Optical Overwatch",
    "strategyWeatherDesc": "Deploys multi-point elevated overwatch spotting nodes to eliminate weather-induced visibility blind spots.",
    "generateAiPlanBtn": "Generate AI Deployment Strategy",
    "generatingAiPlan": "AI Commander Calculating Deployment...",
    "aiBriefingTitle": "Tactical Operations Directive",
    "aiThreatAssessment": "AI Threat Assessment",
    "aiStrategicRationale": "Strategic Rationale & Placements",
    "applyToPlanA": "Apply to Plan A (Baseline)",
    "applyToPlanB": "Apply to Plan B (Contingency)",
    "aiPlanAppliedSuccess": "AI Tactical Strategy successfully loaded into simulation plan.",
    "unitPatrolTeamName": "Patrol Team (Area Sweeping)",
    "unitPatrolShort": "Patrol",
    "unitPatrolDesc": "Active mobile foot beat sweep neutralizing opportunistic crimes.",
    "unitPatrolBadge": "Beat Sweeping",
    "unitPatrolRole": "Foot Patrol & Local Reconnaissance",
    "unitCheckpointName": "Static Perimeter Checkpoint Post",
    "unitCheckpointShort": "Checkpoint",
    "unitCheckpointDesc": "Hard perimeter choke point access screening and verification.",
    "unitCheckpointBadge": "Access Control",
    "unitCheckpointRole": "Access Denial & Verification",
    "unitMrvName": "Mobile Response Vehicle (PCR Van)",
    "unitMrvShort": "MRV",
    "unitMrvDesc": "High speed motorized response reducing emergency intercept latency.",
    "unitMrvBadge": "Rapid Intercept",
    "unitMrvRole": "High-Speed Tactical Response",
    "unitOverwatchName": "Overwatch Observation Node",
    "unitOverwatchShort": "Overwatch",
    "unitOverwatchDesc": "Elevated high-ground visual and optical sensor spotting node.",
    "unitOverwatchBadge": "Overwatch Telemetry",
    "unitOverwatchRole": "Visual Tracking & Situational Awareness",
    "alertCoverageGap": "Spatial Coverage Gap: Access Point {0} ({1}) has no unit coverage. Critical corridor in {2} exposed.",
    "alertPersonnelDeficit": "Critical Personnel Deficit: Total deployed tactical budget (< 8 units) is insufficient for high-density crowds. Perimeter bottleneck probability elevated by 65%.",
    "alertVisibilityHazard": "Environmental Visibility Hazard: Adverse weather reduces visual radius by ~40%. Incident detection in dark zones significantly hindered without overwatch.",
    "alertChokePointRisk": "Ingress Choke Point Risk: Ingress bottlenecks at primary entry gates under peak festival flow. Crowd surge hazard detected at Gate 1 & Gate 2.",
    "alertFestivalSurge": "Festival Surge Overlap: Concurrent religious/cultural processions create multi-nodal crowd pressure points across the eastern quadrant.",
    "alertElevatedVulnerability": "Elevated Area Vulnerability: Secondary perimeter response delays exceed the 6-minute target window. Minor disturbances may escalate.",
    "alertOptimalCoverage": "Optimal Sector Coverage: All 4 access corridors in {0} are fully secured under current spatial layout.",
    "recDeployCheckpointPatrol": "Deploy a Checkpoint Post or Patrol Team to cover {0}.",
    "recMobilizeReserve": "Mobilize minimum 6 reserve quick-response personnel from neighboring jurisdictional beats.",
    "recDeployOverwatch": "Deploy an Overwatch Post or switch posture to Checkpoint-Focused Ingress with fixed high-intensity tactical illumination.",
    "recActiveOverwatchMitigation": "Active Overwatch ({0} posts) mitigating adverse weather detection blindness by ~{1}%.",
    "recOpenSecondaryCorridors": "Open secondary emergency egress corridors and deploy staggered holding pens.",
    "recEstablishForwardPost": "Establish a forward tactical coordination post with mobile response vehicle assistance.",
    "recMrvActive": "Mobile Response Unit active: Emergency intercept SLA accelerated to {0} minutes.",
    "recAddPatrolTeams": "Place additional patrol teams to bring risk index below 45.",
    "recMaintainCheckins": "Maintain active radio check-ins every 30 minutes. Log telemetry to CCTNS audit trail.",
    "sopTitle": "Standard Operating Procedure (SOP) & Officer Operating Guide",
    "sopBadge": "HOW TO OPERATE",
    "sopHide": "Hide Guide",
    "sopView": "View How to Operate",
    "sopAssignedDept": "Assigned Department",
    "sopLegalAuth": "Legal & Regulatory Authority",
    "sopEscalation": "Escalation & Field Dispatch",
    "sopWorkflow": "STEP-BY-STEP INVESTIGATOR WORKFLOW:",
    "sopTips": "Tactical Investigator Tips & Best Practices:",
    "rolePermissionSandbox": "ROLE PERMISSION SANDBOX",
    "demoRoleSwitcher": "DEMO ROLE SWITCHER",
    "demoRoleSwitcherDesc": "Demo purposes only. In production, roles are enforced via Catalyst IAM permissions.",
    "switchCurrentRole": "Switch Current Role",
    "accessPermissionForRole": "ACCESS PERMISSION FOR THIS ROLE:",
    "biometricRegistryActive": "BIOMETRIC REGISTRY ACTIVE",
    "directoryRestrictedSupervisor": "DIRECTORY RESTRICTED TO SYSTEM SUPERVISORS",
    "directoryRestrictedDesc": "To manage system access directories, toggle officer accounts, or reset biometric authentication registries, use the Role Permission Sandbox selector above to elevate your role to Supervisor.",
    "registerOfficerTitle": "Register Investigation Officer",
    "psIdentifierLabel": "PS Identifier (PS ID)",
    "officerNameLabel": "Officer Name",
    "rankLabel": "Rank",
    "securityRoleLabel": "Security Role",
    "policeStationLabel": "Police Station",
    "cancelButton": "Cancel",
    "registerOfficerButton": "Register Officer",
    "lockAccessButton": "Lock Access",
    "unlockAccessButton": "Unlock Access",
    "statusActive": "Active",
    "statusLocked": "Locked",
    "crimeCopilotTitle": "PRAJNA-AI CRIME COPILOT",
    "cctnsRagConnected": "Connected to CCTNS RAG Intelligence Store",
    "quickMlBadge": "QUICK ML",
    "newChatButton": "New Chat",
    "exportPdfButton": "Export PDF",
    "clearChatButton": "Clear Chat",
    "whatToInvestigate": "What would you like to investigate, {0}?",
    "chatHeroSubtitle": "Query CCTNS crime registries, generate suspect dossiers, cross-reference Modus Operandi signatures, or draft case briefs in seconds.",
    "investigationHistory": "INVESTIGATION HISTORY",
    "newInvestigationChat": "New Investigation Chat",
    "searchPastCases": "Search past cases & chats...",
    "timeToday": "TODAY",
    "timePrevious7Days": "PREVIOUS 7 DAYS",
    "timeOlder": "OLDER",
    "noPastChats": "No past investigation chats found.",
    "chatDisclaimer": "Prajna-AI provides automated crime analytics & case synthesis. Always verify citations against official CCTNS case diaries.",
    "incidentAtmSkimming": "ATM card skimming reported at solitary kiosk",
    "incidentTwoWheelerStolen": "Two-wheeler stolen from mall parking using master key",
    "incidentHouseBreakIn": "Residential house break-in during daytime with duplicate key",
    "incidentChainSnatching": "Pillion rider chain snatching on Pulsar bike",
    "incidentMdmaPeddling": "Synthetic drugs (MDMA) peddling near college campus",
    "incidentLotteryVishing": "Fake lottery prize claim call and OTP fraud",
    "incidentShopBreakIn": "Commercial shop shutter break-in and cash theft",
    "incidentAssaultBrawl": "Street brawl and assault near pub over parking dispute",
    "suspectReasonCctv": "Identified via facial recognition CCTV camera match",
    "suspectReasonCellTower": "Correlated via cellular tower dump and CDR timestamp",
    "suspectReasonNafis": "Latent fingerprint matched against NAFIS criminal repository",
    "suspectReasonInformer": "Human intelligence informer confidential tip-off",
    "suspectReasonMuleAccount": "Identified as primary mule account beneficiary in financial trail",
    "unitPatrolName": "Beat Sweeping Patrol Squad",
    "rank": "Rank",
    "securitySafeguardsProtocol": "Security Safeguards & Access Controls",
    "maskPiiDesc": "Citizen biometric records and PII are masked at database level in compliance with DPDP Act, 2023.",
    "vpnTunnelDesc": "Access restricted to authorized police station IP subnets and TLS 1.3 secured gateway tunnels.",
    "immutableAuditDesc": "All queries, export actions, and credential changes generate cryptographically signed audit logs.",
    "inactivityDesc": "Terminals automatically terminate sessions upon detecting 15 minutes of idle time.",
    "operatorDirectoryDesc": "Roster of police personnel with active terminal access rights.",
    "history": "History",
    "searchBySuspectTxnAccount": "Search by Suspect, Txn ID, or Account...",
    "allTypes": "All Types",
    "suspiciousOnly": "Suspicious Only",
    "transactionId": "Transaction ID",
    "senderFrom": "Sender (From)",
    "recipientTo": "Recipient (To)",
    "cctnsAnalysisSummary": "CCTNS Intelligence Analysis Summary:",
    "standardTxnPath": "Standard transaction path. No immediate structural alerts triggered for this node sequence.",
    "criminologyModusOperandi": "Criminology Modus Operandi:",
    "associatedFinancialAccounts": "Associated Financial Accounts:",
    "noRegisteredSuspectTxn": "No registered suspect directly indexed to this transaction identifier.",
    "structuringLayerAlert": "Structuring Layer (Alert)",
    "directTransfer": "Direct Transfer",
    "selectTxnRowTrace": "Select a transaction row to execute link node trace.",
    "crimeTrendTitle": "12-Month Crime Trend (Case Volume)",
    "totalCases": "Total: {0} Cases",
    "crimeVolumeByDistrict": "Crime Volume Comparison By District",
    "casesUnit": "Cases",
    "seasonalOverlayTitle": "Seasonal Crime Activity Overlay (Quarterly)",
    "theftBurglaryLegend": "Theft / Burglary",
    "cyberFraudLegend": "Cyber Fraud",
    "assaultViolenceLegend": "Assault / Violence",
    "ageGroup1825": "18-25 yrs",
    "ageGroup2635": "26-35 yrs",
    "ageGroup3645": "36-45 yrs",
    "ageGroup46Plus": "46+ yrs",
    "totalRecords": "Total: {0} Records",
    "socioEconomicCorrelations": "Socio-Economic & Sociological Crime Correlations",
    "sociologicalBriefingDesc": "Correlation analysis mapping CCTNS crime records against taluk census profiles indicates that regions exhibiting high urban migration and unemployment rates show a 2.7x higher concentration of opportunistic property offences.",
    "criminologyActionPolicyDesc": "Prioritize development of local beat networks in areas with high density of commercial liquor outlets and rapid migratory expansion.",
    "decisionSupportBadge": "Decision Support",
    "casesBadge": "CASES",
    "caseBriefSummaryTab": "Case Brief summary",
    "similarCaseFinderTab": "Similar Case Finder",
    "suggestedLeadsTab": "Suggested leads",
    "secureGateQuickML": "SECURE GATE: Catalyst QuickML (external model)",
    "auditTrailId": "Audit Trail ID"
  },
  "kn": {
    "karnatakaStatePolice": "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್",
    "platformName": "ಪ್ರಜ್ಞಾ-AI",
    "restrictedAccess": "ನಿರ್ಬಂಧಿತ ಪೊಲೀಸ್ ಡೇಟಾಬೇಸ್ ಗೇಟ್‌ವೇ",
    "livealerts": "ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಇಂಟೆಲಿಜೆನ್ಸ್ ಅಲರ್ಟ್‌ಗಳು",
    "live": "ಲೈವ್ ●",
    "logout": "ಸುರಕ್ಷಿತ ಸೆಷನ್‌ನಿಂದ ಹೊರಬನ್ನಿ",
    "rankinfo": "ಠಾಣೆಯ ಶ್ರೇಣಿ",
    "dashboard": "ನಿಯಂತ್ರಣ ಫಲಕ",
    "aiAssistant": "ಎಐ ಸಹಾಯಕ",
    "criminalNetworks": "ಅಪರಾಧ ಜಾಲಗಳು",
    "hotspotIntel": "ಅಪರಾಧ ಪ್ರದೇಶಗಳು",
    "predictiveInsights": "ಮುನ್ಸೂಚನೆಗಳು",
    "offenderProfiling": "ಅಪರಾಧಿಗಳ ವಿವರ",
    "faceSearch": "ಮುಖದ ಹುಡುಕಾಟ",
    "financialAnalysis": "ಹಣಕಾಸು ವಿಶ್ಲೇಷಣೆ",
    "reportsAudit": "ವರದಿಗಳು ಮತ್ತು ಆಡಿಟ್",
    "userManagement": "ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ",
    "settings": "ಸಂಯೋಜನೆಗಳು (Settings)",
    "collapseMenu": "ಪಟ್ಟಿ ಮರೆಮಾಡು",
    "totalCaseFiles": "ಒಟ್ಟು ಪ್ರಕರಣಗಳು (NoSQL)",
    "activeInvestigations": "ಸಕ್ರಿಯ ತನಿಖೆಗಳು",
    "criticalHotspots": "ನಿರ್ಣಾಯಕ ಅಪರಾಧ ವಲಯಗಳು",
    "knownOffendersProfiled": "ಗುರುತಿಸಲಾದ ಅಪರಾಧಿಗಳು",
    "repeatAccused": "ಮರು-ಅಪರಾಧದ ಅಪಾಯ",
    "catalystHostSync": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಸಿಂಕ್ ಸ್ಥಿತಿ",
    "welcomeHeader": "ಪ್ರಜ್ಞಾ-AI ಅಪರಾಧ ಮಾಹಿತಿ ಕೇಂದ್ರ",
    "welcomeSubtitle": "ಸಿ.ಸಿ.ಟಿ.ಎನ್.ಎಸ್ ಅಪರಾಧ ದಾಖಲೆಗಳನ್ನು ಹೊಂದಿರುವ ಬುದ್ಧಿವಂತ ಸಂಭಾಷಣೆ ಎಂಜಿನ್ ಮತ್ತು ಅಪಾಯಕಾರಿ ಮುನ್ಸೂಚನೆ ವೇದಿಕೆ. ಪ್ರಕರಣದ ಇತಿಹಾಸವನ್ನು ಪ್ರಶ್ನಿಸಿ ಮತ್ತು ಅಪರಾಧ ಜಾಲಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
    "askAi": "ಎಐ ಸಹಾಯ ಕೇಳಿ",
    "viewAssociations": "ಸಂಬಂಧಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "coreCapabilitiesGateway": "ಮುಖ್ಯ ಸಾಮರ್ಥ್ಯಗಳ ಗೇಟ್‌ವೇ (೧೨ ಪ್ರಸ್ತಾವಿತ ಪರಿಹಾರಗಳು)",
    "coreCapabilitiesGatewayDesc": "ಕೆಎಸ್‌ಪಿ ಡೇಟಾಥಾನ್ ಅಗತ್ಯತೆಗಳಿಗೆ ಮ್ಯಾಪ್ ಮಾಡಲಾದ ಎಲ್ಲಾ ೧೨ ಅಧಿಕೃತ ಸಿರಾಸ್ (CIRAS) ಸಾಮರ್ಥ್ಯಗಳ ತ್ವರಿತ ಪ್ರವೇಶ ಕನ್ಸೋಲ್.",
    "f1Title": "ಸಂಭಾಷಣಾ ಅಪರಾಧ ಬುದ್ಧಿವಂತಿಕೆ",
    "f1Desc": "ನೈಸರ್ಗಿಕ ಭಾಷೆಯ ಚಾಟ್‌ಬಾಟ್ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ೧೦೦೦ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳನ್ನು ಪ್ರಶ್ನಿಸುತ್ತದೆ.",
    "f2Title": "ಅಪರಾಧ ಜಾಲದ ವಿಶ್ಲೇಷಣೆ",
    "f2Desc": "ಶಂಕಿತರು, ಬಲಿಪಶುಗಳು, ಸ್ಥಳಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ನಡುವಿನ ಸಂಬಂಧಗಳನ್ನು ಬಿಂಬಿಸುವ ಜಾಲಗಳು.",
    "f3Title": "ಅಪರಾಧ ಮಾದರಿ ಮತ್ತು ಪ್ರವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆ",
    "f3Desc": "ಸಮಯದ ಪ್ರವೃತ್ತಿ ಪಟ್ಟಿಗಳು, ಜಿಲ್ಲಾವಾರು ಹೋಲಿಕೆಗಳು ಮತ್ತು ಕಾಲೋಚಿತ ಮಾದರಿ ವಿಶ್ಲೇಷಣೆ.",
    "f4Title": "ಸಮಾಜಶಾಸ್ತ್ರೀಯ ಅಪರಾಧ ಒಳನೋಟಗಳು",
    "f4Desc": "ನಗರೀಕರಣ ಮತ್ತು ಸಾಮಾಜಿಕ ಒತ್ತಡದ ಅಂಶಗಳೊಂದಿಗೆ ಅಪರಾಧ ಪ್ರಮಾಣವನ್ನು ಸಂಬಂಧಿಸುವ ಜನಸಂಖ್ಯಾ ವಿಶ್ಲೇಷಣೆ.",
    "f5Title": "ಅಪರಾಧಶಾಸ್ತ್ರ ಆಧಾರಿತ ಅಪರಾಧಿಗಳ ಪ್ರೊಫೈಲಿಂಗ್",
    "f5Desc": "ಅಪರಾಧಿಗಳ ಸಮಗ್ರ ಇತಿಹಾಸ ಮತ್ತು ವಿಧಾನ ಸಹಿಗಳನ್ನು (MO) ಮ್ಯಾಪ್ ಮಾಡುವ ದಸ್ತಾವೇಜು.",
    "f6Title": "ಮರು-ಅಪರಾಧ ಸಂಭವನೀಯತೆ ಎಂಜಿನ್",
    "f6Desc": "ಮರು-ಅಪರಾಧದ ಸಾಧ್ಯತೆ, ಪ್ರಕಾರ, ಸಮಯ ಮತ್ತು ವಲಯವನ್ನು ಊಹಿಸುವ ಕ್ವಿಕ್‌ಎಂಎಲ್ (QuickML) ಮಾಡೆಲ್.",
    "f7Title": "ತನಿಖಾಧಿಕಾರಿ ನಿರ್ಧಾರ ಬೆಂಬಲ",
    "f7Desc": "ಸ್ವಯಂಚಾಲಿತ ಪ್ರಕರಣದ ಸಾರಾಂಶಗಳು ಮತ್ತು ಸಂಭಾವ್ಯ ತನಿಖಾ ಸುಳಿವುಗಳ ಶಿಫಾರಸುಗಳು.",
    "f8Title": "ಎಐ ಮುಖದ ಹುಡುಕಾಟ ಮತ್ತು ಶಂಕಿತರ ಗುರುತಿಸುವಿಕೆ",
    "f8Desc": "KSP Neural Biometrics ವಯಸ್ಸು-ಅಸ್ಥಿರ ಮುಖದ ಜ್ಯಾಮಿತಿ ಹೋಲಿಕೆ ಮತ್ತು ನಾಗರಿಕರ ಭದ್ರತಾ ವಾಚ್‌ಲಿಸ್ಟ್.",
    "f9Title": "ಹಣಕಾಸು ಅಪರಾಧ ಮತ್ತು ವಹಿವಾಟು ವಿಶ್ಲೇಷಣೆ",
    "f9Desc": "₹೫೦,೦೦೦ ಮಿತಿಗಿಂತ ಕೆಳಗಿನ ಶಂಕಿತ ಹಣದ ವರ್ಗಾವಣೆ ಜಾಲ ಮತ್ತು ಹಣದ ಹರಿವಿನ ಪತ್ತೆ.",
    "f10Title": "ಅಪರಾಧ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಮುನ್ನೆಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ",
    "f10Desc": "ಹೆಚ್ಚುತ್ತಿರುವ ಅಪರಾಧಗಳ ಮುನ್ನೆಚ್ಚರಿಕೆ ಮತ್ತು ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆ ಶಿಫಾರಸುಗಳು.",
    "f11Title": "ವಿವರಣಾತ್ಮಕ ಎಐ ಮತ್ತು ಪಾರದರ್ಶಕ ವಿಶ್ಲೇಷಣೆ",
    "f11Desc": "ಚಾಟ್‌ಬಾಟ್‌ನ ಪ್ರತಿ ಉತ್ತರಕ್ಕೂ ನಿಖರವಾದ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳ ಉಲ್ಲೇಖಗಳು.",
    "f12Title": "ಸುರಕ್ಷಿತ ಪಾತ್ರ ಆಧಾರಿತ ಪ್ರವೇಶ ಮತ್ತು ಆಡಳಿತ",
    "f12Desc": "೫-ಹಂತದ ಆರ್‌ಬಿಎಸಿ (RBAC) ಮತ್ತು ಬದಲಾಯಿಸಲಾಗದ ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಆಡಿಟ್ ಲಾಗ್‌ಗಳು.",
    "recentEntries": "ಇತ್ತೀಚಿನ ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಪ್ರಕರಣ ದಾಖಲೆಗಳು",
    "queryFullRoster": "ಸಂಪೂರ್ಣ ಪಟ್ಟಿ ವೀಕ್ಷಿಸಿ →",
    "firNumber": "ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆ",
    "crimeCategory": "ಅಪರಾಧ ವರ್ಗ",
    "jurisdictionStation": "ಪೊಲೀಸ್ ಠಾಣೆ",
    "registrationDate": "ನೋಂದಣಿ ದಿನಾಂಕ",
    "ioAssigned": "ತನಿಖಾಧಿಕಾರಿ (IO)",
    "caseStatus": "ಪ್ರಕರಣದ ಸ್ಥಿತಿ",
    "chatbotTitle": "ಸಂಭಾಷಣಾ ಅಪರಾಧ ಸಹಾಯಕ",
    "chatbotSubtitle": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಸರ್ವರ್‌ಲೆಸ್ ಕೆಎಸ್‌ಪಿ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ 1000 ಎಫ್‌ಐಆರ್‌ಗಳನ್ನು ಪ್ರಶ್ನಿಸುವ ನೈಸರ್ಗಿಕ ಭಾಷಾ ಇಂಟರ್ಫೇಸ್.",
    "sessionIntel": "ಅಧಿವೇಶನದ ಮಾಹಿತಿ",
    "sessionId": "ಸೆಷನ್ ಐಡಿ",
    "serverLatency": "ಸರ್ವರ್ ವಿಳಂಬತೆ",
    "model": "ಮಾದರಿ (Model)",
    "helpfulTips": "ಸಹಾಯಕಾರಿ ಆಜ್ಞೆಯ ಸಲಹೆಗಳು",
    "tip1": "ತ್ವರಿತ ಪ್ರಕರಣದ ವಿವರಗಳನ್ನು ಪಡೆಯಲು FIR 0012/2026 ಎಂದು ಟೈಪ್ ಮಾಡಿ.",
    "tip2": "ಅಪರಾಧಿಯ ವಿವರವನ್ನು ಪಡೆಯಲು Raju K. ಎಂದು ಹುಡುಕಿ.",
    "tip3": "ಪ್ರಾದೇಶಿಕ ನಕ್ಷೆಯನ್ನು ತಯಾರಿಸಲು ಮೈಸೂರಿನಲ್ಲಿ ಕಳ್ಳತನ ಪ್ರಕರಣಗಳನ್ನು ಹುಡುಕಿ.",
    "crimeChatbot": "ಅಪರಾಧ ಮಾಹಿತಿ ಚಾಟ್‌ಬಾಟ್",
    "authorizedNotice": "ಅಧಿಕೃತ ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಸಿಬ್ಬಂದಿ ನೈಸರ್ಗಿಕ ಭಾಷೆಯನ್ನು ಬಳಸಿಕೊಂಡು ಡೇಟಾಬೇಸ್ ಅನ್ನು ಪ್ರಶ್ನಿಸಬಹುದು. ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆಗಳು, ಶಂಕಿತರ ಹೆಸರುಗಳು ಅಥವಾ ಪ್ರದೇಶಗಳ ಮೂಲಕ ಹುಡುಕಿ.",
    "searching": "ಪ್ರಜ್ಞಾ-AI ಪ್ರಕರಣಗಳನ್ನು ಹುಡುಕುತ್ತಿದೆ...",
    "clear": "ತೆರವುಗೊಳಿಸು",
    "export": "ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್",
    "secureChannel": "ಸುರಕ್ಷಿತ ಚಾನಲ್ • ಕ್ಯಾಟಲಿಸ್ಟ್ ಕ್ವಿಕ್‌ಎಂಎಲ್‌ಗೆ ಸಂಪರ್ಕಿಸಲಾಗಿದೆ",
    "reportsTitle": "ವರದಿಗಳು ಮತ್ತು ಭದ್ರತಾ ಆಡಿಟ್ ಟರ್ಮಿನಲ್",
    "reportsDesc": "ಬದಲಾಯಿಸಲಾಗದ ಕೆಎಸ್‌ಪಿ ಪ್ರಶ್ನೆ ಆಡಿಟ್ ಟ್ರಯಲ್ ಅನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ, ಜೊಹೊ ಕ್ಯಾಟಲಿಸ್ಟ್ ಸರ್ವರ್‌ಲೆಸ್ ಮೂಲಸೌಕರ್ಯದ ಆರೋಗ್ಯವನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಯ ಅಪರಾಧ ವರದಿಗಳನ್ನು ಕಂಪೈಲ್ ಮಾಡಿ.",
    "auditLocked": "ಆಡಿಟ್ ರಿಜಿಸ್ಟ್ರಿ ಲಾಕ್ ಆಗಿದೆ (ಬದಲಾಯಿಸಲಾಗದು)",
    "secureAuditLogs": "ಸುರಕ್ಷಿತ ಆಡಿಟ್ ಲಾಗ್‌ಗಳು",
    "catalystCloudStatus": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಕ್ಲೌಡ್ ಸ್ಥಿತಿ",
    "executiveReportGenerator": "ಕಾರ್ಯಕಾರಿ ವರದಿ ಜನರೇಟರ್",
    "tamperProofLockActive": "⚠ ಟ್ಯಾಂಪರ್-ಪ್ರೂಫ್ ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಲಾಕ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    "tamperProofDesc": "ಸಿಸಿಟಿಎನ್ಎಸ್ ಆಡಿಟ್ ನಿರ್ದೇಶನಗಳಿಗೆ ಅನುಗುಣವಾಗಿ, ಪ್ರತಿ ಬಳಕೆದಾರರ ಈವೆಂಟ್ (ಲಾಗಿನ್, ಪ್ರಶ್ನೆ, ರಫ್ತು, ಫೇಸ್ ಸ್ಕ್ಯಾನ್) ಅನ್ನು ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕವಾಗಿ ಸಹಿ ಮಾಡಲಾಗುತ್ತದೆ ಮತ್ತು ಲಾಗ್ ಮಾಡಲಾಗುತ್ತದೆ. ಈ ಲಾಗ್‌ಗಳು ಬದಲಾಯಿಸಲಾಗದವು ಮತ್ತು ಜೊಹೊ ಕ್ಯಾಟಲಿಸ್ಟ್ ಡೇಟಾಸ್ಟೋರ್‌ನೊಳಗಿನ ಪ್ರತ್ಯೇಕ ಭದ್ರತಾ ವಲಯಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಲ್ಪಡುತ್ತವೆ.",
    "immutableSecurityAuditLogs": "ಬದಲಾಯಿಸಲಾಗದ ಭದ್ರತಾ ಆಡಿಟ್ ಲಾಗ್‌ಗಳು",
    "tamperProofRecord": "ಟ್ಯಾಂಪರ್-ಪ್ರೂಫ್ ರೆಕಾರ್ಡ್",
    "actionFilter": "ಕ್ರಿಯೆ:",
    "allActions": "ಎಲ್ಲಾ ಕ್ರಿಯೆಗಳು",
    "timestamp": "ಸಮಯದ ಮುದ್ರೆ",
    "user": "ಬಳಕೆದಾರ",
    "role": "ಪಾತ್ರ",
    "action": "ಕ್ರಿಯೆ",
    "details": "ವಿವರಗಳು",
    "ipAddress": "ಐಪಿ ವಿಳಾಸ",
    "latency": "ವಿಳಂಬತೆ",
    "showingPage": "ಪುಟ ವೀಕ್ಷಣೆ",
    "of": "ರಲ್ಲಿ",
    "totalEntries": "ಒಟ್ಟು ನಮೂದುಗಳು",
    "previous": "ಹಿಂದಿನ",
    "next": "ಮುಂದಿನ",
    "zohoCatalystLiveDeploymentStatus": "ಜೋಹೋ ಕ್ಯಾಟಲಿಸ್ಟ್ ಲೈವ್ ನಿಯೋಜನೆ ಸ್ಥಿತಿ",
    "platform": "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್",
    "projectId": "ಯೋಜನೆ ಐಡಿ",
    "refreshing": "ಮರುಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "syncServices": "ಸೇವೆಗಳ ಸಿಂಕ್",
    "databaseIndexHighlight": "📊 ಡೇಟಾಬೇಸ್ ಸೂಚ್ಯಂಕ: ನೋಎಸ್ಕ್ಯೂಎಲ್ ಸ್ಟೋರ್‌ನಲ್ಲಿ ೧,೦೦೦ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳನ್ನು ಸೂಚಿಕೆ ಮಾಡಲಾಗಿದೆ",
    "latestIndex": "ಇತ್ತೀಚಿನ ಸೂಚ್ಯಂಕ: ೧೫ ಜೂನ್ ೨೦೨೬",
    "responseLatency": "ಪ್ರತಿಕ್ರಿಯೆ ವಿಳಂಬತೆ:",
    "recordCapacity": "ದಾಖಲೆ ಸಾಮರ್ಥ್ಯ:",
    "units": "ಘಟಕಗಳು",
    "checked": "ಪರಿಶೀಲಿಸಲಾಗಿದೆ:",
    "configureReport": "ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ ಪಿಡಿಎಫ್ ವರದಿಯನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ (SmartBrowz ಇಂಟಿಗ್ರೇಷನ್)",
    "reportClass": "ವರದಿ ವರ್ಗ",
    "classInvestigation": "ರಾಜ್ಯ ಅಪರಾಧ ಸಾರಾಂಶ ಮತ್ತು ತನಿಖಾ ವಿಶ್ಲೇಷಣೆ",
    "classTrends": "ಜಿಲ್ಲಾವಾರು ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆ",
    "classOffenders": "ಆರೋಪಿಗಳು ಮತ್ತು ಮರು-ಅಪರಾಧಿಗಳ ಅಪಾಯದ ಡೈರೆಕ್ಟರಿ",
    "classAudit": "ಸಿಸ್ಟಮ್ ಪ್ರವೇಶ ಆಡಿಟ್ ಟ್ರಯಲ್ ರಫ್ತು",
    "temporalScope": "ಸಮಯದ ವ್ಯಾಪ್ತಿ",
    "scope30days": "ಕೊನೆಯ ೩೦ ದಿನಗಳು (ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಆಡಿಟ್)",
    "scope90days": "ಕೊನೆಯ ತ್ರೈಮಾಸಿಕ (Q2 2026)",
    "scope1year": "ಕೊನೆಯ ೧೨ ತಿಂಗಳುಗಳು (ಸಮಗ್ರ)",
    "scopeCustom": "ಕಸ್ಟಮ್ ದಿನಾಂಕ ವ್ಯಾಪ್ತಿ (ಸಾರ್ವಕಾಲಿಕ)",
    "districtJurisdiction": "ಜಿಲ್ಲಾ ವ್ಯಾಪ್ತಿ",
    "distAll": "ಎಲ್ಲಾ ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳು (SCRB ಸಂಯೋಜಿತ)",
    "distBlr": "ಬೆಂಗಳೂರು ನಗರ (ನಗರ)",
    "distMys": "ಮೈಸೂರು ನಗರ",
    "distMng": "ಮಂಗಳೂರು ನಗರ",
    "distHbl": "ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ",
    "maskPii": "ನಾಗರಿಕರ PII / ಆಧಾರ್ ಹ್ಯಾಶ್‌ಗಳನ್ನು ಮರೆಮಾಡಿ (ನೇರ ಅನುಸರಣೆ ರಕ್ಷಣೆ)",
    "autoSign": "ಪ್ರಸ್ತುತ ಅಧಿಕಾರಿ ಐಡಿಯೊಂದಿಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲಾದ ಪಿಡಿಎಫ್‌ಗೆ ಸಹಿ ಮಾಡಿ",
    "compileReport": "ಕಾರ್ಯಕಾರಿ ಪಿಡಿಎಫ್ ವರದಿಯನ್ನು ಕಂಪೈಲ್ ಮಾಡಿ",
    "generating": "ದಸ್ತಾವೇಜು ತಯಾರಿಸಲಾಗುತ್ತಿದೆ",
    "resetParams": "ನಿಯತಾಂಕಗಳನ್ನು ಮರುಹೊಂದಿಸಿ",
    "zohoSmartBrowz": "ಜೋಹೋ ಸ್ಮಾರ್ಟ್‌ಬ್ರೌಸ್ ಪಿಡಿಎಫ್ ಕಂಪೈಲರ್",
    "serverlessEngine": "ಸರ್ವರ‍್ಲೆಸ್ ಕಂಪೈಲ್ ಎಂಜಿನ್",
    "serverlessEngineDesc": "ವರದಿ ಕಂಪೈಲ್ ಮಾಡುವುದನ್ನು ಸ್ಮಾರ್ಟ್‌ಬ್ರೌಸ್ ಮೂಲಕ ಜೊಹೊ ಕ್ಯಾಟಲಿಸ್ಟ್ ಸರ್ವರ್‌ಲೆಸ್ ಮೈಕ್ರೋ-ಸೇವೆಗಳಿಗೆ ವರ್ಗಾಯಿಸಲಾಗುತ್ತದೆ. ಮುಂಚಿತವಾಗಿ ಭರ್ತಿ ಮಾಡಿದ ಟೆಂಪ್ಲೇಟ್‌ಗಳು ವೆಕ್ಟರ್‌ಗಳು ಮತ್ತು ಚಾರ್ಟ್‌ಗಳನ್ನು ನೇರವಾಗಿ ಸಹಿ ಮಾಡಿದ A4 ಪಿಡಿಎಫ್ ವರದಿಗಳಿಗೆ ನಿರೂಪಿಸುತ್ತವೆ.",
    "compilingAssets": "ಆಸ್ತಿಗಳನ್ನು ಕಂಪೈಲ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "pdfSuccess": "ಪಿಡಿಎಫ್ ಯಶಸ್ವಿಯಾಗಿ ಕಂಪೈಲ್ ಆಗಿದೆ",
    "pdfSuccessDesc": "ವರದಿಗೆ ಭದ್ರತಾ ಹ್ಯಾಶ್‌ನೊಂದಿಗೆ ಸಹಿ ಮಾಡಲಾಗಿದೆ ಮತ್ತು ನಿಮ್ಮ ವರ್ಕ್‌ಸ್ಟೇಷನ್‌ಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ. ಐಡಿ: ",
    "offenderProfilingTitle": "ಅಪರಾಧಶಾಸ್ತ್ರ ಆಧಾರಿತ ಅಪರಾಧಿಗಳ ಪ್ರೊಫೈಲಿಂಗ್",
    "offenderProfilingDesc": "ತಿಳಿದಿರುವ ಮರು-ಅಪರಾಧಿಗಳು, ವಿಧಾನ ಸಹಿ (MO) ಮತ್ತು ಅಲ್ಗಾರಿದಮಿಕ್ ಆಗಿ ಪ್ರಕ್ಷೇಪಿಸಲಾದ ಮರು-ಅಪರಾಧದ ಅಪಾಯದ ಮಾಪನಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ.",
    "dbSyncActive": "ಕೆಎಸ್‌ಪಿ ಡೇಟಾಬೇಸ್ ಸಿಂಕ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    "filtersParameters": "ಫಿಲ್ಟರ್‌ಗಳು ಮತ್ತು ಪ್ಯಾರಾಮೀಟರ್‌ಗಳು",
    "searchPlaceholder": "ಹೆಸರು, ಅಲಿಯಾಸ್, MO ಅಥವಾ ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ...",
    "riskTier": "ಅಪಾಯದ ಮಟ್ಟ",
    "district": "ಜಿಲ್ಲೆ",
    "allRiskTiers": "ಎಲ್ಲಾ ಅಪಾಯದ ಮಟ್ಟಗಳು",
    "highRisk": "ಹೆಚ್ಚಿನ ಅಪಾಯ",
    "mediumRisk": "ಮಧ್ಯಮ ಅಪಾಯ",
    "lowRisk": "ಕಡಿಮೆ ಅಪಾಯ",
    "allDistricts": "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು",
    "showRepeatOnly": "ಮರು-ಅಪರಾಧಿಗಳನ್ನು ಮಾತ್ರ ತೋರಿಸು (isRepeatOffender = true)",
    "matchingOffenders": "ಹೊಂದುವ ಅಪರಾಧಿಗಳು",
    "noOffendersMatch": "ನಿಗದಿತ ಫಿಲ್ಟರ್ ಮಾನದಂಡಗಳಿಗೆ ಯಾವುದೇ ಅಪರಾಧಿಗಳು ಹೊಂದುವುದಿಲ್ಲ.",
    "cases": "ಪ್ರಕರಣಗಳು",
    "selectOffenderInstructions": "ಪೂರ್ಣ ಅಪರಾಧ ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಲು ಸೈಡ್‌ಬಾರ್‌ನಿಂದ ಅಪರಾಧಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "aliases": "ಅಲಿಯಾಸ್ ಹೆಸರುಗಳು:",
    "none": "ಯಾವುದೂ ಇಲ್ಲ",
    "yrs": "ವರ್ಷಗಳು",
    "moSignature": "ವಿಧಾನ ಸಹಿ (Modus Operandi)",
    "biometricLinkStatus": "ಬಯೋಮೆಟ್ರಿಕ್ ಲಿಂಕ್ ಸ್ಥಿತಿ",
    "aadharHashVerified": "ಆಧಾರ್ ಹ್ಯಾಶ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    "lastKnownActivity": "ಕೊನೆಯದಾಗಿ ತಿಳಿದಿರುವ ಚಟುವಟಿಕೆ",
    "addressesRegistered": "ನೋಂದಾಯಿತ ವಿಳಾಸಗಳು",
    "recidivismWarningEngine": "ಮರು-ಅಪರಾಧದ ಸಂಭವನೀಯತೆ ಮತ್ತು ಎಚ್ಚರಿಕೆ ಎಂಜಿನ್ (QuickML ಮಾಡೆಲ್)",
    "catalystQuickMlLive": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಕ್ವಿಕ್‌ಎಂಎಲ್ ಲೈವ್",
    "riskScore": "ಅಪಾಯದ ಅಂಕ",
    "criticalRiskTier": "ನಿರ್ಣಾಯಕ ಅಪಾಯದ ಮಟ್ಟ",
    "mediumWarningTier": "ಮಧ್ಯಮ ಎಚ್ಚರಿಕೆ ಮಟ್ಟ",
    "lowAttentionTier": "ಕಡಿಮೆ ಗಮನ ಮಟ್ಟ",
    "predictedCrimeType": "ಊಹಿಸಲಾದ ಅಪರಾಧದ ಪ್ರಕಾರ",
    "predictedZone": "ಹೆಚ್ಚಿನ ಸಂಭವನೀಯತೆಯ ವಲಯ",
    "timelineProjection": "ಸಮಯದ ಪ್ರಕ್ಷೇಪಣ",
    "highProbabilityZone": "ಹೆಚ್ಚಿನ ಸಂಭವನೀಯತೆಯ ವಲಯ",
    "modelLastUpdated": "ಮಾದರಿಯ ಕೊನೆಯ ನವೀಕರಣ",
    "identifiedRiskFactors": "ಗುರುತಿಸಲಾದ ಅಪಾಯಕಾರಿ ಅಂಶಗಳು",
    "recidivismTimelineTargets": "ಮರುಕೃತ್ಯದ ಕಾಲಮಿತಿ ಮತ್ತು ಗುರಿ ವಲಯಗಳು",
    "modelTransparencyDisclosure": "ಅಲ್ಗಾರಿದಮ್ ಮಾದರಿ ಪಾರದರ್ಶಕತೆ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ:",
    "modelTransparencyText": "ಮರುಕೃತ್ಯದ ಸಂಭವನೀಯತೆಯ ಅಂಕಗಳನ್ನು ಯಂತ್ರ ಕಲಿಕೆಯ ರಿಗ್ರೆಷನ್ ಮಾದರಿಗಳ ಮೂಲಕ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ. ಈ ಗಣಿತೀಯ ಮುನ್ನೋಟಗಳನ್ನು ಕೇವಲ ಪೊಲೀಸ್ ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆಯ ಸುಧಾರಣೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ ಮತ್ತು ಪ್ರಾಥಮಿಕ ನ್ಯಾಯಾಂಗ ಸಾಕ್ಷಿಯಾಗಿ ಬಳಸಬಾರದು.",
    "noPredictiveMetrics": "ಈ ಶಂಕಿತ ಐಡಿಗೆ ಯಾವುದೇ ಸುಧಾರಿತ ಮರು-ಅಪರಾಧದ ಮುನ್ಸೂಚನೆ ಮಾಪನಗಳು ಲಭ್ಯವಿಲ್ಲ.",
    "criminalCaseTimeline": "ಅಪರಾಧ ಪ್ರಕರಣದ ಸಮಯದ ಸಾಲು",
    "noActiveCaseAssociations": "ಸಿಸ್ಟಮ್ನಲ್ಲಿ ಯಾವುದೇ ಸಕ್ರಿಯ ಪ್ರಕರಣದ ಸಂಬಂಧಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಲಾಗಿಲ್ಲ.",
    "linkedToCrimeEvent": "ಸಹ-ಆರೋಪಿ / ಪ್ರಮುಖ ಶಂಕಿತನಾಗಿ ಅಪರಾಧದ ಘಟನೆಗೆ ಸಂಬಂಧಿಸಿದೆ.",
    "firLink": "ಎಫ್‌ಐಆರ್ ಲಿಂಕ್",
    "coOffenderDirectory": "ಸಹ-ಅಪರಾಧಿಗಳು ಮತ್ತು ಸಹವರ್ತಿಗಳ ಡೈರೆಕ್ಟರಿ",
    "noCoOffenderLinks": "ಈ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಯಾವುದೇ ಸಹ-ಅಪರಾಧಿ ಲಿಂಕ್‌ಗಳನ್ನು ನೋಂದಾಯಿಸಲಾಗಿಲ್ಲ.",
    "associate": "ಸಹವರ್ತಿ",
    "viewProfile": "ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ",
    "hotspotsTitle": "ಅಪರಾಧ ಪ್ರದೇಶಗಳ ಮಾಹಿತಿ — ಕರ್ನಾಟಕ ನಕ್ಷೆ",
    "hotspotsDesc": "ಜಿಲ್ಲೆ ಮತ್ತು ತಾಲೂಕು ಮಟ್ಟದ ಅಪರಾಧ ಸಾಂದ್ರತೆಯ ನಕ್ಷೆ. ಘಟನೆಯ ಪ್ರಮಾಣ ಮತ್ತು ತೀವ್ರತೆಯ ಆಧಾರದ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಗುರುತುಗಳು ಬದಲಾಗುತ್ತವೆ.",
    "risingCrimeTrends": "ಹೆಚ್ಚುತ್ತಿರುವ ಅಪರಾಧ ಪ್ರವೃತ್ತಿಗಳು",
    "totalHotspotsMonitored": "ಒಟ್ಟು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲಾದ ಪ್ರದೇಶಗಳು",
    "regions": "ಪ್ರದೇಶಗಳು",
    "beats": "ಬೀಟ್‌ಗಳು",
    "points": "ಪಾಯಿಂಟ್‌ಗಳು",
    "networkTitle": "ಅಪರಾಧ ಜಾಲಗಳು ಮತ್ತು ಸಂಬಂಧಗಳ ವಿಶ್ಲೇಷಣೆ",
    "networkDesc": "ಶಂಕಿತರು, ಬಲಿಪಶುಗಳು, ವಾಹನಗಳು, ದೂರವಾಣಿ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಬ್ಯಾಂಕ್ ಖಾತೆಗಳ ನಡುವಿನ ಗುಪ್ತ ಸಂಬಂಧಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
    "intelDossier": "ಮಾಹಿತಿ ದಸ್ತಾವೇಜು (Dossier)",
    "nodeLabel": "ನೋಡ್ ಲೇಬಲ್",
    "typeClassification": "ಪ್ರಕಾರ / ವರ್ಗೀಕರಣ",
    "riskAssessmentTier": "ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ ಮಟ್ಟ",
    "metadataProperties": "ಮೆಟಾಡೇಟಾ ಗುಣಲಕ್ಷಣಗಳು",
    "generateOffenderDossier": "ಅಪರಾಧಿಯ ದಸ್ತಾವೇಜು ರಚಿಸಿ",
    "clickNodePrompt": "ದಸ್ತಾವೇಜು ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಲು ನೆಟ್‌ವರ್ಕ್ ನಕ್ಷೆಯ ಒಳಗಿನ ನೋಡ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ",
    "legendSuspectHigh": "ಶಂಕಿತ (ಹೆಚ್ಚಿನ ಅಪಾಯ)",
    "legendSuspectMed": "ಶಂಕಿತ (ಮಧ್ಯಮ ಅಪಾಯ)",
    "legendVictim": "ಸಂತ್ರಸ್ತ",
    "legendLocation": "ಸ್ಥಳ",
    "legendVehicle": "ವಾಹನ",
    "legendPhone": "ದೂರವಾಣಿ",
    "legendAccount": "ಖಾತೆ",
    "legendCase": "ಪ್ರಕರಣ",
    "predictiveTitle": "ಮುನ್ಸೂಚನೆಗಳು ಮತ್ತು ಮರು-ಅಪರಾಧದ ಮುನ್ನೋಟಗಳು",
    "predictiveDesc": "ಮರು-ಅಪರಾಧದ ಸಂಭವನೀಯತೆ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಅಪರಾಧ ಪ್ರವೃತ್ತಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುವ ಎಐ ಅಪಾಯದ ಮಾಡೆಲಿಂಗ್.",
    "crimeSpikeForecast": "ಅಪರಾಧ ಹೆಚ್ಚಳದ ಮುನ್ಸೂಚನೆ",
    "gangTracker": "ಸಂಘಟಿತ ಗ್ಯಾಂಗ್ ಟ್ರ್ಯಾಕರ್",
    "resourceRecommendations": "ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆ ಶಿಫಾರಸುಗಳು",
    "recidivismRoster": "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಮರು-ಅಪರಾಧಿಗಳ ಪಟ್ಟಿ",
    "accusedOffender": "ಆರೋಪಿ ಅಪರಾಧಿ",
    "predictedCrime": "ಊಹಿಸಲಾದ ಅಪರಾಧ",
    "targetZone": "ಗುರಿ ವಲಯ",
    "triggerFactorsReasoning": "ಎಐ ಪ್ರಚೋದಕ ಅಂಶಗಳು / ತರ್ಕ",
    "demographicsAge": "ಜನಸಂಖ್ಯಾ ವಿಶ್ಲೇಷಣೆ: ಆರೋಪಿಗಳ ವಯಸ್ಸು",
    "demographicsGender": "ಜನಸಂಖ್ಯಾ ವಿಶ್ಲೇಷಣೆ: ಲಿಂಗ ಅನುಪಾತ",
    "faceSearchTitle": "ಎಐ ಮುಖದ ಹುಡುಕಾಟ ಮತ್ತು ಶಂಕಿತರ ಗುರುತಿಸುವಿಕೆ",
    "faceSearchDesc": "ಶಂಕಿತ ಬಯೋಮೆಟ್ರಿಕ್ ಮುಖದ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲು, ಹೊಂದಿಸಲು ಮತ್ತು ಲಾಗ್ ಮಾಡಲು KSP SCRB Facial Recognition ಸೇವೆಗಳನ್ನು ಬಳಸಿ.",
    "biometricProtocol": "ಬಯೋಮೆಟ್ರಿಕ್ ಗುರುತಿಸುವಿಕೆ ಪ್ರೋಟೋಕಾಲ್ ಮತ್ತು ಸುರಕ್ಷತೆಗಳು",
    "biometricMatchingTerminal": "ಬಯೋಮೆಟ್ರಿಕ್ ಮ್ಯಾಚಿಂಗ್ ಟರ್ಮಿನಲ್",
    "recentCognitiveAudits": "ಇತ್ತೀಚಿನ ಕಾಗ್ನಿಟಿವ್ ಹುಡುಕಾಟ ಆಡಿಟ್‌ಗಳು",
    "secureAccessLog": "ಸುರಕ್ಷಿತ ಪ್ರವೇಶ ಲಾಗ್",
    "financialTitle": "ಹಣಕಾಸು ಅಪರಾಧ ಮತ್ತು ವಹಿವಾಟು ಲಿಂಕ್ ವಿಶ್ಲೇಷಣೆ",
    "financialDesc": "ಶಂಕಿತ ಖಾತೆ ರಚನೆ (₹೫೦,೦೦೦ ವರದಿ ಮಿತಿಗಿಂತ ಕಡಿಮೆ), ಮ್ಯೂಲ್ ಖಾತೆ ವರ್ಗಾವಣೆಗಳು ಮತ್ತು ಮಾದಕವಸ್ತು ಜಾಲಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ.",
    "totalLoggedVolume": "ಒಟ್ಟು ದಾಖಲಾದ ಪ್ರಮಾಣ",
    "suspiciousLayering": "ಅನುಮಾನಾಸ್ಪದ ಲೇಯರಿಂಗ್",
    "structuringAlerts": "ರಚನಾತ್ಮಕ ಎಚ್ಚರಿಕೆಗಳು",
    "activeFiuQueries": "ಸಕ್ರಿಯ FIU ಪ್ರಶ್ನೆಗಳು",
    "transactionAuditLedger": "ವಹಿವಾಟು ಆಡಿಟ್ ಲೆಡ್ಜರ್",
    "moneyTrailTitle": "ಹಣದ ಹರಿವಿನ ಲಿಂಕ್ ದೃಶ್ಯೀಕರಣ",
    "sourceAccount": "ಮೂಲ ಖಾತೆ",
    "destinationAccount": "ಗಮ್ಯಸ್ಥಾನ ಖಾತೆ",
    "linkedOffenderProfile": "ಲಿಂಕ್ ಮಾಡಲಾದ ಆರೋಪಿ ಪ್ರೊಫೈಲ್",
    "settingsTitle": "ಸಿಸ್ಟಮ್ ಸಂಯೋಜನೆಗಳು ಮತ್ತು ನಿಯಂತ್ರಣಗಳು",
    "settingsDesc": "ಸಿಸ್ಟಮ್ ಆದ್ಯತೆಗಳನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡಿ, ದೃಢೀಕರಿಸಿದ ಪ್ರೊಫೈಲ್ ಅನ್ನು ವೀಕ್ಷಿಸಿ, ಪಾತ್ರಗಳನ್ನು ಬದಲಾಯಿಸಿ ಮತ್ತು ಭದ್ರತಾ ನಿಯಂತ್ರಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "authenticatedProfile": "ದೃಢೀಕರಿಸಿದ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಪ್ರೊಫೈಲ್",
    "officerName": "ಅಧಿಕಾರಿಯ ಹೆಸರು",
    "psIdentifier": "ಪೊಲೀಸ್ ಠಾಣೆ ಐಡಿ (PS ID)",
    "rankDesignation": "ಶ್ರೇಣಿ / ಹುದ್ದೆ",
    "authorizedRole": "ಪ್ರಸ್ತುತ ಅಧಿಕೃತ ಪಾತ್ರ",
    "homeDistrict": "ಗೃಹ ಜಿಲ್ಲೆ",
    "attachedPs": "ಸಂಪರ್ಕಿತ ಪೊಲೀಸ್ ಠಾಣೆ",
    "accessibilityPrefs": "ಪ್ರವೇಶಸಾಧ್ಯತೆಯ ಆದ್ಯತೆಗಳು",
    "fontScale": "ಇಂಟರ್ಫೇಸ್ ಫಾಂಟ್ ಗಾತ್ರ",
    "activeBadges": "ಸಕ್ರಿಯ ಗೇಟ್‌ವೇಗಳು ಮತ್ತು ಭದ್ರತಾ ಬ್ಯಾಡ್ಜ್‌ಗಳು",
    "deploymentInfo": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಕೋರ್ ನಿಯೋಜನೆ ಮಾಹಿತಿ",
    "userManagementTitle": "ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ ಮತ್ತು ರುಜುವಾತುಗಳು",
    "userManagementDesc": "ಅಧಿಕೃತ ಪೊಲೀಸ್ ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ಪಾತ್ರಗಳನ್ನು ನಿಯೋಜಿಸಿ, ಭದ್ರತಾ ಕೀಗಳನ್ನು ಮರುಹೊಂದಿಸಿ ಮತ್ತು ಪ್ರವೇಶವನ್ನು ಲಾಕ್/ಅನ್‌ಲಾಕ್ ಮಾಡಿ.",
    "accessRestrictedSupervisor": "ಪ್ರವೇಶ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ — ಹಂತ ೪ ರ ಅಧಿಕಾರ ಅಗತ್ಯವಿದೆ",
    "registerNewOfficer": "ಹೊಸ ಅಧಿಕಾರಿಯನ್ನು ನೋಂದಾಯಿಸಿ",
    "authorizedOperatorsDirectory": "ಅಧಿಕೃತ ಸಿಸ್ಟಮ್ ಆಪರೇಟರ್‌ಗಳ ಡೈರೆಕ್ಟರಿ",
    "securityRole": "ಭದ್ರತಾ ಪಾತ್ರ",
    "actions": "ಕ್ರಮಗಳು",
    "revokeAccess": "ಪ್ರವೇಶ ರದ್ದುಗೊಳಿಸಿ",
    "restoreAccess": "ಪ್ರವೇಶ ಮರುಸ್ಥಾಪಿಸಿ",
    "biometricEnrollment": "ಬಯೋಮೆಟ್ರಿಕ್ ದಾಖಲಾತಿ",
    "lastActiveLogin": "ಕೊನೆಯ ಸಕ್ರಿಯ ಲಾಗಿನ್",
    "activeStatus": "ಸಕ್ರಿಯ",
    "lockedStatus": "ಲಾಕ್ ಮಾಡಲಾಗಿದೆ",
    "f13Title": "ಕಾರ್ಯಾಚರಣೆ ನಿಯೋಜನೆ ಮತ್ತು ಅಪಾಯದ ಸಿಮ್ಯುಲೇಶನ್",
    "f13Desc": "ಡಿಜಿಟಲ್-ಟ್ವಿನ್ ಪ್ರದೇಶ ಮತ್ತು ಕಾರ್ಯಕ್ರಮದ ಭದ್ರತಾ ಯೋಜನೆ, ಅಪಾಯದ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಯೋಜನೆಗಳ ಹೋಲಿಕೆ.",
    "rtccTitle": "ರಿಯಲ್-ಟೈಮ್ ಕ್ರೈಮ್ ಸೆಂಟರ್ (RTCC)",
    "rtccDesc": "ಲೈವ್ ಟ್ಯಾಕ್ಟಿಕಲ್ ಕಮಾಂಡ್ ವಾಲ್, ಎಎನ್‌ಪಿಆರ್ ನಂಬರ್ ಪ್ಲೇಟ್ ಸ್ಕ್ಯಾನರ್, ಪಿಟಿಝಡ್ ಕ್ಯಾಮೆರಾ ಸ್ವಿಚರ್, ಹೊಯ್ಸಳ ಗಸ್ತು ಟ್ರ್ಯಾಕರ್ ಮತ್ತು ಡೈನಾಮಿಕ್ ಕಾರ್ಡನ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್.",
    "operationalSimulationTitle": "ಕಾರ್ಯಾಚರಣೆ ನಿಯೋಜನೆ ಮತ್ತು ಅಪಾಯ ಸಿಮ್ಯುಲೇಶನ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್",
    "operationalSimulationDesc": "ಜನಸಂದಣಿ ಸಾಂದ್ರತೆ, ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆಗಾಗಿ ಕಲ್ಪನಾತ್ಮಕ ರಕ್ಷಣಾ ಯೋಜನೆ ಸಿಮ್ಯುಲೇಶನ್.",
    "simulationBadge": "ಸಿಮ್ಯುಲೇಟೆಡ್ / ಡೆಮೊ ಡೇಟಾ — ಕಾರ್ಯಾಚರಣೆಯ ಗುಪ್ತಚರ ಮಾಹಿತಿ ಅಲ್ಲ.",
    "simulationParameters": "ಸಿಮ್ಯುಲೇಶನ್ ನಿಯತಾಂಕಗಳು ಮತ್ತು ಅಂಶಗಳು",
    "personnelCount": "ನಿಯೋಜಿಸಲಾದ ಸಿಬ್ಬಂದಿ / ಘಟಕಗಳು",
    "crowdDensity": "ಜನಸಂದಣಿ ಸಾಂದ್ರತೆ",
    "densityLow": "ಕಡಿಮೆ ಸಾಂದ್ರತೆ",
    "densityModerate": "ಮಧ್ಯಮ ಸಾಂದ್ರತೆ",
    "densityHigh": "ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆ",
    "densityPeak": "ಗರಿಷ್ಠ (ಹಬ್ಬ / ಜಾತ್ರೆ)",
    "envCondition": "ಪರಿಸರ ಮತ್ತು ಹವಾಮಾನ ಸ್ಥಿತಿ",
    "envClear": "ಸ್ವಚ್ಛ ಹವಾಮಾನ",
    "envRain": "ಭಾರಿ ಮಳೆ / ಮಾನ್ಸೂನ್",
    "envLowVisibility": "ಕಡಿಮೆ ಗೋಚರತೆ / ಮಂಜು",
    "envFestivalOverlap": "ಹಬ್ಬದ ಜನಸಂದಣಿ ಅತಿಕ್ರಮಣ",
    "deploymentPosture": "ನಿಯೋಜನಾ ಭಂಗಿ (Deployment Posture)",
    "postureVisiblePerimeter": "ಗೋಚರ ಪರಿಧಿ ಕಾವಲು",
    "postureDistributedPatrol": "ವಿತರಿತ ಮೊಬೈಲ್ ಗಸ್ತು",
    "postureCheckpointFocused": "ಚೆಕ್‌ಪಾಯಿಂಟ್-ಕೇಂದ್ರಿತ ಪ್ರವೇಶ",
    "coverageRiskIndex": "ವ್ಯಾಪ್ತಿ ಅಪಾಯದ ಸೂಚ್ಯಂಕ",
    "estResponseTime": "ಅಂದಾಜು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
    "vulnerabilityAlerts": "ದುರ್ಬಲತೆ ಮತ್ತು ರಕ್ಷಣಾ ಅಂತರದ ಎಚ್ಚರಿಕೆಗಳು",
    "planComparisonTitle": "ತೌಲನಿಕ ಯೋಜನೆ ವಿಶ್ಲೇಷಣೆ (ಯೋಜನೆ ಎ ವಿರುದ್ಧ ಯೋಜನೆ ಬಿ)",
    "planAName": "ಯೋಜನೆ ಎ (ಮೂಲ ನಿಯೋಜನೆ)",
    "planBName": "ಯೋಜನೆ ಬಿ (ಆಕಸ್ಮಿಕ / ಹೆಚ್ಚುವರಿ)",
    "comparePlans": "ನಿಯೋಜನೆ ಯೋಜನೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ",
    "comparativeTakeaway": "ತೌಲನಿಕ ವಿಶ್ಲೇಷಣೆಯ ಸಾರಾಂಶ",
    "coverageScore": "ವ್ಯಾಪ್ತಿ ಸಮಗ್ರತೆಯ ಅಂಕ",
    "zoneCoverageMap": "ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ವಲಯ ನಕ್ಷೆ",
    "accessPointsLabel": "ಪರಿಧಿ ಪ್ರವೇಶ ಬಿಂದುಗಳು ಮತ್ತು ಚೆಕ್‌ಪಾಯಿಂಟ್‌ಗಳು",
    "activeUnitsLabel": "ಸಕ್ರಿಯ ನಿಯೋಜಿತ ಘಟಕಗಳು",
    "riskReadout": "ಲೆಕ್ಕಹಾಕಿದ ಅಪಾಯದ ಫಲಿತಾಂಶ",
    "unitPaletteTitle": "ಯುದ್ಧತಂತ್ರದ ಘಟಕ ಪ್ಯಾಲೆಟ್ (ಎಳೆಯಿರಿ ಮತ್ತು ಇರಿಸಿ)",
    "unitPaletteDesc": "ವಲಯಗಳನ್ನು ನಿಯೋಜಿಸಲು ಘಟಕಗಳನ್ನು ನಕ್ಷೆಗೆ ಎಳೆಯಿರಿ. ಮರುಸ್ಥಾಪಿಸಲು ಎಳೆಯಿರಿ, ಅಥವಾ ತೆಗೆದುಹಾಕಲು ನಕ್ಷೆಯಿಂದ ಹೊರಗೆ ಎಳೆಯಿರಿ.",
    "personnelBudgetMeter": "ಸಿಬ್ಬಂದಿ ಬಲ ಬಜೆಟ್",
    "budgetUsed": "ಬಳಸಿದ ಬಜೆಟ್",
    "budgetRemaining": "ಉಳಿದ ಬಜೆಟ್",
    "patrolTeam": "ಗಸ್ತು ತಂಡ",
    "checkpointPost": "ಚೆಕ್‌ಪಾಯಿಂಟ್ ಪೋಸ್ಟ್",
    "mobileResponse": "ಮೊಬೈಲ್ ಪ್ರತಿಕ್ರಿಯೆ ವಾಹನ",
    "overwatchPost": "ಓವರ್‌ವಾಚ್ ಪೋಸ್ಟ್",
    "dragHint": "ನಿಯೋಜಿಸಲು ನಕ್ಷೆಗೆ ಎಳೆಯಿರಿ",
    "repositionHint": "ಮರುಹೊಂದಿಸಲು ಘಟಕವನ್ನು ಎಳೆಯಿರಿ • ತೆಗೆದುಹಾಕಲು ನಕ್ಷೆಯಿಂದ ಹೊರಗೆ ಎಳೆಯಿರಿ",
    "clearAllUnits": "ವಿನ್ಯಾಸ ತೆರವುಗೊಳಿಸಿ",
    "resetDefaultLayout": "ಮರುಹೊಂದಿಸಿ",
    "coveredStatus": "ಸುರಕ್ಷಿತವಾಗಿದೆ",
    "uncoveredStatus": "ಅಸುರಕ್ಷಿತ ಪ್ರವೇಶ",
    "unitCost": "ವೆಚ್ಚ",
    "unitRadius": "ವ್ಯಾಪ್ತಿ",
    "digiLockerGateTitle": "ಡಿಜಿಲಾಕರ್ ಗುರುತು ಪರಿಶೀಲನೆ ಗೇಟ್‌ವೇ",
    "digiLockerGateDesc": "ತುರ್ತು ಆದ್ಯತೆಯ ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸಲು ಡಿಜಿಲಾಕರ್ ಮೂಲಕ ನಿಮ್ಮ ನಿವಾಸಿ ರುಜುವಾತುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "verifyWithDigiLocker": "ಡಿಜಿಲಾಕರ್ ಮೂಲಕ ದೃಢೀಕರಿಸಿ",
    "verifiedCitizen": "ಡಿಜಿಲಾಕರ್ ದೃಢೀಕೃತ ನಿವಾಸಿ",
    "skipDigiLocker": "ಪರಿಶೀಲನೆಯಿಲ್ಲದೆ ಮುಂದುವರಿಯಿರಿ (ಸಾಮಾನ್ಯ ಸಾಲು)",
    "uploadMediaEvidence": "ಛಾಯಾಚಿತ್ರ / ವೀಡಿಯೊ ಸಾಕ್ಷ್ಯವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    "mediaUploadHint": "ಐಚ್ಛಿಕ JPG, PNG, MP4 25MB ವರೆಗೆ",
    "incidentReportDetails": "ನಾಗರಿಕ ಘಟನೆಯ ವಿವರ ಮತ್ತು ರವಾನೆ ದಸ್ತಾವೇಜು",
    "autoMatchedSuspects": "ಎಐ ಸ್ವಯಂ-ಹೊಂದಾಣಿಕೆಯ ಶಂಕಿತ ಸುಳಿವುಗಳು",
    "redirectDepartment": "ಸಂಬಂಧಿತ ಠಾಣೆ / ವಿಭಾಗಕ್ಕೆ ಮರುನಿರ್ದೇಶಿಸಿ",
    "crimeTrendTimeSeries": "ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ಸಮಯ-ಸರಣಿ (೨೦೨೬ ಮಾಸಿಕ ಘಟನೆಗಳು)",
    "scrbAggregate": "ಎಸ್‌ಸಿಆರ್‌ಬಿ ಒಟ್ಟುಗೂಡಿಕೆ",
    "activeWatchlist": "ಸಕ್ರಿಯ ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿಗಳ ನಿಗಾ ಪಟ್ಟಿ",
    "viewAllDossiers": "ಎಲ್ಲಾ ಕಡತಗಳನ್ನು ವೀಕ್ಷಿಸಿ →",
    "offenderId": "ಅಪರಾಧಿ ಐಡಿ",
    "fullName": "ಪೂರ್ಣ ಹೆಸರು",
    "linkedCases": "ಸಂಬಂಧಿತ ಪ್ರಕರಣಗಳು",
    "crimeType": "ಅಪರಾಧದ ಪ್ರಕಾರ",
    "risk": "ಅಪಾಯ",
    "high": "ಹೆಚ್ಚು",
    "medium": "ಮಧ್ಯಮ",
    "low": "ಕಡಿಮೆ",
    "aiAlerts": "ಎಐ ಎಚ್ಚರಿಕೆಗಳು",
    "topHotspots": "ಪ್ರಮುಖ ಹಾಟ್‌ಸ್ಪಾಟ್ ಜಿಲ್ಲೆಗಳು",
    "alert1Title": "ಮನೆಗಳ್ಳತನ ಪ್ರಕರಣಗಳಲ್ಲಿ ಹೆಚ್ಚಳ — ವೈಟ್‌ಫೀಲ್ಡ್ ವಲಯ",
    "alert1Sub": "ಬೆಂಗಳೂರು ಪೂರ್ವ | ೨ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "alert2Title": "೩ ಪ್ರಕರಣಗಳಲ್ಲಿ ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿ ಮಾದರಿ ಪತ್ತೆಯಾಗಿದೆ",
    "alert2Sub": "ಮೈಸೂರು ಜಿಲ್ಲೆ | ೫ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "alert3Title": "ಟೆಕ್ ಕಾರಿಡಾರ್ ಬಳಿ ಸೈಬರ್‌ಕ್ರೈಮ್ ಗುಂಪು ರಚನೆಯಾಗುತ್ತಿದೆ",
    "alert3Sub": "ಬೆಂಗಳೂರು ನಗರ | ೯ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "alert4Title": "ಕಾಲೋಚಿತ ಏರಿಕೆ ಮುನ್ಸೂಚನೆ — ಸರಗಳ್ಳತನ, ಹಬ್ಬದ ಅವಧಿ",
    "alert4Sub": "ರಾಜ್ಯವ್ಯಾಪಿ | ೧ ದಿನದ ಹಿಂದೆ",
    "alert5Title": "ಮಾದರಿಯ ವಾಡಿಕೆಯ ಮರುತರಬೇತಿ ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
    "alert5Sub": "ವ್ಯವಸ್ಥೆ | ೧ ದಿನದ ಹಿಂದೆ",
    "monthJan": "ಜನ",
    "monthFeb": "ಫೆಬ್ರ",
    "monthMar": "ಮಾರ್ಚ್",
    "monthApr": "ಏಪ್ರಿ",
    "monthMay": "ಮೇ",
    "monthJun": "ಜೂನ್",
    "monthJul": "ಜುಲೈ",
    "monthAug": "ಆಗ",
    "monthSep": "ಸೆಪ್",
    "monthOct": "ಅಕ್ಟೋ",
    "monthNov": "ನವೆಂ",
    "monthDec": "ಡಿಸೆಂ",
    "theftRobbery": "ಕಳ್ಳತನ / ದರೋಡೆ",
    "burglary": "ಮನೆಗಳ್ಳತನ",
    "vehicleTheft": "ವಾಹನ ಕಳ್ಳತನ",
    "cybercrime": "ಸೈಬರ್ ಅಪರಾಧ",
    "assault": "ದೌರ್ಜನ್ಯ / ಹಲ್ಲೆ",
    "otherCrime": "ಇತರ",
    "theftBurglary": "ಕಳ್ಳತನ / ಮನೆಗಳ್ಳತನ",
    "cyberFraud": "ಸೈಬರ್ ವಂಚನೆ",
    "assaultViolence": "ಹಲ್ಲೆ / ಹಿಂಸಾಚಾರ",
    "urgentSightingAlert": "ನಿಮ್ಮ ಠಾಣೆಗೆ ತುರ್ತು ದೃಶ್ಯ ಎಚ್ಚರಿಕೆ",
    "sightingNotice": "ನಿಮ್ಮ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸಕ್ರಿಯ ಶಂಕಿತರಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ದೃಶ್ಯವನ್ನು ನಾಗರಿಕರೊಬ್ಬರು ವರದಿ ಮಾಡಿದ್ದಾರೆ. ಸಾಕ್ಷ್ಯ ಪರಿಶೀಲಿಸಿ.",
    "openDispatchPortal": "ರವಾನೆ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ",
    "scrbBanner": "ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆಗಳ ಬ್ಯೂರೋ",
    "startInvestigation": "ತನಿಖೆ ಪ್ರಾರಂಭಿಸಿ",
    "liveCitizenFeed": "ಲೈವ್ ನಾಗರಿಕ ತುರ್ತು ಘಟನೆಗಳ ಫೀಡ್",
    "stationAlerts": "ಠಾಣಾ ಎಚ್ಚರಿಕೆಗಳು",
    "noActiveReports": "ಇಂದು ಯಾವುದೇ ಸಕ್ರಿಯ ನಾಗರಿಕ ಘಟನಾ ವರದಿಗಳಿಲ್ಲ.",
    "location": "ಸ್ಥಳ",
    "status": "ಸ್ಥಿತಿ",
    "incidentDescription": "ಘಟನೆಯ ವಿವರಣೆ:",
    "suspectMatchDetected": "ಶಂಕಿತರ ಹೊಂದಾಣಿಕೆ ಪತ್ತೆಯಾಗಿದೆ:",
    "viewFullReport": "ಸಂಪೂರ್ಣ ವರದಿ ಮತ್ತು ಶಂಕಿತ ಹೊಂದಾಣಿಕೆ ವೀಕ್ಷಿಸಿ",
    "dispatchPatrol": "ಗಸ್ತು ರವಾನಿಸಿ",
    "patrolDispatched": "ಗಸ್ತು ರವಾನಿಸಲಾಗಿದೆ",
    "thirteenCapabilities": "೧೩ ಸಾಮರ್ಥ್ಯಗಳು",
    "coreSolutions": "ಮುಖ್ಯ ಅಪರಾಧ ಗುಪ್ತಚರ ಪರಿಹಾರಗಳು (೧೧ ಸಾಮರ್ಥ್ಯಗಳು)",
    "governanceModules": "ವ್ಯವಸ್ಥೆಯ ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಆಡಳಿತ ಮಾಡ್ಯೂಲ್‌ಗಳು (೨ ಸಾಮರ್ಥ್ಯಗಳು)",
    "launch": "ಪ್ರಾರಂಭಿಸಿ",
    "incidentDossier": "ಘಟನಾ ಕಡತ",
    "jurisdictionalStation": "ವ್ಯಾಪ್ತಿಯ ಪೊಲೀಸ್ ಠಾಣೆ",
    "loggedTime": "ದಾಖಲಾದ ಸಮಯ",
    "currentStatus": "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ",
    "citizenNarrative": "ನಾಗರಿಕ ವಿವರಣೆ ಮತ್ತು ಘಟನೆಯ ವಿವರಗಳು",
    "attachedEvidence": "ಲಗತ್ತಿಸಲಾದ ಸಾಕ್ಷ್ಯ ಪೇಲೋಡ್",
    "photo": "ಭಾವಚಿತ್ರ",
    "citizenEvidenceDesc": "ಘಟನಾ ಉಲ್ಲೇಖಕ್ಕೆ ಲಿಂಕ್ ಮಾಡಲಾದ ನಾಗರಿಕ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಸಾಕ್ಷ್ಯ ಕಡತ.",
    "autoMatchResult": "ಸಮಾನಾಂತರ ಎಐ ಶಂಕಿತರ ಸ್ವಯಂ-ಹೊಂದಾಣಿಕೆ ಫಲಿತಾಂಶ",
    "match": "ಹೊಂದಾಣಿಕೆ",
    "viewSuspectDossier": "ಶಂಕಿತರ ಕಡತ ವೀಕ್ಷಿಸಿ",
    "facialMatchDesc": "ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರದ ಚೌಕಟ್ಟನ್ನು ಆಧರಿಸಿ ಮುಖದ ಜ್ಯಾಮಿತೀಯ ಹೊಂದಾಣಿಕೆ.",
    "coreIntelligence": "ಮುಖ್ಯ ಗುಪ್ತಚರ",
    "governanceAndAudit": "ಆಡಳಿತ ಮತ್ತು ಲೆಕ್ಕಪರಿಶೋಧನೆ",
    "twelveMonthCrimeTrend": "೧೨ ತಿಂಗಳ ಅಪರಾಧ ಪ್ರವೃತ್ತಿ (ಪ್ರಕರಣಗಳ ಪ್ರಮಾಣ)",
    "casesRegistered": "ದಾಖಲಾದ ಪ್ರಕರಣಗಳು",
    "crimeCategoryDistribution": "ಅಪರಾಧ ವರ್ಗವಾರು ವಿತರಣೆ",
    "crimeVolumeComparison": "ಜಿಲ್ಲಾವಾರು ಅಪರಾಧ ಪ್ರಮಾಣದ ಹೋಲಿಕೆ",
    "seasonalCrimeActivity": "ಕಾಲೋಚಿತ ಅಪರಾಧ ಚಟುವಟಿಕೆ (ತ್ರೈಮಾಸಿಕ)",
    "twoHoursAgo": "೨ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "fiveHoursAgo": "೫ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "nineHoursAgo": "೯ ಗಂಟೆಗಳ ಹಿಂದೆ",
    "oneDayAgo": "೧ ದಿನದ ಹಿಂದೆ",
    "fiveMinutesAgo": "೫ ನಿಮಿಷಗಳ ಹಿಂದೆ",
    "twelveMinutesAgo": "೧೨ ನಿಮಿಷಗಳ ಹಿಂದೆ",
    "oneHourAgo": "೧ ಗಂಟೆಯ ಹಿಂದೆ",
    "openStatus": "ತೆರೆದಿದೆ",
    "underInvestigation": "ತನಿಖೆಯಲ್ಲಿದೆ",
    "chargesheeted": "ದೋಷಾರೋಪಣೆ ಸಲ್ಲಿಸಲಾಗಿದೆ",
    "closedStatus": "ಮುಕ್ತಾಯಗೊಂಡಿದೆ",
    "rising": "ಹೆಚ್ಚುತ್ತಿದೆ",
    "declining": "ಇಳಿಕೆಯಾಗುತ್ತಿದೆ",
    "stable": "ಸ್ಥಿರ",
    "loadingTrendAnalytics": "ಪ್ರವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "trendsAnalytics": "ಪ್ರವೃತ್ತಿಗಳ ವಿಶ್ಲೇಷಣೆ",
    "officialCrimeDataSource": "ಅಧಿಕೃತ ಅಪರಾಧ ದತ್ತಾಂಶ ಮೂಲವನ್ನು ಉಲ್ಲೇಖಿಸಲಾಗಿದೆ",
    "aiConfidence": "ಎಐ ವಿಶ್ವಾಸಾರ್ಹತೆ",
    "audit": "ಆಡಿಟ್",
    "stopSpeaking": "ನಿಲ್ಲಿಸಿ",
    "speak": "ಮಾತನಾಡಿ",
    "hideReasoning": "ಎಐ ತಾರ್ಕಿಕ ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ",
    "showReasoning": "ವಿವರಣಾತ್ಮಕ ಎಐ: ತಾರ್ಕಿಕ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "reasoningBullet1": "ಕ್ಯಾಟಲಿಸ್ಟ್ ನೋಎಸ್ಕ್ಯೂಎಲ್‌ನಲ್ಲಿ ೧,೦೦೦ ಜೆಎಸ್ಒಎನ್ ದಾಖಲೆಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗಿದೆ.",
    "reasoningBullet2": "ಕ್ಲಾಡ್ ಎಪಿಐ ಪ್ರಮುಖ ಪದಗಳ ಹೊಂದಾಣಿಕೆ ಬಳಸಿ ವೆಕ್ಟರ್‌ಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಲಾಗಿದೆ.",
    "reasoningBullet3": "ನಿರ್ದಿಷ್ಟ ಅಪರಾಧ ವಿಧಾನಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ದಾಖಲೆಗಳನ್ನು ಹೊರತೆಗೆಯಲಾಗಿದೆ.",
    "reasoningBullet4": "ಉಲ್ಲೇಖಗಳನ್ನು ಸಾಮಾನ್ಯ ಎಸ್‌ಸಿಆರ್‌ಬಿ ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಡೇಟಾಬೇಸ್ ಯೋಜನೆಗಳಿಗೆ ಹೊಂದಿಸಲಾಗಿದೆ.",
    "intelligenceCommandSuggestions": "ಇಂಟೆಲಿಜೆನ್ಸ್ ಕಮಾಂಡ್ ಸಲಹೆಗಳು",
    "roleInvestigator": "ತನಿಖಾಧಿಕಾರಿ",
    "roleAnalyst": "ವಿಶ್ಲೇಷಕ",
    "roleSupervisor": "ಮೇಲ್ವಿಚಾರಕ",
    "rolePolicymaker": "ನೀತಿ ನಿರೂಪಕ",
    "roleCitizen": "ನಾಗರಿಕ",
    "simulationRole": "ಸಿಮ್ಯುಲೇಶನ್ ಪಾತ್ರ",
    "pendingPatrolDispatch": "ಗಸ್ತು ರವಾನೆ ಬಾಕಿಯಿದೆ",
    "pendingInvestigation": "ತನಿಖೆ ಮತ್ತು ಗಸ್ತು ರವಾನೆ ಬಾಕಿಯಿದೆ",
    "patrolDispatchedLogged": "ಗಸ್ತು ರವಾನಿಸಲಾಗಿದೆ ಮತ್ತು ಠಾಣೆಯಲ್ಲಿ ದಾಖಲಾಗಿದೆ",
    "pendingVerification": "ಪರಿಶೀಲನೆ ಬಾಕಿಯಿದೆ",
    "incidentSnatchingDoubleRoad": "ಇಬ್ಬರು ಮೋಟಾರ್‌ಸೈಕಲ್ ಸವಾರರಿಂದ ಚಿನ್ನದ ಸರ ಕಳವು. ಆರೋಪಿಗಳು ಡಬಲ್ ರಸ್ತೆಯ ಕಡೆಗೆ ಪರಾರಿಯಾಗಿದ್ದಾರೆ.",
    "incidentBagSnatchingGate": "ಪ್ರವೇಶ ದ್ವಾರದ ಬಳಿ ಕಪ್ಪು ಪಲ್ಸರ್ ಮೋಟಾರ್‌ಸೈಕಲ್‌ನಲ್ಲಿ ಬಂದ ೨ ಶಂಕಿತರಿಂದ ಬ್ಯಾಗ್ ಕಸಿದುಕೊಳ್ಳಲಾಗಿದೆ ಎಂದು ನಾಗರಿಕರು ವರದಿ ಮಾಡಿದ್ದಾರೆ.",
    "incidentOtpScamBank": "ಒಟಿಪಿ ವಂಚನೆ ವಹಿವಾಟು ವರದಿಯಾಗಿದೆ. ಬ್ಯಾಂಕಿಂಗ್ ಪೋರ್ಟಲ್‌ನಿಂದ ₹೪೫,೦೦೦ ಅನಧಿಕೃತ ಡೆಬಿಟ್.",
    "incidentOtpChallanGateway": "ಕೆಎಸ್‌ಪಿ ಟ್ರಾಫಿಕ್ ಚಲನ್ ಗೇಟ್‌ವೇ ಎಂದು ಹೇಳಿಕೊಳ್ಳುವ ಅನುಮಾನಾಸ್ಪದ ಒಟಿಪಿ ಸಂಗ್ರಹ ಕರೆ.",
    "contactNumber": "ಸಂಪರ್ಕ",
    "anonymousReport": "ಅನಾಮಧೇಯ ವರದಿ",
    "forecastSpikeBangalore": "ಬೆಂಗಳೂರು ನಗರ — ಕಾಲೋಚಿತ ಮದುವೆ ಮತ್ತು ಮಾನ್ಸೂನ್ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ಮುಂದಿನ ೩೦ ದಿನಗಳಲ್ಲಿ ಕಳ್ಳತನ ಶೇ. ೪೦ ರಷ್ಟು ಹೆಚ್ಚಾಗುವ ಮುನ್ಸೂಚನೆ ಇದೆ. ಬೀಟ್ ಗಸ್ತು ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
    "forecastGangTracker": "ನೆಟ್‌ವರ್ಕ್-ಆಲ್ಫಾ ಗ್ಯಾಂಗ್ ಚಟುವಟಿಕೆ: ಎಚ್‌ಎಸ್‌ಆರ್ ಕಳ್ಳತನ ಗುಂಪಿನ ೩ ಸದಸ್ಯರು ಇತ್ತೀಚೆಗೆ ಮೈಸೂರು ಜಿಲ್ಲೆಯಲ್ಲಿ ಸಕ್ರಿಯರಾಗಿದ್ದಾರೆ. ಕುವೆಂಪುನಗರ ಪೊಲೀಸ್ ಠಾಣೆಗೆ ಅಂತರ-ವ್ಯಾಪ್ತಿ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ.",
    "forecastResourceDeployment": "ಮುನ್ನೆಚ್ಚರಿಕೆ ಶಿಫಾರಸು: ಪ್ರತಿದಿನ ೧೮:೦೦ ರಿಂದ ೨೨:೦೦ ಗಂಟೆಯ ನಡುವೆ ಕೆಆರ್ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಸಂಕೀರ್ಣಗಳ ಬಳಿ ಹೆಚ್ಚುವರಿ ಗಸ್ತು ವಾಹನಗಳನ್ನು ನಿಯೋಜಿಸಿ.",
    "genderMale": "ಪುರುಷ",
    "genderFemale": "ಮಹಿಳೆ",
    "genderOther": "ಇತರ",
    "socioEconomicTitle": "ಸಾಮಾಜಿಕ-ಆರ್ಥಿಕ ಮತ್ತು ಸಮಾಜಶಾಸ್ತ್ರೀಯ ಅಪರಾಧ ಸಂಬಂಧಗಳು",
    "sociologicalBriefingTitle": "ಸಮಾಜಶಾಸ್ತ್ರೀಯ ವಿಶ್ಲೇಷಣಾ ವಿವರಣೆ",
    "sociologicalBriefingText": "ತಾಲ್ಲೂಕು ಜನಗಣತಿ ವಿವರಗಳ ವಿರುದ್ಧ ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಅಪರಾಧ ದಾಖಲೆಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿದಾಗ, ಹೆಚ್ಚಿನ ನಗರ ವಲಸೆ ಮತ್ತು ನಿರುದ್ಯೋಗ ದರ ಹೊಂದಿರುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಆಸ್ತಿ ಅಪರಾಧಗಳು ೨.೭ ಪಟ್ಟು ಹೆಚ್ಚಾಗಿರುವುದು ಕಂಡುಬಂದಿದೆ.",
    "criminologyActionPolicy": "ಅಪರಾಧಶಾಸ್ತ್ರ ಕಾರ್ಯಾಚರಣೆ ನೀತಿ:",
    "criminologyActionPolicyText": "ವಾಣಿಜ್ಯ ಮದ್ಯದ ಮಳಿಗೆಗಳು ಮತ್ತು ತೀವ್ರ ವಲಸೆ ವಿಸ್ತರಣೆ ಹೊಂದಿರುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸ್ಥಳೀಯ ಬೀಟ್ ಜಾಲಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಆದ್ಯತೆ ನೀಡಿ.",
    "selectCaseFile": "ಪ್ರಕರಣದ ಕಡತವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "caseBriefSummary": "ಪ್ರಕರಣದ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ",
    "similarCaseFinder": "ಹೋಲುವ ಪ್ರಕರಣಗಳ ಶೋಧಕ",
    "suggestedLeads": "ಸೂಚಿಸಲಾದ ತನಿಖಾ ಸುಳಿವುಗಳು",
    "similarCaseAnalytics": "ಹೋಲುವ ಪ್ರಕರಣಗಳ ವಿಶ್ಲೇಷಣೆ",
    "quickMlModelActive": "ಕ್ಯಾಟಲಿಸ್ಟ್ ಕ್ವಿಕ್‌ಎಂಎಲ್ ಮಾಡೆಲ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    "moDaytimeHousebreaking": "ನಕಲಿ ಕೀ ಬಳಸಿ ಹಗಲು ವೇಳೆಯ ಮನೆಗಳ್ಳತನ",
    "moNightHousebreaking": "ಕಿಟಕಿಯ ಸರಳುಗಳನ್ನು ಸಡಿಲಿಸಿ ರಾತ್ರಿ ವೇಳೆ ಮನೆಗಳ್ಳತನ",
    "moChainSnatching": "ಪಲ್ಸರ್ ಬೈಕ್‌ನಲ್ಲಿ ಹಿಂಬದಿ ಸವಾರನಿಂದ ಪಾದಚಾರಿಗಳ ಚಿನ್ನದ ಸರ ಕಳವು",
    "moPeddlingDrugs": "ಕಾಲೇಜು ಕ್ಯಾಂಪಸ್‌ಗಳ ಬಳಿ ಸಿಂಥೆಟಿಕ್ ಡ್ರಗ್ಸ್ (ಎಂಡಿಎಂಎ) ಮಾರಾಟ",
    "moAtmSkimming": "ಪ್ರತ್ಯೇಕ ಎಟಿಎಂ ಕಿಯೋಸ್ಕ್‌ಗಳಲ್ಲಿ ಎಟಿಎಂ ಕಾರ್ಡ್ ಸ್ಕಿಮ್ಮಿಂಗ್",
    "moHighwayInterception": "ರಾತ್ರಿ ವೇಳೆಯಲ್ಲಿ ಹೆದ್ದಾರಿ ವಾಹನಗಳನ್ನು ತಡೆದು ಸುಲಿಗೆ",
    "moWhatsappFraud": "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಆನ್‌ಲೈನ್ ಹೂಡಿಕೆ ವಂಚನೆ",
    "moPickpocketing": "ರಶ್ ಸಮಯದಲ್ಲಿ ಬಸ್ ನಿಲ್ದಾಣಗಳ ಬಳಿ ಜೇಬುಗಳ್ಳತನ",
    "moVishingLottery": "ನಕಲಿ ಲಾಟರಿ ಗೆಲುವಿನ ಹೆಸರಿನಲ್ಲಿ ಒಟಿಪಿ ವಂಚನೆ ಕರೆ",
    "moPersonalEnmity": "ಹಳೆಯ ವೈಷಮ್ಯದಿಂದ ಹರಿತವಾದ ಆಯುಧದಿಂದ ಹಲ್ಲೆ",
    "moStreetBrawl": "ಪಾರ್ಕಿಂಗ್ ಗಲಾಟೆಯಿಂದ ಉಂಟಾದ ಸಾರ್ವಜನಿಕ ಬೀದಿ ಜಗಳ",
    "moKidnappingOmni": "ಮಾರುತಿ ಓಮ್ನಿ ವ್ಯಾನ್ ಬಳಸಿ ಹಣಕ್ಕಾಗಿ ಅಪ್ರಾಪ್ತರ ಅಪಹರಣ",
    "moVehicleTheftMasterKey": "ಮಾಲ್ ಪಾರ್ಕಿಂಗ್‌ನಲ್ಲಿ ಮಾಸ್ಟರ್ ಕೀ ಬಳಸಿ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳವು",
    "moJobPlacementFraud": "ಸರ್ಕಾರಿ ಉದ್ಯೋಗ ಕೊಡಿಸುವುದಾಗಿ ನಗದು ಪಡೆದು ವಂಚನೆ",
    "moDowryHarassment": "ವರದಕ್ಷಿಣೆ ಕಿರುಕುಳದಿಂದ ಸಂಶಯಾಸ್ಪದ ಸಾವು",
    "triggerParappanaJail": "೪೫ ದಿನಗಳ ಹಿಂದೆ ಪರಪ್ಪನ ಅಗ್ರಹಾರ ಕೇಂದ್ರ ಕಾರಾಗೃಹದಿಂದ ಬಿಡುಗಡೆ",
    "triggerReleased15Days": "೧೫ ದಿನಗಳ ಹಿಂದೆ ನ್ಯಾಯಾಂಗ ಬಂಧನದಿಂದ ಬಿಡುಗಡೆ",
    "triggerTwoAssociates": "ಅದೇ ಜಿಲ್ಲೆಯಲ್ಲಿ ಇಬ್ಬರು ಪರಿಚಿತ ಸಹಚರರು ಇತ್ತೀಚೆಗೆ ಸಕ್ರಿಯರಾಗಿದ್ದಾರೆ",
    "triggerMonsoonPattern": "ಮಾನ್ಸೂನ್ ಮತ್ತು ಹಬ್ಬದ ಋತುವಿನಲ್ಲಿ ಅಪರಾಧ ಮಾಡುವ ಐತಿಹಾಸಿಕ ಮಾದರಿ",
    "triggerUnemployment": "ಸ್ಥಳೀಯ ಪ್ರದೇಶದಲ್ಲಿ ಹೆಚ್ಚಿನ ನಿರುದ್ಯೋಗ ಮತ್ತು ಆರ್ಥಿಕ ಸಂಕಷ್ಟ",
    "triggerReconnectCoaccused": "ಹಿಂದಿನ ಸಹ-ಆರೋಪಿಗಳೊಂದಿಗೆ ತಕ್ಷಣ ಮರುಸಂಪರ್ಕ",
    "triggerPhoneCallsSuspects": "ಶಂಕಿತರು ಮತ್ತು ಬೇಕಾಗಿರುವ ವ್ಯಕ್ತಿಗಳೊಂದಿಗೆ ಸಕ್ರಿಯ ಫೋನ್ ಸಂಪರ್ಕ",
    "triggerFinancialDistress": "ತೀವ್ರ ಆರ್ಥಿಕ ಸಂಕಷ್ಟ ಮತ್ತು ಸಾಲಗಾರರೊಂದಿಗೆ ತೀರದ ಸಾಲ",
    "triggerLockedHouses": "ಮದುವೆ ಋತುವಿನಲ್ಲಿ ಬೀಗ ಹಾಕಿದ ಮನೆಗಳನ್ನು ಗುರಿಯಾಗಿಸುವ ಮಾದರಿ",
    "triggerAssociatingHighRisk": "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಪುನರಾವರ್ತಿತ ಅಪರಾಧಿಗಳೊಂದಿಗೆ ನಿರಂತರ ಒಡನಾಟ",
    "triggerUnstableAddress": "ಅಸ್ಥಿರ ವಸತಿ ವಿಳಾಸ ಅಥವಾ ವಲಸೆ ಕಾರ್ಮಿಕರ ಸಂಚಾರ",
    "triggerPriorConviction": "ಹಿಂದೆ ಇದೇ ರೀತಿಯ ಅಪರಾಧ ಮತ್ತು ವಿಧಾನಕ್ಕಾಗಿ ಶಿಕ್ಷೆ",
    "triggerHotspotVisits": "ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್ ಪ್ರದೇಶಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆಗಳಿಗೆ ಆಗಾಗ್ಗೆ ಭೇಟಿ",
    "triggerVehicleAccess": "ಅಪರಾಧಗಳಲ್ಲಿ ಬಳಸಲಾಗುವ ನೋಂದಾಯಿತ ವಾಹನದ ಲಭ್ಯತೆ",
    "triggerMdmaTrafficking": "ಸಿಂಥೆಟಿಕ್ ಡ್ರಗ್ಸ್ (ಎಂಡಿಎಂಎ) ಕಳ್ಳಸಾಗಣೆಯ ಹಿಂದಿನ ಇತಿಹಾಸ",
    "triggerHostelSupply": "ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿ ಹಾಸ್ಟೆಲ್‌ಗಳ ಬಳಿ ಸಕ್ರಿಯ ಮಾದಕದ್ರವ್ಯ ಜಾಲ",
    "triggerEncryptedApp": "ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಮೆಸೇಜಿಂಗ್ ಆ್ಯಪ್ ಚಟುವಟಿಕೆ ಹೆಚ್ಚಳ ಪತ್ತೆ",
    "secureCaseBrief": "ಸುರಕ್ಷಿತ ಪ್ರಕರಣದ ಸಂಕ್ಷಿಪ್ತ ವಿವರ",
    "investigationOfficer": "ತನಿಖಾಧಿಕಾರಿ (IO)",
    "legalCitation": "ಕಾನೂನು ವಿಭಾಗದ ಉಲ್ಲೇಖ",
    "summaryDescription": "ಸಾರಾಂಶ ವಿವರಣೆ",
    "moNotes": "ವಿಧಾನ ಸಹಿ ಟಿಪ್ಪಣಿಗಳು (MO)",
    "severity": "ತೀವ್ರತೆ",
    "critical": "ನಿರ್ಣಾಯಕ",
    "similarCasesMatchIntro": "ಗುಣಲಕ್ಷಣ ಹೊಂದಾಣಿಕೆಯು ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿನ ಕೆಳಗಿನ ಪ್ರಕರಣಗಳು ಒಂದೇ ರೀತಿಯ ವಿಧಾನ ಸಹಿ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹಂಚಿಕೊಂಡಿವೆ ಎಂದು ತೋರಿಸುತ್ತದೆ:",
    "noSimilarCases": "ಈ ಜಿಲ್ಲಾ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಯಾವುದೇ ರೀತಿಯ ಅಪರಾಧ ಸಹಿಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.",
    "suggestedLeadsIntro": "ಆರೋಪಿಯ ಸಹ-ಆರೋಪಿಗಳ ಅಪರಾಧ ಮ್ಯಾಪಿಂಗ್ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸ್ಥಳಗಳ ಆಧಾರದ ಮೇಲೆ, ಸಿಸ್ಟಮ್ ಈ ಕೆಳಗಿನ ಆದ್ಯತೆಯ ಸುಳಿವುಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ:",
    "leadFinancialPattern": "ಈ ಬೀಟ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲಾದ ಇತರ ಸಕ್ರಿಯ ಖಾತೆಗಳೊಂದಿಗೆ ಹಣಕಾಸಿನ ಲಿಂಕ್ ಮಾದರಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    "leadSharedLocation": "ಮುಖ್ಯ ಶಂಕಿತ ಸಹ-ಆರೋಪಿಗಳಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿದ ಹಂಚಿಕೆಯ ಸ್ಥಳ ನೋಡ್‌ಗಳನ್ನು ತನಿಖೆ ಮಾಡಿ.",
    "leadCdrAnalysis": "ಅಪರಾಧ ನಡೆದ ಸಮಯದಲ್ಲಿ ವೃತ್ತ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಶಂಕಿತರ ಕರೆ ವಿವರಗಳ ದಾಖಲೆಗಳನ್ನು (ಸಿಡಿಆರ್) ಪರಿಶೀಲಿಸಿ.",
    "summaryFirGoldOrnaments": "ಹಗಲಿನ ವೇಳೆಯಲ್ಲಿ ಮನೆಯಿಂದ ರೂ. ೧.೫ ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನಾಭರಣಗಳನ್ನು ಕಳವು ಮಾಡಲಾಗಿದೆ ಎಂದು ದೂರುದಾರರು ವರದಿ ಮಾಡಿದ್ದಾರೆ. ನಕಲಿ ಕೀ ಬಳಸಿ ಪ್ರವೇಶ ಪಡೆಯಲಾಗಿದೆ. ಸಿಸಿಟಿವಿ ವಿಶ್ಲೇಷಣೆಯಿಂದ ಶಂಕಿತ ರಾಜು ಕೆ. ಗುರುತಿಸಲಾಗಿದೆ.",
    "summaryFirWindowGrills": "ರಾತ್ರಿ ವೇಳೆ ಬೀಗ ಹಾಕಿದ್ದ ಮನೆಯ ಅಡುಗೆ ಮನೆಯ ಕಿಟಕಿಯ ಕಬ್ಬಿಣದ ಸರಳುಗಳನ್ನು ಸಡಿಲಿಸಿ ರೂ. ೩ ಲಕ್ಷ ನಗದು ಮತ್ತು ಬೆಳ್ಳಿ ವಸ್ತುಗಳನ್ನು ದೋಚಲಾಗಿದೆ. ಇಬ್ಬರು ವ್ಯಕ್ತಿಗಳನ್ನು ನೋಡಿದ್ದಾಗಿ ನೆರೆಹೊರೆಯವರು ತಿಳಿಸಿದ್ದಾರೆ.",
    "summaryFirOtpVishing": "ಬ್ಯಾಂಕ್ ಮ್ಯಾನೇಜರ್ ಎಂದು ಹೇಳಿಕೊಂಡ ಅಪರಿಚಿತ ವ್ಯಕ್ತಿಯಿಂದ ಸಂತ್ರಸ್ತರಿಗೆ ಕರೆ ಬಂದಿತ್ತು. ಖಾತೆ ನವೀಕರಣದ ನೆಪದಲ್ಲಿ ನೆಟ್ ಬ್ಯಾಂಕಿಂಗ್ ಒಟಿಪಿ ಪಡೆದು ರೂ. ೪೯,೮೦೦ ಅನಧಿಕೃತ ವರ್ಗಾವಣೆ ಮಾಡಲಾಗಿದೆ.",
    "summaryFirPulsarSnatching": "ದೂರುದಾರರು ಸ್ಥಳೀಯ ದೇವಸ್ಥಾನದಿಂದ ಹಿಂತಿರುಗುತ್ತಿದ್ದಾಗ, ಕಪ್ಪು ಪಲ್ಸರ್ ಬೈಕ್‌ನಲ್ಲಿ ಬಂದ ಇಬ್ಬರು ಸವಾರರು ಹಿಂದಿನಿಂದ ಬಂದು ೪೦ ಗ್ರಾಂ ತೂಕದ ಚಿನ್ನದ ಮಾಂಗಲ್ಯ ಸರವನ್ನು ಕಸಿದುಕೊಂಡು ಪರಾರಿಯಾಗಿದ್ದಾರೆ.",
    "summaryFirMdmaRaid": "ಖಚಿತ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ದಾಳಿ ನಡೆಸಲಾಯಿತು. ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾರಾಟ ಮಾಡಲು ೧೫ ಗ್ರಾಂ ಎಂಡಿಎಂಎ ಸಿಂಥೆಟಿಕ್ ಡ್ರಗ್ಸ್ ಹೊಂದಿದ್ದ ಆರೋಪಿಗಳಾದ ಇಮ್ರಾನ್ ಖಾನ್ ಮತ್ತು ಫಾತಿಮಾ ಬಿ. ಅವರನ್ನು ಬಂಧಿಸಲಾಗಿದೆ.",
    "summaryFirGeneric": "ದಾಖಲಾದ ಅಪರಾಧಕ್ಕಾಗಿ ವಿವರವಾದ ತನಿಖಾ ವರದಿ. ಸಾರ್ವಜನಿಕ ಪ್ರದೇಶದ ಬಳಿ ಘಟನೆ ನಡೆದಿದೆ. ವಿಧಾನ ಸಹಿ ಹಿಂದಿನ ಮಾದರಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ. ಸೂಕ್ತ ಕಾನೂನು ಕಾಯ್ದೆಗಳ ಅಡಿಯಲ್ಲಿ ಪ್ರಕರಣ ದಾಖಲಿಸಲಾಗಿದೆ.",
    "transactionTransfer": "ವರ್ಗಾವಣೆ",
    "transactionWithdrawal": "ಹಿಂಪಡೆಯುವಿಕೆ",
    "transactionDeposit": "ಠೇವಣಿ",
    "transactionStructured": "ರಚನಾತ್ಮಕ ಲೇಯರಿಂಗ್",
    "structuringWarningTitle": "ವ್ಯವಸ್ಥಿತ ವಹಿವಾಟು ಎಚ್ಚರಿಕೆ (IT ಕಾಯ್ದೆ / BNS)",
    "structuringWarningDesc": "ಈ ವಹಿವಾಟು ವ್ಯವಸ್ಥಿತ ಲೇಯರಿಂಗ್ ಲಕ್ಷಣಗಳನ್ನು ತೋರಿಸುತ್ತದೆ. ₹50,000 (ಪ್ಯಾನ್ ಮಿತಿ) ಕ್ಕಿಂತ ಕಡಿಮೆ ಮೊತ್ತವನ್ನು 24 ಗಂಟೆಗಳಲ್ಲಿ ಅನುಕ್ರಮವಾಗಿ ವರ್ಗಾಯಿಸಲಾಗಿದೆ. ಸೈಬರ್ ಅಪರಾಧ/ಮಾದಕವಸ್ತು ಗಳಿಕೆಯ ಲೇಯರಿಂಗ್ ಸಂಭವನೀಯತೆ ಇದೆ.",
    "standardTransactionDesc": "ಸಾಮಾನ್ಯ ವಹಿವಾಟು ಮಾರ್ಗ. ಈ ನೋಡ್ ಅನುಕ್ರಮಕ್ಕೆ ಯಾವುದೇ ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆಗಳು ಪ್ರಚೋದಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
    "planABaseline": "ಯೋಜನೆ ಎ (ಮೂಲ ಕಾರ್ಯತಂತ್ರ)",
    "planBContingency": "ಯೋಜನೆ ಬಿ (ತುರ್ತು ಸನ್ನದ್ಧ ಕಾರ್ಯತಂತ್ರ)",
    "planComparison": "ಯೋಜನೆ ಎ ಮತ್ತು ಯೋಜನೆ ಬಿ ಹೋಲಿಕೆ",
    "mapInteractionHint": "ಘಟಕ ಕಾರ್ಡ್‌ಗಳನ್ನು ನಕ್ಷೆಯ ಮೇಲೆ ಎಳೆಯಿರಿ • ಸ್ಥಾನ ಬದಲಾಯಿಸಲು ಮಾರ್ಕರ್‌ಗಳನ್ನು ಎಳೆಯಿರಿ • ತೆಗೆದುಹಾಕಲು ಮಾರ್ಕರ್ ಕ್ಲಿಕ್ ಮಾಡಿ",
    "cost": "ವೆಚ್ಚ",
    "radius": "ವ್ಯಾಪ್ತಿ",
    "add": "ಸೇರಿಸಿ",
    "unitsPlaced": "ನಿಯೋಜಿಸಲಾದ ಘಟಕಗಳು",
    "pointsAvailable": "ಅಂಕಗಳು ಲಭ್ಯವಿದೆ",
    "budgetMaxCapacity": "⚠️ ಗರಿಷ್ಠ ಬಜೆಟ್ ಮಿತಿ ತಲುಪಿದೆ",
    "quickPresets": "ತ್ವರಿತ ಪೂರ್ವನಿಗದಿಗಳು",
    "presetMinimal": "ಕನಿಷ್ಠ",
    "presetStandard": "ಸಾಮಾನ್ಯ",
    "presetFestival": "ಉತ್ಸವ",
    "presetMonsoon": "ಮಳೆಗಾಲ",
    "accessPointsSecured": "ಪ್ರವೇಶ ದ್ವಾರಗಳು: {0} / {1} ಸುರಕ್ಷಿತವಾಗಿದೆ",
    "targetSla": "ಗುರಿ ಎಸ್‌ಎಲ್‌ಎ: < ೪.೦ ನಿಮಿಷ",
    "apsCovered": "{0}/4 ಪ್ರವೇಶ ದ್ವಾರಗಳು ವ್ಯಾಪ್ತಿಯಲ್ಲಿವೆ",
    "tacticalRecommendation": "ಕಾರ್ಯಾಚರಣಾ ಶಿಫಾರಸು:",
    "comparativeMetricsChart": "ತುಲನಾತ್ಮಕ ಮಾಪನಗಳ ಚಾರ್ಟ್",
    "deploymentParameter": "ನಿಯೋಜನೆ ನಿಯತಾಂಕ / ಮಾಪನ",
    "secured": "ಸುರಕ್ಷಿತವಾಗಿದೆ",
    "exposed": "ಅಸುರಕ್ಷಿತವಾಗಿದೆ",
    "coveredByUnitRadius": "✅ ಸಕ್ರಿಯ ಘಟಕದ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ",
    "noTacticalCoverage": "⚠️ ಯಾವುದೇ ಘಟಕದ ವ್ಯಾಪ್ತಿಯಲ್ಲಿಲ್ಲ",
    "coverageRadius": "ವ್ಯಾಪ್ತಿ ತ್ರಿಜ್ಯ",
    "removeUnit": "ಘಟಕ ತೆಗೆದುಹಾಕಿ",
    "dropUnitHint": "ಘಟಕವನ್ನು ನಕ್ಷೆಯ ಮೇಲೆ ನಿಖರ ಸ್ಥಳದಲ್ಲಿ ಬಿಡಿ",
    "varianceImpact": "ವ್ಯತ್ಯಾಸ / ಪರಿಣಾಮ",
    "compareDesc": "ಯೋಜನೆ ಎ (ಮೂಲ) ಮತ್ತು ಯೋಜನೆ ಬಿ (ತುರ್ತು ಸನ್ನದ್ಧತೆ) ನಡುವಿನ ಸ್ಥಳೀಯ ಹೊಂದಾಣಿಕೆಗಳು ಮತ್ತು ಅಪಾಯದ ವ್ಯತ್ಯಾಸಗಳನ್ನು ನೈಜ ನಕ್ಷೆಯಲ್ಲಿ ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ.",
    "simulationGuardrailText": "ಕಟ್ಟುನಿಟ್ಟಾದ ನಿಯಮಾವಳಿ: ಘಟಕಗಳು ಭೌಗೋಳಿಕ ವಲಯವನ್ನು ಮಾತ್ರ ರಕ್ಷಿಸುತ್ತವೆ, ಯಾವುದೇ ನಿರ್ದಿಷ್ಟ ವ್ಯಕ್ತಿಯನ್ನಲ್ಲ. ಯಾವುದೇ ಸ್ವಾಯತ್ತ ಚಲನೆ ಅಥವಾ ದಾಳಿ ಇರುವುದಿಲ್ಲ. ಈ ಸಿಮ್ಯುಲೇಶನ್ ಕೇವಲ ಪ್ರದೇಶದ ಸುರಕ್ಷತಾ ಅಪಾಯವನ್ನು ನಿರ್ಣಯಿಸುತ್ತದೆ.",
    "personnelUnitsBudget": "ಸಿಬ್ಬಂದಿ ಘಟಕಗಳು ಮತ್ತು ಬಜೆಟ್ ವೆಚ್ಚ",
    "accessPointsSecuredLabel": "ಸುರಕ್ಷಿತಗೊಳಿಸಲಾದ ಪ್ರವೇಶ ದ್ವಾರಗಳು",
    "coverageRiskIndexLabel": "ವ್ಯಾಪ್ತಿಯ ಅಪಾಯದ ಸೂಚ್ಯಂಕ (೦-೧೦೦)",
    "estResponseTimeLabel": "ಅಂದಾಜು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ",
    "displayingHotspots": "ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳ ಪ್ರದರ್ಶನ",
    "jurisdiction": "ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ",
    "savePlan": "ಯೋಜನೆ ಉಳಿಸಿ",
    "loadPlan": "ಉಳಿಸಿದ ಯೋಜನೆ ಲೋಡ್ ಮಾಡಿ",
    "savedPlans": "ಉಳಿಸಿದ ಸನ್ನಿವೇಶಗಳು ಮತ್ತು ನಿಯೋಜನೆಗಳು",
    "noSavedScenarios": "ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಯಾವುದೇ ಉಳಿಸಿದ ಸನ್ನಿವೇಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    "saveScenarioModalTitle": "ಕಾರ್ಯಾಚರಣಾ ನಿಯೋಜನೆ ಸನ್ನಿವೇಶವನ್ನು ಉಳಿಸಿ",
    "scenarioNameLabel": "ಸನ್ನಿವೇಶದ ಹೆಸರು",
    "scenarioSavedSuccess": "ಸನ್ನಿವೇಶವನ್ನು ಡೇಟಾಬೇಸ್‌ಗೆ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ.",
    "scenarioLoadedSuccess": "ಸನ್ನಿವೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಮಾಡಲಾಗಿದೆ.",
    "loadingHotspots": "ನೈಜ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    "saveToDb": "ಡೇಟಾಬೇಸ್‌ಗೆ ಉಳಿಸಿ",
    "loadFromDb": "ಡೇಟಾಬೇಸ್‌ನಿಂದ ಲೋಡ್ ಮಾಡಿ",
    "savedAt": "ಉಳಿಸಲಾದ ಸಮಯ",
    "loadScenarioAction": "ಸನ್ನಿವೇಶ ಲೋಡ್ ಮಾಡಿ",
    "enterScenarioName": "ಈ ನಿಯೋಜನಾ ಸನ್ನಿವೇಶಕ್ಕೆ ಹೆಸರನ್ನು ನಮೂದಿಸಿ...",
    "liveWeather": "ನೈಜ ಹವಾಮಾನ",
    "fetchingLiveWeather": "ನೈಜ ಹವಾಮಾನವನ್ನು ಪಡೆಯಲಾಗುತ್ತಿದೆ...",
    "liveWeatherActive": "ನೈಜ ಹವಾಮಾನ ಟೆಲಿಮೆಟ್ರಿ ಸಕ್ರಿಯವಾಗಿದೆ",
    "serverRiskActive": "ಸರ್ವರ್-ಸೈಡ್ ರಿಸ್ಕ್ ಸ್ಕೋರಿಂಗ್ ಸಕ್ರಿಯವಾಗಿದೆ",
    "aiTacticalCommander": "ಎಐ ಕಾರ್ಯಾಚರಣಾ ಕಮಾಂಡರ್",
    "aiCommanderSubtitle": "ನೈಜ ಎಫ್‌ಐಆರ್ ಗುಪ್ತಚರ ಮತ್ತು ಲೈವ್ ಹವಾಮಾನದಿಂದ ನಿಯೋಜನೆ ಯೋಜಕ",
    "districtCrimeTelemetry": "ಜಿಲ್ಲಾ ಅಪರಾಧ ಅಂಕಿಅಂಶಗಳು",
    "primaryThreatCrime": "ಪ್ರಮುಖ ಅಪರಾಧ ಮಾದರಿ",
    "activeFIRs": "ಸಕ್ರಿಯ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳು",
    "aiStrategySelect": "ಎಐ ತಂತ್ರದ ಉದ್ದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "strategyHotspotTitle": "ಅಪರಾಧ ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಗಸ್ತು",
    "strategyHotspotDesc": "ಐತಿಹಾಸಿಕ ಅಪರಾಧ ಮಾದರಿಗಳ ವಿರುದ್ಧ ಗಸ್ತು ಮತ್ತು ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ ವಾಹನಗಳನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.",
    "strategyCordonTitle": "೧೦೦% ಪರಿಧಿ ಭದ್ರತೆ ಮತ್ತು ಪ್ರವೇಶ ನಿರ್ಬಂಧ",
    "strategyCordonDesc": "ಎಲ್ಲಾ ೪ ಪ್ರವೇಶ ದ್ವಾರಗಳನ್ನು ಚೆಕ್‌ಪಾಯಿಂಟ್‌ಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣವಾಗಿ ಭದ್ರಪಡಿಸುತ್ತದೆ.",
    "strategyRapidTitle": "ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಎಸ್‌ಎಲ್‌ಎ ವೇಗವರ್ಧನೆ",
    "strategyRapidDesc": "ಎಲ್ಲಾ ವಲಯಗಳಲ್ಲಿ ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯವನ್ನು ೨.೫ ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ ಮಾಡಲು ಎಂಆರ್‌ವಿಗಳನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.",
    "strategyWeatherTitle": "ಪ್ರತಿಕೂಲ ಹವಾಮಾನ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆ",
    "strategyWeatherDesc": "ಹವಾಮಾನದಿಂದ ಉಂಟಾಗುವ ಗೋಚರತೆಯ ಮಂದತೆಯನ್ನು ನಿವಾರಿಸಲು ಎತ್ತರದ ಮೇಲ್ವಿಚಾರಣಾ ಪೋಸ್ಟ್‌ಗಳನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.",
    "generateAiPlanBtn": "ಎಐ ನಿಯೋಜನಾ ತಂತ್ರವನ್ನು ರಚಿಸಿ",
    "generatingAiPlan": "ಎಐ ಕಮಾಂಡರ್ ನಿಯೋಜನೆಯನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತಿದೆ...",
    "aiBriefingTitle": "ಕಾರ್ಯಾಚರಣೆಯ ನಿರ್ದೇಶನ",
    "aiThreatAssessment": "ಎಐ ಬೆದರಿಕೆ ಮೌಲ್ಯಮಾಪನ",
    "aiStrategicRationale": "ಕಾರ್ಯತಂತ್ರದ ವಿವರಣೆ ಮತ್ತು ನಿಯೋಜನೆ",
    "applyToPlanA": "ಪ್ಲಾನ್ ಎ (ಮೂಲ) ಗೆ ಅನ್ವಯಿಸಿ",
    "applyToPlanB": "ಪ್ಲಾನ್ ಬಿ (ತುರ್ತು ಯೋಜನೆ) ಗೆ ಅನ್ವಯಿಸಿ",
    "aiPlanAppliedSuccess": "ಎಐ ಕಾರ್ಯಾಚರಣಾ ತಂತ್ರವನ್ನು ಸಿಮ್ಯುಲೇಶನ್ ಯೋಜನೆಗೆ ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಮಾಡಲಾಗಿದೆ.",
    "unitPatrolTeamName": "ಗಸ್ತು ತಂಡ (ಪ್ರದೇಶ ಪರಿಶೀಲನೆ)",
    "unitPatrolShort": "ಗಸ್ತು",
    "unitPatrolDesc": "ಅವಕಾಶವಾದಿ ಅಪರಾಧಗಳನ್ನು ತಡೆಗಟ್ಟುವ ಸಕ್ರಿಯ ಬೀಟ್ ಗಸ್ತು.",
    "unitPatrolBadge": "ಬೀಟ್ ಸ್ವೀಪಿಂಗ್",
    "unitPatrolRole": "ಕಾಲ್ನಡಿಗೆ ಗಸ್ತು ಮತ್ತು ಸ್ಥಳೀಯ ನಿಗಾ",
    "unitCheckpointName": "ಚೆಕ್‌ಪಾಯಿಂಟ್ ಪೋಸ್ಟ್",
    "unitCheckpointShort": "ಚೆಕ್‌ಪಾಯಿಂಟ್",
    "unitCheckpointDesc": "ಪ್ರವೇಶ ದ್ವಾರಗಳ ತಪಾಸಣೆ ಮತ್ತು ಭದ್ರತಾ ಪರಿಶೀಲನೆ.",
    "unitCheckpointBadge": "ಪ್ರವೇಶ ನಿಯಂತ್ರಣ",
    "unitCheckpointRole": "ಪ್ರವೇಶ ನಿರ್ಬಂಧ ಮತ್ತು ಪರಿಶೀಲನೆ",
    "unitMrvName": "ಮೊಬೈಲ್ ರೆಸ್ಪಾನ್ಸ್ ವಾಹನ (ಪಿಸಿಆರ್)",
    "unitMrvShort": "ಎಂಆರ್‌ವಿ",
    "unitMrvDesc": "ತುರ್ತು ಪರಿಸ್ಥಿತಿಗೆ ವೇಗವಾಗಿ ಸ್ಪಂದಿಸುವ ವಾಹನ ಪಡೆ.",
    "unitMrvBadge": "ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ",
    "unitMrvRole": "ವೇಗದ ಕಾರ್ಯತಂತ್ರ ಪ್ರತಿಕ್ರಿಯೆ",
    "unitOverwatchName": "ಓವರ್‌ವಾಚ್ ವೀಕ್ಷಣಾ ನೋಡ್",
    "unitOverwatchShort": "ಓವರ್‌ವಾಚ್",
    "unitOverwatchDesc": "ಎತ್ತರದ ಸ್ಥಳದಿಂದ ಆಪ್ಟಿಕಲ್ ಸೆನ್ಸರ್ ಕಣ್ಗಾವಲು ನೋಡ್.",
    "unitOverwatchBadge": "ಓವರ್‌ವಾಚ್ ಟೆಲಿಮೆಟ್ರಿ",
    "unitOverwatchRole": "ದೃಶ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ನಿಗಾ",
    "alertCoverageGap": "ಸ್ಥಳೀಯ ವ್ಯಾಪ್ತಿಯ ಕೊರತೆ: ಪ್ರವೇಶ ದ್ವಾರ {0} ({1}) ಯಾವುದೇ ಘಟಕದ ವ್ಯಾಪ್ತಿಯಲ್ಲಿಲ್ಲ. {2} ನಲ್ಲಿನ ಪ್ರಮುಖ ಕಾರಿಡಾರ್ ಅಸುರಕ್ಷಿತವಾಗಿದೆ.",
    "alertPersonnelDeficit": "ನಿರ್ಣಾಯಕ ಸಿಬ್ಬಂದಿ ಕೊರತೆ: ನಿಯೋಜಿಸಲಾದ ಒಟ್ಟು ಬಜೆಟ್ (< 8 ಘಟಕಗಳು) ಹೆಚ್ಚಿನ ಜನದಟ್ಟಣೆಗೆ ಸಾಕಾಗುವುದಿಲ್ಲ. ಅಡಚಣೆ ಸಂಭವನೀಯತೆ 65% ರಷ್ಟು ಹೆಚ್ಚಾಗಿದೆ.",
    "alertVisibilityHazard": "ಹವಾಮಾನ ಗೋಚರತೆ ಅಪಾಯ: ಪ್ರತಿಕೂಲ ಹವಾಮಾನವು ದೃಶ್ಯ ವ್ಯಾಪ್ತಿಯನ್ನು ~40% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ. ವೀಕ್ಷಣಾ ಪೋಸ್ಟ್ ಇಲ್ಲದೆ ಕತ್ತಲೆಯ ವಲಯಗಳಲ್ಲಿ ಪತ್ತೆ ಕಷ್ಟಕರ.",
    "alertChokePointRisk": "ಪ್ರವೇಶ ದ್ವಾರದ ಜನದಟ್ಟಣೆ ಅಪಾಯ: ಉತ್ಸವದ ಗರಿಷ್ಠ ಸಮಯದಲ್ಲಿ ಮುಖ್ಯ ದ್ವಾರಗಳಲ್ಲಿ ತಡೆಗಳು ಉಂಟಾಗಬಹುದು. ಗೇಟ್ 1 ಮತ್ತು ಗೇಟ್ 2 ರಲ್ಲಿ ಜನದಟ್ಟಣೆ ಅಪಾಯ ಪತ್ತೆಯಾಗಿದೆ.",
    "alertFestivalSurge": "ಉತ್ಸವದ ಜನದಟ್ಟಣೆ ಹೆಚ್ಚಳ: ಏಕಕಾಲೀನ ಧಾರ್ಮಿಕ/ಸಾಂಸ್ಕೃತಿಕ ಮೆರವಣಿಗೆಗಳು ಪೂರ್ವ ವಲಯದಲ್ಲಿ ಒತ್ತಡದ ಬಿಂದುಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತವೆ.",
    "alertElevatedVulnerability": "ಹೆಚ್ಚಿದ ಪ್ರದೇಶದ ಅಸುರಕ್ಷಿತತೆ: ದ್ವಿತೀಯ ವಲಯದ ಪ್ರತಿಕ್ರಿಯೆ ವಿಳಂಬವು 6 ನಿಮಿಷಗಳ ಮಿತಿಯನ್ನು ಮೀರಿದೆ.",
    "alertOptimalCoverage": "ಉತ್ತಮ ವಲಯ ವ್ಯಾಪ್ತಿ: ಪ್ರಸ್ತುತ ವಿನ್ಯಾಸದ ಅಡಿಯಲ್ಲಿ {0} ನಲ್ಲಿನ ಎಲ್ಲಾ 4 ಪ್ರವೇಶ ಕಾರಿಡಾರ್‌ಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿವೆ.",
    "recDeployCheckpointPatrol": "{0} ಅನ್ನು ರಕ್ಷಿಸಲು ಚೆಕ್‌ಪಾಯಿಂಟ್ ಪೋಸ್ಟ್ ಅಥವಾ ಗಸ್ತು ತಂಡವನ್ನು ನಿಯೋಜಿಸಿ.",
    "recMobilizeReserve": "ನೆರೆಯ ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯಿಂದ ಕನಿಷ್ಠ 6 ಮೀಸಲು ತ್ವರಿತ ಪ್ರತಿಕ್ರಿಯೆ ಸಿಬ್ಬಂದಿಯನ್ನು ಸಜ್ಜುಗೊಳಿಸಿ.",
    "recDeployOverwatch": "ವೀಕ್ಷಣಾ ಪೋಸ್ಟ್ ನಿಯೋಜಿಸಿ ಅಥವಾ ಪ್ರವೇಶ ದ್ವಾರ-ಕೇಂದ್ರಿತ ಭದ್ರತೆಗೆ ಬದಲಾಯಿಸಿ.",
    "recActiveOverwatchMitigation": "ಸಕ್ರಿಯ ವೀಕ್ಷಣೆ ({0} ಪೋಸ್ಟ್‌ಗಳು) ಪ್ರತಿಕೂಲ ಹವಾಮಾನ ಕುರುಡುತನವನ್ನು ~{1}% ರಷ್ಟು ತಗ್ಗಿಸುತ್ತಿದೆ.",
    "recOpenSecondaryCorridors": "ದ್ವಿತೀಯ ತುರ್ತು ನಿರ್ಗಮನ ಕಾರಿಡಾರ್‌ಗಳನ್ನು ತೆರೆಯಿರಿ.",
    "recEstablishForwardPost": "ಮೊಬೈಲ್ ಪ್ರತಿಕ್ರಿಯೆ ವಾಹನದೊಂದಿಗೆ ಮುಂಚೂಣಿ ಕಾರ್ಯಾಚರಣಾ ಸಮನ್ವಯ ಪೋಸ್ಟ್ ಸ್ಥಾಪಿಸಿ.",
    "recMrvActive": "ಮೊಬೈಲ್ ಪ್ರತಿಕ್ರಿಯೆ ಘಟಕ ಸಕ್ರಿಯವಾಗಿದೆ: ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ {0} ನಿಮಿಷಗಳಿಗೆ ವೇಗಗೊಂಡಿದೆ.",
    "recAddPatrolTeams": "ಅಪಾಯ ಸೂಚ್ಯಂಕವನ್ನು 45 ಕ್ಕಿಂತ ಕೆಳಗೆ ತರಲು ಹೆಚ್ಚುವರಿ ಗಸ್ತು ತಂಡಗಳನ್ನು ನಿಯೋಜಿಸಿ.",
    "recMaintainCheckins": "ಪ್ರತಿ 30 ನಿಮಿಷಗಳಿಗೊಮ್ಮೆ ರೇಡಿಯೋ ಚೆಕ್-ಇನ್ ನಿರ್ವಹಿಸಿ. ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಆಡಿಟ್‌ಗೆ ಲಾಗ್ ಮಾಡಿ.",
    "sopTitle": "ಮಾನದಂಡ ಕಾರ್ಯಾಚರಣಾ ಪ್ರಕ್ರಿಯೆ (SOP) & ಅಧಿಕಾರಿ ಕಾರ್ಯಾಚರಣಾ ಮಾರ್ಗದರ್ಶಿ",
    "sopBadge": "ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವುದು",
    "sopHide": "ಮಾರ್ಗದರ್ಶಿ ಮರೆಮಾಡಿ",
    "sopView": "ಕಾರ್ಯಾಚರಣೆ ಮಾರ್ಗದರ್ಶಿ ವೀಕ್ಷಿಸಿ",
    "sopAssignedDept": "ನಿಯೋಜಿತ ಇಲಾಖೆ",
    "sopLegalAuth": "ಕಾನೂನು ಮತ್ತು ನಿಯಂತ್ರಕ ಪ್ರಾಧಿಕಾರ",
    "sopEscalation": "ತುರ್ತು ಪರಿಸ್ಥಿತಿ & ಫೀಲ್ಡ್ ಡಿಸ್ಪ್ಯಾಚ್",
    "sopWorkflow": "ಹಂತ-ಹಂತದ ತನಿಖಾಧಿಕಾರಿ ಕಾರ್ಯವಿಧಾನ:",
    "sopTips": "ಕಾರ್ಯತಂತ್ರದ ತನಿಖಾ ಸಲಹೆಗಳು ಮತ್ತು ಉತ್ತಮ ಅಭ್ಯಾಸಗಳು:",
    "rolePermissionSandbox": "ಪಾತ್ರ ಅನುಮತಿ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್",
    "demoRoleSwitcher": "ಡೆಮೊ ಪಾತ್ರ ಬದಲಾವಣೆ",
    "demoRoleSwitcherDesc": "ಡೆಮೊ ಉದ್ದೇಶಗಳಿಗಾಗಿ ಮಾತ್ರ. ಉತ್ಪಾದನೆಯಲ್ಲಿ, ಕ್ಯಾಟಲಿಸ್ಟ್ IAM ಅನುಮತಿಗಳ ಮೂಲಕ ಪಾತ್ರಗಳನ್ನು ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತದೆ.",
    "switchCurrentRole": "ಪ್ರಸ್ತುತ ಪಾತ್ರವನ್ನು ಬದಲಾಯಿಸಿ",
    "accessPermissionForRole": "ಈ ಪಾತ್ರಕ್ಕಾಗಿ ಪ್ರವೇಶ ಅನುಮತಿ:",
    "biometricRegistryActive": "ಬಯೋಮೆಟ್ರಿಕ್ ನೋಂದಣಿ ಸಕ್ರಿಯ",
    "directoryRestrictedSupervisor": "ಡೈರೆಕ್ಟರಿಯನ್ನು ಸಿಸ್ಟಮ್ ಮೇಲ್ವಿಚಾರಕರಿಗೆ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ",
    "directoryRestrictedDesc": "ಸಿಸ್ಟಮ್ ಪ್ರವೇಶ ಡೈರೆಕ್ಟರಿಗಳನ್ನು ನಿರ್ವಹಿಸಲು, ಅಧಿಕಾರಿ ಖಾತೆಗಳನ್ನು ಬದಲಾಯಿಸಲು ಅಥವಾ ಬಯೋಮೆಟ್ರಿಕ್ ದೃಢೀಕರಣವನ್ನು ಮರುಹೊಂದಿಸಲು, ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಮೇಲ್ವಿಚಾರಕರಿಗೆ ಏರಿಸಲು ಮೇಲಿನ ರೋಲ್ ಪರ್ಮಿಷನ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್ ಆಯ್ಕೆಯನ್ನು ಬಳಸಿ.",
    "registerOfficerTitle": "ತನಿಖಾ ಅಧಿಕಾರಿಯನ್ನು ನೋಂದಾಯಿಸಿ",
    "psIdentifierLabel": "ಠಾಣೆ ಗುರುತಿಸುವಿಕೆ (PS ID)",
    "officerNameLabel": "ಅಧಿಕಾರಿಯ ಹೆಸರು",
    "rankLabel": "ಹುದ್ದೆ",
    "securityRoleLabel": "ಭದ್ರತಾ ಪಾತ್ರ",
    "policeStationLabel": "ಪೊಲೀಸ್ ಠಾಣೆ",
    "cancelButton": "ರದ್ದುಮಾಡಿ",
    "registerOfficerButton": "ಅಧಿಕಾರಿಯನ್ನು ನೋಂದಾಯಿಸಿ",
    "lockAccessButton": "ಪ್ರವೇಶ ಲಾಕ್ ಮಾಡಿ",
    "unlockAccessButton": "ಪ್ರವೇಶ ಅನ್‌ಲಾಕ್ ಮಾಡಿ",
    "statusActive": "ಸಕ್ರಿಯ",
    "statusLocked": "ಲಾಕ್ ಮಾಡಲಾಗಿದೆ",
    "crimeCopilotTitle": "ಪ್ರಜ್ಞಾ-AI ಅಪರಾಧ ಕೋ-ಪೈಲಟ್",
    "cctnsRagConnected": "CCTNS RAG ಇಂಟೆಲಿಜೆನ್ಸ್ ಸ್ಟೋರ್‌ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ",
    "quickMlBadge": "QUICK ML",
    "newChatButton": "ಹೊಸ ಚಾಟ್",
    "exportPdfButton": "ಪಿಡಿಎಫ್ ರಫ್ತು ಮಾಡಿ",
    "clearChatButton": "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    "whatToInvestigate": "ನೀವು ಏನನ್ನು ತನಿಖೆ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ, {0}?",
    "chatHeroSubtitle": "CCTNS ಅಪರಾಧ ದಾಖಲೆಗಳನ್ನು ಪ್ರಶ್ನಿಸಿ, ಶಂಕಿತರ ಡಾಸಿಯರ್‌ಗಳನ್ನು ರಚಿಸಿ, ಅಪರಾಧ ವಿಧಾನ (MO) ಸಹಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕೇಸ್ ಸಾರಾಂಶಗಳನ್ನು ರಚಿಸಿ.",
    "investigationHistory": "ತನಿಖಾ ಇತಿಹಾಸ",
    "newInvestigationChat": "ಹೊಸ ತನಿಖಾ ಚಾಟ್",
    "searchPastCases": "ಹಿಂದಿನ ಪ್ರಕರಣಗಳು ಮತ್ತು ಚಾಟ್‌ಗಳನ್ನು ಹುಡುಕಿ...",
    "timeToday": "ಇಂದು",
    "timePrevious7Days": "ಕಳೆದ ೭ ದಿನಗಳು",
    "timeOlder": "ಹಳೆಯದು",
    "noPastChats": "ಯಾವುದೇ ಹಿಂದಿನ ತನಿಖಾ ಚಾಟ್‌ಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    "chatDisclaimer": "ಪ್ರಜ್ಞಾ-AI ಸ್ವಯಂಚಾಲಿತ ಅಪರಾಧ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಪ್ರಕರಣ ಸಂಶ್ಲೇಷಣೆಯನ್ನು ಒದಗಿಸುತ್ತದೆ. ಅಧಿಕೃತ CCTNS ಕೇಸ್ ಡೈರಿಗಳ ವಿರುದ್ಧ ಸದಾ ಪರಿಶೀಲಿಸಿ.",
    "incidentAtmSkimming": "ಏಕಾಂತ ಎಟಿಎಂ ಕಿಯೋಸ್ಕ್‌ನಲ್ಲಿ ಎಟಿಎಂ ಕಾರ್ಡ್ ಸ್ಕಿಮ್ಮಿಂಗ್ ವರದಿಯಾಗಿದೆ",
    "incidentTwoWheelerStolen": "ಮಾಸ್ಟರ್ ಕೀ ಬಳಸಿ ಮಾಲ್ ಪಾರ್ಕಿಂಗ್‌ನಿಂದ ದ್ವಿಚಕ್ರ ವಾಹನ ಕಳ್ಳತನ",
    "incidentHouseBreakIn": "ನಕಲಿ ಕೀಲಿ ಬಳಸಿ ಹಗಲು ವೇಳೆಯಲ್ಲಿ ಮನೆಗಳ್ಳತನ",
    "incidentChainSnatching": "ಪಲ್ಸರ್ ಬೈಕ್‌ನಲ್ಲಿ ಹಿಂಬದಿ ಸವಾರನಿಂದ ಚಿನ್ನದ ಸರಗಳ್ಳತನ",
    "incidentMdmaPeddling": "ಕಾಲೇಜು ಕ್ಯಾಂಪಸ್ ಬಳಿ ಸಿಂಥೆಟಿಕ್ ಡ್ರಗ್ಸ್ (MDMA) ಮಾರಾಟ",
    "incidentLotteryVishing": "ನಕಲಿ ಲಾಟರಿ ಬಹುಮಾನದ ಕರೆ ಮತ್ತು ಒಟಿಪಿ ವಂಚನೆ",
    "incidentShopBreakIn": "ವಾಣಿಜ್ಯ ಅಂಗಡಿಯ ಶಟರ್ ಮುರಿದು ನಗದು ಕಳ್ಳತನ",
    "incidentAssaultBrawl": "ಪಾರ್ಕಿಂಗ್ ವಿವಾದಕ್ಕಾಗಿ ಪಬ್ ಬಳಿ ರಸ್ತೆ ಗಲಾಟೆ ಮತ್ತು ಹಲ್ಲೆ",
    "suspectReasonCctv": "ಸಿಸಿಟಿವಿ ಮುಖ ಗುರುತಿಸುವಿಕೆ ಮೂಲಕ ಹೊಂದಾಣಿಕೆ ದೃಢಪಟ್ಟಿದೆ",
    "suspectReasonCellTower": "ಸೆಲ್ ಟವರ್ ಡಂಪ್ ಮತ್ತು ಸಿಡಿಆರ್ ಸಮಯದ ಆಧಾರದಲ್ಲಿ ಪತ್ತೆ",
    "suspectReasonNafis": "NAFIS ಫಿಂಗರ್‌ಪ್ರಿಂಟ್ ಡೇಟಾಬೇಸ್‌ನೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗಿದೆ",
    "suspectReasonInformer": "ಖಾಸಗಿ ಮೂಲಗಳ ರಹಸ್ಯ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ ಪತ್ತೆ",
    "suspectReasonMuleAccount": "ಹಣಕಾಸು ವಹಿವಾಟಿನಲ್ಲಿ ಪ್ರಾಥಮಿಕ ಮ್ಯೂಲ್ ಖಾತೆ ಫಲಾನುಭವಿ",
    "unitPatrolName": "ಬೀಟ್ ಗಸ್ತು ತಂಡ",
    "rank": "ಹುದ್ದೆ",
    "securitySafeguardsProtocol": "ಭದ್ರತಾ ಕ್ರಮಗಳು ಮತ್ತು ಪ್ರವೇಶ ನಿಯಂತ್ರಣಗಳು",
    "maskPiiDesc": "ಡಿಜಿಟಲ್ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ ೨೦೨೩ ರ ಪ್ರಕಾರ ನಾಗರಿಕರ ಡೇಟಾವನ್ನು ಮರೆಮಾಡಲಾಗಿದೆ.",
    "vpnTunnelDesc": "ಅಧಿಕೃತ ಪೊಲೀಸ್ ಠಾಣಾ ಐಪಿ ಮತ್ತು ಸುರಕ್ಷಿತ ವಿಪಿಎನ್ ಮೂಲಕ ಮಾತ್ರ ಪ್ರವೇಶ ಲಭ್ಯ.",
    "immutableAuditDesc": "ಎಲ್ಲಾ ಪ್ರಶ್ನೆಗಳು ಮತ್ತು ವರದಿಗಳ ರಫ್ತುಗಳು ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಆಡಿಟ್ ಲಾಗ್‌ಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತವೆ.",
    "inactivityDesc": "೧೫ ನಿಮಿಷಗಳ ನಿಷ್ಕ್ರಿಯತೆಯ ನಂತರ ಟರ್ಮಿನಲ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಾಗ್‌ಔಟ್ ಆಗುತ್ತದೆ.",
    "operatorDirectoryDesc": "ಸಕ್ರಿಯ ಪ್ರವೇಶ ಹಕ್ಕುಗಳನ್ನು ಹೊಂದಿರುವ ಪೊಲೀಸ್ ಸಿಬ್ಬಂದಿಯ ರೋಸ್ಟರ್.",
    "history": "ಇತಿಹಾಸ",
    "searchBySuspectTxnAccount": "ಆರೋಪಿ, ವಹಿವಾಟು ಐಡಿ ಅಥವಾ ಖಾತೆಯ ಮೂಲಕ ಹುಡುಕಿ...",
    "allTypes": "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    "suspiciousOnly": "ಅನುಮಾನಾಸ್ಪದ ಮಾತ್ರ",
    "transactionId": "ವಹಿವಾಟು ಐಡಿ",
    "senderFrom": "ಕಳುಹಿಸಿದವರು (ಖಾತೆ)",
    "recipientTo": "ಸ್ವೀಕರಿಸುವವರು (ಖಾತೆ)",
    "cctnsAnalysisSummary": "CCTNS ಗುಪ್ತಚರ ವಿಶ್ಲೇಷಣಾ ಸಾರಾಂಶ:",
    "standardTxnPath": "ಸಾಮಾನ್ಯ ವಹಿವಾಟು ಮಾರ್ಗ. ಈ ನೋಡ್ ಅನುಕ್ರಮಕ್ಕೆ ಯಾವುದೇ ತಕ್ಷಣದ ಎಚ್ಚರಿಕೆಗಳು ಪ್ರಚೋದಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
    "criminologyModusOperandi": "ಅಪರಾಧ ಕಾರ್ಯಾಚರಣೆ ವಿಧಾನ (MO):",
    "associatedFinancialAccounts": "ಸಂಬಂಧಿತ ಹಣಕಾಸು ಖಾತೆಗಳು:",
    "noRegisteredSuspectTxn": "ಈ ವಹಿವಾಟು ಐಡಿಗೆ ಯಾವುದೇ ನೋಂದಾಯಿತ ಆರೋಪಿ ನೇರವಾಗಿ ಸೂಚಿಸಲ್ಪಟ್ಟಿಲ್ಲ.",
    "structuringLayerAlert": "ವ್ಯವಸ್ಥಿತ ಲೇಯರಿಂಗ್ (ಎಚ್ಚರಿಕೆ)",
    "directTransfer": "ನೇರ ವರ್ಗಾವಣೆ",
    "selectTxnRowTrace": "ಲಿಂಕ್ ನೋಡ್ ಟ್ರೇಸ್ ಚಲಾಯಿಸಲು ವಹಿವಾಟಿನ ಸಾಲನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    "crimeTrendTitle": "೧೨-ತಿಂಗಳ ಅಪರಾಧ ಪ್ರವೃತ್ತಿ (ಪ್ರಕರಣಗಳ ಪ್ರಮಾಣ)",
    "totalCases": "ಒಟ್ಟು: {0} ಪ್ರಕರಣಗಳು",
    "crimeVolumeByDistrict": "ಜಿಲ್ಲಾವಾರು ಅಪರಾಧ ಪ್ರಮಾಣ ಹೋಲಿಕೆ",
    "casesUnit": "ಪ್ರಕರಣಗಳು",
    "seasonalOverlayTitle": "ಋತುಮಾನದ ಅಪರಾಧ ಚಟುವಟಿಕೆ ಓವರ್‌ಲೇ (ತ್ರೈಮಾಸಿಕ)",
    "theftBurglaryLegend": "ಕಳ್ಳತನ / ಮನೆಗಳ್ಳತನ",
    "cyberFraudLegend": "ಸೈಬರ್ ವಂಚನೆ",
    "assaultViolenceLegend": "ಹಲ್ಲೆ / ಹಿಂಸಾಚಾರ",
    "ageGroup1825": "೧೮-೨೫ ವರ್ಷ",
    "ageGroup2635": "೨೬-೩೫ ವರ್ಷ",
    "ageGroup3645": "೩೬-೪೫ ವರ್ಷ",
    "ageGroup46Plus": "೪೬+ ವರ್ಷ",
    "totalRecords": "ಒಟ್ಟು: {0} ದಾಖಲೆಗಳು",
    "socioEconomicCorrelations": "ಸಾಮಾಜಿಕ-ಆರ್ಥಿಕ ಮತ್ತು ಸಮಾಜಶಾಸ್ತ್ರೀಯ ಅಪರಾಧ ಸಂಬಂಧಗಳು",
    "sociologicalBriefingDesc": "ತಾಲೂಕು ಜನಗಣತಿಯ ಪ್ರೊಫೈಲ್‌ಗಳೊಂದಿಗೆ CCTNS ಅಪರಾಧ ದಾಖಲೆಗಳ ವಿಶ್ಲೇಷಣೆಯು, ಹೆಚ್ಚಿನ ನಗರ ವಲಸೆ ಮತ್ತು ನಿರುದ್ಯೋಗ ದರವನ್ನು ಹೊಂದಿರುವ ಪ್ರದೇಶಗಳು ಅವಕಾಶವಾದಿ ಆಸ್ತಿ ಅಪರಾಧಗಳ ೨.೭ ಪಟ್ಟು ಹೆಚ್ಚು ಕೇಂದ್ರೀಕರಣವನ್ನು ತೋರಿಸುತ್ತವೆ ಎಂಬುದನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
    "criminologyActionPolicyDesc": "ವಾಣಿಜ್ಯ ಮದ್ಯದ ಮಳಿಗೆಗಳ ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆ ಮತ್ತು ತ್ವರಿತ ವಲಸೆ ವಿಸ್ತರಣೆಯನ್ನು ಹೊಂದಿರುವ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸ್ಥಳೀಯ ಬೀಟ್ ಜಾಲಗಳ ಅಭಿವೃದ್ಧಿಗೆ ಆದ್ಯತೆ ನೀಡಿ.",
    "decisionSupportBadge": "ನಿರ್ಧಾರ ಬೆಂಬಲ",
    "casesBadge": "ಪ್ರಕರಣಗಳು",
    "caseBriefSummaryTab": "ಪ್ರಕರಣದ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ",
    "similarCaseFinderTab": "ಸಮಾನ ಪ್ರಕರಣಗಳ ಶೋಧಕ",
    "suggestedLeadsTab": "ಸೂಚಿಸಲಾದ ತನಿಖಾ ಸುಳಿವುಗಳು",
    "secureGateQuickML": "ಸುರಕ್ಷಿತ ಗೇಟ್‌ವೇ: ಕ್ಯಾಟಲಿಸ್ಟ್ ಕ್ವಿಕ್‌ಎಂಎಲ್ (ಬಾಹ್ಯ ಮಾದರಿ)",
    "auditTrailId": "ಆಡಿಟ್ ಜಾಡು ಐಡಿ"
  },
  "hi": {
    "karnatakaStatePolice": "कर्नाटक राज्य पुलिस",
    "platformName": "प्रज्ञा-AI",
    "restrictedAccess": "प्रतिबंधित पुलिस डेटाबेस गेटवे",
    "livealerts": "अधिसूचनाएं और खुफिया अलर्ट",
    "live": "लाइव ●",
    "logout": "सुरक्षित सत्र समाप्त करें",
    "rankinfo": "थाना रैंक",
    "dashboard": "डैशबोर्ड",
    "aiAssistant": "एआई सहायक",
    "criminalNetworks": "आपराधिक नेटवर्क",
    "hotspotIntel": "संवेदनशील क्षेत्र",
    "predictiveInsights": "पूर्वानुमान",
    "offenderProfiling": "अपराधी प्रोफाइलिंग",
    "faceSearch": "चेहरा खोजें",
    "financialAnalysis": "वित्तीय विश्लेषण",
    "reportsAudit": "रिपोर्ट और ऑडिट",
    "userManagement": "उपयोगकर्ता प्रबंधन",
    "settings": "सेटिंग्स",
    "collapseMenu": "मेनू बंद करें",
    "totalCaseFiles": "कुल मामले (NoSQL)",
    "activeInvestigations": "सक्रिय जांच",
    "criticalHotspots": "संवेदनशील हॉटस्पॉट",
    "knownOffendersProfiled": "प्रोफाइल किए गए अपराधी",
    "repeatAccused": "मल्टीपल आरोपी (खतरा)",
    "catalystHostSync": "कैतलिस्ट सिंक",
    "welcomeHeader": "प्रज्ञा-AI अपराध खुफिया पोर्टल",
    "welcomeSubtitle": "CCTNS अपराध रिकॉर्ड का विश्लेषण करने वाला संवादी एआई इंजन और पूर्वानुमानित जोखिम मंच। आपराधिक इतिहास और नेटवर्क का विश्लेषण करें।",
    "askAi": "एआई से पूछें",
    "viewAssociations": "आपराधिक संबंध देखें",
    "coreCapabilitiesGateway": "मुख्य क्षमता गेटवे (12 प्रस्तावित समाधान)",
    "coreCapabilitiesGatewayDesc": "केएसपी डेटाथॉन आवश्यकताओं के लिए मैप की गई सभी 12 आधिकारिक सीआईआरएएस (CIRAS) क्षमताओं का त्वरित-पहुंच कंसोल।",
    "f1Title": "संवादी अपराध खुफिया",
    "f1Desc": "प्राकृतिक भाषा चैटबॉट जो अंग्रेजी और कन्नड़ में 1000 एफआईआर रिकॉर्ड को सर्च करता है।",
    "f2Title": "आपराधिक नेटवर्क विश्लेषण",
    "f2Desc": "संदिग्धों, पीड़ितों, स्थानों और खातों को जोड़ने वाले इंटरैक्टिव संबंध ग्राफ।",
    "f3Title": "अपराध पैटर्न और प्रवृत्ति विश्लेषिकी",
    "f3Desc": "समय-श्रृंखला चार्ट, जिला-वार तुलना और मौसमी पैटर्न विश्लेषण।",
    "f4Title": "समाजशास्त्रीय अपराध अंतर्दृष्टि",
    "f4Desc": "अपराध दर को शहरीकरण और सामाजिक तनाव कारकों से जोड़ने वाला जनसांख्यिकीय विश्लेषण।",
    "f5Title": "अपराधशास्त्र-आधारित अपराधी प्रोफाइलिंग",
    "f5Desc": "अपराधियों के व्यापक इतिहास और कार्यप्रणाली (MO) हस्ताक्षरों को मैप करने वाला डोजियर।",
    "f6Title": "पुनरावृत्ति संभावना इंजन",
    "f6Desc": "पुनरावृत्ति की संभावना, अपराध के प्रकार, समयरेखा और लक्षित क्षेत्रों का अनुमान लगाने वाला क्विकएमएल (QuickML) मॉडल।",
    "f7Title": "जांच अधिकारी निर्णय समर्थन",
    "f7Desc": "स्वचालित रूप से उत्पन्न मामले के संक्षिप्त सारांश और जांच सुरागों के सुझाव।",
    "f8Title": "एआई फेस सर्च और संदिग्ध पहचान",
    "f8Desc": "KSP Neural Biometrics आयु-अपरिवर्तित चेहरे की ज्यामिति मिलान और नागरिक सुरक्षा वॉचलिस्ट।",
    "f9Title": "वित्तीय अपराध और लेनदेन विश्लेषण",
    "f9Desc": "₹50,000 की रिपोर्टिंग सीमा से कम की संदिग्ध मनी ट्रेल का पता लगाना।",
    "f10Title": "अपराध पूर्वानुमान और प्रारंभिक चेतावनी",
    "f10Desc": "बढ़ते अपराधों की चेतावनी और संसाधन तैनाती के सुझाव।",
    "f11Title": "व्याख्यात्मक एआई और पारदर्शी विश्लेषिकी",
    "f11Desc": "संवादी चैटबॉट के प्रत्येक उत्तर के लिए सटीक एफआईआर रिकॉर्ड के स्रोत संदर्भ।",
    "f12Title": "सुरक्षित भूमिका-आधारित पहुंच और शासन",
    "f12Desc": "5-स्तरीय आरबीएसी (RBAC) और अपरिवर्तनीय क्रिप्टोग्राफिक ऑडिट लॉग।",
    "recentEntries": "हाल ही के CCTNS मामले",
    "queryFullRoster": "पूरी सूची देखें →",
    "firNumber": "एफआईआर नंबर",
    "crimeCategory": "अपराध श्रेणी",
    "jurisdictionStation": "पुलिस स्टेशन",
    "registrationDate": "पंजीकरण की तिथि",
    "ioAssigned": "जांच अधिकारी (IO)",
    "caseStatus": "मामले की स्थिति",
    "chatbotTitle": "संवादी अपराध सहायक",
    "chatbotSubtitle": "कैटेलिस्ट सर्वरलेस केएसपी डेटाबेस पर संग्रहीत 1000 एफआईआर को सर्च करने का संवादी इंटरफ़ेस।",
    "sessionIntel": "सत्र खुफिया (Session Intel)",
    "sessionId": "सत्र आईडी (Session ID)",
    "serverLatency": "सर्वर विलंबता (Latency)",
    "model": "मॉडल (Model)",
    "helpfulTips": "सहायक कमांड सुझाव",
    "tip1": "त्वरित सारांश के लिए FIR 0012/2026 टाइप करें।",
    "tip2": "अपराधी प्रोफाइल के लिए Raju K. खोजें।",
    "tip3": "क्षेत्रीय चार्ट के लिए मैसूर में चोरी के मामले खोजें।",
    "crimeChatbot": "अपराध खुफिया चैटबॉट",
    "authorizedNotice": "अधिकृत कर्नाटक पुलिस कर्मी प्राकृतिक भाषा का उपयोग करके डेटाबेस को खोज सकते हैं। एफआईआर नंबर, संदिग्धों के नाम, जिलों या अपराध पैटर्न द्वारा खोजें।",
    "searching": "प्रज्ञा-AI डेटाबेस में खोज रहा है...",
    "clear": "साफ़ करें",
    "export": "पीडीएफ निर्यात",
    "secureChannel": "सुरक्षित चैनल • कैतलिस्ट क्विकएमएल से कनेक्टेड",
    "reportsTitle": "रिपोर्ट और सुरक्षा ऑडिट टर्मिनल",
    "reportsDesc": "अपरिवर्तनीय केएसपी क्वेरी ऑडिट ट्रेल की निगरानी करें, ज़ोहो कैतलिस्ट सर्वरलेस इंफ्रास्ट्रक्चर स्वास्थ्य की जांच करें और कार्यकारी अपराध रिपोर्ट संकलित करें।",
    "auditLocked": "ऑडिट रजिस्ट्री लॉक है (अपरिवर्तनीय)",
    "secureAuditLogs": "सुरक्षित ऑडिट लॉग",
    "catalystCloudStatus": "कैतलिस्ट क्लाउड स्थिति",
    "executiveReportGenerator": "कार्यकारी रिपोर्ट जनरेटर",
    "tamperProofLockActive": "⚠ टैम्पर-प्रूफ क्रिप्टोग्राफिक लॉक सक्रिय",
    "tamperProofDesc": "CCTNS ऑडिट निर्देशों के अनुपालन में, प्रत्येक उपयोगकर्ता घटना (लॉगिन, क्वेरी, निर्यात, फेस स्कैन) को क्रिप्टोग्राफिक रूप से हस्ताक्षरित और लॉग किया जाता है। ये लॉग अपरिवर्तनीय हैं और ज़ोहो कैतलिस्ट डेटास्टोर के अंदर पृथक सुरक्षा क्षेत्रों में संग्रहीत हैं।",
    "immutableSecurityAuditLogs": "अपरिवर्तनीय सुरक्षा ऑडिट लॉग",
    "tamperProofRecord": "टैम्पर-प्रूफ रिकॉर्ड",
    "actionFilter": "कार्रवाई:",
    "allActions": "सभी कार्रवाइयां",
    "timestamp": "समय संकेत",
    "user": "उपयोगकर्ता",
    "role": "भूमिका",
    "action": "कार्रवाई",
    "details": "विवरण",
    "ipAddress": "आईपी पता",
    "latency": "विलंबता",
    "showingPage": "पेज दिखा रहा है",
    "of": "का",
    "totalEntries": "कुल प्रविष्टियां",
    "previous": "पिछला",
    "next": "अगला",
    "zohoCatalystLiveDeploymentStatus": "ज़ोहो कैतलिस्ट लाइव परिनियोजन स्थिति",
    "platform": "प्लेटफ़ॉर्म",
    "projectId": "परियोजना आईडी",
    "refreshing": "रिफ्रेश हो रहा है...",
    "syncServices": "सिंक सेवाएं",
    "databaseIndexHighlight": "📊 डेटाबेस इंडेक्स: NoSQL स्टोर में 1,000 एफआईआर रिकॉर्ड इंडेक्स किए गए",
    "latestIndex": "नवीनतम इंडेक्स: 15 जून 2026",
    "responseLatency": "प्रतिक्रिया विलंबता:",
    "recordCapacity": "रिकॉर्ड क्षमता:",
    "units": "इकाइयां",
    "checked": "जांच की गई:",
    "configureReport": "अपराध विश्लेषिकी पीडीएफ रिपोर्ट कॉन्फ़िगर करें (SmartBrowz एकीकरण)",
    "reportClass": "रिपोर्ट वर्ग",
    "classInvestigation": "राज्य अपराध सारांश और जांच विश्लेषिकी",
    "classTrends": "जिलावार अपराध प्रवृत्ति विश्लेषिकी",
    "classOffenders": "आरोपी और आदतन अपराधी पुनरावृत्ति जोखिम निर्देशिका",
    "classAudit": "सिस्टम एक्सेस ऑडिट ट्रेल निर्यात",
    "temporalScope": "समय सीमा",
    "scope30days": "पिछले 30 दिन (मानक ऑडिट)",
    "scope90days": "पिछली तिमाही (Q2 2026)",
    "scope1year": "पिछले 12 महीने (व्यापक)",
    "scopeCustom": "कस्टम तिथि सीमा (सभी समय)",
    "districtJurisdiction": "जिला अधिकार क्षेत्र",
    "distAll": "सभी कर्नाटक जिले (SCRB एकत्रित)",
    "distBlr": "बेंगलुरु शहर (शहरी)",
    "distMys": "मैसूर शहर",
    "distMng": "मंगलुरु शहर",
    "distHbl": "हुबली-धारवाड़",
    "maskPii": "नागरिक PII / आधार हैश को मास्क करें (प्रत्यक्ष अनुपालन सुरक्षा)",
    "autoSign": "वर्तमान अधिकारी आईडी के साथ स्वचालित रूप से उत्पन्न पीडीएफ पर हस्ताक्षर करें",
    "compileReport": "कार्यकारी पीडीएफ रिपोर्ट संकलित करें",
    "generating": "दस्तावेज़ तैयार किया जा रहा है...",
    "resetParams": "मापदंड रीसेट करें",
    "zohoSmartBrowz": "ज़ोहो स्मार्टब्राउज़ पीडीएफ कंपाइलर",
    "serverlessEngine": "सर्वरलेस कंपाइल इंजन",
    "serverlessEngineDesc": "रिपोर्ट संकलन स्मार्टब्राउज़ के माध्यम से ज़ोहो कैटेलिस्ट सर्वरलेस माइक्रो-सेवाओं को सौंपा गया है। पहले से भरे हुए टेम्पलेट वैक्टर और चार्ट को सीधे हस्ताक्षरित A4 पीडीएफ रिपोर्ट में प्रस्तुत करते हैं।",
    "compilingAssets": "संपत्तियां संकलित की जा रही हैं...",
    "pdfSuccess": "पीडीएफ सफलतापूर्वक संकलित",
    "pdfSuccessDesc": "रिपोर्ट सुरक्षा हैश के साथ हस्ताक्षरित है और आपके वर्कस्टेशन पर डाउनलोड की गई है। आईडी: ",
    "offenderProfilingTitle": "अपराधशास्त्र आधारित अपराधी प्रोफाइलिंग",
    "offenderProfilingDesc": "ज्ञात आदतन अपराधियों, कार्यप्रणाली (MO) और पुनरावृत्ति जोखिम का विश्लेषण करें।",
    "dbSyncActive": "KSP डेटाबेस सिंक सक्रिय",
    "filtersParameters": "फ़िल्टर और पैरामीटर",
    "searchPlaceholder": "नाम, उपनाम, MO या आईडी द्वारा खोजें...",
    "riskTier": "जोखिम स्तर",
    "district": "ज़िला",
    "allRiskTiers": "सभी जोखिम स्तर",
    "highRisk": "उच्च जोखिम",
    "mediumRisk": "मध्यम जोखिम",
    "lowRisk": "कम जोखिम",
    "allDistricts": "सभी ज़िले",
    "showRepeatOnly": "केवल आदतन अपराधी दिखाएं (isRepeatOffender = true)",
    "matchingOffenders": "मिलान करने वाले अपराधी",
    "noOffendersMatch": "निर्दिष्ट फ़िल्टर मानदंडों से कोई अपराधी मेल नहीं खाता।",
    "cases": "मामले",
    "selectOffenderInstructions": "पूर्ण अपराधशास्त्रीय प्रोफ़ाइल देखने के लिए साइडबार से एक अपराधी का चयन करें।",
    "aliases": "उपनाम:",
    "none": "कोई नहीं",
    "yrs": "वर्ष",
    "moSignature": "कार्यप्रणाली (MO) हस्ताक्षर",
    "biometricLinkStatus": "बायोमेट्रिक लिंक स्थिति",
    "aadharHashVerified": "आधार हैश सत्यापित",
    "lastKnownActivity": "अंतिम ज्ञात गतिविधि",
    "addressesRegistered": "पंजीकृत पते",
    "recidivismWarningEngine": "पुनरावृत्ति संभावना और चेतावनी इंजन (QuickML मॉडल)",
    "catalystQuickMlLive": "कैटेलिस्ट QUICKML लाइव",
    "riskScore": "जोखिम स्कोर",
    "criticalRiskTier": "गंभीर जोखिम स्तर",
    "mediumWarningTier": "मध्यम चेतावनी स्तर",
    "lowAttentionTier": "कम ध्यान स्तर",
    "predictedCrimeType": "अनुमानित अपराध का प्रकार",
    "predictedZone": "उच्च संभावना क्षेत्र",
    "timelineProjection": "समयरेखा प्रक्षेपण",
    "highProbabilityZone": "उच्च संभावना क्षेत्र",
    "modelLastUpdated": "मॉडल अंतिम अपडेट",
    "identifiedRiskFactors": "पहचाने गए जोखिम कारक",
    "recidivismTimelineTargets": "पुनरावृत्ति समयरेखा और लक्ष्य",
    "modelTransparencyDisclosure": "एल्गोरिदम मॉडल पारदर्शिता प्रकटीकरण:",
    "modelTransparencyText": "पुनरावृत्ति संभावना स्कोर मशीन लर्निंग रिग्रेशन मॉडल का उपयोग करके बहु-कारक चौराहे के भार पर संसाधित किए जाते हैं। ये गणितीय अनुमान केवल कानून प्रवर्तन संसाधन अनुकूलन के लिए हैं और प्राथमिक न्यायिक साक्ष्य के रूप में उपयोग नहीं किए जाने चाहिए।",
    "noPredictiveMetrics": "इस संदिग्ध आईडी के लिए कोई उन्नत भविष्य कहनेवाला पुनरावृत्ति मेट्रिक्स उपलब्ध नहीं हैं।",
    "criminalCaseTimeline": "आपराधिक मामला समयरेखा",
    "noActiveCaseAssociations": "सिस्टम में कोई सक्रिय मामला संबंध सूचीबद्ध नहीं है।",
    "linkedToCrimeEvent": "सह-आरोपी / मुख्य संदिग्ध के रूप में अपराध की घटना से जुड़ा हुआ।",
    "firLink": "FIR लिंक",
    "coOffenderDirectory": "सह-अपराधी और सहयोगी निर्देशिका",
    "noCoOffenderLinks": "इस डेटाबेस में कोई ज्ञात सह-अपराधी लिंक पंजीकृत नहीं है।",
    "associate": "सहयोगी",
    "viewProfile": "प्रोफ़ाइल देखें",
    "hotspotsTitle": "अपराध हॉटस्पॉट इंटेलिजेंस — कर्नाटक मानचित्र",
    "hotspotsDesc": "ज़िला और तालुक स्तर का अपराध घनत्व मानचित्र। घटना की मात्रा और गंभीरता के आधार पर वृत्त मार्कर आकार बदलते हैं।",
    "risingCrimeTrends": "बढ़ते अपराध के रुझान",
    "totalHotspotsMonitored": "कुल निगरानी किए गए हॉटस्पॉट",
    "regions": "क्षेत्र",
    "beats": "बीट्स",
    "points": "अंक",
    "networkTitle": "आपराधिक नेटवर्क और सहयोग विश्लेषण",
    "networkDesc": "संदिग्धों, पीड़ितों, वाहनों, फोन नंबरों और बैंक खातों के बीच छिपे संबंधों की खोज करें।",
    "intelDossier": "खुफिया डोजियर (दस्तावेज़)",
    "nodeLabel": "नोड लेबल",
    "typeClassification": "प्रकार / वर्गीकरण",
    "riskAssessmentTier": "जोखिम मूल्यांकन स्तर",
    "metadataProperties": "मेटाडेटा गुण",
    "generateOffenderDossier": "अपराधी डोजियर बनाएं",
    "clickNodePrompt": "डोजियर मेटाडेटा देखने के लिए नेटवर्क मैप के अंदर किसी नोड पर क्लिक करें",
    "legendSuspectHigh": "संदिग्ध (उच्च)",
    "legendSuspectMed": "संदिग्ध (मध्यम)",
    "legendVictim": "पीड़ित",
    "legendLocation": "स्थान",
    "legendVehicle": "वाहन",
    "legendPhone": "फोन",
    "legendAccount": "खाता",
    "legendCase": "मामला",
    "predictiveTitle": "भविष्यवाणी अंतर्दृष्टि और पुनरावृत्ति पूर्वानुमान",
    "predictiveDesc": "एआई जोखिम मॉडलिंग (AutoML / KSP CIRAS RAG) बार-बार अपराध करने की संभावना और क्षेत्रीय अपराध के रुझानों का विश्लेषण करती है।",
    "crimeSpikeForecast": "अपराध वृद्धि का पूर्वानुमान",
    "gangTracker": "संगठित गिरोह ट्रैकर",
    "resourceRecommendations": "संसाधन तैनाती सिफारिशें",
    "recidivismRoster": "उच्च जोखिम पुनरावृत्ति सूची",
    "accusedOffender": "अभियुक्त अपराधी",
    "predictedCrime": "अनुमानित अपराध",
    "targetZone": "लक्ष्य क्षेत्र",
    "triggerFactorsReasoning": "एआई ट्रिगर कारक / तर्क",
    "demographicsAge": "जनसांख्यिकी: अभियुक्तों की आयु",
    "demographicsGender": "जनसांख्यिकी: लिंग अनुपात",
    "faceSearchTitle": "एआई फेस सर्च और संदिग्ध पहचान",
    "faceSearchDesc": "संदिग्ध बायोमेट्रिक चेहरों को स्कैन करने, मिलान करने और लॉग करने के लिए KSP SCRB फेशियल रिकॉग्निशन का उपयोग करें।",
    "biometricProtocol": "बायोमेट्रिक पहचान प्रोटोकॉल और सुरक्षा उपाय",
    "biometricMatchingTerminal": "बायोमेट्रिक मिलान टर्मिनल",
    "recentCognitiveAudits": "हालिया संज्ञानात्मक खोज ऑडिट",
    "secureAccessLog": "सुरक्षित एक्सेस लॉग",
    "financialTitle": "वित्तीय अपराध और लेनदेन लिंक विश्लेषण",
    "financialDesc": "संदिग्ध खाता लेयरिंग (₹50,000 सीमा से कम), खच्चर खाता स्थानांतरण और ड्रग्स मनी ट्रेल को ट्रैक करें।",
    "totalLoggedVolume": "कुल लॉग की गई मात्रा",
    "suspiciousLayering": "संदिग्ध लेयरिंग",
    "structuringAlerts": "संरचित लेनदेन अलर्ट",
    "activeFiuQueries": "सक्रिय FIU प्रश्न",
    "transactionAuditLedger": "लेनदेन ऑडिट लेज़र",
    "moneyTrailTitle": "मनी ट्रेल लिंक विज़ुअलाइज़र",
    "sourceAccount": "स्रोत खाता",
    "destinationAccount": "गंतव्य खाता",
    "linkedOffenderProfile": "लिंक्ड अपराधी प्रोफाइल",
    "settingsTitle": "सिस्टम सेटिंग्स और नियंत्रण",
    "settingsDesc": "सिस्टम प्राथमिकताओं को कॉन्फ़िगर करें, प्रमाणित प्रोफ़ाइल संदर्भ देखें, भूमिकाएं बदलें और सक्रिय सुरक्षा नियंत्रणों का निरीक्षण करें।",
    "authenticatedProfile": "प्रमाणित अधिकारी प्रोफ़ाइल",
    "officerName": "अधिकारी का नाम",
    "psIdentifier": "थाना पहचानकर्ता (PS ID)",
    "rankDesignation": "रैंक / पद",
    "authorizedRole": "वर्तमान अधिकृत भूमिका",
    "homeDistrict": "गृह जिला",
    "attachedPs": "संबद्ध पुलिस स्टेशन",
    "accessibilityPrefs": "अभिगम्यता प्राथमिकताएं",
    "fontScale": "इंटरफ़ेस फ़ॉन्ट स्केल",
    "activeBadges": "सक्रिय गेटवे और सुरक्षा बैज",
    "deploymentInfo": "कैतलिस्ट कोर परिनियोजन जानकारी",
    "userManagementTitle": "उपयोगकर्ता प्रबंधन और क्रेडेंशियल",
    "userManagementDesc": "अधिकृत पुलिस प्रोफाइल प्रबंधित करें, भूमिकाएं सौंपें, सुरक्षा कुंजी रीसेट करें और अधिकारी पहुंच को लॉक/अनलॉक करें।",
    "accessRestrictedSupervisor": "पहुंच प्रतिबंधित — स्तर 4 प्राधिकरण आवश्यक",
    "registerNewOfficer": "नया अधिकारी पंजीकृत करें",
    "authorizedOperatorsDirectory": "अधिकृत सिस्टम ऑपरेटर निर्देशिका",
    "securityRole": "सुरक्षा भूमिका",
    "actions": "कार्रवाई",
    "revokeAccess": "पहुंच रद्द करें",
    "restoreAccess": "पहुंच बहाल करें",
    "biometricEnrollment": "बायोमेट्रिक नामांकन",
    "lastActiveLogin": "अंतिम सक्रिय लॉगिन",
    "activeStatus": "सक्रिय",
    "lockedStatus": "लॉक किया गया",
    "f13Title": "परिचालन तैनाती और जोखिम सिमुलेशन",
    "f13Desc": "डिजिटल-ट्विन क्षेत्र और कार्यक्रम सुरक्षा योजना, काल्पनिक जोखिम पूर्वानुमान और योजना तुलना।",
    "rtccTitle": "रियल-टाइम क्राइम सेंटर (RTCC)",
    "rtccDesc": "लाइव टैक्टिकल कमांड वॉल, रीयल-टाइम एएनपीआर स्कैनर, पीटीजेड कैमरा स्विचर, होयसला फ्लीट ट्रैकर और डायनेमिक घेराबंदी मैट्रिक्स।",
    "operationalSimulationTitle": "परिचालन तैनाती और जोखिम सिमुलेशन सैंडबॉक्स",
    "operationalSimulationDesc": "काल्पनिक क्षेत्र या कार्यक्रम सुरक्षा योजना के लिए भीड़ घनत्व, मौसम की स्थिति और संसाधन तैनाती का अनुकरण करें।",
    "simulationBadge": "सिम्युलेटेड / डेमो डेटा — परिचालन खुफिया जानकारी नहीं।",
    "simulationParameters": "सिमुलेशन पैरामीटर और कारक",
    "personnelCount": "तैनात कर्मी / इकाइयां",
    "crowdDensity": "भीड़ का घनत्व",
    "densityLow": "कम घनत्व",
    "densityModerate": "मध्यम",
    "densityHigh": "उच्च घनत्व",
    "densityPeak": "चरम (त्योहार / मेला)",
    "envCondition": "पर्यावरणीय और मौसम स्थिति",
    "envClear": "साफ मौसम",
    "envRain": "भारी बारिश / मानसून",
    "envLowVisibility": "कम दृश्यता / कोहरा",
    "envFestivalOverlap": "त्योहार की भीड़ का ओवरलैप",
    "deploymentPosture": "तैनाती मुद्रा (Posture)",
    "postureVisiblePerimeter": "दृश्यमान परिधि गार्ड",
    "postureDistributedPatrol": "वितरित मोबाइल गश्त",
    "postureCheckpointFocused": "चेकपॉइंट-केंद्रित प्रवेश",
    "coverageRiskIndex": "कवरेज जोखिम सूचकांक",
    "estResponseTime": "अनुमानित प्रतिक्रिया समय",
    "vulnerabilityAlerts": "भेद्यता और कवरेज अंतर चेतावनियां",
    "planComparisonTitle": "तुलनात्मक कवरेज विश्लेषण (योजना ए बनाम योजना बी)",
    "planAName": "योजना ए (आधारभूत तैनाती)",
    "planBName": "योजना बी (आकस्मिक / उन्नत)",
    "comparePlans": "तैनाती योजनाओं की तुलना करें",
    "comparativeTakeaway": "तुलनात्मक विश्लेषण का निष्कर्ष",
    "coverageScore": "कवरेज अखंडता स्कोर",
    "zoneCoverageMap": "डिजिटल ट्विन कवरेज क्षेत्र मानचित्र",
    "accessPointsLabel": "परिधि पहुंच बिंदु और चेकपोस्ट",
    "activeUnitsLabel": "सक्रिय तैनात इकाइयां",
    "riskReadout": "परिकलित जोखिम परिणाम",
    "unitPaletteTitle": "सामरिक इकाई पैलेट (खींचें और छोड़ें)",
    "unitPaletteDesc": "सेक्टर आवंटित करने के लिए इकाइयों को मानचित्र पर खींचें। पुनर्व्यवस्थित करने के लिए खींचें या हटाने के लिए बाहर निकालें।",
    "personnelBudgetMeter": "कार्मिक क्षमता और बजट",
    "budgetUsed": "प्रयुक्त बजट",
    "budgetRemaining": "शेष बजट",
    "patrolTeam": "गश्ती दल",
    "checkpointPost": "चेकपॉइंट पोस्ट",
    "mobileResponse": "मोबाइल प्रतिक्रिया वाहन",
    "overwatchPost": "ओवरवॉच पोस्ट",
    "dragHint": "तैनात करने के लिए मानचित्र पर खींचें",
    "repositionHint": "पुनर्व्यवस्थित करने के लिए इकाई को खींचें • हटाने के लिए मानचित्र से बाहर खींचें",
    "clearAllUnits": "नक्शा साफ़ करें",
    "resetDefaultLayout": "रीसेट लेआउट",
    "coveredStatus": "सुरक्षित",
    "uncoveredStatus": "असुरक्षित प्रवेश गलियारा",
    "unitCost": "लागत",
    "unitRadius": "दायरा",
    "digiLockerGateTitle": "डिजिलॉकर पहचान सत्यापन गेट",
    "digiLockerGateDesc": "आपातकालीन प्राथमिकता रिपोर्ट दर्ज करने के लिए डिजिलॉकर के माध्यम से अपने क्रेडेंशियल सत्यापित करें।",
    "verifyWithDigiLocker": "डिजिलॉकर से सत्यापित करें",
    "verifiedCitizen": "डिजिलॉकर सत्यापित नागरिक",
    "skipDigiLocker": "सत्यापन के बिना आगे बढ़ें (सामान्य कतार)",
    "uploadMediaEvidence": "फोटो / वीडियो साक्ष्य अपलोड करें",
    "mediaUploadHint": "वैकल्पिक JPG, PNG, MP4 25MB तक",
    "incidentReportDetails": "नागरिक घटना विवरण और प्रेषण डोजियर",
    "autoMatchedSuspects": "एआई ऑटो-मिलान संदिग्ध सुराग (चेहरा समानता)",
    "redirectDepartment": "संबंधित थाने / विभाग को अग्रेषित करें",
    "crimeTrendTimeSeries": "अपराध प्रवृत्ति समय-श्रृंखला (2026 मासिक घटनाएं)",
    "scrbAggregate": "SCRB समुच्चय",
    "activeWatchlist": "सक्रिय आदतन अपराधी निगरानी सूची",
    "viewAllDossiers": "सभी डोजियर देखें →",
    "offenderId": "अपराधी आईडी",
    "fullName": "पूरा नाम",
    "linkedCases": "जुड़े मामले",
    "crimeType": "अपराध का प्रकार",
    "risk": "जोखिम",
    "high": "उच्च",
    "medium": "मध्यम",
    "low": "कम",
    "aiAlerts": "एआई अलर्ट",
    "topHotspots": "प्रमुख हॉटस्पॉट जिले",
    "alert1Title": "सेंधमारी के मामलों में वृद्धि — व्हाइटफील्ड क्षेत्र",
    "alert1Sub": "बेंगलुरु पूर्व | 2 घंटे पहले",
    "alert2Title": "3 मामलों में आदतन अपराधी पैटर्न का पता चला",
    "alert2Sub": "मैसूर जिला | 5 घंटे पहले",
    "alert3Title": "टेक कॉरिडोर के पास साइबर अपराध क्लस्टर बन रहा है",
    "alert3Sub": "बेंगलुरु शहरी | 9 घंटे पहले",
    "alert4Title": "मौसमी वृद्धि का अनुमान — चेन स्नैचिंग, त्योहार की अवधि",
    "alert4Sub": "राज्यव्यापी | 1 दिन पहले",
    "alert5Title": "नियमित मॉडल पुनः प्रशिक्षण सफलतापूर्वक पूरा हुआ",
    "alert5Sub": "सिस्टम | 1 दिन पहले",
    "monthJan": "जन",
    "monthFeb": "फ़र",
    "monthMar": "मार्च",
    "monthApr": "अप्रै",
    "monthMay": "मई",
    "monthJun": "जून",
    "monthJul": "जुला",
    "monthAug": "अग",
    "monthSep": "सित",
    "monthOct": "अक्टू",
    "monthNov": "नव",
    "monthDec": "दिसं",
    "theftRobbery": "चोरी / डकैती",
    "burglary": "सेंधमारी",
    "vehicleTheft": "वाहन चोरी",
    "cybercrime": "साइबर अपराध",
    "assault": "हमला",
    "otherCrime": "अन्य",
    "theftBurglary": "चोरी / सेंधमारी",
    "cyberFraud": "साइबर धोखाधड़ी",
    "assaultViolence": "हमला / हिंसा",
    "urgentSightingAlert": "आपके स्टेशन के लिए तत्काल दृश्य चेतावनी",
    "sightingNotice": "एक नागरिक ने हाल ही में आपके अधिकार क्षेत्र में एक सक्रिय संदिग्ध से मेल खाने वाले दृश्य की सूचना दी है। साक्ष्य की समीक्षा करें।",
    "openDispatchPortal": "डिस्पैच पोर्टल खोलें",
    "scrbBanner": "राज्य अपराध रिकॉर्ड ब्यूरो",
    "startInvestigation": "जांच शुरू करें",
    "liveCitizenFeed": "लाइव नागरिक आपातकालीन घटना फ़ीड",
    "stationAlerts": "थाना अलर्ट",
    "noActiveReports": "आज कोई सक्रिय नागरिक घटना रिपोर्ट दर्ज नहीं है।",
    "location": "स्थान",
    "status": "स्थिति",
    "incidentDescription": "घटना का विवरण:",
    "suspectMatchDetected": "संदिग्ध मिलान का पता चला:",
    "viewFullReport": "पूरी रिपोर्ट और संदिग्ध मिलान देखें",
    "dispatchPatrol": "गश्ती दल रवाना करें",
    "patrolDispatched": "गश्ती दल रवाना",
    "thirteenCapabilities": "13 क्षमताएं",
    "coreSolutions": "मुख्य अपराध खुफिया समाधान (11 क्षमताएं)",
    "governanceModules": "सिस्टम पारदर्शिता और शासन मॉड्यूल (2 क्षमताएं)",
    "launch": "लॉन्च",
    "incidentDossier": "घटना डोजियर",
    "jurisdictionalStation": "अधिकार क्षेत्र का पुलिस स्टेशन",
    "loggedTime": "दर्ज समय",
    "currentStatus": "वर्तमान स्थिति",
    "citizenNarrative": "नागरिक विवरण और घटना की जानकारी",
    "attachedEvidence": "संलग्न साक्ष्य पेलोड",
    "photo": "फोटो",
    "citizenEvidenceDesc": "घटना संदर्भ से जुड़ी नागरिक द्वारा अपलोड की गई साक्ष्य फ़ाइल।",
    "autoMatchResult": "समानांतर एआई संदिग्ध ऑटो-मिलान परिणाम",
    "match": "मिलान",
    "viewSuspectDossier": "संदिग्ध डोजियर देखें",
    "facialMatchDesc": "अपलोड किए गए छवि फ्रेम के आधार पर चेहरे का ज्यामितीय मिलान।",
    "coreIntelligence": "मुख्य खुफिया",
    "governanceAndAudit": "शासन और ऑडिट",
    "twelveMonthCrimeTrend": "12 महीने की अपराध प्रवृत्ति (मामलों की संख्या)",
    "casesRegistered": "पंजीकृत मामले",
    "crimeCategoryDistribution": "अपराध श्रेणीवार वितरण",
    "crimeVolumeComparison": "जिलेवार अपराध मात्रा तुलना",
    "seasonalCrimeActivity": "मौसमी अपराध गतिविधि ओवरले (तिमाही)",
    "twoHoursAgo": "2 घंटे पहले",
    "fiveHoursAgo": "5 घंटे पहले",
    "nineHoursAgo": "9 घंटे पहले",
    "oneDayAgo": "1 दिन पहले",
    "fiveMinutesAgo": "5 मिनट पहले",
    "twelveMinutesAgo": "12 मिनट पहले",
    "oneHourAgo": "1 घंटा पहले",
    "openStatus": "खुला",
    "underInvestigation": "जांच के अधीन",
    "chargesheeted": "आरोप पत्र दायर",
    "closedStatus": "बंद",
    "rising": "बढ़ रहा है",
    "declining": "घट रहा है",
    "stable": "स्थिर",
    "loadingTrendAnalytics": "प्रवृत्ति विश्लेषिकी लोड हो रही है...",
    "trendsAnalytics": "प्रवृत्ति विश्लेषिकी",
    "officialCrimeDataSource": "आधिकारिक अपराध डेटा स्रोत उद्धृत",
    "aiConfidence": "एआई विश्वसनीयता",
    "audit": "ऑडिट",
    "stopSpeaking": "रोकें",
    "speak": "बोलें",
    "hideReasoning": "एआई तर्क मेटाडेटा छुपाएं",
    "showReasoning": "व्याख्यात्मक एआई: तर्क मेटाडेटा देखें",
    "reasoningBullet1": "कैटेलिस्ट NoSQL में 1,000 JSON दस्तावेज़ स्कैन किए गए।",
    "reasoningBullet2": "क्लाउड एपीआई कीफ़्रेज़ मिलान का उपयोग करके वैक्टर फ़िल्टर किए गए।",
    "reasoningBullet3": "विशिष्ट कार्यप्रणाली से मेल खाने वाले रिकॉर्ड निकाले गए।",
    "reasoningBullet4": "मानक SCRB CCTNS डेटाबेस स्कीमा से मिलान किए गए उद्धरण।",
    "intelligenceCommandSuggestions": "खुफिया कमांड सुझाव",
    "roleInvestigator": "जांच अधिकारी",
    "roleAnalyst": "विश्लेषक",
    "roleSupervisor": "पर्यवेक्षक",
    "rolePolicymaker": "नीति निर्माता",
    "roleCitizen": "नागरिक",
    "simulationRole": "सिमुलेशन भूमिका",
    "pendingPatrolDispatch": "गश्ती दल प्रेषण लंबित",
    "pendingInvestigation": "जांच और प्रेषण लंबित",
    "patrolDispatchedLogged": "गश्ती दल रवाना और थाने में दर्ज",
    "pendingVerification": "सत्यापन लंबित",
    "incidentSnatchingDoubleRoad": "दो मोटरसाइकिल सवारों द्वारा सोने की चेन छीनने की घटना। आरोपी डबल रोड की ओर भागे।",
    "incidentBagSnatchingGate": "नागरिक ने प्रवेश द्वार के पास काली पल्सर मोटरसाइकिल पर 2 संदिग्धों द्वारा बैग छीनने की सूचना दी।",
    "incidentOtpScamBank": "ओटीपी घोटाले के लेन-देन की सूचना मिली। बैंकिंग पोर्टल से ₹45,000 की अनधिकृत निकासी।",
    "incidentOtpChallanGateway": "केएसपी ट्रैफिक चालान गेटवे होने का दावा करने वाला संदिग्ध ओटीपी कॉल।",
    "contactNumber": "संपर्क",
    "anonymousReport": "गुमनाम रिपोर्ट",
    "forecastSpikeBangalore": "बेंगलुरु शहरी — मौसमी शादी और मानसून पैटर्न के आधार पर अगले 30 दिनों में चोरी में 40% की वृद्धि का अनुमान है। बीट गश्ती बढ़ाने की सिफारिश की जाती है।",
    "forecastGangTracker": "नेटवर्क-अल्फा गिरोह गतिविधि: एचएसआर चोरी गिरोह के 3 सदस्य हाल ही में मैसूर जिले में सक्रिय हैं। कुवेम्पुनगर थाने को अंतर-अधिकार क्षेत्र अलर्ट जारी किया गया।",
    "forecastResourceDeployment": "प्रारंभिक चेतावनी सिफारिश: प्रतिदिन 18:00 से 22:00 बजे के बीच केआर मार्केट और वाणिज्यिक परिसरों के पास अतिरिक्त गश्ती वाहन तैनात करें।",
    "genderMale": "पुरुष",
    "genderFemale": "महिला",
    "genderOther": "अन्य",
    "socioEconomicTitle": "सामाजिक-आर्थिक और समाजशास्त्रीय अपराध सहसंबंध",
    "sociologicalBriefingTitle": "समाजशास्त्रीय विश्लेषण ब्रीफिंग",
    "sociologicalBriefingText": "तालुका जनगणना प्रोफाइल के साथ CCTNS अपराध रिकॉर्ड का विश्लेषण दर्शाता है कि उच्च शहरी प्रवास और बेरोजगारी दर वाले क्षेत्रों में संपत्ति अपराधों की 2.7 गुना अधिक एकाग्रता दिखाई देती है।",
    "criminologyActionPolicy": "अपराधशास्त्र कार्रवाई नीति:",
    "criminologyActionPolicyText": "व्यावसायिक शराब दुकानों के उच्च घनत्व और तीव्र प्रवासी विस्तार वाले क्षेत्रों में स्थानीय बीट नेटवर्क के विकास को प्राथमिकता दें।",
    "selectCaseFile": "केस फ़ाइल का चयन करें",
    "caseBriefSummary": "केस संक्षिप्त सारांश",
    "similarCaseFinder": "समान मामला खोजक",
    "suggestedLeads": "सुझाए गए जांच सुराग",
    "similarCaseAnalytics": "समान मामला विश्लेषिकी",
    "quickMlModelActive": "कैटेलिस्ट QuickML मॉडल सक्रिय",
    "moDaytimeHousebreaking": "डुप्लिकेट चाबी का उपयोग करके दिन के समय घर में चोरी",
    "moNightHousebreaking": "खिड़की की ग्रिल काटकर रात में घर में चोरी",
    "moChainSnatching": "पल्सर बाइक पर पीछे बैठे सवार द्वारा पैदल यात्रियों की चेन छीनना",
    "moPeddlingDrugs": "कॉलेज परिसरों के पास सिंथेटिक ड्रग्स (एमडीएमए) की तस्करी",
    "moAtmSkimming": "एकांत एटीएम कियोस्क पर एटीएम कार्ड स्किमिंग",
    "moHighwayInterception": "रात में राजमार्ग पर वाहनों को रोककर लूटपाट",
    "moWhatsappFraud": "व्हाट्सएप के जरिए ऑनलाइन निवेश धोखाधड़ी",
    "moPickpocketing": "भीड़-भाड़ के समय बस स्टैंड के पास जेब तराशी",
    "moVishingLottery": "फर्जी लॉटरी जीतने का दावा करने वाला कॉल और ओटीपी धोखाधड़ी",
    "moPersonalEnmity": "व्यक्तिगत दुश्मनी के चलते धारदार हथियार से हमला",
    "moStreetBrawl": "पार्किंग विवाद को लेकर सड़क पर हिंसक झड़प",
    "moKidnappingOmni": "मारुति ओमनी वैन का उपयोग करके फिरौती के लिए नाबालिग का अपहरण",
    "moVehicleTheftMasterKey": "शॉपिंग मॉल पार्किंग से मास्टर चाबी द्वारा दोपहिया वाहन चोरी",
    "moJobPlacementFraud": "सरकारी नौकरी का झांसा देकर नकद राशि की धोखाधड़ी",
    "moDowryHarassment": "दहेज उत्पीड़न के कारण संदिग्ध मौत",
    "triggerParappanaJail": "45 दिन पहले परप्पना अग्रहारा सेंट्रल जेल से रिहा",
    "triggerReleased15Days": "15 दिन पहले न्यायिक हिरासत से रिहा",
    "triggerTwoAssociates": "उसी जिले में दो जाने-माने आपराधिक साथी हाल ही में सक्रिय",
    "triggerMonsoonPattern": "मानसून और त्योहारों के मौसम में अपराध का ऐतिहासिक पैटर्न",
    "triggerUnemployment": "स्थानीय क्षेत्र में उच्च बेरोजगारी और वित्तीय संकट",
    "triggerReconnectCoaccused": "पूर्व सह-आरोपियों के साथ तत्काल पुनर्संपर्क",
    "triggerPhoneCallsSuspects": "संदिग्धों और वांछित व्यक्तियों के साथ सक्रिय फोन संपर्क",
    "triggerFinancialDistress": "गंभीर वित्तीय संकट और ऋणदाताओं के साथ अनसुलझा कर्ज",
    "triggerLockedHouses": "शादियों के मौसम में बंद घरों को निशाना बनाने का पैटर्न",
    "triggerAssociatingHighRisk": "उच्च जोखिम वाले आदतन अपराधियों के साथ निरंतर संगति",
    "triggerUnstableAddress": "अस्थिर आवासीय पता या प्रवासी मजदूरों की आवाजाही",
    "triggerPriorConviction": "समान अपराध प्रकार और कार्यप्रणाली के लिए पिछली सजाएं",
    "triggerHotspotVisits": "अपराध हॉटस्पॉट क्षेत्रों और बाजारों में बार-बार जाना",
    "triggerVehicleAccess": "अपराधों में इस्तेमाल होने वाले पंजीकृत वाहन की उपलब्धता",
    "triggerMdmaTrafficking": "सिंथेटिक ड्रग्स (एमडीएमए) तस्करी का पूर्व इतिहास",
    "triggerHostelSupply": "कॉलेज छात्र छात्रावासों के पास सक्रिय ड्रग आपूर्ति नेटवर्क",
    "triggerEncryptedApp": "एन्क्रिप्टेड मैसेजिंग ऐप संचार में भारी वृद्धि दर्ज",
    "secureCaseBrief": "सुरक्षित मामला संक्षिप्त विवरण",
    "investigationOfficer": "जांच अधिकारी (IO)",
    "legalCitation": "कानूनी धारा उद्धरण",
    "summaryDescription": "सारांश विवरण",
    "moNotes": "कार्यप्रणाली नोट्स (MO)",
    "severity": "गंभीरता",
    "critical": "गंभीर",
    "similarCasesMatchIntro": "विशेषता मिलान से पता चलता है कि डेटाबेस के निम्नलिखित मामले समान कार्यप्रणाली और स्थानिक विशेषताओं को साझा करते हैं:",
    "noSimilarCases": "इस जिला डेटाबेस में कोई समान अपराध हस्ताक्षर नहीं मिले।",
    "suggestedLeadsIntro": "अभियुक्त के सह-आरोपियों की क्राइम मैपिंग और पिछले स्थानों के आधार पर, सिस्टम निम्नलिखित प्राथमिकता सुराग सुझाता है:",
    "leadFinancialPattern": "इस बीट में पंजीकृत अन्य सक्रिय खातों के साथ वित्तीय लिंक पैटर्न का मिलान करें।",
    "leadSharedLocation": "मुख्य संदिग्ध सह-आरोपियों से जुड़े साझा स्थान नोड्स की जांच करें।",
    "leadCdrAnalysis": "अपराध के समय सर्कल क्षेत्र में संदिग्ध के कॉल विवरण रिकॉर्ड (सीडीआर) का सत्यापन करें।",
    "summaryFirGoldOrnaments": "शिकायतकर्ता ने बताया कि दिन के समय उनके आवास से 1.5 लाख रुपये के सोने के गहने चोरी हो गए। डुप्लिकेट चाबी का उपयोग करके घर में प्रवेश किया गया। सीसीटीवी विश्लेषण से संदिग्ध राजू के. की पहचान की गई।",
    "summaryFirWindowGrills": "आरोपियों ने रात में एक बंद घर की रसोई की खिड़की की लोहे की ग्रिल काटकर 3 लाख रुपये नकद और चांदी के सामान चुरा लिए। पड़ोसियों ने दो संदिग्ध व्यक्तियों को देखने की सूचना दी।",
    "summaryFirOtpVishing": "पीड़ित को बैंक प्रबंधक होने का दावा करने वाले एक अज्ञात व्यक्ति का फोन आया। खाता अपग्रेड करने के बहाने नेट बैंकिंग ओटीपी प्राप्त कर 49,800 रुपये का अनधिकृत ट्रांसफर कर लिया गया।",
    "summaryFirPulsarSnatching": "स्थानीय मंदिर से लौटते समय शिकायतकर्ता के पीछे से काली पल्सर बाइक पर दो सवार आए। पीछे बैठे सवार ने 40 ग्राम वजन का सोने का मंगलसूत्र छीन लिया और फरार हो गए।",
    "summaryFirMdmaRaid": "सटीक सूचना के आधार पर छापेमारी की गई। इलाके में कॉलेज छात्रों को बेचने के लिए 15 ग्राम एमडीएमए क्रिस्टल रखने के आरोप में इमरान खान और फातिमा बी. को गिरफ्तार किया गया।",
    "summaryFirGeneric": "दर्ज अपराध के लिए विस्तृत जांच रिपोर्ट। घटना सार्वजनिक क्षेत्र के पास हुई। कार्यप्रणाली ऐतिहासिक रिकॉर्ड से मेल खाती है। उचित कानूनी अधिनियमों के तहत मामला दर्ज किया गया है।",
    "transactionTransfer": "स्थानांतरण",
    "transactionWithdrawal": "निकासी",
    "transactionDeposit": "जमा",
    "transactionStructured": "संरचित लेयरिंग",
    "structuringWarningTitle": "संरचित लेनदेन चेतावनी (आईटी अधिनियम / बीएनएस)",
    "structuringWarningDesc": "यह लेनदेन संरचित लेयरिंग के लक्षण दिखाता है। 24 घंटों के भीतर ₹50,000 (पैन रिपोर्टिंग सीमा) से ठीक नीचे की कई समान राशियां क्रमिक रूप से स्थानांतरित की गईं। यह साइबर अपराध/मादक पदार्थों की अवैध कमाई की लेयरिंग दर्शाता है।",
    "standardTransactionDesc": "मानक लेनदेन मार्ग। इस नोड अनुक्रम के लिए कोई तत्काल चेतावनी नहीं दी गई है।",
    "planABaseline": "योजना ए (मूल रणनीति)",
    "planBContingency": "योजना बी (आकस्मिक रणनीति)",
    "planComparison": "योजना ए बनाम योजना बी तुलना",
    "mapInteractionHint": "इकाई कार्ड को मानचित्र पर खींचें • स्थान बदलने के लिए मार्कर खींचें • हटाने के लिए मार्कर पर क्लिक करें",
    "cost": "लागत",
    "radius": "त्रिज्या",
    "add": "जोड़ें",
    "unitsPlaced": "तैनात इकाइयाँ",
    "pointsAvailable": "अंक उपलब्ध",
    "budgetMaxCapacity": "⚠️ अधिकतम बजट सीमा समाप्त",
    "quickPresets": "त्वरित प्रीसेट",
    "presetMinimal": "न्यूनतम",
    "presetStandard": "मानक",
    "presetFestival": "त्योहार",
    "presetMonsoon": "मानसून",
    "accessPointsSecured": "प्रवेश बिंदु: {0} / {1} सुरक्षित",
    "targetSla": "लक्ष्य एसएलए: < 4.0 मिनट",
    "apsCovered": "{0}/4 प्रवेश द्वार कवर किए गए",
    "tacticalRecommendation": "रणनीतिक सिफारिश:",
    "comparativeMetricsChart": "तुलनात्मक मेट्रिक्स चार्ट",
    "deploymentParameter": "तैनाती पैरामीटर / मीट्रिक",
    "secured": "सुरक्षित",
    "exposed": "खुला/असुरक्षित",
    "coveredByUnitRadius": "✅ सक्रिय इकाई त्रिज्या द्वारा कवर किया गया",
    "noTacticalCoverage": "⚠️ कोई सामरिक इकाई कवरेज नहीं",
    "coverageRadius": "कवरेज दायरा",
    "removeUnit": "इकाई हटाएं",
    "dropUnitHint": "इकाई को मानचित्र पर सटीक स्थान पर छोड़ें",
    "varianceImpact": "भिन्नता / प्रभाव",
    "compareDesc": "योजना ए (बेसलाइन) और योजना बी (आकस्मिक) वास्तविक मानचित्र तैनाती के बीच स्थानिक व्यापार और परिधि जोखिम अंतर का मूल्यांकन करें।",
    "simulationGuardrailText": "सख्त दिशानिर्देश: इकाइयां केवल एक निर्दिष्ट भौगोलिक स्थान/क्षेत्र को कवर करती हैं, किसी व्यक्ति को नहीं। कोई स्वायत्त गतिविधि, संदिग्ध ट्रैक, मुकाबला या निष्प्रभावीकरण नहीं है। यह सैंडबॉक्स केवल क्षेत्र कवरेज जोखिम की गणना करता है।",
    "personnelUnitsBudget": "कार्मिक इकाइयां और बजट लागत",
    "accessPointsSecuredLabel": "सुरक्षित किए गए प्रवेश बिंदु",
    "coverageRiskIndexLabel": "कवरेज जोखिम सूचकांक (0-100)",
    "estResponseTimeLabel": "अनुमानित प्रतिक्रिया समय",
    "displayingHotspots": "अपराध हॉटस्पॉट प्रदर्शित हो रहे हैं",
    "jurisdiction": "अधिकार क्षेत्र",
    "savePlan": "योजना सहेजें",
    "loadPlan": "सहेजी गई योजना लोड करें",
    "savedPlans": "सहेजे गए परिदृश्य और तैनाती",
    "noSavedScenarios": "डेटाबेस में कोई सहेजा गया परिदृश्य नहीं मिला।",
    "saveScenarioModalTitle": "परिचालन तैनाती परिदृश्य सहेजें",
    "scenarioNameLabel": "परिदृश्य का नाम",
    "scenarioSavedSuccess": "परिदृश्य डेटाबेस में सफलतापूर्वक सहेजा गया।",
    "scenarioLoadedSuccess": "परिदृश्य सफलतापूर्वक लोड किया गया।",
    "loadingHotspots": "वास्तविक हॉटस्पॉट लोड हो रहे हैं...",
    "saveToDb": "डेटाबेस में सहेजें",
    "loadFromDb": "डेटाबेस से लोड करें",
    "savedAt": "सहेजा गया समय",
    "loadScenarioAction": "परिदृश्य लोड करें",
    "enterScenarioName": "इस तैनाती परिदृश्य के लिए एक नाम दर्ज करें...",
    "liveWeather": "लाइव मौसम",
    "fetchingLiveWeather": "लाइव मौसम प्राप्त किया जा रहा है...",
    "liveWeatherActive": "लाइव मौसम टेलीमेट्री सक्रिय",
    "serverRiskActive": "सर्वर-साइड जोखिम स्कोरिंग सक्रिय",
    "aiTacticalCommander": "एआई सामरिक संचालन कमांडर",
    "aiCommanderSubtitle": "वास्तविक एफआईआर खुफिया और लाइव मौसम से संचालित सामरिक रणनीतिकार",
    "districtCrimeTelemetry": "जिला अपराध सांख्यिकी",
    "primaryThreatCrime": "प्राथमिक अपराध पैटर्न",
    "activeFIRs": "सक्रिय एफआईआर रिकॉर्ड",
    "aiStrategySelect": "एआई रणनीतिक उद्देश्य चुनें",
    "strategyHotspotTitle": "अपराध हॉटस्पॉट रोकथाम",
    "strategyHotspotDesc": "ऐतिहासिक अपराध पैटर्न के खिलाफ गश्ती और त्वरित प्रतिक्रिया वाहनों की तैनाती करता है।",
    "strategyCordonTitle": "100% परिधि नाकाबंदी और प्रवेश नियंत्रण",
    "strategyCordonDesc": "सभी 4 प्रवेश द्वारों को चेकपॉइंट्स के साथ पूरी तरह से सुरक्षित करता है।",
    "strategyRapidTitle": "त्वरित प्रतिक्रिया और एसएलए गति",
    "strategyRapidDesc": "सभी क्षेत्रों में आपातकालीन प्रतिक्रिया समय को 2.5 मिनट से कम करने के लिए एमआरवी तैनात करता है।",
    "strategyWeatherTitle": "प्रतिकूल मौसम और ऑप्टिकल ओवरवॉच",
    "strategyWeatherDesc": "मौसम के कारण दृश्यता में कमी को दूर करने के लिए ओवरवॉच पोस्ट तैनात करता है।",
    "generateAiPlanBtn": "एआई तैनाती रणनीति उत्पन्न करें",
    "generatingAiPlan": "एआई कमांडर तैनाती की गणना कर रहा है...",
    "aiBriefingTitle": "सामरिक संचालन निर्देश",
    "aiThreatAssessment": "एआई खतरा आकलन",
    "aiStrategicRationale": "रणनीतिक औचित्य और तैनाती",
    "applyToPlanA": "प्लान ए (बेसलाइन) में लागू करें",
    "applyToPlanB": "प्लान बी (आकस्मिक) में लागू करें",
    "aiPlanAppliedSuccess": "एआई सामरिक रणनीति सिमुलेशन योजना में सफलतापूर्वक लोड की गई।",
    "unitPatrolTeamName": "गश्ती दल (क्षेत्रीय गश्त)",
    "unitPatrolShort": "गश्ती",
    "unitPatrolDesc": "अवसरवादी अपराधों को बेअसर करने वाली सक्रिय मोबाइल गश्त।",
    "unitPatrolBadge": "बीट स्वीपिंग",
    "unitPatrolRole": "पैदल गश्त और स्थानीय टोह",
    "unitCheckpointName": "स्थिर परिधि चेकपॉइंट पोस्ट",
    "unitCheckpointShort": "चेकपॉइंट",
    "unitCheckpointDesc": "कड़ी परिधि प्रवेश जांच और सत्यापन।",
    "unitCheckpointBadge": "प्रवेश नियंत्रण",
    "unitCheckpointRole": "प्रवेश नियंत्रण और सत्यापन",
    "unitMrvName": "मोबाइल रिस्पॉन्स वाहन (पीसीआर वैन)",
    "unitMrvShort": "MRV",
    "unitMrvDesc": "आपातकालीन प्रतिक्रिया समय को कम करने वाला उच्च गति मोटर चालित दस्ता।",
    "unitMrvBadge": "त्वरित प्रतिक्रिया",
    "unitMrvRole": "उच्च गति रणनीतिक प्रतिक्रिया",
    "unitOverwatchName": "ओवरवॉच निगरानी नोड",
    "unitOverwatchShort": "ओवरवॉच",
    "unitOverwatchDesc": "उन्नत ऑप्टिकल निगरानी और स्पॉटिंग नोड।",
    "unitOverwatchBadge": "ओवरवॉच टेलीमेट्री",
    "unitOverwatchRole": "दृश्य ट्रैकिंग और निगरानी",
    "alertCoverageGap": "स्थानिक कवरेज अंतर: प्रवेश बिंदु {0} ({1}) पर कोई इकाई कवरेज नहीं है। {2} में महत्वपूर्ण गलियारा खुला है।",
    "alertPersonnelDeficit": "गंभीर कार्मिक घाटा: तैनात कुल सामरिक बजट (< 8 इकाइयाँ) उच्च घनत्व वाली भीड़ के लिए अपर्याप्त है। भीड़ जमाव की संभावना 65% बढ़ गई है।",
    "alertVisibilityHazard": "पर्यावरणीय दृश्यता खतरा: प्रतिकूल मौसम दृश्य त्रिज्या को ~40% कम कर देता है। ओवरवॉच के बिना अंधेरे क्षेत्रों में घटना का पता लगाना कठिन है।",
    "alertChokePointRisk": "प्रवेश संकीर्ण बिंदु जोखिम: त्योहार के चरम प्रवाह में प्राथमिक प्रवेश द्वारों पर बाधाएं। गेट 1 और गेट 2 पर भीड़ बढ़ने का खतरा।",
    "alertFestivalSurge": "त्योहार भीड़ फैलाव: समवर्ती धार्मिक/सांस्कृतिक जुलूस पूर्वी चतुर्थांश में बहु-नोडल भीड़ दबाव बिंदु बनाते हैं।",
    "alertElevatedVulnerability": "बढ़ा हुआ क्षेत्र जोखिम: माध्यमिक परिधि प्रतिक्रिया में देरी 6 मिनट के लक्ष्य से अधिक है।",
    "alertOptimalCoverage": "इष्टतम सेक्टर कवरेज: वर्तमान स्थानिक लेआउट के तहत {0} के सभी 4 पहुंच गलियारे पूरी तरह से सुरक्षित हैं।",
    "recDeployCheckpointPatrol": "{0} को कवर करने के लिए चेकपॉइंट पोस्ट या गश्ती दल तैनात करें।",
    "recMobilizeReserve": "पड़ोसी अधिकार क्षेत्र से न्यूनतम 6 त्वरित प्रतिक्रिया कर्मियों को जुटाएं।",
    "recDeployOverwatch": "ओवरवॉच पोस्ट तैनात करें या उच्च-तीव्रता रोशनी के साथ चेकपॉइंट-केंद्रित प्रवेश मुद्रा पर स्विच करें।",
    "recActiveOverwatchMitigation": "सक्रिय ओवरवॉच ({0} पोस्ट) प्रतिकूल मौसम दृश्यता अंधापन को ~{1}% कम कर रही है।",
    "recOpenSecondaryCorridors": "माध्यमिक आपातकालीन निकास गलियारे खोलें।",
    "recEstablishForwardPost": "मोबाइल प्रतिक्रिया वाहन सहायता के साथ एक अग्रिम सामरिक समन्वय पोस्ट स्थापित करें।",
    "recMrvActive": "मोबाइल रिस्पॉन्स यूनिट सक्रिय: आपातकालीन प्रतिक्रिया एसएलए {0} मिनट तक तेज हुई।",
    "recAddPatrolTeams": "जोखिम सूचकांक को 45 से नीचे लाने के लिए अतिरिक्त गश्ती दल तैनात करें।",
    "recMaintainCheckins": "हर 30 मिनट में सक्रिय रेडियो चेक-इन बनाए रखें। सीसीटीएनएस ऑडिट ट्रेल में टेलीमेट्री लॉग करें।",
    "sopTitle": "मानक संचालन प्रक्रिया (SOP) और अधिकारी संचालन गाइड",
    "sopBadge": "संचालन कैसे करें",
    "sopHide": "गाइड छिपाएं",
    "sopView": "संचालन गाइड देखें",
    "sopAssignedDept": "सौंपा गया विभाग",
    "sopLegalAuth": "कानूनी और नियामक प्राधिकरण",
    "sopEscalation": "एस्केलेशन और फील्ड डिस्पैच",
    "sopWorkflow": "चरण-दर-चरण जांचकर्ता कार्यप्रवाह:",
    "sopTips": "रणनीतिक जांचकर्ता सुझाव और सर्वोत्तम प्रथाएं:",
    "rolePermissionSandbox": "भूमिका अनुमति सैंडबॉक्स",
    "demoRoleSwitcher": "डेमो भूमिका स्विचर",
    "demoRoleSwitcherDesc": "केवल डेमो उद्देश्यों के लिए। उत्पादन में, कैटेलिस्ट IAM अनुमतियों के माध्यम से भूमिकाएं लागू की जाती हैं।",
    "switchCurrentRole": "वर्तमान भूमिका बदलें",
    "accessPermissionForRole": "इस भूमिका के लिए पहुंच अनुमति:",
    "biometricRegistryActive": "बायोमेट्रिक रजिस्ट्री सक्रिय",
    "directoryRestrictedSupervisor": "निर्देशिका सिस्टम पर्यवेक्षकों तक सीमित है",
    "directoryRestrictedDesc": "सिस्टम एक्सेस निर्देशिकाओं को प्रबंधित करने, अधिकारी खातों को टॉगल करने या बायोमेट्रिक प्रमाणीकरण रजिस्ट्रियों को रीसेट करने के लिए, अपनी भूमिका को पर्यवेक्षक में बदलने हेतु ऊपर दिए गए रोल परमिशन सैंडबॉक्स का उपयोग करें।",
    "registerOfficerTitle": "जांच अधिकारी पंजीकृत करें",
    "psIdentifierLabel": "थाना पहचानकर्ता (PS ID)",
    "officerNameLabel": "अधिकारी का नाम",
    "rankLabel": "पद",
    "securityRoleLabel": "सुरक्षा भूमिका",
    "policeStationLabel": "पुलिस स्टेशन",
    "cancelButton": "रद्द करें",
    "registerOfficerButton": "अधिकारी पंजीकृत करें",
    "lockAccessButton": "पहुंच लॉक करें",
    "unlockAccessButton": "पहुंच अनलॉक करें",
    "statusActive": "सक्रिय",
    "statusLocked": "लॉक किया गया",
    "crimeCopilotTitle": "प्रज्ञा-AI अपराध कोपायलट",
    "cctnsRagConnected": "CCTNS RAG इंटेलिजेंस स्टोर से कनेक्टेड",
    "quickMlBadge": "QUICK ML",
    "newChatButton": "नई चैट",
    "exportPdfButton": "पीडीएफ निर्यात करें",
    "clearChatButton": "चैट साफ़ करें",
    "whatToInvestigate": "आप क्या जांचना चाहते हैं, {0}?",
    "chatHeroSubtitle": "CCTNS अपराध रजिस्टरों से प्रश्न करें, संदिग्ध डोजियर बनाएं, कार्यप्रणाली (MO) हस्ताक्षरों का मिलान करें या सेकंडों में केस ब्रीफ तैयार करें।",
    "investigationHistory": "जांच इतिहास",
    "newInvestigationChat": "नई जांच चैट",
    "searchPastCases": "पिछले मामले और चैट खोजें...",
    "timeToday": "आज",
    "timePrevious7Days": "पिछले 7 दिन",
    "timeOlder": "पुराने",
    "noPastChats": "कोई पिछला जांच चैट नहीं मिला।",
    "chatDisclaimer": "प्रज्ञा-AI स्वचालित अपराध विश्लेषण और केस संश्लेषण प्रदान करता है। आधिकारिक CCTNS केस डायरी के साथ संदर्भों को हमेशा सत्यापित करें।",
    "incidentAtmSkimming": "एकांत एटीएम कियोस्क पर एटीएम कार्ड स्किमिंग की सूचना",
    "incidentTwoWheelerStolen": "मास्टर चाबी का उपयोग करके मॉल पार्किंग से दोपहिया वाहन चोरी",
    "incidentHouseBreakIn": "डुप्लिकेट चाबी का उपयोग करके दिन के समय आवासीय घर में चोरी",
    "incidentChainSnatching": "पल्सर बाइक पर पीछे बैठे सवार द्वारा चेन स्नेचिंग",
    "incidentMdmaPeddling": "कॉलेज परिसर के पास सिंथेटिक ड्रग्स (एमडीएमए) की तस्करी",
    "incidentLotteryVishing": "फर्जी लॉटरी जीतने का दावा करने वाला कॉल और ओटीपी धोखाधड़ी",
    "incidentShopBreakIn": "दुकान का शटर तोड़कर नकदी की चोरी",
    "incidentAssaultBrawl": "पार्किंग विवाद को लेकर सड़क पर हिंसक झड़प और हमला",
    "suspectReasonCctv": "सीसीटीवी चेहरा पहचान मिलान के माध्यम से पहचान की गई",
    "suspectReasonCellTower": "सेलुलर टॉवर डंप और सीडीआर टाइमस्टैम्प द्वारा सहसंबद्ध",
    "suspectReasonNafis": "NAFIS फिंगरप्रिंट रिपॉजिटरी के खिलाफ मिलान किया गया",
    "suspectReasonInformer": "खुफिया मुखबिर की गोपनीय सूचना के आधार पर",
    "suspectReasonMuleAccount": "वित्तीय ट्रेल में प्राथमिक खच्चर खाता लाभार्थी के रूप में पहचाना गया",
    "unitPatrolName": "बीट स्वीपिंग गश्ती दल",
    "rank": "पद",
    "securitySafeguardsProtocol": "सुरक्षा सुरक्षा उपाय और पहुंच नियंत्रण",
    "maskPiiDesc": "DPDP अधिनियम 2023 के अनुपालन में डेटाबेस स्तर पर नागरिकों के बायोमेट्रिक रिकॉर्ड मास्क किए गए हैं।",
    "vpnTunnelDesc": "पहुंच अधिकृत पुलिस स्टेशन सबनेट और टीएलएस 1.3 सुरक्षित गेटवे तक सीमित है।",
    "immutableAuditDesc": "सभी प्रश्न, निर्यात क्रियाएं और क्रेडेंशियल परिवर्तन सुरक्षा ऑडिट लॉग उत्पन्न करते हैं।",
    "inactivityDesc": "15 मिनट की निष्क्रियता का पता चलने पर टर्मिनल स्वचालित रूप से सत्र समाप्त करते हैं।",
    "operatorDirectoryDesc": "सक्रिय टर्मिनल पहुंच अधिकारों वाले पुलिस कर्मियों का रोस्टर।",
    "history": "इतिहास",
    "searchBySuspectTxnAccount": "संदिग्ध, लेनदेन आईडी या खाते द्वारा खोजें...",
    "allTypes": "सभी प्रकार",
    "suspiciousOnly": "केवल संदिग्ध",
    "transactionId": "लेनदेन आईडी",
    "senderFrom": "प्रेषक (खाता)",
    "recipientTo": "प्राप्तकर्ता (खाता)",
    "cctnsAnalysisSummary": "CCTNS खुफिया विश्लेषण सारांश:",
    "standardTxnPath": "मानक लेनदेन पथ। इस नोड अनुक्रम के लिए कोई तत्काल संरचनात्मक अलर्ट सक्रिय नहीं हुआ।",
    "criminologyModusOperandi": "अपराध कार्यप्रणाली (MO):",
    "associatedFinancialAccounts": "संबंधित वित्तीय खाते:",
    "noRegisteredSuspectTxn": "इस लेनदेन पहचानकर्ता से कोई पंजीकृत संदिग्ध सीधे अनुक्रमित नहीं है।",
    "structuringLayerAlert": "संरचित लेयरिंग (अलर्ट)",
    "directTransfer": "प्रत्यक्ष स्थानांतरण",
    "selectTxnRowTrace": "लिंक नोड ट्रेस निष्पादित करने के लिए लेनदेन पंक्ति का चयन करें।",
    "crimeTrendTitle": "12-महीने का अपराध रुझान (मामलों की मात्रा)",
    "totalCases": "कुल: {0} मामले",
    "crimeVolumeByDistrict": "जिलेवार अपराध मात्रा तुलना",
    "casesUnit": "मामले",
    "seasonalOverlayTitle": "मौसमी अपराध गतिविधि ओवरले (त्रैमासिक)",
    "theftBurglaryLegend": "चोरी / नकबजनी",
    "cyberFraudLegend": "साइबर धोखाधड़ी",
    "assaultViolenceLegend": "हमला / हिंसा",
    "ageGroup1825": "18-25 वर्ष",
    "ageGroup2635": "26-35 वर्ष",
    "ageGroup3645": "36-45 वर्ष",
    "ageGroup46Plus": "46+ वर्ष",
    "totalRecords": "कुल: {0} रिकॉर्ड",
    "socioEconomicCorrelations": "सामाजिक-आर्थिक और समाजशास्त्रीय अपराध सहसंबंध",
    "sociologicalBriefingDesc": "तालुक जनगणना प्रोफाइल के साथ CCTNS अपराध रिकॉर्ड का विश्लेषण इंगित करता है कि उच्च शहरी प्रवासन और बेरोजगारी दर वाले क्षेत्रों में अवसरवादी संपत्ति अपराधों की 2.7 गुना अधिक सांद्रता दिखाई देती है।",
    "criminologyActionPolicyDesc": "वाणिज्यिक शराब दुकानों के उच्च घनत्व और तीव्र प्रवासी विस्तार वाले क्षेत्रों में स्थानीय बीट नेटवर्क के विकास को प्राथमिकता दें।",
    "decisionSupportBadge": "निर्णय समर्थन",
    "casesBadge": "मामले",
    "caseBriefSummaryTab": "केस संक्षिप्त सारांश",
    "similarCaseFinderTab": "समान केस खोजक",
    "suggestedLeadsTab": "सुझाए गए सुराग",
    "secureGateQuickML": "सुरक्षित गेट: कैटलिस्ट क्विकएमएल (बाहरी मॉडल)",
    "auditTrailId": "ऑडिट ट्रेल आईडी"
  }
};

export type Language = 'en' | 'kn' | 'hi';

export type TranslationKey = keyof typeof translations.en;

export const formatMonthName = (monthStr: string, t: (key: TranslationKey) => string): string => {
  const m = monthStr.toUpperCase().trim();
  if (m.startsWith('JAN')) return t('monthJan');
  if (m.startsWith('FEB')) return t('monthFeb');
  if (m.startsWith('MAR')) return t('monthMar');
  if (m.startsWith('APR')) return t('monthApr');
  if (m.startsWith('MAY')) return t('monthMay');
  if (m.startsWith('JUN')) return t('monthJun');
  if (m.startsWith('JUL')) return t('monthJul');
  if (m.startsWith('AUG')) return t('monthAug');
  if (m.startsWith('SEP')) return t('monthSep');
  if (m.startsWith('OCT')) return t('monthOct');
  if (m.startsWith('NOV')) return t('monthNov');
  if (m.startsWith('DEC')) return t('monthDec');
  return monthStr;
};

export const formatCrimeType = (crime: string, t: (key: TranslationKey) => string): string => {
  if (!crime) return '';
  const c = crime.toLowerCase();
  if (c.includes('theft') && c.includes('robbery')) return t('theftRobbery');
  if (c.includes('theft') && c.includes('burglary')) return t('theftBurglary');
  if (c.includes('chain') && c.includes('snatch')) return t('theftRobbery');
  if (c.includes('vehicle')) return t('vehicleTheft');
  if (c.includes('burglary') || c.includes('housebreaking')) return t('burglary');
  if (c.includes('cyber') && c.includes('fraud')) return t('cyberFraud');
  if (c.includes('cyber')) return t('cybercrime');
  if (c.includes('assault') && c.includes('violence')) return t('assaultViolence');
  if (c.includes('assault')) return t('assault');
  if (c.includes('other')) return t('otherCrime');
  return crime;
};

export const formatRisk = (risk: string, t: (key: TranslationKey) => string): string => {
  if (!risk) return '';
  const r = risk.toLowerCase();
  if (r === 'high' || r === 'elevated') return t('high');
  if (r === 'medium' || r === 'moderate') return t('medium');
  if (r === 'low') return t('low');
  if (r === 'critical') return t('critical');
  return risk;
};

export const formatSeverity = (severity: string, t: (key: TranslationKey) => string): string => {
  if (!severity) return '';
  const s = severity.toLowerCase();
  if (s === 'critical') return t('critical');
  if (s === 'high') return t('high');
  if (s === 'medium') return t('medium');
  if (s === 'low') return t('low');
  return severity;
};

export const formatIncidentStatus = (status: string, t: (key: TranslationKey) => string): string => {
  if (!status) return '';
  const s = status.toLowerCase();
  if (s.includes('dispatched') && s.includes('logged')) return t('patrolDispatchedLogged');
  if (s.includes('dispatched')) return t('patrolDispatched');
  if (s.includes('pending') && (s.includes('dispatch') || s.includes('investigation'))) return t('pendingPatrolDispatch');
  if (s.includes('pending') && s.includes('verification')) return t('pendingVerification');
  if (s.includes('chargesheet')) return t('chargesheeted');
  if (s.includes('under') && s.includes('investigation')) return t('underInvestigation');
  if (s.includes('open')) return t('openStatus');
  if (s.includes('closed')) return t('closedStatus');
  return status;
};

export const formatIncidentDetails = (details: string, t: (key: TranslationKey) => string): string => {
  if (!details) return '';
  const d = details.toLowerCase();
  if (d.includes('atm card skimming')) return t('incidentAtmSkimming');
  if (d.includes('two-wheeler stolen')) return t('incidentTwoWheelerStolen');
  if (d.includes('residential house break-in')) return t('incidentHouseBreakIn');
  if (d.includes('chain snatching')) return t('incidentChainSnatching');
  if (d.includes('synthetic drugs mdma')) return t('incidentMdmaPeddling');
  if (d.includes('fake lottery prize')) return t('incidentLotteryVishing');
  if (d.includes('commercial shop break-in')) return t('incidentShopBreakIn');
  if (d.includes('assault near pub')) return t('incidentAssaultBrawl');
  return details;
};

export const formatFIRSummary = (summary: string, t: (key: TranslationKey) => string): string => {
  if (!summary) return '';
  const s = summary.toLowerCase();
  if (s.includes('gold ornaments') || s.includes('duplicate key')) return t('summaryFirGoldOrnaments');
  if (s.includes('window') || s.includes('iron grills')) return t('summaryFirWindowGrills');
  if (s.includes('vishing') || s.includes('otp') || s.includes('bank manager')) return t('summaryFirOtpVishing');
  if (s.includes('pulsar') || s.includes('mangalsutra')) return t('summaryFirPulsarSnatching');
  if (s.includes('mdma') || s.includes('crystals') || s.includes('college students')) return t('summaryFirMdmaRaid');
  return t('summaryFirGeneric');
};

export const formatTransactionType = (type: string, t: (key: TranslationKey) => string): string => {
  if (!type) return '';
  const tp = type.toLowerCase();
  if (tp.includes('transfer')) return t('transactionTransfer');
  if (tp.includes('withdrawal')) return t('transactionWithdrawal');
  if (tp.includes('deposit')) return t('transactionDeposit');
  if (tp.includes('structured') || tp.includes('layering')) return t('transactionStructured');
  return type;
};

export const formatGender = (gender: string, t: (key: TranslationKey) => string): string => {
  if (!gender) return '';
  const g = gender.toLowerCase();
  if (g.startsWith('m')) return t('genderMale');
  if (g.startsWith('f')) return t('genderFemale');
  return t('genderOther');
};

export const formatSuspectReason = (reason: string, t: (key: TranslationKey) => string): string => {
  if (!reason) return '';
  const r = reason.toLowerCase();
  if (r.includes('cctv') && r.includes('identified')) return t('suspectReasonCctv');
  if (r.includes('cell tower') || r.includes('cdr')) return t('suspectReasonCellTower');
  if (r.includes('latent') || r.includes('fingerprint') || r.includes('nafis')) return t('suspectReasonNafis');
  if (r.includes('informer') || r.includes('tip-off') || r.includes('tip off')) return t('suspectReasonInformer');
  if (r.includes('mule') || r.includes('financial') || r.includes('beneficiary')) return t('suspectReasonMuleAccount');
  return reason;
};

export const formatModusOperandi = (mo: string, t: (key: TranslationKey) => string): string => {
  if (!mo) return '';
  const m = mo.toLowerCase();
  if (m.includes('duplicate key') || (m.includes('daytime') && m.includes('housebreaking'))) return t('moDaytimeHousebreaking');
  if (m.includes('window') || (m.includes('night') && m.includes('housebreaking'))) return t('moNightHousebreaking');
  if (m.includes('chain') || m.includes('pulsar')) return t('moChainSnatching');
  if (m.includes('drug') || m.includes('mdma') || m.includes('peddling')) return t('moPeddlingDrugs');
  if (m.includes('skimming') || m.includes('atm')) return t('moAtmSkimming');
  if (m.includes('highway') || m.includes('interception')) return t('moHighwayInterception');
  if (m.includes('whatsapp') || (m.includes('investment') && m.includes('fraud'))) return t('moWhatsappFraud');
  if (m.includes('pickpocket') || m.includes('bus stand')) return t('moPickpocketing');
  if (m.includes('vishing') || m.includes('lottery') || m.includes('otp')) return t('moVishingLottery');
  if (m.includes('personal enmity') || m.includes('sharp weapon')) return t('moPersonalEnmity');
  if (m.includes('brawl') || m.includes('parking dispute')) return t('moStreetBrawl');
  if (m.includes('kidnapping') || m.includes('omni') || m.includes('ransom')) return t('moKidnappingOmni');
  if (m.includes('vehicle theft') || m.includes('master key')) return t('moVehicleTheftMasterKey');
  if (m.includes('job') || m.includes('placement fraud')) return t('moJobPlacementFraud');
  if (m.includes('dowry') || m.includes('harassment')) return t('moDowryHarassment');
  return mo;
};

export const formatTriggerFactor = (trigger: string, t: (key: TranslationKey) => string): string => {
  if (!trigger) return '';
  const tr = trigger.toLowerCase();
  if (tr.includes('parappana') || tr.includes('central jail')) return t('triggerParappanaJail');
  if (tr.includes('15 days') || tr.includes('judicial custody')) return t('triggerReleased15Days');
  if (tr.includes('two known associates') || tr.includes('co-accused')) return t('triggerTwoAssociates');
  if (tr.includes('monsoon') || tr.includes('festival season')) return t('triggerMonsoonPattern');
  if (tr.includes('unemployment') || tr.includes('industrial area')) return t('triggerUnemployment');
  if (tr.includes('reconnecting') || tr.includes('co-accused cluster')) return t('triggerReconnectCoaccused');
  if (tr.includes('phone communications') || tr.includes('fenced goods')) return t('triggerPhoneCallsSuspects');
  if (tr.includes('financial distress') || tr.includes('debt')) return t('triggerFinancialDistress');
  if (tr.includes('locked houses') || tr.includes('wedding season')) return t('triggerLockedHouses');
  if (tr.includes('associating') || tr.includes('high-risk repeat')) return t('triggerAssociatingHighRisk');
  if (tr.includes('unstable') || tr.includes('migrant worker')) return t('triggerUnstableAddress');
  if (tr.includes('multiple prior convictions') || tr.includes('prior conviction')) return t('triggerPriorConviction');
  if (tr.includes('hotspot') || tr.includes('commercial corridors')) return t('triggerHotspotVisits');
  if (tr.includes('vehicle access') || tr.includes('registered getaway')) return t('triggerVehicleAccess');
  if (tr.includes('narcotics') || tr.includes('synthetic drugs')) return t('triggerMdmaTrafficking');
  if (tr.includes('hostel') || tr.includes('college student')) return t('triggerHostelSupply');
  if (tr.includes('encrypted messaging') || tr.includes('burner sim')) return t('triggerEncryptedApp');
  return trigger;
};

export const formatTimeline = (timeline: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!timeline) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  if (!isKn && !isHi) return timeline;
  const tl = timeline.toLowerCase();
  if (tl.includes('60%') || tl.includes('6 weeks')) return '60% ' + (isKn ? 'ಸಂಭವನೀಯತೆ ೬ ವಾರಗಳಲ್ಲಿ' : 'संभावना 6 सप्ताह के भीतर');
  if (tl.includes('75%') || tl.includes('30 days')) return '75% ' + (isKn ? 'ಸಂಭವನೀಯತೆ ೩೦ ದಿನಗಳಲ್ಲಿ' : 'संभावना 30 दिनों के भीतर');
  if (tl.includes('85%') || tl.includes('14 days')) return '85% ' + (isKn ? 'ಸಂಭವನೀಯತೆ ೧೪ ದಿನಗಳಲ್ಲಿ' : 'संभावना 14 दिनों के भीतर');
  if (tl.includes('40%') || tl.includes('3 months')) return '40% ' + (isKn ? 'ಸಂಭವನೀಯತೆ ೩ ತಿಂಗಳುಗಳಲ್ಲಿ' : 'संभावना 3 महीनों के भीतर');
  if (tl.includes('90%') || tl.includes('7 days')) return '90% ' + (isKn ? 'ಸಂಭವನೀಯತೆ ೭ ದಿನಗಳಲ್ಲಿ' : 'संभावना 7 दिनों के भीतर');
  return timeline;
};

export const formatUnitName = (name: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!name) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  const n = name.toLowerCase();

  // Canonical English returns when in English mode
  if (!isKn && !isHi) {
    if (n.includes('k-9') || n.includes('canine') || n.includes('sniffer')) return 'K-9 Sniffer & Tracking Canine Squad';
    if (n.includes('swat') || n.includes('qrf') || n.includes('assault')) return 'QRF Tactical Assault Squad (SWAT)';
    if (n.includes('anpr') || n.includes('smart barricade')) return 'ANPR Smart Camera Barricade';
    if (n.includes('bike') || n.includes('motorcycle') || n.includes('pursuit')) return 'Traffic Interceptor Motorcycle Squad';
    if (n.includes('mounted') || n.includes('cavalry')) return 'Mounted Police Cavalry Squad';
    if (n.includes('target') || n.includes('fugitive') || n.includes('suspect')) return 'Target Suspect / Fugitive Pin';
    if (n.includes('patrol team') || n.includes('beat')) return t('unitPatrolName') || 'Beat Sweeping Patrol Squad';
    if (n.includes('checkpoint')) return t('unitCheckpointName') || 'Static Perimeter Checkpoint Post';
    if (n.includes('mobile response') || n.includes('pcr')) return t('unitMrvName') || 'Mobile Response Vehicle (PCR Van)';
    if (n.includes('overwatch') || n.includes('spotting node') || n.includes('drone')) return t('unitOverwatchName') || 'Overwatch Observation Node';
    return name;
  }

  // Kannada & Hindi translations
  if (n.includes('k-9') || n.includes('canine') || n.includes('sniffer')) {
    return isKn ? 'K-9 ಸ್ನಿಫರ್ & ಟ್ರ್ಯಾಕಿಂಗ್ ಶ್ವಾನ ದಳ' : 'K-9 खोजी व ट्रैकिंग श्वान दस्ता';
  }
  if (n.includes('swat') || n.includes('qrf') || n.includes('assault')) {
    return isKn ? 'ಕ್ಯೂಆರ್‌ಎಫ್ ಕಾರ್ಯತಂತ್ರದ ದಾಳಿ ದಳ (SWAT)' : 'क्यूआरएफ सामरिक असॉल्ट दस्ता (SWAT)';
  }
  if (n.includes('anpr') || n.includes('smart barricade')) {
    return isKn ? 'ಎಎನ್‌ಪಿಆರ್ ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಮೆರಾ ಬ್ಯಾರಿಕೇಡ್' : 'एएनपीआर स्मार्ट कैमरा बैरिकेड';
  }
  if (n.includes('bike') || n.includes('motorcycle') || n.includes('pursuit')) {
    return isKn ? 'ಟ್ರಾಫಿಕ್ ಇಂಟರ್‌ಸೆಪ್ಟರ್ ಮೋಟಾರ್‌ಸೈಕಲ್ ದಳ' : 'ट्रैफिक इंटरसेप्टर मोटरसाइकिल दस्ता';
  }
  if (n.includes('mounted') || n.includes('cavalry')) {
    return isKn ? 'ಮೌಂಟೆಡ್ ಪೊಲೀಸ್ ಅಶ್ವದಳ' : 'माउंटेड पुलिस घुड़सवार दस्ता';
  }
  if (n.includes('target') || n.includes('fugitive') || n.includes('suspect')) {
    return isKn ? 'ಟಾರ್ಗೆಟ್ ಶಂಕಿತ / ಪರಾರಿಯಾದವರ ಗುರುತು' : 'लक्षित संदिग्ध / भगोड़ा पिन';
  }
  if (n.includes('patrol team') || n.includes('beat')) return t('unitPatrolName');
  if (n.includes('checkpoint')) return t('unitCheckpointName');
  if (n.includes('mobile response') || n.includes('pcr')) return t('unitMrvName');
  if (n.includes('overwatch') || n.includes('spotting node') || n.includes('drone')) return t('unitOverwatchName');
  return name;
};

export const formatUnitShortName = (shortName: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!shortName) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  const s = shortName.toLowerCase();

  // Canonical English returns
  if (!isKn && !isHi) {
    if (s.includes('k-9') || s.includes('canine')) return 'K-9 Squad';
    if (s.includes('swat') || s.includes('qrf')) return 'QRF Team';
    if (s.includes('anpr')) return 'ANPR Gate';
    if (s.includes('bike')) return 'Bike Pursuit';
    if (s.includes('mounted')) return 'Mounted Cavalry';
    if (s.includes('suspect') || s.includes('target')) return 'Suspect';
    if (s.includes('patrol')) return t('unitPatrolShort') || 'Patrol';
    if (s.includes('checkpoint')) return t('unitCheckpointShort') || 'Checkpoint';
    if (s.includes('mrv') || s.includes('response')) return t('unitMrvShort') || 'MRV';
    if (s.includes('overwatch') || s.includes('surveillance')) return t('unitOverwatchShort') || 'Overwatch';
    return shortName;
  }

  // Kannada & Hindi translations
  if (s.includes('k-9') || s.includes('canine')) return isKn ? 'K-9 ಶ್ವಾನ' : 'K-9 श्वान';
  if (s.includes('swat') || s.includes('qrf')) return isKn ? 'ಕ್ಯೂಆರ್‌ಎಫ್ ದಳ' : 'क्यूआरएफ दस्ता';
  if (s.includes('anpr')) return isKn ? 'ಎಎನ್‌ಪಿಆರ್ ಗೇಟ್' : 'एएनपीआर गेट';
  if (s.includes('bike')) return isKn ? 'ಬೈಕ್ ಪರ್ಸ್ಯೂಟ್' : 'बाइक इंटरसेप्ट';
  if (s.includes('mounted')) return isKn ? 'ಅಶ್ವದಳ' : 'घुड़सवार दस्ता';
  if (s.includes('suspect') || s.includes('target')) return isKn ? 'ಶಂಕಿತ' : 'संदिग्ध';
  if (s.includes('patrol')) return t('unitPatrolShort');
  if (s.includes('checkpoint')) return t('unitCheckpointShort');
  if (s.includes('mrv') || s.includes('response')) return t('unitMrvShort');
  if (s.includes('overwatch') || s.includes('surveillance')) return t('unitOverwatchShort');
  return shortName;
};

export const formatUnitDescription = (desc: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!desc) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  const d = desc.toLowerCase();

  // Canonical English returns
  if (!isKn && !isHi) {
    if (d.includes('scent-tracking') || d.includes('dog unit') || d.includes('scent trails')) {
      return 'Trained police scent-tracking dog unit. Excels in tracking fugitive scent trails through narrow alleys and dense crowds.';
    }
    if (d.includes('special weapons') || d.includes('stopping-power') || d.includes('high-stopping-power')) {
      return 'Special Weapons and Tactics assault unit. High-stopping-power cordon against armed or extreme-tier fugitives.';
    }
    if (d.includes('medium radius beat sweepers') || d.includes('crowd corridor')) {
      return 'Medium radius beat sweepers. Agile mobile presence for crowd corridor sweeps.';
    }
    if (d.includes('stationary physical containment') || d.includes('choke points')) {
      return 'Stationary physical containment. Fortifies ingress and egress choke points (+3 security bonus).';
    }
    if (d.includes('elevated optical spotting node') || d.includes('darkness, and fog')) {
      return 'Elevated optical spotting node. Mitigates weather, darkness, and fog detection blindness by up to 70%.';
    }
    if (d.includes('spike strips') || d.includes('automated number plate recognition') || d.includes('anpr')) {
      return 'Automated Number Plate Recognition with spike strips. Instantly flags and intercepts fleeing motor vehicles.';
    }
    if (d.includes('motorcycle patrol') || d.includes('traffic jams') || d.includes('bike')) {
      return 'Twin high-agility motorcycle patrol. Weaves through traffic jams and tight alleys faster than 4-wheeler cruisers.';
    }
    if (d.includes('equine police') || d.includes('cavalry') || d.includes('psychological deterrence')) {
      return 'Equine police cavalry. Provides elevated crowd visibility and psychological deterrence in markets and open grounds.';
    }
    if (d.includes('high-value target pin') || d.includes('escape routes and threat perimeter')) {
      return 'High-Value Target pin. Dynamically calculates active escape routes and threat perimeter based on crime modus operandi.';
    }
    if (d.includes('beat sweeping') || d.includes('patrol team')) return t('unitPatrolDesc') || 'Active mobile foot beat sweep neutralizing opportunistic crimes.';
    if (d.includes('static perimeter') || d.includes('checkpoint')) return t('unitCheckpointDesc') || 'Hard perimeter choke point access screening and verification.';
    if (d.includes('large radius') || d.includes('mrv') || d.includes('motorized')) return t('unitMrvDesc') || 'Large radius motorized cruiser. Drastically accelerates emergency incident response (-0.45 min SLA).';
    if (d.includes('optical spotting') || d.includes('overwatch')) return t('unitOverwatchDesc') || 'Elevated high-ground visual and optical sensor spotting node.';
    return desc;
  }

  // Kannada & Hindi translations
  if (d.includes('scent-tracking') || d.includes('dog unit') || d.includes('scent trails')) {
    return isKn
      ? 'ತರಬೇತಿ ಪಡೆದ ಪೊಲೀಸ್ ವಾಸನೆ ಪತ್ತೆ ಹಚ್ಚುವ ನಾಯಿ ಘಟಕ. ಪರಾರಿಯಾದವರ ಜಾಡು ಹಿಡಿಯುವಲ್ಲಿ ನಿಪುಣ.'
      : 'प्रशिक्षित पुलिस गंध-ट्रैकिंग श्वान इकाई। भगोड़ों के भागने के निशान ट्रैक करने में माहिर।';
  }
  if (d.includes('special weapons') || d.includes('stopping-power') || d.includes('high-stopping-power')) {
    return isKn
      ? 'ವಿಶೇಷ ಶಸ್ತ್ರಾಸ್ತ್ರ ಮತ್ತು ತಂತ್ರಗಳ ದಾಳಿ ಘಟಕ. ಅಪಾಯಕಾರಿ ಅಪರಾಧಿಗಳ ವಿರುದ್ಧ ಪ್ರಬಲ ರಕ್ಷಣೆ.'
      : 'विशेष हथियार और रणनीति असॉल्ट इकाई। उच्च-रोकथाम क्षमता वाली मजबूत घेराबंदी।';
  }
  if (d.includes('medium radius beat sweepers') || d.includes('crowd corridor')) {
    return isKn
      ? 'ಮಧ್ಯಮ ತ್ರಿಜ್ಯದ ಬೀಟ್ ಸ್ವೀಪರ್‌ಗಳು. ಜನಸಂದಣಿಯ ಕಾರಿಡಾರ್‌ಗಳಿಗಾಗಿ ಚುರುಕಾದ ಉಪಸ್ಥಿತಿ.'
      : 'मध्यम दायरे के बीट स्वीपर। भीड़ गलियारे के लिए त्वरित मोबाइल उपस्थिति।';
  }
  if (d.includes('stationary physical containment') || d.includes('choke points')) {
    return isKn
      ? 'ಸ್ಥಿರ ಭೌತಿಕ ಧಾರಕತೆ. ಒಳಬರುವ ಮತ್ತು ಹೊರಹೋಗುವ ಚೋಕ್ ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಭದ್ರಪಡಿಸುತ್ತದೆ.'
      : 'स्थिर भौतिक नियंत्रण। प्रवेश और निकास चोक बिंदुओं को मजबूत करता है।';
  }
  if (d.includes('elevated optical spotting node') || d.includes('darkness, and fog')) {
    return isKn
      ? 'ಉನ್ನತ ಆಪ್ಟಿಕಲ್ ಸ್ಪಾಟಿಂಗ್ ನೋಡ್. ಹವಾಮಾನ, ಕತ್ತಲೆ ಮತ್ತು ಮಂಜು ಪತ್ತೆ ಕುರುಡುತನವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.'
      : 'उन्नत ऑप्टिकल स्पॉटिंग नोड। मौसम, अंधेरे और कोहरे की दृश्यता बाधा को कम करता है।';
  }
  if (d.includes('spike strips') || d.includes('automated number plate recognition') || d.includes('anpr')) {
    return isKn
      ? 'ಸ್ಪೈಕ್ ಸ್ಟ್ರಿಪ್‌ಗಳೊಂದಿಗೆ ಸ್ವಯಂಚಾಲಿತ ನಂಬರ್ ಪ್ಲೇಟ್ ಗುರುತಿಸುವಿಕೆ. ಪಲಾಯನ ಮಾಡುವ ವಾಹನಗಳನ್ನು ತಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ ತಡೆಯುತ್ತದೆ.'
      : 'स्पाइक स्ट्रिप्स के साथ स्वचालित नंबर प्लेट पहचान। भागने वाले मोटर वाहनों को तुरंत पहचानता और रोकता है।';
  }
  if (d.includes('motorcycle patrol') || d.includes('traffic jams') || d.includes('bike')) {
    return isKn
      ? 'ದ್ವಿಚಕ್ರ ಚುರುಕಾದ ಮೋಟಾರ್‌ಸೈಕಲ್ ಗಸ್ತು. ಟ್ರಾಫಿಕ್ ಜಾಮ್‌ಗಳು ಮತ್ತು ಕಿರಿದಾದ ಗಲ್ಲಿಗಳಲ್ಲಿ ವೇಗವಾಗಿ ಸಂಚರಿಸುತ್ತದೆ.'
      : 'अत्यधिक फुर्तीली मोटरसाइकिल गश्ती। ट्रैफिक जाम और तंग गलियों में 4-पहिया क्रूजर से अधिक तेजी से निकलती है।';
  }
  if (d.includes('equine police') || d.includes('cavalry') || d.includes('psychological deterrence')) {
    return isKn
      ? 'ಅಶ್ವದಳ ಪೊಲೀಸ್ ಪಡೆ. ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಬಯಲು ಮೈದಾನಗಳಲ್ಲಿ ಉನ್ನತ ದೃಷ್ಟಿ ಹಾಗೂ ಜನಸಂದಣಿ ನಿಯಂತ್ರಣ ಒದಗಿಸುತ್ತದೆ.'
      : 'अश्वारोही पुलिस घुड़सवार दस्ता। बाजारों और खुले मैदानों में उन्नत दृश्यता और मनोवैज्ञानिक नियंत्रण प्रदान करता है।';
  }
  if (d.includes('high-value target pin') || d.includes('escape routes and threat perimeter')) {
    return isKn
      ? 'ಪ್ರಮುಖ ಶಂಕಿತರ ಗುರುತು. ಅಪರಾಧ ಶೈಲಿಯ ಆಧಾರದ ಮೇಲೆ ಪಲಾಯನ ಮಾರ್ಗಗಳು ಮತ್ತು ಬೆದರಿಕೆ ಪರಿಧಿಯನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.'
      : 'हाई-वैल्यू टारगेट पिन। अपराध के तरीके के आधार पर भागने के सक्रिय रास्तों और खतरे की परिधि की गतिशील गणना करता है।';
  }
  if (d.includes('beat sweeping') || d.includes('patrol team')) return t('unitPatrolDesc');
  if (d.includes('static perimeter') || d.includes('checkpoint')) return t('unitCheckpointDesc');
  if (d.includes('large radius') || d.includes('mrv') || d.includes('motorized')) return t('unitMrvDesc');
  if (d.includes('optical spotting') || d.includes('overwatch')) return t('unitOverwatchDesc');
  return desc;
};

export const formatUnitBadge = (badge: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!badge) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  const b = badge.toLowerCase();

  // Canonical English returns
  if (!isKn && !isHi) {
    if (b.includes('scent') || b.includes('k-9')) return 'K-9 Scent Tracker';
    if (b.includes('armed') || b.includes('tactical team') || b.includes('swat')) return 'Armed Tactical Team';
    if (b.includes('standard beat')) return 'Standard Beat';
    if (b.includes('choke point')) return 'Choke Point Cordon';
    if (b.includes('rapid intercept')) return 'Rapid Intercept';
    if (b.includes('telemetry') && b.includes('spotting')) return 'Telemetry & Spotting';
    if (b.includes('smart barricade')) return 'Smart Barricade';
    if (b.includes('motorbike pursuit') || b.includes('bike')) return 'Motorbike Pursuit';
    if (b.includes('mounted cavalry') || b.includes('cavalry')) return 'Mounted Cavalry';
    if (b.includes('fugitive target') || b.includes('target')) return 'Fugitive Target';
    if (b.includes('sweeping') || b.includes('patrol')) return t('unitPatrolBadge') || 'Beat Sweeping';
    if (b.includes('access control') || b.includes('choke')) return t('unitCheckpointBadge') || 'Access Control';
    if (b.includes('rapid response') || b.includes('rapid')) return t('unitMrvBadge') || 'Rapid Intercept';
    if (b.includes('telemetry') || b.includes('surveillance')) return t('unitOverwatchBadge') || 'Overwatch Telemetry';
    return badge;
  }

  // Kannada & Hindi translations
  if (b.includes('scent') || b.includes('k-9')) return isKn ? 'K-9 ಶ್ವಾನ ಟ್ರ್ಯಾಕರ್' : 'K-9 गंध ट्रैकर';
  if (b.includes('armed') || b.includes('tactical team') || b.includes('swat')) return isKn ? 'ಸಶಸ್ತ್ರ ಕಾರ್ಯತಂತ್ರ ತಂಡ' : 'सशस्त्र सामरिक टीम';
  if (b.includes('standard beat')) return isKn ? 'ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಬೀಟ್' : 'मानक बीट';
  if (b.includes('choke point')) return isKn ? 'ಚೋಕ್ ಪಾಯಿಂಟ್ ಕಾರ್ಡನ್' : 'चोक पॉइंट घेराबंदी';
  if (b.includes('rapid intercept')) return isKn ? 'ತ್ವರಿತ ಪ್ರತಿಬಂಧ' : 'त्वरित इंटरसेप्ट';
  if (b.includes('telemetry') && b.includes('spotting')) return isKn ? 'ಟೆಲಿಮೆಟ್ರಿ & ಸ್ಪಾಟಿಂಗ್' : 'टेलीमेट्री और स्पॉटिंग';
  if (b.includes('smart barricade')) return isKn ? 'ಸ್ಮಾರ್ಟ್ ಬ್ಯಾರಿಕೇಡ್' : 'स्मार्ट बैरिकेड';
  if (b.includes('motorbike pursuit') || b.includes('bike')) return isKn ? 'ಮೋಟಾರ್‌ಬೈಕ್ ಪರ್ಸ್ಯೂಟ್' : 'मोटरसाइकिल इंटरसेप्ट';
  if (b.includes('mounted cavalry') || b.includes('cavalry')) return isKn ? 'ಅಶ್ವದಳ ರಕ್ಷಣೆ' : 'घुड़सवार दस्ता';
  if (b.includes('fugitive target') || b.includes('target')) return isKn ? 'ಪರಾರಿಯಾದ ಗುರಿ' : 'भगोड़ा लक्ष्य';
  if (b.includes('sweeping') || b.includes('patrol')) return t('unitPatrolBadge');
  if (b.includes('access control') || b.includes('choke')) return t('unitCheckpointBadge');
  if (b.includes('rapid response') || b.includes('rapid')) return t('unitMrvBadge');
  if (b.includes('telemetry') || b.includes('surveillance')) return t('unitOverwatchBadge');
  return badge;
};

export const formatUnitRole = (role: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!role) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');
  const r = role.toLowerCase();

  // Canonical English returns
  if (!isKn && !isHi) {
    if (r.includes('fugitive tracking') || r.includes('alley sweeps')) return 'Fugitive Tracking & Alley Sweeps';
    if (r.includes('high-threat') || r.includes('neutralization')) return 'High-Threat Fugitive Neutralization';
    if (r.includes('automated vehicle')) return 'Automated Vehicle Intercept';
    if (r.includes('congested alley')) return 'Congested Alley Pursuit';
    if (r.includes('high-vantage crowd') || r.includes('crowd control')) return 'High-Vantage Crowd Control';
    if (r.includes('target tracking')) return 'Target Tracking & Containment';
    if (r.includes('continuous') || r.includes('beat') || r.includes('sector patrol')) return t('unitPatrolRole') || 'Foot Patrol & Local Reconnaissance';
    if (r.includes('perimeter') || r.includes('containment') || r.includes('screening')) return t('unitCheckpointRole') || 'Access Denial & Verification';
    if (r.includes('wide-area') || r.includes('interception') || r.includes('intercept')) return t('unitMrvRole') || 'High-Speed Tactical Response';
    if (r.includes('visibility') || r.includes('surveillance') || r.includes('telemetry')) return t('unitOverwatchRole') || 'Visual Tracking & Situational Awareness';
    return role;
  }

  // Kannada & Hindi translations
  if (r.includes('fugitive tracking') || r.includes('alley sweeps')) return isKn ? 'ಪರಾರಿಯಾದವರ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಗಲ್ಲಿ ಗಸ್ತು' : 'भगोड़ा ट्रैकिंग और संकरी गली गश्त';
  if (r.includes('high-threat') || r.includes('neutralization')) return isKn ? 'ಅತಿ-ಅಪಾಯಕಾರಿ ಶಂಕಿತರ ನಿಯಂತ್ರಣ' : 'उच्च जोखिम भगोड़ा निष्प्रभावीकरण';
  if (r.includes('automated vehicle')) return isKn ? 'ಸ್ವಯಂಚಾಲಿತ ವಾಹನ ಪ್ರತಿಬಂಧ' : 'स्वचालित वाहन इंटरसेप्ट';
  if (r.includes('congested alley')) return isKn ? 'ದಟ್ಟಣೆಯ ಗಲ್ಲಿಗಳಲ್ಲಿ ಚೇಸಿಂಗ್' : 'भीड़भाड़ वाली गलियों में पीछा करना';
  if (r.includes('high-vantage crowd') || r.includes('crowd control')) return isKn ? 'ಎತ್ತರದ ದೃಷ್ಟಿಕೋನದ ಜನಸಂದಣಿ ನಿಯಂತ್ರಣ' : 'उच्च दृष्टिकोण भीड़ नियंत्रण';
  if (r.includes('target tracking')) return isKn ? 'ಗುರಿ ಪತ್ತೆ ಮತ್ತು ಸುತ್ತುವರಿಯುವಿಕೆ' : 'लक्ष्य ट्रैकिंग और घेराबंदी';
  if (r.includes('continuous') || r.includes('beat')) return t('unitPatrolRole');
  if (r.includes('perimeter') || r.includes('containment')) return t('unitCheckpointRole');
  if (r.includes('wide-area') || r.includes('interception')) return t('unitMrvRole');
  if (r.includes('visibility') || r.includes('surveillance')) return t('unitOverwatchRole');
  return role;
};

export const formatVulnerabilityAlert = (alert: any, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!alert) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');

  if (typeof alert === 'string') {
    // English mode: ALWAYS return clean canonical English
    if (!isKn && !isHi) {
      return alert;
    }

    const s = alert.toLowerCase();
    if (s.includes('spatial coverage gap') || s.includes('access point')) {
      const match = alert.match(/access point\s+([^(]+)\s*\(([^)]+)\)\s*has no police unit coverage(?: in (.*))?/i);
      if (match) {
        const ep = match[1].trim();
        const loc = match[2].trim();
        const distOrCity = (match[3] || 'Area').replace(/\.$/, '').trim();
        return t('alertCoverageGap').replace('{0}', ep).replace('{1}', loc).replace('{2}', distOrCity);
      }
      return isKn
        ? 'ಪ್ರಾದೇಶಿಕ ವ್ಯಾಪ್ತಿಯ ಕೊರತೆ: ಪ್ರವೇಶ ಬಿಂದುವಿನಲ್ಲಿ ಯಾವುದೇ ರಕ್ಷಣಾ ಘಟಕವಿಲ್ಲ.'
        : 'स्थानिक कवरेज अंतर: एक्सेस पॉइंट पर कोई सुरक्षा इकाई तैनात नहीं है।';
    }
    if (s.includes('active fugitive containment breach') || s.includes('containment breach')) {
      const openMatch = alert.match(/has\s+(\d+)\s+open escape corridors\s*\(([^)]+)\)/i);
      const count = openMatch ? openMatch[1] : '';
      const routes = openMatch ? openMatch[2] : '';
      if (isKn) {
        return `🚨 ಸಕ್ರಿಯ ಪರಾರಿಯಾದವರ ಸುತ್ತುವರಿಕೆ ಉಲ್ಲಂಘನೆ: ${count ? `${count} ` : ''}ತೆರೆದ ಪಲಾಯನ ಮಾರ್ಗಗಳಿವೆ${routes ? ` (${routes})` : ''}. ತಪ್ಪಿಸಿಕೊಳ್ಳುವ ಹೆಚ್ಚಿನ ಅಪಾಯವಿದೆ.`;
      }
      return `🚨 सक्रिय भगोड़ा घेराबंदी उल्लंघन: ${count ? `${count} ` : ''}खुले भागने के गलियारे हैं${routes ? ` (${routes})` : ''}। भागने का उच्च जोखिम।`;
    }
    if (s.includes('100% cordon enclosure') || s.includes('cordon enclosure')) {
      return isKn
        ? '🎯 ೧೦೦% ತಡೆಗೋಡೆ ಸುತ್ತುವರಿಕೆ: ಶಂಕಿತರ ಎಲ್ಲಾ ಪಲಾಯನ ಮಾರ್ಗಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಲಾಕ್ ಮಾಡಲಾಗಿದೆ.'
        : '🎯 100% कॉर्डन घेराबंदी: संदिग्ध के सभी भागने के गलियारे पूरी तरह से बंद हैं।';
    }
    if (s.includes('personnel deficit') || s.includes('insufficient')) {
      return t('alertPersonnelDeficit');
    }
    if (s.includes('visibility hazard') || s.includes('environmental visibility') || s.includes('adverse weather')) {
      return t('alertVisibilityHazard');
    }
    if (s.includes('optimal sector coverage')) {
      const locMatch = alert.match(/in\s+([^.]+)\s+are fortified/i);
      const loc = locMatch ? locMatch[1].trim() : '';
      return loc
        ? t('alertOptimalCoverage').replace('{0}', loc)
        : (isKn ? 'ಉತ್ತಮ ವಲಯ ವ್ಯಾಪ್ತಿ: ಎಲ್ಲಾ ಪ್ರವೇಶ ಕಾರಿಡಾರ್‌ಗಳು ಸಂಪೂರ್ಣವಾಗಿ ಭದ್ರವಾಗಿವೆ.' : 'इष्टतम सेक्टर कवरेज: सभी पहुंच गलियारे पूरी तरह से सुरक्षित हैं।');
    }
    return alert;
  }

  const type = (alert.type || '').toLowerCase();
  const msg = (alert.message || '').toLowerCase();

  if (type === 'coverage_gap' || msg.includes('spatial coverage gap')) {
    const ep = alert.entryPoint || 'Gate';
    const loc = alert.location || 'Access Area';
    const dist = alert.distance ? alert.distance + 'm' : '650m';
    return t('alertCoverageGap').replace('{0}', ep).replace('{1}', loc).replace('{2}', dist);
  }
  if (type === 'budget_deficit' || msg.includes('severe personnel deficit') || msg.includes('critical personnel deficit')) {
    return t('alertPersonnelDeficit');
  }
  if (type === 'weather_hazard' || msg.includes('environmental visibility hazard')) {
    return t('alertVisibilityHazard');
  }
  if (type === 'choke_point' || msg.includes('entry choke-point')) {
    return t('alertChokePointRisk');
  }
  if (type === 'festival_surge' || msg.includes('festival crowd surge')) {
    return t('alertFestivalSurge');
  }
  if (type === 'elevated_risk' || msg.includes('elevated sector risk')) {
    return t('alertElevatedVulnerability');
  }
  return alert.message || '';
};

export const formatRecommendation = (rec: string, t: (key: TranslationKey) => string, lang?: Language): string => {
  if (!rec) return '';
  const isKn = lang === 'kn' || (!lang && t('critical') === 'ನಿರ್ಣಾಯಕ');
  const isHi = lang === 'hi' || (!lang && t('critical') === 'गंभीर');

  // English mode: ALWAYS return canonical English
  if (!isKn && !isHi) {
    return rec;
  }

  const r = rec.toLowerCase();

  if (r.includes('seal fugitive escape vectors') || r.includes('deploy pcr cruisers or checkpoint barricades on')) {
    const match = rec.match(/barricades on\s+([^.]+?)\s+corridors/i);
    const corridors = match ? match[1].trim() : '';
    if (isKn) {
      return `ಪರಾರಿಯಾದವರ ಪಲಾಯನ ಮಾರ್ಗಗಳನ್ನು ಬಂದ್ ಮಾಡಲು ${corridors ? `${corridors} ` : ''}ಕಾರಿಡಾರ್‌ಗಳಲ್ಲಿ ಪಿಸಿಆರ್ ವಾಹನಗಳು ಅಥವಾ ಬ್ಯಾರಿಕೇಡ್‌ಗಳನ್ನು ನಿಯೋಜಿಸಿ.`;
    }
    return `भगोड़े के भागने के मार्गों को सील करने के लिए ${corridors ? `${corridors} ` : ''}गलियारों पर पीसीआर क्रूजर या चेकपॉइंट बैरिकेड तैनात करें।`;
  }
  if (r.includes('checkpoint post') || r.includes('patrol team to cover') || r.includes('beat patrol to cover')) {
    const match = rec.match(/cover\s+([^.]+)/i);
    const gate = match ? match[1].trim() : 'Gate 2';
    return t('recDeployCheckpointPatrol').replace('{0}', gate);
  }
  if (r.includes('mobilize a minimum of 6') || r.includes('mobilize minimum 6') || r.includes('reserve officers') || r.includes('reserve quick-response personnel')) {
    return t('recMobilizeReserve');
  }
  if (r.includes('deploy a drone overwatch post') || r.includes('deploy an overwatch post') || r.includes('checkpoint-focused ingress')) {
    return t('recDeployOverwatch');
  }
  if (r.includes('active drone overwatch') || (r.includes('active overwatch') && r.includes('weather'))) {
    const match = rec.match(/\((\d+)\s+nodes?\)/i) || rec.match(/\((\d+)\s+posts?\)/i);
    const nodes = match ? match[1] : '1';
    return t('recActiveOverwatchMitigation').replace('{0}', nodes).replace('{1}', '60');
  }
  if (r.includes('pcr mobile cruiser active') || r.includes('mobile response unit active')) {
    const match = rec.match(/accelerated to\s+([\d.]+)\s+minutes/i);
    const minutes = match ? match[1] : '3.5';
    return t('recMrvActive').replace('{0}', minutes);
  }
  if (r.includes('radio check-ins') || r.includes('cctns audit trail')) {
    return t('recMaintainCheckins');
  }
  if (r.includes('secondary emergency egress')) {
    return t('recOpenSecondaryCorridors');
  }
  if (r.includes('forward tactical coordination post')) {
    return t('recEstablishForwardPost');
  }
  if (r.includes('additional patrol teams')) {
    return t('recAddPatrolTeams');
  }
  if (r.includes('increase investigation resources')) {
    return isKn ? 'ಬಾಕಿ ಇರುವ ಪ್ರಕರಣಗಳಿಗೆ ತನಿಖಾ ಸಂಪನ್ಮೂಲಗಳನ್ನು ಹೆಚ್ಚಿಸಿ.' : 'लंबित मामलों के लिए जांच संसाधन बढ़ाएं।';
  }
  if (r.includes('deploy additional patrol units in hotspot')) {
    return isKn ? 'ಹಾಟ್‌ಸ್ಪಾಟ್ ಸ್ಥಳಗಳಲ್ಲಿ ಹೆಚ್ಚುವರಿ ಗಸ್ತು ಘಟಕಗಳನ್ನು ನಿಯೋಜಿಸಿ.' : 'हॉटस्पॉट स्थानों में अतिरिक्त गश्ती इकाइयां तैनात करें।';
  }
  if (r.includes('monitor repeat offenders linked')) {
    return isKn ? 'ಹಾಟ್‌ಸ್ಪಾಟ್ ಪೊಲೀಸ್ ಠಾಣೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಮರುಕಳಿಸುವ ಅಪರಾಧಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.' : 'हॉटस्पॉट पुलिस स्टेशनों से जुड़े आदतन अपराधियों की निगरानी करें।';
  }
  if (r.includes('review crime trends for preventive policing')) {
    return isKn ? 'ಮುನ್ನೆಚ್ಚರಿಕೆಯ ಪೊಲೀಸ್ ವ್ಯವಸ್ಥೆಗಾಗಿ ಅಪರಾಧ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.' : 'निवारक पुलिसिंग के लिए अपराध प्रवृत्तियों की समीक्षा करें।';
  }

  return rec;
};

/**
 * Universal Dynamic Text Translator
 * Handles all database entries, dynamic statuses, audit logs, SOP guides,
 * tactical units, risk factors, and locations across English, Kannada, and Hindi.
 */
const SOP_TRANSLATIONS_HI: Record<string, string> = {
  "ai temporal-spatial forecasting models projecting next 72-hour crime spikes, vulnerability alerts, and weather-correlated patrol recommendations.": "एआई टेम्पोरल-स्थानिक पूर्वानुमान मॉडल जो अगले 72 घंटों के अपराध वृद्धि, संवेदनशीलता अलर्ट और मौसम-सहसंबद्ध गश्ती सिफारिशों को पेश करते हैं।",
  "ai-assisted suspect dossier generation, recidivism risk calculation, modus operandi (mo) clustering, and multi-jurisdictional criminal associate tracking.": "एआई-सहायता प्राप्त संदिग्ध डोजियर निर्माण, पुनरावृत्ति जोखिम गणना, कार्यप्रणाली (MO) क्लस्टरिंग और अंतर-क्षेत्रीय आपराधिक सहयोगियों की ट्रैकिंग।",
  "all cctns statistics and telemetry update dynamically from active police station databases.": "सभी सीसीटीएनएस आंकड़े और टेलीमेट्री सक्रिय पुलिस स्टेशन डेटाबेस से गतिशील रूप से अपडेट होते हैं।",
  "all algorithmic inferences include confidence weight disclosures to prevent algorithmic bias in policing.": "पुलिसिंग में एल्गोरिथम पूर्वाग्रह को रोकने के लिए सभी एल्गोरिथम निष्कर्षों में विश्वास भार का प्रकटीकरण शामिल है।",
  "all query audits are locked with tamper-proof signatures adhering to electronic evidence standards.": "इलेक्ट्रॉनिक साक्ष्य मानकों का पालन करते हुए सभी क्वेरी ऑडिट छेड़छाड़-रोधी हस्ताक्षरों के साथ लॉक हैं।",
  "analyze demographic bar charts to understand the age cohorts most involved in registered offences.": "दर्ज अपराधों में सबसे अधिक शामिल आयु समूहों को समझने के लिए जनसांख्यिकीय बार चार्ट का विश्लेषण करें।",
  "ask by suspect name or alias (e.g., 'show criminal history for raju k') to retrieve mo matching, known associates, and active arrest warrants.": "कार्यप्रणाली मिलान, ज्ञात सहयोगियों और सक्रिय गिरफ्तारी वारंट प्राप्त करने के लिए संदिग्ध के नाम या उपनाम से पूछें (उदा. 'राजू के. का आपराधिक इतिहास दिखाएं')।",
  "audit cryptographic sha-256 event hashes, timestamp records, officer badge ids, and action types to verify chain of custody.": "हिरासत की श्रृंखला को सत्यापित करने के लिए क्रिप्टोग्राफ़िक SHA-256 इवेंट हैश, टाइमस्टैम्प रिकॉर्ड, अधिकारी बैज आईडी और कार्रवाई प्रकारों का ऑडिट करें।",
  "audit historical fir registrations, case disposal stages, and click linked associate nodes to unmask co-conspirators.": "ऐतिहासिक एफआईआर पंजीकरण, केस निपटान चरणों का ऑडिट करें और सह-षड्यंत्रकारियों को बेनकाब करने के लिए जुड़े सहयोगी नोड्स पर क्लिक करें।",
  "audit predicted risk zones across bengaluru, mysuru, hubballi, and belagavi commissionerates.": "बेंगलुरु, मैसूर, हुबली और बेलगावी कमिश्नरेटों में अनुमानित जोखिम क्षेत्रों का ऑडिट करें।",
  "audit real-time latency, cloud api gateway availability, and quickml model inference telemetry.": "वास्तविक समय विलंबता, क्लाउड एपीआई गेटवे उपलब्धता और QuickML मॉडल निष्कर्ष टेलीमेट्री का ऑडिट करें।",
  "automated case summarization, modus operandi (mo) similarity matching across historical firs, and generation of priority investigative leads for investigating officers (ios).": "स्वचालित केस सारांश, ऐतिहासिक एफआईआर में कार्यप्रणाली (MO) समानता मिलान, और जांच अधिकारियों (IOs) के लिए प्राथमिकता वाले जांच सुराग का निर्माण।",
  "automated forensic identification comparing suspect photos, cctv freeze-frames, and latent fingerprint minutiae against active ksp convicts.": "सक्रिय केएसपी अपराधियों के खिलाफ संदिग्ध तस्वीरों, सीसीटीवी फ्रीज-फ्रेम और अव्यक्त फिंगरप्रिंट विवरणों की तुलना करने वाली स्वचालित फोरेंसिक पहचान।",
  "calculates euclidean vector distance (< 0.50 cutoff) against all 10 registered ksp convict mugshots and nafis 10-prints.": "सभी 10 पंजीकृत केएसपी अपराधी मगशॉट और नाफिस 10-प्रिंट के खिलाफ यूक्लिडियन वेक्टर दूरी (< 0.50 कटऑफ) की गणना करता है।",
  "central operations command console for monitoring real-time crime incidents, tracking firs, and routing cases to specialized police branches.": "वास्तविक समय की अपराध घटनाओं की निगरानी, एफआईआर को ट्रैक करने और विशेष पुलिस शाखाओं को मामलों को रूट करने के लिए केंद्रीय संचालन कमांड कंसोल।",
  "check the tamper-proof lock badge confirming active cryptographic chain-of-custody logging.": "सक्रिय क्रिप्टोग्राफ़िक चेन-ऑफ-कस्टडी लॉगिंग की पुष्टि करने वाले छेड़छाड़-रोधी लॉक बैज की जांच करें।",
  "click 'check database' or 'run biometric search'.": "'डेटाबेस जांचें' या 'बायोमेट्रिक खोज चलाएं' पर क्लिक करें।",
  "click 'dispatch hoysala pcr' on any high-priority citizen incident.": "किसी भी उच्च-प्राथमिकता वाली नागरिक घटना पर 'होयसला पीसीआर डिस्पैच करें' पर क्लिक करें।",
  "click 'engage cordon matrix' to automatically compute optimal interception choke-points for fleeing vehicles.": "भागने वाले वाहनों के लिए इष्टतम इंटरसेप्शन चोक-पॉइंट की स्वचालित गणना करने के लिए 'कॉर्डन मैट्रिक्स संलग्न करें' पर क्लिक करें।",
  "click 'generate offender dossier' from the inspector pane to compile a court-ready associative intelligence annexure.": "अदालत के लिए तैयार संबद्ध खुफिया अनुलग्नक संकलित करने के लिए इंस्पेक्टर फलक से 'अपराधी डोजियर तैयार करें' पर क्लिक करें।",
  "click 'redirect to department' to transfer the case dossier.": "केस डोजियर स्थानांतरित करने के लिए 'विभाग को पुनर्निर्देशित करें' पर क्लिक करें।",
  "click any priority alert on the right feed to jump directly into the relevant department analysis tool.": "प्रासंगिक विभाग विश्लेषण उपकरण में सीधे जाने के लिए दाएँ फ़ीड पर किसी भी प्राथमिकता अलर्ट पर क्लिक करें।",
  "click on any associate suspect card to instantly switch dossiers and track cross-network operations.": "डोजियर को तुरंत बदलने और क्रॉस-नेटवर्क संचालन को ट्रैक करने के लिए किसी भी सहयोगी संदिग्ध कार्ड पर क्लिक करें।",
  "click on any individual hotspot marker to view historical fir volume and station contact details.": "ऐतिहासिक एफआईआर संख्या और स्टेशन संपर्क विवरण देखने के लिए किसी भी व्यक्तिगत हॉटस्पॉट मार्कर पर क्लिक करें।",
  "click on any suspect, bank account, vehicle, or phone imei node to display connectivity degree, risk assessment tier, and link attributes.": "कनेक्टिविटी डिग्री, जोखिम मूल्यांकन स्तर और लिंक विशेषताओं को प्रदर्शित करने के लिए किसी भी संदिग्ध, बैंक खाते, वाहन या फोन आईएमईआई नोड पर क्लिक करें।",
  "click the export button on suspicious rows to prepare evidence annexures for financial intelligence unit (fiu-ind) submission.": "वित्तीय खुफिया इकाई (FIU-IND) प्रस्तुति के लिए साक्ष्य अनुलग्नक तैयार करने हेतु संदिग्ध पंक्तियों पर निर्यात बटन पर क्लिक करें।",
  "compare containment score %, risk index, and response time sla between baseline and contingency deployments.": "बेसलाइन और आकस्मिक तैनाती के बीच रोकथाम स्कोर %, जोखिम सूचकांक और प्रतिक्रिया समय एसएलए की तुलना करें।",
  "compare high-density youth demographic spikes with local drug/substance abuse intelligence.": "स्थानीय नशीली दवाओं/मादक द्रव्यों के सेवन की खुफिया जानकारी के साथ उच्च घनत्व वाले युवा जनसांख्यिकीय उछाल की तुलना करें।",
  "compare quarterly seasonal surges (festival, harvest, monsoon periods) across top districts (bengaluru, mysuru, belagavi).": "शीर्ष जिलों (बेंगलुरु, मैसूर, बेलगावी) में त्रैमासिक मौसमी उछाल (त्योहार, फसल, मानसून अवधि) की तुलना करें।",
  "configure timeframe and jurisdiction filters to generate formal pdf crime briefing documents with court-ready citations.": "अदालत के लिए तैयार उद्धरणों के साथ औपचारिक पीडीएफ अपराध ब्रीफिंग दस्तावेज तैयार करने के लिए समय सीमा और अधिकार क्षेत्र फिल्टर कॉन्फ़िगर करें।",
  "coordinate with local station house officers (shos) to deploy static barricades during peak forecast windows.": "पीक पूर्वानुमान समय के दौरान स्थिर बैरिकेड तैनात करने के लिए स्थानीय स्टेशन हाउस अधिकारियों (एसएचओ) के साथ समन्वय करें।",
  "crime intelligence & criminal history tracking bureau": "अपराध खुफिया और आपराधिक इतिहास ट्रैकिंग ब्यूरो",
  "crimson red nodes represent high-risk syndicate leaders; amber nodes indicate operational couriers and mules.": "गहरे लाल नोड उच्च जोखिम वाले सिंडिकेट नेताओं का प्रतिनिधित्व करते हैं; एम्बर नोड परिचालन कोरियर और म्यूल का संकेत देते हैं।",
  "critical clusters with rising trends trigger automatic alerts to the real-time crime center (rtcc).": "बढ़ती प्रवृत्तियों वाले महत्वपूर्ण क्लस्टर रियल-टाइम क्राइम सेंटर (RTCC) को स्वचालित अलर्ट भेजते हैं।",
  "drag & drop k-9 sniffer dogs, pcr cruisers, swat teams, and anpr barricades onto the interactive leaflet map to seal escape routes.": "भागने के रास्तों को सील करने के लिए इंटरैक्टिव लीफलेट मानचित्र पर K-9 स्निफर कुत्तों, पीसीआर क्रूजर, स्वाट टीमों और एएनपीआर बैरिकेड्स को खींचें और छोड़ें।",
  "drag nodes to rearrange cluster density or zoom with the mouse wheel to inspect multi-hop associations.": "क्लस्टर घनत्व को पुनर्व्यवस्थित करने के लिए नोड्स को खींचें या मल्टी-हॉप संघों का निरीक्षण करने के लिए माउस व्हील से ज़ूम करें।",
  "evaluate monthly case registration trends to track overall crime escalation or suppression across commissionerates.": "कमिश्नरेटों में समग्र अपराध वृद्धि या रोकथाम को ट्रैक करने के लिए मासिक मामला पंजीकरण रुझानों का मूल्यांकन करें।",
  "examine the dynamic recidivism gauge (high / medium / low risk) calculated from past chargesheets, bail history, and inter-crime intervals.": "पिछली चार्जशीट, जमानत इतिहास और अपराध अंतराल से गणना किए गए गतिशील पुनरावृत्ति गेज (उच्च / मध्यम / निम्न जोखिम) की जांच करें।",
  "export automated executive pdf reports documenting system transparency metrics for judicial submission.": "न्यायिक प्रस्तुति के लिए सिस्टम पारदर्शिता मेट्रिक्स का दस्तावेजीकरण करने वाली स्वचालित कार्यकारी पीडीएफ रिपोर्ट निर्यात करें।",
  "export full chat transcripts to pdf for attachment with formal case diary entries.": "औपचारिक केस डायरी प्रविष्टियों के साथ संलग्न करने के लिए पूर्ण चैट ट्रांसक्रिप्ट को पीडीएफ में निर्यात करें।",
  "filter audit records by transaction category (upi, imps, rtgs, wire) or toggle 'suspicious only' to isolate structuring spikes.": "लेनदेन श्रेणी (UPI, IMPS, RTGS, वायर) द्वारा ऑडिट रिकॉर्ड फ़िल्टर करें या संरचना वृद्धि को अलग करने के लिए 'केवल संदिग्ध' टॉगल करें।",
  "filter suspects by crime type (theft, burglary, cybercrime) or type suspect id/alias in the search bar to load the dossier.": "डोजियर लोड करने के लिए अपराध प्रकार (चोरी, सेंधमारी, साइबर अपराध) द्वारा संदिग्धों को फ़िल्टर करें या खोज बार में संदिग्ध आईडी/उपनाम टाइप करें।",
  "for low-resolution cctv frames, crop closely to the suspect's face for optimal landmark extraction.": "कम रिज़ॉल्यूशन वाले सीसीटीवी फ्रेम के लिए, इष्टतम लैंडमार्क निष्कर्षण के लिए संदिग्ध के चेहरे को करीब से क्रॉप करें।",
  "high-risk offenders (>70% recidivism score) automatically flag for section 110 bnss preventive surveillance bonds.": "उच्च जोखिम वाले अपराधी (>70% पुनरावृत्ति स्कोर) स्वचालित रूप से धारा 110 बीएनएसएस निवारक निगरानी बांड के लिए चिह्नित होते हैं।",
  "hover over circular gis heatmap zones on the karnataka map to view incident density, primary crime types, and beat jurisdiction.": "घटना घनत्व, प्राथमिक अपराध प्रकार और बीट अधिकार क्षेत्र देखने के लिए कर्नाटक मानचित्र पर गोलाकार जीआईएस हीटमैप क्षेत्रों पर होवर करें।",
  "hover over data points on the 12-month trend line to inspect month-on-month velocity.": "महीने-दर-महीने गति का निरीक्षण करने के लिए 12-महीने की ट्रेंड लाइन पर डेटा बिंदुओं पर होवर करें।",
  "identify high-centrality bridge nodes that connect disparate criminal cells across different police station jurisdictions.": "विभिन्न पुलिस स्टेशन अधिकार क्षेत्रों में अलग-अलग आपराधिक गिरोहों को जोड़ने वाले उच्च-केंद्रीयता वाले ब्रिज नोड्स की पहचान करें।",
  "inspect side-by-side match dossier and click 'verify match & dispatch hoysala pcr'.": "आमने-सामने मिलान डोजियर का निरीक्षण करें और 'मिलान सत्यापित करें और होयसला पीसीआर भेजें' पर क्लिक करें।",
  "inspect the ranked crime category spectrum to isolate which offences constitute the largest percentage of the caseload.": "रैंक किए गए अपराध श्रेणी स्पेक्ट्रम का निरीक्षण करके यह पता लगाएं कि कौन से अपराध कुल मामलों का सबसे बड़ा प्रतिशत बनाते हैं।",
  "inspect the segmented ratio strip and micro metric cards to evaluate demographic proportion trends.": "जनसांख्यिकीय अनुपात प्रवृत्तियों का मूल्यांकन करने के लिए खंडित अनुपात पट्टी और सूक्ष्म मीट्रिक कार्ड का निरीक्षण करें।",
  "instant auto-completion matches against 1,000 real cctns firs and 10 registered ksp convict files.": "1,000 वास्तविक सीसीटीएनएस एफआईआर और 10 पंजीकृत केएसपी अपराधी फाइलों के खिलाफ त्वरित स्वत: पूर्ण मिलान।",
  "instantly routes cases to ccb (theft/burglary), cid cyber (otp fraud), or state biometrics (face/fingerprint).": "मामलों को सीसीबी (चोरी/सेंधमारी), सीआईडी साइबर (ओटीपी धोखाधड़ी), या राज्य बायोमेट्रिक्स (चेहरा/फिंगरप्रिंट) को तुरंत रूट करता है।",
  "interactive tactical sandbox for spatial unit deployment, 360° suspect containment modeling, escape route sealing, and comparative plan a vs plan b risk evaluation.": "स्थानिक इकाई तैनाती, 360° संदिग्ध रोकथाम मॉडलिंग, भागने के मार्ग को सील करने और तुलनात्मक योजना ए बनाम योजना बी जोखिम मूल्यांकन के लिए इंटरैक्टिव रणनीतिक सैंडबॉक्स।",
  "juvenile justice (care & protection) act & community policing mandates": "किशोर न्याय (देखभाल और संरक्षण) अधिनियम एवं सामुदायिक पुलिसिंग शासनादेश",
  "live cctv multi-stream telemetry, ai optical anpr vehicle hit scanning, live pcr cruiser gps tracking, and emergency dial-112 cad dispatch matrix.": "लाइव सीसीटीवी मल्टी-स्ट्रीम टेलीमेट्री, एआई ऑप्टिकल एएनपीआर वाहन हिट स्कैनिंग, लाइव पीसीआर क्रूजर जीपीएस ट्रैकिंग और आपातकालीन डायल-112 सीएडी डिस्पैच मैट्रिक्स।",
  "model transparency reporting, shap/lime feature attribution inspection, audit trail verification, and cloud microservices health auditing.": "मॉडल पारदर्शिता रिपोर्टिंग, SHAP/LIME फीचर विशेषता निरीक्षण, ऑडिट ट्रेल सत्यापन और क्लाउड माइक्रोसर्विसेज स्वास्थ्य ऑडिटिंग।",
  "monitor zoho catalyst microservices status, latency meters, and uptime metrics across ai inference and ocr endpoints.": "एआई निष्कर्ष और ओसीआर एंडपॉइंट्स पर ज़ोहो कैटेलिस्ट माइक्रोसर्विसेज स्थिति, विलंबता मीटर और अपटाइम मेट्रिक्स की निगरानी करें।",
  "national crime records bureau (ncrb) data reporting directives": "राष्ट्रीय अपराध रिकॉर्ड ब्यूरो (NCRB) डेटा रिपोर्टिंग दिशानिर्देश",
  "pick any karnataka sector (bengaluru, mysuru, hubballi...) and configure fugitive mobility speed and threat tier.": "किसी भी कर्नाटक क्षेत्र (बेंगलुरु, मैसूर, हुबली...) को चुनें और भगोड़े की गतिशीलता गति और खतरे के स्तर को कॉन्फ़िगर करें।",
  "pick any active fir from the left roster to populate the case narrative, ipc/bns sections, and accused details.": "केस विवरण, आईपीसी/बीएनएस धाराओं और अभियुक्त विवरणों को भरने के लिए बाईं सूची से किसी भी सक्रिय एफआईआर को चुनें।",
  "prompt for statistical breakdowns (e.g., 'show burglary trends in bengaluru') to generate inline interactive bar and trend charts directly in chat.": "सीधे चैट में इनलाइन इंटरैक्टिव बार और ट्रेंड चार्ट उत्पन्न करने के लिए सांख्यिकीय विवरण (उदा. 'बेंगलुरु में चोरी के रुझान दिखाएं') का संकेत दें।",
  "public citizen incident reports automatically route to the pending queue with digilocker resident verification.": "सार्वजनिक नागरिक घटना रिपोर्ट डिजिलॉकर निवासी सत्यापन के साथ स्वचालित रूप से लंबित कतार में जाती हैं।",
  "rapid successive transactions below ₹50,000 threshold trigger automated pmla structuring alerts.": "₹50,000 की सीमा से नीचे तेजी से लगातार होने वाले लेनदेन स्वचालित पीएमएलए संरचना अलर्ट को ट्रिगर करते हैं।",
  "read structured ai summary highlighting crime scene facts, modus operandi signatures, and prime suspects.": "अपराध स्थल के तथ्यों, कार्यप्रणाली के हस्ताक्षरों और प्रमुख संदिग्धों पर प्रकाश डालने वाले संरचित एआई सारांश को पढ़ें।",
  "review gps telemetry for active patrol cruisers and dispatch nearest responder to active emergency cad calls.": "सक्रिय गश्ती क्रूजर के लिए जीपीएस टेलीमेट्री की समीक्षा करें और सक्रिय आपातकालीन सीएडी कॉल के लिए निकटतम प्रतिक्रियाकर्ता को भेजें।",
  "review crime index scores against urban migration and socio-economic variables to deploy community policing initiatives.": "सामुदायिक पुलिसिंग पहल को लागू करने के लिए शहरी प्रवासन और सामाजिक-आर्थिक चरों के विरुद्ध अपराध सूचಕಾंक स्कोर की समीक्षा करें।",
  "review early warning notices flagged by seasonal events, weekend commercial influx, or festival overlap.": "मौसमी घटनाओं, सप्ताहांत वाणिज्यिक आमद, या त्योहार ओवरलैप द्वारा चिह्नित पूर्व चेतावनी नोटिस की समीक्षा करें।",
  "review linked offender dossiers and associated mule accounts to initiate formal section 102 crpc account freeze requisitions.": "औपचारिक धारा 102 सीआरपीसी खाता फ्रीज मांग शुरू करने के लिए जुड़े अपराधी डोजियर और संबंधित म्यूल खातों की समीक्षा करें।",
  "review red critical zones versus amber rising trend beats to prioritize immediate pcr vehicle re-routing.": "तत्काल पीसीआर वाहन पुनर्मार्गन को प्राथमिकता देने के लिए लाल गंभीर क्षेत्रों बनाम एम्बर बढ़ती प्रवृत्ति बीट्स की समीक्षा करें।",
  "route tactical mobile pcr units to predicted vulnerability corridors ahead of anticipated peak hours.": "अनुमानित पीक आवर्स से पहले सामरिक मोबाइल पीसीआर इकाइयों को अनुमानित संवेदनशीलता गलियारों में भेजें।",
  "scan vehicle license plates (e.g. ka01ab1234) to trace historical toll/camera trajectory and trigger automated cordon interception.": "ऐतिहासिक टोल/कैमरा प्रक्षेपवक्र का पता लगाने और स्वचालित कॉर्डन इंटरसेप्शन को ट्रिगर करने के लिए वाहन लाइसेंस प्लेट (उदा. KA01AB1234) स्कैन करें।",
  "section 149 bnss & motor vehicles act (automated number plate enforcement)": "धारा 149 बीएनएसएस एवं मोटर वाहन अधिनियम (स्वचालित नंबर प्लेट प्रवर्तन)",
  "section 76 karnataka police act & identification of prisoners act / criminal procedure (identification) act 2022": "धारा 76 कर्नाटक पुलिस अधिनियम और बंदी पहचान अधिनियम / आपराधिक प्रक्रिया (पहचान) अधिनियम 2022",
  "select any ledger entry to reveal the source account -> destination account flow, amount, and flag justifications.": "स्रोत खाता -> गंतव्य खाता प्रवाह, राशि और ध्वज औचित्य को प्रकट करने के लिए किसी भी खाता प्रविष्टि का चयन करें।",
  "similar case finder matches mo patterns across district boundaries to detect interstate criminal gangs.": "समान केस खोजक अंतरराज्यीय आपराधिक गिरोहों का पता लगाने के लिए जिला सीमाओं के पार MO पैटर्न का मिलान करता है।",
  "spatial density clustering and geospatial crime hotspot mapping to optimize police patrol beats and emergency quick response vehicle deployment.": "पुलिस गश्ती बीट और आपातकालीन त्वरित प्रतिक्रिया वाहन तैनाती को अनुकूलित करने के लिए स्थानिक घनत्व क्लस्टरिंग और भू-स्थानिक अपराध हॉटस्पॉट मैपिंग।",
  "state police legal oversight & ai ethics board": "राज्य पुलिस कानूनी निरीक्षण एवं एआई नैतिकता बोर्ड",
  "state police research & social defense division": "राज्य पुलिस अनुसंधान एवं सामाजिक रक्षा प्रभाग",
  "switch between 'facial recognition' and 'nafis 10-print' tabs to perform multimodal fingerprint minutiae matching.": "मल्टीमॉडल फिंगरप्रिंट विवरण मिलान करने के लिए 'चेहरा पहचान' और 'नाफिस 10-प्रिंट' टैब के बीच स्विच करें।",
  "switch to 'similar case finder' and 'suggested leads' tabs to find matching serial crimes and targeted cdr/financial queries.": "मिलते-जुलते धारावाहिक अपराधों और लक्षित सीडीआर/वित्तीय प्रश्नों को खोजने के लिए 'समान केस खोजक' और 'सुझाए गए सुराग' टैब पर जाएं।",
  "system extracts 128-dimensional deep-learning facial embeddings (dlib resnet) and aligns facial landmarks.": "सिस्टम 128-आयामी डीप-लर्निंग फेशियल एम्बेडिंग (dlib ResNet) निकालता है और चेहरे के लैंडमार्क को संरेखित करता है।",
  "time-series analysis and cross-district crime trend monitoring to discover seasonal patterns, emergent crime categories, and jurisdictional variance.": "मौसमी पैटर्न, उभरती अपराध श्रेणियों और अधिकार क्षेत्र के अंतर का पता लगाने के लिए समय-श्रृंखला विश्लेषण और अंतर-जिला अपराध प्रवृत्ति निगरानी।",
  "transmits gps coordinates, crime classification, and suspect photo to the nearest patrolling hoysala vehicle.": "निकटतम गश्त कर रहे होयसला वाहन को जीपीएस निर्देशांक, अपराध वर्गीकरण और संदिग्ध की तस्वीर भेजता है।",
  "transmits verified suspect profile, known mo, and arrest warrant status directly to jurisdictional station patrol units.": "सत्यापित संदिग्ध प्रोफ़ाइल, ज्ञात MO, और गिरफ्तारी वारंट स्थिति सीधे क्षेत्राधिकार स्टेशन गश्ती इकाइयों को भेजता है।",
  "type any fir number, suspect alias, or station in the top search bar.": "शीर्ष खोज बार में कोई भी एफआईआर नंबर, संदिग्ध का उपनाम या स्टेशन टाइप करें।",
  "type any natural query or exact fir identifier (e.g., 'fir 0012/2026') to automatically generate structured case abstracts and investigator notes.": "संरचित केस सार और अन्वेषक नोट्स स्वचालित रूप से उत्पन्न करने के लिए कोई भी प्राकृतिक प्रश्न या सटीक एफआईआर पहचानकर्ता (उदा. 'FIR 0012/2026') टाइप करें।",
  "upload suspect photograph, dashcam clip, or cctv grab.": "संदिग्ध की तस्वीर, डैशकैम क्लिप या सीसीटीवी ग्रैब अपलोड करें।",
  "use 'auto-seal escape routes' to automatically deploy pcr cruisers on unguarded escape vectors.": "असुरक्षित भागने के रास्तों पर स्वचालित रूप से पीसीआर क्रूजर तैनात करने के लिए 'भागने के मार्गों को ऑटो-सील करें' का उपयोग करें।",
  "use 're-align around fugitive' to automatically position a 360-degree perimeter ring around the target's current gps pin.": "लक्ष्य के वर्तमान जीपीएस पिन के चारों ओर स्वचालित रूप से 360-डिग्री परिधि रिंग लगाने के लिए 'भगोड़े के चारों ओर पुनः संरेखित करें' का उपयोग करें।",
  "use exact fir formats like 'ka/blr/2026/001' for sub-second deterministic document retrieval.": "सेकंड से भी कम समय में दस्तावेज़ पुनर्प्राप्ति के लिए 'KA/BLR/2026/001' जैसे सटीक एफआईआर प्रारूपों का उपयोग करें।",
  "use hotspot gps coordinates to configure dynamic night patrolling routes in high-density commercial and transit corridors.": "उच्च घनत्व वाले वाणिज्यिक और पारगमन गलियारों में गतिशील रात्रि गश्ती मार्गों को कॉन्फ़िगर करने के लिए हॉटस्पॉट जीपीएस निर्देशांक का उपयोग करें।",
  "use the 'expand 12 solutions' toggle at the bottom to access specialized investigative intelligence modules.": "विशेष खोजी खुफिया मॉड्यूल तक पहुंचने के लिए नीचे दिए गए '12 समाधानों का विस्तार करें' टॉगल का उपयोग करें।",
  "use the cctv full-screen toggle to focus on critical incident surveillance cameras.": "महत्वपूर्ण घटना निगरानी कैमरों पर ध्यान केंद्रित करने के लिए सीसीटीवी पूर्ण-स्क्रीन टॉगल का उपयोग करें।",
  "use the citizen incident queue tab to review public reports and dispatch field patrols.": "सार्वजनिक रिपोर्टों की समीक्षा करने और फील्ड गश्त भेजने के लिए नागरिक घटना कतार टैब का उपयोग करें।",
  "use the criminology action policy recommendation box to guide grassroots police station outreach.": "जमीनी स्तर पर पुलिस स्टेशन आउटरीच का मार्गदर्शन करने के लिए अपराधशास्त्र कार्य नीति सिफारिश बॉक्स का उपयोग करें।",
  "use the recent case register table at the bottom to jump directly to specific fir numbers.": "विशिष्ट एफआईआर नंबरों पर सीधे जाने के लिए नीचे दिए गए हालिया केस रजिस्टर तालिका का उपयोग करें।",
  "use the suggested leads tab as a ready checklist during morning crime review conferences.": "सुबह की अपराध समीक्षा बैठकों के दौरान तैयार चेकलिस्ट के रूप में सुझाए गए सुराग टैब का उपयोग करें।",
  "use the right-side history drawer to resume previous investigation case sessions or start a new chat.": "पिछली जांच केस सत्रों को फिर से शुरू करने या नया चैट शुरू करने के लिए दाईं ओर के इतिहास दराज का उपयोग करें।",
  "verify sha-256 digital signatures, officer badge authorization, and prompt history across cctns rag queries.": "सीसीटीएनएस आरएजी प्रश्नों में एसएचए-256 डिजिटल हस्ताक्षर, अधिकारी बैज प्राधिकरण और प्रॉम्प्ट इतिहास को सत्यापित करें।",
  "visual graph clustering engine to expose kingpins, syndicate intermediaries, money mules, and hidden criminal associations across multi-jurisdictional firs.": "बहु-क्षेत्राधिकार एफआईआर में सरगनाओं, सिंडिकेट मध्यस्थों, मनी म्यूल्स और छिपे हुए आपराधिक संबंधों को उजागर करने के लिए विज़ुअल ग्राफ क्लस्टरिंग इंजन।",
  "watch simulated live cctv feeds across major junctions with optical ai overlay and motion bounding boxes.": "ऑप्टिकल एआई ओवरले और मोशन बाउंडिंग बॉक्स के साथ प्रमुख जंक्शनों पर सिम्युलेटेड लाइव सीसीटीवी फीड देखें।",
  "weather-correlated crime spikes automatically prompt wet-weather patrol recommendations.": "मौसम-सहसंबद्ध अपराध वृद्धि स्वचालित रूप से बरसात के मौसम में गश्त की सिफारिशों को संकेत देती है।",
};

const SOP_TRANSLATIONS_KN: Record<string, string> = {
  "ai temporal-spatial forecasting models projecting next 72-hour crime spikes, vulnerability alerts, and weather-correlated patrol recommendations.": "ಮುಂದಿನ ೭೨ ಗಂಟೆಗಳ ಅಪರಾಧ ಏರಿಕೆ, ಸೂಕ್ಷ್ಮ ಪ್ರದೇಶಗಳ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಹವಾಮಾನ ಆಧಾರಿತ ಗಸ್ತು ಶಿಫಾರಸುಗಳನ್ನು ಒದಗಿಸುವ ಎಐ ಪ್ರಾದೇಶಿಕ-ಸಮಯದ ಮುನ್ಸೂಚನೆ ಮಾದರಿಗಳು.",
  "ai-assisted suspect dossier generation, recidivism risk calculation, modus operandi (mo) clustering, and multi-jurisdictional criminal associate tracking.": "ಎಐ-ಸಹಾಯಿತ ಶಂಕಿತರ ಡಾಸಿಯರ್ ರಚನೆ, ಮರು-ಅಪರಾಧ ಅಪಾಯದ ಲೆಕ್ಕಾಚಾರ, ಅಪರಾಧ ವಿಧಾನ (MO) ಕ್ಲಸ್ಟರಿಂಗ್ ಮತ್ತು ಬಹು-ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯ ಅಪರಾಧ ಸಹಚರರ ಟ್ರ್ಯಾಕಿಂಗ್.",
  "all cctns statistics and telemetry update dynamically from active police station databases.": "ಎಲ್ಲಾ ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ಟೆಲಿಮೆಟ್ರಿಯು ಸಕ್ರಿಯ ಪೊಲೀಸ್ ಠಾಣೆಗಳ ಡೇಟಾಬೇಸ್‌ನಿಂದ ನೇರವಾಗಿ ನವೀಕರಣಗೊಳ್ಳುತ್ತವೆ.",
  "all algorithmic inferences include confidence weight disclosures to prevent algorithmic bias in policing.": "ಪೊಲೀಸಿಂಗ್‌ನಲ್ಲಿ ಅಲ್ಗಾರಿದಮಿಕ್ ಪಕ್ಷಪಾತವನ್ನು ತಡೆಗಟ್ಟಲು ಎಲ್ಲಾ ಅಲ್ಗಾರಿದಮಿಕ್ ನಿರ್ಣಯಗಳು ವಿಶ್ವಾಸಾರ್ಹತೆಯ ತೂಕದ ಬಹಿರಂಗಪಡಿಸುವಿಕೆಯನ್ನು ಒಳಗೊಂಡಿವೆ.",
  "all query audits are locked with tamper-proof signatures adhering to electronic evidence standards.": "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಾಕ್ಷ್ಯ ಮಾನದಂಡಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಎಲ್ಲಾ ಪ್ರಶ್ನೆ ಆಡಿಟ್‌ಗಳನ್ನು ತಿದ್ದುಪಡಿ-ನಿರೋಧಕ ಡಿಜಿಟಲ್ ಸಹಿಯೊಂದಿಗೆ ಲಾಕ್ ಮಾಡಲಾಗಿದೆ.",
  "analyze demographic bar charts to understand the age cohorts most involved in registered offences.": "ದಾಖಲಾದ ಅಪರಾಧಗಳಲ್ಲಿ ಹೆಚ್ಚು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ವಯೋಮಾನದ ಗುಂಪುಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಜನಸಂಖ್ಯಾ ಬಾರ್ ಚಾರ್ಟ್‌ಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿ.",
  "ask by suspect name or alias (e.g., 'show criminal history for raju k') to retrieve mo matching, known associates, and active arrest warrants.": "ಎಂಒ ಹೊಂದಾಣಿಕೆ, ಪರಿಚಿತ ಸಹಚರರು ಮತ್ತು ಸಕ್ರಿಯ ಬಂಧನ ವಾರಂಟ್‌ಗಳನ್ನು ಪಡೆಯಲು ಶಂಕಿತರ ಹೆಸರು ಅಥವಾ ಅಡ್ಡಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ (ಉದಾ. 'ರಾಜು ಕೆ. ಅವರ ಕ್ರಿಮಿನಲ್ ಇತಿಹಾಸ ತೋರಿಸಿ').",
  "audit cryptographic sha-256 event hashes, timestamp records, officer badge ids, and action types to verify chain of custody.": "ಸಾಕ್ಷ್ಯದ ಸರಪಳಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ SHA-256 ಈವೆಂಟ್ ಹ್ಯಾಶ್‌ಗಳು, ಸಮಯದ ದಾಖಲೆಗಳು, ಅಧಿಕಾರಿ ಬ್ಯಾಡ್ಜ್ ಐಡಿಗಳು ಮತ್ತು ಕ್ರಮದ ಪ್ರಕಾರಗಳನ್ನು ಆಡಿಟ್ ಮಾಡಿ.",
  "audit historical fir registrations, case disposal stages, and click linked associate nodes to unmask co-conspirators.": "ಹಳೆಯ ಎಫ್‌ಐಆರ್ ದಾಖಲಾತಿಗಳು, ಪ್ರಕರಣ ವಿಲೇವಾರಿ ಹಂತಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಹ-ಸಂಚುಕೋರರನ್ನು ಬಯಲು ಮಾಡಲು ಲಿಂಕ್ ಮಾಡಲಾದ ಸಹಚರರ ನೋಡ್‌ಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "audit predicted risk zones across bengaluru, mysuru, hubballi, and belagavi commissionerates.": "ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಹುಬ್ಬಳ್ಳಿ ಮತ್ತು ಬೆಳಗಾವಿ ಕಮಿಷನರೇಟ್‌ಗಳಲ್ಲಿ ಅಂದಾಜಿಸಲಾದ ಅಪಾಯದ ವಲಯಗಳನ್ನು ಆಡಿಟ್ ಮಾಡಿ.",
  "audit real-time latency, cloud api gateway availability, and quickml model inference telemetry.": "ನೈಜ-ಸಮಯದ ಲೇಟೆನ್ಸಿ, ಕ್ಲೌಡ್ ಎಪಿಐ ಗೇಟ್‌ವೇ ಲಭ್ಯತೆ ಮತ್ತು QuickML ಮಾದರಿ ನಿರ್ಣಯದ ಟೆಲಿಮೆಟ್ರಿಯನ್ನು ಆಡಿಟ್ ಮಾಡಿ.",
  "automated case summarization, modus operandi (mo) similarity matching across historical firs, and generation of priority investigative leads for investigating officers (ios).": "ಸ್ವಯಂಚಾಲಿತ ಕೇಸ್ ಸಾರಾಂಶ, ಹಿಂದಿನ ಎಫ್‌ಐಆರ್‌ಗಳಲ್ಲಿನ ಅಪರಾಧ ವಿಧಾನ (MO) ಸಾಮ್ಯತೆ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ತನಿಖಾಧಿಕಾರಿಗಳಿಗೆ (IOs) ಆದ್ಯತೆಯ ತನಿಖಾ ಸುಳಿವುಗಳ ರಚನೆ.",
  "automated forensic identification comparing suspect photos, cctv freeze-frames, and latent fingerprint minutiae against active ksp convicts.": "ಸಕ್ರಿಯ ಕೆಎಸ್‌ಪಿ ಅಪರಾಧಿಗಳ ವಿರುದ್ಧ ಶಂಕಿತರ ಫೋಟೋಗಳು, ಸಿಸಿಟಿವಿ ಫ್ರೀಜ್-ಫ್ರೇಮ್‌ಗಳು ಮತ್ತು ಬೆರಳಚ್ಚು ವಿವರಗಳನ್ನು ಹೋಲಿಸುವ ಸ್ವಯಂಚಾಲಿತ ಫೋರೆನ್ಸಿಕ್ ಗುರುತಿಸುವಿಕೆ.",
  "calculates euclidean vector distance (< 0.50 cutoff) against all 10 registered ksp convict mugshots and nafis 10-prints.": "ಎಲ್ಲಾ ೧೦ ನೋಂದಾಯಿತ ಕೆಎಸ್‌ಪಿ ಅಪರಾಧಿಗಳ ಮಗ್‌ಶಾಟ್‌ಗಳು ಮತ್ತು NAFIS ೧೦-ಬೆರಳಚ್ಚುಗಳ ವಿರುದ್ಧ ಯುಕ್ಲಿಡಿಯನ್ ವೆಕ್ಟರ್ ದೂರವನ್ನು (< ೦.೫೦ ಮಿತಿ) ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.",
  "central operations command console for monitoring real-time crime incidents, tracking firs, and routing cases to specialized police branches.": "ನೈಜ-ಸಮಯದ ಅಪರಾಧ ಘಟನೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು, ಎಫ್‌ಐಆರ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಮತ್ತು ವಿಶೇಷ ಪೊಲೀಸ್ ಶಾಖೆಗಳಿಗೆ ಪ್ರಕರಣಗಳನ್ನು ನಿರ್ದೇಶಿಸಲು ಕೇಂದ್ರ ಕಾರ್ಯಾಚರಣೆ ಕಮಾಂಡ್ ಕನ್ಸೋಲ್.",
  "check the tamper-proof lock badge confirming active cryptographic chain-of-custody logging.": "ಸಕ್ರಿಯ ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಸಾಕ್ಷ್ಯ-ಸರಪಳಿ ಲಾಗಿಂಗ್ ಅನ್ನು ದೃಢೀಕರಿಸುವ ತಿದ್ದುಪಡಿ-ನಿರೋಧಕ ಲಾಕ್ ಬ್ಯಾಡ್ಜ್ ಅನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "click 'check database' or 'run biometric search'.": "'ಡೇಟಾಬೇಸ್ ಪರಿಶೀಲಿಸಿ' ಅಥವಾ 'ಬಯೋಮೆಟ್ರಿಕ್ ಹುಡುಕಾಟ ನಡೆಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click 'dispatch hoysala pcr' on any high-priority citizen incident.": "ಯಾವುದೇ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಸಾರ್ವಜನಿಕ ಘಟನೆಯ ಮೇಲೆ 'ಹೊಯ್ಸಳ ಪಿಸಿಆರ್ ರವಾನಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click 'engage cordon matrix' to automatically compute optimal interception choke-points for fleeing vehicles.": "ಪರಾರಿಯಾಗುತ್ತಿರುವ ವಾಹನಗಳಿಗೆ ಸೂಕ್ತವಾದ ತಡೆಗೋಡೆ ಚೋಕ್-ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡಲು 'ಕಾರ್ಡನ್ ಮ್ಯಾಟ್ರಿಕ್ಸ್ ಸಕ್ರಿಯಗೊಳಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click 'generate offender dossier' from the inspector pane to compile a court-ready associative intelligence annexure.": "ನ್ಯಾಯಾಲಯಕ್ಕೆ ಸಿದ್ಧವಿರುವ ಗುಪ್ತಚರ ಅನುಬಂಧವನ್ನು ಸಂಕಲಿಸಲು ಇನ್‌ಸ್ಪೆಕ್ಟರ್ ಪೇನ್‌ನಿಂದ 'ಅಪರಾಧಿ ಡಾಸಿಯರ್ ರಚಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click 'redirect to department' to transfer the case dossier.": "ಪ್ರಕರಣದ ಡಾಸಿಯರ್ ವರ್ಗಾಯಿಸಲು 'ಇಲಾಖೆಗೆ ಮರುನಿರ್ದೇಶಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click any priority alert on the right feed to jump directly into the relevant department analysis tool.": "ಸಂಬಂಧಿತ ಇಲಾಖೆಯ ವಿಶ್ಲೇಷಣಾ ಸಾಧನಕ್ಕೆ ನೇರವಾಗಿ ತೆರಳಲು ಬಲಭಾಗದ ಫೀಡ್‌ನಲ್ಲಿರುವ ಯಾವುದೇ ಆದ್ಯತೆಯ ಎಚ್ಚರಿಕೆಯನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click on any associate suspect card to instantly switch dossiers and track cross-network operations.": "ಡಾಸಿಯರ್‌ಗಳನ್ನು ತಕ್ಷಣ ಬದಲಾಯಿಸಲು ಮತ್ತು ನೆಟ್‌ವರ್ಕ್ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಯಾವುದೇ ಸಹಚರ ಶಂಕಿತರ ಕಾರ್ಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click on any individual hotspot marker to view historical fir volume and station contact details.": "ಹಳೆಯ ಎಫ್‌ಐಆರ್ ಪ್ರಮಾಣ ಮತ್ತು ಠಾಣೆಯ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಹಾಟ್‌ಸ್ಪಾಟ್ ಗುರುತಿನ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click on any suspect, bank account, vehicle, or phone imei node to display connectivity degree, risk assessment tier, and link attributes.": "ಸಂಪರ್ಕದ ಪ್ರಮಾಣ, ಅಪಾಯದ ಹಂತ ಮತ್ತು ಲಿಂಕ್ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ಶಂಕಿತ, ಬ್ಯಾಂಕ್ ಖಾತೆ, ವಾಹನ ಅಥವಾ ಫೋನ್ ಐಎಂಇಐ ನೋಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "click the export button on suspicious rows to prepare evidence annexures for financial intelligence unit (fiu-ind) submission.": "ಹಣಕಾಸು ಗುಪ್ತಚರ ಘಟಕಕ್ಕೆ (FIU-IND) ಸಲ್ಲಿಸಲು ಸಾಕ್ಷ್ಯ ಅನುಬಂಧಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಅನುಮಾನಾಸ್ಪದ ಸಾಲುಗಳ ಮೇಲಿನ ರಫ್ತು ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "compare containment score %, risk index, and response time sla between baseline and contingency deployments.": "ಮೂಲ ಮತ್ತು ತುರ್ತು ನಿಯೋಜನೆಗಳ ನಡುವೆ ನಿಯಂತ್ರಣ ಸ್ಕೋರ್ %, ಅಪಾಯದ ಸೂಚ್ಯಂಕ ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸಮಯ SLA ಅನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.",
  "compare high-density youth demographic spikes with local drug/substance abuse intelligence.": "ಸ್ಥಳೀಯ ಮಾದಕದ್ರವ್ಯ ಜಾಲದ ಗುಪ್ತಚರ ಮಾಹಿತಿಯೊಂದಿಗೆ ಹೆಚ್ಚಿನ ಜನಸಾಂದ್ರತೆಯ ಯುವ ಜನಸಂಖ್ಯಾ ಹೆಚ್ಚಳವನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.",
  "compare quarterly seasonal surges (festival, harvest, monsoon periods) across top districts (bengaluru, mysuru, belagavi).": "ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳಲ್ಲಿ (ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಬೆಳಗಾವಿ) ತ್ರೈಮಾಸಿಕ ಋತುಮಾನದ ಉಲ್ಬಣಗಳನ್ನು (ಹಬ್ಬ, ಸುಗ್ಗಿಯ, ಮಳೆಗಾಲದ ಅವಧಿ) ಹೋಲಿಕೆ ಮಾಡಿ.",
  "configure timeframe and jurisdiction filters to generate formal pdf crime briefing documents with court-ready citations.": "ನ್ಯಾಯಾಲಯಕ್ಕೆ ಸಿದ್ಧವಾಗಿರುವ ಉಲ್ಲೇಖಗಳೊಂದಿಗೆ ಅಧಿಕೃತ ಪಿಡಿಎಫ್ ಅಪರಾಧ ಬ್ರೀಫಿಂಗ್ ದಾಖಲೆಗಳನ್ನು ರಚಿಸಲು ಸಮಯ ಮತ್ತು ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಹೊಂದಿಸಿ.",
  "coordinate with local station house officers (shos) to deploy static barricades during peak forecast windows.": "ಗರಿಷ್ಠ ಮುನ್ಸೂಚನೆಯ ಅವಧಿಯಲ್ಲಿ ಬ್ಯಾರಿಕೇಡ್‌ಗಳನ್ನು ನಿಯೋಜಿಸಲು ಸ್ಥಳೀಯ ಠಾಣಾಧಿಕಾರಿಗಳೊಂದಿಗೆ (SHO) ಸಮನ್ವಯ ಸಾಧಿಸಿ.",
  "crime intelligence & criminal history tracking bureau": "ಅಪರಾಧ ಗುಪ್ತಚರ & ಕ್ರಿಮಿನಲ್ ಇತಿಹಾಸ ಟ್ರ್ಯಾಕಿಂಗ್ ಬ್ಯೂರೋ",
  "crimson red nodes represent high-risk syndicate leaders; amber nodes indicate operational couriers and mules.": "ಗಾಢ ಕೆಂಪು ನೋಡ್‌ಗಳು ಹೆಚ್ಚಿನ ಅಪಾಯದ ಸಿಂಡಿಕೇಟ್ ನಾಯಕರನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತವೆ; ಅಂಬರ್ ನೋಡ್‌ಗಳು ಕೊರಿಯರ್‌ಗಳು ಮತ್ತು ಮ್ಯೂಲ್‌ಗಳನ್ನು ಸೂಚಿಸುತ್ತವೆ.",
  "critical clusters with rising trends trigger automatic alerts to the real-time crime center (rtcc).": "ಏರಿಕೆಯ ಪ್ರವೃತ್ತಿ ಹೊಂದಿರುವ ನಿರ್ಣಾಯಕ ಕ್ಲಸ್ಟರ್‌ಗಳು ರಿಯಲ್-ಟೈಮ್ ಕ್ರೈಮ್ ಸೆಂಟರ್‌ಗೆ (RTCC) ಸ್ವಯಂಚಾಲಿತ ಎಚ್ಚರಿಕೆಗಳನ್ನು ರವಾನಿಸುತ್ತವೆ.",
  "drag & drop k-9 sniffer dogs, pcr cruisers, swat teams, and anpr barricades onto the interactive leaflet map to seal escape routes.": "ಪಲಾಯನ ಮಾರ್ಗಗಳನ್ನು ಬಂದ್ ಮಾಡಲು ಸಂವಾದಾತ್ಮಕ ಲೀಫ್ಲೆಟ್ ನಕ್ಷೆಯ ಮೇಲೆ ಕೆ-೯ ಶ್ವಾನ ದಳ, ಪಿಸಿಆರ್ ವಾಹನಗಳು, ಸ್ವಾಟ್ ಪಡೆಗಳು ಮತ್ತು ಎಎನ್‌ಪಿಆರ್ ಬ್ಯಾರಿಕೇಡ್‌ಗಳನ್ನು ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್ ಮಾಡಿ.",
  "drag nodes to rearrange cluster density or zoom with the mouse wheel to inspect multi-hop associations.": "ಕ್ಲಸ್ಟರ್ ಸಾಂದ್ರತೆಯನ್ನು ಮರುಹೊಂದಿಸಲು ನೋಡ್‌ಗಳನ್ನು ಎಳೆಯಿರಿ ಅಥವಾ ಬಹು-ಹಂತದ ಸಂಬಂಧಗಳನ್ನು ಪರೀಕ್ಷಿಸಲು ಮೌಸ್ ವೀಲ್‌ನಿಂದ ಜೂಮ್ ಮಾಡಿ.",
  "evaluate monthly case registration trends to track overall crime escalation or suppression across commissionerates.": "ಕಮಿಷನರೇಟ್‌ಗಳಲ್ಲಿ ಒಟ್ಟಾರೆ ಅಪರಾಧ ಹೆಚ್ಚಳ ಅಥವಾ ನಿಯಂತ್ರಣವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮಾಸಿಕ ಪ್ರಕರಣ ನೋಂದಣಿ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ.",
  "examine the dynamic recidivism gauge (high / medium / low risk) calculated from past chargesheets, bail history, and inter-crime intervals.": "ಹಿಂದಿನ ಚಾರ್ಜ್‌ಶೀಟ್‌ಗಳು, ಜಾಮೀನು ಇತಿಹಾಸ ಮತ್ತು ಅಪರಾಧದ ಮಧ್ಯಂತರಗಳಿಂದ ಲೆಕ್ಕಹಾಕಲಾದ ಮರುಕಳಿಸುವಿಕೆ ಗೇಜ್ (ಹೆಚ್ಚಿನ / ಮಧ್ಯಮ / ಕಡಿಮೆ ಅಪಾಯ) ಅನ್ನು ಪರೀಕ್ಷಿಸಿ.",
  "export automated executive pdf reports documenting system transparency metrics for judicial submission.": "ನ್ಯಾಯಾಂಗ ಸಲ್ಲಿಕೆಗಾಗಿ ವ್ಯವಸ್ಥೆಯ ಪಾರದರ್ಶಕತೆಯ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ಒಳಗೊಂಡ ಸ್ವಯಂಚಾಲಿತ ಕಾರ್ಯನಿರ್ವಾಹಕ ಪಿಡಿಎಫ್ ವರದಿಗಳನ್ನು ರಫ್ತು ಮಾಡಿ.",
  "export full chat transcripts to pdf for attachment with formal case diary entries.": "ಅಧಿಕೃತ ಕೇಸ್ ಡೈರಿ ನಮೂದುಗಳೊಂದಿಗೆ ಲಗತ್ತಿಸಲು ಪೂರ್ಣ ಚಾಟ್ ಪ್ರತಿಗಳನ್ನು ಪಿಡಿಎಫ್‌ಗೆ ರಫ್ತು ಮಾಡಿ.",
  "filter audit records by transaction category (upi, imps, rtgs, wire) or toggle 'suspicious only' to isolate structuring spikes.": "ವಹಿವಾಟಿನ ವರ್ಗದಿಂದ (UPI, IMPS, RTGS, ವೈರ್) ಆಡಿಟ್ ದಾಖಲೆಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ ಅಥವಾ ರಚನಾತ್ಮಕ ಏರಿಕೆಯನ್ನು ಪ್ರತ್ಯೇಕಿಸಲು 'ಅನುಮಾನಾಸ್ಪದ ಮಾತ್ರ' ಆಯ್ಕೆಮಾಡಿ.",
  "filter suspects by crime type (theft, burglary, cybercrime) or type suspect id/alias in the search bar to load the dossier.": "ಡಾಸಿಯರ್ ಲೋಡ್ ಮಾಡಲು ಅಪರಾಧದ ಪ್ರಕಾರದಿಂದ (ಕಳ್ಳತನ, ಮನೆಗಳ್ಳತನ, ಸೈಬರ್ ಅಪರಾಧ) ಶಂಕಿತರನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ ಅಥವಾ ಸರ್ಚ್ ಬಾರ್‌ನಲ್ಲಿ ಶಂಕಿತರ ಐಡಿ/ಅಡ್ಡಹೆಸರು ಟೈಪ್ ಮಾಡಿ.",
  "for low-resolution cctv frames, crop closely to the suspect's face for optimal landmark extraction.": "ಕಡಿಮೆ ಗುಣಮಟ್ಟದ ಸಿಸಿಟಿವಿ ದೃಶ್ಯಗಳಿಗೆ, ಉತ್ತಮ ಮುಖದ ಗುರುತುಗಳ ಹೊರತೆಗೆಯುವಿಕೆಗಾಗಿ ಶಂಕಿತರ ಮುಖವನ್ನು ಹತ್ತಿರದಿಂದ ಕ್ರಾಪ್ ಮಾಡಿ.",
  "high-risk offenders (>70% recidivism score) automatically flag for section 110 bnss preventive surveillance bonds.": "ಹೆಚ್ಚಿನ ಅಪಾಯದ ಅಪರಾಧಿಗಳು (>೭೦% ಮರು-ಅಪರಾಧ ಸ್ಕೋರ್) ಸೆಕ್ಷನ್ ೧೧೦ BNSS ತಡೆಗಟ್ಟುವ ಕಣ್ಗಾವಲು ಬಾಂಡ್‌ಗಳಿಗಾಗಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಗುರುತಿಸಲ್ಪಡುತ್ತಾರೆ.",
  "hover over circular gis heatmap zones on the karnataka map to view incident density, primary crime types, and beat jurisdiction.": "ಘಟನೆಯ ಸಾಂದ್ರತೆ, ಪ್ರಾಥಮಿಕ ಅಪರಾಧ ಪ್ರಕಾರಗಳು ಮತ್ತು ಬೀಟ್ ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯನ್ನು ವೀಕ್ಷಿಸಲು ಕರ್ನಾಟಕ ನಕ್ಷೆಯಲ್ಲಿ ವೃತ್ತಾಕಾರದ ಜಿಐಎಸ್ ಹೀಟ್‌ಮ್ಯಾಪ್ ವಲಯಗಳ ಮೇಲೆ ಕರ್ಸರ್ ಇರಿಸಿ.",
  "hover over data points on the 12-month trend line to inspect month-on-month velocity.": "ತಿಂಗಳಿನಿಂದ ತಿಂಗಳಿಗೆ ಬದಲಾವಣೆಯ ವೇಗವನ್ನು ಪರಿಶೀಲಿಸಲು ೧೨-ತಿಂಗಳ ಪ್ರವೃತ್ತಿಯ ರೇಖೆಯ ಮೇಲಿನ ಡೇಟಾ ಬಿಂದುಗಳ ಮೇಲೆ ಕರ್ಸರ್ ಇರಿಸಿ.",
  "identify high-centrality bridge nodes that connect disparate criminal cells across different police station jurisdictions.": "ವಿವಿಧ ಪೊಲೀಸ್ ಠಾಣೆಗಳ ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯಲ್ಲಿನ ವಿಭಿನ್ನ ಅಪರಾಧ ಕೋಶಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಪ್ರಮುಖ ಬ್ರಿಡ್ಜ್ ನೋಡ್‌ಗಳನ್ನು ಗುರುತಿಸಿ.",
  "inspect side-by-side match dossier and click 'verify match & dispatch hoysala pcr'.": "ಹೋಲಿಕೆಯ ಡಾಸಿಯರ್ ಪರಿಶೀಲಿಸಿ ಮತ್ತು 'ಹೊಂದಾಣಿಕೆ ದೃಢೀಕರಿಸಿ & ಹೊಯ್ಸಳ ಪಿಸಿಆರ್ ರವಾನಿಸಿ' ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "inspect the ranked crime category spectrum to isolate which offences constitute the largest percentage of the caseload.": "ಯಾವ ಅಪರಾಧಗಳು ಒಟ್ಟು ಪ್ರಕರಣಗಳ ಅತಿ ಹೆಚ್ಚು ಶೇಕಡಾವಾರು ಪಾಲನ್ನು ಹೊಂದಿವೆ ಎಂಬುದನ್ನು ಪ್ರತ್ಯೇಕಿಸಲು ಶ್ರೇಯಾಂಕಿತ ಅಪರಾಧ ವರ್ಗದ ಶ್ರೇಣಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "inspect the segmented ratio strip and micro metric cards to evaluate demographic proportion trends.": "ಜನಸಂಖ್ಯಾ ಅನುಪಾತದ ಪ್ರವೃತ್ತಿಗಳನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲು ಅನುಪಾತದ ಪಟ್ಟಿ ಮತ್ತು ಮೈಕ್ರೋ ಮೆಟ್ರಿಕ್ ಕಾರ್ಡ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "instant auto-completion matches against 1,000 real cctns firs and 10 registered ksp convict files.": "೧,೦೦೦ ನೈಜ ಸಿಸಿಟಿಎನ್‌ಎಸ್ ಎಫ್‌ಐಆರ್‌ಗಳು ಮತ್ತು ೧೦ ನೋಂದಾಯಿತ ಕೆಎಸ್‌ಪಿ ಅಪರಾಧಿ ಕಡತಗಳ ವಿರುದ್ಧ ತ್ವರಿತ ಸ್ವಯಂ-ಪೂರ್ಣಗೊಳಿಸುವ ಹೊಂದಾಣಿಕೆ.",
  "instantly routes cases to ccb (theft/burglary), cid cyber (otp fraud), or state biometrics (face/fingerprint).": "ಪ್ರಕರಣಗಳನ್ನು ತಕ್ಷಣವೇ CCB (ಕಳ್ಳತನ/ಮನೆಗಳ್ಳತನ), CID ಸೈಬರ್ (OTP ವಂಚನೆ), ಅಥವಾ ರಾಜ್ಯ ಬಯೋಮೆಟ್ರಿಕ್ಸ್ (ಮುಖ/ಬೆರಳಚ್ಚು) ಗೆ ನಿರ್ದೇಶಿಸುತ್ತದೆ.",
  "interactive tactical sandbox for spatial unit deployment, 360° suspect containment modeling, escape route sealing, and comparative plan a vs plan b risk evaluation.": "ಪ್ರಾದೇಶಿಕ ಪಡೆಗಳ ನಿಯೋಜನೆ, ೩೬೦° ಶಂಕಿತರ ಸುತ್ತುವರಿಯುವಿಕೆ, ಪಲಾಯನ ಮಾರ್ಗ ಬಂದ್ ಮತ್ತು ಯೋಜನೆ ಎ ವಿರುದ್ಧ ಯೋಜನೆ ಬಿ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಸಂವಾದಾತ್ಮಕ ಯುದ್ಧತಂತ್ರದ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್.",
  "juvenile justice (care & protection) act & community policing mandates": "ಕಿಶೋರ ನ್ಯಾಯ (ಆರೈಕೆ & ಸಂರಕ್ಷಣೆ) ಕಾಯ್ದೆ ಮತ್ತು ಸಮುದಾಯ ಪೊಲೀಸಿಂಗ್ ಆದೇಶಗಳು",
  "live cctv multi-stream telemetry, ai optical anpr vehicle hit scanning, live pcr cruiser gps tracking, and emergency dial-112 cad dispatch matrix.": "ಲೈವ್ ಸಿಸಿಟಿವಿ ಮಲ್ಟಿ-ಸ್ಟ್ರೀಮ್ ಟೆಲಿಮೆಟ್ರಿ, ಎಐ ಆಪ್ಟಿಕಲ್ ಎಎನ್‌ಪಿಆರ್ ವಾಹನ ಸ್ಕ್ಯಾನಿಂಗ್, ಲೈವ್ ಪಿಸಿಆರ್ ಜಿಪಿಎಸ್ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ತುರ್ತು ಡಯಲ್-೧೧೨ ಸಿಎಡಿ ರವಾನೆ ಮ್ಯಾಟ್ರಿಕ್ಸ್.",
  "model transparency reporting, shap/lime feature attribution inspection, audit trail verification, and cloud microservices health auditing.": "ಮಾದರಿ ಪಾರದರ್ಶಕತೆ ವರದಿ, SHAP/LIME ವೈಶಿಷ್ಟ್ಯಗಳ ಪರಿಶೀಲನೆ, ಆಡಿಟ್ ಟ್ರಯಲ್ ದೃಢೀಕರಣ ಮತ್ತು ಕ್ಲೌಡ್ ಮೈಕ್ರೋಸರ್ವಿಸಸ್ ಆರೋಗ್ಯ ತಪಾಸಣೆ.",
  "monitor zoho catalyst microservices status, latency meters, and uptime metrics across ai inference and ocr endpoints.": "ಎಐ ನಿರ್ಣಯ ಮತ್ತು ಒಸಿಆರ್ ಎಂಡ್‌ಪಾಯಿಂಟ್‌ಗಳಲ್ಲಿ ಜೋಹೋ ಕ್ಯಾಟಲಿಸ್ಟ್ ಮೈಕ್ರೋಸರ್ವಿಸಸ್ ಸ್ಥಿತಿ, ಲೇಟೆನ್ಸಿ ಮತ್ತು ಅಪ್‌ಟೈಮ್ ಮೆಟ್ರಿಕ್‌ಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.",
  "national crime records bureau (ncrb) data reporting directives": "ರಾಷ್ಟ್ರೀಯ ಅಪರಾಧ ದಾಖಲೆಗಳ ಬ್ಯೂರೋ (NCRB) ಡೇಟಾ ವರದಿ ನಿರ್ದೇಶನಗಳು",
  "pick any karnataka sector (bengaluru, mysuru, hubballi...) and configure fugitive mobility speed and threat tier.": "ಯಾವುದೇ ಕರ್ನಾಟಕ ವಲಯವನ್ನು (ಬೆಂಗಳೂರು, ಮೈಸೂರು, ಹುಬ್ಬಳ್ಳಿ...) ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಪರಾರಿಯಾದವರ ವೇಗ ಹಾಗೂ ಅಪಾಯದ ಹಂತವನ್ನು ನಿಗದಿಪಡಿಸಿ.",
  "pick any active fir from the left roster to populate the case narrative, ipc/bns sections, and accused details.": "ಪ್ರಕರಣದ ವಿವರಣೆ, IPC/BNS ಸೆಕ್ಷನ್‌ಗಳು ಮತ್ತು ಆರೋಪಿಗಳ ವಿವರಗಳನ್ನು ಪಡೆಯಲು ಎಡಭಾಗದ ಪಟ್ಟಿಯಿಂದ ಯಾವುದೇ ಸಕ್ರಿಯ ಎಫ್‌ಐಆರ್ ಆಯ್ಕೆಮಾಡಿ.",
  "prompt for statistical breakdowns (e.g., 'show burglary trends in bengaluru') to generate inline interactive bar and trend charts directly in chat.": "ಚಾಟ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಸಂವಾದಾತ್ಮಕ ಬಾರ್ ಮತ್ತು ಟ್ರೆಂಡ್ ಚಾರ್ಟ್‌ಗಳನ್ನು ರಚಿಸಲು ಅಂಕಿಅಂಶಗಳ ವಿವರಗಳನ್ನು ಕೇಳಿ (ಉದಾ. 'ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕಳ್ಳತನದ ಪ್ರವೃತ್ತಿ ತೋರಿಸಿ').",
  "public citizen incident reports automatically route to the pending queue with digilocker resident verification.": "ಸಾರ್ವಜನಿಕ ನಾಗರಿಕ ಘಟನಾ ವರದಿಗಳು ಡಿಜಿಲಾಕರ್ ನಿವಾಸಿ ಪರಿಶೀಲನೆಯೊಂದಿಗೆ ಬಾಕಿ ಉಳಿದಿರುವ ಸರದಿಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಾಗುತ್ತವೆ.",
  "rapid successive transactions below ₹50,000 threshold trigger automated pmla structuring alerts.": "₹೫೦,೦೦೦ ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಮೊತ್ತದ ಸತತ ಕ್ಷಿಪ್ರ ವಹಿವಾಟುಗಳು ಸ್ವಯಂಚಾಲಿತ PMLA ರಚನಾತ್ಮಕ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತವೆ.",
  "read structured ai summary highlighting crime scene facts, modus operandi signatures, and prime suspects.": "ಅಪರಾಧ ಸ್ಥಳದ ಸತ್ಯಗಳು, ಅಪರಾಧ ವಿಧಾನದ ಲಕ್ಷಣಗಳು ಮತ್ತು ಪ್ರಮುಖ ಶಂಕಿತರನ್ನು ಎತ್ತಿ ತೋರಿಸುವ ರಚನಾತ್ಮಕ ಎಐ ಸಾರಾಂಶವನ್ನು ಓದಿ.",
  "review gps telemetry for active patrol cruisers and dispatch nearest responder to active emergency cad calls.": "ಸಕ್ರಿಯ ಗಸ್ತು ವಾಹನಗಳ ಜಿಪಿಎಸ್ ಟೆಲಿಮೆಟ್ರಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ತುರ್ತು ಸಿಎಡಿ ಕರೆಗಳಿಗೆ ಹತ್ತಿರದ ವಾಹನವನ್ನು ರವಾನಿಸಿ.",
  "review crime index scores against urban migration and socio-economic variables to deploy community policing initiatives.": "ಸಮುದಾಯ ಪೊಲೀಸಿಂಗ್ ಉಪಕ್ರಮಗಳನ್ನು ಜಾರಿಗೊಳಿಸಲು ನಗರೀಕರಣ ಮತ್ತು ಸಾಮಾಜಿಕ-ಆರ್ಥಿಕ ಅಂಶಗಳ ವಿರುದ್ಧ ಅಪರಾಧ ಸೂಚ್ಯಂಕ ಸ್ಕೋರ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "review early warning notices flagged by seasonal events, weekend commercial influx, or festival overlap.": "ಋತುಮಾನದ ಘಟನೆಗಳು, ವಾರಾಂತ್ಯದ ವ್ಯಾಪಾರ ಅಥವಾ ಹಬ್ಬಗಳ ಸಂದರ್ಭದಲ್ಲಿ ಉಂಟಾಗುವ ಮುಂಚಿನ ಎಚ್ಚರಿಕೆಯ ಸೂಚನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "review linked offender dossiers and associated mule accounts to initiate formal section 102 crpc account freeze requisitions.": "ಸೆಕ್ಷನ್ ೧೦೨ CrPC ಅಡಿಯಲ್ಲಿ ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಖಾತೆ ಮುಟ್ಟುಗೋಲು ಪ್ರಕ್ರಿಯೆ ಆರಂಭಿಸಲು ಲಿಂಕ್ ಮಾಡಲಾದ ಅಪರಾಧಿಗಳ ಡಾಸಿಯರ್ ಮತ್ತು ಮ್ಯೂಲ್ ಖಾತೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "review red critical zones versus amber rising trend beats to prioritize immediate pcr vehicle re-routing.": "ತಕ್ಷಣದ ಪಿಸಿಆರ್ ವಾಹನ ಮರುಮಾರ್ಗಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಲು ಕೆಂಪು ನಿರ್ಣಾಯಕ ವಲಯಗಳು ಮತ್ತು ಅಂಬರ್ ಏರಿಕೆಯ ಪ್ರವೃತ್ತಿ ಬೀಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "route tactical mobile pcr units to predicted vulnerability corridors ahead of anticipated peak hours.": "ನಿರೀಕ್ಷಿತ ಪೀಕ್ ಅವಧಿಗಳಿಗೆ ಮುಂಚಿತವಾಗಿ ಯುದ್ಧತಂತ್ರದ ಮೊಬೈಲ್ ಪಿಸಿಆರ್ ವಾಹನಗಳನ್ನು ಮುನ್ಸೂಚಿತ ಸೂಕ್ಷ್ಮ ಪ್ರದೇಶಗಳಿಗೆ ನಿಯೋಜಿಸಿ.",
  "scan vehicle license plates (e.g. ka01ab1234) to trace historical toll/camera trajectory and trigger automated cordon interception.": "ಹಳೆಯ ಟೋಲ್/ಕ್ಯಾಮೆರಾ ಪಥವನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಮತ್ತು ಸ್ವಯಂಚಾಲಿತ ತಡೆಗೋಡೆ ರಚನೆಯನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಲು ವಾಹನ ನಂಬರ್ ಪ್ಲೇಟ್‌ಗಳನ್ನು (ಉದಾ. KA01AB1234) ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.",
  "section 149 bnss & motor vehicles act (automated number plate enforcement)": "ಸೆಕ್ಷನ್ ೧೪೯ BNSS ಮತ್ತು ಮೋಟಾರು ವಾಹನಗಳ ಕಾಯ್ದೆ (ಸ್ವಯಂಚಾಲಿತ ನಂಬರ್ ಪ್ಲೇಟ್ ಜಾರಿ)",
  "section 76 karnataka police act & identification of prisoners act / criminal procedure (identification) act 2022": "ಸೆಕ್ಷನ್ ೭೬ ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಕಾಯ್ದೆ ಮತ್ತು ಕೈದಿಗಳ ಗುರುತಿಸುವಿಕೆ ಕಾಯ್ದೆ / ಕ್ರಿಮಿನಲ್ ಪ್ರೊಸೀಜರ್ (ಐಡೆಂಟಿಫಿಕೇಶನ್) ಕಾಯ್ದೆ ೨೦೨೨",
  "select any ledger entry to reveal the source account -> destination account flow, amount, and flag justifications.": "ಮೂಲ ಖಾತೆ -> ಗಮ್ಯಸ್ಥಾನ ಖಾತೆಯ ಹರಿವು, ಮೊತ್ತ ಮತ್ತು ಎಚ್ಚರಿಕೆಯ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ಲೆಡ್ಜರ್ ನಮೂದನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  "similar case finder matches mo patterns across district boundaries to detect interstate criminal gangs.": "ಹೋಲುವ ಪ್ರಕರಣ ಶೋಧಕವು ಅಂತರರಾಜ್ಯ ಅಪರಾಧ ಜಾಲಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಜಿಲ್ಲಾ ಗಡಿಗಳಾದ್ಯಂತ ಎಂಒ ಮಾದರಿಗಳನ್ನು ಹೋಲಿಸುತ್ತದೆ.",
  "spatial density clustering and geospatial crime hotspot mapping to optimize police patrol beats and emergency quick response vehicle deployment.": "ಪೊಲೀಸ್ ಗಸ್ತು ಬೀಟ್‌ಗಳು ಮತ್ತು ತುರ್ತು ಶೀಘ್ರ ಪ್ರತಿಕ್ರಿಯಾ ವಾಹನಗಳ ನಿಯೋಜನೆಯನ್ನು ಸುಧಾರಿಸಲು ಪ್ರಾದೇಶಿಕ ಸಾಂದ್ರತೆ ಕ್ಲಸ್ಟರಿಂಗ್ ಮತ್ತು ಜಿಯೋಸ್ಪೇಷಿಯಲ್ ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮ್ಯಾಪಿಂಗ್.",
  "state police legal oversight & ai ethics board": "ರಾಜ್ಯ ಪೊಲೀಸ್ ಕಾನೂನು ಮೇಲ್ವಿಚಾರಣೆ & ಎಐ ನೀತಿಶಾಸ್ತ್ರ ಮಂಡಳಿ",
  "state police research & social defense division": "ರಾಜ್ಯ ಪೊಲೀಸ್ ಸಂಶೋಧನೆ & ಸಮಾಜ ರಕ್ಷಣಾ ವಿಭಾಗ",
  "switch between 'facial recognition' and 'nafis 10-print' tabs to perform multimodal fingerprint minutiae matching.": "ಬೆರಳಚ್ಚು ವಿವರಗಳ ಬಹು-ಮಾದರಿ ಹೊಂದಾಣಿಕೆ ನಡೆಸಲು 'ಮುಖ ಗುರುತಿಸುವಿಕೆ' ಮತ್ತು 'NAFIS ೧೦-ಬೆರಳಚ್ಚು' ಟ್ಯಾಬ್‌ಗಳ ನಡುವೆ ಬದಲಾಯಿಸಿ.",
  "switch to 'similar case finder' and 'suggested leads' tabs to find matching serial crimes and targeted cdr/financial queries.": "ಹೋಲುವ ಅಪರಾಧಗಳು ಮತ್ತು ಸಿಡಿಆರ್/ಹಣಕಾಸು ಪ್ರಶ್ನೆಗಳನ್ನು ಹುಡುಕಲು 'ಹೋಲುವ ಕೇಸ್ ಶೋಧಕ' ಮತ್ತು 'ಸೂಚಿಸಿದ ಸುಳಿವುಗಳು' ಟ್ಯಾಬ್‌ಗಳಿಗೆ ಬದಲಾಯಿಸಿ.",
  "system extracts 128-dimensional deep-learning facial embeddings (dlib resnet) and aligns facial landmarks.": "ವ್ಯವಸ್ಥೆಯು ೧೨೮-ಆಯಾಮದ ಡೀಪ್-ಲರ್ನಿಂಗ್ ಮುಖದ ಎಂಬೆಡ್ಡಿಂಗ್‌ಗಳನ್ನು (dlib ResNet) ಹೊರತೆಗೆಯುತ್ತದೆ ಮತ್ತು ಮುಖದ ಗುರುತುಗಳನ್ನು ಸರಿಹೊಂದಿಸುತ್ತದೆ.",
  "time-series analysis and cross-district crime trend monitoring to discover seasonal patterns, emergent crime categories, and jurisdictional variance.": "ಋತುಮಾನದ ಮಾದರಿಗಳು, ಉದಯೋನ್ಮುಖ ಅಪರಾಧ ವರ್ಗಗಳು ಮತ್ತು ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯ ವ್ಯತ್ಯಾಸಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಮಯ-ಸರಣಿ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಅಂತರ್-ಜಿಲ್ಲಾ ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ಕಣ್ಗಾವಲು.",
  "transmits gps coordinates, crime classification, and suspect photo to the nearest patrolling hoysala vehicle.": "ಹತ್ತಿರದ ಗಸ್ತು ತಿರುಗುತ್ತಿರುವ ಹೊಯ್ಸಳ ವಾಹನಕ್ಕೆ ಜಿಪಿಎಸ್ ನಿರ್ದೇಶಾಂಕಗಳು, ಅಪರಾಧ ವರ್ಗೀಕರಣ ಮತ್ತು ಶಂಕಿತರ ಫೋಟೋವನ್ನು ರವಾನಿಸುತ್ತದೆ.",
  "transmits verified suspect profile, known mo, and arrest warrant status directly to jurisdictional station patrol units.": "ದೃಢೀಕರಿಸಿದ ಶಂಕಿತರ ವಿವರ, ಪರಿಚಿತ MO ಮತ್ತು ಬಂಧನ ವಾರಂಟ್ ಸ್ಥಿತಿಯನ್ನು ನೇರವಾಗಿ ಸಂಬಂಧಿತ ಠಾಣೆಯ ಗಸ್ತು ಘಟಕಗಳಿಗೆ ರವಾನಿಸುತ್ತದೆ.",
  "type any fir number, suspect alias, or station in the top search bar.": "ಮೇಲ್ಭಾಗದ ಸರ್ಚ್ ಬಾರ್‌ನಲ್ಲಿ ಯಾವುದೇ ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆ, ಶಂಕಿತರ ಅಡ್ಡಹೆಸರು ಅಥವಾ ಠಾಣೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ.",
  "type any natural query or exact fir identifier (e.g., 'fir 0012/2026') to automatically generate structured case abstracts and investigator notes.": "ರಚನಾತ್ಮಕ ಕೇಸ್ ಸಾರಾಂಶ ಮತ್ತು ತನಿಖಾ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲು ಯಾವುದೇ ಪ್ರಶ್ನೆ ಅಥವಾ ನಿಖರವಾದ ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆಯನ್ನು (ಉದಾ. 'FIR 0012/2026') ಟೈಪ್ ಮಾಡಿ.",
  "upload suspect photograph, dashcam clip, or cctv grab.": "ಶಂಕಿತರ ಭಾವಚಿತ್ರ, ಡ್ಯಾಶ್‌ಕ್ಯಾಮ್ ವೀಡಿಯೊ ಅಥವಾ ಸಿಸಿಟಿವಿ ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
  "use 'auto-seal escape routes' to automatically deploy pcr cruisers on unguarded escape vectors.": "ತೆರೆದ ಪಲಾಯನ ಮಾರ್ಗಗಳಲ್ಲಿ ಪಿಸಿಆರ್ ವಾಹನಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಯೋಜಿಸಲು 'ಪಲಾಯನ ಮಾರ್ಗಗಳನ್ನು ಆಟೋ-ಸೀಲ್ ಮಾಡಿ' ಬಳಸಿ.",
  "use 're-align around fugitive' to automatically position a 360-degree perimeter ring around the target's current gps pin.": "ಗುರಿಯ ಪ್ರಸ್ತುತ ಜಿಪಿಎಸ್ ಪಿನ್ ಸುತ್ತಲೂ ೩೬೦-ಡಿಗ್ರಿ ಸುತ್ತಳತೆಯ ವಲಯವನ್ನು ಇರಿಸಲು 'ಪರಾರಿಯಾದವರ ಸುತ್ತ ಮರು-ಹೊಂದಿಸಿ' ಬಳಸಿ.",
  "use exact fir formats like 'ka/blr/2026/001' for sub-second deterministic document retrieval.": "ತ್ವರಿತ ದಾಖಲೆ ಮರುಪಡೆಯುವಿಕೆಗಾಗಿ 'KA/BLR/2026/001' ನಂತಹ ನಿಖರವಾದ ಎಫ್‌ಐಆರ್ ಫಾರ್ಮ್ಯಾಟ್‌ಗಳನ್ನು ಬಳಸಿ.",
  "use hotspot gps coordinates to configure dynamic night patrolling routes in high-density commercial and transit corridors.": "ಹೆಚ್ಚು ಜನನಿಬಿಡ ವಾಣಿಜ್ಯ ಮತ್ತು ಸಾರಿಗೆ ಕಾರಿಡಾರ್‌ಗಳಲ್ಲಿ ರಾತ್ರಿ ಗಸ್ತು ಮಾರ್ಗಗಳನ್ನು ಸಂರಚಿಸಲು ಹಾಟ್‌ಸ್ಪಾಟ್ ಜಿಪಿಎಸ್ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಬಳಸಿ.",
  "use the 'expand 12 solutions' toggle at the bottom to access specialized investigative intelligence modules.": "ವಿಶೇಷ ತನಿಖಾ ಗುಪ್ತಚರ ಮಾಡ್ಯೂಲ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಲು ಕೆಳಗಿನ '೧೨ ಪರಿಹಾರಗಳನ್ನು ವಿಸ್ತರಿಸಿ' ಟಾಗಲ್ ಬಳಸಿ.",
  "use the cctv full-screen toggle to focus on critical incident surveillance cameras.": "ನಿರ್ಣಾಯಕ ಘಟನೆಯ ಕಣ್ಗಾವಲು ಕ್ಯಾಮೆರಾಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕರಿಸಲು ಸಿಸಿಟಿವಿ ಪೂರ್ಣ-ಪರದೆ ಟಾಗಲ್ ಬಳಸಿ.",
  "use the citizen incident queue tab to review public reports and dispatch field patrols.": "ಸಾರ್ವಜನಿಕ ವರದಿಗಳನ್ನು ಪರಿಶೀಲಿಸಲು ಮತ್ತು ಗಸ್ತು ನಿಯೋಜಿಸಲು ನಾಗರಿಕ ಘಟನಾ ಸರತಿ ಟ್ಯಾಬ್ ಬಳಸಿ.",
  "use the criminology action policy recommendation box to guide grassroots police station outreach.": "ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ಠಾಣೆಯ ಸಂಪರ್ಕ ಕಾರ್ಯವನ್ನು ಮಾರ್ಗದರ್ಶಿಸಲು ಅಪರಾಧಶಾಸ್ತ್ರ ಕ್ರಿಯಾ ನೀತಿ ಶಿಫಾರಸು ಬಾಕ್ಸ್ ಬಳಸಿ.",
  "use the recent case register table at the bottom to jump directly to specific fir numbers.": "ನಿರ್ದಿಷ್ಟ ಎಫ್‌ಐಆರ್ ಸಂಖ್ಯೆಗಳಿಗೆ ನೇರವಾಗಿ ತೆರಳಲು ಕೆಳಗಿನ ಇತ್ತೀಚಿನ ಕೇಸ್ ರಿಜಿಸ್ಟರ್ ಕೋಷ್ಟಕವನ್ನು ಬಳಸಿ.",
  "use the suggested leads tab as a ready checklist during morning crime review conferences.": "ಬೆಳಗಿನ ಅಪರಾಧ ಪರಿಶೀಲನಾ ಸಭೆಗಳ ಸಮಯದಲ್ಲಿ ಸಿದ್ಧ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯಾಗಿ ಸೂಚಿಸಲಾದ ಸುಳಿವುಗಳ ಟ್ಯಾಬ್ ಬಳಸಿ.",
  "use the right-side history drawer to resume previous investigation case sessions or start a new chat.": "ಹಿಂದಿನ ತನಿಖಾ ಅಧಿವೇಶನಗಳನ್ನು ಮುಂದುವರಿಸಲು ಅಥವಾ ಹೊಸ ಚಾಟ್ ಆರಂಭಿಸಲು ಬಲಭಾಗದ ಹಿಸ್ಟರಿ ಡ್ರಾಯರ್ ಬಳಸಿ.",
  "verify sha-256 digital signatures, officer badge authorization, and prompt history across cctns rag queries.": "ಸಿಸಿಟಿಎನ್‌ಎಸ್ RAG ಪ್ರಶ್ನೆಗಳಲ್ಲಿ SHA-256 ಡಿಜಿಟಲ್ ಸಹಿಗಳು, ಅಧಿಕಾರಿ ಬ್ಯಾಡ್ಜ್ ದೃಢೀಕರಣ ಮತ್ತು ಪ್ರಾಂಪ್ಟ್ ಇತಿಹಾಸವನ್ನು ಪರಿಶೀಲಿಸಿ.",
  "visual graph clustering engine to expose kingpins, syndicate intermediaries, money mules, and hidden criminal associations across multi-jurisdictional firs.": "ಬಹು-ಠಾಣೆಗಳ ಎಫ್‌ಐಆರ್‌ಗಳಲ್ಲಿನ ಪ್ರಮುಖ ನಾಯಕರು, ಸಿಂಡಿಕೇಟ್ ಮಧ್ಯವರ್ತಿಗಳು, ಮನಿ ಮ್ಯೂಲ್‌ಗಳು ಮತ್ತು ಗುಪ್ತ ಅಪರಾಧ ಸಂಬಂಧಗಳನ್ನು ಬಯಲು ಮಾಡುವ ಗ್ರಾಫ್ ಕ್ಲಸ್ಟರಿಂಗ್ ಎಂಜಿನ್.",
  "watch simulated live cctv feeds across major junctions with optical ai overlay and motion bounding boxes.": "ಆಪ್ಟಿಕಲ್ ಎಐ ಓವರ್‌ಲೇ ಮತ್ತು ಮೋಷನ್ ಬೌಂಡಿಂಗ್ ಬಾಕ್ಸ್‌ಗಳೊಂದಿಗೆ ಪ್ರಮುಖ ಜಂಕ್ಷನ್‌ಗಳಲ್ಲಿ ಸಿಮ್ಯುಲೇಟೆಡ್ ಲೈವ್ ಸಿಸಿಟಿವಿ ಫೀಡ್‌ಗಳನ್ನು ವೀಕ್ಷಿಸಿ.",
  "weather-correlated crime spikes automatically prompt wet-weather patrol recommendations.": "ಹವಾಮಾನ ಆಧಾರಿತ ಅಪರಾಧ ಏರಿಕೆಯು ಮಳೆಗಾಲದ ಗಸ್ತು ಶಿಫಾರಸುಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನೀಡುತ್ತದೆ.",
};

export const formatDynamicText = (text: string, lang: Language): string => {
  if (!text || lang === 'en') return text;
  const raw = String(text).trim();
  const lower = raw.toLowerCase();

  // Fast lookup in Comprehensive SOP translations
  if (lang === 'hi' && SOP_TRANSLATIONS_HI[lower]) return SOP_TRANSLATIONS_HI[lower];
  if (lang === 'kn' && SOP_TRANSLATIONS_KN[lower]) return SOP_TRANSLATIONS_KN[lower];

  // FIR Case Statuses
  if (lower === 'open') return lang === 'hi' ? 'खुला' : 'ಮುಕ್ತ';
  if (lower === 'under_investigation' || lower === 'under investigation') return lang === 'hi' ? 'जांच जारी' : 'ತನಿಖೆಯಲ್ಲಿದೆ';
  if (lower === 'chargesheeted') return lang === 'hi' ? 'चार्जशीटेड' : 'ಆರೋಪಪಟ್ಟಿ ಸಲ್ಲಿಕೆ';
  if (lower === 'closed') return lang === 'hi' ? 'बंद' : 'ಮುಕ್ತಾಯಗೊಂಡಿದೆ';
  if (lower === 'convicted') return lang === 'hi' ? 'दोषी करार' : 'ದೋಷಿ ನಿರ್ಣಯ';

  // FIR Crime Types
  if (lower === 'cybercrime' || lower === 'cyber crime') return lang === 'hi' ? 'साइबर अपराध' : 'ಸೈಬರ್ ಅಪರಾಧ';
  if (lower === 'assault') return lang === 'hi' ? 'हमला' : 'ಹಲ್ಲೆ';
  if (lower === 'dowry death') return lang === 'hi' ? 'दहेज हत्या' : 'ವರದಕ್ಷಿಣೆ ಸಾವು';
  if (lower === 'robbery') return lang === 'hi' ? 'डकैती' : 'ದರೋಡೆ';
  if (lower === 'vehicle theft') return lang === 'hi' ? 'वाहन चोरी' : 'ವಾಹನ ಕಳ್ಳತನ';
  if (lower === 'cheating/fraud' || lower === 'cheating' || lower === 'fraud') return lang === 'hi' ? 'धोखाधड़ी / जालसाजी' : 'ವಂಚನೆ / ಮೋಸ';
  if (lower === 'theft') return lang === 'hi' ? 'चोरी' : 'ಕಳ್ಳತನ';
  if (lower === 'burglary' || lower === 'burglary / housebreaking') return lang === 'hi' ? 'सेंधमारी' : 'ಮನೆಗಳ್ಳತನ';
  if (lower === 'murder') return lang === 'hi' ? 'हत्या' : 'ಕೊಲೆ';
  if (lower === 'narcotics' || lower === 'drug offences') return lang === 'hi' ? 'मादक पदार्थ' : 'ಮಾದಕ ದ್ರವ್ಯ';
  if (lower === 'kidnapping') return lang === 'hi' ? 'अपहरण' : 'ಅಪಹರಣ';
  if (lower === 'extortion' || lower === 'extortion & murder') return lang === 'hi' ? 'जबरन वसूली' : 'ಸುಲಿಗೆ';
  if (lower === 'chain snatching') return lang === 'hi' ? 'चेन स्नेचिंग' : 'ಸರಗಳ್ಳತನ';

  // Police Stations
  const stationMapHi: Record<string, string> = {
    'shivajinagar ps': 'शिवाजीनगर थाना',
    'whitefield ps': 'व्हाइटफील्ड थाना',
    'tilakwadi ps': 'तिलकवाड़ी थाना',
    'anekal ps': 'अनेकल थाना',
    'btm layout ps': 'बीटीएम लेआउट थाना',
    'hsr layout ps': 'एचएसआर लेआउट थाना',
    'chamarajanagar town ps': 'चामराजनगर टाउन थाना',
    'mangaluru north ps': 'मंगलुरु उत्तर थाना',
    'kuvempunagar ps': 'कुवेम्पुनगर थाना',
    'hampankatta ps': 'हंपनकट्टा थाना',
    'market ps': 'मार्केट थाना',
    'indiranagar ps': 'इंदिरानगर थाना',
    'jayanagar ps': 'जयनगर थाना',
    'koramangala ps': 'कोरामनगल थाना',
    'hebbal ps': 'हेब्बाल थाना',
    'malleswaram ps': 'मल्लेश्वरम थाना',
    'rajajinagar ps': 'राजाजीनगर थाना',
    'yelahanka ps': 'यलहंका थाना',
    'vidyaranyapura ps': 'विद्यारण्यपुरा थाना',
    'peenya ps': 'पीन्या थाना',
    'electronic city ps': 'इलेक्ट्रॉनिक सिटी थाना',
    'cubbon park ps': 'कब्बन पार्क थाना',
    'commercial street ps': 'कमर्शियल स्ट्रीट थाना',
    'halasuru ps': 'हलसूरु थाना',
    'ulsoor ps': 'उल्सूर थाना',
  };

  const stationMapKn: Record<string, string> = {
    'shivajinagar ps': 'ಶಿವಾಜಿನಗರ ಠಾಣೆ',
    'whitefield ps': 'ವೈಟ್‌ಫೀಲ್ಡ್ ಠಾಣೆ',
    'tilakwadi ps': 'ತಿಲಕವಾಡಿ ಠಾಣೆ',
    'anekal ps': 'ಆನೇಕಲ್ ಠಾಣೆ',
    'btm layout ps': 'ಬಿಟಿಎಂ ಲೇಔಟ್ ಠಾಣೆ',
    'hsr layout ps': 'ಎಚ್‌ಎಸ್‌ಆರ್ ಲೇಔಟ್ ಠಾಣೆ',
    'chamarajanagar town ps': 'ಚಾಮರಾಜನಗರ ಟೌನ್ ಠಾಣೆ',
    'mangaluru north ps': 'ಮಂಗಳೂರು ಉತ್ತರ ಠಾಣೆ',
    'kuvempunagar ps': 'ಕುವೆಂಪುನಗರ ಠಾಣೆ',
    'hampankatta ps': 'ಹಂಪನಕಟ್ಟಾ ಠಾಣೆ',
    'market ps': 'ಮಾರ್ಕೆಟ್ ಠಾಣೆ',
    'indiranagar ps': 'ಇಂದಿರಾನಗರ ಠಾಣೆ',
    'jayanagar ps': 'ಜಯನಗರ ಠಾಣೆ',
    'koramangala ps': 'ಕೋರಮಂಗಲ ಠಾಣೆ',
    'hebbal ps': 'ಹೆಬ್ಬಾಳ ಠಾಣೆ',
    'malleswaram ps': 'ಮಲ್ಲೇಶ್ವರಂ ಠಾಣೆ',
    'rajajinagar ps': 'ರಾಜಾಜಿನಗರ ಠಾಣೆ',
    'yelahanka ps': 'ಯಲಹಂಕ ಠಾಣೆ',
    'vidyaranyapura ps': 'ವಿದ್ಯಾರಣ್ಯಪುರ ಠಾಣೆ',
    'peenya ps': 'ಪೀಣ್ಯ ಠಾಣೆ',
    'electronic city ps': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಠಾಣೆ',
    'cubbon park ps': 'ಕಬ್ಬನ್ ಪಾರ್ಕ್ ಠಾಣೆ',
    'commercial street ps': 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ರೀಟ್ ಠಾಣೆ',
    'halasuru ps': 'ಹಲಸೂರು ಠಾಣೆ',
    'ulsoor ps': 'ಅಲಸೂರು ಠಾಣೆ',
  };

  if (lang === 'hi' && stationMapHi[lower]) return stationMapHi[lower];
  if (lang === 'kn' && stationMapKn[lower]) return stationMapKn[lower];
  if (lower.endsWith(' ps')) {
    const base = raw.slice(0, -3);
    return lang === 'hi' ? `${base} थाना` : `${base} ಠಾಣೆ`;
  }

  // Investigating Officers (IO)
  const officerMapHi: Record<string, string> = {
    'circle inspector yusuf patil': 'सर्कल इंस्पेक्टर यूसुफ पाटिल',
    'psi vidya sharma': 'पीएसआई विद्या शर्मा',
    'sub-inspector yusuf desai': 'सब-इंस्पेक्टर यूसुफ देसाई',
    'psi nagaraj kumar': 'पीएसआई नागराज कुमार',
    'asi vijay gowda': 'एएसआई विजय गौड़ा',
    'circle inspector rukmini desai': 'सर्कल इंस्पेक्टर रुक्मिणी देसाई',
    'psi krishnamurthy sharma': 'पीएसआई कृष्णमूर्ति शर्मा',
    'psi hanumantharaya iyer': 'पीएसआई हनुमंतराय अय्यर',
    'sub-inspector suresh sharma': 'सब-इंस्पेक्टर सुरेश शर्मा',
    'inspector mamatha iyer': 'इंस्पेक्टर ममता अय्यर',
    'asi yusuf patil': 'एएसआई यूसुफ पाटिल',
    'inspector raju k': 'इंस्पेक्टर राजू के',
    'circle inspector anand kumar': 'सर्कल इंस्पेक्टर आनंद कुमार',
    'sub-inspector prakash rao': 'सब-इंस्पेक्टर प्रकाश राव',
    'psi sunil kumar': 'पीएसआई सुनील कुमार',
  };

  const officerMapKn: Record<string, string> = {
    'circle inspector yusuf patil': 'ಸರ್ಕಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಯೂಸುಫ್ ಪಾಟೀಲ್',
    'psi vidya sharma': 'ಪಿಎಸ್‌ಐ ವಿದ್ಯಾ ಶರ್ಮಾ',
    'sub-inspector yusuf desai': 'ಸಬ್-ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಯೂಸುಫ್ ದೇಸಾಯಿ',
    'psi nagaraj kumar': 'ಪಿಎಸ್‌ಐ ನಾಗರಾಜ್ ಕುಮಾರ್',
    'asi vijay gowda': 'ಎಎಸ್‌ಐ ವಿಜಯ್ ಗೌಡ',
    'circle inspector rukmini desai': 'ಸರ್ಕಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ರುಕ್ಮಿಣಿ ದೇಸಾಯಿ',
    'psi krishnamurthy sharma': 'ಪಿಎಸ್‌ಐ ಕೃಷ್ಣಮೂರ್ತಿ ಶರ್ಮಾ',
    'psi hanumantharaya iyer': 'ಪಿಎಸ್‌ಐ ಹನುಮಂತರಾಯ ಅಯ್ಯರ್',
    'sub-inspector suresh sharma': 'ಸಬ್-ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಸುರೇಶ್ ಶರ್ಮಾ',
    'inspector mamatha iyer': 'ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಮಮತಾ ಅಯ್ಯರ್',
    'asi yusuf patil': 'ಎಎಸ್‌ಐ ಯೂಸುಫ್ ಪಾಟೀಲ್',
    'inspector raju k': 'ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ರಾಜು ಕೆ',
    'circle inspector anand kumar': 'ಸರ್ಕಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಆನಂದ್ ಕುಮಾರ್',
    'sub-inspector prakash rao': 'ಸಬ್-ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಪ್ರಕಾಶ್ ರಾವ್',
    'psi sunil kumar': 'ಪಿಎಸ್‌ಐ ಸುನೀಲ್ ಕುಮಾರ್',
  };

  if (lang === 'hi' && officerMapHi[lower]) return officerMapHi[lower];
  if (lang === 'kn' && officerMapKn[lower]) return officerMapKn[lower];

  if (/^(circle inspector|sub-inspector|inspector|psi|asi|head constable|constable)/i.test(raw)) {
    if (lang === 'hi') {
      return raw
        .replace(/^Circle Inspector\s+/i, 'सर्कल इंस्पेक्टर ')
        .replace(/^Sub-Inspector\s+/i, 'सब-इंस्पेक्टर ')
        .replace(/^Inspector\s+/i, 'इंस्पेक्टर ')
        .replace(/^PSI\s+/i, 'पीएसआई ')
        .replace(/^ASI\s+/i, 'एएसआई ')
        .replace(/^Head Constable\s+/i, 'हेड कांस्टेबल ')
        .replace(/^Constable\s+/i, 'कांस्टेबल ');
    } else {
      return raw
        .replace(/^Circle Inspector\s+/i, 'ಸರ್ಕಲ್ ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ')
        .replace(/^Sub-Inspector\s+/i, 'ಸಬ್-ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ')
        .replace(/^Inspector\s+/i, 'ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ')
        .replace(/^PSI\s+/i, 'ಪಿಎಸ್‌ಐ ')
        .replace(/^ASI\s+/i, 'ಎಎಸ್‌ಐ ')
        .replace(/^Head Constable\s+/i, 'ಹೆಡ್ ಕಾನ್‌ಸ್ಟೆಬಲ್ ')
        .replace(/^Constable\s+/i, 'ಕಾನ್‌ಸ್ಟೆಬಲ್ ');
    }
  }


  // Audit and RBAC Roles
  if (lower === 'policymaker' || lower === 'hq policymaker') return lang === 'hi' ? 'नीति निर्माता (HQ)' : 'ನೀತಿ ತಯಾರಕ (HQ)';
  if (lower === 'investigator') return lang === 'hi' ? 'जाँच अधिकारी (Investigator)' : 'ತನಿಖಾಧಿಕಾರಿ (Investigator)';
  if (lower === 'analyst' || lower === 'crime analyst') return lang === 'hi' ? 'अपराध विश्लेषक (Analyst)' : 'ಅಪರಾಧ ವಿಶ್ಲೇಷಕ (Analyst)';
  if (lower === 'supervisor' || lower === 'station supervisor') return lang === 'hi' ? 'थाना पर्यवेक्षक (Supervisor)' : 'ಠಾಣಾ ಮೇಲ್ವಿಚಾರಕ (Supervisor)';
  if (lower === 'citizen') return lang === 'hi' ? 'नागरिक (Citizen)' : 'ನಾಗರಿಕ (Citizen)';

  // Role Permissions Sandbox Descriptions
  if (lower.includes('own district cases, chatbot, face search')) {
    return lang === 'hi'
      ? 'स्वयं के जिले के मामले, चैटबॉट, फेस सर्च, अपराधी प्रोफाइल।'
      : 'ಸ್ವಂತ ಜಿಲ್ಲೆಯ ಪ್ರಕರಣಗಳು, ಚಾಟ್‌ಬಾಟ್, ಫೇಸ್ ಸರ್ಚ್, ಅಪರಾಧಿ ಪ್ರೊಫೈಲ್‌ಗಳು.';
  }
  if (lower.includes('state-wide data, all dashboards, network graphs')) {
    return lang === 'hi'
      ? 'राज्यव्यापी डेटा, सभी डैशबोर्ड, आपराधिक नेटवर्क ग्राफ।'
      : 'ರಾಜ್ಯವ್ಯಾಪಿ ಡೇಟಾ, ಎಲ್ಲಾ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗಳು, ನೆಟ್‌ವರ್ಕ್ ಗ್ರಾಫ್‌ಗಳು.';
  }
  if (lower.includes('team activity and audit logs')) {
    return lang === 'hi'
      ? 'टीम गतिविधि, स्टेशन रोस्टर और सुरक्षा ऑडिट लॉग।'
      : 'ತಂಡದ ಚಟುವಟಿಕೆ ಮತ್ತು ಭದ್ರತಾ ಆಡಿಟ್ ಲಾಗ್‌ಗಳು.';
  }
  if (lower.includes('aggregate trends only')) {
    return lang === 'hi'
      ? 'केवल समग्र रुझान — कोई व्यक्तिगत पहचान योग्य जानकारी नहीं।'
      : 'ಕೇವಲ ಒಟ್ಟುಗೂಡಿಸಿದ ಪ್ರವೃತ್ತಿಗಳು — ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ ಇಲ್ಲ.';
  }

  // Audit Table Details & Actions
  if (lower === 'login') return lang === 'hi' ? 'लॉगिन' : 'ಲಾಗಿನ್';
  if (lower === 'logout') return lang === 'hi' ? 'लॉगआउट' : 'ಲಾಗ್‌ಔಟ್';
  if (lower === 'query') return lang === 'hi' ? 'क्वेरी / खोज' : 'ಪ್ರಶ್ನೆ / ಹುಡುಕಾಟ';
  if (lower === 'view_network') return lang === 'hi' ? 'नेटवर्क देखें' : 'ನೆಟ್‌ವರ್ಕ್ ವೀಕ್ಷಣೆ';
  if (lower === 'view_fir') return lang === 'hi' ? 'FIR देखें' : 'ಎಫ್‌ಐಆರ್ ವೀಕ್ಷಣೆ';
  if (lower === 'generate_summary') return lang === 'hi' ? 'सारांश बनाएं' : 'ಸಾರಾಂಶ ರಚನೆ';
  if (lower === 'view_suspect') return lang === 'hi' ? 'संदिग्ध देखें' : 'ಶಂಕಿತರ ವೀಕ್ಷಣೆ';
  if (lower === 'download_report') return lang === 'hi' ? 'रिपोर्ट डाउनलोड' : 'ವರದಿ ಡೌನ್‌ಲೋಡ್';
  if (lower === 'role_change') return lang === 'hi' ? 'भूमिका परिवर्तन' : 'ಪಾತ್ರ ಬದಲಾವಣೆ';
  if (lower === 'face_search') return lang === 'hi' ? 'फेस सर्च' : 'ಮುಖ ಹುಡುಕಾಟ';
  if (lower === 'export_pdf') return lang === 'hi' ? 'पीडीएफ निर्यात' : 'ಪಿಡಿಎಫ್ ರಫ್ತು';

  if (lower.includes('established secure ssl connection')) {
    return lang === 'hi' ? 'कैटेलिस्ट AppSail से सुरक्षित SSL कनेक्शन स्थापित किया' : 'ಕ್ಯಾಟಲಿಸ್ಟ್ AppSail ಗೆ ಸುರಕ್ಷಿತ SSL ಸಂಪರ್ಕ ಸ್ಥಾಪಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('closed active browser session')) {
    return lang === 'hi' ? 'सक्रिय ब्राउज़र सत्र बंद किया और सुरक्षा टोकन साफ़ किए' : 'ಸಕ್ರಿಯ ಬ್ರೌಸರ್ ಸೆಶನ್ ಮುಚ್ಚಲಾಗಿದೆ & ಭದ್ರತಾ ಟೋಕನ್ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('generated financial link network')) {
    return lang === 'hi' ? 'संरचित लेनदेन के लिए वित्तीय लिंक नेटवर्क तैयार किया' : 'ರಚನಾತ್ಮಕ ವಹಿವಾಟುಗಳಿಗಾಗಿ ಹಣಕಾಸು ಲಿಂಕ್ ನೆಟ್‌ವರ್ಕ್ ರಚಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('queried nosql database for fir records')) {
    return lang === 'hi' ? 'मैसूर जिले में FIR रिकॉर्ड के लिए NoSQL डेटाबेस में खोज की' : 'ಮೈಸೂರು ಜಿಲ್ಲೆಯ ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳಿಗಾಗಿ NoSQL ಡೇಟಾಬೇಸ್ ಪ್ರಶ್ನಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('viewed fir register entry')) {
    return lang === 'hi' ? 'FIR रजिस्टर प्रविष्टि देखी गई' : 'ಎಫ್‌ಐಆರ್ ರಿಜಿಸ್ಟರ್ ಪ್ರವೇಶ ವೀಕ್ಷಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('generated ai summary using quickml')) {
    return lang === 'hi' ? 'QuickML द्वारा FIR के लिए AI सारांश तैयार किया' : 'QuickML ಬಳಸಿ ಎಫ್‌ಐಆರ್‌ಗಾಗಿ ಎಐ ಸಾರಾಂಶ ರಚಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('accessed suspect profile details')) {
    return lang === 'hi' ? 'संदिग्ध की प्रोफाइल का विस्तृत विवरण देखा' : 'ಶಂಕಿತರ ಪ್ರೊಫೈಲ್ ವಿವರಗಳನ್ನು ಪ್ರವೇಶಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('downloaded comprehensive district hotspot analysis')) {
    return lang === 'hi' ? 'व्यापक जिला हॉटस्पॉट विश्लेषण रिपोर्ट डाउनलोड की' : 'ಸಮಗ್ರ ಜಿಲ್ಲಾ ಹಾಟ್‌ಸ್ಪಾಟ್ ವಿಶ್ಲೇಷಣೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ';
  }
  if (lower.includes('modified session authentication role')) {
    return lang === 'hi' ? 'प्रदर्शन के लिए सत्र प्रमाणीकरण भूमिका बदली' : 'ಡೆಮೊಗಾಗಿ ಸೆಶನ್ ದೃಢೀಕರಣ ಪಾತ್ರವನ್ನು ಬದಲಾಯಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('submitted face recognition query')) {
    return lang === 'hi' ? 'डेटाबेस के खिलाफ चेहरा पहचान अनुरोध प्रस्तुत किया' : 'ಡೇಟಾಬೇಸ್ ವಿರುದ್ಧ ಮುಖ ಗುರುತಿಸುವಿಕೆ ಪ್ರಶ್ನೆ ಸಲ್ಲಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('user authenticated successfully via biometric scan')) {
    return lang === 'hi' ? 'बायोमेट्रिक स्कैन द्वारा उपयोगकर्ता सफलतापूर्वक प्रमाणित हुआ' : 'ಬಯೋಮೆಟ್ರಿಕ್ ಸ್ಕ್ಯಾನ್ ಮೂಲಕ ಬಳಕೆದಾರರು ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದ್ದಾರೆ';
  }
  if (lower.includes('queried database for suspect')) {
    return lang === 'hi' ? 'संदिग्ध के लिए डेटाबेस क्वेरी चलाई गई' : 'ಶಂಕಿತರಿಗಾಗಿ ಡೇಟಾಬೇಸ್ ಪ್ರಶ್ನಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('rendered relationship network graph')) {
    return lang === 'hi' ? 'संबंध नेटवर्क ग्राफ प्रस्तुत किया गया' : 'ಸಂಬಂಧಗಳ ನೆಟ್‌ವರ್ಕ್ ಗ್ರಾಫ್ ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ';
  }

  // Recidivism Locations & Zones
  if (lower.includes('bengaluru south') || lower.includes('jayanagar')) {
    return lang === 'hi' ? 'बेंगलुरु दक्षिण — जयनगर क्षेत्र' : 'ಬೆಂಗಳೂರು ದಕ್ಷಿಣ — ಜಯನಗರ ಪ್ರದೇಶ';
  }
  if (lower.includes('bengaluru east') || lower.includes('whitefield')) {
    return lang === 'hi' ? 'बेंगलुरु पूर्व — व्हाइटफील्ड औद्योगिक क्षेत्र' : 'ಬೆಂಗಳೂರು ಪೂರ್ವ — ವೈಟ್‌ಫೀಲ್ಡ್ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ';
  }
  if (lower.includes('bengaluru central') || lower.includes('shivajinagar')) {
    return lang === 'hi' ? 'बेंगलुरु मध्य — शिवाजीनगर क्षेत्र' : 'ಬೆಂಗಳೂರು ಕೇಂದ್ರ — ಶಿವಾಜಿನಗರ ಪ್ರದೇಶ';
  }
  if (lower.includes('mysuru') || lower.includes('kuvempunagar')) {
    return lang === 'hi' ? 'मैसूर — कुवेम्पुनगर क्षेत्र' : 'ಮೈಸೂರು — ಕುವೆಂಪುನಗರ ಪ್ರದೇಶ';
  }
  if (lower.includes('mangaluru') || lower.includes('hampankatta')) {
    return lang === 'hi' ? 'मंगलुरु — हंपनकट्टा वाणिज्यिक केंद्र' : 'ಮಂಗಳೂರು — ಹಂಪನಕಟ್ಟಾ ವಾಣಿಜ್ಯ ಕೇಂದ್ರ';
  }
  if (lower.includes('hubballi-dharwad') || lower.includes('cbt')) {
    return lang === 'hi' ? 'हुबली-धारवाड़ — सीबीटी स्टेशन क्षेत्र' : 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ — ಸಿಬಿಟಿ ನಿಲ್ದಾಣ ಪ್ರದೇಶ';
  }
  if (lower.includes('kalaburagi') || lower.includes('super market')) {
    return lang === 'hi' ? 'कलबुर्गी — सुपर मार्केट सर्कल' : 'ಕಲಬುರಗಿ — ಸೂಪರ್ ಮಾರ್ಕೆಟ್ ವೃತ್ತ';
  }
  if (lower.includes('belagavi') || lower.includes('camp')) {
    return lang === 'hi' ? 'बेलगावी — कैंप क्षेत्र' : 'ಬೆಳಗಾವಿ — ಕ್ಯಾಂಪ್ ಪ್ರದೇಶ';
  }

  // Common Crime Types fallback
  if (lower === 'vehicle theft') return lang === 'hi' ? 'वाहन चोरी' : 'ವಾಹನ ಕಳ್ಳತನ';
  if (lower === 'burglary / housebreaking' || lower === 'burglary') return lang === 'hi' ? 'घर में चोरी (सेंधमारी)' : 'ಮನೆಗಳ್ಳತನ / ಕನ್ನಗಳ್ಳತನ';
  if (lower === 'chain snatching') return lang === 'hi' ? 'चेन स्नेचिंग' : 'ಸರಗಳ್ಳತನ';
  if (lower === 'drug offences' || lower === 'narcotics') return lang === 'hi' ? 'नशीले पदार्थ अपराध' : 'ಮಾದಕವಸ್ತು ಅಪರಾಧಗಳು';
  if (lower === 'cybercrime' || lower === 'cyber fraud') return lang === 'hi' ? 'साइबर अपराध / धोखाधड़ी' : 'ಸೈಬರ್ ಅಪರಾಧ / ವಂಚನೆ';
  if (lower === 'extortion & murder' || lower === 'extortion') return lang === 'hi' ? 'जबरन वसूली और हत्या' : 'ಸುಲಿಗೆ ಮತ್ತು ಕೊಲೆ';

  // Common Recidivism Timeline fallbacks
  if (lower.includes('60% probability within 6 weeks')) return lang === 'hi' ? '6 सप्ताह के भीतर 60% संभावना' : '೬ ವಾರಗಳಲ್ಲಿ ೬೦% ಸಂಭವನೀಯತೆ';
  if (lower.includes('75% probability within 30 days')) return lang === 'hi' ? '30 दिनों के भीतर 75% संभावना' : '೩೦ ದಿನಗಳಲ್ಲಿ ೭೫% ಸಂಭವನೀಯತೆ';
  if (lower.includes('85% probability within 14 days')) return lang === 'hi' ? '14 दिनों के भीतर 85% संभावना' : '೧೪ ದಿನಗಳಲ್ಲಿ ೮೫% ಸಂಭವನೀಯತೆ';
  if (lower.includes('40% probability within 3 months')) return lang === 'hi' ? '3 महीनों के भीतर 40% संभावना' : '೩ ತಿಂಗಳಲ್ಲಿ ೪೦% ಸಂಭವನೀಯತೆ';
  if (lower.includes('90% probability within 7 days')) return lang === 'hi' ? '7 दिनों के भीतर 90% संभावना' : '೭ ದಿನಗಳಲ್ಲಿ ೯೦% ಸಂಭವನೀಯತೆ';

  // Trigger Factors
  if (lower.includes('released 45 days ago from parappana agrahara')) {
    return lang === 'hi' ? '45 दिन पहले परप्पना अग्रहारा सेंट्रल जेल से रिहा' : '೪೫ ದಿನಗಳ ಹಿಂದೆ ಪರಪ್ಪನ ಅಗ್ರಹಾರ ಕೇಂದ್ರ ಕಾರಾಗೃಹದಿಂದ ಬಿಡುಗಡೆ';
  }
  if (lower.includes('two known associates') && lower.includes('recently active')) {
    return lang === 'hi' ? 'उसी जिले में दो जाने-माने आपराधिक साथी (वेंकटेश एम., नागराज आर.) हाल ही में सक्रिय' : 'ಅದೇ ಜಿಲ್ಲೆಯಲ್ಲಿ ಇತ್ತೀಚೆಗೆ ಸಕ್ರಿಯರಾಗಿರುವ ಇಬ್ಬರು ಪರಿಚಿತ ಸಹವರ್ತಿಗಳು (ವೆಂಕಟೇಶ್ ಎಂ., ನಾಗರಾಜ್ ಆರ್.)';
  }
  if (lower.includes('historical pattern of monsoon-season')) {
    return lang === 'hi' ? 'मानसून के मौसम में अपराध का ऐतिहासिक पैटर्न (जून-सितंबर)' : 'ಮಳೆಗಾಲದ ಅವಧಿಯಲ್ಲಿ ಅಪರಾಧ ಎಸಗುವ ಐತಿಹಾಸಿಕ ಮಾದರಿ (ಜೂನ್-ಸೆಪ್ಟೆಂಬರ್)';
  }
  if (lower.includes('high unemployment in the whitefield')) {
    return lang === 'hi' ? 'व्हाइटफील्ड औद्योगिक क्षेत्र में उच्च बेरोजगारी' : 'ವೈಟ್‌ಫೀಲ್ಡ್ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶದಲ್ಲಿ ಹೆಚ್ಚಿನ ನಿರುದ್ಯೋಗ';
  }
  if (lower.includes('released 15 days ago from judicial custody')) {
    return lang === 'hi' ? '15 दिन पहले न्यायिक हिरासत से रिहा' : '೧೫ ದಿನಗಳ ಹಿಂದೆ ನ್ಯಾಯಾಂಗ ಬಂಧನದಿಂದ ಬಿಡುಗಡೆ';
  }
  if (lower.includes('active phone communications with known fenced goods')) {
    return lang === 'hi' ? 'चोरी का माल खरीदने वाले रिसीवरों के साथ सक्रिय फोन संपर्क' : 'ಕದ್ದ ಮಾಲನ್ನು ಸ್ವೀಕರಿಸುವವರೊಂದಿಗೆ ಸಕ್ರಿಯ ದೂರವಾಣಿ ಸಂಪರ್ಕ';
  }
  if (lower.includes('frequent visits to high-density jewelry commercial corridors')) {
    return lang === 'hi' ? 'उच्च घनत्व वाले आभूषण वाणिज्यिक गलियारों में बार-बार जाना' : 'ಹೆಚ್ಚು ಜನನಿಬಿಡ ಆಭರಣ ಮಾರುಕಟ್ಟೆ ಪ್ರದೇಶಗಳಿಗೆ ನಿರಂತರ ಭೇಟಿ';
  }
  if (lower.includes('multiple prior convictions for housebreaking using duplicate keys')) {
    return lang === 'hi' ? 'डुप्लीकेट चाबी का उपयोग करके घर में चोरी के लिए पूर्व में कई सजाएं' : 'ನಕಲಿ ಕೀಲಿ ಬಳಸಿ ಮನೆಗಳ್ಳತನ ಎಸಗಿದ್ದಕ್ಕಾಗಿ ಹಿಂದಿನ ಹಲವಾರು ಶಿಕ್ಷೆಗಳು';
  }
  if (lower.includes('history of narcotics peddling near educational institutions')) {
    return lang === 'hi' ? 'शैक्षणिक संस्थानों के पास मादक पदार्थों की तस्करी का इतिहास' : 'ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಗಳ ಬಳಿ ಮಾದಕವಸ್ತು ಮಾರಾಟ ಮಾಡಿದ ಇತಿಹಾಸ';
  }
  if (lower.includes('severe financial distress with unserviced non-institutional debt')) {
    return lang === 'hi' ? 'असुरक्षित निजी ऋण के साथ गंभीर वित्तीय संकट' : 'ಖಾಸಗಿ ಸಾಲದ ಹೊರೆಯೊಂದಿಗೆ ತೀವ್ರ ಆರ್ಥಿಕ ಸಂಕಷ್ಟ';
  }
  if (lower.includes('associating with known syndicate members in shivajinagar')) {
    return lang === 'hi' ? 'शिवाजीनगर में कुख्यात आपराधिक गिरोह के सदस्यों के साथ संगति' : 'ಶಿವಾಜಿನಗರದಲ್ಲಿ ಕುಖ್ಯಾತ ಗ್ಯಾಂಗ್ ಸದಸ್ಯರೊಂದಿಗೆ ಒಡನಾಟ';
  }
  if (lower.includes('recent procurement of burner sim cards registered in other states')) {
    return lang === 'hi' ? 'अन्य राज्यों में पंजीकृत फर्जी बर्नर सिम कार्ड की खरीद' : 'ಇತರ ರಾಜ್ಯಗಳಲ್ಲಿ ನೋಂದಾಯಿಸಲಾದ ಬರ್ನರ್ ಸಿಮ್ ಕಾರ್ಡ್‌ಗಳ ಖರೀದಿ';
  }

  // SOP Common Departments
  if (lower.includes('state police headquarters (sphq) it & administration')) {
    return lang === 'hi' ? 'राज्य पुलिस मुख्यालय (SPHQ) आईटी और प्रशासन विंग' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಪ್ರಧಾನ ಕಚೇರಿ (SPHQ) ಐಟಿ & ಆಡಳಿತ ವಿಭಾಗ';
  }
  if (lower.includes('state crime records bureau & intelligence wing') || lower.includes('scrb')) {
    return lang === 'hi' ? 'राज्य अपराध रिकॉर्ड ब्यूरो (SCRB) और खुफिया शाखा' : 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆಗಳ ಬ್ಯೂರೋ (SCRB) & ಗುಪ್ತಚರ ವಿಭಾಗ';
  }
  if (lower.includes('criminal investigation department (cid)')) {
    return lang === 'hi' ? 'आपराधिक जांच विभाग (CID) और अभियोजन सलाहकार प्रकोष्ठ' : 'ಅಪರಾಧ ತನಿಖಾ ಇಲಾಖೆ (CID) & ಪ್ರಾಸಿಕ್ಯೂಷನ್ ಕೋಶ';
  }
  if (lower.includes('state biometrics & forensic science laboratory')) {
    return lang === 'hi' ? 'राज्य बायोमेट्रिक्स और फोरेंसिक विज्ञान प्रयोगशाला (FSL) बेंगलुरु' : 'ರಾಜ್ಯ ಬಯೋಮೆಟ್ರಿಕ್ಸ್ & ಫೋರೆನ್ಸಿಕ್ ಲ್ಯಾಬೊರೇಟರಿ (FSL) ಬೆಂಗಳೂರು';
  }
  if (lower.includes('cid economic offences wing (eow)')) {
    return lang === 'hi' ? 'सीआईडी आर्थिक अपराध शाखा (EOW) और साइबर अपराध विंग' : 'ಸಿಐಡಿ ಆರ್ಥಿಕ ಅಪರಾಧಗಳ ವಿಭಾಗ (EOW) & ಸೈಬರ್ ಕ್ರೈಮ್ ಯೂನಿಟ್';
  }
  if (lower.includes('state police modernization & predictive analytics')) {
    return lang === 'hi' ? 'राज्य पुलिस आधुनिकीकरण और प्रेडिक्टिव एनालिटिक्स डिवीजन' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಆಧುನೀಕರಣ & ಪ್ರಿಡಿಕ್ಟಿವ್ ಅನಾಲಿಟಿಕ್ಸ್ ವಿಭಾಗ';
  }
  if (lower.includes('state police gis cell & traffic/law enforcement')) {
    return lang === 'hi' ? 'राज्य पुलिस जीआईएस सेल और कानून प्रवर्तन शाखा' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಜಿಐಎಸ್ ಕೋಶ & ಕಾನೂನು ಜಾರಿ ವಿಭಾಗ';
  }
  if (lower.includes('central crime branch (ccb) & anti-extortion')) {
    return lang === 'hi' ? 'सेंट्रल क्राइम ब्रांच (CCB) और एंटी-एक्सटॉर्शन सेल' : 'ಸೆಂಟ್ರಲ್ ಕ್ರೈಮ್ ಬ್ರಾಂಚ್ (CCB) & ಸುಲಿಗೆ ವಿರೋಧಿ ದಳ';
  }
  if (lower.includes('tactical operations command & special weapons')) {
    return lang === 'hi' ? 'रणनीतिक अभियान कमान और विशेष हथियार / QRF दस्ता' : 'ಕಾರ್ಯತಂತ್ರ ಕಾರ್ಯಾಚರಣೆಗಳ ಕಮಾಂಡ್ & QRF ಪಡೆ';
  }
  if (lower.includes('state police command & control center (dial 112')) {
    return lang === 'hi' ? 'राज्य पुलिस कमांड एवं कंट्रोल सेंटर (डायल 112 ऑप्स)' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಕಮಾಂಡ್ & ಕಂಟ್ರೋಲ್ ಸೆಂಟರ್ (ಡಯಲ್ 112)';
  }
  if (lower.includes('state police oversight & legal compliance')) {
    return lang === 'hi' ? 'राज्य पुलिस निरीक्षण और कानूनी अनुपालन निदेशालय' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಮೇಲ್ವಿಚಾರಣೆ & ಕಾನೂನು ಅನುಸರಣೆ ನಿರ್ದೇಶನಾಲಯ';
  }
  if (lower.includes('crime intelligence & statistical risk assessment')) {
    return lang === 'hi' ? 'अपराध खुफिया और सांख्यिकीय जोखिम मूल्यांकन प्रकोष्ठ' : 'ಅಪರಾಧ ಗುಪ್ತಚರ & ಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ಅಪಾಯ ಮೌಲ್ಯಮಾಪನ ಕೋಶ';
  }

  // SOP Common Legal Authorities
  if (lower.includes('official secrets act & information technology')) {
    return lang === 'hi' ? 'शासकीय गुप्त बात अधिनियम और सूचना प्रौद्योगिकी नियम' : 'ಅಧಿಕೃತ ರಹಸ್ಯಗಳ ಕಾಯ್ದೆ & ಮಾಹಿತಿ ತಂತ್ರಜ್ಞಾನ ನಿಯಮಗಳು';
  }
  if (lower.includes('section 91 crpc / section 94 bnss')) {
    return lang === 'hi' ? 'धारा 91 CrPC / धारा 94 BNSS एवं CCTNS एकीकरण शासनादेश' : 'ಸೆಕ್ಷನ್ 91 CrPC / ಸೆಕ್ಷನ್ 94 BNSS & CCTNS ನಿಯಮಗಳು';
  }
  if (lower.includes('section 154 crpc / section 173 bnss')) {
    return lang === 'hi' ? 'धारा 154 CrPC / धारा 173 BNSS, कर्नाटक पुलिस अधिनियम धारा 76' : 'ಸೆಕ್ಷನ್ 154 CrPC / ಸೆಕ್ಷನ್ 173 BNSS & ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಕಾಯ್ದೆ';
  }
  if (lower.includes('section 173 crpc / section 193 bnss')) {
    return lang === 'hi' ? 'धारा 173 CrPC / धारा 193 BNSS (जांच समाप्ति पर पुलिस रिपोर्ट)' : 'ಸೆಕ್ಷನ್ 173 CrPC / ಸೆಕ್ಷನ್ 193 BNSS (ತನಿಖಾ ವರದಿ)';
  }
  if (lower.includes('digital personal data protection (dpdp) act')) {
    return lang === 'hi' ? 'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023 और साक्ष्य अधिनियम' : 'ಡಿಜಿಟಲ್ ವೈಯಕ್ತಿಕ ಡೇಟಾ ಸಂರಕ್ಷಣಾ ಕಾಯ್ದೆ (DPDP) ೨೦೨೩';
  }
  if (lower.includes('criminal procedure (identification) act, 2022')) {
    return lang === 'hi' ? 'आपराधिक प्रक्रिया (पहचान) अधिनियम 2022 और BNSS धारा 110' : 'ಕ್ರಿಮಿನಲ್ ಪ್ರೊಸೀಜರ್ (ಐಡೆಂಟಿಫಿಕೇಶನ್) ಕಾಯ್ದೆ ೨೦೨೨ & BNSS';
  }
  if (lower.includes('prevention of money laundering act (pmla)')) {
    return lang === 'hi' ? 'धन शोधन निवारण अधिनियम (PMLA) 2002 और धारा 102 CrPC' : 'ಅಕ್ರಮ ಹಣ ವರ್ಗಾವಣೆ ತಡೆ ಕಾಯ್ದೆ (PMLA) ೨೦೦೨ & CrPC 102';
  }
  if (lower.includes('section 149 bnss (police to prevent cognizable offences)')) {
    return lang === 'hi' ? 'धारा 149 BNSS (संज्ञेय अपराधों की रोकथाम हेतु पुलिस अधिकार)' : 'ಸೆಕ್ಷನ್ 149 BNSS (ಅಪರಾಧ ತಡೆಗಟ್ಟುವಿಕೆ)';
  }
  if (lower.includes('karnataka control of organised crime act (kcoca)')) {
    return lang === 'hi' ? 'कर्नाटक संगठित अपराध नियंत्रण अधिनियम (KCOCA) और BNSS' : 'ಕರ್ನಾಟಕ ಸಂಘಟಿತ ಅಪರಾಧ ನಿಯಂತ್ರಣ ಕಾಯ್ದೆ (KCOCA)';
  }
  if (lower.includes('karnataka police manual (section 45')) {
    return lang === 'hi' ? 'कर्नाटक पुलिस मैनुअल (धारा 45: कॉर्डन और सर्च ऑपरेशन)' : 'ಕರ್ನಾಟಕ ಪೊಲೀಸ್ ಮ್ಯಾನ್ಯುಯಲ್ (ಸೆಕ್ಷನ್ 45)';
  }
  if (lower.includes('section 110 bnss (security for good behaviour')) {
    return lang === 'hi' ? 'धारा 110 BNSS (आदतन अपराधियों से सदाचार की सुरक्षा)' : 'ಸೆಕ್ಷನ್ 110 BNSS (ಆದಿಕ ಅಪರಾಧಿಗಳ ಸನ್ನಡತೆ ಭದ್ರತೆ)';
  }
  if (lower.includes('section 65b indian evidence act')) {
    return lang === 'hi' ? 'धारा 65B भारतीय साक्ष्य अधिनियम (इलेक्ट्रॉनिक रिकॉर्ड्स)' : 'ಸೆಕ್ಷನ್ 65B ಭಾರತೀಯ ಸಾಕ್ಷ್ಯ ಕಾಯ್ದೆ (ವಿದ್ಯುನ್ಮಾನ ದಾಖಲೆ)';
  }

  // SOP Purposes
  if (lower.includes('tiered officer permission enforcement, biometric verification management')) {
    return lang === 'hi'
      ? 'स्तरीय अधिकारी अनुमति प्रवर्तन, बायोमेट्रिक सत्यापन प्रबंधन, स्टेशन रोस्टर ऑडिट और सत्र लॉक नियंत्रण।'
      : 'ಶ್ರೇಣೀಕೃತ ಅಧಿಕಾರಿ ಅನುಮತಿ ಜಾರಿ, ಬಯೋಮೆಟ್ರಿಕ್ ದೃಢೀಕರಣ ನಿರ್ವಹಣೆ, ಠಾಣಾ ರೋಸ್ಟರ್ ಆಡಿಟ್ ಮತ್ತು ಸೆಶನ್ ನಿಯಂತ್ರಣ.';
  }
  if (lower.includes('machine learning recidivism scoring based on historical conviction frequency')) {
    return lang === 'hi'
      ? 'ऐतिहासिक सजा आवृत्ति, जमानत उल्लंघन और अपराध गंभीरता भार के आधार पर मशीन लर्निंग पुनरावृत्ति स्कोरिंग।'
      : 'ಐತಿಹಾಸಿಕ ಶಿಕ್ಷೆಯ ಆವರ್ತನ, ಜಾಮೀನು ಉಲ್ಲಂಘನೆ ಮತ್ತು ಅಪರಾಧ ತೀವ್ರತೆಯ ಆಧಾರದ ಮೇಲೆ ಯಂತ್ರ ಕಲಿಕೆಯ ಮರು-ಅಪರಾಧ ಸ್ಕೋರಿಂಗ್.';
  }
  if (lower.includes('conversational rag assistant connected to')) {
    return lang === 'hi'
      ? 'CCTNS अपराध रजिस्टरों, मुकदमों और FIR सारांशों से जुड़ा संवादात्मक RAG सहायक।'
      : 'CCTNS ಅಪರಾಧ ದಾಖಲೆಗಳು, ಪ್ರಕರಣಗಳು ಮತ್ತು ಎಫ್‌ಐಆರ್ ಸಾರಾಂಶಗಳಿಗೆ ಸಂಪರ್ಕ ಹೊಂದಿದ ಸಂಭಾಷಣಾ RAG ಸಹಾಯಕ.';
  }

  // SOP Escalation Units
  if (lower.includes('state police command & control room (dial 112 / ext 4001)')) {
    return lang === 'hi' ? 'राज्य पुलिस कमांड एवं नियंत्रण कक्ष (डायल 112 / एक्सटेंशन 4001)' : 'ರಾಜ್ಯ ಪೊಲೀಸ್ ಕಮಾಂಡ್ & ಕಂಟ್ರೋಲ್ ರೂಮ್ (ಡಯಲ್ 112 / Ext 4001)';
  }

  // SOP Step Actions & Details (Governance, Recidivism, etc.)
  if (lower === 'inspect security clearance') return lang === 'hi' ? 'सुरक्षा क्लीयरेंस का निरीक्षण करें' : 'ಭದ್ರತಾ ಕ್ಲಿಯರೆನ್ಸ್ ಪರಿಶೀಲಿಸಿ';
  if (lower.includes('verify active officer tier (investigator, crime analyst')) {
    return lang === 'hi'
      ? 'सक्रिय अधिकारी स्तर (जांचकर्ता, विश्लेषक, पर्यवेक्षक, नीति निर्माता) और पहुंच अधिकारों को सत्यापित करें।'
      : 'ಸಕ್ರಿಯ ಅಧಿಕಾರಿ ಶ್ರೇಣಿ (ತನಿಖಾಧಿಕಾರಿ, ವಿಶ್ಲೇಷಕ, ಮೇಲ್ವಿಚಾರಕ, ನೀತಿ ನಿರೂಪಕ) ಮತ್ತು ಪ್ರವೇಶ ಹಕ್ಕುಗಳನ್ನು ದೃಢೀಕರಿಸಿ.';
  }
  if (lower === 'roster management') return lang === 'hi' ? 'रोस्टर प्रबंधन' : 'ರೋಸ್ಟರ್ ನಿರ್ವಹಣೆ';
  if (lower.includes('filter station personnel by role or station jurisdiction')) {
    return lang === 'hi'
      ? 'भूमिका या अधिकार क्षेत्र द्वारा कर्मियों को फ़िल्टर करें; निष्क्रिय खातों को लॉक करें या नए अधिकारियों को जोड़ें।'
      : 'ಪಾತ್ರ ಅಥವಾ ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿಯ ಮೂಲಕ ಸಿಬ್ಬಂದಿಯನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ; ನಿಷ್ಕ್ರಿಯ ಖಾತೆಗಳನ್ನು ಲಾಕ್ ಮಾಡಿ ಅಥವಾ ಹೊಸ ಅಧಿಕಾರಿಗಳನ್ನು ನೋಂದಾಯಿಸಿ.';
  }
  if (lower === 'role switcher simulation') return lang === 'hi' ? 'भूमिका स्विचर सिमुलेशन' : 'ಪಾತ್ರ ಬದಲಾವಣೆ ಸಿಮ್ಯುಲೇಶನ್';
  if (lower.includes('test ui access gating dynamically by switching role perspectives')) {
    return lang === 'hi'
      ? 'सुरक्षा परीक्षण कंसोल में भूमिका परिप्रेक्ष्य बदलकर यूआई एक्सेस प्रतिबंधों का गतिशील रूप से परीक्षण करें।'
      : 'ಭದ್ರತಾ ಕನ್ಸೋಲ್‌ನಲ್ಲಿ ಪಾತ್ರಗಳನ್ನು ಬದಲಾಯಿಸುವ ಮೂಲಕ ಯುಐ ಪ್ರವೇಶ ಗೇಟಿಂಗ್ ಅನ್ನು ಪರೀಕ್ಷಿಸಿ.';
  }
  if (lower === 'select offender roster record') return lang === 'hi' ? 'अपराधी रोस्टर रिकॉर्ड चुनें' : 'ಅಪರಾಧಿ ರೋಸ್ಟರ್ ದಾಖಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ';
  if (lower.includes('choose any registered offender from the left roster list')) {
    return lang === 'hi'
      ? 'व्यक्तिगत पुनरावृत्ति टेलीमेट्री लोड करने के लिए बाईं सूची से किसी भी पंजीकृत अपराधी का चयन करें।'
      : 'ವೈಯಕ್ತಿಕ ಮರು-ಅಪರಾಧ ಡೇಟಾ ಲೋಡ್ ಮಾಡಲು ಎಡಭಾಗದ ಪಟ್ಟಿಯಿಂದ ಯಾವುದೇ ನೋಂದಾಯಿತ ಅಪರಾಧಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.';
  }
  if (lower === 'evaluate risk probability gauge') return lang === 'hi' ? 'जोखिम संभावना गेज का मूल्यांकन करें' : 'ಅಪಾಯ ಸಂಭವನೀಯತೆಯ ಮಾಪಕವನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಿ';
  if (lower.includes('audit the circular probability meter, high-risk flags')) {
    return lang === 'hi'
      ? 'सर्कुलर प्रोबेबिलिटी मीटर, उच्च जोखिम वाले झंडे और 12 महीने के पुनरावृत्ति प्रतिशत का ऑडिट करें।'
      : 'ವೃತ್ತಾಕಾರದ ಸಂಭವನೀಯತೆ ಮೀಟರ್, ಹೆಚ್ಚಿನ ಅಪಾಯದ ಫ್ಲ್ಯಾಗ್‌ಗಳು ಮತ್ತು ೧೨ ತಿಂಗಳ ಮರು-ಅಪರಾಧ ಶೇಕಡಾವಾರು ಪರಿಶೀಲಿಸಿ.';
  }
  if (lower === 'factor breakdown & mitigation') return lang === 'hi' ? 'कारक विश्लेषण और शमन' : 'ಅಂಶಗಳ ವಿಶ್ಲೇಷಣೆ & ಶಮನ';
  if (lower.includes('review trigger factors (unemployment, associate clusters')) {
    return lang === 'hi'
      ? 'पुनर्वास या निगरानी प्रोटोकॉल तैयार करने के लिए ट्रिगर कारकों (बेरोजगारी, आपराधिक सहयोगी) की समीक्षा करें।'
      : 'ಪುನರ್ವಸತಿ ಅಥವಾ ಕಣ್ಗಾವಲು ಪ್ರೋಟೋಕಾಲ್‌ಗಳನ್ನು ರೂಪಿಸಲು ಪ್ರಚೋದಕ ಅಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.';
  }

  // SOP Tips
  if (lower.includes('supervisor and policymaker roles hold statutory authority')) {
    return lang === 'hi'
      ? 'पर्यवेक्षक और नीति निर्माता भूमिकाओं के पास वारंट स्वीकृत करने और राज्यव्यापी खुफिया जानकारी निर्यात करने का वैधानिक अधिकार है।'
      : 'ಮೇಲ್ವಿಚಾರಕ ಮತ್ತು ನೀತಿ ತಯಾರಕ ಪಾತ್ರಗಳು ವಾರಂಟ್‌ಗಳನ್ನು ಅನುಮೋದಿಸಲು ಮತ್ತು ರಾಜ್ಯವ್ಯಾಪಿ ಗುಪ್ತಚರ ಮಾಹಿತಿಯನ್ನು ರಫ್ತು ಮಾಡಲು ಶಾಸನಬದ್ಧ ಅಧಿಕಾರವನ್ನು ಹೊಂದಿವೆ.';
  }
  if (lower.includes('locked officer credentials immediately revoke active session jwts')) {
    return lang === 'hi'
      ? 'लॉक किए गए अधिकारी क्रेडेंशियल्स सभी टर्मिनल क्लाइंट में सक्रिय सत्र JWT को तुरंत रद्द कर देते हैं।'
      : 'ಲಾಕ್ ಮಾಡಲಾದ ಅಧಿಕಾರಿ ರುಜುವಾತುಗಳು ಎಲ್ಲಾ ಟರ್ಮಿನಲ್ ಕ್ಲೈಂಟ್‌ಗಳಲ್ಲಿ ಸಕ್ರಿಯ ಸೆಶನ್ JWT ಗಳನ್ನು ತಕ್ಷಣವೇ ರದ್ದುಗೊಳಿಸುತ್ತವೆ.';
  }
  if (lower.includes('scores exceeding 75% trigger high-priority surveillance recommendations')) {
    return lang === 'hi'
      ? '75% से अधिक स्कोर बीट कांस्टेबलों के लिए उच्च प्राथमिकता वाली निगरानी सिफारिशों को ट्रिगर करते हैं।'
      : '೭೫% ಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸ್ಕೋರ್‌ಗಳು ಬೀಟ್ ಕಾನ್‌ಸ್ಟೆಬಲ್‌ಗಳಿಗೆ ಹೆಚ್ಚಿನ ಆದ್ಯತೆಯ ಕಣ್ಗಾವಲು ಶಿಫಾರಸುಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತವೆ.';
  }
  if (lower.includes('check the transparency disclosure note regarding algorithm accountability')) {
    return lang === 'hi'
      ? 'एल्गोरिदम जवाबदेही और न्यायिक साक्ष्य सीमाओं के संबंध में पारदर्शिता प्रकटीकरण नोट की जांच करें।'
      : 'ಅಲ್ಗಾರಿದಮ್ ಹೊಣೆಗಾರಿಕೆ ಮತ್ತು ನ್ಯಾಯಾಂಗ ಸಾಕ್ಷ್ಯ ಮಿತಿಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಪಾರದರ್ಶಕತೆ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ ಟಿಪ್ಪಣಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.';
  }

  // System & Security badges
  if (lower.includes('sha 256') || lower.includes('aadhar hash')) {
    return lang === 'hi' ? 'SHA 256 आधार हैश मास्किंग' : 'SHA 256 ಆಧಾರ್ ಹ್ಯಾಶ್ ಮಾಸ್ಕಿಂಗ್';
  }
  if (lower.includes('ksp secured vpn tunnel')) {
    return lang === 'hi' ? 'केएसपी सुरक्षित वीपीएन टनल (सक्रिय)' : 'ಕೆಎಸ್‌ಪಿ ಸುರಕ್ಷಿತ ವಿಪಿಎನ್ ಟನೆಲ್ (ಸಕ್ರಿಯ)';
  }
  if (lower.includes('immutable security auditing logs') || lower.includes('immutable security audit logs')) {
    return lang === 'hi' ? 'अपरिवर्तनीय सुरक्षा ऑडिट लॉग' : 'ಅಪರಿವರ್ತನೀಯ ಭದ್ರತಾ ಆಡಿಟ್ ಲಾಗ್';
  }
  if (lower.includes('live biometric gateway verified')) {
    return lang === 'hi' ? 'लाइव बायोमेट्रिक गेटवे सत्यापित' : 'ಲೈವ್ ಬಯೋಮೆಟ್ರಿಕ್ ಗೇಟ್‌ವೇ ದೃಢೀಕರಿಸಲಾಗಿದೆ';
  }
  if (lower.includes('15-min inactivity auto-logout')) {
    return lang === 'hi' ? '15-मिनट निष्क्रियता ऑटो-लॉगआउट' : '15-ನಿಮಿಷ ನಿಷ್ಕ್ರಿಯತೆ ಆಟೋ-ಲಾಗ್‌ಔಟ್';
  }


  // Karnataka District names
  if (lower === 'tumakuru') return lang === 'hi' ? 'तुमकुरु' : 'ತುಮಕೂರು';
  if (lower === 'haveri') return lang === 'hi' ? 'हावेरी' : 'ಹಾವೇರಿ';
  if (lower === 'chikkaballapur') return lang === 'hi' ? 'चिक्कबल्लापुर' : 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ';
  if (lower === 'davanagere') return lang === 'hi' ? 'दावणगेरे' : 'ದಾವಣಗೆರೆ';
  if (lower === 'gadag') return lang === 'hi' ? 'गदग' : 'ಗದಗ';
  if (lower === 'mysuru') return lang === 'hi' ? 'मैसूर' : 'ಮೈಸೂರು';
  if (lower === 'koppal') return lang === 'hi' ? 'कोप्पल' : 'ಕೊಪ್ಪಳ';
  if (lower === 'hubballi-dharwad' || lower === 'hubballi dharwad') return lang === 'hi' ? 'हुबली-धारवाड़' : 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ';
  if (lower === 'chitradurga') return lang === 'hi' ? 'चित्रदुर्ग' : 'ಚಿತ್ರದುರ್ಗ';
  if (lower === 'bengaluru' || lower === 'bengaluru urban') return lang === 'hi' ? 'बेंगलुरु' : 'ಬೆಂಗಳೂರು';
  if (lower === 'belagavi') return lang === 'hi' ? 'बेलगावी' : 'ಬೆಳಗಾವಿ';
  if (lower === 'hubballi') return lang === 'hi' ? 'हुबली' : 'ಹುಬ್ಬಳ್ಳಿ';
  if (lower === 'mangaluru') return lang === 'hi' ? 'मंगलुरु' : 'ಮಂಗಳೂರು';
  if (lower === 'kalaburagi') return lang === 'hi' ? 'कलबुर्गी' : 'ಕಲಬುರಗಿ';
  if (lower === 'raichur') return lang === 'hi' ? 'रायचूर' : 'ರಾಯಚೂರು';
  if (lower === 'ballari') return lang === 'hi' ? 'बल्लारी' : 'ಬಳ್ಳಾರಿ';
  if (lower === 'shivamogga') return lang === 'hi' ? 'शिवमोग्गा' : 'ಶಿವಮೊಗ್ಗ';
  if (lower === 'udupi') return lang === 'hi' ? 'उडुपी' : 'ಉಡುಪಿ';

  // Month Abbreviations
  if (lower === 'jan') return lang === 'hi' ? 'जनवरी' : 'ಜನವರಿ';
  if (lower === 'feb') return lang === 'hi' ? 'फ़रवरी' : 'ಫೆಬ್ರವರಿ';
  if (lower === 'mar') return lang === 'hi' ? 'मार्च' : 'ಮಾರ್ಚ್';
  if (lower === 'apr') return lang === 'hi' ? 'अप्रैल' : 'ಏಪ್ರಿಲ್';
  if (lower === 'may') return lang === 'hi' ? 'मई' : 'ಮೇ';
  if (lower === 'jun') return lang === 'hi' ? 'जून' : 'ಜೂನ್';
  if (lower === 'jul') return lang === 'hi' ? 'जुलाई' : 'ಜುಲೈ';
  if (lower === 'aug') return lang === 'hi' ? 'अगस्त' : 'ಆಗಸ್ಟ್';
  if (lower === 'sep') return lang === 'hi' ? 'सितंबर' : 'ಸೆಪ್ಟೆಂಬರ್';
  if (lower === 'oct') return lang === 'hi' ? 'अक्टूबर' : 'ಅಕ್ಟೋಬರ್';
  if (lower === 'nov') return lang === 'hi' ? 'नवंबर' : 'ನವೆಂಬರ್';
  if (lower === 'dec') return lang === 'hi' ? 'दिसंबर' : 'ಡಿಸೆಂಬರ್';

  // Modus Operandi & Case Summary details
  if (lower.includes('daytime housebreaking using duplicate key')) {
    return lang === 'hi' ? 'डुप्लीकेट चाबी का उपयोग करके दिन में घर में चोरी (सेंधमारी)' : 'ನಕಲಿ ಕೀಲಿ ಬಳಸಿ ಹಗಲಿನ ವೇಳೆ ಮನೆಗಳ್ಳತನ';
  }
  if (lower.includes('cultivation of cannabis detected in remote farmland')) {
    return lang === 'hi' ? 'दूरस्थ कृषि भूमि में भांग (गांजा) की खेती का पता चला' : 'ದೂರದ ಕೃಷಿ ಭೂಮಿಯಲ್ಲಿ ಗಾಂಜಾ ಬೆಳೆ ಪತ್ತೆಯಾಗಿದೆ';
  }
  if (lower.includes('gold ornaments worth rs. 1.5 lakhs were stolen')) {
    return lang === 'hi'
      ? 'शिकायतकर्ता ने बताया कि दिन के समय उनके घर से 1.5 लाख रुपये के सोने के गहने चोरी हो गए। डुप्लीकेट चाबी से प्रवेश किया गया। सीसीटीवी द्वारा संदिग्ध राजू के. की पहचान की गई।'
      : 'ದೂರುದಾರರು ತಮ್ಮ ಮನೆಯಿಂದ ಹಗಲಿನ ವೇಳೆಯಲ್ಲಿ ರೂ 1.5 ಲಕ್ಷ ಮೌಲ್ಯದ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಕಳವು ಮಾಡಲಾಗಿದೆ ಎಂದು ತಿಳಿಸಿದ್ದಾರೆ. ನಕಲಿ ಕೀ ಬಳಸಿ ಒಳಪ್ರವೇಶಿಸಲಾಗಿದೆ. ಸಿಸಿಟಿವಿ ಮೂಲಕ ಶಂಕಿತ ರಾಜು ಕೆ. ಗುರುತಿಸಲಾಗಿದೆ.';
  }
  if (lower.includes('night housebreaking with window grill breach')) {
    return lang === 'hi' ? 'खिड़की की ग्रिल काटकर रात में घर में चोरी' : 'ಕಿಟಕಿಯ ಸರಳು ಮುರಿದು ರಾತ್ರಿ ವೇಳೆ ಮನೆಗಳ್ಳತನ';
  }
  if (lower.includes('vishing fraud: impersonated sbi bank manager')) {
    return lang === 'hi' ? 'विशिंग धोखाधड़ी: एसबीआई बैंक मैनेजर बनकर केवाईसी अपडेट के नाम पर ओटीपी निकाला' : 'ವಿಶಿಂಗ್ ವಂಚನೆ: ಎಸ್‌ಬಿಐ ಮ್ಯಾನೇಜರ್ ಸೋಗಿನಲ್ಲಿ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಹೆಸರಿನಲ್ಲಿ ಒಟಿಪಿ ಪಡೆದು ವಂಚನೆ';
  }
  if (lower.includes('chain snatching on black pulsar motorcycle')) {
    return lang === 'hi' ? 'काले रंग की पल्सर बाइक पर सवार होकर सुबह के समय चेन स्नेचिंग' : 'ಕಪ್ಪು ಪಲ್ಸರ್ ಬೈಕ್‌ನಲ್ಲಿ ಮುಂಜಾನೆ ಸರಗಳ್ಳತನ';
  }
  if (lower.includes('peddling mdma synthetic drug crystals')) {
    return lang === 'hi' ? 'कॉलेज के छात्रों को एमडीएमए सिंथेटिक ड्रग क्रिस्टल की तस्करी' : 'ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಎಂಡಿಎಂಎ ಸಿಂಥೆಟಿಕ್ ಡ್ರಗ್ಸ್ ಮಾರಾಟ';
  }
  if (lower.includes('atm card skimming device installed')) {
    return lang === 'hi' ? 'एटीएम कियोस्क में क्लोनिंग के लिए कार्ड स्किमिंग डिवाइस और स्पाई कैमरा लगाया गया' : 'ಎಟಿಎಂ ಕಿಯೋಸ್ಕ್‌ನಲ್ಲಿ ಕ್ಲೋನಿಂಗ್‌ಗಾಗಿ ಕಾರ್ಡ್ ಸ್ಕಿಮ್ಮರ್ ಮತ್ತು ಕ್ಯಾಮೆರಾ ಅಳವಡಿಕೆ';
  }
  if (lower.includes('highway cargo interception')) {
    return lang === 'hi' ? 'फर्जी नंबर प्लेट वाली एसयूवी द्वारा राष्ट्रीय राजमार्ग पर मालवाहक ट्रक को लूटा गया' : 'ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿಯಲ್ಲಿ ನಕಲಿ ನಂಬರ್ ಪ್ಲೇಟ್ ಎಸ್‌ಯುವಿ ಬಳಸಿ ಸರಕು ವಾಹನ ಲೂಟಿ';
  }

  // All 15 Module SOP Purposes
  if (lower.includes('longitudinal crime volume tracking, category distribution analysis')) {
    return lang === 'hi'
      ? 'दीर्घकालिक अपराध मात्रा ट्रैकिंग, श्रेणीवार वितरण विश्लेषण, जिला स्तरीय बेंचमार्किंग और त्रैमासिक मौसमी पैटर्न विभाजन।'
      : 'ದೀರ್ಘಾವಧಿಯ ಅಪರಾಧ ಪ್ರಮಾಣ ಟ್ರ್ಯಾಕಿಂಗ್, ವರ್ಗ ವಿತರಣೆ ವಿಶ್ಲೇಷಣೆ, ಜಿಲ್ಲಾ ಮಟ್ಟದ ಮೌಲ್ಯಮಾಪನ ಮತ್ತು ತ್ರೈಮಾಸಿಕ ಋತುಮಾನದ ಅಪರಾಧ ಪ್ರವೃತ್ತಿ ಅಧ್ಯಯನ.';
  }
  if (lower.includes('cross-referencing crime rates with sociological indicators, age demographics')) {
    return lang === 'hi'
      ? 'निवारक सामाजिक सुरक्षा रणनीतियां तैयार करने के लिए समाजशास्त्रीय संकेतकों, आयु जनसांख्यिकी और क्षेत्रीय शहरीकरण सूचकांकों के साथ अपराध दरों का क्रॉस-रेफरेंसिंग।'
      : 'ತಡೆಗಟ್ಟುವ ಸಾಮಾಜಿಕ ರಕ್ಷಣಾ ತಂತ್ರಗಳನ್ನು ರೂಪಿಸಲು ಸಮಾಜಶಾಸ್ತ್ರೀಯ ಸೂಚಕಗಳು, ವಯಸ್ಸಿನ ಜನಸಂಖ್ಯಾಶಾಸ್ತ್ರ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ನಗರೀಕರಣ ಸೂಚ್ಯಂಕಗಳೊಂದಿಗೆ ಅಪರಾಧ ದರಗಳ ಪರಸ್ಪರ ವಿಶ್ಲೇಷಣೆ.';
  }
  if (lower.includes('automated case brief generation, precedent citation cross-referencing')) {
    return lang === 'hi'
      ? 'स्वचालित केस संक्षिप्त तैयार करना, पूर्व कानूनी नजीर उद्धरण, समान अपराध कार्यप्रणाली मिलान और एआई-संचालित जांच सुराग सुझाव।'
      : 'ಸ್ವಯಂಚಾಲಿತ ಪ್ರಕರಣ ಸಂಕ್ಷಿಪ್ತ ವಿವರಣೆ ರಚನೆ, ಕಾನೂನು ಪೂರ್ವನಿದರ್ಶನಗಳ ಉಲ್ಲೇಖ, ಸಮಾನ ಎಂಒ ಮಾದರಿ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಎಐ-ಆಧಾರಿತ ತನಿಖಾ ಸುಳಿವುಗಳು.';
  }
  if (lower.includes('transaction ledger audit, automated structuring & layering detection')) {
    return lang === 'hi'
      ? 'लेनदेन बहीखाता ऑडिट, स्वचालित संरचित लेनदेन और लेयरिंग पहचान, एफआईयू क्वेरी क्रॉस-रेफरेंसिंग और बैंकिंग संस्थानों में मनी ट्रेल ग्राफ ट्रेसिंग।'
      : 'ವಹಿವಾಟು ಲೆಡ್ಜರ್ ಆಡಿಟ್, ಸ್ವಯಂಚಾಲಿತ ರಚನಾತ್ಮಕ ಮತ್ತು ಲೇಯರಿಂಗ್ ಪತ್ತೆ, ಎಫ್‌ಐಯು ಪ್ರಶ್ನೆ ಪರಿಶೀಲನೆ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಸಂಸ್ಥೆಗಳಾದ್ಯಂತ ಹಣದ ಜಾಡು ಗ್ರಾಫ್ ಟ್ರೇಸಿಂಗ್.';
  }
  if (lower.includes('organized syndicate graph analytics, criminal hierarchy mapping')) {
    return lang === 'hi'
      ? 'संगठित सिंडिकेट ग्राफ एनालिटिक्स, आपराधिक पदानुक्रम मैपिंग, सह-अभियुक्त जुड़ाव और नेटवर्क घनत्व स्कोरिंग।'
      : 'ಸಂಘಟಿತ ಸಿಂಡಿಕೇಟ್ ಗ್ರಾಫ್ ವಿಶ್ಲೇಷಣೆ, ಕ್ರಿಮಿನಲ್ ಕ್ರಮಾನುಗತ ಮ್ಯಾಪಿಂಗ್, ಸಹ-ಆರೋಪಿ ಸಂಬಂಧಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ನೆಟ್‌ವರ್ಕ್ ಸ್ಕೋರಿಂಗ್.';
  }
  if (lower.includes('gis spatial density mapping, patrol route optimization')) {
    return lang === 'hi'
      ? 'जीआईएस स्थानिक घनत्व मैपिंग, गश्ती मार्ग अनुकूलन, भविष्य कहनेवाला अपराध क्लस्टरिंग और बीट-स्तरीय तैनाती सिफारिश।'
      : 'ಜಿಐಎಸ್ ಪ್ರಾದೇಶಿಕ ಸಾಂದ್ರತೆ ಮ್ಯಾಪಿಂಗ್, ಗಸ್ತು ಮಾರ್ಗ ಆಪ್ಟಿಮೈಸೇಶನ್, ಮುನ್ಸೂಚಕ ಅಪರಾಧ ಕ್ಲಸ್ಟರಿಂಗ್ ಮತ್ತು ಬೀಟ್ ಮಟ್ಟದ ನಿಯೋಜನೆ ಶಿಫಾರಸು.';
  }
  if (lower.includes('time-series predictive forecasting, weather and seasonal correlation')) {
    return lang === 'hi'
      ? 'समय-श्रृंखला पूर्वानुमानात्मक विश्लेषण, मौसम और मौसमी सहसंबंध, ऐतिहासिक अपराध चक्र विश्लेषण और संसाधन पूर्व-आवंटन।'
      : 'ಸಮಯ-ಸರಣಿ ಮುನ್ಸೂಚಕ ವಿಶ್ಲೇಷಣೆ, ಹವಾಮಾನ ಮತ್ತು ಕಾಲೋಚಿತ ಪರಸ್ಪರ ಸಂಬಂಧ, ಐತಿಹಾಸಿಕ ಅಪರಾಧ ಚಕ್ರ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಸಂಪನ್ಮೂಲ ಹಂಚಿಕೆ.';
  }
  if (lower.includes('multi-modal offender profile aggregation, biometrics cross-referencing')) {
    return lang === 'hi'
      ? 'मल्टी-मॉडल अपराधी प्रोफाइल एकत्रीकरण, बायोमेट्रिक्स क्रॉस-रेफरेंसिंग, कार्यप्रणाली मिलान और पुनरावृत्ति जोखिम टेलीमेट्री।'
      : 'ಬಹು-ಮಾದರಿ ಅಪರಾಧಿ ಪ್ರೊಫೈಲ್ ಕ್ರೋಢೀಕರಣ, ಬಯೋಮೆಟ್ರಿಕ್ಸ್ ಕ್ರಾಸ್-ರೆಫರೆನ್ಸಿಂಗ್, ಎಂಒ ಹೊಂದಾಣಿಕೆ ಮತ್ತು ಮರು-ಅಪರಾಧ ಅಪಾಯ ಟೆಲಿಮೆಟ್ರಿ.';
  }
  if (lower.includes('72-hour early warning advisory generation, event-driven risk alerts')) {
    return lang === 'hi'
      ? '72 घंटे की पूर्व चेतावनी एडवाइजरी, घटना-संचालित जोखिम अलर्ट, उच्च-संभावना वाली घटनाओं का पूर्वानुमान और सक्रिय गश्ती अलर्ट।'
      : '೭೨-ಗಂಟೆಗಳ ಮುಂಚಿತ ಎಚ್ಚರಿಕೆ ಸಲಹೆ ರಚನೆ, ಘಟನೆ-ಚಾಲಿತ ಅಪಾಯದ ಎಚ್ಚರಿಕೆಗಳು, ಹೆಚ್ಚಿನ ಸಂಭವನೀಯತೆಯ ಘಟನೆಗಳ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಸಕ್ರಿಯ ಗಸ್ತು ಎಚ್ಚರಿಕೆಗಳು.';
  }
  if (lower.includes('tactical cordon simulation, emergency response sandbox')) {
    return lang === 'hi'
      ? 'रणनीतिक घेराबंदी सिमुलेशन, आपातकालीन प्रतिक्रिया सैंडबॉक्स, संसाधन तैनाती योजना और परिदृश्य परिणाम मॉडलिंग।'
      : 'ಕಾರ್ಯತಂತ್ರ ಕಾರ್ಡನ್ ಸಿಮ್ಯುಲೇಶನ್, ತುರ್ತು ಪ್ರತಿಕ್ರಿಯೆ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್, ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆ ಹಂತ ಮತ್ತು ಸನ್ನಿವೇಶ ಫಲಿತಾಂಶ ಮಾಡೆಲಿಂಗ್.';
  }
  if (lower.includes('24/7 rtcc command wall operations, live cctv surveillance integration')) {
    return lang === 'hi'
      ? '24/7 आरटीसीसी कमांड वॉल संचालन, लाइव सीसीटीवी निगरानी एकीकरण, घटना प्रेषण ट्रैकिंग और फील्ड यूनिट समन्वय।'
      : '೨೪/೭ ಆರ್‌ಟಿಸಿಸಿ ಕಮಾಂಡ್ ವಾಲ್ ಕಾರ್ಯಾಚರಣೆಗಳು, ಲೈವ್ ಸಿಸಿಟಿವಿ ಕಣ್ಗಾವಲು ಏಕೀಕರಣ, ಘಟನಾ ರವಾನೆ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಫೀಲ್ಡ್ ಯುನಿಟ್ ಸಮನ್ವಯ.';
  }
  if (lower.includes('facial recognition biometric matching, cctns mugshot gallery querying')) {
    return lang === 'hi'
      ? 'चेहरा पहचान बायोमेट्रिक मिलान, CCTNS मगशॉट गैलरी खोज, समानता स्कोर ऑडिटिंग और संदिग्ध पहचान सत्यापन।'
      : 'ಮುಖ ಗುರುತಿಸುವಿಕೆ ಬಯೋಮೆಟ್ರಿಕ್ ಹೊಂದಾಣಿಕೆ, CCTNS ಮಗ್‌ಶಾಟ್ ಗ್ಯಾಲರಿ ಪ್ರಶ್ನೆ, ಹೋಲಿಕೆ ಸ್ಕೋರ್ ಆಡಿಟಿಂಗ್ ಮತ್ತು ಶಂಕಿತರ ಗುರುತು ಪರಿಶೀಲನೆ.';
  }
  if (lower.includes('model explainability auditing, feature importance attribution')) {
    return lang === 'hi'
      ? 'मॉडल व्याख्यात्मकता ऑडिटिंग, फीचर महत्व एट्रिब्यूशन, एल्गोरिथम निष्पक्षता सत्यापन और QuickML अनुमान निरीक्षण।'
      : 'ಮಾದರಿ ವಿವರಣಾತ್ಮಕತೆ ಆಡಿಟಿಂಗ್, ವೈಶಿಷ್ಟ್ಯ ಪ್ರಾಮುಖ್ಯತೆ ಗುಣಲಕ್ಷಣ, ಅಲ್ಗಾರಿದಮಿಕ್ ನ್ಯಾಯಸಮ್ಮತತೆ ಪರಿಶೀಲನೆ ಮತ್ತು QuickML ತಪಾಸಣೆ.';
  }

  // Month names for charts
  if (lower === 'jan') return lang === 'hi' ? 'जन' : 'ಜನ';
  if (lower === 'feb') return lang === 'hi' ? 'फर' : 'ಫೆಬ್ರ';
  if (lower === 'mar') return lang === 'hi' ? 'मार्च' : 'ಮಾರ್ಚ್';
  if (lower === 'apr') return lang === 'hi' ? 'अप्रै' : 'ಏಪ್ರಿ';
  if (lower === 'may') return lang === 'hi' ? 'मई' : 'ಮೇ';
  if (lower === 'jun') return lang === 'hi' ? 'जून' : 'ಜೂನ್';
  if (lower === 'jul') return lang === 'hi' ? 'जुला' : 'ಜುಲೈ';
  if (lower === 'aug') return lang === 'hi' ? 'अग' : 'ಆಗ';
  if (lower === 'sep') return lang === 'hi' ? 'सित' : 'ಸೆಪ್ಟೆಂ';
  if (lower === 'oct') return lang === 'hi' ? 'अक्टू' : 'ಅಕ್ಟೋ';
  if (lower === 'nov') return lang === 'hi' ? 'नवಂ' : 'ನವೆಂ';
  if (lower === 'dec') return lang === 'hi' ? 'दिसಂ' : 'ಡಿಸೆಂ';

  // Live Operations Feed items
  if (lower.includes('recidivism spike: manjunath kulkarni')) {
    return lang === 'hi' ? 'पुनरावृत्ति वृद्धि: मंजूनाथ कुलकर्णी (70% स्कोर)' : 'ಮರುಕಳಿಸುವಿಕೆಯ ಏರಿಕೆ: ಮಂಜುನಾಥ್ ಕುಲಕರ್ಣಿ (70% ಸ್ಕೋರ್)';
  }
  if (lower.includes('raichur apmc belt') && lower.includes('drug offences')) {
    return lang === 'hi' ? 'रायचूर एपीएमसी बेल्ट • ड्रग अपराध टाइमलाइन अलर्ट' : 'ರಾಯಚೂರು ಎಪಿಎಂಸಿ ವಲಯ • ಮಾದಕವಸ್ತು ಅಪರಾಧಗಳ ಟೈಮ್‌ಲೈನ್ ಎಚ್ಚರಿಕೆ';
  }
  if (lower.includes('critical hotspot spike: tumakuru taluk')) {
    return lang === 'hi' ? 'गंभीर हॉटस्पॉट वृद्धि: तुमकुरु तालुक' : 'ನಿರ್ಣಾಯಕ ಹಾಟ್‌ಸ್ಪಾಟ್ ಏರಿಕೆ: ತುಮಕೂರು ತಾಲೂಕು';
  }
  if (lower.includes('16 incidents flagged') && lower.includes('resource deployment')) {
    return lang === 'hi' ? '16 घटनाएं चिह्नित • संसाधन तैनाती की सलाह' : '16 ಘಟನೆಗಳು ಗುರುತಿಸಲಾಗಿದೆ • ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆಗೆ ಶಿಫಾರಸು';
  }
  if (lower.includes('fiu money trail: ₹48,902 structuring detected')) {
    return lang === 'hi' ? 'एफआईयू मनी ट्रेल: ₹48,902 संरचना का पता चला' : 'ಎಫ್‌ಐಯು ಮನಿ ಟ್ರಯಲ್: ₹48,902 ರಚನಾತ್ಮಕ ವಹಿವಾಟು ಪತ್ತೆಯಾಗಿದೆ';
  }
  if (lower.includes('under ₹50,000 pmla threshold')) {
    return lang === 'hi' ? '₹50,000 पीएमएलए सीमा से कम • SUS-0147 से जुड़ा' : '₹50,000 PMLA ಮಿತಿಗಿಂತ ಕಡಿಮೆ • SUS-0147 ಗೆ ಲಿಂಕ್ ಆಗಿದೆ';
  }
  if (lower.includes('tactical deployment: ingress sla cordon alert')) {
    return lang === 'hi' ? 'रणनीतिक तैनाती: प्रवेश एसएलए घेराबंदी अलर्ट' : 'ಕಾರ್ಯಾಚರಣೆ ನಿಯೋಜನೆ: ಪ್ರವೇಶ SLA ಸುತ್ತುವರಿಕೆ ಎಚ್ಚರಿಕೆ';
  }
  if (lower.includes('sub-2.5m intercept coverage available')) {
    return lang === 'hi' ? 'मजेस्टिक हब के लिए 2.5 मिनट से कम इंटरसेप्ट कवरेज उपलब्ध' : 'ಮೆಜೆಸ್ಟಿಕ್ ಹಬ್‌ಗಾಗಿ 2.5 ನಿಮಿಷದೊಳಗಿನ ತಡೆಗಟ್ಟುವಿಕೆ ಕವರೇಜ್ ಲಭ್ಯವಿದೆ';
  }
  if (lower.includes('citizen sighting:')) {
    return lang === 'hi' ? raw.replace(/Citizen Sighting:/i, 'नागरिक द्वारा देखा गया:').replace(/Match/i, 'मिलान') : raw.replace(/Citizen Sighting:/i, 'ನಾಗರಿಕ ಗುರುತಿಸುವಿಕೆ:').replace(/Match/i, 'ಹೊಂದಾಣಿಕೆ');
  }
  if (lower.includes('emergency incident:')) {
    return lang === 'hi' ? raw.replace(/Emergency Incident:/i, 'आपातकालीन घटना:') : raw.replace(/Emergency Incident:/i, 'ತುರ್ತು ಘಟನೆ:');
  }

  // Feed & Gateway Badges
  if (lower === 'quickml') return lang === 'hi' ? 'QuickML' : 'QuickML';
  if (lower === 'gis intel') return lang === 'hi' ? 'जीआईएस इंटेल' : 'ಜಿಐಎಸ್ ಇಂಟೆಲ್';
  if (lower === 'fiu alert') return lang === 'hi' ? 'एफआईयू अलर्ट' : 'ಎಫ್‌ಐಯು ಎಚ್ಚರಿಕೆ';
  if (lower === 'tactical') return lang === 'hi' ? 'रणनीतिक' : 'ಕಾರ್ಯಾಚರಣೆ';
  if (lower === 'biometrics') return lang === 'hi' ? 'बायोमेट्रिक्स' : 'ಬಯೋಮೆಟ್ರಿಕ್ಸ್';
  if (lower === 'dispatch') return lang === 'hi' ? 'डिस्पैच' : 'ರವಾನೆ';
  if (lower === 'routed') return lang === 'hi' ? 'रूट किया' : 'ರೂಟ್ ಮಾಡಲಾಗಿದೆ';
  if (lower === 'resnet-128 / nafis') return 'ResNet-128 / NAFIS';
  if (lower === 'criminology mo') return lang === 'hi' ? 'अपराधशास्त्र MO' : 'ಅಪರಾಧಶಾಸ್ತ್ರ MO';
  if (lower === 'cytoscape.js graphs') return lang === 'hi' ? 'Cytoscape.js रेखाचित्र' : 'Cytoscape.js ಗ್ರಾಫ್‌ಗಳು';
  if (lower === 'investigation copilot') return lang === 'hi' ? 'जांच सह-पायलट' : 'ತನಿಖಾ ಸಹಾಯಕ';
  if (lower === 'time-series forecast') return lang === 'hi' ? 'समय-श्रृंखला पूर्वानुमान' : 'ಟೈಮ್-ಸರಣಿ ಮುನ್ಸೂಚನೆ';
  if (lower === 'demographics') return lang === 'hi' ? 'जनसांख्यिकी' : 'ಜನಸಂಖ್ಯಾಶಾಸ್ತ್ರ';
  if (lower === 'early warning') return lang === 'hi' ? 'पूर्व चेतावनी' : 'ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ';
  if (lower === 'ml recidivism') return lang === 'hi' ? 'एमएल पुनरावृत्ति' : 'ಎಂಎಲ್ ಮರುಕಳಿಸುವಿಕೆ';
  if (lower === 'fiu structuring') return lang === 'hi' ? 'एफआईयू संरचना' : 'ಎಫ್‌ಐಯು ರಚನೆ';
  if (lower === 'ksp rag ai') return lang === 'hi' ? 'केएसपी RAG AI' : 'ಕೆಎಸ್‌ಪಿ RAG AI';
  if (lower === 'digital twin') return lang === 'hi' ? 'डिजिटल ट्विन' : 'ಡಿಜಿಟಲ್ ಟ್ವಿನ್';
  if (lower === '5-tier rbac') return lang === 'hi' ? '5-स्तरीय आरबीएसी' : '5-ಹಂತದ RBAC';

  // 12 Capabilities Departments
  if (lower.includes('state biometrics & forensics cell')) return lang === 'hi' ? 'राज्य बायोमेट्रिक्स और फोरेंसिक सेल' : 'ರಾಜ್ಯ ಬಯೋಮೆಟ್ರಿಕ್ಸ್ ಮತ್ತು ಫೋರೆನ್ಸಿಕ್ಸ್ ಕೋಶ';
  if (lower.includes('central crime branch (ccb)')) return lang === 'hi' ? 'सेंट्रल क्राइम ब्रांच (CCB)' : 'ಸೆಂಟ್ರಲ್ ಕ್ರೈಮ್ ಬ್ರಾಂಚ್ (CCB)';
  if (lower.includes('state intelligence bureau (sib)')) return lang === 'hi' ? 'राज्य खुफिया ब्यूरो (SIB)' : 'ರಾಜ್ಯ ಗುಪ್ತಚರ ಬ್ಯೂರೋ (SIB)';
  if (lower.includes('criminal investigation dept (cid)')) return lang === 'hi' ? 'आपराधिक जांच विभाग (CID)' : 'ಅಪರಾಧ ತನಿಖಾ ಇಲಾಖೆ (CID)';
  if (lower.includes('state crime records bureau (scrb)')) return lang === 'hi' ? 'राज्य अपराध रिकॉर्ड ब्यूरो (SCRB)' : 'ರಾಜ್ಯ ಅಪರಾಧ ದಾಖಲೆಗಳ ಬ್ಯೂರೋ (SCRB)';
  if (lower.includes('scrb research division')) return lang === 'hi' ? 'एससीआरबी अनुसंधान प्रभाग' : 'ಎಸ್‌ಸಿಆರ್‌ಬಿ ಸಂಶೋಧನಾ ವಿಭಾಗ';
  if (lower.includes('police hq operations center')) return lang === 'hi' ? 'पुलिस मुख्यालय संचालन केंद्र' : 'ಪೊಲೀಸ್ ಪ್ರಧಾನ ಕಚೇರಿ ಕಾರ್ಯಾಚರಣೆ ಕೇಂದ್ರ';
  if (lower.includes('judicial & prosecution liaison')) return lang === 'hi' ? 'न्यायिक और अभियोजन संपर्क' : 'ನ್ಯಾಯಾಂಗ ಮತ್ತು ಪ್ರಾಸಿಕ್ಯೂಷನ್ ಸಂಪರ್ಕ';
  if (lower.includes('economic offenses wing (eow)')) return lang === 'hi' ? 'आर्थिक अपराध शाखा (EOW)' : 'ಆರ್ಥಿಕ ಅಪರಾಧಗಳ ವಿಭಾಗ (EOW)';
  if (lower.includes('prajna ai core engine')) return lang === 'hi' ? 'प्रज्ञा AI कोर इंजन' : 'ಪ್ರಜ್ಞಾ AI ಕೋರ್ ಎಂಜಿನ್';
  if (lower.includes('command & control room')) return lang === 'hi' ? 'कमांड और नियंत्रण कक्ष' : 'ಕಮಾಂಡ್ & ಕಂಟ್ರೋಲ್ ರೂಮ್';
  if (lower.includes('inspector general oversight cell')) return lang === 'hi' ? 'महानिरीक्षक निरीक्षण प्रकोष्ठ' : 'ಇನ್ಸ್‌ಪೆಕ್ಟರ್ ಜನರಲ್ ಮೇಲ್ವಿಚಾರಣಾ ಕೋಶ';

  // 12 Capabilities Titles
  if (lower.includes('ai facial & 10-print biometric identification')) return lang === 'hi' ? 'एआई चेहरा और 10-फिंगरप्रिंट बायोमेट्रिक पहचान' : 'ಎಐ ಮುಖ & 10-ಬೆರಳಚ್ಚು ಬಯೋಮೆಟ್ರಿಕ್ ಗುರುತಿಸುವಿಕೆ';
  if (lower.includes('criminology-based offender profiling')) return lang === 'hi' ? 'अपराधशास्त्र-आधारित अपराधी प्रोफाइलिंग' : 'ಅಪರಾಧಶಾಸ್ತ್ರ ಆಧಾರಿತ ಅಪರಾಧಿ ಪ್ರೊಫೈಲಿಂಗ್';
  if (lower.includes('criminal association network analysis')) return lang === 'hi' ? 'आपराधिक नेटवर्क संबंध विश्लेषण' : 'ಅಪರಾಧ ಸಹವರ್ತಿ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಣೆ';
  if (lower.includes('investigator ai decision support')) return lang === 'hi' ? 'जांच अधिकारी एआई निर्णय सहायता' : 'ತನಿಖಾಧಿಕಾರಿ ಎಐ ನಿರ್ಧಾರ ಬೆಂಬಲ';
  if (lower.includes('crime pattern & trend analytics')) return lang === 'hi' ? 'अपराध पैटर्न और प्रवृत्ति विश्लेषण' : 'ಅಪರಾಧ ಮಾದರಿ & ಪ್ರವೃತ್ತಿ ವಿಶ್ಲೇಷಣೆ';
  if (lower.includes('sociological & demographic insights')) return lang === 'hi' ? 'सामाजिक और जनसांख्यिकीय अंतर्दृष्टि' : 'ಸಾಮಾಜಿಕ & ಜನಸಂಖ್ಯಾ ಒಳನೋಟಗಳು';
  if (lower.includes('crime forecasting & early warning')) return lang === 'hi' ? 'अपराध पूर्वानुमान और पूर्व चेतावनी' : 'ಅಪರಾಧ ಮುನ್ಸೂಚನೆ & ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ';
  if (lower.includes('recidivism & bail risk scoring')) return lang === 'hi' ? 'पुनरावृत्ति और जमानत जोखिम स्कोरिंग' : 'ಮರುಕಳಿಸುವಿಕೆ & ಜಾಮೀನು ಅಪಾಯ ಸ್ಕೋರಿಂಗ್';
  if (lower.includes('financial crime & smurfing analysis')) return lang === 'hi' ? 'वित्तीय अपराध और स्मर्फिंग विश्लेषण' : 'ಹಣಕಾಸು ಅಪರಾಧ & ಸ್ಮರ್ಫಿಂಗ್ ವಿಶ್ಲೇಷಣೆ';
  if (lower.includes('conversational multilingual crime intelligence')) return lang === 'hi' ? 'संवादात्मक बहुभाषी अपराध इंटेलिजेंस' : 'ಸಂಭಾಷಣಾ ಬಹುಭಾಷಾ ಅಪರಾಧ ಗುಪ್ತಚರ';
  if (lower.includes('operational patrol simulation & rtcc')) return lang === 'hi' ? 'परिचालन गश्त सिमुलेशन और आरटीसीसी' : 'ಕಾರ್ಯಾಚರಣಾ ಗಸ್ತು ಸಿಮ್ಯುಲೇಶನ್ & RTCC';
  if (lower.includes('dpdp act governance & access audit')) return lang === 'hi' ? 'डीपीडीपी अधिनियम शासन और एक्सेस ऑडिट' : 'ಡಿಪಿಡಿಪಿ ಕಾಯ್ದೆ ಆಡಳಿತ & ಪ್ರವೇಶ ಆಡಿಟ್';

  // 12 Capabilities Descriptions
  if (lower.includes('deep-learning resnet-128 identity matching against ksp convict database')) {
    return lang === 'hi' ? 'केएसपी अपराधी डेटाबेस और आईएसओ नाफिस मिनुशिया इंजन के खिलाफ डीप-लर्निंग ResNet-128 पहचान मिलान।' : 'ಕೆಎಸ್‌ಪಿ ಅಪರಾಧಿ ಡೇಟಾಬೇಸ್ ಮತ್ತು ISO NAFIS ಮಿನುಶಿಯಾ ಎಂಜಿನ್ ವಿರುದ್ಧ ಡೀಪ್-ಲರ್ನಿಂಗ್ ResNet-128 ಗುರುತು ಹೊಂದಾಣಿಕೆ.';
  }
  if (lower.includes('criminal dossier timeline mapping modus operandi signatures')) {
    return lang === 'hi' ? 'कार्यप्रणाली के हस्ताक्षर, आवर्ती सहयोगियों और हथियारों के प्रकारों का आपराधिक डोजियर टाइमलाइन मानचित्रण।' : 'ಕಾರ್ಯಾಚರಣಾ ವಿಧಾನದ ಸಹಿಗಳು, ಮರುಕಳಿಸುವ ಸಹಚರರು ಮತ್ತು ಆಯುಧ ಪ್ರಕಾರಗಳನ್ನು ಮ್ಯಾಪ್ ಮಾಡುವ ಕ್ರಿಮಿನಲ್ ಡಾಸಿಯರ್ ಟೈಮ್‌ಲೈನ್.';
  }
  if (lower.includes('interactive cytoscape relationship graphs linking suspect, victim')) {
    return lang === 'hi' ? 'संदिग्ध, पीड़ित, स्थान और फोन स्पूफिंग नोड्स को जोड़ने वाले इंटरैक्टिव साइटोस्केप संबंध रेखाचित्र।' : 'ಶಂಕಿತ, ಸಂತ್ರಸ್ತ, ಸ್ಥಳ ಮತ್ತು ಫೋನ್ ಸ್ಪೂಫಿಂಗ್ ನೋಡ್‌ಗಳನ್ನು ಲಿಂಕ್ ಮಾಡುವ ಸಂವಾದಾತ್ಮಕ ಸೈಟೋಸ್ಕೇಪ್ ಸಂಬಂಧ ಗ್ರಾಫ್‌ಗಳು.';
  }
  if (lower.includes('automated case brief summaries, lead suggestions, and section 161 crpc')) {
    return lang === 'hi' ? 'स्वचालित केस सारांश, सुराग सुझाव और धारा 161 CrPC पूछताछ प्रश्न संकेत।' : 'ಸ್ವಯಂಚಾಲಿತ ಕೇಸ್ ಬ್ರೀಫ್ ಸಾರಾಂಶಗಳು, ಲೀಡ್ ಸಲಹೆಗಳು ಮತ್ತು ಸೆಕ್ಷನ್ 161 CrPC ವಿಚಾರಣಾ ಪ್ರಶ್ನೆ ಪ್ರಾಂಪ್ಟ್‌ಗಳು.';
  }
  if (lower.includes('interactive time-series charts, district-wise crime comparisons')) {
    return lang === 'hi' ? 'इंटरैक्टिव समय-श्रृंखला चार्ट, जिलावार अपराध तुलना और मौसमी वृद्धि विश्लेषण।' : 'ಸಂವಾದಾತ್ಮಕ ಟೈಮ್-ಸರಣಿ ಚಾರ್ಟ್‌ಗಳು, ಜಿಲ್ಲಾವಾರು ಅಪರಾಧ ಹೋಲಿಕೆಗಳು ಮತ್ತು ಕಾಲೋಚಿತ ಉಲ್ಬಣ ವಿಶ್ಲೇಷಣೆ.';
  }
  if (lower.includes('demographic overlays correlating crime concentrations with urbanization')) {
    return lang === 'hi' ? 'शहरीकरण, पारगमन केंद्रों और आर्थिक संकेतकों के साथ अपराध एकाग्रता को सहसंबंधित करने वाले जनसांख्यिकीय ओवरले।' : 'ನಗರೀಕರಣ, ಸಾರಿಗೆ ಕೇಂದ್ರಗಳು ಮತ್ತು ಆರ್ಥಿಕ ಸೂಚಕಗಳೊಂದಿಗೆ ಅಪರಾಧ ಸಾಂದ್ರತೆಯನ್ನು ಪರಸ್ಪರ ಸಂಯೋಜಿಸುವ ಜನಸಂಖ್ಯಾ ಓವರ್‌ಲೇಗಳು.';
  }
  if (lower.includes('rule-based early-warning alerts and statistical patrol resource deployment')) {
    return lang === 'hi' ? 'नियम-आधारित पूर्व चेतावनी अलर्ट और सांख्यिकीय गश्ती संसाधन तैनाती सिफारिशें।' : 'ನಿಯಮ-ಆಧಾರಿತ ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ ಅಲರ್ಟ್‌ಗಳು ಮತ್ತು ಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ಗಸ್ತು ಸಂಪನ್ಮೂಲ ನಿಯೋಜನೆ ಶಿಫಾರಸುಗಳು.';
  }
  if (lower.includes('quickml probability model calculating re-offence risk based on prior convictions')) {
    return lang === 'hi' ? 'पूर्व सजाओं और कार्यप्रणाली समानता के आधार पर पुन: अपराध जोखिम की गणना करने वाला QuickML मॉडल।' : 'ಹಿಂದಿನ ಶಿಕ್ಷೆಗಳು ಮತ್ತು ಎಂಒ ಸಾಮ್ಯತೆಯ ಆಧಾರದ ಮೇಲೆ ಮರು-ಅಪರಾಧ ಅಪಾಯವನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡುವ QuickML ಸಂಭವನೀಯತೆ ಮಾದರಿ.';
  }
  if (lower.includes('money trail visualization detecting transaction structuring below the ₹50,000')) {
    return lang === 'hi' ? '₹50,000 रिपोर्टिंग सीमा से नीचे लेनदेन संरचना का पता लगाने वाला मनी ट्रेल विज़ुअलाइज़ेशन।' : '₹50,000 ವರದಿ ಮಿತಿಗಿಂತ ಕೆಳಗಿನ ವಹಿವಾಟು ರಚನೆಯನ್ನು ಪತ್ತೆಹಚ್ಚುವ ಮನಿ ಟ್ರಯಲ್ ದೃಶ್ಯೀಕರಣ.';
  }
  if (lower.includes('nlp assistant querying 1,000 fir records with context-aware')) {
    return lang === 'hi' ? 'संदर्भ-जागरूक अंग्रेजी और कन्नड़ इनपुट के साथ 1,000 एफआईआर रिकॉर्ड की खोज करने वाला एनएलपी सहायक।' : 'ಸಂದರ್ಭ-ಅರಿವಿನ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡ ಇನ್‌ಪುಟ್‌ಗಳೊಂದಿಗೆ 1,000 ಎಫ್‌ಐಆರ್ ದಾಖಲೆಗಳನ್ನು ಪ್ರಶ್ನಿಸುವ ಎನ್‌ಎಲ್‌ಪಿ ಸಹಾಯಕ.';
  }
  if (lower.includes('live digital twin sandbox optimizing hoysala vehicle placement')) {
    return lang === 'hi' ? 'होयसला वाहन प्लेसमेंट और गश्ती मार्गों का अनुकूलन करने वाला लाइव डिजिटल ट्विन सैंडबॉक्स।' : 'ಹೊಯ್ಸಳ ವಾಹನ ನಿಯೋಜನೆ ಮತ್ತು ಗಸ್ತು ಮಾರ್ಗಗಳನ್ನು ಅತ್ಯುತ್ತಮವಾಗಿಸುವ ಲೈವ್ ಡಿಜಿಟಲ್ ಟ್ವಿನ್ ಸ್ಯಾಂಡ್‌ಬಾಕ್ಸ್.';
  }
  if (lower.includes('strict 5-tier role-based access control, cryptographic hash verification')) {
    return lang === 'hi' ? 'सख्त 5-स्तरीय भूमिका-आधारित पहुँच नियंत्रण, क्रिप्टोग्राफ़िक हैश सत्यापन और ऑडिट लॉग।' : 'ಕಟ್ಟುನಿಟ್ಟಾದ 5-ಹಂತದ ಪಾತ್ರ-ಆಧಾರಿತ ಪ್ರವೇಶ ನಿಯಂತ್ರಣ, ಕ್ರಿಪ್ಟೋಗ್ರಾಫಿಕ್ ಹ್ಯಾಶ್ ಪರಿಶೀಲನೆ ಮತ್ತು ಆಡಿಟ್ ಲಾಗ್‌ಗಳು.';
  }

  // RTCC Mappings
  if (lower.includes('anpr optical target lock')) return lang === 'hi' ? 'ANPR ऑप्टिकल टारगेट लॉक' : 'ANPR ಆಪ್ಟಿಕಲ್ ಗುರಿ ಲಾಕ್';
  if (lower.includes('confidence 99.4%')) return lang === 'hi' ? 'विश्वसनीयता 99.4%' : 'ವಿಶ್ವಾಸಾರ್ಹತೆ 99.4%';
  if (lower.includes('hotlist threat #1')) return lang === 'hi' ? 'हॉटलिस्ट ख़तरा #1' : 'ಹಾಟ್‌ಲಿಸ್ಟ್ ಬೆದರಿಕೆ #1';
  if (lower.includes('hotlist threat #2')) return lang === 'hi' ? 'हॉटलिस्ट ख़तरा #2' : 'ಹಾಟ್‌ಲಿಸ್ಟ್ ಬೆದರಿಕೆ #2';
  if (lower.includes('high alert (snatching)')) return lang === 'hi' ? 'हाई अलर्ट (झपटमारी)' : 'ಹೈ ಅಲರ್ಟ್ (ಸರಗಳ್ಳತನ)';
  if (lower.includes('suspicious (duplicate plate)')) return lang === 'hi' ? 'संदिग्ध (फर्जी नंबर प्लेट)' : 'ಅನುಮಾನಾಸ್ಪದ (ನಕಲಿ ನಂಬರ್ ಪ್ಲೇಟ್)';
  if (lower.includes('vahan clean record')) return lang === 'hi' ? 'वाहन स्वच्छ रिकॉर्ड' : 'ವಾಹನ್ ಕ್ಲೀನ್ ದಾಖಲೆ';
  if (lower.includes('inter-state check clear')) return lang === 'hi' ? 'अंतर-राज्यीय जाँच स्पष्ट' : 'ಅಂತರ-ರಾಜ್ಯ ಪರಿಶೀಲನೆ ಕ್ಲಿಯರ್';
  if (lower.includes('42 km/h • clear')) return lang === 'hi' ? '42 KM/H • स्पष्ट' : '42 KM/H • ಕ್ಲಿಯರ್';
  if (lower.includes('38 km/h • vahan valid')) return lang === 'hi' ? '38 KM/H • वाहन मान्य' : '38 KM/H • ವಾಹನ್ ಮಾನ್ಯ';
  if (lower.includes('heading: 018° n')) return lang === 'hi' ? 'दिशा: 018° उत्तर' : 'ದಿಕ್ಕು: 018° ಉ';
  if (lower.includes('heading: 350° n')) return lang === 'hi' ? 'दिशा: 350° उत्तर' : 'ದಿಕ್ಕು: 350° ಉ';
  if (lower.includes('heading: 090° e')) return lang === 'hi' ? 'दिशा: 090° पूर्व' : 'ದಿಕ್ಕು: 090° ಪೂ';
  if (lower.includes('heading: 270° w')) return lang === 'hi' ? 'दिशा: 270° पश्चिम' : 'ದಿಕ್ಕು: 270° ಪ';
  if (lower.includes('heading: 120° se')) return lang === 'hi' ? 'दिशा: 120° दक्षिण-पूर्व' : 'ದಿಕ್ಕು: 120° ಆಗ್ನೇಯ';
  if (lower.includes('heading: 180° s')) return lang === 'hi' ? 'दिशा: 180° दक्षिण' : 'ದಿಕ್ಕು: 180° ದ';
  if (lower.includes('choke point alpha')) return lang === 'hi' ? 'चोक पॉइंट अल्फा' : 'ಚೋಕ್ ಪಾಯಿಂಟ್ ಆಲ್ಫಾ';
  if (lower.includes('choke point bravo')) return lang === 'hi' ? 'चोक पॉइंट ब्रावो' : 'ಚೋಕ್ ಪಾಯಿಂಟ್ ಬ್ರಾವೋ';
  if (lower.includes('choke point charlie')) return lang === 'hi' ? 'चोक पॉइंट चार्ली' : 'ಚೋಕ್ ಪಾಯಿಂಟ್ ಚಾರ್ಲಿ';
  if (lower === 'ready_to_seal') return lang === 'hi' ? 'सील करने हेतु तैयार' : 'ಸೀಲ್ ಮಾಡಲು ಸಿದ್ಧ';
  if (lower === 'standby') return lang === 'hi' ? 'स्टैंडबाय' : 'ಸಿದ್ಧತೆಯಲ್ಲಿದೆ';
  if (lower === 'deployed') return lang === 'hi' ? 'तैनात' : 'ನಿಯೋಜಿಸಲಾಗಿದೆ';
  if (lower === 'sealed') return lang === 'hi' ? 'सील' : 'ಸೀಲ್ ಮಾಡಲಾಗಿದೆ';
  if (lower.includes('hosur road - silk board corridor')) return lang === 'hi' ? 'होसुर रोड - सिल्क बोर्ड कॉरिडोर' : 'ಹೊಸೂರು ರಸ್ತೆ - ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಕಾರಿಡಾರ್';
  if (lower.includes('hebbal expressway outbound')) return lang === 'hi' ? 'हेब्बाल एक्सप्रेसवे आउटबाउंड' : 'ಹೆಬ್ಬಾಳ ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ ಹೊರಹೋಗುವ ಮಾರ್ಗ';
  if (lower.includes('commercial street east circle')) return lang === 'hi' ? 'कमर्शियल स्ट्रीट ईस्ट सर्कल' : 'ಕಮರ್ಷಿಯಲ್ ಸ್ಟ್ರೀಟ್ ಪೂರ್ವ ವೃತ್ತ';

  // Comprehensive SOP Titles & Module Names
  if (lower.includes('prajna ai chatbot & semantic crime assistant')) {
    return lang === 'hi' ? 'प्रज्ञा एआई चैटबॉट और सिमेंटिक अपराध सहायक' : 'ಪ್ರಜ್ಞಾ ಎಐ ಚಾಟ್‌ಬಾಟ್ & ಅರ್ಥಪೂರ್ಣ ಅಪರಾಧ ಸಹಾಯಕ';
  }
  if (lower.includes('prajna-ai: a conversational crime intelligence system for ksp')) {
    return lang === 'hi' ? 'प्रज्ञा-एआई: केएसपी के लिए संवादात्मक अपराध इंटेलिजेंस सिस्टम' : 'ಪ್ರಜ್ಞಾ-ಎಐ: ಕೆಎಸ್‌ಪಿಗಾಗಿ ಸಂಭಾಷಣಾ ಅಪರಾಧ ಗುಪ್ತಚರ ವ್ಯವಸ್ಥೆ';
  }
  if (lower.includes('ksp ai facial & nafis 10-print biometric identification')) {
    return lang === 'hi' ? 'केएसपी एआई चेहरा और नाफिस 10-फिंगरप्रिंट बायोमेट्रिक पहचान' : 'ಕೆಎಸ್‌ಪಿ ಎಐ ಮುಖ & NAFIS 10-ಬೆರಳಚ್ಚು ಬಯೋಮೆಟ್ರಿಕ್ ಗುರುತಿಸುವಿಕೆ';
  }
  if (lower.includes('ai decision support system & case precedent finder')) {
    return lang === 'hi' ? 'एआई निर्णय सहायता प्रणाली और केस मिसाल खोजकर्ता' : 'ಎಐ ನಿರ್ಧಾರ ಬೆಂಬಲ ವ್ಯವಸ್ಥೆ & ಕೇಸ್ ಪೂರ್ವನಿದರ್ಶನ ಶೋಧಕ';
  }
  if (lower.includes('organized crime syndicate network analysis')) {
    return lang === 'hi' ? 'संगठित अपराध सिंडिकेट नेटवर्क विश्लेषण' : 'ಸಂಘಟಿತ ಅಪರಾಧ ಸಿಂಡಿಕೇಟ್ ನೆಟ್‌ವರ್ಕ್ ವಿಶ್ಲೇಷಣೆ';
  }
  if (lower.includes('offender profiling & recidivism prediction engine')) {
    return lang === 'hi' ? 'अपराधी प्रोफाइलिंग और पुनरावृत्ति भविष्यवाणी इंजन' : 'ಅಪರಾಧಿ ಪ್ರೊಫೈಲಿಂಗ್ & ಮರುಕಳಿಸುವಿಕೆ ಮುನ್ಸೂಚನೆ ಎಂಜಿನ್';
  }
  if (lower.includes('predictive forecasting & proactive early warning system')) {
    return lang === 'hi' ? 'पूर्वानुमान और सक्रिय पूर्व चेतावनी प्रणाली' : 'ಮುನ್ಸೂಚನೆ & ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ ವ್ಯವಸ್ಥೆ';
  }
  if (lower.includes('financial forensics & money laundering trail analysis')) {
    return lang === 'hi' ? 'वित्तीय फोरेंसिक और मनी लॉन्ड्रिंग ट्रेल विश्लेषण' : 'ಹಣಕಾಸು ವಿಧಿವಿಜ್ಞಾನ & ಅಕ್ರಮ ಹಣ ವರ್ಗಾವಣೆ ಜಾಡು ವಿಶ್ಲೇಷಣೆ';
  }
  if (lower.includes('role-based access control (rbac) & governance administration')) {
    return lang === 'hi' ? 'भूमिका-आधारित पहुंच नियंत्रण (RBAC) और शासन प्रशासन' : 'ಪಾತ್ರ-ಆಧಾರಿತ ಪ್ರವೇಶ ನಿಯಂತ್ರಣ (RBAC) & ಆಡಳಿತ ನಿರ್ವಹಣೆ';
  }
  if (lower.includes('gis spatial crime hotspot intelligence')) {
    return lang === 'hi' ? 'जीआईएस स्थानिक अपराध हॉटस्पॉट इंटेलिजेंस' : 'ಜಿಐಎಸ್ ಪ್ರಾದೇಶಿಕ ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್ ಗುಪ್ತಚರ';
  }
  if (lower.includes('explainable ai & legal accountability architecture')) {
    return lang === 'hi' ? 'व्याख्या योग्य एआई और कानूनी जवाबदेही वास्तुकला' : 'ವಿವರಿಸಬಹುದಾದ ಎಐ & ಕಾನೂನು ಹೊಣೆಗಾರಿಕೆ ರಚನೆ';
  }
  if (lower.includes('immutable audit trail & executive compliance reports')) {
    return lang === 'hi' ? 'अपरिवर्तनीय ऑडिट ट्रेल और कार्यकारी अनुपालन रिपोर्ट' : 'ಅಪರಿವರ್ತನೀಯ ಆಡಿಟ್ ಟ್ರಯಲ್ & ಕಾರ್ಯನಿರ್ವಾಹಕ ಅನುಸರಣೆ ವರದಿಗಳು';
  }
  if (lower.includes('automated recidivism probability engine')) {
    return lang === 'hi' ? 'स्वचालित पुनरावृत्ति संभावना इंजन' : 'ಸ್ವಯಂಚಾಲಿತ ಮರುಕಳಿಸುವಿಕೆ ಸಂಭವನೀಯತೆ ಎಂಜಿನ್';
  }
  if (lower.includes('sociological & demographic crime pattern analysis')) {
    return lang === 'hi' ? 'सामाजिक और जनसांख्यिकीय अपराध पैटर्न विश्लेषण' : 'ಸಾಮಾಜಿಕ & ಜನಸಂಖ್ಯಾ ಅಪರಾಧ ಮಾದರಿ ವಿಶ್ಲೇಷಣೆ';
  }
  if (lower.includes('longitudinal crime trend & category analytics')) {
    return lang === 'hi' ? 'दीर्घकालिक अपराध प्रवृत्ति और श्रेणी विश्लेषण' : 'ದೀರ್ಘಕಾಲೀನ ಅಪರಾಧ ಪ್ರವೃತ್ತಿ & ವರ್ಗ ವಿಶ್ಲೇಷಣೆ';
  }
  if (lower.includes('operational deployment & tactical risk simulator')) {
    return lang === 'hi' ? 'परिचालन तैनाती और रणनीतिक जोखिम सिम्युलेटर' : 'ಕಾರ್ಯಾಚರಣೆ ನಿಯೋಜನೆ & ಯುದ್ಧತಂತ್ರದ ಅಪಾಯ ಸಿಮ್ಯುಲೇಟರ್';
  }
  if (lower.includes('real-time crime center (rtcc) 24/7 command wall')) {
    return lang === 'hi' ? 'रियल-टाइम क्राइम सेंटर (RTCC) 24/7 कमांड वॉल' : 'ರಿಯಲ್-ಟೈಮ್ ಕ್ರೈಮ್ ಸೆಂಟರ್ (RTCC) 24/7 ಕಮಾಂಡ್ ವಾಲ್';
  }

  // Common SOP Step Actions & Headings
  if (lower === 'fir & case querying') return lang === 'hi' ? 'एफआईआर और केस पूछताछ' : 'ಎಫ್‌ಐಆರ್ ಮತ್ತು ಕೇಸ್ ವಿಚಾರಣೆ';
  if (lower === 'suspect cross-referencing') return lang === 'hi' ? 'संदिग्ध क्रॉस-रेफरेंसिंग' : 'ಶಂಕಿತರ ಕ್ರಾಸ್-ರೆಫರೆನ್ಸಿಂಗ್';
  if (lower === 'analytical chart generation') return lang === 'hi' ? 'विश्लेषणात्मक चार्ट निर्माण' : 'ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಚಾರ್ಟ್ ರಚನೆ';
  if (lower === 'rapid search & cctns query') return lang === 'hi' ? 'त्वरित खोज और सीसीटीएनएस पूछताछ' : 'ತ್ವರಿತ ಹುಡುಕಾಟ ಮತ್ತು CCTNS ವಿಚಾರಣೆ';
  if (lower === 'emergency beat & pcr dispatch') return lang === 'hi' ? 'आपातकालीन बीट और पीसीआर प्रेषण' : 'ತುರ್ತು ಬೀಟ್ ಮತ್ತು PCR ರವಾನೆ';
  if (lower === 'specialized department routing') return lang === 'hi' ? 'विशेष विभाग रूटिंग' : 'ವಿಶೇಷ ಇಲಾಖೆ ರೂಟಿಂಗ್';
  if (lower === 'evidence ingestion') return lang === 'hi' ? 'साक्ष्य इनपुट' : 'ಸಾಕ್ಷ್ಯ ಅಪ್‌ಲೋಡ್';
  if (lower === 'database correlation') return lang === 'hi' ? 'डेटाबेस सहसंबंध' : 'ಡೇಟಾಬೇಸ್ ಪರಸ್ಪರ ಸಂಬಂಧ';
  if (lower === 'side-by-side audit & pcr dispatch') return lang === 'hi' ? 'तुलनात्मक ऑडिट और पीसीआर प्रेषण' : 'ಹೋಲಿಕೆ ಆಡಿಟ್ ಮತ್ತು PCR ರವಾನೆ';
  if (lower === 'select target fir') return lang === 'hi' ? 'लक्षित एफआईआर का चयन करें' : 'ಗುರಿ ಎಫ್‌ಐಆರ್ ಆಯ್ಕೆಮಾಡಿ';
  if (lower === 'case brief summary') return lang === 'hi' ? 'केस संक्षिप्त सारांश' : 'ಕೇಸ್ ಸಾರಾಂಶ';
  if (lower === 'similar case precedents & leads') return lang === 'hi' ? 'समान केस मिसालें और सुराग' : 'ಹೋಲುವ ಕೇಸ್ ನಿದರ್ಶನಗಳು ಮತ್ತು ಸುಳಿವುಗಳು';
  if (lower === 'select network node') return lang === 'hi' ? 'नेटवर्क नोड चुनें' : 'ನೆಟ್‌ವರ್ಕ್ ನೋಡ್ ಆಯ್ಕೆಮಾಡಿ';
  if (lower === 'analyze centrality & bridges') return lang === 'hi' ? 'केंद्रीयता और पुलों का विश्लेषण करें' : 'ಕೇಂದ್ರೀಯತೆ ಮತ್ತು ಸಂಪರ್ಕಗಳ ವಿಶ್ಲೇಷಣೆ';
  if (lower === 'generate offender dossier') return lang === 'hi' ? 'अपराधी डोजियर तैयार करें' : 'ಅಪರಾಧಿ ಡಾಸಿಯರ್ ರಚಿಸಿ';
  if (lower === 'select or search suspect') return lang === 'hi' ? 'संदिग्ध का चयन करें या खोजें' : 'ಶಂಕಿತರನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ಹುಡುಕಿ';
  if (lower === 'recidivism risk gauge') return lang === 'hi' ? 'पुनरावृत्ति जोखिम गेज' : 'ಮರುಕಳಿಸುವಿಕೆ ಅಪಾಯದ ಗೇಜ್';
  if (lower === 'criminal timeline & associates') return lang === 'hi' ? 'आपराधिक समयरेखा और सहयोगी' : 'ಅಪರಾಧ ಟೈಮ್‌ಲೈನ್ ಮತ್ತು ಸಹಚರರು';
  if (lower === 'inspect 72-hour forecast map') return lang === 'hi' ? '72-घंटे का पूर्वानुमान मानचित्र देखें' : '೭೨-ಗಂಟೆಗಳ ಮುನ್ಸೂಚನೆ ನಕ್ಷೆ ಪರಿಶೀಲಿಸಿ';
  if (lower === 'early warning advisory') return lang === 'hi' ? 'पूर्व चेतावनी सलाह' : 'ಮುಂಚಿನ ಎಚ್ಚರಿಕೆ ಸಲಹೆ';
  if (lower === 'proactive cordon dispatch') return lang === 'hi' ? 'सक्रिय घेराबंदी प्रेषण' : 'ಮುಂಚಿತ ಸುತ್ತುವರಿಕೆ ರವಾನೆ';
  if (lower === 'filter & search ledger') return lang === 'hi' ? 'लेज़र को फ़िल्टर और खोजें' : 'ಲೆಡ್ಜರ್ ಫಿಲ್ಟರ್ ಮಾಡಿ ಮತ್ತು ಹುಡುಕಿ';
  if (lower === 'inspect money trail visualizer') return lang === 'hi' ? 'मनी ट्रेल विज़ुअलाइज़र का निरीक्षण करें' : 'ಮನಿ ಟ್ರಯಲ್ ದೃಶ್ಯೀಕರಣ ಪರಿಶೀಲಿಸಿ';
  if (lower === 'cross-reference suspect profile') return lang === 'hi' ? 'संदिग्ध प्रोफ़ाइल का क्रॉस-रेफरेंस' : 'ಶಂಕಿತರ ಪ್ರೊಫೈಲ್ ಪರಿಶೀಲಿಸಿ';
  if (lower === 'inspect heat clusters') return lang === 'hi' ? 'हीट क्लस्टरों का निरीक्षण करें' : 'ಶಾಖ ಕ್ಲಸ್ಟರ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ';
  if (lower === 'filter by severity tier') return lang === 'hi' ? 'गंभीरता स्तर द्वारा फ़िल्टर करें' : 'ತೀವ್ರತೆಯ ಹಂತದ ಪ್ರಕಾರ ಫಿಲ್ಟರ್ ಮಾಡಿ';
  if (lower === 'field patrol allocation') return lang === 'hi' ? 'फील्ड गश्ती आवंटन' : 'ಕ್ಷೇತ್ರ ಗಸ್ತು ಹಂಚಿಕೆ';
  if (lower === 'inspect security audit logs') return lang === 'hi' ? 'सुरक्षा ऑडिट लॉग का निरीक्षण करें' : 'ಭದ್ರತಾ ಆಡಿಟ್ ಲಾಗ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ';
  if (lower === 'catalyst serverless status') return lang === 'hi' ? 'कैटेलिस्ट सर्वरलेस स्थिति' : 'ಕ್ಯಾಟಲಿಸ್ಟ್ ಸರ್ವರ್‌ಲೆಸ್ ಸ್ಥಿತಿ';
  if (lower === 'generate compliance dossier') return lang === 'hi' ? 'अनुपालन डोजियर तैयार करें' : 'ಅನುಸರಣೆ ಡಾಸಿಯರ್ ರಚಿಸಿ';
  if (lower === 'review immutable audit ledger') return lang === 'hi' ? 'अपरिवर्तनीय ऑडिट लेज़र की समीक्षा करें' : 'ಅಪರಿವರ್ತನೀಯ ಆಡಿಟ್ ಲೆಡ್ಜರ್ ಪರಿಶೀಲಿಸಿ';
  if (lower === 'catalyst serverless telemetry') return lang === 'hi' ? 'कैटेलिस्ट सर्वरलेस टेलीमेट्री' : 'ಕ್ಯಾಟಲಿಸ್ಟ್ ಸರ್ವರ್‌ಲೆಸ್ ಟೆಲಿಮೆಟ್ರಿ';
  if (lower === 'executive report generator') return lang === 'hi' ? 'कार्यकारी रिपोर्ट जनरेटर' : 'ಕಾರ್ಯನಿರ್ವಾಹಕ ವರದಿ ಜನರೇಟರ್';
  if (lower === 'age of accused distribution') return lang === 'hi' ? 'अभियुक्त आयु वितरण' : 'ಆರೋಪಿಗಳ ವಯೋಮಾನ ವಿತರಣೆ';
  if (lower === 'gender ratio demographic meter') return lang === 'hi' ? 'लिंग अनुपात जनसांख्यिकीय मीटर' : 'ಲಿಂಗ ಅನುಪಾತ ಜನಸಂಖ್ಯಾ ಮೀಟರ್';
  if (lower === 'regional socio-economic correlation') return lang === 'hi' ? 'क्षेत्रीय सामाजिक-आर्थिक सहसंबंध' : 'ಪ್ರಾದೇಶಿಕ ಸಾಮಾಜಿಕ-ಆರ್ಥಿಕ ಪರಸ್ಪರ ಸಂಬಂಧ';
  if (lower === '12-month trajectory') return lang === 'hi' ? '12-महीने का प्रक्षेपवक्र' : '೧೨-ತಿಂಗಳ ಪಥ';
  if (lower === 'category pareto ranking') return lang === 'hi' ? 'श्रेणी परेटो रैंकिंग' : 'ವರ್ಗದ ಪ್ಯಾರೆಟೊ ಶ್ರೇಯಾಂಕ';
  if (lower === 'district & seasonal audit') return lang === 'hi' ? 'जिला एवं मौसमी ऑडिट' : 'ಜಿಲ್ಲಾ ಮತ್ತು ಕಾಲೋಚಿತ ಆಡಿಟ್';
  if (lower === 'select sector & fugitive profile') return lang === 'hi' ? 'क्षेत्र और भगोड़ा प्रोफ़ाइल चुनें' : 'ವಲಯ ಮತ್ತು ಪರಾರಿಯಾದವರ ವಿವರ ಆಯ್ಕೆಮಾಡಿ';
  if (lower === 'deploy tactical squads') return lang === 'hi' ? 'रणनीतिक दस्ते तैनात करें' : 'ಕಾರ್ಯತಂತ್ರ ದಳಗಳನ್ನು ನಿಯೋಜಿಸಿ';
  if (lower === 'plan a vs plan b simulation') return lang === 'hi' ? 'योजना ए बनाम योजना बी सिमुलेशन' : 'ಯೋಜನೆ ಎ ವಿರುದ್ಧ ಯೋಜನೆ ಬಿ ಸಿಮ್ಯುಲೇಶನ್';
  if (lower === 'monitor 24/7 command wall') return lang === 'hi' ? '24/7 कमांड वॉल की निगरानी करें' : '೨೪/೭ ಕಮಾಂಡ್ ವಾಲ್ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ';
  if (lower === 'execute anpr hit scan') return lang === 'hi' ? 'एएनपीआर हिट स्कैन निष्पादित करें' : 'ಎಎನ್‌ಪಿಆರ್ ಹಿಟ್ ಸ್ಕ್ಯಾನ್ ಕಾರ್ಯಗತಗೊಳಿಸಿ';
  if (lower === 'fleet tracker & dial 112 dispatch') return lang === 'hi' ? 'फ्लीट ट्रैकर और डायल 112 प्रेषण' : 'ಫ್ಲೀಟ್ ಟ್ರ್ಯಾಕರ್ & ಡಯಲ್ 112 ರವಾನೆ';

  return raw;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('ksp_language') as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ksp_language', lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations.en[key] || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
