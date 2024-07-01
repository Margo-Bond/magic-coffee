import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
initializeApp(firebaseConfig);
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
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
};
