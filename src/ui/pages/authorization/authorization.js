import authenticateUser from "../../../../Services/authenticateUser";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Message from "@/assets/images/user-icons/mail.svg";
import Lock from "@/assets/images/user-icons/password.svg";
import Eye from "@/assets/images/user-icons/visible.svg";
import sendPasswordReset from "../../../../Services/sendPasswordReset";

export default function renderAuthorizationPage(main) {
  main.innerHTML = `<div class="authorization">
        <div class="authorization__header">
          <h1 class="authorization__header-title">Sign in</h1>
          <p class="authorization__header-text">Welcome back</p>
        </div>

        <div class="authorization__form">

          <div class="authorization-form__item">
            <div class="authorization-form__item-image">${Message}</div>
            <span class="authorization-form__item-element"></span>
            <input
              type="email"
              class="authorization-form__item-input input"
              id="email"
              placeholder="Email address"
            />
          </div>

          <div class="authorization-form__item" id="eye">
            <div class="authorization-form__item-image">${Lock}</div>
            <span class="authorization-form__item-element"></span>
            <input
              type="password"
              class="authorization-form__item-input input"
              id="password"
              placeholder="Password"
            />
            <span class="authorization-form__item-button">
              <div class="item-button__img">${Eye}</div>
            </span>
          </div>

        </div>  

          <p class="authorization__text">
            <a class="authorization__text-link" id="forgot-password-link">Forgot Password?</a>
          </p>
        <footer class="authorization__footer">
          <p class="authorization-footer__text">
          New member? <a class="authorization-footer__text-link" id="link">Sign up</a>
          </p>
          <div class="authorization-footer__button-container"></div>
        </footer>
        </div>`;

  const forgottenPasswordLink = document.getElementById("forgot-password-link");
  const signInLink = document.querySelector(".authorization-footer__text-link");
  const buttonContainer = document.querySelector(
    ".authorization-footer__button-container"
  );

  forgottenPasswordLink.addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    if (!email) {
      alert("Please enter your email address to reset password.");
      return;
    }
    sendPasswordReset(email);
  });

  signInLink.addEventListener("click", () => {
    window.location.href = "/registration";
  });

  const nextButton = createForwardButton("/startup-screen");
  buttonContainer.append(nextButton);

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    authenticateUser(email, password)
      .then((result) => {
        window.location.href = "/startup-screen";
      })
      .catch((err) => {
        console.error("Authentication failed:", err);
        alert(
          `Invalid email or password. Please try again. Error: ${err.message}`
        );
      });
  });

  const visible = document.querySelector(".item-button__img");

  visible.addEventListener("click", () => {
    const passwordField = document.getElementById("password");
    if (passwordField.getAttribute("type") === "password") {
      passwordField.setAttribute("type", "text");
    } else if (passwordField.getAttribute("type") === "text") {
      passwordField.setAttribute("type", "password");
    }
  });
}
