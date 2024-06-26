import { database, update, ref } from "../main";

export default function updateUserData(
  userId,
  nameValue,
  phoneValue,
  emailValue,
  passwordValue
) {
  const userRef = ref(database, `users/${userId}`);

  const newData = {
    name: nameValue,
    phone: phoneValue,
    email: emailValue,
    password: passwordValue,
  };

  return update(userRef, newData)
    .then(() => {
      alert("User data updated successfully");
    })
    .catch((err) => {
      console.error("Error updating user data: ", err);
    });
}
