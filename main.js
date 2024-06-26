import { initializeApp } from "firebase/app";
import authenticateUser from "./Services/authenticateUser";
import { firebaseConfig } from "./firebase.js";
initializeApp(firebaseConfig);

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
  signOut,
  signOut,
};
