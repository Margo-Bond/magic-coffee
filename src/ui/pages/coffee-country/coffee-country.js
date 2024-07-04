import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";

export default async function renderCoffeeCountryPage(main) {
  main.innerHTML = `
    <div class="country">
          <div class="country-header">
            <div class="country-header__icon country-header__icon-back">${Back}</div>
            <p class="country-header__title">Coffee lover assemblage</p>
            <div class="country-header__icon country-header__icon-cart">${Cart}</div>
          </div>

          <div class="country-title">
            <p class="country-title__text">Select country and sort of coffee</p>
          </div>

          <div class="country-content">
            <div class="country-content__wrapper item-one">
              <p class="country-content__text text-one">Brazil</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Colombia</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Costa Rica</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Jamaica</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Yemen</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Kenya</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">India</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Tanzania</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Hawaii</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Indonesia</p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text">Ethiopia</p>
              <div class="country-content__icon">${More}</div>
            </div>
          </div>
        </div>
  `;

  const countryBtns = document.querySelectorAll(".country-content__wrapper");

  countryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      resetButtons();
      btn.classList.add("selected");
      const countryBtnText = btn.querySelector(".country-content__text");
      const btnTextValue = countryBtnText.textContent;
      const storedCountry = localStorage.getItem("country");
      if (storedCountry === btnTextValue) {
        localStorage.removeItem("country");
        btn.classList.remove("selected");
        countryBtnText.style.color = "rgb(0, 24, 51)";
      } else {
        localStorage.setItem("country", btnTextValue);
        countryBtnText.style.color = "rgb(10, 132, 255)";
      }
      window.location.href = "/coffee-type";
    });
  });

  function resetButtons() {
    countryBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const countryBtnText = btn.querySelector(".country-content__text");
      countryBtnText.style.color = "rgb(0, 24, 51)";
    });
  }

  const back = document.querySelector(".country-header__icon-back");
  const cart = document.querySelector(".country-header__icon-cart");
  back.addEventListener("click", () => (window.location.href = "/designer"));
  cart.addEventListener(
    "click",
    () => (window.location.href = "/current-order")
  );
}
