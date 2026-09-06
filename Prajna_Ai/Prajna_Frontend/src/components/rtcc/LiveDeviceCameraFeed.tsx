import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Camera, RefreshCw, Video, VideoOff } from 'lucide-react';

interface CameraDevice {
  deviceId: string;
  label: string;
}

interface LiveDeviceCameraFeedProps {
  /** Extra classes applied to the outer viewport container. */
  className?: string;
}

/**
 * Renders a live video feed from the operator's own machine — a built-in
 * laptop webcam or any external USB camera the OS exposes — using the
 * browser MediaDevices API. This is real hardware video, not a simulated
 * feed, so it requires the user to grant camera permission in the browser.
 */
export function LiveDeviceCameraFeed({ className = '' }: LiveDeviceCameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
  }, []);

  const listDevices = useCallback(async () => {
    try {
      const all = await navigator.mediaDevices.enumerateDevices();
      const cams = all
        .filter((d) => d.kind === 'videoinput')
        .map((d, i) => ({ deviceId: d.deviceId, label: d.label || `Camera ${i + 1}` }));
      setDevices(cams);
      return cams;
    } catch {
      return [];
    }
  }, []);

  const startStream = useCallback(
    async (deviceId?: string) => {
      setError(null);
      setIsLoading(true);
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error('unsupported');
        }

        // Release any previous device before requesting a new one.
        streamRef.current?.getTracks().forEach((track) => track.stop());

        const constraints: MediaStreamConstraints = {
          video: deviceId
            ? { deviceId: { exact: deviceId }, width: { ideal: 1280 }, height: { ideal: 720 } }
            : { width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }

        setIsActive(true);

        // Device labels are only populated by the browser once permission
        // has been granted at least once, so refresh the list here.
        const cams = await listDevices();
        const activeSettings = stream.getVideoTracks()[0]?.getSettings();
        if (activeSettings?.deviceId) {
          setSelectedDeviceId(activeSettings.deviceId);
        } else if (cams.length && !selectedDeviceId) {
          setSelectedDeviceId(cams[0].deviceId);
        }
      } catch (err: unknown) {
        const name = (err as { name?: string })?.name;
        let message = 'Unable to access the camera.';
        if (name === 'NotAllowedError' || name === 'SecurityError') {
          message = 'Camera permission denied. Allow camera access for this site in your browser settings and retry.';
        } else if (name === 'NotFoundError' || name === 'OverconstrainedError') {
          message = 'No camera device found. Connect a webcam or USB camera and retry.';
        } else if (name === 'NotReadableError') {
          message = 'The camera is already in use by another application.';
        } else if ((err as Error)?.message === 'unsupported') {
          message = 'Camera access is not supported in this browser.';
        }
        setError(message);
        setIsActive(false);
      } finally {
        setIsLoading(false);
      }
    },
    [listDevices, selectedDeviceId]
  );

  useEffect(() => {
    listDevices();
    const handleDeviceChange = () => listDevices();
    navigator.mediaDevices?.addEventListener?.('devicechange', handleDeviceChange);
    return () => {
      navigator.mediaDevices?.removeEventListener?.('devicechange', handleDeviceChange);
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeviceSwitch = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    if (isActive) startStream(deviceId);
  };

  const activeLabel = devices.find((d) => d.deviceId === selectedDeviceId)?.label || 'Local Camera';

  return (
    <div className={`relative h-96 sm:h-[420px] w-full overflow-hidden bg-black flex items-center justify-center ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={`h-full w-full object-contain ${isActive ? 'block' : 'hidden'}`}
      />

      {!isActive && (
        <div className="flex flex-col items-center gap-3 text-center px-6">
          {error ? (
            <>
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <p className="text-xs font-mono text-red-300 max-w-xs">{error}</p>
            </>
          ) : (
            <>
              <Camera className="h-8 w-8 text-blue-300" />
              <p className="text-xs font-mono text-blue-200 max-w-xs">
                Connect a laptop webcam or external USB camera, then start the live feed. Your browser will ask
                for camera permission.
              </p>
            </>
          )}
          <button
            onClick={() => startStream(selectedDeviceId || undefined)}
            disabled={isLoading}
            className="mt-1 bg-[#FF9F1C] hover:bg-[#e88f10] disabled:opacity-50 text-[#071D3A] px-4 py-2 rounded-lg text-xs font-black uppercase font-mono flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Video className="h-3.5 w-3.5" />}
            {isLoading ? 'Requesting Access…' : 'Start Live Device Feed'}
          </button>
        </div>
      )}

      {isActive && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-mono pointer-events-auto">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE DEVICE FEED
            </div>
            <div className="text-gray-300">{activeLabel}</div>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            {devices.length > 1 && (
              <select
                value={selectedDeviceId}
                onChange={(e) => handleDeviceSwitch(e.target.value)}
                className="bg-black/70 text-white text-[11px] font-mono rounded-lg px-2 py-1.5 border border-white/15"
              >
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.label}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={stopStream}
              className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg cursor-pointer"
              title="Stop Live Feed"
            >
              <VideoOff className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
