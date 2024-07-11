import { getCafes } from "../../../../Services/Get.js";
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
              <p class="country-content__text text-one"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>

            <div class="country-content__wrapper">
              <p class="country-content__text"></p>
              <div class="country-content__icon">${More}</div>
            </div>
          </div>
        </div>
  `;

  try {
    const data = await getCafes();
    const cafeOne = "Bradford BD1 1PR";
    const cafeTwo = "Bradford BD4 7SJ";
    const cafeThree = "Bradford BD1 4RN";
    const getAddress = localStorage.getItem("address");

    let selectedCafe = null;

    if (getAddress === cafeOne) {
      selectedCafe = data.cafe_one.coffee_selection;
    } else if (getAddress === cafeTwo) {
      selectedCafe = data.cafe_two.coffee_selection;
    } else if (getAddress === cafeThree) {
      selectedCafe = data.cafe_three.coffee_selection;
    }

    if (selectedCafe) {
      const countryOptions = Object.keys(selectedCafe);
      const countryBtns = document.querySelectorAll(
        ".country-content__wrapper"
      );

      countryBtns.forEach((countryItem, index) => {
        if (countryOptions[index]) {
          const countryOption = countryOptions[index];
          const countryData = selectedCafe[countryOption];

          const itemName = countryItem.querySelector(".country-content__text");

          if (itemName) {
            itemName.textContent = countryData.country;
          }
        }
      });
    }
  } catch (error) {
    console.error("Error fetching country data:", error);
  }

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
