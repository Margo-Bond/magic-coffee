//для страницы 3

import {
  getDatabase,
  ref,
  set,
  getAuth,
  createUserWithEmailAndPassword,
} from "../main.js";
import { app } from "../main.js";

export default async function registerUser(
  nameValue,
  phoneValue,
  emailValue,
  passwordValue
) {
  const auth = getAuth(app);
  const database = getDatabase(app);

  try {
    // Асинхронная регистрация пользователя
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    );
    const user = userCredential.user;

    // Сохранение дополнительных данных в Realtime Database
    const userRef = ref(database, "users/" + user.uid);
    await set(userRef, {
      email: user.email,
      phoneNumber: phoneValue,
      name: nameValue,
    });

    // Сохранение данных пользователя в Local Storage
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: user.uid,
        email: user.email,
        phoneNumber: phoneValue,
        name: nameValue,
      })
    );

    return user;
  } catch (error) {
    console.error("Registration failed: ", error);
    throw new Error("Registration failed: " + error.message);
  }
}
