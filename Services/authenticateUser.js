//Функция на авторизацию
//для страниц: #2, 4

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
