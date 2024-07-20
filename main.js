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
  remove,
  runTransaction,
  set,
  push,
} from "firebase/database";

import "@/ui/routes.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const dbRef = ref(database);

export {
  getDatabase,
  getAuth,
  app,
  database,
  auth,
  dbRef,
  get,
  update,
  child,
  ref,
  runTransaction,
  set,
  push,
  remove,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
