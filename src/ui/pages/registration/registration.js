import { createHeaderBlack } from "@/ui/components/header/header.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import profile from "@/assets/images/user-icons/name.svg";
import smartphone from "@/assets/images/user-icons/phone-number.svg";
import message from "@/assets/images/user-icons/mail.svg";
import lock from "@/assets/images/user-icons/password.svg";
import eye from "@/assets/images/user-icons/visible.svg";

export default function renderRegistrationPage(main) {
  main.innerHTML = `<button class="container__button"></button>
        <div class="container__header">
          <h1 class="container__header-title">Sign up</h1>
          <p class="container__header-text">Create an account here</p>
        </div>

        <div class="container__form">
          <div class="container-form__item">
            <img
              class="container-form__item-image"
              src="${profile}"
            />
            <span class="container-form__item-element"></span>
            <input
              type="text"
              class="container-form__item-input input"
              id="username"
              placeholder="Create an account here"
              required
            />
          </div>

          <div class="container-form__item">
            <img
              class="container-form__item-image"
              src="${smartphone}"
            />
            <span class="container-form__item-element"></span>
            <input
              type="tel"
              class="container-form__item-input input"
              id="phoneNumber"
              placeholder="Mobile Number"
              required
            />
          </div>

          <div class="container-form__item">
            <img class="container-form__item-image" src="${message}" />
            <span class="container-form__item-element"></span>
            <input
              type="email"
              class="container-form__item-input input"
              id="email"
              placeholder="Email address"
              required
            />
          </div>

          <div class="container-form__item" id="eye">
            <img class="container-form__item-image" src="${lock}" />
            <span class="container-form__item-element"></span>
            <input
              type="password"
              class="container-form__item-input input"
              id="password"
              placeholder="Password"
              required
            />
            <span class="container-form__item-button"
              ><img class="item-button__img" src="${eye}" />
            </span>
          </div>

          <p class="container__text">
            By signing up you agree with our Terms of Use
          </p>
        </div>
        <footer class="footer">
          <p class="footer__text">
          Already a member? <a class="footer__text-link" id="link">Sign in</a>
          </p>
          <button type="submit" class="footer__button" id="button"></button>
        </footer>`;

  const back = document.querySelector(".container__button");
  const signInLink = document.getElementById("link");
  const next = document.getElementById("button");

  back.addEventListener("click", () => {
    window.location.href = "/";
  });

  signInLink.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  next.addEventListener("click", () => {
    window.location.href = "/startup-screen";
  });
}
