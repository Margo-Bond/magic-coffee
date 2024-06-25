import "@/ui/routes.js";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import { getDatabase, ref, runTransaction, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { getUsers } from "./Services/GetUsers.js";
import { getCafes } from "./Services/GetCafes.js";
import { getCart } from "./Services/GetCart.js";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export {
  app,
  database,
  auth,
  ref,
  runTransaction,
  set,
  signInWithEmailAndPassword,
};
