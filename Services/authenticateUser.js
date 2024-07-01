//Функция на авторизацию
//для страниц: #2, 4
/*
import { auth, signInWithEmailAndPassword } from "../main.js";

export default async function authenticateUser(email, password = null) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Сохраняем данные пользователя в Local Storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        name: user.name,
        phoneNumber: user.userNumber,
        email: user.email,
        password: user.password,
        cart: user.cart,
        currentOrders: user.currentOrders,
        orderHistory: user.orderHistory,
        // другие данные, если нужно
      })
    );
    return user;
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
}
*/

import { auth, signInWithEmailAndPassword } from "../main.js";
import { ref, get, child } from "firebase/database";
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
    const userRef = ref(database, users / `${user.uid}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      throw new Error("User data not found in database.");
    }

    const userData = snapshot.val();

    // Сохраняем данные пользователя в Local Storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        email: user.email,
        cart: userData.cart,
        currentOrders: userData.currentOrders,
        orderHistory: userData.orderHistory,
        // другие данные, если нужно
      })
    );
    return user;
  } catch (error) {
    throw new Error("Authentication failed: " + error.message);
  }
}
