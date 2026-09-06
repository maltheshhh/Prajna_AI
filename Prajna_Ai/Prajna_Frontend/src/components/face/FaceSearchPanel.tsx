import { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';
import { matchSuspectPhoto, BiometricMatchResult } from '@/utils/faceMatchingEngine';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { saveInvestigatorFaceScan, compressImageToDataUrl, getInvestigatorFaceHistory } from '@/utils/faceHistoryStorage';

interface FaceSearchPanelProps {
  isPublic?: boolean;
  onViewHistory?: () => void;
}

export function FaceSearchPanel({ isPublic = false, onViewHistory }: FaceSearchPanelProps) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const investigatorId = user?.id || user?.psId || 'OFF-INVESTIGATOR';
  const investigatorName = user?.name || 'Investigating Officer';
  const investigatorPsId = user?.psId || 'KA/BLR/C/HSR-001';
  const investigatorRank = user?.rank || 'Sub-Inspector';

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [results, setResults] = useState<{
    matched: boolean;
    matchResult: BiometricMatchResult | null;
  } | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [historyCount, setHistoryCount] = useState(0);
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  // Live camera capture (laptop webcam / external USB camera)
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync investigator history count
  useEffect(() => {
    if (!isPublic) {
      const existing = getInvestigatorFaceHistory(investigatorId);
      setHistoryCount(existing.length);
    }
  }, [investigatorId, isPublic]);

  const startScanning = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    setScanProgress(0);
    setResults(null);
    setLastSavedId(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) return 90;
        return prev + 15;
      });
    }, 120);

    try {
      const matchRes = await matchSuspectPhoto(selectedFile, selectedFile.name);
      clearInterval(interval);
      setScanProgress(100);

      // Compress thumbnail to persistent base64 data URL
      let persistentThumb = previewUrl || '';
      try {
        persistentThumb = await compressImageToDataUrl(selectedFile, 320, 320);
      } catch (err) {
        console.warn('Failed to compress thumbnail:', err);
      }

      // Automatically record scan to this specific investigator's history
      if (!isPublic) {
        const saved = saveInvestigatorFaceScan(investigatorId, {
          investigatorId,
          investigatorName,
          investigatorPsId,
          investigatorRank,
          fileName: selectedFile.name,
          fileSize: `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
          previewUrl: persistentThumb,
          status: matchRes.matched ? 'MATCH_FOUND' : 'NO_MATCH',
          confidence: matchRes.confidence,
          distanceScore: matchRes.distanceScore,
          matchedConvict: matchRes.matchedConvict
            ? {
                convict_id: matchRes.matchedConvict.convict_id,
                name: matchRes.matchedConvict.name,
                aliases: matchRes.matchedConvict.aliases,
                crime_type: matchRes.matchedConvict.crime_type,
                district: matchRes.matchedConvict.district,
                police_station: matchRes.matchedConvict.police_station,
                photo_url: matchRes.matchedConvict.photo_url,
                release_status: matchRes.matchedConvict.release_status,
                mo_signature: matchRes.matchedConvict.mo_signature,
                reward: matchRes.matchedConvict.reward,
                last_known_address: matchRes.matchedConvict.last_known_address,
                risk_tier: matchRes.matchedConvict.risk_tier,
              }
            : null,
          statusDescription: matchRes.statusDescription,
          biometricVector: matchRes.biometricVector,
        });
        setLastSavedId(saved.id);
        const updated = getInvestigatorFaceHistory(investigatorId);
        setHistoryCount(updated.length);
      }

      setTimeout(() => {
        setIsScanning(false);
        setResults({
          matched: matchRes.matched,
          matchResult: matchRes,
        });
      }, 300);
    } catch (err) {
      clearInterval(interval);
      setScanProgress(100);
      setIsScanning(false);
      console.warn('Face search error:', err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileUploaded(true);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileUploaded(true);
    }
  };

  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOpen(false);
    setCameraError(null);
  };

  const openCamera = async () => {
    setCameraError(null);
    setIsCameraLoading(true);
    setIsCameraOpen(true);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('unsupported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 960 }, facingMode: 'user' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err: unknown) {
      const name = (err as { name?: string })?.name;
      let message = 'Unable to access the camera.';
      if (name === 'NotAllowedError' || name === 'SecurityError') {
        message = 'Camera permission denied. Allow camera access for this site and retry.';
      } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
        message = 'No camera device found. Connect a webcam or USB camera and retry.';
      } else if (name === 'NotReadableError') {
        message = 'The camera is already in use by another application.';
      } else if ((err as Error)?.message === 'unsupported') {
        message = 'Camera access is not supported in this browser.';
      }
      setCameraError(message);
    } finally {
      setIsCameraLoading(false);
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `suspect_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFileUploaded(true);
      closeCamera();
    }, 'image/jpeg', 0.92);
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const resetSearch = () => {
    setFileUploaded(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResults(null);
    setScanProgress(0);
    setIsScanning(false);
    setLastSavedId(null);
  };

  return (
    <div className="w-full bg-white border border-[#E5DEC9] rounded-xl p-6 dark:bg-[#0B2E59] dark:border-ksp-navy-light shadow-xs font-sans text-xs">
      {/* Investigator Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b dark:border-gray-700 pb-3 mb-3 gap-2">
        <div className="flex items-center gap-2">
          <Lucide.ScanFace size={18} className="text-[#8B0000]" />
          <h3 className="text-sm font-black text-[#0B2E59] dark:text-sky-300 uppercase tracking-wide">
            {language === 'hi'
              ? 'जांचकर्ता तंत्रिका चेहरा पहचान एवं वेक्टर तुलना'
              : language === 'kn'
              ? 'ತನಿಖಾಧಿಕಾರಿ ನ್ಯೂರಲ್ ಮುಖ ಗುರುತಿಸುವಿಕೆ & ವೆಕ್ಟರ್ ಹೋಲಿಕೆ'
              : 'Investigator Neural Facial Identification & Vector Comparison'}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {!isPublic && (
            <span className="text-[10px] font-mono text-gray-500 bg-gray-100 dark:bg-slate-800 px-2.5 py-1 rounded font-bold flex items-center gap-1.5">
              <Lucide.UserCheck size={11} className="text-blue-500" />
              {language === 'hi' ? 'अधिकारी' : language === 'kn' ? 'ಅಧಿಕಾರಿ' : 'Officer'}: {investigatorName} ({investigatorPsId})
            </span>
          )}

          {!isPublic && onViewHistory && (
            <button
              type="button"
              onClick={onViewHistory}
              className="text-[10px] font-mono font-bold bg-[#071D3A] hover:bg-[#133D6B] text-amber-400 px-2.5 py-1 rounded border border-white/10 flex items-center gap-1 cursor-pointer transition"
            >
              <Lucide.History size={11} />
              <span>{language === 'hi' ? 'इतिहास' : language === 'kn' ? 'ಇತಿಹಾಸ' : 'History'} ({historyCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Mandatory Manual Police Verification Advisory Notice */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/70 rounded-lg p-3 mb-4 flex items-start gap-2.5 text-left shadow-2xs">
        <Lucide.AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-[11px] text-amber-900 dark:text-amber-200 leading-snug">
          <strong className="font-bold uppercase font-mono block text-amber-950 dark:text-amber-300 mb-0.5">
            {language === 'hi'
              ? '⚠️ अनिवार्य प्रोटोकॉल: प्रत्यक्ष पुलिस सत्यापन आवश्यक है'
              : language === 'kn'
              ? '⚠️ ಕಡ್ಡಾಯ ಶಿಷ್ಟಾಚಾರ: ಹಸ್ತಚಾಲಿತ ಪರಿಶೀಲನೆ ಅತ್ಯಗತ್ಯ'
              : '⚠️ Mandatory Protocol: Manual Verification is Necessary'}
          </strong>
          {language === 'hi'
            ? 'एआई चेहरा विश्लेषण गलत परिणाम या भ्रामक मिलान दे सकता है। कानूनी कार्रवाई या गिरफ्तारी शुरू करने से पहले प्रत्यक्ष पुलिस सत्यापन एवं स्वतंत्र साक्ष्य अनिवार्य हैं।'
            : language === 'kn'
            ? 'ಎಐ ಮುಖ ವಿಶ್ಲೇಷಣೆಯು ತಪ್ಪು ಫಲಿತಾಂಶಗಳು ಅಥವಾ ಅಸಮರ್ಪಕ ಹೊಂದಾಣಿಕೆಯನ್ನು ನೀಡಬಹುದು. ಕಾನೂನು ಕ್ರಮ ಅಥವಾ ಬಂಧನವನ್ನು ಪ್ರಾರಂಭಿಸುವ ಮೊದಲು ಪೊಲೀಸ್ ಕ್ಷೇತ್ರ ಪರಿಶೀಲನೆ ಮತ್ತು ಸಾಕ್ಷ್ಯಗಳು ಕಡ್ಡಾಯ.'
            : 'AI face analysis can produce incorrect results or false matches. Physical police verification and independent corroborating evidence are strictly mandatory before initiating legal action or arrest.'}
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      {!fileUploaded && !isScanning && !isCameraOpen && (
        <>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#E2DBC8] hover:border-[#0B2E59] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer bg-[#FAF6F0]/40 hover:bg-[#FAF6F0]/80 dark:bg-[#071D3A]/40 dark:border-ksp-navy-light transition block text-center"
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileInput} 
              className="hidden" 
            />
            <Lucide.UploadCloud className="h-10 w-10 text-gray-500 mb-3 mx-auto" />
            <span className="font-bold text-gray-800 dark:text-gray-200 text-center uppercase tracking-wide block">
              {language === 'hi'
                ? 'संदिग्ध तस्वीर यहां खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें'
                : language === 'kn'
                ? 'ಶಂಕಿತರ ಭಾವಚಿತ್ರವನ್ನು ಇಲ್ಲಿ ಎಳೆಯಿರಿ ಮತ್ತು ಬಿಡಿ ಅಥವಾ ಅನ್ವೇಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ'
                : 'Drag & drop suspect photograph here or click to browse'}
            </span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 block">
              {language === 'hi'
                ? 'JPG, PNG प्रारूप (5MB तक) • 10 पंजीकृत केएसपी अपराधियों के विरुद्ध बायोमेट्रिक खोज (कटऑफ: 0.50)'
                : language === 'kn'
                ? 'JPG, PNG ಮಾದರಿಗಳು (5MB ವರೆಗೆ) • 10 ನೋಂದಾಯಿತ ಕೆಎಸ್‌ಪಿ ಅಪರಾಧಿಗಳ ವಿರುದ್ಧ ಬಯೋಮೆಟ್ರಿಕ್ ಶೋಧನೆ (ಮಿತಿ: 0.50)'
                : 'Accepts JPG, PNG formats up to 5MB • Biometric search against 10 registered KSP convict mugshots (Cutoff: 0.50)'}
            </span>
          </label>

          <button
            type="button"
            onClick={openCamera}
            className="w-full mt-3 flex items-center justify-center gap-2 border border-[#0B2E59] dark:border-sky-300/40 text-[#0B2E59] dark:text-sky-300 hover:bg-[#0B2E59]/5 dark:hover:bg-sky-300/10 rounded-lg py-2.5 text-[11px] font-bold uppercase tracking-wide cursor-pointer transition"
          >
            <Lucide.Camera className="h-4 w-4" />
            {language === 'hi'
              ? 'लाइव कैमरे से कैप्चर करें'
              : language === 'kn'
              ? 'ಲೈವ್ ಕ್ಯಾಮೆರಾದಿಂದ ಸೆರೆಹಿಡಿಯಿರಿ'
              : 'Capture from live camera'}
          </button>
        </>
      )}

      {/* Live Camera Capture Panel (laptop webcam / external USB camera) */}
      {isCameraOpen && (
        <div className="rounded-xl border border-[#E2DBC8] dark:border-ksp-navy-light bg-black overflow-hidden">
          <div className="relative w-full aspect-video flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`h-full w-full object-contain ${!cameraError ? 'block' : 'hidden'}`}
            />
            {cameraError && (
              <div className="flex flex-col items-center gap-2 text-center px-6 py-10">
                <Lucide.AlertTriangle className="h-7 w-7 text-red-400" />
                <p className="text-[11px] font-mono text-red-300 max-w-xs">{cameraError}</p>
              </div>
            )}
            {isCameraLoading && !cameraError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Lucide.Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 p-3 bg-[#071D3A]">
            <button
              type="button"
              onClick={closeCamera}
              className="px-3 py-2 rounded-lg text-[11px] font-bold uppercase text-gray-300 hover:bg-white/10 cursor-pointer transition"
            >
              {language === 'hi' ? 'रद्द करें' : language === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={capturePhoto}
              disabled={!!cameraError || isCameraLoading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-black uppercase bg-[#FF9F1C] hover:bg-[#e88f10] disabled:opacity-40 disabled:cursor-not-allowed text-[#071D3A] cursor-pointer transition"
            >
              <Lucide.Camera className="h-4 w-4" />
              {language === 'hi' ? 'फोटो लें' : language === 'kn' ? 'ಫೋಟೋ ತೆಗೆಯಿರಿ' : 'Capture photo'}
            </button>
          </div>
        </div>
      )}

      {/* File Uploaded status */}
      {fileUploaded && !isScanning && !results && (
        <div className="border border-[#E5DEC9] rounded-xl p-6 bg-white flex flex-col items-center dark:bg-[#071D3A] dark:border-ksp-navy-light">
          <div className="relative h-28 w-28 rounded-lg overflow-hidden bg-gray-100 dark:bg-black flex items-center justify-center border mb-3 shadow-inner">
            {previewUrl ? (
              <img src={previewUrl} alt="Suspect Preview" className="h-full w-full object-cover" />
            ) : (
              <Lucide.UserCheck className="h-10 w-10 text-[#0B2E59] dark:text-sky-300" />
            )}
            <span className="absolute top-1 right-1 bg-[#0E7A0D] text-white rounded-full p-0.5 shadow">
              <Lucide.Check className="h-3 w-3" />
            </span>
          </div>
          <span className="font-mono font-bold text-gray-800 dark:text-gray-100">
            {selectedFile ? selectedFile.name : 'SUSPECT_PHOTO_EVIDENCE.JPG'}
          </span>
          <span className="text-[10px] text-gray-500 mb-4 mt-0.5 font-mono">
            {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB'} • Ready for Face Matching
          </span>

          <div className="flex gap-3 w-full max-w-xs">
            <button
              type="button"
              onClick={resetSearch}
              className="w-1/3 py-2 border border-gray-300 text-gray-600 font-bold rounded-lg hover:bg-gray-50 dark:border-ksp-navy-light dark:text-white cursor-pointer"
            >
              REMOVE
            </button>
            <button
              type="button"
              onClick={startScanning}
              className="flex-1 py-2 bg-[#0B2E59] text-white font-bold rounded-lg hover:bg-[#133D6B] flex items-center justify-center gap-1 shadow cursor-pointer uppercase"
            >
              <Lucide.Cpu className="h-4 w-4 text-amber-400" /> 
              RUN BIOMETRIC SEARCH
            </button>
          </div>
        </div>
      )}

      {/* Scanning animation */}
      {isScanning && (
        <div className="border border-[#E5DEC9] rounded-xl p-8 flex flex-col items-center justify-center bg-white dark:bg-[#071D3A] dark:border-ksp-navy-light">
          <Lucide.Loader className="h-10 w-10 text-[#0B2E59] dark:text-sky-300 animate-spin mb-4" />
          <span className="font-mono font-bold text-[#0B2E59] dark:text-sky-300 uppercase tracking-widest text-center">
            KSP NEURAL FACE EMBEDDING INFERENCE ({scanProgress}%)
          </span>
          
          <div className="w-full max-w-xs bg-gray-100 h-2.5 rounded-full overflow-hidden mt-3 dark:bg-black">
            <div className="bg-[#0B2E59] h-full transition-all duration-300" style={{ width: `${scanProgress}%` }} />
          </div>
          <span className="text-[9px] text-gray-500 mt-2 font-mono">
            Comparing 128-dimensional facial vectors across 10 registered KSP convict records (Strict Cutoff &lt; 0.50)...
          </span>
        </div>
      )}

      {/* Results View */}
      {results && results.matchResult && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#0B2E59] dark:text-sky-300 uppercase flex items-center gap-1.5">
                <Lucide.CheckCircle className="h-4 w-4 text-[#0E7A0D]" />
                KSP Biometric Facial Recognition Audit Result
              </span>
              {lastSavedId && !isPublic && (
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 border border-green-300 dark:border-green-800 flex items-center gap-1">
                  <Lucide.Check size={10} /> Saved to Vault ({lastSavedId})
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {!isPublic && onViewHistory && (
                <button
                  type="button"
                  onClick={onViewHistory}
                  className="text-xs font-bold text-[#0B2E59] dark:text-sky-300 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Lucide.History className="h-3.5 w-3.5" /> View Search History ({historyCount})
                </button>
              )}
              <button
                type="button"
                onClick={resetSearch}
                className="text-xs font-bold text-[#8B0000] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Lucide.RotateCcw className="h-3.5 w-3.5" /> Scan Another Image
              </button>
            </div>
          </div>

          {results.matched && results.matchResult.matchedConvict ? (
            /* ✅ POSITIVE VERIFIED CONVICT MATCH */
            <div className="rounded-xl border-2 border-[#8B0000] bg-red-50/40 dark:bg-red-950/30 p-5 space-y-4 text-left shadow-md">
              <div className="flex items-center justify-between border-b border-red-200 dark:border-red-900/50 pb-2">
                <span className="bg-[#8B0000] text-white font-mono text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                  VERIFIED BIOMETRIC CONVICT MATCH IDENTIFIED ({results.matchResult.confidence}% CONFIDENCE)
                </span>
                <span className="font-mono text-[10px] font-bold text-gray-600 dark:text-gray-300">
                  Cutoff: Vector Distance &lt; 0.50
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Evidence Image */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="text-[9px] font-mono font-bold text-gray-500 uppercase">Uploaded Evidence</span>
                  <div className="relative h-28 w-28 rounded-lg overflow-hidden border border-blue-400 bg-black shadow">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Uploaded Evidence" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-mono text-[9px] text-gray-400">Photo</div>
                    )}
                    <span className="absolute top-1 left-1 bg-blue-700 text-white font-mono text-[8px] font-bold px-1 rounded">
                      QUERY
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden sm:flex items-center justify-center pt-8 text-red-500">
                  <Lucide.ArrowRight size={20} />
                </div>

                {/* Matched Convict Image */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <span className="text-[9px] font-mono font-bold text-red-700 dark:text-red-400 uppercase">Matched Mugshot</span>
                  <div className="relative h-28 w-28 rounded-lg overflow-hidden border-2 border-[#8B0000] bg-black shadow">
                    <img
                      src={results.matchResult.matchedConvict.photo_url}
                      alt={results.matchResult.matchedConvict.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-1 right-1 bg-red-800 text-white font-mono text-[8px] font-bold px-1 rounded">
                      {results.matchResult.matchedConvict.convict_id}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-left flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="text-lg font-black text-[#0B2E59] dark:text-white">
                      {results.matchResult.matchedConvict.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/80 px-2 py-0.5 rounded">
                      Aliases: {results.matchResult.matchedConvict.aliases?.join(', ') || 'N/A'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 pt-1">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Crime Classification</span>
                      <span>{results.matchResult.matchedConvict.crime_type}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Modus Operandi (MO)</span>
                      <span className="text-[11px] line-clamp-2">{results.matchResult.matchedConvict.mo_signature || 'Targeted commercial and residential areas'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Jurisdiction Police Station</span>
                      <span>{results.matchResult.matchedConvict.police_station} ({results.matchResult.matchedConvict.district})</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Last Known Address</span>
                      <span className="text-[11px]">{results.matchResult.matchedConvict.last_known_address || 'Karnataka'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Current Legal Status</span>
                      <span className="text-amber-700 dark:text-amber-400 font-bold">{results.matchResult.matchedConvict.release_status}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block uppercase">Vector Distance & Cutoff</span>
                      <span className="font-mono font-bold text-red-700 dark:text-red-400">{results.matchResult.distanceScore} (Strict Cutoff &lt; 0.50)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-black/40 p-3 rounded-lg border border-red-200 dark:border-red-900/40 text-[11px] font-mono text-gray-800 dark:text-gray-200 flex justify-between items-center">
                <div><strong>Telemetry:</strong> {results.matchResult.statusDescription}</div>
                <div className="text-red-700 dark:text-red-400 font-bold">Reward: {results.matchResult.matchedConvict.reward || '₹1,00,000'}</div>
              </div>
            </div>
          ) : (
            /* ❌ NO BIOMETRIC MATCH IN 10 CONVICT ROSTER */
            <div className="rounded-xl border-2 border-amber-400 bg-amber-50/40 dark:bg-slate-900 p-6 text-center space-y-3 shadow-md">
              <Lucide.AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
              <div>
                <h4 className="text-base font-black text-gray-900 dark:text-white uppercase font-mono tracking-wide">
                  NO BIOMETRIC MATCH IN 10 CONVICT ROSTER
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 max-w-lg mx-auto">
                  {results.matchResult.statusDescription}
                </p>
              </div>

              <div className="bg-white dark:bg-black/40 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40 inline-block font-mono text-xs text-amber-900 dark:text-amber-300 font-bold">
                Facial Vector Distance: {results.matchResult.distanceScore} (Required Cutoff &lt; 0.50 for positive identity verification)
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
