import authenticateUser from "Services/authenticateUser.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Message from "@/assets/images/user-icons/mail.svg";
import Lock from "@/assets/images/user-icons/password.svg";
import Eye from "@/assets/images/user-icons/visible.svg";

export default function renderAutorizationPage(main) {
  main.innerHTML = `<div class="authorization">
        <div class="authorization__header">
          <h1 class="authorization__header-title">Sign in</h1>
          <p class="authorization__header-text">Welcome back</p>
        </div>

        <div class="authorization__form">

          <div class="authorization-form__item">
            <img class="authorization-form__item-image" src="${Message}" />
            <span class="authorization-form__item-element"></span>
            <input
              type="email"
              class="authorization-form__item-input input"
              id="email"
              placeholder="Email address"
            />
          </div>

          <div class="authorization-form__item" id="eye">
            <img class="authorization-form__item-image" src="${Lock}" />
            <span class="authorization-form__item-element"></span>
            <input
              type="password"
              class="authorization-form__item-input input"
              id="password"
              placeholder="Password"
            />
            <span class="authorization-form__item-button"
              ><img class="item-button__img" src="${Eye}" />
            </span>
          </div>

        </div>  

          <p class="authorization__text">
            <a class="authorization__text-link">Forgot Password?</a>
          </p>
        <footer class="authorization__footer">
          <p class="authorization-footer__text">
          New member? <a class="authorization-footer__text-link" id="link">Sign up</a>
          </p>
          <div class="authorization-footer__button-container"></div>
        </footer>
        </div>`;

  const forgottenPassword = document.querySelector(".authorization__text-link");
  const signInLink = document.querySelector(".authorization-footer__text-link");
  const buttonContainer = document.querySelector(
    ".authorization-footer__button-container"
  );

  forgottenPassword.addEventListener("click", () => {
    window.location.href = "/password-remind";
  });

  signInLink.addEventListener("click", () => {
    window.location.href = "/registration";
  });

  const nextButton = createForwardButton("/startup-screen");
  buttonContainer.append(nextButton);

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    authenticateUser(email, password)
      .then(() => {
        window.location.href = "/startup-screen";
      })
      .catch((err) => {
        console.error("Authentication failed: ", err);
        alert("Invalid email or password. Please try again.");
      });
  });
}
