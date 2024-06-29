//для страниц: #4

import { auth, sendPasswordResetEmail } from "../main.js";

export default async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
    alert("Password reset email sent!");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    alert("Error sending password reset email: " + error.message);
  }
}

/*для вызова функции:
sendPasswordReset(email)*/
