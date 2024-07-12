import { getCoffeeCountry } from "../../../../Services/Get.js";
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
            ${Array(11).fill(`
              <div class="country-content__wrapper">
                <p class="country-content__text"></p>
                <div class="country-content__icon">${More}</div>
              </div>
            `).join('')}
          </div>
        </div>
  `;

  const back = document.querySelector(".country-header__icon-back");
  const cart = document.querySelector(".country-header__icon-cart");
  const countryBtns = document.querySelectorAll(".country-content__wrapper");

  back.addEventListener("click", () => (window.location.href = "/designer"));
  cart.addEventListener("click", () => (window.location.href = "/current-order"));

  let order = JSON.parse(localStorage.getItem("order")) || {};
  let keys = Object.keys(order);
  let lastKey = keys[keys.length - 1];

  try {
    const getAddress = order[lastKey].cafe_address;

    let cafeKey = null;

    if (getAddress === "Bradford BD1 1PR") {
      cafeKey = "cafe_one";
    } else if (getAddress === "Bradford BD4 7SJ") {
      cafeKey = "cafe_two";
    } else if (getAddress === "Bradford BD1 4RN") {
      cafeKey = "cafe_three";
    }

    const data = await getCoffeeCountry(cafeKey);
    const countryKeys = Object.keys(data);

    countryBtns.forEach((btn, index) => {
      const countryBtnText = btn.querySelector(".country-content__text");
      const countryKey = countryKeys[index];
      const countryItem = data[countryKey];

      if (countryItem) {
        countryBtnText.textContent = countryItem.country;
      }
    })
  } catch (error) {
    console.error("Error fetching country data:", error);
  }

  countryBtns.forEach((btn) => {
    const countryBtnText = btn.querySelector(".country-content__text");
    const btnTextValue = countryBtnText.textContent;

    const getCoffeeCountry = order[lastKey].coffee_country;

    if (getCoffeeCountry === btnTextValue) {
      btn.classList.add("selected");
      countryBtnText.style.color = "rgb(10, 132, 255)";
    }
  });

  countryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      resetButtons();
      btn.classList.add("selected");
      const countryBtnText = btn.querySelector(".country-content__text");
      countryBtnText.style.color = "rgb(10, 132, 255)";

      const btnTextValue = countryBtnText.textContent;
      order[lastKey].coffee_country = btnTextValue;
      localStorage.setItem("order", JSON.stringify(order));

      setTimeout(() => {
        window.location.href = "/coffee-type";
      }, 700)
    });
  });

  function resetButtons() {
    countryBtns.forEach((btn) => {
      btn.classList.remove("selected");
      const countryBtnText = btn.querySelector(".country-content__text");
      countryBtnText.style.color = "rgb(0, 24, 51)";
    });
  }
}
