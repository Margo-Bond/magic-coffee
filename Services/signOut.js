//страница #17

import { getAuth, signOut } from "../main.js";

export default function handleSignOut() {
  const auth = getAuth();

  signOut(auth)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error: ", error);
      alert("Try signing out later.");
    });
}
