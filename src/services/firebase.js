import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

// Check if valid Firebase configuration is provided
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.apiKey !== 'your_api_key_here'
);

export const AUTHORIZED_ADMIN_EMAILS = [
  'admin@npit.edu.kh',
  'reactjs35@gmail.com',
  'kimchankeo1234@gmail.com'
];

/**
 * Check if a given user object or email string is an authorized NPIT administrator
 * @param {Object|string} userOrEmail 
 * @returns {boolean}
 */
export function isAuthorizedAdmin(userOrEmail) {
  if (!userOrEmail) return false;
  const email = typeof userOrEmail === 'string' ? userOrEmail : userOrEmail?.email;
  if (!email) return false;
  return AUTHORIZED_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

let app = null;
let db = null;
let storage = null;
let auth = null;
let appCheck = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    storage = getStorage(app);
    auth = getAuth(app);

    // Optional Firebase App Check (reCAPTCHA v3) integration
    const appCheckSiteKey = import.meta.env.VITE_FIREBASE_RECAPTCHA_SITE_KEY || '';
    if (appCheckSiteKey && typeof window !== 'undefined') {
      try {
        if (import.meta.env.DEV) {
          self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        }
        appCheck = initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(appCheckSiteKey),
          isTokenAutoRefreshEnabled: true
        });
        console.log('[NPIT Firebase] Firebase App Check initialized successfully.');
      } catch (acErr) {
        console.warn('[NPIT Firebase] App Check initialization skipped:', acErr.message);
      }
    }

    console.log('[NPIT Firebase] Cloud Firestore, Storage & Auth initialized successfully.');
  } catch (error) {
    console.warn('[NPIT Firebase] Failed to initialize Firebase:', error);
    app = null;
    db = null;
    storage = null;
    auth = null;
  }
} else {
  console.info('[NPIT Firebase] Running in resilient offline mode (localStorage persistence). To enable live cloud sync, configure .env with your Firebase project keys.');
}

/**
 * Perform a live health check on Firebase services (Firestore, Auth, Storage)
 * @returns {Promise<{online: boolean, firestore: boolean, auth: boolean, storage: boolean, latencyMs: number, projectId: string, message: string}>}
 */
export async function checkFirebaseHealth() {
  const start = Date.now();
  if (!isFirebaseConfigured || !db) {
    return {
      online: false,
      firestore: false,
      auth: false,
      storage: false,
      latencyMs: 0,
      projectId: firebaseConfig.projectId || 'offline',
      message: 'Firebase is running in local offline resilience mode.'
    };
  }

  try {
    const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
    // Test write and read to a health ping document
    const pingRef = doc(db, 'health', 'ping');
    await setDoc(pingRef, { lastPing: serverTimestamp() }, { merge: true });
    await getDoc(pingRef);
    const latency = Date.now() - start;

    return {
      online: true,
      firestore: true,
      auth: Boolean(auth),
      storage: Boolean(storage),
      latencyMs: latency,
      projectId: firebaseConfig.projectId,
      message: `Cloud Firestore online (${latency}ms latency). Project: ${firebaseConfig.projectId}`
    };
  } catch (err) {
    console.warn('[NPIT Firebase] Live health ping check error:', err);
    return {
      online: false,
      firestore: false,
      auth: Boolean(auth),
      storage: Boolean(storage),
      latencyMs: Date.now() - start,
      projectId: firebaseConfig.projectId,
      message: `Cloud connection warning: ${err?.message || 'Network error'}`
    };
  }
}

/**
 * Upload a media file (image/pdf) to Firebase Storage with resilient base64 fallback
 * @param {File} file 
 * @param {string} folder 'news' | 'programs' | 'banner' | 'media'
 * @returns {Promise<{url: string, path?: string, name: string, isCloud: boolean}>}
 */
export async function uploadMediaFile(file, folder = 'news') {
  if (!file) return { url: '', name: '', isCloud: false };

  // 1. Try Firebase Cloud Storage if online
  if (isFirebaseConfigured && storage) {
    try {
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `${folder}/${Date.now()}_${cleanFileName}`;
      const storageRef = ref(storage, storagePath);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type || 'image/jpeg',
        customMetadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString()
        }
      });

      const downloadUrl = await getDownloadURL(snapshot.ref);
      return {
        url: downloadUrl,
        path: storagePath,
        name: file.name,
        isCloud: true
      };
    } catch (storageErr) {
      console.warn(`[NPIT Firebase] Cloud Storage upload error for ${folder}, using local data URL:`, storageErr);
    }
  }

  // 2. Resilient fallback (data URL)
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result,
          name: file.name,
          isCloud: false
        });
      };
      reader.onerror = () => {
        resolve({ url: '', name: file.name, isCloud: false });
      };
      reader.readAsDataURL(file);
    } catch {
      resolve({ url: '', name: file.name, isCloud: false });
    }
  });
}

/**
 * Return safe public Firebase diagnostic information
 */
export function getFirebasePublicConfig() {
  return {
    projectId: firebaseConfig.projectId,
    authDomain: firebaseConfig.authDomain,
    storageBucket: firebaseConfig.storageBucket,
    isConfigured: isFirebaseConfigured,
    hasAuth: Boolean(auth),
    hasDb: Boolean(db),
    hasStorage: Boolean(storage)
  };
}

export { app, db, storage, auth, appCheck };

