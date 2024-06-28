import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import ProfileSvg from "@/assets/images/user-icons/name.svg";
import SmartphoneSvg from "@/assets/images/user-icons/phone-number.svg";
import MessageSvg from "@/assets/images/user-icons/mail.svg";
import LockSvg from "@/assets/images/user-icons/password.svg";
import EyeSvg from "@/assets/images/user-icons/visible.svg";
import registerUser from "../../../../Services/registerUser.js";

export default function renderRegistrationPage(main) {
  main.innerHTML = `<div class="registration">
        <button class="registration__button"></button>
        <div class="registration__header">
          <h1 class="registration__header-title">Sign up</h1>
          <p class="registration__header-text">Create an account here</p>
        </div>

        <div class="registration__form">
          <div class="registration-form__item">
            <div class="registration-form__item-image">${ProfileSvg}</div>
            <span class="registration-form__item-element"></span>
            <input
              type="text"
              class="registration-form__item-input input"
              id="username"
              placeholder="Create an account here"
            />
          </div>
          <div class="registration-form__item">
            <div class="registration-form__item-image">${SmartphoneSvg}</div>
            <span class="registration-form__item-element"></span>
            <input
              type="number"
              class="registration-form__item-input input"
              id="phoneNumber"
              placeholder="Mobile Number"
            />
          </div>

          <div class="registration-form__item">
            <div class="registration-form__item-image">${MessageSvg}</div>
            <span class="registration-form__item-element"></span>
            <input
              type="email"
              class="registration-form__item-input input"
              id="email"
              placeholder="Email address"
            />
          </div>

          <div class="registration-form__item" id="eye">
            <div class="registration-form__item-image">${LockSvg}</div>
            <span class="registration-form__item-element"></span>
            <input
              type="password"
              class="registration-form__item-input input"
              id="password"
              placeholder="Password"
            />
            <span class="registration-form__item-button"><div class="item-button__img">${EyeSvg}</div>
            </span>
          </div>

          <p class="registration__text">
            By signing up you agree with our Terms of Use
          </p>
        </div>
      <footer class="registration__footer">
        <p class="registration-footer__text">
          Already a member?
          <a class="registration-footer__text-link">Sign in</a>
        </p>
        <div class="registration-footer__button-container"></div>
      </footer>
    </div>`;

  const visible = document.querySelector(".item-button__img");

  visible.addEventListener("click", () => {
    const password = document.getElementById("password");
    if (password.getAttribute("type") === "password") {
      password.setAttribute("type", "text");
    } else if (password.getAttribute("type") === "text") {
      password.setAttribute("type", "password");
    }
  });

  const profileName = document.getElementById("username");
  const number = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  function validateName() {
    const nameRegex = /^[a-zA-Z]{2,30}(?: [a-zA-Z]{2,30})?$/;
    if (nameRegex.test(profileName.value)) {
      profileName.style.border = "none";
      return true;
    } else {
      profileName.style.border = "1px solid red";
      return false;
    }
  }

  function validateNumber() {
    const numberRegex =
      /^(\+?\d{1,3}[- ]?)?(\(?\d{1,4}\)?[- ]?)?\d{1,4}([- ]?\d{1,4}){1,3}$/;

    if (numberRegex.test(number.value)) {
      number.style.border = "none";
      return true;
    } else {
      number.style.border = "1px solid red";
      return false;
    }
  }

  function validateEmail() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email.value)) {
      email.style.border = "none";
      return true;
    } else {
      email.style.border = "1px solid red";
      return false;
    }
  }

  function validatePassword() {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z0-9\W_]{5,25}$/;
    if (passwordRegex.test(password.value)) {
      password.style.border = "none";
      return true;
    } else {
      password.style.border = "1px solid red";
      return false;
    }
  }

  const back = document.querySelector(".registration__button");

  back.addEventListener("click", () => {
    window.location.href = "/";
  });

  const signInLink = document.querySelector(".registration-footer__text-link");
  signInLink.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  const buttonContainer = document.querySelector(
    ".registration-footer__button-container"
  );

  const nextButton = createForwardButton("/startup-screen");
  buttonContainer.append(nextButton);

  nextButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (
      validateName() === true &&
      validateNumber() === true &&
      validateEmail() === true &&
      validatePassword() === true
    ) {
      const nameValue = profileName.value;
      const phoneValue = number.value;
      const emailValue = email.value;
      const passwordValue = password.value;

      console.log(nameValue);
      console.log(phoneValue);
      console.log(emailValue);
      console.log(passwordValue);

      try {
        const user = await registerUser(
          nameValue,
          phoneValue,
          emailValue,
          passwordValue
        );
        console.log("User registered successfully:", user);
        window.location.href = "/startup-screen";
      } catch (err) {
        console.error("Registration failed: ", err);
        alert("Registration failed: " + err.message);
      }
    } else {
      console.log("Validation failed");
    }
  });
}
