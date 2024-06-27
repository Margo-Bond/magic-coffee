import { createHeaderBlack } from "@/ui/components/header/header.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Profile from "@/assets/images/user-icons/name.svg";
import Smartphone from "@/assets/images/user-icons/phone-number.svg";
import Message from "@/assets/images/user-icons/mail.svg";
import Lock from "@/assets/images/user-icons/password.svg";
import Eye from "@/assets/images/user-icons/visible.svg";

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
        <button
          type="submit"
          class="registration-footer__button"
        ></button>
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

  let user = {
    userName: "",
    userNumber: "",
    userEmail: "",
    userPassword: "",
  };

  const profileName = document.getElementById("username");
  const number = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  function validateName() {
    const nameRegex = /^[a-zA-Z]{2,30}(?: [a-zA-Z]{2,30})?$/;
    if (nameRegex.test(profileName.value)) {
      user.userName = profileName.value;
      profileName.style.border = "none";
      return true;
    } else {
      profileName.style.border = "1px solid red";
      return false;
    }
  }

  function validateNumber() {
    const numberRegex =
      /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){5,12}\d$/;
    if (numberRegex.test(number.value)) {
      user.userNumber = number.value;
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
      user.userEmail = email.value;
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
      user.userPassword = password.value;
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

  const next = document.querySelector(".registration-footer__button");
  next.addEventListener("click", () => {
    if (
      validateName() === true &&
      validateNumber() === true &&
      validateEmail() === true &&
      validatePassword() === true
    ) {
      console.log(user);

      fetch("https://magic-coffee-878ad-default-rtdb.firebaseio.com/users", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "charset=UTF-8",
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(
            data.userName,
            data.userNumber,
            data.userEmail,
            data.userPassword
          );
        })
        .catch((err) => {
          console.log(`Ooops! There seems to be an error: ${err}`);
        });

      //window.location.href = "/startup-screen";
    } else {
      return;
    }

    username.value = "";
    number.value = "";
    email.value = "";
    password.value = "";
  });
}
