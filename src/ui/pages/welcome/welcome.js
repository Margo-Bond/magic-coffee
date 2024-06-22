import { createHeaderBlack } from "@/ui/components/header/header.js";
import Logo from "@/assets/images/logo.svg";

export default function renderWelcomePage(main) {
  main.innerHTML = `
  <div class="welcome__logo">
      <img src='${Logo}' alt='Logo' />
      <h1 class="welcome__title">Magic coffee</h1>
  </div>
  <div class="welcome__texts">
    <p class="welcome__accent-text">Feel yourself like a barista!</p>
    <p class="welcome__muted-text">Magic coffee on order.</p>
  </div>
    <div class="welcome__buttons">
      <button class="welcome__btn welcome__btn_signin">Sigh in</button>
      <button class="welcome__btn welcome__btn_signup">Sign up</button>
    </div>
  `;

  const signInButton = document.querySelector(".welcome__btn_signin");
  const signUpButton = document.querySelector(".welcome__btn_signup");

  signInButton.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  signUpButton.addEventListener("click", () => {
    window.location.href = "/registration";
  });
}
