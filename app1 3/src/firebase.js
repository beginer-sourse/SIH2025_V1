// Firebase initialization and exports
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE2vjhZB50erZNyg8ne0wggYEl0tVLGsU",
  authDomain: "jalsaathi-5dc55.firebaseapp.com",
  projectId: "jalsaathi-5dc55",
  storageBucket: "jalsaathi-5dc55.firebasestorage.app",
  messagingSenderId: "538244400350",
  appId: "1:538244400350:web:a1c9c238a141457abbee4f",
  measurementId: "G-SLP7RXBPS1"
};

const app = initializeApp(firebaseConfig);
let analytics;
try {
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (_) {
  // analytics may fail in some environments (SSR/tests)
}

const auth = getAuth(app);
const db = getFirestore(app);
export { app, analytics, auth, db, serverTimestamp };