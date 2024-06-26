//для страниц: #3

import { ref, runTransaction, set, database } from "../main.js";

export default function setNewUser(
  nameValue,
  phoneValue,
  emailValue,
  passwordValue
) {
  const countRef = ref(database, "userCount");

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
          passwordValue,
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
