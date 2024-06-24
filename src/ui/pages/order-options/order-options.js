import { createHeaderBlack } from "@/ui/components/header/header.js";

export default function renderOrderOptionsPage(main) {
  main.innerHTML = ``;
}
import { createHeaderBlack } from "@/ui/components/header/header.js";
import createForwardButton from "@/ui/components/forward-button/forward-button.js";
import arrowBack from "@/assets/images/geometric-icons/back.svg";
import cartBuy from "@/assets/images/cart.svg";
import imageCoffee from "";
import coldBeverage from "@/assets/images/coffee-icons/cold-beverage.svg";
import hotBeverage from "@/assets/images/coffee-icons/hot-beverage.svg";
import cupSmall from "@/assets/images/coffee-icons/cup-250.svg";
import cupMedium from "@/assets/images/coffee-icons/cup-350.svg";
import cupBig from "@/assets/images/coffee-icons/cup-450.svg";



export default function renderOrderOptionPage(main) {
  main.innerHTML = `
    <div class="container-order">
      <div class="container-order__header">
        <button class="container-order__button"></button>
        <h2 class="сontainer-order__title">Order</h2>
        <button class="container-order__button"></button>
      </div>

      <div class="container-order__item">
        <img
          class="container-order__item-image"
          src="${imageCoffee}"
        />
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Cuppucino</p>
        </div>
        <div class="container-order__item-select">
          <span class="container-order__item-select_minus">-</span>
          <span class="container-order__item-select_number>1</span>
          <span class="container-order__item-select_plus>-+</span>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Ristretto</p>
        </div>
        <div class="container-order__item-select">
          <span class="container-order__item-select_one">One</span>
          <span class="container-order__item-select_two">Two</span>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Onsite / Takeaway</p>
        </div>
        <div class="container-order__item-select">
          <img
            class="container-order__item-image"
            src="${hotBeverage}"/>
          <img
            class="container-order__item-image"
            src="${coldBeverage}"/>
        </div>
      </div>

      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text"> Volume, ml </p>
        </div>
        <div class="container-order__item-select">
          <img
            class="container-order__item-image"
            src="${cupSmall}"/>
          <img
            class="container-order__item-image"
            src="${cupMedium}"/>
          <img
            class="container-order__item-image"
            src="${cupBig}"/>  
        </div>
      </div>
      <div class="container-order__item">
        <div class="container-order__item-text">
          <p class="container-order__text">Prepare by a certain time today?</p>
        </div>
        <div class="container-order__item_switch">
          <input type="checkbox" class="switch__input" />
          <span class-"switch__slider"></span>
        </div>
        <div class="container-order__item-watch">
          <span class="container-order__item-watch_hour">00</span>
          <span class="container-order__item-watch_point">:</span>
          <span class="container-order__item-watch_minutes">00</span>
        </div>
      </div>
    </div>
    
    <footer class="footer">
      <div class="footer__content"
        <p class="footer__text"> Total Amount </p>
        <a class="footer__sum" id="link">BYN 3.00</a>
      </div>
      <button type="submit" class="footer__button" id="button">Next</button>
    </footer>`;

  const back = document.querySelector(".container-order__button");
  const signInLink = document.getElementById("link");
  const next = document.getElementById("button");

  back.addEventListener("click", () => {
    window.location.href = "/";
  });

  signInLink.addEventListener("click", () => {
    window.location.href = "/";
  });

  next.addEventListener("click", () => {
    window.location.href = "/";
  });
}