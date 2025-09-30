import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOCOPrkVFvekN6HGzxsv_CvIVTAY7C_LE",
  authDomain: "sheiapp-4c5f5.firebaseapp.com",
  projectId: "sheiapp-4c5f5",
  storageBucket: "sheiapp-4c5f5.firebasestorage.app",
  messagingSenderId: "219880800129",
  appId: "1:219880800129:web:276090f8f322b8922eb280"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 