//страница #17

import { getAuth, signOut } from "../main.js";

const auth = getAuth();
signOut(auth)
  .then(() => {
    window.location.href = "/";
  })
  .catch((error) => {
    console.error("Error: ", error);
    alert("Try sign out later.");
  });
