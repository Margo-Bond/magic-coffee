//для страниц: #2-4, 6-19

import { database, ref, get, child } from "../main.js";

export function getUsers() {
  const dbRef = ref(database);
  return get(child(dbRef, `users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let users = snapshot.val();
        return users;
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting users:", error);
    });
}
