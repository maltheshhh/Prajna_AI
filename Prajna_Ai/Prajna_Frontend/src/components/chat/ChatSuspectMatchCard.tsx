import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuspectMatchCardData } from '@/types';
import * as Lucide from 'lucide-react';

interface ChatSuspectMatchCardProps {
  match: SuspectMatchCardData;
}

export function ChatSuspectMatchCard({ match }: ChatSuspectMatchCardProps) {
  const navigate = useNavigate();
  const [showVectors, setShowVectors] = useState(false);

  const getRiskTierBadge = (tier: string) => {
    const lower = (tier || '').toLowerCase();
    if (lower === 'high' || lower === 'critical') {
      return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30';
    }
    if (lower === 'medium') {
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
    }
    return 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30';
  };

  const getReleaseStatusBadge = (status?: string) => {
    const lower = (status || '').toLowerCase();
    if (lower.includes('wanted') || lower.includes('absconder')) {
      return 'bg-red-600 text-white animate-pulse';
    }
    if (lower.includes('custody')) {
      return 'bg-blue-600 text-white';
    }
    return 'bg-amber-600 text-white';
  };

  return (
    <div className="my-3 overflow-hidden rounded-2xl border-2 border-[#0B2E59]/30 dark:border-sky-500/40 bg-gradient-to-b from-white to-sky-50/40 dark:from-[#081224] dark:to-[#040814] shadow-md">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-sky-100 dark:border-blue-900/60 bg-[#0B2E59] dark:bg-[#06142a] px-4 py-2.5 text-white">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF9F1C] text-[#071D3A]">
            <Lucide.ScanFace size={16} />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              CCTNS Biometric Convict Match Identified
            </h4>
            <p className="text-[10px] text-blue-200 font-mono">
              Database: Karnataka SCRB 10-Convict Biometric Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-300">
          <Lucide.CheckCircle2 size={13} className="text-emerald-400" />
          <span>{match.confidence.toFixed(1)}% Match</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Photo Comparison & Key Identity Box */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {/* Dual Photo Comparison */}
          <div className="flex gap-2 shrink-0">
            {match.uploadedPhotoUrl && (
              <div className="flex flex-col items-center">
                <div className="relative h-28 w-24 overflow-hidden rounded-xl border border-sky-300 dark:border-sky-700 bg-gray-100 dark:bg-gray-800 shadow-xs">
                  <img
                    src={match.uploadedPhotoUrl}
                    alt="Uploaded query"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-center font-mono text-white py-0.5 uppercase font-bold">
                    Uploaded
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center">
              <div className="relative h-28 w-24 overflow-hidden rounded-xl border-2 border-red-500 bg-gray-100 dark:bg-gray-800 shadow-sm">
                <img
                  src={match.photo_url}
                  alt={match.name}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#0B2E59]/90 text-[8px] text-center font-mono text-amber-300 py-0.5 uppercase font-bold">
                  CCTNS Match
                </span>
              </div>
            </div>
          </div>

          {/* Suspect Meta Details */}
          <div className="min-w-0 flex-1 space-y-1.5 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm md:text-base font-extrabold text-[#0B2E59] dark:text-white">
                {match.name}
              </h3>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#0B2E59] dark:text-sky-300 border border-blue-200 dark:border-blue-900">
                {match.convict_id}
              </span>
              {match.release_status && (
                <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${getReleaseStatusBadge(match.release_status)}`}>
                  {match.release_status}
                </span>
              )}
            </div>

            {/* Aliases */}
            {match.aliases && match.aliases.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                <span className="text-gray-500 dark:text-gray-400 font-semibold">Aliases:</span>
                {match.aliases.map((alias, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.2 font-mono text-gray-700 dark:text-gray-300"
                  >
                    "{alias}"
                  </span>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-1 border-t border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Police Station: </span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{match.police_station}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">District: </span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{match.district}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Risk Tier: </span>
                <span className={`font-bold px-1.5 py-0.2 rounded border text-[10px] uppercase font-mono ${getRiskTierBadge(match.risk_tier)}`}>
                  {match.risk_tier} Risk
                </span>
              </div>
              {match.reward && (
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Bounty / Reward: </span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{match.reward}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Crime Type & Modus Operandi */}
        <div className="rounded-xl bg-gray-50 dark:bg-[#071224] p-2.5 text-left border border-gray-100 dark:border-blue-950/60 space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#8B0000] dark:text-rose-400">
            <Lucide.AlertCircle size={13} />
            <span>Primary Crime Category: {match.crime_type}</span>
          </div>
          <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
            <strong className="text-gray-700 dark:text-gray-200">Modus Operandi: </strong>
            {match.mo_signature}
          </p>
        </div>

        {/* Linked FIRs Section */}
        {match.linked_firs && match.linked_firs.length > 0 && (
          <div className="text-left space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Lucide.FileText size={12} className="text-sky-500" />
              Connected CCTNS Case Diaries ({match.linked_firs.length} Linked FIRs):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {match.linked_firs.map((fir, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-50 dark:bg-blue-950/60 border border-sky-200 dark:border-sky-800 px-2 py-1 text-[11px] font-mono font-bold text-[#0B2E59] dark:text-sky-300 shadow-xs"
                >
                  <Lucide.FileSpreadsheet size={12} className="text-[#8B0000]" />
                  {fir}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Biometric Feature Embedding Accordion */}
        {match.biometricVector && (
          <div className="border-t border-gray-100 dark:border-gray-800 pt-2 text-left">
            <button
              type="button"
              onClick={() => setShowVectors(!showVectors)}
              className="flex items-center gap-1 text-[10px] font-bold text-sky-700 dark:text-sky-400 hover:underline cursor-pointer"
            >
              {showVectors ? <Lucide.ChevronUp size={13} /> : <Lucide.ChevronDown size={13} />}
              <span>{showVectors ? 'Hide Neural Face Vectors' : 'View ResNet-128 Biometric Vectors & Distance Score'}</span>
            </button>

            {showVectors && (
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-xl bg-gray-50 dark:bg-[#050c18] p-2.5 font-mono text-[10px] border border-gray-200 dark:border-blue-900/40">
                <div>
                  <span className="text-gray-400 block">Orbital Ratio:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{match.biometricVector.orbitalRatio}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Nasal Curvature:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{match.biometricVector.nasalCurvature}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Jawline Embedding:</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{match.biometricVector.jawlineEmbedding}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Distance Score:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{match.biometricVector.distanceScore}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Directives Quick Nav */}
        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={() => navigate('/face-search')}
            className="flex items-center gap-1.5 rounded-lg bg-[#0B2E59] hover:bg-[#133D6B] dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 px-3 py-1.5 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Lucide.ScanFace size={13} />
            <span>Open in AI Face Search</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/offender-profiling')}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-blue-900/60 bg-white dark:bg-[#0c182e] hover:bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 transition shadow-xs cursor-pointer"
          >
            <Lucide.UserSearch size={13} className="text-sky-500" />
            <span>Offender Profiling</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/network')}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-blue-900/60 bg-white dark:bg-[#0c182e] hover:bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 dark:text-gray-200 transition shadow-xs cursor-pointer"
          >
            <Lucide.Network size={13} className="text-amber-500" />
            <span>Criminal Network</span>
          </button>
        </div>
      </div>
    </div>
  );
}
