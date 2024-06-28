//для страниц: #6-15
import { getDatabase, database, ref, get, child } from "../main.js";

export default function getCafes() {
  const dbRef = ref(database);
  return get(child(dbRef, `cafes`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error getting cafes:", error);
    });
}

//вызов функции на получение данных кофеен
/*
import getCafes from "./Services/GetCafes.js";
getCafes().then((cafes) => {
  if (cafes) {
    console.log("Cafes data:", cafes);
  } else {
    console.log("No cafes data available");
  }
});*/
