import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

import { getUsers } from "./Services/GetUsers.js";
import { getCafes } from "./Services/GetCafes.js";
import { getCart } from "./Services/GetCart.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export { db, auth };

import "@/ui/routes.js";

document.addEventListener("DOMContentLoaded", () => {
  getUsers()
    .then((users) => {
      console.log("Users:", users);
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    });

  getCafes()
    .then((cafes) => {
      console.log("Cafes:", cafes);
    })
    .catch((error) => {
      console.error("Error fetching cafes:", error);
    });

  const userId = "some-user-id";
  getCart(userId)
    .then((cart) => {
      console.log("Cart:", cart);
    })
    .catch((error) => {
      console.error("Error fetching cart:", error);
    });
});
/*Далее используем ниже код где он нужен
import Cafes from "./Services/Get.js";

Cafes.getCafes()
  .then((cafes) => {
    console.log("Result:", cafes);
  })
  .catch((err) => {
    console.error("Error in getCafes call:", err);
  });*/
