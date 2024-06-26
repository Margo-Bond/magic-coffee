import {
  auth,
  database,
  get,
  ref,
  signInWithEmailAndPassword,
} from "../main.js";

export default function authenticateUser(email, password = null) {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, `users`);
    console.log("Fetching user data from database...");

    get(dbRef)
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
