import { FinancialTransaction } from '@/types';

export const mockTransactions: FinancialTransaction[] = [
  // --- Structuring Chain 1 (Raju K. / Shorty Raju) ---
  {
    id: 'TXN-101',
    fromAccount: 'ACC-001', // SBI-XXXXX98213
    toAccount: 'ACC-004', // HDFC-XXXXX11223
    amount: 49500, // Structured below ₹50,000 threshold
    currency: 'INR',
    date: '2026-01-20T10:00:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-001'],
    transactionType: 'structured'
  },
  {
    id: 'TXN-102',
    fromAccount: 'ACC-001',
    toAccount: 'ACC-004',
    amount: 49800, // Structured
    currency: 'INR',
    date: '2026-01-20T11:30:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-001'],
    transactionType: 'structured'
  },
  {
    id: 'TXN-103',
    fromAccount: 'ACC-001',
    toAccount: 'ACC-004',
    amount: 48900, // Structured
    currency: 'INR',
    date: '2026-01-20T14:15:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-001'],
    transactionType: 'structured'
  },

  // --- Narcotics Payments (Fatima B. / Imran Khan) ---
  {
    id: 'TXN-201',
    fromAccount: 'MULE-ACC-01',
    toAccount: 'ACC-005', // ICICI-XXXXX88990 (Fatima)
    amount: 125000,
    currency: 'INR',
    date: '2026-01-25T16:45:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-005'],
    transactionType: 'transfer'
  },
  {
    id: 'TXN-202',
    fromAccount: 'MULE-ACC-02',
    toAccount: 'ACC-005',
    amount: 180000,
    currency: 'INR',
    date: '2026-01-27T11:00:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-005', 'SUS-006'],
    transactionType: 'transfer'
  },
  {
    id: 'TXN-203',
    fromAccount: 'ACC-005',
    toAccount: 'CASH-WITHDRAWAL',
    amount: 250000,
    currency: 'INR',
    date: '2026-01-29T10:30:00Z',
    suspicious: false,
    linkedSuspectIds: ['SUS-005'],
    transactionType: 'withdrawal'
  },

  // --- Cybercrime Mule Transfers (Anwar Pasha / Karthik Gowda) ---
  {
    id: 'TXN-301',
    fromAccount: 'VICTIM-ACC',
    toAccount: 'ACC-011', // Anwar Pasha's Mule account
    amount: 49800, // Cyber victim transfer
    currency: 'INR',
    date: '2026-01-20T11:15:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-011'],
    transactionType: 'transfer'
  },
  {
    id: 'TXN-302',
    fromAccount: 'ACC-011',
    toAccount: 'ACC-012', // Layering transfer to Karthik Gowda
    amount: 45000,
    currency: 'INR',
    date: '2026-01-20T12:00:00Z',
    suspicious: true,
    linkedSuspectIds: ['SUS-011', 'SUS-012'],
    transactionType: 'structured'
  },
  {
    id: 'TXN-303',
    fromAccount: 'ACC-012',
    toAccount: 'ATM-WITHDRAWAL-KSP-STN',
    amount: 40000,
    currency: 'INR',
    date: '2026-01-20T13:00:00Z',
    suspicious: false,
    linkedSuspectIds: ['SUS-012'],
    transactionType: 'withdrawal'
  }
];

// Dynamically generate the remaining 16 transactions
const accounts = [
  'ACC-001', 'ACC-002', 'ACC-004', 'ACC-005', 'ACC-011', 'ACC-012',
  'SBIN-04921023', 'BOB-0023412', 'HDFC-88992314', 'ICICI-92314522'
];

for (let i = 10; i <= 25; i++) {
  const suspectId = `SUS-0${1 + (i % 6)}`;
  const amount = Math.floor(Math.random() * 80000) + 5000;
  const isSuspicious = amount > 45000 && i % 3 === 0;

  mockTransactions.push({
    id: `TXN-${i < 10 ? '0' : ''}${i}`,
    fromAccount: accounts[i % accounts.length],
    toAccount: accounts[(i + 3) % accounts.length],
    amount: amount,
    currency: 'INR',
    date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString(),
    suspicious: isSuspicious,
    linkedSuspectIds: [suspectId],
    transactionType: isSuspicious ? 'structured' : i % 2 === 0 ? 'transfer' : 'deposit'
  });
}
