import { auth, signInWithEmailAndPassword } from "../main.js";
import { ref, get } from "firebase/database";
import { database } from "../main.js";

export default async function authenticateUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Получение дополнительных данных пользователя из базы данных
    const userRef = ref(database, `users/${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User data not found in database.");
    }

    const userData = snapshot.val();
    console.log("User data fetched:", userData);

    // Сохраняем данные пользователя в Local Storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        name: userData.name,
        phone: userData.phone,
        email: user.email,
        cart: userData.cart,
        currentOrders: userData.currentOrders,
        orderHistory: userData.orderHistory,
      })
    );
    return user;
  } catch (error) {
    console.error("Authentication failed: ", error.message);
    throw new Error("Authentication failed: " + error.message);
  }
}
