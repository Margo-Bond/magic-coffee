import styles from "./assets/styles/style.scss";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import { arrowIcon } from "./assets/images/forward.svg";
import { createForwardButton } from "./ui/components/forward-button/forward-button.js";
import { createHeader } from "./ui/components/header/header.js";
initializeApp(firebaseConfig);
