import { database, ref, get, child } from "../main.js";

export default function getCafes() {
  const dbRef = ref(database);
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
