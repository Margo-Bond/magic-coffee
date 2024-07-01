import sendPasswordReset from "../../../../Services/sendPasswordReset.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import Message from "@/assets/images/user-icons/mail.svg";

export default function renderPasswordRemindPage(main) {
  main.innerHTML = `
  <div class="password">
    <button class="password__button"></button>
    <div class="password__header">
      <h1 class="password__header-title">Forgot Password?</h1>
      <p class="password__header-text">Enter your email address</p>
    </div>

    <div class="password__form">
      <div class="password-form__item">
        <div class="password-form__item-image">${Message}</div>
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
      <div class="password-footer__button-container"></div>
    </footer>
  </div>
  `;

  const back = document.querySelector(".password__button");
  const buttonContainer = document.querySelector(
    ".password-footer__button-container"
  );

  back.addEventListener("click", () => {
    window.location.href = "/authorization";
  });

  const nextButton = createForwardButton("/");
  buttonContainer.append(nextButton);

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;

    sendPasswordReset(email)
      .then(() => {
        alert("Password sent to your email address.");
        window.location.href = "/authorization";
      })
      .catch((err) => {
        console.log("Error: ", err);
        alert("This email doesn't exist");
      });
  });
}
