import React from 'react';
import { Shield, Sparkles, Cpu, Award } from 'lucide-react';

/**
 * Intelligent gender detection based on officer name, rank, or explicit profile attribute
 */
export function detectOfficerGender(name: string = '', explicitGender?: string): 'male' | 'female' {
  if (explicitGender) {
    const g = explicitGender.toLowerCase();
    if (g.startsWith('f') || g === 'woman' || g === 'female') return 'female';
    return 'male';
  }

  const lower = name.toLowerCase();
  const femaleKeywords = [
    'smt', 'mrs', 'ms', 'miss', 'kumari', 'priya', 'ananya', 'deepa', 'kavitha', 
    'lakshmi', 'pooja', 'shweta', 'sunita', 'rekha', 'anjali', 'radha', 'nisha', 
    'geetha', 'roopa', 'soumya', 'divya', 'asha', 'meena', 'suma', 'kavya', 
    'bhavana', 'swathi', 'neha', 'preeti', 'archana', 'vidya', 'rani', 'woman', 
    'female', 'lady', 'inspector deepa', 'si priya', 'dsp lakshmi'
  ];

  const words = lower.split(/[\s,._-]+/);
  if (words.some(w => femaleKeywords.includes(w)) || femaleKeywords.some(k => lower.includes(k))) {
    return 'female';
  }

  return 'male';
}

/**
 * Professional Female Prajna AI Assistant Avatar
 * Matches the exact construction, dignity, and animation of the Police Officer avatar.
 */
export function PrajnaLadyAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';

  return (
    <div className={`relative ${dim} shrink-0 select-none group`}>
      {/* Subtle Officer Gold/Navy Ring (Matches Police Avatar) */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-amber-600/40 via-blue-950 to-slate-800 opacity-70 group-hover:opacity-100 transition duration-300" />
      
      {/* Container Circle */}
      <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-500/70 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0A0E17] flex items-center justify-center shadow-sm">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <circle cx="50" cy="50" r="46" fill="url(#prajnaLadyBgGrad)" />

          {/* Female Intelligence Officer Uniform Body (Deep KSP Navy Tunic with Gold Trim) */}
          <path d="M12 100 C12 74 28 68 50 68 C72 68 88 74 88 100 Z" fill="#0B2E59" />
          
          {/* Navy Collar & Gold Lapels */}
          <path d="M34 68 L50 85 L66 68 Z" fill="#1E3A8A" />
          <path d="M35 69 L50 84 L65 69" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M46 70 L50 96 L54 70 Z" fill="#7F1D1D" />

          {/* Shoulder Star Epaulettes (Brass Gold) */}
          <path d="M22 75 L30 79 L25 85 L18 80 Z" fill="#071E3A" stroke="#D4AF37" strokeWidth="0.75" />
          <circle cx="24" cy="80" r="2" fill="#FDE047" />
          <path d="M78 75 L70 79 L75 85 L82 80 Z" fill="#071E3A" stroke="#D4AF37" strokeWidth="0.75" />
          <circle cx="76" cy="80" r="2" fill="#FDE047" />

          {/* Neck */}
          <rect x="44" y="55" width="12" height="15" rx="3" fill="#E2B184" />

          {/* Elegant Female Officer Head Silhouette */}
          <path
            d="M34 38 C34 26 66 26 66 38 C66 52 59 62 50 62 C41 62 34 52 34 38 Z"
            fill="#E2B184"
          />

          {/* Sleek Professional Dark Hair Framing & Bun */}
          <path
            d="M26 44 C24 24 36 14 50 14 C64 14 76 24 74 44 C70 30 62 22 50 22 C38 22 30 30 26 44 Z"
            fill="#18181B"
          />
          <path d="M28 38 C26 50 32 60 34 60 C33 50 32 42 35 34 Z" fill="#18181B" />
          <path d="M72 38 C74 50 68 60 66 60 C67 50 68 42 65 34 Z" fill="#18181B" />

          {/* Refined Bindi */}
          <circle cx="50" cy="34" r="1.5" fill="#991B1B" />

          {/* Gold Earring Studs */}
          <circle cx="31" cy="46" r="1.2" fill="#F59E0B" />
          <circle cx="69" cy="46" r="1.2" fill="#F59E0B" />

          {/* Definitions */}
          <defs>
            <linearGradient id="prajnaLadyBgGrad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B1B32" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Matching Duty Active AI Intelligence Badge (Matches Police Shield Badge) */}
      <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-[#0B2545] text-amber-400 border border-amber-500/80 shadow-xs">
        <Sparkles size={9} />
      </div>
    </div>
  );
}

/**
 * Dignified Karnataka State Police Officer Avatar
 * Clean, Authoritative Officer Crest with KSP Peak Cap & Brass Epaulettes (No cartoon features)
 */
export function PoliceOfficerAvatar({
  gender = 'male',
  size = 'md'
}: {
  gender?: 'male' | 'female';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const isFemale = gender === 'female';

  return (
    <div className={`relative ${dim} shrink-0 select-none group`}>
      {/* Subtle Officer Gold Ring */}
      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-amber-700/40 via-slate-800 to-amber-900/40 opacity-70 group-hover:opacity-100 transition duration-300" />

      {/* Container Circle */}
      <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-600/70 bg-gradient-to-b from-[#1E293B] via-[#0F172A] to-[#0A0E17] flex items-center justify-center shadow-sm">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background */}
          <circle cx="50" cy="50" r="46" fill="url(#officerBgGrad)" />

          {/* Officer Uniform Body (Authentic Khaki Tunics with Crisp Lapels) */}
          <path d="M12 100 C12 74 28 68 50 68 C72 68 88 74 88 100 Z" fill="#9C7838" />
          
          {/* Khaki Collar & Neck Tie */}
          <path d="M34 68 L50 85 L66 68 Z" fill="#7C5D24" />
          <path d="M46 70 L50 96 L54 70 Z" fill="#7F1D1D" />

          {/* Shoulder Star Epaulettes (Brass Gold) */}
          <path d="M22 75 L30 79 L25 85 L18 80 Z" fill="#4B3A18" stroke="#D4AF37" strokeWidth="0.75" />
          <circle cx="24" cy="80" r="2" fill="#FDE047" />
          <path d="M78 75 L70 79 L75 85 L82 80 Z" fill="#4B3A18" stroke="#D4AF37" strokeWidth="0.75" />
          <circle cx="76" cy="80" r="2" fill="#FDE047" />

          {/* Neck */}
          <rect x="44" y="55" width="12" height="15" rx="3" fill="#D4A373" />

          {/* Minimalist, Clean Officer Head Silhouette (No Cartoon Face) */}
          <path
            d="M34 38 C34 26 66 26 66 38 C66 52 59 62 50 62 C41 62 34 52 34 38 Z"
            fill="#E2B184"
          />

          {isFemale ? (
            /* Female Officer Neat Bun Outline */
            <path d="M30 36 C30 48 35 56 35 56 C33 48 33 42 36 34 Z" fill="#1C1917" />
          ) : null}

          {/* Official Karnataka State Police Peak Cap */}
          {/* Cap Crown (Deep KSP Navy Blue) */}
          <path d="M20 28 C22 10 78 10 80 28 Z" fill="#0B2545" stroke="#081A30" strokeWidth="1" />
          
          {/* Cap Peak / Visor (Polished Black) */}
          <path d="M16 28 Q50 34 84 28 Q50 22 16 28 Z" fill="#0F172A" />

          {/* Official KSP Red & Blue Cap Ribbon */}
          <path d="M22 26 Q50 30 78 26" stroke="#991B1B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M22 23.5 Q50 27.5 78 23.5" stroke="#1D4ED8" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Brass Ashoka / Police Cap Badge */}
          <path d="M50 14 L53 20 L50 23 L47 20 Z" fill="#F59E0B" />
          <circle cx="50" cy="18" r="2.5" fill="#FDE047" />
          <circle cx="50" cy="18" r="1" fill="#78350F" />

          {/* Definitions */}
          <defs>
            <linearGradient id="officerBgGrad" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Duty Active Shield Badge (Warm Brass & Navy, No Neon) */}
      <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-[#0B2545] text-amber-400 border border-amber-500/80 shadow-xs">
        <Shield size={9} />
      </div>
    </div>
  );
}