import Back from "@/assets/images/geometric-icons/back.svg";
import Cart from "@/assets/images/cart.svg";
import More from "@/assets/images/geometric-icons/icon-more-grey.svg";
import Light from "@/assets/images/coffee-icons/roasting.svg";
import SmallGrinding from "@/assets/images/coffee-icons/small-grinding.svg";
import BigGrinding from "@/assets/images/coffee-icons/big-grinding.svg";
import Ice from "@/assets/images/coffee-icons/ice.svg";
import { auth, database, onAuthStateChanged } from "../../../../main.js";

export default function renderDesignerPage(main) {
  main.innerHTML = `
  <div class="designer-header">
    <div class="designer-content__svg">${Back}</div>
    <p class="designer-header__title">Coffee lover assemblage</p>
    <div class="designer-content__svg">${Cart}</div>
  </div>
  <div class="designer-content">
    <div class="designer-content__wrapper type">
      <label for="type__coffee-slider" class="designer-content__text type__slider-label">Coffee type</label>
      <div class="type__slider">
        <input type="range" id="type__coffee-slider" class="type__range" min="1" max="5" step="1">
        <div class="type__slider-values">
          <p id="value-1" class="type__slider-value">Arabica</p>
          <p id="value-5" class="type__slider-value">Robusta</p>
        </div>
      </div>  
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Coffee sort</p>
      <div class="designer-content__svg">${More}</div>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Roasting</p>
      <div class="roasting">
        <div class="designer-content__svg roasting_row">${Light}</div>
        <div class="designer-content__svg roasting_row">${Light}${Light}</div>
        <div class="roasting_column">
          <div class="designer-content__svg roasting_below">${Light}</div>
          <div class="designer-content__svg roasting_below">${Light}${Light}</div>
        </div>
      </div>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Grinding</p>
      <div class="grinding">
        <div class="designer-content__svg">${SmallGrinding}</div>
        <div class="designer-content__svg">${BigGrinding}</div>
      </div>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Milk</p>
      <p class="designer-content__text designer-content__select">Select</p>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Syrup</p>
      <p class="designer-content__text designer-content__select">Select</p>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text">Additives</p>
      <div class="designer-content__svg">${More}</div>
    </div>
    <div class="designer-content__wrapper">
      <p class="designer-content__text-muted">Ice</p>
      <div class="ice">
        <div class="designer-content__svg ice_row">${Ice}</div>
        <div class="designer-content__svg ice_row">${Ice}${Ice}</div>
        <div class="ice_column">
          <div class="designer-content__svg ice_below">${Ice}</div>
          <div class="designer-content__svg ice_below">${Ice}${Ice}</div>
        </div>
      </div>
    </div>
  </div>
  <footer class="designer-footer">
    <div class="designer-footer__count-container">
      <p class="designer-footer__count-text">Total Amount</p>
      <p class="designer-footer__count-currency">BYN<span class="designer-footer__count">9.00</span></p>
    </div>
    <button class="designer-footer__button">Next</button>
  </footer>
  `;

  const slider = document.getElementById("type__coffee-slider");

  slider.addEventListener("input", (event) => {
    const value = event.target.value;
    const min = event.target.min;
    const max = event.target.max;
    const percentage = ((value - min) / (max - min)) * 100;
    event.target.style.background = `linear-gradient(to right, var(--slider-color) ${percentage}%, var(--line-color) ${percentage}%)`;
  });

  const initialPercentage =
    ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.background = `linear-gradient(to right, var(--slider-color) ${initialPercentage}%, var(--line-color) ${initialPercentage}%)`;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      slider.addEventListener("input", (event) => {
        const value = event.target.value;
        console.log("Slider value:", value); // Отправка значения в консоль для отладки, надо потом настроить на database, когда будут ключи
        sendSliderValue(user.uid, value);
      });
    } else {
      console.log("No user is signed in.");
    }
  });

  function sendSliderValue(userId, value) {
    set(ref(database, "users/" + userId + "/cart" + "/"), {
      coffeeType: value,
    })
      .then(() => {
        console.log("Data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  }
}
