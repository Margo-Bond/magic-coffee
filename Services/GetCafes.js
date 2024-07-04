//для страниц: #6-15
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
//initializeApp(firebaseConfig);
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import {
  getDatabase,
  get,
  child,
  update,
  ref,
  runTransaction,
  set,
} from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();

export default function getCafes() {
  const dbRef = ref(database);
  return get(child(dbRef, `cafes`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting cafes:", error);
    });
}

//вызов функции на получение данных кофеен
/*
import getCafes from "./Services/GetCafes.js";
getCafes().then((cafes) => {
  if (cafes) {
    console.log("Cafes data:", cafes);
  } else {
    console.log("No cafes data available");
  }
});*/
