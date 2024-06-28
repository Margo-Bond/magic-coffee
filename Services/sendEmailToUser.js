//для страниц: #4

import authenticateUser from "../Services/authenticateUser";

function sendEmail(email, password) {
  //для проверки:
  console.log(`Отправка email на ${email} с паролем ${password}`);
  return Promise.resolve();
}

/*export default function sendEmailToUser(email) {
  return new Promise((resolve, reject) => {
    authenticateUser(email)
      .then((user) => {
        sendEmail(user.email, user.password)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(new Error("Failed to send email"));
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}*/

import { getAuth, sendPasswordResetEmail } from "../main.js";

const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(
      "It seems that an error has occurred: " +
        errorCode +
        ". More information here: " +
        errorMessage
    );
    // ..
  });
