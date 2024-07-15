//для страниц: #17

import { database, update, ref } from "../main";

export default function updateUserData(
  userUid,
  nameValue,
  phoneValue,
  emailValue,
  locationValue
) {
  const userRef = ref(database, `users/${userUid}`);

  const newData = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    location: locationValue,
  };

  return update(userRef, newData)
    .then(() => {
      alert("User data updated successfully");
    })
    .catch((err) => {
      console.error("Error updating user data: ", err);
    });
}
