import { initializeApp } from "firebase/app";
import authenticateUser from "./Services/authenticateUser";
import { firebaseConfig } from "./firebase.js";
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
  child,
  update,
  ref,
  runTransaction,
  set,
  signInWithEmailAndPassword,
  signOut,
};
