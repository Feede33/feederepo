import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics only in production environment
export const analytics = import.meta.env.DEV ? null : getAnalytics(app);

// Connect to emulators in development mode
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  try {
    // Connect to Firebase emulators during development
    const authEmulatorUrl = import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL || 'http://localhost:9099';
    connectAuthEmulator(auth, authEmulatorUrl, { disableWarnings: true });
    
        const firestoreHost = import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_HOST || 'localhost:8081';
    const [firestoreHostname, firestorePort] = firestoreHost.split(':');
    connectFirestoreEmulator(db, firestoreHostname, parseInt(firestorePort, 10));
    
    const storageHost = import.meta.env.VITE_FIREBASE_STORAGE_EMULATOR_HOST || 'localhost:9199';
    const [storageHostname, storagePort] = storageHost.split(':');
    connectStorageEmulator(storage, storageHostname, parseInt(storagePort, 10));
    
    console.log('Firebase emulators connected successfully');
  } catch (error) {
    console.error('Failed to connect to Firebase emulators:', error);
  }
  
  // Log Firebase configuration for debugging
  console.log('Firebase initialized with config:', {
    apiKey: firebaseConfig.apiKey ? '✓ Set' : '✗ Missing',
    authDomain: firebaseConfig.authDomain ? '✓ Set' : '✗ Missing',
    projectId: firebaseConfig.projectId ? '✓ Set' : '✗ Missing',
    storageBucket: firebaseConfig.storageBucket ? '✓ Set' : '✗ Missing',
    messagingSenderId: firebaseConfig.messagingSenderId ? '✓ Set' : '✗ Missing',
    appId: firebaseConfig.appId ? '✓ Set' : '✗ Missing',
    measurementId: firebaseConfig.measurementId ? '✓ Set' : '✗ Missing'
  });
}

export default app;