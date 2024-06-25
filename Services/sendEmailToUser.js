import authenticateUser from "Services/authenticateUser.js";

function sendEmail(email, password) {
  console.log(`Отправка email на ${email} с паролем ${password}`);
  return Promise.resolve();
}

export default function sendEmailToUser(email) {
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
}
