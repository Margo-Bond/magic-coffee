import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { getDatabase, get, child, ref } from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
const dbRef = ref(database);

export async function getCafes(cafeKey = null, coffeeKey = null) {
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

export async function getCoffees(cafeKey = null, coffeeKey = null) {
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

export async function getCoffeeSorts(cafeKey = null, countryKey = null) {
  const dbRef = ref(database);
  return get(child(dbRef, `cafes/${cafeKey}/coffee_selection/${countryKey}`))
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
      console.error("Error getting countries:", error);
    });
}
