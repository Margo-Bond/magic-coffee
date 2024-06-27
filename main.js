import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
initializeApp(firebaseConfig);

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
const auth = getAuth(app);

export {
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
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
