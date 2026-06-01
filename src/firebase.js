import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAG7e_yWKQg6RigtYZKHNIcKpgBH2m16t0",
  authDomain: "mahaan-interiors-crm.firebaseapp.com",
  projectId: "mahaan-interiors-crm",
  storageBucket: "mahaan-interiors-crm.firebasestorage.app",
  messagingSenderId: "411130125309",
  appId: "1:411130125309:web:e376924bc2d9e3ae399794"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);