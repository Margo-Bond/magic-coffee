import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/database";

import { get, child, ref } from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);
const database = app.database();
const dbRef = ref(database);

export async function getUserData() {
  const userData = localStorage.getItem("user");

  if (userData) {
    return JSON.parse(userData);
  } else {
    console.log("No user data available in Local Storage");
    return null;
  }
}

export async function getCafes() {
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

export async function getCoffeeType(cafe, coffee_type) {
  return get(child(dbRef, `cafes/${cafe}/coffees/${coffee_type}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
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

export async function getMilkList(cafe = null) {
  return get(child(dbRef, `cafes/${cafe}/milk_selection`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("Error: No data available");
      }
    })
    .catch((err) => {
      console.error("Error getting milkList: ", err);
    });
}

export async function getSyrupList(cafe) {
  return get(child(dbRef, `cafes/${cafe}/syrup_selection`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("Error: No data available");
      }
    })
    .catch((err) => {
      console.error("Error getting syrupList: ", err);
    });
}

export async function getCart(userUid) {
  return get(child(dbRef, `users/${userUid}/cart`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.val();
        return cartData;
      } else {
        console.log("No data available in a cart");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting cart:", error);
    });
}
