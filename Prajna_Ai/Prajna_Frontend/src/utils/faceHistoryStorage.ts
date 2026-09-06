import { FaceSearchHistoryRecord } from '@/types';

/**
 * Derives a strictly isolated localStorage key per investigator.
 * Prevents history of one investigator from ever merging or leaking into another.
 */
export function getInvestigatorStorageKey(investigatorId: string): string {
  const sanitizedId = (investigatorId || 'USR-001')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '_');
  return `ksp_face_search_history_${sanitizedId}`;
}

/**
 * Retrieves scan history for a specific investigator only.
 */
export function getInvestigatorFaceHistory(investigatorId: string): FaceSearchHistoryRecord[] {
  try {
    const key = getInvestigatorStorageKey(investigatorId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(`[FaceHistoryStorage] Failed to read history for ${investigatorId}:`, error);
    return [];
  }
}

/**
 * Saves a new biometric analysis scan for the specified investigator.
 * Inserts newest scans first (LIFO order).
 */
export function saveInvestigatorFaceScan(
  investigatorId: string,
  record: Omit<FaceSearchHistoryRecord, 'id' | 'timestamp' | 'formattedDate'>
): FaceSearchHistoryRecord {
  const timestamp = new Date().toISOString();
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date());

  const newRecord: FaceSearchHistoryRecord = {
    ...record,
    id: `SCAN-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`,
    investigatorId,
    timestamp,
    formattedDate,
  };

  try {
    const key = getInvestigatorStorageKey(investigatorId);
    const existing = getInvestigatorFaceHistory(investigatorId);
    // Keep up to 100 most recent records per investigator
    const updated = [newRecord, ...existing.filter((item) => item.id !== newRecord.id)].slice(0, 100);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error(`[FaceHistoryStorage] Failed to save scan for ${investigatorId}:`, error);
  }

  return newRecord;
}

/**
 * Deletes a single history record for a specific investigator.
 */
export function deleteInvestigatorFaceScan(investigatorId: string, recordId: string): void {
  try {
    const key = getInvestigatorStorageKey(investigatorId);
    const existing = getInvestigatorFaceHistory(investigatorId);
    const updated = existing.filter((item) => item.id !== recordId);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.error(`[FaceHistoryStorage] Failed to delete scan ${recordId} for ${investigatorId}:`, error);
  }
}

/**
 * Clears ALL search history belonging exclusively to the given investigator.
 */
export function clearInvestigatorFaceHistory(investigatorId: string): void {
  try {
    const key = getInvestigatorStorageKey(investigatorId);
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[FaceHistoryStorage] Failed to clear history for ${investigatorId}:`, error);
  }
}

/**
 * Compresses an uploaded image file into a compact base64 data URL for persistent offline thumbnail storage.
 */
export function compressImageToDataUrl(file: File | Blob, maxWidth = 320, maxHeight = 320): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
          return;
        }
        resolve(e.target?.result as string);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}
