import { NetworkGraphData } from '@/types';

// Let's create a rich set of nodes (40+) and edges (60+) representing organization criminal networks
export const mockNetworkGraph: NetworkGraphData = {
  nodes: [
    // --- Cluster 1: HSR Layout Theft & Chain Snatching Gang ---
    { id: 'SUS-001', label: 'Raju K. (Accused)', type: 'suspect', riskTier: 'high', metadata: { age: '29', cases: '6', status: 'Active' } },
    { id: 'SUS-004', label: 'Suresh Gowda (Accused)', type: 'suspect', riskTier: 'high', metadata: { age: '35', cases: '5', status: 'Active' } },
    { id: 'V-001', label: 'Lakshmi N. (Victim)', type: 'victim', metadata: { occupation: 'Housewife', district: 'Bengaluru' } },
    { id: 'V-002', label: 'Savitha Rao (Victim)', type: 'victim', metadata: { occupation: 'Teacher', district: 'Bengaluru' } },
    { id: 'LOC-001', label: 'HSR Layout Sector 3', type: 'location', metadata: { district: 'Bengaluru Urban', type: 'Residential' } },
    { id: 'VEH-001', label: 'KA-01-AB-1234 (Pulsar)', type: 'vehicle', metadata: { owner: 'Suresh Gowda', color: 'Black' } },
    { id: 'PH-001', label: '+91-9845012345', type: 'phone', metadata: { service: 'Airtel', location: 'HSR Layout' } },
    { id: 'ACC-001', label: 'SBI-XXXXX98213', type: 'account', metadata: { bank: 'State Bank of India', balance: '₹12,450' } },
    { id: 'ACC-004', label: 'HDFC-XXXXX11223', type: 'account', metadata: { bank: 'HDFC Bank', balance: '₹2,35,000' } },
    { id: 'CASE-001', label: 'FIR 0012/2026', type: 'case', metadata: { status: 'Under Investigation', section: 'Sec 379 IPC' } },
    { id: 'CASE-004', label: 'FIR 0045/2026', type: 'case', metadata: { status: 'Chargesheeted', section: 'Sec 356 IPC' } },

    // --- Cluster 2: Mysuru Burglary Gang ---
    { id: 'SUS-002', label: 'Venkatesh M. (Accused)', type: 'suspect', riskTier: 'high', metadata: { age: '26', cases: '4', status: 'Active' } },
    { id: 'SUS-003', label: 'Nagaraj R. (Accused)', type: 'suspect', riskTier: 'medium', metadata: { age: '32', cases: '2', status: 'Active' } },
    { id: 'SUS-007', label: 'Nagaraj S. (Associate)', type: 'suspect', riskTier: 'medium', metadata: { age: '28', cases: '2', status: 'Under Surveillance' } },
    { id: 'V-003', label: 'Krishna Murthy (Victim)', type: 'victim', metadata: { occupation: 'Retired Bank Manager', district: 'Mysuru' } },
    { id: 'LOC-002', label: 'Kuvempunagar, Mysuru', type: 'location', metadata: { district: 'Mysuru', type: 'Residential Area' } },
    { id: 'VEH-002', label: 'KA-09-EM-5678 (Activa)', type: 'vehicle', metadata: { owner: 'Venkatesh M.', color: 'Grey' } },
    { id: 'PH-002', label: '+91-9980554321', type: 'phone', metadata: { service: 'Jio', location: 'Mysuru Central' } },
    { id: 'ACC-002', label: 'CANARA-XXXXX34123', type: 'account', metadata: { bank: 'Canara Bank', balance: '₹4,900' } },
    { id: 'CASE-002', label: 'FIR 0034/2026', type: 'case', metadata: { status: 'Open', section: 'Sec 457 IPC' } },

    // --- Cluster 3: Mangaluru Narcotics Network ---
    { id: 'SUS-005', label: 'Fatima B. (Accused)', type: 'suspect', riskTier: 'high', metadata: { age: '28', cases: '3', status: 'Detained' } },
    { id: 'SUS-006', label: 'Imran Khan (Accused)', type: 'suspect', riskTier: 'medium', metadata: { age: '31', cases: '2', status: 'Detained' } },
    { id: 'SUS-010', label: 'Raghavendra S. (Supplier)', type: 'suspect', riskTier: 'high', metadata: { age: '34', cases: '4', status: 'Absconding' } },
    { id: 'LOC-003', label: 'Jyothi Circle, Mangaluru', type: 'location', metadata: { district: 'Mangaluru', type: 'Commercial Hub' } },
    { id: 'PH-005', label: '+91-8861054321', type: 'phone', metadata: { service: 'Airtel', location: 'Ullal, Mangaluru' } },
    { id: 'PH-006', label: '+91-9448098765', type: 'phone', metadata: { service: 'BSNL', location: 'Bunder, Mangaluru' } },
    { id: 'ACC-005', label: 'ICICI-XXXXX88990', type: 'account', metadata: { bank: 'ICICI Bank', balance: '₹14,50,000' } },
    { id: 'CASE-005', label: 'FIR 0005/2026', type: 'case', metadata: { status: 'Under Investigation', section: 'Sec 20 NDPS Act' } },

    // --- Cluster 4: Cybercrime / Money Mule network ---
    { id: 'SUS-011', label: 'Anwar Pasha (Mule)', type: 'suspect', riskTier: 'medium', metadata: { age: '25', cases: '2', status: 'Under Investigation' } },
    { id: 'SUS-012', label: 'Karthik Gowda (Mule)', type: 'suspect', riskTier: 'low', metadata: { age: '24', cases: '1', status: 'Under Investigation' } },
    { id: 'PH-011', label: '+91-7760923456', type: 'phone', metadata: { service: 'Jio', location: 'Kalaburagi' } },
    { id: 'ACC-011', label: 'SBI-XXXXX51129', type: 'account', metadata: { bank: 'SBI', balance: '₹49,800' } },
    { id: 'ACC-012', label: 'BOB-XXXXX90123', type: 'account', metadata: { bank: 'Bank of Baroda', balance: '₹45,200' } },
    { id: 'CASE-003', label: 'FIR 0023/2026', type: 'case', metadata: { status: 'Under Investigation', section: 'Sec 66D IT Act' } },

    // --- Intermediate linking nodes (cross-gang relationships) ---
    { id: 'LOC-004', label: 'Parappana Agrahara Jail', type: 'location', metadata: { type: 'Central Jail', district: 'Bengaluru' } },
    { id: 'VEH-003', label: 'KA-51-MD-9000 (Duster)', type: 'vehicle', metadata: { owner: 'Raju K.', color: 'White' } }
  ],
  edges: [
    // --- Cluster 1 Edges ---
    { id: 'E-101', source: 'SUS-001', target: 'CASE-001', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-102', source: 'SUS-001', target: 'CASE-004', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-103', source: 'SUS-004', target: 'CASE-004', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-104', source: 'SUS-001', target: 'SUS-004', relationship: 'co-accused', weight: 0.9, caseId: 'FIR-004' },
    { id: 'E-105', source: 'V-001', target: 'CASE-001', relationship: 'complainant', weight: 1.0 },
    { id: 'E-106', source: 'V-002', target: 'CASE-004', relationship: 'complainant', weight: 1.0 },
    { id: 'E-107', source: 'CASE-001', target: 'LOC-001', relationship: 'shared-location', weight: 0.8 },
    { id: 'E-108', source: 'CASE-004', target: 'LOC-001', relationship: 'shared-location', weight: 0.8 },
    { id: 'E-109', source: 'SUS-001', target: 'PH-001', relationship: 'phone-contact', weight: 0.95 },
    { id: 'E-110', source: 'SUS-004', target: 'VEH-001', relationship: 'same-vehicle', weight: 1.0 },
    { id: 'E-111', source: 'SUS-001', target: 'ACC-001', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-112', source: 'SUS-004', target: 'ACC-004', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-113', source: 'PH-001', target: 'SUS-004', relationship: 'phone-contact', weight: 0.85 },
    { id: 'E-114', source: 'ACC-004', target: 'ACC-001', relationship: 'financial-link', weight: 0.75 }, // structuring flow

    // --- Cluster 2 Edges ---
    { id: 'E-201', source: 'SUS-002', target: 'CASE-002', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-202', source: 'SUS-003', target: 'CASE-002', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-203', source: 'SUS-002', target: 'SUS-003', relationship: 'co-accused', weight: 0.95, caseId: 'FIR-002' },
    { id: 'E-204', source: 'V-003', target: 'CASE-002', relationship: 'complainant', weight: 1.0 },
    { id: 'E-205', source: 'CASE-002', target: 'LOC-002', relationship: 'shared-location', weight: 0.8 },
    { id: 'E-206', source: 'SUS-002', target: 'PH-002', relationship: 'phone-contact', weight: 0.9 },
    { id: 'E-207', source: 'SUS-002', target: 'VEH-002', relationship: 'same-vehicle', weight: 1.0 },
    { id: 'E-208', source: 'SUS-002', target: 'ACC-002', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-209', source: 'SUS-003', target: 'PH-002', relationship: 'phone-contact', weight: 0.7 },
    { id: 'E-210', source: 'SUS-007', target: 'SUS-003', relationship: 'family', weight: 0.9 }, // cousin
    { id: 'E-211', source: 'SUS-007', target: 'LOC-002', relationship: 'shared-location', weight: 0.6 },

    // --- Cluster 3 Edges ---
    { id: 'E-301', source: 'SUS-005', target: 'CASE-005', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-302', source: 'SUS-006', target: 'CASE-005', relationship: 'co-accused', weight: 1.0 },
    { id: 'E-303', source: 'SUS-005', target: 'SUS-006', relationship: 'co-accused', weight: 0.9, caseId: 'FIR-005' },
    { id: 'E-304', source: 'CASE-005', target: 'LOC-003', relationship: 'shared-location', weight: 0.85 },
    { id: 'E-305', source: 'SUS-005', target: 'PH-005', relationship: 'phone-contact', weight: 0.95 },
    { id: 'E-306', source: 'SUS-006', target: 'PH-006', relationship: 'phone-contact', weight: 0.9 },
    { id: 'E-307', source: 'SUS-005', target: 'ACC-005', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-308', source: 'SUS-010', target: 'SUS-005', relationship: 'phone-contact', weight: 0.8 }, // Drug supplier links
    { id: 'E-309', source: 'SUS-010', target: 'ACC-005', relationship: 'financial-link', weight: 0.85 },

    // --- Cluster 4 Edges ---
    { id: 'E-401', source: 'SUS-011', target: 'CASE-003', relationship: 'co-accused', weight: 0.9 },
    { id: 'E-402', source: 'SUS-012', target: 'CASE-003', relationship: 'co-accused', weight: 0.8 },
    { id: 'E-403', source: 'SUS-011', target: 'ACC-011', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-404', source: 'SUS-012', target: 'ACC-012', relationship: 'financial-link', weight: 1.0 },
    { id: 'E-405', source: 'CASE-003', target: 'PH-011', relationship: 'phone-contact', weight: 0.9 },
    { id: 'E-406', source: 'ACC-011', target: 'ACC-012', relationship: 'financial-link', weight: 0.85 }, // structured flow

    // --- Prison / Prison Cohort linkages (cross-cluster links!) ---
    { id: 'E-501', source: 'SUS-001', target: 'LOC-004', relationship: 'shared-location', weight: 0.9 }, // Raju K. was in Parappana Agrahara
    { id: 'E-502', source: 'SUS-002', target: 'LOC-004', relationship: 'shared-location', weight: 0.9 }, // Venkatesh M. was also in Parappana Agrahara
    { id: 'E-503', source: 'SUS-001', target: 'SUS-002', relationship: 'shared-location', weight: 0.85, metadata: { context: 'Met in jail 2024' } }, // Met in jail!
    { id: 'E-504', source: 'SUS-005', target: 'SUS-001', relationship: 'phone-contact', weight: 0.4 }, // Occasional calls between Raju and Fatima
    { id: 'E-505', source: 'SUS-001', target: 'VEH-003', relationship: 'same-vehicle', weight: 1.0 }
  ]
};
