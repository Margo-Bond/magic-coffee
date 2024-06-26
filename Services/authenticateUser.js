//для страниц: #2, 4

import {
  auth,
  child,
  database,
  get,
  ref,
  signInWithEmailAndPassword,
} from "../main.js";

export default function authenticateUser(email, password = null) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database);
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          const user = Object.values(users).find(
            (user) => user.email === email
          );
          if (user) {
            if (password) {
              signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                  resolve(user);
                })
                .catch((error) => {
                  reject(new Error("Authentication failed"));
                });
            } else {
              resolve(user);
            }
          } else {
            reject(new Error("User not found"));
          }
        } else {
          reject(new Error("No users available"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
