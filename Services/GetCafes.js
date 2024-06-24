import { db } from "../main.js";
import { ref, get, child } from "firebase/database";

export function getCafes() {
  const dbRef = ref(db);
  return get(child(dbRef, `cafes`))
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
