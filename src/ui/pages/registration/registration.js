import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Profile from "@/assets/images/user-icons/name.svg";
import Smartphone from "@/assets/images/user-icons/phone-number.svg";
import Message from "@/assets/images/user-icons/mail.svg";
import Lock from "@/assets/images/user-icons/password.svg";
import Eye from "@/assets/images/user-icons/visible.svg";
import setNewUser from "../../../../Services/setNewUser";

export default function renderRegistrationPage(main) {
  main.innerHTML = `<div class="registration">
        <button class="registration__button"></button>
        <div class="registration__header">
          <h1 class="registration__header-title">Sign up</h1>
          <p class="registration__header-text">Create an account here</p>
        </div>

        <div class="registration__form">
          <div class="registration-form__item">
            <img
              class="registration-form__item-image"
              src="${Profile}"
            />
            <span class="registration-form__item-element"></span>
            <input
              type="text"
              class="registration-form__item-input input"
              id="username"
              placeholder="Create an account here"
            />
          </div>

          <div class="registration-form__item">
            <img
              class="registration-form__item-image"
              src="${Smartphone}"
            />
            <span class="registration-form__item-element"></span>
            <input
              type="number"
              class="registration-form__item-input input"
              id="phoneNumber"
              placeholder="Mobile Number"
            />
          </div>

          <div class="registration-form__item">
            <img
              class="registration-form__item-image"
              src="${Message}"
            />
            <span class="registration-form__item-element"></span>
            <input
              type="email"
              class="registration-form__item-input input"
              id="email"
              placeholder="Email address"
            />
          </div>

          <div class="registration-form__item" id="eye">
            <img class="registration-form__item-image" src="${Lock}" />
            <span class="registration-form__item-element"></span>
            <input
              type="password"
              class="registration-form__item-input input"
              id="password"
              placeholder="Password"
            />
            <span class="registration-form__item-button"
              ><img class="item-button__img" src="${Eye}" />
            </span>
          </div>

          <p class="registration__text">
            By signing up you agree with our Terms of Use
          </p>
        </div>
      </main>
      <footer class="registration__footer">
        <p class="registration-footer__text">
          Already a member?
          <a class="registration-footer__text-link">Sign in</a>
        </p>
        <div class="registration-footer__button-container"></div>
      </footer>
    </div>`;

  const back = document.querySelector(".registration__button");
  const signInLink = document.querySelector(".registration-footer__text-link");
  const buttonContainer = document.querySelector(
    ".registration-footer__button-container"
  );

  back.addEventListener("click", () => {
    window.location.href = "/";
  });

  signInLink.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  const nextButton = createForwardButton("/startup-screen");
  buttonContainer.append(nextButton);

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    const nameValue = document.querySelector("#username").value;
    const phoneValue = document.querySelector("#phoneNumber").value;
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#password").value;

    setNewUser(nameValue, phoneValue, emailValue, passwordValue);
  });
}
