import "./style.scss";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.js";
import { arrowIcon } from "./assets/images/forward.svg";
import { createForwardButton } from "./ui/components/forward-button/forward-button.js";
initializeApp(firebaseConfig);
