import { createHeaderBlack } from "@/ui/components/header/header.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Message from "@/assets/images/user-icons/mail.svg";

export default function renderPasswordRemindPage(main) {
  main.innerHTML = `<div class="password">
  <button class="password__button"></button>
        <div class="password__header">
          <h1 class="password__header-title">Forgot Password?
</h1>
          <p class="password__header-text">Enter your email address</p>
        </div>

        <div class="password__form">
          
          <div class="password-form__item">
            <img class="password-form__item-image" src="${Message}" />
            <span class="password-form__item-element"></span>
            <input
              type="email"
              class="password-form__item-input input"
              id="email"
              placeholder="Email address"
            />
          </div>

        </div>  
  
        <footer class="password__footer">
          <button type="submit" class="password-footer__button"></button>
        </footer>
        </div>`;

  const back = document.querySelector(".password__button");
  const next = document.querySelector(".password-footer__button");

  back.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  next.addEventListener("click", () => {
    window.location.href = "/startup-screen";
  });
}
