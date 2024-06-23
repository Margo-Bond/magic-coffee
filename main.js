import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";

initializeApp(firebaseConfig);

import "@/ui/routes.js";
//Далее используем ниже код где он нужен
import Cafes from "./Services/Get.js";

Cafes.getCafes()
  .then((cafes) => {
    console.log("Result:", cafes);
  })
  .catch((err) => {
    console.error("Error in getCafes call:", err);
  });
