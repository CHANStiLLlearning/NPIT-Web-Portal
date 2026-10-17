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

export { app, db, storage, auth, appCheck };
