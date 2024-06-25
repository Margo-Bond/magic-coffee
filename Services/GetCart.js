import { database, ref, get, child } from "../main.js";

export default function getCart(userId) {
  const dbRef = ref(database);
  return get(child(dbRef, `users/${userId}/cart`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available in a cart");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting cart:", error);
    });
}
