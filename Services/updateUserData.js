import { database, update, ref } from "../main";

export default function updateUserData(
  userUid,
  nameValue,
  phoneValue,
  emailValue,
  locationValue
) {
  const userRef = ref(database, `users/${userUid}`);

  // Создание объекта данных, исключая неопределенные значения
  const newData = {};
  if (nameValue !== undefined) newData.name = nameValue;
  if (phoneValue !== undefined) newData.phone = phoneValue;
  if (emailValue !== undefined) newData.email = emailValue;
  if (locationValue !== undefined) newData.location = locationValue;

  return update(userRef, newData)
    .then(() => {
      alert("User data updated successfully");
    })
    .catch((err) => {
      console.error("Error updating user data: ", err);
    });
}
