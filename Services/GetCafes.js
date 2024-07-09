import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { getDatabase, get, child, ref } from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
const dbRef = ref(database);

export default async function getCafes(cafeKey, coffeeKey) {
  const dbRef = ref(database);
  return get(child(dbRef, `cafes/${cafeKey}/coffees/${coffeeKey}`))
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
