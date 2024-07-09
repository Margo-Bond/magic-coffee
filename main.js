import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getDatabase,
  get,
  child,
  update,
  ref,
  runTransaction,
  set,
} from "firebase/database";

import "@/ui/routes.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

export {
  getDatabase,
  getAuth,
  app,
  database,
  auth,
  get,
  update,
  child,
  ref,
  runTransaction,
  set,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
