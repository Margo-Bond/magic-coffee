//Временный файл для рагистрации новых пользователей, пока в работе

/*import { auth, database } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

async function registerUser(email, password, name, phone) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userId = userCredential.user.uid;
    await set(ref(database, "users/" + userId), {
      name: name,
      phone: phone,
      email: email,
      orders: {},
    });
    console.log("User registered:", userId);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export { registerUser };*/
