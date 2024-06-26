import { ref, runTransaction, set, database } from "../main.js";

export default function setNewUser(
  nameValue,
  phoneValue,
  emailValue,
  passwordValue
) {
  const countRef = ref(database, "userCount");

  //дополнительно прописать, чтобы счетчик срабатывал только на регистрацию
  runTransaction(countRef, (currentCount) => {
    if (currentCount === null) {
      return 1;
    } else {
      return Number(currentCount) + 1;
    }
  })
    .then((result) => {
      if (result.committed) {
        const userId = `User${result.snapshot.val()}`;

        const userRef = ref(database, "users/" + userId);

        set(userRef, {
          name: nameValue,
          phone: phoneValue,
          email: emailValue,
          password: passwordValue,
        })
          .then(() => {
            console.log("user's data were created");
          })
          .catch((error) => {
            console.error("Error: ", error);
          });
      } else {
        console.log("Transaction wasn't committed");
      }
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}
