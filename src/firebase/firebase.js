import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCL-9izcmrgdW3fBXTNu9R_-BojPGsPxBM",
  authDomain: "stockcheck-dfa7b.firebaseapp.com",
  projectId: "stockcheck-dfa7b",
  storageBucket: "stockcheck-dfa7b.firebasestorage.app",
  messagingSenderId: "834894644407",
  appId: "1:834894644407:web:59cad46f5e460a86e4f932",
  measurementId: "G-2DK07B6C2T"
};

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);